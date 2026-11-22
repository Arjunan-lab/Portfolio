import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Copy, Check, Mail, Phone, MapPin, Download, EyeOff, Eye } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LinkedinIcon, GithubIcon } from './ui/Icons';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactForm } from './ContactForm';
import { ScrollToTopRing } from './ui/ScrollToTopRing';
import { useLenis } from '../motion/SmoothScrollContext';
import { checkReducedMotion } from '../motion/tokens';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ContactSection = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const { isReducedMotion, toggleReducedMotion } = useLenis();

  const currentYear = 2026;

  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const driftLineRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const driftLine = driftLineRef.current;
    if (!section || !driftLine || checkReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Horizontal scrubbed drift on the last headline line
      gsap.to(driftLine, {
        x: -45,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom top',
          scrub: 0.3,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.contact.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative pt-24 sm:pt-36 pb-12 px-6 sm:px-12 lg:px-16 border-t border-border-dark bg-[#0C0D11] text-white transition-colors duration-300 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cobalt/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Screen-reader live region for copy confirmations */}
      <div aria-live="polite" className="sr-only">
        {copiedEmail ? 'Email address copied to clipboard.' : copiedPhone ? 'Phone number copied to clipboard.' : ''}
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header with Giant Outcome Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-border-dark">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cobalt-light uppercase">
              <span className="w-2 h-2 rounded-full bg-acid-lime inline-block animate-pulse" />
              <span>07 // DIRECT CONTACT &amp; COLLABORATION</span>
            </div>

            <h2
              ref={headingRef}
              className="font-display font-black text-4xl sm:text-6xl lg:text-[76px] tracking-tight text-white leading-[1.02] uppercase"
            >
              Let's make{' '}
              <span className="block">
                something{' '}
                <span
                  ref={driftLineRef}
                  className="contact-drift-line inline-block font-serif-italic font-normal italic text-cobalt-light tracking-normal text-[1.08em] pr-1 will-change-transform"
                >
                  meaningful.
                </span>
              </span>
            </h2>
          </div>

          <div className="space-y-3 max-w-md">
            <p className="font-sans text-sm sm:text-base text-text-muted leading-relaxed font-light">
              Available for full-time software engineering roles, high-impact AI/ML product development, and technical collaboration.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-acid-lime font-bold">
              <span className="w-2 h-2 rounded-full bg-acid-lime inline-block" />
              <span>ACTIVE AVAILABILITY // GUARANTEED 24-HR RESPONSE</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid: Direct Details on Left, Message Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Contact Points & Telemetry (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Email Card */}
            <div className="p-6 rounded-2xl bg-[#14161E] border border-border-dark shadow-subtle-card space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-text-muted">
                <span className="flex items-center gap-2 text-cobalt-light font-bold">
                  <Mail size={14} /> DIRECT EMAIL
                </span>
                <span className="text-acid-lime font-bold">PRIMARY</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`mailto:${PERSONAL_INFO.contact.email}`}
                  className="font-mono text-sm sm:text-base font-bold text-white hover:text-cobalt-light transition-colors truncate"
                >
                  {PERSONAL_INFO.contact.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-all cursor-pointer shrink-0"
                  aria-label="Copy email address to clipboard"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check size={14} className="text-acid-lime" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Direct Phone Card */}
            <div className="p-6 rounded-2xl bg-[#14161E] border border-border-dark shadow-subtle-card space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-text-muted">
                <span className="flex items-center gap-2 text-cobalt-light font-bold">
                  <Phone size={14} /> VOICE &amp; WHATSAPP
                </span>
                <span className="text-gray-400">TELEPHONY</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`tel:${PERSONAL_INFO.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="font-mono text-sm sm:text-base font-bold text-white hover:text-cobalt-light transition-colors truncate"
                >
                  {PERSONAL_INFO.contact.phone}
                </a>
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="p-2 rounded-xl bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-all cursor-pointer shrink-0"
                  aria-label="Copy phone number to clipboard"
                  title="Copy Phone"
                >
                  {copiedPhone ? <Check size={14} className="text-acid-lime" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Location & Timezone Card */}
            <div className="p-6 rounded-2xl bg-[#14161E] border border-border-dark shadow-subtle-card space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-text-muted">
                <span className="flex items-center gap-2 text-cobalt-light font-bold">
                  <MapPin size={14} /> LOCATION &amp; TIMEZONE
                </span>
                <span className="text-gray-400">UTC +05:30 (IST)</span>
              </div>
              <div className="font-mono text-sm sm:text-base text-white font-bold">
                {PERSONAL_INFO.location}
              </div>
            </div>

            {/* Social Channels Row */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={PERSONAL_INFO.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#14161E] border border-border-dark hover:border-cobalt text-white hover:text-cobalt-light flex items-center justify-center gap-2 text-xs font-sans font-semibold transition-all shadow-subtle-card"
                aria-label="Visit LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4 text-cobalt-light" />
                <span>LinkedIn</span>
                <ArrowUpRight size={12} />
              </a>

              <a
                href={PERSONAL_INFO.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#14161E] border border-border-dark hover:border-cobalt text-white hover:text-cobalt-light flex items-center justify-center gap-2 text-xs font-sans font-semibold transition-all shadow-subtle-card"
                aria-label="Visit GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
                <ArrowUpRight size={12} />
              </a>
            </div>

            {/* Quick Resume Download Banner */}
            <a
              href={PERSONAL_INFO.contact.resumeUrl}
              download
              className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-white text-text-black text-xs font-sans font-bold hover:bg-cobalt hover:text-white transition-all shadow-subtle-card cursor-pointer"
            >
              <Download size={14} />
              <span>Download Verified Resume (PDF)</span>
            </a>

          </div>

          {/* Right Column: Direct Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#14161E] p-8 sm:p-12 rounded-3xl border border-border-dark shadow-subtle-card space-y-6">
            <div className="space-y-2">
              <h3 className="font-display font-black text-2xl text-white">
                Send a Direct Message
              </h3>
              <p className="text-xs font-mono text-text-muted">
                FILL OUT THE FORM BELOW // PROMPT RESPONSE WITHIN 24 HOURS
              </p>
            </div>

            <ContactForm idPrefix="section" />
          </div>

        </div>

        {/* Bottom Credits, A11y Motion Toggle, & Scroll-to-Top Ring */}
        <div className="pt-10 border-t border-border-dark flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-text-muted">
          <div>
            <span>ARJUNAN — {PERSONAL_INFO.roleTitle}</span>
          </div>

          <div className="flex items-center gap-6">
            {/* Reduced Motion Toggle Button */}
            <button
              onClick={toggleReducedMotion}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-dark hover:border-cobalt text-text-muted hover:text-white transition-colors cursor-pointer"
              title="Toggle Reduced Motion mode"
              aria-label={isReducedMotion ? 'Enable smooth animations' : 'Reduce animations and motion'}
            >
              {isReducedMotion ? (
                <>
                  <Eye size={12} className="text-acid-lime" />
                  <span>Reduced Motion: ON</span>
                </>
              ) : (
                <>
                  <EyeOff size={12} className="text-cobalt-light" />
                  <span>Reduce Motion</span>
                </>
              )}
            </button>

            <span>© {currentYear} All rights reserved. Grounded Systems &amp; Modern AI.</span>
          </div>

          {/* Smooth Scroll-To-Top Circular Progress Ring */}
          <div>
            <ScrollToTopRing />
          </div>
        </div>

      </div>
    </footer>
  );
};
