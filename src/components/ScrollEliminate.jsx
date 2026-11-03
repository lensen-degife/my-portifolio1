import { useRef, useContext, useEffect, useLayoutEffect } from 'react';
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import {
  ScrollEliminateContext,
  ELIMINATION_PRESETS,
  LAYER_DEPTH_CONFIG,
} from './scrollEliminateConfig';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Global Scroll and Viewport Manager
 * Coordinates scroll & resize updates across all Depth Exit instances
 * using a single passive event listener batch-scheduled via requestAnimationFrame.
 * Guarantees 60/120fps fluid tracking on iPhone (Safari) and PC/Desktop without layout thrashing.
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
  if (window.__lenis) {
    try {
      window.__lenis.on('scroll', scheduleTick);
    } catch {
      // safe fallback
    }
  }
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
 * Computes exact scroll progress (0.0 -> 1.0) from live viewport bounding client rect.
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

  // yStart: rect.top at which exit progress begins (0.0)
  const yStart = startContainerY - startTargetOffset;
  // yEnd: rect.top at which exit progress completes (1.0)
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
 * Computes smooth, continuous Depth Exit motion values:
 * - Opacity: 1 -> 0
 * - Scale: 1 -> minScale (e.g. 0.90 - 0.92)
 * - 3D Depth (Z): 0 -> depthZ (e.g. -60px to -80px)
 * - Vertical Sink (Y): 0 -> depthY (e.g. +10px to +16px)
 * - PointerEvents: 'auto' -> 'none'
 */
function useScrollElimination({
  targetRef,
  preset = 'default',
  offset,
  offsetMobile,
  progressRange,
  minScale,
  depthZ,
  depthY,
  depthRotateX,
  transformPerspective = 1000,
  blur = false,
  disabled = false,
} = {}) {
  const shouldReduceMotion = useReducedMotion();
  const internalRef = useRef(null);
  const activeRef = targetRef || internalRef;

  const config = ELIMINATION_PRESETS[preset] || ELIMINATION_PRESETS.default;

  const effectiveOffset = offset || config.offset;
  const effectiveOffsetMobile = offsetMobile || config.offsetMobile;
  const effectiveProgress = progressRange || config.progressRange;
  const effectiveMinScale = minScale ?? config.minScale ?? 0.91;
  const effectiveDepthZ = depthZ ?? config.depthZ ?? -60;
  const effectiveDepthY = depthY ?? config.depthY ?? 12;
  const effectiveDepthRotateX = depthRotateX ?? config.depthRotateX ?? 6;
  const effectiveBlur = blur ?? config.blur;

  // Use MotionValue to drive hardware-accelerated animations without React re-renders
  const scrollYProgress = useMotionValue(0);

  const [fadeStart, fadeEnd] = effectiveProgress;

  // Smooth continuous fade-out: 1 -> 0
  const opacity = useTransform(
    scrollYProgress,
    [0, fadeStart, fadeEnd],
    [1, 1, 0]
  );

  // Smooth continuous scale down: 1 -> minScale (e.g. 0.91)
  const scale = useTransform(
    scrollYProgress,
    [0, fadeStart, fadeEnd],
    [1, 1, effectiveMinScale]
  );

  // Smooth 3D spatial pushback into depth: 0 -> depthZ (e.g. -60px)
  const z = useTransform(
    scrollYProgress,
    [0, fadeStart, fadeEnd],
    [0, 0, effectiveDepthZ]
  );

  // Smooth gentle vertical sinking motion: 0 -> depthY (e.g. +12px)
  const y = useTransform(
    scrollYProgress,
    [0, fadeStart, fadeEnd],
    [0, 0, effectiveDepthY]
  );

  // Smooth subtle 3D backward tilt: 0 -> depthRotateX (e.g. 6deg)
  const rotateX = useTransform(
    scrollYProgress,
    [0, fadeStart, fadeEnd],
    [0, 0, effectiveDepthRotateX]
  );

  // Disable pointer events when fully eliminated (opacity 0)
  const pointerEvents = useTransform(scrollYProgress, (progress) => {
    return progress >= fadeEnd ? 'none' : 'auto';
  });

  // Optional subtle blur filter
  const filter = useTransform(
    scrollYProgress,
    [0, fadeStart, fadeEnd],
    ['blur(0px)', 'blur(0px)', typeof effectiveBlur === 'string' ? `blur(${effectiveBlur})` : 'blur(4px)']
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

      const activeOffset = (isMobile && effectiveOffsetMobile) ? effectiveOffsetMobile : effectiveOffset;
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
  }, [activeRef, effectiveOffset, effectiveOffsetMobile, isMotionDisabled]);

  const style = isMotionDisabled
    ? {}
    : {
        opacity,
        scale,
        z,
        y,
        rotateX,
        transformPerspective,
        transformOrigin: 'center top',
        pointerEvents,
        ...(effectiveBlur ? { filter } : {}),
        willChange: 'transform, opacity',
      };

  return {
    ref: internalRef,
    scrollYProgress,
    opacity,
    scale,
    z,
    y,
    rotateX,
    pointerEvents,
    filter,
    style,
    isMotionDisabled,
  };
}

