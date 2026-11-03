import { createContext } from 'react';

/**
 * Context for sharing scroll depth exit progress with nested children.
 * Allows inner elements (e.g., text vs image) to sink/recede at layered rates.
 */
export const ScrollEliminateContext = createContext(null);

/**
 * ============================================================================
 * DEPTH EXIT PRESETS & 3D SPATIAL CONFIGURATION
 * ============================================================================
 * When scrolling down, elements smoothly:
 *   - Fade out: opacity 1 -> 0
 *   - Scale down: scale 1 -> minScale (0.88 - 0.93)
 *   - Recede into 3D depth: translateZ 0 -> depthZ (-45px to -80px)
 *   - Gently sink: translateY 0 -> depthY (+8px to +18px)
 *
 * This produces an unmistakable, tactile 3D sensation of elements gently
 * sinking/pushing away into the background plane as you scroll.
 *
 * Parameters:
 * - `offset`: [startTrigger, endTrigger] for Desktop/Tablet viewports
 * - `offsetMobile`: [startTrigger, endTrigger] tailored for iPhone / Safari mobile viewports
 * - `progressRange`: [fadeStart, fadeEnd] - fraction of travel (0.0 to 1.0)
 * - `minScale`: target scale at full exit (e.g. 0.90 - 0.92)
 * - `depthZ`: 3D pushback into the screen along Z-axis in pixels (e.g. -60 to -80)
 * - `depthY`: subtle vertical sinking translation in pixels (e.g. +8 to +16)
 * - `blur`: optional subtle blur intensity at full elimination (false or CSS string like '4px')
 */
export const ELIMINATION_PRESETS = {
  // Standard card / container depth exit
  default: {
    offset: ['start 0.16', 'end 0.02'],
    offsetMobile: ['start 0.20', 'end 0.02'],
    progressRange: [0.00, 0.88],
    minScale: 0.91,
    depthZ: -60,
    depthY: 12,
    depthRotateX: 6,
    blur: false,
  },
  // Section headers (titles, badges, subtitles)
  header: {
    offset: ['start 0.18', 'end 0.02'],
    offsetMobile: ['start 0.22', 'end 0.02'],
    progressRange: [0.00, 0.80],
    minScale: 0.93,
    depthZ: -50,
    depthY: 10,
    depthRotateX: 4,
    blur: false,
  },
  // Project cards, stat cards, milestone cards
  card: {
    offset: ['start 0.16', 'end 0.02'],
    offsetMobile: ['start 0.20', 'end 0.02'],
    progressRange: [0.00, 0.86],
    minScale: 0.90,
    depthZ: -70,
    depthY: 14,
    depthRotateX: 7,
    blur: false,
  },
  // Individual skill badges (one-by-one sequential depth exit)
  badge: {
    offset: ['start 0.16', 'end 0.02'],
    offsetMobile: ['start 0.20', 'end 0.02'],
    progressRange: [0.00, 0.72],
    minScale: 0.91,
    depthZ: -55,
    depthY: 10,
    depthRotateX: 5,
    blur: false,
  },
  // Text blocks (dissolves slightly earlier for layered depth)
  text: {
    offset: ['start 0.16', 'end 0.02'],
    offsetMobile: ['start 0.20', 'end 0.02'],
    progressRange: [0.00, 0.70],
    minScale: 0.94,
    depthZ: -45,
    depthY: 8,
    depthRotateX: 4,
    blur: false,
  },
  // Images / photos (holds crispness longer, dissolves with deeper spatial pushback)
  image: {
    offset: ['start 0.16', 'end 0.02'],
    offsetMobile: ['start 0.20', 'end 0.02'],
    progressRange: [0.10, 0.94],
    minScale: 0.88,
    depthZ: -80,
    depthY: 16,
    depthRotateX: 8,
    blur: false,
  },
  // Hero text & actions (starts receding early as user scrolls down from top of page)
  'hero-text': {
    offset: ['start start', 'end start'],
    offsetMobile: ['start start', 'end start'],
    progressRange: [0.02, 0.46],
    minScale: 0.91,
    depthZ: -60,
    depthY: 14,
    depthRotateX: 5,
    blur: false,
  },
  // Hero portrait sticker (stays sharp slightly longer than hero text for layered depth)
  'hero-image': {
    offset: ['start start', 'end start'],
    offsetMobile: ['start start', 'end start'],
    progressRange: [0.08, 0.58],
    minScale: 0.89,
    depthZ: -80,
    depthY: 18,
    depthRotateX: 8,
    blur: false,
  },
  // Hero scroll-down prompt indicator (fades out immediately when scroll begins)
  'hero-indicator': {
    offset: ['start start', 'end start'],
    offsetMobile: ['start start', 'end start'],
    progressRange: [0.00, 0.15],
    minScale: 0.85,
    depthZ: -30,
    depthY: 10,
    depthRotateX: 0,
    blur: false,
  },
};

/**
 * ============================================================================
 * SCROLL LAYER MULTI-PLANE DEPTH CONFIGURATION (Text vs Image)
 * ============================================================================
 * Used by <ScrollLayer> components inside cards:
 * - `text`: Dissolves earlier with lighter depth pushback.
 * - `image`: Holds crispness longer with deeper spatial pushback.
 */
export const LAYER_DEPTH_CONFIG = {
  text: {
    progressRange: [0.00, 0.65],
    minScale: 0.95,
    depthZ: -40,
    depthY: 8,
    depthRotateX: 4,
  },
  image: {
    progressRange: [0.10, 0.92],
    minScale: 0.88,
    depthZ: -75,
    depthY: 16,
    depthRotateX: 8,
  },
  fast: {
    progressRange: [0.00, 0.50],
    minScale: 0.92,
    depthZ: -50,
    depthY: 10,
    depthRotateX: 6,
  },
  slow: {
    progressRange: [0.10, 0.98],
    minScale: 0.88,
    depthZ: -80,
    depthY: 16,
    depthRotateX: 8,
  },
};
