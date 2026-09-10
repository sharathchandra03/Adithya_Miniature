'use client';

import Image from 'next/image';
import type { Product } from '@/lib/products';
import { SCALES } from '@/lib/products';
import { BLUR_DATA_URL } from '@/lib/blur';

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

  return (
    <article className="group">
      <button
        type="button"
        onClick={() => onOpen(product)}
        aria-label={`View details for ${product.title}`}
        className="block w-full text-left"
      >
        <div className="plate transition-transform duration-500 ease-expo group-hover:-translate-y-1">
          <div className="plate-core relative aspect-[3/2]">
            <Image
              src={product.image}
              alt={product.alt}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
              priority={priority}
              loading={priority ? undefined : 'lazy'}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              quality={72}
              className="object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.05]"
            />
            {/* corner ticks */}
            <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-brass/70" aria-hidden="true" />
            <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-brass/70" aria-hidden="true" />

            {/* hover reveal: "view" affordance */}
            <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-ink/50 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
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
