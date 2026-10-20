import { motion, useReducedMotion } from 'framer-motion';

export default function SectionHeading({ title, subtitle, icon: Icon, badge }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="text-center mb-10 sm:mb-12 md:mb-16 relative z-10 flex flex-col items-center">
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 dark:bg-white/[0.05] border border-purple-200 dark:border-white/10 backdrop-blur-md shadow-sm mb-4">
            {Icon && <Icon size={14} className="text-purple-600 dark:text-purple-300" />}
            <span className="text-xs uppercase tracking-widest font-semibold text-purple-700 dark:text-purple-300">
              {badge}
            </span>
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-light leading-relaxed px-2">
            {subtitle}
          </p>
        )}
        <div className="mt-4 w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto rounded-full" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: false, amount: 0.2 }}
      className="text-center mb-10 sm:mb-12 md:mb-16 relative z-10 flex flex-col items-center"
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 dark:bg-white/[0.05] border border-purple-200 dark:border-white/10 backdrop-blur-md shadow-sm mb-4"
        >
          {Icon && <Icon size={14} className="text-purple-600 dark:text-purple-300 animate-pulse" />}
          <span className="text-xs uppercase tracking-widest font-semibold text-purple-700 dark:text-purple-300">
            {badge}
          </span>
        </motion.div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.2 }}
          className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-light leading-relaxed px-2"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: false, amount: 0.2 }}
        className="mt-4 w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto rounded-full origin-center"
      />
    </motion.div>
  );
}

