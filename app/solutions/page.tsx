import type { Metadata } from 'next';
import SmartImage from '@/components/media/SmartImage';
import PageHeader from '@/components/layout/PageHeader';
import MediaFeature from '@/components/sections/MediaFeature';
import Reveal from '@/components/primitives/Reveal';
import Button from '@/components/primitives/Button';
import { BRAND } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Solutions — Waiter-Less Delivery & Ride-able Trains',
  description:
    'Our signature real-world train systems: the Waiter-Less Food Delivery Train for restaurants, ride-able trains for resorts and venues, and bespoke model railway layouts.',
  alternates: { canonical: '/solutions' },
};

const FEATURES = [
  {
    index: '01 — Hospitality',
    title: 'The Waiter-Less Food Delivery Train',
    body: 'A miniature train that carries plated food along a bespoke track directly to each table. We engineer the layout, mechanism and control to suit your dining room — a talking-point attraction that turns a meal into an experience.',
    points: ['Custom track routing to your floor plan', 'Reliable, food-safe delivery mechanism', 'Themed to match your interior'],
    poster: '/assets/images/landscaping-miniatures/4.jpg',
    posterAlt: 'Detailed miniature layout representing the Waiter-Less Food Delivery Train system',
    video: '/videos/waiterless-train.mp4',
  },
  {
    index: '02 — Experiences',
    title: 'Ride-able Trains for Venues & Resorts',
    body: 'Full ride-able toy trains for public entertainment venues and resorts. A memorable centrepiece for families and guests, engineered for safe, repeated operation in a commercial setting.',
    points: ['Built for public, high-traffic use', 'Track laid to your site', 'Maintained for reliability'],
    poster: '/assets/images/landscaping-miniatures/8.jpg',
    posterAlt: 'Miniature garden layout representing ride-able train installations for resorts',
    video: '/videos/rideable-train.mp4',
  },
  {
    index: '03 — Bespoke',
    title: 'Custom Model Railway Layouts',
    body: 'From a single diorama to a room-filling world, we design and build complete layouts — track plans, scenery, structures and running stock — tailored to your space and story.',
    points: ['Any scale: N, HO, G or Z', 'Scenery, structures and figures', 'Designed around your space'],
    poster: '/assets/images/landscaping-miniatures/1.jpg',
    posterAlt: 'A finished custom model railway layout with detailed scenery by Aditya Miniatures',
    video: undefined,
  },
];

// Project gallery from authentic landscaping/layout photography.
const GALLERY = [1, 2, 3, 5, 6, 7, 9, 10, 11, 12].map((n) => `/assets/images/landscaping-miniatures/${n}.jpg`);

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Beyond the hobby bench"
        title="Trains that leave the layout."
        intro="We don't just build models — we engineer working train systems for the real world. Restaurants, resorts and bespoke layouts, delivered end to end."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Solutions' }]}
      />

      <section className="bg-paper py-section">
        <div className="container-x space-y-24">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`grid items-center gap-10 md:grid-cols-12 md:gap-16 ${
                i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
              }`}
            >
              <Reveal className="md:col-span-7">
                <MediaFeature index={f.index} poster={f.poster} posterAlt={f.posterAlt} videoSrc={f.video} dark={false} />
              </Reveal>
              <div className="md:col-span-5">
                <Reveal>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-brass">{f.index}</p>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">{f.title}</h2>
                </Reveal>
                <Reveal delay={140}>
                  <p className="mt-5 text-lg leading-relaxed text-ink/70">{f.body}</p>
                </Reveal>
                <Reveal delay={200}>
                  <ul className="mt-6 space-y-2.5">
                    {f.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-ink/75">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project gallery */}
      <section className="bg-paper-soft py-section">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">Project images</p>
                <h2 className="mt-5 max-w-xl font-display text-display-md">Selected work from the workshop.</h2>
              </div>
            </div>
          </Reveal>
          <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            {GALLERY.map((src, i) => (
              <Reveal key={src} delay={(i % 3) * 60}>
                <div className="plate break-inside-avoid">
                  <div className="plate-core relative overflow-hidden">
                    <SmartImage
                      src={src}
                      alt={`Custom layout and scenery project ${i + 1} by Aditya Miniatures`}
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                      priority="lazy"
                      reserveRatio
                      className="w-full"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink py-section text-paper">
        <div className="draft-grid-dark absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="container-x relative text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-display text-display-md">
              Have a space, a venue, or an idea? Let&rsquo;s engineer it.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button href="/contact" variant="light">Start a project</Button>
              <Button href={BRAND.whatsapp} external variant="ghost" ariaLabel="Chat with us on WhatsApp" className="border-paper/25 text-paper hover:border-paper/60">
                WhatsApp us
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Bespoke miniature train systems and model railway layouts',
            provider: { '@type': 'LocalBusiness', name: BRAND.name },
            areaServed: 'IN',
            description:
              'Waiter-Less Food Delivery Train systems, ride-able trains for venues and resorts, and custom model railway layouts.',
          }),
        }}
      />
    </>
  );
}
