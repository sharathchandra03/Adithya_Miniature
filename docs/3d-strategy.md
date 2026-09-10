# 3D Strategy

## Principle
3D must earn its place. There are **no 3D model files** in the source, so we do NOT fabricate heavy GLB downloads. Instead we build **one** flagship, lightweight, procedural 3D experience that reinforces the brand (precision + railway) and degrades gracefully.

## The one 3D experience: "The Line"
A React Three Fiber scene in the hero:
- A procedurally built **miniature rail track** (extruded rails + repeating sleepers) receding into warm fog, lit cinematically (key + warm rim), on the paper/ink palette.
- Subtle camera parallax on pointer + gentle dolly on scroll (scrubbed, capped).
- Floating drafting particles (very small instanced points) for atmosphere — restrained, not a particle storm.
- Brass-toned metallic material on rails to echo the accent.

Why it supports the brand: it literally shows the craft (track-building), creates depth and memorability, and sets the "engineering monograph" tone in the first seconds — without a multi-MB asset.

## Technical guardrails
- Lazy-loaded with `next/dynamic` (`ssr:false`) and a static poster/CSS fallback (`SceneFallback`).
- Capability gate: skip WebGL scene on `prefers-reduced-motion`, on very small viewports (<640px) fall back to an animated CSS/SVG track to protect mobile GPUs, and on WebGL-unavailable.
- `dpr={[1, 1.75]}` cap, `frameloop` demand-ish (always but low cost), pause when tab hidden / offscreen.
- No orbit controls that trap scroll; pointer parallax only.

## Secondary 3D (optional, cheap)
Scale badges / section dividers may use CSS 3D transforms (perspective) rather than WebGL — no extra runtime cost.

## Fallback matrix
| Condition | Render |
|---|---|
| Desktop, motion OK, WebGL OK | Full R3F track scene |
| Reduced motion | Static poster image / frozen frame |
| Mobile (<640px) | Animated CSS/SVG rail line (no WebGL) |
| WebGL error | Static gradient + SVG track |
