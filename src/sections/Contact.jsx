import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import SectionHeading from '../components/SectionHeading';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'lensendegife@gmail.com',
    href: 'mailto:lensendegife@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Addis Ababa, Ethiopia',
    href: null,
  },
];

const socialLinks = [
  {
    icon: SiGithub,
    href: 'https://github.com/lensen-degife',
    label: 'GitHub',
  },
  {
    icon: FaLinkedin,
    href: 'https://www.linkedin.com/in/lensen-degife-60661b3b2/',
    label: 'LinkedIn',
  },
  {
    icon: Send,
    href: 'https://t.me/lensen_degife',
    label: 'Telegram',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('https://formspree.io/f/xzdjvlda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-slate-100/50 dark:bg-dark-surface/50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a question or want to work together? Let's connect!"
        />

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white dark:bg-dark-surface border border-slate-300 dark:border-dark-border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white dark:bg-dark-surface border border-slate-300 dark:border-dark-border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white dark:bg-dark-surface border border-slate-300 dark:border-dark-border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-indigo-500/25 cursor-pointer"
            >
              <Send size={18} />
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && (
              <p className="text-emerald-600 dark:text-emerald-400 text-sm text-center">
                Message sent successfully! I&apos;ll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-600 dark:text-red-400 text-sm text-center">
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg">
                      <info.icon
                        size={18}
                        className="text-indigo-600 dark:text-indigo-400"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-sm text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Connect With Me
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-all duration-200"
                    aria-label={link.label}
                  >
                    <link.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* CTA card */}
            <div className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
              <h4 className="font-semibold mb-2">
                Let&apos;s Build Something Together
              </h4>
              <p className="text-sm text-indigo-100 leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas,
                or opportunities to be part of your vision.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
