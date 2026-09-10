// Typed catalogue derived from the client's authentic product photography.
// No specs are fabricated. Titles are descriptive (scale + category + index).
// The one product with a real, sourced spec (Bachmann GG1) is annotated.

export type ScaleId = 'n' | 'ho' | 'g' | 'z';
export type CategoryId =
  | 'locomotives'
  | 'wagons'
  | 'coaches'
  | 'tracks'
  | 'landscaping'
  | 'accessories';

export interface Scale {
  id: ScaleId;
  name: string;
  short: string;
  ratio: string;
  blurb: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
}

export interface Product {
  id: string;
  title: string;
  scale: ScaleId | null;
  category: CategoryId;
  image: string;
  alt: string;
  featureNote?: string;
}

export const SCALES: Scale[] = [
  { id: 'n', name: 'N Scale', short: 'N', ratio: '1:160', blurb: 'Compact precision. Sweeping layouts in a small footprint.' },
  { id: 'ho', name: 'HO Scale', short: 'HO', ratio: '1:87', blurb: 'The enthusiast standard. Detail, range and running quality.' },
  { id: 'g', name: 'G Scale', short: 'G', ratio: '1:22.5', blurb: 'Garden-grade presence. Bold models built for the outdoors.' },
  { id: 'z', name: 'Z Scale', short: 'Z', ratio: '1:220', blurb: 'The miniature extreme. New pieces arriving to the bench.' },
];

export const CATEGORIES: Category[] = [
  { id: 'locomotives', name: 'Locomotives', blurb: 'The engines — die-cast frames, fine mechanisms, DCC-ready builds.' },
  { id: 'wagons', name: 'Wagons', blurb: 'Freight and goods stock, faithfully detailed.' },
  { id: 'coaches', name: 'Coaches', blurb: 'Passenger carriages with interior and livery detail.' },
  { id: 'tracks', name: 'Tracks', blurb: 'Rail, points and curves engineered for smooth running.' },
  { id: 'landscaping', name: 'Landscaping', blurb: 'Scenery, structures and figures that bring a layout to life.' },
  { id: 'accessories', name: 'Accessories', blurb: 'Controllers, couplers and the details that finish a build.' },
];

const IMG = '/assets/images';

function build(
  category: CategoryId,
  scale: ScaleId | null,
  dir: string,
  ext: 'png' | 'jpg',
  files: (number | string)[],
  label: string,
): Product[] {
  return files.map((f, i) => {
    const scaleName = scale ? SCALES.find((s) => s.id === scale)!.name : '';
    const title = `${scaleName ? scaleName + ' ' : ''}${label} No. ${String(i + 1).padStart(2, '0')}`;
    return {
      id: `${category}-${scale ?? 'x'}-${i + 1}`,
      title,
      scale,
      category,
      image: `${IMG}/${dir}/${f}.${ext}`,
      alt: `${title} — handcrafted model by Aditya Miniatures and Models`,
    };
  });
}

// Ranges reflect the actual files present on disk.
export const PRODUCTS: Product[] = [
  // Locomotives
  ...build('locomotives', 'n', 'n-scale/locomotives', 'png', [1, 2, 3, 4, 5, 6, 7], 'Locomotive'),
  ...build('locomotives', 'ho', 'ho-scale', 'png', [1, 2, 3, 4, 5, 6, 7, 8, 10], 'Locomotive'),
  ...build('locomotives', 'g', 'g-scale', 'jpg', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 22], 'Locomotive'),
  // Wagons
  ...build('wagons', 'n', 'wagons/n-scale', 'png', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 'Wagon'),
  ...build('wagons', 'ho', 'wagons/ho-scale', 'png', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], 'Wagon'),
  ...build('wagons', 'g', 'wagons/g-scale', 'jpg', [1, 2, 3, 4], 'Wagon'),
  // Coaches
  ...build('coaches', 'ho', 'coaches/ho-scale', 'png', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 'Coach'),
  ...build('coaches', 'n', 'coaches/n-scale', 'png', [1], 'Coach'),
  ...build('coaches', 'g', 'coaches/g-scale', 'jpg', [1], 'Coach'),
  // Tracks
  ...build('tracks', 'n', 'tracks/n-scale', 'jpg', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'Track System'),
  ...build('tracks', 'ho', 'tracks/ho-scale', 'jpg', [1, 2, 3, 4], 'Track System'),
  ...build('tracks', 'g', 'tracks/g-scale', 'jpg', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'Track System'),
  // Landscaping (no single scale)
  ...build('landscaping', null, 'landscaping-miniatures', 'jpg', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 'Landscape Piece'),
  // Accessories (no single scale)
  ...build('accessories', null, 'accessories', 'jpg', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14], 'Accessory'),
];

// Attach the one real, sourced product detail to the first HO locomotive.
const bachmann = PRODUCTS.find((p) => p.id === 'locomotives-ho-1');
if (bachmann) {
  bachmann.title = 'Bachmann HO GG1 Electric — Amtrak #926';
  bachmann.alt = 'Bachmann HO scale GG1 electric locomotive, Amtrak #926, offered by Aditya Miniatures and Models';
  bachmann.featureNote =
    'DCC-ready · all-new-tooling die-cast frame · 12-wheel drive · twin operating metal pantographs · soft-white LED directional headlights with dimming · factory 8-pin DCC socket · E-Z Mate Mark II couplers · best on 22" radius curves or greater.';
}

export function productsByScale(scale: ScaleId): Product[] {
  return PRODUCTS.filter((p) => p.scale === scale);
}

export function productsByCategory(category: CategoryId): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getScale(id: string): Scale | undefined {
  return SCALES.find((s) => s.id === id);
}

export function scaleCategorySummary(scale: ScaleId) {
  return CATEGORIES.map((c) => ({
    ...c,
    count: PRODUCTS.filter((p) => p.scale === scale && p.category === c.id).length,
  })).filter((c) => c.count > 0);
}

export const CATALOGUE_COUNT = PRODUCTS.length;

// Brand / contact facts (sourced from original site)
export const BRAND = {
  name: 'Aditya Miniatures and Models',
  shortName: 'Aditya Miniatures',
  yearsText: '23+ years',
  city: 'Bangalore',
  phone: '+91 96110 77015',
  phoneHref: 'tel:+919611077015',
  email: 'adityaminiaturesandmodels@gmail.com',
  whatsapp: 'https://api.whatsapp.com/send/?phone=9611077015&text&type=phone_number&app_absent=0',
  address: {
    line1: '#39/2, CGP Reddy Building, 5th Main, 6th Cross',
    line2: 'Opp. Cakies Bakery, Mallesh palya',
    line3: 'Bangalore - 560075',
  },
  siteUrl: 'https://adityaminiaturetrainmodels.com',
};
