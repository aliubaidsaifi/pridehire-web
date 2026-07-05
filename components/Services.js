'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { SERVICES } from '@/lib/site';
import { gsap, ScrollTrigger, registerGsap } from '@/animations/scrollAnimations';

const ICONS = {
  'website-development': <path d="M4 6h16v10H4zM9 20h6M12 16v4" />,
  'ecommerce-development': <path d="M5 7h14l-1.2 8H6.2L5 7zM5 7L4 4H2M9 20h.01M17 20h.01" />,
  'seo': <path d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-5-5" />,
  'google-ads': <path d="M4 19V5M4 15l5-4 4 3 7-7M20 9V5h-4" />,
  'meta-ads': <path d="M7 10v8M7 10a3 3 0 013-3h1l3-3v14l-3-3h-1a3 3 0 01-3-3z" />,
  'ai-automation': <path d="M12 3v3M12 18v3M3 12h3M18 12h3M8 8h8v8H8z" />,
  'website-maintenance': <path d="M14 6l4 4-8 8-4 1 1-4 8-8zM13 7l4 4" />,
};

function Card({ s }) {
  return (
    <Link href={`/services#${s.slug}`}
      className="svc-card group flex flex-col rounded-3xl border border-line bg-white p-7 transition-all duration-500 ease-expo hover:-translate-y-1.5 hover:shadow-lift">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-paper text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-white">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">{ICONS[s.slug]}</svg>
      </span>
      <h3 className="mt-6 font-display text-lg font-semibold text-ink">{s.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.outcome}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
        Learn more
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-1">
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}

export default function Services() {
  const root = useRef(null);
  useEffect(() => {
    registerGsap();
    const el = root.current; if (!el) return;
    const cards = gsap.utils.toArray(el.querySelectorAll('.svc-card'));
    if (!cards.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.set(cards, { opacity: 0, y: 26 });
      ScrollTrigger.batch(cards, { start: 'top 92%', once: true, onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.07, overwrite: true }) });
    }, el);
    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    const safety = setTimeout(() => gsap.to(cards, { opacity: 1, y: 0, duration: 0.4, overwrite: true }), 2400);
    return () => { cancelAnimationFrame(raf); clearTimeout(safety); ctx.revert(); };
  }, []);

  return (
    <section id="services" ref={root} className="py-24 sm:py-32">
      <div className="container-px">
        <div className="max-w-2xl">
          <span className="eyebrow">Services</span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest text-ink sm:text-5xl">
            Everything you need to get more customers
          </h2>
          <p className="mt-4 text-pretty text-muted sm:text-lg">One team for your website, Google ranking and ads — all pulling in the same direction.</p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => <Card key={s.slug} s={s} />)}
        </div>
      </div>
    </section>
  );
}