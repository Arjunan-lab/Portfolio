import { Quote, CheckCircle2, ExternalLink } from 'lucide-react';

export interface Endorsement {
  quote: string;
  name?: string;
  role: string;
  organization: string;
  highlight: string;
  linkedinUrl?: string;
  verified?: boolean;
}

// TODO: Add real named recommendations here. Include real `name`, optional `linkedinUrl`, and set `verified: true` to display the verified tick badge.
// Note: Per design requirement, anonymous entries without a real `name` are excluded, and the section will hide automatically if fewer than 2 real named endorsements are present.
const ENDORSEMENTS: Endorsement[] = [
  // Example for future named recommendations:
  // {
  //   quote: "Arjunan demonstrated exceptional technical discipline during the agriculture AI project...",
  //   name: "Technical Project Mentor",
  //   role: "AI & Cloud Architecture Lead",
  //   organization: "Infosys Springboard Mentorship Program",
  //   highlight: "Deep Learning & Architecture",
  //   verified: true
  // }
];

export const TestimonialsSection = () => {
  // Only render entries with an authentic named person
  const qualifiedEndorsements = ENDORSEMENTS.filter(
    (item) => Boolean(item.name && item.name.trim() !== '')
  );

  // Per specification: If fewer than 2 entries qualify, hide the whole section
  if (qualifiedEndorsements.length < 2) {
    return null;
  }

  return (
    <section className="relative py-24 sm:py-32 px-6 sm:px-12 lg:px-16 border-t border-border-dark bg-[#0D0E12] text-white transition-colors duration-300 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-cobalt/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cobalt-light uppercase">
            <span>06 // MENTORSHIP &amp; ENDORSEMENTS</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-[68px] tracking-tight text-white leading-[1.04]">
            Recognized by{' '}
            <span className="font-serif-italic font-normal italic text-cobalt-light text-[1.08em] pr-1">
              mentors.
            </span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-gray-300 font-light leading-relaxed">
            Professional appraisals from corporate program mentors, academic supervisors, and innovation initiatives.
          </p>
        </div>

        {/* Endorsements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {qualifiedEndorsements.map((item) => (
            <div
              key={item.name || item.organization}
              className="p-8 sm:p-10 rounded-3xl bg-[#14161E] border border-border-dark hover:border-cobalt/60 transition-all duration-300 shadow-subtle-card flex flex-col justify-between space-y-8 group"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border-dark">
                  <div className="w-10 h-10 rounded-xl bg-cobalt/20 text-cobalt-light flex items-center justify-center">
                    <Quote size={18} />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300 uppercase">
                    {item.highlight}
                  </span>
                </div>

                <p className="font-sans text-sm sm:text-base text-gray-300 font-light leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-border-dark space-y-1">
                <h3 className="font-display font-bold text-base text-white flex items-center gap-1.5">
                  <span>{item.name}</span>
                  {item.verified && (
                    <CheckCircle2 size={13} className="text-acid-lime" aria-label="Verified recommendation" />
                  )}
                  {item.linkedinUrl && (
                    <a
                      href={item.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-cobalt-light transition-colors ml-1"
                      aria-label={`${item.name}'s LinkedIn profile`}
                    >
                      <ExternalLink size={12} />
                    </a>
                  )}
                </h3>
                <p className="text-xs font-mono text-cobalt-light font-semibold">
                  {item.role}
                </p>
                <p className="text-xs font-sans text-gray-400">
                  {item.organization}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
