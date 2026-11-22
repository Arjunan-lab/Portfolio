/**
 * Cinematic Motion Design Tokens
 * Unified curves, durations, and staggers for award-winning fluid choreography.
 */

export const MOTION_TOKENS = {
  easings: {
    cinematic: 'expo.out',
    smooth: 'power3.inOut',
    snap: 'power4.out',
    spring: 'elastic.out(1, 0.75)',
  },
  cssEasings: {
    cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
    smooth: 'cubic-bezier(0.65, 0, 0.35, 1)',
    snap: 'cubic-bezier(0.25, 1, 0.5, 1)',
  },
  durations: {
    micro: 0.25,
    base: 0.7,
    reveal: 1.1,
    scene: 1.6,
    route: 0.6,
  },
  staggers: {
    chars: 0.018,
    words: 0.06,
    lines: 0.12,
    cards: 0.1,
    pills: 0.05,
  },
} as const;

/**
 * Check if the user has requested reduced motion either via OS setting
 * or via the persisted website footer toggle.
 */
export const checkReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem('arjun_reduce_motion');
  if (stored !== null) {
    return stored === 'true';
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Check if the device is a touch-first device (no fine pointer)
 */
export const checkTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
};

/**
 * Check if automatic low-performance lite mode has engaged
 */
export const isLiteMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.__LITE_MODE__ === true;
};
