'use client';

import { useState } from 'react';
import { SITE } from '@/lib/site';
import { waLink } from '@/lib/markets';
import { track } from '@/lib/track';

const input = 'w-full rounded-xl border border-line bg-paper px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink/40 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10';

export default function LeadForm({ service = '' }) {
  const [f, setF] = useState({ name: '', email: '', phone: '', message: '', website: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const u = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!f.name.trim() || !f.phone.trim()) { setError('Please add your name and phone number.'); return; }
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) { setError('That email doesn’t look right.'); return; }
    setError(''); setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.name, email: f.email || 'not provided', company: '',
          projectType: service, budget: '',
          message: `Landing page: ${service}\nPhone: ${f.phone}\n\n${f.message || 'No message'}`,
          website: f.website,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error();
      setStatus('sent');
     track('Lead', { label: service, service });
      track('SubmitForm', { label: service, service });
    } catch { setStatus('error'); setError(`Couldn’t send. Call or WhatsApp us instead.`); }
  };

  if (status === 'sent') {
    return (
      <div className="grid min-h-[300px] place-items-center rounded-3xl border border-line bg-white p-8 text-center">
        <div>
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-accent text-3xl text-white">✓</div>
          <h3 className="mt-5 font-display text-2xl font-semibold text-ink">Thank you, {f.name.split(' ')[0]}!</h3>
          <p className="mt-2 text-pretty text-muted">We’ve received your enquiry and will get back to you within one business day. For anything urgent, WhatsApp us anytime.</p>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6">Message us on WhatsApp</a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-8">
      <h3 className="font-display text-xl font-semibold tracking-tight text-ink">Get your free quote</h3>
      <p className="mt-1.5 text-sm text-muted">Fill this in and we’ll call you back within one business day.</p>
      <div className="mt-5 space-y-4">
        <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.website} onChange={u('website')} className="absolute -left-[9999px] h-0 w-0 opacity-0" />
        <input type="text" value={f.name} onChange={u('name')} placeholder="Your name *" className={input} />
        <input type="tel" value={f.phone} onChange={u('phone')} placeholder="Phone number *" className={input} />
        <input type="email" value={f.email} onChange={u('email')} placeholder="Email (optional)" className={input} />
        <textarea rows={3} value={f.message} onChange={u('message')} placeholder="What do you need? (optional)" className={`${input} resize-none`} />
        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-70">
          {status === 'sending' ? 'Sending…' : 'Get My Free Quote'}
        </button>
        <p className="text-center text-xs text-muted">No spam. Your details stay private.</p>
      </div>
    </form>
  );
}