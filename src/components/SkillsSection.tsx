import React, { useState, useRef, useEffect } from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Code2, 
  Star, 
  Award, 
  Briefcase, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { checkReducedMotion } from '../motion/tokens';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SkillItem {
  id: string;
  name: string;
  percentage: number;
  highlight?: boolean;
  category: string;
  frameworks: string[];
  description: string;
  appliedIn: string;
}

const SKILLS_DATA: SkillItem[] = [
  {
    id: 'python-ml',
    name: 'Python & Machine Learning',
    percentage: 92,
    highlight: true,
    category: 'Applied AI & Modeling',
    frameworks: ['TensorFlow', 'Scikit-learn', 'CatBoost', 'NumPy', 'Pandas'],
    description: 'Predictive modeling, regression ensembles, and automated crop recommendation pipelines.',
    appliedIn: 'AgriSense AI Soil Health (Infosys Springboard) & ML Benchmarking'
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms (DSA)',
    percentage: 88,
    category: 'Core Computer Science',
    frameworks: ['Trees & Graphs', 'Dynamic Programming', 'Sliding Window', 'HashMaps', 'Time/Space Optimization'],
    description: 'Algorithmic efficiency, Big-O complexity minimization, and clean OOP problem-solving.',
    appliedIn: 'SecureBank Core Engine & Competitive Code Sandboxes'
  },
  {
    id: 'react-fullstack',
    name: 'React.js & Full-Stack Web (MERN / Vite)',
    percentage: 90,
    highlight: true,
    category: 'Interactive Web Interfaces',
    frameworks: ['React 18', 'TypeScript', 'Tailwind CSS', 'Redux / Zustand', 'Vite'],
    description: 'Component architecture, reactive client state, Lenis smooth motion, and responsive UX.',
    appliedIn: 'ApexStore E-Commerce, BloodConnect Live & Portfolio'
  },
  {
    id: 'java-oop',
    name: 'Java & Object-Oriented Programming (OOP)',
    percentage: 85,
    category: 'Enterprise Backend',
    frameworks: ['Core Java 17+', 'Multithreading', 'JDBC', 'Design Patterns (Factory, Singleton)', 'Maven'],
    description: 'Thread-safe concurrency, memory management, strict type isolation, and ACID persistence.',
    appliedIn: 'SecureBank Java Banking System'
  },
  {
    id: 'fastapi-rest',
    name: 'FastAPI, Flask & REST APIs',
    percentage: 88,
    category: 'High-Throughput Services',
    frameworks: ['FastAPI', 'Pydantic v2', 'Uvicorn', 'SSE Streaming', 'JWT Auth'],
    description: 'Asynchronous non-blocking endpoints, strict JSON validation schemas, and real-time streams.',
    appliedIn: 'RoadSoS Cloud Triage & SmartAttend Campus Backend'
  },
  {
    id: 'dl-cv',
    name: 'Deep Learning & Computer Vision (YOLOv8 / CNNs)',
    percentage: 86,
    highlight: true,
    category: 'Computer Vision & Deep Nets',
    frameworks: ['EfficientNetB2', 'YOLOv8', 'OpenCV', 'PyTorch Inference', 'Transfer Learning'],
    description: 'Convolutional feature extraction, real-time object tracking, and vector embeddings.',
    appliedIn: 'Infosys Springboard AI & Production Vision Pipelines'
  },
  {
    id: 'cloud-db',
    name: 'Cloud & Databases (MySQL, MongoDB, PostgreSQL)',
    percentage: 82,
    category: 'Data Persistence',
    frameworks: ['MySQL 8.0', 'MongoDB Atlas', 'PostgreSQL', 'SQLAlchemy', 'Redis Caching'],
    description: 'Relational schema normalization, compound indexing, query profiling, and ACID transactions.',
    appliedIn: 'BloodConnect Geo-Spatial Queries & ApexStore Catalog'
  },
  {
    id: 'devops-tools',
    name: 'Docker, Git & Modern DevOps',
    percentage: 80,
    category: 'Infrastructure & Tooling',
    frameworks: ['Docker', 'Git / GitHub', 'Postman', 'Linux / Bash', 'Vercel CI/CD'],
    description: 'Reproducible container images, branch-based CI/CD pipelines, and microservice orchestration.',
    appliedIn: 'Multi-container deployment pipelines across all 9 GitHub repositories'
  }
];

