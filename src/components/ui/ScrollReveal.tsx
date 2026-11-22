import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
  variant?: 'fade' | 'popup' | 'spring';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  className = '',
  threshold = 0.08,
  variant = 'popup'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  // Tactile physics spring curve with energetic pop-up bounce
  const transitionCurve = variant === 'fade'
    ? 'cubic-bezier(0.16, 1, 0.3, 1)'
    : 'cubic-bezier(0.22, 1.38, 0.36, 1)';

  const transitionDuration = variant === 'fade' ? '750ms' : '680ms';

  return (
    <div
      ref={ref}
      style={{
        transitionProperty: 'opacity, transform, filter',
        transitionDuration,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: transitionCurve,
        willChange: 'opacity, transform, filter'
      }}
      className={`transition-all ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 rotate-0 filter blur-0'
          : variant === 'fade'
          ? 'opacity-0 translate-y-10 scale-[0.98] filter blur-[1px]'
          : 'opacity-0 translate-y-16 scale-[0.88] -rotate-[1.5deg] filter blur-[2px]'
      } ${className}`}
    >
      {children}
    </div>
  );
};
