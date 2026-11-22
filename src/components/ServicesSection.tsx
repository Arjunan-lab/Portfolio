import { Layout, Brain, ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';

const SERVICES = [
  {
    number: "01",
    icon: Layout,
    title: "Full-Stack Web Architecture",
    subtitle: "High-Performance Modern Applications",
    description: "Designing end-to-end web applications with type-safe frontend systems, modular state management, and high-throughput async backend microservices.",
    deliverables: [
      "Modern React / TypeScript SPAs & Interactive Dashboards",
      "Asynchronous REST APIs with FastAPI & Node.js",
      "Relational & Document Database Schema Design (MySQL, MongoDB)",
      "Tailwind CSS Responsive Micro-Interactions"
    ],
    stack: ["React.js", "TypeScript", "FastAPI", "Node.js", "Tailwind CSS", "MySQL"],
    accent: "group-hover:border-cobalt"
  },
  {
    number: "02",
    icon: Brain,
    title: "Applied Machine Learning & AI",
    subtitle: "Predictive Models & Computer Vision",
    description: "Developing practical machine learning pipelines that process complex agronomic, sensory, and vision data into accurate real-time decision recommendations.",
    deliverables: [
      "Image Classification via EfficientNet Convolutional Architectures",
      "Multi-Target Regression & Gradient Boosting with CatBoost",
      "Asynchronous Model Inference Queues with Celery Workers",
      "Confusion Matrices, ROC Evaluation, & Validation Telemetry"
    ],
    stack: ["Python", "TensorFlow", "CatBoost", "Scikit-learn", "Celery", "Pandas"],
    accent: "group-hover:border-acid-lime"
  }
];

export const ServicesSection = () => {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-16 border-t border-border-light dark:border-border-dark bg-canvas-light dark:bg-[#0D0E12] transition-colors duration-300 overflow-hidden">
      
      {/* Subtle ambient background glow */}
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-cobalt/5 dark:bg-cobalt/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-text-dimmed dark:text-text-muted uppercase">
              <span>06 // SPECIALIZED SERVICES</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-[68px] tracking-tight text-text-black dark:text-white leading-[1.04]">
              What I{' '}
              <span className="font-serif-italic font-normal italic text-cobalt dark:text-cobalt-light text-[1.08em] pr-1">
                bring
              </span>{' '}
              to the table.
            </h2>
            <p className="font-sans text-base sm:text-lg text-text-dimmed dark:text-text-muted font-light leading-relaxed">
              Proven capabilities across the software stack—from low-level firmware to deep neural inference models and elegant user interfaces.
            </p>
          </div>

          <button
            onClick={scrollToContact}
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-text-black dark:bg-white text-white dark:text-text-black font-sans text-xs font-semibold hover:bg-cobalt dark:hover:bg-cobalt-light dark:hover:text-white transition-colors duration-200 self-start md:self-end"
          >
            <span>Inquire for Collaboration</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* 4 Services Grid (Envato Gerold / Drake Agency Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.number}
                className={`group p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#14161E] border border-border-light dark:border-border-dark hover:border-cobalt dark:hover:border-cobalt transition-all duration-300 shadow-subtle-card hover:shadow-elevated flex flex-col justify-between space-y-8 relative overflow-hidden`}
              >
                {/* Top Row: Number & Icon */}
                <div className="flex items-center justify-between pb-6 border-b border-border-light dark:border-border-dark">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-cobalt dark:text-cobalt-light px-3 py-1 rounded-full bg-cobalt/10 dark:bg-cobalt/20">
                      {srv.number}
                    </span>
                    <span className="text-xs font-mono text-text-muted dark:text-gray-400 uppercase tracking-wider">
                      {srv.subtitle}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-canvas-light dark:bg-white/5 border border-border-light dark:border-border-dark flex items-center justify-center text-cobalt dark:text-cobalt-light group-hover:scale-110 group-hover:bg-cobalt group-hover:text-white transition-all duration-300">
                    <Icon size={22} />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-text-black dark:text-white group-hover:text-cobalt dark:group-hover:text-cobalt-light transition-colors">
                    {srv.title}
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-text-dimmed dark:text-text-muted leading-relaxed font-light">
                    {srv.description}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-2.5 pt-2">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-text-muted dark:text-gray-400 block mb-2">
                    KEY DELIVERABLES:
                  </span>
                  {srv.deliverables.map(del => (
                    <div key={del} className="flex items-start gap-2.5 text-xs font-sans text-text-dimmed dark:text-gray-300">
                      <CheckCircle2 size={13} className="text-acid-lime flex-shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="pt-6 border-t border-border-light dark:border-border-dark flex flex-wrap items-center gap-2">
                  {srv.stack.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-canvas-light dark:bg-white/5 border border-border-light dark:border-white/10 text-xs font-mono text-text-black dark:text-white/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#14161E] border border-border-light dark:border-border-dark flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-dimmed dark:text-text-muted">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-acid-lime" />
            <span>FULL PRODUCTION STANDARDS: TYPE-SAFE • WELL-DOCUMENTED • TEST-DRIVEN</span>
          </div>
          <span className="text-cobalt dark:text-cobalt-light font-semibold">COIMBATORE, INDIA & REMOTE</span>
        </div>

      </div>
    </section>
  );
};
