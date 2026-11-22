import { useState } from 'react';
import { Send, Check, AlertCircle, Loader2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Magnetic } from '../motion/Magnetic';
import { runCobaltLimeConfetti } from './ui/ConfettiBurst';

interface ContactFormProps {
  idPrefix?: string;
}

export const ContactForm = ({ idPrefix = 'contact' }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    botcheck: '' // honeypot
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const endpoint = import.meta.env.VITE_FORM_ENDPOINT;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check - reject bots quietly
    if (formData.botcheck) {
      setStatus('success');
      setStatusMessage('Thank you for your submission.');
      runCobaltLimeConfetti();
      return;
    }

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setStatusMessage('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus('error');
      setStatusMessage('Please enter a valid email address.');
      return;
    }

    // If an external endpoint is configured
    if (endpoint && endpoint.trim().length > 0) {
      setStatus('loading');
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject || `Inquiry from ${formData.name}`,
            message: formData.message
          })
        });

        if (response.ok) {
          setStatus('success');
          setStatusMessage("Message Dispatched! Thank you for reaching out. I'll review your note and get back to you promptly.");
          setFormData({ name: '', email: '', subject: '', message: '', botcheck: '' });
          runCobaltLimeConfetti();
        } else {
          throw new Error('Endpoint returned a non-200 status code.');
        }
      } catch {
        setStatus('error');
        setStatusMessage('Network dispatch failed. Please use direct email or try again.');
      }
    } else {
      // Fallback: Mailto dispatch
      const mailtoSubject = encodeURIComponent(formData.subject || `Portfolio Inquiry from ${formData.name}`);
      const mailtoBody = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.open(`mailto:${PERSONAL_INFO.contact.email}?subject=${mailtoSubject}&body=${mailtoBody}`, '_blank');

      setStatus('success');
      setStatusMessage('Your email app should have opened. If not, copy my address: ' + PERSONAL_INFO.contact.email);
      runCobaltLimeConfetti();
    }
  };

  return (
    <div className="space-y-6">
      {status === 'success' ? (
        <div className="p-8 rounded-2xl bg-acid-lime/10 border border-acid-lime/30 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-acid-lime/20 flex items-center justify-center mx-auto text-acid-lime">
            <Check size={24} />
          </div>
          <h3 className="font-display font-bold text-xl text-white">
            Message Dispatched!
          </h3>
          <p className="text-sm font-sans text-gray-300 max-w-md mx-auto leading-relaxed">
            {statusMessage}
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="px-6 py-2.5 rounded-full bg-white text-text-black text-xs font-bold font-sans hover:bg-cobalt hover:text-white transition-colors cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Honeypot Field */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor={`${idPrefix}-botcheck`}>Do not fill this field</label>
            <input
              type="text"
              id={`${idPrefix}-botcheck`}
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              value={formData.botcheck}
              onChange={(e) => setFormData({ ...formData, botcheck: e.target.value })}
            />
          </div>

          {/* Name & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor={`${idPrefix}-name`} className="text-xs font-mono text-text-muted uppercase">
                Your Name <span className="text-acid-lime">*</span>
              </label>
              <input
                type="text"
                id={`${idPrefix}-name`}
                name="name"
                required
                autoComplete="name"
                placeholder="Dr. Jane Smith"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#0C0D11] border border-border-dark text-white placeholder-gray-500 text-xs font-sans focus:outline-none focus:border-cobalt transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor={`${idPrefix}-email`} className="text-xs font-mono text-text-muted uppercase">
                Email Address <span className="text-acid-lime">*</span>
              </label>
              <input
                type="email"
                id={`${idPrefix}-email`}
                name="email"
                required
                autoComplete="email"
                placeholder="jane@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#0C0D11] border border-border-dark text-white placeholder-gray-500 text-xs font-sans focus:outline-none focus:border-cobalt transition-colors"
              />
            </div>
          </div>

          {/* Subject Field */}
          <div className="space-y-1.5">
            <label htmlFor={`${idPrefix}-subject`} className="text-xs font-mono text-text-muted uppercase">
              Subject Line
            </label>
            <input
              type="text"
              id={`${idPrefix}-subject`}
              name="subject"
              autoComplete="off"
              placeholder="Full-Stack / ML Engineering Opportunity"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#0C0D11] border border-border-dark text-white placeholder-gray-500 text-xs font-sans focus:outline-none focus:border-cobalt transition-colors"
            />
          </div>

          {/* Message Field */}
          <div className="space-y-1.5">
            <label htmlFor={`${idPrefix}-message`} className="text-xs font-mono text-text-muted uppercase">
              Message <span className="text-acid-lime">*</span>
            </label>
            <textarea
              id={`${idPrefix}-message`}
              name="message"
              required
              rows={4}
              placeholder="Hi Arjunan, I reviewed your AI projects and would love to discuss..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#0C0D11] border border-border-dark text-white placeholder-gray-500 text-xs font-sans focus:outline-none focus:border-cobalt transition-colors resize-none"
            />
          </div>

          {/* Error Notice */}
          {status === 'error' && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-300 font-sans">
              <AlertCircle size={14} className="flex-shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Magnetic Submit Button with Ripple/Fill */}
          <div className="pt-2">
            <Magnetic strength={0.25}>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-cobalt hover:bg-cobalt-light text-white text-xs font-bold font-sans transition-all duration-300 shadow-cobalt-glow disabled:opacity-50 cursor-pointer"
              >
                {/* Ripple / fill background animation */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cobalt to-acid-lime opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                {status === 'loading' ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Transmitting Dispatch...</span>
                  </>
                ) : (
                  <>
                    <span>Dispatch Direct Message</span>
                    <Send size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>
            </Magnetic>
          </div>
        </form>
      )}
    </div>
  );
};
