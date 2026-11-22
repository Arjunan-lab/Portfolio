import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ExternalLink,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { PROJECTS } from '../../data/portfolioData';
import { useCornerConvergence } from '../../motion/scrollMotion';
import { ProjectModal } from './ProjectModal';
import type { Project } from '../../types';

const FILTER_TABS = [
  'All Projects',
  'AI & Machine Learning',
  'Full-Stack & Web',
  'Enterprise & Systems'
] as const;

export const ProjectsSection = () => {
  const [filterTab, setFilterTab] = useState<typeof FILTER_TABS[number]>('All Projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useCornerConvergence({
    sectionRef,
    headingRef,
    textRef,
  });

  // Filter out the hardware patent so the gallery focuses strictly on software engineering repositories
  const softwareProjects = PROJECTS.filter(p => p.id !== 'microscopy-patent');

  const filteredProjects = softwareProjects.filter(p => {
    if (filterTab === 'All Projects') return true;
    if (filterTab === 'AI & Machine Learning') return p.category.includes('Intelligence') || p.category.includes('Learning') || p.category.includes('AI') || p.category.includes('Processing');
    if (filterTab === 'Full-Stack & Web') return p.category.includes('Full-Stack') || p.category.includes('Web') || p.category.includes('Campus') || p.category.includes('PHP');
    if (filterTab === 'Enterprise & Systems') return p.category.includes('Enterprise') || p.category.includes('Hardware') || p.category.includes('Java');
    return true;
  });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-16 border-t border-border-dark bg-[#0C0D11] text-white transition-colors duration-300 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-cobalt/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4 border-b border-border-dark">
          
          <div ref={headingRef} className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-text-muted uppercase">
              <span className="w-2 h-2 rounded-full bg-cobalt inline-block animate-pulse" />
              <span>04 // SELECTED WORK &amp; SYSTEM REPOSITORIES</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-[60px] tracking-tight text-white leading-[1.05] uppercase">
              Turning ideas{' '}
              <span className="block">
                into{' '}
                <span className="font-serif-italic font-normal italic text-cobalt-light tracking-normal text-[1.08em] pr-1">
                  products.
                </span>
              </span>
            </h2>
            <p ref={textRef} className="font-sans text-sm sm:text-base text-text-muted leading-relaxed font-light">
              Grounded software systems spanning applied machine learning, production full-stack platforms, campus utilities, and high-performance algorithms.
            </p>
          </div>

          {/* Right side filter tabs & count */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {FILTER_TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilterTab(tab)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    filterTab === tab
                      ? 'bg-cobalt text-white shadow-cobalt-glow'
                      : 'bg-white/5 border border-border-dark text-gray-300 hover:border-cobalt'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <span className="text-xs font-mono text-gray-400 self-center sm:self-auto sm:pl-2">
              {filteredProjects.length} Repositories
            </span>
          </div>

        </div>

        {/* =============================================================== */}
        {/* GALLERY VIEW: Responsive Grid with Rows and Columns (8 Repos)   */}
        {/* =============================================================== */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
              FLAGSHIP ENGINEERING WORK &amp; SYSTEM ARCHITECTURES
            </span>
            <span className="text-xs font-mono text-cyan-400">
              08 PRODUCTION REPOSITORIES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, idx) => {
              const coverImg = project.coverImage || '/assets/projects/agriculture-ai/seedling-preview.png';

              return (
                <div
                  key={project.id}
                  className="group flex flex-col justify-between rounded-3xl bg-[#14161E] border border-border-dark hover:border-cobalt transition-all duration-300 shadow-subtle-card overflow-hidden"
                >
                  {/* 16:9 Cover Image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                    <img
                      src={coverImg}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                    {/* System Badge */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                      <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/15 font-bold text-[11px]">
                        SYSTEM 0{idx + 1}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-cobalt/80 backdrop-blur-md text-white font-mono text-[10px] uppercase font-semibold">
                        {project.techStack[0]}
                      </span>
                    </div>

                    {/* Category label on cover */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="font-mono text-[10px] text-acid-lime font-bold uppercase tracking-wider block drop-shadow">
                        {project.category.split('/')[0].trim()}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    
                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-cobalt-light transition-colors leading-snug">
                        {project.title}
                      </h3>

                      <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed font-light line-clamp-3">
                        {project.shortDescription}
                      </p>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="space-y-4 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 4).map(tech => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-2 py-1 text-[10px] font-mono text-gray-400">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons: Detailed View + GitHub Link */}
                      <div className="pt-3 border-t border-border-dark space-y-2">
                        {/* Primary Detailed View Button */}
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cobalt hover:bg-cobalt-light text-white text-xs font-semibold transition-all shadow-md cursor-pointer"
                        >
                          <Layers size={13} />
                          <span>Detailed Project View</span>
                          <ArrowUpRight size={13} />
                        </button>

                        {/* GitHub Repository Link */}
                        <a
                          href={project.githubUrl || "https://github.com/Arjunan-lab"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-border-dark bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-mono transition-all"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>View Repository on GitHub</span>
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Strip: Link to Dedicated Work Archive */}
        <div className="pt-8 border-t border-border-dark flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <span className="w-2 h-2 rounded-full bg-acid-lime" />
            <span>ALL 8 REPOSITORIES VERIFIED ON GITHUB</span>
          </div>

          <Link
            to="/work"
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white font-semibold hover:text-cobalt-light transition-colors"
          >
            <span>Explore All 8 Projects Archive</span>
            <div className="w-6 h-6 rounded-full border border-border-dark flex items-center justify-center group-hover:border-cobalt group-hover:bg-cobalt group-hover:text-white transition-all">
              <ArrowRight size={12} />
            </div>
          </Link>
        </div>

      </div>

      {/* Comprehensive Detailed Project View Modal */}
      <ProjectModal
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  );
};
