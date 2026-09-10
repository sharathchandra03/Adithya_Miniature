'use client';

import { useEffect, useRef } from 'react';

type As = keyof JSX.IntrinsicElements;

interface RevealProps {
  as?: As;
  className?: string;
  delay?: number;
  children: React.ReactNode;
}

/**
 * Cheap, dependency-free scroll reveal using IntersectionObserver.
 * Honors prefers-reduced-motion via CSS (see globals.css).
 */
export default function Reveal({ as = 'div', className = '', delay = 0, children }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.classList.contains('is-visible')) return;

    const reveal = () => {
      if (delay) el.style.transitionDelay = `${delay}ms`;
      el.classList.add('is-visible');
    };

    // If IntersectionObserver is unavailable, show immediately.
    if (typeof IntersectionObserver === 'undefined') {
      reveal();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    );

    io.observe(el);

    // Safety net: never leave content hidden. If the observer hasn't fired
    // within 1.2s (e.g. element already on-screen but callback missed), reveal.
    const safety = window.setTimeout(reveal, 1200);

    return () => {
      window.clearTimeout(safety);
      io.disconnect();
    };
  }, [delay]);

  const Tag = as as As;
  return (
    // @ts-expect-error dynamic tag with ref
    <Tag ref={ref} data-reveal className={className}>
      {children}
    </Tag>
  );
}
