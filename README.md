# PrideHire — Premium Agency Website

A high-end digital agency site for **PrideHire** (Build. Scale. Automate.) built as a fast,
conversion-focused, light-theme experience inspired by premium Framer templates.

**Stack:** Next.js 15 (JavaScript, App Router) · React 19 · Tailwind CSS · GSAP + ScrollTrigger ·
Three.js / React Three Fiber · Lenis smooth scroll. **No TypeScript.**

---

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
