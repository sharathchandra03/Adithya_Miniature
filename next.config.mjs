/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
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
