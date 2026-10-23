import { motion, useReducedMotion } from 'framer-motion';
import { Folder, Sparkles, Layers, ArrowUpRight } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { NetworkLines, FloatingDiamond, FloatingRing, SparkleStar } from '../components/Decorations';

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
      className="relative w-full py-24 md:py-32 bg-[#F7F6F3] dark:bg-[#161614] overflow-hidden font-sans text-[#5C5A55] dark:text-[#A8A49C] transition-colors duration-300"
    >
      {/* --- BACKGROUND GLOWS - soft warm neutral --- */}
      <motion.div
        animate={
          shouldReduceMotion
            ? false
            : { scale: [1, 1.07, 1], opacity: [0.35, 0.55, 0.35] }
        }
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
        className="absolute top-1/4 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#E5E2DB]/50 dark:bg-[#2D2C28]/40 opacity-30 sm:opacity-50 rounded-full blur-[80px] sm:blur-[130px] -translate-x-1/4 pointer-events-none transition-colors duration-300"
      />
      <div className="absolute bottom-1/4 right-0 w-[260px] sm:w-[500px] h-[260px] sm:h-[500px] bg-[#EEECE6]/60 dark:bg-[#292825]/40 opacity-30 sm:opacity-50 rounded-full blur-[70px] sm:blur-[120px] translate-x-1/4 pointer-events-none transition-colors duration-300" />

      {/* --- MODERN DECORATIONS --- */}
      {/* Top Right Network Lines */}
      <NetworkLines
        position="top-right"
        variant="corner"
        className="w-44 h-44 sm:w-60 sm:h-60 md:w-80 md:h-80"
        delay={0.2}
      />
      {/* Bottom Left Network Lines */}
      <NetworkLines
        position="bottom-left"
        variant="branch"
        className="w-44 h-44 sm:w-60 sm:h-60 md:w-80 md:h-80"
        delay={0.3}
      />

      {/* Floating Hollow Ring */}
      <FloatingRing
        className="top-[10%] sm:top-[14%] lg:top-[18%] left-[4%] sm:left-[7%]"
        size="md"
        duration={6}
      />

      {/* Floating Diamond Stars */}
      <FloatingDiamond
        className="bottom-10 sm:bottom-16 md:bottom-20 left-[5%] sm:left-[10%]"
        size="md"
        duration={4}
      />
      <FloatingDiamond
        className="top-[45%] right-[4%] sm:right-[6%]"
        size="sm"
        duration={5}
        delay={1.2}
      />

      {/* Twinkling Sparkle Stars */}
      <SparkleStar
        className="top-[18%] right-[14%]"
        size="md"
        delay={0.4}
      />
      <SparkleStar
        className="bottom-[28%] left-[4%]"
        size="sm"
        delay={0.8}
      />
      <SparkleStar
        className="bottom-[10%] right-[12%]"
        size="lg"
        delay={1.4}
      />

      {/* --- SECTION CONTENT --- */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEECE6] dark:bg-[#292825] border border-[#E5E2DB] dark:border-[#383632] shadow-xs mb-4"
          >
            <Layers size={14} className="text-[#8A857C] dark:text-[#B0ABA1] animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#2C2C2A] dark:text-[#EEECE6]">
              Selected Works
            </span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A18] dark:text-[#FAF9F6] tracking-tight mb-4"
          >
            Featured <span className="text-[#8A857C] dark:text-[#B0ABA1]">Projects</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#5C5A55] dark:text-[#A8A49C] max-w-2xl text-base sm:text-lg font-light leading-relaxed"
          >
            A curated collection of full-stack systems, backend microservices, and mobile applications engineered with clean code.
          </motion.p>
        </div>

        {/* Projects Grid with Sequential Stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
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
              className="group relative bg-[#FAF9F6] dark:bg-[#1F1E1B] border border-[#E5E2DB] dark:border-[#2D2C28] rounded-2xl overflow-hidden hover:border-[#8A857C]/40 dark:hover:border-[#B0ABA1]/40 shadow-sm shadow-black/5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Top Banner / Accent */}
              <div className="p-5 sm:p-6 pb-3 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#EEECE6] dark:bg-[#292825] border border-[#E5E2DB] dark:border-[#383632] flex items-center justify-center text-[#2C2C2A] dark:text-[#EEECE6] group-hover:scale-110 group-hover:rotate-3 group-hover:border-[#8A857C]/40 dark:group-hover:border-[#B0ABA1]/40 group-hover:text-[#1A1A18] dark:group-hover:text-[#FAF9F6] transition-all duration-300 shadow-xs">
                    <Folder size={20} />
                  </div>

                  {project.highlight && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-[#EEECE6] dark:bg-[#292825] text-[#2C2C2A] dark:text-[#EEECE6] border border-[#E5E2DB] dark:border-[#383632] shadow-xs">
                      <Sparkles size={11} className="text-[#8A857C] dark:text-[#B0ABA1] animate-pulse" />
                      {project.highlight}
                    </span>
                  )}
                </div>

                <div className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-[#8A857C] dark:text-[#B0ABA1] mb-1">
                  {project.category}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#1A1A18] dark:text-[#FAF9F6] group-hover:text-[#8A857C] dark:group-hover:text-[#B0ABA1] transition-colors mb-2.5 sm:mb-3">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5C5A55] dark:text-[#A8A49C] leading-relaxed font-light mb-4 sm:mb-6">
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
                      className="px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-medium bg-[#EEECE6] dark:bg-[#292825] text-[#5C5A55] dark:text-[#A8A49C] border border-[#E5E2DB] dark:border-[#383632] rounded-full group-hover:border-[#8A857C]/40 dark:group-hover:border-[#B0ABA1]/40 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center justify-between gap-3 pt-3.5 sm:pt-4 border-t border-[#E5E2DB] dark:border-[#2D2C28]">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-[#5C5A55] dark:text-[#A8A49C] hover:text-[#1A1A18] dark:hover:text-[#FAF9F6] transition-colors group/link"
                    >
                      <SiGithub size={15} className="text-[#8A857C] dark:text-[#B0ABA1] group-hover/link:text-[#1A1A18] dark:group-hover/link:text-[#FAF9F6] transition-colors" />
                      <span>Source Code</span>
                    </a>
                  )}

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#1A1A18] dark:text-[#FAF9F6] hover:text-[#8A857C] dark:hover:text-[#B0ABA1] transition-colors ml-auto group/link"
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
