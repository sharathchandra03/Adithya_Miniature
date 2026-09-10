import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import Reveal from '@/components/primitives/Reveal';
import ContactForm from '@/components/contact/ContactForm';
import { BRAND } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Contact Aditya Miniatures, Bangalore',
  description:
    'Visit our Bangalore workshop, call +91 96110 77015, or message us on WhatsApp. Start your model train journey with Aditya Miniatures and Models.',
  alternates: { canonical: '/contact' },
};

const MAP_QUERY = encodeURIComponent('Mallesh palya, Bangalore 560075');

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Start your model train journey"
        title="Let's talk."
        intro="Tell us what you want to build — a single locomotive, a full layout, or a working train system. We reply quickly."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="bg-paper py-section">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          {/* Details */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="space-y-8">
                <ContactItem label="WhatsApp — fastest reply" value="Chat with us now" href={BRAND.whatsapp} external />
                <ContactItem label="Call" value={BRAND.phone} href={BRAND.phoneHref} />
                <ContactItem label="Email" value={BRAND.email} href={`mailto:${BRAND.email}`} />
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">Workshop</p>
                  <address className="mt-2 space-y-0.5 not-italic text-lg leading-relaxed text-ink/80">
                    <p>{BRAND.address.line1}</p>
                    <p>{BRAND.address.line2}</p>
                    <p>{BRAND.address.line3}</p>
                  </address>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-10 overflow-hidden rounded-2xl border border-ink/10">
                <iframe
                  title="Map to Aditya Miniatures workshop, Mallesh palya, Bangalore"
                  src={`https://maps.google.com/maps?q=${MAP_QUERY}&z=15&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-64 w-full grayscale-[0.2]"
                />
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <div className="plate">
                <div className="plate-core p-6 sm:p-8">
                  <h2 className="font-display text-2xl">Send an enquiry</h2>
                  <p className="mt-2 text-sm text-ink/60">
                    This opens your email app with the details filled in — or reach us directly on WhatsApp.
                  </p>
                  <div className="mt-6">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: BRAND.name,
            telephone: BRAND.phone,
            email: BRAND.email,
            url: `${BRAND.siteUrl}/contact`,
            address: {
              '@type': 'PostalAddress',
              streetAddress: `${BRAND.address.line1}, ${BRAND.address.line2}`,
              addressLocality: 'Bangalore',
              postalCode: '560075',
              addressCountry: 'IN',
            },
          }),
        }}
      />
    </>
  );
}

function ContactItem({
  label,
  value,
  href,
  external = false,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">{label}</p>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="link-underline mt-2 inline-block font-display text-2xl hover:text-brass"
      >
        {value}
      </a>
    </div>
  );
}
