'use client';

import Link from 'next/link';
import { INDUSTRIES } from '@/lib/site';

const ICON = <path d="M4 20h16M6 20V9l6-5 6 5v11M10 20v-6h4v6" />;

export default function Industries() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="container-px">
        <div className="max-w-2xl">
          <span className="eyebrow">Industries we serve</span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest text-ink sm:text-5xl">
            Built for local service businesses
          </h2>
          <p className="mt-4 text-pretty text-muted sm:text-lg">
            We know what makes customers in these industries pick up the phone — and we build for exactly that.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {INDUSTRIES.map((name) => (
            <div key={name}
              className="group flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 transition-all duration-500 ease-expo hover:-translate-y-0.5 hover:shadow-soft">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-paper text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">{ICON}</svg>
              </span>
              <span className="font-display text-sm font-semibold text-ink sm:text-base">{name}</span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted">
          Don&apos;t see your industry? <Link href="/free-audit" className="link-underline font-semibold text-ink">Get a free audit</Link> — we work with all local businesses.
        </p>
      </div>
    </section>
  );
}