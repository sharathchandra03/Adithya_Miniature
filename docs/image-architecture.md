# Image Architecture

## Summary
Images are **pre-optimized at build time** and served as **static, immutable-cached AVIF/WebP variants** through a `<picture srcset>` element. The Next.js runtime image optimizer is **disabled** (`images.unoptimized: true`), so there is **zero runtime transcode** — this is the architectural fix for the previous multi-second image waits.

## Pipeline (`scripts/build-images.mjs`, runs on `prebuild`)
1. Recursively scans `public/assets/images` for `.png/.jpg/.jpeg` sources.
2. For each source, generates responsive derivatives at widths `[320, 480, 640, 960, 1280, 1600]` (never upscales; adds native width if ≤1600) in **AVIF** (quality 52) and **WebP** (quality 74) → `public/assets/opt/<flatname>-<w>.<fmt>`.
3. Generates a **20px blurred WebP LQIP** encoded as a base64 data URI (inlined in the manifest — no extra request).
4. Writes `lib/image-manifest.json` keyed by the **source path**:
   ```json
   "/assets/images/ho-scale/1.png": {
     "width": 750, "height": 500, "aspectRatio": 1.5,
     "blur": "data:image/webp;base64,...",
     "widths": [320,480,640,750],
     "avif": { "320": "/assets/opt/ho-scale__1-320.avif", ... },
     "webp": { "320": "/assets/opt/ho-scale__1-320.webp", ... },
     "fallback": "/assets/opt/ho-scale__1-750.webp"
   }
   ```
5. **Idempotent**: skips derivatives newer than their source (mtime). `npm run images:force` (or `FORCE=1`) rebuilds all.

## Serving (`components/media/SmartImage.tsx`)
- Renders `<picture>` → `<source type=image/avif srcset sizes>` → `<source type=image/webp …>` → `<img>` (WebP fallback).
- Browser picks the smallest sufficient variant for the actual display size (`sizes`).
- The manifest's `width`/`height` set intrinsic dimensions and (optionally) an `aspect-ratio` box → **no layout shift**.
- The blur LQIP is the wrapper's background, shown instantly; the sharp image fades in on decode.
- `onError` → falls back to the raw source path. Missing manifest entry → also falls back gracefully.

## Formats
- Photos (all product/scene images): AVIF + WebP. AVIF is ~30–50% smaller than WebP at equal quality; WebP covers the rare browser without AVIF.
- Icons/logo: inline SVG (in components), not part of this pipeline.
- Transparency preserved (source PNGs with alpha keep alpha in AVIF/WebP).

## Caching (`next.config.mjs` `headers()`)
- `/assets/opt/*` → `Cache-Control: public, max-age=31536000, immutable` (variants are content-stable per build).
- `/assets/images/*` → `public, max-age=2592000, stale-while-revalidate=86400`.

## Deploy notes (Render/Node)
- `prebuild` runs the pipeline before `next build`, so variants are generated on every deploy. The manifest is also committed for local dev.
- Because the optimizer is off, **no server CPU is spent transcoding at request time** — ideal for limited-CPU hosts. Works identically on static or Node hosting.

## Files
- `scripts/build-images.mjs` — the pipeline
- `lib/image-manifest.json` — generated manifest (do not edit by hand)
- `lib/images.ts` — typed accessors (`getImage`, `buildSrcSet`, `pickWidth`, `preloadLinkProps`)
- `components/media/SmartImage.tsx` — the render component
- `lib/preload.ts` — intent-based detail preloading
