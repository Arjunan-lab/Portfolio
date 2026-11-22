import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ExternalLink, 
  FileText, 
  Award, 
  ShieldCheck, 
  Download, 
  ZoomIn, 
  Sparkles
} from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { PROJECTS } from '../../data/portfolioData';
import { useCornerConvergence } from '../../motion/scrollMotion';
import { CertificateModal } from '../ui/CertificateModal';

const FILTER_TABS = [
  'All Projects',
  'AI & Machine Learning',
  'Full-Stack & Web',
  'Enterprise & Systems'
] as const;

export const ProjectsSection = () => {
  const [filterTab, setFilterTab] = useState<typeof FILTER_TABS[number]>('All Projects');
  const [samsungCertModalOpen, setSamsungCertModalOpen] = useState(false);
  const [isSamsungHovered, setIsSamsungHovered] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useCornerConvergence({
    sectionRef,
    headingRef,
    textRef,
  });

  const filteredProjects = PROJECTS.filter(p => {
    if (filterTab === 'All Projects') return true;
    if (filterTab === 'AI & Machine Learning') return p.category.includes('Intelligence') || p.category.includes('Learning') || p.category.includes('AI') || p.category.includes('Processing');
    if (filterTab === 'Full-Stack & Web') return p.category.includes('Full-Stack') || p.category.includes('Web') || p.category.includes('Campus') || p.category.includes('PHP');
    if (filterTab === 'Enterprise & Systems') return p.category.includes('Enterprise') || p.category.includes('Patent') || p.category.includes('Hardware') || p.category.includes('Java');
    return true;
  });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-16 border-t border-border-dark bg-[#0C0D11] text-white transition-colors duration-300 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-cobalt/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4 border-b border-border-dark">
          
          <div ref={headingRef} className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-text-muted uppercase">
              <span className="w-2 h-2 rounded-full bg-cobalt inline-block animate-pulse" />
              <span>04 // SELECTED WORK &amp; SYSTEM REPOSITORIES</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-[60px] tracking-tight text-white leading-[1.05] uppercase">
              Turning ideas{' '}
              <span className="block">
                into{' '}
                <span className="font-serif-italic font-normal italic text-cobalt-light tracking-normal text-[1.08em] pr-1">
                  products.
                </span>
              </span>
            </h2>
            <p ref={textRef} className="font-sans text-sm sm:text-base text-text-muted leading-relaxed font-light">
              Grounded software systems spanning applied machine learning, production full-stack platforms, campus utilities, and published hardware-software intellectual property.
            </p>
          </div>

          {/* Right side filter tabs & count */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {FILTER_TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilterTab(tab)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    filterTab === tab
                      ? 'bg-cobalt text-white shadow-cobalt-glow'
                      : 'bg-white/5 border border-border-dark text-gray-300 hover:border-cobalt'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <span className="text-xs font-mono text-gray-400 self-center sm:self-auto sm:pl-2">
              {filteredProjects.length} Repositories
            </span>
          </div>

        </div>

        {/* =============================================================== */}
        {/* SPOTLIGHT: SAMSUNG INNOVATION CAMPUS AI CERTIFICATE CARD         */}
        {/* (Hover to display in rich comprehensive detail)                */}
        {/* =============================================================== */}
        <div
          onMouseEnter={() => setIsSamsungHovered(true)}
          onMouseLeave={() => setIsSamsungHovered(false)}
          className={`group relative rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-500 border ${
            isSamsungHovered
              ? 'bg-[#14161E] border-cyan-400/50 shadow-2xl shadow-cyan-500/10'
              : 'bg-[#111216] border-border-dark hover:border-white/20'
          }`}
        >
          {/* Top Banner Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                VERIFIED INDUSTRY ACCREDITATION
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold bg-purple-950 text-purple-300 border border-purple-800">
                SAMSUNG INNOVATION CAMPUS 2026
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Sparkles size={13} className="text-acid-lime animate-pulse" />
              <span>HOVER FOR COMPLETE CREDENTIAL TELEMETRY</span>
            </div>
          </div>

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center pt-6">
            
            {/* Left Column: Certificate Preview (High-Res) */}
            <div 
              onClick={() => setSamsungCertModalOpen(true)}
              className="lg:col-span-5 relative group/cert rounded-2xl overflow-hidden border border-white/15 bg-black cursor-pointer shadow-lg"
            >
              <img
                src="/assets/certificates/samsung_innovation_cert.jpg"
                alt="Samsung Innovation Campus Certificate of Completion - Arjunan V"
                className="w-full h-auto object-cover group-hover/cert:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover/cert:opacity-40 transition-opacity" />
              
              {/* Click to expand overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/cert:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-text-black text-xs font-mono font-bold shadow-xl">
                  <ZoomIn size={14} />
                  <span>Inspect Fullscreen</span>
                </span>
              </div>

              {/* Bottom tag on image */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90">
                <span className="bg-black/70 px-2.5 py-1 rounded-md backdrop-blur-sm">
                  ID: <strong className="text-cyan-300 font-bold">SIC23477</strong>
                </span>
                <span className="bg-black/70 px-2.5 py-1 rounded-md backdrop-blur-sm text-acid-lime">
                  Official ESSCI
                </span>
              </div>
            </div>

            {/* Right Column: In-Depth Details (Elaborates on hover) */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
                  <Award size={14} />
                  <span>SPECIALIZED COURSE OF COMPLETION</span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white">
                  Samsung Innovation Campus —{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    Artificial Intelligence
                  </span>
                </h3>

                <p className="font-sans text-sm sm:text-base text-gray-300 font-light leading-relaxed">
                  Successfully completed comprehensive industry certification in <strong className="text-white">Artificial Intelligence</strong>, covering convolutional deep vision, NLP semantic retrieval, neural training dynamics, and predictive modeling.
                </p>
              </div>

              {/* Verified Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase">Recipient &amp; Accreditation:</span>
                  <span className="text-white font-bold text-sm">ARJUNAN V</span>
                  <span className="text-gray-400 block text-[11px]">Certificate ID: SIC23477</span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase">Timeline &amp; Duration:</span>
                  <span className="text-cyan-300 font-bold text-sm">21/01/2026 — 31/03/2026</span>
                  <span className="text-gray-400 block text-[11px]">Active Certification</span>
                </div>
              </div>

              {/* Extended Details (Revealed dynamically or highlighted on hover) */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400 font-semibold">
                  <ShieldCheck size={14} />
                  <span>AUTHORIZED SIGNATORIES &amp; ACCREDITING BODIES</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300 font-sans">
                  <div>
                    <strong className="text-white block font-medium">Shubham Mukherjee</strong>
                    <span className="text-[11px] text-gray-400">Head - CSR &amp; Corp. Communications, Samsung Southwest Asia</span>
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Vinod Sharma</strong>
                    <span className="text-[11px] text-gray-400">Chairman, Electronics Sector Skills Council of India (ESSCI)</span>
                  </div>
                </div>

                {isSamsungHovered && (
                  <div className="pt-2 border-t border-white/10 space-y-1.5 animate-fadeIn">
                    <span className="font-mono text-[10px] text-purple-300 uppercase block">
                      CORE AI MODULES &amp; PROJECT IMPLEMENTATION:
                    </span>
                    <p className="text-[12px] text-gray-300 font-sans leading-relaxed">
                      Applied course methodologies directly into the <strong className="text-cyan-300">Amazon Customer Intelligence RAG Engine</strong> (System 05), indexing 10,000+ customer reviews with SentenceTransformers vector embeddings and zero-hallucination semantic synthesis.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setSamsungCertModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-text-black text-xs font-sans font-bold hover:bg-cobalt hover:text-white transition-all shadow-md cursor-pointer"
                >
                  <ZoomIn size={14} />
                  <span>View High-Res Certificate</span>
                </button>

                <a
                  href="/assets/Samsung_Innovation_Campus_Cert.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-mono transition-colors"
                >
                  <Download size={13} className="text-cyan-400" />
                  <span>Download Official PDF</span>
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* =============================================================== */}
        {/* GALLERY VIEW: Responsive Grid with Rows and Columns             */}
        {/* =============================================================== */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
              FLAGSHIP ENGINEERING WORK &amp; SYSTEM ARCHITECTURES
            </span>
            <span className="text-xs font-mono text-cyan-400">
              09 PRODUCTION REPOSITORIES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, idx) => {
              const isPatent = project.id === 'microscopy-patent';
              const coverImg = project.coverImage || '/assets/projects/agriculture-ai/seedling-preview.png';

              return (
                <div
                  key={project.id}
                  className="group flex flex-col justify-between rounded-3xl bg-[#14161E] border border-border-dark hover:border-cobalt transition-all duration-300 shadow-subtle-card overflow-hidden"
                >
                  {/* 16:9 Cover Image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                    <img
                      src={coverImg}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                    {/* System Badge */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                      <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/15 font-bold text-[11px]">
                        SYSTEM 0{idx + 1}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-cobalt/80 backdrop-blur-md text-white font-mono text-[10px] uppercase font-semibold">
                        {project.techStack[0]}
                      </span>
                    </div>

                    {/* Category label on cover */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="font-mono text-[10px] text-acid-lime font-bold uppercase tracking-wider block drop-shadow">
                        {project.category.split('/')[0].trim()}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    
                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-cobalt-light transition-colors leading-snug">
                        {project.title}
                      </h3>

                      <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed font-light line-clamp-3">
                        {project.shortDescription}
                      </p>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="space-y-4 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 4).map(tech => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-2 py-1 text-[10px] font-mono text-gray-400">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Direct Repository / Gazette Link */}
                      <div className="pt-3 border-t border-border-dark">
                        {isPatent ? (
                          <a
                            href="/assets/Microscopy_System_Patent_Publication.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-text-black text-xs font-semibold hover:bg-cobalt hover:text-white transition-colors"
                          >
                            <FileText size={13} />
                            <span>View Official Gazette PDF</span>
                            <ExternalLink size={12} />
                          </a>
                        ) : (
                          <a
                            href={project.githubUrl || "https://github.com/Arjunan-lab"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border-dark bg-white/5 text-white text-xs font-semibold hover:border-cobalt hover:text-cobalt-light hover:bg-cobalt/10 transition-all shadow-sm"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            <span>View Repository on GitHub</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Strip: Link to Dedicated Work Archive */}
        <div className="pt-8 border-t border-border-dark flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <span className="w-2 h-2 rounded-full bg-acid-lime" />
            <span>ALL 9 REPOSITORIES VERIFIED ON GITHUB</span>
          </div>

          <Link
            to="/work"
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white font-semibold hover:text-cobalt-light transition-colors"
          >
            <span>Explore All 9 Projects Archive</span>
            <div className="w-6 h-6 rounded-full border border-border-dark flex items-center justify-center group-hover:border-cobalt group-hover:bg-cobalt group-hover:text-white transition-all">
              <ArrowRight size={12} />
            </div>
          </Link>
        </div>

      </div>

      {/* Samsung Certificate Fullscreen Modal */}
      <CertificateModal
        isOpen={samsungCertModalOpen}
        onClose={() => setSamsungCertModalOpen(false)}
        certificateSrc="/assets/certificates/samsung_innovation_cert.jpg"
        certificateTitle="Samsung Innovation Campus — Artificial Intelligence (SIC23477)"
      />
    </section>
  );
};
