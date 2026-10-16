import { motion } from 'framer-motion';
import { Code2, FolderGit2, Award, GraduationCap, Sparkles, Terminal } from 'lucide-react';

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
  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-32 bg-slate-50 dark:bg-[#070214] overflow-hidden font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300"
    >
      {/* --- BACKGROUND GLOWS --- */}
      {/* Large blur orb on the left */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-200/50 dark:bg-[#290a59] rounded-full blur-[120px] opacity-70 dark:opacity-50 -translate-y-1/2 -translate-x-1/3 pointer-events-none transition-colors duration-300" />
      {/* Subtle accent glow on bottom right */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-200/40 dark:bg-[#1d0642] rounded-full blur-[100px] opacity-60 dark:opacity-40 translate-x-1/4 pointer-events-none transition-colors duration-300" />

      {/* --- GEOMETRIC DECORATIONS --- */}
      {/* Floating Hollow Ring */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
        className="absolute top-20 right-[12%] w-10 h-10 md:w-12 md:h-12 rounded-full border-[6px] border-purple-500/40 dark:border-white/80 shadow-[0_0_15px_rgba(147,51,234,0.15)] dark:shadow-[0_0_15px_rgba(255,255,255,0.25)] pointer-events-none z-10 hidden sm:block"
      />

      {/* Floating Diamond Star */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
        className="absolute bottom-16 left-[8%] w-12 h-12 pointer-events-none z-10 hidden md:block"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600/50 dark:text-white">
          <path
            d="M12 0C12 0 12 9 24 12C24 12 13 13 12 24C12 24 11 13 0 12C0 12 11 11 12 0Z"
            fill="currentColor"
            className="opacity-70 dark:opacity-90"
          />
        </svg>
      </motion.div>

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        {/* Section Pill Badge & Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 dark:bg-[#1d0642]/80 border border-purple-200 dark:border-purple-500/30 backdrop-blur-md shadow-sm dark:shadow-[0_0_20px_rgba(49,17,102,0.4)] mb-4"
          >
            <Sparkles size={14} className="text-purple-600 dark:text-purple-300" />
            <span className="text-xs uppercase tracking-widest font-semibold text-purple-700 dark:text-purple-300">
              Get To Know Me
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4"
          >
            About <span className="text-purple-600 dark:text-purple-300">Me</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-300 max-w-2xl text-base sm:text-lg font-light leading-relaxed"
          >
            Passionate full-stack developer bridging computer science foundations with modern digital product experiences.
          </motion.p>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left Column: Biography & Tech Stack Pills */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-[#1d0642]/10 backdrop-blur-md border border-purple-100 dark:border-purple-500/20 shadow-xl shadow-purple-500/5 dark:shadow-purple-950/20">
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

          {/* Right Column: Glassmorphic Stat Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-3.5 sm:gap-4"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -4 }}
                  className="p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-[#1d0642]/10 backdrop-blur-md border border-purple-100 dark:border-purple-500/20 hover:border-purple-300 dark:hover:border-purple-400/60 shadow-lg shadow-purple-500/5 dark:shadow-none hover:shadow-purple-500/10 dark:hover:shadow-[0_0_25px_rgba(49,17,102,0.4)] transition-all duration-300 flex items-center gap-3.5 sm:gap-5 group"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-purple-100 dark:bg-[#311166]/60 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:border-purple-400 transition-all duration-300 shadow-sm dark:shadow-[0_0_15px_rgba(49,17,102,0.3)]">
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
      </div >
    </section >
  );
}
