import Reveal from '@/components/primitives/Reveal';
import Button from '@/components/primitives/Button';
import MediaFeature from './MediaFeature';

const FEATURES = [
  {
    index: '01 — Hospitality',
    title: 'The Waiter-Less Food Delivery Train',
    body: 'A miniature train that carries plated food directly to the table — a signature attraction we engineer for upscale dining rooms and themed restaurants.',
    poster: '/assets/images/landscaping-miniatures/4.jpg',
    posterAlt: 'A detailed miniature layout illustrating the Waiter-Less Food Delivery Train concept',
    video: '/videos/waiterless-train.mp4',
  },
  {
    index: '02 — Experiences',
    title: 'Ride-able Trains for Venues & Resorts',
    body: 'Full-size ride-able toy trains built for public entertainment venues and resorts — a memorable centrepiece that keeps guests coming back.',
    poster: '/assets/images/landscaping-miniatures/8.jpg',
    posterAlt: 'A miniature garden layout representing ride-able train installations for resorts',
    video: '/videos/rideable-train.mp4',
  },
];

export default function SolutionsFeature() {
  return (
    <section className="relative overflow-hidden bg-paper-soft py-section">
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow">Beyond the hobby bench</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 font-display text-display-md">
              Where models leave the layout and enter the real world.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 space-y-20">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`grid items-center gap-10 md:grid-cols-12 md:gap-16 ${
                i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
              }`}
            >
              <Reveal className="md:col-span-7">
                <MediaFeature
                  index={f.index}
                  poster={f.poster}
                  posterAlt={f.posterAlt}
                  videoSrc={f.video}
                />
              </Reveal>
              <div className="md:col-span-5">
                <Reveal>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-brass">{f.index}</p>
                </Reveal>
                <Reveal delay={80}>
                  <h3 className="mt-4 font-display text-3xl leading-tight md:text-4xl">{f.title}</h3>
                </Reveal>
                <Reveal delay={140}>
                  <p className="mt-5 text-lg leading-relaxed text-ink/70">{f.body}</p>
                </Reveal>
                <Reveal delay={200}>
                  <div className="mt-8">
                    <Button href="/solutions" variant="ghost">
                      Explore solutions
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
