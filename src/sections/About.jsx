import { motion, useReducedMotion } from 'framer-motion';
import { Code2, FolderGit2, Award, GraduationCap, Sparkles, Terminal } from 'lucide-react';
import { NetworkLines, FloatingDiamond, FloatingRing, SparkleStar } from '../components/Decorations';

const stats = [
  {
    icon: GraduationCap,
    value: '3rd Year',
    label: 'CS @ Addis Ababa University',
    sub: 'Academics & Systems',
  },
  {
    icon: Code2,
    value: '100+',
    label: 'LeetCode Problems Solved',
    sub: 'Data Structures & Algorithms',
  },
  {
    icon: FolderGit2,
    value: '5+',
    label: 'Full Stack Projects',
    sub: 'Web, Mobile & Backend',
  },
  {
    icon: Award,
    value: '3+',
    label: 'Certificates Earned',
    sub: 'Udacity, Simplilearn & More',
  },
];

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-32 bg-slate-50 dark:bg-[#030305] overflow-hidden font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300"
    >
      {/* --- BACKGROUND GLOWS - dimmed/hidden on mobile in dark mode --- */}
      <motion.div
        animate={
          shouldReduceMotion
            ? false
            : { scale: [1, 1.07, 1], opacity: [0.5, 0.7, 0.5] }
        }
        transition={{ repeat: Infinity, duration: 8.5, ease: 'easeInOut' }}
        className="absolute top-1/2 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-200/50 dark:bg-[#16062e] opacity-30 sm:opacity-50 dark:opacity-0 sm:dark:opacity-20 rounded-full blur-[80px] sm:blur-[120px] -translate-y-1/2 -translate-x-1/3 pointer-events-none transition-colors duration-300"
      />
      <div className="absolute bottom-0 right-0 w-[260px] sm:w-[400px] h-[260px] sm:h-[400px] bg-indigo-200/40 dark:bg-[#120626] opacity-30 sm:opacity-50 dark:opacity-0 sm:dark:opacity-20 rounded-full blur-[70px] sm:blur-[100px] translate-x-1/4 pointer-events-none transition-colors duration-300" />

      {/* --- MODERN DECORATIONS --- */}
      <NetworkLines
        position="top-left"
        variant="branch"
        className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72"
        delay={0.2}
      />
      <NetworkLines
        position="bottom-right"
        variant="corner"
        className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72"
        delay={0.3}
      />

      <FloatingRing
        className="top-12 sm:top-20 right-[5%] sm:right-[12%]"
        size="md"
        duration={6}
      />

      <FloatingDiamond
        className="bottom-10 sm:bottom-16 left-[4%] sm:left-[8%]"
        size="md"
        duration={4}
      />

      <SparkleStar
        className="top-28 left-[8%] sm:left-[15%]"
        size="sm"
        delay={0.5}
      />
      <SparkleStar
        className="bottom-24 right-[8%] sm:right-[14%]"
        size="md"
        delay={1.2}
      />

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        {/* Section Pill Badge & Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 dark:bg-white/[0.05] border border-purple-200 dark:border-white/10 backdrop-blur-md shadow-sm mb-4"
          >
            <Sparkles size={14} className="text-purple-600 dark:text-purple-300 animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-semibold text-purple-700 dark:text-purple-300">
              Get To Know Me
            </span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4"
          >
            About <span className="text-purple-600 dark:text-purple-300">Me</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-slate-600 dark:text-slate-300 max-w-2xl text-base sm:text-lg font-light leading-relaxed"
          >
            Passionate full-stack developer bridging computer science foundations with modern digital product experiences.
          </motion.p>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left Column: Biography & Tech Stack */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 35, x: -10 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-white/[0.03] backdrop-blur-md border border-purple-100 dark:border-white/10 shadow-xl shadow-purple-500/5 hover:border-purple-200 dark:hover:border-white/20 transition-colors duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5 sm:gap-3">
                <Terminal size={22} className="text-purple-600 dark:text-purple-400 flex-shrink-0" />
                Engineering with Purpose
              </h3>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed font-light mb-4">
                I am <span className="text-slate-900 dark:text-white font-medium">Lensen Degife</span>, a full-stack developer and a{' '}
                <span className="text-purple-700 dark:text-purple-300 font-medium">
                  3rd-year Computer Science student at Addis Ababa University
                </span>
                . I thrive on translating intricate problems into clean, scalable, and responsive software architectures.
              </p>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed font-light mb-4">
                My work spans end-to-end web & mobile applications, RESTful microservices, and database optimization. From designing responsive React frontends to architecting robust Node.js and Spring Boot backends, I bring care to every layer of the stack.
              </p>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed font-light">
                Beyond coursework, I am continuously refining my analytical thinking through competitive programming on LeetCode and collaborating on open-source projects.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Glassmorphic Stat Cards with Staggered Entrance */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-3.5 sm:gap-4"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={statItemVariants}
                  whileHover={shouldReduceMotion ? false : { y: -4, scale: 1.015 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-white/[0.03] backdrop-blur-md border border-purple-100 dark:border-white/10 hover:border-purple-300 dark:hover:border-white/20 shadow-lg shadow-purple-500/5 transition-all duration-300 flex items-center gap-3.5 sm:gap-5 group cursor-default"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-purple-100 dark:bg-white/[0.06] border border-purple-200 dark:border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:border-purple-400 dark:group-hover:border-white/25 transition-all duration-300 shadow-sm">
                    <Icon size={24} className="text-purple-600 dark:text-purple-300" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-purple-700 dark:group-hover:text-purple-200 transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 mt-0.5">
                      {stat.label}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
                      {stat.sub}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
