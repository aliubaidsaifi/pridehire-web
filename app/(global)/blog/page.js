import Link from 'next/link';
import AuditCTA from '@/components/AuditCTA';
import BlogGrid from '@/components/BlogGrid';
import { getAllPosts } from '@/lib/blog';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Blog', description: 'Honest, practical advice on websites, SEO and ads for local businesses.', path: '/blog' });

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-36">
        <div aria-hidden className="bg-grid bg-grid-fade pointer-events-none absolute inset-x-0 top-0 h-[380px]" />
        <div className="container-px relative pb-12 text-center sm:pb-16">
          <span className="eyebrow justify-center">Blog</span>
          <h1 className="mx-auto mt-5 max-w-3xl text-balance font-display text-5xl font-semibold leading-[1.02] tracking-tightest text-ink sm:text-7xl">
            Honest advice,<br />no <span className="text-accent">jargon.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            Practical guides on websites, SEO and ads — written for business owners, not marketers.
          </p>
        </div>
      </section>

      <section className="pb-8">
        <div className="container-px">
          {posts.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-4xl border border-line bg-paper p-10 text-center sm:p-14">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">First articles coming soon</h2>
              <p className="mt-3 text-pretty text-muted">We&apos;re writing honest, no-nonsense guides for business owners.</p>
              <Link href="/free-audit" className="btn-primary mt-7">Get a free audit meanwhile</Link>
            </div>
          ) : (
            <BlogGrid posts={posts} />
          )}
        </div>
      </section>

      <AuditCTA />
    </>
  );
}