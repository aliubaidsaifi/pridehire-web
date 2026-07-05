'use client';

import { WHY } from '@/lib/site';

export default function WhyUs() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-px">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">Why Pride Hire</span>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tightest text-ink sm:text-6xl">
            Trust is earned through honesty.
          </h2>
          <p className="mt-5 text-pretty text-muted sm:text-lg">
            We don&apos;t promise overnight success. We focus on honest advice, quality work and long-term partnerships.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w, i) => (
            <div key={w.title} className="rounded-3xl border border-line bg-white p-7 transition-all duration-500 ease-expo hover:-translate-y-1 hover:shadow-soft">
              <span className="font-display text-sm font-semibold text-muted">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{w.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}