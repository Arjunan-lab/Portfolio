import { useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { CobaltRibbon3D } from './ui/CobaltRibbon3D';
import { useCornerConvergence, useMagnetic } from '../motion/scrollMotion';

export const ThankYouFooter = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const artworkRef = useRef<HTMLDivElement | null>(null);
  const telemetryRef = useRef<HTMLDivElement | null>(null);

  const backToTopRef = useMagnetic<HTMLButtonElement>(0.24);

  useCornerConvergence({
    sectionRef,
    headingRef,
    textRef,
    artworkRef,
    telemetryRef,
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-16 bg-[#111216] text-white border-t border-white/10 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-cobalt/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Thank You Headline (6 cols) — Upper-Left Convergence */}
          <div className="lg:col-span-6 space-y-6">
            <div ref={headingRef} className="space-y-4">
              <span className="font-mono text-xs text-white/40 uppercase tracking-widest block">
                ARJUNAN
              </span>

              <h2 className="font-display font-black text-6xl sm:text-8xl lg:text-[96px] tracking-tight leading-[0.95] text-white">
                Thank{' '}
                <span className="font-serif-italic font-normal italic text-cobalt tracking-normal text-[1.08em]">
                  You.
                </span>
              </h2>
            </div>

            {/* Supporting Text & Magnetic CTA — Lower-Left Convergence */}
            <div ref={textRef} className="space-y-6">
              <p className="font-sans text-lg sm:text-xl text-white/60 font-light">
                for being here.
              </p>

              <div className="pt-2 flex items-center gap-4">
                <button
                  ref={backToTopRef}
                  onClick={scrollToTop}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white hover:text-[#111216] border border-white/15 text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer"
                >
                  <span>Back to Top</span>
                  <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Mobius Ribbon Art (6 cols) — Upper-Right Convergence */}
          <div ref={artworkRef} className="lg:col-span-6 flex justify-center items-center relative">
            <CobaltRibbon3D variant="footer" />
          </div>

        </div>

        {/* Bottom copyright — Lower-Right Convergence */}
        <div
          ref={telemetryRef}
          className="pt-16 mt-16 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40"
        >
          <span>ARJUNAN V</span>
          <span>© {new Date().getFullYear()} All rights reserved.</span>
        </div>
      </div>
    </section>
  );
};
