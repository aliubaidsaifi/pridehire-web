import PageHeader from '@/components/PageHeader';
import AuditCTA from '@/components/AuditCTA';
import { WHY, VALUES_CLOSING } from '@/lib/site';

export const metadata = {
  title: 'About',
  description: 'Pride Hire is a small, honest digital team in Auckland helping local businesses grow with websites, SEO and ads.',
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A small team with an honest way of working"
        subtitle="We started Pride Hire because too many businesses were burned by agencies that over-promise, over-charge and lock clients into contracts."
      />

      <section className="py-12 sm:py-16">
        <div className="container-px grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-5 text-pretty leading-relaxed text-muted">
            <p>
              Pride Hire is a digital growth agency based in Auckland, New Zealand. We help local
              businesses — from dentists and plumbers to builders and clinics — get more calls,
              bookings and customers through high-converting websites, SEO and paid advertising.
            </p>
            <p>
              Our way of working is simple: tell the truth. If you don&apos;t need a new website,
              we&apos;ll say so. If SEO will take six months to pay off, we&apos;ll tell you upfront.
              No fake promises, no vanity metrics, no lock-in contracts — you own your website,
              your domain and your accounts.
            </p>
            <p>
              We&apos;d rather earn your trust and keep you for years than win a project with big
              talk. That&apos;s the whole business model.
            </p>
          </div>

          <div className="grid content-start gap-4 sm:grid-cols-2">
            {WHY.map((w) => (
              <div key={w.title} className="rounded-3xl border border-line bg-white p-6">
                <h3 className="font-display text-base font-semibold text-ink">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{w.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="container-px mt-20">
          <p className="mx-auto max-w-3xl text-balance text-center font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
            &ldquo;{VALUES_CLOSING}&rdquo;
          </p>
        </div>
      </section>

      <AuditCTA />
    </>
  );
}