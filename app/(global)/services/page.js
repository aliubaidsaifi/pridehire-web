import Link from 'next/link';
import AuditCTA from '@/components/AuditCTA';
import ServicesList from '@/components/ServicesList';
import { WHY} from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Services', description: 'Websites, SEO, Google Ads, Meta Ads and AI automation — everything a business needs to get more customers.', path: '/services' });

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-36">
        <div aria-hidden className="bg-grid bg-grid-fade pointer-events-none absolute inset-x-0 top-0 h-[420px]" />
        <div className="container-px relative pb-8 text-center sm:pb-12">
          <span className="eyebrow justify-center">Our services</span>
          <h1 className="mx-auto mt-5 max-w-4xl text-balance font-display text-5xl font-semibold leading-[1.02] tracking-tightest text-ink sm:text-7xl lg:text-[5.5rem]">
            Going beyond <span className="text-accent">what&apos;s possible</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-center text-lg leading-relaxed text-muted">
            From high-converting websites to SEO and ads — everything your business needs to get more calls, bookings and customers.
          </p>
        </div>
      </section>

      <ServicesList />

     <section className="bg-paper py-16 sm:py-20">
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