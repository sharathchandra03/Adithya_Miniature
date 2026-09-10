// Intelligent, controlled image preloading for the collection experience.
// Preloads a sensibly-sized derivative (not the original) into the browser
// cache so the detail modal appears instantly on click. Keeps a small in-memory
// set to avoid duplicate requests.

import { getImage, pickWidth } from './images';

const requested = new Set<string>();

/**
 * Preload the detail-sized variant of a source image.
 * `target` is the intended display width (px); we pick the smallest variant >= it.
 */
export function preloadDetail(src: string, target = 960): void {
  if (typeof window === 'undefined') return;
  const entry = getImage(src);
  if (!entry) return;
  const url = pickWidth(entry, target);
  if (requested.has(url)) return;
  requested.add(url);

  const img = new Image();
  // Low priority so it never competes with visible content.
  img.fetchPriority = 'low';
  img.decoding = 'async';
  img.src = url;
}

/** Preload several sources (e.g. the first N likely-clicked cards). */
export function preloadMany(srcs: string[], target = 960, limit = 6): void {
  srcs.slice(0, limit).forEach((s) => preloadDetail(s, target));
}
