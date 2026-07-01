'use client';

import { useEffect, useRef, useState } from 'react';
import { TESTIMONIALS } from '@/lib/site';

const AVATAR_GRADIENTS = [
  'from-violet-500 to-indigo-500',
  'from-indigo-500 to-sky-500',
  'from-fuchsia-500 to-violet-500',
  'from-emerald-500 to-teal-500',
];

const initials = (name) =>
  name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-4 w-4 fill-amber-400">
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.7 1.4 6.8L12 17.8 5.9 20.5l1.4-6.8L2.2 9l6.9-.7L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);
  const count = TESTIMONIALS.length;

  const go = (i) => setActive((i + count) % count);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => setActive((i) => (i + 1) % count), 6000);
    return () => clearInterval(timer.current);
  }, [paused]);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-violet/10 blur-[120px]" />
      <div className="container-px relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Testimonials</span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest text-ink sm:text-5xl">
            Teams that trust the work
          </h2>
          <p className="mt-4 text-pretty text-muted">
            Real words from founders and teams we&apos;ve shipped with.
          </p>
        </div>

        <div
          className="relative mx-auto mt-14 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          aria-roledescription="carousel"
        >
          <div className="relative overflow-hidden rounded-4xl border border-line bg-white shadow-lift">
            <div className="h-1.5 w-full bg-brand-gradient" />
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {TESTIMONIALS.map((t, i) => (
                <figure key={t.name} className="w-full shrink-0 p-8 sm:p-12">
                  <div className="flex items-center justify-between">
                    <Stars />
                    <span className="font-display text-5xl leading-none text-brand-glow/40">”</span>
                  </div>
                  <blockquote className="mt-5 text-pretty font-display text-xl font-medium leading-relaxed text-ink sm:text-[1.65rem] sm:leading-relaxed">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4">
                    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]} text-sm font-semibold text-white shadow-lift`}>
                      {initials(t.name)}
                    </span>
                    <div className="text-left">
                      <div className="font-display font-semibold text-ink">{t.name}</div>
                      <div className="text-sm text-muted">{t.role}</div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="mt-7 flex items-center justify-center gap-5">
            <button type="button" onClick={() => go(active - 1)} aria-label="Previous testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink transition-all hover:-translate-y-0.5 hover:shadow-soft">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, i) => (
                <button key={t.name} onClick={() => setActive(i)} aria-label={`Show testimonial ${i + 1}`} aria-current={i === active}
                  className={`h-2 rounded-full transition-all ${i === active ? 'w-7 bg-brand-gradient' : 'w-2 bg-line hover:bg-ink/20'}`} />
              ))}
            </div>
            <button type="button" onClick={() => go(active + 1)} aria-label="Next testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink transition-all hover:-translate-y-0.5 hover:shadow-soft">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}