import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ExternalLink,
  Layers,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubIcon } from '../ui/Icons';
import { PROJECTS } from '../../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { SplitReveal } from '../../motion/SplitReveal';
import { checkReducedMotion, checkTouchDevice } from '../../motion/tokens';
import type { Project } from '../../types';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type TagFilter = 'all' | 'ai' | 'fullstack' | 'systems';

const TAG_TABS: { label: string; value: TagFilter }[] = [
  { label: 'All Systems', value: 'all' },
  { label: 'Applied AI & ML', value: 'ai' },
  { label: 'Full-Stack Web', value: 'fullstack' },
  { label: 'Systems & IoT', value: 'systems' },
];

const HEADLINE_METRICS: Record<string, string> = {
  'soil-health-ai': '94.2% Test Accuracy · CatBoost + EfficientNetB2 · Infosys Springboard',
  'road-safety-ai': '<30ms Edge Latency · YOLOv8 Edge Triage + ESP-NOW Protocol',
  'blood-connect': '<100ms Live Socket Telemetry · Geo-Spatial Blood Dispatch',
  'amazon-rag-chatbot': 'Sub-second Retrieval · Vector Search + LangChain Pipeline',
  'ecommerce-mern': 'Complete JWT Auth · Stripe Checkout · State Redux Architecture',
  'smart-attendance-system': 'Multi-VLAN Campus Verification · Timetable Automated Loop',
  'hostel-booking': 'Dynamic Bed Matrix · Real-time Payment & Room Allocation',
  'banking-system': 'ACID Transaction Engine · Thread-Safe Java JDBC Core',
};

