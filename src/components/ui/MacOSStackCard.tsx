import React, { useState } from 'react';
import { Layers, ExternalLink, Sparkles, Eye, CheckCircle2 } from 'lucide-react';

interface MacOSStackCardProps {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  certificateSrc: string;
  certificateTitle: string;
  badgeLabel?: string;
  pdfUrl?: string;
  onInspect?: (src: string, title: string) => void;
}

export const MacOSStackCard: React.FC<MacOSStackCardProps> = ({
  title,
  organization,
  period,
  description,
  certificateSrc,
  certificateTitle,
  badgeLabel = "OFFICIAL CREDENTIAL",
  pdfUrl,
  onInspect
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group pt-10 sm:pt-14 select-none cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onInspect?.(certificateSrc, certificateTitle)}
    >
      
      {/* ------------------------------------------------------------- */}
      {/* LAYER 01 (Deep Background macOS Stack Shadow Plate)           */}
      {/* ------------------------------------------------------------- */}
      <div
        className={`absolute inset-x-4 top-4 bottom-2 rounded-3xl bg-white/40 dark:bg-white/[0.02] border border-border-light/60 dark:border-white/5 shadow-sm transition-all duration-500 ease-out pointer-events-none ${
          isHovered
            ? '-translate-y-14 rotate-[3deg] scale-[0.97] opacity-80'
            : 'translate-y-1 -rotate-[1.5deg] scale-[0.95] opacity-50'
        }`}
      />

      {/* ------------------------------------------------------------- */}
      {/* LAYER 02: THE MACOS CERTIFICATE STACK (BEHIND THE CARD)        */}
      {/* ------------------------------------------------------------- */}
      <div
        className={`absolute inset-x-2 sm:inset-x-3 top-0 h-48 sm:h-56 rounded-2xl overflow-hidden border border-cobalt/40 dark:border-cobalt/50 bg-[#FAFAF8] dark:bg-[#15171F] shadow-xl transition-all duration-500 ease-out z-10 flex flex-col justify-between ${
          isHovered
            ? '-translate-y-28 sm:-translate-y-36 -rotate-[2deg] scale-[1.04] shadow-2xl z-30 ring-2 ring-cobalt/40'
            : '-translate-y-4 rotate-[1.5deg] scale-[0.97] opacity-85'
        }`}
      >
        {/* Certificate Image Preview */}
        <div className="relative w-full h-full overflow-hidden bg-text-black">
          <img
            src={certificateSrc}
            alt={certificateTitle}
            width={480}
            height={220}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* macOS Style Stack Tag on the Certificate */}
          <div className="absolute top-2.5 left-3 right-3 flex items-center justify-between text-xs font-mono font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
            <span className="flex items-center gap-1 text-acid-lime">
              <Sparkles size={11} /> {badgeLabel}
            </span>
            <span className="flex items-center gap-1 text-white/80">
              <Eye size={11} /> CLICK TO ZOOM
            </span>
          </div>

          {/* Certificate Title Badge */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs font-sans font-semibold text-white">
            <span className="truncate pr-2">{certificateTitle}</span>
            <span className="text-xs font-mono text-acid-lime bg-black/70 px-2 py-0.5 rounded-full flex-shrink-0">
              VERIFIED
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* LAYER 03: FOREGROUND METRIC & TEXT CARD (MACOS STACK FRONT)  */}
      {/* ------------------------------------------------------------- */}
      <div
        className={`relative z-20 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14161E] border border-border-light dark:border-border-dark group-hover:border-cobalt dark:group-hover:border-cobalt transition-all duration-300 shadow-subtle-card group-hover:shadow-elevated space-y-3 backdrop-blur-sm ${
          isHovered ? 'translate-y-1' : ''
        }`}
      >
        {/* Top Header Row with macOS Stack Indicator Pill */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-cobalt dark:text-cobalt-light px-2.5 py-0.5 rounded-full bg-cobalt/10">
              {period}
            </span>
            <span className="font-mono text-xs text-text-dimmed dark:text-text-muted">
              {organization}
            </span>
          </div>

          {/* macOS Stack Interactive Indicator */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-canvas-light dark:bg-white/5 border border-border-light dark:border-white/10 text-xs font-mono text-text-muted dark:text-gray-400 group-hover:bg-cobalt group-hover:text-white group-hover:border-cobalt transition-all duration-300">
            <Layers size={12} className={isHovered ? 'animate-bounce text-acid-lime' : ''} />
            <span>{isHovered ? 'STACK EXPANDED' : 'HOVER TO FAN STACK'}</span>
          </div>
        </div>

        {/* Milestone Title */}
        <h3 className="font-display font-bold text-xl sm:text-2xl text-text-black dark:text-white group-hover:text-cobalt dark:group-hover:text-cobalt-light transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="font-sans text-xs sm:text-sm text-text-dimmed dark:text-gray-300 font-light leading-relaxed">
          {description}
        </p>

        {/* Bottom Interactive Action Prompt */}
        <div className="pt-3 border-t border-border-light dark:border-border-dark flex items-center justify-between text-xs font-mono text-text-muted dark:text-gray-400">
          <span className="flex items-center gap-1 text-acid-lime font-bold">
            <CheckCircle2 size={12} /> AUTHENTICATED
          </span>

          {pdfUrl ? (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-cobalt dark:text-cobalt-light hover:underline font-semibold"
            >
              <span>Official Gazette PDF</span>
              <ExternalLink size={11} />
            </a>
          ) : (
            <span className="text-cobalt dark:text-cobalt-light font-medium group-hover:underline flex items-center gap-1">
              <span>View Credential</span>
              <ExternalLink size={10} />
            </span>
          )}
        </div>
      </div>

    </div>
  );
};

