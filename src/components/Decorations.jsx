import { motion, useReducedMotion } from 'framer-motion';

/**
 * Technical Grid Lines for CS student portfolio background.
 * Clean, subtle coordinate grid lines with major (176px) and minor (44px) divisions
 * in warm neutral stone tones (#E5E2DB / #C8C4BB).
 * Placed behind all section content and cards.
 */
export function GridLines({ className = '' }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none z-0 technical-grid-lines ${className}`}
      aria-hidden="true"
    />
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

const constellationNodes = [
  // Left cluster (framing portrait image)
  { id: 'l1', x: 100, y: 150 },
  { id: 'l2', x: 230, y: 90 },
  { id: 'l3', x: 380, y: 160 },
  { id: 'l4', x: 160, y: 290 },
  { id: 'l5', x: 70, y: 460 },
  { id: 'l6', x: 210, y: 520 },
  { id: 'l7', x: 320, y: 680 },
  { id: 'l8', x: 130, y: 740 },

  // Center subtle bridging nodes
  { id: 'c1', x: 520, y: 130 },
  { id: 'c2', x: 670, y: 210, highlight: true },
  { id: 'c3', x: 580, y: 380 },
  { id: 'c4', x: 730, y: 470 },

  // Right cluster (framing headline and bio text)
  { id: 'r1', x: 860, y: 160 },
  { id: 'r2', x: 1020, y: 110, highlight: true },
  { id: 'r3', x: 1180, y: 170 },
  { id: 'r4', x: 1340, y: 120 },
  { id: 'r5', x: 920, y: 320 },
  { id: 'r6', x: 1080, y: 340 },
  { id: 'r7', x: 1260, y: 280 },
  { id: 'r8', x: 1390, y: 370 },
  { id: 'r9', x: 850, y: 530 },
  { id: 'r10', x: 1010, y: 620, highlight: true },
  { id: 'r11', x: 1190, y: 560 },
  { id: 'r12', x: 1340, y: 670 },
  { id: 'r13', x: 1110, y: 760 },
];

const constellationEdges = [
  // Left cluster
  ['l1', 'l2'],
  ['l2', 'l3'],
  ['l1', 'l4'],
  ['l4', 'l6'],
  ['l4', 'l5'],
  ['l5', 'l6'],
  ['l6', 'l7'],
  ['l6', 'l8'],
  ['l7', 'l8', true],

  // Center bridge (subtle & sparse)
  ['l3', 'c1'],
  ['c1', 'c2'],
  ['c2', 'r1'],
  ['c2', 'c3'],
  ['c3', 'c4', true],
  ['c4', 'r9'],

  // Right cluster
  ['r1', 'r2'],
  ['r2', 'r3'],
  ['r3', 'r4'],
  ['r1', 'r5'],
  ['r2', 'r6'],
  ['r3', 'r7'],
  ['r4', 'r8'],
  ['r5', 'r6'],
  ['r6', 'r7'],
  ['r7', 'r8'],
  ['r5', 'r9'],
  ['r6', 'r10'],
  ['r10', 'r11'],
  ['r7', 'r11'],
  ['r11', 'r12'],
  ['r10', 'r13', true],
  ['r13', 'r12'],
];

const nodeMap = constellationNodes.reduce((acc, node) => {
  acc[node.id] = node;
  return acc;
}, {});

/**
 * Soft Constellation / Graph Network background for the Hero section.
 * Thin connected lines (stroke ~0.28) with small dots at connection points (fill ~0.40).
 * Animates with a gentle slow drift behind photo and text content.
 */
export function HeroConstellation({ className = '' }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={
        shouldReduceMotion
          ? false
          : {
              y: [-6, 6, -6],
              x: [-3, 3, -3],
            }
      }
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-60 sm:opacity-100 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full text-[#C8C4BB] dark:text-[#42403B]"
      >
        {/* Connected Constellation Lines */}
        <g>
          {constellationEdges.map(([fromId, toId, isDashed], idx) => {
            const from = nodeMap[fromId];
            const to = nodeMap[toId];
            if (!from || !to) return null;
            return (
              <line
                key={`edge-${idx}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="currentColor"
                strokeWidth="1.2"
                strokeOpacity={isDashed ? '0.22' : '0.28'}
                strokeDasharray={isDashed ? '4 4' : undefined}
              />
            );
          })}
        </g>

        {/* Small Dots at Connection Points */}
        <g>
          {constellationNodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r="2.5"
                fill="currentColor"
                fillOpacity="0.40"
              />
              {node.highlight && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="5.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeOpacity="0.25"
                />
              )}
            </g>
          ))}
        </g>
      </svg>
    </motion.div>
  );
}

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
      className={`absolute pointer-events-none z-0 text-[#C8C4BB] dark:text-[#42403B] ${defaultPosition} ${transformClass} ${className}`}
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
          <circle cx="150" cy="140" r="3.5" fill="currentColor" />
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
          <circle cx="160" cy="50" r="3.5" fill="currentColor" />
          <circle cx="100" cy="110" r="3" fill="currentColor" />
          <circle cx="140" cy="150" r="3.5" fill="currentColor" />
          <circle cx="180" cy="150" r="3.5" fill="currentColor" />
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
