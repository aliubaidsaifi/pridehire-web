'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { SERVICES } from '@/lib/site';
import { gsap, ScrollTrigger, registerGsap } from '@/animations/scrollAnimations';

const ICONS = {
  'website-development':  <path d="M4 6h16v10H4zM9 20h6M12 16v4" />,
  'ecommerce-development':<path d="M5 7h14l-1.2 8H6.2L5 7zM5 7L4 4H2M9 20h.01M17 20h.01" />,
  'seo':                  <path d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-5-5" />,
  'google-ads':           <path d="M4 19V5M4 15l5-4 4 3 7-7M20 9V5h-4" />,
  'meta-ads':             <path d="M7 10v8M7 10a3 3 0 013-3h1l3-3v14l-3-3h-1a3 3 0 01-3-3z" />,
  'ai-automation':        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M8 8h8v8H8z" />,
  'website-maintenance':  <path d="M14 6l4 4-8 8-4 1 1-4 8-8zM13 7l4 4" />,
};

const TINTS = [
  'from-accent/15 to-accent/5',
  'from-ink/10 to-ink/[0.03]',
  'from-[#EADFff]/60 to-[#EADFff]/20',
  'from-accent/12 to-paper',
  'from-[#DDEBFF]/70 to-[#DDEBFF]/20',
  'from-ink/[0.08] to-paper',
  'from-accent/10 to-accent/[0.03]',
];

function Card({ s, i }) {
  // ✅ Fix 1: sm:mt-20 — stagger sm breakpoint se hi shuru hoga (640px+)
  // Even index = normal, Odd index = pushed down
  const offset = i % 2 === 1 ? 'sm:mt-20' : 'sm:mt-0';

  return (
    <Link href={`/services/${s.slug}`} className={`svc-card group block ${offset}`}>

      {/* ✅ Fix 2: p-4 added — breathing space around image (Cuberto style floating) */}
      <div className="svc-media relative overflow-hidden rounded-[2rem] border border-line bg-paper p-4">
        {/* Inner image container — aspect ratio maintained inside padding */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem]">
          <div className={`absolute inset-0 bg-gradient-to-br ${TINTS[i % TINTS.length]}`} />

          {/* Icon floating in center */}
          <div className="svc-float absolute inset-0 grid place-items-center">
            <span className="grid h-24 w-24 place-items-center rounded-3xl border border-line
                             bg-white/80 text-ink shadow-soft backdrop-blur-sm
                             transition-transform duration-700 ease-expo
                             group-hover:-translate-y-2 group-hover:rotate-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                className="h-11 w-11">
                {ICONS[s.slug]}
              </svg>
            </span>
          </div>

          {/* Product image */}
          <img
            src={`/services/${s.slug}.webp`}
            alt={s.title}
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            className="absolute inset-0 h-full w-full object-cover
                       transition-transform duration-700 ease-expo group-hover:scale-[1.06]"
          />

          {/* Arrow button on hover */}
          <span className="absolute end-4 top-4 grid h-11 w-11 translate-y-1
                           place-items-center rounded-full bg-white text-ink opacity-0
                           shadow-soft transition-all duration-500 ease-expo
                           group-hover:translate-y-0 group-hover:opacity-100">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.8" className="h-4 w-4">
              <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>

      {/* ✅ Fix 3: Bigger title + more spacing */}
      <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink
                     transition-colors duration-300 group-hover:text-accent sm:text-[1.65rem]">
        {s.title}
      </h3>
      <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-muted sm:text-base">
        {s.outcome}
      </p>
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
      gsap.set(cards, { opacity: 0, y: 48 });
      ScrollTrigger.batch(cards, {
        start: 'top 92%', once: true,
        onEnter: (b) => gsap.to(b, {
          opacity: 1, y: 0, duration: 1,
          ease: 'expo.out', stagger: 0.12, overwrite: true,
        }),
      });
      cards.forEach((card) => {
        const media = card.querySelector('.svc-media');
        if (!media) return;
        gsap.fromTo(media, { y: 18 }, {
          y: -18, ease: 'none',
          scrollTrigger: {
            trigger: card, start: 'top bottom',
            end: 'bottom top', scrub: 1,
          },
        });
      });
    }, el);

    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    const safety = setTimeout(() =>
      gsap.to(cards, { opacity: 1, y: 0, duration: 0.4, overwrite: true }), 2400);

    return () => { cancelAnimationFrame(raf); clearTimeout(safety); ctx.revert(); };
  }, []);

  return (
    <section id="services" ref={root} className="py-16 sm:py-28">
      <div className="container-px">

        {/* ✅ Fix 4: Bigger heading + more breathing space */}
        <div className="max-w-2xl">
          <span className="eyebrow">Services</span>
          <h2 className="mt-5 font-display text-5xl font-semibold tracking-tightest
                         text-ink sm:text-7xl">
            Our services
          </h2>
          <p className="mt-5 text-pretty text-muted sm:text-lg">
            From high-converting websites to SEO and ads — everything your business
            needs to get more customers.
          </p>
        </div>

        {/* ✅ Fix 5: items-start — columns independent height rakhti hain stagger ke liye */}
        <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 sm:items-start">
          {SERVICES.map((s, i) => <Card key={s.slug} s={s} i={i} />)}
        </div>

        <div className="mt-16 flex justify-center">
          <Link href="/services" className="btn-ghost">View all services</Link>
        </div>
      </div>
    </section>
  );
}