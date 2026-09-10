'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SCALES } from '@/lib/products';
import Reveal from '@/components/primitives/Reveal';
import { BLUR_DATA_URL } from '@/lib/blur';

const SCALE_IMAGES: Record<string, string> = {
  n: '/assets/images/n-scale/locomotives/2.png',
  ho: '/assets/images/ho-scale/3.png',
  g: '/assets/images/g-scale/6.jpg',
  z: '/assets/images/home-img/slide/2.jpg',
};

export default function ScaleShowcase() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);

  return (
    <section ref={root} className="relative overflow-hidden bg-ink py-section text-paper">
      <div className="draft-grid-dark absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div>
              <p className="eyebrow">Four scales, one standard</p>
              <h2 className="mt-5 max-w-xl font-display text-display-md">
                Choose the world that fits your space.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Link href="/collection" className="link-underline font-mono text-xs uppercase tracking-[0.18em] text-brass">
              View full collection
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-16">
          {/* interactive index */}
          <div className="order-2 md:order-1">
            <ul>
              {SCALES.map((s, i) => (
                <li key={s.id}>
                  <Link
                    href={`/collection/${s.id}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex items-center justify-between border-t border-paper/12 py-6 last:border-b"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="font-mono text-xs text-brass">0{i + 1}</span>
                      <span
                        className={`font-display text-4xl transition-all duration-500 ease-expo md:text-5xl ${
                          active === i ? 'text-paper translate-x-1' : 'text-paper/45'
                        }`}
                      >
                        {s.name}
                      </span>
                    </div>
                    <span className="hidden font-mono text-xs text-paper/40 sm:block">{s.ratio}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-md text-paper/60">{SCALES[active].blurb}</p>
          </div>

          {/* cross-fading imagery */}
          <div className="order-1 md:order-2">
            <div className="plate-dark">
              <div className="plate-core relative aspect-[4/3]">
                {SCALES.map((s, i) => (
                  <Image
                    key={s.id}
                    src={SCALE_IMAGES[s.id]}
                    alt={`${s.name} model by Aditya Miniatures`}
                    fill
                    sizes="(max-width: 768px) 90vw, 45vw"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    quality={75}
                    className={`object-cover transition-opacity duration-700 ease-expo ${
                      active === i ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
                <span className="absolute right-4 top-4 rounded-full bg-ink/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-paper backdrop-blur">
                  {SCALES[active].ratio}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
