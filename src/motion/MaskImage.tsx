import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MOTION_TOKENS, checkReducedMotion } from './tokens';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface MaskImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  direction?: 'top' | 'bottom' | 'left' | 'right';
  duration?: number;
  delay?: number;
  wrapperClassName?: string;
}

export const MaskImage: React.FC<MaskImageProps> = ({
  src,
  alt = '',
  direction = 'bottom',
  duration = MOTION_TOKENS.durations.reveal,
  delay = 0,
  wrapperClassName = '',
  className = '',
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imageRef.current;
    if (!container || !img) return;

    if (checkReducedMotion()) {
      container.style.clipPath = 'inset(0% 0% 0% 0%)';
      img.style.transform = 'none';
      img.style.opacity = '1';
      return;
    }

    const initialClip =
      direction === 'bottom'
        ? 'inset(100% 0% 0% 0%)'
        : direction === 'top'
          ? 'inset(0% 0% 100% 0%)'
          : direction === 'left'
            ? 'inset(0% 0% 0% 100%)'
            : 'inset(0% 100% 0% 0%)';

    const ctx = gsap.context(() => {
      gsap.set(container, { clipPath: initialClip });
      gsap.set(img, { scale: 1.25, opacity: 0.8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      tl.to(container, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration,
        delay,
        ease: MOTION_TOKENS.easings.cinematic,
      }).to(
        img,
        {
          scale: 1,
          opacity: 1,
          duration: duration * 1.1,
          ease: MOTION_TOKENS.easings.cinematic,
        },
        '<0.1'
      );
    }, container);

    return () => ctx.revert();
  }, [direction, duration, delay]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${wrapperClassName}`}
      style={{ willChange: 'clip-path' }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover will-change-transform ${className}`}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </div>
  );
};
