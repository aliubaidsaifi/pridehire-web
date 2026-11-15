import Link from 'next/link';
import { notFound } from 'next/navigation';
import AuditCTA from '@/components/AuditCTA';
import { SERVICES, SERVICE_DETAILS, RESULTS, SITE, LANDING } from '@/lib/site';
import { ServiceSchema, FaqSchema, BreadcrumbSchema } from '@/components/Schema';


export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  const d = SERVICE_DETAILS[slug];
  if (!s) return {};
  return { title: s.title, description: d?.intro || s.outcome };
}

export default async function ServiceDetail({ params }) {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  const d = SERVICE_DETAILS[slug];
  if (!s || !d) notFound();
  const idx = SERVICES.findIndex((x) => x.slug === s.slug);
  const next = SERVICES[(idx + 1) % SERVICES.length];   


  return (
    <>
    <ServiceSchema name={s.title} description={d.intro} slug={slug} />
      <FaqSchema faqs={LANDING[slug]?.faqs || []} />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: s.title, path: `/services/${slug}` }]} />
      <section className="relative overflow-hidden pt-32 sm:pt-44">
        <div aria-hidden className="bg-grid bg-grid-fade pointer-events-none absolute inset-x-0 top-0 h-[440px]" />
        <div className="container-px relative pb-8 text-center sm:pb-14">
          <Link href="/services" className="link-underline text-sm font-semibold text-muted">← All services</Link>
          <span className="mt-6 block font-display text-xs font-semibold uppercase tracking-[0.16em] text-accent">{s.title}</span>
          <h1 className="mx-auto mt-4 max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.03] tracking-tightest text-ink sm:text-6xl lg:text-[4.6rem]">
            {d.heroTitle}
          </h1>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-px grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <span className="eyebrow">Overview</span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest text-ink sm:text-5xl">
              Tailored to your business
            </h2>
          </div>
          <div className="space-y-5 text-pretty text-lg leading-relaxed text-muted">
            <p>{d.intro}</p>
            <div className="flex flex-wrap gap-2.5 pt-2">
              {s.points.map((p) => (
                <span key={p} className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-ink">{p}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-4">
              <Link href="/free-audit" className="btn-primary">{SITE.cta.primary}</Link>
              <Link href="/contact" className="btn-ghost">Talk to us</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper py-20 sm:py-28">
        <div className="container-px">
          <h2 className="max-w-2xl font-display text-3xl font-semibold leading-[1.05] tracking-tightest text-ink sm:text-5xl">
            What makes it exceptional
          </h2>
          <div className="mt-14 divide-y divide-line border-y border-line">
            {d.criteria.map((c, i) => (
              <div key={c.title} className="grid gap-3 py-8 sm:grid-cols-[64px_1fr_1.3fr] sm:items-start sm:gap-8 sm:py-10">
                <span className="font-display text-sm font-semibold text-accent">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">{c.title}</h3>
                <p className="text-pretty leading-relaxed text-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-px">
          <h2 className="font-display text-3xl font-semibold tracking-tightest text-ink sm:text-5xl">The essential stages</h2>
          <div className="mt-12 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {d.stages.map((stage, i) => (
              <div key={stage} className="group flex items-baseline gap-5 border-t border-line pt-6">
                <span className="font-display text-2xl font-semibold tracking-tight text-line transition-colors duration-300 group-hover:text-accent">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-lg font-semibold text-ink">{stage}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-20 sm:py-28">
        <div className="container-px">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-3xl font-semibold tracking-tightest text-ink sm:text-5xl">Selected work</h2>
            <Link href="/portfolio" className="btn-ghost">View all work</Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {RESULTS.map((r) => (
              <Link key={r.slug} href={`/portfolio/${r.slug}`} className="flex flex-col rounded-3xl border border-line bg-white p-6">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">{r.tag}</span>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink">{r.client}</h3>
                <p className="mt-1 text-sm text-muted">{r.blurb}</p>
                {r.metric && <p className="mt-3 text-sm font-semibold text-ink">{r.metric} {r.label}</p>}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16">
        <div className="container-px">
          <Link href={`/services/${next.slug}`} className="group flex items-center justify-between gap-4">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Next service</span>
            <span className="flex items-center gap-3 font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent sm:text-3xl">
              {next.title}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6 transition-transform duration-500 ease-expo group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </Link>
        </div>
      </section>

      <AuditCTA />
    </>
  );
}