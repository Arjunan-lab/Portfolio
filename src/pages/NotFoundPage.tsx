import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Terminal } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <main className="min-h-screen bg-[#0C0D11] text-white flex flex-col justify-center items-center px-6 sm:px-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cobalt/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-xl mx-auto text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cobalt-light">
          <Terminal size={13} className="text-acid-lime" />
          <span>ERROR 404 // ROUTE NOT FOUND</span>
        </div>

        <div className="space-y-3">
          <h1 className="font-display font-black text-6xl sm:text-8xl tracking-tight text-white leading-none">
            4<span className="text-cobalt-light">0</span>4
          </h1>
          <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-white">
            System Page Offline
          </h2>
          <p className="font-sans text-sm sm:text-base text-text-muted leading-relaxed font-light max-w-md mx-auto">
            The requested technical path or archive could not be located in this deployment environment.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-cobalt hover:bg-cobalt-light text-white text-xs font-mono font-semibold transition-all shadow-md"
          >
            <Home size={14} />
            <span>Return to Systems Index</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border-dark bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-mono transition-all cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </main>
  );
};
