import React from 'react';
import { Shield, Mic, CheckCircle, Clock, Database, FolderCheck } from 'lucide-react';
import type { Project } from '../../types';

interface ProjectJarvisProps {
  project: Project;
}

export const ProjectJarvis: React.FC<ProjectJarvisProps> = ({ project }) => {
  const implemented = project.status?.implemented || [];
  const planned = project.status?.planned || [];

  return (
    <article className="glass-card-prominent p-8 sm:p-12 lg:p-14 relative overflow-hidden group">
      {/* Top Crimson Accent Shimmer */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />

      {/* Project Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/[0.08] mb-10">
        <div className="flex items-center gap-4">
          <span className="font-mono text-2xl sm:text-3xl font-bold text-red-400">
            {project.number}
          </span>
          <div className="h-6 w-px bg-white/10" />
          <span className="font-mono text-xs uppercase tracking-widest text-red-400 font-medium">
            {project.category}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-stone-grey bg-white/[0.03] px-4 py-2 rounded-full border border-white/[0.08]">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span>DESKTOP INTELLIGENCE OS</span>
        </div>
      </div>

      {/* Headline & Paradigm */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-12">
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ivory">
            {project.title}
          </h3>
          <p className="text-base sm:text-lg text-stone-grey leading-relaxed font-light">
            {project.fullDescription}
          </p>
        </div>

        <div className="lg:col-span-4 p-5 rounded-2xl bg-red-950/20 border border-red-500/20 backdrop-blur-md">
          <span className="font-mono text-[11px] uppercase tracking-wider text-red-400 block mb-1 font-semibold">
            CORE PARADIGM
          </span>
          <p className="text-xs sm:text-sm text-stone-grey leading-relaxed">
            "Approval-First Desktop Automation: No background file mutations or system calls execute without explicit, cryptographically verifiable user confirmation."
          </p>
        </div>
      </div>

      {/* DARK IMMERSIVE DESKTOP INTERFACE VISUALIZATION */}
      <div className="mb-12 rounded-3xl bg-onyx/90 border border-white/10 overflow-hidden shadow-glass">
        
        {/* Native Window Titlebar */}
        <div className="bg-obsidian/90 px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-red-500/90 inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block shadow-sm" />
            <span className="ml-3 font-mono text-xs text-stone-grey/80">
              JARVIS // RUNTIME CORE v2.4-LOCAL
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-stone-grey/70">
            <span className="hidden sm:inline">RAM: 412 MB</span>
            <span className="text-red-400 flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
              <Shield size={12} /> SECURE SANDBOX
            </span>
          </div>
        </div>

        {/* Interior Telemetry */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Console: Acoustic Waveform (6 cols) */}
          <div className="md:col-span-6 rounded-2xl bg-white/[0.025] border border-white/[0.06] p-6 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-2 text-red-400 font-medium">
                <Mic size={14} /> AUDIO STREAMING (WHISPER)
              </span>
              <span className="text-gold text-[10px]">REALTIME API</span>
            </div>

            {/* Dynamic Waveform Bars */}
            <div className="h-16 flex items-center justify-between gap-1 px-4 bg-obsidian/70 rounded-xl border border-white/[0.06]">
              {[35, 65, 80, 45, 95, 30, 75, 85, 40, 60, 90, 70, 50, 85, 30, 45, 75, 90, 60, 40, 65, 85, 45, 70].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-red-600 to-red-400 rounded-full transition-all duration-300"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            <div className="text-[11px] font-mono text-stone-grey space-y-1.5 pt-1">
              <p className="flex justify-between">
                <span>VECTOR STORE:</span>
                <span className="text-ivory">ChromaDB (4,820 chunks)</span>
              </p>
              <p className="flex justify-between">
                <span>LOCAL INFERENCE:</span>
                <span className="text-ivory">Ollama / Qwen-2.5 7B</span>
              </p>
              <p className="flex justify-between">
                <span>IPC CHANNEL:</span>
                <span className="text-gold">Tauri Rust Core &lt;—&gt; React</span>
              </p>
            </div>
          </div>

          {/* Right Console: RAG Document Retrieval (6 cols) */}
          <div className="md:col-span-6 rounded-2xl bg-white/[0.025] border border-white/[0.06] p-6 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-2 text-gold font-medium">
                <Database size={14} /> KNOWLEDGE & CONTEXT RETRIEVAL
              </span>
              <span className="text-stone-grey text-[10px]">ACTIVE CACHE</span>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="p-3 rounded-xl bg-obsidian/70 border border-white/[0.06] flex items-center justify-between">
                <span className="text-stone-grey flex items-center gap-2 truncate">
                  <FolderCheck size={13} className="text-gold" />
                  Microscopy_Patent_Application.pdf
                </span>
                <span className="text-gold text-[10px] flex-shrink-0">INDEXED</span>
              </div>
              <div className="p-3 rounded-xl bg-obsidian/70 border border-white/[0.06] flex items-center justify-between">
                <span className="text-stone-grey flex items-center gap-2 truncate">
                  <FolderCheck size={13} className="text-gold" />
                  Infosys_Soil_Model_Weights.bin
                </span>
                <span className="text-gold text-[10px] flex-shrink-0">EMBEDDED</span>
              </div>
              <div className="p-3 rounded-xl bg-obsidian/70 border border-white/[0.06] flex items-center justify-between">
                <span className="text-stone-grey flex items-center gap-2 truncate">
                  <FolderCheck size={13} className="text-gold" />
                  ESP_NOW_Firmware_Source.cpp
                </span>
                <span className="text-gold text-[10px] flex-shrink-0">PARSED</span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-stone-grey/60 pt-1">
              Context window: 32k tokens // Sub-second semantic vector lookups
            </div>
          </div>

        </div>
      </div>

      {/* CRITICAL SECTION: CLEAR DISTINCTION BETWEEN IMPLEMENTED VS PLANNED */}
      <div className="rounded-3xl bg-white/[0.02] border border-white/[0.08] p-7 sm:p-9 mb-10">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-gold">
              AUTHENTICITY & STATUS REPORT
            </span>
            <h4 className="text-lg sm:text-xl font-medium text-ivory mt-1">
              Feature Maturity & Roadmap Decomposition
            </h4>
          </div>
          <span className="font-mono text-xs text-stone-grey/70 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
            AUDITED: ZERO EXAGGERATION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Implemented Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gold font-semibold pb-2 border-b border-gold/30">
              <CheckCircle size={14} className="text-gold" />
              <span>IMPLEMENTED FUNCTIONALITY</span>
            </div>
            <ul className="space-y-2.5">
              {implemented.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-grey">
                  <span className="font-mono text-gold font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Planned Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-red-400 font-semibold pb-2 border-b border-red-500/30">
              <Clock size={14} className="text-red-400" />
              <span>IN ACTIVE DEVELOPMENT / PLANNED</span>
            </div>
            <ul className="space-y-2.5">
              {planned.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-grey">
                  <span className="font-mono text-red-400 font-bold mt-0.5">○</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Tech Stack Pills */}
      <div className="pt-4 border-t border-white/[0.08]">
        <span className="block font-mono text-[11px] uppercase tracking-wider text-stone-grey/60 mb-3">
          PLANNED & ACTIVE ARCHITECTURE STACK
        </span>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-stone-grey hover:border-red-400/50 hover:text-ivory transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

    </article>
  );
};
