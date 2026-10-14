import { motion } from 'framer-motion';

export default function SectionHeading({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center mb-10 sm:mb-12 md:mb-16 relative z-10"
    >
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-light leading-relaxed px-2">
          {subtitle}
        </p>
      )}
      <div className="mt-4 w-20 h-1 bg-gradient-to-r from-purple-500 to-[#311166] mx-auto rounded-full" />
    </motion.div>
  );
}
