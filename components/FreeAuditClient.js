'use client';

import { useState } from 'react';
import { SITE, SERVICES } from '@/lib/site';
import { currentMarket } from '@/lib/lead-market';

const inputCls = 'w-full rounded-xl border border-line bg-paper px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink/40 outline-none transition focus:border-ink focus:ring-4 focus:ring-ink/5';
const BUDGETS = ['Under $1k', '$1k–$3k', '$3k–$8k', '$8k+', 'Not sure yet'];
// Saudi page: same structure, Saudi service set, no budget question (no approved SAR bands), +966 placeholder. VALUES stay English (they are
// what we receive by email); labels come from the content page (content/sa/free-audit.json).
const SA_OPTIONS = [
  { value: 'Website development', key: 'service.web' },
  { value: 'Digital menu for a restaurant', key: 'service.menus' },
  { value: 'Business automation and AI agents', key: 'service.automation' },
  { value: 'Graphic design', key: 'service.design' },
];
const START = ['ASAP', 'This month', 'In 1–3 months', 'Just exploring'];
const HAS_SITE = [{ value: 'Yes', key: 'form.yes' }, { value: 'No (I need one built)', key: 'form.no' }];

export default function FreeAuditPage({ market = 'global', strings = null }) {
  const sa = market === 'sa';
  const S = (k, d) => (strings && strings[k] != null ? strings[k] : d);
  const [f, setF] = useState({
    name: '', businessName: '', hasWebsite: 'Yes', websiteUrl: '', mapsLink: '',
    email: '', phone: '', service: sa ? SA_OPTIONS[0].value : SERVICES[0].title, budget: sa ? '' : BUDGETS[1], startWhen: START[0], message: '', website: '',
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const u = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));
  const pick = (k, v) => setF((s) => ({ ...s, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!f.name.trim() || !f.email.trim()) { setError(S('err.required', 'Please add your name and email.')); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) { setError(S('err.email', 'That email doesn’t look right.')); return; }
    setError(''); setStatus('sending');
    try {
      const res = await fetch('/api/audit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...f, market: sa ? 'sa' : currentMarket() }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed');
      setStatus('sent');
    } catch (err) { setStatus('error'); setError(S('err.send', 'Couldn’t send. Email us at {email}.').replace('{email}', SITE.contactEmail)); }
  };

  if (status === 'sent') {
    return (
      <section className="relative flex min-h-[80vh] items-center justify-center bg-soft-radial px-5 pt-24">
        <div className="w-full max-w-lg rounded-4xl border border-line bg-white p-10 text-center shadow-lift">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-ink text-3xl text-white">✓</div>
          <h1 className="mt-6 font-display text-3xl font-semibold tracking-tightest text-ink">{S('sent.title', 'Thank you')}</h1>
          <p className="mt-3 text-pretty text-muted">
            {strings ? S('sent.body') : <>Our team will send your <b className="text-ink">FREE website &amp; SEO audit within 24 hours</b>. Keep an eye on your inbox — a confirmation is on its way.</>}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-soft-radial pt-32 pb-24 sm:pt-40">
      <div aria-hidden className="bg-grid bg-grid-fade pointer-events-none absolute inset-x-0 top-0 h-[380px]" />
      <div className="container-px relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <span className="eyebrow">{S('eyebrow', 'Free · No obligation')}</span>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tightest text-ink sm:text-5xl">{strings ? S('h1') : <>Get your free website &amp; SEO audit</>}</h1>
          <p className="mt-5 max-w-md text-pretty text-muted sm:text-lg">{strings ? S('intro') : <>Tell us about your business. We&apos;ll review your site, Google presence and competitors, then send an honest report within 24 hours.</>}</p>
          <ul className="mt-10 space-y-4 text-sm">
            {(strings ? [S('bullet.1'), S('bullet.2')] : ['Delivered within 24 hours', 'Honest — even if you don’t need us', 'No sales pressure, no lock-in']).map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" className="h-4 w-4"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-4xl border border-line bg-white p-7 shadow-soft sm:p-10">
          <form onSubmit={submit} noValidate className="space-y-5">
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.website} onChange={u('website')} className="absolute -left-[9999px] h-0 w-0 opacity-0" />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={S('form.name', 'Your name')} req><input type="text" value={f.name} onChange={u('name')} className={inputCls} placeholder={S('form.name.ph', 'Jane Smith')} /></Field>
              <Field label={S('form.business', 'Business name')}><input type="text" value={f.businessName} onChange={u('businessName')} className={inputCls} placeholder={strings ? '' : 'Smith Plumbing'} /></Field>
            </div>

            <Field label={S('form.hasSite', 'Do you have a website?')}>
              <div className="flex gap-2">
                {HAS_SITE.map((o) => (
                  <Chip key={o.value} active={f.hasWebsite === o.value} onClick={() => pick('hasWebsite', o.value)}>{S(o.key, o.value)}</Chip>
                ))}
              </div>
            </Field>

            {f.hasWebsite === 'Yes' && (
              <Field label={S('form.url', 'Website URL')}><input type="text" dir="ltr" value={f.websiteUrl} onChange={u('websiteUrl')} className={inputCls} placeholder={sa ? S('form.url.ph', 'www.yourbusiness.com') : 'www.yourbusiness.co.nz'} /></Field>
            )}

            <Field label={S('form.maps', 'Google Maps link (optional)')}><input type="text" dir="ltr" value={f.mapsLink} onChange={u('mapsLink')} className={inputCls} placeholder={S('form.maps.ph', 'Paste your Google Business link')} /></Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={S('form.email', 'Email')} req><input type="email" dir="ltr" value={f.email} onChange={u('email')} className={inputCls} placeholder={sa ? S('form.email.ph', 'you@business.com') : 'you@business.co.nz'} /></Field>
              <Field label={S('form.phone', 'Phone')}><input type="tel" dir="ltr" value={f.phone} onChange={u('phone')} className={inputCls} placeholder={sa ? '+966 ...' : '+64 ...'} /></Field>
            </div>

            <Field label={S('form.service', 'Service required')}>
              <select value={f.service} onChange={u('service')} className={inputCls}>
                {(sa ? SA_OPTIONS.map((o) => ({ value: o.value, label: S(o.key, o.value) })) : SERVICES.map((x) => ({ value: x.title, label: x.title }))).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>

            {!sa && <Field label="Budget">
              <div className="flex flex-wrap gap-2">{BUDGETS.map((b) => <Chip key={b} active={f.budget === b} onClick={() => pick('budget', b)}>{b}</Chip>)}</div>
            </Field>}

            <Field label={S('form.start', 'When do you want to start?')}>
              <div className="flex flex-wrap gap-2">{START.map((s, i) => <Chip key={s} active={f.startWhen === s} onClick={() => pick('startWhen', s)}>{S(`start.${i + 1}`, s)}</Chip>)}</div>
            </Field>

            <Field label={S('form.message', 'Message')}><textarea rows={4} value={f.message} onChange={u('message')} className={`${inputCls} resize-none`} placeholder={S('form.message.ph', 'Anything you\'d like us to look at?')} /></Field>

            {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
            <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-70">
              {status === 'sending' ? S('form.sending', 'Sending…') : S('form.submit', 'Get My Free Audit')}
            </button>
            <p className="text-center text-xs text-muted">{strings ? S('form.privacy') : 'We reply within 24 hours. Your details stay private.'}</p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, req, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink">{label}{req && <span className="text-ink"> *</span>}</span>
      {children}
    </label>
  );
}
function Chip({ active, onClick, children }) {
  return (
    <button type="button" onClick={onClick} className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${active ? 'border-transparent bg-ink text-white' : 'border-line text-ink/70 hover:border-ink/25'}`}>{children}</button>
  );
}