/**
 * ScrollEliminate Component (Depth Exit)
 *
 * Wraps any section, card, text block, or image with a smooth 3D Depth Exit:
 * - Gradually fades out (opacity 1 -> 0)
 * - Slightly scales down (1 -> 0.90 / 0.92)
 * - Moves backward in space (translateZ: -60px to -80px)
 * - Gently sinks into the background plane (translateY: +10px to +16px)
 * - Subtle backward tilt (rotateX: 4deg to 8deg)
 * - Reverses cleanly and smoothly when scrolling back up
 * - Fully hardware-accelerated for 60/120fps on iPhone (Safari) and PC/Desktop
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
  depthZ,
  depthY,
  depthRotateX,
  transformPerspective = 1000,
  blur,
  disabled = false,
  as: Component = motion.div,
  ...restProps
}) {
  const { ref, scrollYProgress, style, isMotionDisabled } = useScrollElimination({
    targetRef,
    preset,
    offset,
    offsetMobile,
    progressRange,
    minScale,
    depthZ,
    depthY,
    depthRotateX,
    transformPerspective,
    blur,
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
 * ScrollLayer Component (Depth Exit Layer)
 *
 * Use inside a ScrollEliminate container to give text or images a distinct layered depth exit:
 * - rate="text": Dissolves slightly earlier with a lighter spatial depth pushback
 * - rate="image": Holds crispness longer with deeper spatial pushback, creating tactile parallax
 * - rate="fast": Rapid depth exit
 * - rate="slow": Delayed depth exit
 */
export function ScrollLayer({
  children,
  rate = 'text',
  className = '',
  progressRange,
  minScale,
  depthZ,
  depthY,
  depthRotateX,
  transformPerspective = 1000,
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
      progressRange={progressRange}
      minScale={minScale}
      depthZ={depthZ}
      depthY={depthY}
      depthRotateX={depthRotateX}
      transformPerspective={transformPerspective}
      as={as}
      {...restProps}
    >
      {children}
    </ScrollLayerInner>
  );
}

function ScrollLayerInner({
  scrollYProgress,
  rate = 'text',
  className = '',
  progressRange,
  minScale,
  depthZ,
  depthY,
  depthRotateX,
  transformPerspective = 1000,
  children,
  as: Component = motion.div,
  ...restProps
}) {
  const layerConfig = LAYER_DEPTH_CONFIG[rate] || LAYER_DEPTH_CONFIG.text;

  const effectiveProgress = progressRange || layerConfig.progressRange;
  const effectiveMinScale = minScale ?? layerConfig.minScale ?? 0.94;
  const effectiveDepthZ = depthZ ?? layerConfig.depthZ ?? -40;
  const effectiveDepthY = depthY ?? layerConfig.depthY ?? 8;
  const effectiveDepthRotateX = depthRotateX ?? layerConfig.depthRotateX ?? 4;

  const [lStart, lEnd] = effectiveProgress;

  // Layered continuous fade, scale, and 3D pushback
  const opacity = useTransform(scrollYProgress, [0, lStart, lEnd], [1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, lStart, lEnd],
    [1, 1, effectiveMinScale]
  );
  const z = useTransform(
    scrollYProgress,
    [0, lStart, lEnd],
    [0, 0, effectiveDepthZ]
  );
  const y = useTransform(
    scrollYProgress,
    [0, lStart, lEnd],
    [0, 0, effectiveDepthY]
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, lStart, lEnd],
    [0, 0, effectiveDepthRotateX]
  );
  const pointerEvents = useTransform(scrollYProgress, (progress) =>
    progress >= lEnd ? 'none' : 'auto'
  );

  return (
    <Component
      style={{
        opacity,
        scale,
        z,
        y,
        rotateX,
        transformPerspective,
        transformOrigin: 'center top',
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
