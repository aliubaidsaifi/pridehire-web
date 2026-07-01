'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { gsap, registerGsap } from '@/animations/scrollAnimations';

// 3D is client-only and code-split so it never blocks first paint.
const Hero3D = dynamic(() => import('@/components/Hero3D'), {
  ssr: false,
  loading: () => <Hero3DFallback />,
});

function Hero3DFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-48 w-48 animate-pulse rounded-full bg-brand-gradient opacity-30 blur-2xl" />
    </div>
  );
}

export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    registerGsap();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('[data-reveal="eyebrow"]', { y: 16, opacity: 0, duration: 0.6 })
        .from(
          '[data-reveal="line"]',
          { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.12 },
          '-=0.3'
        )
        .from('[data-reveal="desc"]', { y: 20, opacity: 0, duration: 0.7 }, '-=0.5')
        .from('[data-reveal="cta"]', { y: 18, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
        .from('[data-reveal="stage"]', { opacity: 0, scale: 0.92, duration: 1.1 }, '-=0.9');
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-soft-radial pt-28 sm:pt-32 lg:pt-40"
    >
      {/* ambient gradient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-brand-violet/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-brand-indigo/15 blur-[130px]"
      />

      <div className="container-px grid items-center gap-10 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-28">
        <div>
          <span data-reveal="eyebrow" className="eyebrow">
            Digital product studio
          </span>

          <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tightest text-ink sm:text-6xl lg:text-[4.3rem]">
            <span className="block overflow-hidden">
              <span data-reveal="line" className="block">
                We build digital
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-reveal="line" className="block">
                experiences that
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-reveal="line"
                className="block bg-brand-gradient bg-clip-text text-transparent"
              >
                grow businesses
              </span>
            </span>
          </h1>

          <p
            data-reveal="desc"
            className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted sm:text-lg"
          >
            {SITE.name} helps brands design, develop and scale powerful digital products.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link data-reveal="cta" href="/contact" className="btn-primary">
              {SITE.cta.primary}
            </Link>
            <Link data-reveal="cta" href="/services" className="btn-ghost">
              Explore Services
            </Link>
          </div>
        </div>

        {/* 3D stage */}
        <div
          data-reveal="stage"
          className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[400px] lg:max-w-none"
        >
          <div className="absolute inset-6 rounded-[2.5rem] bg-white/40 shadow-soft backdrop-blur-sm" />
          <div className="relative h-full w-full">
            <Hero3D />
          </div>
        </div>
      </div>
    </section>
  );
}
