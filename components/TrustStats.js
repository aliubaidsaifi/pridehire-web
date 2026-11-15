'use client';

import { useEffect, useRef, useState } from 'react';
import { TRUST_STATS, TRUST_BADGES } from '@/lib/site';
import { gsap, ScrollTrigger, registerGsap } from '@/animations/scrollAnimations';

function parseValue(v) {
  const m = String(v).match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
  if (!m) return { prefix: '', num: null, suffix: '', raw: v };
  const dec = m[2].includes('.') ? m[2].split('.')[1].length : 0;
  return { prefix: m[1], num: parseFloat(m[2]), suffix: m[3], dec };
}

function Stat({ s }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState('0');
  const parsed = parseValue(s.value);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (parsed.num === null || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(s.value); return;
    }
    const obj = { n: 0 };
    const st = ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => {
        gsap.to(obj, {
          n: parsed.num, duration: 1.6, ease: 'expo.out',
          onUpdate: () => setDisplay(`${parsed.prefix}${obj.n.toFixed(parsed.dec)}${parsed.suffix}`),
        });
      },
    });
    return () => st.kill();
  }, [s.value]);

  return (
    <div ref={ref} className="trust-item text-center">
      <div className="font-display text-4xl font-semibold tracking-tightest text-ink sm:text-5xl">
        {parsed.num === null ? s.value : display}
        {s.star && <span className="ml-1 text-accent">★</span>}
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
        <div className="flex flex-wrap items-start justify-center gap-x-16 gap-y-10">
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