# Hero Experience

## Concept — "A miniature world, built to run."
A cinematic, layered composition that immediately communicates the business: precision miniature railways and whole miniature worlds. It uses the client's authentic photography as raw material and creates depth + motion through compositing — **no WebGL**, so it is fast and mobile-safe.

## Why composited, not WebGL
The task is depth, movement, and a premium first impression. A layered image composition with GSAP transforms achieves this at a fraction of the cost of a 3D scene: no ~150 KB three.js bundle, no GPU scene, instant LCP from a preloaded AVIF. The previous R3F hero was removed and its dependencies uninstalled.

## Layers (back → front)
1. **Backdrop** — `home-img/slide/2.jpg`, a sweeping layout of a coal train curving through a miniature town. Slow Ken-Burns drift + scroll parallax + subtle pointer parallax. This is the LCP image (preloaded, responsive AVIF).
2. **Cinematic grade** — radial + linear vignette darkening the edges for depth and text legibility.
3. **Light sweep** — a soft brass gradient that periodically passes across the scene (like a light moving over a diorama).
4. **Foreground macro** — `home-img/slide/1.png` (green Maine Central log wagon, shallow DoF) framed at the lower-right on desktop, parallaxing opposite to the backdrop for real depth. Hidden on small screens to reduce load.
5. **Copy** — editorial mask-reveal headline (`A miniature world, / built to run.`), eyebrow, subhead, CTAs, and a factual stat row (23+, N·HO·G·Z, Bangalore). Lifts and fades on scroll.

## Motion
GSAP timeline entrance (backdrop scale-in, foreground slide-in, staggered text mask reveal) + three continuous loops (drift, light sweep) + scroll-scrubbed parallax. Pointer parallax only on fine pointers (desktop), with listener cleanup on unmount.

## Performance
- LCP backdrop is preloaded (`<link rel=preload as=image imagesrcset>` in `app/page.tsx`) and served as a small responsive AVIF.
- Only `transform`/`opacity` are animated (GPU-friendly).
- Foreground macro layer is desktop-only.

## Accessibility / fallback
- `prefers-reduced-motion`: the entire GSAP setup is skipped; all layers render in their final, legible state with no motion.
- No-JS: content is visible (handled by the global `.no-js` reveal safety).
- Text sits over a graded veil for AA contrast.

## Responsive
- Mobile: single backdrop + grade + copy; foreground macro and pointer parallax disabled. Copy bottom-aligned; type scales via `clamp()`.
- Desktop: full multi-layer parallax composition.
