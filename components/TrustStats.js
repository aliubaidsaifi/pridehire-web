'use client';

import { useEffect, useRef } from 'react';
import { TRUST_STATS, TRUST_BADGES } from '@/lib/site';
import { gsap, ScrollTrigger, registerGsap } from '@/animations/scrollAnimations';

function Star() {
  return <svg viewBox="0 0 24 24" className="inline-block h-5 w-5 fill-accent"><path d="M12 2l2.9 6.2 6.8.8-5 4.6 1.3 6.7L12 17.8 5.9 20.3 7.2 13.6l-5-4.6 6.8-.8z" /></svg>;
}

export default function TrustStats() {
  const root = useRef(null);

  useEffect(() => {
    registerGsap();
    const el = root.current; if (!el) return;
    const items = gsap.utils.toArray(el.querySelectorAll('.trust-item'));
    if (!items.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y: 24 });
      ScrollTrigger.batch(items, { start: 'top 94%', once: true, onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', stagger: 0.07, overwrite: true }) });
    }, el);
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    const safety = setTimeout(() => gsap.to(items, { opacity: 1, y: 0, duration: 0.4, overwrite: true }), 2200);
    return () => { cancelAnimationFrame(raf); clearTimeout(safety); ctx.revert(); };
  }, []);

  return (
    <section ref={root} className="border-y border-line bg-paper py-14 sm:py-16">
      <div className="container-px">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {TRUST_STATS.map((s) => (
            <div key={s.label} className="trust-item text-center">
              <div className="font-display text-4xl font-semibold tracking-tightest text-ink sm:text-5xl">
                {s.star ? (<span className="inline-flex items-center gap-1.5">{s.value}<Star /></span>) : s.value}
              </div>
              <div className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-muted sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 border-t border-line pt-10">
          {TRUST_BADGES.map((b) => (
            <span key={b} className="trust-item inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-3.5 w-3.5 text-accent"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}