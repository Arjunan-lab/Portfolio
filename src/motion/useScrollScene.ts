import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { checkReducedMotion } from './tokens';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * useScrollScene
 * Encapsulates a GSAP Context and ScrollTrigger lifecycle.
 * Safely cleans up all ScrollTriggers and tweens upon unmount, preventing leaks.
 */
export function useScrollScene(
  setup: (ctx: gsap.Context) => void,
  dependencies: React.DependencyList = []
) {
  const scopeRef = useRef<HTMLElement | HTMLDivElement | null>(null);

  useEffect(() => {
    if (checkReducedMotion()) return;

    const ctx = gsap.context(() => {
      setup(ctx);
    }, scopeRef);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return scopeRef;
}
