import { motion } from 'framer-motion';
import { ExternalLink, Folder } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import SectionHeading from '../components/SectionHeading';

const projects = [
  {
    title: 'Full Stack E-commerce Web App',
    description:
      'A complete e-commerce platform featuring product browsing, cart management, user authentication, and a streamlined checkout process with responsive design.',
    tech: ['React', 'JavaScript', 'CSS', 'HTML'],
    github: 'https://github.com/lensen-degife',
    live: null,
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    title: 'Personal Portfolio Website',
    description:
      'A modern, responsive portfolio showcasing projects, skills, and achievements with dark/light theme support and smooth animations.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/lensen-degife/my-portifolio1',
    live: 'https://lensen-degife.github.io/my-portifolio1/',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Library Management System',
    description:
      'A robust system for managing book inventory, tracking borrowing and returns, with search and filter capabilities for efficient library operations.',
    tech: ['Java', 'MySQL'],
    github: 'https://github.com/lensen-degife',
    live: null,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Shop Billing System',
    description:
      'An automated billing application for retail shops featuring invoice generation, inventory tracking, and sales reporting functionality.',
    tech: ['C++'],
    github: 'https://github.com/lensen-degife',
    live: null,
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    title: 'Student Schedule Tracker',
    description:
      'A productivity tool helping students organize class schedules, track assignments, and manage deadlines with an intuitive interface.',
    tech: ['Python', 'SQL'],
    github: 'https://github.com/lensen-degife',
    live: null,
    gradient: 'from-cyan-500 to-blue-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Featured Projects"
          subtitle="A selection of projects that showcase my skills and passion"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className="group relative bg-white dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border overflow-hidden hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Gradient header */}
              <div
                className={`h-32 bg-gradient-to-r ${project.gradient} flex items-center justify-center`}
              >
                <Folder
                  size={40}
                  className="text-white/80 group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-medium bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-4 pt-3 border-t border-slate-100 dark:border-dark-border">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <SiGithub size={16} />
                      Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <ExternalLink size={16} />
                      Live Demo
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
