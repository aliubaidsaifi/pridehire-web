import PageHeader from '@/components/PageHeader';
import AuditCTA from '@/components/AuditCTA';
import { RESULTS } from '@/lib/site';

export const metadata = { title: 'Portfolio', description: 'Real results for real Auckland businesses — websites, SEO and Google Ads.' };

export default function PortfolioPage() {
  return (
    <>
      <PageHeader eyebrow="Portfolio" title="Work measured in results" subtitle="Websites, SEO and ads for local businesses — measured in calls, bookings and rankings." />
      <section className="py-12 sm:py-16">
        <div className="container-px grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RESULTS.map((r) => (
            <article key={r.client} className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all duration-500 ease-expo hover:-translate-y-1.5 hover:shadow-lift">
              <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-paper">
                {r.image ? (
                  <img src={r.image} alt={r.client} loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-display text-4xl font-semibold tracking-tightest text-ink/80">{r.metric}</span>
                  </div>
                )}
                <span className="absolute left-4 top-4 rounded-full border border-line bg-white px-3 py-1 text-[11px] font-semibold text-ink">{r.industry}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-lg font-semibold text-ink">{r.client}</h2>
                <p className="mt-1 text-sm text-muted">{r.metric} {r.label}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-medium text-muted">
                  <span className="rounded-full bg-paper px-2.5 py-1">{r.tech}</span>
                  <span className="rounded-full bg-paper px-2.5 py-1">{r.timeline}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <AuditCTA />
    </>
  );
}