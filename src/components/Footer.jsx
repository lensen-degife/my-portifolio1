import { Mail, Send } from 'lucide-react';
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
  { icon: Send, href: 'https://t.me/lensen_degife', label: 'Telegram' },
];

export default function Footer() {
  return (
    <footer className="py-8 border-t border-slate-200 dark:border-dark-border bg-white dark:bg-dark-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Lensen Degife. Built with React &
            Tailwind CSS.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                aria-label={link.label}
              >
                <link.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}