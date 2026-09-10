# Hero Video Requirements (optional enhancement)

## Recommendation
The composited image hero is strong, fast, and complete on its own. A short cinematic loop **behind** the hero would add life, but it is **optional** and must never block first paint. The architecture already supports it: the hero backdrop layer can be upgraded to a `<video>` with the existing AVIF as its poster, with graceful fallback.

If no video is supplied, the current image hero remains the intended experience.

## HERO VIDEO 01 — ambient miniature-world loop
- **Purpose:** Subtle life behind the headline — a train gliding through the miniature layout.
- **Location:** Homepage hero, backdrop layer (behind the grade + copy).
- **Duration:** 8–12s, seamless loop (first frame = last frame).
- **Resolution:** 1920×1080 primary; also export a 720×1280 mobile crop.
- **Aspect ratio:** 16:9 desktop; 9:16 safe-crop for mobile.
- **Camera:** Slow lateral dolly / gentle push; no cuts.
- **Subject:** A locomotive gliding past miniature scenery on the existing layout.
- **Lighting:** Warm, golden, matching the brass palette; soft rim light.
- **Environment:** The detailed model railway diorama (matches `slide/2` / `slide/1`).
- **Animation/Motion:** Continuous, calm; the train is the only strong motion.
- **Loop behavior:** Seamless; muted; autoplay on desktop only.
- **Mobile strategy:** Do **not** autoplay video on mobile — show the poster (current AVIF backdrop). Optionally play on explicit tap.
- **Poster image:** `home-img/slide/2.jpg` (already the LCP image) — loads first, video fades in when ready.
- **Compression:** H.264 MP4 (baseline broad support) + VP9/AV1 WebM; two-pass; `faststart`.
- **File size target:** < 3.5 MB desktop loop; < 1.5 MB mobile crop.
- **Files:** `/public/videos/hero-loop.mp4` (+ `.webm`), poster reuses the hero AVIF.

### Production-ready AI generation prompt
"Cinematic slow lateral tracking shot gliding alongside a highly detailed HO-scale model railway diorama: a brass-and-black miniature locomotive pulling wagons past tiny trees, a small town, and hills. Warm golden-hour lighting, shallow depth of field, gentle film grain, photorealistic, seamless 10-second loop, no text, no people, calm and premium."

## Integration note
When a file exists at `/public/videos/hero-loop.mp4`, upgrade `Hero.tsx` LAYER 1 to render a muted, looping, `playsInline`, `preload="none"` `<video poster={heroAvif}>` on desktop (and reduced-motion → poster only). No other changes needed; the grade, light sweep, foreground, and copy layers stay as-is.
