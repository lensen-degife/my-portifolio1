import { useRef, useContext, useEffect, useLayoutEffect } from 'react';
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import { ScrollEliminateContext, ELIMINATION_PRESETS } from './scrollEliminateConfig';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Global Scroll and Viewport Manager
 * Coordinates scroll & resize updates across all ScrollEliminate instances
 * using a single passive event listener batch-scheduled via requestAnimationFrame.
 * This guarantees 60/120fps fluid tracking on iPhone/Safari without layout thrashing.
 */
const activeListeners = new Set();
let globalRafId = null;
let isListenersAttached = false;

function tick() {
  globalRafId = null;
  activeListeners.forEach((callback) => {
    try {
      callback();
    } catch {
      // Ignore errors for unmounted elements
    }
  });
}

function scheduleTick() {
  if (globalRafId !== null) return;
  globalRafId = requestAnimationFrame(tick);
}

function attachGlobalListeners() {
  if (isListenersAttached || typeof window === 'undefined') return;
  isListenersAttached = true;
  window.addEventListener('scroll', scheduleTick, { passive: true });
  window.addEventListener('touchmove', scheduleTick, { passive: true });
  window.addEventListener('resize', scheduleTick, { passive: true });
  window.addEventListener('orientationchange', scheduleTick, { passive: true });
}

function detachGlobalListeners() {
  if (!isListenersAttached || typeof window === 'undefined') return;
  if (activeListeners.size === 0) {
    isListenersAttached = false;
    window.removeEventListener('scroll', scheduleTick);
    window.removeEventListener('touchmove', scheduleTick);
    window.removeEventListener('resize', scheduleTick);
    window.removeEventListener('orientationchange', scheduleTick);
    if (globalRafId !== null) {
      cancelAnimationFrame(globalRafId);
      globalRafId = null;
    }
  }
}

function registerScrollListener(callback) {
  activeListeners.add(callback);
  attachGlobalListeners();
  return () => {
    activeListeners.delete(callback);
    detachGlobalListeners();
  };
}

/**
 * Parses offset edge definitions like 'start', 'end', 'center', '0.16', '100px', '20%'
 */
function parseEdge(edgeStr, length) {
  if (!edgeStr) return 0;
  const str = String(edgeStr).trim();
  if (str === 'start') return 0;
  if (str === 'center') return length * 0.5;
  if (str === 'end') return length;
  if (str.endsWith('px')) return parseFloat(str);
  if (str.endsWith('%')) return (parseFloat(str) / 100) * length;
  if (str.endsWith('vh')) return (parseFloat(str) / 100) * length;
  const num = parseFloat(str);
  if (!isNaN(num)) return length * num;
  return 0;
}

function parseOffsetPair(offsetStr) {
  if (!offsetStr || typeof offsetStr !== 'string') {
    return { targetEdge: 'start', containerEdge: '0' };
  }
  const parts = offsetStr.trim().split(/\s+/);
  return {
    targetEdge: parts[0] || 'start',
    containerEdge: parts[1] || parts[0],
  };
}

/**
 * Computes exact scroll elimination progress from live viewport bounding client rect.
 * Works universally on iOS Safari, Android, and Desktop, eliminating offsetParent,
 * momentum scrolling desyncs, and dynamic toolbar bugs.
 */
function computeEliminationProgress(rect, offsetDef, vh) {
  const [startDef, endDef] = offsetDef || ['start 0.16', 'end 0.02'];
  const startPair = parseOffsetPair(startDef);
  const endPair = parseOffsetPair(endDef);

  const startTargetOffset = parseEdge(startPair.targetEdge, rect.height);
  const startContainerY = parseEdge(startPair.containerEdge, vh);

  const endTargetOffset = parseEdge(endPair.targetEdge, rect.height);
  const endContainerY = parseEdge(endPair.containerEdge, vh);

  // yStart: rect.top at which progress begins (0.0)
  const yStart = startContainerY - startTargetOffset;
  // yEnd: rect.top at which progress reaches full elimination (1.0)
  const yEnd = endContainerY - endTargetOffset;

  const totalTravel = yStart - yEnd;
  if (totalTravel <= 0.0001) {
    return rect.top <= yEnd ? 1 : 0;
  }

  const rawProgress = (yStart - rect.top) / totalTravel;
  return Math.max(0, Math.min(1, rawProgress));
}

/**
 * Custom Hook: useScrollElimination
 * Computes opacity, scale, pointerEvents, and optional blur based on scroll progress.
 * Fully compatible with iPhone (Safari) and PC/Desktop with high-performance RAF sync.
 */
