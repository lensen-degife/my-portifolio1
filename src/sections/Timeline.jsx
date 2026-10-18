import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap, Calendar, Sparkles } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const timelineItems = [
  {
    title: 'B.Sc. in Computer Science',
    organization: 'Addis Ababa University',
    period: '2024 — Present (3rd Year)',
    description:
      'Pursuing an in-depth computer science curriculum covering data structures, algorithms, operating systems, database management, software engineering, and web systems development.',
    icon: GraduationCap,
  },
];

export default function Timeline() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="timeline"
      className="relative w-full py-24 md:py-32 bg-slate-50 dark:bg-[#070214] overflow-hidden text-slate-800 dark:text-slate-200 transition-colors duration-300"
    >
      {/* Background glow with subtle breathing */}
      <motion.div
        animate={
          shouldReduceMotion
            ? false
            : { scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }
        }
        transition={{ repeat: Infinity, duration: 8.5, ease: 'easeInOut' }}
        className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-purple-200/50 dark:bg-[#290a59] rounded-full blur-[120px] -translate-x-1/4 pointer-events-none transition-colors duration-300"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <SectionHeading
          title="Education & Journey"
          subtitle="Academic milestones shaping my engineering fundamentals"
        />

        <div className="relative">
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative pl-9 sm:pl-12 pb-8 sm:pb-10 last:pb-0"
            >
              {/* Timeline dot */}
              <motion.div
                initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
                className="absolute left-0 top-1 w-8 h-8 sm:w-9 sm:h-9 bg-purple-600 dark:bg-[#311166] rounded-full flex items-center justify-center border-2 border-purple-400 shadow-md shadow-purple-600/20 dark:shadow-[0_0_15px_rgba(49,17,102,0.8)]"
              >
                <item.icon
                  size={15}
                  className="text-white"
                />
              </motion.div>

              {/* Content card */}
              <motion.div
                whileHover={shouldReduceMotion ? false : { y: -4, scale: 1.01 }}
                transition={{ duration: 0.25 }}
                className="bg-white/80 dark:bg-[#1d0642]/10 backdrop-blur-md rounded-2xl border border-purple-100 dark:border-purple-500/20 p-4 sm:p-8 hover:border-purple-300 dark:hover:border-purple-400/50 shadow-xl shadow-purple-500/5 hover:shadow-purple-500/10 dark:hover:shadow-[0_0_25px_rgba(49,17,102,0.3)] transition-all duration-300"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-purple-50 dark:bg-white/5 border border-purple-200 dark:border-purple-500/30 text-[11px] sm:text-xs font-medium text-purple-700 dark:text-purple-300">
                    <Calendar size={12} />
                    {item.period}
                  </div>
                </div>

                <p className="text-purple-700 dark:text-purple-300 font-medium text-sm sm:text-base mb-2.5 sm:mb-3 flex items-center gap-2">
                  <Sparkles size={15} className="text-purple-600 dark:text-purple-400 flex-shrink-0 animate-pulse" />
                  <span>{item.organization}</span>
                </p>

                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-base leading-relaxed font-light">
                  {item.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
