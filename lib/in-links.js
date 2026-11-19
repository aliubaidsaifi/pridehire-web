// Gated inbound link to the India pages (footer only — never the main nav). Mirrors lib/sa-links.js.
// Relative imports with extensions so node scripts can test this module without the Next '@/' alias.
import C from './content-review.js';
import { MARKETS } from './markets.js';

/**
 * Footer link to the India "areas we serve" page (which links on to the other India pages), or null. Renders ONLY when ALL hold:
 *   1. content/in/_gate.json has licensingCleared === true (missing/malformed reads as closed),
 *   2. that page is fully approved (isPublishable),
 *   3. every content page it links to is publishable too (no dead links),
 *   4. the India locale is switched live in lib/markets.js (its routes really exist).
 * Shown in the main-site English footer only.
 */
export function inFooterLink({ market = 'global', locale = 'en' } = {}) {
  if (market !== 'global' || locale !== 'en') return null;
  try {
    if (MARKETS.in.locales.en.live !== true) return null;
    const page = C.loadPage('areas-we-serve', 'in');
    if (!C.isPublishable(page, 'en')) return null;
    if (C.danglingLinks(page, 'en').length) return null;
    const label = page.fields['footer.label'] && page.fields['footer.label'].en.text;
    if (!label) return null;
    return { href: page.paths.en, label };
  } catch {
    return null; // fail closed
  }
}
