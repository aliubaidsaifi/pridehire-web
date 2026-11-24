'use client';

import { usePathname } from 'next/navigation';
import { PHONES } from '@/lib/markets';
import { marketFromPath } from '@/lib/lead-market';

// Footer phone lines + the subtle market-switch link. Path-aware, so it is correct on every page (also on /in/*, which shares the global layout):
//   /sa/*  -> Saudi number only      /in/*  -> India number only      everywhere else -> both, labelled by who they serve.
// The switch links are passed in by the server footer ONLY when the other market's pages are live (null otherwise, so nothing renders).
const LINES = {
  IN: { label: 'India & international', phone: PHONES.IN },
  SA: { label: 'Saudi Arabia', phone: PHONES.SA },
};

export default function FooterContact({ inHref = null, saHref = null }) {
  const market = marketFromPath(usePathname() || '/');
  const show = market === 'sa' ? ['SA'] : market === 'in' ? ['IN'] : ['IN', 'SA'];
  const switchLink = market === 'sa' && inHref ? { href: inHref, text: 'In India? See our India services' }
    : market === 'in' && saHref ? { href: saHref, text: 'In Saudi Arabia? See our Saudi services' } : null;
  return (
    <>
      {show.map((k) => (
        <p key={k} className="text-sm text-muted">
          <span className="text-xs font-semibold uppercase tracking-wider text-ink">{LINES[k].label}</span>
          <br />
          <a href={`tel:${LINES[k].phone.e164}`} dir="ltr" className="link-underline text-ink">{LINES[k].phone.display}</a>
        </p>
      ))}
      {switchLink && <p className="text-xs text-muted"><a href={switchLink.href} className="link-underline hover:text-ink">{switchLink.text}</a></p>}
    </>
  );
}
