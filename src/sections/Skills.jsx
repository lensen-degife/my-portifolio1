import { motion, useReducedMotion } from 'framer-motion';
import {
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiReact,
  SiMysql,
  SiGit,
  SiGithub,
  SiPostgresql,
  SiSpringboot,
  SiNodedotjs,
  SiTailwindcss,
  SiDocker,
  SiTypescript,
  SiExpo,
  SiFigma,
} from 'react-icons/si';
import { FaJava, FaDatabase } from 'react-icons/fa';
import { Code2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { NetworkLines, FloatingDiamond, FloatingRing, SparkleStar } from '../components/Decorations';

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'Java', icon: FaJava, color: '#f89820' },
      { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
      { name: 'Python', icon: SiPython, color: '#3776ab' },
      { name: 'C++', icon: SiCplusplus, color: '#00599c' },
      { name: 'SQL', icon: FaDatabase, color: '#00758f' },
      { name: 'HTML5', icon: SiHtml5, color: '#e34f26' },
      { name: 'CSS3', icon: SiCss, color: '#1572b6' },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    skills: [
      { name: 'React', icon: SiReact, color: '#61dafb' },
      { name: 'Spring Boot', icon: SiSpringboot, color: '#6db33f' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#68a063' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38bdf8' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169e1' },
      { name: 'MySQL', icon: SiMysql, color: '#00758f' },
      { name: 'MongoDB', icon: FaDatabase, color: '#47a248' },
      { name: 'SQLite', icon: FaDatabase, color: '#003b57' },
    ],
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Docker', icon: SiDocker, color: '#2496ed' },
      { name: 'Git', icon: SiGit, color: '#f05032' },
      { name: 'GitHub', icon: SiGithub, color: '#e6edf3' },
      { name: 'Expo', icon: SiExpo, color: '#316ca7' },
      { name: 'Figma', icon: SiFigma, color: '#f24e1e' },
    ],
  },
];

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="skills"
      className="relative w-full py-24 md:py-32 bg-slate-50 dark:bg-[#030305] overflow-hidden text-slate-800 dark:text-slate-200 transition-colors duration-300"
    >
      {/* Background glow - hidden/dimmed on mobile in dark mode */}
      <motion.div
        animate={
          shouldReduceMotion
            ? false
            : { scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }
        }
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute top-1/2 right-0 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-purple-200/50 dark:bg-[#16062e] opacity-30 sm:opacity-50 dark:opacity-0 sm:dark:opacity-20 rounded-full blur-[80px] sm:blur-[120px] translate-x-1/4 pointer-events-none transition-colors duration-300"
      />

      {/* --- MODERN DECORATIONS --- */}
      <NetworkLines
        position="top-right"
        variant="corner"
        className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72"
        delay={0.2}
      />
      <NetworkLines
        position="bottom-left"
        variant="matrix"
        className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72"
        delay={0.3}
      />

      <FloatingDiamond
        className="top-16 left-[5%] sm:left-[8%]"
        size="md"
        delay={0.5}
      />

      <FloatingRing
        className="bottom-20 right-[5%] sm:right-[8%]"
        size="md"
        delay={1}
      />

      <SparkleStar
        className="top-1/3 right-[7%] sm:right-[12%]"
        size="sm"
        delay={1.5}
      />
      <SparkleStar
        className="bottom-1/3 left-[6%] sm:left-[10%]"
        size="md"
        delay={0.7}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <SectionHeading
          icon={Code2}
          badge="Technical Proficiency"
          title="Skills & Technologies"
          subtitle="A comprehensive toolkit of languages, frameworks, and modern developer technologies"
        />

        <div className="space-y-12">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <motion.h3
                initial={shouldReduceMotion ? false : { opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg font-semibold text-purple-700 dark:text-slate-200 mb-5 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400" />
                {category.title}
              </motion.h3>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2.5 sm:gap-3.5"
              >
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    whileHover={
                      shouldReduceMotion
                        ? false
                        : { y: -3, scale: 1.02 }
                    }
                    transition={{ duration: 0.2 }}
                    className="group flex items-center gap-2.5 sm:gap-3.5 p-3 sm:p-4 bg-white/80 dark:bg-white/[0.03] backdrop-blur-md rounded-xl sm:rounded-2xl border border-purple-100 dark:border-white/10 hover:border-purple-300 dark:hover:border-white/20 shadow-md shadow-purple-500/5 transition-all duration-200 cursor-default select-none"
                  >
                    <skill.icon
                      size={22}
                      className="flex-shrink-0 transition-transform duration-200 group-hover:scale-115"
                      style={{ color: skill.color }}
                    />
                    <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-purple-700 dark:group-hover:text-white transition-colors leading-snug">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
