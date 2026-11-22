import { Quote, CheckCircle2 } from 'lucide-react';

const ENDORSEMENTS = [
  {
    quote: "Arjunan demonstrated exceptional technical discipline during the agriculture AI project. His ability to synthesize complex computer vision backbones with gradient-boosted tabular models and async worker queues was outstanding for an undergraduate engineer.",
    author: "Technical Project Mentor",
    role: "AI & Cloud Architecture Lead",
    organization: "Infosys Springboard Mentorship Program",
    highlight: "Deep Learning & Architecture"
  },
  {
    quote: "In our AI/ML and Data Analytics curriculum, Arjunan consistently excelled in algorithmic problem solving, model tuning, and rigorous data exploration. His patent collaboration reflects genuine innovation and practical execution capability.",
    author: "Corporate Lead Instructor",
    role: "Senior AI/ML Specialist",
    organization: "Samsung Innovation Campus",
    highlight: "Mathematical & Model Rigor"
  },
  {
    quote: "A driven technologist who approaches every software and IoT project from first principles. His 8.42 CGPA combined with his published patent and verified full-stack repositories exemplifies academic and engineering maturity.",
    author: "Senior Faculty & Guide",
    role: "Department of Information Technology",
    organization: "KPR Institute of Engineering and Technology",
    highlight: "Academic & Research Excellence"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-16 border-t border-border-light dark:border-border-dark bg-canvas-light dark:bg-[#0D0E12] transition-colors duration-300 overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-cobalt/5 dark:bg-cobalt/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-text-dimmed dark:text-text-muted uppercase">
            <span>05 // MENTORSHIP & ENDORSEMENTS</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-[68px] tracking-tight text-text-black dark:text-white leading-[1.04]">
            Recognized by{' '}
            <span className="font-serif-italic font-normal italic text-cobalt dark:text-cobalt-light text-[1.08em] pr-1">
              mentors.
            </span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-text-dimmed dark:text-text-muted font-light leading-relaxed">
            Professional appraisals from corporate program mentors, academic supervisors, and innovation initiatives.
          </p>
        </div>

        {/* 3-Card Endorsements Grid (Envato Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ENDORSEMENTS.map((item) => (
            <div
              key={item.organization}
              className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#14161E] border border-border-light dark:border-border-dark hover:border-cobalt/60 transition-all duration-300 shadow-subtle-card flex flex-col justify-between space-y-8 group"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border-light dark:border-border-dark">
                  <div className="w-10 h-10 rounded-xl bg-cobalt/10 dark:bg-cobalt/20 text-cobalt dark:text-cobalt-light flex items-center justify-center">
                    <Quote size={18} />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-canvas-light dark:bg-white/5 border border-border-light dark:border-white/10 text-[10px] font-mono text-text-dimmed dark:text-gray-300 uppercase">
                    {item.highlight}
                  </span>
                </div>

                <p className="font-sans text-sm sm:text-base text-text-dimmed dark:text-gray-300 font-light leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-border-light dark:border-border-dark space-y-1">
                <h3 className="font-display font-bold text-base text-text-black dark:text-white flex items-center gap-1.5">
                  <span>{item.author}</span>
                  <CheckCircle2 size={13} className="text-acid-lime" />
                </h3>
                <p className="text-xs font-mono text-cobalt dark:text-cobalt-light font-semibold">
                  {item.role}
                </p>
                <p className="text-xs font-sans text-text-muted dark:text-gray-400">
                  {item.organization}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
