import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const CODE_CHARS = '01<>{}/=+-~;:λπ#$_&|[]*!?0101'.split('');

export default function MatrixRain({
  className = '',
  density = 18,
  speedMultiplier = 1,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let isVisible = true;
    let isRunning = false;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let currentRenderWidth = 0;
    let currentRenderHeight = 0;

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

    // Resize handler with threshold protection against mobile address bar jitter
    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const newWidth = Math.floor(rect.width);
      const newHeight = Math.floor(rect.height);

      if (newWidth <= 0 || newHeight <= 0) return;

      // On iOS Safari & mobile Chrome, scrolling dynamically collapses/expands the address bar (~40-56px).
      // Resizing canvas clears the entire buffer and reallocates GPU textures, causing severe lag and blanking.
      // We skip resizing if width is identical (within 4px) and height change is small (< 65px).
      if (
        currentRenderWidth > 0 &&
        currentRenderHeight > 0 &&
        Math.abs(newWidth - currentRenderWidth) < 4 &&
        Math.abs(newHeight - currentRenderHeight) < 65
      ) {
        return;
      }

      currentRenderWidth = newWidth;
      currentRenderHeight = newHeight;
      width = newWidth;
      height = newHeight;

      // Keep DPR at 1 on mobile to prevent massive WebKit texture memory overhead and lag
      const isMobile = window.innerWidth < 768;
      dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const startLoop = () => {
      if (!isRunning && isVisible) {
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

    // Pause when section is offscreen to save 100% CPU/GPU for hidden canvases
    const io = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.02, rootMargin: '100px 0px 100px 0px' }
    );
    io.observe(container);

    // Target streams based on screen size: high enough on mobile to be clearly visible
    const getTargetCount = () => {
      const isMobile = width < 640;
      if (isMobile) {
        return Math.max(14, Math.floor((width / 390) * 16));
      }
      return Math.max(8, Math.min(32, Math.floor((width / 1200) * density)));
    };

    // Rain drop representation
    class Stream {
      constructor(initialY) {
        this.reset(initialY);
      }

      reset(initialY) {
        const isMobile = width < 640;
        this.x = 16 + Math.random() * Math.max(10, width - 32);
        this.y = initialY !== undefined ? initialY : -Math.random() * 90 - 20;
        this.speed = (2.8 + Math.random() * 3.2) * speedMultiplier;
        this.targetY = height - 16 - Math.random() * 45;
        this.length = isMobile
          ? 7 + Math.floor(Math.random() * 8)
          : 6 + Math.floor(Math.random() * 9);
        this.fontSize = isMobile ? 12 : 13;
        this.chars = [];
        for (let i = 0; i < this.length; i++) {
          this.chars.push(CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]);
        }
        this.dead = false;
      }

      update() {
        this.y += this.speed;

        // Randomly mutate internal characters for matrix digital flicker
        if (Math.random() > 0.6) {
          const idx = Math.floor(Math.random() * this.chars.length);
          this.chars[idx] = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
        }

        if (this.y >= this.targetY) {
          this.dead = true;
        }
      }

      draw() {
        const isMobile = width < 640;
        ctx.font = `${this.fontSize}px 'JetBrains Mono', ui-monospace, Menlo, Monaco, Consolas, monospace`;

        for (let i = 0; i < this.length; i++) {
          const charY = this.y - i * (this.fontSize + 2);
          if (charY < -10 || charY > height + 10) continue;

          const progress = i / this.length;
          // Clear, vibrant opacity for both dark and light modes
          const baseAlpha = isDark ? 0.76 : 0.64;
          let alpha = Math.pow(1 - progress, 1.1) * baseAlpha;

          if (i === 0) {
            // Glowing leading head
            alpha = isDark ? 1.0 : 0.95;
            ctx.fillStyle = isDark
              ? `rgba(255, 255, 255, ${alpha})`
              : `rgba(32, 32, 30, ${alpha})`;
            if (!isMobile) {
              ctx.shadowColor = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(32, 32, 30, 0.4)';
              ctx.shadowBlur = 6;
            }
          } else {
            ctx.fillStyle = isDark
              ? `rgba(215, 211, 202, ${alpha})`
              : `rgba(90, 85, 78, ${alpha})`;
            if (!isMobile) {
              ctx.shadowBlur = 0;
            }
          }

          ctx.fillText(this.chars[i], this.x, charY);
        }

        if (!isMobile) {
          ctx.shadowBlur = 0;
        }
      }
    }

    // Impact "Boom" explosion
    class Boom {
      constructor(x, y) {
        const isMobile = width < 640;
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.maxRadius = (isMobile ? 22 : 28) + Math.random() * 12;
        this.opacity = 0.95;
        this.starScale = 0;
        this.starMaxScale = 1.2 + Math.random() * 0.5;
        this.dead = false;

        // Spark particles bursting upward and outward
        this.particles = [];
        const count = (isMobile ? 6 : 8) + Math.floor(Math.random() * 4);
        for (let i = 0; i < count; i++) {
          // Spray upward in an arc (-165 deg to -15 deg)
          const angle = -Math.PI * 0.5 + (Math.random() - 0.5) * 1.9;
          const spd = (isMobile ? 1.8 : 2.0) + Math.random() * 3.0;
          this.particles.push({
            x: this.x,
            y: this.y,
            vx: Math.cos(angle) * spd,
            vy: Math.sin(angle) * spd,
            size: 1.4 + Math.random() * 1.6,
            life: 1,
            decay: 0.034 + Math.random() * 0.025,
          });
        }
      }

      update() {
        // Expand ripple ring
        this.radius += (this.maxRadius - this.radius) * 0.16 + 0.6;
        this.opacity = Math.max(0, this.opacity - 0.032);

        // Sparkle star burst animation
        if (this.opacity > 0.45) {
          this.starScale = Math.min(this.starMaxScale, this.starScale + 0.28);
        } else {
          this.starScale = Math.max(0, this.starScale - 0.09);
        }

        // Update spark particles
        for (const p of this.particles) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.08; // gentle gravity
          p.life -= p.decay;
        }

        if (this.opacity <= 0 && this.particles.every((p) => p.life <= 0)) {
          this.dead = true;
        }
      }

      draw() {
        const isMobile = width < 640;
        // 1. Expanding Shockwave Ripple Rings
        if (this.opacity > 0) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.strokeStyle = isDark
            ? `rgba(238, 236, 230, ${this.opacity * 0.85})`
            : `rgba(60, 55, 50, ${this.opacity * 0.7})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Secondary expanding inner ring
          if (this.radius > 5) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 0.5, 0, Math.PI * 2);
            ctx.strokeStyle = isDark
              ? `rgba(255, 255, 255, ${this.opacity * 0.5})`
              : `rgba(44, 44, 42, ${this.opacity * 0.35})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          // Center ambient flash glow
          const grad = ctx.createRadialGradient(
            this.x,
            this.y,
            0,
            this.x,
            this.y,
            this.radius * 0.9
          );
          grad.addColorStop(
            0,
            isDark
              ? `rgba(255, 255, 255, ${this.opacity * 0.5})`
              : `rgba(44, 44, 42, ${this.opacity * 0.35})`
          );
          grad.addColorStop(1, 'transparent');
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // 2. 4-point Sparkle Star Flash at impact center
        if (this.starScale > 0.05) {
          const s = this.starScale * (isMobile ? 5.2 : 6.5);
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.fillStyle = isDark
            ? `rgba(255, 255, 255, ${this.opacity * 0.95})`
            : `rgba(35, 33, 30, ${this.opacity * 0.85})`;
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
            ? `rgba(255, 245, 220, ${p.life * 0.9})`
            : `rgba(60, 55, 50, ${p.life * 0.8})`;
          ctx.fill();
        }
      }
    }

    // Active entities
    const streams = [];
    const booms = [];
    const initialTarget = getTargetCount();

    // Stagger initial streams
    for (let i = 0; i < initialTarget; i++) {
      const initialY = Math.random() * (height * 0.85);
      streams.push(new Stream(initialY));
    }

    let frameCount = 0;

    const render = () => {
      if (!isVisible) {
        isRunning = false;
        animId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      frameCount++;
      const targetCount = getTargetCount();
      // Spawn new streams when below target count
      if (frameCount % 14 === 0 && streams.length < targetCount) {
        streams.push(new Stream());
      }

      // Update & draw streams
      for (let i = streams.length - 1; i >= 0; i--) {
        const stream = streams[i];
        stream.update();
        stream.draw();

        if (stream.dead) {
          // Trigger the BOOM on impact!
          booms.push(new Boom(stream.x, stream.targetY));
          // Reset drop to fall again from top
          stream.reset();
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
      resizeObserver.disconnect();
      themeObserver.disconnect();
      io.disconnect();
    };
  }, [density, speedMultiplier, shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
