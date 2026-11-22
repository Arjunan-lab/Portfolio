import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { MOTION_TOKENS, checkReducedMotion } from './tokens';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SplitRevealProps {
  children: React.ReactNode;
  as?: React.ElementType;
  type?: 'chars' | 'words' | 'lines';
  delay?: number;
  duration?: number;
  stagger?: number;
  scrub?: boolean | number;
  triggerOnScroll?: boolean;
  className?: string;
}

export const SplitReveal: React.FC<SplitRevealProps> = ({
  children,
  as: Component = 'div',
  type = 'lines',
  delay = 0,
  duration = MOTION_TOKENS.durations.reveal,
  stagger,
  scrub = false,
  triggerOnScroll = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const textContent = typeof children === 'string' ? children : '';

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (checkReducedMotion()) {
      el.style.opacity = '1';
      return;
    }

    let splitInstance: SplitType | null = null;
    let ctx: gsap.Context | null = null;

    try {
      // SplitType initialization
      splitInstance = new SplitType(el, {
        types: type === 'lines' ? 'lines' : type === 'words' ? 'words,lines' : 'chars,words,lines',
        lineClass: 'split-line overflow-hidden block',
        wordClass: 'split-word inline-block',
        charClass: 'split-char inline-block',
      });

      const targets =
        type === 'chars'
          ? splitInstance.chars
          : type === 'words'
            ? splitInstance.words
            : splitInstance.lines;

      if (!targets || targets.length === 0) return;

      // Wrap targets in an overflow-hidden wrapper if lines
      targets.forEach((t) => {
        t.setAttribute('aria-hidden', 'true');
      });

      const defaultStagger =
        stagger ??
        (type === 'chars'
          ? MOTION_TOKENS.staggers.chars
          : type === 'words'
            ? MOTION_TOKENS.staggers.words
            : MOTION_TOKENS.staggers.lines);

      ctx = gsap.context(() => {
        gsap.set(targets, { yPercent: 110, opacity: 0 });

        if (triggerOnScroll) {
          gsap.to(targets, {
            yPercent: 0,
            opacity: 1,
            duration,
            stagger: defaultStagger,
            ease: MOTION_TOKENS.easings.cinematic,
            delay,
            scrollTrigger: scrub
              ? {
                  trigger: el,
                  start: 'top 85%',
                  end: 'bottom 50%',
                  scrub: scrub === true ? 1 : scrub,
                }
              : {
                  trigger: el,
                  start: 'top 88%',
                  toggleActions: 'play none none none',
                },
          });
        } else {
          gsap.to(targets, {
            yPercent: 0,
            opacity: 1,
            duration,
            stagger: defaultStagger,
            ease: MOTION_TOKENS.easings.cinematic,
            delay,
          });
        }
      }, el);
    } catch {
      // Graceful fallback
      if (el) el.style.opacity = '1';
    }

    return () => {
      ctx?.revert();
      splitInstance?.revert();
    };
  }, [type, delay, duration, stagger, scrub, triggerOnScroll]);

  return (
    <Component
      ref={containerRef}
      className={`relative ${className}`}
      aria-label={textContent || undefined}
    >
      {children}
    </Component>
  );
};
