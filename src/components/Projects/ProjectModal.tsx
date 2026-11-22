import React, { useEffect } from 'react';
import { X, ExternalLink, Cpu, CheckCircle2, AlertCircle, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GithubIcon } from '../ui/Icons';
import type { Project } from '../../types';
import { useLenis } from '../../motion/SmoothScrollContext';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  const { stop, start } = useLenis();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      stop();
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      start();
    }

    return () => {
      document.body.style.overflow = '';
      start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, stop, start]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl p-4 sm:p-6 lg:p-10 flex justify-center items-start no-scrollbar"
          data-lenis-prevent="true"
        >
          {/* Backdrop click to dismiss */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-transparent cursor-pointer" 
            onClick={onClose} 
            aria-label="Close modal backdrop"
          />

          <motion.div 
            layoutId={`project-card-${project.id}`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-5xl w-full bg-[#111216] border border-border-dark rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl my-8 sm:my-12 space-y-8 text-white transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent="true"
          >
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-6 border-b border-border-dark">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold text-acid-lime px-3.5 py-1 rounded-full bg-acid-lime/10 border border-acid-lime/30">
                  SYSTEM {project.number}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-cobalt-light hidden sm:inline-block">
                  {project.category}
                </span>
              </div>

              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all cursor-pointer border border-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Shared-Element Hero Media */}
            {project.coverImage && (
              <div className="rounded-2xl overflow-hidden aspect-[16/9] max-h-[380px] bg-black border border-border-dark relative">
                <motion.img
                  layoutId={`project-image-${project.id}`}
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111216] via-transparent to-transparent pointer-events-none" />
              </div>
            )}

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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cobalt hover:bg-cobalt-light text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-cobalt-glow cursor-pointer"
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

            {/* Key Features & Architecture */}
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
                          alt={vis.caption || `${project.title} technical architecture visualization ${idx + 1}`}
                          width={600}
                          height={375}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="px-1 text-xs font-mono text-gray-400 flex justify-between">
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
                    className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-[#14161E] border border-border-dark text-gray-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
