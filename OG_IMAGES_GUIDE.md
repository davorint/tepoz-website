# Open Graph Images Guide

This document outlines how to generate and manage Open Graph (OG) images for TodoTepoz.

## What are Open Graph Images?

Open Graph images are the preview images that appear when you share a link on social media platforms like Facebook, Twitter/X, LinkedIn, WhatsApp, etc.

## Current Implementation

The website already includes basic OG metadata in pages. To add custom OG images:

### Option 1: Static OG Images (Recommended for MVP)

1. Create OG images manually using design tools:
   - Dimensions: 1200x630px (recommended)
   - Format: PNG or JPG
   - File size: < 1MB

2. Save images to `/public/og/`:
   ```
   /public/og/
   ├── home-es.jpg
   ├── home-en.jpg
   ├── restaurants.jpg
   ├── hotels.jpg
   ├── experiences.jpg
   └── events.jpg
   ```

3. Reference in metadata:
   ```typescript
   export const metadata: Metadata = {
     openGraph: {
       images: ['/og/restaurants.jpg'],
     },
   }
   ```

### Option 2: Dynamic OG Images with @vercel/og

For programmatically generated images:

1. Install package:
   ```bash
   npm install @vercel/og
   ```

2. Create API route `/app/api/og/route.tsx`:
   ```typescript
   import { ImageResponse } from '@vercel/og'

   export async function GET(request: Request) {
     const { searchParams } = new URL(request.url)
     const title = searchParams.get('title') || 'TodoTepoz'

     return new ImageResponse(
       (
         <div
           style={{
             background: 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)',
             width: '100%',
             height: '100%',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             color: 'white',
             fontSize: 60,
             fontWeight: 'bold',
           }}
         >
           {title}
         </div>
       ),
       {
         width: 1200,
         height: 630,
       }
     )
   }
   ```

3. Use in metadata:
   ```typescript
   export const metadata: Metadata = {
     openGraph: {
       images: [`/api/og?title=${encodeURIComponent(title)}`],
     },
   }
   ```

### Option 3: Use Cloudinary or Similar Service

1. Upload base template to Cloudinary
2. Use URL transformations to add text overlays
3. Example:
   ```
   https://res.cloudinary.com/demo/image/upload/
   l_text:Arial_60_bold:TodoTepoz,co_white/
   og-template.jpg
   ```

## Twitter Cards

Add Twitter-specific metadata:

```typescript
export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    images: ['/og/restaurants.jpg'],
  },
}
```

## Testing OG Images

1. **Facebook Debugger**: https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

## Priority Pages for OG Images

1. **Homepage** - Both ES and EN
2. **Main Categories**:
   - Restaurants
   - Hotels
   - Experiences
   - Events
3. **Top Businesses** (top 10 most popular)
4. **About/Info Pages**

## Design Guidelines

- **Brand Colors**: Use TodoTepoz orange (#d97706, #ea580c)
- **Typography**: Clear, readable fonts (minimum 40px for body text)
- **Logo**: Include TodoTepoz logo/branding
- **Imagery**: Use high-quality Tepoztlán photos
- **Text**: Keep titles under 60 characters
- **Contrast**: Ensure text is readable on background

## TODO

- [ ] Design OG image templates
- [ ] Generate static images for main pages
- [ ] Implement dynamic generation for business pages
- [ ] Test across all platforms
- [ ] Add to deployment checklist
