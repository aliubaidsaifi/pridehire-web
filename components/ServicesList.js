import Link from 'next/link';
import { SERVICES } from '@/lib/site';

/* Clean solutions list — no accordion. Each row: label + description + Read more. */
export default function ServicesList() {
  return (
    <section className="py-14 sm:py-20">
      <div className="container-px">
        <h2 className="font-display text-4xl font-semibold tracking-tightest text-ink sm:text-6xl">Our solutions</h2>

        <div className="mt-12 border-t border-line">
          {SERVICES.map((s) => (
            <div key={s.slug} id={s.slug} className="scroll-mt-28 grid gap-5 border-b border-line py-10 sm:grid-cols-[280px_1fr] sm:gap-10 sm:py-14">
              <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                {s.title}
              </span>

              <div>
                <p className="max-w-xl font-display text-xl font-medium leading-snug tracking-tight text-ink sm:text-2xl">
                  {s.outcome}
                </p>
                <Link href={`/services/${s.slug}`} className="btn-ghost mt-7 group">
                  Read more
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 transition-transform duration-500 ease-expo ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-scale-x-100">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}