import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, FileText } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { PROJECTS } from '../../data/portfolioData';
import { useCornerConvergence } from '../../motion/scrollMotion';

const FILTER_TABS = [
  'All Projects',
  'AI & Machine Learning',
  'Full-Stack & Web',
  'Enterprise & Systems'
] as const;

export const ProjectsSection = () => {
  const [filterTab, setFilterTab] = useState<typeof FILTER_TABS[number]>('All Projects');

  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useCornerConvergence({
    sectionRef,
    headingRef,
    textRef,
  });

  const filteredProjects = PROJECTS.filter(p => {
    if (filterTab === 'All Projects') return true;
    if (filterTab === 'AI & Machine Learning') return p.category.includes('Intelligence') || p.category.includes('Learning') || p.category.includes('AI') || p.category.includes('Processing');
    if (filterTab === 'Full-Stack & Web') return p.category.includes('Full-Stack') || p.category.includes('Web') || p.category.includes('Campus') || p.category.includes('PHP');
    if (filterTab === 'Enterprise & Systems') return p.category.includes('Enterprise') || p.category.includes('Patent') || p.category.includes('Hardware') || p.category.includes('Java');
    return true;
  });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-16 border-t border-border-light dark:border-border-dark bg-canvas-light dark:bg-[#0C0D11] transition-colors duration-300 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-cobalt/5 dark:bg-cobalt/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4 border-b border-border-light dark:border-border-dark">
          
          <div ref={headingRef} className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-text-dimmed dark:text-text-muted uppercase">
              <span className="w-2 h-2 rounded-full bg-cobalt inline-block animate-pulse" />
              <span>03 // SELECTED WORK &amp; SYSTEM REPOSITORIES</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-[60px] tracking-tight text-text-black dark:text-white leading-[1.05] uppercase">
              Turning ideas{' '}
              <span className="block">
                into{' '}
                <span className="font-serif-italic font-normal italic text-cobalt dark:text-cobalt-light tracking-normal text-[1.08em] pr-1">
                  products.
                </span>
              </span>
            </h2>
            <p ref={textRef} className="font-sans text-sm sm:text-base text-text-dimmed dark:text-text-muted leading-relaxed font-light">
              Grounded software systems spanning applied machine learning, production full-stack platforms, campus utilities, and published hardware-software intellectual property.
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
                      : 'bg-white dark:bg-white/5 border border-border-light dark:border-border-dark text-text-dimmed dark:text-gray-300 hover:border-cobalt'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <span className="text-xs font-mono text-text-muted dark:text-gray-400 self-center sm:self-auto sm:pl-2">
              {filteredProjects.length} Repositories
            </span>
          </div>

        </div>

        {/* =============================================================== */}
        {/* GALLERY VIEW: Responsive Grid with Rows and Columns             */}
        {/* =============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
          {filteredProjects.map((project, idx) => {
            const isPatent = project.id === 'microscopy-patent';
            const coverImg = project.coverImage || '/assets/projects/agriculture-ai/seedling-preview.png';

            return (
              <div
                key={project.id}
                className="group flex flex-col justify-between rounded-3xl bg-white dark:bg-[#14161E] border border-border-light dark:border-border-dark hover:border-cobalt dark:hover:border-cobalt/80 transition-all duration-300 shadow-subtle-card overflow-hidden"
              >
                {/* 16:9 Cover Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-text-black">
                  <img
                    src={coverImg}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

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
                    <h3 className="font-display font-bold text-lg sm:text-xl text-text-black dark:text-white group-hover:text-cobalt dark:group-hover:text-cobalt-light transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-text-dimmed dark:text-gray-300 leading-relaxed font-light line-clamp-3">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 4).map(tech => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded text-[10px] font-mono bg-canvas-light dark:bg-white/5 border border-border-light dark:border-white/10 text-text-black dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="px-2 py-1 text-[10px] font-mono text-text-muted dark:text-gray-400">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Direct Repository / Gazette Link (No Demo Option) */}
                    <div className="pt-3 border-t border-border-light dark:border-border-dark">
                      {isPatent ? (
                        <a
                          href="/assets/Microscopy_System_Patent_Publication.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-text-black dark:bg-white text-white dark:text-text-black text-xs font-semibold hover:bg-cobalt dark:hover:bg-cobalt-light dark:hover:text-white transition-colors"
                        >
                          <FileText size={13} />
                          <span>View Official Gazette PDF</span>
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <a
                          href={project.githubUrl || "https://github.com/Arjunan-lab"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-white/5 text-text-black dark:text-white text-xs font-semibold hover:border-cobalt hover:text-cobalt dark:hover:text-cobalt-light hover:bg-cobalt/5 transition-all shadow-sm"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>View Repository on GitHub</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Strip: Link to Dedicated Work Archive */}
        <div className="pt-8 border-t border-border-light dark:border-border-dark flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-text-dimmed dark:text-text-muted">
            <span className="w-2 h-2 rounded-full bg-acid-lime" />
            <span>ALL 9 REPOSITORIES VERIFIED ON GITHUB</span>
          </div>

          <Link
            to="/work"
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-black dark:text-white font-semibold hover:text-cobalt dark:hover:text-cobalt-light transition-colors"
          >
            <span>Explore All 9 Projects Archive</span>
            <div className="w-6 h-6 rounded-full border border-border-light dark:border-border-dark flex items-center justify-center group-hover:border-cobalt group-hover:bg-cobalt group-hover:text-white transition-all">
              <ArrowRight size={12} />
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
};
