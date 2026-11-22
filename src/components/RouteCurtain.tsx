import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from '../motion/SmoothScrollContext';
import { checkReducedMotion } from '../motion/tokens';

const getRouteLabel = (pathname: string): string => {
  if (pathname === '/') return 'HOME';
  if (pathname === '/about') return 'ABOUT ME';
  if (pathname === '/work') return 'SELECTED WORK';
  if (pathname === '/work/soil-health') return 'SOIL HEALTH AI';
  if (pathname === '/work/jarvis') return 'JARVIS SYSTEM';
  if (pathname === '/experience') return 'JOURNEY & CREDENTIALS';
  if (pathname === '/contact') return 'GET IN TOUCH';
  return 'DISPATCHING';
};

export const RouteTransitionWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { scrollTo } = useLenis();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevPathRef = useRef(location.pathname);

  const currentLabel = getRouteLabel(location.pathname);

  useEffect(() => {
    if (location.hash || prevPathRef.current === location.pathname) {
      prevPathRef.current = location.pathname;
      return;
    }

    prevPathRef.current = location.pathname;

    if (checkReducedMotion()) {
      scrollTo(0, { immediate: true });
      return;
    }

    const startTimer = setTimeout(() => {
      setIsTransitioning(true);
    }, 0);

    const finishTimer = setTimeout(() => {
      scrollTo(0, { immediate: true });
      setIsTransitioning(false);
    }, 550);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(finishTimer);
    };
  }, [location.pathname, location.hash, scrollTo]);

  return (
    <div className="relative w-full">
      {/* Full-screen diagonal cobalt/black curtain */}
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key={`curtain-${location.pathname}`}
            initial={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }}
            animate={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
            exit={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9990] bg-[#0C0D11] flex flex-col items-center justify-center pointer-events-none select-none border-b-2 border-cobalt"
          >
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-cobalt/15 via-[#0C0D11]/90 to-[#0C0D11]" />

            <div className="relative z-10 text-center space-y-2">
              <span className="text-xs font-mono tracking-widest text-acid-lime uppercase block">
                TRANSITIONING //
              </span>
              <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight">
                {currentLabel}
              </h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content with exit & enter transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
          exit={{ opacity: 0, y: -25, transition: { duration: 0.3, ease: 'easeIn' } }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
