# OG Image Templates

This folder contains design templates and source files for Open Graph images.

## Template Files

### Default Template (1200x630px)
- **File:** `og-default-template.png`
- **Usage:** Fallback for pages without specific OG images
- **Design:** TodoTepoz branding with Tepozteco pyramid

### Category Templates
- `og-food-drink.png` - Restaurants, cafes, bars
- `og-stay.png` - Hotels, eco-lodges, rentals
- `og-experience.png` - Tours, activities, adventures
- `og-events.png` - Festivals, cultural events
- `og-discover.png` - Villages, landmarks, nature

## Design Assets

### Figma
Link to Figma designs: [Add your Figma link here]

### Source Images
- `tepozteco-pyramid-overlay.jpg` - Main landmark photo
- `logo-white.png` - TodoTepoz logo (white version)
- `logo-orange.png` - TodoTepoz logo (orange version)

## Color Palette
```css
--primary-orange: #d97706
--secondary-orange: #ea580c
--dark-bg: #1f2937
--light-text: #ffffff
--gradient: linear-gradient(135deg, #d97706 0%, #ea580c 100%)
```

## Exporting Guidelines

1. **Resolution:** 1200x630px
2. **Format:** PNG (with transparency if needed) or JPEG
3. **Compression:** Optimize with tools like TinyPNG
4. **Naming:** `opengraph-image.png` for Next.js auto-detection
5. **File Size:** Keep under 300KB for faster loading

## Placement

After creating OG images, place them in the appropriate app directory:

```
src/app/[lang]/
├── opengraph-image.png
├── food-drink/
│   └── opengraph-image.png
├── stay/
│   └── opengraph-image.png
└── experience/
    └── opengraph-image.png
```

Next.js will automatically detect and use these images for social sharing.
