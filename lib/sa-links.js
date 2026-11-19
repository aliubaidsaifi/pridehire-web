// Gated inbound links to the Saudi pages (footer only — never the main nav).
// Relative imports on purpose, so node scripts can test this module without the Next '@/' alias.
import C from './content-review.js';
import { MARKETS } from './markets.js';

/**
 * The footer link to the Saudi hub, or null. It renders ONLY when ALL of these hold:
 *   1. content/sa/_gate.json has licensingCleared === true (a missing/malformed gate reads as closed),
 *   2. the hub page is fully approved in the footer's language (isPublishable),
 *   3. the Saudi locale is switched live in lib/markets.js (i.e. its routes really exist).
 * English footer on the main site -> /sa.  Arabic footer (on the Arabic pages) -> /sa/ar.  Everything else -> null.
 */
export function saFooterLink({ market = 'global', locale = 'en' } = {}) {
  let lang = null;
  if (market === 'global' && locale === 'en') lang = 'en';
  else if (market === 'sa' && locale === 'ar') lang = 'ar';
  if (!lang) return null;
  try {
    const sa = MARKETS.sa.locales[lang];
    if (!sa || sa.live !== true) return null;
    const page = C.loadPage('hub');
    if (!C.isPublishable(page, lang)) return null; // includes the licensing gate
    if (C.danglingLinks(page, lang).length) return null; // never link to a page whose own link targets are not live
    const label = page.fields['footer.label'] && page.fields['footer.label'][lang].text;
    if (!label) return null;
    return { href: page.paths[lang], label };
  } catch {
    return null; // any failure fails closed: no link
  }
}
