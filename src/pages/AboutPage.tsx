import { Link } from 'react-router-dom';
import { ArrowLeft, Award, GraduationCap, Compass, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO, PRINCIPLES } from '../data/portfolioData';
import { CobaltRibbon3D } from '../components/ui/CobaltRibbon3D';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-canvas-light dark:bg-[#0C0D11] text-text-black dark:text-white pt-32 pb-24 px-6 sm:px-12 lg:px-16 selection:bg-cobalt selection:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* Navigation */}
        <div className="flex items-center justify-between pb-6 border-b border-border-light dark:border-border-dark">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-dimmed dark:text-text-muted hover:text-text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Overview</span>
          </Link>
          <span className="font-mono text-xs uppercase tracking-widest text-cobalt dark:text-cobalt-light font-bold">
            PROFILE // 01
          </span>
        </div>

        {/* Header */}
        <div className="space-y-6 max-w-4xl">
          <span className="font-mono text-xs text-text-dimmed dark:text-text-muted uppercase tracking-widest">
            01 — ABOUT ME
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-[76px] tracking-tight leading-[1.04]">
            Curious by nature.{' '}
            <span className="block">
              An{' '}
              <span className="font-serif-italic font-normal italic text-cobalt dark:text-cobalt-light text-[1.08em] pr-1">
                engineer
              </span>{' '}
              by practice.
            </span>
          </h1>
          <p className="font-sans text-lg sm:text-2xl text-text-dimmed dark:text-text-muted leading-relaxed font-light">
            I'm an Information Technology undergraduate who enjoys turning ideas into functional digital products. My interests span full-stack engineering, artificial intelligence, and product development.
          </p>
        </div>

        {/* Two-Column Grid: 3D Geodesic Crystal & Academic Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Unique 3D Polyhedral Sculpture for About Page */}
          <div className="lg:col-span-6 flex justify-center items-center relative">
            <CobaltRibbon3D variant="about" />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-[#14161E] border border-border-light dark:border-border-dark shadow-subtle-card space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-border-light dark:border-border-dark">
                <span className="font-mono text-xs text-cobalt dark:text-cobalt-light font-bold uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap size={16} />
                  ACADEMIC FOUNDATION
                </span>
                <span className="px-3 py-1 rounded-full bg-acid-lime/20 text-text-black dark:text-acid-lime font-mono text-xs font-bold border border-acid-lime/40 flex items-center gap-1">
                  <Award size={12} /> CGPA 8.42
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <span className="text-[11px] font-mono text-text-muted dark:text-gray-400 uppercase block mb-1">DEGREE</span>
                  <p className="font-display font-bold text-text-black dark:text-white text-base">{PERSONAL_INFO.education.degree}</p>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-text-muted dark:text-gray-400 uppercase block mb-1">INSTITUTION</span>
                  <p className="font-display font-bold text-text-black dark:text-white text-base">{PERSONAL_INFO.education.institution}</p>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-text-muted dark:text-gray-400 uppercase block mb-1">CURRENT YEAR</span>
                  <p className="font-display font-bold text-text-black dark:text-white text-base">{PERSONAL_INFO.education.year}</p>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-text-muted dark:text-gray-400 uppercase block mb-1">LOCATION</span>
                  <p className="font-display font-bold text-text-black dark:text-white text-base">{PERSONAL_INFO.location}</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-[#14161E] border border-border-light dark:border-border-dark shadow-subtle-card space-y-3">
              <span className="font-mono text-xs text-cobalt dark:text-cobalt-light font-bold uppercase tracking-wider flex items-center gap-2">
                <Compass size={16} />
                PRODUCT MINDSET
              </span>
              <p className="text-sm text-text-dimmed dark:text-gray-300 leading-relaxed font-light">
                "{PERSONAL_INFO.brandStatement}"
              </p>
            </div>
          </div>

        </div>

        {/* Principles Grid */}
        <div className="space-y-8 pt-8">
          <div className="flex items-center justify-between pb-4 border-b border-border-light dark:border-border-dark">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-text-black dark:text-white">
              Core Engineering Principles
            </h2>
            <span className="font-mono text-xs text-text-dimmed dark:text-text-muted">
              ARCHITECTURAL FOUNDATIONS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRINCIPLES.map((principle) => (
              <div
                key={principle.number}
                className="p-8 rounded-3xl bg-white dark:bg-[#14161E] border border-border-light dark:border-border-dark space-y-4 hover:border-cobalt transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-cobalt dark:text-cobalt-light">
                    {principle.number} //
                  </span>
                  <h3 className="font-display font-bold text-xl text-text-black dark:text-white">
                    {principle.title}
                  </h3>
                </div>
                <p className="text-sm font-sans text-text-dimmed dark:text-gray-300 leading-relaxed font-light">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA to Projects */}
        <div className="pt-12 border-t border-border-light dark:border-border-dark flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-dimmed dark:text-text-muted hover:text-text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Overview</span>
          </Link>

          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-mono text-cobalt dark:text-cobalt-light font-bold hover:underline"
          >
            <span>Explore Engineering Work</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
};
