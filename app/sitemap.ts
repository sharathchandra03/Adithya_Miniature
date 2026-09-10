import type { MetadataRoute } from 'next';
import { SCALES, BRAND } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BRAND.siteUrl;
  const now = new Date();

  const staticRoutes = ['', '/collection', '/solutions', '/about', '/contact'].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const scaleRoutes = SCALES.map((s) => ({
    url: `${base}/collection/${s.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...scaleRoutes];
}
