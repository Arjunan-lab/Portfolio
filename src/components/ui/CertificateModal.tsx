import React from 'react';
import { X, Download, ShieldCheck, ExternalLink } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificateSrc: string;
  certificateTitle: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  certificateSrc,
  certificateTitle
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full rounded-3xl bg-[#111216] border border-white/20 shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={18} className="text-acid-lime" />
            <h3 className="font-display font-bold text-lg sm:text-xl text-white truncate max-w-md">
              {certificateTitle}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Certificate Display Area */}
        <div className="rounded-2xl overflow-hidden bg-black border border-white/10 shadow-inner max-h-[70vh] flex items-center justify-center">
          <img
            src={certificateSrc}
            alt={certificateTitle}
            className="w-full h-auto object-contain max-h-[68vh]"
          />
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs font-mono">
          <span className="text-white/60">
            OFFICIALLY ACCREDITED TO: <span className="text-white font-bold">ARJUNAN</span>
          </span>

          <div className="flex items-center gap-3">
            <a
              href={certificateSrc}
              download={`${certificateTitle.replace(/\s+/g, '_')}.png`}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-text-black font-sans text-xs font-bold hover:bg-cobalt hover:text-white transition-colors"
            >
              <Download size={13} />
              <span>Download High-Res (PNG)</span>
            </a>

            <a
              href="/assets/Microscopy_System_Patent_Publication.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 text-white font-sans text-xs font-semibold hover:bg-white/20 transition-colors border border-white/15"
            >
              <span>Patent Gazette PDF</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

