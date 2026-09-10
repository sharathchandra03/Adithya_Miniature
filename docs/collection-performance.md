# Collection Performance

## Goal
Eliminate the ~10s wait when opening a collection detail. Target: the modal opens **immediately** and shows a real visual instantly, then refines.

## Card grid
- Each card uses `SmartImage` at **card size** (browser picks ~320–640px AVIF via `sizes`). Cards never load full-resolution source images.
- First 3 cards are `priority="critical"`; the rest lazy-load as they approach the viewport.
- Layout is CLS-free (fixed `aspect-[3/2]` plate).

## Intent-based preloading (`lib/preload.ts`)
The detail image is warmed **before** the click, so it's usually already cached when the modal opens:
1. **On card intent** — `mouseenter` / `focus` / `touchstart` on a card preloads its ~960px detail variant (`preloadDetail`).
2. **On idle** — after the grid settles, `preloadMany` warms the **first 8** likely-clicked detail images via `requestIdleCallback` (never the whole set).
3. **On open** — the modal preloads the **previous & next** gallery neighbours, so arrow-key / button stepping is instant too.

All preloads use `new Image()` with `fetchPriority="low"` (never competes with visible content) and a dedupe `Set` (no duplicate requests).

## Modal open sequence
```
click → modal UI opens instantly (blur LQIP shows immediately)
      → detail AVIF (already warmed) paints in ~instantly
      → onError → graceful fallback to raw source
```
Because the image is `priority="critical"` and typically pre-warmed, there is no blank frame. Even cold (no preload hit), it's a small static AVIF, not a runtime transcode.

## Gallery navigation
- Prev/next buttons + `←`/`→` keys cycle through the **currently filtered** list.
- Neighbours are preloaded whenever the selection changes.

## Controlled, not wasteful
- We never eager-download 165 images. Preloading is capped (8 idle + hovered + 2 neighbours) and low-priority.
- Filtering re-scopes which images are preloaded.
