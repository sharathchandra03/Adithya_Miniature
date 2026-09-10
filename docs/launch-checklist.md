# Launch Checklist

## Build & quality — verified
- [x] `npm install` succeeds (Node 20, npm 10).
- [x] `npx tsc --noEmit` — no type errors.
- [x] `npx next lint` — no ESLint warnings or errors.
- [x] `npm run build` — succeeds; 14 routes prerendered as static / SSG.
- [x] `npm run start` — all routes return 200; sitemap.xml and robots.txt served correctly.

## Content accuracy — verified against original-site
- [x] Business facts sourced only from scraped content (23+ years, Bangalore, N/HO/G/Z scales, two signature Solutions).
- [x] Real Bachmann HO GG1 spec preserved verbatim on the HO scale page.
- [x] Contact details correct: +91 96110 77015, adityaminiaturesandmodels@gmail.com, WhatsApp, Mallesh palya 560075.
- [x] No fabricated awards, testimonials, prices, or statistics.
- [x] Z-scale (was "Under Construction" originally) shows an honest "On the bench" state, not fake products.
- [x] Zero leftover template text ("Bernd", "Catogories", lorem).

## SEO — verified
- [x] Unique per-page titles + meta descriptions (fixes the old duplicate/template metadata).
- [x] Canonical URLs on every route.
- [x] Open Graph + Twitter cards with dedicated `/og.jpg` (1200×630).
- [x] `sitemap.xml` (9 URLs) and `robots.txt` generated.
- [x] JSON-LD: LocalBusiness (home + contact), CollectionPage, Service (solutions).
- [x] 301/308 redirects from all old `.html` URLs → new routes (verified `ho-scale-locomotives.html` → `/collection/ho`, `solutions.html` → `/solutions`).
- [x] Single H1 per page; semantic headings; descriptive alt text on all product images.

## Accessibility — verified
- [x] `lang="en-IN"`, skip-to-content link.
- [x] Keyboard-operable nav, filters (`aria-pressed`), form (labels bound, `aria-invalid`/`aria-describedby`).
- [x] Visible focus ring (brass) globally.
- [x] `prefers-reduced-motion`: Lenis disabled, scroll animations skipped, reveals shown immediately, 3D replaced by static fallback.
- [x] `.no-js` safety so content is never hidden if JS fails.

## Performance — verified
- [x] three.js / R3F lazy-loaded (dynamic import, `ssr:false`) — kept out of initial bundle; home First Load JS ~152 kB.
- [x] 3D gated to desktop + WebGL + motion-allowed; mobile/reduced-motion get a near-zero-cost SVG fallback.
- [x] Animations use transform/opacity only; IntersectionObserver reveals (no scroll-listener reflow).
- [x] `backdrop-blur` only on fixed nav/overlays; grain on a single fixed layer.
- [x] Images via `next/image` (responsive `sizes`, AVIF/WebP, priority only on first 3 cards).

## Before going live (deployment steps for the client)
- [ ] Deploy to a Node host or Vercel (App Router). If static export is required, note the Google Maps iframe and next/image need consideration (use a loader or a host that supports the Image Optimizer).
- [ ] Confirm the production domain matches `BRAND.siteUrl` in `lib/products.ts` (currently `https://adityaminiaturetrainmodels.com`). Update if different.
- [ ] Optional: drop real videos into `/public/videos/` (`waiterless-train.mp4`, `rideable-train.mp4`, `hero-loop.mp4`) — the UI auto-upgrades from poster to video. See `docs/video-requirements.md`.
- [ ] Verify social share preview with the new `/og.jpg`.
- [ ] Run Lighthouse on the deployed URL and confirm scores.
