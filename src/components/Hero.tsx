import { useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Download, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { CobaltRibbon3D } from './ui/CobaltRibbon3D';
import { TechMarquee } from './ui/TechMarquee';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Magnetic } from '../motion/Magnetic';
import { RollOverButton } from './ui/RollOverButton';
import { RollOverLink } from './ui/RollOverLink';
import { checkReducedMotion, MOTION_TOKENS } from '../motion/tokens';
import { useLenis } from '../motion/SmoothScrollContext';

interface HeroProps {
  onHeroReady?: () => void;
}

const TECH_PILLS = [
  'Applied AI / PyTorch',
  'Full-Stack / React 19',
  'FastAPI & Microservices',
  'Hardware Telemetry & IoT',
];

export const Hero: React.FC<HeroProps> = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const pillsRef = useRef<HTMLDivElement | null>(null);
  const ctasRef = useRef<HTMLDivElement | null>(null);
  const artworkRef = useRef<HTMLDivElement | null>(null);
  const telemetryRef = useRef<HTMLDivElement | null>(null);
  const orb1Ref = useRef<HTMLDivElement | null>(null);
  const orb2Ref = useRef<HTMLDivElement | null>(null);

  const { scrollTo: lenisScrollTo } = useLenis();

  useEffect(() => {
    const isReduced = checkReducedMotion();

    if (isReduced) {
      gsap.set(
        [
          eyebrowRef.current,
          textRef.current,
          pillsRef.current,
          ctasRef.current,
          artworkRef.current,
          telemetryRef.current,
        ],
        { opacity: 1, y: 0 }
      );
      gsap.set('.hero-reveal-line span', { y: '0%', opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Background gradient orbs drifting slowly (GSAP yoyo loops, 14-20s)
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          x: 45,
          y: -35,
          scale: 1.15,
          duration: 18,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          x: -40,
          y: 30,
          scale: 0.9,
          duration: 15,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Initial scale of hero container from 1.12 to 1.0
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { scale: 1.08, opacity: 0.9 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.4,
            ease: MOTION_TOKENS.easings.cinematic,
          }
        );
      }

      // Choreographed entrance timeline in exact order:
      // 1. Eyebrow badge
      // 2. Headline lines (masked rise, 60ms stagger)
      // 3. Subtitle / proof line
      // 4. Tech pills (stagger 0.05)
      // 5. CTAs
      // 6. Telemetry bar
      // 7. 3D sculpture fade/rotate
      const tl = gsap.timeline({ delay: 0.2 });

      // 1. Eyebrow badge
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: MOTION_TOKENS.easings.cinematic }
      );

      // 2. Headline lines (masked rise, 60ms stagger)
      tl.fromTo(
        '.hero-reveal-line span',
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.85,
          stagger: 0.06,
          ease: MOTION_TOKENS.easings.cinematic,
        },
        '-=0.3'
      );

      // 3. Subtitle / proof line
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: MOTION_TOKENS.easings.cinematic },
        '-=0.4'
      );

      // 4. Tech pills (stagger 0.05)
      tl.fromTo(
        '.tech-pill-item',
        { opacity: 0, scale: 0.9, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      // 5. CTAs
      tl.fromTo(
        ctasRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: MOTION_TOKENS.easings.cinematic },
        '-=0.2'
      );

      // 6. 3D sculpture rotate & scale in
      tl.fromTo(
        artworkRef.current,
        { opacity: 0, scale: 0.85, rotateY: -15 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 1.2, ease: MOTION_TOKENS.easings.cinematic },
        '-=0.8'
      );

      // 7. Telemetry bar
      tl.fromTo(
        telemetryRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      lenisScrollTo(el, { offset: -80 });
    } else {
      lenisScrollTo(`#${id}`, { offset: -80 });
    }
  };

  return (
    <>
      <section
        id="hero"
        ref={sectionRef}
        className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 flex flex-col justify-between overflow-hidden px-6 sm:px-12 lg:px-16 bg-[#0C0D11] text-white transition-colors duration-300"
      >
        {/* Drifting Slow Gradient Orbs (GSAP yoyo 14-20s loops) */}
        <div
          ref={orb1Ref}
          className="absolute top-1/4 -right-20 w-[550px] h-[550px] bg-cobalt/12 rounded-full blur-[170px] pointer-events-none will-change-transform"
        />
        <div
          ref={orb2Ref}
          className="absolute bottom-10 left-1/4 w-[420px] h-[420px] bg-acid-lime/5 rounded-full blur-[180px] pointer-events-none will-change-transform"
        />

        <div ref={containerRef} className="max-w-7xl mx-auto w-full relative z-10 pt-2 sm:pt-4 will-change-transform">
          
          {/* Main Asymmetric Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Outcome-Led Typography & Proof (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Eyebrow Label & Status */}
              <div ref={eyebrowRef} className="flex items-center gap-3">
                <span className="font-mono text-xs text-text-muted">01 // SOFTWARE ENGINEER &amp; AI BUILDER</span>
                <div className="h-3.5 w-px bg-border-dark" />
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-acid-lime/10 text-acid-lime font-mono text-xs font-bold border border-acid-lime/30">
                  <Sparkles size={11} className="text-acid-lime" /> OPEN FOR OPPORTUNITIES
                </span>
              </div>

              {/* Outcome-Led Headline with Staggered Masked Reveal — Space Grotesk Black */}
              <h1
                ref={headingRef}
                className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[86px] tracking-tighter leading-[0.94] text-white uppercase"
              >
                <div className="hero-reveal-line overflow-hidden py-0.5">
                  <span className="block transform translate-y-full opacity-0">I BUILD</span>
                </div>
                <div className="hero-reveal-line overflow-hidden py-0.5">
                  <span className="block transform translate-y-full opacity-0">AI SYSTEMS</span>
                </div>
                <div className="hero-reveal-line overflow-hidden py-0.5">
                  <span className="block text-cobalt-light transform translate-y-full opacity-0">
                    THAT SHIP.
                  </span>
                </div>
              </h1>

              {/* Verified Proof Line & Description */}
              <div ref={textRef} className="space-y-4">
                <p className="font-mono text-xs sm:text-sm text-acid-lime tracking-wide font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-acid-lime animate-pulse inline-block flex-shrink-0" />
                  <span>Soil-health AI platform at Infosys Springboard · H² Hostel Hackathon · Full-Stack Systems</span>
                </p>

                <p className="font-sans text-sm sm:text-base md:text-lg text-text-muted max-w-xl leading-relaxed font-light">
                  Specialized in production-grade applied machine learning, high-throughput backend microservices, real-time IoT architectures, and full-stack web platforms.
                </p>
              </div>

              {/* Tech Pills (Stagger 0.05) */}
              <div ref={pillsRef} className="flex flex-wrap items-center gap-2 pt-1">
                {TECH_PILLS.map((pill, idx) => (
                  <span
                    key={idx}
                    className="tech-pill-item inline-flex items-center px-3 py-1 rounded-lg bg-[#14161E] border border-border-dark text-xs font-mono text-text-muted hover:border-cobalt/50 hover:text-white transition-colors"
                  >
                    {pill}
                  </span>
                ))}
              </div>

              {/* Primary Dual-CTAs + Text Link */}
              <div ref={ctasRef} className="flex flex-wrap items-center gap-4 sm:gap-5 pt-2">
                
                {/* Primary CTA 1: View Projects with Text Roll-Over */}
                <RollOverButton
                  onClick={() => handleScrollTo('projects')}
                  className="px-7 py-3.5 rounded-full bg-white text-text-black font-sans text-xs font-bold hover:bg-cobalt hover:text-white shadow-md"
                  icon={<ArrowRight size={14} />}
                >
                  View Projects
                </RollOverButton>

                {/* Primary CTA 2: Download CV */}
                <RollOverLink
                  href={PERSONAL_INFO.contact.resumeUrl}
                  download
                  className="px-6 py-3.5 rounded-full bg-cobalt/15 border border-cobalt/30 text-white font-sans text-xs font-semibold hover:bg-cobalt"
                  icon={<Download size={13} className="text-cobalt-light group-hover:text-white" />}
                >
                  Download CV
                </RollOverLink>

                {/* Secondary Text Link: Get in Touch */}
                <Magnetic strength={0.25}>
                  <button
                    onClick={() => handleScrollTo('contact')}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-300 hover:text-white hover:underline underline-offset-4 transition-colors cursor-pointer ml-1 py-2 px-1"
                  >
                    <span>Get in touch</span>
                    <ArrowUpRight size={13} className="text-acid-lime" />
                  </button>
                </Magnetic>

              </div>

            </div>

            {/* Right Column: 3D Glossy Cobalt Sculpture as Single Focal Point */}
            <div ref={artworkRef} className="lg:col-span-5 flex justify-center items-center relative">
              <CobaltRibbon3D variant="hero" />
            </div>

          </div>

        </div>

        {/* Hero Bottom Telemetry Bar */}
        <div
          ref={telemetryRef}
          className="max-w-7xl mx-auto w-full pt-8 mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-sans text-text-muted border-t border-border-dark"
        >
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span>📍 COIMBATORE, INDIA</span>
            <span>•</span>
            <span>KPR INSTITUTE B.TECH IT</span>
            <span>•</span>
            <span className="text-cobalt-light font-bold">CGPA {PERSONAL_INFO.education.cgpa}</span>
          </div>

          <button
            onClick={() => handleScrollTo('about')}
            className="group flex items-center gap-2 font-medium hover:text-white transition-colors cursor-pointer"
          >
            <span>Scroll to Explore</span>
            <div className="w-6 h-6 rounded-full border border-border-dark flex items-center justify-center group-hover:border-cobalt group-hover:bg-cobalt group-hover:text-white transition-all">
              <ArrowRight size={11} className="rotate-90 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>

      </section>

      {/* Infinite Horizontal Technology Marquee under Hero */}
      <TechMarquee />
    </>
  );
};
