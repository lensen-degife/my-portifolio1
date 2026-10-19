import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 10 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          whileHover={shouldReduceMotion ? false : { scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 p-2.5 sm:p-3.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white border border-purple-500/40 shadow-xl shadow-purple-600/20 dark:shadow-black/50 hover:shadow-purple-600/30 transition-all duration-200 cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp size={20} className="text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
