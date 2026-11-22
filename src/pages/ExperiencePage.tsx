import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { MILESTONES, PERSONAL_INFO } from '../data/portfolioData';
import { MacOSStackCard } from '../components/ui/MacOSStackCard';
import { CertificateModal } from '../components/ui/CertificateModal';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { CobaltRibbon3D } from '../components/ui/CobaltRibbon3D';

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

export const ExperiencePage = () => {
  const [modalCert, setModalCert] = useState<{ src: string; title: string } | null>(null);

  return (
    <div className="min-h-screen bg-[#0C0D11] text-white pt-32 pb-24 px-6 sm:px-12 lg:px-16 selection:bg-cobalt selection:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Navigation */}
        <div className="flex items-center justify-between pb-6 border-b border-border-dark">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Overview</span>
          </Link>
          <span className="font-mono text-xs uppercase tracking-widest text-cobalt-light font-bold">
            TIMELINE &amp; RECOGNITION // 05
          </span>
        </div>

        {/* Header with Unique 3D Double Helix DNA Spiral */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs text-text-muted uppercase tracking-widest">
              05 — JOURNEY &amp; ACHIEVEMENTS
            </span>
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-[76px] tracking-tight leading-[1.04]">
              Learning.{' '}
              <span className="block">Building.</span>
              <span className="block">
                Moving{' '}
                <span className="font-serif-italic font-normal italic text-cobalt-light text-[1.08em] pr-1">
                  forward.
                </span>
              </span>
            </h1>
            <p className="font-sans text-lg sm:text-2xl text-text-muted leading-relaxed font-light">
              A comprehensive record of academic rigor, corporate technical programs, competitive hackathons, and published intellectual property.
            </p>
          </div>

          {/* Unique 3D Double Helix Sculpture for Journey & Achievements */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <CobaltRibbon3D variant="experience" />
          </div>
        </div>

        {/* Detailed Milestones Timeline with macOS Stacks & Static Sticky Left Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pt-6 border-t border-border-dark">
          
          {/* Left Column (5 cols): Static Sticky Pinning until scroll completes */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28 self-start">
            <div className="space-y-4">
              <span className="font-mono text-xs text-text-muted uppercase tracking-widest block">
                05 // CHRONOLOGICAL MILESTONES
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-[54px] tracking-tight leading-[1.05]">
                Milestones &amp;{' '}
                <span className="block text-cobalt-light">Credentials.</span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed font-light">
                A verified record of academic rigor, corporate technical programs, competitive hackathons, and published intellectual property.
              </p>
            </div>

            {/* Quick Metrics Badges */}
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

            {/* Direct CV Download Link */}
            <a
              href={PERSONAL_INFO.contact.resumeUrl}
              download
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-white text-text-black text-xs font-sans font-bold hover:bg-cobalt hover:text-white transition-colors cursor-pointer shadow-md"
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
        <div className="p-8 sm:p-12 rounded-3xl bg-[#14161E] text-white border border-border-dark flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <h3 className="font-display font-black text-2xl sm:text-3xl">
              Ready to explore formal qualifications?
            </h3>
            <p className="text-sm text-gray-300 max-w-lg font-light">
              Download my complete curriculum vitae with full course grades (CGPA 8.42), extracurricular initiatives, and technical competencies.
            </p>
          </div>

          <a
            href={PERSONAL_INFO.contact.resumeUrl}
            download
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-text-black text-xs font-sans font-bold hover:bg-cobalt hover:text-white transition-colors flex-shrink-0 cursor-pointer shadow-md"
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
