# MapTiler 3D Implementation Guide

## Overview
Successfully implemented 3D mapping functionality using MapTiler and MapLibre GL JS in the Tepoztlán website.

## What was implemented

### 1. 3D Map Component (`src/components/map/MapTiler3D.tsx`)
- **3D Terrain**: Added terrain visualization with 1.5x exaggeration for dramatic topography
- **3D Buildings**: Implemented building extrusion layers with proper height rendering
- **Custom Markers**: Added markers for key Tepoztlán locations (Centro and Pirámide del Tepozteco)
- **Interactive Controls**: Navigation controls and terrain controls
- **Tepoztlán Focus**: Centered on Tepoztlán coordinates with optimal view settings

### 2. Integration with EnhancedMapSection
- **Dynamic Loading**: Map loads client-side only (SSR disabled)
- **Loading State**: Beautiful loading placeholder while map initializes
- **Responsive Design**: Maintains 700px height and responsive layout
- **Seamless Integration**: Replaces red placeholder with fully functional 3D map

### 3. Dependencies Added
- **maplibre-gl**: Latest version for 3D mapping capabilities
- **maplibre-gl CSS**: Required styling for map components

### 4. Configuration
- **Environment Variable**: `NEXT_PUBLIC_MAPTILER_API_KEY` in `.env.local`
- **Demo Key**: Includes placeholder key with instructions to get real key
- **Error Handling**: Graceful fallbacks for API failures

## Key Features

### 3D Visualization
- **Terrain Rendering**: Real topographic data with height exaggeration
- **Building Extrusion**: 3D buildings based on OpenMapTiles data
- **Custom Styling**: Uses MapTiler's Streets v2 style as base
- **Optimal Viewing**: 60° pitch, 85° max pitch for dramatic 3D effect

### Tepoztlán-Specific Features
- **Centered on Tepoztlán**: Coordinates [-99.1017, 18.9847]
- **Zoom Level 14**: Perfect detail level for the town
- **Key Landmarks**: Markers for town center and Tepozteco Pyramid
- **Local Context**: Showcases the mountainous terrain around Tepoztlán

### Performance Optimizations
- **Dynamic Import**: Reduces initial bundle size
- **SSR Disabled**: Prevents server-side rendering issues
- **Error Boundaries**: Handles initialization failures gracefully
- **Memory Management**: Proper cleanup on component unmount

## Technical Implementation

### Map Configuration
```typescript
center: [-99.1017, 18.9847], // Tepoztlán coordinates
zoom: 14,
pitch: 60,
maxPitch: 85,
bearing: 0
```

### 3D Terrain Setup
```typescript
map.addSource('terrain', {
  type: 'raster-dem',
  url: `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${API_KEY}`
})

map.setTerrain({
  source: 'terrain',
  exaggeration: 1.5
})
```

### Building Extrusion
```typescript
map.addLayer({
  id: 'building-3d',
  type: 'fill-extrusion',
  source: 'openmaptiles',
  'source-layer': 'building',
  paint: {
    'fill-extrusion-height': { property: 'render_height', type: 'identity' },
    'fill-extrusion-base': { property: 'render_min_height', type: 'identity' },
    'fill-extrusion-opacity': 0.8
  }
})
```

## API Key Setup
1. Visit https://cloud.maptiler.com/ 
2. Create free account
3. Get API key from dashboard
4. Replace `get_your_own_OpIi9ZULNHzrESv6T2vL` in `.env.local`

## Testing
- ✅ Component loads without errors
- ✅ 3D terrain renders correctly  
- ✅ Building extrusion works
- ✅ Custom markers display
- ✅ Navigation controls functional
- ✅ Responsive design maintained
- ✅ Loading states work properly

## Future Enhancements
- Add more detailed Tepoztlán POI markers
- Implement custom building colors based on type
- Add route planning functionality
- Include hiking trails overlay
- Integrate with Tepoztlán business data

## Files Modified
- `src/components/map/MapTiler3D.tsx` (NEW)
- `src/components/sections/EnhancedMapSection.tsx` (UPDATED)
- `.env.local` (UPDATED)
- `package.json` (maplibre-gl dependency added)

The 3D map implementation is now live and ready for use! 🗺️✨