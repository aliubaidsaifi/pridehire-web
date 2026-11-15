import { notFound } from 'next/navigation';
import LpNav from '@/components/LpNav';
import LeadForm from '@/components/LeadForm';
import LpProjectImg from '@/components/LpProjectImg';
import { LANDING, SERVICE_DETAILS, RESULTS, REVIEWS, SITE } from '@/lib/site';
import { FaqSchema } from '@/components/Schema';

const TINTS = ['from-[#4b3df5] to-[#7c6cff]', 'from-[#0f172a] to-[#334155]', 'from-accent to-[#f5a58f]', 'from-[#1e40af] to-[#3b82f6]', 'from-[#111113] to-[#3f3f46]', 'from-[#7c3aed] to-[#c084fc]'];
const initials = (n) => n.split(' ').map((x) => x[0]).slice(0, 2).join('').toUpperCase();

export function generateStaticParams() {
  return Object.keys(LANDING).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const lp = LANDING[slug];
  if (!lp) return {};
  return {
    title: `${lp.badge} — ${SITE.name}`,
    description: lp.sub,
    robots: { index: false, follow: false },
  };
}

export default async function LandingPage({ params }) {
  const { slug } = await params;
  const lp = LANDING[slug];
  const detail = SERVICE_DETAILS[slug];
  if (!lp) notFound();

  const projects = RESULTS.filter((r) => r.category === lp.category).slice(0, 3);
  const showProjects = projects.length ? projects : RESULTS.slice(0, 3);
  const reviews = (REVIEWS || []).slice(0, 3);

  return (
    <>
     <FaqSchema faqs={lp.faqs} />
      <LpNav />

      <section className="relative overflow-hidden pt-14 sm:pt-20">
        <div aria-hidden className="bg-grid bg-grid-fade pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
        <div aria-hidden className="pointer-events-none absolute -right-32 top-10 h-[380px] w-[420px] rounded-full bg-accent/[0.08] blur-[120px]" />
        <div className="container-px relative grid items-start gap-12 pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-20">
          <div className="lg:pt-8">
            <span className="eyebrow">{lp.badge}</span>
            <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-ink sm:text-6xl">{lp.hero}</h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">{lp.sub}</p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {lp.benefits.slice(0, 3).map((b) => (
                <span key={b.title} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-3.5 w-3.5 text-accent"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {b.title}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:sticky lg:top-24" id="quote"><LeadForm service={lp.badge} /></div>
        </div>
      </section>

      {detail && (
        <section className="border-t border-line py-16 sm:py-24">
          <div className="container-px">
            <div className="max-w-3xl">
              <span className="eyebrow">What we do</span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest text-ink sm:text-5xl">{detail.heroTitle}</h2>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">{detail.intro}</p>
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-line bg-paper py-16 sm:py-24">
        <div className="container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Why choose us</span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest text-ink sm:text-5xl">The benefits you get</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lp.benefits.map((b) => (
              <div key={b.title} className="rounded-3xl border border-line bg-white p-7">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/10 text-accent">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-5 w-5"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16 sm:py-24">
        <div className="container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Our work</span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest text-ink sm:text-5xl">Selected work</h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {showProjects.map((p, i) => (
              <div key={p.slug} className="block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                  <div className={`absolute inset-0 bg-gradient-to-br ${TINTS[i % TINTS.length]}`} />
                  <div className="absolute inset-0 grid place-items-center p-6">
                   <LpProjectImg src={p.image} alt={p.client} />
                  </div>
                  {p.metric && <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink shadow-soft backdrop-blur">{p.metric} {p.label}</span>}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-ink">{p.client}</h3>
                <p className="mt-1 text-sm text-muted">{p.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="border-t border-line bg-paper py-16 sm:py-24">
          <div className="container-px">
            <div className="max-w-2xl">
              <span className="eyebrow">Testimonials</span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest text-ink sm:text-5xl">What clients say</h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r, i) => (
                <div key={r.name + i} className="rounded-3xl border border-line bg-white p-7">
                  <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, s) => <svg key={s} viewBox="0 0 24 24" className="h-4 w-4 fill-accent"><path d="M12 2l2.9 6.2 6.8.8-5 4.6 1.3 6.7L12 17.8 5.9 20.3 7.2 13.6l-5-4.6 6.8-.8z" /></svg>)}</div>
                  <p className="mt-4 text-pretty text-sm leading-relaxed text-ink">{r.comment}</p>
                  <div className="mt-5 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-xs font-semibold text-white">{initials(r.name)}</span>
                    <div>
                      <div className="text-sm font-semibold text-ink">{r.name}</div>
                      <div className="text-xs text-muted">{r.business}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-line py-16 sm:py-24">
        <div className="container-px grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest text-ink sm:text-4xl">Common questions</h2>
            <p className="mt-4 text-muted">Still unsure? Message us on WhatsApp — we reply fast.</p>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-6">Ask on WhatsApp</a>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {lp.faqs.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-lg font-semibold text-ink marker:content-none">
                  {item.q}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
                </summary>
                <p className="mt-3 text-pretty leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink py-16 text-white sm:py-24">
        <div className="container-px grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tightest sm:text-5xl">Ready to grow your business?</h2>
            <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-white/70">Get a free quote today. No obligation, no pressure — just honest advice on what will actually work for you.</p>
            <div className="mt-8 space-y-3 text-sm text-white/80">
              <a href={`tel:${SITE.phone}`} className="flex items-center gap-3 hover:text-white"><span className="text-accent">Phone</span> {SITE.phone}</a>
              <a href={`mailto:${SITE.contactEmail}`} className="flex items-center gap-3 hover:text-white"><span className="text-accent">Email</span> {SITE.contactEmail}</a>
              <a href={`https://wa.me/${SITE.whatsapp}`} className="flex items-center gap-3 hover:text-white"><span className="text-accent">WhatsApp</span> Chat with us</a>
            </div>
          </div>
          <LeadForm service={lp.badge} />
        </div>
      </section>
    </>
  );
}