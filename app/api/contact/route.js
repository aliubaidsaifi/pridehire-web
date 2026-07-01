import { NextResponse } from 'next/server';

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'hr@pridehire.com';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'noreply@pridehire.com';

const escapeHtml = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function POST(request) {
  try {
    const data = await request.json();
    const { name = '', email = '', company = '', projectType = '', budget = '', message = '', website = '' } = data || {};

    if (website) return NextResponse.json({ ok: true }); // honeypot

    if (!name.trim() || !email.trim() || !message.trim()) {
      return NextResponse.json({ ok: false, error: 'Please include your name, email and a message.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: 'That email looks invalid.' }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.warn('[contact] BREVO_API_KEY not set. Submission:', { name, email, message });
      return NextResponse.json({ ok: false, error: 'Email service isn’t configured yet.' }, { status: 503 });
    }

    const html = `
      <div style="font-family:Inter,Arial,sans-serif;font-size:15px;color:#0e0e12;line-height:1.6">
        <h2 style="margin:0 0 16px">New project enquiry</h2>
        <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">
          <tr><td style="padding:6px 0;color:#6b6b76;width:130px">Name</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="padding:6px 0;color:#6b6b76">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:6px 0;color:#6b6b76">Company</td><td>${escapeHtml(company) || '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#6b6b76">Project type</td><td>${escapeHtml(projectType) || '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#6b6b76">Budget</td><td>${escapeHtml(budget) || '—'}</td></tr>
        </table>
        <p style="margin:18px 0 6px;color:#6b6b76">Message</p>
        <div style="white-space:pre-wrap;padding:14px 16px;background:#f7f7fb;border-radius:12px">${escapeHtml(message)}</div>
      </div>
    `;

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': apiKey, 'Content-Type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        sender: { name: 'PrideHire Website', email: FROM_EMAIL },
        to: [{ email: TO_EMAIL, name: 'PrideHire' }],
        replyTo: { email, name },
        subject: `New enquiry — ${name}${projectType ? ` · ${projectType}` : ''}`,
        htmlContent: html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('[contact] Brevo error', res.status, detail);
      return NextResponse.json({ ok: false, error: 'Couldn’t send right now. Please try again shortly.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] unexpected error', err);
    return NextResponse.json({ ok: false, error: 'Something went wrong.' }, { status: 500 });
  }
}