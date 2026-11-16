/**
 * Generates lib/lastmod.generated.json: real per-URL modification dates, taken from git history of the source
 * files that produce each page. Blog posts use their own frontmatter (`updated` || `date`) at read time instead.
 *
 * - Runs automatically before `next build` (see "prebuild" in package.json).
 * - If git is unavailable or the clone is shallow (dates would be wrong), the previously committed file is kept untouched.
 * - Commit the regenerated file so builds without git history still emit real dates.
 */
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const OUT = path.join(__dirname, '..', 'lib', 'lastmod.generated.json');
const NZ = ['web-design-auckland', 'seo-auckland', 'google-ads-auckland', 'meta-ads-auckland', 'ecommerce-auckland'];
const SERVICES = ['website-development', 'graphic-design', 'business-automation', 'meta-ads', 'google-ads', 'seo'];
const PROJECTS = ['modora-elan', 'salonflow', 'auckland-plumbing', 'smile-dental', 'north-shore-roofing', 'coastal-electric'];
const DATA = 'lib/site.js';
const G = 'app/(global)';

const SOURCES = {
  '/': [`${G}/page.js`, 'components/Hero.js', 'components/Services.js', 'components/WhyUs.js', 'components/Reviews.js', 'components/PortfolioPreview.js', 'components/BlogPreview.js', 'components/AuditCTA.js', 'components/TrustStats.js', 'components/ClientMarquee.js', DATA],
  '/about': [`${G}/about/page.js`, 'components/CompanyMedia.js'],
  '/services': [`${G}/services/page.js`, 'components/ServicesList.js', DATA],
  '/portfolio': [`${G}/portfolio/page.js`, 'components/PortfolioGrid.js', DATA],
  '/blog': [`${G}/blog/page.js`, 'components/BlogGrid.js'],
  '/contact': [`${G}/contact/page.js`, 'components/ContactClient.js'],
  '/free-audit': [`${G}/free-audit/page.js`, 'components/FreeAuditClient.js'],
  '/privacy': [`${G}/privacy/page.js`],
  '/terms': [`${G}/terms/page.js`],
};
for (const s of SERVICES) SOURCES[`/services/${s}`] = [`${G}/services/[slug]/page.js`, DATA];
for (const s of PROJECTS) SOURCES[`/portfolio/${s}`] = [`${G}/portfolio/[slug]/page.js`, DATA];
for (const s of NZ) SOURCES[`/nz/${s}`] = [`app/nz/${s}/page.js`, 'components/LocalPage.js', DATA];

function git(cmd) { return execSync(`git ${cmd}`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); }

try {
  if (git('rev-parse --is-shallow-repository') === 'true') throw new Error('shallow clone');
  const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
  const next = { ...prev };
  for (const [route, files] of Object.entries(SOURCES)) {
    const existing = files.filter((f) => fs.existsSync(f));
    if (!existing.length) continue;
    // Per file: --follow so history continues across file MOVES, and --diff-filter=M so only commits that changed content count
    // (a pure move would otherwise stamp every moved page with the move date). Route date = newest of its source files.
    // --literal-pathspecs: paths like app/(global)/services/[slug] contain glob characters.
    const dates = existing
      .map((f) => git(`--literal-pathspecs log --follow -1 --diff-filter=M --format=%cI -- "${f}"`) || git(`--literal-pathspecs log --follow -1 --diff-filter=A --format=%cI -- "${f}"`))
      .filter(Boolean)
      .map((d) => new Date(d).getTime());
    const iso = dates.length ? new Date(Math.max(...dates)).toISOString() : '';
    if (iso) next[route] = iso;
  }
  fs.writeFileSync(OUT, JSON.stringify(next, null, 2) + '\n');
  console.log(`[lastmod] updated ${Object.keys(next).length} routes`);
} catch (e) {
  console.log(`[lastmod] kept committed dates (${e.message})`);
}
