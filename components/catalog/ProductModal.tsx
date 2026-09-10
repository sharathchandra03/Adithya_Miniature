'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { Product } from '@/lib/products';
import { SCALES, CATEGORIES, BRAND } from '@/lib/products';

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape to close + lock body scroll + focus management
  useEffect(() => {
    if (!product) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    // move focus into the dialog
    const t = window.setTimeout(() => closeRef.current?.focus(), 60);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
      window.clearTimeout(t);
    };
  }, [product, onClose]);

  const scale = product?.scale ? SCALES.find((s) => s.id === product.scale) : null;
  const category = product ? CATEGORIES.find((c) => c.id === product.category) : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={product ? product.title : 'Product details'}
      className={`fixed inset-0 z-[70] flex items-center justify-center p-4 transition-opacity duration-300 sm:p-8 ${
        product ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close details"
        onClick={onClose}
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
        tabIndex={product ? 0 : -1}
      />

      {/* panel */}
      <div
        ref={panelRef}
        className={`plate relative z-10 max-h-[90dvh] w-full max-w-4xl overflow-y-auto transition-all duration-300 ease-expo ${
          product ? 'translate-y-0 scale-100' : 'translate-y-4 scale-95'
        }`}
      >
        <div className="plate-core">
          <div className="grid md:grid-cols-2">
            {/* image */}
            <div className="relative aspect-[3/2] md:aspect-auto md:min-h-[360px]">
              {product && (
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  sizes="(max-width: 768px) 90vw, 45vw"
                  className="object-cover"
                />
              )}
              <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-brass/70" aria-hidden="true" />
            </div>

            {/* details */}
            <div className="flex flex-col p-6 sm:p-8">
              <div className="flex items-center gap-2">
                {scale && (
                  <span className="rounded-full border border-ink/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60">
                    {scale.name} · {scale.ratio}
                  </span>
                )}
                {category && (
                  <span className="rounded-full border border-ink/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60">
                    {category.name}
                  </span>
                )}
              </div>

              <h2 className="mt-5 font-display text-3xl leading-tight">{product?.title}</h2>

              <p className="mt-4 text-sm leading-relaxed text-ink/70">
                {product?.featureNote ??
                  `A handcrafted ${category?.name.toLowerCase().replace(/s$/, '') ?? 'model'} from the Aditya Miniatures workshop${
                    scale ? `, built to ${scale.ratio} ${scale.name}` : ''
                  }. Enquire for availability, variants and pricing.`}
              </p>

              <div className="mt-auto pt-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">Interested in this piece?</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a
                    href={BRAND.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-ink-soft"
                  >
                    Enquire on WhatsApp
                  </a>
                  <a
                    href={`mailto:${BRAND.email}?subject=${encodeURIComponent(`Enquiry: ${product?.title ?? ''}`)}`}
                    className="rounded-full border border-ink/20 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors hover:border-ink/50"
                  >
                    Email us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* close button */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-300 hover:scale-105"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
