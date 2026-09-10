# Visual Requirements

## Assessment
The existing ~164 authentic product photos + 3 hero slides + 1 about image are **sufficient** to build a complete premium site. We do NOT generate dozens of filler images. Only a small number of optional brand/atmosphere visuals are recommended; all have working fallbacks from existing assets so nothing blocks the build.

## Existing assets we will use (curated, not exhaustive)
- Hero slides: `home-img/slide/1-3.png`
- About: `home-img/about.jpg`
- Product photography by scale/category: `n-scale/`, `ho-scale/`, `g-scale/`, `wagons/`, `coaches/`, `tracks/`, `accessories/`, `landscaping-miniatures/`
- Category thumbnails: `1-5.png`, `wagons1.png`, `coaches1.png`, `tracks1.png`

## Optional recommended visuals (nice-to-have, non-blocking)
1. **OG / social share image** — 1200×630, brand lockup on ink with brass line + a hero product macro. Fallback: generated at build via a static composed image using `home-img/slide/1.png`. File: `/public/og.jpg`.
2. **Brand macro hero still** — a high-res macro of a single locomotive on track for the hero poster. Fallback: `home-img/slide/1.png`.
   Prompt: "Extreme macro photograph of a brass and black miniature electric locomotive on steel track, warm golden rim light, deep dark background, shallow depth of field, editorial product photography."
3. **Texture: warm paper grain** — implemented in CSS (SVG feTurbulence noise), no asset needed.

## Not needed
No stock lifestyle imagery, no invented team photos, no fabricated award badges.
