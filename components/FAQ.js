'use client';

import { useState } from 'react';
import { FAQS } from '@/lib/site';

function Item({ q, a, open, onClick }) {
  return (
    <div className="border-b border-line">
      <button type="button" onClick={onClick} className="flex w-full items-center justify-between gap-4 py-5 text-left" aria-expanded={open}>
        <span className="font-display text-lg font-semibold text-ink">{q}</span>
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line transition-transform duration-300 ${open ? 'rotate-45 bg-ink text-white' : 'text-ink'}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
        </span>
      </button>
      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden"><p className="max-w-2xl text-pretty leading-relaxed text-muted">{a}</p></div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-20 sm:py-24">
      <div className="container-px grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <div>
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest text-ink sm:text-4xl">Straight answers</h2>
          <p className="mt-4 text-pretty text-muted">The questions every business owner asks — answered honestly.</p>
        </div>
        <div>
          {FAQS.map((f, i) => (
            <Item key={f.q} q={f.q} a={f.a} open={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}