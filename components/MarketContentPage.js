import Link from 'next/link';
import RichText from '@/components/RichText';
import { WebPageSchema } from '@/components/Schema';

// Renders a content/<market>/<page>.json view (see lib/market-pages.js): H1, answer block, question-H2 sections with
// self-contained answers, an optional closing line, and one CTA. Nothing here adds copy: every visible string comes from the data file.
export default function MarketContentPage({ view, locale = 'en' }) {
  return (
    <>
      <WebPageSchema path={view.path} name={view.h1} description={view.description} locale={locale} />

      <section className="relative overflow-hidden pt-32 sm:pt-40">
        <div aria-hidden className="bg-grid bg-grid-fade pointer-events-none absolute inset-x-0 top-0 h-[420px]" />
        <div className="container-px relative pb-12 sm:pb-16">
          <h1 className="max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-ink sm:text-5xl lg:text-6xl">
            {view.h1}
          </h1>
          <p className="mt-8 max-w-3xl text-pretty rounded-3xl border border-line bg-paper p-6 text-lg leading-relaxed text-ink/80 sm:p-8 sm:text-xl">
            <RichText text={view.answer} />
          </p>
        </div>
      </section>

      <section className="border-t border-line py-14 sm:py-20">
        <div className="container-px">
          <div className="max-w-3xl divide-y divide-line border-y border-line">
            {view.sections.map((s) => (
              <div key={s.heading} className="py-8 sm:py-10">
                <h2 className="text-balance font-display text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">{s.heading}</h2>
                <p className="mt-4 text-pretty text-lg leading-relaxed text-muted"><RichText text={s.answer} /></p>
              </div>
            ))}
          </div>
          {view.related && <p className="mt-8 max-w-3xl text-pretty leading-relaxed text-muted"><RichText text={view.related} /></p>}
          <div className="mt-10">
            <Link href={view.cta.href} className="btn-primary">{view.cta.text}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
