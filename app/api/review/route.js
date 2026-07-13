import { NextResponse } from 'next/server';

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'contact@pridehire.com';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'noreply@pridehire.com';
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function POST(request) {
  try {
    const { name = '', business = '', role = '', rating = 5, comment = '', website = '' } = await request.json();
    if (website) return NextResponse.json({ ok: true });
    if (!name.trim() || !business.trim() || !comment.trim()) {
      return NextResponse.json({ ok: false, error: 'Missing required fields.' }, { status: 400 });
    }
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.warn('[review] BREVO_API_KEY not set. New review:', { name, business, role, rating, comment });
      return NextResponse.json({ ok: false, error: 'Not configured yet.' }, { status: 503 });
    }
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': apiKey, 'Content-Type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        sender: { name: 'Pride Hire Website', email: FROM_EMAIL },
        to: [{ email: TO_EMAIL, name: 'Pride Hire' }],
        subject: `⭐ New review (${rating}/5) — ${name}, ${business}`,
        htmlContent: `<div style="font-family:Inter,Arial,sans-serif;font-size:15px;color:#0a0a0b;line-height:1.6">
          <h2 style="margin:0 0 12px">New review submitted</h2>
          <p><b>Rating:</b> ${'★'.repeat(Number(rating))}${'☆'.repeat(5 - Number(rating))} (${esc(String(rating))}/5)</p>
          <p><b>Name:</b> ${esc(name)}<br/><b>Business:</b> ${esc(business)}<br/><b>Role:</b> ${esc(role) || '—'}</p>
          <p><b>Review:</b><br/>${esc(comment)}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
          <p style="color:#6b7280">To publish: add this to the REVIEWS array in lib/site.js, then redeploy.</p>
        </div>`,
      }),
    });
    if (!res.ok) return NextResponse.json({ ok: false, error: 'Send failed.' }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Something went wrong.' }, { status: 500 });
  }
}