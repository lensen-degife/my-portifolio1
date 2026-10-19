import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeDropEffect({ dropletState }) {
  if (!dropletState || typeof document === 'undefined') return null;

  const { x, y, targetTheme, stage } = dropletState;
  const isGoingLight = targetTheme === 'light';

  // Calculate viewport coverage radius for fallback mode
  const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const height = typeof window !== 'undefined' ? window.innerHeight : 800;
  const maxDistance = Math.max(
    Math.hypot(x, y),
    Math.hypot(width - x, y),
    Math.hypot(x, height - y),
    Math.hypot(width - x, height - y)
  );
  const finalRadius = Math.ceil(maxDistance * 1.35);

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden">
      {/* 1. Droplet falling from above the top edge */}
      <AnimatePresence>
        {stage === 'dropping' && (
          <motion.div
            key="droplet"
            initial={{ y: -50, scaleY: 1.6, scaleX: 0.65, opacity: 0.2 }}
            animate={{
              y: y - 14,
              scaleY: [1.6, 1.25, 0.95],
              scaleX: [0.65, 0.85, 1.1],
              opacity: [0.2, 1, 1],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: [0.45, 0, 0.7, 0.2], // Gravity acceleration
            }}
            style={{
              position: 'fixed',
              left: x - 12,
              top: 0,
            }}
            className="pointer-events-none"
          >
            <svg
              width="24"
              height="28"
              viewBox="0 0 24 28"
              fill="none"
              style={{
                filter: isGoingLight
                  ? 'drop-shadow(0 0 14px rgba(251, 191, 36, 0.95)) drop-shadow(0 0 6px #ffffff)'
                  : 'drop-shadow(0 0 14px rgba(168, 85, 247, 0.95)) drop-shadow(0 0 6px #c084fc)',
              }}
            >
              <path
                d="M12 1.5 C12 1.5 3 13 3 19 C3 24 7 27 12 27 C17 27 21 24 21 19 C21 13 12 1.5 12 1.5 Z"
                fill={isGoingLight ? 'url(#sunDropGrad)' : 'url(#moonDropGrad)'}
              />
              <defs>
                {isGoingLight ? (
                  <linearGradient id="sunDropGrad" x1="12" y1="2" x2="12" y2="27" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffffff" />
                    <stop offset="0.45" stopColor="#fef08a" />
                    <stop offset="1" stopColor="#f59e0b" />
                  </linearGradient>
                ) : (
                  <linearGradient id="moonDropGrad" x1="12" y1="2" x2="12" y2="27" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f3e8ff" />
                    <stop offset="0.45" stopColor="#c084fc" />
                    <stop offset="1" stopColor="#4c1d95" />
                  </linearGradient>
                )}
              </defs>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Impact Splash & Ripple Rings at the toggle */}
      <AnimatePresence>
        {(stage === 'splashing' || stage === 'fallback-cascade') && (
          <>
            {/* Primary expanding ripple */}
            <motion.div
              key="ripple-1"
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: 3.2, opacity: 0 }}
              transition={{ duration: 0.48, ease: 'easeOut' }}
              style={{
                position: 'fixed',
                left: x - 20,
                top: y - 20,
                width: 40,
                height: 40,
                borderRadius: '9999px',
                border: isGoingLight
                  ? '2.5px solid rgba(251, 191, 36, 0.9)'
                  : '2.5px solid rgba(192, 132, 252, 0.9)',
                boxShadow: isGoingLight
                  ? '0 0 24px rgba(251, 191, 36, 0.8), inset 0 0 14px rgba(251, 191, 36, 0.4)'
                  : '0 0 24px rgba(168, 85, 247, 0.8), inset 0 0 14px rgba(168, 85, 247, 0.4)',
              }}
            />

            {/* Ambient radial wave */}
            <motion.div
              key="ripple-2"
              initial={{ scale: 0.1, opacity: 0.85 }}
              animate={{ scale: 4.8, opacity: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              style={{
                position: 'fixed',
                left: x - 25,
                top: y - 25,
                width: 50,
                height: 50,
                borderRadius: '9999px',
                background: isGoingLight
                  ? 'radial-gradient(circle, rgba(254, 240, 138, 0.7) 0%, rgba(245, 158, 11, 0.25) 50%, transparent 100%)'
                  : 'radial-gradient(circle, rgba(216, 180, 254, 0.7) 0%, rgba(147, 51, 234, 0.25) 50%, transparent 100%)',
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* 3. Fallback Drop Cascade for browsers without View Transition support (e.g., Firefox) */}
      <AnimatePresence>
        {stage === 'fallback-cascade' && (
          <motion.div
            key="fallback-drop"
            initial={{
              clipPath: `ellipse(0px 0px at ${x}px -25px)`,
              opacity: 1,
            }}
            animate={{
              clipPath: [
                `ellipse(0px 0px at ${x}px -25px)`,
                `ellipse(${finalRadius * 0.22}px ${finalRadius * 0.48}px at ${x}px ${y + 40}px)`,
                `ellipse(${finalRadius * 0.7}px ${finalRadius * 0.95}px at ${x}px ${y + 80}px)`,
                `ellipse(${finalRadius}px ${finalRadius}px at ${x}px ${y}px)`,
              ],
              opacity: [1, 1, 1, 0],
            }}
            transition={{
              duration: 0.75,
              times: [0, 0.35, 0.7, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`fixed inset-0 pointer-events-none z-[99998] ${
              isGoingLight ? 'bg-slate-50' : 'bg-[#030305]'
            }`}
          />
        )}
      </AnimatePresence>
    </div>,
    document.body
  );
}
