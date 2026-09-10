import Reveal from '@/components/primitives/Reveal';
import Button from '@/components/primitives/Button';
import { BRAND } from '@/lib/products';

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-brass py-section text-ink">
      <div className="draft-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container-x relative text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-ink/70">Start your model train journey</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mx-auto mt-6 max-w-4xl font-display text-display-lg leading-[0.98]">
            Tell us what you want to build. We&rsquo;ll make it run.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="primary">
              Contact the workshop
            </Button>
            <Button href={BRAND.whatsapp} external variant="ghost" ariaLabel="Chat with us on WhatsApp">
              WhatsApp us
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
