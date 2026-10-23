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
      className="relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden bg-[#EEECE6] hover:bg-[#E5E2DB] border border-[#E5E2DB] text-[#2C2C2A] hover:text-[#1A1A18] dark:bg-[#292825] dark:hover:bg-[#383632] dark:border-[#383632] dark:text-[#EEECE6] dark:hover:text-[#FAF9F6] shadow-xs"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.div
            key="sun"
            initial={{ rotate: -85, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 85, scale: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
          >
            <Sun
              size={16}
              className="text-[#EEECE6]"
            />
            {/* Twinkling sparkle */}
            <span className="absolute -top-1.5 -right-1 text-[8px] text-[#B0ABA1] animate-pulse pointer-events-none select-none">
              ✦
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 85, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -85, scale: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
          >
            <Moon
              size={16}
              className="text-[#2C2C2A]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
