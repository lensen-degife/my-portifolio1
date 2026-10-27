import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const CODE_CHARS = '01<>{}/=+-~;:λπ#$_&|[]*!?0101'.split('');

export default function MatrixRain({
  className = '',
  density = 10,
  speedMultiplier = 1,
  isFixed = true,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId = null;
    let isRunning = false;
    let isPaused = false;
    let width = 0;
    let height = 0;
    let currentW = 0;
    let currentH = 0;
    let resizeTimer = null;

    // Detect dark mode
    const checkDark = () => document.documentElement.classList.contains('dark');
    let isDark = checkDark();

    const themeObserver = new MutationObserver(() => {
      isDark = checkDark();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const getDimensions = () => {
      const isMob = typeof window !== 'undefined' && window.innerWidth < 768;
      if (isFixed) {
        const screenH = typeof window !== 'undefined' && window.screen?.height ? window.screen.height : 844;
        const innerH = typeof window !== 'undefined' ? window.innerHeight : 844;
        return {
          w: typeof window !== 'undefined' ? window.innerWidth : 390,
          h: isMob ? Math.max(innerH, screenH) : innerH,
        };
      }
      const rect = container.getBoundingClientRect();
      return {
        w: Math.floor(rect.width) || (typeof window !== 'undefined' ? window.innerWidth : 390),
        h: Math.floor(rect.height) || (typeof window !== 'undefined' ? window.innerHeight : 844),
      };
    };

    const updateCanvasSize = (newW, newH) => {
      width = newW;
      height = newH;
      currentW = newW;
      currentH = newH;

      // On mobile: DPR = 1 prevents WebKit texture memory spikes and runs at 60fps
      // On desktop: DPR up to 1.5 for ultra-sharp characters
      const isMob = width < 768;
      const dpr = isMob ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const initialDims = getDimensions();
    updateCanvasSize(initialDims.w, initialDims.h);

    // Target stream count:
    // Reduced by 50% for both mobile (5-6 streams) and desktop (9-17 streams)
    const getTargetCount = () => {
      const isMob = width < 640;
      if (isMob) {
        return Math.max(5, Math.floor((width / 390) * 6));
      }
      return Math.max(9, Math.min(17, Math.floor((width / 1200) * density)));
    };

    // Strategic positioning on mobile:
    // 1 in left margin gutter, 1 in right margin gutter, rest distributed across visible viewport
    const getStreamX = (index, total) => {
      const isMob = width < 640;
      if (!isMob) {
        return 16 + Math.random() * Math.max(10, width - 32);
      }
      if (index === 0) return 8 + Math.random() * 14; // left margin gutter
      if (index === 1) return Math.max(20, width - 24 + Math.random() * 14); // right margin gutter
      // Center distribution
      const innerW = Math.max(30, width - 56);
      return 28 + Math.random() * innerW;
    };

    // Rain drop stream representation
    class Stream {
      constructor(initialY, index = 0, total = 6) {
        this.reset(initialY, index, total);
      }

      reset(initialY, index = 0, total = 6) {
        const isMob = width < 640;
        this.x = getStreamX(index, total);
        this.y = initialY !== undefined ? initialY : -Math.random() * 120 - 20;
        const baseSpeed = (2.2 + Math.random() * 2.8) * speedMultiplier;
        this.speed = shouldReduceMotion ? baseSpeed * 0.4 : baseSpeed;
        const safeHeight = Math.max(300, height);
        this.targetY = safeHeight - 8 - Math.random() * Math.min(60, safeHeight * 0.2);
        this.length = isMob
          ? 7 + Math.floor(Math.random() * 7)
          : 8 + Math.floor(Math.random() * 8);
        this.fontSize = isMob ? 13 : 13.5;
        this.chars = [];
        for (let i = 0; i < this.length; i++) {
          this.chars.push(CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]);
        }
        this.dead = false;
      }

      update() {
        this.y += this.speed;

        // Subtle digital character flicker
        if (Math.random() > 0.62) {
          const idx = Math.floor(Math.random() * this.chars.length);
          this.chars[idx] = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
        }

        if (this.y >= this.targetY) {
          this.dead = true;
        }
      }

      draw() {
        const isMob = width < 640;
        ctx.font = `600 ${this.fontSize}px 'JetBrains Mono', ui-monospace, Menlo, Monaco, Consolas, monospace`;

        for (let i = 0; i < this.length; i++) {
          const charY = this.y - i * (this.fontSize + 2);
          if (charY < -10 || charY > height + 20) continue;

          const progress = i / this.length;
          const alpha = Math.max(0.18, Math.pow(1 - progress, 1.1));

          if (i === 0) {
            // Bright leading head character
            ctx.fillStyle = isDark
              ? 'rgba(255, 255, 255, 0.98)'
              : 'rgba(24, 24, 22, 0.95)';
            if (!isMob) {
              ctx.shadowColor = isDark
                ? 'rgba(255, 255, 255, 0.7)'
                : 'rgba(24, 24, 22, 0.4)';
              ctx.shadowBlur = 4;
            }
          } else if (i === 1) {
            // High-contrast neck character
            ctx.fillStyle = isDark
              ? `rgba(238, 236, 230, ${Math.min(1, alpha * 1.1)})`
              : `rgba(40, 38, 34, ${Math.min(1, alpha * 1.05)})`;
            if (!isMob) {
              ctx.shadowBlur = 0;
            }
          } else {
            // Trailing characters fade down the tail in warm stone / dark charcoal
            ctx.fillStyle = isDark
              ? `rgba(215, 211, 202, ${alpha})`
              : `rgba(60, 56, 50, ${alpha})`;
            if (!isMob) {
              ctx.shadowBlur = 0;
            }
          }

          ctx.fillText(this.chars[i], this.x, charY);
        }

        if (!isMob) {
          ctx.shadowBlur = 0;
        }
      }
    }

    // Impact boom animation
    class Boom {
      constructor(x, y) {
        const isMob = width < 640;
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.maxRadius = (isMob ? 16 : 24) + Math.random() * 8;
        this.opacity = 0.9;
        this.starScale = 0;
        this.starMaxScale = 1.0 + Math.random() * 0.4;
        this.dead = false;
        this.particles = [];
        const count = (isMob ? 3 : 6) + Math.floor(Math.random() * 2);
        for (let i = 0; i < count; i++) {
          const angle = -Math.PI * 0.5 + (Math.random() - 0.5) * 1.8;
          const spd = (isMob ? 1.5 : 2.0) + Math.random() * 2.0;
          this.particles.push({
            x: this.x,
            y: this.y,
            vx: Math.cos(angle) * spd,
            vy: Math.sin(angle) * spd,
            size: 1.2 + Math.random() * 1.4,
            life: 1,
            decay: 0.045 + Math.random() * 0.03,
          });
        }
      }

      update() {
        this.radius += (this.maxRadius - this.radius) * 0.18 + 0.5;
        this.opacity = Math.max(0, this.opacity - 0.045);

        if (this.opacity > 0.4) {
          this.starScale = Math.min(this.starMaxScale, this.starScale + 0.25);
        } else {
          this.starScale = Math.max(0, this.starScale - 0.1);
        }

        for (const p of this.particles) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.09;
          p.life -= p.decay;
        }

        if (this.opacity <= 0 && this.particles.every((p) => p.life <= 0)) {
          this.dead = true;
        }
      }

      draw() {
        const isMob = width < 640;
        // 1. Shockwave Ripple Ring
        if (this.opacity > 0) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.strokeStyle = isDark
            ? `rgba(238, 236, 230, ${this.opacity * 0.8})`
            : `rgba(60, 55, 50, ${this.opacity * 0.65})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // 2. 4-point Sparkle Star Flash at impact center
        if (this.starScale > 0.05) {
          const s = this.starScale * (isMob ? 4.2 : 5.8);
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.fillStyle = isDark
            ? `rgba(255, 255, 255, ${this.opacity * 0.95})`
            : `rgba(30, 28, 26, ${this.opacity * 0.85})`;
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.quadraticCurveTo(0, 0, s, 0);
          ctx.quadraticCurveTo(0, 0, 0, s);
          ctx.quadraticCurveTo(0, 0, -s, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }

        // 3. Upward fountain spark particles
        for (const p of this.particles) {
          if (p.life <= 0) continue;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(255, 245, 220, ${p.life * 0.85})`
            : `rgba(60, 55, 50, ${p.life * 0.75})`;
          ctx.fill();
        }
      }
    }

    const streams = [];
    const booms = [];

    const reseedStreams = () => {
      const targetCount = getTargetCount();
      streams.length = 0;
      for (let i = 0; i < targetCount; i++) {
        // Stagger initial streams from 0 to height so matrix rain is immediately visible on load!
        const initialY = Math.random() * (Math.max(300, height) * 0.95);
        streams.push(new Stream(initialY, i, targetCount));
      }
    };

    reseedStreams();

    // Guarded against address bar collapse/expand jitter on mobile
    const handleResize = () => {
      const { w: newW, h: newH } = getDimensions();
      if (newW <= 0 || newH <= 0) return;

      if (
        currentW > 0 &&
        currentH > 0 &&
        Math.abs(newW - currentW) < 10 &&
        Math.abs(newH - currentH) < 120
      ) {
        return;
      }

      updateCanvasSize(newW, newH);
      reseedStreams();
    };

    const debouncedResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedResize);

    const startLoop = () => {
      if (!isRunning && !isPaused) {
        isRunning = true;
        animId = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      isRunning = false;
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPaused = true;
        stopLoop();
      } else {
        isPaused = false;
        startLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let frameCount = 0;

    const render = () => {
      if (isPaused) {
        isRunning = false;
        animId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      frameCount++;
      const targetCount = getTargetCount();
      const spawnInterval = width < 640 ? 28 : 22;
      if (frameCount % spawnInterval === 0 && streams.length < targetCount) {
        streams.push(new Stream(undefined, streams.length, targetCount));
      }

      // Update & draw streams
      for (let i = streams.length - 1; i >= 0; i--) {
        const stream = streams[i];
        stream.update();
        stream.draw();

        if (stream.dead) {
          const maxBooms = width < 640 ? 2 : 5;
          if (!shouldReduceMotion && booms.length < maxBooms) {
            booms.push(new Boom(stream.x, stream.targetY));
          }
          stream.reset(undefined, i, streams.length);
        }
      }

      // Update & draw booms
      for (let i = booms.length - 1; i >= 0; i--) {
        const boom = booms[i];
        boom.update();
        boom.draw();

        if (boom.dead) {
          booms.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    startLoop();

    return () => {
      stopLoop();
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener('resize', debouncedResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      themeObserver.disconnect();
    };
  }, [density, speedMultiplier, shouldReduceMotion, isFixed]);

  const positioningClass = isFixed ? 'fixed inset-0' : 'absolute inset-0';

  return (
    <div
      ref={containerRef}
      className={`${positioningClass} pointer-events-none z-[1] overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
}
