import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { checkReducedMotion } from './tokens';
import { SmoothScrollContext } from './SmoothScrollContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(() => checkReducedMotion());
  const [lenisInstance] = useState<Lenis | null>(() => {
    if (typeof window === 'undefined' || checkReducedMotion()) return null;
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      syncTouch: false,
      autoRaf: true,
    });
    // Safely assign global instance for dev/debug inspection without type conflict
    (window as unknown as { lenis?: unknown }).lenis = lenis;
    return lenis;
  });

  const [isLite, setIsLite] = useState<boolean>(false);
  const [debugFps, setDebugFps] = useState<number>(60);
  const isDebug = typeof window !== 'undefined' && window.location.search.includes('motion=debug');
  
  const location = useLocation();
  const lowFpsCountRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);

  // Toggle user preference and persist
  const toggleReducedMotion = useCallback(() => {
    setIsReducedMotion(prev => {
      const next = !prev;
      localStorage.setItem('arjun_reduce_motion', String(next));
      if (next && lenisInstance) {
        lenisInstance.destroy();
        (window as unknown as { lenis?: unknown }).lenis = null;
      }
      return next;
    });
  }, [lenisInstance]);

  // Synchronize Lenis with ScrollTrigger
  useEffect(() => {
    if (!lenisInstance || isReducedMotion) return;

    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenisInstance.on('scroll', onScroll);

    // Keep GSAP lag smoothing active to smoothly absorb any GC or asset-load hitches
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      lenisInstance.off('scroll', onScroll);
      lenisInstance.destroy();
      (window as unknown as { lenis?: unknown }).lenis = null;
    };
  }, [lenisInstance, isReducedMotion]);

  // Dev-only FPS performance monitor (?motion=debug)
  useEffect(() => {
    if (!isDebug) return;

    lastTimeRef.current = performance.now();
    let animId: number;

    const measureFps = () => {
      const now = performance.now();
      frameCountRef.current++;

      if (now - lastTimeRef.current >= 1000) {
        const currentFps = Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current));
        frameCountRef.current = 0;
        lastTimeRef.current = now;
        setDebugFps(currentFps);

        if (currentFps < 30) {
          lowFpsCountRef.current++;
          if (lowFpsCountRef.current >= 5) {
            window.__LITE_MODE__ = true;
            setIsLite(true);
          }
        } else {
          lowFpsCountRef.current = 0;
        }
      }

      animId = requestAnimationFrame(measureFps);
    };

    animId = requestAnimationFrame(measureFps);
    return () => cancelAnimationFrame(animId);
  }, [isDebug]);

  // Refresh ScrollTrigger and scroll reset on route changes
  useEffect(() => {
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const scrollTo = useCallback((target: string | number | HTMLElement, options?: { offset?: number; duration?: number; immediate?: boolean }) => {
    try {
      if (lenisInstance) {
        if (typeof target === 'string') {
          const el = document.querySelector(target) as HTMLElement | null;
          if (el) {
            lenisInstance.scrollTo(el, { offset: options?.offset, immediate: options?.immediate });
            return;
          }
        }
        lenisInstance.scrollTo(target, { offset: options?.offset, immediate: options?.immediate });
      } else {
        if (typeof target === 'number') {
          window.scrollTo({ top: target, behavior: options?.immediate ? 'auto' : 'smooth' });
        } else {
          const el = typeof target === 'string' ? (document.querySelector(target) as HTMLElement | null) : target;
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY + (options?.offset ?? 0);
            window.scrollTo({ top, behavior: options?.immediate ? 'auto' : 'smooth' });
          }
        }
      }
    } catch {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: options?.immediate ? 'auto' : 'smooth' });
      } else {
        const el = typeof target === 'string' ? (document.querySelector(target) as HTMLElement | null) : target;
        if (el) {
          el.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' });
        }
      }
    }
  }, [lenisInstance]);

  const stop = useCallback(() => {
    if (lenisInstance) {
      lenisInstance.stop();
    }
  }, [lenisInstance]);

  const start = useCallback(() => {
    if (lenisInstance) {
      lenisInstance.start();
    }
  }, [lenisInstance]);

  return (
    <SmoothScrollContext.Provider
      value={{
        lenis: lenisInstance,
        scrollTo,
        stop,
        start,
        isReducedMotion,
        toggleReducedMotion,
        isLite,
      }}
    >
      {children}

      {/* Dev-only motion debug overlay (?motion=debug) */}
      {isDebug && (
        <div className="fixed bottom-4 left-4 z-[9999] bg-[#0C0D11]/90 border border-cobalt/40 text-white font-mono text-[11px] p-2.5 rounded-lg shadow-2xl backdrop-blur-md pointer-events-none space-y-1">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${debugFps >= 50 ? 'bg-acid-lime' : debugFps >= 35 ? 'bg-amber-400' : 'bg-red-500'}`} />
            <span>FPS: {debugFps}</span>
          </div>
          <div>Triggers: {ScrollTrigger.getAll().length}</div>
          <div>Lite mode: {isLite ? 'ACTIVE' : 'OFF'}</div>
          <div>Reduced motion: {isReducedMotion ? 'ACTIVE' : 'OFF'}</div>
        </div>
      )}
    </SmoothScrollContext.Provider>
  );
};
