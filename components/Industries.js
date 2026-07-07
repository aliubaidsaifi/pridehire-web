'use client';

import Link from 'next/link';
import { INDUSTRIES } from '@/lib/site';

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

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {INDUSTRIES.map(({ name, image }) => (
            <div key={name}
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-ink">
              <img src={image} alt={name} loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 ease-expo group-hover:scale-110" />
              {/* dark gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-4 font-display text-base font-semibold text-white sm:text-lg">
                {name}
              </span>
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