'use client';

import { useEffect, useRef } from 'react';
import { WHY, STATS } from '@/lib/site';
import { revealOnScroll, countUp } from '@/animations/scrollAnimations';

function Stat({ value, suffix, label }) {
  const ref = useRef(null);
  useEffect(() => countUp(ref.current, value, { suffix }), [value, suffix]);

  return (
    <div className="text-center sm:text-left">
      <div
        ref={ref}
        className="font-display text-4xl font-semibold tracking-tightest text-ink sm:text-5xl"
      >
        0{suffix}
      </div>
      <div className="mt-2 text-sm text-muted">{label}</div>
    </div>
  );
}

export default function WhyPrideHire() {
  const root = useRef(null);

  useEffect(() => {
    if (!root.current) return;
    const items = root.current.querySelectorAll('.reveal');
    return revealOnScroll(root.current, items, { trigger: root.current, start: 'top 75%' });
  }, []);

  return (
    <section ref={root} className="py-24 sm:py-32">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <span className="eyebrow">Why PrideHire</span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest text-ink sm:text-5xl">
              A studio engineered for momentum
            </h2>
            <p className="mt-4 text-pretty text-muted sm:text-lg">
              We pair senior design and engineering so decisions move fast and ship clean — the way
              a product team should feel.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-line pt-10">
              {STATS.map((s) => (
                <Stat key={s.label} {...s} />
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {WHY.map((w) => (
              <div
                key={w.title}
                className="reveal rounded-3xl border border-line bg-white p-6 shadow-soft"
              >
                <h3 className="font-display text-lg font-semibold text-ink">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
