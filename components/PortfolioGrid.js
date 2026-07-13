'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { RESULTS, PROJECT_CATEGORIES } from '@/lib/site';
import { gsap, ScrollTrigger, registerGsap } from '@/animations/scrollAnimations';

const RATIOS = ['aspect-[3/4]', 'aspect-[4/5]', 'aspect-[1/1]', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[1/1]'];
const TINTS = [
  'from-[#4b3df5] to-[#7c6cff]',
  'from-[#0f172a] to-[#334155]',
  'from-accent to-[#f5a58f]',
  'from-[#1e40af] to-[#3b82f6]',
  'from-[#111113] to-[#3f3f46]',
  'from-[#7c3aed] to-[#c084fc]',
];

function Card({ p, i }) {
  return (
    <Link href="/contact" className="proj-card group mb-8 block break-inside-avoid">
      <div className={`proj-media relative ${RATIOS[i % RATIOS.length]} overflow-hidden rounded-3xl`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${TINTS[i % TINTS.length]}`} />
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-display text-6xl font-semibold tracking-tightest text-white/85">{p.metric}</span>
        </div>
        <img src={p.image} alt={p.client} loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-expo group-hover:scale-[1.05]" />
        <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
        <span className="absolute right-4 top-4 grid h-11 w-11 translate-y-1 place-items-center rounded-full bg-white text-ink opacity-0 shadow-soft transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4"><path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
      <div className="mt-4">
        <h3 className="font-display text-[15px] font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent">
          {p.client} <span className="text-muted">— {p.blurb}</span>
        </h3>
      </div>
    </Link>
  );
}

export default function PortfolioGrid() {
  const [active, setActive] = useState('All Projects');
  const root = useRef(null);

  const items = useMemo(
    () => (active === 'All Projects' ? RESULTS : RESULTS.filter((p) => p.category === active)),
    [active]
  );

  useEffect(() => {
    registerGsap();
    const el = root.current; if (!el) return;
    const cards = gsap.utils.toArray(el.querySelectorAll('.proj-card'));
    if (!cards.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { ScrollTrigger.refresh(); return; }
    const ctx = gsap.context(() => {
      gsap.fromTo(cards, { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.09, overwrite: true });
      cards.forEach((card) => {
        const media = card.querySelector('.proj-media');
        if (!media) return;
        gsap.fromTo(media, { y: 16 }, { y: -16, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1 } });
      });
    }, el);
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => { cancelAnimationFrame(raf); ctx.revert(); };
  }, [active]);

  return (
    <section ref={root} className="pb-8">
      <div className="container-px">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-b border-line pb-8">
          {PROJECT_CATEGORIES.map((cat) => (
            <button key={cat} type="button" onClick={() => setActive(cat)}
              className={`relative font-display text-lg font-semibold tracking-tight transition-colors sm:text-xl ${active === cat ? 'text-ink' : 'text-muted hover:text-ink'}`}>
              {cat}
              <span className={`absolute -bottom-[9px] left-0 h-0.5 w-full origin-left rounded-full bg-accent transition-transform duration-500 ease-expo ${active === cat ? 'scale-x-100' : 'scale-x-0'}`} />
            </button>
          ))}
        </div>

        <div key={active} className="mt-14 columns-1 gap-8 sm:columns-2">
          {items.map((p, i) => <Card key={p.slug} p={p} i={i} />)}
        </div>

        {items.length === 0 && <p className="py-16 text-center text-muted">No projects in this category yet.</p>}
      </div>
    </section>
  );
}