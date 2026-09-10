/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // All images are pre-optimized at build time (scripts/build-images.mjs) and
    // served as static AVIF/WebP variants via <picture srcset>. We disable the
    // runtime optimizer entirely so there is ZERO cold-start transcode — the
    // root cause of the previous multi-second image waits.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        // Pre-generated, content-addressed derivatives never change for a given
        // build -> cache them hard (1 year, immutable).
        source: '/assets/opt/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        // Source images / posters — long cache, still revalidatable.
        source: '/assets/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
    ];
  },
  async redirects() {
    const scale = (s, files) =>
      files.map((f) => ({ source: `/${f}.html`, destination: `/collection/${s}`, permanent: true }));
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/index-2.html', destination: '/', permanent: true },
      ...scale('n', ['n-scale-locomotives', 'n-scale-wagons', 'n-scale-coaches', 'n-scale-tracks']),
      ...scale('ho', ['ho-scale-locomotives', 'ho-scale-wagons', 'ho-scale-coaches', 'ho-scale-tracks']),
      ...scale('g', ['g-scale-locomotives', 'g-scale-wagons', 'g-scale-coaches', 'g-scale-tracks']),
      ...scale('z', ['z-scale-locomotives', 'z-scale-wagons', 'z-scale-coaches', 'z-scale-tracks']),
      { source: '/landscaping-miniatures.html', destination: '/collection', permanent: true },
      { source: '/accessories.html', destination: '/collection', permanent: true },
      { source: '/solutions.html', destination: '/solutions', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
    ];
  },
};

export default nextConfig;
