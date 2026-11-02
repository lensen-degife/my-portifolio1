import { useRef, useContext } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ScrollEliminateContext, ELIMINATION_PRESETS } from './scrollEliminateConfig';

/**
 * Custom Hook: useScrollElimination
 * Computes opacity, scale, pointerEvents, and optional blur based on scroll progress.
 */
function useScrollElimination({
  targetRef,
  offset,
  progressRange,
  minScale = 0.94,
  blur = false,
  disabled = false,
} = {}) {
  const shouldReduceMotion = useReducedMotion();
  const internalRef = useRef(null);
  const activeRef = targetRef || internalRef;

  const { scrollYProgress } = useScroll({
    target: activeRef,
    offset: offset || ['start 0.16', 'end 0.02'],
  });

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
 * - Respects prefers-reduced-motion
 */
export default function ScrollEliminate({
  children,
  className = '',
  preset = 'default',
  targetRef,
  offset,
  progressRange,
  minScale,
  blur,
  disabled = false,
  as: Component = motion.div,
  ...restProps
}) {
  const config = ELIMINATION_PRESETS[preset] || ELIMINATION_PRESETS.default;

  const effectiveOffset = offset || config.offset;
  const effectiveProgress = progressRange || config.progressRange;
  const effectiveMinScale = minScale ?? config.minScale;
  const effectiveBlur = blur ?? config.blur;

  const { ref, scrollYProgress, style, isMotionDisabled } = useScrollElimination({
    targetRef,
    offset: effectiveOffset,
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
