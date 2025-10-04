const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'optimized');

// Images that need optimization (>300KB)
const IMAGES_TO_OPTIMIZE = [
  'home-ecoposada-tepoztli.jpg', // 1.8MB
  'MercadoTepoztlan.jpg', // 1.1MB
  'tepozteco-pyramid.jpg', // 861KB
  'tallerCeramica.jpg', // 801KB
  'senderoNahuatl.jpg', // 694KB
  'tepozteco.png', // 659KB
  'cerroVentana.jpg', // 628KB
  'TallerAlfareria.jpg', // 462KB
  'carnaval.jpg', // 383KB
  'mirador-valle.jpg', // 335KB
  'tepoztlan-hero.jpg', // 335KB
  'equinox.jpg', // 310KB
];

async function optimizeImage(filename) {
  const inputPath = path.join(PUBLIC_DIR, filename);
  const ext = path.extname(filename);
  const basename = path.basename(filename, ext);

  console.log(`Optimizing ${filename}...`);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Generate WebP version (best compression)
    await image
      .resize(metadata.width > 2000 ? 2000 : undefined, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: 85, effort: 6 })
      .toFile(path.join(OUTPUT_DIR, `${basename}.webp`));

    // Generate AVIF version (even better compression, but less support)
    await image
      .resize(metadata.width > 2000 ? 2000 : undefined, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .avif({ quality: 80, effort: 6 })
      .toFile(path.join(OUTPUT_DIR, `${basename}.avif`));

    // Generate optimized JPEG fallback
    await image
      .resize(metadata.width > 2000 ? 2000 : undefined, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ quality: 85, progressive: true })
      .toFile(path.join(OUTPUT_DIR, `${basename}-optimized.jpg`));

    console.log(`✓ ${filename} optimized successfully`);
  } catch (error) {
    console.error(`✗ Error optimizing ${filename}:`, error.message);
  }
}

async function main() {
  console.log('Starting image optimization...\n');

  // Create output directory if it doesn't exist
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
  } catch (error) {
    // Directory already exists
  }

  // Optimize all images
  for (const filename of IMAGES_TO_OPTIMIZE) {
    await optimizeImage(filename);
  }

  console.log('\n✓ Image optimization complete!');
  console.log(`Optimized images saved to: ${OUTPUT_DIR}`);
  console.log('\nNext steps:');
  console.log('1. Review optimized images in /public/optimized/');
  console.log('2. Replace original images with optimized versions');
  console.log('3. Use Next.js Image component with priority for above-the-fold images');
}

main().catch(console.error);
