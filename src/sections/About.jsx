import { motion } from 'framer-motion';
import { Code2, FolderGit2, Award } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const stats = [
  { icon: Code2, value: '100+', label: 'LeetCode Problems Solved' },
  { icon: FolderGit2, value: '5+', label: 'Projects Built' },
  { icon: Award, value: '3+', label: 'Certificates Earned' },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About Me"
          subtitle="Get to know me and my journey in tech"
        />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
              I&apos;m a Computer Science student at{' '}
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                Addis Ababa University
              </span>
              , deeply passionate about software development and creating
              impactful digital solutions. My journey in tech is driven by
              curiosity and a commitment to writing clean, maintainable code.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
              From building full-stack web applications to solving algorithmic
              challenges, I constantly push myself to learn and grow. I believe
              in the power of continuous improvement and contributing to the
              developer community.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              When I&apos;m not coding, I&apos;m exploring new technologies,
              contributing to open-source projects, or tackling coding challenges
              on LeetCode.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-5 bg-white dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-colors duration-200"
              >
                <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg">
                  <stat.icon
                    size={24}
                    className="text-indigo-600 dark:text-indigo-400"
                  />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
