import { useState, useEffect } from 'react';
import { setSectionFavicon, SECTION_METADATA } from '../utils/favicons';

export function useDynamicFavicon() {
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window !== 'undefined') {
      const initialHash = window.location.hash.replace('#', '');
      if (initialHash && SECTION_METADATA[initialHash]) {
        return initialHash;
      }
    }
    return 'hero';
  });

  useEffect(() => {
    setSectionFavicon(activeSection);
  }, [activeSection]);

  useEffect(() => {
    let currentActive = activeSection;

    const updateActiveSection = (sectionId) => {
      if (currentActive !== sectionId && SECTION_METADATA[sectionId]) {
        currentActive = sectionId;
        setActiveSection(sectionId);
        setSectionFavicon(sectionId);
      }
    };

    // 1. IntersectionObserver to detect which section is currently centered/active
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            updateActiveSection(sectionId);
          }
        });
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0.1,
      }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    // 3. Scroll listener to reset to hero when user is at the very top (guarded to prevent DOM thrashing)
    const handleScroll = () => {
      if (window.scrollY < 60 && currentActive !== 'hero') {
        updateActiveSection('hero');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 4. Hashchange listener
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        updateActiveSection(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return { activeSection };
}
