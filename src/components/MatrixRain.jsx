import { useState, useEffect, useRef } from 'react';
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

  // Detect touch/mobile to completely disable canvas particle system on mobile devices
  const [isDisabled, setIsDisabled] = useState(() => {
    if (typeof window === 'undefined') return true;
    return (
      window.innerWidth < 768 ||
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)
    );
  });

  useEffect(() => {
    const checkDisabled = () => {
      const isTouchOrMobile =
        window.innerWidth < 768 ||
        window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
      setIsDisabled(isTouchOrMobile || !!shouldReduceMotion);
    };

    checkDisabled();
    window.addEventListener('resize', checkDisabled, { passive: true });
    return () => window.removeEventListener('resize', checkDisabled);
  }, [shouldReduceMotion]);

  useEffect(() => {
    // If on mobile/touch or reduced motion, completely abort canvas setup
    if (isDisabled || shouldReduceMotion) return;

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
      if (isFixed) {
        return {
          w: typeof window !== 'undefined' ? window.innerWidth : 1200,
          h: typeof window !== 'undefined' ? window.innerHeight : 800,
        };
      }
      const rect = container.getBoundingClientRect();
      return {
        w: Math.floor(rect.width) || (typeof window !== 'undefined' ? window.innerWidth : 1200),
        h: Math.floor(rect.height) || (typeof window !== 'undefined' ? window.innerHeight : 800),
      };
    };

    const updateCanvasSize = (newW, newH) => {
      width = newW;
      height = newH;
      currentW = newW;
      currentH = newH;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const initialDims = getDimensions();
    updateCanvasSize(initialDims.w, initialDims.h);

    const getTargetCount = () => {
      return Math.max(16, Math.min(32, Math.floor((width / 1200) * density)));
    };

    // Rain drop stream representation for desktop
    class Stream {
      constructor(initialY) {
        this.reset(initialY);
      }

      reset(initialY) {
        this.x = 20 + Math.random() * Math.max(10, width - 40);
        this.y = initialY !== undefined ? initialY : -Math.random() * 100 - 20;
        this.speed = (2.2 + Math.random() * 2.6) * speedMultiplier;
        const safeHeight = Math.max(400, height);
        this.targetY = safeHeight - 10 - Math.random() * 50;
        this.length = 7 + Math.floor(Math.random() * 8);
        this.fontSize = 13;
        this.chars = [];
        for (let i = 0; i < this.length; i++) {
          this.chars.push(CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]);
        }
        this.dead = false;
      }

      update() {
        this.y += this.speed;

        if (Math.random() > 0.65) {
          const idx = Math.floor(Math.random() * this.chars.length);
          this.chars[idx] = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
        }

        if (this.y >= this.targetY) {
          this.dead = true;
        }
      }

      draw() {
        ctx.font = `500 ${this.fontSize}px 'JetBrains Mono', ui-monospace, Menlo, Monaco, Consolas, monospace`;

        for (let i = 0; i < this.length; i++) {
          const charY = this.y - i * (this.fontSize + 2);
          if (charY < -10 || charY > height + 10) continue;

          const progress = i / this.length;
          const baseAlpha = isDark ? 0.85 : 0.78;
          const alpha = Math.max(0.12, Math.pow(1 - progress, 1.1) * baseAlpha);

          if (i === 0) {
            ctx.fillStyle = isDark
              ? 'rgba(255, 255, 255, 1.0)'
              : 'rgba(20, 20, 18, 1.0)';
            ctx.shadowColor = isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.3)';
            ctx.shadowBlur = 4;
          } else {
            ctx.fillStyle = isDark
              ? `rgba(224, 220, 212, ${alpha})`
              : `rgba(60, 56, 50, ${alpha})`;
            ctx.shadowBlur = 0;
          }

          ctx.fillText(this.chars[i], this.x, charY);
        }

        ctx.shadowBlur = 0;
      }
    }

    // Impact boom animation
    class Boom {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.maxRadius = 24 + Math.random() * 8;
        this.opacity = 0.9;
        this.starScale = 0;
        this.starMaxScale = 1.0 + Math.random() * 0.4;
        this.dead = false;

        this.particles = [];
        const count = 6 + Math.floor(Math.random() * 3);
        for (let i = 0; i < count; i++) {
          const angle = -Math.PI * 0.5 + (Math.random() - 0.5) * 1.8;
          const spd = 2.0 + Math.random() * 2.2;
          this.particles.push({
            x: this.x,
            y: this.y,
            vx: Math.cos(angle) * spd,
            vy: Math.sin(angle) * spd,
            size: 1.2 + Math.random() * 1.4,
            life: 1,
            decay: 0.04 + Math.random() * 0.03,
          });
        }
      }

      update() {
        this.radius += (this.maxRadius - this.radius) * 0.18 + 0.5;
        this.opacity = Math.max(0, this.opacity - 0.04);

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
        if (this.opacity > 0) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.strokeStyle = isDark
            ? `rgba(238, 236, 230, ${this.opacity * 0.8})`
            : `rgba(60, 55, 50, ${this.opacity * 0.65})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        if (this.starScale > 0.05) {
          const s = this.starScale * 5.8;
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
        const initialY = Math.random() * (Math.max(400, height) * 0.9);
        streams.push(new Stream(initialY));
      }
    };

    reseedStreams();

    const handleResize = () => {
      const { w: newW, h: newH } = getDimensions();
      if (newW <= 0 || newH <= 0) return;

      if (
        currentW > 0 &&
        currentH > 0 &&
        Math.abs(newW - currentW) < 8 &&
        Math.abs(newH - currentH) < 50
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
      if (frameCount % 16 === 0 && streams.length < targetCount) {
        streams.push(new Stream());
      }

      for (let i = streams.length - 1; i >= 0; i--) {
        const stream = streams[i];
        stream.update();
        stream.draw();

        if (stream.dead) {
          if (!shouldReduceMotion && booms.length < 10) {
            booms.push(new Boom(stream.x, stream.targetY));
          }
          stream.reset();
        }
      }

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
  }, [density, speedMultiplier, shouldReduceMotion, isFixed, isDisabled]);

  // If mobile, touch device, or prefers-reduced-motion, render nothing
  if (isDisabled || shouldReduceMotion) {
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
