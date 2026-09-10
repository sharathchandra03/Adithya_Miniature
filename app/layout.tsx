import type { Metadata } from 'next';
import { Fraunces, Space_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import { BRAND } from '@/lib/products';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
});

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
});

const mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    default: 'Aditya Miniatures & Models — Handcrafted Model Railways, Bangalore',
    template: '%s · Aditya Miniatures',
  },
  description:
    'Pioneers of miniature model railroading in India for 23+ years. Locomotives, wagons, coaches and tracks across N, HO, G and Z scales, plus custom layouts and the Waiter-Less Food Delivery Train System.',
  keywords: [
    'model trains India', 'miniature trains Bangalore', 'HO scale', 'N scale', 'G scale', 'Z scale',
    'model railway layouts', 'ride-able toy trains', 'waiter-less food delivery train',
  ],
  authors: [{ name: BRAND.name }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BRAND.siteUrl,
    siteName: BRAND.name,
    title: 'Aditya Miniatures & Models — Handcrafted Model Railways',
    description:
      '23+ years crafting miniature model railways in Bangalore. Explore the collection and our signature train systems.',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Aditya Miniatures model railway' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Miniatures & Models',
    description: 'Handcrafted model railways from Bangalore. 23+ years of miniature craft.',
    images: ['/og.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`no-js ${fraunces.variable} ${grotesk.variable} ${mono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');`,
          }}
        />
      </head>
      <body className="grain">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.18em] focus:text-paper"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
