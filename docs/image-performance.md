# Image Performance

## The problem (before)
`next/image` optimized local `/public` sources **on demand**. The first request for each (image, width, format) triggered a cold sharp transcode on the server. On limited-CPU hosts (e.g. Render), and especially for the collection **detail** image (only fetched on click), this produced multi-second blank waits.

## The fix (after)
- **Build-time pipeline** pre-generates every needed variant → static files.
- **Runtime optimizer disabled** → zero transcode at request time.
- **Responsive `srcset`/`sizes`** → the browser downloads only the size it needs.
- **LQIP blur** → a visual is shown instantly; no blank rectangles.
- **Intent preloading** → detail images are warmed before the click.
- **Immutable caching** → repeat visits reuse everything from cache.

## Measured results (build-time derivatives)
Example: `ho-scale/1.png` (source 425 KB PNG, 750×500):

| Use | Variant | Size |
|-----|---------|------|
| Card thumb (mobile) | 320px AVIF | ~6.9 KB |
| Card (desktop) | 640px AVIF | ~17 KB |
| Detail | 750px AVIF | ~20 KB |

That is a **~97–98% reduction** vs. serving the source, with no runtime cost.
Full set: 165 sources → 1,070 static variants (~15 MB total on disk, but any single view downloads only a few small files).

## Priority tiers (`SmartImage priority`)
- `critical` — eager + `fetchpriority=high`. Hero backdrop, first 3 collection cards, modal image.
- `eager` — eager, normal priority. Near-viewport (e.g. About image, first scale image, hero foreground).
- `lazy` (default) — native lazy load. Below-the-fold cards, gallery, category covers.

## Zero-CLS
Every `SmartImage` carries intrinsic `width`/`height` from the manifest; fixed-ratio containers use `aspect-[…]` and the image is absolutely filled. Masonry gallery uses `reserveRatio` so each item reserves its true aspect ratio before load.

## Repeat visits
`/assets/opt/*` is `immutable` for a year. After first paint, navigation and revisits render images from cache with no network.

## Budget targets
- LCP image (hero): preloaded AVIF, responsive; typically a few tens of KB at mobile widths.
- Collection card first paint: blur instantly, sharp AVIF within a few hundred ms on broadband.
- No image download for off-screen content until near viewport.
