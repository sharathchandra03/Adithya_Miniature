import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';
import Reveal from '@/components/primitives/Reveal';
import Button from '@/components/primitives/Button';
import { BRAND, CATALOGUE_COUNT } from '@/lib/products';
import { BLUR_DATA_URL } from '@/lib/blur';

export const metadata: Metadata = {
  title: 'About — 23 Years of Miniature Craft',
  description:
    'The story of Aditya Miniatures and Models — Bangalore-based pioneers of miniature model railroading in India for over 23 years.',
  alternates: { canonical: '/about' },
};

const VALUES = [
  { k: 'Passion', v: 'Every model begins with a love of trains — the detail, the movement, the miniature world.' },
  { k: 'Expertise', v: 'Over two decades refining the craft across four scales and countless layouts.' },
  { k: 'Innovation', v: 'From food-delivery trains to ride-able builds, we take the hobby into the real world.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Who we are"
        title="Twenty-three years in miniature."
        intro="Aditya Miniatures and Models pioneered miniature model railroading in India. This is the workshop where tiny machines are built to run."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* Story */}
      <section className="bg-paper py-section">
        <div className="container-x grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <Reveal>
              <h2 className="font-display text-display-md">
                A Bangalore workshop, a national first.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/70">
                <p>
                  For over {BRAND.yearsText}, we have specialised in high-quality miniature trains and
                  layouts — crafting captivating experiences for enthusiasts and practical applications
                  alike.
                </p>
                <p>
                  From intricate model train layouts to innovative systems like the Waiter-Less Food
                  Delivery Train for upscale dining, and ride-able toy trains for public entertainment
                  venues, we deliver diverse, high-quality projects tailored to our customers&rsquo; needs.
                </p>
                <p>Passion, expertise, innovation — we deliver it all.</p>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <Reveal className="plate">
              <div className="plate-core relative aspect-[4/5]">
                <Image
                  src="/assets/images/home-img/about.jpg"
                  alt="A detailed model railway layout inside the Aditya Miniatures workshop, Bangalore"
                  fill
                  sizes="(max-width: 768px) 90vw, 40vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  quality={75}
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="relative overflow-hidden bg-ink py-20 text-paper">
        <div className="draft-grid-dark absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="container-x relative grid gap-10 sm:grid-cols-3">
          {[
            { n: '23+', l: 'Years of practice' },
            { n: `${CATALOGUE_COUNT}+`, l: 'Models in the catalogue' },
            { n: '4', l: 'Working scales · N HO G Z' },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 100}>
              <div>
                <p className="font-display text-6xl text-brass">{s.n}</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-paper-soft py-section">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">What we stand on</p>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {VALUES.map((val, i) => (
              <Reveal key={val.k} delay={i * 80}>
                <div className="border-t border-ink/15 pt-6">
                  <span className="font-mono text-xs text-brass">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-2xl">{val.k}</h3>
                  <p className="mt-3 text-ink/65">{val.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div className="mt-14 flex flex-wrap gap-3">
              <Button href="/collection" variant="primary">See the collection</Button>
              <Button href="/contact" variant="ghost">Visit the workshop</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
