import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsCounter } from './components/StatsCounter';
import { ServicesSection } from './components/ServicesSection';
import { About } from './components/About';
import { ProjectsSection } from './components/Projects/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { JourneyTimeline } from './components/JourneyTimeline';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';

// Dedicated Route Pages
import { AboutPage } from './pages/AboutPage';
import { WorkPage } from './pages/WorkPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ContactPage } from './pages/ContactPage';
import { SoilHealth } from './projects/SoilHealth';
import { Jarvis } from './projects/Jarvis';

// Global GSAP Plugin Registration
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Main Landing Page Experience (Envato Top Developer Portfolio Hierarchy)
function HomePage() {
  return (
    <main>
      {/* 01: HERO */}
      <Hero />

      {/* 02: ABOUT ME & ACADEMIC TELEMETRY */}
      <About />

      {/* 03: HIGH-IMPACT METRICS & STATS BAR */}
      <StatsCounter />

      {/* 04: SKILLS & CAPABILITIES (PLACED BEFORE PROJECTS) */}
      <SkillsSection />

      {/* 05: SELECTED WORK & SYSTEM REPOSITORIES */}
      <ProjectsSection />

      {/* 06: JOURNEY, TIMELINE & PATENT */}
      <JourneyTimeline />

      {/* 07: MENTORSHIP & ENDORSEMENTS */}
      <TestimonialsSection />

      {/* 08: SERVICES / WHAT I BRING (BEFORE CONTACT) */}
      <ServicesSection />

      {/* 09: CONTACT & COLLABORATION */}
      <ContactSection />
    </main>
  );
}

export function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // High-performance Lenis Smooth Scroll Engine
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
    });
    (window as any).lenis = lenis;

    // Synchronize Lenis scroll ticker with GSAP ScrollTrigger to eliminate jitter
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      (window as any).lenis = null;
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  // Handle cross-page and in-page anchor hashtag navigation
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(el, { offset: -80, duration: 1.2 });
          } else {
            const top = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-canvas-light dark:bg-[#0C0D11] text-text-black dark:text-white font-sans antialiased selection:bg-cobalt selection:text-white transition-colors duration-300 relative">
      
      {/* Scroll restoration helper */}
      <ScrollToTop />

      {/* Top Subtle Reading Progress Bar (Electric Cobalt) */}
      <div className="fixed top-0 left-0 w-full h-[2.5px] z-50 pointer-events-none bg-transparent">
        <div
          className="h-full bg-cobalt transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* HEADER / NAVIGATION */}
      <Navbar />

      {/* APP ROUTES */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/soil-health" element={<SoilHealth />} />
        <Route path="/work/jarvis" element={<Jarvis />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

    </div>
  );
}

export default App;
