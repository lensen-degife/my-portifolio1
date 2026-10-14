import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Mail, Sparkles, Code2, Terminal } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import Typed from 'typed.js';

// Import assets
import resumePdf from '../assets/LensenDegifeCV1.pdf';
import profileImage from '../assets/img3.png';

export default function Hero() {
  const typedRef = useRef(null);

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

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#070214] overflow-hidden font-sans pt-28 pb-16 lg:pt-28 lg:pb-16 transition-colors duration-300"
    >
      {/* --- BACKGROUND DECORATIONS --- */}
      
      {/* Subtle Purple Base Glows */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-200/50 dark:bg-[#290a59] rounded-full blur-[120px] opacity-70 dark:opacity-50 translate-y-1/2 -translate-x-1/4 pointer-events-none transition-colors duration-300" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-200/40 dark:bg-[#1d0642] rounded-full blur-[100px] opacity-60 dark:opacity-40 -translate-y-1/4 translate-x-1/4 pointer-events-none transition-colors duration-300" />

      {/* Top Left Network Lines */}
      <svg className="absolute top-0 left-0 w-64 h-64 text-purple-600/15 dark:text-purple-400/20 pointer-events-none hidden md:block" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0L50 50L20 100L0 80" stroke="currentColor" strokeWidth="1.5" />
        <path d="M50 50L120 20L150 0" stroke="currentColor" strokeWidth="1.5" />
        <path d="M50 50L100 90L180 80" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="3" fill="currentColor" />
        <circle cx="20" cy="100" r="3" fill="currentColor" />
        <circle cx="120" cy="20" r="3" fill="currentColor" />
        <circle cx="100" cy="90" r="3" fill="currentColor" />
        <circle cx="180" cy="80" r="3" fill="currentColor" />
      </svg>

      {/* Top Right Network Lines */}
      <svg className="absolute top-0 right-0 w-80 h-80 text-purple-600/15 dark:text-purple-400/20 pointer-events-none transform rotate-90 hidden md:block" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M200 0L150 60L180 120L200 100" stroke="currentColor" strokeWidth="1.5" />
        <path d="M150 60L70 30L40 0" stroke="currentColor" strokeWidth="1.5" />
        <path d="M150 60L100 110L20 90" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="150" cy="60" r="3" fill="currentColor" />
        <circle cx="180" cy="120" r="3" fill="currentColor" />
        <circle cx="70" cy="30" r="3" fill="currentColor" />
        <circle cx="100" cy="110" r="3" fill="currentColor" />
        <circle cx="20" cy="90" r="3" fill="currentColor" />
      </svg>

      {/* Floating Hollow Ring */}
      <motion.div 
        animate={{ y: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-[16%] left-[4%] sm:left-[6%] md:left-[10%] lg:left-[6%] w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full border-4 sm:border-[6px] md:border-[8px] border-purple-500/40 dark:border-white/90 shadow-[0_0_15px_rgba(147,51,234,0.15)] dark:shadow-[0_0_15px_rgba(255,255,255,0.3)] pointer-events-none z-10 hidden xs:block"
      />

      {/* Floating Diamond Star */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute top-[40%] right-[8%] w-14 h-14 md:w-20 md:h-20 pointer-events-none z-10 hidden md:block"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600/50 dark:text-white">
          <path d="M12 0C12 0 12 9 24 12C24 12 13 13 12 24C12 24 11 13 0 12C0 12 11 11 12 0Z" fill="currentColor" className="opacity-70 dark:opacity-90" />
        </svg>
      </motion.div>

      {/* --- MAIN CONTENT --- */}
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col-reverse lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-8 z-20 w-full">
        
        {/* Left Column: Portrait Sticker Image */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 flex justify-center items-end relative isolate min-h-[300px] sm:min-h-[440px] lg:min-h-[620px]"
        >
          <img 
            src={profileImage} 
            alt="Lensen Degife" 
            className="w-auto h-auto max-h-[320px] sm:max-h-[460px] lg:max-h-[620px] xl:max-h-[660px] max-w-[85%] sm:max-w-[420px] lg:max-w-[480px] object-contain object-bottom drop-shadow-[0_12px_28px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_0_45px_rgba(147,51,234,0.45)] z-10 relative select-none"
          />
        </motion.div>

        {/* Right Column: Text Content & Actions */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left"
        >
          {/* Section Pill Badge - Matching other pages */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-purple-100/80 dark:bg-[#1d0642]/80 border border-purple-200 dark:border-purple-500/30 backdrop-blur-md shadow-sm dark:shadow-[0_0_20px_rgba(49,17,102,0.4)] mb-3 sm:mb-4"
          >
            <Sparkles size={13} className="text-purple-600 dark:text-purple-300" />
            <span className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-purple-700 dark:text-purple-300">
              Welcome to my portfolio
            </span>
          </motion.div>

          {/* Heading - Balanced responsive font size */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight mb-3 sm:mb-4">
            Hi, I&apos;m <span className="text-purple-600 dark:text-purple-300">Lensen Degife</span>
          </h1>
          
          {/* Typed.js Container with Terminal Icon - Flexible min-h prevents mobile overlap */}
          <div className="text-base sm:text-xl md:text-2xl text-purple-700 dark:text-purple-300 mb-4 sm:mb-5 min-h-[2.5rem] sm:min-h-[2.25rem] font-medium tracking-wide flex items-center justify-center lg:justify-start gap-2 sm:gap-2.5">
            <Terminal size={18} className="text-purple-600 dark:text-purple-400 flex-shrink-0" />
            <span ref={typedRef} />
          </div>
          
          {/* Description Paragraph - Aligned font size & rhythm */}
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed font-light mb-6 sm:mb-8">
            Computer Science student at Addis Ababa University. I engineer scalable backend systems, responsive web & mobile applications, and high-performance solutions with clean code.
          </p>
          
          {/* Engineering Scope & Status Bar (Light/Dark Glassmorphic) */}
          <div className="w-full max-w-xl p-2 sm:p-2.5 rounded-2xl sm:rounded-full bg-white/80 dark:bg-[#1d0642]/30 backdrop-blur-md border border-purple-200/80 dark:border-purple-500/20 hover:border-purple-300 dark:hover:border-purple-400/40 transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 shadow-lg shadow-purple-500/5 dark:shadow-purple-950/20 mb-6 sm:mb-8">
            <div className="w-full sm:w-auto flex items-center justify-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-purple-100/90 dark:bg-[#311166]/80 border border-purple-200 dark:border-purple-500/30 text-purple-900 dark:text-white text-xs sm:text-sm font-semibold shadow-sm">
              <Code2 size={14} className="text-purple-600 dark:text-purple-300" />
              <span>Full-Stack & Systems Developer</span>
            </div>
            <div className="flex items-center justify-center gap-2 px-3 py-1 sm:pr-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Open to Opportunities</span>
            </div>
          </div>

          {/* Action Buttons & Social Links - Touch-friendly full-width on mobile */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-stretch sm:items-center justify-center lg:justify-start w-full">
            <a
              href={resumePdf}
              download
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-purple-600 hover:bg-purple-700 dark:bg-[#311166] dark:hover:bg-[#3a1078] text-white font-semibold text-sm sm:text-base border border-purple-600 dark:border-purple-500/40 shadow-lg shadow-purple-600/20 dark:shadow-purple-950/50 hover:shadow-purple-600/30 dark:hover:shadow-[0_0_25px_rgba(49,17,102,0.6)] hover:border-purple-500 dark:hover:border-purple-400 hover:-translate-y-0.5 transition-all duration-200"
            >
              <Download size={17} className="text-white dark:text-purple-300" />
              <span>Download Resume</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector('#contact')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white hover:bg-purple-50/80 dark:bg-white/5 dark:hover:bg-white/10 text-purple-700 hover:text-purple-900 dark:text-purple-200 dark:hover:text-white font-semibold text-sm sm:text-base border border-purple-200 hover:border-purple-300 dark:border-purple-500/30 dark:hover:border-purple-400 shadow-sm hover:shadow-purple-500/10 dark:hover:shadow-[0_0_20px_rgba(49,17,102,0.4)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <Mail size={17} className="text-purple-600 dark:text-purple-300" />
              <span>Contact Me</span>
            </a>

            {/* Quick Social Icon Links */}
            <div className="flex items-center justify-center gap-2.5 mt-1 sm:mt-0">
              <a
                href="https://github.com/lensen-degife"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-purple-50 dark:bg-white/5 dark:hover:bg-[#311166] border border-purple-200 hover:border-purple-300 dark:border-purple-500/30 dark:hover:border-purple-400 text-purple-700 hover:text-purple-900 dark:text-purple-300 dark:hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-purple-500/10 dark:hover:shadow-[0_0_15px_rgba(49,17,102,0.5)] hover:-translate-y-0.5"
                aria-label="GitHub Profile"
              >
                <SiGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/lensen-degife-60661b3b2/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-purple-50 dark:bg-white/5 dark:hover:bg-[#311166] border border-purple-200 hover:border-purple-300 dark:border-purple-500/30 dark:hover:border-purple-400 text-purple-700 hover:text-purple-900 dark:text-purple-300 dark:hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-purple-500/10 dark:hover:shadow-[0_0_15px_rgba(49,17,102,0.5)] hover:-translate-y-0.5"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 z-30"
      >
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document
              .querySelector('#about')
              ?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1.5 text-xs text-purple-600/70 hover:text-purple-700 dark:text-purple-300/60 dark:hover:text-purple-300 transition-colors"
          aria-label="Scroll to about section"
        >
          <span className="tracking-widest uppercase font-semibold text-[10px]">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown size={18} className="text-purple-600 dark:text-purple-400/80" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}