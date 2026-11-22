import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, Cpu, Database, Sparkles } from 'lucide-react';
import { GithubIcon } from '../components/ui/Icons';
import { PROJECTS } from '../data/portfolioData';

export const SoilHealth = () => {
  const project = PROJECTS[0];

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

          <span className="font-mono text-xs text-acid-lime uppercase tracking-widest font-bold">
            CASE STUDY // 01
          </span>
        </div>

        {/* Project Hero Banner */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cobalt/20 border border-cobalt/40 text-xs font-mono text-cobalt-light">
            <Sparkles size={12} />
            <span>AI / MACHINE LEARNING / BACKEND</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-[72px] tracking-tight text-white leading-tight">
            {project.title}
          </h1>

          <p className="font-sans text-lg sm:text-xl text-white/80 leading-relaxed font-light">
            {project.fullDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="https://github.com/Arjunan-lab/AgriSense-AI-Soil-Health-Crop-Recommendation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-canvas-dark font-sans text-xs font-bold hover:bg-cobalt hover:text-white transition-all shadow-sm"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Explore GitHub Repository</span>
              <ExternalLink size={13} />
            </a>

            <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80">
              <span className="w-2 h-2 rounded-full bg-acid-lime animate-pulse" />
              <span>INFOSYS SPRINGBOARD MENTORED</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Mockup */}
        <div className="rounded-3xl overflow-hidden bg-canvas-dark-elevated border border-white/15 p-4 sm:p-8 shadow-2xl relative">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-black relative">
            <img
              src="/assets/projects/agriculture-ai/soil-prediction-1.webp"
              alt="Soil Health Dashboard Telemetry"
              width={1280}
              height={720}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas-dark via-transparent to-transparent pointer-events-none" />
          </div>
          <div className="mt-4 px-2 flex justify-between text-xs font-mono text-white/60">
            <span className="text-acid-lime">FIGURE 01: REAL-TIME AGRONOMIC INFERENCE HUD</span>
            <span>MODEL: CATBOOST + EFFICIENTNETB2</span>
          </div>
        </div>

        {/* Problem vs Solution Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-coral font-bold block">
              THE PROBLEM STATEMENT
            </span>
            <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed font-light">
              {project.problemStatement}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-acid-lime font-bold block">
              THE TECHNICAL SOLUTION
            </span>
            <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed font-light">
              {project.technicalApproach}
            </p>
          </div>
        </div>

        {/* Deep Dive Architecture & Models */}
        <div className="space-y-6 pt-8 border-t border-white/10">
          <div className="flex items-center gap-3">
            <Cpu size={16} className="text-cobalt" />
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              System Architecture & Machine Learning Pipelines
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-canvas-dark-elevated border border-white/10 space-y-3">
              <span className="font-mono text-xs text-acid-lime font-bold block">
                01 // COMPUTER VISION
              </span>
              <h3 className="font-display font-bold text-lg text-white">EfficientNetB2 Backbone</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Fine-tuned transfer learning network classifying soil textural classes with high precision under diverse natural illumination.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-canvas-dark-elevated border border-white/10 space-y-3">
              <span className="font-mono text-xs text-cobalt font-bold block">
                02 // ENSEMBLE REGRESSOR
              </span>
              <h3 className="font-display font-bold text-lg text-white">CatBoost Multi-Target</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Predicts optimal crop viability alongside quantitative nitrogen (N), phosphorus (P), and potassium (K) deficiency indices.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-canvas-dark-elevated border border-white/10 space-y-3">
              <span className="font-mono text-xs text-coral font-bold block">
                03 // BACKGROUND WORKERS
              </span>
              <h3 className="font-display font-bold text-lg text-white">Celery & OpenWeather</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Asynchronous Redis message queue offloading deep neural inferences and querying hyper-local meteorological forecasts in real-time.
              </p>
            </div>
          </div>
        </div>

        {/* Implementation Screenshots Grid */}
        <div className="space-y-6 pt-8 border-t border-white/10">
          <div className="flex items-center gap-3">
            <Database size={16} className="text-acid-lime" />
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Validation Telemetry & Accuracy Convergence
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden bg-black border border-white/10 p-2 space-y-2">
              <div className="aspect-[16/10] overflow-hidden rounded-xl bg-surface-black">
                <img
                  src="/assets/projects/agriculture-ai/soil-model-eval.webp"
                  alt="Model Evaluation Metrics"
                  width={640}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <p className="px-2 text-xs font-mono text-white/70">
                Figure 2: Statistical evaluation matrix & cross-validation scores
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden bg-black border border-white/10 p-2 space-y-2">
              <div className="aspect-[16/10] overflow-hidden rounded-xl bg-surface-black">
                <img
                  src="/assets/projects/agriculture-ai/soil-accuracy.webp"
                  alt="Accuracy Curves"
                  width={640}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <p className="px-2 text-xs font-mono text-white/70">
                Figure 3: Training convergence curves across epoch checkpoints
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="pt-8 border-t border-white/10 space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-white/60 block">
            PRODUCTION TECHNOLOGY STACK
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
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-mono text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>All Projects</span>
          </Link>

          <Link
            to="/work/jarvis"
            className="inline-flex items-center gap-2 text-xs font-mono text-acid-lime font-bold hover:underline"
          >
            <span>Next: JARVIS AI Assistant</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
};

