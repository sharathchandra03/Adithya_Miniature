'use client';

import { useMemo, useState } from 'react';
import type { Product, CategoryId, ScaleId } from '@/lib/products';
import { CATEGORIES, SCALES } from '@/lib/products';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

/**
 * Filterable catalogue grid. Filters are client-side over the already-loaded
 * typed product list. Works with keyboard; buttons are real <button>s.
 */
export default function CatalogGrid({
  products,
  showScaleFilter = true,
}: {
  products: Product[];
  showScaleFilter?: boolean;
}) {
  const [category, setCategory] = useState<CategoryId | 'all'>('all');
  const [scale, setScale] = useState<ScaleId | 'all'>('all');
  const [selected, setSelected] = useState<Product | null>(null);

  const availableCategories = useMemo(
    () => CATEGORIES.filter((c) => products.some((p) => p.category === c.id)),
    [products],
  );
  const availableScales = useMemo(
    () => SCALES.filter((s) => products.some((p) => p.scale === s.id)),
    [products],
  );

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (category === 'all' || p.category === category) &&
          (scale === 'all' || p.scale === scale),
      ),
    [products, category, scale],
  );

  return (
    <div>
      <div className="sticky top-20 z-20 -mx-1 mb-10 flex flex-col gap-4 rounded-2xl border border-ink/10 bg-paper/85 p-4 backdrop-blur-xl">
        <FilterRow
          label="Type"
          value={category}
          onChange={(v) => setCategory(v as CategoryId | 'all')}
          options={[{ id: 'all', name: 'All' }, ...availableCategories.map((c) => ({ id: c.id, name: c.name }))]}
        />
        {showScaleFilter && availableScales.length > 1 && (
          <FilterRow
            label="Scale"
            value={scale}
            onChange={(v) => setScale(v as ScaleId | 'all')}
            options={[{ id: 'all', name: 'All' }, ...availableScales.map((s) => ({ id: s.id, name: s.short }))]}
          />
        )}
      </div>

      <p className="mb-6 font-mono text-xs uppercase tracking-[0.16em] text-ink/45">
        {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
      </p>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-ink/50">No pieces match this filter yet.</p>
      ) : (
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 3} onOpen={setSelected} />
          ))}
        </div>
      )}

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function FilterRow({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { id: string; name: string }[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/40">{label}</span>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          aria-pressed={value === o.id}
          className={`rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-300 ${
            value === o.id
              ? 'bg-ink text-paper'
              : 'border border-ink/15 text-ink/60 hover:border-ink/40'
          }`}
        >
          {o.name}
        </button>
      ))}
    </div>
  );
}
