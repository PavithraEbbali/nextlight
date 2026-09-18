'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Lenis smooth scrolling.
 *
 * Deliberately restrained: a short duration and a gentle ease so the page
 * feels settled rather than floaty. Anchor links are intercepted so in-page
 * navigation uses the same easing instead of jumping.
 *
 * Disabled entirely when the visitor prefers reduced motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;

      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;

      const destination = document.querySelector(hash);
      if (!destination) return;

      event.preventDefault();
      const offset = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--header-offset'
        ),
        10
      );
      lenis.scrollTo(destination as HTMLElement, {
        offset: -(Number.isNaN(offset) ? 120 : offset) + 24,
      });
      history.replaceState(null, '', hash);
    };

    document.addEventListener('click', onAnchorClick);

    return () => {
      document.removeEventListener('click', onAnchorClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
