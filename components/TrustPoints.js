'use client';

import { TRUST_POINTS } from '@/lib/site';

export default function TrustPoints() {
  return (
    <section className="border-y border-line bg-paper py-12">
      <div className="container-px">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Why businesses choose Pride Hire
        </p>
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {TRUST_POINTS.map((t) => (
            <li key={t} className="flex items-center gap-2.5 font-display text-base font-medium text-ink sm:text-lg">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3 w-3"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}