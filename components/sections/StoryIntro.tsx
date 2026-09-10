'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Reveal from '@/components/primitives/Reveal';
import Button from '@/components/primitives/Button';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function StoryIntro() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;

      // Draw the rail line as the section enters
      const path = root.current?.querySelector<SVGPathElement>('[data-rail-path]');
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 1,
          },
        });
      }

      // Count up years
      const counter = root.current?.querySelector('[data-count]');
      if (counter) {
        const obj = { v: 0 };
        gsap.to(obj, {
          v: 23,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: counter, start: 'top 85%' },
          onUpdate: () => {
            counter.textContent = Math.round(obj.v).toString();
          },
        });
      }

      // parallax on the about image
      const img = root.current?.querySelector('[data-parallax]');
      if (img) {
        gsap.to(img, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      }
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-paper py-section">
      {/* rail line motif threading down the left edge */}
      <svg
        className="pointer-events-none absolute left-6 top-0 hidden h-full w-24 md:block"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          data-rail-path
          d="M50 0 C 50 200, 20 320, 50 500 S 80 780, 50 1000"
          fill="none"
          stroke="#C8962C"
          strokeWidth="1.5"
          opacity="0.6"
        />
      </svg>

      <div className="container-x grid gap-14 md:grid-cols-12">
        <div className="md:col-span-6 md:pl-10">
          <Reveal>
            <p className="eyebrow">Who we are</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 font-display text-display-md">
              A workshop that has been building the impossible in miniature for over two decades.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink/70">
              Aditya Miniatures and Models pioneered miniature model railroading in India. We craft
              high-quality trains and complete layouts for enthusiasts, and we engineer novel,
              real-world systems — from the Waiter-Less Food Delivery Train to ride-able trains for
              resorts and public venues. Passion, expertise and innovation, delivered in every detail.
            </p>
          </Reveal>

          <div className="mt-10 flex flex-wrap items-end gap-10">
            <Reveal>
              <div>
                <span className="flex items-baseline gap-1 font-display text-6xl text-brass">
                  <span data-count>23</span>
                  <span>+</span>
                </span>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
                  Years of practice
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <Button href="/about" variant="ghost">
                Read our story
              </Button>
            </Reveal>
          </div>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <Reveal className="plate">
            <div className="plate-core relative aspect-[4/5] overflow-hidden">
              <div data-parallax className="absolute inset-0 scale-110">
                <Image
                  src="/assets/images/home-img/about.jpg"
                  alt="Inside the Aditya Miniatures workshop — a detailed model railway layout"
                  fill
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              <p className="absolute bottom-5 left-5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/90">
                The workshop · Bangalore
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
