import { Mail, Send, Heart } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';

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
  return (
    <footer className="relative bg-slate-100/80 dark:bg-[#070214] border-t border-purple-100 dark:border-purple-500/20 py-12 overflow-hidden text-slate-600 dark:text-slate-300 font-sans transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-purple-200/40 dark:bg-[#290a59] rounded-full blur-[90px] opacity-50 dark:opacity-30 pointer-events-none transition-colors duration-300" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Brand info */}
          <div>
            <div className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center justify-center md:justify-start gap-1">
              <span>Lensen Degife</span>
              <span className="text-purple-600 dark:text-purple-400">.</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-light">
              Full-Stack Developer & Computer Science Student at Addis Ababa University
            </p>
          </div>

          {/* Social icons (Pill UI) */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-purple-200 dark:border-purple-500/20 hover:border-purple-300 dark:hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-[#311166] text-purple-700 hover:text-purple-900 dark:text-slate-300 dark:hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm dark:shadow-none hover:shadow-purple-500/10 dark:hover:shadow-[0_0_15px_rgba(49,17,102,0.5)] hover:-translate-y-0.5"
                  aria-label={link.label}
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom divider & copyright */}
        <div className="mt-8 pt-8 border-t border-purple-100 dark:border-purple-500/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>
            © {new Date().getFullYear()} Lensen Degife. Built with React, Vite & Tailwind CSS.
          </p>
          <p className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-light">
            Crafted with precision & passion <Heart size={13} className="text-purple-600 dark:text-purple-400 fill-purple-600 dark:fill-purple-400" />
          </p>
        </div>
      </div>
    </footer>
  );
}