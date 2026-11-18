// Upscales the design photos 2× (Lanczos3 + light sharpening) for sharper display on high-DPI screens.
// Originals are kept in content/original-images/. This improves smoothness and edges but cannot add real
// detail — replace with the photographer's full-resolution files in CMS › Media when available.
// Usage: node scripts/upscale-images.mjs
import sharp from 'sharp';
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const FILES = ['hero-founders.webp', 'dr-archana-shinde.webp', 'dr-jeevan-shinde.webp', 'gut-reset-guide-cover.webp'];
const SRC = 'public/images';
const KEEP = 'content/original-images';
mkdirSync(KEEP, { recursive: true });

for (const f of FILES) {
  const orig = path.join(KEEP, f);
  if (!existsSync(orig)) copyFileSync(path.join(SRC, f), orig); // always upscale from the untouched original
  const meta = await sharp(orig).metadata();
  const out = path.join(SRC, f);
  await sharp(orig)
    .resize({ width: meta.width * 2, height: meta.height * 2, kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.8, m1: 0.6, m2: 2 })
    .webp({ quality: 92, smartSubsample: true, effort: 6 })
    .toFile(out + '.tmp');
  const { renameSync, statSync } = await import('node:fs');
  renameSync(out + '.tmp', out);
  const m2 = await sharp(out).metadata();
  console.log(`${f}: ${meta.width}×${meta.height} → ${m2.width}×${m2.height} (${Math.round(statSync(out).size / 1024)} KB)`);
}