const QUICK_TAGS = [
  'Python',
  'Java',
  'C / C++',
  'React.js',
  'FastAPI',
  'Node.js',
  'TypeScript',
  'DSA & OOP',
  'Computer Vision (YOLOv8)',
  'Docker',
  'MySQL & MongoDB',
  'Git & GitHub',
  'Tailwind CSS'
];

export const SkillsSection = () => {
  const [expandedSkill, setExpandedSkill] = useState<string | null>('python-ml');
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Stagger entrance of skill items
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || checkReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skill-row-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.quick-tag-chip',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.04,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.quick-tags-container',
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Spotlight radial gradient on pointer move
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mx', `${x}px`);
    cardRef.current.style.setProperty('--my', `${y}px`);

    // 3D tilt up to 4 degrees
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -3;
    const tiltY = ((x - centerX) / centerX) * 3;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };

  const handlePointerLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-16 border-t border-border-dark bg-[#0C0D11] text-white transition-colors duration-300 overflow-hidden"
    >
      {/* Background ambient lighting aligned with portfolio signature palette */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cobalt/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-acid-lime/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section kicker */}
        <div className="flex items-center justify-between pb-4 border-b border-border-dark">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cobalt-light uppercase">
            <span className="w-2 h-2 rounded-full bg-cobalt inline-block animate-pulse" />
            <span>03 // TECHNICAL EXPERTISE &amp; PROFICIENCY</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-text-muted">
            <Sparkles size={13} className="text-acid-lime" />
            <span>CLICK ANY SKILL ROW TO EXPAND IMPLEMENTATION DETAILS</span>
          </div>
        </div>

        {/* TWO-COLUMN REFERENCE UI LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Narrative & Academic / Industry Badges */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="space-y-4">
              <span className="text-xs font-mono tracking-widest uppercase text-cobalt-light font-semibold block">
                — ABOUT MY CRAFT
              </span>

              <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-[56px] tracking-tight text-white leading-[1.06]">
                Crafting Code &amp;{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cobalt-light via-white to-acid-lime">
                  Intelligent Systems
                </span>
              </h2>
            </div>

            <div className="space-y-4 font-sans text-sm sm:text-base text-gray-300 leading-relaxed font-light">
              <p>
                I'm <span className="font-semibold text-white">ARJUNAN</span>, a passionate{' '}
                <span className="font-semibold text-cobalt-light">B.Tech Information Technology</span> student at{' '}
                <span className="text-white">KPR Institute of Engineering and Technology, Coimbatore</span>, with a strong CGPA of{' '}
                <span className="font-mono font-bold text-acid-lime">8.42</span>.
              </p>

              <p>
                I thrive at the intersection of <span className="text-white font-medium">AI/ML</span>,{' '}
                <span className="text-white font-medium">full-stack development</span>, and resilient systems design. 
                I've completed an AI & ML internship at{' '}
                <span className="text-cobalt-light font-medium">Infosys Springboard</span>, participated in the{' '}
                <span className="text-acid-lime font-medium">H² Hostel Hackathon</span> with a recognized room booking system, and engineered 8 verified production-grade applications.
              </p>

              <p className="text-xs sm:text-sm text-gray-400">
                When I'm not training models or architecting backend services, I build low-latency APIs, explore modern cloud pipelines, and craft high-performance interactive interfaces.
              </p>
            </div>

            {/* Badges Matrix */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-sans text-gray-200">
                <GraduationCap size={13} className="text-cobalt-light" />
                <span>KPR Institute, Coimbatore</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-sans text-gray-200">
                <MapPin size={13} className="text-cobalt-light" />
                <span>Coimbatore, TN</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cobalt/10 border border-cobalt/25 text-xs font-mono text-cobalt-light">
                <Code2 size={13} />
                <span>&lt;/&gt; Full-Stack + ML</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-acid-lime/10 border border-acid-lime/30 text-xs font-mono text-acid-lime font-bold">
                <Star size={13} />
                <span>CGPA 8.42</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-sans text-white">
                <Award size={13} className="text-cobalt-light" />
                <span>Infosys Springboard AI (7.0)</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cobalt/10 border border-cobalt/25 text-xs font-sans text-cobalt-light">
                <Award size={13} />
                <span>Hostel Hackathon Participant</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-acid-lime/10 border border-acid-lime/30 text-xs font-sans text-acid-lime font-semibold">
                <Award size={13} />
                <span>STEM Innovators Expo</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-sans text-gray-300">
                <Briefcase size={13} className="text-cobalt-light" />
                <span>Open to Software Roles &amp; Internships</span>
              </div>
            </div>

            {/* Quick Skills Pills */}
            <div className="space-y-3 pt-4 border-t border-border-dark">
              <span className="font-mono text-xs uppercase tracking-wider text-text-muted block">
                CORE TECHNICAL VOCABULARY
              </span>
              <div className="quick-tags-container flex flex-wrap gap-2">
                {QUICK_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="quick-tag-chip px-3 py-1 rounded-lg bg-[#14161E] border border-border-dark text-xs font-mono text-gray-300 hover:border-cobalt hover:text-white transition-all cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Skill Matrix Card with Spotlight Radial Gradient */}
          <div
            ref={cardRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className="lg:col-span-7 relative group space-y-5 bg-[#14161E] p-6 sm:p-10 rounded-3xl border border-border-dark shadow-subtle-card transition-transform duration-200 ease-out will-change-transform"
          >
            {/* Spotlight Radial Gradient Overlay */}
            <div
              className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: 'radial-gradient(550px circle at var(--mx, 50%) var(--my, 50%), rgba(43, 89, 255, 0.12), transparent 45%)',
              }}
            />

            <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-10">
              <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                DOMAIN COMPETENCIES &amp; BENCHMARKS
              </span>
              <span className="font-mono text-xs text-cobalt-light font-bold">
                08 TRACKED DOMAINS
              </span>
            </div>

            <div className="space-y-4 relative z-10">
              {SKILLS_DATA.map((skill) => {
                const isExpanded = expandedSkill === skill.id;

                return (
                  <div
                    key={skill.id}
                    className="skill-row-item rounded-2xl bg-[#0C0D11]/60 border border-white/5 hover:border-cobalt/40 p-4 transition-all duration-200 cursor-pointer"
                    onClick={() => setExpandedSkill(isExpanded ? null : skill.id)}
                  >
                    <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-white mb-2">
                      <span className="flex items-center gap-2">
                        <span>{skill.name}</span>
                        {skill.highlight && (
                          <span className="w-1.5 h-1.5 rounded-full bg-acid-lime animate-pulse inline-block" />
                        )}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-cobalt-light">{skill.percentage}%</span>
                        <ChevronDown
                          size={14}
                          className={`text-text-muted transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-white' : ''
                          }`}
                        />
                      </div>
                    </div>

                    {/* Gradient Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cobalt via-cobalt-light to-acid-lime transition-all duration-700 ease-out"
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>

                    {/* Expandable Details Drawer */}
                    {isExpanded && (
                      <div className="pt-3 mt-3 border-t border-white/5 space-y-2 text-xs font-sans text-gray-300">
                        <p className="font-light leading-relaxed">{skill.description}</p>
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="font-mono text-text-muted text-[11px] uppercase mr-1">Stack:</span>
                          {skill.frameworks.map((f, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 font-mono text-[11px] text-cobalt-light">
                              {f}
                            </span>
                          ))}
                        </div>
                        <div className="pt-1 text-[11px] font-mono text-acid-lime truncate">
                          Applied: {skill.appliedIn}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
