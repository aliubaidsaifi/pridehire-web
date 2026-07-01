'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { revealOnScroll } from '@/animations/scrollAnimations';

export default function CTA() {
  const root = useRef(null);

  useEffect(() => {
    if (!root.current) return;
    return revealOnScroll(root.current, root.current.querySelectorAll('.reveal'), {
      trigger: root.current,
      start: 'top 80%',
    });
  }, []);

  return (
    <section ref={root} className="pb-24 sm:pb-32">
      <div className="container-px">
        <div className="relative overflow-hidden rounded-4xl bg-ink px-7 py-16 text-center sm:px-12 sm:py-24">
          {/* gradient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-violet/40 blur-[120px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-brand-indigo/30 blur-[130px]"
          />

          <div className="relative">
            <h2 className="reveal mx-auto max-w-3xl font-display text-3xl font-semibold tracking-tightest text-white sm:text-6xl">
              Have an idea? Let&apos;s build something amazing.
            </h2>
            <p className="reveal mx-auto mt-5 max-w-xl text-pretty text-white/70 sm:text-lg">
              Tell us where you want to go. We&apos;ll map the fastest credible path to get there.
            </p>
            <div className="reveal mt-9">
              <Link
                href="/contact"
                className="btn inline-flex bg-white text-ink hover:-translate-y-0.5 hover:shadow-lift"
              >
                {SITE.cta.primary}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
