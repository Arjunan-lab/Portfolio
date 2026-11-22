import { useState, useRef } from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { useCornerConvergence } from '../motion/scrollMotion';

interface CompetencyItem {
  id: string;
  num: string;
  title: string;
  simpleTags: string[];
  description: string;
  evidence: string;
  keyPractices: string[];
}

const TECHNICAL_COMPETENCIES: CompetencyItem[] = [
  {
    id: 'tech-1',
    num: '01',
    title: 'Programming & Problem Solving',
    simpleTags: ['Python', 'Java', 'C', 'SQL', 'Algorithms'],
    description: 'Algorithmic efficiency, strong object-oriented and functional paradigms, and data structure selection optimized for time and memory constraints.',
    evidence: 'SecureBank Core Banking Engine & 8.42 CGPA Academic Distinction',
    keyPractices: ['Time/Space Complexity Profiling', 'Clean Code Architecture', 'Defensive Type Checking'],
  },
  {
    id: 'tech-2',
    num: '02',
    title: 'Frontend Development',
    simpleTags: ['React.js', 'TypeScript', 'Tailwind', 'CSS3'],
    description: 'Responsive, accessible, and high-performance client interfaces using modern component systems, design tokens, and smooth hardware-accelerated animations.',
    evidence: 'ApexStore MERN Commercial Interface & Interactive Visual Architecture',
    keyPractices: ['React 19 Hooks & Custom State', 'Tailwind Variable Systems', 'Sub-millisecond UI State Sync'],
  },
  {
    id: 'tech-3',
    num: '03',
    title: 'Backend Engineering',
    simpleTags: ['FastAPI', 'Node.js', 'REST APIs', 'Async ASGI'],
    description: 'Scalable service architectures, modular routing, middleware pipelines, and robust authentication layers designed for resilience under concurrent load.',
    evidence: 'RoadSoS FastAPI Cloud Engine & SmartAttend Distributed Backend',
    keyPractices: ['Async ASGI & Uvicorn Runtimes', 'JWT & OAuth2 Security Flow', 'Decoupled Worker Task Queues'],
  },
  {
    id: 'tech-4',
    num: '04',
    title: 'API Design & Integration',
    simpleTags: ['OpenAPI', 'SSE Streaming', 'Pydantic Contracts'],
    description: 'Contract-first RESTful endpoint definitions, precise status code semantics, typed request validation, and bidirectional real-time communication protocols.',
    evidence: 'Live Road Triage Telemetry & Amazon Multi-Turn RAG Service Endpoints',
    keyPractices: ['OpenAPI / Pydantic Schemas', 'Server-Sent Events (SSE)', 'Resilient Error Handling Contracts'],
  },
  {
    id: 'tech-5',
    num: '05',
    title: 'Database Management',
    simpleTags: ['MySQL', 'MongoDB', 'SQLAlchemy', 'ACID Locks'],
    description: 'ACID-compliant relational schema modeling, foreign key constraints, query indexing optimization, and document database aggregation pipelines.',
    evidence: 'SecureBank Transactional Locks & BloodConnect Spatial Geohashing',
    keyPractices: ['MySQL B-Tree Indexing', 'MongoDB Aggregation Framework', 'SQLAlchemy Declarative ORM'],
  },
  {
    id: 'tech-6',
    num: '06',
    title: 'Machine Learning Model Integration',
    simpleTags: ['EfficientNetB2', 'CatBoost', 'Keras Inference'],
    description: 'Deploying deep learning convolutional backbones and gradient boosted ensembles into production-ready inference endpoints with minimal latency.',
    evidence: 'Infosys Springboard EfficientNetB2 & CatBoost Multi-Model Pipeline',
    keyPractices: ['Torch / Keras Runtime Inference', 'Batch Dimension Vectorization', 'Confusion Matrix Validation'],
  },
  {
    id: 'tech-7',
    num: '07',
    title: 'Data Processing & EDA',
    simpleTags: ['NumPy', 'Pandas', 'Feature Vectorization'],
    description: 'Extracting, vectorizing, cleaning, and transforming tabular datasets and real-time sensory metrics for analytics dashboards and ML feature stores.',
    evidence: 'Samsung Innovation Campus Customer Analytics & Environmental Telemetry',
    keyPractices: ['NumPy Numerical Vectorization', 'Pandas EDA & Feature Scaling', 'Outlier Detection & Imputation'],
  },
  {
    id: 'tech-8',
    num: '08',
    title: 'Full-Stack Application Development',
    simpleTags: ['End-to-End', 'Docker', 'Production Packaging'],
    description: 'Holistic end-to-end product engineering from ideation, database structuring, and API design to production deployment and cross-device testing.',
    evidence: 'HostelHub Resident Suite (1st Prize Award) & Full-Stack MERN Platform',
    keyPractices: ['Full-Lifecycle Product Delivery', 'Docker Container Packaging', 'Zero-Downtime Migration Strategy'],
  },
];

