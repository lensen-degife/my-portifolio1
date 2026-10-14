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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-[#070214]/80 backdrop-blur-md border-b border-purple-100 dark:border-purple-500/20 py-3 shadow-md shadow-slate-200/50 dark:shadow-[#070214]/60'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-2 group text-slate-900 dark:text-white font-bold text-xl tracking-tight transition-colors"
          >
            <span className="w-9 h-9 rounded-full bg-purple-600 dark:bg-[#311166] border border-purple-400/40 dark:border-purple-500/40 flex items-center justify-center text-sm font-semibold text-white shadow-sm dark:shadow-[0_0_15px_rgba(49,17,102,0.6)] group-hover:border-purple-400 group-hover:scale-105 transition-all">
              LD
            </span>
            <span>
              Lensen<span className="text-purple-600 dark:text-purple-400">.</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-purple-700 dark:text-purple-300 bg-purple-100/80 dark:bg-white/10 border border-purple-200 dark:border-purple-500/30 shadow-sm dark:shadow-[0_0_12px_rgba(49,17,102,0.4)]'
                      : 'text-slate-600 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50/60 dark:hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Action: Pill Resume Button + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={resumePdf}
              download
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-600 hover:bg-purple-700 dark:bg-[#311166] dark:hover:bg-[#3a1078] text-white text-sm font-semibold border border-purple-600 dark:border-purple-500/30 shadow-md shadow-purple-600/20 dark:shadow-none hover:shadow-purple-600/30 dark:hover:shadow-[0_0_20px_rgba(49,17,102,0.6)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <Download size={15} className="text-white dark:text-purple-300" />
              <span>Resume</span>
            </a>
            <div className="bg-purple-50 dark:bg-white/5 backdrop-blur-md rounded-full p-1 border border-purple-200 dark:border-purple-500/20">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Right Action: Hamburger + Theme Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <div className="bg-purple-50 dark:bg-white/5 backdrop-blur-md rounded-full p-1 border border-purple-200 dark:border-purple-500/20">
              <ThemeToggle />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700 dark:text-white bg-purple-50 dark:bg-white/5 backdrop-blur-md rounded-full border border-purple-200 dark:border-purple-500/20 hover:bg-purple-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-b border-purple-100 dark:border-purple-500/20 bg-white/95 dark:bg-[#070214]/95 backdrop-blur-xl px-4 pt-3 pb-6 shadow-2xl max-h-[calc(100dvh-4.5rem)] overflow-y-auto"
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
