import Link from 'next/link';
import { notFound } from 'next/navigation';
import AuditCTA from '@/components/AuditCTA';
import { SERVICES, SERVICE_DETAILS, SITE } from '@/lib/site';
import { ServiceSchema, BreadcrumbSchema, WebPageSchema } from '@/components/Schema';
import { buildMetadata } from '@/lib/seo';


// Lower-case the first letter of a stage name unless it starts with an acronym (e.g. "SEO audit").
const lc = (t) => (/^[A-Z]{2,}/.test(t) ? t : t.charAt(0).toLowerCase() + t.slice(1));
// 40-60 word answer shown directly under the "stages" question. Built only from the service's own stage list plus the
// confirmed rule that scope is agreed in writing before work starts — no new claims.
function stagesIntro(title, stages) {
  return `${title} at Pride Hire follows ${stages.length} stages, from ${lc(stages[0])} to ${lc(stages[stages.length - 1])}. We agree the scope with you in writing before work starts, and the stages below show the order the work follows. You can ask questions at any point.`;
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  const d = SERVICE_DETAILS[slug];
  if (!s) return {};
  return buildMetadata({ title: s.title, description: d?.intro || s.outcome, path: `/services/${slug}` });
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
    <WebPageSchema path={`/services/${slug}`} name={s.title} description={d.intro} />
    <ServiceSchema name={s.title} description={d.intro} slug={slug} />
      {/* No FAQPage markup here: the FAQ is not visible on this page, and markup must match visible content. See SEO-TODO.md. */}
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: s.title, path: `/services/${slug}` }]} />
      <section className="relative overflow-hidden pt-28 sm:pt-36">
        <div aria-hidden className="bg-grid bg-grid-fade pointer-events-none absolute inset-x-0 top-0 h-[440px]" />
        <div className="container-px relative pb-8 text-center sm:pb-14">
          {/* Visible trail matching the BreadcrumbList markup above (Home > Services > this service). Replaces the old "← All services" link. */}
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-muted">
            <ol className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
              <li><Link href="/" className="link-underline hover:text-ink">Home</Link></li>
              <li aria-hidden className="text-muted/50">/</li>
              <li><Link href="/services" className="link-underline hover:text-ink">Services</Link></li>
              <li aria-hidden className="text-muted/50">/</li>
              <li aria-current="page" className="text-ink">{s.title}</li>
            </ol>
          </nav>
          <span className="mt-6 block font-display text-xs font-semibold uppercase tracking-[0.16em] text-accent">{s.title}</span>
          <h1 className="mx-auto mt-4 max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.03] tracking-tightest text-ink sm:text-6xl lg:text-[4.6rem]">
            {d.heroTitle}
          </h1>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-px grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <span className="eyebrow">Overview</span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest text-ink sm:text-5xl">
              What does {s.title} include?
            </h2>
          </div>
          <div className="space-y-5 text-pretty text-lg leading-relaxed text-muted">
            <p>{d.intro} What&apos;s included: {s.points.join(', ')}.</p>
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

      <section className="border-y border-line bg-paper py-14 sm:py-20">
        <div className="container-px">
          <h2 className="max-w-2xl font-display text-3xl font-semibold leading-[1.05] tracking-tightest text-ink sm:text-5xl">
            What do you get with {s.title}?
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

      <section className="py-14 sm:py-20">
        <div className="container-px">
          <h2 className="font-display text-3xl font-semibold tracking-tightest text-ink sm:text-5xl">What are the stages of {s.title}?</h2>
          <p className="mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-muted">{stagesIntro(s.title, d.stages)}</p>
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

      <section className="border-t border-line py-16">
        <div className="container-px">
          <Link href={`/services/${next.slug}`} className="group flex items-center justify-between gap-4">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Next service</span>
            <span className="flex items-center gap-3 font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent sm:text-3xl">
              {next.title}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6 transition-transform duration-500 ease-expo ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-scale-x-100"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </Link>
        </div>
      </section>

      <AuditCTA />
    </>
  );
}