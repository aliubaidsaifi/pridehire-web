'use client';

import { useEffect, useRef, useState } from 'react';
import { REVIEWS, SITE } from '@/lib/site';
import { gsap, ScrollTrigger, registerGsap } from '@/animations/scrollAnimations';

const AV_TINTS = ['bg-accent', 'bg-ink', 'bg-[#4b3df5]', 'bg-[#1e40af]', 'bg-[#7c3aed]', 'bg-[#0f766e]'];
const initials = (name) => name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();

function Stars({ n = 5, className = '' }) {
  return (
    <div className={`flex gap-0.5 ${className}`} aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className={`h-4 w-4 ${i < n ? 'fill-accent' : 'fill-line'}`}><path d="M12 2l2.9 6.2 6.8.8-5 4.6 1.3 6.7L12 17.8 5.9 20.3 7.2 13.6l-5-4.6 6.8-.8z" /></svg>
      ))}
    </div>
  );
}

function ReviewCard({ r, i }) {
  return (
    <div className="review-card mb-6 break-inside-avoid rounded-3xl border border-line bg-white p-7 shadow-soft">
      <Stars n={r.rating} />
      <p className="mt-4 text-pretty leading-relaxed text-ink">&ldquo;{r.comment}&rdquo;</p>
      <div className="mt-6 flex items-center gap-3.5">
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-sm font-semibold text-white ${AV_TINTS[i % AV_TINTS.length]}`}>
          {initials(r.name)}
        </span>
        <div className="min-w-0">
          <div className="font-display text-sm font-semibold text-ink">{r.name}</div>
          <div className="truncate text-xs text-muted">{r.role} · {r.business}</div>
        </div>
      </div>
    </div>
  );
}

function ReviewForm({ onClose }) {
  const [f, setF] = useState({ name: '', business: '', role: '', rating: 5, comment: '', website: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const u = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!f.name.trim() || !f.business.trim() || !f.comment.trim()) { setError('Please fill in your name, business and review.'); return; }
    setError(''); setStatus('sending');
    try {
      const res = await fetch('/api/review', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error();
      setStatus('sent');
    } catch { setStatus('error'); setError(`Couldn’t send. Email us at ${SITE.contactEmail}.`); }
  };

  const input = 'w-full rounded-xl border border-line bg-paper px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink/40 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10';

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative m-0 w-full max-w-lg rounded-t-4xl border border-line bg-white p-7 shadow-lift sm:m-5 sm:rounded-4xl sm:p-9">
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-line text-ink hover:bg-paper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
        </button>

        {status === 'sent' ? (
          <div className="py-6 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-accent text-3xl text-white">✓</div>
            <h3 className="mt-5 font-display text-2xl font-semibold text-ink">Thank you!</h3>
            <p className="mt-2 text-pretty text-muted">Your review has been sent to our team. Once verified, it&apos;ll appear on our site. We really appreciate it.</p>
            <button onClick={onClose} className="btn-ghost mt-6">Done</button>
          </div>
        ) : (
          <>
            <span className="eyebrow">Leave a review</span>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Share your experience</h3>
            <form onSubmit={submit} noValidate className="mt-6 space-y-4">
              <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.website} onChange={u('website')} className="absolute -left-[9999px] h-0 w-0 opacity-0" />
              <div className="grid gap-4 sm:grid-cols-2">
                <input type="text" value={f.name} onChange={u('name')} placeholder="Your name *" className={input} />
                <input type="text" value={f.business} onChange={u('business')} placeholder="Business name *" className={input} />
              </div>
              <input type="text" value={f.role} onChange={u('role')} placeholder="Your role (e.g. Owner)" className={input} />

              <div>
                <span className="mb-2 block text-sm font-medium text-ink">Your rating</span>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" onClick={() => setF((s) => ({ ...s, rating: n }))} aria-label={`${n} stars`}>
                      <svg viewBox="0 0 24 24" className={`h-8 w-8 transition-colors ${n <= f.rating ? 'fill-accent' : 'fill-line hover:fill-accent/40'}`}><path d="M12 2l2.9 6.2 6.8.8-5 4.6 1.3 6.7L12 17.8 5.9 20.3 7.2 13.6l-5-4.6 6.8-.8z" /></svg>
                    </button>
                  ))}
                </div>
              </div>

              <textarea rows={4} value={f.comment} onChange={u('comment')} placeholder="Tell us about your experience… *" className={`${input} resize-none`} />
              {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
              <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-70">
                {status === 'sending' ? 'Sending…' : 'Submit review'}
              </button>
              <p className="text-center text-xs text-muted">Reviews are verified before appearing on our site.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function Reviews() {
  const [open, setOpen] = useState(false);
  const root = useRef(null);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    registerGsap();
    const el = root.current; if (!el) return;
    const cards = gsap.utils.toArray(el.querySelectorAll('.review-card'));
    if (!cards.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.set(cards, { opacity: 0, y: 40 });
      ScrollTrigger.batch(cards, { start: 'top 92%', once: true, onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.1, overwrite: true }) });
    }, el);
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    const safety = setTimeout(() => gsap.to(cards, { opacity: 1, y: 0, duration: 0.4, overwrite: true }), 2400);
    return () => { cancelAnimationFrame(raf); clearTimeout(safety); ctx.revert(); };
  }, []);

  return (
    <section ref={root} className="bg-paper py-4 sm:py-16">
      <div className="container-px">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="eyebrow">Reviews</span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tightest text-ink sm:text-6xl">What our clients say</h2>
            <p className="mt-4 text-pretty text-muted sm:text-lg">Real words from real business owners we&apos;ve helped grow.</p>
          </div>
          <button type="button" onClick={() => setOpen(true)} className="btn-primary">Leave a review</button>
        </div>

        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {REVIEWS.map((r, i) => <ReviewCard key={r.name + i} r={r} i={i} />)}
        </div>
      </div>

      {open && <ReviewForm onClose={() => setOpen(false)} />}
    </section>
  );
}