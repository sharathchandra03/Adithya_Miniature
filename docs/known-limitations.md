# Known Limitations

Honest accounting of what is and isn't complete, so nothing is overstated.

## Content
- **Product titles are descriptive, not catalogue-exact.** The original site provided images but almost no per-product names or specs (only the one Bachmann GG1). Products are therefore titled by scale + category + index (e.g. "HO Scale Wagon No. 03"). The client can rename them in `lib/products.ts`. This is intentional — inventing model names/specs would be fabrication.
- **Z-scale has no products** in the source (pages were "Under Construction"). The Z page shows an honest "on the bench" state with an enquiry CTA rather than placeholder products.
- **Prices are not shown** — none existed in the source and the site is not e-commerce. Enquiry-driven, matching the original business model.

## Media
- **No videos are bundled.** The Solutions/Hero video slots render poster images (from authentic photography) with a "Film coming soon" affordance. Dropping MP4s into `/public/videos/` with the documented names activates them with no code change. Full specs + AI generation prompts are in `docs/video-requirements.md`.
- **OG image** is derived from an existing hero photo, resized to 1200×630. A purpose-designed brand OG image is recommended (see `docs/visual-requirements.md`) but not required.

## Contact form
- **No backend.** The form validates client-side and composes a prefilled email via `mailto:` (reliable, dependency-free). If the client wants server-side submission (e.g. to a CRM or email API), wire the `onSubmit` in `components/contact/ContactForm.tsx` to an API route or form service.

## 3D
- The hero 3D scene is a **procedural track**, not a scanned model of the client's actual products (no 3D assets existed in the source). It reinforces the brand tastefully without a multi-MB download. A real product GLB could be swapped into `TrackScene.tsx` later if the client provides one.

## Deployment
- The **Google Maps embed** uses the public `maps.google.com/maps?q=...&output=embed` iframe (no API key). For heavier map features an API key would be needed.
- `next/image` optimization requires a host that runs the Next Image Optimizer (Vercel/Node). A pure static export would need an image loader or unoptimized images.

## Accessibility
- WCAG conformance has been implemented to a strong practical standard (semantics, focus, labels, reduced motion, contrast). **Full WCAG validation still requires manual testing with assistive technologies and expert review** before any formal compliance claim.

## Testing
- No automated test suite was added (not requested, and the site is presentational). Verification was done via type-check, lint, production build, and runtime route/content checks.
