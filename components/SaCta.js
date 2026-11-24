import Link from 'next/link';

// Closing block: the Saudi counterpart of the India AuditCTA, same markup, spacing and sizes. Text = the page's own cta and the audit label.
export default function SaCta({ label, cta, audit, ar = false }) {
  return (
    <section className="py-4 sm:py-16">
      <div className="container-px">
        <div className="relative overflow-hidden rounded-4xl bg-ink px-7 py-20 text-center sm:px-12 sm:py-28">
          <div aria-hidden className="pointer-events-none absolute -top-28 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-white/10 blur-[120px]" />
          <div className="relative">
            {label && <h2 className={`mx-auto max-w-3xl text-balance font-display text-4xl font-semibold text-white sm:text-6xl ${ar ? 'leading-[1.3]' : 'leading-[1.03] tracking-tightest'}`}>{label}</h2>}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              {cta && <Link href={cta.href} className="btn bg-accent text-white shadow-lift hover:bg-accent-dark">{cta.text}</Link>}
              {audit && <Link href={audit.href} className="btn border border-white/25 text-white hover:border-white/60">{audit.label}</Link>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
