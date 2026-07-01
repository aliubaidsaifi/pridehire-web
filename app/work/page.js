import PageHeader from '@/components/PageHeader';
import CTA from '@/components/CTA';
import { PROJECTS } from '@/lib/site';

export const metadata = {
  title: 'Work',
  description: 'Selected products PrideHire has designed, built and scaled.',
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Products we’ve shipped"
        subtitle="A look at recent builds — storefronts, dashboards and multi-tenant SaaS platforms."
      />

      <section className="py-12 sm:py-16">
        <div className="container-px">
          <div className="grid gap-6 sm:grid-cols-2">
            {PROJECTS.map((p) => (
              <article
                key={p.title}
                className="group overflow-hidden rounded-4xl border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div
                  className={`relative aspect-[16/10] w-full bg-gradient-to-br ${p.accent}`}
                >
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-display text-2xl font-semibold tracking-tight text-ink/30">
                      {p.title}
                    </span>
                  </div>
                </div>
                <div className="p-7">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
                    <span className="rounded-full bg-canvas px-3 py-1">{p.category}</span>
                    <span className="rounded-full bg-canvas px-3 py-1">{p.tech}</span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-semibold text-ink">{p.title}</h2>
                  <p className="mt-2 text-sm text-muted">
                    Result: <span className="font-medium text-brand-violet">{p.result}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
