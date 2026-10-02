import { motion } from 'framer-motion';
import { Trophy, GitBranch, Award, ExternalLink } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import udacityCert from '../assets/udacity.certificate.pdf';
import simplilearnCert from '../assets/simplilearnCertificate.pdf';

const achievements = [
  {
    icon: Trophy,
    title: '100+ LeetCode Problems',
    description:
      'Successfully solved over 100 coding challenges on LeetCode, strengthening problem-solving skills across data structures and algorithms.',
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-500/10',
  },
  {
    icon: GitBranch,
    title: 'Open Source Contributor',
    description:
      'Actively contributed to open-source projects on GitHub, collaborating with developers worldwide and gaining real-world development experience.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
  },
];

const certificates = [
  {
    title: 'Udacity Certificate',
    issuer: 'Udacity',
    file: udacityCert,
  },
  {
    title: 'Simplilearn Certificate',
    issuer: 'Simplilearn',
    file: simplilearnCert,
  },
  {
    title: 'SQL Certificate',
    issuer: 'Online Platform',
    file: simplilearnCert,
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Achievements & Certificates"
          subtitle="Milestones and recognitions along my journey"
        />

        {/* Achievements */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-4 p-6 bg-white dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-colors duration-200"
            >
              <div className={`p-3 ${item.bg} rounded-lg h-fit flex-shrink-0`}>
                <item.icon size={24} className={item.color} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Award size={22} className="text-indigo-500" />
            Certificates
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-4 bg-white dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-colors duration-200"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white text-sm">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Issued by {cert.issuer}
                    </p>
                  </div>
                  {cert.file && (
                    <a
                      href={cert.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-indigo-500 transition-colors p-1"
                      title="View certificate"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
