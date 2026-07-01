'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, registerGsap } from '@/animations/scrollAnimations';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    registerGsap();

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return; // native scroll for users who ask for less motion

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const onTick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Recalculate all ScrollTrigger positions once the page + fonts have settled.
    // Without this, triggers can be measured too early and only "kick in" after a
    // manual refresh (e.g. reveal animations failing to fire on first load).
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    const refreshTimer = setTimeout(refresh, 600);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener('load', refresh);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return children;
}