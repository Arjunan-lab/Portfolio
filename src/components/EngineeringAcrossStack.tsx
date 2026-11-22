import { useState, useRef } from 'react';
import { ArrowUpRight, Terminal, Cpu, Layout, Server, Database, Box, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCornerConvergence } from '../motion/scrollMotion';

interface StackCategory {
  num: string;
  title: string;
  technologies: string[];
  domain: string;
  icon: typeof Terminal;
  summary: string;
  projectProof: string;
  runtimeTelemetry: string;
}

const STACK_CATEGORIES: StackCategory[] = [
  {
    num: '01',
    title: 'PROGRAMMING',
    technologies: ['Python', 'Java', 'C', 'JavaScript', 'SQL'],
    domain: 'Systems & Algorithmic Foundations',
    icon: Terminal,
    summary: 'Strong object-oriented paradigms, memory-conscious data structures, and relational querying across diverse runtimes.',
    projectProof: 'SecureBank Core JDBC Engine & Automated Microscopy Firmware',
    runtimeTelemetry: 'JVM 21 • C++20 • Python 3.12 • ES2024 • Strict Typing',
  },
  {
    num: '02',
    title: 'FRONTEND ENGINEERING',
    technologies: ['React.js', 'HTML', 'CSS', 'Tailwind CSS'],
    domain: 'Component Architecture & Responsive Motion',
    icon: Layout,
    summary: 'Modern component-driven web architectures, accessible semantic DOM hierarchies, custom CSS variable systems, and GPU-accelerated motion.',
    projectProof: 'ApexStore MERN Platform & BloodConnect Geospatial Live UI',
    runtimeTelemetry: 'React 19 • Vite HMR • Tailwind 3.4 • Lenis SmoothScroll',
  },
  {
    num: '03',
    title: 'BACKEND ENGINEERING',
    technologies: ['FastAPI', 'Node.js', 'REST APIs', 'Celery'],
    domain: 'High-Throughput Asynchronous Services',
    icon: Server,
    summary: 'Asynchronous event loops, RESTful microservices, Server-Sent Events (SSE) streaming protocols, and background worker queues.',
    projectProof: 'RoadSoS Cloud Triage Backend & SmartAttend Campus Network API',
    runtimeTelemetry: 'ASGI Uvicorn • Express EventLoop • Celery Distributed Tasks',
  },
  {
    num: '04',
    title: 'ARTIFICIAL INTELLIGENCE',
    technologies: ['TensorFlow/Keras', 'EfficientNetB2', 'CatBoost', 'Scikit-learn', 'NumPy', 'Pandas', 'RAG fundamentals'],
    domain: 'Deep Learning, Gradient Boosting & Retrieval',
    icon: Cpu,
    summary: 'Convolutional vision backbones, gradient boosted decision trees for multi-target classification, dense vector embeddings, and RAG pipelines.',
    projectProof: 'AgriSense Soil Health (Infosys) & Amazon Customer RAG (Samsung AI)',
    runtimeTelemetry: 'Cosine Sim > 0.82 • ROC-AUC 0.94 • SentenceTransformers',
  },
  {
    num: '05',
    title: 'DATABASE ENGINEERING',
    technologies: ['MySQL', 'MongoDB', 'SQLAlchemy'],
    domain: 'Persistence, Concurrency & Schema Integrity',
    icon: Database,
    summary: 'ACID transaction locks, foreign key normalization, high-throughput document stores, and declarative ORM migrations.',
    projectProof: 'BloodConnect Prisma PostgreSQL & SecureBank Row-Level Locks',
    runtimeTelemetry: 'ACID Concurrency • B-Tree Indexing • Mongoose ODM • Alembic',
  },
  {
    num: '06',
    title: 'DEVELOPMENT ECOSYSTEM',
    technologies: ['Git', 'GitHub', 'Docker', 'Postman', 'Streamlit'],
    domain: 'DevOps, Containerization & Testing Suite',
    icon: Box,
    summary: 'Branch-based Git workflows, reproducible Docker containers, contract-first API testing suites, and rapid ML prototypes.',
    projectProof: 'Containerized ML Deployments & Multi-Environment CI/CD',
    runtimeTelemetry: 'Docker Compose • Git Submodules • Postman Collections',
  },
];

