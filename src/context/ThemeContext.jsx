import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { flushSync } from 'react-dom';
import ThemeDropEffect from '../components/ThemeDropEffect';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  const [dropletState, setDropletState] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback((coords) => {
    if (isTransitioning) return;

    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    // Top-right corner coordinates near the toggle
    const defaultX = typeof window !== 'undefined' ? window.innerWidth - 65 : 100;
    const defaultY = 25;
    const x = coords?.x ?? defaultX;
    const y = coords?.y ?? defaultY;

    // Accessibility check: skip rich animation if reduced motion is requested
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setTheme(nextTheme);
      return;
    }

    setIsTransitioning(true);
    setDropletState({ x, y, targetTheme: nextTheme, stage: 'dropping' });

    // Step 1: Droplet falls from above corner into the toggle (~200ms)
    setTimeout(() => {
      setDropletState((prev) => (prev ? { ...prev, stage: 'splashing' } : null));

      // Step 2: Full-screen light/dark drop cascade
      if (typeof document !== 'undefined' && document.startViewTransition) {
        document.documentElement.classList.add('theme-transitioning');

        const transition = document.startViewTransition(() => {
          flushSync(() => {
            setTheme(nextTheme);
            const root = document.documentElement;
            if (nextTheme === 'dark') {
              root.classList.add('dark');
            } else {
              root.classList.remove('dark');
            }
            localStorage.setItem('theme', nextTheme);
          });
        });

        transition.ready
          .then(() => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const maxDistance = Math.max(
              Math.hypot(x, y),
              Math.hypot(width - x, y),
              Math.hypot(x, height - y),
              Math.hypot(width - x, height - y)
            );
            const finalRadius = Math.ceil(maxDistance * 1.35);

            // Ellipse clip-path keyframes creating the downward drop cascade from above the corner
            const keyframes = [
              {
                clipPath: `ellipse(0px 0px at ${x}px -25px)`,
              },
              {
                clipPath: `ellipse(${finalRadius * 0.22}px ${finalRadius * 0.48}px at ${x}px ${y + 40}px)`,
                offset: 0.35,
              },
              {
                clipPath: `ellipse(${finalRadius * 0.72}px ${finalRadius * 0.95}px at ${x}px ${y + 80}px)`,
                offset: 0.7,
              },
              {
                clipPath: `ellipse(${finalRadius}px ${finalRadius}px at ${x}px ${y}px)`,
                offset: 1,
              },
            ];

            const anim = document.documentElement.animate(keyframes, {
              duration: 720,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              pseudoElement: '::view-transition-new(root)',
            });

            anim.finished
              .catch(() => {})
              .finally(() => {
                document.documentElement.classList.remove('theme-transitioning');
                setIsTransitioning(false);
                setDropletState(null);
              });
          })
          .catch(() => {
            document.documentElement.classList.remove('theme-transitioning');
            setIsTransitioning(false);
            setDropletState(null);
          });
      } else {
        // Fallback for browsers without View Transitions (e.g., Firefox)
        setDropletState((prev) => (prev ? { ...prev, stage: 'fallback-cascade' } : null));

        setTimeout(() => {
          setTheme(nextTheme);
        }, 360);

        setTimeout(() => {
          setIsTransitioning(false);
          setDropletState(null);
        }, 760);
      }
    }, 200);
  }, [theme, isTransitioning]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
      <ThemeDropEffect dropletState={dropletState} />
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
