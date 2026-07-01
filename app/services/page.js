import PageHeader from '@/components/PageHeader';
import CTA from '@/components/CTA';
import { SERVICES } from '@/lib/site';

export const metadata = {
  title: 'Services',
  description:
    'UI/UX design, web development, SaaS development, branding and performance marketing — one senior team across the whole product lifecycle.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Design, build and scale — under one roof"
        subtitle="Five disciplines, one team. We move from research to launch without the handoffs that slow most agencies down."
      />

      <section className="py-12 sm:py-16">
        <div className="container-px space-y-5">
          {SERVICES.map((s, i) => (
            <div
              key={s.slug}
              id={s.slug}
              className="scroll-mt-28 rounded-4xl border border-line bg-white p-8 shadow-soft sm:p-12"
            >
              <div className="grid gap-8 lg:grid-cols-[0.4fr_0.6fr]">
                <div>
                  <span className="font-display text-sm font-semibold text-brand-violet">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                    {s.title}
                  </h2>
                  <p className="mt-3 max-w-sm text-pretty text-muted">{s.summary}</p>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-3 rounded-2xl bg-canvas px-4 py-3 text-sm font-medium text-ink/80"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