const ENGINEERING_CAPABILITIES: CompetencyItem[] = [
  {
    id: 'cap-1',
    num: '01',
    title: 'System Architecture Fundamentals',
    simpleTags: ['Separation of Concerns', 'Domain Layering'],
    description: 'Decoupling presentation, business logic, and persistence tiers to ensure modularity, maintainability, and horizontal scalability.',
    evidence: '3-Tier Cloud Triage Architecture & Clean Repository Patterns',
    keyPractices: ['Separation of Concerns', 'Domain-Driven Folder Hierarchies', 'Idempotent Service Calls'],
  },
  {
    id: 'cap-2',
    num: '02',
    title: 'Model Development & Benchmarking',
    simpleTags: ['Transfer Learning', 'Validation Metrics'],
    description: 'Translating research problem formulations into reproducible training routines, cross-validation splits, and quantified evaluation benchmarks.',
    evidence: 'Infosys Agricultural AI Benchmark (94.2% Diagnostic Accuracy)',
    keyPractices: ['Transfer Learning Strategies', 'Hyperparameter Exploration', 'ROC-AUC & F1 Metric Audits'],
  },
  {
    id: 'cap-3',
    num: '03',
    title: 'Backend Workflow Design',
    simpleTags: ['Async Workflows', 'Structured Logging'],
    description: 'Engineering synchronous and asynchronous workflow orchestration, rate limiters, request sanitization, and structured audit logs.',
    evidence: 'Secure Financial Ledger & Real-Time SOS Dispatch Handlers',
    keyPractices: ['Structured Logging Pipelines', 'Middleware Interceptors', 'Safe Transaction Rollbacks'],
  },
  {
    id: 'cap-4',
    num: '04',
    title: 'Asynchronous Processing & Queues',
    simpleTags: ['Celery & Redis', 'Event Loop Non-Blocking'],
    description: 'Leveraging event loops, worker threads, and queue brokers to execute heavy computation without blocking user-facing request paths.',
    evidence: 'Celery Distributed Crop Inference & Node.js Non-Blocking IO',
    keyPractices: ['Async/Await Concurrency Patterns', 'Background Job Processing', 'WebSocket Live Channels'],
  },
  {
    id: 'cap-5',
    num: '05',
    title: 'Technical Debugging & Profiling',
    simpleTags: ['Stack Trace Deconstruction', 'Query Profiling'],
    description: 'Systematic root-cause identification using interactive debuggers, memory profiling, network packet inspection, and error telemetry.',
    evidence: 'Hardware-Firmware Synchronization in Microscopy Patent Publication',
    keyPractices: ['Stack Trace Deconstruction', 'Chrome DevTools Performance Auditing', 'Database Query Explain Plans'],
  },
  {
    id: 'cap-6',
    num: '06',
    title: 'Product-Oriented Thinking',
    simpleTags: ['Low-Latency UX', 'Friction Elimination'],
    description: 'Aligning architectural decisions with tangible user outcomes, reducing cognitive friction, and delivering intuitive technical workflows.',
    evidence: 'Emergency SOS 1-Tap Trigger UI & Clean Agro Advisory Dashboards',
    keyPractices: ['User-Centric Error Messages', 'Minimal Action Latency', 'High-Contrast Telemetry Displays'],
  },
  {
    id: 'cap-7',
    num: '07',
    title: 'Software Experimentation & Spikes',
    simpleTags: ['Prototyping', 'Modern Web Standards'],
    description: 'Prototyping cutting-edge tools, exploring modern web standards, and validating novel software architectures through rapid iterative spikes.',
    evidence: 'RAG Retrieval Augmentation Spikes & 3D WebGL Kinetic Rendering',
    keyPractices: ['Hypothesis-Driven Prototyping', 'A/B Architectural Comparison', 'Incremental Modernization'],
  },
  {
    id: 'cap-8',
    num: '08',
    title: 'Cross-Stack Hardware & Cloud',
    simpleTags: ['IoT Firmware', 'Baud Synchronization', 'Patent'],
    description: 'Bridging the physical and digital domains by interfacing embedded IoT firmware, microcontrollers, cloud APIs, and web dashboards.',
    evidence: 'Indian Patent Publication (202641064539 A) & ESP-NOW Protocols',
    keyPractices: ['Hardware-to-Cloud Interfacing', 'Baud-Rate Synchronization', 'Full-Chain Protocol Validation'],
  },
];

