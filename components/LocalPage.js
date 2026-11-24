import Link from 'next/link';
import { PROCESS, SITE, LOCAL_PAGE_DEFAULTS } from '@/lib/site';
import FAQ from '@/components/FAQ';

// Server component. Page-specific strings come from `page` (falling back to LOCAL_PAGE_DEFAULTS); `page.faqs` overrides the shared FAQ.
export default function LocalPage({ page }) {
  const eyebrow = page.eyebrow ?? LOCAL_PAGE_DEFAULTS.eyebrow;
  const whyBody = page.whyBody ?? LOCAL_PAGE_DEFAULTS.whyBody;
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <div aria-hidden className="bg-grid bg-grid-fade pointer-events-none absolute inset-x-0 top-0 h-[420px]" />
        <div className="container-px relative pb-14 sm:pb-20">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-ink sm:text-6xl">
            {page.h1}
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">{page.intro}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/free-audit" className="btn-primary">{SITE.cta.primary}</Link>
            <Link href="/contact" className="btn-ghost">{SITE.cta.secondary}</Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-line bg-paper py-14 sm:py-16">
        <div className="container-px">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">What you get</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {page.benefits.map((b) => (
              <div key={b} className="flex items-start gap-3 rounded-2xl border border-line bg-white p-5">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3.5 w-3.5"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span className="font-medium text-ink">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-14 sm:py-16">
        <div className="container-px grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <span className="eyebrow">Why choose us</span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest text-ink sm:text-5xl">Honest, local, results-focused</h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted">{whyBody}</p>
          </div>
          <ul className="grid gap-3">
            {['Free 24-hour audit before any commitment', 'Fixed, transparent quotes', 'No lock-in contracts — ever', 'Reporting in plain English'].map((t) => (
              <li key={t} className="flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 font-medium text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />{t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-line bg-paper py-14 sm:py-16">
        <div className="container-px">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">Our process</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <div key={p.step} className="rounded-3xl border border-line bg-white p-6">
                <span className="font-display text-sm font-semibold text-muted">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink">{p.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ faqs={page.faqs} />

      {/* CTA */}
      <section className="pb-24 sm:pb-32">
        <div className="container-px">
          <div className="rounded-4xl bg-ink px-7 py-16 text-center sm:px-12 sm:py-20">
            <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-semibold tracking-tightest text-white sm:text-5xl">
              Ready to grow your business?
            </h2>
            <div className="mt-8">
              <Link href="/free-audit" className="btn bg-accent text-white shadow-lift hover:bg-accent-dark">Get Free Website Audit</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}