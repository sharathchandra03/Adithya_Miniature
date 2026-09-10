'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BRAND } from '@/lib/products';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/collection', label: 'Collection' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4">
        <nav
          className={`pointer-events-auto mt-4 flex w-full max-w-container items-center justify-between rounded-full border border-ink/10 bg-paper/80 px-4 py-2.5 backdrop-blur-xl transition-all duration-500 ease-expo sm:px-5 ${
            scrolled || open ? 'shadow-soft' : 'shadow-none'
          }`}
        >
          <Link
            href="/"
            aria-label={`${BRAND.name} home`}
            onClick={() => {
              // If already on home, the route won't change — scroll to top ourselves.
              if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5"
          >
            <BrassMark />
            <span className="font-display text-base leading-none tracking-tight">
              Aditya <span className="text-brass">Miniatures</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {LINKS.slice(1).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`link-underline font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                  pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href))
                    ? 'text-brass'
                    : 'text-ink/90 hover:text-ink'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ink px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-ink-soft"
            >
              Enquire
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="relative flex h-9 w-9 items-center justify-center md:hidden"
          >
            <span
              className={`absolute h-px w-5 bg-ink transition-all duration-400 ease-expo ${
                open ? 'rotate-45' : '-translate-y-1.5'
              }`}
            />
            <span
              className={`absolute h-px w-5 bg-ink transition-all duration-400 ease-expo ${
                open ? '-rotate-45' : 'translate-y-1.5'
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Full-screen overlay menu (mobile) */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center overflow-y-auto bg-ink/95 px-8 py-24 backdrop-blur-2xl transition-all duration-500 ease-expo md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="draft-grid-dark absolute inset-0 opacity-40" aria-hidden="true" />
        <nav className="relative flex flex-col gap-1">
          {LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className="group flex items-baseline gap-4 py-2 text-paper"
              style={{
                transitionDelay: open ? `${100 + i * 60}ms` : '0ms',
                transform: open ? 'translateY(0)' : 'translateY(24px)',
                opacity: open ? 1 : 0,
                transition: 'transform 0.6s var(--ease-expo), opacity 0.6s var(--ease-expo)',
              }}
            >
              <span className="font-mono text-xs text-brass">0{i + 1}</span>
              <span className="font-display text-4xl group-hover:text-brass transition-colors">
                {l.label}
              </span>
            </Link>
          ))}
        </nav>
        <div className="relative mt-12 space-y-1 font-mono text-xs text-paper/60">
          <a href={BRAND.phoneHref} className="block link-underline w-fit">{BRAND.phone}</a>
          <a href={`mailto:${BRAND.email}`} className="block link-underline w-fit">{BRAND.email}</a>
        </div>
      </div>
    </>
  );
}

function BrassMark() {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="7" cy="17" r="2.4" stroke="#C8962C" strokeWidth="1.4" />
        <circle cx="17" cy="17" r="2.4" stroke="#C8962C" strokeWidth="1.4" />
        <path d="M4 12h11a3 3 0 0 1 3 3v2M6 12V7h6l3 5" stroke="#E7BE6A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
