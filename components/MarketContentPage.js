import Link from 'next/link';
import RichText from '@/components/RichText';
import { WebPageSchema } from '@/components/Schema';

// Renders a content/<market>/<page>.json view (see lib/market-pages.js): H1, answer block, question-H2 sections with
// self-contained answers, an optional closing line, and one CTA. Nothing here adds copy: every visible string comes from the data file.
//
// layout === 'guide' (long reference pages): the FIRST section is shown as a callout directly under the answer block (for the SFDA guide it is
// "what we could not verify"), followed by the visible "reviewed" line and a contents list that links every question; the remaining
// sections follow. Every section has an anchor id (q-1 …) so each question can be linked to directly.
function Section({ s, id }) {
  return (
    <div id={id} className="scroll-mt-28 py-8 sm:py-10">
      <h2 className="text-balance font-display text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">{s.heading}</h2>
      <p className="mt-4 text-pretty text-lg leading-relaxed text-muted"><RichText text={s.answer} /></p>
    </div>
  );
}

export default function MarketContentPage({ view, locale = 'en', draft = false }) {
  const guide = view.layout === 'guide' && view.sections.length > 0;
  const [first, ...rest] = view.sections;
  return (
    <>
      {draft && <div className="fixed inset-x-0 top-0 z-[70] bg-amber-300 py-1.5 text-center text-xs font-semibold text-ink">DRAFT preview — not approved, not published</div>}
      <WebPageSchema path={view.path} name={view.h1} description={view.description} locale={locale} lastReviewed={view.reviewedDate || undefined} />

      <section className="relative overflow-hidden pt-32 sm:pt-40">
        <div aria-hidden className="bg-grid bg-grid-fade pointer-events-none absolute inset-x-0 top-0 h-[420px]" />
        <div className="container-px relative pb-12 sm:pb-16">
          <h1 className="max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-ink sm:text-5xl lg:text-6xl">
            {view.h1}
          </h1>
          <p className="mt-8 max-w-3xl text-pretty rounded-3xl border border-line bg-paper p-6 text-lg leading-relaxed text-ink/80 sm:p-8 sm:text-xl">
            <RichText text={view.answer} />
          </p>

          {guide && (
            <div className="mt-6 max-w-3xl">
              <div id="q-1" className="scroll-mt-28 rounded-e-2xl border-s-4 border-accent bg-paper p-6 sm:p-8">
                <h2 className="text-balance font-display text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">{first.heading}</h2>
                <p className="mt-4 text-pretty text-lg leading-relaxed text-muted"><RichText text={first.answer} /></p>
              </div>
              {view.reviewed && <p className="mt-4 text-sm font-medium text-muted">{view.reviewed}</p>}
            </div>
          )}
        </div>
      </section>

      {guide && (
        <section className="border-t border-line py-10 sm:py-12">
          <div className="container-px">
            <nav aria-label={view.contentsTitle || undefined} className="max-w-3xl">
              {view.contentsTitle && <p className="font-display text-lg font-semibold text-ink">{view.contentsTitle}</p>}
              <ol className="mt-4 space-y-2 text-base leading-snug">
                {view.sections.map((s, i) => (
                  <li key={s.heading}><a href={`#q-${i + 1}`} className="text-muted underline decoration-line underline-offset-4 hover:text-ink hover:decoration-ink">{s.heading}</a></li>
                ))}
              </ol>
            </nav>
          </div>
        </section>
      )}

      <section className="border-t border-line py-14 sm:py-20">
        <div className="container-px">
          <div className="max-w-3xl divide-y divide-line border-y border-line">
            {(guide ? rest : view.sections).map((s, i) => <Section key={s.heading} s={s} id={`q-${guide ? i + 2 : i + 1}`} />)}
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
