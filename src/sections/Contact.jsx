import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Send, Mail, MapPin, Sparkles, MessageSquare, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { FloatingDiamond, FloatingRing, SparkleStar, GridLines } from '../components/Decorations';

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
      className="relative w-full py-24 md:py-32 bg-[#F7F6F3] dark:bg-[#161614] overflow-hidden font-sans text-[#5C5A55] dark:text-[#A8A49C] transition-colors duration-300"
    >
      {/* Technical Background Grid Lines */}
      <GridLines />

      {/* --- BACKGROUND GLOWS - soft warm neutral --- */}
      <motion.div
        animate={
          shouldReduceMotion
            ? false
            : { scale: [1, 1.07, 1], opacity: [0.35, 0.55, 0.35] }
        }
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
        className="absolute top-10 right-0 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-[#E5E2DB]/50 dark:bg-[#2D2C28]/40 opacity-30 sm:opacity-50 rounded-full blur-[80px] sm:blur-[130px] translate-x-1/4 pointer-events-none transition-colors duration-300"
      />
      <div className="absolute bottom-0 left-0 w-[260px] sm:w-[450px] h-[260px] sm:h-[450px] bg-[#EEECE6]/60 dark:bg-[#292825]/40 opacity-30 sm:opacity-50 rounded-full blur-[70px] sm:blur-[110px] -translate-x-1/4 pointer-events-none transition-colors duration-300" />

      {/* --- MODERN DECORATIONS --- */}
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
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEECE6] dark:bg-[#292825] border border-[#E5E2DB] dark:border-[#383632] shadow-xs mb-4"
          >
            <MessageSquare size={14} className="text-[#8A857C] dark:text-[#B0ABA1] animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#2C2C2A] dark:text-[#EEECE6]">
              Get In Touch
            </span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A18] dark:text-[#FAF9F6] tracking-tight mb-4"
          >
            Let&apos;s Build <span className="text-[#8A857C] dark:text-[#B0ABA1]">Together</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.65, delay: 0.2, ease: 'easeOut' }}
            className="text-[#5C5A55] dark:text-[#A8A49C] max-w-2xl text-base sm:text-lg font-light leading-relaxed"
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
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 bg-[#FAF9F6] dark:bg-[#1F1E1B] border border-[#E5E2DB] dark:border-[#2D2C28] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-md shadow-black/5 hover:border-[#8A857C]/40 dark:hover:border-[#B0ABA1]/40 transition-colors duration-300"
          >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#1A1A18] dark:text-[#FAF9F6] mb-2"
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
                  className="w-full px-4 py-3 bg-white dark:bg-[#161614] border border-[#E5E2DB] dark:border-[#383632] rounded-xl text-[#1A1A18] dark:text-[#FAF9F6] placeholder-[#9B9890] dark:placeholder-[#78756E] focus:ring-1 focus:ring-[#8A857C] dark:focus:ring-[#B0ABA1] focus:border-[#8A857C] dark:focus:border-[#B0ABA1] outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#1A1A18] dark:text-[#FAF9F6] mb-2"
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
                  className="w-full px-4 py-3 bg-white dark:bg-[#161614] border border-[#E5E2DB] dark:border-[#383632] rounded-xl text-[#1A1A18] dark:text-[#FAF9F6] placeholder-[#9B9890] dark:placeholder-[#78756E] focus:ring-1 focus:ring-[#8A857C] dark:focus:ring-[#B0ABA1] focus:border-[#8A857C] dark:focus:border-[#B0ABA1] outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#1A1A18] dark:text-[#FAF9F6] mb-2"
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
                  className="w-full px-4 py-3 bg-white dark:bg-[#161614] border border-[#E5E2DB] dark:border-[#383632] rounded-xl text-[#1A1A18] dark:text-[#FAF9F6] placeholder-[#9B9890] dark:placeholder-[#78756E] focus:ring-1 focus:ring-[#8A857C] dark:focus:ring-[#B0ABA1] focus:border-[#8A857C] dark:focus:border-[#B0ABA1] outline-none transition-all duration-200 resize-none"
                />
              </div>

              {/* Submit Button & Direct Contact Line */}
              <div className="pt-2">
                <div className="w-full sm:bg-[#EEECE6] dark:sm:bg-[#292825] sm:border sm:border-[#E5E2DB] dark:sm:border-[#383632] sm:rounded-full sm:p-1.5 flex flex-col sm:flex-row items-center justify-between sm:shadow-xs transition-all duration-200">
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={shouldReduceMotion ? false : { scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto bg-[#2C2C2A] hover:bg-[#3F3F3C] text-white dark:bg-[#EEECE6] dark:hover:bg-white dark:text-[#1A1A18] px-7 py-3.5 rounded-xl sm:rounded-full font-semibold text-sm sm:text-[15px] flex items-center justify-center gap-2.5 shadow-md shadow-black/10 active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={18} className="animate-spin text-white dark:text-[#1A1A18]" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={16} className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5 text-white dark:text-[#1A1A18]" />
                      </>
                    )}
                  </motion.button>
                  <span className="hidden sm:inline-block text-[#2C2C2A] dark:text-[#EEECE6] font-medium text-sm sm:text-[15px] sm:pr-6 truncate">
                    lensendegife@gmail.com
                  </span>
                </div>

                {/* Mobile direct email link */}
                <div className="flex sm:hidden items-center justify-center gap-1.5 text-xs text-[#9B9890] dark:text-[#78756E] mt-2.5">
                  <span>Direct email:</span>
                  <a
                    href="mailto:lensendegife@gmail.com"
                    className="text-[#8A857C] dark:text-[#B0ABA1] font-medium hover:underline"
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
                    className="flex items-center gap-2.5 p-4 rounded-xl bg-[#7A8474]/15 border border-[#7A8474]/40 text-[#7A8474] dark:text-[#8F9C88] text-sm"
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
                    className="flex items-center gap-2.5 p-4 rounded-xl bg-[#EEECE6] dark:bg-[#292825] border border-[#E5E2DB] dark:border-[#383632] text-[#5C5A55] dark:text-[#A8A49C] text-sm"
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
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col space-y-5 sm:space-y-6"
          >
            {/* Direct Info Card */}
            <div className="bg-[#FAF9F6] dark:bg-[#1F1E1B] border border-[#E5E2DB] dark:border-[#2D2C28] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-md shadow-black/5">
              <h3 className="text-lg sm:text-xl font-bold text-[#1A1A18] dark:text-[#FAF9F6] mb-4 sm:mb-6 flex items-center gap-2 sm:gap-2.5">
                <Sparkles size={18} className="text-[#8A857C] dark:text-[#B0ABA1] animate-pulse" />
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
                      className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#EEECE6]/70 dark:bg-[#292825]/70 border border-[#E5E2DB] dark:border-[#383632] hover:border-[#8A857C]/40 dark:hover:border-[#B0ABA1]/40 hover:bg-[#EEECE6] dark:hover:bg-[#292825] transition-all duration-200"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#FAF9F6] dark:bg-[#1F1E1B] border border-[#E5E2DB] dark:border-[#383632] flex items-center justify-center flex-shrink-0 text-[#2C2C2A] dark:text-[#EEECE6] shadow-xs">
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#8A857C] dark:text-[#B0ABA1]">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-xs sm:text-base font-medium text-[#1A1A18] dark:text-[#FAF9F6] hover:text-[#8A857C] dark:hover:text-[#B0ABA1] transition-colors break-all sm:break-normal block"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-xs sm:text-base font-medium text-[#1A1A18] dark:text-[#FAF9F6] break-words">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Social Channels (Pill UI Buttons) */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#E5E2DB] dark:border-[#2D2C28]">
                <p className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-[#9B9890] dark:text-[#78756E] mb-3 sm:mb-4">
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
                        className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#EEECE6] hover:bg-[#E5E2DB] border border-[#E5E2DB] text-[#2C2C2A] hover:text-[#1A1A18] dark:bg-[#292825] dark:hover:bg-[#383632] dark:border-[#383632] dark:text-[#EEECE6] dark:hover:text-[#FAF9F6] text-xs sm:text-sm font-medium transition-all duration-200 shadow-xs"
                        aria-label={link.label}
                      >
                        <Icon size={15} className="text-[#5C5A55] dark:text-[#A8A49C] flex-shrink-0" />
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
              className="bg-[#FAF9F6] dark:bg-[#1F1E1B] border border-[#E5E2DB] dark:border-[#2D2C28] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-md shadow-black/5 transition-all duration-300"
            >
              <h4 className="text-base sm:text-lg font-bold text-[#1A1A18] dark:text-[#FAF9F6] mb-2">
                Open to Opportunities
              </h4>
              <p className="text-xs sm:text-sm text-[#5C5A55] dark:text-[#A8A49C] leading-relaxed font-light">
                Whether you have an internship opportunity, freelance project, full-stack opening, or open-source collaboration in mind, I&apos;m always glad to talk!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
