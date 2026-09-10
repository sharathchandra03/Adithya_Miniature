import Hero from '@/components/sections/Hero';
import StoryIntro from '@/components/sections/StoryIntro';
import MarqueeBand from '@/components/sections/MarqueeBand';
import ScaleShowcase from '@/components/sections/ScaleShowcase';
import SolutionsFeature from '@/components/sections/SolutionsFeature';
import CategoryStrip from '@/components/sections/CategoryStrip';
import CtaBand from '@/components/sections/CtaBand';
import { BRAND, CATALOGUE_COUNT } from '@/lib/products';

export default function Home() {
  return (
    <>
      <Hero />
      <StoryIntro />
      <MarqueeBand />
      <ScaleShowcase />
      <SolutionsFeature />
      <CategoryStrip />
      <CtaBand />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: BRAND.name,
            image: `${BRAND.siteUrl}/assets/images/home-img/slide/1.png`,
            '@id': BRAND.siteUrl,
            url: BRAND.siteUrl,
            telephone: BRAND.phone,
            email: BRAND.email,
            description: `Pioneers of miniature model railroading in India for ${BRAND.yearsText}. ${CATALOGUE_COUNT}+ handcrafted models across N, HO, G and Z scales, plus custom layouts and signature train systems.`,
            address: {
              '@type': 'PostalAddress',
              streetAddress: `${BRAND.address.line1}, ${BRAND.address.line2}`,
              addressLocality: 'Bangalore',
              postalCode: '560075',
              addressCountry: 'IN',
            },
            areaServed: 'IN',
            sameAs: [BRAND.whatsapp],
          }),
        }}
      />
    </>
  );
}
