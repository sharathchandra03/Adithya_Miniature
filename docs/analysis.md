# Analysis — Aditya Miniatures and Models

## 1. Business
Aditya Miniatures and Models is a Bangalore-based maker of miniature and model railways. Based on the original site content, the business has been operating for **over 23 years** and positions itself as a pioneer of miniature model railroading in India.

## 2. Industry
Hobby / scale-model railroading + experiential installations. This is a niche, craft-driven industry blending collectible hobby retail with bespoke installation work.

## 3. Target Customers (inferred, not fabricated)
- Model-railway hobbyists and collectors (buy locomotives, wagons, coaches, tracks, scenery)
- Hospitality/entertainment venues wanting novelty attractions (the "Waiter Less Food Delivery Train System", ride-able toy trains for resorts and public venues)
- Institutions/enthusiasts commissioning custom layouts

## 4. Products / Services (factual, from source)
Product catalogue is organised by **scale** and **category**:
- Scales: **N, HO, G, Z**
- Categories: **Locomotives, Wagons, Coaches, Tracks**, plus **Landscaping Miniatures** and **Accessories**
- Some category/scale combinations were marked "Under Construction" on the original site (e.g. several Z-scale pages).
- One concrete product example present in source: "BACHMANN HO 65207 GG1 ELECTRIC, AMTRAK #926" with features: DCC Ready, all-new tooling die-cast frame, 12-wheel drive, twin operating metal pantographs, soft white LED directional headlights with dimming, factory-installed 8-pin DCC socket, E-Z Mate Mark II couplers, best on 22" radius curves or greater.

Signature **Solutions**:
- **Waiter Less Food Delivery Train System** — a miniature train that delivers food, aimed at upscale dining.
- **Ride-able toy trains** for public entertainment venues and resorts.

## 5. Existing Positioning
"Passion, expertise, innovation." Pioneers of miniature model railroading in India, 23+ years, quality products and layouts, plus novel real-world applications.

## 6. Existing Content
Thin. Homepage intro paragraph (twice, near-identical), product category grids with images, a Solutions page with project videos + images (mostly empty placeholder links), and a contact block. No blog, no real product detail copy beyond the one Bachmann example.

## 7. Existing Visual Identity
Generic third-party HTML template ("Bernd — minimal portfolio HTML5 Template"). No distinct brand identity, no defined palette, default fonts. Logo is a text wordmark "ADITYA MINIATURE".

## 8. Existing Assets
~164 authentic product photographs organised by scale/category, 3 hero slide images, 1 about image, social icons, a controller SVG. This is the strongest raw material — real, authentic product photography.

## 9. Existing Page Architecture
Flat: index, per-scale/category product pages (n/ho/g/z × locomotives/wagons/coaches/tracks), landscaping-miniatures, accessories, solutions, contact. Navigation via a "Best Sellers" mega-style dropdown.

## 10. Existing URLs
`index.html`, `n-scale-locomotives.html`, `ho-scale-wagons.html`, …, `landscaping-miniatures.html`, `accessories.html`, `solutions.html`, `contact.html`. See seo-migration.md for the redirect map.

## 11. Existing SEO Signals
Poor. Every page shares the title "Aditya Miniature and Models" and a leftover template meta description ("Bernd is a minimal portfolio…"). H1 on product pages is the generic "Product Catogories" (typo). Contact page has empty title/description. Significant SEO opportunity.

## 12. Existing Functionality
Static catalogue browsing, WhatsApp click-to-chat, mailto, social links, an embedded location map, a contact form (php). No e-commerce/cart.

## 13. Current Weaknesses
- Generic template look; no brand identity.
- Broken/placeholder links (`#`, `#0`), duplicated nav, "Under Construction" pages.
- Terrible SEO metadata; typos ("Catogories").
- No storytelling; product photos presented flatly.
- No mobile-considered design language; dated interactions.
- The unique differentiators (Waiter-Less train, ride-able trains, 23 years) are buried.

## 14. Major Opportunities
- Lead with the **story**: 23 years, made in Bangalore, pioneers in India.
- Elevate the **signature Solutions** as headline experiences.
- Present the authentic product photography as a curated, cinematic catalogue.
- Fix SEO end-to-end; add structured data (LocalBusiness / Product).
- Build a memorable scroll experience with restrained 3D.

## 15. Technology Architecture (chosen)
Next.js (App Router, TypeScript) + Tailwind CSS + GSAP/ScrollTrigger + Lenis smooth scroll + React Three Fiber/drei for a single, purposeful 3D hero. Static-export friendly. Rationale in site-architecture.md.

## 16. Visual / 3D Direction
"Engineered Craft" — editorial luxury meets precision engineering. Warm archival paper tones + deep ink + a signal brass/amber accent, evoking heritage craftsmanship and railway heritage. See design-direction.md.

## Factual guardrails
Do NOT invent: awards, exact customer names, testimonials, unit sales, additional product specs beyond the Bachmann example, or founding dates beyond "over 23 years". The "23 years" claim and the two Solutions concepts are the only strong differentiators and are directly sourced.
