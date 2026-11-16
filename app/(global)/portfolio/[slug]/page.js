import Link from 'next/link';
import { notFound } from 'next/navigation';
import AuditCTA from '@/components/AuditCTA';
import ProjectMedia from '@/components/ProjectMedia';
import { RESULTS, PROJECT_DETAILS } from '@/lib/site';
import PortfolioView from '@/components/PortfolioView';
import { buildMetadata } from '@/lib/seo';
import { WebPageSchema } from '@/components/Schema';

const TINTS = ['from-[#4b3df5] to-[#7c6cff]', 'from-[#0f172a] to-[#334155]', 'from-accent to-[#f5a58f]', 'from-[#1e40af] to-[#3b82f6]', 'from-[#111113] to-[#3f3f46]', 'from-[#7c3aed] to-[#c084fc]'];

export function generateStaticParams() {
  return RESULTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = RESULTS.find((x) => x.slug === slug);
  const d = PROJECT_DETAILS[slug];
  if (!p) return {};
  return buildMetadata({ title: p.client, description: d?.intro || p.blurb, path: `/portfolio/${slug}` });
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const p = RESULTS.find((x) => x.slug === slug);
  const d = PROJECT_DETAILS[slug];
  if (!p || !d) notFound();

  const idx = RESULTS.findIndex((x) => x.slug === slug);
  const next = RESULTS[(idx + 1) % RESULTS.length];
  const tint = TINTS[idx % TINTS.length];

  return (
    <>
    <WebPageSchema path={`/portfolio/${slug}`} name={p.client} description={d.intro} />
    <PortfolioView slug={slug} />
      <section className="relative overflow-hidden pt-32 sm:pt-44">
        <div aria-hidden className="bg-grid bg-grid-fade pointer-events-none absolute inset-x-0 top-0 h-[420px]" />
        <div className="container-px relative pb-10 text-center sm:pb-14">
          <Link href="/portfolio" className="link-underline text-sm font-semibold text-muted">← All projects</Link>
          <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.16em] text-accent">{p.tag}</span>
          <h1 className="mx-auto mt-4 max-w-4xl text-balance font-display text-5xl font-semibold leading-[1.02] tracking-tightest text-ink sm:text-7xl">
            {p.client}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">{d.headline}</p>
        </div>
      </section>

      <section className="pb-4">
        <div className="container-px">
          <ProjectMedia src={p.image} alt={p.client} tint={tint} ratio="aspect-[4/3] sm:aspect-[16/9]" />
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-px grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <span className="eyebrow">Overview</span>
            <p className="mt-5 text-pretty text-xl leading-relaxed text-ink sm:text-2xl">{d.intro}</p>
          </div>
          <dl className="grid grid-cols-2 gap-6 self-start rounded-3xl border border-line bg-paper p-7 sm:gap-8">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Client</dt>
              <dd className="mt-1.5 font-display font-semibold text-ink">{p.client}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Category</dt>
              <dd className="mt-1.5 font-display font-semibold text-ink">{p.category}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Timeline</dt>
              <dd className="mt-1.5 font-display font-semibold text-ink">{d.timeline}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Result</dt>
              <dd className="mt-1.5 font-display font-semibold text-accent">{p.metric} {p.label}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Services</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {d.services.map((s) => (
                  <span key={s} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-ink">{s}</span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="border-y border-line bg-paper py-16 sm:py-24">
        <div className="container-px grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow">The challenge</span>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">What wasn&apos;t working</h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted">{d.challenge}</p>
          </div>
          <div>
            <span className="eyebrow">The solution</span>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">What we did</h2>
            <ul className="mt-5 space-y-3">
              {d.solution.map((s) => (
                <li key={s} className="flex items-start gap-3 leading-relaxed text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-px">
          <span className="eyebrow">The results</span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tightest text-ink sm:text-5xl">
            What changed for the business
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {d.results.map((r) => (
              <div key={r.label} className="rounded-3xl border border-line bg-white p-7">
                <div className="font-display text-4xl font-semibold tracking-tightest text-ink sm:text-5xl">{r.value}</div>
                <div className="mt-2 text-sm text-muted">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-14">
        <div className="container-px">
          <Link href={`/portfolio/${next.slug}`} className="group flex items-center justify-between gap-4">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Next project</span>
            <span className="flex items-center gap-3 font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent sm:text-3xl">
              {next.client}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6 shrink-0 transition-transform duration-500 ease-expo ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-scale-x-100"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </Link>
        </div>
      </section>

      <AuditCTA />
    </>
  );
}