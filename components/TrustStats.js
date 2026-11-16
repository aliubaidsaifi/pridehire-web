'use client';

import { useEffect, useRef } from 'react';
import { TRUST_STATS, TRUST_BADGES } from '@/lib/site';
import { gsap, ScrollTrigger, registerGsap } from '@/animations/scrollAnimations';

// Rendered as static text so the value is in the server HTML (a JS counter shows "0" to crawlers and AI engines).
function Stat({ s }) {
  return (
    <div className="trust-item text-center">
      <div className="font-display text-4xl font-semibold tracking-tightest text-ink sm:text-5xl">
        {s.value}
        {s.star && <span className="ms-1 text-accent">★</span>}
      </div>
      <div className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-muted sm:text-sm">{s.label}</div>
    </div>
  );
}

export default function TrustStats() {
  const root = useRef(null);

  useEffect(() => {
    registerGsap();
    const el = root.current; if (!el) return;
    const badges = gsap.utils.toArray(el.querySelectorAll('.trust-badge'));
    if (!badges.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.set(badges, { opacity: 0, y: 20 });
      ScrollTrigger.batch(badges, { start: 'top 94%', once: true, onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', stagger: 0.07, overwrite: true }) });
    }, el);
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    const safety = setTimeout(() => gsap.to(badges, { opacity: 1, y: 0, duration: 0.4, overwrite: true }), 2200);
    return () => { cancelAnimationFrame(raf); clearTimeout(safety); ctx.revert(); };
  }, []);

  return (
    <section ref={root} className="border-y border-line bg-paper py-14 sm:py-16">
      <div className="container-px">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {TRUST_STATS.map((s) => <Stat key={s.label} s={s} />)}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 border-t border-line pt-10">
          {TRUST_BADGES.map((b) => (
            <span key={b} className="trust-badge inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-3.5 w-3.5 text-accent"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}