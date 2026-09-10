import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import CatalogGrid from '@/components/catalog/CatalogGrid';
import Reveal from '@/components/primitives/Reveal';
import {
  SCALES,
  getScale,
  productsByScale,
  scaleCategorySummary,
  BRAND,
  type ScaleId,
} from '@/lib/products';

export function generateStaticParams() {
  return SCALES.map((s) => ({ scale: s.id }));
}

export function generateMetadata({ params }: { params: { scale: string } }): Metadata {
  const scale = getScale(params.scale);
  if (!scale) return { title: 'Scale not found' };
  return {
    title: `${scale.name} Models (${scale.ratio})`,
    description: `${scale.name} locomotives, wagons, coaches and tracks handcrafted by Aditya Miniatures. ${scale.blurb}`,
    alternates: { canonical: `/collection/${scale.id}` },
  };
}

export default function ScalePage({ params }: { params: { scale: string } }) {
  const scale = getScale(params.scale);
  if (!scale) notFound();

  const scaleId = scale.id as ScaleId;
  const products = productsByScale(scaleId);
  const summary = scaleCategorySummary(scaleId);
  const isEmpty = products.length === 0;

  return (
    <>
      <PageHeader
        eyebrow={`Scale ${scale.ratio}`}
        title={scale.name}
        intro={scale.blurb}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Collection', href: '/collection' },
          { label: scale.name },
        ]}
      />

      {/* other scales nav */}
      <section className="bg-paper-soft py-8">
        <div className="container-x flex flex-wrap items-center gap-2">
          <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/40">Scales</span>
          {SCALES.map((s) => (
            <Link
              key={s.id}
              href={`/collection/${s.id}`}
              aria-current={s.id === scale.id ? 'page' : undefined}
              className={`rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                s.id === scale.id ? 'bg-ink text-paper' : 'border border-ink/15 text-ink/60 hover:border-ink/40'
              }`}
            >
              {s.short}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-paper py-section pt-14">
        <div className="container-x">
          {isEmpty ? (
            <Reveal className="mx-auto max-w-xl rounded-2xl border border-ink/10 bg-paper-soft p-12 text-center">
              <p className="eyebrow">On the bench</p>
              <h2 className="mt-4 font-display text-3xl">New {scale.name} pieces are being built.</h2>
              <p className="mt-4 text-ink/65">
                This scale is currently in production. Tell us what you&rsquo;re looking for and we&rsquo;ll let you
                know the moment it&rsquo;s ready.
              </p>
              <div className="mt-8 flex justify-center gap-3">
                <a
                  href={BRAND.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-paper transition-colors hover:bg-ink-soft"
                >
                  Enquire on WhatsApp
                </a>
                <Link
                  href="/collection"
                  className="rounded-full border border-ink/20 px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:border-ink/50"
                >
                  Browse other scales
                </Link>
              </div>
            </Reveal>
          ) : (
            <>
              <div className="mb-10 flex flex-wrap gap-x-8 gap-y-2">
                {summary.map((c) => (
                  <span key={c.id} className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/50">
                    {c.name} <span className="text-brass">{c.count}</span>
                  </span>
                ))}
              </div>
              <CatalogGrid products={products} showScaleFilter={false} />
            </>
          )}
        </div>
      </section>
    </>
  );
}
