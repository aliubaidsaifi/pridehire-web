'use client';

import Link from 'next/link';

export default function AuditCTA() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-px">
        <div className="relative overflow-hidden rounded-4xl bg-ink px-7 py-20 text-center sm:px-12 sm:py-28">
          <div aria-hidden className="pointer-events-none absolute -top-28 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-white/10 blur-[120px]" />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.03] tracking-tightest text-white sm:text-6xl">
              Ready to grow your business?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-white/60 sm:text-lg">
              Get a free, honest audit of your website and Google presence — delivered within 24 hours.
            </p>
            <div className="mt-9">
              <Link href="/free-audit" className="btn bg-white text-ink hover:shadow-lift">
                Get Free Website Audit
              </Link>
            </div>
            <p className="mt-7 text-xs text-white/40">Free · No obligation · No lock-in</p>
          </div>
        </div>
      </div>
    </section>
  );
}