import Link from 'next/link';
import { BRAND } from '@/lib/products';

const nav = [
  { href: '/collection', label: 'Collection' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const scales = [
  { href: '/collection/n', label: 'N Scale' },
  { href: '/collection/ho', label: 'HO Scale' },
  { href: '/collection/g', label: 'G Scale' },
  { href: '/collection/z', label: 'Z Scale' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="draft-grid-dark absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="container-x relative py-20">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Est. Bangalore · {BRAND.yearsText}</p>
            <h2 className="mt-5 max-w-md font-display text-4xl leading-[1.05] md:text-5xl">
              Let&rsquo;s build something that runs.
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-brass px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:bg-brass-light"
              >
                Chat on WhatsApp
              </a>
              <Link
                href="/contact"
                className="rounded-full border border-paper/25 px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:border-paper/60"
              >
                Visit the workshop
              </Link>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="eyebrow text-paper/50">Explore</p>
            <ul className="mt-5 space-y-2.5">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-paper/80 hover:text-paper">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6 grid grid-cols-2 gap-2 font-mono text-xs text-paper/60">
              {scales.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="link-underline hover:text-brass">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-paper/50">Workshop</p>
            <address className="mt-5 space-y-1 not-italic text-sm leading-relaxed text-paper/80">
              <p>{BRAND.address.line1}</p>
              <p>{BRAND.address.line2}</p>
              <p>{BRAND.address.line3}</p>
            </address>
            <div className="mt-5 space-y-1 font-mono text-xs">
              <a href={BRAND.phoneHref} className="block link-underline w-fit text-paper/80 hover:text-brass">
                {BRAND.phone}
              </a>
              <a href={`mailto:${BRAND.email}`} className="block link-underline w-fit text-paper/80 hover:text-brass">
                {BRAND.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-paper/10 pt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/45 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {BRAND.name}</p>
          <p>Handcrafted model railways · Made in India</p>
        </div>
      </div>
    </footer>
  );
}
