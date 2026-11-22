import { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailing, setTrailing] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let targetX = -100;
    let targetY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, select, textarea');
      const projectCard = target.closest('[data-cursor-text]');

      if (projectCard) {
        setCursorText(projectCard.getAttribute('data-cursor-text') || 'VIEW');
        setIsHovered(true);
      } else if (interactive) {
        setCursorText('');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    let animId: number;
    let currentX = -100;
    let currentY = -100;

    const follow = () => {
      animId = requestAnimationFrame(follow);
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setTrailing({ x: currentX, y: currentY });
    };

    follow();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Precision Center Dot */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full bg-acid-lime transition-transform duration-75 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? '6px' : '4px',
          height: isHovered ? '6px' : '4px',
        }}
      />

      {/* Trailing Fluid Magnetic Ring */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full border border-soft-white/60 flex items-center justify-center transition-all duration-300 ease-out"
        style={{
          left: `${trailing.x}px`,
          top: `${trailing.y}px`,
          width: cursorText ? '84px' : isHovered ? '50px' : '32px',
          height: cursorText ? '84px' : isHovered ? '50px' : '32px',
          backgroundColor: cursorText ? '#315CFF' : isHovered ? 'rgba(49, 92, 255, 0.15)' : 'transparent',
          borderColor: cursorText ? '#315CFF' : isHovered ? '#315CFF' : 'rgba(245, 245, 240, 0.4)',
        }}
      >
        {cursorText && (
          <span className="font-mono text-[10px] tracking-widest text-soft-white font-bold uppercase select-none">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};

