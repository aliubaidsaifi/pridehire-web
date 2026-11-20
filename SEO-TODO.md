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
- [ ] **BLOCKER for ANY Arabic page going live:** the shared Footer and Navbar are hard-coded English (Latin nav/labels). An Arabic page cannot ship with an English footer/nav. Build a localized Arabic footer + nav (visible-site change; do it only once the reviewer has approved the Arabic copy and Arabic is actually shipping). The Arabic footer must also carry the `/sa/ar` link (`lib/sa-links.js` already supports it).
- [ ] Reviewer fills `content/sa/_glossary.json` decisions (via the glossary sheet) before Arabic drafts are written.

## AI-referrer measurement (internal only — never mentioned on a page, not a client service)
- `components/AiReferrerTracking.js` + `lib/ai-referrer.js` push one `AiReferral` event per session landing (dataLayer -> GTM/GA) for chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com, claude.ai (and chat.openai.com, utm_source=chatgpt.com).
- [ ] In GTM/GA: create a trigger on event `AiReferral` and register `ai_source`, `ai_detect`, `landing_path`, `tracking_version` as custom dimensions. **The baseline starts the day that is live — write that date here: ____**
- Limits: assistants/apps that send no referrer are invisible to this; it counts visits, not mentions.
- Saudi scope is web development (incl. Arabic/RTL), business automation, graphic design ONLY; no marketing/SEO/ads, no flex printing.

## India NAP / directories (flag: footer vs directories)
- **Decision (owner):** publish the full address on IndiaMART, JustDial and other directories. Canonical NAP, byte-identical everywhere:
  `Pride Hire` · `3413 Kareem Nagar, Muzaffarnagar, Uttar Pradesh 251002` · `+91 94566 15609` · `https://www.pridehire.com/`
- **Known inconsistency:** the site footer shows only "India / Remote Delivery Worldwide" and the GBP hides the address (service-area business), while directories will show the full address. Owner may revisit the footer decision once directories are live. Schema `PostalAddress` already carries the full address.
- India page copy lives in `content/in/` (English; Hinglish inside English pages; Hindi pages deferred until Keyword Planner shows Devanagari demand). India pages are NOT built as routes yet.
- Directory order of value: GBP, IndiaMART, JustDial, Sulekha, Bing Places + Apple Business Connect, then TradeIndia/UrbanPro.
- GBP secondary categories: add only accurate ones, from Google's own list, after verification clears.
- **Staged India footer link:** `lib/in-links.js` -> footer link to `/in/areas-we-serve` (label from `footer.label`, currently DRAFT: owner to review wording). Renders only when the India gate is open, that page AND every content page it links to are approved, and `MARKETS.in.locales.en.live` is switched on. Saudi equivalent now has the same dead-link guard. Other inbound links (e.g. from `/services/*` pages) are a visible change on existing pages: ask first.
- When the website-cost page ships, add a link to it from `/in/web-design-muzaffarnagar` (not linked yet on purpose).
- Flex printing is OUTSOURCED to a local Muzaffarnagar printer (owner confirmed 2026-11-20); `content/in/flex-printing-muzaffarnagar.json` is built but cannot ship until the owner supplies, from the printer: materials, sizes, rates (fixed or starting), turnaround, delivery area / installation. Flex stays OFF all Saudi pages. Not yet listed on `/in/areas-we-serve` or linked from other pages (delivery area unknown).
- Cost page: basic business website = ₹15,000 supplied, but starting-vs-fixed is UNCONFIRMED; still owed: online-store band, inclusions, exclusions. Stored as `ownerSupplied` data, not copy. Do not infer other bands. No Saudi figure used anywhere.
- Pending owner answers: real rupee price bands (page 5); in-person meetings in India? (not claimed anywhere).

## Answer-first / GEO follow-ups
- **Done (owner approved 2026-11-20):** the six `/services/*` pages (question H2s + 40-60 word answers; "Recent results" cut because there is no proof behind it) and `/blog/seo-basics`, `/blog/google-maps` (H2s as questions, 40-60 word openers; `updated: 2026-11-20` added so sitemap lastmod is honest).
- **HOLD — `/blog/website-cost`:** do NOT rewrite until the owner has settled pricing (its ranges conflict with the ₹15,000 India figure). Rewriting it now would mean doing it twice.
- **HOLD — homepage and `/about`:** leave alone until the owner resolves the claims on them (rotating unverified testimonials; "40+ projects").
- **Owner's to resolve, not to be touched or worked around:** "40+ projects", "2–4 weeks", "fixed quote after your free audit", the blog price ranges.
- **DONE 2026-11-20 (owner chose option a):** FAQPage markup removed from all six `/services/*` pages — it described Q&As that are not visible on the page (structured-data policy / manual-action risk). `/lp/*` FAQ markup is fine: those FAQs are visible.
- **FOLLOW-UP (option b, same batch as `/blog/website-cost`, after the owner settles pricing and process):** render the service FAQs visibly (answer-first fit) and re-enable `FaqSchema` for them. Existing Q&As in `LANDING[slug].faqs` contain claims (revision counts, turnaround) that the owner must approve first. Do not re-add the markup before the text is visible.
- **Schema sweep result (live site, 2026-11-20):** no Review/AggregateRating markup anywhere; BlogPosting headline/author/description match visible content; WebPage/Service names and descriptions match the title/visible text/meta description. Open item: BreadcrumbList on `/services/*` (Home > Services > X) has no visible breadcrumb trail on the page (only a "← All services" link); the trail itself is true. Left as is; owner to decide whether to add a visible trail or drop the markup.
- **Heading change (owner correction):** the criteria section on service pages is now "What do you get with [service]?" (the earlier "How does [service] work?" over a list of qualities was a mismatch).
- **"How does [service] work?" sections** list qualities (the old criteria), not a process, and have no 40-60 word intro. Heading was changed as instructed; content unchanged. Owner to decide whether to retitle ("What do you get with [service]?") or add an intro.
- Remaining non-conforming H2s are the shared "Ready to grow your business?" CTA and navigational headings ("Related articles", etc.).
- GEO: `/llms.txt` and `/llms-full.txt` are an EXPERIMENT (never described as a technique that works); AI-crawler allow rules are in `app/robots.js`. Owner is checking Vercel Bot Management/Firewall for AI-bot rules.

## Manual steps outside the code
- **Calendly**: fix the URL; set working days/hours/timezone there (Sun–Thu, AST for Saudi) — cannot be done in code.
- **Vercel → Domains**: confirm apex→www is a permanent redirect and that `http://` upgrades to `https://` in one hop.
- **Search Console**: add the `www` URL-prefix property (and Domain property); submit `https://www.pridehire.com/sitemap.xml`; use URL Inspection on `/`; check the Pages report for the four restored portfolio URLs.
- **Rich Results Test / Schema validator**: run on `/`, `/services/seo`, a blog post (only a structural local check was possible offline).
- **Enable `experimental.globalNotFound`** is on (Next 16.2.10): re-check on Next upgrades.
