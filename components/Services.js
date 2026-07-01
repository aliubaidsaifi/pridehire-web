'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { SERVICES } from '@/lib/site';
import { gsap, ScrollTrigger, registerGsap } from '@/animations/scrollAnimations';

const ICONS = {
  'ui-ux': <path d="M4 5h16v10H4zM8 19h8M12 15v4" />,
  'web-development': <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />,
  'saas-development': <path d="M4 7h16v4H4zM4 13h10v4H4zM17 14h3" />,
  branding: <path d="M12 3l2.5 5L20 9l-4 3.8L17 18l-5-2.6L7 18l1-5.2L4 9l5.5-1L12 3z" />,
  'performance-marketing': <path d="M4 19V5M4 15l5-4 4 3 7-7M20 9V5h-4" />,
};

function Card({ service }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="reveal-card group relative flex flex-col rounded-3xl border border-line bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-canvas text-brand-violet transition-colors group-hover:bg-brand-gradient group-hover:text-white">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          {ICONS[service.slug]}
        </svg>
      </span>

      <h3 className="mt-6 font-display text-xl font-semibold text-ink">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{service.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {service.points.map((p) => (
          <span key={p} className="rounded-full border border-line px-3 py-1 text-xs font-medium text-ink/60">
            {p}
          </span>
        ))}
      </div>

      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-violet">
        Learn more
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 transition-transform group-hover:translate-x-1">
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
    const el = root.current;
    if (!el) return;

    const cards = gsap.utils.toArray(el.querySelectorAll('.reveal-card'));
    if (!cards.length) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return; // cards stay visible

    const ctx = gsap.context(() => {
      gsap.set(cards, { opacity: 0, y: 24 });

      ScrollTrigger.batch(cards, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.08,
            overwrite: true,
          }),
      });
    }, el);

    // Positions recalc after layout/fonts settle (fixes "cards only appear after refresh").
    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);

    // SAFETY NET: agar trigger kabhi fail ho, 2.4s baad cards force-visible.
    const safety = setTimeout(() => {
      gsap.to(cards, { opacity: 1, y: 0, duration: 0.4, overwrite: true });
    }, 2400);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safety);
      ctx.revert();
    };
  }, []);

  return (
    <section id="services" ref={root} className="py-24 sm:py-32">
      <div className="container-px">
        <div className="max-w-2xl">
          <span className="eyebrow">What we do</span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest text-ink sm:text-5xl">
            Services built around outcomes
          </h2>
          <p className="mt-4 text-pretty text-muted sm:text-lg">
            From first wireframe to scaled platform — one team across design, engineering and growth.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Card key={s.slug} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}