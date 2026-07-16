'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { RESULTS } from '@/lib/site';
import { gsap, ScrollTrigger, registerGsap } from '@/animations/scrollAnimations';

const TINTS = [
  'from-[#4b3df5] to-[#7c6cff]',
  'from-[#0f172a] to-[#334155]',
  'from-accent to-[#f5a58f]',
  'from-[#1e40af] to-[#3b82f6]',
  'from-[#111113] to-[#3f3f46]',
  'from-[#7c3aed] to-[#c084fc]',
];

function Card({ p, i }) {
  const tint = TINTS[i % TINTS.length];

  return (
    <Link href={`/portfolio/${p.slug}`} className="proj-card group mb-8 block break-inside-avoid">
      {/* fixed 4:5 frame — image sits INSIDE it, never cropped */}
      <div className="proj-media relative aspect-[4/5] overflow-hidden rounded-3xl">
        <div className={`absolute inset-0 bg-gradient-to-br ${tint}`} />

        <div className="absolute inset-0 grid place-items-center p-5 sm:p-7">
          <img
            src={p.image}
            alt={p.client}
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            className="max-h-full max-w-full rounded-xl object-contain shadow-lift transition-transform duration-[900ms] ease-expo group-hover:scale-[1.04]"
          />
        </div>

        <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-tight text-ink shadow-soft backdrop-blur">
          {p.metric}
        </span>

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
      cards.forEach((card) => {
        const media = card.querySelector('.proj-media');
        if (!media) return;
        gsap.fromTo(media, { y: 16 }, { y: -16, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1 } });
      });
    }, el);
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
    const safety = setTimeout(() => gsap.to(cards, { opacity: 1, y: 0, duration: 0.4, overwrite: true }), 2400);
    return () => { cancelAnimationFrame(raf); clearTimeout(safety); ctx.revert(); };
  }, []);

  return (
    <section ref={root} className="py-16 sm:py-28">
      <div className="container-px">
        <div className="max-w-2xl">
          <span className="eyebrow">Portfolio</span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tightest text-ink sm:text-6xl">Featured projects</h2>
          <p className="mt-4 text-pretty text-muted sm:text-lg">A few of the businesses we&apos;ve helped grow — measured in real results.</p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {RESULTS.map((p, i) => <Card key={p.slug} p={p} i={i} />)}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/portfolio" className="btn-ghost">View all projects</Link>
        </div>
      </div>
    </section>
  );
}