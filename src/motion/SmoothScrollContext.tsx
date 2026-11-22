import { createContext, useContext } from 'react';
import type Lenis from 'lenis';

export interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; duration?: number; immediate?: boolean }) => void;
  stop: () => void;
  start: () => void;
  isReducedMotion: boolean;
  toggleReducedMotion: () => void;
  isLite: boolean;
}

export const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
  isReducedMotion: false,
  toggleReducedMotion: () => {},
  isLite: false,
});

export const useLenis = () => useContext(SmoothScrollContext);
