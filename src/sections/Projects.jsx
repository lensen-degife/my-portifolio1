import { motion, useReducedMotion } from 'framer-motion';
import { Folder, Sparkles, Layers, ArrowUpRight } from 'lucide-react';
import { SiGithub } from 'react-icons/si';

const projects = [
  {
    title: 'HydroLink',
    category: 'Mobile & IoT Solution',
    description:
      'A full-stack Android application built for municipal water resource management. Features real-time utility telemetry, community leak incident reporting, online bill payments, and cloud database integration.',
    tech: ['React Native', 'Expo', 'Node.js', 'Express', 'PostgreSQL'],
    github: 'https://github.com/lensen-degife/hydrolink',
    live: null,
    highlight: 'Featured Project',
  },
  {
    title: 'StockFlow Lite',
    category: 'Full Stack Web Platform',
    description:
      'A comprehensive inventory management system with real-time stock tracking, automated supplier procurement workflows, low-stock alerts, and dynamic analytics reporting.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS'],
    github: 'https://github.com/lensen-degife/stockflow-frontend',
    live: 'https://stockflow-frontend-lac.vercel.app',
    highlight: 'Live Deployment',
  },
  {
    title: 'Product Service API',
    category: 'Backend Microservice',
    description:
      'A robust, high-performance backend microservice engineered with Spring Boot. Features RESTful catalog endpoints, relational schema design, input validation, and containerized deployment.',
    tech: ['Spring Boot', 'Java', 'PostgreSQL', 'Docker', 'Swagger'],
    github: 'https://github.com/lensen-degife',
    live: null,
    highlight: 'Backend System',
  },
  {
    title: 'Makalla AI Assistant',
    category: 'AI Web Platform',
    description:
      'Full-stack intelligent assistant application providing conversational AI capabilities, query processing, contextual dialogue persistence, and modern frontend design.',
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'TypeScript', 'React'],
    github: 'https://github.com/lensen-degife/makalla-ai-assistant',
    live: null,
    highlight: null,
  },
  {
    title: 'JobListing Web Application',
    category: 'Full Stack Portal',
    description:
      'Interactive job board platform allowing professionals to browse postings, submit resumes, and track applications, complete with an administrative dashboard.',
    tech: ['React', 'Spring Boot', 'MongoDB', 'Vite', 'Tailwind CSS'],
    github: 'https://github.com/lensen-degife/joblisting-frontend',
    live: null,
    highlight: null,
  },
  {
    title: 'Full Stack E-Commerce',
    category: 'Digital Storefront',
    description:
      'Modern online storefront featuring intuitive product browsing, responsive cart management, customer authentication, and seamless checkout flows.',
    tech: ['React', 'JavaScript', 'Node.js', 'Tailwind CSS'],
    github: 'https://github.com/lensen-degife/ecommerce-frontend',
    live: null,
    highlight: null,
  },
];

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 35, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="projects"
      className="relative w-full py-24 md:py-32 bg-slate-50 dark:bg-[#070214] overflow-hidden font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300"
    >
      {/* --- BACKGROUND GLOWS --- */}
      <motion.div
        animate={
          shouldReduceMotion
            ? false
            : { scale: [1, 1.07, 1], opacity: [0.5, 0.7, 0.5] }
        }
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
        className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-200/50 dark:bg-[#290a59] rounded-full blur-[130px] -translate-x-1/4 pointer-events-none transition-colors duration-300"
      />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-indigo-200/40 dark:bg-[#1d0642] rounded-full blur-[120px] opacity-60 dark:opacity-50 translate-x-1/4 pointer-events-none transition-colors duration-300" />

      {/* --- TOP RIGHT NETWORK LINES SVG --- */}
      <svg
        className="absolute top-0 right-0 w-44 h-44 sm:w-60 sm:h-60 md:w-80 md:h-80 text-purple-600/15 dark:text-purple-400/20 pointer-events-none transform rotate-90 z-0"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M200 0L150 60L180 120L200 100" stroke="currentColor" strokeWidth="1.5" />
        <path d="M150 60L70 30L40 0" stroke="currentColor" strokeWidth="1.5" />
        <path d="M150 60L100 110L20 90" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="150" cy="60" r="3" fill="currentColor" />
        <circle cx="180" cy="120" r="3" fill="currentColor" />
        <circle cx="70" cy="30" r="3" fill="currentColor" />
        <circle cx="100" cy="110" r="3" fill="currentColor" />
        <circle cx="20" cy="90" r="3" fill="currentColor" />
      </svg>

      {/* --- FLOATING GEOMETRIC SHAPES --- */}
      <motion.div
        animate={
          shouldReduceMotion
            ? false
            : { y: [-10, 10, -10], rotate: [0, 90, 0] }
        }
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="absolute top-[10%] sm:top-[14%] lg:top-[18%] left-[4%] sm:left-[7%] w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 rounded-full border-4 sm:border-[6px] border-purple-500/40 dark:border-white/80 shadow-[0_0_15px_rgba(147,51,234,0.15)] dark:shadow-[0_0_15px_rgba(255,255,255,0.3)] pointer-events-none z-10"
      />

      <motion.div
        animate={
          shouldReduceMotion
            ? false
            : { scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }
        }
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="absolute bottom-10 sm:bottom-16 md:bottom-20 left-[5%] sm:left-[12%] w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 pointer-events-none z-10"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600/50 dark:text-white">
          <path
            d="M12 0C12 0 12 9 24 12C24 12 13 13 12 24C12 24 11 13 0 12C0 12 11 11 12 0Z"
            fill="currentColor"
            className="opacity-70 dark:opacity-90"
          />
        </svg>
      </motion.div>

      {/* --- SECTION CONTENT --- */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 dark:bg-[#1d0642]/80 border border-purple-200 dark:border-purple-500/30 backdrop-blur-md shadow-sm dark:shadow-[0_0_20px_rgba(49,17,102,0.4)] mb-4"
          >
            <Layers size={14} className="text-purple-600 dark:text-purple-300 animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-semibold text-purple-700 dark:text-purple-300">
              Selected Works
            </span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4"
          >
            Featured <span className="text-purple-600 dark:text-purple-300">Projects</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-slate-600 dark:text-slate-300 max-w-2xl text-base sm:text-lg font-light leading-relaxed"
          >
            A curated collection of full-stack systems, backend microservices, and mobile applications engineered with clean code.
          </motion.p>
        </div>

        {/* Projects Grid with Sequential Stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              whileHover={
                shouldReduceMotion
                  ? false
                  : { y: -6, scale: 1.01 }
              }
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="group relative bg-white/80 dark:bg-[#1d0642]/10 backdrop-blur-md border border-purple-100 dark:border-purple-500/20 rounded-2xl overflow-hidden hover:border-purple-300 dark:hover:border-purple-400 shadow-xl shadow-purple-500/5 hover:shadow-2xl hover:shadow-purple-500/15 dark:hover:shadow-[0_0_30px_rgba(49,17,102,0.5)] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Top Banner / Accent */}
              <div className="p-5 sm:p-6 pb-3 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-purple-100 dark:bg-[#311166]/60 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-700 dark:text-purple-300 group-hover:scale-110 group-hover:rotate-3 group-hover:border-purple-400 group-hover:text-purple-900 dark:group-hover:text-white transition-all duration-300 shadow-sm dark:shadow-[0_0_15px_rgba(49,17,102,0.4)]">
                    <Folder size={20} />
                  </div>

                  {project.highlight && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-purple-100/90 dark:bg-white/10 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-400/40 shadow-sm">
                      <Sparkles size={11} className="text-purple-600 dark:text-purple-300 animate-pulse" />
                      {project.highlight}
                    </span>
                  )}
                </div>

                <div className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-purple-600 dark:text-purple-400 mb-1">
                  {project.category}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-200 transition-colors mb-2.5 sm:mb-3">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light mb-4 sm:mb-6">
                  {project.description}
                </p>
              </div>

              {/* Card Footer: Tech Tags (Pill UI) & Action Links */}
              <div className="p-5 sm:p-6 pt-0 mt-auto">
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-medium bg-purple-50 dark:bg-[#311166]/60 text-purple-800 dark:text-purple-200 border border-purple-200/80 dark:border-purple-500/30 rounded-full group-hover:border-purple-300/80 dark:group-hover:border-purple-400/50 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center justify-between gap-3 pt-3.5 sm:pt-4 border-t border-purple-100 dark:border-purple-500/20">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-purple-700 dark:text-slate-300 dark:hover:text-white transition-colors group/link"
                    >
                      <SiGithub size={15} className="text-purple-600 dark:text-purple-400 group-hover/link:text-purple-800 dark:group-hover/link:text-white transition-colors" />
                      <span>Source Code</span>
                    </a>
                  )}

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-purple-700 hover:text-purple-900 dark:text-purple-300 dark:hover:text-white transition-colors ml-auto group/link"
                    >
                      <span>Live Preview</span>
                      <ArrowUpRight size={15} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
