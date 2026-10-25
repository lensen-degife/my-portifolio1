import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap, Calendar, Sparkles } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { FloatingDiamond, FloatingRing, SparkleStar, GridLines } from '../components/Decorations';

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
      className="relative w-full py-24 md:py-32 bg-[#F7F6F3] dark:bg-[#161614] overflow-hidden text-[#5C5A55] dark:text-[#A8A49C] transition-colors duration-300"
    >
      {/* Technical Background Grid Lines */}
      <GridLines />

      {/* Background glow - soft warm neutral */}
      <motion.div
        animate={
          shouldReduceMotion
            ? false
            : { scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }
        }
        transition={{ repeat: Infinity, duration: 8.5, ease: 'easeInOut' }}
        className="absolute top-1/2 left-0 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-[#E5E2DB]/50 dark:bg-[#2D2C28]/40 opacity-30 sm:opacity-50 rounded-full blur-[80px] sm:blur-[120px] -translate-x-1/4 pointer-events-none transition-colors duration-300"
      />

      {/* --- MODERN DECORATIONS --- */}
      <FloatingDiamond
        className="top-20 left-[6%] sm:left-[9%]"
        size="md"
        delay={0.4}
      />

      <FloatingRing
        className="bottom-16 right-[6%] sm:right-[9%]"
        size="md"
        delay={1.2}
      />

      <SparkleStar
        className="top-1/2 right-[5%] sm:right-[8%]"
        size="md"
        delay={0.8}
      />
      <SparkleStar
        className="bottom-24 left-[7%] sm:left-[10%]"
        size="sm"
        delay={1.5}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <SectionHeading
          icon={GraduationCap}
          badge="Academic Journey"
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
              viewport={{ once: false, amount: 0.15 }}
              className="relative pl-9 sm:pl-12 pb-8 sm:pb-10 last:pb-0"
            >
              {/* Timeline dot */}
              <motion.div
                initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.4, delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
                className="absolute left-0 top-1 w-8 h-8 sm:w-9 sm:h-9 bg-[#2C2C2A] dark:bg-[#EEECE6] rounded-full flex items-center justify-center border-2 border-[#8A857C] dark:border-[#B0ABA1] shadow-sm"
              >
                <item.icon
                  size={15}
                  className="text-white dark:text-[#1A1A18]"
                />
              </motion.div>

              {/* Content card */}
              <motion.div
                whileHover={shouldReduceMotion ? false : { y: -4, scale: 1.01 }}
                transition={{ duration: 0.25 }}
                className="bg-[#FAF9F6] dark:bg-[#1F1E1B] rounded-2xl border border-[#E5E2DB] dark:border-[#2D2C28] p-4 sm:p-8 hover:border-[#8A857C]/40 dark:hover:border-[#B0ABA1]/40 shadow-sm shadow-black/5 transition-all duration-300"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-[#1A1A18] dark:text-[#FAF9F6]">
                    {item.title}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#EEECE6] dark:bg-[#292825] border border-[#E5E2DB] dark:border-[#383632] text-[11px] sm:text-xs font-medium text-[#5C5A55] dark:text-[#A8A49C]">
                    <Calendar size={12} />
                    {item.period}
                  </div>
                </div>

                <p className="text-[#8A857C] dark:text-[#B0ABA1] font-medium text-sm sm:text-base mb-2.5 sm:mb-3 flex items-center gap-2">
                  <Sparkles size={15} className="text-[#8A857C] dark:text-[#B0ABA1] flex-shrink-0 animate-pulse" />
                  <span>{item.organization}</span>
                </p>

                <p className="text-[#5C5A55] dark:text-[#A8A49C] text-xs sm:text-base leading-relaxed font-light">
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
