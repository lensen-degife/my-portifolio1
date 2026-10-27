import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Premium scroll progress bar pinned to the top of the viewport.
 * Uses direct transform on mobile/touch devices for instant zero-lag response,
 * and smooth spring physics on desktop.
 */
export default function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const [isTouchOrMobile, setIsTouchOrMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.innerWidth < 768 ||
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)
    );
  });

  useEffect(() => {
    const check = () => {
      setIsTouchOrMobile(
        window.innerWidth < 768 ||
        window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)
      );
    };
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  const springScale = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 35,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none overflow-hidden bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-[#2C2C2A] via-[#8A857C] to-[#2C2C2A] dark:from-[#EEECE6] dark:via-[#B0ABA1] dark:to-[#EEECE6] shadow-[0_0_8px_rgba(138,133,124,0.4)] dark:shadow-[0_0_8px_rgba(176,171,161,0.3)] origin-left"
        style={{ scaleX: isTouchOrMobile ? scrollYProgress : springScale }}
      />
    </div>
  );
}
