import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { useLenis } from '../../motion/SmoothScrollContext';
import { Magnetic } from '../../motion/Magnetic';

export const HireMePill: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollTo } = useLenis();
  const [progress, setProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setProgress(Math.min(100, Math.max(0, (currentScrollY / windowHeight) * 100)));
      }
      setShowScrollTop(currentScrollY > 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = useCallback(() => {
    scrollTo(0);
  }, [scrollTo]);

  // Keyboard shortcut listener:
  // When scrolled down (> 350px or in bottom area), pressing physical ArrowUp or Home glides to top
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      const isAtBottom = currentScrollY > 350 && (currentScrollY >= totalScrollable - 450 || currentScrollY > 500);

      if (e.key === 'Home') {
        e.preventDefault();
        handleScrollToTop();
      } else if (e.key === 'ArrowUp' && isAtBottom) {
        e.preventDefault();
        handleScrollToTop();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleScrollToTop]);

  const handleHireMeClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (location.pathname === '/') {
      const el = document.getElementById('contact');
      if (el) {
        scrollTo(el, { offset: -80 });
        window.history.pushState(null, '', '#contact');
        setTimeout(() => {
          const input = document.getElementById('section-name') || document.querySelector<HTMLInputElement>('#contact input');
          input?.focus({ preventScroll: true });
        }, 600);
      } else {
        navigate('/contact');
      }
    } else {
      navigate('/contact');
    }
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <aside
      aria-label="Floating page actions"
      className="fixed bottom-6 right-5 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-none select-none"
    >
      {/* 01: UP-ARROW SCROLL TO TOP RING (appears smoothly above Hire Me when scrolled) */}
      <div
        className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        <Magnetic strength={0.3}>
          <button
            onClick={handleScrollToTop}
            className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-[#14161E]/95 backdrop-blur-md border border-border-dark hover:border-cobalt text-white shadow-2xl transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
            aria-label="Scroll smoothly back to top of page (or press ↑)"
            title="Back to Top (Press ↑)"
          >
            {/* SVG Progress Ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <circle
                cx="24"
                cy="24"
                r={radius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="2.5"
              />
              <circle
                cx="24"
                cy="24"
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
              size={15}
              className="text-white group-hover:text-acid-lime group-hover:-translate-y-0.5 transition-all duration-300 relative z-10"
            />
          </button>
        </Magnetic>
      </div>

      {/* 02: HIRE ME PILL (always sitting at bottom-right, never overlapped) */}
      <div className="pointer-events-auto">
        <Magnetic strength={0.25}>
          <button
            onClick={handleHireMeClick}
            className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#14161E]/95 backdrop-blur-md border border-cobalt/40 hover:border-cobalt text-white text-xs font-mono shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
            aria-label="Direct collaboration and hiring inquiry"
            title="Get in touch / Hire Me"
          >
            <span className="w-2 h-2 rounded-full bg-acid-lime animate-pulse inline-block" />
            <span className="font-semibold tracking-wide">Hire Me</span>
            <ArrowUpRight
              size={13}
              className="text-cobalt-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </button>
        </Magnetic>
      </div>
    </aside>
  );
};
