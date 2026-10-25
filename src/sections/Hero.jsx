import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowDown, Download, Mail, Sparkles, Code2, Terminal, X, GraduationCap, MapPin, User } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import Typed from 'typed.js';

// Import assets
import resumePdf from '../assets/LensenDegifeCV1.pdf';
import profileImage from '../assets/img3.png';
import { SparkleStar, FloatingDiamond, GridLines } from '../components/Decorations';

export default function Hero() {
  const typedRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [isCardOpen, setIsCardOpen] = useState(false);

  useEffect(() => {
    if (isCardOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setIsCardOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isCardOpen]);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        'Software Engineer',
        'Full-Stack Developer',
        'Backend & Systems Builder',
        'Mobile App Developer',
        'CS Student @ Addis Ababa University',
        'Problem Solver & LeetCoder',
        'Open Source Contributor',
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
    });
    return () => typed.destroy();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center bg-[#F7F6F3] dark:bg-[#161614] overflow-hidden font-sans pt-16 sm:pt-20 lg:pt-28 pb-12 sm:pb-16 transition-colors duration-300"
    >
      {/* --- BACKGROUND DECORATIONS --- */}
      
      {/* Soft Stone Ambient Glows */}
      <motion.div
        animate={
          shouldReduceMotion
            ? false
            : {
                scale: [1, 1.08, 1],
                opacity: [0.4, 0.6, 0.4],
              }
        }
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#E5E2DB]/50 dark:bg-[#2D2C28]/40 opacity-30 sm:opacity-50 rounded-full blur-[80px] sm:blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none transition-colors duration-300"
      />
      <motion.div
        animate={
          shouldReduceMotion
            ? false
            : {
                scale: [1, 1.06, 1],
                opacity: [0.35, 0.55, 0.35],
              }
        }
        transition={{ repeat: Infinity, duration: 9, delay: 1, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-[260px] sm:w-[400px] h-[260px] sm:h-[400px] bg-[#EEECE6]/60 dark:bg-[#292825]/40 opacity-30 sm:opacity-50 rounded-full blur-[70px] sm:blur-[100px] -translate-y-1/4 translate-x-1/4 pointer-events-none transition-colors duration-300"
      />

      {/* Technical Arched Grid Lines */}
      <GridLines />

      {/* Floating Hollow Ring */}
      <motion.div 
        animate={
          shouldReduceMotion
            ? false
            : { y: [-10, 10, -10], rotate: [0, 90, 0] }
        }
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-[13%] sm:top-[16%] left-[4%] sm:left-[6%] md:left-[10%] lg:left-[6%] w-7 h-7 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full border-4 sm:border-[6px] md:border-[8px] border-[#C8C4BB] dark:border-[#42403B] shadow-[0_0_12px_rgba(200,196,187,0.3)] dark:shadow-[0_0_12px_rgba(66,64,59,0.3)] pointer-events-none z-10"
      />

      {/* Floating Diamond Star */}
      <motion.div 
        animate={
          shouldReduceMotion
            ? false
            : { scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6], rotate: [0, 15, 0] }
        }
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-[26%] sm:top-[35%] md:top-[40%] right-[4%] sm:right-[6%] md:right-[8%] w-8 h-8 sm:w-12 sm:h-12 md:w-20 md:h-20 pointer-events-none z-10"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#C8C4BB] dark:text-[#42403B] drop-shadow-[0_0_8px_rgba(200,196,187,0.4)] dark:drop-shadow-[0_0_8px_rgba(66,64,59,0.4)]">
          <path d="M12 0C12 0 12 9 24 12C24 12 13 13 12 24C12 24 11 13 0 12C0 12 11 11 12 0Z" fill="currentColor" className="opacity-80" />
        </svg>
      </motion.div>

      {/* Modern Twinkling Sparkle Stars */}
      <SparkleStar className="top-[14%] right-[20%]" size="md" delay={0.6} />
      <SparkleStar className="bottom-[14%] left-[5%]" size="sm" delay={1.2} />

      {/* Mobile Small Circle Profile Button (Upper Left) */}
      <motion.button
        type="button"
        onClick={() => setIsCardOpen(true)}
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="lg:hidden fixed top-3.5 left-4 sm:top-4 sm:left-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full p-0.5 bg-[#FAF9F6]/90 dark:bg-[#1C1B18]/90 backdrop-blur-md border border-[#E5E2DB] dark:border-[#383632] shadow-sm hover:border-[#8A857C]/40 dark:hover:border-[#B0ABA1]/40 transition-all cursor-pointer group"
        aria-label="View profile card"
        title="Tap to view profile details"
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-[#EEECE6] dark:bg-[#252421] flex items-center justify-center pt-1 sm:pt-1.5">
          <img 
            src={profileImage} 
            alt="Lensen Degife" 
            className="w-full h-full object-cover object-top translate-y-0.5 sm:translate-y-1 group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      </motion.button>

      {/* --- MAIN CONTENT --- */}
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-9 lg:gap-8 xl:gap-12 z-20 w-full">
        
        {/* Left Column: Portrait Sticker Image (Desktop) */}
        <motion.div 
          initial={shouldReduceMotion ? false : { opacity: 0, y: 35, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          whileHover={shouldReduceMotion ? false : { y: -4, scale: 1.01 }}
          onClick={() => setIsCardOpen(true)}
          className="hidden lg:flex lg:w-auto lg:flex-initial flex-shrink-0 justify-end items-end relative isolate min-h-[520px] cursor-pointer group"
          title="Click to view profile card"
        >
          {/* Subtle Ambient Glow behind portrait */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[320px] lg:w-[380px] h-[200px] sm:h-[320px] lg:h-[380px] bg-[#E5E2DB]/50 dark:bg-[#2D2C28]/40 rounded-full blur-[60px] sm:blur-[90px] pointer-events-none -z-10" />

          {/* Profile Image */}
          <img 
            src={profileImage} 
            alt="Lensen Degife" 
            className="w-auto h-auto max-h-[520px] xl:max-h-[560px] max-w-[390px] xl:max-w-[420px] object-contain object-bottom drop-shadow-[0_12px_28px_rgba(0,0,0,0.12)] z-10 relative select-none transition-transform duration-300 group-hover:scale-[1.01]"
          />
        </motion.div>

        {/* Right Column: Text Content & Actions */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="w-full lg:w-auto lg:flex-1 max-w-xl xl:max-w-2xl flex flex-col justify-center items-start text-left"
        >
          {/* Section Pill Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#EEECE6] dark:bg-[#292825] border border-[#E5E2DB] dark:border-[#383632] shadow-xs mb-3 sm:mb-4"
          >
            <Sparkles size={13} className="text-[#8A857C] dark:text-[#B0ABA1] animate-pulse" />
            <span className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-[#2C2C2A] dark:text-[#EEECE6]">
              Welcome to my portfolio
            </span>
          </motion.div>

          {/* Heading - Smooth reveal */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] font-bold text-[#1A1A18] dark:text-[#FAF9F6] leading-[1.12] tracking-tight mb-3 sm:mb-3.5"
          >
            Hi, I&apos;m <span className="text-[#8A857C] dark:text-[#B0ABA1]">Lensen Degife</span>
          </motion.h1>
          
          {/* Typed.js Container with Terminal Icon */}
          <motion.div
            variants={itemVariants}
            className="text-base sm:text-xl md:text-2xl text-[#8A857C] dark:text-[#B0ABA1] mb-4 sm:mb-5 min-h-[2.25rem] sm:min-h-[2rem] font-medium tracking-wide flex items-center justify-start gap-2 sm:gap-2.5"
          >
            <Terminal size={18} className="text-[#8A857C] dark:text-[#B0ABA1] flex-shrink-0" />
            <span ref={typedRef} />
          </motion.div>
          
          {/* Balanced Structured Description */}
          <motion.div
            variants={itemVariants}
            className="w-full space-y-2 sm:space-y-2.5 mb-5 sm:mb-6"
          >
            <p className="text-base sm:text-lg text-[#2C2C2A] dark:text-[#EEECE6] font-medium leading-snug">
              Computer Science student at{' '}
              <span className="text-[#1A1A18] dark:text-white font-semibold">
                Addis Ababa University
              </span>
            </p>
            <p className="text-sm sm:text-base text-[#5C5A55] dark:text-[#A8A49C] leading-relaxed font-normal">
              Building scalable backend systems, responsive web & mobile apps, and robust high-performance solutions with clean architecture.
            </p>
          </motion.div>
          
          {/* Engineering Scope & Status Bar */}
          <motion.div
            variants={itemVariants}
            whileHover={shouldReduceMotion ? false : { y: -2 }}
            className="w-full max-w-xl p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-[#FAF9F6] dark:bg-[#1F1E1B] border border-[#E5E2DB] dark:border-[#2D2C28] hover:border-[#8A857C]/40 dark:hover:border-[#B0ABA1]/40 transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 shadow-xs mb-6 sm:mb-8"
          >
            <div className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#EEECE6] dark:bg-[#292825] border border-[#E5E2DB] dark:border-[#383632] text-[#2C2C2A] dark:text-[#EEECE6] text-xs sm:text-sm font-semibold shadow-xs">
              <Code2 size={13} className="text-[#8A857C] dark:text-[#B0ABA1]" />
              <span>Full-Stack & Systems Developer</span>
            </div>
            <div className="flex items-center justify-center gap-2 px-3 py-1 sm:pr-3.5 text-xs sm:text-sm text-[#5C5A55] dark:text-[#A8A49C]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7A8474] dark:bg-[#8F9C88] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7A8474] dark:bg-[#8F9C88]"></span>
              </span>
              <span className="font-medium text-[#5C5A55] dark:text-[#A8A49C]">Open to Opportunities</span>
            </div>
          </motion.div>

          {/* Action Buttons & Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-start gap-2.5 sm:gap-3 w-full"
          >
            <motion.a
              href={resumePdf}
              download
              whileHover={shouldReduceMotion ? false : { scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-4.5 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#2C2C2A] hover:bg-[#3F3F3C] text-white dark:bg-[#EEECE6] dark:hover:bg-white dark:text-[#1A1A18] font-semibold text-xs sm:text-sm border border-[#2C2C2A] dark:border-[#EEECE6] shadow-sm transition-all duration-200"
            >
              <Download size={15} className="text-white dark:text-[#1A1A18]" />
              <span>Download Resume</span>
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={shouldReduceMotion ? false : { scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector('#contact');
                if (target) {
                  const navOffset = 80;
                  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
                  window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-4.5 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#EEECE6] hover:bg-[#E5E2DB] text-[#2C2C2A] dark:bg-[#292825] dark:hover:bg-[#383632] dark:text-[#EEECE6] font-semibold text-xs sm:text-sm border border-[#E5E2DB] dark:border-[#383632] shadow-xs transition-all duration-200"
            >
              <Mail size={15} className="text-[#5C5A55] dark:text-[#A8A49C]" />
              <span>Contact Me</span>
            </motion.a>

            {/* Quick Social Icon Links */}
            <div className="flex items-center justify-center gap-2 sm:gap-2.5 mt-1 sm:mt-0">
              <motion.a
                href="https://github.com/lensen-degife"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={shouldReduceMotion ? false : { scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#EEECE6] hover:bg-[#E5E2DB] border border-[#E5E2DB] text-[#2C2C2A] hover:text-[#1A1A18] dark:bg-[#292825] dark:hover:bg-[#383632] dark:border-[#383632] dark:text-[#EEECE6] dark:hover:text-[#FAF9F6] flex items-center justify-center transition-all duration-200 shadow-xs"
                aria-label="GitHub Profile"
              >
                <SiGithub size={17} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/lensen-degife-60661b3b2/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={shouldReduceMotion ? false : { scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#EEECE6] hover:bg-[#E5E2DB] border border-[#E5E2DB] text-[#2C2C2A] hover:text-[#1A1A18] dark:bg-[#292825] dark:hover:bg-[#383632] dark:border-[#383632] dark:text-[#EEECE6] dark:hover:text-[#FAF9F6] flex items-center justify-center transition-all duration-200 shadow-xs"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={17} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 z-30"
      >
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            const target = document.querySelector('#about');
            if (target) {
              const navOffset = 80;
              const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
              window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
          }}
          className="flex flex-col items-center gap-1.5 text-xs text-[#9B9890] dark:text-[#78756E] hover:text-[#1A1A18] dark:hover:text-[#FAF9F6] transition-colors"
          aria-label="Scroll to about section"
        >
          <span className="tracking-widest uppercase font-semibold text-[10px]">Scroll</span>
          <motion.div
            animate={
              shouldReduceMotion
                ? false
                : { y: [0, 6, 0] }
            }
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown size={18} className="text-[#8A857C] dark:text-[#B0ABA1]" />
          </motion.div>
        </a>
      </motion.div>

      {/* --- PROFILE DETAILS CARD MODAL --- */}
      <AnimatePresence>
        {isCardOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsCardOpen(false)}
              className="absolute inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm sm:max-w-md rounded-3xl bg-[#FAF9F6] dark:bg-[#1C1B18] border border-[#E5E2DB] dark:border-[#2E2D29] shadow-2xl overflow-hidden z-10 font-sans"
            >
              {/* Card Header Banner with technical grid accent */}
              <div className="relative h-28 sm:h-32 bg-gradient-to-br from-[#EAE7DF] via-[#EEECE6] to-[#FAF9F6] dark:from-[#292825] dark:via-[#22211E] dark:to-[#1C1B18] overflow-hidden border-b border-[#E5E2DB]/60 dark:border-[#2E2D29]">
                <div className="absolute inset-0 bg-[radial-gradient(#C8C4BB_1px,transparent_1px)] dark:bg-[radial-gradient(#3A3834_1px,transparent_1px)] [background-size:12px_12px] opacity-40 pointer-events-none" />
                
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsCardOpen(false)}
                  className="absolute top-3.5 right-3.5 p-2 rounded-full bg-[#FAF9F6]/85 dark:bg-[#1C1B18]/85 hover:bg-[#EEECE6] dark:hover:bg-[#292825] text-[#5C5A55] dark:text-[#A8A49C] hover:text-[#1A1A18] dark:hover:text-[#FAF9F6] transition-all duration-200 border border-[#E5E2DB] dark:border-[#33312C] shadow-xs cursor-pointer z-20"
                  aria-label="Close card"
                >
                  <X size={18} />
                </button>

                {/* Badge in Banner */}
                <div className="absolute top-3.5 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9F6]/85 dark:bg-[#1C1B18]/85 backdrop-blur-sm border border-[#E5E2DB] dark:border-[#33312C] text-[10px] uppercase tracking-wider font-semibold text-[#8A857C] dark:text-[#B0ABA1]">
                  <Sparkles size={11} className="text-[#8A857C] dark:text-[#B0ABA1]" />
                  <span>Profile Overview</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="relative px-6 pb-6 pt-0 text-center">
                {/* Profile Picture with Ring & Indicator */}
                <div className="relative -mt-14 sm:-mt-16 mb-4 inline-block">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-[#FAF9F6] dark:bg-[#1C1B18] shadow-xl border border-[#E5E2DB] dark:border-[#33312C]">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-[#EEECE6] to-[#E5E2DB] dark:from-[#292825] dark:to-[#1F1E1B] flex items-center justify-center pt-2">
                      <img
                        src={profileImage}
                        alt="Lensen Degife"
                        className="w-full h-full object-cover object-top translate-y-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Personal Name */}
                <h3 className="text-2xl sm:text-2.5xl font-bold text-[#1A1A18] dark:text-[#FAF9F6] tracking-tight leading-snug mb-1.5">
                  Lensen Degife
                </h3>

                {/* Profession */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEECE6] dark:bg-[#292825] border border-[#E5E2DB] dark:border-[#383632] text-xs font-semibold text-[#2C2C2A] dark:text-[#EEECE6] mb-3.5 shadow-xs">
                  <Code2 size={13} className="text-[#8A857C] dark:text-[#B0ABA1]" />
                  <span>Software Engineer & Full-Stack Developer</span>
                </div>

                {/* University Card Info */}
                <div className="flex flex-col items-center justify-center gap-1 mb-4 p-3 rounded-2xl bg-[#EEECE6]/50 dark:bg-[#252420]/50 border border-[#E5E2DB]/80 dark:border-[#33312C]">
                  <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[#1A1A18] dark:text-[#FAF9F6]">
                    <GraduationCap size={18} className="text-[#8A857C] dark:text-[#B0ABA1] flex-shrink-0" />
                    <span>Addis Ababa University</span>
                  </div>
                  <p className="text-xs text-[#5C5A55] dark:text-[#A8A49C] font-medium">
                    B.Sc. in Computer Science • 3rd Year
                  </p>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-2 text-left mb-4">
                  <div className="p-2.5 rounded-xl bg-[#FAF9F6] dark:bg-[#22211E] border border-[#E5E2DB] dark:border-[#2E2D29]">
                    <span className="text-[10px] uppercase tracking-wider text-[#8A857C] dark:text-[#78756E] font-semibold block">Focus</span>
                    <span className="text-xs font-medium text-[#2C2C2A] dark:text-[#EEECE6]">Backend & Systems</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF9F6] dark:bg-[#22211E] border border-[#E5E2DB] dark:border-[#2E2D29]">
                    <span className="text-[10px] uppercase tracking-wider text-[#8A857C] dark:text-[#78756E] font-semibold block">Location</span>
                    <span className="text-xs font-medium text-[#2C2C2A] dark:text-[#EEECE6]">Addis Ababa, ET</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2.5">
                  <a
                    href={resumePdf}
                    download
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#2C2C2A] hover:bg-[#3F3F3C] text-white dark:bg-[#EEECE6] dark:hover:bg-white dark:text-[#1A1A18] font-semibold text-xs border border-[#2C2C2A] dark:border-[#EEECE6] shadow-sm transition-all duration-200"
                  >
                    <Download size={14} />
                    <span>Download CV</span>
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      setIsCardOpen(false);
                      e.preventDefault();
                      const target = document.querySelector('#contact');
                      if (target) {
                        const navOffset = 80;
                        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
                        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                      }
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#EEECE6] hover:bg-[#E5E2DB] text-[#2C2C2A] dark:bg-[#292825] dark:hover:bg-[#383632] dark:text-[#EEECE6] font-semibold text-xs border border-[#E5E2DB] dark:border-[#383632] shadow-xs transition-all duration-200"
                  >
                    <Mail size={14} />
                    <span>Contact Me</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
