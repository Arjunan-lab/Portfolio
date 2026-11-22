import React, { useEffect, useRef } from 'react';
import { checkReducedMotion } from '../../motion/tokens';

const ROW_1_ITEMS = [
  'Python',
  'PyTorch',
  'TensorFlow',
  'CatBoost',
  'YOLOv8',
  'FastAPI',
  'React 19',
  'TypeScript',
  'Three.js',
  'Docker',
  'PostgreSQL',
  'Infosys Springboard AI',
];

const ROW_2_ITEMS = [
  'Applied Deep Learning',
  'Microservices Architecture',
  'H² Hostel Hackathon',
  'STEM Innovators Expo',
  'Real-Time WebSockets',
  'MongoDB Atlas',
  'GSAP Cinematic Motion',
  'Tailwind CSS',
  'Hardware Telemetry',
  'Celery Queues',
  'EfficientNet Architectures',
  'High-Throughput APIs',
];

export const TechMarquee: React.FC<{ className?: string }> = ({ className = '' }) => {
  const row1Ref = useRef<HTMLDivElement | null>(null);
  const row2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (checkReducedMotion()) return;

    let animId: number;
    let pos1 = 0;
    let pos2 = 0;
    const baseSpeed = 0.8;

    const tick = () => {
      // Modulate speed by scroll velocity if available
      const lenisAny = (window as unknown as { lenis?: { velocity?: number } }).lenis;
      const velocity = typeof lenisAny === 'object' && lenisAny && 'velocity' in lenisAny ? (lenisAny.velocity ?? 0) : 0;
      const speedModifier = 1 + Math.min(Math.abs(velocity) * 0.15, 3.5);

      pos1 -= baseSpeed * speedModifier;
      pos2 += (baseSpeed * 0.85) * speedModifier;

      if (row1Ref.current) {
        // Reset when half the content scrolled
        const halfWidth = row1Ref.current.scrollWidth / 2;
        if (Math.abs(pos1) >= halfWidth) {
          pos1 = 0;
        }
        row1Ref.current.style.transform = `translate3d(${pos1}px, 0, 0)`;
      }

      if (row2Ref.current) {
        const halfWidth = row2Ref.current.scrollWidth / 2;
        if (pos2 >= 0) {
          pos2 = -halfWidth;
        }
        row2Ref.current.style.transform = `translate3d(${pos2}px, 0, 0)`;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className={`w-full py-4 overflow-hidden border-y border-border-dark bg-[#0F1117]/85 backdrop-blur-md select-none space-y-2.5 ${className}`}>
      {/* Row 1 (Moving Left) */}
      <div className="overflow-hidden w-full group">
        <div
          ref={row1Ref}
          className="flex w-max space-x-8 items-center text-xs font-mono tracking-widest text-gray-300 uppercase will-change-transform"
        >
          {[...ROW_1_ITEMS, ...ROW_1_ITEMS].map((item, idx) => (
            <div key={`r1-${idx}`} className="flex items-center space-x-6 flex-shrink-0">
              <span className="hover:text-white transition-colors">{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cobalt inline-block shadow-[0_0_8px_#2B59FF]" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 (Moving Right in Opposite Direction) */}
      <div className="overflow-hidden w-full group">
        <div
          ref={row2Ref}
          className="flex w-max space-x-8 items-center text-xs font-mono tracking-widest text-text-muted uppercase will-change-transform"
        >
          {[...ROW_2_ITEMS, ...ROW_2_ITEMS].map((item, idx) => (
            <div key={`r2-${idx}`} className="flex items-center space-x-6 flex-shrink-0">
              <span className="hover:text-acid-lime transition-colors">{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-acid-lime/70 inline-block shadow-[0_0_8px_#7CE028]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
