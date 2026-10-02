import { motion } from 'framer-motion';

export default function SectionHeading({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center mb-12 md:mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          {subtitle}
        </p>
      )}
      <div className="mt-4 w-20 h-1 bg-indigo-500 mx-auto rounded-full" />
    </motion.div>
  );
}
