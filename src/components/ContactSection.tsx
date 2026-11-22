import { useState, useRef } from 'react';
import { ArrowUpRight, Copy, Check, Mail, Phone, MapPin, Send, Download } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './ui/Icons';
import { CobaltRibbon3D } from './ui/CobaltRibbon3D';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useCornerConvergence } from '../motion/scrollMotion';

export const ContactSection = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const currentYear = new Date().getFullYear();

  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const artworkRef = useRef<HTMLDivElement | null>(null);
  const telemetryRef = useRef<HTMLDivElement | null>(null);

  useCornerConvergence({
    sectionRef,
    headingRef,
    textRef,
    artworkRef,
    telemetryRef,
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Direct mailto dispatch
    const mailtoSubject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const mailtoBody = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.open(`mailto:${PERSONAL_INFO.contact.email}?subject=${mailtoSubject}&body=${mailtoBody}`, '_blank');

    setSubmitted(true);
  };

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative pt-24 sm:pt-36 pb-12 px-6 sm:px-12 lg:px-16 border-t border-border-light dark:border-border-dark bg-canvas-light dark:bg-[#0C0D11] transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Contact Section Header & Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Massive Headline & Introduction */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-text-dimmed dark:text-text-muted uppercase">
              <span className="w-2 h-2 rounded-full bg-cobalt inline-block animate-pulse" />
              <span>07 // DIRECT CONTACT &amp; COLLABORATION</span>
            </div>

            <h2
              ref={headingRef}
              className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[84px] tracking-tighter leading-[0.92] text-text-black dark:text-white uppercase"
            >
              <span className="block">LET'S MAKE</span>
              <span className="block">SOMETHING</span>
              <span className="block text-cobalt dark:text-cobalt-light">MEANINGFUL.</span>
            </h2>

            <div ref={textRef} className="space-y-4">
              <p className="font-sans text-base sm:text-lg md:text-xl text-text-dimmed dark:text-text-muted font-normal max-w-lg leading-relaxed font-light">
                Have an ambitious idea, high-impact software engineering role, or research collaboration? Reach out directly.
              </p>
              
              <div className="flex items-center gap-2 text-xs font-mono text-text-dimmed dark:text-text-muted">
                <span className="w-2 h-2 rounded-full bg-acid-lime animate-pulse" />
                <span className="text-text-black dark:text-white font-semibold">TYPICAL RESPONSE TIME: WITHIN 24 HOURS</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Glossy Cobalt Sculpture */}
          <div ref={artworkRef} className="lg:col-span-5 flex justify-center items-center relative">
            <CobaltRibbon3D variant="contact" />
          </div>

        </div>

        {/* Two-Column Grid: Contact Details Cards & Direct Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column (5 cols): Verified Direct Contact Details Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Direct Email Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#14161E] border border-border-light dark:border-border-dark shadow-subtle-card space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-text-dimmed dark:text-text-muted">
                <span className="flex items-center gap-2 text-cobalt dark:text-cobalt-light font-bold">
                  <Mail size={14} /> DIRECT EMAIL
                </span>
                <span className="text-acid-lime font-bold">PRIMARY</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`mailto:${PERSONAL_INFO.contact.email}`}
                  className="font-mono text-sm sm:text-base font-bold text-text-black dark:text-white hover:text-cobalt transition-colors truncate"
                >
                  {PERSONAL_INFO.contact.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-canvas-light dark:bg-white/10 text-text-dimmed dark:text-gray-300 hover:text-text-black dark:hover:text-white hover:bg-border-light transition-all cursor-pointer shrink-0"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check size={14} className="text-acid-lime" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Direct Phone & WhatsApp Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#14161E] border border-border-light dark:border-border-dark shadow-subtle-card space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-text-dimmed dark:text-text-muted">
                <span className="flex items-center gap-2 text-cobalt dark:text-cobalt-light font-bold">
                  <Phone size={14} /> PHONE &amp; CALL
                </span>
                <span className="text-text-muted">AVAILABLE</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`tel:${PERSONAL_INFO.contact.phone.replace(/\s+/g, '')}`}
                  className="font-mono text-sm sm:text-base font-bold text-text-black dark:text-white hover:text-cobalt transition-colors"
                >
                  {PERSONAL_INFO.contact.phone}
                </a>
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="p-2 rounded-xl bg-canvas-light dark:bg-white/10 text-text-dimmed dark:text-gray-300 hover:text-text-black dark:hover:text-white hover:bg-border-light transition-all cursor-pointer shrink-0"
                  title="Copy Phone Number"
                >
                  {copiedPhone ? <Check size={14} className="text-acid-lime" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Location & Status Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#14161E] border border-border-light dark:border-border-dark shadow-subtle-card space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-text-dimmed dark:text-text-muted">
                <span className="flex items-center gap-2 text-cobalt dark:text-cobalt-light font-bold">
                  <MapPin size={14} /> BASE LOCATION
                </span>
                <span className="text-acid-lime font-bold">IST (UTC+5:30)</span>
              </div>
              <p className="font-display font-bold text-sm sm:text-base text-text-black dark:text-white">
                Coimbatore, Tamil Nadu, India
              </p>
              <p className="text-xs font-sans text-text-dimmed dark:text-gray-400 font-light">
                Available for on-site engineering roles in India and worldwide remote collaboration.
              </p>
            </div>

            {/* Quick Action Pills: LinkedIn, GitHub, Resume */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <a
                href={PERSONAL_INFO.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-[#14161E] text-text-black dark:text-white font-sans text-xs font-semibold hover:border-cobalt hover:text-cobalt dark:hover:text-cobalt-light transition-colors shadow-sm"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-cobalt" />
                <span>LinkedIn</span>
                <ArrowUpRight size={11} />
              </a>

              <a
                href={PERSONAL_INFO.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-[#14161E] text-text-black dark:text-white font-sans text-xs font-semibold hover:border-cobalt hover:text-cobalt dark:hover:text-cobalt-light transition-colors shadow-sm"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ArrowUpRight size={11} />
              </a>

              <a
                href={PERSONAL_INFO.contact.resumeUrl}
                download="Arjunan_V_Resume.pdf"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-cobalt hover:bg-cobalt-light text-white font-sans text-xs font-semibold transition-colors shadow-sm"
              >
                <Download size={12} />
                <span>Resume PDF</span>
              </a>
            </div>

          </div>

          {/* Right Column (7 cols): Direct Interactive Message Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#14161E] border border-border-light dark:border-border-dark shadow-subtle-card space-y-6">
            <div className="space-y-1 pb-2 border-b border-border-light dark:border-border-dark">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-text-black dark:text-white">
                Send a Direct Message
              </h3>
              <p className="text-xs font-mono text-text-dimmed dark:text-text-muted">
                FILL OUT THE FORM BELOW TO DISPATCH A DIRECT INQUIRY
              </p>
            </div>

            {submitted ? (
              <div className="py-12 px-6 rounded-2xl bg-acid-lime/10 border border-acid-lime/30 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-acid-lime/20 flex items-center justify-center mx-auto text-text-black dark:text-acid-lime">
                  <Check size={22} />
                </div>
                <h4 className="font-display font-bold text-xl text-text-black dark:text-white">
                  Message Dispatched!
                </h4>
                <p className="text-xs sm:text-sm font-sans text-text-dimmed dark:text-gray-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <span className="font-semibold text-text-black dark:text-white">{formData.name}</span>! I'll review your note and respond promptly to <span className="font-semibold text-text-black dark:text-white">{formData.email}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-full bg-text-black dark:bg-white text-white dark:text-text-black text-xs font-sans font-semibold hover:bg-cobalt dark:hover:bg-cobalt-light dark:hover:text-white transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-text-dimmed dark:text-text-muted block">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Rivera"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-canvas-light dark:bg-white/5 text-text-black dark:text-white text-sm focus:outline-none focus:border-cobalt transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-text-dimmed dark:text-text-muted block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-canvas-light dark:bg-white/5 text-text-black dark:text-white text-sm focus:outline-none focus:border-cobalt transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-text-dimmed dark:text-text-muted block">
                    Subject / Opportunity
                  </label>
                  <input
                    type="text"
                    placeholder="Full-Time Engineering Role / Project Collaboration / Advisory"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-canvas-light dark:bg-white/5 text-text-black dark:text-white text-sm focus:outline-none focus:border-cobalt transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-text-dimmed dark:text-text-muted block">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your project, team, or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-canvas-light dark:bg-white/5 text-text-black dark:text-white text-sm focus:outline-none focus:border-cobalt transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-text-black dark:bg-white text-white dark:text-text-black font-sans text-xs font-bold hover:bg-cobalt dark:hover:bg-cobalt-light dark:hover:text-white transition-colors cursor-pointer shadow-sm"
                >
                  <Send size={13} />
                  <span>Send Message Directly</span>
                </button>
              </form>
            )}

          </div>

        </div>

        {/* Footer Bottom Strip */}
        <div
          ref={telemetryRef}
          className="pt-8 border-t border-border-light dark:border-border-dark flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-text-dimmed dark:text-text-muted"
        >
          <span className="font-display font-bold text-text-black dark:text-white text-sm">
            ARJUNAN
          </span>

          <span className="font-sans text-text-muted dark:text-gray-400 italic">
            Built with curiosity and intention.
          </span>

          <span className="font-mono text-text-dimmed dark:text-text-muted">
            © {currentYear} Arjunan V • All Rights Reserved
          </span>
        </div>

      </div>
    </footer>
  );
};
