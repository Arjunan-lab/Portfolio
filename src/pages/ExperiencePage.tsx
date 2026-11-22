import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, FileText, CheckCircle2, Download, Layers } from 'lucide-react';
import { MILESTONES, PERSONAL_INFO } from '../data/portfolioData';
import { MacOSStackCard } from '../components/ui/MacOSStackCard';
import { CertificateModal } from '../components/ui/CertificateModal';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { CobaltRibbon3D } from '../components/ui/CobaltRibbon3D';

const CERTIFICATE_MAP: Record<string, { src: string; title: string; badge: string; pdf?: string }> = {
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
  'samsung-innovation-campus': {
    src: '/assets/certificates/samsung_innovation_cert.jpg',
    title: 'Samsung Innovation Campus Artificial Intelligence Certificate (SIC23477)',
    badge: 'SAMSUNG ELECTRONICS',
    pdf: '/assets/Samsung_Innovation_Campus_Cert.pdf',
  },
  'judahcode-internship': {
    src: '/assets/certificates/judahcode_internship_cert.png',
    title: 'Judah Code Technologies Java Software Developer Internship Certificate',
    badge: 'JUDAHCODE TECH',
    pdf: '/assets/JudahCode_Internship_Cert.pdf',
  },
  'hostel-hackathon': {
    src: '/assets/certificates/hostel_hackathon_cert.jpg',
    title: 'H² Hostel Hackathon Certificate of Participation — KPRIET',
    badge: 'HOSTEL HACKATHON',
  },
  'stem-innovators-expo': {
    src: '/assets/certificates/stem_innovators_cert.jpg',
    title: 'STEM Innovators Expo 2025 Certificate of Merit — KPRIET',
    badge: 'STEM INNOVATORS',
  },
};

