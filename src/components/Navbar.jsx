import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import resumePdf from '../assets/LensenDegifeCV1.pdf';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'GitHub', href: '#github' },
  { name: 'Education', href: '#timeline' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
        <div className="flex items-center justify-end md:justify-center">
          {/* Desktop Floating Pill Navbar: Sized to components with glassmorphism */}
          <div
            className={`hidden md:inline-flex items-center gap-2 lg:gap-3 p-1.5 lg:p-2 rounded-full bg-white/70 dark:bg-[#070214]/70 backdrop-blur-2xl backdrop-saturate-150 border border-white/60 dark:border-white/10 pointer-events-auto transition-all duration-300 ${
              scrolled
                ? 'shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_12px_36px_rgba(79,70,229,0.1)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_36px_rgba(0,0,0,0.5)] border-purple-200/50 dark:border-purple-500/25'
                : 'shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_8px_24px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_24px_rgba(0,0,0,0.35)]'
            }`}
          >
            {/* Desktop Nav Links */}
            <nav className="flex items-center gap-0.5 lg:gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`px-3 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-purple-700 dark:text-purple-300 bg-purple-100/80 dark:bg-white/15 border border-purple-200/80 dark:border-white/20 shadow-xs dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] font-semibold'
                        : 'text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Resume Button + Theme Toggle inside floating pill */}
            <div className="flex items-center gap-2 pl-1.5 border-l border-slate-200/60 dark:border-white/10">
              <a
                href={resumePdf}
                download
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-purple-600 hover:bg-purple-700 dark:bg-[#311166] dark:hover:bg-[#3a1078] text-white text-xs lg:text-sm font-semibold border border-purple-600 dark:border-purple-500/30 shadow-sm shadow-purple-600/20 dark:shadow-none hover:shadow-purple-600/30 dark:hover:shadow-[0_0_15px_rgba(49,17,102,0.4)] transition-all duration-200"
              >
                <Download size={14} className="text-white dark:text-purple-300" />
                <span>Resume</span>
              </a>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Right Action: Hamburger + Theme Toggle (Floating, no navbar background) */}
          <div className="flex md:hidden items-center gap-2 pointer-events-auto">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-slate-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors rounded-full focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="md:hidden pointer-events-auto mx-4 mt-2 border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#070214]/80 backdrop-blur-2xl backdrop-saturate-150 px-4 pt-3 pb-6 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_40px_rgba(0,0,0,0.25)] max-h-[calc(100dvh-5rem)] overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'text-purple-700 dark:text-purple-300 bg-purple-100/80 dark:bg-white/10 border border-purple-200 dark:border-purple-500/30 font-semibold'
                        : 'text-slate-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50/60 dark:hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}

              <div className="pt-3 mt-1 border-t border-purple-100 dark:border-purple-500/20">
                <a
                  href={resumePdf}
                  download
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-purple-600 hover:bg-purple-700 dark:bg-[#311166] text-white text-sm font-semibold border border-purple-600 dark:border-purple-500/30 shadow-md hover:bg-purple-700 dark:hover:bg-[#3a1078] transition-colors"
                >
                  <Download size={16} className="text-white dark:text-purple-300" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
