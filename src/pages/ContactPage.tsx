import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Copy, Check, Send, Mail, MapPin, Phone } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/ui/Icons';
import { PERSONAL_INFO } from '../data/portfolioData';
import { CobaltRibbon3D } from '../components/ui/CobaltRibbon3D';

export const ContactPage = () => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0C0D11] text-white pt-32 pb-24 px-6 sm:px-12 lg:px-16 selection:bg-cobalt selection:text-white">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* Navigation */}
        <div className="flex items-center justify-between pb-6 border-b border-border-dark">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Overview</span>
          </Link>
          <span className="font-mono text-xs uppercase tracking-widest text-cobalt-light font-bold">
            DIRECT COLLABORATION // 06
          </span>
        </div>

        {/* Header */}
        <div className="space-y-6 max-w-4xl">
          <span className="font-mono text-xs text-text-muted uppercase tracking-widest">
            06 — LET'S CONNECT
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-[76px] tracking-tight leading-[1.04]">
            Let's make{' '}
            <span className="block">
              something{' '}
              <span className="font-serif-italic font-normal italic text-cobalt-light text-[1.08em] pr-1">
                meaningful.
              </span>
            </span>
          </h1>
          <p className="font-sans text-lg sm:text-2xl text-text-muted leading-relaxed font-light">
            I'm currently seeking high-impact software engineering opportunities, product internships, and technical collaborations. Let's discuss what we can build together.
          </p>
        </div>

        {/* Main Grid: Form on Left, Contact Details & 3D Ribbon on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#14161E] p-8 sm:p-12 rounded-3xl border border-border-dark shadow-subtle-card space-y-8">
            <div className="space-y-2">
              <h2 className="font-display font-black text-2xl text-white">
                Send a Direct Message
              </h2>
              <p className="text-xs font-mono text-text-muted">
                RESPONSE TIME: TYPICALLY WITHIN 24 HOURS
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-acid-lime/10 border border-acid-lime/30 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-acid-lime/20 flex items-center justify-center mx-auto text-acid-lime">
                  <Check size={24} />
                </div>
                <h3 className="font-display font-bold text-xl text-white">
                  Message Dispatched!
                </h3>
                <p className="text-sm font-sans text-gray-300 max-w-md mx-auto">
                  Thank you for reaching out, {formData.name || 'there'}! I'll review your note and get back to you promptly at {formData.email}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-full bg-white text-text-black text-xs font-sans font-semibold hover:bg-cobalt hover:text-white transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-text-muted uppercase">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Rivera"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-border-dark bg-white/5 text-white text-sm focus:outline-none focus:border-cobalt transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-text-muted uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-border-dark bg-white/5 text-white text-sm focus:outline-none focus:border-cobalt transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-text-muted uppercase">Subject / Intent</label>
                  <input
                    type="text"
                    required
                    placeholder="Full-time Opportunity / Project Collaboration / Advisory"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-border-dark bg-white/5 text-white text-sm focus:outline-none focus:border-cobalt transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-text-muted uppercase">Message</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell me about your project, team, or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-border-dark bg-white/5 text-white text-sm focus:outline-none focus:border-cobalt transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-white text-text-black font-sans text-xs font-bold hover:bg-cobalt hover:text-white transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Send size={14} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Verified Details & Quick Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Status Card */}
            <div className="p-8 rounded-3xl bg-[#14161E] border border-border-dark shadow-subtle-card space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                <span className="w-2.5 h-2.5 rounded-full bg-acid-lime animate-pulse" />
                <span className="font-bold text-white uppercase">CURRENT STATUS</span>
              </div>
              <p className="font-sans text-sm text-gray-300 leading-relaxed">
                Available for internships, full-time junior engineering roles (starting 2026/2027), and technical projects.
              </p>
            </div>

            {/* Direct Contact Points */}
            <div className="p-8 rounded-3xl bg-[#14161E] border border-border-dark shadow-subtle-card space-y-5">
              <span className="font-mono text-xs text-text-muted uppercase tracking-wider block">
                DIRECT CHANNELS
              </span>

              {/* Email with Copy */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-border-dark">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-cobalt-light" />
                  <span className="font-mono text-xs font-semibold text-white">
                    {PERSONAL_INFO.contact.email}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  title="Copy email"
                >
                  {copied ? <Check size={14} className="text-acid-lime" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-border-dark">
                <Phone size={16} className="text-cobalt-light" />
                <span className="font-mono text-xs text-white font-semibold">
                  {PERSONAL_INFO.contact.phone}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-border-dark">
                <MapPin size={16} className="text-cobalt-light" />
                <span className="font-mono text-xs text-gray-300">
                  {PERSONAL_INFO.location}
                </span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={PERSONAL_INFO.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#14161E] border border-border-dark hover:border-cobalt text-white hover:text-cobalt-light flex items-center justify-center gap-2 text-xs font-sans font-semibold transition-all shadow-subtle-card"
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
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
                <ArrowUpRight size={12} />
              </a>
            </div>

            {/* 3D Geodesic Cyber-Orb Sculpture */}
            <div className="flex justify-center pt-4">
              <CobaltRibbon3D variant="contact" className="max-w-[420px] h-[380px]" />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
