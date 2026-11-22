import React, { useEffect, useState, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLenis } from '../../motion/SmoothScrollContext';
import { Magnetic } from '../../motion/Magnetic';

export const ScrollToTopRing: React.FC = () => {
  const { scrollTo } = useLenis();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setProgress(Math.min(100, Math.max(0, (currentScrollY / windowHeight) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = useCallback(() => {
    scrollTo(0);
  }, [scrollTo]);

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Magnetic strength={0.35}>
      <button
        onClick={handleScrollToTop}
        className="group relative w-14 h-14 rounded-full flex items-center justify-center bg-[#14161E] border border-border-dark hover:border-cobalt text-white shadow-subtle-card transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
        aria-label="Scroll smoothly back to top of page (or press ↑)"
        title="Scroll to Top (Press ↑)"
      >
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 56 56"
          aria-hidden="true"
        >
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="2.5"
          />
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            stroke="#2B59FF"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-100 ease-out"
          />
        </svg>

        <ArrowUp
          size={16}
          className="text-white group-hover:text-acid-lime group-hover:-translate-y-1 transition-all duration-300 relative z-10"
        />
      </button>
    </Magnetic>
  );
};
