// Lead-source attribution: which market's pages did an enquiry come from? Shared by the browser (forms, track()) and the API routes.
// Values: 'sa' | 'in' | 'nz' | 'global'. Nothing here is visible to visitors.
export const LEAD_MARKETS = ['sa', 'in', 'nz', 'global'];
const KEY = 'ph-market';

// '/sa/...' -> 'sa', '/in/...' -> 'in', '/nz/...' -> 'nz', anything else -> 'global'
export function marketFromPath(pathname = '') {
  const m = /^\/(sa|in|nz)(\/|$)/.exec(String(pathname));
  return m ? m[1] : 'global';
}

export const cleanMarket = (v) => (LEAD_MARKETS.includes(v) ? v : null);

// Browser: the page's own market; on a shared page (/contact, /free-audit, /services/*) the market of the last /sa or /in page
// seen in this tab session, so a Saudi visitor who clicks through to /contact is still attributed to 'sa'.
export function currentMarket() {
  if (typeof window === 'undefined') return 'global';
  const here = marketFromPath(window.location.pathname);
  if (here !== 'global') return here;
  try { return cleanMarket(window.sessionStorage.getItem(KEY)) || 'global'; } catch { return 'global'; }
}

export function rememberMarket(market) {
  if (market !== 'sa' && market !== 'in') return;
  try { window.sessionStorage.setItem(KEY, market); } catch { /* ignore */ }
}

// Server: trust the client's value only if it is one of the known markets; otherwise fall back to the Referer's path.
export function marketFromRequest(request, bodyMarket) {
  const fromBody = cleanMarket(bodyMarket);
  if (fromBody) return fromBody;
  try { return marketFromPath(new URL(request.headers.get('referer') || '').pathname); } catch { return 'global'; }
}

export const MARKET_LABEL = { sa: 'Saudi Arabia', in: 'India', nz: 'New Zealand', global: 'Global / unspecified' };
