'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { RESULTS } from '@/lib/site';
import { gsap, ScrollTrigger, registerGsap } from '@/animations/scrollAnimations';

function Card({ p }) {
  return (
    <Link href={`/portfolio/${p.slug}`} className="proj-card group relative block overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-soft transition-all duration-500 ease-expo hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-24px_rgba(10,10,11,0.35)]">
      <div className="proj-media relative aspect-[4/3] overflow-hidden bg-paper">
        <img
          src={p.image}
          alt={p.client}
          loading="lazy"
          onError={(e) => { e.currentTarget.style.opacity = '0'; }}
          className="h-full w-full object-cover object-top transition-transform duration-[1.1s] ease-expo group-hover:scale-[1.06]"
        />

        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/25 to-transparent opacity-70" />

        {p.metric && (
          <span className="absolute left-4 top-4 inline-flex items-baseline gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 shadow-soft backdrop-blur">
            <span className="font-display text-sm font-semibold text-ink">{p.metric}</span>
            <span className="text-[11px] text-muted">{p.label}</span>
          </span>
        )}

        {p.category && (
          <span className="absolute right-4 top-4 rounded-full bg-ink/75 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">{p.category}</span>
        )}

        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink via-ink/95 to-transparent p-6 pt-16 transition-transform duration-500 ease-expo group-hover:translate-y-0">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">{p.tag}</span>
              <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-white">{p.client}</h3>
              <p className="mt-1 text-sm text-white/70">{p.blurb}</p>
            </div>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="h-4 w-4"><path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 p-5 transition-opacity duration-300 group-hover:opacity-0">
        <div className="min-w-0">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">{p.tag}</span>
          <h3 className="mt-1 truncate font-display text-lg font-semibold tracking-tight text-ink">{p.client}</h3>
        </div>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 shrink-0 text-muted transition-transform duration-500 ease-expo group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    </Link>
  );
}

export default function PortfolioPreview() {
  const root = useRef(null);
  useEffect(() => {
    registerGsap();
    const el = root.current; if (!el) return;
    const cards = gsap.utils.toArray(el.querySelectorAll('.proj-card'));
    if (!cards.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.set(cards, { opacity: 0, y: 50 });
      ScrollTrigger.batch(cards, { start: 'top 92%', once: true, onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.12, overwrite: true }) });
    }, el);
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
    const safety = setTimeout(() => gsap.to(cards, { opacity: 1, y: 0, duration: 0.4, overwrite: true }), 2400);
    return () => { cancelAnimationFrame(raf); clearTimeout(safety); ctx.revert(); };
  }, []);

  return (
    <section ref={root} className="py-16 sm:py-28">
      <div className="container-px">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="eyebrow">Portfolio</span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tightest text-ink sm:text-6xl">Featured projects</h2>
            <p className="mt-4 text-pretty text-muted sm:text-lg">Selected projects we&apos;ve designed and built.</p>
          </div>
          <Link href="/portfolio" className="btn-ghost hidden sm:inline-flex">View all projects</Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {RESULTS.map((p) => <Card key={p.slug} p={p} />)}
        </div>

        <div className="mt-12 flex justify-center sm:hidden">
          <Link href="/portfolio" className="btn-ghost">View all projects</Link>
        </div>
      </div>
    </section>
  );
}