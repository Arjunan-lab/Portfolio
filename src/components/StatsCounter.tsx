import { Award, FileText, Cpu, Zap, GraduationCap } from 'lucide-react';

const STATS = [
  {
    icon: Award,
    value: "8.42",
    label: "ACADEMIC CGPA",
    subtext: "KPR Institute B.Tech IT",
    color: "text-cobalt dark:text-cobalt-light"
  },
  {
    icon: FileText,
    value: "01",
    label: "PUBLISHED PATENT",
    subtext: "Indian Patent Office No. 202641064539 A",
    color: "text-acid-lime"
  },
  {
    icon: Cpu,
    value: "09",
    label: "BUILT PROJECTS",
    subtext: "Software & Hardware Architectures",
    color: "text-cobalt dark:text-cobalt-light"
  },
  {
    icon: Zap,
    value: "09",
    label: "OPEN REPOSITORIES",
    subtext: "Verified Codebases on GitHub",
    color: "text-cobalt dark:text-cobalt-light"
  },
  {
    icon: GraduationCap,
    value: "02",
    label: "INDUSTRY PROGRAMS",
    subtext: "Infosys Springboard & Samsung AI",
    color: "text-acid-lime"
  }
];

export const StatsCounter = () => {
  return (
    <div className="w-full py-10 px-6 sm:px-12 lg:px-16 border-y border-border-light dark:border-border-dark bg-white/70 dark:bg-[#111319]/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 items-center">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`space-y-1.5 group ${
                  idx === STATS.length - 1 ? 'col-span-2 md:col-span-1' : ''
                }`}
              >
                <div className="flex items-center gap-2 text-text-dimmed dark:text-text-muted text-xs font-mono">
                  <Icon size={14} className={stat.color} />
                  <span className="tracking-wider uppercase">{stat.label}</span>
                </div>
                <div className="font-display font-black text-3xl sm:text-4xl text-text-black dark:text-white tracking-tight group-hover:text-cobalt transition-colors">
                  {stat.value}
                </div>
                <p className="text-[11px] font-sans text-text-muted dark:text-gray-400 font-light truncate">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

