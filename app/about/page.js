import PageHeader from '@/components/PageHeader';
import CTA from '@/components/CTA';
import { WHY, STATS } from '@/lib/site';

export const metadata = {
  title: 'About',
  description:
    'PrideHire is a digital product studio pairing senior design and engineering to ship fast and scale clean.',
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A small studio with senior hands"
        subtitle="We started PrideHire to do product work the way we always wished agencies would — fewer handoffs, sharper decisions, real ownership."
      />

      <section className="py-12 sm:py-16">
        <div className="container-px grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-5 text-pretty text-muted">
            <p>
              PrideHire is a digital product development studio. We help companies design, build and
              scale websites, SaaS platforms and the kind of digital experiences that move metrics.
            </p>
            <p>
              Our model is deliberately lean: senior designers and engineers working directly with
              you, no layers in between. That means decisions land faster, scope stays honest, and
              what we ship is built to last past launch.
            </p>
            <p>
              Build. Scale. Automate. — it&rsquo;s how we think about every engagement, from a
              one-week landing page to a multi-tenant platform.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 self-start rounded-4xl border border-line bg-white p-8 shadow-soft">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-4xl font-semibold tracking-tightest text-ink">
                  {s.value}
                  {s.suffix}
                </div>
                <div className="mt-1 text-sm text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="container-px mt-20">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            What we value
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w) => (
              <div key={w.title} className="rounded-3xl border border-line bg-white p-6 shadow-soft">
                <h3 className="font-display text-lg font-semibold text-ink">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
