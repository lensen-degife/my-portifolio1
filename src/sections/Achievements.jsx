import { motion, useReducedMotion } from 'framer-motion';
import { Trophy, GitBranch, Award, ExternalLink } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { FloatingDiamond, FloatingRing, SparkleStar, GridLines } from '../components/Decorations';
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
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="achievements"
      className="relative w-full py-24 md:py-32 bg-[#F7F6F3] dark:bg-[#161614] overflow-hidden text-[#5C5A55] dark:text-[#A8A49C] transition-colors duration-300"
    >
      {/* Technical Background Grid Lines */}
      <GridLines />

      {/* Background glow - soft warm neutral */}
      <motion.div
        animate={
          shouldReduceMotion
            ? false
            : { scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }
        }
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute top-1/3 right-0 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-[#E5E2DB]/50 dark:bg-[#2D2C28]/40 opacity-30 sm:opacity-50 rounded-full blur-[80px] sm:blur-[120px] translate-x-1/4 pointer-events-none transition-colors duration-300"
      />

      {/* --- MODERN DECORATIONS --- */}
      <FloatingDiamond
        className="top-20 right-[6%] sm:right-[10%]"
        size="md"
        delay={0.7}
      />

      <FloatingRing
        className="bottom-20 left-[5%] sm:left-[8%]"
        size="md"
        delay={1.3}
      />

      <SparkleStar
        className="top-[40%] left-[6%] sm:left-[9%]"
        size="sm"
        delay={0.5}
      />
      <SparkleStar
        className="bottom-[30%] right-[8%] sm:right-[12%]"
        size="md"
        delay={1.1}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <SectionHeading
          icon={Trophy}
          badge="Honors & Credentials"
          title="Achievements & Certifications"
          subtitle="Key milestones and recognitions earned through continuous technical pursuit"
        />

        {/* Achievements Grid with Alternating Slide from Left and Right */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-14">
          {achievements.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={item.title}
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, x: isLeft ? -45 : 45 }
                }
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.12 }}
                whileHover={shouldReduceMotion ? false : { y: -4, scale: 1.015 }}
                className="flex gap-3.5 sm:gap-5 p-4 sm:p-6 bg-[#FAF9F6] dark:bg-[#1F1E1B] rounded-2xl border border-[#E5E2DB] dark:border-[#2D2C28] hover:border-[#8A857C]/40 dark:hover:border-[#B0ABA1]/40 shadow-sm shadow-black/5 transition-all duration-300 cursor-default"
              >
                <div className="p-2.5 sm:p-3.5 bg-[#EEECE6] dark:bg-[#292825] border border-[#E5E2DB] dark:border-[#383632] rounded-xl h-fit flex-shrink-0 text-[#2C2C2A] dark:text-[#EEECE6] shadow-xs">
                  <item.icon size={22} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1A1A18] dark:text-[#FAF9F6] mb-1.5 sm:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C5A55] dark:text-[#A8A49C] leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Certificates Section */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h3 className="text-lg sm:text-xl font-bold text-[#1A1A18] dark:text-[#FAF9F6] mb-4 sm:mb-6 flex items-center gap-2">
            <Award size={20} className="text-[#8A857C] dark:text-[#B0ABA1]" />
            <span>Verified Certifications</span>
          </h3>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5"
          >
            {certificates.map((cert) => (
              <motion.div
                key={cert.title}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? false : { y: -4, scale: 1.015 }}
                transition={{ duration: 0.2 }}
                className="group p-4 sm:p-5 bg-[#FAF9F6] dark:bg-[#1F1E1B] rounded-2xl border border-[#E5E2DB] dark:border-[#2D2C28] hover:border-[#8A857C]/40 dark:hover:border-[#B0ABA1]/40 shadow-sm shadow-black/5 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-[#1A1A18] dark:text-[#FAF9F6] text-sm sm:text-base group-hover:text-[#8A857C] dark:group-hover:text-[#B0ABA1] transition-colors">
                      {cert.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#9B9890] dark:text-[#78756E] mt-1">
                      Issued by {cert.issuer}
                    </p>
                  </div>
                  {cert.file && (
                    <motion.a
                      href={cert.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-[#2C2C2A] hover:text-[#1A1A18] dark:text-[#EEECE6] dark:hover:text-[#FAF9F6] bg-[#EEECE6] hover:bg-[#E5E2DB] dark:bg-[#292825] dark:hover:bg-[#383632] p-2 rounded-lg border border-[#E5E2DB] dark:border-[#383632] transition-all duration-200 shadow-xs flex-shrink-0"
                      title="View certificate"
                    >
                      <ExternalLink size={14} />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
