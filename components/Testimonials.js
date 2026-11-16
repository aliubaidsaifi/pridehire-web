'use client';

import { useEffect, useRef, useState } from 'react';
import { TESTIMONIALS } from '@/lib/site';

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);
  const count = TESTIMONIALS.length;
  const go = (i) => setActive((i + count) % count);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => setActive((i) => (i + 1) % count), 6500);
    return () => clearInterval(timer.current);
  }, [paused]); // count is a module constant

  const t = TESTIMONIALS[active];

  return (
    <section className="py-24 sm:py-32" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container-px">
        <div className="flex items-center justify-between">
          <span className="eyebrow">What clients say</span>
          <span className="font-display text-sm font-semibold text-muted">
            {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
        </div>

        <figure key={active} className="quote-in mt-10">
          <blockquote className="max-w-4xl text-balance font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-5xl">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-gradient text-sm font-semibold text-white">
              {t.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
            </span>
            <div>
              <div className="font-semibold text-ink">{t.name}</div>
              <div className="text-sm text-muted">{t.role}</div>
            </div>
          </figcaption>
        </figure>

        <div className="mt-10 flex items-center gap-3">
          <NavBtn dir="prev" onClick={() => go(active - 1)} />
          <NavBtn dir="next" onClick={() => go(active + 1)} />
          <div className="ms-2 flex items-center gap-2">
            {TESTIMONIALS.map((x, i) => (
              <button key={x.name} onClick={() => setActive(i)} aria-label={`Show testimonial ${i + 1}`} aria-current={i === active}
                className={`h-1.5 rounded-full transition-all duration-500 ease-expo ${i === active ? 'w-8 bg-brand-gradient' : 'w-3 bg-line hover:bg-ink/20'}`} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .quote-in { animation: quoteIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes quoteIn {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) { .quote-in { animation: none; } }
      `}</style>
    </section>
  );
}

function NavBtn({ dir, onClick }) {
  return (
    <button type="button" onClick={onClick} aria-label={dir === 'prev' ? 'Previous testimonial' : 'Next testimonial'}
      className="grid h-12 w-12 place-items-center rounded-full border border-line bg-white text-ink transition-all duration-500 ease-expo hover:-translate-y-0.5 hover:border-transparent hover:bg-ink hover:text-white">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        {dir === 'prev' ? <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /> : <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />}
      </svg>
    </button>
  );
}