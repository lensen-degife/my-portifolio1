import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Send, Heart } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { SparkleStar, FloatingDiamond, GridLines } from './Decorations';

const socialLinks = [
  { icon: SiGithub, href: 'https://github.com/lensen-degife', label: 'GitHub' },
  {
    icon: FaLinkedin,
    href: 'https://www.linkedin.com/in/lensen-degife-60661b3b2/',
    label: 'LinkedIn',
  },
  { icon: Mail, href: 'mailto:lensendegife@gmail.com', label: 'Email' },
  { icon: Send, href: 'https://t.me/CipherLens', label: 'Telegram' },
];

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="relative bg-transparent border-t border-[#E5E2DB] dark:border-[#2D2C28] py-12 overflow-hidden text-[#5C5A55] dark:text-[#A8A49C] font-sans transition-colors duration-300">
      {/* Technical Background Grid Lines */}
      <GridLines />

      {/* Background glow - softened warm neutral */}
      <motion.div
        animate={
          shouldReduceMotion
            ? false
            : { scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }
        }
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#E5E2DB]/60 dark:bg-[#2D2C28]/40 opacity-30 sm:opacity-50 rounded-full blur-[90px] pointer-events-none transition-colors duration-300"
      />

      {/* Decorative sparkles */}
      <SparkleStar className="top-4 left-[6%] sm:left-[12%]" size="sm" delay={0.4} />
      <FloatingDiamond className="top-4 right-[6%] sm:right-[12%]" size="sm" delay={1} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
        >
          {/* Brand info */}
          <div>
            <div className="text-xl font-bold text-[#1A1A18] dark:text-[#FAF9F6] tracking-tight flex items-center justify-center md:justify-start gap-1">
              <span>Lensen Degife</span>
              <span className="text-[#8A857C] dark:text-[#B0ABA1]">.</span>
            </div>
            <p className="text-sm text-[#9B9890] dark:text-[#78756E] mt-1 font-light">
              Full-Stack Developer & Computer Science Student at Addis Ababa University
            </p>
          </div>

          {/* Social icons (Pill UI) */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={shouldReduceMotion ? false : { scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-[#EEECE6] hover:bg-[#E5E2DB] border border-[#E5E2DB] text-[#2C2C2A] hover:text-[#1A1A18] dark:bg-[#292825] dark:hover:bg-[#383632] dark:border-[#383632] dark:text-[#EEECE6] dark:hover:text-[#FAF9F6] flex items-center justify-center transition-all duration-200 shadow-xs"
                  aria-label={link.label}
                >
                  <Icon size={17} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom divider & copyright */}
        <div className="mt-8 pt-8 border-t border-[#E5E2DB] dark:border-[#2D2C28] flex flex-col sm:flex-row items-center justify-between text-xs text-[#9B9890] dark:text-[#78756E] gap-3">
          <p>
            © {new Date().getFullYear()} Lensen Degife. Built with React, Vite & Tailwind CSS.
          </p>
          <p className="flex items-center gap-1.5 text-[#5C5A55] dark:text-[#A8A49C] font-light">
            Crafted with precision & passion <Heart size={13} className="text-[#8A857C] fill-[#8A857C] dark:text-[#B0ABA1] dark:fill-[#B0ABA1]" />
          </p>
        </div>
      </div>
    </footer>
  );
}
