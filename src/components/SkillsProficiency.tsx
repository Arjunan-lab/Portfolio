import { Terminal, Brain, Server, Layout, Database, Sparkles, CheckCircle2 } from 'lucide-react';

interface TechStackItem {
  name: string;
  level: 'Production' | 'Proficient' | 'Working Knowledge';
  highlight: string;
}

const DOMAINS = [
  {
    id: 'programming',
    title: 'Core Programming & Algorithms',
    subtitle: 'Type-Safe & Algorithmic Foundations',
    icon: Terminal,
    color: 'from-cobalt/20 to-cobalt/5',
    borderColor: 'group-hover:border-cobalt',
    items: [
      { name: 'Python', level: 'Production', highlight: 'Data Pipelines, ML & Async Backends' },
      { name: 'Java', level: 'Proficient', highlight: 'Object-Oriented Design & DSA' },
      { name: 'C / C++', level: 'Proficient', highlight: 'Embedded Firmware & Memory Management' },
      { name: 'JavaScript / ES6+', level: 'Production', highlight: 'Async Execution & Web APIs' },
      { name: 'SQL', level: 'Production', highlight: 'Relational Queries & Indexing' }
    ] as TechStackItem[]
  },
  {
    id: 'aiml',
    title: 'Applied Machine Learning & AI',
    subtitle: 'Gradient Boosting & Deep Vision',
    icon: Brain,
    color: 'from-acid-lime/20 to-acid-lime/5',
    borderColor: 'group-hover:border-acid-lime',
    items: [
      { name: 'CatBoost', level: 'Production', highlight: 'Gradient Boosted Decision Trees' },
      { name: 'EfficientNetB2', level: 'Production', highlight: 'Convolutional Soil Classification' },
      { name: 'Scikit-learn', level: 'Production', highlight: 'Regression, Classification & Metrics' },
      { name: 'TensorFlow / Keras', level: 'Proficient', highlight: 'Deep Neural Architectures' },
      { name: 'NumPy & Pandas', level: 'Production', highlight: 'EDA & Feature Vectorization' }
    ] as TechStackItem[]
  },
  {
    id: 'backend',
    title: 'Backend & Microservices',
    subtitle: 'Async Throughput & Queues',
    icon: Server,
    color: 'from-cobalt/20 to-cobalt/5',
    borderColor: 'group-hover:border-cobalt',
    items: [
      { name: 'FastAPI', level: 'Production', highlight: 'Async Python REST APIs' },
      { name: 'Node.js', level: 'Proficient', highlight: 'Event-Driven Services' },
      { name: 'Celery & Redis', level: 'Production', highlight: 'Decoupled Worker Task Queues' },
      { name: 'RESTful Protocols', level: 'Production', highlight: 'Contract-First API Design' }
    ] as TechStackItem[]
  },
  {
    id: 'frontend',
    title: 'Frontend & UI Architecture',
    subtitle: 'Component-Driven Systems',
    icon: Layout,
    color: 'from-coral-accent/20 to-coral-accent/5',
    borderColor: 'group-hover:border-coral-accent',
    items: [
      { name: 'React.js', level: 'Production', highlight: 'Hooks, Router & State Management' },
      { name: 'Tailwind CSS', level: 'Production', highlight: 'Utility-First Design Systems' },
      { name: 'HTML5 / Modern CSS', level: 'Production', highlight: 'Semantic & Accessible Layouts' },
      { name: 'Three.js / WebGL', level: 'Working Knowledge', highlight: 'Kinetic 3D Visual Sculptures' }
    ] as TechStackItem[]
  },
  {
    id: 'database',
    title: 'Databases & DevOps Tools',
    subtitle: 'Persistence & Containerization',
    icon: Database,
    color: 'from-acid-lime/20 to-acid-lime/5',
    borderColor: 'group-hover:border-acid-lime',
    items: [
      { name: 'MySQL / SQLAlchemy', level: 'Production', highlight: 'ACID Schemas & Relationships' },
      { name: 'MongoDB', level: 'Proficient', highlight: 'Flexible Document Stores' },
      { name: 'Git & GitHub', level: 'Production', highlight: 'Version Control & Workflows' },
      { name: 'Docker', level: 'Proficient', highlight: 'Containerized Deployment' }
    ] as TechStackItem[]
  }
];

