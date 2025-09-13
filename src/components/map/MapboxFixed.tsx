'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { getPriceSymbol, type Place } from '@/data/tepoztlan-places'

interface MapboxFixedProps {
  className?: string
  onPlaceSelect?: (placeId: string) => void
  filteredPlaces: Place[]
  selectedPlaceId?: string | null
}

export default function MapboxFixed({ 
  className = '', 
  onPlaceSelect,
  filteredPlaces,
  selectedPlaceId
}: MapboxFixedProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)
  const [tokenReady, setTokenReady] = useState(false)

  // Initialize access token with proper error handling
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    if (!token) {
      console.error('❌ NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN is missing')
      return
    }
    
    mapboxgl.accessToken = token
    setTokenReady(true)
    console.log('✅ Mapbox token configured')
  }, [])

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !tokenReady) {
      console.log('⏳ Waiting for container and token...')
      return
    }

    const TEPOZTLAN_CENTER: [number, number] = [-99.1017, 18.9847]
    
    console.log('🗺️ Creating Mapbox map...')

    // Create map with minimal configuration first
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12', // Use stable streets style
      center: TEPOZTLAN_CENTER,
      zoom: 14
    })

    map.current = mapInstance

    // Wait for map to fully load
    mapInstance.on('load', () => {
      console.log('✅ Map loaded successfully')
      
      // Add navigation controls
      mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right')
      
      setMapLoaded(true)
    })

    // Handle errors
    mapInstance.on('error', (e) => {
      console.error('❌ Map error:', e.error?.message || 'Unknown error')
    })

    // Cleanup
    return () => {
      console.log('🧹 Cleaning up map')
      if (mapInstance) {
        mapInstance.remove()
      }
      map.current = null
      setMapLoaded(false)
    }
  }, [tokenReady])

  // Update markers when places change
  useEffect(() => {
    if (!map.current || !mapLoaded) {
      console.log('⏳ Map not ready for markers...')
      return
    }

    console.log(`📍 Adding ${filteredPlaces.length} markers`)

    // Clear existing markers
    markers.current.forEach(marker => marker.remove())
    markers.current = []

    // Category colors
    const categoryColors: Record<string, string> = {
      restaurant: '#f97316',
      hotel: '#8b5cf6', 
      attraction: '#10b981',
      cafe: '#a78bfa',
      shopping: '#ec4899',
      culture: '#3b82f6',
      bar: '#ef4444'
    }

    // Add markers with simplest approach first
    filteredPlaces.forEach((place, index) => {
      try {
        console.log(`📍 Adding marker ${index + 1}: ${place.name} at ${place.coordinates}`)

        // Create simple HTML element
        const el = document.createElement('div')
        el.className = 'mapboxgl-marker-custom'
        
        // Simple, flat styling - avoid complex nested structures
        el.style.cssText = `
          width: 32px;
          height: 32px;
          background-color: ${categoryColors[place.category] || '#6b7280'};
          border: 2px solid ${place.id === selectedPlaceId ? '#3b82f6' : '#ffffff'};
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: transform 0.2s ease;
        `
        
        // Simple icon based on category
        const icons: Record<string, string> = {
          restaurant: '🍽️',
          hotel: '🏨',
          attraction: '🏔️', 
          cafe: '☕',
          shopping: '🛍️',
          culture: '🎨',
          bar: '🍺'
        }
        
        el.innerHTML = icons[place.category] || '📍'

        // Add hover effect
        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.1)'
        })
        
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)'
        })

        // Add click handler
        el.addEventListener('click', (e) => {
          e.stopPropagation()
          if (onPlaceSelect) {
            onPlaceSelect(place.id)
          }
        })

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div style="padding: 12px; min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">
                ${place.name}
              </h3>
              <div style="display: flex; gap: 8px; margin-bottom: 8px; font-size: 14px;">
                <span style="color: #f59e0b;">★ ${place.rating}</span>
                <span style="color: #6b7280;">${getPriceSymbol(place.priceLevel)}</span>
              </div>
              <p style="margin: 0; color: #4b5563; font-size: 13px;">
                ${place.description.substring(0, 100)}...
              </p>
            </div>
          `)

        // Create and add marker
        const marker = new mapboxgl.Marker({
          element: el,
          anchor: 'center'
        })
          .setLngLat(place.coordinates)
          .setPopup(popup)
          .addTo(map.current!)

        markers.current.push(marker)
        console.log(`✅ Marker added for ${place.name}`)

      } catch (error) {
        console.error(`❌ Failed to add marker for ${place.name}:`, error)
      }
    })

    console.log(`✅ Added ${markers.current.length}/${filteredPlaces.length} markers`)
  }, [filteredPlaces, selectedPlaceId, mapLoaded, onPlaceSelect])

  // Fly to selected place
  const flyToPlace = useCallback((coords: [number, number]) => {
    if (map.current) {
      map.current.flyTo({
        center: coords,
        zoom: 16,
        duration: 1500
      })
    }
  }, [])

  // Handle place selection
  useEffect(() => {
    if (selectedPlaceId && map.current && mapLoaded) {
      const place = filteredPlaces.find(p => p.id === selectedPlaceId)
      if (place) {
        flyToPlace(place.coordinates)
      }
    }
  }, [selectedPlaceId, filteredPlaces, mapLoaded, flyToPlace])

  return (
    <div className="relative w-full h-full">
      {!tokenReady && (
        <div className="absolute inset-0 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-10">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> Missing NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN</span>
        </div>
      )}
      <div 
        ref={mapContainer} 
        className={`w-full h-full ${className}`}
        style={{ minHeight: '700px' }}
      />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-2 rounded-lg text-sm z-10">
        <div>Status: {mapLoaded ? '✅ Ready' : '⏳ Loading...'}</div>
        <div>Markers: {markers.current.length}</div>
      </div>
    </div>
  )
}