# Animation Strategy

## Stack
GSAP + ScrollTrigger via `@gsap/react` `useGSAP` (auto cleanup, scoped). Lenis for smooth scroll, wired into ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker`. All GSAP is client-only.

## Global system
- Easings: `expoOut = cubic-bezier(0.16,1,0.3,1)`, `power4.out`. No linear/ease-in-out defaults.
- Durations: micro 0.3s, standard 0.7s, cinematic 1.1s.
- Stagger: 0.06–0.1s for grouped elements.

## Signature motifs
1. **The Rail Line** — a continuous SVG line that "draws" (stroke-dashoffset) as you scroll the homepage, visually threading sections like a track. This is the memorable anchor.
2. **Mask/clip text reveals** — display headings rise from a clip mask with slight blur→sharp.
3. **Parallax product plates** — imagery drifts on y at different rates within pinned/entering sections.
4. **Magnetic CTAs** — pointer-follow translate + inner icon kinetic offset (contextSafe handlers).
5. **Marquee** — infinite product/keyword marquee, speed reactive to scroll velocity.

## Per-surface
- Hero: 3D scene fade-in + headline mask reveal + eyebrow stagger.
- Story: pinned-ish scroll with counter + line draw.
- Solutions: horizontal-feel feature cards with parallax imagery.
- Scale showcase: sticky index with cross-fading imagery.
- Catalogue: IntersectionObserver-based reveal (Reveal primitive) — cheap, no scroll listeners.

## Performance rules (from skills)
- Animate only `transform`/`opacity`. Never top/left/width/height.
- No `window.scroll` listeners for reveals — use IntersectionObserver / ScrollTrigger.
- `backdrop-blur` only on fixed nav/overlays.
- Grain overlay on fixed pointer-events-none layer.
- Kill/revert all GSAP + ScrollTrigger on unmount.

## Accessibility
`prefers-reduced-motion: reduce` → disable Lenis smoothing, skip scroll-scrubbed animations, render final states immediately, freeze 3D auto-rotation, reduce marquee to static. A `useReducedMotion` hook + CSS media query both enforce this.
