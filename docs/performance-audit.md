# Performance Audit

## Changes in this upgrade
| Area | Before | After |
|------|--------|-------|
| Image delivery | `next/image` on-demand transcode (cold = multi-second) | Build-time AVIF/WebP variants, static, immutable-cached, **zero runtime transcode** |
| Collection detail | Full image fetched only on click → ~10s blank | Intent + idle + neighbour preloading → opens instantly with LQIP then sharp |
| Hero | R3F/three.js scene (~150 KB JS) | Composited image hero (no WebGL); three.js removed from bundle |
| Placeholders | gray/none | Inline blurred LQIP on every image |
| Layout shift | possible | Intrinsic dims + aspect boxes → no CLS |
| Caching | default | `/assets/opt` immutable 1yr; `/assets/images` 30d SWR |
| Formats | runtime avif/webp | pre-generated AVIF + WebP with correct `srcset`/`sizes` |

## Bundle
- Removed deps: `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`.
- Homepage no longer ships the 3D runtime.

## Image bytes (representative)
- 425 KB source PNG → 6.9 KB (320 AVIF) / 17 KB (640 AVIF) / 20 KB (750 AVIF).
- 165 sources → 1,070 static variants; any single view loads only a handful of small files.

## Verification (see performance-audit "QA log" below)
- `npm run build` passes; routes prerender static/SSG.
- Prod server: variant files serve with `image/avif` + `Cache-Control: … immutable`.
- Collection modal: image present in DOM immediately, no runtime transcode.
- Reduced-motion + no-JS: content visible.

## QA log (verified on production build + `next start`)
- **Build:** `npm run build` → exit 0. `prebuild` ran the image pipeline (165 sources, 1080 variants up-to-date/skipped). 14 routes prerendered static/SSG.
- **Lint / types:** `next lint` clean; `tsc --noEmit` clean.
- **Runtime optimizer OFF:** `/_next/image?...` → **404** (no cold transcode path exists).
- **Variants served correctly:** `GET /assets/opt/ho-scale__1-640.avif` → `Content-Type: image/avif`, `Content-Length: 17034`, `Cache-Control: public, max-age=31536000, immutable`.
- **Repeat visit:** conditional GET with `If-None-Match` → **304**; assets are `immutable` for a year.
- **Hero:** responsive AVIF `<link rel=preload as=image imagesrcset>` present with `fetchPriority=high`; `<picture>` with `image/avif` sources pointing at `/assets/opt/…`; backdrop `<img>` has intrinsic `1200×640`. All layers (`data-bg`, `data-sweep`, `data-fg`, copy) render.
- **Collection:** 146 AVIF `<source>`s + 146 `/assets/opt/*.webp` fallback `<img>`s; blur LQIP backgrounds on card wrappers; `sizes` responsive; raw `/assets/images/*` appears only in serialized product data (not requested).
- **CLS:** 148 images carry intrinsic `width`/`height`; fixed-ratio plates + `reserveRatio` masonry → no shift.
- **Modal:** dialog shell + display-frame structure always present (frame appears instantly on open); image is `priority=critical` and pre-warmed on hover/idle/neighbour.
- **Bundle:** three.js absent from all client chunks. Home First Load JS 163 kB (incl. ~16 kB gzipped image manifest, shared + cached across routes); other routes 97–117 kB.
- **Errors:** no Next error markers on any route; no console/runtime errors observed in rendered output.
- **Robustness:** missing variant → 404 (SmartImage `onError` falls back to raw source in-app); reduced-motion skips all hero/scroll animation; `.no-js` keeps content visible.

## Deploy reminder (Render)
Use a **Node Web Service**: build `npm install && npm run build` (runs the image pipeline via `prebuild`), start `npm run start`. Set `BRAND.siteUrl` to the production domain. Because the optimizer is disabled, no per-request CPU is spent on images.
