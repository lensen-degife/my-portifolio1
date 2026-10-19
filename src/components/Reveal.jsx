import { motion, useReducedMotion } from 'framer-motion';

/**
 * Reusable Reveal component for scroll-triggered entrance animations.
 * Provides consistent easing, directional reveals, staggered delays,
 * and automatic accessibility compliance for prefers-reduced-motion.
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.65,
  distance = 28,
  scale = 1,
  className = '',
  width = 'full',
  once = false,
  amount = 0.15,
}) {
  const shouldReduceMotion = useReducedMotion();

  // If the user prefers reduced motion, render without movement
  if (shouldReduceMotion) {
    return <div className={`${width === 'full' ? 'w-full' : ''} ${className}`}>{children}</div>;
  }

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const initial = {
    opacity: 0,
    scale: scale !== 1 ? scale : 1,
    ...getInitialPosition(),
  };

  const visible = {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1], // Smooth cubic bezier
    },
  };

  return (
    <motion.div
      initial={initial}
      whileInView={visible}
      viewport={{ once, amount }}
      className={`${width === 'full' ? 'w-full' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
