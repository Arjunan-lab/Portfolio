import { useEffect } from 'react';
import { X, ExternalLink, Cpu, CheckCircle2, AlertCircle, Layers } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import type { Project } from '../../types';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-xl overflow-y-auto animate-fadeIn">
      {/* Backdrop click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        className="relative z-10 max-w-5xl w-full bg-[#111216] border border-border-dark rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl my-auto space-y-8 max-h-[90vh] overflow-y-auto text-white"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-6 border-b border-border-dark">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-acid-lime px-3 py-1 rounded-full bg-acid-lime/10 border border-acid-lime/30">
              SYSTEM {project.number}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-cobalt-light hidden sm:inline-block">
              {project.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Title & Overview */}
        <div className="space-y-4">
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            {project.title}
          </h2>
          <p className="font-sans text-base sm:text-lg text-gray-300 leading-relaxed font-light">
            {project.fullDescription}
          </p>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cobalt hover:bg-cobalt-light text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-cobalt-glow"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Explore GitHub Repository</span>
              <ExternalLink size={13} />
            </a>
          )}
        </div>

        {/* Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-6 rounded-2xl bg-[#14161E] border border-border-dark space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-rose-400 font-bold">
              <AlertCircle size={14} />
              <span>The Problem</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-light">
              {project.problemStatement}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#14161E] border border-border-dark space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-acid-lime font-bold">
              <CheckCircle2 size={14} />
              <span>Technical Solution</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-light">
              {project.technicalApproach}
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="space-y-4 pt-4 border-t border-border-dark">
          <h3 className="font-mono text-xs uppercase tracking-widest text-cobalt-light flex items-center gap-2 font-bold">
            <Cpu size={14} />
            SYSTEM CAPABILITIES &amp; ARCHITECTURE
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.keyFeatures.map((feat, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-gray-300 font-mono p-3.5 rounded-xl bg-[#14161E] border border-white/5">
                <span className="text-acid-lime font-bold">✓</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Real Screenshots Grid (if available) */}
        {project.visuals && project.visuals.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-border-dark">
            <h3 className="font-mono text-xs uppercase tracking-widest text-white flex items-center gap-2 font-bold">
              <Layers size={14} className="text-cobalt-light" />
              VERIFIED IMPLEMENTATION TELEMETRY
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.visuals.map((vis, idx) => (
                <div key={idx} className="rounded-2xl overflow-hidden bg-black border border-border-dark p-2 space-y-2">
                  <div className="aspect-[16/10] overflow-hidden rounded-xl bg-[#0C0D11]">
                    <img
                      src={vis.src}
                      alt={vis.caption || `Visual ${idx + 1}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="px-1 text-[11px] font-mono text-gray-400 flex justify-between">
                    <span className="text-acid-lime font-semibold">{vis.label}</span>
                    <span className="truncate max-w-[200px]">{vis.caption}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies Stack */}
        <div className="pt-4 border-t border-border-dark">
          <span className="block font-mono text-xs uppercase tracking-wider text-gray-400 mb-3">
            COMPLETE TECHNOLOGY STACK
          </span>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-3 py-1.5 rounded-full bg-[#14161E] border border-border-dark text-gray-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
