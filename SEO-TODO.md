# SEO placeholders and open items

Every value below is a clearly-marked placeholder in code (`grep -rn "TODO(" lib app components`). Nothing here was invented.

| Where | Placeholder | Needs |
|---|---|---|
| `lib/site.js` `SITE.calendly` | `https://calendly.com/pridehire/free-consultation` returns 404 | Correct Calendly URL (used by `components/ContactClient.js`: iframe, card link, button) |
| `lib/markets.js` `ORG.address` | Only `addressCountry: 'IN'` is emitted in schema | Full real registered Indian address (street, locality, region, postal code) |
| `lib/markets.js` `ORG.officeLabel/addressDisplay` | Footer still prints "India (Head Office) / Delhi NCR / Remote Delivery Worldwide" (kept byte-for-byte, no visible change) | Same real address; then replace |
| `lib/markets.js` `sa.businessHours`, `global.businessHours` | Days set, times `null` | Real hours; must match Calendly settings (Sun–Thu / AST must be configured IN Calendly, not in code) |
| Saudi number (+966535239163) | In `PHONES.SA`; in schema only. No page displays it yet | Phase 3 decision: which number shows on which page |
| `lib/markets.js` `global.currency` | `null` | Currency for the global audience |
| `lib/markets.js` `ORG.ogImagePath` | `/public/og-image.png` does not exist — every social share preview currently 404s | Create a 1200x630 image |
| `lib/markets.js` `ORG.sameAs` | LinkedIn only | Add other profiles only when real. Footer Instagram icon still links to `#` (visible UI, left alone) |
| `lib/lastmod.generated.json` | Committed date map; the build only READS it (no git at build time) | A pre-commit hook (`.githooks/pre-commit`) stamps pages whose source files are in each commit. After a fresh clone run `npm run hooks:install`. Repair/rebuild from full history: `npm run lastmod:seed` |

## Rule for schema
Schema describes what the site actually does today, never what it will do. If unsure whether a value is currently true, leave it out and flag it.

## Phase 3 reminders (do not forget)
- [ ] **Add `'ar'` back to `MARKETS.sa.availableLanguage` in `lib/markets.js` in the SAME commit that ships the first native-reviewed Arabic page.** It was removed from the Saudi `contactPoint` because nothing yet backs an Arabic enquiry.
- [ ] Decide which phone number (Saudi / India) shows on which page once `/sa/` pages exist. The Saudi number is currently in schema only.
- [ ] Add the Saudi equivalents to `lib/locale-pages.js` when the first `/sa/` page goes live (hreflang + sitemap alternates follow automatically).

## Saudi content workflow (staged, NOT published)
- Data: `content/sa/<page>.json` (en + ar per field, each with `reviewStatus` draft|reviewed|approved). `text: null` = section omitted.
- `npm run content:check` validates (blocklist, TODO markers, sources, approved-needs-approver) and shows publish readiness.
- `npm run content:export -- <page>` -> `review-out/` reviewer pack (CSV + guide + glossary); `content:import` records the reviewer's corrections as `reviewed`; only `content:approve` (owner) sets `approved`.
- **Licensing gate:** `content/sa/_gate.json` `licensingCleared` must be set true by the owner before any /sa/ route is served. Routes must call `isPublishable()` (`lib/content-review.js`).
- [ ] Owner confirms licensing with a Saudi consultant -> then open the gate.
- [ ] Reviewer fills `content/sa/_glossary.json` decisions (via the glossary sheet) before Arabic drafts are written.

## AI-referrer measurement (internal only — never mentioned on a page, not a client service)
- `components/AiReferrerTracking.js` + `lib/ai-referrer.js` push one `AiReferral` event per session landing (dataLayer -> GTM/GA) for chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com, claude.ai (and chat.openai.com, utm_source=chatgpt.com).
- [ ] In GTM/GA: create a trigger on event `AiReferral` and register `ai_source`, `ai_detect`, `landing_path`, `tracking_version` as custom dimensions. **The baseline starts the day that is live — write that date here: ____**
- Limits: assistants/apps that send no referrer are invisible to this; it counts visits, not mentions.
- Saudi scope is web development (incl. Arabic/RTL), business automation, graphic design ONLY; no marketing/SEO/ads, no flex printing.

## Manual steps outside the code
- **Calendly**: fix the URL; set working days/hours/timezone there (Sun–Thu, AST for Saudi) — cannot be done in code.
- **Vercel → Domains**: confirm apex→www is a permanent redirect and that `http://` upgrades to `https://` in one hop.
- **Search Console**: add the `www` URL-prefix property (and Domain property); submit `https://www.pridehire.com/sitemap.xml`; use URL Inspection on `/`; check the Pages report for the four restored portfolio URLs.
- **Rich Results Test / Schema validator**: run on `/`, `/services/seo`, a blog post (only a structural local check was possible offline).
- **Enable `experimental.globalNotFound`** is on (Next 16.2.10): re-check on Next upgrades.
