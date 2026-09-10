# Design Direction — "Engineered Craft"

## Aesthetic thesis
**Editorial Luxury × Precision Engineering.** The brand is a 23-year-old craft workshop that builds tiny, exact machines. The design should feel like a heritage engineering monograph: archival paper, ink, technical drafting lines, brass detailing, and cinematic macro photography of the real models. Restrained, tactile, confident — the opposite of a generic SaaS gradient site.

DFII estimate: Impact 4 + Fit 5 + Feasibility 4 + Performance 3 − ConsistencyRisk 1 = **15**. Execute fully.

## Differentiation anchor
Blueprint/drafting motifs (hairline grids, dimension ticks, a moving "track line" that threads the whole page) + warm brass accent + oversized editorial serif display. If screenshotted with the logo removed, the drafting-grid + brass + serif combination and the continuous rail-line motif identify it.

## Color story
- Ink (near-black warm): `#14110E`
- Paper (warm off-white): `#F4EFE6`
- Brass / signal accent: `#C8962C` (lighter highlight `#E7BE6A`)
- Rail steel neutral: `#6B675F`
- Deep espresso surface: `#221D17`
One dominant tone (ink/paper depending on section), one accent (brass), one neutral (steel). Not evenly balanced.

## Typography
- Display: **Fraunces** (variable optical serif) — editorial, characterful, heritage.
- Body/UI: **Space Grotesk** — technical grotesque, pairs the "engineering" side.
- Mono accents (dimension labels, eyebrows): **Space Mono** or Space Grotesk tracked-out.
Avoid Inter/Roboto/Arial. Use type structurally: huge display scale, tracked-out mono micro-labels.

## Spacing & grid
- Section vertical rhythm: `clamp(6rem, 12vw, 12rem)`.
- 12-col grid, generous gutters; deliberate asymmetry and overlap.
- Container max ~1320px; full-bleed cinematic sections allowed.

## Surfaces / depth
- Nested "double-bezel" cards for featured product plates (paper plate inside steel tray).
- Soft, diffused, warm shadows — never harsh black.
- Film-grain + subtle paper-noise overlay (fixed, pointer-events-none).
- Hairline drafting borders (`1px` at low opacity of ink/brass), corner ticks.

## Motion philosophy
Purposeful and sparse. One strong entrance per section, a continuous rail-line SVG that draws on scroll, magnetic buttons, mask/clip text reveals, parallax on product imagery. Custom cubic-bezier `(0.16, 1, 0.3, 1)`. Respect `prefers-reduced-motion`.

## Iconography
Ultra-light line icons (custom SVG / Phosphor-light style). No heavy filled icon sets.

## Imagery treatment
Authentic product photos on paper plates with drafting frames; duotone/warm grade option for backgrounds; macro crops for hero moments. Never stock filler.
