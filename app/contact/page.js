'use client';

import { useState } from 'react';
import { SITE } from '@/lib/site';

const PROJECT_TYPES = ['Website', 'SaaS product', 'Branding', 'Something else'];
const BUDGETS = ['< $5k', '$5k–$15k', '$15k–$50k', '$50k+'];

const NEXT_STEPS = [
  { t: 'Reply within 1 business day', d: 'A real person reads every message — no autoresponder loop.' },
  { t: 'Free 30-min scoping call', d: 'We map goals, scope and a realistic timeline before anything else.' },
  { t: 'Proposal + fixed quote', d: 'Clear deliverables and pricing, so there are no surprises later.' },
];

const inputCls =
  'w-full rounded-xl border border-line bg-canvas px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink/40 outline-none transition focus:border-brand-violet focus:ring-4 focus:ring-brand-violet/10';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', company: '',
    projectType: PROJECT_TYPES[0], budget: BUDGETS[1],
    message: '', website: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const pick = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in your name, email and a short message.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('That email doesn’t look right — mind checking it?');
      return;
    }
    setError('');
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to send');
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(`Couldn’t send right now. Please email us directly at ${SITE.contactEmail}.`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-soft-radial pt-36 pb-24 sm:pt-44">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-brand-violet/15 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-40 h-72 w-72 rounded-full bg-brand-indigo/10 blur-[130px]" />

      <div className="container-px grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <div>
          <span className="eyebrow">Contact</span>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tightest text-ink sm:text-6xl">
            Let’s build something
          </h1>
          <p className="mt-5 max-w-md text-pretty text-muted sm:text-lg">
            Tell us what you’re building. We’ll come back with clear next steps — no sales
            runaround, no pressure.
          </p>

          <ul className="mt-10 space-y-5">
            {NEXT_STEPS.map((s, i) => (
              <li key={s.t} className="flex gap-4">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-gradient text-xs font-semibold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="font-display font-semibold text-ink">{s.t}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted">{s.d}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 border-t border-line pt-8 text-sm">
            <a href={`mailto:${SITE.contactEmail}`} className="inline-flex items-center gap-3 font-medium text-ink hover:text-brand-violet">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white shadow-soft">✉</span>
              {SITE.contactEmail}
            </a>
            <p className="inline-flex items-center gap-3 text-muted">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white shadow-soft">◎</span>
              {SITE.location}
            </p>
          </div>
        </div>

        <div className="rounded-4xl border border-line bg-white p-7 shadow-soft sm:p-10">
          {status === 'sent' ? (
            <div className="grid min-h-[420px] place-items-center text-center">
              <div>
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-gradient text-3xl text-white shadow-lift">✓</div>
                <h2 className="mt-6 font-display text-2xl font-semibold text-ink">Message sent</h2>
                <p className="mt-2 max-w-sm text-muted">
                  Thanks, {form.name.split(' ')[0] || 'there'}. It’s on its way to our team — we’ll reply within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => { setStatus('idle'); setForm((f) => ({ ...f, message: '' })); }}
                  className="btn-ghost mt-7"
                >
                  Send another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <input
                type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
                value={form.website} onChange={update('website')}
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name" required>
                  <input type="text" value={form.name} onChange={update('name')} placeholder="Talib Ubaid" className={inputCls} autoComplete="name" />
                </Field>
                <Field label="Email" required>
                  <input type="email" value={form.email} onChange={update('email')} placeholder="you@company.com" className={inputCls} autoComplete="email" />
                </Field>
              </div>

              <Field label="Company (optional)">
                <input type="text" value={form.company} onChange={update('company')} placeholder="Acme Inc." className={inputCls} autoComplete="organization" />
              </Field>

              <Field label="What do you need?">
                <div className="flex flex-wrap gap-2">
                  {PROJECT_TYPES.map((t) => (
                    <Chip key={t} active={form.projectType === t} onClick={() => pick('projectType', t)}>{t}</Chip>
                  ))}
                </div>
              </Field>

              <Field label="Budget">
                <div className="flex flex-wrap gap-2">
                  {BUDGETS.map((b) => (
                    <Chip key={b} active={form.budget === b} onClick={() => pick('budget', b)}>{b}</Chip>
                  ))}
                </div>
              </Field>

              <Field label="About the project" required>
                <textarea rows={5} value={form.message} onChange={update('message')} placeholder="What are you building, and what does success look like?" className={`${inputCls} resize-none`} />
              </Field>

              {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

              <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70">
                {status === 'sending' ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Sending…
                  </>
                ) : (
                  SITE.cta.primary
                )}
              </button>

              <p className="text-center text-xs text-muted">
                Goes straight to {SITE.contactEmail}. We never share your details.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink">
        {label}{required && <span className="text-brand-violet"> *</span>}
      </span>
      {children}
    </label>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active ? 'border-transparent bg-brand-gradient text-white' : 'border-line text-ink/70 hover:border-ink/20'
      }`}
    >
      {children}
    </button>
  );
}