interface ProjectCardProps {
  project: Project;
  idx: number;
  onSelect: (project: Project) => void;
  isHorizontal?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, idx, onSelect, isHorizontal = false }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const coverImg = project.coverImage || '/assets/projects/agriculture-ai/seedling-preview.webp';
  const metric = HEADLINE_METRICS[project.id];
  const formattedIndex = String(idx + 1).padStart(2, '0');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      data-cursor="view"
      className={`group relative rounded-3xl bg-[#14161E]/95 backdrop-blur-md border border-border-dark hover:border-cobalt/80 transition-all duration-300 shadow-subtle-card overflow-hidden flex flex-col justify-between ${
        isHorizontal ? 'w-[420px] sm:w-[500px] flex-shrink-0 h-[620px]' : 'w-full'
      }`}
    >
      {/* Ghost Background Number with Parallax */}
      <span className="absolute -top-4 -right-2 font-display font-black text-8xl sm:text-9xl text-white/[0.03] select-none pointer-events-none group-hover:text-cobalt/[0.07] transition-colors duration-500">
        {formattedIndex}
      </span>

      {/* Dynamic Cursor Spotlight Radial Glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 -z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(43, 89, 255, 0.18), transparent 70%)`,
        }}
      />

      {/* Media Container with Inner Parallax & Scale */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-black select-none">
        <motion.img
          layoutId={`project-image-${project.id}`}
          ref={imageRef}
          src={coverImg}
          alt={project.title}
          width={640}
          height={400}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14161E] via-[#14161E]/40 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/15 font-bold text-xs">
              SYSTEM {formattedIndex}
            </span>
            {idx < 3 && (
              <span className="px-2.5 py-1 rounded-full bg-acid-lime/20 text-acid-lime border border-acid-lime/30 font-bold text-xs flex items-center gap-1">
                <Sparkles size={11} /> FEATURED
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-cobalt/80 backdrop-blur-md text-white font-mono text-xs uppercase font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Metric Headline Overlay */}
        {metric && (
          <div className="absolute bottom-3 left-3.5 right-3.5">
            <div className="px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono text-acid-lime font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-acid-lime animate-pulse inline-block flex-shrink-0" />
              <span className="truncate">{metric}</span>
            </div>
          </div>
        )}
      </div>

      {/* Card Content & Meta */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4 relative z-10">
        
        <div className="space-y-2">
          <SplitReveal as="h3" type="words" duration={0.6} className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-cobalt-light transition-colors leading-snug">
            {project.title}
          </SplitReveal>

          <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed font-light line-clamp-3">
            {project.shortDescription}
          </p>
        </div>

        {/* Tech Stack Chips & Action Links */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded text-xs font-mono bg-white/5 border border-white/10 text-gray-300"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-1 text-xs font-mono text-gray-400">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Action Buttons: Primary Detailed View + Secondary GitHub */}
          <div className="pt-3 border-t border-border-dark space-y-2">
            <button
              onClick={() => onSelect(project)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cobalt hover:bg-cobalt-light text-white text-xs font-semibold transition-all shadow-md cursor-pointer"
            >
              <Layers size={13} />
              <span>Detailed Project View</span>
              <ArrowUpRight size={13} />
            </button>

            <a
              href={project.githubUrl || 'https://github.com/Arjunan-lab'}
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
};

export const ProjectsSection = () => {
  const [activeTag, setActiveTag] = useState<TagFilter>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const horizontalWrapperRef = useRef<HTMLDivElement | null>(null);

  const softwareProjects = PROJECTS;
  const totalProjects = PROJECTS.length;
  const openRepoCount = PROJECTS.filter((p) => Boolean(p.githubUrl)).length;

  const filteredProjects = softwareProjects.filter((p) => {
    if (activeTag === 'all') return true;
    return p.tags.includes(activeTag);
  });

  // Desktop Horizontal Scroll Pinning with ScrollTrigger
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const wrapper = horizontalWrapperRef.current;
    if (!section || !track || !wrapper) return;

    if (checkReducedMotion() || checkTouchDevice() || window.innerWidth < 1024) {
      return;
    }

    const ctx = gsap.context(() => {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 140);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
      });

      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: () => `+=${track.scrollWidth - window.innerWidth + 140}`,
        pin: true,
        animation: tween,
        scrub: 0.3,
        invalidateOnRefresh: true,
      });
    }, section);

    return () => ctx.revert();
  }, [filteredProjects.length]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 sm:py-32 border-t border-border-dark bg-[#0C0D11] text-white transition-colors duration-300 overflow-hidden"
    >
      {/* Background ambient illumination */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-cobalt/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4 border-b border-border-dark">
          
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-text-muted uppercase">
              <span className="w-2 h-2 rounded-full bg-cobalt inline-block animate-pulse" />
              <span>04 // SELECTED WORK &amp; SYSTEM REPOSITORIES</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-[60px] tracking-tight text-white leading-[1.05] uppercase">
              Turning ideas{' '}
              <span className="block">
                into{' '}
                <span className="font-serif-italic font-normal italic text-cobalt-light text-[1.08em] pr-1">
                  systems.
                </span>
              </span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-text-muted leading-relaxed font-light">
              Grounded engineering systems with verifiable architectures, real-time telemetry, and production codebases.
            </p>
          </div>

          {/* Explicit Tag Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {TAG_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTag(tab.value)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  activeTag === tab.value
                    ? 'bg-cobalt text-white font-bold shadow-cobalt-glow'
                    : 'bg-white/5 border border-border-dark text-text-muted hover:border-cobalt hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Horizontal Scroll Gallery Container (Desktop Pinned) */}
      <div ref={horizontalWrapperRef} className="hidden lg:block w-full pt-10 pb-6 overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-nowrap gap-8 px-6 sm:px-12 lg:px-16 will-change-transform"
        >
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              idx={idx}
              isHorizontal={true}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Mobile & Touch Fallback: Responsive Vertical Grid */}
      <div className="lg:hidden max-w-7xl mx-auto px-6 sm:px-12 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              idx={idx}
              isHorizontal={false}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Footer Navigation Link to Full Archive */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-border-dark mt-12 relative z-10">
        <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
          <span>{totalProjects} PRODUCTION REPOSITORIES</span>
          <span>•</span>
          <span className="text-acid-lime font-bold">ALL {openRepoCount} REPOSITORIES VERIFIED</span>
        </div>

        <Link
          to="/work"
          className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#14161E] border border-border-dark hover:border-cobalt text-white font-sans text-xs font-bold transition-all shadow-subtle-card"
        >
          <span>Explore All {totalProjects} Projects Archive</span>
          <ArrowRight size={14} className="text-cobalt-light group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Interactive Project Case Study Modal */}
      <ProjectModal
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  );
};
