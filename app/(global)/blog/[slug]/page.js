import Link from 'next/link';
import { notFound } from 'next/navigation';
import AuditCTA from '@/components/AuditCTA';
import ShareLinks from '@/components/ShareLinks';
import { getAllPosts, getPost } from '@/lib/blog';

const TINTS = ['from-accent/15 to-accent/5', 'from-[#DDEBFF]/70 to-[#DDEBFF]/20', 'from-[#EADFff]/60 to-[#EADFff]/20', 'from-ink/[0.08] to-paper'];

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    alternates: { canonical: `https://pridehire.com/blog/${slug}` },
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      type: 'article',
      publishedTime: post.meta.date,
      images: post.meta.image ? [post.meta.image] : undefined,
    },
    twitter: { card: 'summary_large_image', title: post.meta.title, description: post.meta.excerpt },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const all = getAllPosts();
  const related = all.filter((p) => p.slug !== slug).slice(0, 3);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.meta.title,
    description: post.meta.excerpt,
    datePublished: post.meta.date,
    author: { '@type': 'Organization', name: 'Pride Hire' },
    publisher: { '@type': 'Organization', name: 'Pride Hire' },
    mainEntityOfPage: `https://pridehire.com/blog/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative overflow-hidden pt-32 sm:pt-40">
        <div aria-hidden className="bg-grid bg-grid-fade pointer-events-none absolute inset-x-0 top-0 h-[360px]" />
        <div className="container-px relative">
          <div className="mx-auto max-w-3xl">
            <Link href="/blog" className="link-underline text-sm font-semibold text-muted">← All articles</Link>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold uppercase tracking-[0.14em]">
              <span className="text-accent">{post.meta.category}</span>
              <span className="text-muted">{post.meta.dateLabel || post.meta.date}</span>
              <span className="text-muted">{post.meta.readTime}</span>
            </div>
            <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tightest text-ink sm:text-5xl">
              {post.meta.title}
            </h1>
            {post.meta.excerpt && (
              <p className="mt-6 text-pretty text-xl leading-relaxed text-muted">{post.meta.excerpt}</p>
            )}
          </div>
        </div>
      </section>

      {post.meta.image && (
        <section className="mt-10">
          <div className="container-px">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-4xl border border-line bg-paper">
              <img src={post.meta.image} alt={post.meta.title} className="aspect-[16/9] w-full object-cover" />
            </div>
          </div>
        </section>
      )}

      <article className="py-12 sm:py-16">
        <div className="container-px">
          <div className="mx-auto max-w-3xl">
            <div className="prose-ph" dangerouslySetInnerHTML={{ __html: post.html }} />
            <ShareLinks title={post.meta.title} slug={slug} />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-line bg-paper py-16 sm:py-24">
          <div className="container-px">
            <h2 className="font-display text-3xl font-semibold tracking-tightest text-ink sm:text-4xl">Related articles</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-line">
                    <div className={`absolute inset-0 bg-gradient-to-br ${TINTS[i % TINTS.length]}`} />
                    {p.image && (
                      <img src={p.image} alt={p.title} loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-105" />
                    )}
                  </div>
                  <span className="mt-4 block text-xs font-semibold uppercase tracking-[0.14em] text-accent">{p.category}</span>
                  <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">{p.title}</h3>
                  <p className="mt-2 text-xs text-muted">{p.dateLabel || p.date} · {p.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <AuditCTA />
    </>
  );
}