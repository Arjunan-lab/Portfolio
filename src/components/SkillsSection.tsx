import { useState, useRef } from 'react';
import { Terminal, Layout, Server, Cpu, Database, Wrench, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';
import { useCornerConvergence } from '../motion/scrollMotion';

interface SkillDomain {
  num: string;
  title: string;
  category: string;
  icon: typeof Terminal;
  technologies: string[];
  summary: string;
  projectProof: string;
}

const SKILL_DOMAINS: SkillDomain[] = [
  {
    num: '01',
    title: 'Programming Languages',
    category: 'Core Systems & Algorithms',
    icon: Terminal,
    technologies: ['Python', 'Java', 'C', 'JavaScript', 'SQL'],
    summary: 'Algorithmic efficiency, OOP design patterns, and memory-conscious data structures across diverse runtimes.',
    projectProof: 'SecureBank Core Java Engine & Microscopy Firmware',
  },
  {
    num: '02',
    title: 'Frontend Engineering',
    category: 'Interfaces & Responsive Motion',
    icon: Layout,
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
    summary: 'Modern component-driven web architectures, responsive design systems, and hardware-accelerated animations.',
    projectProof: 'ApexStore MERN Platform & BloodConnect Live UI',
  },
  {
    num: '03',
    title: 'Backend & Microservices',
    category: 'High-Throughput Services',
    icon: Server,
    technologies: ['FastAPI', 'Node.js', 'Express', 'REST APIs', 'Celery'],
    summary: 'Asynchronous event loops, RESTful microservices, Server-Sent Events (SSE) streaming, and worker task queues.',
    projectProof: 'RoadSoS Emergency Cloud Triage & SmartAttend APIs',
  },
  {
    num: '04',
    title: 'Artificial Intelligence & ML',
    category: 'Deep Vision & Vector RAG',
    icon: Cpu,
    technologies: ['TensorFlow', 'EfficientNetB2', 'CatBoost', 'Scikit-learn', 'RAG'],
    summary: 'Convolutional vision backbones, gradient boosted decision trees for multi-target classification, and RAG pipelines.',
    projectProof: 'AgriSense Soil Health (Infosys) & Amazon RAG (Samsung AI)',
  },
  {
    num: '05',
    title: 'Database & Persistence',
    category: 'ACID Concurrency & Modeling',
    icon: Database,
    technologies: ['MySQL', 'MongoDB', 'SQLAlchemy', 'Prisma ORM'],
    summary: 'ACID transaction locks, foreign key normalization, high-throughput document stores, and declarative ORMs.',
    projectProof: 'SecureBank Row-Level Locks & BloodConnect Prisma',
  },
  {
    num: '06',
    title: 'Tools, DevOps & Hardware',
    category: 'Containerization & Firmware',
    icon: Wrench,
    technologies: ['Git', 'GitHub', 'Docker', 'Postman', 'Embedded C'],
    summary: 'Branch-based Git workflows, reproducible Docker containers, contract-first API testing suites, and IoT microcontroller firmware.',
    projectProof: 'Indian Patent Publication (202641064539 A) & Docker Pipelines',
  },
];

export const SkillsSection = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

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
      id="skills"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-16 border-t border-border-light dark:border-border-dark bg-canvas-light dark:bg-[#0C0D11] text-text-black dark:text-white transition-colors duration-300 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[550px] h-[550px] bg-cobalt/5 dark:bg-cobalt/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-6 border-b border-border-light dark:border-border-dark">
          <div ref={headingRef} className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-text-dimmed dark:text-text-muted uppercase">
              <span className="w-2 h-2 rounded-full bg-cobalt inline-block animate-pulse" />
              <span>04 // TECHNICAL EXPERTISE &amp; STACK</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-[68px] tracking-tight leading-[1.02] uppercase">
              Skills &amp;{' '}
              <span className="text-cobalt dark:text-cobalt-light block sm:inline">
                Capabilities.
              </span>
            </h2>

            <p ref={textRef} className="font-sans text-base sm:text-lg text-text-dimmed dark:text-text-muted font-light leading-relaxed">
              "From intelligent systems to scalable applications, I enjoy engineering across different layers of technology."
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-cobalt/10 border border-cobalt/20 text-xs font-mono text-cobalt dark:text-cobalt-light font-bold flex items-center gap-1.5">
              <Sparkles size={12} className="text-acid-lime" />
              <span>06 CORE DOMAINS</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white dark:bg-white/5 border border-border-light dark:border-border-dark text-xs font-mono text-text-dimmed dark:text-text-muted">
              HOVER TO ELABORATE
            </span>
          </div>
        </div>

        {/* Brand New Simple Bento Grid (6 Domain Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SKILL_DOMAINS.map((domain, idx) => {
            const Icon = domain.icon;
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={domain.num}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`group flex flex-col justify-between p-7 sm:p-8 rounded-3xl bg-white dark:bg-[#14161E] border transition-all duration-300 shadow-subtle-card cursor-pointer relative overflow-hidden ${
                  isHovered
                    ? 'border-cobalt dark:border-cobalt shadow-cobalt-glow/20 -translate-y-1.5'
                    : 'border-border-light dark:border-border-dark hover:border-cobalt/60'
                }`}
              >
                {/* Subtle top-right accent glow on hover */}
                <div
                  className={`absolute -top-16 -right-16 w-32 h-32 rounded-full bg-cobalt/15 blur-2xl transition-opacity duration-300 pointer-events-none ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                <div className="space-y-6 relative z-10">
                  {/* Card Header: Number, Icon, and Arrow */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
                          isHovered
                            ? 'bg-cobalt text-white shadow-sm'
                            : 'bg-cobalt/10 text-cobalt dark:text-cobalt-light'
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      <span className="font-mono text-xs font-bold text-cobalt dark:text-cobalt-light">
                        {domain.num} // {domain.category}
                      </span>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isHovered
                          ? 'border-cobalt bg-cobalt text-white rotate-45 scale-110 shadow-sm'
                          : 'border-border-light dark:border-white/10 text-text-dimmed/40 group-hover:border-cobalt group-hover:text-cobalt'
                      }`}
                    >
                      <ArrowUpRight size={13} />
                    </div>
                  </div>

                  {/* Domain Title */}
                  <div>
                    <h3
                      className={`font-display font-bold text-xl sm:text-2xl tracking-tight transition-colors duration-200 ${
                        isHovered
                          ? 'text-cobalt dark:text-cobalt-light'
                          : 'text-text-black dark:text-white'
                      }`}
                    >
                      {domain.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-text-dimmed dark:text-gray-300 font-light leading-relaxed mt-2">
                      {domain.summary}
                    </p>
                  </div>

                  {/* Technologies Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {domain.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all duration-200 ${
                          isHovered
                            ? 'bg-cobalt/15 text-cobalt dark:text-cobalt-light border border-cobalt/35 font-medium'
                            : 'bg-canvas-light dark:bg-white/5 border border-border-light dark:border-white/10 text-text-dimmed dark:text-gray-300'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer: Verified Project Proof */}
                <div className="pt-6 mt-6 border-t border-border-light dark:border-border-dark/60 flex items-center justify-between text-xs font-mono relative z-10">
                  <div className="flex items-center gap-1.5 text-text-dimmed dark:text-gray-400">
                    <CheckCircle2
                      size={13}
                      className={isHovered ? 'text-acid-lime' : 'text-cobalt dark:text-cobalt-light'}
                    />
                    <span className="truncate max-w-[200px] sm:max-w-[220px]">
                      {domain.projectProof}
                    </span>
                  </div>
                  <span
                    className={`font-bold transition-colors ${
                      isHovered ? 'text-acid-lime' : 'text-text-dimmed dark:text-text-muted'
                    }`}
                  >
                    VERIFIED
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Editorial Bottom Bar */}
        <div className="pt-8 border-t border-border-light dark:border-border-dark flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-text-dimmed dark:text-text-muted">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-acid-lime animate-pulse" />
            <span>All skills validated through working codebases, production deployments &amp; published patent research.</span>
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
