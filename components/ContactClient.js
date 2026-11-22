'use client';

import { useState } from 'react';
import { SITE, SERVICES } from '@/lib/site';
import { contactFor, waLink, telLink } from '@/lib/markets';
import { track } from '@/lib/track';
import { currentMarket } from '@/lib/lead-market';

const inputCls = 'w-full rounded-xl border border-line bg-paper px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink/40 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10';

const ICONS = {
  call: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />,
  mail: <path d="M4 6h16v12H4zM4 7l8 6 8-6" />,
  wa: <path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3z" />,
  meet: <path d="M5 5h14v15H5zM5 9h14M9 3v4M15 3v4" />,
};

// Saudi page: the service list matches the Saudi service set (web development, digital menus, business automation incl. custom AI agents).
const SA_SERVICES = ['Website development', 'Digital menu for a restaurant', 'Business automation and custom AI agents'];

function cardsFor(market) {
  const c = contactFor(market);
  const cards = [
    { label: 'Call us', value: c.display, href: telLink(market), icon: ICONS.call },
    { label: 'Email', value: SITE.contactEmail, href: `mailto:${SITE.contactEmail}`, icon: ICONS.mail },
    { label: 'WhatsApp', value: 'Chat with us', href: waLink(market), icon: ICONS.wa },
  ];
  // The Google Meet / booking card is for the global page only (not offered on the Saudi page).
  if (market !== 'sa') cards.push({ label: 'Google Meet', value: 'Book a call', href: SITE.calendly, icon: ICONS.meet });
  return cards;
}

function Field({ label, req, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink">{label}{req && <span className="text-accent"> *</span>}</span>
      {children}
    </label>
  );
}

export default function ContactPage({ market = 'global' }) {
  const sa = market === 'sa';
  const CARDS = cardsFor(market);
  const serviceList = sa ? SA_SERVICES : SERVICES.map((x) => x.title);
  const [f, setF] = useState({ name: '', email: '', phone: '', service: (market === 'sa' ? SA_SERVICES[0] : SERVICES[0].title), message: '', website: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const u = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!f.name.trim() || !f.email.trim() || !f.message.trim()) { setError('Please fill in your name, email and a short message.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) { setError('That email doesn’t look right.'); return; }
    setError(''); setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: f.name, email: f.email, company: '', projectType: f.service, budget: '', message: `Phone: ${f.phone || '—'}\n\n${f.message}`, website: f.website, market: sa ? 'sa' : currentMarket() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error();
      setStatus('sent');
       track('Contact', { label: f.service, service: f.service, email: f.email, phone: f.phone });
      track('SubmitForm', { label: f.service, service: f.service });
    } catch { setStatus('error'); setError(`Couldn’t send right now. Email us at ${SITE.contactEmail}.`); }
  };

  return (
    <>
      <section className="relative overflow-hidden pt-32 sm:pt-44">
        <div aria-hidden className="bg-grid bg-grid-fade pointer-events-none absolute inset-x-0 top-0 h-[400px]" />
        <div className="container-px relative pb-10 text-center sm:pb-14">
          <span className="eyebrow justify-center">Contact</span>
          <h1 className="mx-auto mt-5 max-w-3xl text-balance font-display text-5xl font-semibold leading-[1.02] tracking-tightest text-ink sm:text-7xl">
            Let&apos;s talk about<br />your <span className="text-accent">growth.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            {sa ? 'Call, email or WhatsApp — whatever’s easiest.' : <>Call, email, WhatsApp or book a Google Meet — whatever&apos;s easiest. We reply within one business day.</>}
          </p>
        </div>
      </section>

      <section className="pb-4">
        <div className="container-px">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CARDS.map((c) => (
              <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                onClick={() => {
                  if (c.label === 'WhatsApp') track('WhatsAppClick', { location: 'contact' });
                  else if (c.label === 'Call us') track('PhoneClick', { location: 'contact' });
                  else if (c.label === 'Email') track('EmailClick', { location: 'contact' });
                  else if (c.label === 'Google Meet') track('BookConsultation', { location: 'contact' });
                }}
                className="group rounded-3xl border border-line bg-white p-6 transition-all duration-500 ease-expo hover:-translate-y-1 hover:shadow-lift">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-paper text-ink transition-colors duration-500 group-hover:bg-accent group-hover:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">{c.icon}</svg>
                </span>
                <div className="mt-5 font-display font-semibold text-ink">{c.label}</div>
                <div className="mt-1 break-words text-sm text-muted">{c.value}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className={`container-px grid gap-12 lg:gap-16 ${sa ? 'mx-auto max-w-2xl' : 'lg:grid-cols-2'}`}>
          <div>
            <span className="eyebrow">Send a message</span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest text-ink sm:text-4xl">Tell us what you need</h2>
            <div className="mt-8 rounded-4xl border border-line bg-white p-7 shadow-soft sm:p-8">
              {status === 'sent' ? (
                <div className="grid min-h-[300px] place-items-center text-center">
                  <div>
                    <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent text-2xl text-white">✓</div>
                    <h3 className="mt-5 font-display text-2xl font-semibold text-ink">Message sent</h3>
                    <p className="mt-2 text-muted">Thanks, {f.name.split(' ')[0] || 'there'}. We&apos;ll reply within one business day.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="space-y-5">
                  <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.website} onChange={u('website')} className="absolute -left-[9999px] h-0 w-0 opacity-0" />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Your name" req><input type="text" value={f.name} onChange={u('name')} className={inputCls} placeholder="Jane Smith" /></Field>
                    <Field label="Email" req><input type="email" value={f.email} onChange={u('email')} className={inputCls} placeholder="you@business.com" /></Field>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Phone"><input type="tel" value={f.phone} onChange={u('phone')} className={inputCls} placeholder={sa ? '+966 ...' : '+91 ...'} /></Field>
                    <Field label="Service">
                      <select value={f.service} onChange={u('service')} className={inputCls}>
                        {serviceList.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field label="Message" req><textarea rows={5} value={f.message} onChange={u('message')} className={`${inputCls} resize-none`} placeholder="What are you looking to achieve?" /></Field>
                  {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
                  <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-70">
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                  </button>
                  <p className="text-center text-xs text-muted">We reply within one business day. Your details stay private.</p>
                </form>
              )}
            </div>
          </div>

          {!sa && (<div>
            <span className="eyebrow">Book a meeting</span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest text-ink sm:text-4xl">Prefer to talk?</h2>
            <p className="mt-4 text-pretty text-muted">Pick a time that suits you and we&apos;ll send a Google Meet link. Free, no obligation.</p>
            <div className="mt-8 overflow-hidden rounded-4xl border border-line bg-white shadow-soft">
              <iframe src={SITE.calendly} title="Book a meeting" className="h-[560px] w-full" loading="lazy" />
            </div>
            <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-5 w-full">Open booking page</a>
          </div>)}
        </div>
      </section>
    </>
  );
}