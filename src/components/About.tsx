import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useCornerConvergence } from '../motion/scrollMotion';

export const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const artworkRef = useRef<HTMLDivElement | null>(null);
  const telemetryRef = useRef<HTMLDivElement | null>(null);

  useCornerConvergence({
    sectionRef,
    headingRef,
    textRef,
    artworkRef,
    telemetryRef,
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-16 border-t border-border-light dark:border-border-dark bg-canvas-light dark:bg-[#0C0D11] transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header Label */}
        <div className="flex items-center gap-2 mb-10 text-xs font-mono tracking-widest text-text-dimmed dark:text-text-muted uppercase">
          <span className="w-2 h-2 rounded-full bg-cobalt inline-block" />
          <span>02 // ABOUT ME</span>
        </div>

        {/* Main Grid: Headline & Text on Left, Architecture Photography Artwork on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Signature Headline with Blue Italic Serif Accent (Upper-Left Convergence) */}
            <h2
              ref={headingRef}
              className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight text-text-black dark:text-white leading-[1.05]"
            >
              Curious by nature.{' '}
              <span className="block">
                An{' '}
                <span className="font-serif-italic font-normal italic text-cobalt dark:text-cobalt-light tracking-normal text-[1.08em] pr-1">
                  engineer
                </span>{' '}
                by
              </span>
              <span className="block">practice.</span>
            </h2>

            {/* Narrative Paragraph & CTA (Lower-Left Convergence) */}
            <div ref={textRef} className="space-y-6">
              <p className="font-sans text-base sm:text-lg md:text-xl text-text-dimmed dark:text-text-muted font-normal max-w-xl leading-relaxed">
                I'm an Information Technology undergraduate who enjoys turning ideas into functional digital products. My interests span full-stack engineering, artificial intelligence, and product development.
              </p>

              <p className="font-sans text-sm sm:text-base text-text-muted dark:text-gray-400 max-w-xl leading-relaxed">
                I believe great software emerges when robust architectural foundations converge with thoughtful human-centric design. Rather than writing code in isolation, I build products that deliver tangible utility.
              </p>

              {/* Know More Pill */}
              <div className="pt-2">
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-black dark:text-white font-semibold hover:text-cobalt dark:hover:text-cobalt-light transition-colors"
                >
                  <span>Know More</span>
                  <div className="w-6 h-6 rounded-full border border-border-light dark:border-border-dark flex items-center justify-center group-hover:border-cobalt group-hover:bg-cobalt group-hover:text-white transition-all">
                    <ArrowUpRight size={12} />
                  </div>
                </Link>
              </div>
            </div>

            {/* Bottom 4-Column Academic Telemetry Grid (Lower-Left/Center Convergence) */}
            <div
              ref={telemetryRef}
              className="pt-8 border-t border-border-light dark:border-border-dark grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs"
            >
              <div className="space-y-1">
                <span className="font-display font-bold text-text-black dark:text-white text-sm block">B.Tech</span>
                <span className="text-text-dimmed dark:text-text-muted block">Information Technology</span>
              </div>

              <div className="space-y-1">
                <span className="font-display font-bold text-text-black dark:text-white text-sm block">KPR Institute of</span>
                <span className="text-text-dimmed dark:text-text-muted block">Engineering and Technology</span>
              </div>

              <div className="space-y-1">
                <span className="font-display font-bold text-text-black dark:text-white text-sm block">CGPA</span>
                <span className="text-cobalt dark:text-cobalt-light font-bold text-base block">{PERSONAL_INFO.education.cgpa}</span>
              </div>

              <div className="space-y-1">
                <span className="font-display font-bold text-text-black dark:text-white text-sm block">3rd Year</span>
                <span className="text-text-dimmed dark:text-text-muted block">Undergraduate</span>
              </div>
            </div>

          </div>

          {/* Right Column: Portrait & Geometric Overlays (Upper-Right Convergence) */}
          <div ref={artworkRef} className="lg:col-span-5 relative flex justify-center items-center pt-4 lg:pt-0">
            <div className="relative w-full max-w-[420px]">
              
              {/* Architectural Monochrome Image with Curved Silhouette */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-elevated bg-text-black">
                <img
                  src="/assets/arjun-portrait.jpg"
                  alt="Arjunan V"
                  className="w-full h-full object-cover grayscale contrast-115 hover:grayscale-0 hover:scale-102 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-text-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Image Label Overlay */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs font-mono text-white bg-text-black/70 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10">
                  <span className="font-semibold text-white">ARJUNAN V</span>
                  <span className="text-white/70">COIMBATORE, IN</span>
                </div>
              </div>

              {/* Decorative Geometric Overlay: Cobalt Square Accent */}
              <div className="absolute -top-4 -left-6 w-16 h-16 rounded-xl bg-cobalt/35 backdrop-blur-md border border-cobalt/50 -z-0 pointer-events-none" />

              {/* Decorative Geometric Reference Circle */}
              <div className="absolute -bottom-8 -right-6 w-36 h-36 rounded-full border border-border-light dark:border-border-dark -z-0 pointer-events-none flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border border-dashed border-border-light dark:border-border-dark" />
              </div>

              {/* Decorative Sparkle ✦ */}
              <div className="absolute -top-2 right-4 text-xl text-text-black dark:text-white pointer-events-none animate-pulse">
                ✦
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
