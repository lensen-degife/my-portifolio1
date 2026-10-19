import { motion, useReducedMotion } from 'framer-motion';

/**
 * Modern Tech Network Lines SVG with connected nodes and circuit traces.
 */
export function NetworkLines({
  position = 'top-left',
  variant = 'corner',
  className = '',
  delay = 0,
}) {
  const shouldReduceMotion = useReducedMotion();

  let transformClass = '';
  let defaultPosition = '';

  if (position === 'top-left') {
    defaultPosition = 'top-0 left-0';
  } else if (position === 'top-right') {
    defaultPosition = 'top-0 right-0';
    transformClass = 'transform rotate-90';
  } else if (position === 'bottom-left') {
    defaultPosition = 'bottom-0 left-0';
    transformClass = 'transform -rotate-90';
  } else if (position === 'bottom-right') {
    defaultPosition = 'bottom-0 right-0';
    transformClass = 'transform rotate-180';
  }

  return (
    <motion.svg
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute pointer-events-none z-0 text-purple-600/15 dark:text-white/10 ${defaultPosition} ${transformClass} ${className}`}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === 'corner' && (
        <>
          <path d="M0 0L50 50L20 100L0 80" stroke="currentColor" strokeWidth="1.5" />
          <path d="M50 50L120 20L150 0" stroke="currentColor" strokeWidth="1.5" />
          <path d="M50 50L100 90L180 80" stroke="currentColor" strokeWidth="1.5" />
          <path d="M100 90L70 140L120 170" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-70" />
          <circle cx="50" cy="50" r="3.5" fill="currentColor" />
          <circle cx="20" cy="100" r="3" fill="currentColor" />
          <circle cx="120" cy="20" r="3" fill="currentColor" />
          <circle cx="100" cy="90" r="3.5" fill="currentColor" />
          <circle cx="180" cy="80" r="3" fill="currentColor" />
          <circle cx="70" cy="140" r="2.5" fill="currentColor" />
          <circle cx="120" cy="170" r="3" fill="currentColor" />
        </>
      )}

      {variant === 'branch' && (
        <>
          <path d="M10 100 L60 70 L120 95 L170 50 L195 20" stroke="currentColor" strokeWidth="1.5" />
          <path d="M60 70 L80 140 L40 170" stroke="currentColor" strokeWidth="1.5" />
          <path d="M120 95 L150 140 L190 150" stroke="currentColor" strokeWidth="1.5" />
          <path d="M80 140 L130 170 H180" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="opacity-70" />
          <circle cx="10" cy="100" r="3" fill="currentColor" />
          <circle cx="60" cy="70" r="3.5" fill="currentColor" />
          <circle cx="120" cy="95" r="3.5" fill="currentColor" />
          <circle cx="170" cy="50" r="3" fill="currentColor" />
          <circle cx="80" cy="140" r="3.5" fill="currentColor" />
          <circle cx="40" cy="170" r="3" fill="currentColor" />
          <circle cx="150" cy="140" r="3" fill="currentColor" />
          <circle cx="190" cy="150" r="3" fill="currentColor" />
          <circle cx="130" cy="170" r="2.5" fill="currentColor" />
        </>
      )}

      {variant === 'matrix' && (
        <>
          <path d="M20 20 H70 L100 50 V110 L140 150 H180" stroke="currentColor" strokeWidth="1.5" />
          <path d="M100 50 H160 L180 70" stroke="currentColor" strokeWidth="1.5" />
          <path d="M70 20 V80 L40 110 H10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-60" />
          <circle cx="20" cy="20" r="3" fill="currentColor" />
          <circle cx="70" cy="20" r="3" fill="currentColor" />
          <circle cx="100" cy="50" r="3.5" fill="currentColor" />
          <circle cx="160" cy="50" r="3" fill="currentColor" />
          <circle cx="100" cy="110" r="3" fill="currentColor" />
          <circle cx="140" cy="150" r="3.5" fill="currentColor" />
          <circle cx="180" cy="150" r="3" fill="currentColor" />
        </>
      )}
    </motion.svg>
  );
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
        className="w-full h-full text-purple-600/50 dark:text-white drop-shadow-[0_0_12px_rgba(168,85,247,0.35)]"
      >
        <path
          d="M12 0C12 0 12 9 24 12C24 12 13 13 12 24C12 24 11 13 0 12C0 12 11 11 12 0Z"
          fill="currentColor"
          className="opacity-75 dark:opacity-95"
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
      className={`absolute rounded-full border-purple-500/40 dark:border-white/80 shadow-[0_0_15px_rgba(147,51,234,0.18)] dark:shadow-[0_0_18px_rgba(255,255,255,0.28)] pointer-events-none z-10 ${sizeClasses} ${className}`}
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
      className={`absolute pointer-events-none z-10 text-purple-600 dark:text-purple-300 drop-shadow-[0_0_10px_rgba(192,132,252,0.7)] dark:drop-shadow-[0_0_6px_rgba(192,132,252,0.3)] ${sizeClasses} ${className}`}
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
