# OpenGraph Images - Required

## Missing Images

The following OpenGraph images are referenced in the app but don't exist:

### 1. Main OpenGraph Image
**File**: `og-tepoztlan-hero.jpg`
**Size**: 1200×630 pixels
**Format**: JPEG (optimized, ~200KB max)
**Usage**: Facebook, LinkedIn, general social media shares

**Requirements**:
- Show Tepozteco Pyramid or iconic Tepoztlán view
- Include text: "Tepoztlán - Pueblo Mágico"
- Add logo/branding
- Ensure text is readable at small sizes
- Safe zone: Keep important content away from edges

**Referenced in**: `src/app/layout.tsx:69`

### 2. Twitter Card Image
**File**: `twitter-tepoztlan-hero.jpg`
**Size**: 1200×675 pixels (16:9 aspect ratio)
**Format**: JPEG (optimized, ~200KB max)
**Usage**: Twitter large card format

**Requirements**:
- Same visual style as og-tepoztlan-hero.jpg
- Adjusted aspect ratio for Twitter
- Text should be larger/bolder for Twitter feed

**Referenced in**: `src/app/layout.tsx:81`

## Design Guidelines

### Brand Colors
- Primary: Amber (#f59e0b)
- Background: White or mountain imagery
- Text: Dark (high contrast)

### Typography
- Heading: Bebas Neue or Montserrat Bold
- Subheading: Montserrat Regular
- Keep text minimal and readable

### Content Suggestions

**Main headline options**:
- "Descubre Tepoztlán"
- "Pueblo Mágico de Morelos"
- "Tepoztlán Tourism Guide"

**Imagery**:
- Tepozteco Pyramid silhouette
- Mountain landscape
- Traditional architecture
- Combination of natural + cultural elements

## Tools for Creation

### Online Tools
1. **Canva** (easiest)
   - Template: "Facebook Post" (1200×630)
   - Template: "Twitter Post" (1200×675)
   - Upload your own images or use stock

2. **Figma** (professional)
   - Create artboard 1200×630
   - Export as JPEG (80% quality)

3. **PhotoPea** (free Photoshop alternative)
   - Create new image with dimensions
   - Add layers and export

### AI Image Generation (Optional)
Use Midjourney, DALL-E, or Stable Diffusion with prompt:
```
"Tepoztlan Mexico pueblo magico, Tepozteco pyramid on mountain, mystical atmosphere,
golden hour lighting, professional tourism photography, 1200x630 aspect ratio"
```

## Image Optimization

After creating, optimize before adding to project:

```bash
# Using ImageMagick
convert og-tepoztlan-hero.jpg -quality 85 -strip og-tepoztlan-hero-optimized.jpg

# Using online tools
# - TinyPNG: https://tinypng.com/
# - Squoosh: https://squoosh.app/
```

Target: <250KB per image

## Validation

After adding images, test with:

1. **Facebook Sharing Debugger**
   - https://developers.facebook.com/tools/debug/
   - Enter: https://tepoztlan.com
   - Check if image loads correctly

2. **Twitter Card Validator**
   - https://cards-dev.twitter.com/validator
   - Enter URL and validate

3. **LinkedIn Post Inspector**
   - https://www.linkedin.com/post-inspector/
   - Validate OG image appears

## Quick Start (Placeholder)

If you need a quick placeholder:

1. Use an existing image from `/public/`:
   - `casaAmates.jpeg` (108KB) ✅
   - `cerroVentana.jpg` (642KB) - needs optimization
   - `equinox.jpg` (317KB) - needs optimization

2. Resize to 1200×630:
   ```bash
   # Using ImageMagick
   convert cerroVentana.jpg -resize 1200x630^ -gravity center -extent 1200x630 og-tepoztlan-hero.jpg
   ```

3. Add text overlay in Canva or Photoshop

## Current Status

- [ ] og-tepoztlan-hero.jpg (1200×630)
- [ ] twitter-tepoztlan-hero.jpg (1200×675)

Once created, place files in: `/public/images/`

## References

- [OpenGraph Protocol](https://ogp.me/)
- [Twitter Card Docs](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Facebook Sharing Best Practices](https://developers.facebook.com/docs/sharing/webmasters/)
