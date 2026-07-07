import PageHeader from '@/components/PageHeader';
import AuditCTA from '@/components/AuditCTA';
import { WHY, VALUES_CLOSING } from '@/lib/site';

export const metadata = {
  title: 'About',
  description: 'Pride Hire is a small, honest digital team helping Auckland businesses grow with high-converting websites, SEO and Google Ads.',
};

const STATS = [
  { value: '40+', label: 'Projects delivered' },
  { value: '24h', label: 'Free audit turnaround' },
  { value: '0', label: 'Lock-in contracts' },
  { value: '100%', label: 'Transparent pricing' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A small team with an honest way of working"
        subtitle="We started Pride Hire because too many businesses were burned by agencies that over-promise, over-charge and lock clients into contracts."
      />

      {/* Intro — story + founder image */}
      <section className="py-12 sm:py-16">
        <div className="container-px grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="space-y-5 text-pretty text-lg leading-relaxed text-muted">
            <p>
              Pride Hire is a digital growth agency helping local businesses — from dentists and
              plumbers to salons and roofers — get more calls, bookings and customers through
              high-converting websites, SEO and paid advertising.
            </p>
            <p>
              Our way of working is simple: <span className="font-medium text-ink">tell the truth.</span> If
              you don&apos;t need a new website, we&apos;ll say so. If SEO will take months to pay off,
              we&apos;ll tell you upfront. No fake promises, no vanity metrics, no lock-in contracts —
              you own your website, your domain and your accounts.
            </p>
          </div>

          <div className="overflow-hidden rounded-4xl border border-line bg-paper">
            <img src="/about/founder.png" alt="Founder — Pride Hire" loading="lazy" className="w-full object-contain" />
          </div>
        </div>
      </section>

      {/* Big statement */}
      <section className="py-16 sm:py-24">
        <div className="container-px">
          <p className="max-w-5xl text-balance font-display text-3xl font-semibold leading-[1.1] tracking-tightest text-ink sm:text-6xl">
            We&apos;d rather tell you the truth than win the pitch. That&apos;s the whole
            <span className="text-accent"> business model.</span>
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-line bg-paper py-16 sm:py-20">
        <div className="container-px grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-display text-5xl font-semibold tracking-tightest text-ink sm:text-6xl">{s.value}</div>
              <div className="mt-2 text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How we work — values grid */}
      <section className="py-20 sm:py-28">
        <div className="container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">How we work</span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest text-ink sm:text-5xl">
              What makes us different
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w, i) => (
              <div key={w.title} className="rounded-3xl border border-line bg-white p-7 transition-all duration-500 ease-expo hover:-translate-y-1 hover:shadow-soft">
                <span className="font-display text-sm font-semibold text-accent">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder story */}
      <section className="border-t border-line bg-paper py-20 sm:py-28">
        <div className="container-px grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <span className="eyebrow">Our story</span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest text-ink sm:text-4xl">
              Why we started Pride Hire
            </h2>
          </div>
          <div className="space-y-5 text-pretty text-lg leading-relaxed text-muted">
            <p>
              We&apos;d seen it too many times — good businesses paying agencies for websites that
              looked nice but never brought a single customer, locked into contracts they couldn&apos;t
              leave, billed for work they didn&apos;t understand.
            </p>
            <p>
              So we built the opposite. A small, senior team where you work directly with the people
              doing the work. Modern technology, honest advice, fair pricing — and results measured in
              real calls and bookings, not vanity metrics.
            </p>
            <p className="font-medium text-ink">
              We&apos;d rather earn your trust and keep you for years than win a project with big talk.
            </p>
          </div>
        </div>
      </section>

      {/* Closing quote */}
      <section className="py-24 sm:py-32">
        <div className="container-px">
          <p className="mx-auto max-w-4xl text-balance text-center font-display text-3xl font-semibold leading-[1.15] tracking-tightest text-ink sm:text-5xl">
            &ldquo;{VALUES_CLOSING}&rdquo;
          </p>
        </div>
      </section>

      <AuditCTA />
    </>
  );
}