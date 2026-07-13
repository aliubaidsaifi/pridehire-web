import { NextResponse } from 'next/server';

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'contact@pridehire.com';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'noreply@pridehire.com';
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function POST(request) {
  try {
    const d = await request.json();
    if (d.website) return NextResponse.json({ ok: true }); // honeypot
    if (!d.name?.trim() || !d.email?.trim()) {
      return NextResponse.json({ ok: false, error: 'Name and email are required.' }, { status: 400 });
    }
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.warn('[audit] BREVO_API_KEY not set. Lead:', d);
      return NextResponse.json({ ok: false, error: 'Not configured yet.' }, { status: 503 });
    }

    const rows = [
      ['Name', d.name], ['Business', d.businessName], ['Has website', d.hasWebsite],
      ['Website', d.websiteUrl], ['Google Maps', d.mapsLink], ['Email', d.email],
      ['Phone', d.phone], ['Service', d.service], ['Budget', d.budget],
      ['Start', d.startWhen], ['Message', d.message],
    ].filter(([, v]) => v).map(([k, v]) => `<p><b>${k}:</b> ${esc(v)}</p>`).join('');

    // notify team
    const notify = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': apiKey, 'Content-Type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        sender: { name: 'Pride Hire Website', email: FROM_EMAIL },
        to: [{ email: TO_EMAIL, name: 'Pride Hire' }],
        replyTo: { email: d.email, name: d.name },
        subject: `🔍 New audit request — ${d.name}`,
        htmlContent: `<div style="font-family:Inter,Arial,sans-serif;font-size:15px;color:#0a0a0b;line-height:1.6"><h2>New free-audit request</h2>${rows}</div>`,
      }),
    });
    if (!notify.ok) {
      console.error('[audit] Brevo error', notify.status, await notify.text().catch(() => ''));
      return NextResponse.json({ ok: false, error: 'Send failed.' }, { status: 502 });
    }

    // thank-you to customer (best-effort)
    fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': apiKey, 'Content-Type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        sender: { name: 'Pride Hire', email: FROM_EMAIL },
        to: [{ email: d.email, name: d.name }],
        subject: 'We’ve received your free audit request — Pride Hire',
        htmlContent: `<div style="font-family:Inter,Arial,sans-serif;font-size:15px;color:#0a0a0b;line-height:1.6"><p>Hi ${esc(d.name.split(' ')[0])},</p><p>Thanks for requesting your free website &amp; SEO audit. Our team will review everything and get back to you <b>within 24 hours</b>.</p><p>— The Pride Hire team</p></div>`,
      }),
    }).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[audit] error', err);
    return NextResponse.json({ ok: false, error: 'Something went wrong.' }, { status: 500 });
  }
}