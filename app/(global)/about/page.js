import Link from 'next/link';
import AuditCTA from '@/components/AuditCTA';
import { WHY } from '@/lib/site';
import CompanyMedia from '@/components/CompanyMedia';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Company', description: 'Pride Hire is a small, honest digital team helping businesses grow with high-converting websites, SEO and Google Ads.', path: '/about' });

const STATS = [
  { value: '40+', label: 'projects delivered' },
  { value: '98%', label: 'client retention' },
  { value: '24h', label: 'audit turnaround' },
];

export default function CompanyPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-36">
        <div aria-hidden className="bg-grid bg-grid-fade pointer-events-none absolute inset-x-0 top-0 h-[420px]" />
        <div className="container-px relative text-center">
          <span className="eyebrow justify-center">Company</span>
          <h1 className="mx-auto mt-5 max-w-4xl text-balance font-display text-5xl font-semibold leading-[1.02] tracking-tightest text-ink sm:text-7xl">
            Honest work,<br />real <span className="text-accent">results.</span>
          </h1>
        </div>

        <div className="container-px mt-14">
          <CompanyMedia src="/about/team.webp" alt="The Pride Hire team" ratio="aspect-[4/3] sm:aspect-[16/8]" tint="from-[#0f172a] to-[#334155]" />
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-px grid gap-8 sm:grid-cols-[220px_1fr] sm:gap-16">
          <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-muted">Our goal</span>
          <p className="max-w-2xl text-pretty text-xl leading-relaxed text-ink sm:text-2xl">
            From the day we started, our goal has been simple: help local businesses find honest, effective
            solutions that actually bring more customers. We build websites, SEO and campaigns that work —
            and we tell you the truth about what you do and don&apos;t need.
          </p>
        </div>
      </section>

      <section className="pb-8">
        <div className="container-px grid gap-6 sm:grid-cols-2 sm:gap-8">
          <CompanyMedia src="/about/culture-1.webp" alt="Working at Pride Hire" ratio="aspect-[4/3]" tint="from-accent to-[#f5a58f]" />
          <CompanyMedia src="/about/culture-2.webp" alt="The team collaborating" ratio="aspect-[4/3]" tint="from-[#7c3aed] to-[#c084fc]" className="sm:mt-16" />
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-px">
          <h2 className="max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-ink sm:text-6xl">
            Simply put, we tell you the <span className="text-accent">truth.</span>
          </h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
            <div className="space-y-5 text-pretty text-lg leading-relaxed text-muted">
              <p>
                We&apos;re a small, senior team who love what we do. Every project matters to us — because when
                you&apos;re small, your reputation is everything. We&apos;d rather do fewer projects brilliantly
                than churn out work we&apos;re not proud of.
              </p>
              <p>
                No fake promises, no lock-in contracts, no jargon to hide behind. Just honest advice, quality
                work, and results you can measure. That&apos;s the whole deal.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 self-end sm:gap-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-4xl font-semibold tracking-tightest text-ink sm:text-5xl">{s.value}</div>
                  <div className="mt-2 text-xs text-muted sm:text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-2">
        <div className="container-px">
          <CompanyMedia src="/about/office-wide.webp" alt="Pride Hire workspace" ratio="aspect-[4/3] sm:aspect-[16/7]" tint="from-[#111113] to-[#3f3f46]" />
        </div>
      </section>

     <section className="py-20 sm:py-10">
        <div className="container-px grid gap-8 sm:grid-cols-[220px_1fr] sm:gap-16">
          <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-muted">Get to know us</span>
          <div>
            <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tightest text-ink sm:text-5xl">
              Why we started Pride Hire
            </h2>

            <div className="mt-10 grid gap-8 sm:grid-cols-[1fr_260px] sm:items-start sm:gap-12">
              <div className="space-y-5 text-pretty text-lg leading-relaxed text-muted">
                <p>
                  We&apos;d seen too many businesses burned by agencies — paying for websites that looked nice but
                  brought no customers, locked into contracts they couldn&apos;t leave, billed for work they never
                  understood.
                </p>
                <p>
                  So we built the opposite. A team where you work directly with the people doing the work, with
                  honest advice and fair pricing. Today we help businesses grow with websites, SEO, ads and
                  automation — and we earn our clients&apos; trust every single month.
                </p>
              </div>

              {/* Founder */}
              {/* <figure>
                <CompanyMedia src="/about/founder.webp" alt="Founder — Pride Hire" ratio="aspect-[3/4]" tint="from-[#1e40af] to-[#3b82f6]" />
                <figcaption className="mt-4">
                  <div className="font-display text-base font-semibold text-ink">Mohd Suhail</div>
                  <div className="text-sm text-muted">Founder, Pride Hire</div>
                </figcaption>
              </figure> */}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-16 sm:py-20">
        <div className="container-px">
          <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-ink sm:text-6xl">
            Benefits of<br />working with us
          </h2>
          <div className="mt-16 divide-y divide-line border-y border-line">
            {WHY.map((w, i) => (
              <div key={w.title} className="grid gap-4 py-8 sm:grid-cols-[64px_1fr_1.2fr] sm:items-start sm:gap-8 sm:py-10">
                <span className="font-display text-sm font-semibold text-accent">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">{w.title}</h3>
                <p className="text-pretty leading-relaxed text-muted">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AuditCTA />
    </>
  );
}