import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Github', href: '#github' },
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
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      { rootMargin: '-20% 0px -80% 0px' }
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
    <>
      {/* Top right actions: Theme Toggle + Mobile Menu Hamburger */}
      <div className="fixed top-4 right-4 md:top-5 md:right-6 z-50 flex items-center gap-2">
        <div className="bg-white/80 dark:bg-dark-bg/80 backdrop-blur-lg rounded-full p-1.5 shadow-md border border-slate-200/50 dark:border-dark-border/50">
          <ThemeToggle />
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-lg rounded-full shadow-md border border-slate-200/50 dark:border-dark-border/50 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Desktop Floating Nav */}
      <nav
        className={`hidden md:block fixed top-4 left-4 right-4 z-40 max-w-5xl mx-auto rounded-2xl transition-all duration-300 backdrop-saturate-150 ${
          scrolled
            ? 'bg-white/40 dark:bg-dark-bg/40 backdrop-blur-2xl shadow-xl shadow-slate-200/30 dark:shadow-black/30 border border-white/50 dark:border-white/10'
            : 'bg-white/30 dark:bg-dark-bg/30 backdrop-blur-xl shadow-lg shadow-slate-200/20 dark:shadow-black/20 border border-white/40 dark:border-white/5'
        }`}
      >
        <div className="px-6 flex items-center justify-center h-14">
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  activeSection === link.href.slice(1)
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Nav Dropdown & Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 dark:bg-black/50 backdrop-blur-xs md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 left-4 right-4 max-w-xs ml-auto md:hidden z-50 rounded-2xl bg-white/90 dark:bg-dark-bg/90 backdrop-blur-2xl shadow-xl shadow-slate-200/30 dark:shadow-black/30 border border-white/60 dark:border-white/10 p-3"
            >
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`block px-3 py-2 text-sm font-medium rounded-xl transition-colors duration-200 ${
                      activeSection === link.href.slice(1)
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
