'use client';

import { useCallback, useEffect, useState } from 'react';
import { REVIEWS, SITE } from '@/lib/site';

const AV_TINTS = ['bg-accent', 'bg-ink', 'bg-[#4b3df5]', 'bg-[#1e40af]', 'bg-[#7c3aed]', 'bg-[#0f766e]'];
const initials = (n) => n.split(' ').map((x) => x[0]).slice(0, 2).join('').toUpperCase();
const AUTOPLAY = 7000;

function Stars({ n = 5, size = 'h-4 w-4' }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className={`${size} ${i < n ? 'fill-accent' : 'fill-line'}`}><path d="M12 2l2.9 6.2 6.8.8-5 4.6 1.3 6.7L12 17.8 5.9 20.3 7.2 13.6l-5-4.6 6.8-.8z" /></svg>
      ))}
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
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const r = REVIEWS[i] || REVIEWS[0];

  const go = useCallback((n) => setI((c) => (n + REVIEWS.length) % REVIEWS.length), []);

  useEffect(() => {
    if (paused || open || REVIEWS.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => go(i + 1), AUTOPLAY);
    return () => clearTimeout(t);
  }, [i, paused, open, go]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <section className="relative overflow-hidden bg-paper py-16 sm:py-28"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div aria-hidden className="pointer-events-none absolute -left-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-accent/[0.07] blur-[120px]" />

      <div className="container-px relative grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow">Reviews</span>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-tightest text-ink sm:text-5xl">
            What our<br />clients say
          </h2>
          <div className="mt-7 flex items-center gap-3">
            <Stars n={5} size="h-5 w-5" />
            <span className="text-sm text-muted">5.0 · {REVIEWS.length} reviews</span>
          </div>
          <button type="button" onClick={() => setOpen(true)} className="btn-primary mt-7">Leave a review</button>
        </div>

        <div className="relative">
          <span aria-hidden className="pointer-events-none absolute -left-2 -top-10 font-display text-[9rem] leading-none text-accent/15 sm:-left-6 sm:-top-16 sm:text-[13rem]">&ldquo;</span>

          <blockquote key={i} className="rev-fade relative min-h-[260px] sm:min-h-[300px]">
            <p className="text-balance font-display text-2xl font-medium leading-[1.3] tracking-tight text-ink sm:text-4xl">
              {r.comment}
            </p>
            <footer className="mt-8 flex items-center gap-4">
              <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-full font-display text-base font-semibold text-white ${AV_TINTS[i % AV_TINTS.length]}`}>
                {initials(r.name)}
              </span>
              <div>
                <div className="font-display text-base font-semibold text-ink">{r.name}</div>
                <div className="text-sm text-muted">{r.role} · {r.business}</div>
              </div>
            </footer>
          </blockquote>

          <div className="mt-10 flex items-center justify-between gap-6 border-t border-line pt-6">
            <div className="flex items-center gap-2.5">
              {REVIEWS.map((rv, n) => (
                <button key={rv.name + n} type="button" onClick={() => setI(n)} aria-label={`Review by ${rv.name}`}
                  className={`grid h-10 w-10 place-items-center rounded-full font-display text-xs font-semibold text-white transition-all duration-500 ease-expo ${AV_TINTS[n % AV_TINTS.length]} ${n === i ? 'scale-110 ring-2 ring-accent ring-offset-2 ring-offset-paper' : 'opacity-40 hover:opacity-80'}`}>
                  {initials(rv.name)}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button type="button" onClick={() => go(i - 1)} aria-label="Previous review"
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-ink hover:text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4"><path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button type="button" onClick={() => go(i + 1)} aria-label="Next review"
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-ink hover:text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>

          <div className="mt-4 h-0.5 w-full overflow-hidden rounded-full bg-line">
            <div key={`p-${i}-${paused}`} className={`rev-progress h-full bg-accent ${paused || open ? 'is-paused' : ''}`} />
          </div>
        </div>
      </div>

      {open && <ReviewForm onClose={() => setOpen(false)} />}

      <style jsx>{`
        @keyframes revFade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .rev-fade { animation: revFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes revProgress { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .rev-progress { animation: revProgress ${AUTOPLAY}ms linear both; }
        .rev-progress.is-paused { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .rev-fade, .rev-progress { animation: none; }
        }
      `}</style>
    </section>
  );
}