import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Send, Mail, MapPin, Sparkles, MessageSquare, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { NetworkLines, FloatingDiamond, FloatingRing, SparkleStar } from '../components/Decorations';

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
    href: 'https://t.me/CipherLens',
    label: 'Telegram',
  },
];

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
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
      className="relative w-full py-24 md:py-32 bg-slate-50 dark:bg-[#070214] overflow-hidden font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300"
    >
      {/* --- BACKGROUND GLOWS --- */}
      <motion.div
        animate={
          shouldReduceMotion
            ? false
            : { scale: [1, 1.07, 1], opacity: [0.5, 0.7, 0.5] }
        }
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
        className="absolute top-10 right-0 w-[500px] h-[500px] bg-purple-200/50 dark:bg-[#290a59] rounded-full blur-[130px] translate-x-1/4 pointer-events-none transition-colors duration-300"
      />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-indigo-200/40 dark:bg-[#1d0642] rounded-full blur-[110px] opacity-60 dark:opacity-50 -translate-x-1/4 pointer-events-none transition-colors duration-300" />

      {/* --- MODERN DECORATIONS --- */}
      <NetworkLines
        position="top-right"
        variant="corner"
        className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72"
        delay={0.2}
      />
      <NetworkLines
        position="bottom-left"
        variant="branch"
        className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72"
        delay={0.3}
      />

      <FloatingRing
        className="top-16 sm:top-28 left-[4%] sm:left-[10%]"
        size="md"
        duration={6}
      />

      <SparkleStar
        className="top-[32%] right-[6%] sm:right-[10%]"
        size="md"
        delay={0.6}
      />
      <SparkleStar
        className="bottom-[18%] left-[6%] sm:left-[10%]"
        size="sm"
        delay={1.2}
      />
      <FloatingDiamond
        className="bottom-[10%] right-[8%] sm:right-[14%]"
        size="sm"
        delay={1.7}
      />

      {/* --- SECTION CONTENT --- */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        {/* Header with Floating Diamond Star */}
        <div className="relative flex flex-col items-center text-center mb-16 md:mb-20">
          <FloatingDiamond
            className="-top-6 right-2 sm:right-16 md:right-28 lg:right-36"
            size="md"
            duration={4}
          />

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 dark:bg-[#1d0642]/80 border border-purple-200 dark:border-purple-500/30 backdrop-blur-md shadow-sm dark:shadow-[0_0_20px_rgba(49,17,102,0.4)] mb-4"
          >
            <MessageSquare size={14} className="text-purple-600 dark:text-purple-300 animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-semibold text-purple-700 dark:text-purple-300">
              Get In Touch
            </span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4"
          >
            Let&apos;s Build <span className="text-purple-600 dark:text-purple-300">Together</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-slate-600 dark:text-slate-300 max-w-2xl text-base sm:text-lg font-light leading-relaxed"
          >
            Have a project in mind, a potential collaboration, or simply want to connect? Reach out and I&apos;ll get back to you promptly.
          </motion.p>
        </div>

        {/* 2-Column Contact Section */}
        <div className="grid lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          {/* Left Column: Form with Smooth Directional Reveal */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 bg-white/80 dark:bg-[#1d0642]/10 backdrop-blur-md border border-purple-100 dark:border-purple-500/20 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl shadow-purple-500/5 dark:shadow-2xl dark:shadow-purple-950/20 hover:border-purple-200 dark:hover:border-purple-500/40 transition-colors duration-300"
          >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Yonas"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-[#0a0216] border border-purple-200 dark:border-purple-500/30 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@gmail.com"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-[#0a0216] border border-purple-200 dark:border-purple-500/30 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your idea, project, or inquiry..."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-[#0a0216] border border-purple-200 dark:border-purple-500/30 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                />
              </div>

              {/* Submit Button & Direct Contact Line */}
              <div className="pt-2">
                <div className="w-full sm:bg-purple-50/80 sm:dark:bg-white/5 sm:border sm:border-purple-200 sm:dark:border-purple-500/30 sm:rounded-full sm:p-1.5 flex flex-col sm:flex-row items-center justify-between sm:shadow-sm sm:dark:shadow-2xl transition-all duration-200 sm:hover:shadow-md sm:dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]">
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={shouldReduceMotion ? false : { scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 dark:bg-[#311166] dark:hover:bg-[#3a1078] text-white px-7 py-3.5 rounded-xl sm:rounded-full font-semibold text-sm sm:text-[15px] flex items-center justify-center gap-2.5 shadow-lg shadow-purple-600/25 dark:shadow-[0_0_20px_rgba(49,17,102,0.6)] hover:shadow-purple-600/35 dark:hover:shadow-[0_0_25px_rgba(49,17,102,0.8)] active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={18} className="animate-spin text-white" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={16} className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5 text-purple-200 dark:text-purple-300" />
                      </>
                    )}
                  </motion.button>
                  <span className="hidden sm:inline-block text-purple-900 dark:text-slate-200 font-medium text-sm sm:text-[15px] sm:pr-6 truncate">
                    lensendegife@gmail.com
                  </span>
                </div>

                {/* Mobile direct email link */}
                <div className="flex sm:hidden items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-2.5">
                  <span>Direct email:</span>
                  <a
                    href="mailto:lensendegife@gmail.com"
                    className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
                  >
                    lensendegife@gmail.com
                  </a>
                </div>
              </div>

              {/* Status Feedback Alerts */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2.5 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-sm"
                  >
                    <CheckCircle2 size={18} className="flex-shrink-0" />
                    <span>Thank you! Your message was sent successfully. I will get back to you soon.</span>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2.5 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-sm"
                  >
                    <AlertCircle size={18} className="flex-shrink-0" />
                    <span>Oops! Something went wrong. Please try again or email me directly at lensendegife@gmail.com.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Right Column: Contact Details & Socials */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col space-y-5 sm:space-y-6"
          >
            {/* Direct Info Card */}
            <div className="bg-white/80 dark:bg-[#1d0642]/10 backdrop-blur-md border border-purple-100 dark:border-purple-500/20 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl shadow-purple-500/5">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-2.5">
                <Sparkles size={18} className="text-purple-600 dark:text-purple-300 animate-pulse" />
                Contact Details
              </h3>

              <div className="space-y-3.5 sm:space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={info.label}
                      whileHover={shouldReduceMotion ? false : { x: 3 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-purple-50/70 dark:bg-white/5 border border-purple-200/70 dark:border-purple-500/20 hover:border-purple-300 dark:hover:border-purple-400/50 hover:bg-purple-100/60 dark:hover:bg-white/10 transition-all duration-200"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-100 dark:bg-[#311166]/60 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center flex-shrink-0 text-purple-700 dark:text-purple-300 shadow-sm">
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-xs sm:text-base font-medium text-slate-900 dark:text-white hover:text-purple-700 dark:hover:text-purple-300 transition-colors break-all sm:break-normal block"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-xs sm:text-base font-medium text-slate-900 dark:text-white break-words">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Social Channels (Pill UI Buttons) */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-purple-100 dark:border-purple-500/20">
                <p className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-3 sm:mb-4">
                  Connect on Social Media
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={shouldReduceMotion ? false : { scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-purple-50 dark:bg-white/5 hover:bg-purple-100 dark:hover:bg-[#311166] border border-purple-200 dark:border-purple-500/30 hover:border-purple-300 dark:hover:border-purple-400 text-purple-700 hover:text-purple-900 dark:text-white text-xs sm:text-sm font-medium transition-all duration-200 shadow-sm dark:shadow-none hover:shadow-purple-500/10 dark:hover:shadow-[0_0_15px_rgba(49,17,102,0.5)]"
                        aria-label={link.label}
                      >
                        <Icon size={15} className="text-purple-600 dark:text-purple-300 flex-shrink-0" />
                        <span>{link.label}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Collaboration Callout */}
            <motion.div
              whileHover={shouldReduceMotion ? false : { y: -2 }}
              className="bg-gradient-to-br from-purple-100/90 to-indigo-100/90 border border-purple-200 dark:from-[#1d0642]/20 dark:to-[#070214]/60 dark:border-purple-500/30 rounded-2xl sm:rounded-3xl p-5 sm:p-8 backdrop-blur-md shadow-xl shadow-purple-500/5 dark:shadow-2xl transition-all duration-300"
            >
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                Open to Opportunities
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                Whether you have an internship opportunity, freelance project, full-stack opening, or open-source collaboration in mind, I&apos;m always glad to talk!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
