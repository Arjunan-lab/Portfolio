import { useState } from 'react';
import { Sparkles, Terminal } from 'lucide-react';

interface TechCategory {
  title: string;
  items: string[];
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    title: 'Programming',
    items: ['Python', 'Java', 'C', 'JavaScript', 'SQL']
  },
  {
    title: 'Frontend',
    items: ['HTML', 'CSS', 'React.js', 'Tailwind CSS']
  },
  {
    title: 'Backend',
    items: ['Node.js', 'FastAPI', 'REST APIs', 'Express']
  },
  {
    title: 'AI / Machine Learning',
    items: ['NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow / Keras', 'CatBoost']
  },
  {
    title: 'Databases',
    items: ['MySQL', 'MongoDB', 'PostgreSQL (Basic)']
  },
  {
    title: 'Tools',
    items: ['Git', 'GitHub', 'Docker', 'Postman']
  }
];

export const TechnicalExpertise = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <section id="expertise" className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-16 bg-[#111216] text-white border-t border-white/10 overflow-hidden">
      
      {/* Background Decorative Ambient Radial Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cobalt/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* Top Header Row: Label & Headline with Wave Mesh */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          
          {/* Left Column: Headline & Subtitle (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Section Tag */}
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-white/50 uppercase">
              <span>02 — TECHNICAL EXPERTISE</span>
            </div>

            {/* Headline with Signature Italic Accent */}
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight leading-[1.02] uppercase text-white">
              Engineering{' '}
              <span className="block">
                across the{' '}
                <span className="font-serif-italic font-normal italic text-cobalt tracking-normal text-[1.08em] pr-1">
                  stack.
                </span>
              </span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-white/70 font-light max-w-xl leading-relaxed pt-2">
              From core programming to intelligent systems, I work with a diverse set of technologies.
            </p>

          </div>

          {/* Right Column: Generative Oscilloscope / Topographic Wave Graphic (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[360px] aspect-[4/3] rounded-2xl overflow-hidden bg-white/[0.02] border border-white/10 p-6 flex flex-col justify-between">
              
              <div className="flex items-center justify-between text-[11px] font-mono text-white/40">
                <span className="flex items-center gap-1.5 text-cobalt font-bold">
                  <Terminal size={12} /> TELEMETRY MATRIX
                </span>
                <span>SYSTEM ACTIVE</span>
              </div>

              {/* Animated SVG Wave Lines */}
              <div className="relative h-28 w-full overflow-hidden flex items-center justify-center">
                <svg
                  className="w-full h-full stroke-cobalt/40"
                  viewBox="0 0 300 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 0 50 Q 75 10 150 50 T 300 50"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    className="opacity-70"
                  />
                  <path
                    d="M 0 60 Q 75 25 150 60 T 300 60"
                    stroke="rgba(49, 92, 255, 0.8)"
                    strokeWidth="2"
                  />
                  <path
                    d="M 0 70 Q 75 40 150 70 T 300 70"
                    stroke="rgba(216, 244, 90, 0.6)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 0 40 Q 75 80 150 40 T 300 40"
                    stroke="rgba(49, 92, 255, 0.3)"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-white/50 border-t border-white/10 pt-3">
                <span>{hoveredTech ? `HOVERED: ${hoveredTech}` : 'EXPLORE CAPABILITIES'}</span>
                <span className="text-acid-lime font-bold">● ONLINE</span>
              </div>

            </div>
          </div>

        </div>

        {/* 6-Category Clean Technology Grid (Exact from Reference Panel 6!) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 pt-4">
          {TECH_CATEGORIES.map((category, idx) => (
            <div
              key={category.title}
              className="group p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-cobalt/60 transition-all duration-300 space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="font-display font-bold text-lg text-white group-hover:text-cobalt transition-colors">
                  {category.title}
                </span>
                <span className="font-mono text-xs text-white/40 group-hover:text-acid-lime font-bold">
                  0{idx + 1}
                </span>
              </div>

              <ul className="space-y-3">
                {category.items.map((item) => (
                  <li
                    key={item}
                    onMouseEnter={() => setHoveredTech(item)}
                    onMouseLeave={() => setHoveredTech(null)}
                    className="flex items-center justify-between text-sm font-sans text-white/70 hover:text-white transition-colors cursor-default group/item"
                  >
                    <span className="group-hover/item:text-white transition-colors">
                      {item}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover/item:bg-acid-lime group-hover/item:scale-125 transition-all" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Capability Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/60">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-acid-lime animate-pulse" />
            <span>FULL ARCHITECTURAL RIGOR: FRONTEND • BACKEND • ML PIPELINES • HARDWARE PROTOCOLS</span>
          </div>
          <div className="flex items-center gap-1.5 text-cobalt font-semibold">
            <Sparkles size={13} />
            <span>BUILT WITH PRECISION</span>
          </div>
        </div>

      </div>

    </section>
  );
};
