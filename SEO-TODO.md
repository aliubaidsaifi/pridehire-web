# SEO placeholders and open items

Every value below is a clearly-marked placeholder in code (`grep -rn "TODO(" lib app components`). Nothing here was invented.

| Where | Placeholder | Needs |
|---|---|---|
| `lib/markets.js` `ORG.address` | Only `addressCountry: 'IN'` is emitted in schema | Full real registered Indian address (street, locality, region, postal code) |
| `lib/markets.js` `ORG.officeLabel/addressDisplay` | Footer still prints "India (Head Office) / Delhi NCR / Remote Delivery Worldwide" (kept byte-for-byte, no visible change) | Same real address; then replace |
| `lib/markets.js` `sa.businessHours`, `global.businessHours` | Days set, times `null` | Real hours |
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

## Saudi English pages: BUILT, NOT PUBLISHED (licensing cleared 2026-11-21)
- Routes: `app/sa/(en)/` -> `/sa` (hub) and `/sa/ai-visibility`, English only, rendered from `content/sa/*.json` by `components/MarketContentPage.js`. Arabic locale stays OFF (no `/sa/ar` pages; Arabic is draft, unreviewed). `content/sa/_gate.json` is `licensingCleared: true`.
- **Three independent guards keep them out of production** (any one is enough):
  1. **Render gate** (`lib/market-pages.js`): pages render only in local dev (`npm run dev`) or when `PH_SHOW_SA=1` is set. In a normal production build they are a prerendered 404.
  2. **Locale live flag** (`MARKETS.sa.locales.en.live`, currently `false` in `lib/markets.js`): keeps the footer link, sitemap entries and `llms.txt` entries hidden.
  3. **Not pushed** (commit exists locally only until the owner says go).
- **To review locally:** `npm run dev`, open `http://localhost:3000/sa` and `/sa/ai-visibility` (first compile is slow). To review a production build: `PH_SHOW_SA=1 npm run build` then `PH_SHOW_SA=1 npm start`.
- **To PUBLISH (when the owner says so), in this order:** (a) set `PH_SHOW_SA=1` in Vercel -> Environment Variables (Production); (b) set `MARKETS.sa.locales.en.live: true` in `lib/markets.js`; (c) push and deploy; (d) verify live: `/sa` and `/sa/ai-visibility` 200, sitemap has both, `/llms.txt` lists both, footer shows "Services in Saudi Arabia", `/sa/ar` still 404.
- **To REVERSE:** remove the Vercel env var (pages 404 again after redeploy) and/or set the locale `live` flag back to `false`; set `licensingCleared: false` to hold all Saudi content.
- Dry run done 2026-11-21 (flag ON + render gate ON): both pages 200; sitemap, llms.txt and footer link all appeared; then reverted.
- Known: the shared Footer/Navbar are English-only and show the Udyam line on Saudi pages (fine for English; Arabic still blocked on a localized footer/nav).

