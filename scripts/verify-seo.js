/**
 * Crawls a running build (default http://localhost:3000) starting from /sitemap.xml and checks, per indexable page:
 * status 200 · unique <title> · unique meta description · canonical = canonical host + own path · hreflang self-reference
 * (and reciprocity) · <html lang/dir> · JSON-LD parses · no meta keywords. Also builds the internal link graph:
 * orphans (in sitemap but no inbound link), links to URLs that redirect, links with no anchor text, and hash-only service links.
 * Usage: node scripts/verify-seo.js [baseUrl]
 */
const BASE = process.argv[2] || 'http://localhost:3000';
const HOST = 'https://www.pridehire.com';
const get = async (u) => { const r = await fetch(u, { redirect: 'manual' }); return { status: r.status, loc: r.headers.get('location'), text: r.status === 200 || r.status < 300 ? await r.text() : '' }; };
const attr = (tag, name) => (tag.match(new RegExp(`${name}="([^"]*)"`)) || [])[1];
const decode = (s = '') => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');

(async () => {
  const sm = await get(`${BASE}/sitemap.xml`);
  const urls = [...sm.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const wwwOnly = urls.every((u) => u.startsWith(HOST));
  const pages = {};
  const problems = [];
  const inbound = {};
  const redirectCache = {};
  const linkIssues = { emptyAnchor: [], hashService: [], toRedirect: [] };

  for (const u of urls) {
    const path = u.replace(HOST, '') || '/';
    const r = await get(`${BASE}${path}`);
    if (r.status !== 200) { problems.push(`${path}: status ${r.status}`); continue; }
    const h = r.text;
    const title = decode((h.match(/<title>([^<]*)<\/title>/) || [])[1]);
    const desc = decode(attr((h.match(/<meta name="description"[^>]*>/) || [''])[0], 'content'));
    const canon = attr((h.match(/<link rel="canonical"[^>]*>/) || [''])[0], 'href');
    const html = (h.match(/<html[^>]*>/) || [''])[0];
    const hreflangs = [...h.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/gi)].map((m) => [m[1], m[2]]);
    const ld = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    let ldOk = true; for (const j of ld) { try { JSON.parse(j); } catch { ldOk = false; } }
    pages[path] = { title, desc, canon, html, hreflangs, ldCount: ld.length, ldOk, keywords: /<meta name="keywords"/.test(h) };
    if (canon !== u) problems.push(`${path}: canonical ${canon} != ${u}`);
    if (!hreflangs.some(([, href]) => href === u)) problems.push(`${path}: no self-referencing hreflang`);
    if (!ldOk) problems.push(`${path}: invalid JSON-LD`);
    if (pages[path].keywords) problems.push(`${path}: meta keywords present`);
    // links
    for (const m of h.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
      const href = attr(m[1], 'href'); if (!href) continue;
      const inner = m[2].replace(/<[^>]+>/g, '').trim(); const aria = attr(m[1], 'aria-label');
      let t = null;
      if (href.startsWith('/') && !href.startsWith('//')) t = href.split('#')[0].split('?')[0] || '/';
      else if (href.startsWith(HOST)) t = href.replace(HOST, '').split('#')[0] || '/';
      if (t === null) continue;
      if (!inner && !aria && !/<img[^>]+alt="[^"]+"/.test(m[2])) linkIssues.emptyAnchor.push(`${path} -> ${href}`);
      if (/^\/services#/.test(href)) linkIssues.hashService.push(`${path} -> ${href}`);
      (inbound[t] ||= new Set()).add(path);
      if (!(t in redirectCache)) { const rr = await get(`${BASE}${t}`); redirectCache[t] = rr.status >= 300 && rr.status < 400 ? `${rr.status}->${rr.loc}` : null; }
      if (redirectCache[t]) linkIssues.toRedirect.push(`${path} -> ${href} (${redirectCache[t]})`);
    }
  }
  // uniqueness + reciprocity
  const dup = (k) => { const m = {}; for (const [p, d] of Object.entries(pages)) (m[d[k]] ||= []).push(p); return Object.entries(m).filter(([v, l]) => l.length > 1 || !v); };
  const dupTitles = dup('title'), dupDescs = dup('desc');
  for (const [p, d] of Object.entries(pages)) for (const [code, href] of d.hreflangs) {
    const tp = href.replace(HOST, '') || '/'; const t = pages[tp];
    if (t && !t.hreflangs.some(([, h2]) => h2 === `${HOST}${p === '/' ? '' : p}`)) problems.push(`${p}: hreflang ${code} -> ${tp} is not reciprocated`);
  }
  const orphans = Object.keys(pages).filter((p) => p !== '/' && !(inbound[p] && [...inbound[p]].some((s) => s !== p)));
  console.log(JSON.stringify({
    pagesCrawled: Object.keys(pages).length, sitemapAllWww: wwwOnly, problems,
    duplicateTitles: dupTitles, duplicateDescriptions: dupDescs,
    htmlAttrs: [...new Set(Object.values(pages).map((p) => p.html))],
    jsonLdPerPage: Object.fromEntries(Object.entries(pages).map(([p, d]) => [p, d.ldCount])),
    orphans, linksToRedirectingUrls: [...new Set(linkIssues.toRedirect)], hashServiceLinks: [...new Set(linkIssues.hashService)], emptyAnchorLinks: [...new Set(linkIssues.emptyAnchor)],
  }, null, 2));
})();
