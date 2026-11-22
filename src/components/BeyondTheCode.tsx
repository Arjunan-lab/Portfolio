import { PHILOSOPHY } from '../data/portfolioData';
import { Compass, Lightbulb, Workflow, Rocket } from 'lucide-react';

export const BeyondTheCode = () => {
  const icons = [Workflow, Compass, Lightbulb, Rocket];

  return (
    <section id="beyond" className="relative py-28 sm:py-40 border-t border-border-subtle overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-cobalt/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Header Indicator */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-cobalt font-bold">
            05 // PERSPECTIVES
          </span>
          <div className="h-px flex-1 max-w-[80px] bg-border-subtle" />
        </div>

        {/* Large Headline */}
        <div className="max-w-4xl mb-16 sm:mb-24">
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight text-soft-white uppercase leading-[1.04]">
            Technology is a{' '}
            <span className="text-cobalt">starting point.</span>
          </h2>
          <p className="mt-4 font-sans text-base sm:text-lg text-text-dim font-light max-w-xl">
            Software engineering reaches its highest expression when combined with product thinking, business clarity, and creative execution.
          </p>
        </div>

        {/* 2x2 Clean Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PHILOSOPHY.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={item.title}
                className="group p-8 sm:p-10 rounded-3xl bg-surface-black border border-border-subtle hover:border-cobalt transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-border-subtle mb-6">
                    <span className="font-mono text-xs text-acid-lime uppercase tracking-widest font-bold">
                      PERSPECTIVE 0{idx + 1}
                    </span>
                    <Icon size={18} className="text-text-dim group-hover:text-cobalt transition-colors" />
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-soft-white mb-2 group-hover:text-cobalt transition-colors">
                    {item.title}
                  </h3>
                  <span className="block font-mono text-xs text-text-dim uppercase tracking-wider mb-4">
                    {item.subtitle}
                  </span>

                  <p className="font-sans text-sm sm:text-base text-text-dim leading-relaxed font-light mb-8">
                    {item.content}
                  </p>
                </div>

                <div className="pt-6 border-t border-border-subtle flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-surface-elevated text-text-secondary border border-border-subtle"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Manifesto Banner */}
        <div className="mt-14 p-8 sm:p-12 rounded-3xl bg-surface-elevated border border-border-subtle flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-acid-lime font-bold block">
              // VISION STATEMENT
            </span>
            <p className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-soft-white leading-snug">
              "To build products that outlive their initial codebases—creating enduring utility at the intersection of AI and human capability."
            </p>
          </div>

          <div className="flex-shrink-0 font-mono text-xs text-text-dim border-l border-border-subtle pl-6 space-y-1">
            <p className="text-soft-white font-bold text-sm">ARJUNAN</p>
            <p>Undergraduate IT Scholar</p>
            <p className="text-cobalt font-medium">Coimbatore, India</p>
          </div>
        </div>

      </div>
    </section>
  );
};
