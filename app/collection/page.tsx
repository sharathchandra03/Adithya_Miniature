import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import CatalogGrid from '@/components/catalog/CatalogGrid';
import { PRODUCTS, SCALES, CATALOGUE_COUNT, BRAND } from '@/lib/products';

export const metadata: Metadata = {
  title: 'The Collection — Model Trains & Layouts',
  description:
    'Explore our catalogue of N, HO, G and Z scale locomotives, wagons, coaches, tracks, landscaping miniatures and accessories — all handcrafted by Aditya Miniatures, Bangalore.',
  alternates: { canonical: '/collection' },
};

export default function CollectionPage() {
  return (
    <>
      <PageHeader
        eyebrow={`${CATALOGUE_COUNT} handcrafted pieces`}
        title="The Collection"
        intro="Browse the full catalogue — filter by type and scale to find locomotives, rolling stock, tracks, scenery and the finishing details for your layout."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Collection' }]}
      />

      {/* scale quick-links */}
      <section className="bg-paper-soft py-10">
        <div className="container-x flex flex-wrap gap-3">
          {SCALES.map((s) => (
            <Link
              key={s.id}
              href={`/collection/${s.id}`}
              className="group flex items-center gap-3 rounded-full border border-ink/15 px-5 py-2.5 transition-colors hover:border-ink/40"
            >
              <span className="font-display text-lg">{s.name}</span>
              <span className="font-mono text-[11px] text-ink/45">{s.ratio}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-paper py-section pt-16">
        <div className="container-x">
          <CatalogGrid products={PRODUCTS} />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'The Collection — Aditya Miniatures and Models',
            url: `${BRAND.siteUrl}/collection`,
            about: 'Handcrafted model trains and railway layouts',
          }),
        }}
      />
    </>
  );
}
