'use client';

import type { Product } from '@/lib/products';
import { SCALES } from '@/lib/products';
import SmartImage from '@/components/media/SmartImage';
import { preloadDetail } from '@/lib/preload';

export default function ProductCard({
  product,
  priority = false,
  onOpen,
}: {
  product: Product;
  priority?: boolean;
  onOpen: (product: Product) => void;
}) {
  const scale = product.scale ? SCALES.find((s) => s.id === product.scale) : null;

  // Preload the detail-sized image on intent (hover / focus / touchstart)
  // so the modal appears instantly on click.
  const warm = () => preloadDetail(product.image, 960);

  return (
    <article className="group">
      <button
        type="button"
        onClick={() => onOpen(product)}
        onMouseEnter={warm}
        onFocus={warm}
        onTouchStart={warm}
        aria-label={`View details for ${product.title}`}
        className="block w-full text-left"
      >
        <div className="plate transition-transform duration-500 ease-expo group-hover:-translate-y-1">
          <div className="plate-core relative aspect-[3/2]">
            <SmartImage
              src={product.image}
              alt={product.alt}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
              priority={priority ? 'critical' : 'lazy'}
              className="absolute inset-0 h-full w-full"
              imgClassName="transition-transform duration-700 ease-expo group-hover:scale-[1.05]"
            />
            {/* corner ticks */}
            <span className="pointer-events-none absolute left-3 top-3 z-10 h-3 w-3 border-l border-t border-brass/70" aria-hidden="true" />
            <span className="pointer-events-none absolute bottom-3 right-3 z-10 h-3 w-3 border-b border-r border-brass/70" aria-hidden="true" />

            {/* hover reveal: "view" affordance */}
            <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-between bg-gradient-to-t from-ink/50 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="rounded-full bg-paper/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
                View details
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-4 px-1">
          <h3 className="font-display text-lg leading-tight transition-colors duration-300 group-hover:text-brass">
            {product.title}
          </h3>
          {scale && (
            <span className="shrink-0 rounded-full border border-ink/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60">
              {scale.short} · {scale.ratio}
            </span>
          )}
        </div>
      </button>
    </article>
  );
}
