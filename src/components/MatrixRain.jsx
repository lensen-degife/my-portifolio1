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
    let width = 0;
    let height = 0;
    let dpr = 1;

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

    // Resize handler with devicePixelRatio support for crisp rendering
    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

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

    // Pause when section is offscreen
    const io = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    // Rain drop representation
    class Stream {
      constructor(initialY) {
        this.reset(initialY);
      }

      reset(initialY) {
        this.x = 24 + Math.random() * Math.max(10, width - 48);
        this.y = initialY !== undefined ? initialY : -Math.random() * 90 - 20;
        this.speed = (3.2 + Math.random() * 3.4) * speedMultiplier;
        this.targetY = height - 16 - Math.random() * 45;
        this.length = 6 + Math.floor(Math.random() * 9);
        this.fontSize = width < 640 ? 11 : 13;
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
        ctx.font = `${this.fontSize}px 'JetBrains Mono', monospace`;

        for (let i = 0; i < this.length; i++) {
          const charY = this.y - i * (this.fontSize + 2);
          if (charY < -10 || charY > height + 10) continue;

          const progress = i / this.length;
          let alpha = Math.pow(1 - progress, 1.4) * (isDark ? 0.38 : 0.34);

          if (i === 0) {
            // Glowing leading head
            alpha = isDark ? 0.95 : 0.85;
            ctx.fillStyle = isDark
              ? `rgba(255, 255, 255, ${alpha})`
              : `rgba(44, 44, 42, ${alpha})`;
            ctx.shadowColor = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(44, 44, 42, 0.4)';
            ctx.shadowBlur = 6;
          } else {
            ctx.fillStyle = isDark
              ? `rgba(215, 211, 202, ${alpha})`
              : `rgba(138, 133, 124, ${alpha})`;
            ctx.shadowBlur = 0;
          }

          ctx.fillText(this.chars[i], this.x, charY);
        }

        ctx.shadowBlur = 0;
      }
    }

    // Impact "Boom" explosion
    class Boom {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.maxRadius = 28 + Math.random() * 14;
        this.opacity = 0.95;
        this.starScale = 0;
        this.starMaxScale = 1.2 + Math.random() * 0.5;
        this.dead = false;

        // Spark particles bursting upward and outward
        this.particles = [];
        const count = 7 + Math.floor(Math.random() * 5);
        for (let i = 0; i < count; i++) {
          // Spray upward in an arc (-165 deg to -15 deg)
          const angle = -Math.PI * 0.5 + (Math.random() - 0.5) * 1.9;
          const spd = 2.0 + Math.random() * 3.4;
          this.particles.push({
            x: this.x,
            y: this.y,
            vx: Math.cos(angle) * spd,
            vy: Math.sin(angle) * spd,
            size: 1.4 + Math.random() * 1.8,
            life: 1,
            decay: 0.032 + Math.random() * 0.025,
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
        // 1. Expanding Shockwave Ripple Rings
        if (this.opacity > 0) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.strokeStyle = isDark
            ? `rgba(238, 236, 230, ${this.opacity * 0.8})`
            : `rgba(70, 65, 60, ${this.opacity * 0.6})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Secondary expanding inner ring
          if (this.radius > 5) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 0.5, 0, Math.PI * 2);
            ctx.strokeStyle = isDark
              ? `rgba(255, 255, 255, ${this.opacity * 0.45})`
              : `rgba(44, 44, 42, ${this.opacity * 0.3})`;
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
              : `rgba(44, 44, 42, ${this.opacity * 0.3})`
          );
          grad.addColorStop(1, 'transparent');
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // 2. 4-point Sparkle Star Flash at impact center
        if (this.starScale > 0.05) {
          const s = this.starScale * 6.5;
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
            : `rgba(60, 55, 50, ${p.life * 0.75})`;
          ctx.fill();
        }
      }
    }

    // Active entities
    const streams = [];
    const booms = [];
    const targetCount = Math.max(6, Math.min(32, Math.floor((width / 1200) * density)));

    // Stagger initial streams
    for (let i = 0; i < targetCount; i++) {
      const initialY = Math.random() * (height * 0.85);
      streams.push(new Stream(initialY));
    }

    let frameCount = 0;

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      frameCount++;
      // Spawn new streams when below target count
      if (frameCount % 18 === 0 && streams.length < targetCount) {
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

    render();

    return () => {
      cancelAnimationFrame(animId);
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
