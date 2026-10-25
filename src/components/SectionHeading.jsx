import { motion, useReducedMotion } from 'framer-motion';

export default function SectionHeading({ title, subtitle, icon: Icon, badge }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="text-center mb-10 sm:mb-12 md:mb-16 relative z-10 flex flex-col items-center">
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEECE6] dark:bg-[#292825] border border-[#E5E2DB] dark:border-[#383632] shadow-xs mb-4">
            {Icon && <Icon size={14} className="text-[#8A857C] dark:text-[#B0ABA1]" />}
            <span className="text-xs uppercase tracking-widest font-semibold text-[#2C2C2A] dark:text-[#EEECE6]">
              {badge}
            </span>
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1A1A18] dark:text-[#FAF9F6] mb-3 sm:mb-4 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[#5C5A55] dark:text-[#A8A49C] max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-light leading-relaxed px-2">
            {subtitle}
          </p>
        )}
        <div className="mt-4 w-20 h-1 bg-[#8A857C] dark:bg-[#B0ABA1] mx-auto rounded-full" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.05 }}
      className="text-center mb-10 sm:mb-12 md:mb-16 relative z-10 flex flex-col items-center"
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.05 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEECE6] dark:bg-[#292825] border border-[#E5E2DB] dark:border-[#383632] shadow-xs mb-4"
        >
          {Icon && <Icon size={14} className="text-[#8A857C] dark:text-[#B0ABA1] animate-pulse" />}
          <span className="text-xs uppercase tracking-widest font-semibold text-[#2C2C2A] dark:text-[#EEECE6]">
            {badge}
          </span>
        </motion.div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1A1A18] dark:text-[#FAF9F6] mb-3 sm:mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.05 }}
          className="text-[#5C5A55] dark:text-[#A8A49C] max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-light leading-relaxed px-2"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.2, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.05 }}
        className="mt-4 w-20 h-1 bg-[#8A857C] dark:bg-[#B0ABA1] mx-auto rounded-full origin-center"
      />
    </motion.div>
  );
}
