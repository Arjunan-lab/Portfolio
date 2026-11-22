import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Layout, Brain, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const CORE_DISCIPLINES = [
  {
    number: '01',
    icon: Layout,
    title: 'Full-Stack Web Architecture',
    subtitle: 'High-Performance Modern Applications',
    description: 'Designing end-to-end web applications with type-safe frontend systems, modular state management, and high-throughput async backend microservices.',
    deliverables: [
      'Modern React / TypeScript SPAs & Interactive Dashboards',
      'Asynchronous REST APIs with FastAPI & Node.js',
      'Relational & Document Database Schema Design (MySQL, MongoDB)',
      'Tailwind CSS Responsive Micro-Interactions',
    ],
    stack: ['React.js', 'TypeScript', 'FastAPI', 'Node.js', 'Tailwind CSS', 'MySQL'],
  },
  {
    number: '02',
    icon: Brain,
    title: 'Applied Machine Learning & AI',
    subtitle: 'Predictive Models & Computer Vision',
    description: 'Developing practical machine learning pipelines that process complex agronomic, sensory, and vision data into accurate real-time decision recommendations.',
    deliverables: [
      'Image Classification via EfficientNet Convolutional Architectures',
      'Multi-Target Regression & Gradient Boosting with CatBoost',
      'Asynchronous Model Inference Queues with Celery Workers',
      'Confusion Matrices, ROC Evaluation, & Validation Telemetry',
    ],
    stack: ['Python', 'TensorFlow', 'CatBoost', 'Scikit-learn', 'Celery', 'Pandas'],
  },
];

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 px-6 sm:px-12 lg:px-16 border-t border-border-dark bg-[#0D0E12] text-white transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* Section Eyebrow Label */}
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-text-muted uppercase">
          <span className="w-2 h-2 rounded-full bg-cobalt inline-block animate-pulse" />
          <span>02 // ABOUT &amp; BACKGROUND</span>
        </div>

        {/* TOP ROW: PROFILE & BIOGRAPHY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Body Text (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-4">
              <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-[68px] tracking-tight leading-[1.04] text-white">
                Engineering grounded{' '}
                <span className="block">
                  systems from{' '}
                  <span className="font-serif-italic font-normal italic text-cobalt-light text-[1.08em] pr-1">
                    ideas
                  </span>{' '}
                  to reality.
                </span>
              </h2>
            </div>

            <div className="space-y-6">
              <p className="font-sans text-base sm:text-lg md:text-xl text-text-muted font-normal max-w-xl leading-relaxed">
                I'm an Information Technology undergraduate who enjoys turning ideas into functional digital products. My interests span applied AI/ML engineering, high-throughput microservices, and human-centered web platforms.
              </p>

              <p className="font-sans text-sm sm:text-base text-gray-400 max-w-xl leading-relaxed">
                I believe great software emerges when robust architectural foundations converge with thoughtful design. Rather than writing code in isolation, I build products that deliver tangible utility—demonstrated across industry internships, competitive hackathons, and 8 verified production repositories.
              </p>

              {/* Know More Pill */}
              <div className="pt-2">
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white font-semibold hover:text-cobalt-light transition-colors"
                >
                  <span>Read Full Profile &amp; Principles</span>
                  <div className="w-6 h-6 rounded-full border border-border-dark flex items-center justify-center group-hover:border-cobalt group-hover:bg-cobalt group-hover:text-white transition-all">
                    <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Academic Telemetry Grid */}
            <div className="pt-8 border-t border-border-dark grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
              <div className="space-y-1">
                <span className="font-display font-bold text-white text-sm block">B.Tech</span>
                <span className="text-text-muted block">Information Technology</span>
              </div>

              <div className="space-y-1">
                <span className="font-display font-bold text-white text-sm block">KPR Institute of</span>
                <span className="text-text-muted block">Engineering &amp; Technology</span>
              </div>

              <div className="space-y-1">
                <span className="font-display font-bold text-white text-sm block">CGPA</span>
                <span className="text-cobalt-light font-bold text-base block">{PERSONAL_INFO.education.cgpa}</span>
              </div>

              <div className="space-y-1">
                <span className="font-display font-bold text-white text-sm block">Status</span>
                <span className="text-text-muted block text-xs">{PERSONAL_INFO.statusLine}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean, Perfectly-Framed Portrait */}
          <div className="lg:col-span-5 relative flex justify-center items-center pt-4 lg:pt-0">
            <div className="relative w-full max-w-[400px]">
              
              {/* Premium Luxury Portrait Frame */}
              <div className="group relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl bg-[#14161E] border border-border-dark hover:border-cobalt/60 transition-colors duration-500">
                <img
                  src="/assets/about/arjun-portrait.webp"
                  alt="Arjunan V — AI/ML Engineer & Full-Stack Developer portrait"
                  width={400}
                  height={500}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-center grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-103 transition-all duration-700 ease-out"
                />
                
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />
                
                {/* Image Label Overlay */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs font-mono text-white bg-black/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10 z-10 shadow-lg">
                  <span className="font-semibold text-white tracking-wide">ARJUNAN V</span>
                  <span className="text-acid-lime font-mono">COIMBATORE, IN</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* MERGED CAPABILITIES & WHAT I BRING */}
        <div className="pt-12 border-t border-border-dark space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-cobalt-light font-bold block">
              DISCIPLINES // WHAT I BRING
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight">
              Core Engineering Focus
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CORE_DISCIPLINES.map((discipline) => {
              const Icon = discipline.icon;

              return (
                <div
                  key={discipline.number}
                  className="p-8 rounded-3xl bg-[#14161E]/90 backdrop-blur-md border border-border-dark hover:border-cobalt transition-all duration-300 shadow-subtle-card space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cobalt-light">
                      <Icon size={22} />
                    </div>
                    <span className="font-mono text-xs text-text-muted">
                      SYSTEM {discipline.number}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-display font-bold text-xl sm:text-2xl text-white">
                      {discipline.title}
                    </h4>
                    <p className="font-mono text-xs text-acid-lime">
                      {discipline.subtitle}
                    </p>
                    <p className="font-sans text-sm text-gray-300 font-light leading-relaxed pt-1">
                      {discipline.description}
                    </p>
                  </div>

                  {/* Deliverables List */}
                  <div className="space-y-2 pt-2 border-t border-border-dark">
                    {discipline.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs text-gray-300 font-sans">
                        <CheckCircle2 size={13} className="text-cobalt-light flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {discipline.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded text-xs font-mono bg-white/5 border border-white/10 text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
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
