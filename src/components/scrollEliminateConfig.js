import { createContext } from 'react';

/**
 * Context for sharing scroll elimination progress with nested children.
 * Allows inner elements (e.g., text vs image) to fade at staggered rates.
 */
export const ScrollEliminateContext = createContext(null);

/**
 * ============================================================================
 * SCROLL ELIMINATION PRESETS & TIMING CONFIGURATION
 * ============================================================================
 * You can easily tweak any of these numbers to change how quickly or gently
 * elements fade out and scale down as they scroll out of the viewport.
 *
 * - `offset`: [startTrigger, endTrigger] for Desktop/Tablet
 * - `offsetMobile`: [startTrigger, endTrigger] tailored for iPhone / Safari mobile viewports
 * - `progressRange`: [fadeStart, fadeEnd]
 *   - Fraction of the scroll travel (0.0 to 1.0) during which opacity drops from 1 -> 0.
 * - `minScale`: Target scale at full elimination (e.g. 0.94 = slight scale-down).
 * - `blur`: Optional blur intensity at full elimination (false or CSS string like '4px').
 */
export const ELIMINATION_PRESETS = {
  // Standard card / container elimination
  default: {
    offset: ['start 0.16', 'end 0.02'],
    offsetMobile: ['start 0.20', 'end 0.02'],
    progressRange: [0, 0.88],
    minScale: 0.94,
    blur: false,
  },
  // Section headers (titles, badges, subtitles)
  header: {
    offset: ['start 0.18', 'end 0.02'],
    offsetMobile: ['start 0.22', 'end 0.02'],
    progressRange: [0, 0.80],
    minScale: 0.95,
    blur: false,
  },
  // Project cards, stat cards, milestone cards
  card: {
    offset: ['start 0.16', 'end 0.02'],
    offsetMobile: ['start 0.20', 'end 0.02'],
    progressRange: [0, 0.86],
    minScale: 0.94,
    blur: false,
  },
  // Individual skill badges (compact items, one-by-one sequential elimination)
  badge: {
    offset: ['start 0.16', 'end 0.02'],
    offsetMobile: ['start 0.20', 'end 0.02'],
    progressRange: [0, 0.72],
    minScale: 0.92,
    blur: false,
  },
  // Text blocks (dissolves slightly earlier for layered depth)
  text: {
    offset: ['start 0.16', 'end 0.02'],
    offsetMobile: ['start 0.20', 'end 0.02'],
    progressRange: [0, 0.70],
    minScale: 0.95,
    blur: false,
  },
  // Images / photos (holds crispness longer, dissolves later)
  image: {
    offset: ['start 0.16', 'end 0.02'],
    offsetMobile: ['start 0.20', 'end 0.02'],
    progressRange: [0.10, 0.94],
    minScale: 0.93,
    blur: false,
  },
  // Hero text & actions (starts fading early as user scrolls down from top of page)
  'hero-text': {
    offset: ['start start', 'end start'],
    offsetMobile: ['start start', 'end start'],
    progressRange: [0.02, 0.46],
    minScale: 0.93,
    blur: false,
  },
  // Hero portrait sticker (stays sharp slightly longer than hero text for layered depth)
  'hero-image': {
    offset: ['start start', 'end start'],
    offsetMobile: ['start start', 'end start'],
    progressRange: [0.08, 0.58],
    minScale: 0.94,
    blur: false,
  },
  // Hero scroll-down prompt indicator (fades out immediately when scroll begins)
  'hero-indicator': {
    offset: ['start start', 'end start'],
    offsetMobile: ['start start', 'end start'],
    progressRange: [0, 0.15],
    minScale: 0.90,
    blur: false,
  },
};