function useScrollElimination({
  targetRef,
  offset,
  offsetMobile,
  progressRange,
  minScale = 0.94,
  blur = false,
  disabled = false,
} = {}) {
  const shouldReduceMotion = useReducedMotion();
  const internalRef = useRef(null);
  const activeRef = targetRef || internalRef;

  // Use MotionValue to drive animations without triggering React re-renders
  const scrollYProgress = useMotionValue(0);

  const [fadeStart, fadeEnd] = progressRange || [0, 0.88];

  // Continuous smooth opacity: 1 -> 0
  const opacity = useTransform(
    scrollYProgress,
    [0, fadeStart, fadeEnd],
    [1, 1, 0]
  );

  // Slight scale down: 1 -> minScale (e.g. 0.94)
  const scale = useTransform(
    scrollYProgress,
    [0, fadeStart, fadeEnd],
    [1, 1, minScale]
  );

  // When element is fully eliminated (opacity 0), disable pointer events
  const pointerEvents = useTransform(scrollYProgress, (progress) => {
    return progress >= fadeEnd ? 'none' : 'auto';
  });

  // Optional subtle blur filter
  const filter = useTransform(
    scrollYProgress,
    [0, fadeStart, fadeEnd],
    ['blur(0px)', 'blur(0px)', typeof blur === 'string' ? `blur(${blur})` : 'blur(4px)']
  );

  const isMotionDisabled = shouldReduceMotion || disabled;

  useIsomorphicLayoutEffect(() => {
    if (isMotionDisabled || typeof window === 'undefined') return;

    const update = () => {
      const el = activeRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight || 800;
      const isMobile = window.innerWidth < 768;

      const activeOffset = (isMobile && offsetMobile) ? offsetMobile : (offset || ['start 0.16', 'end 0.02']);
      const progress = computeEliminationProgress(rect, activeOffset, vh);

      scrollYProgress.set(progress);
    };

    // Immediate initial sync before paint
    update();

    // Register with global RAF-debounced scroll & touch listener
    const unregister = registerScrollListener(update);

    // Re-sync on webfont hydration to handle any layout shifts gracefully
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(update).catch(() => {});
    }

    return unregister;
  }, [activeRef, offset, offsetMobile, isMotionDisabled]);

  const style = isMotionDisabled
    ? {}
    : {
        opacity,
        scale,
        pointerEvents,
        ...(blur ? { filter } : {}),
        willChange: 'transform, opacity',
      };

  return {
    ref: internalRef,
    scrollYProgress,
    opacity,
    scale,
    pointerEvents,
    filter,
    style,
    isMotionDisabled,
  };
}

/**
 * ScrollEliminate Component
 *
 * Wraps any section, card, text block, or image with a scroll-linked elimination effect:
 * - Fades out (1 -> 0)
 * - Scales down slightly (1 -> minScale)
 * - Sets pointer-events: none when out of view
 * - Reverses cleanly and smoothly when scrolling back up
 * - Fully optimized for iPhone Safari and PC/Desktop
 * - Respects prefers-reduced-motion
 */
export default function ScrollEliminate({
  children,
  className = '',
  preset = 'default',
  targetRef,
  offset,
  offsetMobile,
  progressRange,
  minScale,
  blur,
  disabled = false,
  as: Component = motion.div,
  ...restProps
}) {
  const config = ELIMINATION_PRESETS[preset] || ELIMINATION_PRESETS.default;

  const effectiveOffset = offset || config.offset;
  const effectiveOffsetMobile = offsetMobile || config.offsetMobile;
  const effectiveProgress = progressRange || config.progressRange;
  const effectiveMinScale = minScale ?? config.minScale;
  const effectiveBlur = blur ?? config.blur;

  const { ref, scrollYProgress, style, isMotionDisabled } = useScrollElimination({
    targetRef,
    offset: effectiveOffset,
    offsetMobile: effectiveOffsetMobile,
    progressRange: effectiveProgress,
    minScale: effectiveMinScale,
    blur: effectiveBlur,
    disabled,
  });

  if (isMotionDisabled) {
    return (
      <div className={className} {...restProps}>
        {children}
      </div>
    );
  }

  return (
    <ScrollEliminateContext.Provider value={{ scrollYProgress }}>
      <Component
        ref={targetRef ? undefined : ref}
        style={style}
        className={className}
        {...restProps}
      >
        {children}
      </Component>
    </ScrollEliminateContext.Provider>
  );
}

/**
 * ScrollLayer Component
 *
 * Use inside a ScrollEliminate container to give text or images a distinct elimination rate.
 * - rate="text": Fades out slightly earlier than the container (more layered depth)
 * - rate="image": Fades out slightly later than text, keeping crisp visual weight longer
 * - rate="fast": Rapid fade-out
 * - rate="slow": Delayed fade-out
 */
export function ScrollLayer({
  children,
  rate = 'text',
  className = '',
  as = motion.div,
  ...restProps
}) {
  const context = useContext(ScrollEliminateContext);
  const shouldReduceMotion = useReducedMotion();

  // If there's no parent ScrollEliminateContext or user prefers reduced motion, render without transform
  if (!context || shouldReduceMotion) {
    return (
      <div className={className} {...restProps}>
        {children}
      </div>
    );
  }

  return (
    <ScrollLayerInner
      scrollYProgress={context.scrollYProgress}
      rate={rate}
      className={className}
      as={as}
      {...restProps}
    >
      {children}
    </ScrollLayerInner>
  );
}

function ScrollLayerInner({
  scrollYProgress,
  rate,
  className,
  children,
  as: Component = motion.div,
  ...restProps
}) {
  const rateRanges = {
    text: [0, 0.65],
    image: [0.12, 0.94],
    fast: [0, 0.50],
    slow: [0.10, 0.98],
  };

  const [layerStart, layerEnd] = rateRanges[rate] || rateRanges.text;

  const opacity = useTransform(scrollYProgress, [0, layerStart, layerEnd], [1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, layerStart, layerEnd],
    [1, 1, rate === 'text' ? 0.96 : 0.93]
  );
  const pointerEvents = useTransform(scrollYProgress, (v) => (v >= layerEnd ? 'none' : 'auto'));

  return (
    <Component
      style={{
        opacity,
        scale,
        pointerEvents,
        willChange: 'transform, opacity',
      }}
      className={className}
      {...restProps}
    >
      {children}
    </Component>
  );
}
