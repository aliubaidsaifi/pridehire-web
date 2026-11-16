'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

const TINTS = [
  'from-accent/20 to-accent/5',
  'from-[#DDEBFF] to-[#DDEBFF]/30',
  'from-[#EADFff] to-[#EADFff]/30',
  'from-ink/[0.10] to-paper',
];

function Card({ p, i }) {
  return (
    <Link href={`/blog/${p.slug}`} className="group block">
      <div className="relative aspect-[16/11] overflow-hidden rounded-[1.75rem] border border-line">
        <div className={`absolute inset-0 bg-gradient-to-br ${TINTS[i % TINTS.length]}`} />
        {p.image && (
          <img src={p.image} alt={p.title} loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-expo group-hover:scale-[1.04]" />
        )}
        <span className="absolute end-5 top-5 grid h-11 w-11 translate-y-1 place-items-center rounded-full bg-white text-ink opacity-0 shadow-soft transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4"><path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>

      <div className="mt-5">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{p.category}</span>
        <h2 className="mt-2.5 text-balance font-display text-2xl font-semibold leading-tight tracking-tight text-ink transition-colors duration-300 group-hover:text-accent sm:text-3xl">
          {p.title}
        </h2>
        <p className="mt-3 text-sm text-muted">{p.dateLabel || p.date} · {p.readTime}</p>
      </div>
    </Link>
  );
}

export default function BlogGrid({ posts = [] }) {
  const [active, setActive] = useState('All Posts');

  const categories = useMemo(() => {
    const set = [...new Set(posts.map((p) => p.category).filter(Boolean))];
    return ['All Posts', ...set];
  }, [posts]);

  const items = useMemo(
    () => (active === 'All Posts' ? posts : posts.filter((p) => p.category === active)),
    [active, posts]
  );

  return (
    <>
      {categories.length > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-b border-line pb-6">
          {categories.map((c) => (
            <button key={c} type="button" onClick={() => setActive(c)}
              className={`relative font-display text-base font-semibold tracking-tight transition-colors sm:text-lg ${active === c ? 'text-ink' : 'text-muted hover:text-ink'}`}>
              {c}
              <span className={`absolute -bottom-[7px] start-0 h-0.5 w-full ltr:origin-left rtl:origin-right rounded-full bg-accent transition-transform duration-500 ease-expo ${active === c ? 'scale-x-100' : 'scale-x-0'}`} />
            </button>
          ))}
        </div>
      )}

      <div key={active} className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2">
        {items.map((p, i) => <Card key={p.slug} p={p} i={i} />)}
      </div>

      {items.length === 0 && <p className="py-16 text-center text-muted">No articles in this category yet.</p>}
    </>
  );
}