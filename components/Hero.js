'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { SITE, SERVICES } from '@/lib/site';
import { gsap, ScrollTrigger, registerGsap } from '@/animations/scrollAnimations';

function toQuery(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '+').replace(/^\+|\+$/g, '');
}

const TRUST = [
  { value: '5.0', label: 'Rating', star: true },
  { value: '100+', label: 'Projects' },
  { value: '5+', label: 'Years' },
  { value: '24h', label: 'Response' },
];

export default function Hero() {
  const root = useRef(null);
  const queries = SERVICES.length ? SERVICES.map((s) => toQuery(s.title)) : ['web+agency'];
  const [queryIdx, setQueryIdx] = useState(0);

  useEffect(() => {
    if (queries.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setQueryIdx((i) => (i + 1) % queries.length), 2600);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    registerGsap();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.from('[data-r="eyebrow"]', { y: 18, opacity: 0, duration: 0.8 })
        .from('[data-r="line"]', { yPercent: 110, duration: 1.05, stagger: 0.09 }, '-=0.5')
        .from('[data-r="sub"]', { y: 22, opacity: 0, duration: 0.9 }, '-=0.65')
        .from('[data-r="trust"]', { y: 16, opacity: 0, duration: 0.7, stagger: 0.06 }, '-=0.55')
        .from('[data-r="cta"]', { y: 16, opacity: 0, duration: 0.7, stagger: 0.08 }, '-=0.5')
        .from('[data-r="pill"]', { y: 12, opacity: 0, duration: 0.5, stagger: 0.04 }, '-=0.5')
        .from('[data-r="photo"]', { y: 40, opacity: 0, scale: 0.96, duration: 1.2 }, '-=1')
        .from('[data-r="chrome"]', { y: 26, opacity: 0, duration: 0.8, ease: 'back.out(1.6)' }, '-=0.5');

      gsap.to('[data-r="photo-inner"]', { scale: 1.15, y: -18, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1 } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
   <section ref={root} className="relative overflow-hidden pt-32 sm:pt-40 lg:pt-44">
      <div aria-hidden className="bg-grid bg-grid-fade pointer-events-none absolute inset-x-0 top-0 h-[640px]" />

      {/* subject-tied background glyph, replaces generic blur blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-4 select-none font-display text-[26rem] font-semibold leading-none text-ink/[0.03]"
      >
        {'</>'}
      </div>

      <div className="container-px relative grid items-center gap-14 pb-16 lg:grid-cols-[1fr_1.02fr] lg:gap-12 lg:pb-24">
        <div>
          <span data-r="eyebrow" className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Premium digital agency
          </span>

          <h1 className="mt-6 font-display text-[3rem] font-semibold leading-[1.0] tracking-tightest text-ink sm:text-6xl lg:text-[4.7rem]">
            <span className="block overflow-hidden pb-1"><span data-r="line" className="block">Grow your business</span></span>
            <span className="block overflow-hidden pb-1"><span data-r="line" className="block">with premium</span></span>
            <span className="block overflow-hidden pb-2"><span data-r="line" className="block text-accent">digital solutions</span></span>
          </h1>

          <p data-r="sub" className="mt-7 max-w-md text-pretty text-lg leading-relaxed text-muted">
            Websites, design, ads and automation — everything you need to get found, look premium and win more customers.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link data-r="cta" href="/free-audit" className="btn-primary">{SITE.cta.primary}</Link>
            <Link data-r="cta" href="/contact" className="btn-ghost">{SITE.cta.secondary}</Link>
          </div>

          {/* trust row: editorial divider list instead of default stat-card grid */}
          {/* <div className="mt-10 flex flex-wrap items-center divide-x divide-line">
            {TRUST.map((t) => (
              <div key={t.label} data-r="trust" className="flex flex-col gap-0.5 px-4 first:pl-0">
                <span className="flex items-baseline gap-1 font-display text-xl font-semibold tracking-tight text-ink">
                  {t.value}{t.star && <span className="text-accent">★</span>}
                </span>
                <span className="text-xs uppercase tracking-wide text-muted">{t.label}</span>
              </div>
            ))}
          </div> */}

          <div className="mt-10 flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <span key={s.slug} data-r="pill" className="rounded-full border border-line bg-white/50 px-3.5 py-1.5 text-[0.8rem] font-medium text-muted transition-colors hover:border-accent/40 hover:text-ink">{s.title}</span>
            ))}
          </div>
        </div>

        <div data-r="photo" className="relative mx-auto w-full max-w-lg pb-14 lg:max-w-none lg:pb-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_40px_90px_-28px_rgba(10,10,11,0.3)] sm:aspect-[5/6]">
            <img
              data-r="photo-inner"
              src="/hero-photo.webp"
              alt="Our team building premium digital experiences"
              className="absolute inset-0 h-full w-full object-cover object-center"
              onError={(e) => { e.currentTarget.parentElement.classList.add('show-ph'); e.currentTarget.style.display = 'none'; }}
            />
            {/* duotone overlay ties the photo to the accent palette */}
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/0 to-accent/10 mix-blend-multiply" />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,theme(colors.accent/25%),transparent_55%)]" />

            <div className="hero-ph absolute inset-0 hidden flex-col items-center justify-center gap-3 bg-gradient-to-br from-paper to-white text-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-14 w-14 text-ink/25"><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <p className="max-w-[200px] text-sm text-muted">Add <code className="rounded bg-ink/5 px-1.5 py-0.5 text-xs text-ink">/public/hero-photo.webp</code></p>
            </div>
          </div>

          {/* signature element: a browser-chrome card — ties the "ranked on Google" claim to the agency's own medium (the web) instead of a generic badge */}
          <div data-r="chrome" className="absolute -bottom-0 left-1/2 w-[92%] -translate-x-1/2 overflow-hidden rounded-xl border border-line bg-white shadow-lift lg:-bottom-7 lg:left-6 lg:w-72 lg:translate-x-0">
            <div className="flex items-center gap-1.5 border-b border-line bg-paper px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-ink/15" />
              <span className="h-2 w-2 rounded-full bg-ink/15" />
              <span className="h-2 w-2 rounded-full bg-ink/15" />
              <span className="ml-2 flex-1 truncate rounded-md bg-white px-2 py-0.5 text-[10px] text-muted transition-opacity duration-300">
                google.com/search?q={queries[queryIdx]}
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <div className="text-[10px] uppercase tracking-wide text-muted">Search ranking</div>
                <div className="font-display text-base font-semibold text-ink">#1 result</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wide text-muted">Leads, 30d</div>
                <div className="font-display text-base font-semibold text-accent">+42%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global([data-r="photo"] .show-ph .hero-ph) { display: flex; }
      `}</style>
    </section>
  );
}