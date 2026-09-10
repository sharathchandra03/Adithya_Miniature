import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/primitives/Reveal';
import { CATEGORIES, PRODUCTS } from '@/lib/products';

// Pick one representative image per category from real assets.
const COVER: Record<string, string> = {
  locomotives: '/assets/images/ho-scale/1.png',
  wagons: '/assets/images/wagons/ho-scale/2.png',
  coaches: '/assets/images/coaches/ho-scale/5.png',
  tracks: '/assets/images/tracks/g-scale/3.jpg',
  landscaping: '/assets/images/landscaping-miniatures/2.jpg',
  accessories: '/assets/images/accessories/4.jpg',
};

export default function CategoryStrip() {
  return (
    <section className="relative bg-paper py-section">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div>
              <p className="eyebrow">The catalogue</p>
              <h2 className="mt-5 max-w-xl font-display text-display-md">
                Every part of the railway, made by hand.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Link href="/collection" className="link-underline font-mono text-xs uppercase tracking-[0.18em] text-brass">
              Browse all {PRODUCTS.length} pieces
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => {
            const count = PRODUCTS.filter((p) => p.category === c.id).length;
            return (
              <Reveal key={c.id} delay={i * 60}>
                <Link href="/collection" className="group block">
                  <div className="plate transition-transform duration-500 ease-expo group-hover:-translate-y-1">
                    <div className="plate-core relative aspect-[16/10]">
                      <Image
                        src={COVER[c.id]}
                        alt={`${c.name} by Aditya Miniatures`}
                        fill
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                        className="object-cover transition-transform duration-700 ease-expo group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <h3 className="font-display text-2xl text-paper">{c.name}</h3>
                        <span className="font-mono text-[11px] text-paper/70">{count}</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 px-1 text-sm text-ink/60">{c.blurb}</p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
