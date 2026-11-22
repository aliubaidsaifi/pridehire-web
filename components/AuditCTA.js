'use client';

import Link from 'next/link';
import { PHONES } from '@/lib/markets';

// showPhones: the homepage closing block lists both numbers, labelled by who they serve.
export default function AuditCTA({ showPhones = false }) {
  return (
    <section className="py-4 sm:py-16">
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
              <Link href="/free-audit" className="btn bg-accent text-white shadow-lift hover:bg-accent-dark">
                Get Free Website Audit
              </Link>
            </div>
            <p className="mt-7 text-xs text-white/40">Free · No obligation · No lock-in</p>
            {showPhones && (
              <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-white/60 sm:flex-row sm:gap-10">
                <p>India &amp; international: <a href={`tel:${PHONES.IN.e164}`} className="font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">{PHONES.IN.display}</a></p>
                <p>Saudi Arabia: <a href={`tel:${PHONES.SA.e164}`} className="font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">{PHONES.SA.display}</a></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}