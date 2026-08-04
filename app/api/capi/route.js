import crypto from 'node:crypto';

const PIXEL_ID = process.env.META_PIXEL_ID;
const TOKEN = process.env.META_CAPI_TOKEN;

const sha256 = (v) => (v ? crypto.createHash('sha256').update(String(v).trim().toLowerCase()).digest('hex') : undefined);

export async function POST(req) {
  if (!PIXEL_ID || !TOKEN) {
    return Response.json({ ok: false, skipped: 'CAPI not configured' }, { status: 200 });
  }

  let body;
  try { body = await req.json(); } catch { return Response.json({ ok: false }, { status: 400 }); }

  const { event, eventId, eventSourceUrl, params = {} } = body;

  const headers = req.headers;
  const ip = headers.get('x-forwarded-for')?.split(',')[0] || undefined;
  const ua = headers.get('user-agent') || undefined;

  const payload = {
    data: [{
      event_name: event || 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: 'website',
      event_source_url: eventSourceUrl,
      user_data: {
        client_ip_address: ip,
        client_user_agent: ua,
        em: params.email ? sha256(params.email) : undefined,
        ph: params.phone ? sha256(params.phone) : undefined,
      },
      custom_data: {
        content_name: params.label || params.service || undefined,
      },
    }],
  };

  try {
    const res = await fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    return Response.json({ ok: res.ok, data }, { status: res.ok ? 200 : 502 });
  } catch {
    return Response.json({ ok: false }, { status: 502 });
  }
}