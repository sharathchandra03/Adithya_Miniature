# SEO Migration

## Problems in the old site
- Every page: identical title "Aditya Miniature and Models".
- Every page: leftover template meta description ("Bernd is a minimal portfolio…").
- Product H1s all read "Product Catogories" (typo).
- Contact page: empty title & description.
- Broken/placeholder anchors (`#`, `#0`).

## New metadata strategy
Per-route titles + descriptions via Next Metadata API, canonical URLs, Open Graph + Twitter cards, `lang="en-IN"`.

| Route | Title | Description |
|---|---|---|
| `/` | Aditya Miniatures & Models — Handcrafted Model Railways, Bangalore | Pioneers of miniature model railroading in India for 23+ years. Locomotives, wagons, coaches, tracks across N, HO, G & Z scales, plus custom layouts and the Waiter-Less Food Delivery Train System. |
| `/collection` | The Collection — Model Trains & Layouts | Explore our catalogue of N, HO, G and Z scale locomotives, wagons, coaches, tracks, landscaping miniatures and accessories. |
| `/collection/n` `/ho` `/g` `/z` | {Scale}-Scale Models | Scale-specific description. |
| `/solutions` | Solutions — Waiter-Less Delivery & Ride-able Trains | Our signature real-world train systems for restaurants, resorts and public venues. |
| `/about` | About — 23 Years of Miniature Craft | The story of Aditya Miniatures and Models, Bangalore. |
| `/contact` | Contact Aditya Miniatures, Bangalore | Visit, call +91 96110 77015, or message us on WhatsApp. |

## Structured data (JSON-LD)
- Site-wide: `LocalBusiness` (name, address Mallesh palya Bangalore 560075, telephone +91 96110 77015, email, geo, sameAs socials).
- Collection/product pages: `ItemList` / `Product` (name, image, category). No fabricated price/rating.
- Breadcrumbs: `BreadcrumbList`.

## Redirect map (301) — old .html → new
Preserving equity from the flat structure. Configured in `next.config` `redirects()`.

| Old | New |
|---|---|
| `/index.html`, `/index-2.html` | `/` |
| `/n-scale-locomotives.html`, `/n-scale-wagons.html`, `/n-scale-coaches.html`, `/n-scale-tracks.html` | `/collection/n` |
| `/ho-scale-locomotives.html`, `/ho-scale-wagons.html`, `/ho-scale-coaches.html`, `/ho-scale-tracks.html` | `/collection/ho` |
| `/g-scale-locomotives.html`, `/g-scale-wagons.html`, `/g-scale-coaches.html`, `/g-scale-tracks.html` | `/collection/g` |
| `/z-scale-locomotives.html`, `/z-scale-wagons.html`, `/z-scale-coaches.html`, `/z-scale-tracks.html` | `/collection/z` |
| `/landscaping-miniatures.html` | `/collection?category=landscaping` |
| `/accessories.html` | `/collection?category=accessories` |
| `/solutions.html` | `/solutions` |
| `/contact.html` | `/contact` |

## Technical SEO
- `sitemap.xml` (all new routes), `robots.txt` allowing all + sitemap ref.
- Semantic headings (one H1/page), descriptive alt text on all product images.
- Internal linking: nav + footer + in-content cross links.
- Image optimization via next/image; responsive sizes.
