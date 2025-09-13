'use client'

import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { tepoztlanPlaces, getPriceSymbol } from '@/data/tepoztlan-places'

interface MapTiler3DProps {
  className?: string
  onPlaceSelect?: (placeId: string) => void
  selectedCategory?: string
  searchQuery?: string
}

export default function MapTiler3D({ 
  className = '', 
  onPlaceSelect,
  selectedCategory = 'all',
  searchQuery = ''
}: MapTiler3DProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)

  useEffect(() => {
    if (map.current || !mapContainer.current) return

    // MapTiler API key - replace with your actual key
    const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY || 'your-api-key-here'
    
    // Tepoztlán coordinates
    const TEPOZTLAN_CENTER: [number, number] = [-99.1017, 18.9847]

    try {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
        center: TEPOZTLAN_CENTER,
        zoom: 14,
        pitch: 60,
        maxPitch: 85,
        bearing: 0,
        attributionControl: false
      })

      map.current.on('load', () => {
        if (!map.current) return

        // Add 3D terrain source
        map.current.addSource('terrain', {
          type: 'raster-dem',
          url: `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${API_KEY}`
        })

        // Set 3D terrain
        map.current.setTerrain({
          source: 'terrain',
          exaggeration: 1.5
        })

        // Add 3D buildings layer using the cloned style
        map.current.addSource('openmaptiles', {
          type: 'vector',
          url: `https://api.maptiler.com/tiles/v3-openmaptiles/tiles.json?key=${API_KEY}`
        })

        // Add 3D building extrusion layer
        map.current.addLayer({
          id: 'building-3d',
          type: 'fill-extrusion',
          source: 'openmaptiles',
          'source-layer': 'building',
          filter: ['all', ['!has', 'hide_3d']],
          paint: {
            'fill-extrusion-color': [
              'case',
              ['has', 'colour'],
              ['get', 'colour'],
              'hsl(39, 41%, 86%)'
            ],
            'fill-extrusion-height': {
              property: 'render_height',
              type: 'identity'
            },
            'fill-extrusion-base': {
              property: 'render_min_height',
              type: 'identity'
            },
            'fill-extrusion-opacity': 0.8
          }
        })

        // Add markers for all places from data
        const categoryColors: Record<string, string> = {
          restaurant: '#f97316', // orange
          hotel: '#8b5cf6', // purple
          attraction: '#10b981', // emerald
          cafe: '#a78bfa', // violet
          shopping: '#ec4899', // pink
          culture: '#3b82f6', // blue
          bar: '#ef4444' // red
        }

        const categoryIcons: Record<string, string> = {
          restaurant: '🍽️',
          hotel: '🏨',
          attraction: '🏔️',
          cafe: '☕',
          shopping: '🛍️',
          culture: '🎨',
          bar: '🍺'
        }

        // Filter places based on category and search
        const filteredPlaces = tepoztlanPlaces.filter(place => {
          const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory
          const matchesSearch = !searchQuery || 
            place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            place.description.toLowerCase().includes(searchQuery.toLowerCase())
          return matchesCategory && matchesSearch
        })

        // Add markers for filtered places
        filteredPlaces.forEach(place => {
          const el = document.createElement('div')
          el.className = 'custom-marker'
          el.style.cssText = `
            background-color: ${categoryColors[place.category]};
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            transition: transform 0.2s;
          `
          el.innerHTML = categoryIcons[place.category]
          
          el.addEventListener('mouseenter', () => {
            el.style.transform = 'scale(1.2)'
          })
          el.addEventListener('mouseleave', () => {
            el.style.transform = 'scale(1)'
          })

          const popupContent = `
            <div style="min-width: 200px; font-family: system-ui, -apple-system, sans-serif;">
              <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">
                ${place.name}
              </h3>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span style="color: #facc15; font-size: 14px;">★ ${place.rating}</span>
                <span style="color: #6b7280; font-size: 14px;">•</span>
                <span style="color: #6b7280; font-size: 14px;">${getPriceSymbol(place.priceLevel)}</span>
              </div>
              <p style="margin: 0 0 8px 0; color: #4b5563; font-size: 13px; line-height: 1.4;">
                ${place.description.substring(0, 100)}...
              </p>
              ${place.address ? `
                <p style="margin: 0; color: #6b7280; font-size: 12px;">
                  📍 ${place.address}
                </p>
              ` : ''}
              ${place.hours ? `
                <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 12px;">
                  🕐 ${place.hours}
                </p>
              ` : ''}
            </div>
          `

          new maplibregl.Marker(el)
            .setLngLat(place.coordinates)
            .setPopup(
              new maplibregl.Popup({ 
                offset: 25,
                maxWidth: '300px'
              })
                .setHTML(popupContent)
            )
            .addTo(map.current!)

          // Add click handler for place selection
          el.addEventListener('click', () => {
            if (onPlaceSelect) {
              onPlaceSelect(place.id)
            }
          })
        })

        // Add navigation controls
        map.current.addControl(new maplibregl.NavigationControl(), 'top-right')
        
        // Add terrain control
        map.current.addControl(
          new maplibregl.TerrainControl({
            source: 'terrain',
            exaggeration: 1.5
          }),
          'top-right'
        )
      })

      map.current.on('error', (e) => {
        console.warn('MapTiler 3D error:', e.error)
      })

    } catch (error) {
      console.error('Failed to initialize MapTiler 3D:', error)
    }

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [onPlaceSelect, selectedCategory, searchQuery])

  return (
    <div 
      ref={mapContainer} 
      className={`w-full h-full ${className}`}
      style={{ minHeight: '700px' }}
    />
  )
}