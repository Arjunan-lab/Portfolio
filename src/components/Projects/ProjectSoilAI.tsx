import React, { useState } from 'react';
import { CheckCircle2, Maximize2, Cpu, Database } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import type { Project } from '../../types';

interface ProjectSoilAIProps {
  project: Project;
  onOpenImage: (src: string, caption: string) => void;
}

export const ProjectSoilAI: React.FC<ProjectSoilAIProps> = ({ project, onOpenImage }) => {
  const [activeVisualIndex, setActiveVisualIndex] = useState(0);
  const visuals = project.visuals || [];
  const currentVisual = visuals[activeVisualIndex] || visuals[0];

  return (
    <article className="glass-card-prominent p-8 sm:p-12 lg:p-14 relative overflow-hidden group">
      {/* Top Subtle Gold Gradient Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      {/* Project Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/[0.08] mb-10">
        <div className="flex items-center gap-4">
          <span className="font-mono text-2xl sm:text-3xl font-bold text-gold">
            {project.number}
          </span>
          <div className="h-6 w-px bg-white/10" />
          <span className="font-mono text-xs uppercase tracking-widest text-gold font-medium">
            {project.category}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-wider text-stone-grey hover:text-ivory hover:border-gold transition-all"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Repository</span>
            </a>
          )}
        </div>
      </div>

      {/* Grid: Narrative on Left (7 cols), Screenshots on Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: Narrative & Technical Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-ivory mb-4">
              {project.title}
            </h3>
            <p className="text-base sm:text-lg text-stone-grey leading-relaxed font-light">
              {project.fullDescription}
            </p>
          </div>

          {/* Problem & Approach Split in Rounded Frosted Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
            <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/[0.06] space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-gold font-medium block">
                Problem Statement
              </span>
              <p className="text-xs sm:text-sm text-stone-grey leading-relaxed font-light">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/[0.06] space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-gold-light font-medium block">
                Technical Approach
              </span>
              <p className="text-xs sm:text-sm text-stone-grey leading-relaxed font-light">
                {project.technicalApproach}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-3 pt-6 border-t border-white/[0.08]">
            <h4 className="font-mono text-xs uppercase tracking-widest text-ivory flex items-center gap-2">
              <Cpu size={14} className="text-gold" />
              KEY SYSTEM CAPABILITIES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.keyFeatures.map((feature, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-stone-grey">
                  <CheckCircle2 size={14} className="text-gold flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Implementation Highlights */}
          {project.implementationDetails && (
            <div className="space-y-2.5 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <h4 className="font-mono text-xs uppercase tracking-widest text-gold flex items-center gap-2">
                <Database size={13} />
                ML & INFERENCE PIPELINE
              </h4>
              <ul className="space-y-2">
                {project.implementationDetails.map((detail, idx) => (
                  <li key={idx} className="text-xs text-stone-grey flex items-start gap-2 font-mono">
                    <span className="text-gold">›</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="pt-6 border-t border-white/[0.08]">
            <span className="block font-mono text-[11px] uppercase tracking-wider text-stone-grey/60 mb-3">
              ENGINEERING STACK
            </span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-stone-grey"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Screenshots Showcase (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Active Screenshot Display in Rounded Glass Container */}
          {currentVisual && currentVisual.src && (
            <div className="relative group rounded-2xl overflow-hidden bg-onyx border border-white/10 p-2 shadow-glass">
              <div className="relative overflow-hidden aspect-[4/3] rounded-xl bg-charcoal">
                <img
                  src={currentVisual.src}
                  alt={currentVisual.caption || project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent pointer-events-none" />
                
                {/* Expand button */}
                <button
                  onClick={() => onOpenImage(currentVisual.src!, currentVisual.caption || '')}
                  className="absolute bottom-3 right-3 p-2.5 rounded-full bg-obsidian/80 backdrop-blur-md border border-white/20 text-gold hover:scale-110 transition-all shadow-lg"
                  title="Inspect High Resolution"
                >
                  <Maximize2 size={14} />
                </button>
              </div>

              {/* Caption */}
              <div className="mt-3 px-2 py-1 flex items-center justify-between text-[11px] font-mono text-stone-grey">
                <span className="text-gold font-medium uppercase">
                  {currentVisual.label || `FIGURE 0${activeVisualIndex + 1}`}
                </span>
                <span className="truncate max-w-[220px] text-stone-grey/60">
                  {currentVisual.caption}
                </span>
              </div>
            </div>
          )}

          {/* Thumbnail Navigation Strip */}
          {visuals.length > 1 && (
            <div className="grid grid-cols-4 gap-2.5 pt-2">
              {visuals.map((vis, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveVisualIndex(idx)}
                  className={`relative rounded-xl overflow-hidden p-1 transition-all text-left ${
                    activeVisualIndex === idx
                      ? 'border border-gold bg-gold/15 shadow-glow-gold'
                      : 'border border-white/10 bg-white/[0.02] hover:border-white/30'
                  }`}
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-lg bg-charcoal">
                    <img
                      src={vis.src}
                      alt={vis.label || `Thumb ${idx + 1}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <span className="block mt-1 text-[9px] font-mono uppercase tracking-wider text-stone-grey/80 truncate text-center">
                    {vis.label || `Fig ${idx + 1}`}
                  </span>
                </button>
              ))}
            </div>
          )}

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-stone-grey flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
            <span>INFOSYS SPRINGBOARD AI: Multi-target regression evaluated on N-P-K soil indices.</span>
          </div>

        </div>

      </div>
    </article>
  );
};
