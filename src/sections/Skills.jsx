import { motion } from 'framer-motion';
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
} from 'react-icons/si';
import { FaJava, FaDatabase, FaServer } from 'react-icons/fa';
import SectionHeading from '../components/SectionHeading';

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'C++', icon: SiCplusplus, color: '#00599C' },
      { name: 'Java', icon: FaJava, color: '#ED8B00' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'SQL', icon: FaDatabase, color: '#336791' },
      { name: 'HTML', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS', icon: SiCss, color: '#1572B6' },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    skills: [{ name: 'React', icon: SiReact, color: '#61DAFB' }],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'MS SQL Server', icon: FaServer, color: '#CC2927' },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#8b949e' },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-20 md:py-28 bg-slate-100/50 dark:bg-dark-surface/50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="Technologies I work with to bring ideas to life"
        />

        <div className="space-y-10">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">
                {category.title}
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
              >
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    className="group flex items-center gap-3 p-3.5 bg-white dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border hover:border-indigo-300 dark:hover:border-indigo-500/30 hover:shadow-md transition-all duration-200"
                  >
                    <skill.icon
                      size={22}
                      className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                      style={{ color: skill.color }}
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
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
