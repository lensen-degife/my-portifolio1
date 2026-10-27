import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const CODE_CHARS = '01<>{}/=+-~;:λπ#$_&|[]*!?0101'.split('');

export default function MatrixRain({
  className = '',
  density = 18,
  speedMultiplier = 1,
  isFixed = true,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

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
        // On mobile, size height generously so collapsing/expanding mobile address bar never leaves a gap
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

      // On mobile: strictly use DPR = 1 to prevent iOS WebKit texture memory spikes and lag.
      // On desktop: use up to 1.5 DPR for crisp text rendering.
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
    // On mobile: 6 streams (60% reduced from desktop density) for a clean, zero-lag aesthetic
    // On desktop: 16 to 34 streams depending on screen width
    const getTargetCount = () => {
      const isMob = width < 640;
      if (isMob) {
        return Math.max(5, Math.floor((width / 390) * 6));
      }
      return Math.max(16, Math.min(34, Math.floor((width / 1200) * density)));
    };

    // Strategic horizontal positioning:
    // On mobile: dedicated streams in left & right margins outside cards, plus ambient center
    const getStreamX = (index, total) => {
      const isMob = width < 640;
      if (!isMob) {
        return 16 + Math.random() * Math.max(10, width - 32);
      }
      // On mobile screen: guarantee 1 stream in left gutter
      if (index === 0) {
        return 6 + Math.random() * 20; // 6px - 26px left margin
      }
      // Guarantee 1 stream in right gutter
      if (index === 1) {
        return Math.max(20, width - 26 + Math.random() * 20); // right margin
      }
      // Remaining 3-4 streams distributed across viewport
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
        this.y = initialY !== undefined ? initialY : -Math.random() * 110 - 20;
        const baseSpeed = (2.2 + Math.random() * 2.6) * speedMultiplier;
        this.speed = baseSpeed;
        const safeHeight = Math.max(300, height);
        this.targetY = safeHeight - 8 - Math.random() * Math.min(60, safeHeight * 0.2);
        this.length = isMob
          ? 6 + Math.floor(Math.random() * 6)
          : 7 + Math.floor(Math.random() * 8);
        this.fontSize = isMob ? 12 : 13;
        this.chars = [];
        for (let i = 0; i < this.length; i++) {
          this.chars.push(CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]);
        }
        this.dead = false;
      }

      update() {
        this.y += this.speed;

        // Subtle digital character flicker
        if (Math.random() > 0.65) {
          const idx = Math.floor(Math.random() * this.chars.length);
          this.chars[idx] = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
        }

        if (this.y >= this.targetY) {
          this.dead = true;
        }
      }

      draw() {
        const isMob = width < 640;
        ctx.font = `500 ${this.fontSize}px 'JetBrains Mono', ui-monospace, Menlo, Monaco, Consolas, monospace`;

        for (let i = 0; i < this.length; i++) {
          const charY = this.y - i * (this.fontSize + 2);
          if (charY < -10 || charY > height + 10) continue;

          const progress = i / this.length;
          // Clear, punchy contrast in both light and dark modes
          const baseAlpha = isDark ? 0.88 : 0.82;
          const alpha = Math.max(0.12, Math.pow(1 - progress, 1.1) * baseAlpha);

          if (i === 0) {
            // Leading head character
            ctx.fillStyle = isDark
              ? 'rgba(255, 255, 255, 1.0)'
              : 'rgba(20, 20, 18, 1.0)';
            if (!isMob) {
              ctx.shadowColor = isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.3)';
              ctx.shadowBlur = 4;
            }
          } else {
            // Trailing body characters
            ctx.fillStyle = isDark
              ? `rgba(224, 220, 212, ${alpha})`
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
        const initialY = Math.random() * (Math.max(300, height) * 0.9);
        streams.push(new Stream(initialY, i, targetCount));
      }
    };

    reseedStreams();

    // Resize handler: On mobile, ignore vertical-only fluctuations under 120px
    // (caused by dynamic Safari/Chrome address bar collapse on scroll)
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

    // Pause when browser tab is inactive to preserve 100% battery & 0% CPU
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
      const spawnInterval = width < 640 ? 24 : 16;
      if (frameCount % spawnInterval === 0 && streams.length < targetCount) {
        streams.push(new Stream(undefined, streams.length, targetCount));
      }

      // Update & draw streams
      for (let i = streams.length - 1; i >= 0; i--) {
        const stream = streams[i];
        stream.update();
        stream.draw();

        if (stream.dead) {
          const maxBooms = width < 640 ? 3 : 10;
          if (booms.length < maxBooms) {
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

  if (shouldReduceMotion) {
    return null;
  }

  const positioningClass = isFixed ? 'fixed inset-0' : 'absolute inset-0';

  return (
    <div
      ref={containerRef}
      className={`${positioningClass} pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
}
