import PageHeader from '@/components/PageHeader';
import CTA from '@/components/CTA';

export const metadata = {
  title: 'Insights',
  description: 'Notes on product design, engineering and growth from the PrideHire team.',
};

const POSTS = [
  {
    title: 'Shipping a SaaS MVP in six weeks',
    excerpt: 'How we scope a first version that proves the model without over-building.',
    tag: 'Product',
    read: '6 min',
  },
  {
    title: 'Designing for Core Web Vitals',
    excerpt: 'Performance is a design decision long before it’s an engineering one.',
    tag: 'Engineering',
    read: '5 min',
  },
  {
    title: 'Multi-tenant from day one',
    excerpt: 'The architecture calls that save you a painful re-platform later.',
    tag: 'Architecture',
    read: '8 min',
  },
];

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Notes from the studio"
        subtitle="Short, practical writing on product, design and the engineering behind fast software."
      />

      <section className="py-12 sm:py-16">
        <div className="container-px grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p) => (
            <article
              key={p.title}
              className="flex flex-col rounded-3xl border border-line bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-muted">
                <span className="rounded-full bg-canvas px-3 py-1 text-brand-violet">{p.tag}</span>
                <span>{p.read} read</span>
              </div>
              <h2 className="mt-4 font-display text-xl font-semibold text-ink">{p.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.excerpt}</p>
              <span className="mt-5 text-sm font-medium text-brand-violet">Read article →</span>
            </article>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
