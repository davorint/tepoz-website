# MapTiler Setup for Tepoztlán Website

## Overview

The map page has been updated to use **MapTiler SDK** with **OpenMapTiles 3D style** instead of the previous mapping solution. This provides enhanced 3D building visualization and better performance.

## Features

- ✅ **3D Buildings**: Realistic 3D building extrusions
- ✅ **HD Terrain**: High-definition terrain visualization  
- ✅ **OpenStreetMap Data**: Community-maintained, accurate data
- ✅ **Custom Markers**: Business location markers with popups
- ✅ **Interactive Controls**: Navigation, zoom, and layer controls
- ✅ **Responsive Design**: Works on all device sizes

## API Key Setup

### 1. Get Your MapTiler API Key

1. Go to [MapTiler Cloud](https://cloud.maptiler.com/)
2. Sign up for a free account
3. Navigate to Account → Keys
4. Copy your API key

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your MapTiler API key to `.env.local`:
   ```env
   NEXT_PUBLIC_MAPTILER_API_KEY=your_actual_api_key_here
   ```

⚠️ **Important**: Never commit your actual API key to git. The `.env.local` file is already ignored by git.

## Component Usage

### Basic Usage

```tsx
import MapTilerComponent from '@/components/map/MapTilerComponent'

<MapTilerComponent
  center={[-99.0965, 18.9843]} // Tepoztlán coordinates
  zoom={15}
  pitch={45}
  bearing={0}
  onMapLoad={(map) => console.log('Map loaded:', map)}
/>
```

### With Business Markers

```tsx
import { createBusinessMarker } from '@/components/map/MapTilerComponent'

const markers = businesses.map(business => 
  createBusinessMarker({
    id: business.id,
    name: business.name,
    description: business.description,
    coordinates: business.coordinates as [number, number],
    category: business.category
  })
)

<MapTilerComponent
  markers={markers}
  onMapLoad={handleMapLoad}
/>
```

## Available Components

### `MapTilerComponent`
Main map component with 3D OpenMapTiles style.

**Props:**
- `center?: [number, number]` - Map center coordinates
- `zoom?: number` - Initial zoom level
- `pitch?: number` - 3D tilt angle (0-60)
- `bearing?: number` - Map rotation
- `markers?: Marker[]` - Array of markers to display
- `onMapLoad?: (map: Map) => void` - Callback when map loads
- `className?: string` - CSS classes

### `createBusinessMarker`
Utility function to create business markers with category-specific colors.

## Map Style

The map uses the **OpenMapTiles 3D style** which includes:
- Vector-based rendering for sharp graphics
- 3D building extrusions
- Customizable layers and styling
- Support for multiple languages
- Optimized for performance

## File Structure

```
src/
├── components/map/
│   └── MapTilerComponent.tsx     # Main map component
├── lib/
│   └── maptiler-3d-style.ts     # OpenMapTiles 3D style definition
├── .env.example                  # Environment variables template
└── .env.local                   # Your local environment variables (gitignored)
```

## Troubleshooting

### Map not loading
- Check that your API key is correctly set in `.env.local`
- Ensure the environment variable name is `NEXT_PUBLIC_MAPTILER_API_KEY`
- Restart your development server after changing environment variables

### TypeScript errors
- Make sure coordinates are typed as `[number, number]` (tuple, not array)
- Use `as [number, number]` type assertion if needed

### Build errors
- Check that all dependencies are properly imported
- Ensure the MapTiler SDK CSS is imported: `@maptiler/sdk/dist/maptiler-sdk.css`

## Migration Notes

The previous OpenLayers implementation has been replaced with MapTiler SDK:
- ✅ Better 3D visualization
- ✅ Improved performance
- ✅ More modern API
- ✅ Better TypeScript support
- ✅ Enhanced mobile experience

## Development

To test the map locally:

1. Set up your API key as described above
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Navigate to `/map` to see the interactive map

## Production Deployment

When deploying to production:

1. Set the `NEXT_PUBLIC_MAPTILER_API_KEY` environment variable on your hosting platform
2. The map will automatically use the production API key
3. Monitor API usage in your MapTiler dashboard

## Support

- [MapTiler Documentation](https://docs.maptiler.com/)
- [OpenMapTiles Schema](https://openmaptiles.org/schema/)
- [MapTiler SDK Examples](https://docs.maptiler.com/sdk-js/examples/)