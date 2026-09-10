# Site Architecture

## Stack decision
- **Next.js 14 (App Router, TypeScript)** — routing, metadata API, image optimization, static export capability.
- **Tailwind CSS** — token-driven design system, no arbitrary-value sprawl.
- **GSAP + ScrollTrigger** (`@gsap/react` useGSAP) — scroll storytelling, pinned sections, reveals.
- **Lenis** — smooth inertial scrolling, synced with ScrollTrigger.
- **React Three Fiber + drei** — ONE flagship 3D hero (procedural scene, no heavy model downloads), lazy-loaded and gated behind capability + reduced-motion checks.

Rationale: The client's value is authentic photography + heritage story. We avoid heavy GLB downloads (none exist in source) and instead build a lightweight procedural 3D hero. Everything else is image + GSAP driven, keeping the bundle lean and mobile-friendly.

## New Sitemap
```
/                     Home (flagship narrative)
/collection           Catalogue overview (all scales + categories)
/collection/[scale]   Scale landing (n | ho | g | z) — filtered products
/solutions            Signature solutions (Waiter-Less train, ride-able trains, custom layouts)
/about                Story / 23 years / craft
/contact              Contact + map + WhatsApp + form
```

Product categories (Locomotives, Wagons, Coaches, Tracks, Landscaping, Accessories) are presented as filterable sections within the collection rather than 24 separate thin pages. This consolidates the flat, mostly-empty old structure into strong pages while preserving all real imagery.

## Component architecture
```
app/
  layout.tsx            root: fonts, metadata, SmoothScroll, Nav, Footer
  page.tsx              home
  collection/page.tsx
  collection/[scale]/page.tsx
  solutions/page.tsx
  about/page.tsx
  contact/page.tsx
  sitemap.ts, robots.ts
components/
  layout/ Nav, Footer, SmoothScroll
  primitives/ Reveal, Magnetic, SplitText, Marquee, Eyebrow, Button
  three/ HeroScene (lazy), TrackModel, SceneFallback
  sections/ Hero, StoryIntro, SolutionsFeature, ScaleShowcase, ProductMarquee, Stats, CTA
  catalog/ ProductCard, ScaleGrid, CategoryFilter
lib/
  products.ts           typed catalogue derived from real asset filenames
  motion.ts             shared easings/durations
  useReducedMotion.ts
data/
  redirects (in next.config)
```

## Data model
`lib/products.ts` maps the real files under `/public/assets/...` into typed `Product` and `Scale`/`Category` records. No fabricated specs — products are titled generically by scale+category+index, with the one known real product (Bachmann GG1) given its sourced spec.

## Rendering
Server components by default; client components only where interactivity/animation requires (`"use client"`). 3D and GSAP are client-only and never run during SSR.
