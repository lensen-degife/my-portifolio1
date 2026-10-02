import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const timelineItems = [
  {
    title: 'B.Sc. in Computer Science',
    organization: 'Addis Ababa University',
    period: '2024 — Present',
    description:
      'Studying core computer science fundamentals including data structures, algorithms, software engineering, databases, and systems programming. Actively participating in coding competitions and collaborative projects.',
    icon: GraduationCap,
  },
];

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="py-20 md:py-28 bg-slate-100/50 dark:bg-dark-surface/50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Education"
          subtitle="My academic journey and learning path"
        />

        <div className="max-w-3xl mx-auto">
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative pl-10 pb-10 last:pb-0"
            >
              {/* Timeline line */}
              {index < timelineItems.length - 1 && (
                <div className="absolute left-[15px] top-10 bottom-0 w-px bg-slate-200 dark:bg-dark-border" />
              )}

              {/* Timeline dot */}
              <div className="absolute left-0 top-1 w-8 h-8 bg-indigo-100 dark:bg-indigo-500/10 rounded-full flex items-center justify-center border-2 border-indigo-500">
                <item.icon
                  size={14}
                  className="text-indigo-600 dark:text-indigo-400"
                />
              </div>

              {/* Content card */}
              <div className="bg-white dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm mb-2">
                  {item.organization}
                </p>
                <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-3">
                  <Calendar size={14} />
                  {item.period}
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
