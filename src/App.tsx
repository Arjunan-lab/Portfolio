import { useState, lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { CustomCursor } from './components/ui/CustomCursor';
import { HireMePill } from './components/ui/HireMePill';
import { Preloader } from './components/Preloader';
import { RouteTransitionWrapper } from './components/RouteCurtain';
import { SmoothScrollProvider } from './motion/SmoothScrollProvider';
import { useLenis } from './motion/SmoothScrollContext';
import { checkReducedMotion } from './motion/tokens';

// Lazy below-the-fold sections
const StatsCounter = lazy(() => import('./components/StatsCounter').then(m => ({ default: m.StatsCounter })));
const SkillsSection = lazy(() => import('./components/SkillsSection').then(m => ({ default: m.SkillsSection })));
const ProjectsSection = lazy(() => import('./components/Projects/ProjectsSection').then(m => ({ default: m.ProjectsSection })));
const JourneyTimeline = lazy(() => import('./components/JourneyTimeline').then(m => ({ default: m.JourneyTimeline })));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const ContactSection = lazy(() => import('./components/ContactSection').then(m => ({ default: m.ContactSection })));

// Lazy dedicated route pages
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const WorkPage = lazy(() => import('./pages/WorkPage').then(m => ({ default: m.WorkPage })));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage').then(m => ({ default: m.ExperiencePage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const SoilHealth = lazy(() => import('./projects/SoilHealth').then(m => ({ default: m.SoilHealth })));
const Jarvis = lazy(() => import('./projects/Jarvis').then(m => ({ default: m.Jarvis })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

const LoadingFallback = () => (
  <div className="w-full min-h-[300px] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-cobalt border-t-transparent rounded-full animate-spin" />
  </div>
);

// Streamlined Landing Page (6 Core Sections Hierarchy)
function HomePage() {
  return (
    <main>
      {/* 01: HERO with Outcome Headline, 3D Focal Sculpture & Marquee */}
      <Hero />

      {/* 02: ABOUT ME, ACADEMIC TELEMETRY & WHAT I BRING */}
      <About />

      {/* Below-the-fold lazy loaded sections */}
      <Suspense fallback={<LoadingFallback />}>
        {/* 03: HIGH-IMPACT METRICS & STATS BAR */}
        <StatsCounter />

        {/* 04: SKILLS & CAPABILITIES */}
        <SkillsSection />

        {/* 05: SELECTED WORK & HORIZONTAL GALLERY */}
        <ProjectsSection />

        {/* 06: JOURNEY, MILESTONES & ACHIEVEMENTS */}
        <JourneyTimeline />

        {/* MENTORSHIP & ENDORSEMENTS */}
        <TestimonialsSection />

        {/* 07: DIRECT CONTACT & INQUIRY CHANNELS */}
        <ContactSection />
      </Suspense>
    </main>
  );
}

function AppContent() {
  const [showPreloader, setShowPreloader] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (checkReducedMotion()) return false;
    return sessionStorage.getItem('arjun_preloaded') !== 'true';
  });

  const location = useLocation();
  const { scrollTo } = useLenis();

  // Handle in-page anchor hashtag navigation
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        const el = document.getElementById(id);
        if (el) {
          scrollTo(el, { offset: -80 });
          clearInterval(interval);
        } else if (attempts > 30) {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [location.pathname, location.hash, scrollTo]);

  return (
    <div className="min-h-screen bg-[#0C0D11] text-white font-sans antialiased selection:bg-cobalt selection:text-white relative overflow-x-hidden">
      
      {/* Top Primary Navigation Bar */}
      <Navbar />

      {/* Cinematic Introductory Loading Sequence */}
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* Desktop Fine Pointer Custom Cursor */}
      <CustomCursor />

      {/* Sticky Quick-Connect "Hire Me" Pill & Scroll-To-Top Dock */}
      <HireMePill />

      {/* Scroll restoration helper */}
      <ScrollToTop />

      {/* APP ROUTES WITH CINEMATIC CURTAIN TRANSITIONS */}
      <RouteTransitionWrapper>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/soil-health" element={<SoilHealth />} />
            <Route path="/work/jarvis" element={<Jarvis />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </RouteTransitionWrapper>

    </div>
  );
}

export function App() {
  return (
    <SmoothScrollProvider>
      <AppContent />
    </SmoothScrollProvider>
  );
}

export default App;
