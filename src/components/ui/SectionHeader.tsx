import React from 'react';

interface SectionHeaderProps {
  number: string;
  label: string;
  headline: string;
  italicWord?: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  label,
  headline,
  italicWord,
  description,
  className = '',
  align = 'left'
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-16 md:mb-20 ${isCenter ? 'text-center mx-auto' : ''} ${className}`}>
      {/* Sleek Floating Pill Tag */}
      <div className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6 ${
        isCenter ? 'mx-auto' : ''
      }`}>
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
        <span className="font-mono text-xs uppercase tracking-widest text-gold font-medium">
          {number} — {label}
        </span>
      </div>

      {/* Main Poster Headline */}
      <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-ivory leading-[1.12]">
        {headline}{' '}
        {italicWord && (
          <span className="font-editorial italic font-normal text-gold text-glow-gold tracking-normal">
            {italicWord}
          </span>
        )}
      </h2>

      {/* Refined Description */}
      {description && (
        <p className={`mt-5 max-w-2xl text-base sm:text-lg text-stone-grey font-light leading-relaxed ${
          isCenter ? 'mx-auto' : ''
        }`}>
          {description}
        </p>
      )}
    </div>
  );
};
