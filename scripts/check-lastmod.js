/**
 * Build-time REPORT (runs as `prebuild`). Reads only the committed JSON — no git, no network — and can never fail the build.
 * Prints where every URL's lastmod comes from and flags any URL with no recorded date. A URL with no date is OMITTED from
 * the sitemap's <lastmod>; the build time is never substituted.
 */
try {
  const fs = require('node:fs');
  const path = require('node:path');
  const { SOURCES } = require('./lastmod-sources');
  const file = path.join(__dirname, '..', 'lib', 'lastmod.generated.json');
  const data = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
  const bySource = {};
  const missing = [];
  for (const route of Object.keys(SOURCES)) {
    const e = data[route];
    if (!e || !e.date) { missing.push(route); continue; }
    (bySource[e.source || 'unknown'] ||= []).push(route);
  }
  const out = (s) => process.stdout.write(s + '\n');
  out('[lastmod] source: committed map lib/lastmod.generated.json (git is not used at build time)');
  for (const [src, list] of Object.entries(bySource)) out(`[lastmod]   ${src}: ${list.length} route(s)`);
  if (missing.length) out(`[lastmod] WARNING no date recorded, <lastmod> will be omitted (never defaulted to build time): ${missing.join(', ')}`);
  else out('[lastmod] all routes have a recorded date');
} catch (e) {
  process.stdout.write(`[lastmod] report skipped (${e.message}); build continues\n`);
}
