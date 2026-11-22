import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLenis } from '../motion/SmoothScrollContext';

const NAV_ITEMS = [
  { label: 'Home', sectionId: 'hero', route: '/' },
  { label: 'About', sectionId: 'about', route: '/#about' },
  { label: 'Skills', sectionId: 'skills', route: '/#skills' },
  { label: 'Projects', sectionId: 'projects', route: '/#projects' },
  { label: 'All Work', sectionId: '', route: '/work' },
  { label: 'Experience', sectionId: '', route: '/experience' },
  { label: 'Journey', sectionId: 'journey', route: '/#journey' },
  { label: 'Contact', sectionId: 'contact', route: '/#contact' }
];

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollTo: lenisScrollTo } = useLenis();

  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const drawerRef = useRef<HTMLDivElement | null>(null);
  const lastScrollYRef = useRef(0);

  const isHomePage = location.pathname === '/';

  // Monitor scroll for condensing, hiding on scroll down, revealing on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;

      setScrolled(currentScrollY > 40);

      if (currentScrollY > 120 && currentScrollY > lastScrollYRef.current + 6 && !mobileOpen) {
        setHidden(true);
      } else if (currentScrollY < lastScrollYRef.current - 6 || currentScrollY <= 80) {
        setHidden(false);
      }

      lastScrollYRef.current = currentScrollY;

      if (isHomePage) {
        const isNearBottom = window.innerHeight + currentScrollY >= document.documentElement.scrollHeight - 120;
        if (isNearBottom) {
          setActiveSection('contact');
          return;
        }

        if (currentScrollY < 150) {
          setActiveSection('hero');
          return;
        }

        const sections = ['contact', 'journey', 'projects', 'skills', 'about'];
        const scrollPos = currentScrollY + 280;

        for (const id of sections) {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= scrollPos) {
            setActiveSection(id);
            return;
          }
        }
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage, mobileOpen]);

  // Lock body scroll and trap focus when mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const timer = setTimeout(() => {
      const firstFocusable = drawerRef.current?.querySelector<HTMLElement>('button, [href]');
      firstFocusable?.focus();
    }, 60);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [mobileOpen]);

  const handleNavClick = (item: typeof NAV_ITEMS[0]) => {
    setMobileOpen(false);

    // Route only (e.g. /work, /experience)
    if (!item.sectionId && !item.route.includes('#')) {
      navigate(item.route);
      return;
    }

    // Home / Hero
    if (item.sectionId === 'hero') {
      if (isHomePage) {
        lenisScrollTo(0);
        setActiveSection('hero');
        if (window.location.hash) {
          window.history.pushState(null, '', window.location.pathname);
        }
      } else {
        navigate('/');
      }
      return;
    }

    // In-page section (about, skills, projects, journey, contact)
    if (isHomePage) {
      const el = document.getElementById(item.sectionId);
      if (el) {
        lenisScrollTo(el, { offset: -80 });
      } else {
        lenisScrollTo(`#${item.sectionId}`, { offset: -80 });
      }
      setActiveSection(item.sectionId);
      window.history.pushState(null, '', `#${item.sectionId}`);
    } else {
      navigate(`/#${item.sectionId}`);
    }
  };

  const getIsActive = (item: typeof NAV_ITEMS[0]) => {
    if (isHomePage) {
      if (item.sectionId) {
        return activeSection === item.sectionId;
      }
      return location.pathname === item.route;
    }

    if (item.route === location.pathname) return true;
    if (item.sectionId === 'about' && location.pathname === '/about') return true;
    if (item.sectionId === 'contact' && location.pathname === '/contact') return true;
    if (item.route === '/work' && location.pathname.startsWith('/work')) return true;
    if (item.route === '/experience' && location.pathname === '/experience') return true;
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] px-6 sm:px-12 lg:px-16 ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled
            ? 'py-3.5 bg-[#0C0D11]/85 backdrop-blur-md border-b border-border-dark shadow-subtle-card'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Mark */}
          <Link
            to="/"
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault();
                lenisScrollTo(0);
                setActiveSection('hero');
                if (window.location.hash) {
                  window.history.pushState(null, '', window.location.pathname);
                }
              }
            }}
            className="font-display font-black text-xl tracking-tight text-white hover:text-cobalt-light transition-colors select-none"
          >
            ARJUNAN
          </Link>

          {/* Navigation Links with Shared Framer Motion Underline Indicator */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs font-sans font-medium text-text-muted">
            {NAV_ITEMS.map((item) => {
              const isActive = getIsActive(item);

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className={`relative py-1.5 transition-colors hover:text-white cursor-pointer ${
                    isActive ? 'text-white font-semibold' : ''
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-cobalt rounded-full shadow-[0_0_8px_#2B59FF]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4 sm:gap-5">
            
            {/* Availability Indicator */}
            <div className="hidden xl:flex items-center gap-2 text-xs font-sans text-text-muted select-none">
              <span className="w-2 h-2 rounded-full bg-acid-lime animate-pulse inline-block" />
              <span className="font-medium text-gray-300">Available</span>
            </div>

            {/* Quick Resume Download Pill */}
            <a
              href={PERSONAL_INFO.contact.resumeUrl}
              download
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border-dark bg-white/5 hover:border-cobalt text-white text-xs font-mono transition-all"
              title="Download Resume (PDF)"
            >
              <Download size={12} className="text-cobalt-light" />
              <span>Resume</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt rounded-lg"
              aria-label={mobileOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>

        </div>
      </header>

      {/* Full-screen expanding circle clip-path mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 36px) 36px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 36px) 36px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 36px) 36px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0C0D11] flex flex-col justify-between p-8 pt-28 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-5">
              <span className="text-xs font-mono tracking-widest text-cobalt-light uppercase">
                INDEX NAVIGATION //
              </span>

              {NAV_ITEMS.map((item, idx) => {
                const isActive = getIsActive(item);

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <button
                      onClick={() => handleNavClick(item)}
                      className={`text-2xl sm:text-3xl font-display font-black tracking-tight text-left w-full py-1 cursor-pointer transition-colors ${
                        isActive ? 'text-cobalt-light' : 'text-white hover:text-acid-lime'
                      }`}
                    >
                      {item.label}
                    </button>
                  </motion.div>
                );
              })}
            </div>

            <div className="pt-8 border-t border-border-dark flex flex-col gap-4 text-xs font-mono text-text-muted">
              <div>ARJUNAN V — {PERSONAL_INFO.roleTitle}</div>
              <div className="text-acid-lime">{PERSONAL_INFO.statusLine}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
