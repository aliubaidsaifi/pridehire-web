'use client';

import Link from 'next/link';
import { RESULTS } from '@/lib/site';

export default function PortfolioPreview() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="container-px">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="eyebrow">Portfolio</span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest text-ink sm:text-5xl">
              Work measured in results
            </h2>
          </div>
          <Link href="/portfolio" className="btn-ghost">View all projects</Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {RESULTS.map((r) => (
            <article key={r.client} className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all duration-500 ease-expo hover:-translate-y-1.5 hover:shadow-lift">
              <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-paper">
                {r.image ? (
                  <img src={r.image} alt={r.client} loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-display text-4xl font-semibold tracking-tightest text-ink/80">{r.metric}</span>
                  </div>
                )}
                <span className="absolute left-4 top-4 rounded-full border border-line bg-white px-3 py-1 text-[11px] font-semibold text-ink">{r.industry}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-semibold text-ink">{r.client}</h3>
                <p className="mt-1 text-sm text-muted">{r.metric} {r.label}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-medium text-muted">
                  <span className="rounded-full bg-paper px-2.5 py-1">{r.tech}</span>
                  <span className="rounded-full bg-paper px-2.5 py-1">{r.timeline}</span>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                  View project
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}