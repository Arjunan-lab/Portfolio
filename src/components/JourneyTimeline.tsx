import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MILESTONES } from '../data/portfolioData';
import { MacOSStackCard } from './ui/MacOSStackCard';
import { CertificateModal } from './ui/CertificateModal';
import { checkReducedMotion } from '../motion/tokens';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CERTIFICATE_MAP: Record<string, { src: string; title: string; badge: string; pdf?: string }> = {
  'samsung-innovation-campus': {
    src: '/assets/certificates/samsung_innovation_cert.webp',
    title: 'Samsung Innovation Campus Artificial Intelligence Certificate (SIC23477)',
    badge: 'SAMSUNG ELECTRONICS',
    pdf: '/assets/Samsung_Innovation_Campus_Cert.pdf',
  },
  'hostel-hackathon': {
    src: '/assets/certificates/hostel_hackathon_cert.webp',
    title: 'H² Hostel Hackathon Certificate of Participation — KPRIET',
    badge: 'HOSTEL HACKATHON',
  },
  'infosys-internship': {
    src: '/assets/certificates/infosys_springboard_cert.webp',
    title: 'Infosys Springboard AI & ML Internship Certificate (Internship 7.0)',
    badge: 'INFOSYS SPRINGBOARD',
    pdf: '/assets/Infosys_Springboard_Internship_Cert.pdf',
  },
  'judahcode-internship': {
    src: '/assets/certificates/judahcode_internship_cert.webp',
    title: 'Judah Code Technologies Java Software Developer Internship Certificate',
    badge: 'JUDAHCODE TECH',
    pdf: '/assets/JudahCode_Internship_Cert.pdf',
  },
  'stem-innovators-expo': {
    src: '/assets/certificates/stem_innovators_cert.webp',
    title: 'STEM Innovators Expo 2025 Certificate of Merit — KPRIET',
    badge: 'STEM INNOVATORS',
  },
};

