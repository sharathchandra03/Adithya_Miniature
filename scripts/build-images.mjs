/**
 * Offline image pipeline.
 *
 * Scans /public/assets/images for source photos and, for each, generates
 * pre-optimized responsive derivatives (AVIF + WebP) at a set of widths plus a
 * tiny blurred LQIP data URI. Writes everything to /public/assets/opt and emits
 * lib/image-manifest.json keyed by the *source* path (e.g. "/assets/images/ho-scale/1.png").
 *
 * These derivatives are STATIC files. At runtime we serve them directly with
 * <img srcset> (next/image `unoptimized`), so there is ZERO runtime transcode —
 * eliminating the cold-start optimizer delay that caused multi-second waits.
 *
 * Idempotent: skips regeneration when the derivative is newer than the source
 * (unless FORCE=1). Run via `npm run images`.
 */
import sharp from 'sharp';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'public', 'assets', 'images');
const OUT_DIR = path.join(ROOT, 'public', 'assets', 'opt');
const MANIFEST_PATH = path.join(ROOT, 'lib', 'image-manifest.json');
const FORCE = process.env.FORCE === '1';

// Responsive widths. We cap at 1600 — source art never exceeds that after the
// earlier resize pass, and detail/hero never needs more on this design.
const WIDTHS = [320, 480, 640, 960, 1280, 1600];
const AVIF = { quality: 52, effort: 4 };
const WEBP = { quality: 74 };

const IMG_EXT = /\.(png|jpe?g)$/i;

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (IMG_EXT.test(entry.name)) out.push(full);
  }
  return out;
}

async function newerThan(a, b) {
  try {
    const [sa, sb] = await Promise.all([fs.stat(a), fs.stat(b)]);
    return sa.mtimeMs > sb.mtimeMs;
  } catch {
    return true; // b missing -> treat source as newer
  }
}

async function makeBlur(input, w, h) {
  // 20px wide blurred WebP -> base64 data URI. Cheap, inlined in manifest.
  const ratioH = Math.max(1, Math.round((20 * h) / w));
  const buf = await sharp(input)
    .resize(20, ratioH, { fit: 'fill' })
    .blur(1.2)
    .webp({ quality: 40 })
    .toBuffer();
  return `data:image/webp;base64,${buf.toString('base64')}`;
}

async function run() {
  const files = await walk(SRC_DIR);
  const manifest = {};
  let generated = 0;
  let skipped = 0;

  for (const file of files) {
    const rel = path.relative(SRC_DIR, file); // e.g. ho-scale/1.png
    const srcKey = `/assets/images/${rel.split(path.sep).join('/')}`;
    const meta = await sharp(file).metadata();
    const srcW = meta.width || 1;
    const srcH = meta.height || 1;
    const base = rel.replace(IMG_EXT, '').split(path.sep).join('__'); // flat, collision-free
    const outSub = path.join(OUT_DIR);
    await fs.mkdir(outSub, { recursive: true });

    // Only emit widths <= source width (never upscale), always include the
    // smallest so tiny cards get tiny files; ensure at least one variant.
    let widths = WIDTHS.filter((w) => w <= srcW);
    if (widths.length === 0) widths = [srcW];
    if (!widths.includes(srcW) && srcW < WIDTHS[WIDTHS.length - 1]) {
      // include native width if it sits between our steps and is reasonably small
      if (srcW <= 1600) widths.push(srcW);
    }
    widths = Array.from(new Set(widths)).sort((a, b) => a - b);

    const variants = { avif: {}, webp: {} };

    for (const w of widths) {
      const h = Math.round((w * srcH) / srcW);
      for (const [fmt, opts] of [['avif', AVIF], ['webp', WEBP]]) {
        const outName = `${base}-${w}.${fmt}`;
        const outPath = path.join(outSub, outName);
        const publicPath = `/assets/opt/${outName}`;
        variants[fmt][w] = publicPath;
        if (!FORCE && !(await newerThan(file, outPath))) {
          skipped++;
          continue;
        }
        const pipe = sharp(file).resize(w, h, { fit: 'inside', withoutEnlargement: true });
        if (fmt === 'avif') await pipe.avif(opts).toFile(outPath);
        else await pipe.webp(opts).toFile(outPath);
        generated++;
      }
    }

    const blur = await makeBlur(file, srcW, srcH);

    manifest[srcKey] = {
      width: srcW,
      height: srcH,
      aspectRatio: +(srcW / srcH).toFixed(4),
      blur,
      widths,
      avif: variants.avif,
      webp: variants.webp,
      // fallback = largest webp (broadest support), used for <img src>
      fallback: variants.webp[widths[widths.length - 1]],
    };
  }

  // Sort keys for stable diffs
  const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));
  await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(sorted, null, 0));

  console.log(
    `[images] sources=${files.length} generated=${generated} skipped=${skipped} manifest=${Object.keys(sorted).length} entries`,
  );
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
