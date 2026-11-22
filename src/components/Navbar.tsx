import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const NAV_ITEMS = [
  { label: 'Home', sectionId: 'hero', route: '/' },
  { label: 'About', sectionId: 'about', route: '/#about' },
  { label: 'Projects', sectionId: 'projects', route: '/#projects' },
  { label: 'Skills', sectionId: 'skills', route: '/#skills' },
  { label: 'Journey', sectionId: 'journey', route: '/#journey' },
  { label: 'Services', sectionId: 'services', route: '/#services' },
  { label: 'Contact', sectionId: 'contact', route: '/#contact' }
];

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      if (isHomePage) {
        const sections = NAV_ITEMS.map(i => i.sectionId);
        const scrollPos = window.scrollY + 200;

        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el && el.offsetTop <= scrollPos) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleNavClick = (item: typeof NAV_ITEMS[0]) => {
    setMobileOpen(false);

    if (item.sectionId === 'hero') {
      if (isHomePage) {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(0, { duration: 1.2 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setActiveSection('hero');
      } else {
        navigate('/');
      }
      return;
    }

    if (isHomePage) {
      const el = document.getElementById(item.sectionId);
      if (el) {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(el, { offset: -80, duration: 1.2 });
        } else {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
        setActiveSection(item.sectionId);
      }
    } else {
      navigate('/#' + item.sectionId);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 sm:px-12 lg:px-16 ${
          scrolled
            ? 'py-4 bg-[#0D0E12]/90 backdrop-blur-md border-b border-border-dark shadow-subtle-card'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Mark (Left) */}
          <Link
            to="/"
            onClick={() => {
              if (isHomePage) {
                if ((window as any).lenis) {
                  (window as any).lenis.scrollTo(0, { duration: 1.2 });
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }
            }}
            className="font-display font-black text-xl tracking-tight text-white hover:text-cobalt-light transition-colors"
          >
            ARJUNAN
          </Link>

          {/* Navigation Links (Center) */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-sans font-medium text-text-muted">
            {NAV_ITEMS.map((item) => {
              const isActive = isHomePage
                ? activeSection === item.sectionId
                : location.pathname === item.route;

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className={`relative py-1 transition-colors hover:text-white cursor-pointer ${
                    isActive ? 'text-white font-semibold' : ''
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cobalt rounded-full transition-all" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions (Right) */}
          <div className="flex items-center gap-4 sm:gap-5">
            
            {/* Availability Indicator */}
            <div className="hidden xl:flex items-center gap-2 text-xs font-sans text-text-muted">
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
              className="lg:hidden p-1.5 text-white cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0D0E12] flex flex-col justify-between p-8 pt-24 lg:hidden">
          <div className="flex flex-col gap-5">
            {NAV_ITEMS.map((item) => {
              const isActive = isHomePage
                ? activeSection === item.sectionId
                : location.pathname === item.route;

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className={`text-left font-display text-2xl sm:text-3xl font-bold transition-colors ${
                    isActive ? 'text-cobalt' : 'text-white hover:text-cobalt'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-8 border-t border-border-dark flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-sans text-text-muted">
                <span className="w-2 h-2 rounded-full bg-acid-lime" />
                <span className="text-gray-300">Available for opportunities</span>
              </div>

              <a
                href={PERSONAL_INFO.contact.resumeUrl}
                download
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-text-black text-xs font-mono font-bold"
              >
                <Download size={12} />
                <span>Resume PDF</span>
              </a>
            </div>

            <p className="text-xs font-mono text-gray-400">
              Coimbatore, India • 3rd Year B.Tech IT • CGPA 8.42
            </p>
          </div>
        </div>
      )}
    </>
  );
};
