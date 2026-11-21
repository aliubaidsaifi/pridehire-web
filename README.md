# PrideHire — Premium Agency Website

A high-end digital agency site for **PrideHire** (Build. Scale. Automate.) built as a fast,
conversion-focused, light-theme experience inspired by premium Framer templates.

**Stack:** Next.js 15 (JavaScript, App Router) · React 19 · Tailwind CSS · GSAP + ScrollTrigger ·
Three.js / React Three Fiber · Lenis smooth scroll. **No TypeScript.**

---

## After a fresh clone: install the git hook

Run `npm run hooks:install` once after cloning. It points git at `.githooks/`, whose pre-commit hook stamps `lib/lastmod.generated.json` (the real last-modified date used in the sitemap and schema `dateModified`) for every page whose source files are in the commit. **If you skip this, lastmod silently stops updating** — nothing fails, the dates just go stale. The build never runs git; it only reads the committed JSON and prints where each date came from (`[lastmod]` and `[sitemap]` lines in the build log). To rebuild all dates from full git history (not possible on a shallow clone), run `npm run lastmod:seed`.

## After a freeze, crash or hard reset: use `npm run dev:clean`, not `npm run dev`
Next's dev server (Turbopack) keeps an on-disk cache in `.next/dev`. A hard reset or crash can leave that cache in a bad state, and then the next `npm run dev` can balloon to several GB of memory within seconds — on a small machine that freezes the computer, which forces another hard reset and makes the cache worse. (Diagnosed 2026-11-21: with the bad cache Node reached 3–7 GB; with the cache deleted, the same code peaked under 1 GB.) **After any freeze, crash or forced restart, run `npm run dev:clean`** — it deletes `.next` and then starts the dev server. The first page after a clean start is slow (about two minutes on a spinning disk) because everything recompiles; later starts are fast. Plain `npm run dev` is fine otherwise.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Build for production:

```bash
npm run build
npm start
```

> Requires **Node 18.18+** (Node 20 LTS recommended).

---

## Project structure

```
app/
  layout.js          # fonts (next/font), SEO metadata, SmoothScroll + Navbar + Footer
  page.js            # homepage — composes all sections
  globals.css        # Tailwind layers + design tokens
  icon.svg           # favicon (brand mark)
  robots.js          # SEO
  sitemap.js         # SEO
  services/page.js
  work/page.js
  about/page.js
  insights/page.js
  contact/page.js    # working client-side form (wire to your API)

components/
  Navbar.js          # sticky, blur-on-scroll, Services mega-dropdown, mobile sheet
  Hero.js            # GSAP text reveal + lazy-loaded 3D
  Hero3D.js          # R3F low-poly glass crystal (mouse parallax, no HDR download)
  Trust.js           # infinite CSS logo marquee
  Services.js        # premium cards, hover lift, scroll reveal
  Portfolio.js       # pinned horizontal scroll (ScrollTrigger), mobile fallback
  WhyPrideHire.js    # value pillars + animated counters
  Process.js         # timeline with scroll-draw progress line
  Testimonials.js    # accessible auto-advancing carousel
  CTA.js             # conversion band
  Footer.js          # minimal premium footer
  SmoothScroll.js    # Lenis ↔ GSAP ticker sync
  PageHeader.js      # shared inner-page header

animations/
  scrollAnimations.js  # reusable GSAP helpers: reveal, parallax, countUp

lib/
  site.js            # all shared content/config (nav, services, projects, copy)
```

## Where to edit content

Almost everything lives in **`lib/site.js`** — brand name, nav, services, projects, stats,
process steps and testimonials. Change copy there and it updates across the site.

## Add real project images

Placeholders use CSS gradients so the site runs with zero assets. To use real screenshots, drop
optimized images into `public/work/` and swap the gradient `<div>` for `next/image` — see
`public/work/README.txt`.

## Wire up the contact form

`app/contact/page.js` validates and shows a success state client-side. Connect it to a backend by
posting to an API route or a service (e.g. Brevo) inside `onSubmit`:

```js
await fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) });
```

---

## Performance notes

- **3D is code-split** via `next/dynamic({ ssr:false })` and never blocks first paint.
- The glass material uses in-scene **Lightformers** instead of an HDR file — no extra download.
- `dpr` is capped at `1.5` and `AdaptiveDpr` lowers it under load to protect 60fps.
- The logo marquee and hover effects are **pure CSS** (GPU transforms), not JS loops.
- Heavy scroll effects (pinned horizontal portfolio) run **only on `lg+`** via `gsap.matchMedia`.
- **`prefers-reduced-motion` is respected everywhere** — Lenis, GSAP and the 3D spin all back off.
- Fonts are self-hosted and subset through `next/font` (no layout shift, no render-block).

## Accessibility floor

Visible keyboard focus, reduced-motion support, semantic landmarks, labelled controls, and a
mobile menu that locks body scroll.

## Still to add (optional)

`/privacy` and `/terms` pages are linked in the footer but not built — add them when you have copy.
