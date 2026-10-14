import { motion } from 'framer-motion';
import { Trophy, GitBranch, Award, ExternalLink } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import udacityCert from '../assets/udacity.certificate.pdf';
import simplilearnCert from '../assets/simplilearnCertificate.pdf';

const achievements = [
  {
    icon: Trophy,
    title: '100+ LeetCode Problems Solved',
    description:
      'Consistently solving algorithms and data structures challenges on LeetCode, advancing algorithmic thinking and computational problem-solving.',
  },
  {
    icon: GitBranch,
    title: 'Open Source Contributor',
    description:
      'Active contributions across open-source repositories and collaborative GitHub projects, demonstrating modular code practices and version control.',
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
    title: 'SQL & Database Design',
    issuer: 'Online Certification',
    file: simplilearnCert,
  },
];

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative w-full py-24 md:py-32 bg-slate-50 dark:bg-[#070214] overflow-hidden text-slate-800 dark:text-slate-200 transition-colors duration-300"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-purple-200/50 dark:bg-[#1d0642] rounded-full blur-[120px] opacity-60 dark:opacity-40 translate-x-1/4 pointer-events-none transition-colors duration-300" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <SectionHeading
          title="Achievements & Certifications"
          subtitle="Key milestones and recognitions earned through continuous technical pursuit"
        />

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-14">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-3.5 sm:gap-5 p-4 sm:p-6 bg-white/80 dark:bg-[#1d0642]/30 backdrop-blur-md rounded-2xl border border-purple-100 dark:border-purple-500/20 hover:border-purple-300 dark:hover:border-purple-400 shadow-xl shadow-purple-500/5 hover:shadow-purple-500/10 dark:hover:shadow-[0_0_25px_rgba(49,17,102,0.4)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-2.5 sm:p-3.5 bg-purple-100 dark:bg-[#311166]/60 border border-purple-200 dark:border-purple-500/30 rounded-xl h-fit flex-shrink-0 text-purple-700 dark:text-purple-300 shadow-sm">
                <item.icon size={22} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1.5 sm:mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificates Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
            <Award size={20} className="text-purple-600 dark:text-purple-400" />
            <span>Verified Certifications</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-4 sm:p-5 bg-white/80 dark:bg-[#1d0642]/30 backdrop-blur-md rounded-2xl border border-purple-100 dark:border-purple-500/20 hover:border-purple-300 dark:hover:border-purple-400 shadow-lg shadow-purple-500/5 hover:shadow-purple-500/10 dark:hover:shadow-[0_0_20px_rgba(49,17,102,0.4)] transition-all duration-200 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base group-hover:text-purple-700 dark:group-hover:text-purple-200 transition-colors">
                      {cert.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-purple-700/80 dark:text-purple-300/80 mt-1">
                      Issued by {cert.issuer}
                    </p>
                  </div>
                  {cert.file && (
                    <a
                      href={cert.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-700 hover:text-purple-900 dark:text-purple-300 dark:hover:text-white bg-purple-50 hover:bg-purple-100 dark:bg-white/5 dark:hover:bg-[#311166] p-2 rounded-lg border border-purple-200 dark:border-purple-500/20 transition-all duration-200 shadow-sm flex-shrink-0"
                      title="View certificate"
                    >
                      <ExternalLink size={14} />
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
