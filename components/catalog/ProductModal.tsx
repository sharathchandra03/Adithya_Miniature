'use client';

import { useEffect, useRef } from 'react';
import type { Product } from '@/lib/products';
import { SCALES, CATEGORIES, BRAND } from '@/lib/products';
import SmartImage from '@/components/media/SmartImage';
import { preloadDetail } from '@/lib/preload';

interface Neighbors {
  prev?: string;
  next?: string;
}

export default function ProductModal({
  product,
  onClose,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
  neighbors,
  position,
  total,
}: {
  product: Product | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  neighbors?: Neighbors;
  position?: number;
  total?: number;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape / arrows + body scroll lock + focus management
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft' && hasPrev) onPrev?.();
      else if (e.key === 'ArrowRight' && hasNext) onNext?.();
    };
    document.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    const t = window.setTimeout(() => closeRef.current?.focus(), 60);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
      window.clearTimeout(t);
    };
  }, [product, onClose, onPrev, onNext, hasPrev, hasNext]);

  // Preload neighbours so gallery stepping is instant too.
  useEffect(() => {
    if (!product) return;
    if (neighbors?.prev) preloadDetail(neighbors.prev, 960);
    if (neighbors?.next) preloadDetail(neighbors.next, 960);
  }, [product, neighbors]);

  const scale = product?.scale ? SCALES.find((s) => s.id === product.scale) : null;
  const category = product ? CATEGORIES.find((c) => c.id === product.category) : null;

  // Stable collection identifier (feels like an exhibition catalogue number).
  const catNo = product ? `AMM-${product.id.split('-').slice(-2).join('').toUpperCase()}` : '';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={product ? product.title : 'Product details'}
      className={`fixed inset-0 z-[70] flex items-center justify-center p-3 transition-opacity duration-300 sm:p-8 ${
        product ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close details"
        onClick={onClose}
        className="absolute inset-0 bg-ink/80 backdrop-blur-md"
        tabIndex={product ? 0 : -1}
      />

      {/* panel */}
      <div
        className={`relative z-10 flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-[1.5rem] bg-paper shadow-plate ring-1 ring-ink/10 transition-all duration-500 ease-expo md:flex-row ${
          product ? 'translate-y-0 scale-100' : 'translate-y-6 scale-[0.97]'
        }`}
      >
        {/* ============ IMAGE STAGE + DISPLAY FRAME ============ */}
        <div className="relative flex items-center justify-center overflow-hidden bg-[radial-gradient(120%_120%_at_50%_20%,#F4EFE6_0%,#E4DAC6_100%)] px-5 pb-20 pt-5 sm:px-8 sm:pb-24 sm:pt-8 md:w-[58%]">
          {/* faint paper grain over the stage */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-multiply draft-grid" aria-hidden="true" />

          {/* the display frame: outer tray -> matte -> image */}
          <figure className="group/frame relative w-full max-w-xl">
            {/* outer machined tray */}
            <div className="rounded-[1.15rem] bg-gradient-to-b from-ink/[0.06] to-ink/[0.12] p-[3px] shadow-[0_20px_50px_-20px_rgba(20,17,14,0.5)] ring-1 ring-ink/15">
              {/* brass hairline */}
              <div className="rounded-[1rem] bg-gradient-to-b from-brass/40 via-brass/10 to-brass/30 p-px">
                {/* matte board (breathing room around the photo) */}
                <div className="relative rounded-[0.95rem] bg-paper p-3 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7)] sm:p-4">
                  {/* the photograph, inset with soft depth */}
                  <div className="relative overflow-hidden rounded-[0.6rem] shadow-[inset_0_0_0_1px_rgba(20,17,14,0.08),0_10px_30px_-15px_rgba(20,17,14,0.45)]">
                    {product && (
                      <SmartImage
                        key={product.id}
                        src={product.image}
                        alt={product.alt}
                        sizes="(max-width: 768px) 88vw, 45vw"
                        fit="cover"
                        priority="critical"
                        reserveRatio
                        className="w-full transition-transform duration-[900ms] ease-expo group-hover/frame:scale-[1.03]"
                      />
                    )}
                    {/* precision corner markers */}
                    <span className="pointer-events-none absolute left-2 top-2 h-3.5 w-3.5 border-l border-t border-brass/60" aria-hidden="true" />
                    <span className="pointer-events-none absolute right-2 top-2 h-3.5 w-3.5 border-r border-t border-brass/60" aria-hidden="true" />
                    <span className="pointer-events-none absolute bottom-2 left-2 h-3.5 w-3.5 border-b border-l border-brass/60" aria-hidden="true" />
                    <span className="pointer-events-none absolute bottom-2 right-2 h-3.5 w-3.5 border-b border-r border-brass/60" aria-hidden="true" />
                  </div>
                  {/* engraved plate caption */}
                  <figcaption className="mt-3 flex items-center justify-between px-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">{catNo}</span>
                    {scale && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                        Scale {scale.ratio}
                      </span>
                    )}
                  </figcaption>
                </div>
              </div>
            </div>

          </figure>

          {/* gallery control bar — a single cohesive pill, not floating arrows */}
          {(hasPrev || hasNext) && (
            <div className="absolute inset-x-0 bottom-4 flex justify-center sm:bottom-6">
              <div className="flex items-center gap-1 rounded-full border border-ink/10 bg-paper/85 p-1 shadow-soft backdrop-blur">
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Previous piece"
                  className="group flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M10 3.5L5.5 8l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {position != null && total != null && (
                  <span className="min-w-[3.5rem] text-center font-mono text-[11px] tabular-nums tracking-[0.1em] text-ink/60">
                    {String(position).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                )}
                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Next piece"
                  className="group flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M6 3.5L10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ============ DETAILS ============ */}
        <div className="flex flex-1 flex-col overflow-y-auto p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
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

        {/* close button */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-ink/90 text-paper backdrop-blur transition-transform duration-300 hover:scale-105"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
