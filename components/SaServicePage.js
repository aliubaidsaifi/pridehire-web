import Link from 'next/link';
import RichText from '@/components/RichText';
import SaCta from '@/components/SaCta';
import { WebPageSchema } from '@/components/Schema';
import { Arrow, SA_IMAGES } from '@/components/SaParts';

// Saudi service page. Same markup, font sizes and spacing as the India /services/<slug> page: breadcrumb, eyebrow, big H1, overview
// (heading left, text + chips + CTAs right), numbered rows on a paper band, "next service" link, closing CTA (SaCta = AuditCTA).
// Nothing here adds copy: every string comes from the page's own content/sa/<page>.json or from other Saudi pages' reviewed labels in `nav`.
export default function SaServicePage({ view, locale = 'en', draft = false, nav, label: labelProp = null, iconId = null }) {
  const ar = String(locale).startsWith('ar');
  const nf = new Intl.NumberFormat(ar ? 'ar-SA' : 'en', { minimumIntegerDigits: 2 });
  const items = nav.items || [];
  const idx = items.findIndex((i) => i.href === view.path);
  const me = idx >= 0 ? items[idx] : null;
  const next = items.length > 1 && idx >= 0 ? items[(idx + 1) % items.length] : null;
  const label = labelProp || (me ? me.label : null);
  const img = SA_IMAGES[iconId || (me && me.id)];
  const [first, ...rest] = view.sections;
  return (
    <>
      <WebPageSchema path={view.path} name={view.h1} description={view.description} locale={locale} />

      <section className="relative overflow-hidden pt-28 sm:pt-36">
        <div aria-hidden className="bg-grid bg-grid-fade pointer-events-none absolute inset-x-0 top-0 h-[440px]" />
        <div className="container-px relative pb-8 text-center sm:pb-14">
          {nav.services && label && (
            <nav aria-label={nav.services.label} className="text-sm font-semibold text-muted">
              <ol className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
                <li><Link href={nav.services.href} className="link-underline hover:text-ink">{nav.services.label}</Link></li>
                <li aria-hidden className="text-muted/50">/</li>
                <li aria-current="page" className="text-ink">{label}</li>
              </ol>
            </nav>
          )}
          {label && <span className="mt-6 block font-display text-xs font-semibold uppercase tracking-[0.16em] text-accent">{label}</span>}
          <h1 className={`mx-auto mt-4 max-w-4xl text-balance font-display text-4xl font-semibold text-ink sm:text-5xl lg:text-6xl ${ar ? 'leading-[1.3]' : 'leading-[1.03] tracking-tightest'}`}>{view.h1}</h1>
          <p className="mx-auto mt-6 max-w-3xl text-pretty text-center text-lg leading-relaxed text-muted sm:text-xl"><RichText text={view.answer} /></p>
        </div>
      </section>

      {img && (
        <div className="container-px">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-line bg-paper shadow-lift sm:aspect-[16/7]">
            <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
          </div>
        </div>
      )}

      {first && (
        <section className="py-12 sm:py-16">
          <div id="q-1" className="container-px grid scroll-mt-28 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              {label && <span className="eyebrow">{label}</span>}
              <h2 className={`mt-4 font-display text-3xl font-semibold text-ink sm:text-5xl ${ar ? 'leading-[1.3]' : 'tracking-tightest'}`}>{first.heading}</h2>
            </div>
            <div className="space-y-5 text-pretty text-lg leading-relaxed text-muted">
              <p><RichText text={first.answer} /></p>
              {rest.length > 0 && (
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {rest.map((s, i) => (
                    <a key={s.heading} href={`#q-${i + 2}`} className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent-dark">{s.heading}</a>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-3 pt-4">
                <Link href={view.cta.href} className="btn-primary">{view.cta.text}</Link>
                {nav.cta && <Link href={nav.cta.href} className="btn-ghost">{nav.cta.label}</Link>}
              </div>
            </div>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="border-y border-line bg-paper py-14 sm:py-20">
          <div className="container-px">
            <div className="divide-y divide-line border-y border-line">
              {rest.map((s, i) => (
                <div key={s.heading} id={`q-${i + 2}`} className="grid scroll-mt-28 gap-3 py-8 sm:grid-cols-[64px_1fr_1.3fr] sm:items-start sm:gap-8 sm:py-10">
                  <span className="font-display text-sm font-semibold text-accent">{nf.format(i + 1)}</span>
                  <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">{s.heading}</h2>
                  <p className="text-pretty leading-relaxed text-muted"><RichText text={s.answer} /></p>
                </div>
              ))}
            </div>
            {view.related && <p className="mt-8 max-w-3xl text-pretty text-lg leading-relaxed text-muted"><RichText text={view.related} /></p>}
          </div>
        </section>
      )}

      {next && (
        <section className="border-t border-line py-16">
          <div className="container-px">
            <Link href={next.href} className="group flex items-center justify-between gap-4">
              <span aria-hidden className="h-px flex-1 bg-line" />
              <span className="flex items-center gap-3 font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent sm:text-3xl">
                {next.label}
                <Arrow className="h-6 w-6 transition-transform duration-500 ease-expo ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </span>
            </Link>
          </div>
        </section>
      )}

      <SaCta label={label} cta={view.cta} audit={nav.cta} ar={ar} />
    </>
  );
}
