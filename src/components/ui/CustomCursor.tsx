import { useEffect, useState, useRef } from 'react';
import { checkReducedMotion, checkTouchDevice } from '../../motion/tokens';

type CursorState = 'default' | 'link' | 'view' | 'text' | 'hidden';

export const CustomCursor = () => {
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [visible, setVisible] = useState(false);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (checkTouchDevice() || checkReducedMotion()) return;

    let mouseX = -200;
    let mouseY = -200;
    let ringX = -200;
    let ringY = -200;
    let isVisible = false;
    let lastTarget: EventTarget | null = null;
    let currentCursorState: CursorState = 'default';

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        setVisible(true);
      }

      // Only check DOM hierarchy when the hovered element changes to avoid CPU thrashing
      if (e.target !== lastTarget) {
        lastTarget = e.target;
        const target = e.target as HTMLElement | null;
        let nextState: CursorState = 'default';

        if (target) {
          if (target.closest('input, textarea, [contenteditable="true"]')) {
            nextState = 'hidden';
          } else if (target.closest('[data-cursor="view"]')) {
            nextState = 'view';
          } else if (target.closest('a, button, [role="button"], .cursor-pointer')) {
            nextState = 'link';
          }
        }

        if (nextState !== currentCursorState) {
          currentCursorState = nextState;
          setCursorState(nextState);
        }
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      setVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    let animId: number;
    const render = () => {
      // Instant vsync-aligned position for sharp dot (0ms latency)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Smooth buttery trailing for luxury ring
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (typeof window !== 'undefined' && (checkTouchDevice() || checkReducedMotion())) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9995] overflow-hidden mix-blend-difference transition-opacity duration-200 ${
        visible && cursorState !== 'hidden' ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Center Sharp Dot - Pure 60fps tracking without artificial CSS transform lag */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-white transition-[opacity,scale] duration-150 ease-out ${
          cursorState === 'view' ? 'scale-0' : 'scale-100'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* Trailing Ring - JS lerp without CSS transform conflicts */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full border border-white transition-[width,height,opacity,background-color,border-color] duration-200 ease-out ${
          cursorState === 'link'
            ? '-ml-5 -mt-5 w-10 h-10 bg-white/25 scale-125'
            : cursorState === 'view'
              ? '-ml-8 -mt-8 w-16 h-16 bg-white text-black font-display font-black text-[10px] tracking-widest scale-100'
              : cursorState === 'text'
                ? '-ml-2 -mt-2 w-4 h-4 opacity-30 scale-75'
                : '-ml-4 -mt-4 w-8 h-8 bg-transparent scale-100'
        }`}
        style={{ willChange: 'transform' }}
      >
        {cursorState === 'view' && <span>VIEW</span>}
      </div>
    </div>
  );
};
