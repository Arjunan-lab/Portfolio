import { useState, useRef } from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Code2, 
  Star, 
  Award, 
  Briefcase, 
  ChevronDown,
  Sparkles,
  Layers
} from 'lucide-react';
import { useCornerConvergence } from '../motion/scrollMotion';

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
    appliedIn: 'Samsung Innovation Campus AI & Automated Microscopy System (Patent)'
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
    appliedIn: 'Multi-container deployment pipelines across all 8 GitHub repositories'
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
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [expandedSkill, setExpandedSkill] = useState<string | null>('python-ml');

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
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-text-muted">
            <Sparkles size={13} className="text-acid-lime" />
            <span>HOVER ANY SKILL BAR TO ELABORATE DETAILS</span>
          </div>
        </div>

        {/* =============================================================== */}
        {/* TWO-COLUMN REFERENCE UI LAYOUT                                  */}
        {/* =============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ============================================================= */}
          {/* LEFT COLUMN: Narrative & Academic / Industry Badges           */}
          {/* ============================================================= */}
          <div className="lg:col-span-5 space-y-8">
            
            <div ref={headingRef} className="space-y-4">
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

            <div ref={textRef} className="space-y-4 font-sans text-sm sm:text-base text-gray-300 leading-relaxed font-light">
              <p>
                I'm <span className="font-semibold text-white">ARJUNAN</span>, a passionate{' '}
                <span className="font-semibold text-cobalt-light">B.Tech Information Technology</span> student at{' '}
                <span className="text-white">KPR Institute of Engineering and Technology, Coimbatore</span>, with a strong CGPA of{' '}
                <span className="font-mono font-bold text-acid-lime">8.42</span>.
              </p>

              <p>
                I thrive at the intersection of <span className="text-white font-medium">AI/ML</span>,{' '}
                <span className="text-white font-medium">full-stack development</span>, and resilient systems design. 
                I've completed a Python Developer internship at{' '}
                <span className="text-cobalt-light font-medium">Infosys Springboard</span>, earned the{' '}
                <span className="text-acid-lime font-medium">Samsung Innovation Campus</span> credential in{' '}
                <span className="text-white font-semibold">Artificial Intelligence</span>, and published an Indian Patent in automated smart systems.
              </p>

              <p className="text-xs sm:text-sm text-gray-400">
                When I'm not training models or architecting backend services, I build low-latency APIs, explore modern cloud pipelines, and craft high-performance interactive interfaces.
              </p>
            </div>

            {/* Badges Matrix (Harmonized Portfolio Palette) */}
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
                <span>Published Patent (IPO)</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cobalt/10 border border-cobalt/25 text-xs font-sans text-cobalt-light">
                <Award size={13} />
                <span>Hostel Hackathon Winner</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-acid-lime/10 border border-acid-lime/30 text-xs font-sans text-acid-lime font-semibold">
                <Award size={13} />
                <span>Samsung Innovation Campus (AI)</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-sans text-gray-300">
                <Briefcase size={13} className="text-cobalt-light" />
                <span>Open to Software Roles &amp; Internships</span>
              </div>
            </div>

          </div>

          {/* ============================================================= */}
          {/* RIGHT COLUMN: Skill Progress Bars (Cobalt to Acid-Lime)       */}
          {/* ============================================================= */}
          <div className="lg:col-span-7 space-y-6 bg-[#14161E] p-6 sm:p-10 rounded-3xl border border-border-dark shadow-subtle-card">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                DOMAIN COMPETENCIES &amp; BENCHMARKS
              </span>
              <span className="font-mono text-xs text-cobalt-light font-bold">
                08 TRACKED DOMAINS
              </span>
            </div>

            {/* List of Skill Bars */}
            <div className="space-y-4">
              {SKILLS_DATA.map((skill) => {
                const isHovered = hoveredSkill === skill.id;
                const isExpanded = isHovered || expandedSkill === skill.id;

                return (
                  <div
                    key={skill.id}
                    onMouseEnter={() => {
                      setHoveredSkill(skill.id);
                      setExpandedSkill(skill.id);
                    }}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`p-3.5 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                      isExpanded
                        ? 'bg-white/5 border border-cobalt/40 shadow-lg shadow-cobalt/5'
                        : 'bg-white/[0.02] border border-white/5 hover:border-white/15'
                    }`}
                  >
                    {/* Header: Name and Percentage */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-sm sm:text-base font-medium text-white group-hover:text-cobalt-light transition-colors">
                          {skill.name}
                        </span>
                        {skill.highlight && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-cobalt/20 text-cobalt-light border border-cobalt/30 font-semibold">
                            Core
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs sm:text-sm text-acid-lime">
                          {skill.percentage}%
                        </span>
                        <ChevronDown
                          size={14}
                          className={`text-gray-400 transition-transform duration-300 ${
                            isExpanded ? 'rotate-180 text-cobalt-light' : ''
                          }`}
                        />
                      </div>
                    </div>

                    {/* Signature Progress Bar Track (Cobalt to Acid-Lime) */}
                    <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cobalt via-cobalt-light to-acid-lime transition-all duration-700 ease-out relative"
                        style={{ width: `${skill.percentage}%` }}
                      >
                        {/* Glowing Dot Indicator on hover / active */}
                        {isExpanded && (
                          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-acid-lime border-2 border-white shadow-[0_0_12px_#7CE028] -mr-1 animate-pulse" />
                        )}
                      </div>
                    </div>

                    {/* Expanded Detail Panel (Revealed on Hover) */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-white/10 space-y-2 animate-fadeIn text-xs">
                        <p className="text-gray-300 font-sans leading-relaxed">
                          {skill.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mr-1">
                            Stack:
                          </span>
                          {skill.frameworks.map((fw) => (
                            <span
                              key={fw}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-cobalt/10 text-cobalt-light border border-cobalt/20 font-medium"
                            >
                              {fw}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-1.5 pt-1 text-[11px] font-mono text-text-muted">
                          <Layers size={11} className="text-acid-lime" />
                          <span>Applied in: <strong className="text-gray-200">{skill.appliedIn}</strong></span>
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

            {/* Quick Tech Tags Pill Cluster (Unified Theme) */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <span className="font-mono text-[11px] text-gray-400 uppercase tracking-wider block">
                PRIMARY TOOLSET &amp; RUNTIMES:
              </span>

              <div className="flex flex-wrap gap-2">
                {QUICK_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-white/5 hover:bg-cobalt/10 border border-border-dark hover:border-cobalt text-xs font-mono text-gray-300 hover:text-white transition-all cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