## Saudi: SFDA menu-labelling guide (English drafted 2026-11-22; Arabic NOT started)
- Page: `content/sa/sfda-menu-labelling.json` -> `/sa/sfda-menu-labelling` (route staged under `app/sa/(en)/`). ENGLISH ONLY, all `draft` until the owner approves. **Arabic is written only after the English is approved.**
- **Rules for this page (owner, 2026-11-22):** SFDA's own documents are the only source of fact (no vendor/news article cited as authority); the page itself states what could not be verified (Mwasfah regulation texts unread; the guide PDF's metadata is May 2024 and may not be the current edition; no penalties/grace period found); the guide's inconsistent pizza example is not reproduced; readers are told to check Mwasfah or call SFDA 19999; "support", never "compliant"; no "healthy/wholesome/beneficial" claims in our copy (now in the Saudi blocklist as `claims-healthy`, also `compliant`).
- A field may quote a blocked word only with an explicit per-field `allow` (used only where the page explains SFDA.FD 5016). External links are allowed only to `sfda.gov.sa` / `mwasfah.sfda.gov.sa`.
- **Owner:** try to download SFDA.FD 5023, 5026, 5029 and GSO 2604 from Mwasfah in a browser (the store is unreachable from the dev machine). If obtained, update the guide to cite the exact regulation wording and remove "could not read" if true. If not, the page keeps the limitation text and names the documents used.
- **Guide layout (owner, 2026-11-22):** the "what we could not verify" section sits directly under the answer block; a visible "Documents read 21 November 2026" line (also schema `lastReviewed`); a contents list linking all 20 questions (anchors `#q-1…`). English text approved with those changes; **statuses are still `draft` until the owner runs the approve command.**
- **Commitment:** re-review this page (both languages) when the owner next checks Mwasfah, and update the visible date and `reviewedDate` in `content/sa/sfda-menu-labelling.json`.
- **Arabic draft written 2026-11-22** (non-native; uses SFDA's own Arabic wording where it exists; links the Arabic originals of the SFDA announcements). Reviewer pack: `npm run content:export -- sfda-menu-labelling`. Stays draft until a native reviewer has been through it AND the owner approves; it is a 404 in any production build.
- **Proposed English additions, NOT applied (need owner approval):** (1) SFDA's Arabic announcements (27 Feb 2025) say the physical-activity rule obliges the online ordering platforms themselves, not just menus; the English announcement page only says "menus". (2) SFDA links its own caffeine calculator (https://www.sfda.gov.sa/ar/body-calculators/caffeine-calculator): useful to add under "Where can I check".
- **Another Arabic ship-blocker:** `WebsiteSchema` hard-codes `inLanguage: 'en'`, so the site-wide WebSite node says English on Arabic pages (the WebPage node is correct: `ar-SA`). Fix when the Arabic footer/nav work is done; changing it now would alter live NZ/global pages.
- Allow-list rule (owner): the per-field `allow` for banned wording stays as narrow as possible; the validator now FAILS if an allow is not needed or names an unknown id (currently used on exactly 3 fields: activity answer; "can a menu call a meal healthy" question and answer).
- Dev preview: drafts render on localhost with a "DRAFT preview" banner; in any production build an unapproved page is a 404 even with `PH_SHOW_SA=1`.
- Decisions recorded: 3D/AR menus are NOT an SEO target (no `/sa/3d-menus` page); one short conversion section inside the hub only. Hub rewrite (digital menus + automation; graphic design removed) comes after this guide and after the owner says what our menus carry.

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
- **Vercel → Domains**: confirm apex→www is a permanent redirect and that `http://` upgrades to `https://` in one hop.
- **Search Console**: add the `www` URL-prefix property (and Domain property); submit `https://www.pridehire.com/sitemap.xml`; use URL Inspection on `/`; check the Pages report for the four restored portfolio URLs.
- **Rich Results Test / Schema validator**: run on `/`, `/services/seo`, a blog post (only a structural local check was possible offline).
- **Enable `experimental.globalNotFound`** is on (Next 16.2.10): re-check on Next upgrades.

## Contact routing (2026-11-22)
- **Done:** `/contact` cards restored (owner commit b7ef248 had deleted their inner markup while adding click tracking). Footer + homepage closing block list both numbers ("India & international" / "Saudi Arabia"). Footer phone lines are path-aware (`/sa/*` Saudi only, `/in/*` India only). Saudi pages: `/sa/contact`, `/sa/free-audit` (+966 only, submit `market: sa`); Saudi navbar/footer audit + contact links point at them; English Saudi CTAs and inline links repointed. Lead `market` attribution (forms, API, notification, Brevo tags, `track()`).
- **OWNER — draft Saudi copy to approve:** `/sa/contact` and `/sa/free-audit` reuse the global copy, adapted: service list = website development / digital menu for a restaurant / business automation and custom AI agents; no budget question (no approved SAR bands); no Google Meet card or booking section; "within 24 hours" and "We reply within one business day" are carried over from the global pages and are unverified for Saudi.
- **Saudi navbar services dropdown** still lists the global services (Graphic Design, Meta Ads, Google Ads...) and links to global `/services/*` pages (which carry +91 links). Needs the Saudi service set decision; hub rewrite is blocked on the owner.
- **Arabic:** the Arabic text still links to `/free-audit` and `/contact` (global pages, +91). Before any Arabic page ships: build `/sa/ar/contact` + `/sa/ar/free-audit` (Arabic copy, native review) and repoint.
- **India:** `/in/*` routes do not exist yet. When built, verify in built HTML that only +91 appears (FooterContact already handles it by path); the Saudi switch link on `/in/*` and the India switch link on `/sa/*` appear automatically only when the other market's hub is live.
- **Owner confirms:** WhatsApp active on +966 53 523 9163.

- **Booking (2026-11-22):** there is no Calendly account / booking system. Google Meet card, booking section and SITE.calendly removed; secondary CTA reworded "Contact Us". Do not reintroduce booking wording until a real scheduler exists. Trust badge "Free Consultation" (homepage) left as is: owner to decide.
