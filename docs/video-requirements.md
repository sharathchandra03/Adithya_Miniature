# Video Requirements

## Assessment
The original **Solutions** page referenced "Project Videos" (empty placeholder links) — the client clearly has/wants video of the Waiter-Less train and ride-able trains in action. Video would materially improve the Solutions and Hero sections because these products are defined by *motion* (a train delivering food; people riding). However, **no video files exist in the source**, so we architect for optional insertion with graceful poster fallbacks and do not block the build.

Architecture: each recommended video slot renders a `<video>` with `poster`, `muted loop playsInline`, `preload="none"`, wrapped so that if the source file is absent it shows the poster image (an existing photo). Dropping an MP4/WebM into `/public/videos/` with the documented filename activates it — no rewrite.

---

## VIDEO 01 — Hero ambient loop (optional enhancement)
- Purpose: Add cinematic life behind/near the hero headline (subtle, secondary to the 3D scene).
- Location: Home hero, optional background layer or inset plate.
- Duration: 8–12s seamless loop
- Aspect ratio: 16:9 (desktop), 9:16 crop for mobile
- Resolution: 1920×1080 (H.264 + WebM/VP9), target < 4 MB
- Shot concept: Extreme macro dolly along a finished miniature layout — a locomotive gliding past tiny scenery.
- Camera: Slow lateral dolly, shallow depth of field.
- Lighting: Warm key + soft rim, golden-hour feel matching brass palette.
- Motion: Continuous gentle glide; no cuts.
- Environment: Detailed miniature landscape (existing layout).
- Visual style: Warm, filmic, slight grain.
- Loop behavior: Seamless (first frame = last frame).
- Desktop behavior: Autoplay muted loop, low opacity behind grain.
- Mobile fallback: Poster image (`/assets/images/home-img/slide/1.png`), no autoplay.
- Compression: two-pass, faststart, poster required.
- File: `/public/videos/hero-loop.mp4` (+ `.webm`)

VIDEO GENERATION PROMPT:
"Cinematic extreme macro tracking shot gliding alongside a highly detailed HO-scale model railway diorama, a brass-and-black miniature electric locomotive slowly passing tiny trees, station and figures, warm golden-hour lighting, shallow depth of field, soft film grain, photorealistic, seamless loop, no text, no people, 8 seconds."

---

## VIDEO 02 — Waiter-Less Food Delivery Train (signature)
- Purpose: Demonstrate the flagship innovation actually delivering food.
- Location: Solutions page, first feature.
- Duration: 10–15s
- Aspect ratio: 16:9
- Resolution: 1920×1080, target < 6 MB
- Shot concept: A miniature train carrying plated food along a restaurant table track, stopping at a diner.
- Camera: Locked/slight push-in at table height.
- Lighting: Warm restaurant ambiance.
- Motion: Train enters, delivers, departs.
- Environment: Upscale dining table with track.
- Visual style: Inviting, premium hospitality.
- Loop behavior: Non-looping narrative; poster on end.
- Desktop behavior: Click-to-play (muted autoplay optional).
- Mobile fallback: Poster + play button.
- Compression: faststart, poster required.
- File: `/public/videos/waiterless-train.mp4`

VIDEO GENERATION PROMPT:
"A small elegant miniature delivery train carrying a plate of food travels along a polished track set into a fine-dining restaurant table, warm ambient lighting, stops beside a place setting, premium hospitality mood, photorealistic, shallow depth of field, 12 seconds, no on-screen text."

---

## VIDEO 03 — Ride-able toy train (experiential)
- Purpose: Show the ride-able trains at a venue/resort.
- Location: Solutions page, second feature.
- Duration: 10–15s
- Aspect ratio: 16:9
- Resolution: 1920×1080, target < 6 MB
- Shot concept: A ride-able miniature train carrying passengers along a garden/resort track.
- Camera: Tracking alongside, then wide.
- Lighting: Bright daylight, cheerful.
- Motion: Train in motion with riders.
- Environment: Resort/park greenery.
- Visual style: Joyful, family-friendly, premium leisure.
- Loop behavior: Non-looping; poster on end.
- Desktop/Mobile: Click-to-play + poster fallback.
- File: `/public/videos/rideable-train.mp4`

VIDEO GENERATION PROMPT:
"A ride-able miniature passenger train gently carries smiling families along a curved track through a lush resort garden, bright natural daylight, cheerful premium leisure atmosphere, cinematic tracking shot, photorealistic, 12 seconds, no on-screen text."

---

Poster fallbacks use existing photography so the site is complete and cinematic even with zero videos supplied.
