'use client';

import { useEffect, useRef } from 'react';
import { WHY } from '@/lib/site';
import { gsap, ScrollTrigger, registerGsap } from '@/animations/scrollAnimations';

export default function WhyUs() {
  const root = useRef(null);

  useEffect(() => {
    registerGsap();
    const el = root.current; if (!el) return;
    const rows = gsap.utils.toArray(el.querySelectorAll('.why-row'));
    if (!rows.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.set(rows, { opacity: 0, y: 40 });
      ScrollTrigger.batch(rows, {
        start: 'top 90%', once: true,
        onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.08, overwrite: true }),
      });

      rows.forEach((row) => {
        ScrollTrigger.create({
          trigger: row,
          start: 'top 62%',
          end: 'bottom 42%',
          onToggle: (self) => row.classList.toggle('is-active', self.isActive),
        });
      });

      const line = el.querySelector('.why-progress');
      if (line) {
        gsap.fromTo(line, { scaleY: 0 }, {
          scaleY: 1, ease: 'none',
          scrollTrigger: { trigger: el.querySelector('.why-list'), start: 'top 65%', end: 'bottom 65%', scrub: 0.5 },
        });
      }
    }, el);

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
    const safety = setTimeout(() => gsap.to(rows, { opacity: 1, y: 0, duration: 0.4, overwrite: true }), 2400);
    return () => { cancelAnimationFrame(raf); clearTimeout(safety); ctx.revert(); };
  }, []);

  return (
    <section ref={root} className="py-24 sm:py-32">
      <div className="container-px grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow">Why Pride Hire</span>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.02] tracking-tightest text-ink sm:text-6xl">
            Trust is earned<br />through <span className="text-accent">honesty.</span>
          </h2>
          <p className="mt-6 max-w-sm text-pretty text-muted sm:text-lg">
            We don&apos;t promise overnight success. We focus on honest advice, quality work and long-term partnerships.
          </p>
        </div>

        <div className="why-list relative pl-6 sm:pl-8">
          <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-line" />
          <span aria-hidden className="why-progress absolute left-0 top-0 h-full w-[2px] origin-top bg-accent" />

          {WHY.map((w, i) => (
            <div key={w.title} className="why-row group relative py-7 sm:py-9">
              <div className="flex items-baseline gap-5">
                <span className="why-index font-display text-sm font-semibold text-muted transition-colors duration-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="why-title font-display text-2xl font-semibold tracking-tight text-ink transition-all duration-500 ease-expo sm:text-3xl">
                    {w.title}
                  </h3>
                  <p className="why-body mt-2 max-w-lg text-pretty leading-relaxed text-muted transition-opacity duration-500">
                    {w.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .why-row .why-title { transform: translateX(0); }
        .why-row.is-active .why-index { color: #EE6A52; }
        .why-row.is-active .why-title { transform: translateX(10px); }
        .why-row:not(.is-active) .why-title { color: #9a9aa2; }
        .why-row:not(.is-active) .why-body { opacity: 0.55; }
        @media (hover: hover) {
          .why-row:hover .why-title { transform: translateX(10px); }
          .why-row:hover .why-index { color: #EE6A52; }
        }
        @media (prefers-reduced-motion: reduce) {
          .why-row .why-title, .why-row .why-index, .why-row .why-body { transition: none; transform: none; color: inherit; opacity: 1; }
        }
      `}</style>
    </section>
  );
}