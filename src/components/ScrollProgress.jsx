import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Premium scroll progress bar pinned to the top of the viewport.
 * Uses spring physics for fluid movement without blocking scroll performance.
 */
export default function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 35,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none overflow-hidden bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.7)] origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}