export const SkillsCompetencies = () => {
  // Simple view by default: no item is expanded until hovered
  const [activeItem, setActiveItem] = useState<string | null>(null);

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

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-16 border-t border-border-light dark:border-border-dark bg-white dark:bg-[#0E0F14] transition-colors duration-300 overflow-hidden"
    >
      {/* Background architectural ambient glow */}
      <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] bg-cobalt/5 dark:bg-cobalt/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-acid-lime/5 dark:bg-acid-lime/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end pb-4 border-b border-border-light dark:border-border-dark">
          
          <div ref={headingRef} className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-text-dimmed dark:text-text-muted uppercase">
              <span className="w-2 h-2 rounded-full bg-cobalt inline-block animate-pulse" />
              <span>05 // DISCIPLINE &amp; EXECUTION CAPABILITIES</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight text-text-black dark:text-white leading-[0.98] uppercase">
              SKILLS &amp;<br />
              <span className="text-cobalt dark:text-cobalt-light">COMPETENCIES.</span>
            </h2>
          </div>

          <div ref={textRef} className="lg:col-span-5 space-y-4 pb-2">
            <p className="font-serif-italic italic text-2xl sm:text-3xl text-text-black dark:text-white/90 font-normal leading-snug">
              "More than knowing tools.{' '}
              <span className="font-sans font-bold not-italic text-cobalt dark:text-cobalt-light">
                Understanding how to build with them.
              </span>"
            </p>
            
            {/* Simple View / Hover Indicator Badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cobalt/10 dark:bg-cobalt/20 border border-cobalt/30 text-[11px] font-mono text-cobalt dark:text-cobalt-light font-bold">
                <Sparkles size={12} className="text-acid-lime" />
                <span>SIMPLE VIEW // HOVER OVER ANY SKILL TO ELABORATE</span>
              </span>
            </div>
          </div>
        </div>

        {/* Two-Column Editorial Grid: Section A & Section B */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          
          {/* Column 01: TECHNICAL COMPETENCIES */}
          <div ref={artworkRef} className="space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b-2 border-text-black dark:border-white">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded bg-cobalt text-white font-mono text-[10px] font-bold tracking-wider uppercase">
                  SECTION A
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg tracking-tight text-text-black dark:text-white uppercase">
                  TECHNICAL COMPETENCIES
                </h3>
              </div>
              <span className="font-mono text-[11px] text-text-dimmed dark:text-text-muted">
                08 DOMAINS
              </span>
            </div>

            {/* Competency Entries List with Simple View & Hover Elaboration */}
            <div 
              onMouseLeave={() => setActiveItem(null)}
              className="divide-y divide-border-light dark:divide-border-dark/60"
            >
              {TECHNICAL_COMPETENCIES.map((item) => {
                const isHovered = activeItem === item.id;

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setActiveItem(item.id)}
                    onMouseLeave={() => setActiveItem(null)}
                    onClick={() => setActiveItem(isHovered ? null : item.id)}
                    className={`group transition-all duration-300 cursor-pointer rounded-xl ${
                      isHovered
                        ? 'py-4 px-3 sm:px-4 bg-cobalt/5 dark:bg-white/[0.04] border-l-2 border-cobalt shadow-sm my-1'
                        : 'py-3 sm:py-3.5 px-1 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
                    }`}
                  >
                    {/* Header Row: Compact in Simple View, Highlighted on Hover */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                        <span className={`font-mono text-xs tracking-wider transition-colors duration-200 shrink-0 ${
                          isHovered ? 'text-cobalt font-bold' : 'text-text-dimmed dark:text-text-muted group-hover:text-cobalt'
                        }`}>
                          {item.num}
                        </span>

                        <h4 className={`font-display font-medium text-sm sm:text-base transition-colors duration-200 truncate ${
                          isHovered
                            ? 'text-cobalt dark:text-cobalt-light font-bold translate-x-0.5'
                            : 'text-text-black dark:text-white/90 group-hover:text-cobalt dark:group-hover:text-cobalt-light'
                        }`}>
                          {item.title}
                        </h4>

                        {/* Simple Tags: Inline pills visible at a glance */}
                        <div className="hidden sm:flex items-center gap-1.5 ml-auto pr-2">
                          {item.simpleTags.slice(0, 3).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                                isHovered
                                  ? 'bg-cobalt/15 text-cobalt dark:text-cobalt-light border border-cobalt/30 font-semibold'
                                  : 'bg-canvas-light dark:bg-white/5 text-text-dimmed dark:text-gray-400 border border-border-light dark:border-white/10'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Micro-Indicator */}
                      <div className="flex items-center gap-1.5 shrink-0 pl-1">
                        <span className={`text-[10px] font-mono uppercase tracking-wider transition-opacity duration-200 hidden md:inline-block ${
                          isHovered ? 'text-cobalt font-semibold opacity-100' : 'text-text-dimmed opacity-40 group-hover:opacity-100'
                        }`}>
                          {isHovered ? 'Elaborated' : 'Hover'}
                        </span>
                        <div
                          className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                            isHovered
                              ? 'border-cobalt bg-cobalt text-white rotate-45 scale-110 shadow-sm'
                              : 'border-border-light dark:border-white/10 text-text-dimmed/50 group-hover:border-cobalt group-hover:text-cobalt'
                          }`}
                        >
                          <ArrowUpRight size={12} />
                        </div>
                      </div>
                    </div>

                    {/* Smooth Elaborated Content Reveal (Activated on Hover) */}
                    <div
                      className={`grid transition-all duration-300 ease-out overflow-hidden ${
                        isHovered ? 'grid-rows-[1fr] opacity-100 pt-3' : 'grid-rows-[0fr] opacity-0 pt-0'
                      }`}
                    >
                      <div className="overflow-hidden space-y-2.5 pl-6 sm:pl-7">
                        <p className="font-sans text-xs sm:text-sm text-text-dimmed dark:text-text-muted leading-relaxed font-light">
                          {item.description}
                        </p>
                        
                        {/* Authentic Project Evidence */}
                        <div className="flex flex-wrap items-center gap-2 pt-0.5">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cobalt/10 dark:bg-cobalt/20 border border-cobalt/30 text-[11px] font-mono text-cobalt dark:text-cobalt-light font-medium">
                            <CheckCircle2 size={12} className="text-cobalt shrink-0" />
                            <span className="text-text-dimmed dark:text-white/60">Evidence:</span> {item.evidence}
                          </span>
                        </div>

                        {/* Key Practices Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {item.keyPractices.map((practice, pIdx) => (
                            <span
                              key={pIdx}
                              className="px-2 py-0.5 text-[10px] font-mono bg-canvas-light dark:bg-white/5 border border-border-light dark:border-border-dark text-text-muted dark:text-gray-300 rounded"
                            >
                              {practice}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 02: ENGINEERING CAPABILITIES */}
          <div ref={telemetryRef} className="space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b-2 border-text-black dark:border-white">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded bg-acid-lime text-text-black font-mono text-[10px] font-bold tracking-wider uppercase">
                  SECTION B
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg tracking-tight text-text-black dark:text-white uppercase">
                  ENGINEERING CAPABILITIES
                </h3>
              </div>
              <span className="font-mono text-[11px] text-text-dimmed dark:text-text-muted">
                08 PRACTICES
              </span>
            </div>

            {/* Capabilities Entries List with Simple View & Hover Elaboration */}
            <div 
              onMouseLeave={() => setActiveItem(null)}
              className="divide-y divide-border-light dark:divide-border-dark/60"
            >
              {ENGINEERING_CAPABILITIES.map((item) => {
                const isHovered = activeItem === item.id;

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setActiveItem(item.id)}
                    onMouseLeave={() => setActiveItem(null)}
                    onClick={() => setActiveItem(isHovered ? null : item.id)}
                    className={`group transition-all duration-300 cursor-pointer rounded-xl ${
                      isHovered
                        ? 'py-4 px-3 sm:px-4 bg-acid-lime/5 dark:bg-white/[0.04] border-l-2 border-acid-lime shadow-sm my-1'
                        : 'py-3 sm:py-3.5 px-1 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
                    }`}
                  >
                    {/* Header Row: Compact in Simple View, Highlighted on Hover */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                        <span className={`font-mono text-xs tracking-wider transition-colors duration-200 shrink-0 ${
                          isHovered ? 'text-acid-lime font-bold' : 'text-text-dimmed dark:text-text-muted group-hover:text-cobalt'
                        }`}>
                          {item.num}
                        </span>

                        <h4 className={`font-display font-medium text-sm sm:text-base transition-colors duration-200 truncate ${
                          isHovered
                            ? 'text-text-black dark:text-white font-bold translate-x-0.5'
                            : 'text-text-black dark:text-white/90 group-hover:text-cobalt dark:group-hover:text-cobalt-light'
                        }`}>
                          {item.title}
                        </h4>

                        {/* Simple Tags: Inline preview tags */}
                        <div className="hidden sm:flex items-center gap-1.5 ml-auto pr-2">
                          {item.simpleTags.slice(0, 2).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                                isHovered
                                  ? 'bg-acid-lime/20 text-text-black dark:text-acid-lime border border-acid-lime/30 font-semibold'
                                  : 'bg-canvas-light dark:bg-white/5 text-text-dimmed dark:text-gray-400 border border-border-light dark:border-white/10'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Micro-Indicator */}
                      <div className="flex items-center gap-1.5 shrink-0 pl-1">
                        <span className={`text-[10px] font-mono uppercase tracking-wider transition-opacity duration-200 hidden md:inline-block ${
                          isHovered ? 'text-acid-lime font-semibold opacity-100' : 'text-text-dimmed opacity-40 group-hover:opacity-100'
                        }`}>
                          {isHovered ? 'Elaborated' : 'Hover'}
                        </span>
                        <div
                          className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                            isHovered
                              ? 'border-acid-lime bg-acid-lime text-text-black rotate-45 scale-110 shadow-sm'
                              : 'border-border-light dark:border-white/10 text-text-dimmed/50 group-hover:border-cobalt group-hover:text-cobalt'
                          }`}
                        >
                          <ArrowUpRight size={12} />
                        </div>
                      </div>
                    </div>

                    {/* Smooth Elaborated Content Reveal (Activated on Hover) */}
                    <div
                      className={`grid transition-all duration-300 ease-out overflow-hidden ${
                        isHovered ? 'grid-rows-[1fr] opacity-100 pt-3' : 'grid-rows-[0fr] opacity-0 pt-0'
                      }`}
                    >
                      <div className="overflow-hidden space-y-2.5 pl-6 sm:pl-7">
                        <p className="font-sans text-xs sm:text-sm text-text-dimmed dark:text-text-muted leading-relaxed font-light">
                          {item.description}
                        </p>
                        
                        {/* Authentic Project Evidence */}
                        <div className="flex flex-wrap items-center gap-2 pt-0.5">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-acid-lime/10 dark:bg-acid-lime/15 border border-acid-lime/30 text-[11px] font-mono text-text-black dark:text-acid-lime font-medium">
                            <ShieldCheck size={12} className="text-acid-lime shrink-0" />
                            <span className="text-text-dimmed dark:text-white/60">Evidence:</span> {item.evidence}
                          </span>
                        </div>

                        {/* Key Practices Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {item.keyPractices.map((practice, pIdx) => (
                            <span
                              key={pIdx}
                              className="px-2 py-0.5 text-[10px] font-mono bg-canvas-light dark:bg-white/5 border border-border-light dark:border-border-dark text-text-muted dark:text-gray-300 rounded"
                            >
                              {practice}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Editorial Footnote Bar */}
        <div className="pt-6 border-t border-border-light dark:border-border-dark flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-text-dimmed dark:text-text-muted">
          <div className="flex items-center gap-3">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cobalt" />
            <span>Capability validated through functional code, production repositories &amp; Indian Patent Publication.</span>
          </div>
          <div className="flex items-center gap-4">
            <span>KPR Institute • IT Dept</span>
            <span>•</span>
            <span className="text-cobalt dark:text-cobalt-light font-bold">CGPA 8.42</span>
          </div>
        </div>

      </div>
    </section>
  );
};
