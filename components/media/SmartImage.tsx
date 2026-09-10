'use client';

import { useEffect, useRef, useState } from 'react';
import { getImage, buildSrcSet } from '@/lib/images';

type Fit = 'cover' | 'contain';
type Priority = 'critical' | 'eager' | 'lazy';

export interface SmartImageProps {
  /** SOURCE path as stored in the manifest, e.g. "/assets/images/ho-scale/1.png" */
  src: string;
  alt: string;
  /** Responsive sizes attribute. Defaults to full-width. */
  sizes?: string;
  /** How the image fills its box. */
  fit?: Fit;
  /**
   * critical: eager + high priority (above-the-fold hero/first cards)
   * eager: eager load, normal priority (near-viewport)
   * lazy: native lazy load (default, below the fold)
   */
  priority?: Priority;
  className?: string;
  /** Extra classes applied to the <img> itself. */
  imgClassName?: string;
  /**
   * If true, the wrapper reserves the image's intrinsic aspect ratio (no CLS).
   * If false, the wrapper fills its parent (parent must set the box) — used when
   * the layout controls the aspect (e.g. fixed-ratio plate).
   */
  reserveRatio?: boolean;
  /** Called once the full image has decoded. */
  onReady?: () => void;
}

/**
 * Renders a pre-optimized responsive image from the build-time manifest.
 * - <picture> with AVIF then WebP sources (static files, zero runtime transcode)
 * - blurred LQIP shown instantly as the box background (no blank rectangle)
 * - aspect-ratio reserved -> no layout shift
 * - fade from blur -> sharp on decode
 * - graceful fallback if the source isn't in the manifest or fails to load
 */
export default function SmartImage({
  src,
  alt,
  sizes = '100vw',
  fit = 'cover',
  priority = 'lazy',
  className = '',
  imgClassName = '',
  reserveRatio = false,
  onReady,
}: SmartImageProps) {
  const entry = getImage(src);
  const [errored, setErrored] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Fire onReady once decoded (used for preloading hooks). Never gates visibility.
  useEffect(() => {
    const img = imgRef.current;
    if (!img || !onReady) return;
    if (img.complete && img.naturalWidth > 0) {
      onReady();
    } else {
      const handler = () => onReady();
      img.addEventListener('load', handler, { once: true });
      return () => img.removeEventListener('load', handler);
    }
  }, [src, onReady]);

  // Only add `relative` when the caller hasn't set its own positioning.
  // (Tailwind's .relative is emitted after .absolute in the stylesheet, so a
  // hardcoded `relative` would otherwise override an `absolute` passed in
  // className — which broke the stacked cross-fade layers.)
  const hasPosition = /(^|\s)(absolute|fixed|relative|sticky)(\s|$)/.test(className);
  const posClass = hasPosition ? '' : 'relative';

  const wrapperStyle: React.CSSProperties = {
    // The blur LQIP always sits BEHIND the image. The image is never hidden by
    // JS state — it simply paints over the blur when the browser decodes it.
    // This guarantees an image is never stuck invisible (the previous bug on the
    // opacity-0 cross-fade layers).
    backgroundImage: entry ? `url("${entry.blur}")` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#EBE4D6',
    aspectRatio: reserveRatio && entry ? `${entry.width} / ${entry.height}` : undefined,
  };

  // Fallback: no manifest entry — serve the raw source directly.
  if (!entry || errored) {
    return (
      <span className={`${posClass} block overflow-hidden bg-paper-soft ${className}`} style={wrapperStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading={priority === 'lazy' ? 'lazy' : 'eager'}
          decoding="async"
          className={`h-full w-full object-${fit} ${imgClassName}`}
        />
      </span>
    );
  }

  const eager = priority === 'critical' || priority === 'eager';

  return (
    <span className={`${posClass} block overflow-hidden ${className}`} style={wrapperStyle}>
      <picture>
        <source type="image/avif" srcSet={buildSrcSet(entry.avif)} sizes={sizes} />
        <source type="image/webp" srcSet={buildSrcSet(entry.webp)} sizes={sizes} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={entry.fallback}
          alt={alt}
          width={entry.width}
          height={entry.height}
          sizes={sizes}
          loading={eager ? 'eager' : 'lazy'}
          // @ts-expect-error fetchpriority is valid HTML, not yet in React types
          fetchpriority={priority === 'critical' ? 'high' : undefined}
          decoding="async"
          onError={() => setErrored(true)}
          className={`h-full w-full object-${fit} ${imgClassName}`}
        />
      </picture>
    </span>
  );
}
