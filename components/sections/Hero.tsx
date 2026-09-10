'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import HeroCanvas from '@/components/three/HeroCanvas';
import Button from '@/components/primitives/Button';
import { BRAND } from '@/lib/products';

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.from('[data-hero-eyebrow]', { yPercent: 120, opacity: 0, duration: 0.8 })
        .from(
          '[data-hero-line] > span',
          { yPercent: 118, duration: 1.1, stagger: 0.08 },
          '-=0.5',
        )
        .from('[data-hero-sub]', { y: 24, opacity: 0, duration: 0.8 }, '-=0.7')
        .from('[data-hero-cta]', { y: 20, opacity: 0, duration: 0.7 }, '-=0.6')
        .from('[data-hero-meta] > *', { y: 16, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.5')
        .from('[data-hero-canvas]', { opacity: 0, duration: 1.4 }, 0);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative min-h-[100dvh] overflow-hidden bg-ink text-paper"
    >
      <div data-hero-canvas className="absolute inset-0">
        <HeroCanvas />
      </div>
      {/* readability veil */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/20 to-ink/80" />
      <div className="draft-grid-dark absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="container-x relative flex min-h-[100dvh] flex-col justify-end pb-16 pt-32 sm:justify-center sm:pb-24">
        <div className="max-w-4xl">
          <div className="overflow-hidden">
            <p data-hero-eyebrow className="eyebrow">
              Bangalore · Since over two decades
            </p>
          </div>

          <h1 data-hero-line className="mt-6 font-display text-display-xl">
            <span className="block overflow-hidden">
              <span className="block">Tiny machines,</span>
            </span>
            <span className="block overflow-hidden">
              <span className="block italic text-brass">built to run.</span>
            </span>
          </h1>

          <p data-hero-sub className="mt-8 max-w-xl text-lg leading-relaxed text-paper/75">
            Pioneers of miniature model railroading in India for {BRAND.yearsText} — handcrafted
            locomotives, wagons, coaches and complete layouts across N, HO, G and Z scales.
          </p>

          <div data-hero-cta className="mt-10 flex flex-wrap gap-3">
            <Button href="/collection" variant="light">
              Explore the collection
            </Button>
            <Button href="/solutions" variant="ghost" className="border-paper/25 text-paper hover:border-paper/60">
              Our train systems
            </Button>
          </div>

          <dl
            data-hero-meta
            className="mt-14 flex flex-wrap gap-x-12 gap-y-6 border-t border-paper/10 pt-8"
          >
            <Stat k="Years of craft" v="23+" />
            <Stat k="Working scales" v="N · HO · G · Z" />
            <Stat k="Made in" v="Bangalore, India" />
          </dl>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/50">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-brass to-transparent" />
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/45">{k}</dt>
      <dd className="mt-1 font-display text-2xl text-paper">{v}</dd>
    </div>
  );
}
