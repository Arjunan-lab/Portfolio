import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger globally
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Checks if the user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Signature Corner-to-Center Convergence Hook:
 * When section enters viewport:
 * - Heading enters from upper-left (x: -55, y: -35)
 * - Text enters from lower-left (x: -40, y: 35)
 * - Visual/Artwork enters from upper-right (x: 55, y: -30, scale: 0.94)
 * - Telemetry/Labels enter from lower-right (x: 40, y: 35)
 * - Indicators enter with subtle scale
 * Elements converge into exact final resting positions with custom smooth easing.
 * When scrolling past, subtle exit choreography guides elements toward their corners.
 */
interface ConvergenceRefs {
  sectionRef: React.RefObject<HTMLElement | null>;
  headingRef?: React.RefObject<HTMLElement | null>;
  textRef?: React.RefObject<HTMLElement | null>;
  artworkRef?: React.RefObject<HTMLElement | null>;
  telemetryRef?: React.RefObject<HTMLElement | null>;
  indicatorsRef?: React.RefObject<HTMLElement | null>;
}

export const useCornerConvergence = ({
  sectionRef,
  headingRef,
  textRef,
  artworkRef,
  telemetryRef,
  indicatorsRef,
}: ConvergenceRefs) => {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion()) {
      return;
    }

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // Mobile: Clean vertical staggered reveals without aggressive horizontal offsets
      if (isMobile) {
        const elements = [
          headingRef?.current,
          textRef?.current,
          artworkRef?.current,
          telemetryRef?.current,
          indicatorsRef?.current,
        ].filter(Boolean) as HTMLElement[];

        if (elements.length > 0) {
          gsap.fromTo(
            elements,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 82%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
        return;
      }

      // Desktop: Signature Corner-to-Center Convergence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse',
        },
      });

      // Upper-Left: Heading
      if (headingRef?.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, x: -60, y: -40 },
          { opacity: 1, x: 0, y: 0, duration: 1.0, ease: 'expo.out' },
          0
        );
      }

      // Lower-Left: Supporting Text & CTAs
      if (textRef?.current) {
        tl.fromTo(
          textRef.current,
          { opacity: 0, x: -45, y: 35 },
          { opacity: 1, x: 0, y: 0, duration: 1.0, ease: 'expo.out' },
          0.08
        );
      }

      // Upper-Right: 3D Artwork / Sculpture / Photography
      if (artworkRef?.current) {
        tl.fromTo(
          artworkRef.current,
          { opacity: 0, x: 65, y: -35, scale: 0.92 },
          { opacity: 1, x: 0, y: 0, scale: 1, duration: 1.15, ease: 'expo.out' },
          0.05
        );
      }

      // Lower-Right: Technical Telemetry & Metadata
      if (telemetryRef?.current) {
        tl.fromTo(
          telemetryRef.current,
          { opacity: 0, x: 50, y: 40 },
          { opacity: 1, x: 0, y: 0, duration: 1.0, ease: 'expo.out' },
          0.12
        );
      }

      // Indicators: Sparkles / Badges
      if (indicatorsRef?.current) {
        tl.fromTo(
          indicatorsRef.current,
          { opacity: 0, scale: 0.4 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.8)' },
          0.2
        );
      }

      // Subtle Exit Choreography: as section leaves viewport top
      ScrollTrigger.create({
        trigger: section,
        start: 'bottom 40%',
        end: 'bottom -20%',
        scrub: 0.3,
        onUpdate: (self) => {
          const progress = self.progress;
          if (headingRef?.current) {
            gsap.set(headingRef.current, {
              y: -30 * progress,
              scale: 1 - 0.04 * progress,
            });
          }
          if (artworkRef?.current) {
            gsap.set(artworkRef.current, {
              x: 25 * progress,
              opacity: 1 - 0.25 * progress,
            });
          }
          if (textRef?.current) {
            gsap.set(textRef.current, {
              x: -20 * progress,
              opacity: 1 - 0.2 * progress,
            });
          }
        },
      });
    }, section);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

/**
 * Magnetic Button Interaction Hook:
 * Subtly attracts the element toward the cursor on hover.
 */
export const useMagnetic = <T extends HTMLElement = HTMLButtonElement>(strength = 0.3) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.35,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1.1, 0.4)',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
};

/**
 * Masked Text Reveal Helper
 */
export const useMaskTextReveal = <T extends HTMLElement = HTMLDivElement>() => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll('.mask-reveal-item');
      if (targets.length === 0) return;

      gsap.fromTo(
        targets,
        { y: '105%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
};

