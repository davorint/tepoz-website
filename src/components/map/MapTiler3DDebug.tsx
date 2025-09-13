'use client'

import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { tepoztlanPlaces, getPriceSymbol } from '@/data/tepoztlan-places'

interface MapTiler3DDebugProps {
  className?: string
  onPlaceSelect?: (placeId: string) => void
  selectedCategory?: string
  searchQuery?: string
}

export default function MapTiler3DDebug({ 
  className = '', 
  onPlaceSelect,
  selectedCategory = 'all',
  searchQuery = ''
}: MapTiler3DDebugProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const markers = useRef<maplibregl.Marker[]>([])

  // Category colors and icons
  const categoryColors: Record<string, string> = {
    restaurant: '#f97316',
    hotel: '#8b5cf6',
    attraction: '#10b981',
    cafe: '#a78bfa',
    shopping: '#ec4899',
    culture: '#3b82f6',
    bar: '#ef4444'
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

  // Function to clear existing markers
  const clearMarkers = () => {
    console.log('Clearing markers, count:', markers.current.length)
    markers.current.forEach(marker => marker.remove())
    markers.current = []
  }

  // Function to add markers
  const addMarkers = () => {
    console.log('addMarkers called')
    
    if (!map.current) {
      console.log('Map not initialized yet')
      return
    }

    if (!map.current.loaded()) {
      console.log('Map not loaded yet')
      return
    }

    console.log('Total places available:', tepoztlanPlaces.length)
    console.log('Selected category:', selectedCategory)
    console.log('Search query:', searchQuery)

    // Clear existing markers first
    clearMarkers()

    // Filter places based on category and search
    const filteredPlaces = tepoztlanPlaces.filter(place => {
      const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory
      const matchesSearch = !searchQuery || 
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })

    console.log('Filtered places count:', filteredPlaces.length)
    console.log('Filtered places:', filteredPlaces.map(p => p.name))

    // Add markers for filtered places
    filteredPlaces.forEach((place, index) => {
      console.log(`Adding marker ${index + 1}:`, place.name, 'at', place.coordinates)
      
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
        z-index: 1000;
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

      try {
        const marker = new maplibregl.Marker(el)
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
          console.log('Marker clicked:', place.name)
          if (onPlaceSelect) {
            onPlaceSelect(place.id)
          }
        })

        // Store marker reference
        markers.current.push(marker)
        
        console.log(`Marker ${index + 1} added successfully for`, place.name)
      } catch (error) {
        console.error(`Error adding marker for ${place.name}:`, error)
      }
    })
    
    console.log('Total markers added:', markers.current.length)
  }

  // Initialize map
  useEffect(() => {
    console.log('Map initialization useEffect triggered')
    
    if (map.current || !mapContainer.current) {
      console.log('Map already initialized or container not available')
      return
    }

    const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY || 'your-api-key-here'
    console.log('Using API key:', API_KEY.substring(0, 10) + '...')
    
    const TEPOZTLAN_CENTER: [number, number] = [-99.1017, 18.9847]
    console.log('Map center:', TEPOZTLAN_CENTER)

    try {
      console.log('Creating MapLibre instance...')
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

      console.log('Map instance created')

      map.current.on('load', () => {
        console.log('🗺️ Map loaded successfully!')
        
        if (!map.current) return

        try {
          // Add 3D terrain source
          console.log('Adding terrain source...')
          map.current.addSource('terrain', {
            type: 'raster-dem',
            url: `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${API_KEY}`
          })

          // Set 3D terrain
          console.log('Setting 3D terrain...')
          map.current.setTerrain({
            source: 'terrain',
            exaggeration: 1.5
          })

          // Add 3D buildings layer
          console.log('Adding 3D buildings...')
          map.current.addSource('openmaptiles', {
            type: 'vector',
            url: `https://api.maptiler.com/tiles/v3-openmaptiles/tiles.json?key=${API_KEY}`
          })

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

          // Add navigation controls
          console.log('Adding navigation controls...')
          map.current.addControl(new maplibregl.NavigationControl(), 'top-right')
          
          // Add terrain control
          map.current.addControl(
            new maplibregl.TerrainControl({
              source: 'terrain',
              exaggeration: 1.5
            }),
            'top-right'
          )

          console.log('All map features added, now adding markers...')
          // Add initial markers
          addMarkers()
          
        } catch (terrainError) {
          console.error('Error setting up 3D features:', terrainError)
          console.log('Adding markers without 3D features...')
          addMarkers()
        }
      })

      map.current.on('error', (e) => {
        console.error('MapTiler error:', e.error)
      })

      map.current.on('styledata', () => {
        console.log('Map style loaded')
      })

      map.current.on('sourcedata', (e) => {
        if (e.sourceId && e.isSourceLoaded) {
          console.log('Source loaded:', e.sourceId)
        }
      })

    } catch (error) {
      console.error('Failed to initialize MapTiler:', error)
    }

    return () => {
      console.log('Cleaning up map...')
      clearMarkers()
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run once on mount

  // Update markers when filters change
  useEffect(() => {
    console.log('Filter change useEffect triggered')
    console.log('Current category:', selectedCategory)
    console.log('Current search:', searchQuery)
    
    if (map.current && map.current.loaded()) {
      console.log('Map is loaded, updating markers...')
      addMarkers()
    } else {
      console.log('Map not ready for marker updates')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, searchQuery])

  return (
    <div 
      ref={mapContainer} 
      className={`w-full h-full ${className}`}
      style={{ minHeight: '700px' }}
    />
  )
}