export const EngineeringAcrossStack = () => {
  // Simple view by default: activeIdx is null until hovered
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
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

  const activeCategory = activeIdx !== null ? STACK_CATEGORIES[activeIdx] : null;

  return (
    <section
      ref={sectionRef}
      id="engineering"
      className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-16 border-t border-border-light dark:border-white/10 bg-canvas-light dark:bg-[#0C0D11] text-text-black dark:text-white transition-colors duration-300 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[550px] h-[550px] bg-cobalt/5 dark:bg-cobalt/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Main Asymmetric Technical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (5 cols): Large Editorial Typography & Real-Time Telemetry Terminal */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28 self-start">
            
            {/* Upper-Left: Heading */}
            <div ref={headingRef} className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-text-dimmed dark:text-text-muted block">
                02 // TECHNICAL INDEX
              </span>

              <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-[70px] tracking-tight leading-[0.98] uppercase">
                ENGINEERING{' '}
                <span className="block text-cobalt dark:text-cobalt-light">
                  ACROSS THE
                </span>
                <span className="block">STACK.</span>
              </h2>
            </div>

            {/* Lower-Left: Supporting Statement */}
            <div ref={textRef} className="space-y-6">
              <p className="font-sans text-base sm:text-lg text-text-dimmed dark:text-text-muted font-light leading-relaxed">
                "From intelligent systems to scalable applications, I enjoy engineering across different layers of technology."
              </p>

              {/* Small Uppercase Technical Meta Labels & Simple View Cue */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cobalt/10 border border-cobalt/20 text-xs font-mono text-cobalt dark:text-cobalt-light font-bold">
                  <Sparkles size={12} className="text-acid-lime" />
                  <span>SIMPLE VIEW // HOVER TO ELABORATE</span>
                </span>
                <span className="text-xs font-mono text-text-dimmed dark:text-text-muted">
                  06 CORE LAYERS
                </span>
              </div>
            </div>

            {/* Live Contextual Architectural Visual Snippet (Hover-Reactive) */}
            <div 
              ref={telemetryRef}
              className="p-6 rounded-2xl bg-white dark:bg-[#14161E] border border-border-light dark:border-white/10 shadow-subtle-card space-y-4 transition-all duration-300"
            >
              {activeCategory ? (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-border-light dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <activeCategory.icon size={14} className="text-cobalt dark:text-cobalt-light animate-pulse" />
                      <span className="font-mono text-xs uppercase tracking-wider text-cobalt dark:text-cobalt-light font-bold">
                        LAYER {activeCategory.num} // {activeCategory.title}
                      </span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-acid-lime" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-text-muted dark:text-gray-400 uppercase block">
                      ARCHITECTURE SPECIFICATION
                    </span>
                    <p className="font-sans text-xs text-text-dimmed dark:text-gray-300 leading-relaxed font-light">
                      {activeCategory.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border-light/70 dark:border-white/5 space-y-1">
                    <span className="text-[10px] font-mono text-text-muted dark:text-gray-400 uppercase block">
                      VERIFIED IMPLEMENTATION EVIDENCE
                    </span>
                    <span className="font-mono text-xs text-text-black dark:text-white font-semibold block">
                      {activeCategory.projectProof}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-canvas-light dark:bg-black/40 border border-border-light dark:border-white/5 font-mono text-[11px] text-cobalt dark:text-cobalt-light flex items-center justify-between">
                    <span>RUNTIME:</span>
                    <span className="text-text-black dark:text-gray-300 truncate max-w-[240px]">
                      {activeCategory.runtimeTelemetry}
                    </span>
                  </div>
                </>
              ) : (
                <div className="py-6 px-2 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-cobalt/10 border border-cobalt/20 text-cobalt dark:text-cobalt-light mx-auto flex items-center justify-center">
                    <Terminal size={18} />
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-cobalt dark:text-cobalt-light font-bold block">
                      TECHNICAL TELEMETRY
                    </span>
                    <p className="font-sans text-xs text-text-dimmed dark:text-text-muted font-light mt-1">
                      Hover over any engineering layer to elaborate architectural telemetry, verified implementations, and runtime specifications.
                    </p>
                  </div>
                  <div className="pt-2 flex justify-center items-center gap-2 text-[10px] font-mono text-text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-acid-lime animate-pulse" />
                    <span>6 PRODUCTION LAYERS READY</span>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column (7 cols): Asymmetric Technical Categories with Fine Separators */}
          <div 
            ref={artworkRef} 
            onMouseLeave={() => setActiveIdx(null)}
            className="lg:col-span-7 space-y-0 divide-y divide-border-light dark:divide-white/10 border-t border-b border-border-light dark:border-white/10"
          >
            {STACK_CATEGORIES.map((cat, idx) => {
              const isHovered = activeIdx === idx;

              return (
                <div
                  key={cat.num}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onMouseLeave={() => setActiveIdx(null)}
                  className={`group py-6 sm:py-7 px-4 sm:px-6 transition-all duration-300 cursor-pointer relative ${
                    isHovered
                      ? 'bg-white/80 dark:bg-white/[0.04]'
                      : 'hover:bg-white/40 dark:hover:bg-white/[0.02]'
                  }`}
                >
                  {/* Subtle animated electric blue left indicator bar */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-cobalt transition-all duration-300 ${
                      isHovered ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                    }`}
                  />

                  <div className="space-y-3">
                    
                    {/* Top Row: Number, Title, and Indicator Arrow */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-baseline gap-4 sm:gap-6">
                        {/* Number */}
                        <span
                          className={`font-mono text-sm sm:text-base font-bold transition-colors duration-200 ${
                            isHovered
                              ? 'text-cobalt dark:text-cobalt-light'
                              : 'text-text-dimmed dark:text-text-muted'
                          }`}
                        >
                          {cat.num}
                        </span>

                        {/* Title */}
                        <h3
                          className={`font-display font-black text-xl sm:text-2xl lg:text-3xl tracking-tight transition-all duration-200 ${
                            isHovered
                              ? 'text-cobalt dark:text-cobalt-light translate-x-1'
                              : 'text-text-black dark:text-white'
                          }`}
                        >
                          {cat.title}
                        </h3>
                      </div>

                      {/* Directional Indicator */}
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono uppercase tracking-wider transition-opacity duration-200 hidden sm:inline-block ${
                          isHovered ? 'text-cobalt font-semibold opacity-100' : 'text-text-dimmed opacity-40 group-hover:opacity-100'
                        }`}>
                          {isHovered ? 'Elaborated' : 'Hover'}
                        </span>
                        <div
                          className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                            isHovered
                              ? 'border-cobalt bg-cobalt text-white translate-x-0.5 -translate-y-0.5 shadow-sm'
                              : 'border-border-light dark:border-white/15 text-text-dimmed dark:text-text-muted group-hover:border-cobalt group-hover:text-cobalt'
                          }`}
                        >
                          <ArrowUpRight size={13} />
                        </div>
                      </div>
                    </div>

                    {/* Subtitle / Domain Label */}
                    <p className="font-mono text-xs uppercase tracking-wider text-text-dimmed dark:text-text-muted pl-8 sm:pl-10">
                      {cat.domain}
                    </p>

                    {/* Associated Technologies Array: Highlighted and expanded on hover */}
                    <div className="pl-8 sm:pl-10 flex flex-wrap items-center gap-1.5 pt-1">
                      {cat.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-200 ${
                            isHovered
                              ? 'bg-cobalt/15 dark:bg-cobalt/25 border border-cobalt/35 text-cobalt dark:text-cobalt-light font-medium shadow-sm'
                              : 'bg-white dark:bg-white/5 border border-border-light dark:border-white/10 text-text-dimmed dark:text-gray-300'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* In-Place Elaboration on Hover */}
                    <div
                      className={`grid transition-all duration-300 ease-out overflow-hidden ${
                        isHovered ? 'grid-rows-[1fr] opacity-100 pt-2' : 'grid-rows-[0fr] opacity-0 pt-0'
                      }`}
                    >
                      <div className="overflow-hidden pl-8 sm:pl-10 space-y-2 pt-1 border-t border-border-light/60 dark:border-white/5">
                        <p className="font-sans text-xs text-text-dimmed dark:text-gray-300 leading-relaxed font-light">
                          {cat.summary}
                        </p>
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-cobalt dark:text-cobalt-light font-medium">
                          <CheckCircle2 size={12} className="shrink-0" />
                          <span>Proof: {cat.projectProof}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
