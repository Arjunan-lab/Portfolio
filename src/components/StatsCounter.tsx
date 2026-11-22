import { useEffect, useRef } from 'react';
import { Award, Cpu, Zap, GraduationCap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
import { checkReducedMotion } from '../motion/tokens';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const StatsCounter = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const totalProjects = PROJECTS.length;
  const repoCount = PROJECTS.filter(p => Boolean(p.githubUrl)).length;

  const STATS = [
    {
      icon: Award,
      numeric: parseFloat(PERSONAL_INFO.education.cgpa),
      decimals: 2,
      displayPrefix: '',
      displaySuffix: '',
      label: "ACADEMIC CGPA",
      subtext: "KPR Institute B.Tech IT",
      color: "text-cobalt-light"
    },
    {
      icon: Award,
      numeric: 2,
      decimals: 0,
      displayPrefix: '0',
      displaySuffix: '',
      label: "AWARDS & HONORS",
      subtext: "Hostel Hackathon & STEM Expo",
      color: "text-acid-lime"
    },
    {
      icon: Cpu,
      numeric: totalProjects,
      decimals: 0,
      displayPrefix: totalProjects < 10 ? '0' : '',
      displaySuffix: '',
      label: "FLAGSHIP SYSTEMS",
      subtext: "Software & Applied AI Architectures",
      color: "text-cobalt-light"
    },
    {
      icon: Zap,
      numeric: repoCount,
      decimals: 0,
      displayPrefix: repoCount < 10 ? '0' : '',
      displaySuffix: '',
      label: "OPEN REPOSITORIES",
      subtext: "Verified Codebases on GitHub",
      color: "text-cobalt-light"
    },
    {
      icon: GraduationCap,
      numeric: 1,
      decimals: 0,
      displayPrefix: '0',
      displaySuffix: '',
      label: "INDUSTRY INTERNSHIP",
      subtext: "Infosys Springboard AI",
      color: "text-acid-lime"
    }
  ];

  useEffect(() => {
    const el = containerRef.current;
    if (!el || checkReducedMotion()) return;

    const ctx = gsap.context(() => {
      const counters = el.querySelectorAll<HTMLSpanElement>('.stat-counter-val');

      counters.forEach((counter) => {
        const targetVal = parseFloat(counter.getAttribute('data-target') || '0');
        const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
        const prefix = counter.getAttribute('data-prefix') || '';
        const obj = { val: 0 };

        gsap.to(obj, {
          val: targetVal,
          duration: 1.6,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            if (decimals > 0) {
              counter.innerText = `${prefix}${obj.val.toFixed(decimals)}`;
            } else {
              const intVal = Math.round(obj.val);
              counter.innerText = `${prefix}${intVal}`;
            }
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="stats"
      ref={containerRef}
      className="w-full py-12 px-6 sm:px-12 lg:px-16 border-y border-border-dark bg-[#111319]/80 backdrop-blur-md transition-colors duration-300 relative z-10"
    >
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
                <div className="flex items-center gap-2 text-text-muted text-xs font-mono">
                  <Icon size={14} className={stat.color} />
                  <span className="tracking-wider uppercase">{stat.label}</span>
                </div>
                <div className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight group-hover:text-cobalt-light transition-colors">
                  <span
                    className="stat-counter-val"
                    data-target={stat.numeric}
                    data-decimals={stat.decimals}
                    data-prefix={stat.displayPrefix}
                  >
                    {stat.displayPrefix}{stat.decimals > 0 ? stat.numeric.toFixed(stat.decimals) : stat.numeric}
                  </span>
                </div>
                <p className="text-xs font-sans text-gray-400 font-light truncate">
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
