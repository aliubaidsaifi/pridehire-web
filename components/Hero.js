'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { gsap, registerGsap } from '@/animations/scrollAnimations';

export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    registerGsap();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.from('[data-r="eyebrow"]', { y: 18, opacity: 0, duration: 0.8 })
        .from('[data-r="line"]', { yPercent: 110, duration: 1.05, stagger: 0.09 }, '-=0.5')
        .from('[data-r="sub"]', { y: 22, opacity: 0, duration: 0.9 }, '-=0.65')
        .from('[data-r="cta"]', { y: 18, opacity: 0, duration: 0.8, stagger: 0.08 }, '-=0.6')
        .from('[data-r="mock"]', { y: 40, opacity: 0, scale: 0.97, duration: 1.1 }, '-=0.8')
        .from('[data-r="meta"]', { opacity: 0, duration: 0.8 }, '-=0.6');
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden pt-32 sm:pt-40 lg:pt-44">
      <div aria-hidden className="bg-grid bg-grid-fade pointer-events-none absolute inset-x-0 top-0 h-[560px]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-ink/[0.03] blur-[120px]" />

      <div className="container-px relative grid items-center gap-14 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24">
        <div>
          <span data-r="eyebrow" className="eyebrow">Digital growth agency · Auckland, NZ</span>

          <h1 className="mt-6 font-display text-[2.7rem] font-semibold leading-[1.03] tracking-tightest text-ink sm:text-6xl lg:text-[4.2rem]">
            <span className="block overflow-hidden pb-0.5"><span data-r="line" className="block">Grow your business</span></span>
            <span className="block overflow-hidden pb-0.5"><span data-r="line" className="block">with high-converting</span></span>
            <span className="block overflow-hidden pb-1"><span data-r="line" className="block">websites, SEO &amp; ads.</span></span>
          </h1>

          <p data-r="sub" className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted">
            Helping Auckland businesses generate more leads, customers and sales with premium digital solutions.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link data-r="cta" href="/free-audit" className="btn-primary">{SITE.cta.primary}</Link>
            <Link data-r="cta" href="/contact" className="btn-ghost">{SITE.cta.secondary}</Link>
          </div>

          <div data-r="meta" className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-2 text-sm text-muted">
            <span>Free 24-hour audits</span>
            <span className="h-1 w-1 rounded-full bg-line" />
            <span>No lock-in contracts</span>
            <span className="h-1 w-1 rounded-full bg-line" />
            <span>You own everything</span>
          </div>
        </div>

        {/* Minimal monochrome dashboard illustration */}
        <div data-r="mock" className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="rounded-3xl border border-line bg-white p-2 shadow-lift">
            <div className="flex items-center gap-1.5 rounded-t-2xl border-b border-line bg-paper px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="ml-3 h-5 flex-1 rounded-md bg-white" />
            </div>

            <div className="grid gap-3 p-4 sm:grid-cols-[1fr_1fr]">
              <div className="rounded-2xl border border-line p-4">
                <div className="text-[11px] font-medium uppercase tracking-wider text-muted">Enquiries</div>
                <div className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-ink">128</div>
                <div className="mt-1 text-xs text-muted">+42% this month</div>
              </div>
              <div className="rounded-2xl border border-line p-4">
                <div className="text-[11px] font-medium uppercase tracking-wider text-muted">Google rank</div>
                <div className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-ink">#1</div>
                <div className="mt-1 text-xs text-muted">“plumber auckland”</div>
              </div>

              <div className="rounded-2xl border border-line p-4 sm:col-span-2">
                <div className="flex items-end gap-2" style={{ height: 96 }}>
                  {[34, 46, 40, 56, 62, 74, 90].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-[5px] bg-ink" style={{ height: `${h}%`, opacity: 0.16 + i * 0.12 }} />
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-muted"><span>Week 1</span><span>Week 7</span></div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-line p-3.5 sm:col-span-2">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-4 w-4"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <div className="text-sm"><span className="font-semibold text-ink">Free audit delivered</span><span className="text-muted"> — within 24 hours</span></div>
              </div>
            </div>
          </div>

          <div className="absolute -left-4 top-8 hidden rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-ink shadow-soft lg:block">
            ★ 5.0 local reviews
          </div>
        </div>
      </div>
    </section>
  );
}