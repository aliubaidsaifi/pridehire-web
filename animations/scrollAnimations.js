'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/** Register GSAP plugins exactly once (safe in client components). */
export function registerGsap() {
  if (typeof window === 'undefined') return;
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Fade + rise reveal for one or more elements as they enter the viewport.
 * `targets` can be a selector string, element, or array of elements.
 */
export function revealOnScroll(scope, targets, options = {}) {
  registerGsap();
  if (prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    gsap.from(targets, {
      y: options.y ?? 28,
      opacity: 0,
      duration: options.duration ?? 0.8,
      ease: 'power3.out',
      stagger: options.stagger ?? 0.08,
      scrollTrigger: {
        trigger: options.trigger ?? targets,
        start: options.start ?? 'top 85%',
        once: true,
      },
    });
  }, scope);

  return () => ctx.revert();
}

/** Subtle parallax — moves an element on scroll. Keep distance small for 60fps. */
export function parallax(scope, target, distance = 60) {
  registerGsap();
  if (prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    gsap.to(target, {
      yPercent: distance,
      ease: 'none',
      scrollTrigger: {
        trigger: scope,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, scope);

  return () => ctx.revert();
}

/** Animated number counter that runs once when scrolled into view. */
export function countUp(el, end, { suffix = '', duration = 1.6 } = {}) {
  registerGsap();
  if (!el) return () => {};

  if (prefersReducedMotion()) {
    el.textContent = `${end}${suffix}`;
    return () => {};
  }

  const obj = { val: 0 };
  const ctx = gsap.context(() => {
    gsap.to(obj, {
      val: end,
      duration,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => {
        el.textContent = `${Math.round(obj.val)}${suffix}`;
      },
    });
  });

  return () => ctx.revert();
}

export { gsap, ScrollTrigger };
