import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Mic, Shield, Database, FolderCheck, CheckCircle2, Clock, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../components/ui/Icons';
import { PROJECTS } from '../data/portfolioData';

export const Jarvis = () => {
  const project = PROJECTS[2];
  const implemented = project.status?.implemented || [];
  const planned = project.status?.planned || [];

  return (
    <div className="min-h-screen bg-canvas-dark text-white pt-28 pb-20 px-6 sm:px-12 lg:px-16 selection:bg-cobalt selection:text-white">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-mono text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to All Projects</span>
          </Link>

          <span className="font-mono text-xs text-coral uppercase tracking-widest font-bold">
            CASE STUDY // 03
          </span>
        </div>

        {/* Project Hero Banner */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coral/15 border border-coral/30 text-xs font-mono text-coral">
            <Mic size={12} />
            <span>AI / DESKTOP SOFTWARE / INTELLIGENT OS</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-[72px] tracking-tight text-white leading-tight">
            {project.title}
          </h1>

          <p className="font-sans text-lg sm:text-xl text-white/80 leading-relaxed font-light">
            {project.fullDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="https://github.com/Arjunan-lab/JARVIS-Autonomous-AI-Desktop-Assistant"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-canvas-dark font-sans text-xs font-bold hover:bg-cobalt hover:text-white transition-all shadow-sm"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Explore GitHub Repository</span>
              <ExternalLink size={13} />
            </a>

            <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80">
              <Shield size={13} className="text-acid-lime" />
              <span>APPROVAL-FIRST AUTOMATION LAYER</span>
            </div>
          </div>
        </div>

        {/* Acoustic Waveform & Telemetry Screen */}
        <div className="rounded-3xl bg-canvas-dark-elevated border border-white/15 p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-white/80 font-bold uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-coral animate-pulse" />
              <span>DESKTOP INTELLIGENCE RUNTIME TELEMETRY</span>
            </div>
            <span className="font-mono text-xs text-white/50">LOCAL PRIVACY MODE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Audio Waveform */}
            <div className="p-6 rounded-2xl bg-black border border-white/10 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-coral flex items-center gap-2 font-bold">
                  <Mic size={14} /> VOICE TELEMETRY (WHISPER)
                </span>
                <span className="text-acid-lime">32k CONTEXT</span>
              </div>

              <div className="h-20 flex items-center justify-between gap-1 px-4 bg-canvas-dark rounded-xl border border-white/10">
                {[45, 80, 95, 55, 100, 35, 85, 95, 45, 70, 90, 80, 60, 95, 35, 55, 85, 95, 70, 50, 75, 90, 55, 80].map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-cobalt rounded-full transition-all duration-300"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              <p className="text-xs font-mono text-white/60">
                Bidirectional IPC streaming between Tauri 2 Rust Core and React UI.
              </p>
            </div>

            {/* ChromaDB RAG Telemetry */}
            <div className="p-6 rounded-2xl bg-black border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cobalt flex items-center gap-2 font-bold">
                  <Database size={14} /> VECTOR REPOSITORY (CHROMADB)
                </span>
                <span className="text-acid-lime">4,820 CHUNKS</span>
              </div>

              <div className="space-y-2 text-xs font-mono text-white/70">
                <div className="p-2.5 rounded-lg bg-canvas-dark border border-white/10 flex justify-between">
                  <span className="flex items-center gap-2"><FolderCheck size={12} className="text-acid-lime" /> System_Architecture_Spec.pdf</span>
                  <span className="text-acid-lime">INDEXED</span>
                </div>
                <div className="p-2.5 rounded-lg bg-canvas-dark border border-white/10 flex justify-between">
                  <span className="flex items-center gap-2"><FolderCheck size={12} className="text-acid-lime" /> Infosys_Soil_Model.bin</span>
                  <span className="text-acid-lime">EMBEDDED</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Implemented vs Planned Roadmap Audit */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/10 space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-acid-lime font-bold">
                ROADMAP MATURITY REPORT
              </span>
              <h2 className="font-display font-bold text-2xl text-white mt-1">
                Distinguishing Implemented vs Proposed Features
              </h2>
            </div>
            <span className="font-mono text-xs text-white/60">AUDITED CAPABILITIES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-acid-lime font-bold flex items-center gap-2">
                <CheckCircle2 size={14} />
                CURRENTLY IMPLEMENTED & FUNCTIONAL
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-white/80 font-mono">
                {implemented.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-acid-lime font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-coral font-bold flex items-center gap-2">
                <Clock size={14} />
                IN ACTIVE DEVELOPMENT / FUTURE MILESTONES
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-white/70 font-mono">
                {planned.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-coral font-bold">○</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="pt-8 border-t border-white/10 space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-white/60 block">
            DESKTOP RUNTIME & INFERENCE STACK
          </span>
          <div className="flex flex-wrap gap-2.5">
            {project.techStack.map(t => (
              <span
                key={t}
                className="text-xs font-mono px-4 py-2 rounded-full bg-white/5 border border-white/15 text-white"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Project Navigation */}
        <div className="pt-12 border-t border-white/10 flex items-center justify-between">
          <Link
            to="/work/soil-health"
            className="inline-flex items-center gap-2 text-xs font-mono text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Previous: Soil Health AI</span>
          </Link>

          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-mono text-acid-lime font-bold hover:underline"
          >
            <span>Back to All Projects</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
};

