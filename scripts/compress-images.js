import sharp from "sharp";
import { stat, rename, unlink } from "node:fs/promises";

async function sizeKB(path) {
  const s = await stat(path);
  return Math.round(s.size / 1024);
}

async function compress({ input, tmp, pipeline, label }) {
  const beforeKB = await sizeKB(input);
  await pipeline(sharp(input)).toFile(tmp);
  const afterKB = await sizeKB(tmp);
  console.log(`${label}: ${beforeKB} KB → ${afterKB} KB`);
  if (afterKB < beforeKB) {
    await unlink(input);
    await rename(tmp, input);
    console.log(`  ✓ replaced ${input}`);
  } else {
    await unlink(tmp);
    console.log(`  ✗ kept original (compressed copy was not smaller)`);
  }
}

await compress({
  input: "src/assets/warehouse-hero.jpg",
  tmp: "src/assets/warehouse-hero.tmp.jpg",
  label: "warehouse-hero.jpg",
  // Hero sits behind multiple darkening overlays in Hero.tsx, so we can drop
  // resolution + quality further than usual. WebP/AVIF would push this under
  // 100 KB but belongs in TASK-020's srcset work.
  pipeline: (img) =>
    img
      .resize(1600, null, { withoutEnlargement: true })
      .jpeg({ quality: 60, progressive: true, mozjpeg: true }),
});

await compress({
  input: "src/assets/kangaroo-logo.png",
  tmp: "src/assets/kangaroo-logo.tmp.png",
  label: "kangaroo-logo.png",
  pipeline: (img) =>
    img
      .resize(512, null, { withoutEnlargement: true })
      .png({ compressionLevel: 9, quality: 80, palette: true }),
});
