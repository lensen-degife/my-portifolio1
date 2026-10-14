import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme, isTransitioning } = useTheme();

  const handleToggle = (e) => {
    if (isTransitioning) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const coords = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    toggleTheme(coords);
  };

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      disabled={isTransitioning}
      className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden ${
        theme === 'dark'
          ? 'text-purple-300 hover:text-white bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 hover:border-purple-400/60 hover:shadow-[0_0_14px_rgba(168,85,247,0.45)]'
          : 'text-amber-600 hover:text-amber-700 bg-amber-100/70 hover:bg-amber-200/80 border border-amber-300/70 hover:border-amber-400 hover:shadow-[0_0_14px_rgba(245,158,11,0.4)]'
      }`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.div
            key="moon"
            initial={{ rotate: -85, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 85, scale: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
          >
            <Moon
              size={16}
              className="fill-purple-300/20 text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]"
            />
            {/* Twinkling celestial star sparkle */}
            <span className="absolute -top-1.5 -right-1 text-[8px] text-purple-300 animate-pulse pointer-events-none select-none">
              ✦
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 85, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -85, scale: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
          >
            <Sun
              size={16}
              className="fill-amber-400/25 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.7)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
