import Link from 'next/link';
import RichText from '@/components/RichText';
import { WebPageSchema } from '@/components/Schema';
import SaServiceCards from '@/components/SaServiceCards';
import SaCta from '@/components/SaCta';
import { SA_IMAGES } from '@/components/SaParts';

// Renders a content/<market>/<page>.json view (see lib/market-pages.js): H1, answer block, question-H2 sections with
// self-contained answers, an optional closing line, and one CTA. Nothing here adds copy: every visible string comes from the data file.
// Markup, font sizes and spacing follow the India pages (inner-page hero: eyebrow + big centred H1; hub: the India home Hero; numbered rows
// on a paper band; AuditCTA-style closing block).
//
// layout === 'guide' (long reference pages): the FIRST section is shown as a callout directly under the answer block (for the SFDA guide it is
// "what we could not verify"), followed by the visible "reviewed" line and a contents list that links every question; the remaining
// sections follow. Every section has an anchor id (q-1 …) so each question can be linked to directly.
export default function MarketContentPage({ view, locale = 'en', draft = false, cards = null, audit = null, hub = false, eyebrow = null }) {
  const guide = view.layout === 'guide' && view.sections.length > 0;
  const [first, ...rest] = view.sections;
  const ar = String(locale).startsWith('ar');
  const nf = new Intl.NumberFormat(ar ? 'ar-SA' : 'en', { minimumIntegerDigits: 2 });
  const list = guide ? rest : view.sections;
  const offset = guide ? 2 : 1; // section number of list[0]
  const h1Cls = `font-display font-semibold text-ink ${ar ? 'leading-[1.3]' : 'leading-[1.02] tracking-tightest'}`;
  const ctas = (
    <>
      <Link href={view.cta.href} className="btn-primary">{view.cta.text}</Link>
      {audit && <Link href={audit.href} className="btn-ghost">{audit.label}</Link>}
    </>
  );
  return (
    <>
      <WebPageSchema path={view.path} name={view.h1} description={view.description} locale={locale} lastReviewed={view.reviewedDate || undefined} />

      <section className="relative overflow-hidden pt-28 sm:pt-36">
        <div aria-hidden className="bg-grid bg-grid-fade pointer-events-none absolute inset-x-0 top-0 h-[440px]" />
        {hub && cards ? (
          <div className="container-px relative grid items-center gap-14 pb-16 lg:grid-cols-[1fr_1.02fr] lg:gap-12 lg:pb-24">
            <div>
              <div className="flex flex-wrap gap-2">
                {cards.items.map((it) => (
                  <Link key={it.href} href={it.href} className="rounded-full border border-line bg-white/50 px-3.5 py-1.5 text-[0.8rem] font-medium text-muted transition-colors hover:border-accent/40 hover:text-ink">{it.label}</Link>
                ))}
              </div>
              <h1 className={`mt-6 text-balance text-4xl sm:text-5xl lg:text-[3.4rem] ${h1Cls}`}>{view.h1}</h1>
              <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted"><RichText text={view.answer} /></p>
              <div className="mt-9 flex flex-wrap items-center gap-3">{ctas}</div>
            </div>
            <div className="relative mx-auto grid w-full max-w-lg grid-cols-2 gap-4 lg:max-w-none">
              {['web-development', 'graphic-design', 'business-automation'].map((id, i) => (
                <div key={id} className={`relative overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_40px_90px_-28px_rgba(10,10,11,0.3)] ${i === 0 ? 'row-span-2 aspect-[3/5]' : 'aspect-[4/3]'}`}>
                  <img src={SA_IMAGES[id]} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/0 to-accent/10 mix-blend-multiply" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="container-px relative pb-8 text-center sm:pb-14">
            {eyebrow && <span className="eyebrow justify-center">{eyebrow}</span>}
            <h1 className={`mx-auto mt-5 max-w-4xl text-balance text-4xl sm:text-5xl lg:text-6xl ${h1Cls}`}>{view.h1}</h1>
            <p className="mx-auto mt-6 max-w-3xl text-pretty text-center text-lg leading-relaxed text-muted sm:text-xl"><RichText text={view.answer} /></p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{ctas}</div>
          </div>
        )}
      </section>

      {cards && <SaServiceCards title={cards.title} items={cards.items} />}

      {guide && (
        <section className="py-12 sm:py-16">
          <div className="container-px grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-14">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <nav aria-label={view.contentsTitle || undefined} className="card p-6">
                {view.contentsTitle && <p className="font-display text-lg font-semibold text-ink">{view.contentsTitle}</p>}
                <ol className="mt-4 space-y-1 text-sm leading-snug">
                  {view.sections.map((s, i) => (
                    <li key={s.heading}>
                      <a href={`#q-${i + 1}`} className="flex gap-3 rounded-xl px-2 py-2 text-muted transition-colors hover:bg-paper hover:text-ink">
                        <span className="font-semibold text-accent">{nf.format(i + 1)}</span><span>{s.heading}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              {view.reviewed && <p className="mt-4 px-1 text-sm font-medium text-muted">{view.reviewed}</p>}
            </aside>
            <div id="q-1" className="scroll-mt-28 self-start rounded-3xl border border-line border-s-4 border-s-accent bg-paper p-6 sm:p-8">
              <h2 className="text-balance font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">{first.heading}</h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted"><RichText text={first.answer} /></p>
            </div>
          </div>
        </section>
      )}

      {(list.length > 0 || view.related) && (
        <section className="border-y border-line bg-paper py-14 sm:py-20">
          <div className="container-px">
            {list.length > 0 && (
              <div className="divide-y divide-line border-y border-line">
                {list.map((s, i) => (
                  <div key={s.heading} id={`q-${i + offset}`} className="grid scroll-mt-28 gap-3 py-8 sm:grid-cols-[64px_1fr_1.3fr] sm:items-start sm:gap-8 sm:py-10">
                    <span className="font-display text-sm font-semibold text-accent">{nf.format(i + offset)}</span>
                    <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">{s.heading}</h2>
                    <p className="text-pretty leading-relaxed text-muted"><RichText text={s.answer} /></p>
                  </div>
                ))}
              </div>
            )}
            {view.related && <p className="mt-8 max-w-3xl text-pretty text-lg leading-relaxed text-muted"><RichText text={view.related} /></p>}
          </div>
        </section>
      )}

      <SaCta cta={view.cta} audit={audit} ar={ar} />
    </>
  );
}
