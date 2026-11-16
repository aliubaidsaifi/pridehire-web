/**
 * Maintains lib/lastmod.generated.json — the real last-modified date of each URL — as COMMITTED DATA.
 * The build never runs git; it only reads this file (see scripts/check-lastmod.js and lib/content-dates.js).
 *
 *   node scripts/lastmod.js --staged   pre-commit hook: every route whose source files are in the commit being made gets
 *                                      date = now (pure renames/moves are ignored) and the JSON is re-staged. No history needed.
 *   node scripts/lastmod.js --seed     one-off / repair: rebuild every date from FULL git history (refuses on a shallow clone).
 *
 * Entry shape: { "date": ISO-8601, "source": "git-history" | "commit" }
 */
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { SOURCES } = require('./lastmod-sources');

const OUT = path.join(__dirname, '..', 'lib', 'lastmod.generated.json');
const git = (cmd) => execSync(`git ${cmd}`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
const load = () => (fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {});
const save = (o) => fs.writeFileSync(OUT, JSON.stringify(o, null, 2) + '\n');
const mode = process.argv[2];

if (mode === '--staged') {
  const changed = new Set();
  for (const line of git('diff --cached --name-status -M').split('\n').filter(Boolean)) {
    const [status, ...paths] = line.split('\t');
    if (status === 'R100' || status === 'D') continue; // a pure move or a delete changes no page content
    changed.add(paths[paths.length - 1]);
  }
  const data = load();
  const now = new Date().toISOString();
  const touched = [];
  for (const [route, files] of Object.entries(SOURCES)) {
    if (files.some((f) => changed.has(f))) { data[route] = { date: now, source: 'commit' }; touched.push(route); }
  }
  if (touched.length) {
    save(data);
    execSync(`git add "${OUT}"`);
    console.log(`[lastmod] stamped ${touched.length} route(s) with the commit time: ${touched.join(', ')}`);
  }
} else if (mode === '--seed') {
  if (git('rev-parse --is-shallow-repository') === 'true') { console.error('[lastmod] shallow clone: refusing to seed from history'); process.exit(1); }
  const data = {};
  for (const [route, files] of Object.entries(SOURCES)) {
    const dates = files
      .filter((f) => fs.existsSync(f))
      .map((f) => git(`--literal-pathspecs log --follow -1 --diff-filter=M --format=%cI -- "${f}"`) || git(`--literal-pathspecs log --follow -1 --diff-filter=A --format=%cI -- "${f}"`))
      .filter(Boolean)
      .map((d) => new Date(d).getTime());
    if (dates.length) data[route] = { date: new Date(Math.max(...dates)).toISOString(), source: 'git-history' };
  }
  save(data);
  console.log(`[lastmod] seeded ${Object.keys(data).length} routes from git history`);
} else {
  console.error('usage: node scripts/lastmod.js --staged | --seed');
  process.exit(1);
}
