import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { checkReducedMotion, checkTouchDevice, isLiteMode } from './tokens';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // e.g. -0.2 (slower) or 0.3 (faster)
  className?: string;
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  speed = 0.2,
  className = '',
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    if (checkReducedMotion() || isLiteMode()) {
      el.style.transform = 'none';
      return;
    }

    const isTouch = checkTouchDevice();
    const effectiveSpeed = isTouch ? speed * 0.5 : speed;
    const distance = effectiveSpeed * 200;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -distance },
        {
          y: distance,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={targetRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};
