'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { SITE , SERVICES} from '@/lib/site';
import { gsap, ScrollTrigger, registerGsap } from '@/animations/scrollAnimations';

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
        .from('[data-r="pill"]', { y: 14, opacity: 0, duration: 0.5, stagger: 0.05 }, '-=0.5')
        .from('[data-r="visual"]', { y: 50, opacity: 0, scale: 0.96, duration: 1.15 }, '-=0.85')
        .from('[data-r="float"]', { y: 20, opacity: 0, duration: 0.7, stagger: 0.12 }, '-=0.7');

      gsap.to('[data-r="visual"]', {
        y: -40, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1 },
      });
      gsap.to('.hero-chip', {
        y: -10, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.4,
      });
      gsap.from('.hero-bar', { scaleY: 0, transformOrigin: 'bottom', duration: 1, ease: 'expo.out', stagger: 0.08, delay: 0.6 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden pt-32 sm:pt-40 lg:pt-44">
      <div aria-hidden className="bg-grid bg-grid-fade pointer-events-none absolute inset-x-0 top-0 h-[620px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-ink/[0.03] blur-[120px]" />

      <div className="container-px relative grid items-center gap-14 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24">
        <div>
          <span data-r="eyebrow" className="eyebrow">Premium digital agency ·</span>

          <h1 className="mt-6 font-display text-[2.7rem] font-semibold leading-[1.03] tracking-tightest text-ink sm:text-6xl lg:text-[4.2rem]">
            <span className="block overflow-hidden pb-0.5"><span data-r="line" className="block">Grow Your Business</span></span>
            <span className="block overflow-hidden pb-0.5"><span data-r="line" className="block">With Premium</span></span>
            <span className="block overflow-hidden pb-1"><span data-r="line" className="block text-accent">Digital Solutions</span></span>
          </h1>

          <p data-r="sub" className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted">
            Websites, design, ads and automation — everything you need to get found, look premium and win more customers.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link data-r="cta" href="/free-audit" className="btn-primary">{SITE.cta.primary}</Link>
            <Link data-r="cta" href="/contact" className="btn-ghost">{SITE.cta.secondary}</Link>
          </div>

          <div className="mt-9 flex flex-wrap gap-2.5">
            {SERVICES.map((s) => (
              <span key={s.slug} data-r="pill" className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink shadow-soft">{s.title}</span>
            ))}
          </div>
        </div>

        <div data-r="visual" className="relative mx-auto w-full max-w-md lg:max-w-none">
          <HeroImageOrDashboard />

          <div data-r="float" className="hero-chip absolute -left-4 top-10 hidden rounded-2xl border border-line bg-white px-4 py-3 shadow-lift lg:block">
            <div className="text-[11px] font-medium uppercase tracking-wider text-muted">This month</div>
            <div className="font-display text-xl font-semibold text-ink">+42% leads</div>
          </div>
          <div data-r="float" className="hero-chip absolute -bottom-5 right-6 hidden items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 shadow-lift lg:flex">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3 w-3"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <span className="text-sm font-semibold text-ink">Ranked #1 on Google</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroImageOrDashboard() {
  return (
    <div className="relative">
      <div className="rounded-[2rem] border border-line bg-white p-2 shadow-lift">
        <div className="flex items-center gap-1.5 rounded-t-[1.6rem] border-b border-line bg-paper px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="ml-3 h-5 flex-1 rounded-md bg-white" />
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-line p-4">
            <div className="text-[11px] font-medium uppercase tracking-wider text-muted">Enquiries</div>
            <div className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-ink">128</div>
            <div className="mt-1 text-xs text-accent">+42% this month</div>
          </div>
          <div className="rounded-2xl border border-line p-4">
            <div className="text-[11px] font-medium uppercase tracking-wider text-muted">Google rank</div>
            <div className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-ink">#1</div>
            <div className="mt-1 text-xs text-muted">&ldquo;plumber&rdquo;</div>
          </div>

          <div className="rounded-2xl border border-line p-4 sm:col-span-2">
            <div className="flex items-end gap-2" style={{ height: 96 }}>
              {[34, 46, 40, 56, 62, 74, 90].map((h, i) => (
                <div key={i} className="hero-bar flex-1 rounded-t-[5px]" style={{ height: `${h}%`, backgroundColor: i === 6 ? '#EE6A52' : '#0A0A0B', opacity: i === 6 ? 1 : 0.12 + i * 0.11 }} />
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
    </div>
  );
}