export const SkillsProficiency = () => {
  return (
    <section id="skills" className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-16 border-t border-border-light dark:border-border-dark bg-white dark:bg-[#0C0D11] transition-colors duration-300 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-cobalt/5 dark:bg-cobalt/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-text-dimmed dark:text-text-muted uppercase">
              <span>05 // TECHNICAL PROFICIENCY</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-[68px] tracking-tight text-text-black dark:text-white leading-[1.04]">
              Skills &amp;{' '}
              <span className="font-serif-italic font-normal italic text-cobalt dark:text-cobalt-light text-[1.08em] pr-1">
                competencies.
              </span>
            </h2>
            <p className="font-sans text-base sm:text-lg text-text-dimmed dark:text-text-muted font-light leading-relaxed">
              Real engineering capability categorized by production experience, applied algorithms, and verified system implementations.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-text-dimmed dark:text-text-muted">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cobalt/10 text-cobalt dark:text-cobalt-light font-bold">
              <CheckCircle2 size={13} /> PRODUCTION-PROVEN
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-acid-lime/10 text-text-black dark:text-acid-lime font-bold">
              <Sparkles size={13} /> PATENT-APPLIED
            </span>
          </div>
        </div>

        {/* Compact & Ultra-Attractive Bento Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {DOMAINS.map((domain, idx) => {
            const Icon = domain.icon;
            const isLarge = idx === 0 || idx === 1;

            return (
              <div
                key={domain.id}
                className={`group p-7 sm:p-8 rounded-3xl bg-canvas-light dark:bg-[#14161E] border border-border-light dark:border-border-dark ${domain.borderColor} transition-all duration-300 shadow-subtle-card hover:shadow-elevated flex flex-col justify-between space-y-6 ${
                  isLarge ? 'lg:col-span-1 md:col-span-1' : ''
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-border-light dark:border-border-dark">
                  <div className="space-y-1">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted dark:text-gray-400 block">
                      {domain.subtitle}
                    </span>
                    <h3 className="font-display font-bold text-xl text-text-black dark:text-white group-hover:text-cobalt dark:group-hover:text-cobalt-light transition-colors">
                      {domain.title}
                    </h3>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-border-light dark:border-border-dark flex items-center justify-center text-cobalt dark:text-cobalt-light flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon size={18} />
                  </div>
                </div>

                {/* Items Matrix */}
                <div className="space-y-3 flex-1">
                  {domain.items.map((tech) => (
                    <div
                      key={tech.name}
                      className="p-2.5 rounded-xl bg-white/80 dark:bg-white/[0.03] border border-border-light/60 dark:border-white/5 hover:border-cobalt/40 transition-colors flex items-center justify-between gap-2"
                    >
                      <div className="space-y-0.5">
                        <span className="font-display font-semibold text-sm text-text-black dark:text-white block">
                          {tech.name}
                        </span>
                        <span className="text-[11px] font-sans text-text-dimmed dark:text-gray-400 block font-light truncate max-w-[200px]">
                          {tech.highlight}
                        </span>
                      </div>

                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase flex-shrink-0 ${
                          tech.level === 'Production'
                            ? 'bg-cobalt/10 text-cobalt dark:text-cobalt-light'
                            : tech.level === 'Proficient'
                            ? 'bg-acid-lime/15 text-text-black dark:text-acid-lime'
                            : 'bg-white/10 text-text-muted dark:text-gray-400'
                        }`}
                      >
                        {tech.level}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Domain Footer */}
                <div className="pt-2 text-[11px] font-mono text-text-muted dark:text-gray-400 flex items-center justify-between">
                  <span>{domain.items.length} TECHNOLOGIES</span>
                  <span className="text-acid-lime font-bold">● ACTIVE STACK</span>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Academic Credibility & Patent Summary Tile */}
          <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-cobalt/15 via-white dark:via-[#14161E] to-canvas-light dark:to-[#14161E] border border-cobalt/30 dark:border-cobalt/40 shadow-subtle-card flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-cobalt font-bold block">
                RIGOR &amp; CREDIBILITY
              </span>
              <h3 className="font-display font-bold text-xl text-text-black dark:text-white">
                Academic &amp; Patent Proof
              </h3>
              <p className="font-sans text-xs sm:text-sm text-text-dimmed dark:text-gray-300 font-light leading-relaxed">
                Technical competencies are validated through academic performance (<span className="font-bold text-cobalt dark:text-cobalt-light">CGPA 8.42</span>), published research patent (<span className="font-bold text-acid-lime">202641064539 A</span>), and verified corporate programs.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-border-light dark:border-border-dark text-xs font-mono">
              <div className="flex items-center justify-between text-text-dimmed dark:text-gray-300">
                <span>DEGREE</span>
                <span className="font-bold text-text-black dark:text-white">B.Tech IT (KPR)</span>
              </div>
              <div className="flex items-center justify-between text-text-dimmed dark:text-gray-300">
                <span>PATENT GAZETTE</span>
                <span className="font-bold text-acid-lime">PUBLISHED</span>
              </div>
              <div className="flex items-center justify-between text-text-dimmed dark:text-gray-300">
                <span>SAMSUNG AI CAMPUS</span>
                <span className="font-bold text-cobalt dark:text-cobalt-light">PHASE III CERT</span>
              </div>
            </div>

            <a
              href="/assets/Arjunan_V_Resume.pdf"
              download
              className="w-full py-3 rounded-full bg-text-black dark:bg-white text-white dark:text-text-black font-sans text-xs font-bold text-center hover:bg-cobalt dark:hover:bg-cobalt-light dark:hover:text-white transition-colors"
            >
              Download Verified CV
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
