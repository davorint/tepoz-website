'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Restaurant data for markers
const restaurants = [
  {
    id: 1,
    name: "La Veladora",
    category: "mexican",
    position: [-99.1017, 18.9847] as [number, number],
    rating: 4.5,
    description: "Traditional Mexican cuisine in the heart of Tepoztlán"
  },
  {
    id: 2,
    name: "El Ciruelo",
    category: "international",
    position: [-99.1025, 18.9855] as [number, number],
    rating: 4.3,
    description: "International fusion with local ingredients"
  },
  {
    id: 3,
    name: "Casa de las Flores",
    category: "vegetarian",
    position: [-99.1010, 18.9840] as [number, number],
    rating: 4.7,
    description: "Garden-to-table vegetarian experience"
  },
  {
    id: 4,
    name: "Tepoznieves",
    category: "desserts",
    position: [-99.1020, 18.9850] as [number, number],
    rating: 4.6,
    description: "Artisanal ice cream and local treats"
  }
]

interface MapboxMapProps {
  className?: string
}

export default function MapboxMap({ className = '' }: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  // Set Mapbox access token
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    if (!mapboxgl.accessToken) {
      console.error('Mapbox access token not found')
      return
    }

    // Initialize Mapbox map
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-99.1017, 18.9847], // Tepoztlán coordinates
      zoom: 14,
      attributionControl: false
    })

    map.current = mapInstance

    // Add navigation controls according to API documentation
    mapInstance.addControl(new mapboxgl.NavigationControl({
      showCompass: true,
      showZoom: true,
      visualizePitch: true
    }), 'top-right')
    
    // Add fullscreen control exactly like official documentation
    mapInstance.addControl(new mapboxgl.FullscreenControl())

    mapInstance.on('load', () => {
      console.log('Mapbox map loaded successfully')

      // Add sky layer for better 3D appearance
      mapInstance.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 0.0],
          'sky-atmosphere-sun-intensity': 15
        }
      })

      // Method 1: Add individual markers using Mapbox marker API
      const categoryColors: Record<string, string> = {
        mexican: '#e53e3e',
        international: '#3182ce',
        vegetarian: '#38a169',
        desserts: '#d69e2e'
      }

      restaurants.forEach((restaurant) => {
        // Create custom marker element
        const el = document.createElement('div')
        el.className = 'custom-marker'
        el.style.cssText = `
          background-color: ${categoryColors[restaurant.category] || '#718096'};
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #ffffff;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        `

        // Create marker with proper Mapbox API
        new mapboxgl.Marker({
          element: el,
          anchor: 'center'
        })
          .setLngLat(restaurant.position)
          .addTo(mapInstance)

        // Add click handler to marker element
        el.addEventListener('click', (e) => {
          e.stopPropagation()
          
          new mapboxgl.Popup({ offset: 25 })
            .setLngLat(restaurant.position)
            .setHTML(`
              <div class="p-3">
                <h3 class="font-bold text-lg mb-2">${restaurant.name}</h3>
                <p class="text-sm text-gray-600 mb-2">${restaurant.description}</p>
                <div class="flex justify-between items-center">
                  <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">${restaurant.category}</span>
                  <span class="text-yellow-500">⭐ ${restaurant.rating}</span>
                </div>
              </div>
            `)
            .addTo(mapInstance)
        })
      })

      // Method 2: Also add layers for comparison (positioned slightly offset)
      const restaurantGeoJSON = {
        type: 'FeatureCollection' as const,
        features: restaurants.map(restaurant => ({
          type: 'Feature' as const,
          geometry: {
            type: 'Point' as const,
            coordinates: [restaurant.position[0] + 0.0005, restaurant.position[1] + 0.0005] // Slight offset
          },
          properties: {
            id: restaurant.id,
            name: restaurant.name,
            category: restaurant.category,
            rating: restaurant.rating,
            description: restaurant.description
          }
        }))
      }

      // Add source for restaurant data
      mapInstance.addSource('restaurants', {
        type: 'geojson',
        data: restaurantGeoJSON
      })

      // Add circle layer for restaurant points
      mapInstance.addLayer({
        id: 'restaurant-points',
        type: 'circle',
        source: 'restaurants',
        paint: {
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            10, 6,
            16, 10
          ],
          'circle-color': [
            'match',
            ['get', 'category'],
            'mexican', '#e53e3e',
            'international', '#3182ce',
            'vegetarian', '#38a169',
            'desserts', '#d69e2e',
            '#718096'
          ],
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
          'circle-opacity': 0.6
        }
      })

      // Add click handlers for layer points
      mapInstance.on('click', 'restaurant-points', (e) => {
        if (!e.features?.[0]) return

        const feature = e.features[0]
        const coordinates = (feature.geometry as GeoJSON.Point).coordinates.slice()
        const { name, category, rating, description } = feature.properties || {}

        // Ensure coordinates are valid
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates as [number, number])
          .setHTML(`
            <div class="p-3">
              <h3 class="font-bold text-lg mb-2">${name} (Layer)</h3>
              <p class="text-sm text-gray-600 mb-2">${description}</p>
              <div class="flex justify-between items-center">
                <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">${category}</span>
                <span class="text-yellow-500">⭐ ${rating}</span>
              </div>
            </div>
          `)
          .addTo(mapInstance)
      })

      // Change cursor on hover
      mapInstance.on('mouseenter', 'restaurant-points', () => {
        mapInstance.getCanvas().style.cursor = 'pointer'
      })

      mapInstance.on('mouseleave', 'restaurant-points', () => {
        mapInstance.getCanvas().style.cursor = ''
      })
    })

    return () => {
      mapInstance.remove()
      map.current = null
    }
  }, [])

  return (
    <div 
      className={`relative w-full h-full ${className}`}
      style={{ minHeight: '600px' }}
    >
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200 z-10">
        <h4 className="font-semibold text-sm mb-3">Restaurant Categories</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 border border-white"></div>
            <span>Mexican</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 border border-white"></div>
            <span>International</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 border border-white"></div>
            <span>Vegetarian</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500 border border-white"></div>
            <span>Desserts</span>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t text-xs text-gray-600">
          <div>• Small circles: Individual markers</div>
          <div>• Large circles: Layer-based points</div>
        </div>
      </div>

      {/* Map Container */}
      <div 
        ref={mapContainer}
        className="w-full h-full"
        style={{ 
          minHeight: '600px'
        }}
      />
    </div>
  )
}