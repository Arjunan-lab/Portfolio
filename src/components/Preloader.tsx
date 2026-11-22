import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { MOTION_TOKENS, checkReducedMotion } from '../motion/tokens';
import { useLenis } from '../motion/SmoothScrollContext';

interface PreloaderProps {
  onComplete: () => void;
  onExitStart?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, onExitStart }) => {
  const [percent, setPercent] = useState<number>(0);
  const { stop, start } = useLenis();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const topPanelRef = useRef<HTMLDivElement | null>(null);
  const bottomPanelRef = useRef<HTMLDivElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const letters = ['A', 'R', 'J', 'U', 'N', 'A', 'N'];

  const handleSkip = () => {
    sessionStorage.setItem('arjun_preloaded', 'true');
    start();
    onComplete();
  };

  useEffect(() => {
    // If reduced motion is requested or already played this session, skip immediately
    if (checkReducedMotion() || sessionStorage.getItem('arjun_preloaded') === 'true') {
      onComplete();
      return;
    }

    // Lock scroll during intro
    stop();

    let isCancelled = false;
    const startTime = performance.now();
    const minDuration = 1600; // 1.6s minimum
    const maxDuration = 3800; // 3.8s maximum safeguard

    // Letters animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.preloader-letter',
        { y: 60, opacity: 0, rotateX: -60 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
        }
      );
    }, textContainerRef);

    // Track real readiness
    let fontsReady = false;
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        fontsReady = true;
      });
    } else {
      fontsReady = true;
    }

    const interval = setInterval(() => {
      if (isCancelled) return;
      const elapsed = performance.now() - startTime;
      const progress = Math.min(100, Math.floor((elapsed / minDuration) * 90));

      if (elapsed >= minDuration && fontsReady) {
        setPercent(100);
        clearInterval(interval);
        triggerExit();
      } else if (elapsed >= maxDuration) {
        setPercent(100);
        clearInterval(interval);
        triggerExit();
      } else {
        setPercent(Math.min(96, progress));
      }
    }, 40);

    const triggerExit = () => {
      if (isCancelled) return;
      sessionStorage.setItem('arjun_preloaded', 'true');

      if (onExitStart) {
        onExitStart();
      }

      const exitTl = gsap.timeline({
        onComplete: () => {
          start();
          onComplete();
        },
      });

      // Fade out inner text & counter
      exitTl.to([textContainerRef.current, counterRef.current, progressBarRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in',
      });

      // Split panels wipe away
      exitTl.to(
        topPanelRef.current,
        {
          yPercent: -100,
          duration: 0.85,
          ease: MOTION_TOKENS.easings.cinematic,
        },
        '-=0.1'
      );

      exitTl.to(
        bottomPanelRef.current,
        {
          yPercent: 100,
          duration: 0.85,
          ease: MOTION_TOKENS.easings.cinematic,
        },
        '<'
      );
    };

    return () => {
      isCancelled = true;
      clearInterval(interval);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-auto flex flex-col justify-between overflow-hidden"
      aria-live="polite"
      aria-label="Portfolio Loading Screen"
    >
      {/* Top Split Panel */}
      <div
        ref={topPanelRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#0C0D11] border-b border-white/5 z-0"
      />

      {/* Bottom Split Panel */}
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0C0D11] border-t border-white/5 z-0"
      />

      {/* Skip button for Accessibility */}
      <div className="relative z-10 p-6 flex justify-end">
        <button
          onClick={handleSkip}
          className="text-xs font-mono text-text-muted hover:text-white px-3 py-1.5 rounded-full border border-border-dark hover:border-cobalt transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
          aria-label="Skip introductory loading animation"
        >
          SKIP INTRO [ESC]
        </button>
      </div>

      {/* Centerpiece: Animated ARJUNAN Typography */}
      <div ref={textContainerRef} className="relative z-10 flex flex-col items-center justify-center my-auto">
        <div className="overflow-hidden flex items-center gap-1.5 sm:gap-3 py-3">
          {letters.map((char, index) => (
            <span
              key={index}
              className="preloader-letter font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white inline-block select-none"
            >
              {char}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-4 text-xs font-mono tracking-widest text-cobalt-light uppercase">
          <span className="w-2 h-2 rounded-full bg-acid-lime animate-pulse inline-block" />
          <span>AI SYSTEMS // APPLIED RESEARCH // FULL-STACK</span>
        </div>
      </div>

      {/* Bottom: Progress Counter and Cobalt Progress Line */}
      <div className="relative z-10 p-6 sm:p-12 w-full max-w-7xl mx-auto flex flex-col gap-4">
        <div className="flex items-end justify-between text-xs font-mono text-text-muted">
          <span>SYSTEM INITIALIZATION</span>
          <span ref={counterRef} className="text-white text-base sm:text-lg font-bold">
            {percent.toString().padStart(2, '0')}%
          </span>
        </div>

        {/* Cobalt Progress Bar */}
        <div className="w-full h-[2px] bg-[#14161E] rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-cobalt transition-all duration-75 ease-out shadow-[0_0_12px_#2B59FF]"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
