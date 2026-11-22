import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ExternalLink, ArrowRight, Layers } from 'lucide-react';
import { MILESTONES } from '../data/portfolioData';
import { MacOSStackCard } from './ui/MacOSStackCard';
import { CertificateModal } from './ui/CertificateModal';
import { ScrollReveal } from './ui/ScrollReveal';
import { useCornerConvergence } from '../motion/scrollMotion';

const CERTIFICATE_MAP: Record<string, { src: string; title: string; badge: string; pdf?: string }> = {
  'hostel-hackathon': {
    src: '/assets/certificates/hostel_hackathon_cert.jpg',
    title: 'H² Hostel Hackathon Certificate of Participation — KPRIET',
    badge: 'HOSTEL HACKATHON',
  },
  'samsung-innovation-campus': {
    src: '/assets/certificates/samsung_innovation_cert.jpg',
    title: 'Samsung Innovation Campus Artificial Intelligence Certificate (SIC23477)',
    badge: 'SAMSUNG ELECTRONICS',
    pdf: '/assets/Samsung_Innovation_Campus_Cert.pdf',
  },
  'patent-publication': {
    src: '/assets/certificates/patent_gazette_cert.png',
    title: 'Govt. of India Official Patent Publication (202641064539 A)',
    badge: 'INDIAN PATENT GAZETTE',
    pdf: '/assets/Microscopy_System_Patent_Publication.pdf',
  },
  'infosys-internship': {
    src: '/assets/certificates/infosys_springboard_cert.png',
    title: 'Infosys Springboard AI & ML Internship Certificate (Internship 7.0)',
    badge: 'INFOSYS SPRINGBOARD',
    pdf: '/assets/Infosys_Springboard_Internship_Cert.pdf',
  },
  'judahcode-internship': {
    src: '/assets/certificates/judahcode_internship_cert.png',
    title: 'Judah Code Technologies Java Software Developer Internship Certificate',
    badge: 'JUDAHCODE TECH',
    pdf: '/assets/JudahCode_Internship_Cert.pdf',
  },
  'stem-innovators-expo': {
    src: '/assets/certificates/stem_innovators_cert.jpg',
    title: 'STEM Innovators Expo 2025 Certificate of Merit — KPRIET',
    badge: 'STEM INNOVATORS',
  },
};

export const JourneyTimeline = () => {
  const [modalCert, setModalCert] = useState<{ src: string; title: string } | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useCornerConvergence({
    sectionRef,
    headingRef,
    textRef,
  });

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-16 border-t border-border-dark bg-[#0D0E12] text-white transition-colors duration-300"
    >
      {/* Background ambient lighting safely clipped in an absolute layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-10 w-[550px] h-[550px] bg-cobalt/10 rounded-full blur-[170px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* =============================================================== */}
        {/* TWO-COLUMN GRID: STATIC LEFT SIDE + SCROLLABLE RIGHT SIDE      */}
        {/* =============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ============================================================= */}
          {/* LEFT COLUMN: Static Pinning (sticky top-28) like /experience */}
          {/* ============================================================= */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28 self-start">
            <div ref={headingRef} className="space-y-4">
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

            <div ref={textRef} className="space-y-6">
              <p className="font-sans text-base sm:text-lg text-gray-300 font-light max-w-md leading-relaxed">
                Continuous academic rigor, competitive innovation, and corporate research programs.
              </p>

              {/* macOS Stack Instructional Callout */}
              <div className="p-5 rounded-2xl bg-[#14161E] border border-border-dark space-y-2 shadow-subtle-card">
                <div className="flex items-center gap-2 text-xs font-mono text-cobalt-light font-bold">
                  <Layers size={14} className="text-acid-lime animate-bounce" />
                  <span>MACOS INTERACTIVE DOCK STACK UI</span>
                </div>
                <p className="text-xs font-sans text-gray-300 font-light leading-relaxed">
                  Hover over any milestone card on the right to fan out the official certificate stacked behind it. Click to zoom in high resolution.
                </p>
              </div>

              {/* Quick Metrics & Achievements Telemetry */}
              <div className="p-5 rounded-2xl bg-[#14161E] border border-border-dark space-y-2.5 text-xs font-mono shadow-subtle-card">
                <div className="flex items-center justify-between text-gray-300">
                  <span>INTELLECTUAL PROPERTY</span>
                  <span className="font-bold text-acid-lime">1 PATENT PUBLISHED</span>
                </div>
                <div className="flex items-center justify-between text-gray-300">
                  <span>ACADEMIC PERFORMANCE</span>
                  <span className="font-bold text-white">CGPA 8.42</span>
                </div>
                <div className="flex items-center justify-between text-gray-300">
                  <span>CORPORATE CREDENTIALS</span>
                  <span className="font-bold text-cobalt-light">SAMSUNG &amp; INFOSYS</span>
                </div>
                <div className="flex items-center justify-between text-gray-300">
                  <span>HACKATHON HONORS</span>
                  <span className="font-bold text-purple-300">HOSTEL HACKATHON</span>
                </div>
              </div>
            </div>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2 pt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-cobalt" />
              <span className="w-2.5 h-2.5 rounded-full bg-acid-lime" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
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

              <div>
                <a
                  href="/assets/Microscopy_System_Patent_Publication.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cobalt-light font-semibold hover:underline"
                >
                  <FileText size={14} />
                  <span>View Official Published Patent (PDF)</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

          </div>

          {/* ============================================================= */}
          {/* RIGHT COLUMN: Scrollable macOS Cards with Glowing Blue Spine  */}
          {/* ============================================================= */}
          <div className="lg:col-span-7 relative pl-4 sm:pl-8 space-y-12 sm:space-y-16">
            
            {/* Blue Spine Guide Line */}
            <div className="absolute left-0 sm:left-2 top-4 bottom-8 w-[2px] bg-gradient-to-b from-cobalt via-acid-lime to-cobalt/30" />

            {MILESTONES.map((item, idx) => {
              const cert = CERTIFICATE_MAP[item.id] || {
                src: '/assets/certificates/patent_gazette_cert.png',
                title: item.title,
                badge: 'VERIFIED CREDENTIAL',
              };

              return (
                <ScrollReveal key={item.id} delay={idx * 90} variant="popup" className="relative">
                  {/* Spine Node Dot with Neon Center */}
                  <div className="absolute -left-[22px] sm:-left-[30px] top-12 z-20">
                    <div className="w-4 h-4 rounded-full bg-cobalt ring-4 ring-[#0D0E12] shadow-sm flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-acid-lime animate-pulse" />
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
                </ScrollReveal>
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
