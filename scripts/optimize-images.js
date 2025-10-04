// eslint-disable-next-line @typescript-eslint/no-require-imports
const sharp = require('sharp');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs').promises;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'optimized');

// Images larger than 300KB to optimize
const IMAGES_TO_OPTIMIZE = [
  'home-ecoposada-tepoztli.jpg', // 1.8MB
  'MercadoTepoztlan.jpg', // 1.1MB
  'cerroVentana.jpg', // 628KB
  'senderoNahuatl.jpg', // 694KB
  'TallerAlfareria.jpg', // 462KB
  'carnaval.jpg', // 383KB
  'mirador-valle.jpg', // 335KB
  'equinox.jpg', // 310KB
  'favicon.png', // 1.2MB
  'jazz.jpg', // 267KB
];

async function optimizeImage(filename) {
  const inputPath = path.join(PUBLIC_DIR, filename);
  const ext = path.extname(filename);
  const basename = path.basename(filename, ext);

  console.log(`Optimizing ${filename}...`);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`  Original: ${metadata.width}x${metadata.height}, ${metadata.format}`);

    // Generate WebP version (best compression, wide browser support)
    await image
      .resize(metadata.width > 2000 ? 2000 : undefined, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: 85, effort: 6 })
      .toFile(path.join(OUTPUT_DIR, `${basename}.webp`));

    console.log(`  ✓ Created ${basename}.webp`);

    // Generate AVIF version (better compression, modern browsers)
    await image
      .resize(metadata.width > 2000 ? 2000 : undefined, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .avif({ quality: 80, effort: 6 })
      .toFile(path.join(OUTPUT_DIR, `${basename}.avif`));

    console.log(`  ✓ Created ${basename}.avif`);

    // Generate optimized JPEG/PNG fallback
    if (ext === '.png') {
      await image
        .resize(metadata.width > 2000 ? 2000 : undefined, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .png({ quality: 90, compressionLevel: 9 })
        .toFile(path.join(OUTPUT_DIR, `${basename}-optimized.png`));
      console.log(`  ✓ Created ${basename}-optimized.png`);
    } else {
      await image
        .resize(metadata.width > 2000 ? 2000 : undefined, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: 85, progressive: true })
        .toFile(path.join(OUTPUT_DIR, `${basename}-optimized.jpg`));
      console.log(`  ✓ Created ${basename}-optimized.jpg`);
    }

    const originalSize = (await fs.stat(inputPath)).size;
    const webpSize = (await fs.stat(path.join(OUTPUT_DIR, `${basename}.webp`))).size;
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);

    console.log(`  💾 Size reduction: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(webpSize / 1024 / 1024).toFixed(2)}MB (${savings}% smaller)\n`);

  } catch (error) {
    console.error(`  ❌ Error optimizing ${filename}:`, error.message);
  }
}

async function main() {
  console.log('🖼️  Image Optimization Script\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Create output directory if it doesn't exist
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Output directory: ${OUTPUT_DIR}\n`);
  } catch (error) {
    console.error('❌ Failed to create output directory:', error);
    process.exit(1);
  }

  // Optimize each image
  for (const filename of IMAGES_TO_OPTIMIZE) {
    await optimizeImage(filename);
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Image optimization complete!\n');
  console.log('📖 Usage in Next.js:');
  console.log('   <picture>');
  console.log('     <source srcSet="/optimized/image.avif" type="image/avif" />');
  console.log('     <source srcSet="/optimized/image.webp" type="image/webp" />');
  console.log('     <img src="/optimized/image-optimized.jpg" alt="..." />');
  console.log('   </picture>\n');
}

main().catch(console.error);