export const JourneyTimeline = () => {
  const [modalCert, setModalCert] = useState<{ src: string; title: string } | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const linePathRef = useRef<SVGLineElement | null>(null);
  const timelineColRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const linePath = linePathRef.current;
    const timelineCol = timelineColRef.current;
    if (!section || !linePath || !timelineCol || checkReducedMotion()) return;

    const ctx = gsap.context(() => {
      // SVG stroke-dashoffset drawing animation scrubbed with scroll
      const lineLength = 2000;
      gsap.set(linePath, {
        strokeDasharray: lineLength,
        strokeDashoffset: lineLength,
      });

      gsap.to(linePath, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineCol,
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: 0.3,
        },
      });

      // Milestone nodes pop in with scale and glow pulse as reached
      const nodes = timelineCol.querySelectorAll('.timeline-node-dot');
      nodes.forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: node,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Milestone cards slide in
      const cards = timelineCol.querySelectorAll('.timeline-card-wrapper');
      cards.forEach((card, index) => {
        const fromX = index % 2 === 0 ? 30 : -30;
        gsap.fromTo(
          card,
          { opacity: 0, x: fromX },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-16 border-t border-border-dark bg-[#0D0E12] text-white transition-colors duration-300"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-10 w-[550px] h-[550px] bg-cobalt/10 rounded-full blur-[170px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* TWO-COLUMN GRID: STATIC LEFT SIDE + SCROLLABLE RIGHT SIDE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Static Pinning (sticky top-28) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28 self-start">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cobalt-light uppercase">
                <span className="w-2 h-2 rounded-full bg-cobalt inline-block animate-pulse" />
                <span>05 // JOURNEY &amp; ACHIEVEMENTS</span>
              </div>

              {/* Signature Headline */}
              <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-[70px] tracking-tight text-white leading-[1.05]">
                Learning.{' '}
                <span className="block">Building.</span>
                <span className="block">
                  Moving{' '}
                  <span className="font-serif-italic font-normal italic text-cobalt-light tracking-normal text-[1.08em] pr-1">
                    forward.
                  </span>
                </span>
              </h2>
            </div>

            <div className="space-y-6">
              <p className="font-sans text-base sm:text-lg text-gray-300 font-light max-w-md leading-relaxed">
                Continuous academic rigor, competitive innovation, and corporate research programs.
              </p>

              {/* Quick Metrics & Achievements Telemetry */}
              <div className="p-5 rounded-2xl bg-[#14161E] border border-border-dark space-y-2.5 text-xs font-mono shadow-subtle-card">
                <div className="flex items-center justify-between text-gray-300">
                  <span>ACADEMIC PERFORMANCE</span>
                  <span className="font-bold text-white">CGPA 8.42</span>
                </div>
                <div className="flex items-center justify-between text-gray-300">
                  <span>GLOBAL PROGRAM</span>
                  <span className="font-bold text-cobalt-light">SAMSUNG INNOVATION CAMPUS</span>
                </div>
                <div className="flex items-center justify-between text-gray-300">
                  <span>INDUSTRY INTERNSHIP</span>
                  <span className="font-bold text-acid-lime">INFOSYS SPRINGBOARD AI</span>
                </div>
                <div className="flex items-center justify-between text-gray-300">
                  <span>SOFTWARE INTERNSHIP</span>
                  <span className="font-bold text-cobalt-light">JUDAHCODE TECH</span>
                </div>
                <div className="flex items-center justify-between text-gray-300">
                  <span>HACKATHON HONORS</span>
                  <span className="font-bold text-purple-300">HOSTEL HACKATHON</span>
                </div>
              </div>
            </div>

            {/* Action Links */}
            <div className="pt-2 space-y-3">
              <div>
                <Link
                  to="/experience"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-text-black text-xs font-sans font-semibold hover:bg-cobalt hover:text-white transition-colors shadow-md"
                >
                  <span>Explore Full Archive &amp; Timeline</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Scrollable Cards with SVG Line Drawing */}
          <div ref={timelineColRef} className="lg:col-span-7 relative pl-6 sm:pl-10 space-y-12 sm:space-y-16">
            
            {/* SVG Scrubbed Drawing Line */}
            <svg
              className="absolute left-2 sm:left-4 top-4 bottom-8 w-2 h-full pointer-events-none overflow-visible"
              aria-hidden="true"
            >
              <line
                ref={linePathRef}
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="url(#timeline-grad)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="timeline-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2B59FF" />
                  <stop offset="50%" stopColor="#7CE028" />
                  <stop offset="100%" stopColor="#2B59FF" stopOpacity="0.4" />
                </linearGradient>
              </defs>
            </svg>

            {MILESTONES.map((item) => {
              const cert = CERTIFICATE_MAP[item.id] || {
                src: '/assets/certificates/hostel_hackathon_cert.webp',
                title: item.title,
                badge: 'VERIFIED CREDENTIAL',
              };

              return (
                <div key={item.id} className="timeline-card-wrapper relative">
                  {/* Spine Node Dot with Neon Center */}
                  <div className="timeline-node-dot absolute -left-[31px] sm:-left-[39px] top-12 z-20">
                    <div className="w-5 h-5 rounded-full bg-cobalt ring-4 ring-[#0D0E12] shadow-[0_0_10px_#2B59FF] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-acid-lime animate-pulse shadow-[0_0_8px_#7CE028]" />
                    </div>
                  </div>

                  {/* macOS Stack Card */}
                  <MacOSStackCard
                    id={item.id}
                    title={item.title}
                    organization={item.organization}
                    period={item.period}
                    description={item.description}
                    certificateSrc={cert.src}
                    certificateTitle={cert.title}
                    badgeLabel={cert.badge}
                    pdfUrl={cert.pdf}
                    onInspect={(src, title) => setModalCert({ src, title })}
                  />
                </div>
              );
            })}

          </div>

        </div>

      </div>

      {/* Lightbox / Zoom Modal for Certificate Inspection */}
      <CertificateModal
        isOpen={Boolean(modalCert)}
        onClose={() => setModalCert(null)}
        certificateSrc={modalCert?.src || ''}
        certificateTitle={modalCert?.title || ''}
      />

    </section>
  );
};
