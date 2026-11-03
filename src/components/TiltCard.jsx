import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

/**
 * TiltCard Component (inspired by Eduard Bodak's interactive card physics)
 * Gives cards a tactile, physical 3D tilt reaction on mouse movement with spring physics.
 * Automatically disables on mobile / touch and respects prefers-reduced-motion.
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 6,
  scale = 1.015,
  lift = -5,
  glare = true,
  ...restProps
}) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Responsive spring physics for organic physical bounce
  const mouseXSpring = useSpring(x, { stiffness: 240, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 240, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${maxTilt}deg`, `-${maxTilt}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${maxTilt}deg`, `${maxTilt}deg`]);

  // Subtle interactive cursor glare position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    if (width === 0 || height === 0) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (shouldReduceMotion) {
    return (
      <div className={className} {...restProps}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: lift, scale }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      className={`relative ${className}`}
      {...restProps}
    >
      {children}

      {/* Gentle dynamic ambient surface sheen */}
      {glare && (
        <motion.div
          style={{
            left: glareX,
            top: glareY,
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/10 dark:bg-white/5 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      )}
    </motion.div>
  );
}
