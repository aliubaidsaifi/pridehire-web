'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// `strings` (Saudi pages): the banner text in the page language from content/sa/footer.json. Other markets pass none and keep the English text.
export default function CookieConsent({ strings = null }) {
  const S = (k, d) => (strings && strings[k] != null ? strings[k] : d);
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem('ph-cookie-consent')) setShow(true);
    } catch { /* ignore */ }
  }, []);

  const decide = (value) => {
    try { localStorage.setItem('ph-cookie-consent', value); } catch { /* ignore */ }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6">
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 rounded-3xl border border-line bg-white p-5 shadow-lift sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <p className="flex-1 text-sm leading-relaxed text-muted">
          {S('cookie.text', 'We use essential cookies to make this site work and, with your consent, to understand how it’s used.')}{' '}
          <Link href="/privacy" className="link-underline text-ink">{S('cookie.more', 'Learn more')}</Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button type="button" onClick={() => decide('declined')} className="btn-ghost !px-5 !py-2.5 text-sm">{S('cookie.decline', 'Decline')}</button>
          <button type="button" onClick={() => decide('accepted')} className="btn-primary !px-5 !py-2.5 text-sm">{S('cookie.accept', 'Accept')}</button>
        </div>
      </div>
    </div>
  );
}