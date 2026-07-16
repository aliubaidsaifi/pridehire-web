import AuditCTA from '@/components/AuditCTA';
import PortfolioGrid from '@/components/PortfolioGrid';

export const metadata = { title: 'Portfolio', description: 'Our work — websites, applications and branding built to grow real businesses.' };

export default function PortfolioPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 sm:pt-44">
        <div aria-hidden className="bg-grid bg-grid-fade pointer-events-none absolute inset-x-0 top-0 h-[420px]" />
       <div className="container-px relative pb-12 text-center sm:pb-16">
          <span className="eyebrow justify-center">Portfolio</span>
          <h1 className="mx-auto mt-5 max-w-4xl font-display text-6xl font-semibold leading-[0.98] tracking-tightest text-ink sm:text-8xl lg:text-[7rem]">
            Our projects
          </h1>
          ...
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            We help bring ideas to life and create digital products that work.
          </p>
        </div>
      </section>

      <PortfolioGrid />
      <AuditCTA />
    </>
  );
}