export const ExperiencePage = () => {
  const [modalCert, setModalCert] = useState<{ src: string; title: string } | null>(null);

  return (
    <div className="min-h-screen bg-canvas-light dark:bg-[#0C0D11] text-text-black dark:text-white pt-32 pb-24 px-6 sm:px-12 lg:px-16 selection:bg-cobalt selection:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* Navigation */}
        <div className="flex items-center justify-between pb-6 border-b border-border-light dark:border-border-dark">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-dimmed dark:text-text-muted hover:text-text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Overview</span>
          </Link>
          <span className="font-mono text-xs uppercase tracking-widest text-cobalt dark:text-cobalt-light font-bold">
            TIMELINE &amp; RECOGNITION // 04
          </span>
        </div>

        {/* Header with Unique 3D Double Helix DNA Spiral */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs text-text-dimmed dark:text-text-muted uppercase tracking-widest">
              04 — JOURNEY &amp; ACHIEVEMENTS
            </span>
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-[76px] tracking-tight leading-[1.04]">
              Learning.{' '}
              <span className="block">Building.</span>
              <span className="block">
                Moving{' '}
                <span className="font-serif-italic font-normal italic text-cobalt dark:text-cobalt-light text-[1.08em] pr-1">
                  forward.
                </span>
              </span>
            </h1>
            <p className="font-sans text-lg sm:text-2xl text-text-dimmed dark:text-text-muted leading-relaxed font-light">
              A comprehensive record of academic rigor, corporate technical programs, competitive hackathons, and published intellectual property.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cobalt/10 border border-cobalt/20 text-xs font-mono text-cobalt dark:text-cobalt-light font-bold">
              <Layers size={14} className="text-acid-lime animate-bounce" />
              <span>INTERACTIVE MACOS STACK UI: HOVER OVER ANY CARD TO REVEAL OFFICIAL CERTIFICATE</span>
            </div>
          </div>

          {/* Unique 3D Double Helix Sculpture for Journey & Achievements */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <CobaltRibbon3D variant="experience" />
          </div>
        </div>

        {/* Featured Card 01: Published Indian Patent */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#14161E] border border-border-light dark:border-border-dark shadow-subtle-card space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border-light dark:border-border-dark">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 rounded-full bg-cobalt/10 text-cobalt dark:text-cobalt-light text-xs font-mono font-bold">
                PATENT COLLABORATION
              </span>
              <span className="text-xs font-mono text-text-dimmed dark:text-text-muted">
                INDIAN PATENT OFFICE (IPO)
              </span>
            </div>
            <a
              href="/assets/Microscopy_System_Patent_Publication.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-text-black dark:bg-white text-white dark:text-text-black text-xs font-sans font-semibold hover:bg-cobalt dark:hover:bg-cobalt-light dark:hover:text-white transition-colors"
            >
              <FileText size={14} />
              <span>View Official Gazette PDF</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          <div className="space-y-4">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-text-black dark:text-white">
              System and Method for Digital and Optical Microscopy with Integrated Fluid Delivery and Temperature Control
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-text-muted dark:text-gray-400">
              <span>APPLICATION NO: 202641064539 A</span>
              <span>•</span>
              <span>PUBLICATION DATE: 17/10/2026</span>
              <span>•</span>
              <span>COLLABORATIVE HARDWARE-SOFTWARE INNOVATION</span>
            </div>
            <p className="font-sans text-sm sm:text-base text-text-dimmed dark:text-gray-300 leading-relaxed font-light">
              Collaborated on the embedded system architecture, telemetry acquisition loop, and real-time software interface for an automated microscopy workstation featuring precision thermal management and micrometer fluid metering.
            </p>
          </div>
        </div>

        {/* Featured Credentials: First is Hostel Hackathon, Second is Samsung Innovation Campus */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* First: Hostel Hackathon */}
          <div className="p-8 rounded-3xl bg-white dark:bg-[#14161E] border border-border-light dark:border-border-dark shadow-subtle-card space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-acid-lime/20 text-text-black dark:text-acid-lime text-xs font-mono font-bold border border-acid-lime/40">
                  HACKATHON PARTICIPANT
                </span>
                <span className="text-xs font-mono text-text-dimmed dark:text-text-muted">MAY 2025</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-text-black dark:text-white">
                H² — Hostel Hackathon
              </h3>
              <p className="text-xs font-mono text-cobalt dark:text-cobalt-light font-semibold">
                KPR Institute of Engineering and Technology
              </p>
              <p className="text-sm font-sans text-text-dimmed dark:text-gray-300 leading-relaxed font-light">
                Awarded certificate of participation for outstanding performance in the H² Hostel Hackathon organized by Hostels Aura Club at KPRIET. Designed and developed the automated hostel room allocation web platform.
              </p>
            </div>

            <div className="pt-4 border-t border-border-light dark:border-border-dark flex items-center justify-between">
              <span className="text-xs font-mono text-text-muted dark:text-gray-400">OFFICIAL CERTIFICATE</span>
              <button
                onClick={() => setModalCert({
                  src: '/assets/certificates/hostel_hackathon_cert.jpg',
                  title: 'H² Hostel Hackathon Certificate of Participation'
                })}
                className="text-xs font-sans font-semibold text-cobalt dark:text-cobalt-light hover:underline flex items-center gap-1 cursor-pointer"
              >
                <CheckCircle2 size={13} className="text-acid-lime" /> View Certificate
              </button>
            </div>
          </div>

          {/* Second: Samsung Innovation Campus */}
          <div className="p-8 rounded-3xl bg-white dark:bg-[#14161E] border border-border-light dark:border-border-dark shadow-subtle-card space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-cobalt/15 text-cobalt dark:text-cobalt-light text-xs font-mono font-bold border border-cobalt/30">
                  AI SPECIALIZATION
                </span>
                <span className="text-xs font-mono text-text-dimmed dark:text-text-muted">2026</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-text-black dark:text-white">
                Samsung Innovation Campus
              </h3>
              <p className="text-xs font-mono text-cobalt dark:text-cobalt-light font-semibold">
                Artificial Intelligence Certificate (SIC23477)
              </p>
              <p className="text-sm font-sans text-text-dimmed dark:text-gray-300 leading-relaxed font-light">
                Completed industry-oriented curriculum in Artificial Intelligence, Machine Learning algorithms, and Data Analytics conducted by Samsung Southwest Asia and ESSCI.
              </p>
            </div>

            <div className="pt-4 border-t border-border-light dark:border-border-dark flex items-center justify-between">
              <span className="text-xs font-mono text-text-muted dark:text-gray-400">CREDENTIAL BADGE</span>
              <button
                onClick={() => setModalCert({
                  src: '/assets/certificates/samsung_innovation_cert.jpg',
                  title: 'Samsung Innovation Campus Artificial Intelligence Certificate'
                })}
                className="text-xs font-sans font-semibold text-cobalt dark:text-cobalt-light hover:underline flex items-center gap-1 cursor-pointer"
              >
                <CheckCircle2 size={13} className="text-acid-lime" /> View Certificate
              </button>
            </div>
          </div>

        </div>

        {/* Detailed Milestones Timeline with macOS Stacks & Static Sticky Left Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pt-6 border-t border-border-light dark:border-border-dark">
          
          {/* Left Column (5 cols): Static Sticky Pinning until scroll completes */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28 self-start">
            <div className="space-y-4">
              <span className="font-mono text-xs text-text-dimmed dark:text-text-muted uppercase tracking-widest block">
                04 // CHRONOLOGICAL MILESTONES
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-[54px] tracking-tight leading-[1.05]">
                Learning.{' '}
                <span className="block">Building.</span>
                <span className="block">
                  Moving{' '}
                  <span className="font-serif-italic font-normal italic text-cobalt dark:text-cobalt-light text-[1.08em] pr-1">
                    forward.
                  </span>
                </span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-text-dimmed dark:text-gray-300 leading-relaxed font-light">
                A verified record of academic rigor, corporate technical programs, competitive hackathons, and published intellectual property.
              </p>
            </div>

            {/* macOS Stack Callout */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#14161E] border border-border-light dark:border-border-dark space-y-3 shadow-subtle-card">
              <div className="flex items-center gap-2 text-xs font-mono text-cobalt dark:text-cobalt-light font-bold">
                <Layers size={14} className="text-acid-lime animate-bounce" />
                <span>MACOS DOCK STACK UI</span>
              </div>
              <p className="text-xs font-sans text-text-dimmed dark:text-gray-300 font-light leading-relaxed">
                Hover over any milestone card on the right to fan out the official certificate stacked behind it. Click to zoom in high resolution.
              </p>
            </div>

            {/* Quick Metrics Badges */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#14161E] border border-border-light dark:border-border-dark space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-text-dimmed dark:text-gray-300">
                <span>INTELLECTUAL PROPERTY</span>
                <span className="font-bold text-acid-lime">1 PATENT PUBLISHED</span>
              </div>
              <div className="flex items-center justify-between text-text-dimmed dark:text-gray-300">
                <span>ACADEMIC PERFORMANCE</span>
                <span className="font-bold text-text-black dark:text-white">CGPA 8.42</span>
              </div>
              <div className="flex items-center justify-between text-text-dimmed dark:text-gray-300">
                <span>CORPORATE CREDENTIALS</span>
                <span className="font-bold text-cobalt dark:text-cobalt-light">SAMSUNG &amp; INFOSYS</span>
              </div>
            </div>

            {/* Direct CV Download Link */}
            <a
              href={PERSONAL_INFO.contact.resumeUrl}
              download
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-text-black dark:bg-white text-white dark:text-text-black text-xs font-sans font-bold hover:bg-cobalt dark:hover:bg-cobalt-light dark:hover:text-white transition-colors"
            >
              <Download size={13} />
              <span>Download Official Resume (PDF)</span>
            </a>
          </div>

          {/* Right Column (7 cols): Scrollable list of macOS Stack cards */}
          <div className="lg:col-span-7 space-y-6">
            {MILESTONES.map((item, idx) => {
              const cert = CERTIFICATE_MAP[item.id] || {
                src: '/assets/certificates/patent_gazette_cert.png',
                title: item.title,
                badge: 'VERIFIED CREDENTIAL',
              };

              return (
                <ScrollReveal key={item.id} delay={idx * 80} variant="popup">
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

        {/* Bottom CTA to Resume and Contact */}
        <div className="p-8 sm:p-12 rounded-3xl bg-text-black dark:bg-[#14161E] text-white border border-border-light dark:border-border-dark flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <h3 className="font-display font-black text-2xl sm:text-3xl">
              Ready to explore formal qualifications?
            </h3>
            <p className="text-sm text-white/70 max-w-lg font-light">
              Download my complete curriculum vitae with full course grades (CGPA 8.42), extracurricular initiatives, and technical competencies.
            </p>
          </div>

          <a
            href={PERSONAL_INFO.contact.resumeUrl}
            download
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-text-black text-xs font-sans font-bold hover:bg-cobalt hover:text-white transition-colors flex-shrink-0"
          >
            <Download size={14} />
            <span>Download Official Resume (PDF)</span>
          </a>
        </div>

      </div>

      {/* Lightbox / Zoom Modal for Certificate Inspection */}
      <CertificateModal
        isOpen={Boolean(modalCert)}
        onClose={() => setModalCert(null)}
        certificateSrc={modalCert?.src || ''}
        certificateTitle={modalCert?.title || ''}
      />
    </div>
  );
};
