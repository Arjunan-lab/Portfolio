import { useRef } from 'react';
import { ArrowRight, ArrowUpRight, ArrowDown, Download, Sparkles } from 'lucide-react';
import { CobaltRibbon3D } from './ui/CobaltRibbon3D';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useCornerConvergence, useMagnetic } from '../motion/scrollMotion';

const TECH_BADGES = ['Python', 'React', 'FastAPI', 'CatBoost', 'ESP-NOW', 'Docker'];

export const Hero = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const artworkRef = useRef<HTMLDivElement | null>(null);
  const telemetryRef = useRef<HTMLDivElement | null>(null);

  const exploreBtnRef = useMagnetic<HTMLButtonElement>(0.24);
  const contactBtnRef = useMagnetic<HTMLButtonElement>(0.24);

  useCornerConvergence({
    sectionRef,
    headingRef,
    textRef,
    artworkRef,
    telemetryRef,
  });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 flex flex-col justify-between overflow-hidden px-6 sm:px-12 lg:px-16 bg-canvas-light dark:bg-[#0C0D11] transition-colors duration-300"
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-1/3 -left-40 w-[550px] h-[550px] bg-cobalt/5 dark:bg-cobalt/15 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 pt-2 sm:pt-4">
        
        {/* Main Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Number Indicator & Available Badge */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-text-dimmed dark:text-text-muted">01 // SOFTWARE ENGINEER &amp; AI BUILDER</span>
              <div className="h-4 w-px bg-border-light dark:border-border-dark" />
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-acid-lime/15 text-text-black dark:text-acid-lime font-mono text-[11px] font-bold border border-acid-lime/30">
                <Sparkles size={11} className="text-acid-lime" /> OPEN FOR OPPORTUNITIES
              </span>
            </div>

            {/* Main Headline (Space Grotesk Black) — Upper-Left Convergence */}
            <h1
              ref={headingRef}
              className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[88px] tracking-tighter leading-[0.92] text-text-black dark:text-white uppercase"
            >
              <span className="block">DESIGNING.</span>
              <span className="block">DEVELOPING.</span>
              <span className="block text-cobalt dark:text-cobalt-light">BUILDING</span>
              <span className="block text-cobalt dark:text-cobalt-light">WHAT'S NEXT.</span>
            </h1>

            {/* Subtitle & Actions — Lower-Left Convergence */}
            <div ref={textRef} className="space-y-6">
              <p className="font-sans text-base sm:text-lg md:text-xl text-text-dimmed dark:text-text-muted max-w-xl leading-relaxed pt-2 font-light">
                Software engineer exploring AI, full-stack systems, low-latency IoT protocols, and thoughtful digital products.
              </p>

              {/* Floating Tech Stack Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {TECH_BADGES.map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-border-light dark:border-border-dark text-xs font-mono text-text-black dark:text-gray-300 shadow-sm"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Action Buttons (Envato Gerold / Drake Dual-CTA Standard) with Magnetic Feel */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                
                {/* Explore Projects Button */}
                <button
                  ref={exploreBtnRef}
                  onClick={() => scrollTo('projects')}
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-text-black dark:bg-white text-white dark:text-text-black font-sans text-xs font-semibold hover:bg-cobalt dark:hover:bg-cobalt-light dark:hover:text-white transition-colors duration-200 shadow-sm cursor-pointer"
                >
                  <span>Explore Projects</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Download CV / Resume Button */}
                <a
                  href={PERSONAL_INFO.contact.resumeUrl}
                  download
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-cobalt/10 dark:bg-cobalt/20 border border-cobalt/30 text-cobalt dark:text-cobalt-light font-sans text-xs font-semibold hover:bg-cobalt hover:text-white transition-all duration-200"
                >
                  <Download size={13} className="group-hover:translate-y-0.5 transition-transform" />
                  <span>Download CV</span>
                </a>

                {/* Get in Touch Button (Ghost Pill) */}
                <button
                  ref={contactBtnRef}
                  onClick={() => scrollTo('contact')}
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border-light dark:border-border-dark bg-white/70 dark:bg-white/5 text-text-black dark:text-white font-sans text-xs font-semibold hover:border-text-black dark:hover:border-white transition-colors cursor-pointer"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

              </div>
            </div>

          </div>

          {/* Right Column: 3D Glossy Cobalt Sculpture (5 cols) — Upper-Right Convergence */}
          <div ref={artworkRef} className="lg:col-span-5 flex justify-center items-center relative">
            <CobaltRibbon3D variant="hero" />
          </div>

        </div>

      </div>

      {/* Hero Bottom Telemetry Bar — Lower-Right Convergence */}
      <div
        ref={telemetryRef}
        className="max-w-7xl mx-auto w-full pt-8 flex items-center justify-between text-xs font-sans text-text-dimmed dark:text-text-muted border-t border-border-light/70 dark:border-border-dark"
      >
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span>📍 COIMBATORE, INDIA</span>
          <span>•</span>
          <span>KPR INSTITUTE B.TECH IT</span>
          <span>•</span>
          <span className="text-cobalt dark:text-cobalt-light font-bold">CGPA 8.42</span>
        </div>

        <button
          onClick={() => scrollTo('services')}
          className="group flex items-center gap-2 font-medium hover:text-text-black dark:hover:text-white transition-colors cursor-pointer"
        >
          <span>Scroll to Explore</span>
          <div className="w-6 h-6 rounded-full border border-border-light dark:border-border-dark flex items-center justify-center group-hover:border-cobalt group-hover:bg-cobalt group-hover:text-white transition-all">
            <ArrowDown size={11} />
          </div>
        </button>
      </div>

    </section>
  );
};
