import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

const TINTS = [
  'from-accent/20 to-accent/5',
  'from-[#DDEBFF] to-[#DDEBFF]/30',
  'from-[#EADFff] to-[#EADFff]/30',
];

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-line py-16 sm:py-28">
      <div className="container-px">
        {/* heading — same pattern as Services / Portfolio */}
        <div className="max-w-2xl">
          <span className="eyebrow">Blog</span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tightest text-ink sm:text-6xl">
            Latest articles
          </h2>
          <p className="mt-4 text-pretty text-muted sm:text-lg">
            Practical guides on websites, SEO and ads — written for business owners, not marketers.
          </p>
        </div>

        {/* rows: bigger card left, text right */}
        <div className="mt-14 divide-y divide-line border-y border-line">
          {posts.map((p, i) => (
            <Link key={p.slug} href={`/blog/${p.slug}`}
              className="group grid gap-6 py-10 sm:grid-cols-[minmax(0,440px)_1fr] sm:items-center sm:gap-12 sm:py-14">
              {/* left — card */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-line">
                <div className={`absolute inset-0 bg-gradient-to-br ${TINTS[i % TINTS.length]}`} />
                {p.image && (
                  <img src={p.image} alt={p.title} loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-expo group-hover:scale-[1.05]" />
                )}
                <span className="absolute end-4 top-4 grid h-11 w-11 translate-y-1 place-items-center rounded-full bg-white text-ink opacity-0 shadow-soft transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4"><path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </div>

              {/* right — about it */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold uppercase tracking-[0.16em]">
                  <span className="text-accent">{p.category}</span>
                  <span className="text-muted">{p.dateLabel || p.date}</span>
                  <span className="text-muted">{p.readTime}</span>
                </div>

                <h3 className="mt-3 text-balance font-display text-2xl font-semibold leading-tight tracking-tight text-ink transition-all duration-500 ease-expo ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-scale-x-100 group-hover:text-accent sm:text-4xl">
                  {p.title}
                </h3>

                <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted">{p.excerpt}</p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                  Read article
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 transition-transform duration-500 ease-expo ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-scale-x-100">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* button at the bottom, centred — like Services */}
        <div className="mt-12 flex justify-center">
          <Link href="/blog" className="btn-ghost">See blog</Link>
        </div>
      </div>
    </section>
  );
}