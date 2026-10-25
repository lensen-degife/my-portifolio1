import { motion, useReducedMotion } from 'framer-motion';
import MatrixRain from './MatrixRain';

export { MatrixRain };

/**
 * Technical Arched Grid Lines with Matrix Digital Rain for background.
 * Subtle arched coordinate grid lines with major (176px) and minor (44px) divisions
 * layered with ambient code matrix rain that falls from top to bottom with an impact boom.
 */
export function GridLines({ className = '', showRain = true }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 technical-grid-lines" />
      {showRain && <MatrixRain />}
    </div>
  );
}

/**
 * Faint Dot Grid / Grid Lines for technical CS student portfolio.
 * Evenly spaced grid lines with subtle division in clean warm stone (#E5E2DB tone).
 * Placed behind section content and not on top of cards.
 */
export function DotGrid({ className = '' }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none z-0 technical-grid-lines ${className}`}
      aria-hidden="true"
    />
  );
}

export function HeroConstellation() {
  return null;
}

export function NetworkLines() {
  return null;
}

/**
 * Floating 4-Point Geometric Diamond Star with smooth breathing animation.
 */
export function FloatingDiamond({
  className = '',
  size = 'md',
  duration = 4,
  delay = 0,
}) {
  const shouldReduceMotion = useReducedMotion();

  const sizeClasses = {
    sm: 'w-7 h-7 sm:w-9 sm:h-9',
    md: 'w-8 h-8 sm:w-11 sm:h-11 md:w-14 md:h-14',
    lg: 'w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20',
  }[size] || size;

  return (
    <motion.div
      animate={
        shouldReduceMotion
          ? false
          : {
              scale: [1, 1.15, 1],
              opacity: [0.65, 1, 0.65],
              rotate: [0, 8, 0],
            }
      }
      transition={{ repeat: Infinity, duration, delay, ease: 'easeInOut' }}
      className={`absolute pointer-events-none z-10 ${sizeClasses} ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-[#C8C4BB] dark:text-[#42403B] drop-shadow-[0_0_8px_rgba(200,196,187,0.4)] dark:drop-shadow-[0_0_8px_rgba(66,64,59,0.4)]"
      >
        <path
          d="M12 0C12 0 12 9 24 12C24 12 13 13 12 24C12 24 11 13 0 12C0 12 11 11 12 0Z"
          fill="currentColor"
          className="opacity-80"
        />
      </svg>
    </motion.div>
  );
}

/**
 * Floating Hollow Ring with glassmorphic border and smooth hovering drift.
 */
export function FloatingRing({
  className = '',
  size = 'md',
  duration = 6,
  delay = 0,
}) {
  const shouldReduceMotion = useReducedMotion();

  const sizeClasses = {
    sm: 'w-6 h-6 sm:w-8 sm:h-8 border-[3.5px] sm:border-4',
    md: 'w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 border-4 sm:border-[6px]',
    lg: 'w-9 h-9 sm:w-12 sm:h-12 md:w-16 md:h-16 border-[5px] sm:border-[8px]',
  }[size] || size;

  return (
    <motion.div
      animate={
        shouldReduceMotion
          ? false
          : {
              y: [-10, 10, -10],
              rotate: [0, 90, 0],
            }
      }
      transition={{ repeat: Infinity, duration, delay, ease: 'easeInOut' }}
      className={`absolute rounded-full border-[#C8C4BB] dark:border-[#42403B] shadow-[0_0_12px_rgba(200,196,187,0.3)] dark:shadow-[0_0_12px_rgba(66,64,59,0.3)] pointer-events-none z-10 ${sizeClasses} ${className}`}
    />
  );
}

/**
 * Modern Sparkling Star (4-Point sparkle) with twinkling scale & glow.
 */
export function SparkleStar({
  className = '',
  size = 'md',
  duration = 3,
  delay = 0,
}) {
  const shouldReduceMotion = useReducedMotion();

  const sizeClasses = {
    sm: 'w-4 h-4 sm:w-5 sm:h-5',
    md: 'w-5 h-5 sm:w-6 sm:h-6',
    lg: 'w-6 h-6 sm:w-8 sm:h-8',
  }[size] || size;

  return (
    <motion.div
      animate={
        shouldReduceMotion
          ? false
          : {
              scale: [0.85, 1.25, 0.85],
              opacity: [0.4, 0.95, 0.4],
              rotate: [0, 45, 0],
            }
      }
      transition={{ repeat: Infinity, duration, delay, ease: 'easeInOut' }}
      className={`absolute pointer-events-none z-10 text-[#C8C4BB] dark:text-[#42403B] drop-shadow-[0_0_6px_rgba(200,196,187,0.4)] dark:drop-shadow-[0_0_6px_rgba(66,64,59,0.4)] ${sizeClasses} ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path d="M12 0L14.4 8.6L23 11L14.4 13.4L12 22L9.6 13.4L1 11L9.6 8.6L12 0Z" />
      </svg>
    </motion.div>
  );
}
