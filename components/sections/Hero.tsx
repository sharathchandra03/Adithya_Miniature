'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SmartImage from '@/components/media/SmartImage';
import Button from '@/components/primitives/Button';
import { BRAND } from '@/lib/products';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BG = '/assets/images/home-img/slide/2.jpg'; // full layout — the world
const FG = '/assets/images/home-img/slide/1.png'; // macro log wagon — depth detail

/**
 * "A miniature world, built to run."
 *
 * Smoothness architecture — each transform system owns a SEPARATE element so
 * nothing fights (this was the source of the scroll shake):
 *   [data-scroll-bg]  -> scroll parallax only (yPercent)
 *   [data-drift]      -> slow ambient Ken-Burns loop only
 *   [data-pointer-bg] -> pointer parallax only (quickTo)
 * The backdrop is overscaled generously so parallax never reveals its edges.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;

      // ---- Entrance ----
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.from('[data-drift]', { scale: 1.14, duration: 2.2, ease: 'power2.out' }, 0)
        .from('[data-veil]', { opacity: 0, duration: 1.4 }, 0)
        .from('[data-fg]', { xPercent: 14, opacity: 0, duration: 1.6, ease: 'power3.out' }, 0.2)
        .from('[data-eyebrow]', { yPercent: 120, opacity: 0, duration: 0.8 }, 0.4)
        .from('[data-line] .line-inner', { yPercent: 120, duration: 1.1, stagger: 0.1 }, 0.5)
        .from('[data-sub]', { y: 24, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('[data-cta]', { y: 20, opacity: 0, duration: 0.7 }, '-=0.6')
        .from('[data-meta] > *', { y: 16, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.5');

      // ---- Ambient drift (own element) ----
      gsap.to('[data-drift]', {
        scale: 1.06,
        duration: 16,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // ---- Light sweep ----
      gsap.fromTo(
        '[data-sweep]',
        { xPercent: -140 },
        { xPercent: 160, duration: 8, ease: 'sine.inOut', repeat: -1, repeatDelay: 3.5 },
      );

      // ---- Scroll parallax (own elements, smoothed) ----
      // smooth: true lets ScrollTrigger interpolate with Lenis without jitter.
      gsap.to('[data-scroll-bg]', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      gsap.to('[data-fg]', {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      gsap.to('[data-copy]', {
        yPercent: -6,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // ---- Pointer parallax (own elements, quickTo for buttery updates) ----
      if (window.matchMedia('(pointer: fine)').matches) {
        const bgX = gsap.quickTo('[data-pointer-bg]', 'x', { duration: 1.1, ease: 'power3.out' });
        const bgY = gsap.quickTo('[data-pointer-bg]', 'y', { duration: 1.1, ease: 'power3.out' });
        const fgX = gsap.quickTo('[data-pointer-fg]', 'x', { duration: 1.1, ease: 'power3.out' });
        const fgY = gsap.quickTo('[data-pointer-fg]', 'y', { duration: 1.1, ease: 'power3.out' });

        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          bgX(nx * -22);
          bgY(ny * -14);
          fgX(nx * 34);
          fgY(ny * 20);
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        return () => window.removeEventListener('pointermove', onMove);
      }
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative min-h-[100dvh] overflow-hidden bg-ink text-paper">
      {/* ===== LAYER 1: backdrop — nested transform layers so nothing conflicts ===== */}
      <div data-scroll-bg className="absolute inset-0 will-change-transform">
        <div data-pointer-bg className="absolute inset-[-6%] will-change-transform">
          <div data-drift className="absolute inset-0 will-change-transform">
            <SmartImage
              src={BG}
              alt="A sweeping miniature model railway layout with a coal train curving through hills and a small town"
              sizes="100vw"
              fit="cover"
              priority="critical"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>

      {/* ===== LAYER 2: cinematic grade + vignette ===== */}
      <div
        data-veil
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(20,17,14,0.9) 0%, rgba(20,17,14,0.7) 38%, rgba(20,17,14,0.35) 70%, rgba(20,17,14,0.25) 100%), linear-gradient(to bottom, rgba(20,17,14,0.6) 0%, rgba(20,17,14,0.3) 40%, rgba(20,17,14,0.8) 100%)',
        }}
        aria-hidden="true"
      />
      {/* extra scrim behind the copy column for guaranteed legibility */}
      <div
        className="absolute inset-y-0 left-0 w-full max-w-3xl"
        style={{ background: 'linear-gradient(to right, rgba(20,17,14,0.75), transparent)' }}
        aria-hidden="true"
      />
      <div className="draft-grid-dark absolute inset-0 opacity-25" aria-hidden="true" />

      {/* ===== LAYER 3: passing light sweep ===== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          data-sweep
          className="absolute -inset-y-10 left-0 w-1/3 rotate-6 opacity-40 blur-2xl will-change-transform"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(231,190,106,0.45), transparent)' }}
        />
      </div>

      {/* ===== LAYER 4: foreground macro detail (depth) ===== */}
      <div
        data-fg
        className="pointer-events-none absolute -right-16 bottom-[-8%] hidden w-[46%] max-w-2xl will-change-transform md:block"
        aria-hidden="true"
      >
        <div data-pointer-fg className="will-change-transform">
          <div className="relative overflow-hidden rounded-[1.5rem] opacity-90 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-paper/10">
            <SmartImage src={FG} alt="" sizes="46vw" fit="cover" priority="eager" className="h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-tr from-ink/50 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* ===== LAYER 5: copy ===== */}
      <div className="container-x relative flex min-h-[100dvh] flex-col justify-end pb-16 pt-32 sm:justify-center sm:pb-24">
        <div data-copy className="max-w-4xl will-change-transform">
          <div className="overflow-hidden">
            <p data-eyebrow className="eyebrow text-brass-light [text-shadow:0_1px_10px_rgba(20,17,14,0.6)]">
              Bangalore · Handcrafted since over two decades
            </p>
          </div>

          <h1 data-line className="mt-6 font-display text-display-xl [text-shadow:0_2px_30px_rgba(20,17,14,0.35)]">
            <span className="block overflow-hidden">
              <span className="line-inner block">A miniature world,</span>
            </span>
            <span className="block overflow-hidden">
              <span className="line-inner block italic text-brass">built to run.</span>
            </span>
          </h1>

          <p data-sub className="mt-8 max-w-xl text-lg leading-relaxed text-paper/95 [text-shadow:0_1px_12px_rgba(20,17,14,0.5)]">
            Pioneers of miniature model railroading in India for {BRAND.yearsText} — handcrafted
            locomotives, wagons, coaches and complete layouts across N, HO, G and Z scales.
          </p>

          <div data-cta className="mt-10 flex flex-wrap gap-3">
            <Button href="/collection" variant="light">
              Explore the collection
            </Button>
            <Button
              href="/solutions"
              variant="ghost"
              className="border-paper/30 text-paper hover:border-paper/70"
            >
              Our train systems
            </Button>
          </div>

          <dl data-meta className="mt-14 flex flex-wrap gap-x-12 gap-y-6 border-t border-paper/15 pt-8">
            <Stat k="Years of craft" v="23+" />
            <Stat k="Working scales" v="N · HO · G · Z" />
            <Stat k="Made in" v="Bangalore, India" />
          </dl>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/55">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-brass to-transparent" />
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">{k}</dt>
      <dd className="mt-1 font-display text-2xl text-paper">{v}</dd>
    </div>
  );
}
