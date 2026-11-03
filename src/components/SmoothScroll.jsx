import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * SmoothScroll Provider using Lenis
 * Adds weighted, cinematic inertial scrolling inspired by Eduard Bodak's portfolio.
 * Syncs seamlessly with Framer Motion scroll animations and respects accessibility.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Disable smooth scroll if reduced motion is requested
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.085, // Weighted inertia - neither too fast nor too sluggish
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      infinite: false,
    });

    if (typeof window !== 'undefined') {
      window.__lenis = lenis;
    }

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (typeof window !== 'undefined') {
        delete window.__lenis;
      }
    };
  }, []);

  return children;
}
