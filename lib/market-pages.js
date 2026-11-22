// Renders content/<market>/<page>.json as site pages (server-side only).
import C from './content-review.js';

/**
 * RENDER GATE for the Saudi pages. The routes exist in the codebase, but they render ONLY when
 *   - running locally (NODE_ENV !== 'production', i.e. `npm run dev`), or
 *   - PH_SHOW_SA=1 is set at build/run time (e.g. `PH_SHOW_SA=1 npm run build && npm start` to review a production build,
 *     or in Vercel's environment variables to publish).
 * Otherwise the route 404s, so a push can never make these pages reachable by itself.
 * Separately, the footer link, sitemap entries and llms.txt entries stay hidden until MARKETS.sa.locales.en.live is switched on.
 */
export function saPagesRenderable() {
  return process.env.NODE_ENV !== 'production' || process.env.PH_SHOW_SA === '1';
}

/**
 * The page for `lang`, or null. In a PRODUCTION build it must be approved and publishable (gate open, every field approved), else null.
 * In local dev (NODE_ENV !== 'production') a not-yet-approved DRAFT is served too, so it can be reviewed on localhost; the page shows a
 * visible DRAFT banner (see isDraftPreview). Fails closed on any error.
 */
export function loadRenderablePage(market, id, lang = 'en') {
  try {
    if (market === 'sa' && !saPagesRenderable()) return null;
    const page = C.loadPage(id, market);
    if (!C.langsOf(page).includes(lang)) return null;
    if (process.env.NODE_ENV === 'production' && !C.isPublishable(page, lang)) return null; // production: approved + gate open only
    return page;
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') console.error(`[market-pages] ${market}/${id} (${lang}) not renderable:`, e && e.message); // fails closed, but say why in dev
    return null;
  }
}

/** True when the page is being shown as a not-yet-publishable draft (only possible in local dev). */
export function isDraftPreview(page, lang = 'en') {
  return !C.isPublishable(page, lang);
}

/** Flat view model of a page for one language. */
export function pageView(page, lang = 'en') {
  const t = (k) => (page.fields[k] && page.fields[k][lang] ? page.fields[k][lang].text : null);
  const sections = [];
  for (let n = 1; page.fields[`sections.${n}.heading`]; n++) {
    const heading = t(`sections.${n}.heading`);
    const answer = t(`sections.${n}.answer`);
    if (heading && answer) sections.push({ heading, answer }); // a null answer = section omitted
  }
  return {
    path: page.paths[lang],
    title: t('meta.title'),
    description: t('meta.description'),
    h1: t('h1'),
    answer: t('answer'),
    sections,
    related: t('related'),
    layout: page.layout || null,
    reviewedDate: page.reviewedDate || null,
    reviewed: t('reviewed.text'),
    contentsTitle: t('contents.title'),
    cta: { text: t('cta.text'), href: page.ctaHref || '/contact' },
  };
}
