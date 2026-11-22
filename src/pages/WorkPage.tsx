import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, FileText, ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from '../components/ui/Icons';
import { PROJECTS } from '../data/portfolioData';

const WORK_FILTER_TABS = [
  'All Projects',
  'AI & Machine Learning',
  'Full-Stack & Web',
  'Enterprise & Systems'
] as const;

export const WorkPage = () => {
  const [activeTab, setActiveTab] = useState<typeof WORK_FILTER_TABS[number]>('All Projects');

  const filteredProjects = PROJECTS.filter(p => {
    if (activeTab === 'All Projects') return true;
    if (activeTab === 'AI & Machine Learning') {
      return p.category.includes('Intelligence') || p.category.includes('Learning') || p.category.includes('AI') || p.category.includes('Processing');
    }
    if (activeTab === 'Full-Stack & Web') {
      return p.category.includes('Full-Stack') || p.category.includes('Web') || p.category.includes('Campus') || p.category.includes('PHP');
    }
    if (activeTab === 'Enterprise & Systems') {
      return p.category.includes('Enterprise') || p.category.includes('Patent') || p.category.includes('Hardware') || p.category.includes('Java');
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-canvas-light dark:bg-[#0C0D11] text-text-black dark:text-white pt-28 pb-24 px-6 sm:px-12 lg:px-16 selection:bg-cobalt selection:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-border-light dark:border-border-dark">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-dimmed dark:text-text-muted hover:text-text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Overview</span>
          </Link>
          <span className="font-mono text-xs uppercase tracking-widest text-cobalt dark:text-cobalt-light font-bold">
            PROJECTS ARCHIVE // 03 ({PROJECTS.length} VERIFIED REPOSITORIES)
          </span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-border-light dark:border-border-dark">
          <div className="space-y-4 max-w-3xl">
            <span className="font-mono text-xs text-text-dimmed dark:text-text-muted uppercase tracking-widest block">
              03 — SELECTED WORK &amp; SYSTEM REPOSITORIES
            </span>
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-[68px] tracking-tight leading-[1.02]">
              Turning ideas{' '}
              <span className="block">
                into{' '}
                <span className="font-serif-italic font-normal italic text-cobalt dark:text-cobalt-light text-[1.08em] pr-1">
                  products.
                </span>
              </span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-text-dimmed dark:text-text-muted leading-relaxed font-light">
              Grounded software systems engineered across artificial intelligence, full-stack web platforms, campus utilities, and published intellectual property.
            </p>

            {/* Factual Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-3 py-1 rounded-full bg-cobalt/10 text-cobalt dark:text-cobalt-light text-xs font-mono font-bold border border-cobalt/20 flex items-center gap-1.5">
                <Sparkles size={12} className="text-acid-lime" /> 1 PUBLISHED PATENT
              </span>
              <span className="px-3 py-1 rounded-full bg-acid-lime/15 text-text-black dark:text-acid-lime text-xs font-mono font-bold border border-acid-lime/30">
                09 GITHUB REPOSITORIES
              </span>
              <span className="px-3 py-1 rounded-full bg-white dark:bg-white/5 text-text-black dark:text-white text-xs font-mono border border-border-light dark:border-border-dark">
                B.TECH IT (CGPA 8.42)
              </span>
            </div>
          </div>

          {/* Filter Tabs & Count */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {WORK_FILTER_TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-cobalt text-white shadow-cobalt-glow'
                      : 'bg-white dark:bg-white/5 border border-border-light dark:border-border-dark text-text-dimmed dark:text-gray-300 hover:border-cobalt'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <span className="text-xs font-mono text-text-muted dark:text-gray-400 self-center sm:self-auto sm:pl-2">
              {filteredProjects.length} Systems
            </span>
          </div>
        </div>

        {/* =============================================================== */}
        {/* GALLERY VIEW: Responsive Grid with Rows and Columns             */}
        {/* =============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => {
            const isPatent = project.id === 'microscopy-patent';
            const previewImg = project.coverImage || '/assets/projects/agriculture-ai/seedling-preview.png';

            return (
              <div
                key={project.id}
                className="group flex flex-col justify-between rounded-3xl bg-white dark:bg-[#14161E] border border-border-light dark:border-border-dark hover:border-cobalt dark:hover:border-cobalt/80 transition-all duration-300 shadow-subtle-card overflow-hidden"
              >
                {/* 16:9 Cover Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-text-black">
                  <img
                    src={previewImg}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-85" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/15 font-bold text-[11px]">
                      SYSTEM 0{idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-cobalt/85 backdrop-blur-md text-white font-mono text-[10px] uppercase font-semibold">
                      {project.techStack[0]}
                    </span>
                  </div>

                  {/* Category Label */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="font-mono text-[10px] text-acid-lime font-bold uppercase tracking-wider block drop-shadow">
                      {project.category.split('/')[0].trim()}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <h2 className="font-display font-bold text-lg sm:text-xl text-text-black dark:text-white group-hover:text-cobalt dark:group-hover:text-cobalt-light transition-colors leading-snug">
                      {project.title}
                    </h2>

                    <p className="font-sans text-xs sm:text-sm text-text-dimmed dark:text-gray-300 leading-relaxed font-light line-clamp-3">
                      {project.shortDescription}
                    </p>

                    {/* Key Technical Features (Grounded in codebase) */}
                    <div className="space-y-1.5 pt-2 border-t border-border-light/60 dark:border-border-dark/60">
                      {project.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs font-mono text-text-dimmed dark:text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-acid-lime flex-shrink-0 mt-1" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Chips & Action Link */}
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map(tech => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded text-[10px] font-mono bg-canvas-light dark:bg-white/5 border border-border-light dark:border-white/10 text-text-black dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Direct Action Link (No Demo Option) */}
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

        {/* Bottom Navigation Strip */}
        <div className="pt-12 border-t border-border-light dark:border-border-dark flex items-center justify-between">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-dimmed dark:text-text-muted hover:text-text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Profile &amp; Principles</span>
          </Link>

          <Link
            to="/experience"
            className="inline-flex items-center gap-2 text-xs font-mono text-cobalt dark:text-cobalt-light font-bold hover:underline"
          >
            <span>View Experience &amp; Journey</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
};
