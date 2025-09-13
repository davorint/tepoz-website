'use client'

import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { getPriceSymbol, type Place } from '@/data/tepoztlan-places'

interface UnifiedMapProps {
  className?: string
  onPlaceSelect?: (placeId: string) => void
  filteredPlaces: Place[]
  selectedPlaceId?: string | null
}

interface MarkerInfo {
  marker: maplibregl.Marker
  place: Place
  element: HTMLElement
}

export default function UnifiedMap({ 
  className = '', 
  onPlaceSelect,
  filteredPlaces,
  selectedPlaceId
}: UnifiedMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const markersInfo = useRef<MarkerInfo[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    console.log('🗺️ Initializing unified map...')

    const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY
    if (!API_KEY || API_KEY === 'your_maptiler_api_key_here') {
      setMapError('MapTiler API key is missing or invalid')
      console.error('❌ MapTiler API key is required')
      return
    }

    try {
      // Tepoztlán coordinates
      const TEPOZTLAN_CENTER: [number, number] = [-99.1017, 18.9847]

      const mapInstance = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
        center: TEPOZTLAN_CENTER,
        zoom: 14,
        pitch: 0,
        bearing: 0,
        attributionControl: false
      })

      map.current = mapInstance
      console.log('📍 Map instance created')

      // Add attribution control
      mapInstance.addControl(new maplibregl.AttributionControl(), 'bottom-right')

      // Add navigation controls
      mapInstance.addControl(new maplibregl.NavigationControl(), 'top-right')

      mapInstance.on('load', () => {
        console.log('✅ Map loaded!')
        setMapLoaded(true)
        setMapError(null)
      })

      mapInstance.on('error', (e) => {
        console.error('❌ Map error:', e.error)
        setMapError(`Map error: ${e.error?.message || 'Unknown error'}`)
      })

      return () => {
        console.log('🧹 Cleaning up map')
        markersInfo.current.forEach(({ marker }) => {
          marker.remove()
        })
        markersInfo.current = []
        mapInstance.remove()
        map.current = null
        setMapLoaded(false)
      }
    } catch (error) {
      console.error('Failed to initialize map:', error)
      setMapError(`Failed to initialize map: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }, [])

  // Add markers when map loads and places change
  useEffect(() => {
    if (!map.current || !mapLoaded || filteredPlaces.length === 0) {
      console.log('⏳ Not ready for markers yet...', { 
        mapReady: !!map.current, 
        mapLoaded, 
        placesCount: filteredPlaces.length 
      })
      return
    }

    console.log(`📍 Adding ${filteredPlaces.length} markers`)

    // Clean up existing markers
    markersInfo.current.forEach(({ marker }) => {
      marker.remove()
    })
    markersInfo.current = []

    // Category colors and icons
    const categoryColors: Record<string, string> = {
      restaurant: '#f97316', // orange
      hotel: '#8b5cf6',      // purple
      attraction: '#10b981', // emerald
      cafe: '#a78bfa',       // violet
      shopping: '#ec4899',   // pink
      culture: '#3b82f6',    // blue
      bar: '#ef4444'         // red
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

    // Add markers for all places
    filteredPlaces.forEach((place) => {
      try {
        // Create marker element
        const el = document.createElement('div')
        el.className = 'custom-marker'
        el.style.cssText = `
          background-color: ${categoryColors[place.category] || '#666'};
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: all 0.2s ease;
          z-index: 1;
        `
        el.innerHTML = categoryIcons[place.category] || '📍'
        
        // Hover effects
        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.1)'
          el.style.zIndex = '10'
        })
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)'
          el.style.zIndex = '1'
        })

        // Click handler
        el.addEventListener('click', (e) => {
          e.preventDefault()
          e.stopPropagation()
          console.log(`🎯 Marker clicked: ${place.name}`)
          if (onPlaceSelect) {
            onPlaceSelect(place.id)
          }
        })

        // Create popup content
        const popupContent = `
          <div style="min-width: 220px; font-family: system-ui, -apple-system, sans-serif;">
            <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">
              ${place.name}
            </h3>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="color: #facc15; font-size: 14px;">★ ${place.rating}</span>
              <span style="color: #6b7280; font-size: 14px;">•</span>
              <span style="color: #6b7280; font-size: 14px;">${getPriceSymbol(place.priceLevel)}</span>
            </div>
            <p style="margin: 0 0 8px 0; color: #4b5563; font-size: 13px; line-height: 1.4;">
              ${place.description.substring(0, 100)}${place.description.length > 100 ? '...' : ''}
            </p>
            ${place.address ? `
              <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 12px;">
                📍 ${place.address}
              </p>
            ` : ''}
            ${place.hours ? `
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                🕐 ${place.hours}
              </p>
            ` : ''}
          </div>
        `

        // Create marker
        const marker = new maplibregl.Marker(el)
          .setLngLat(place.coordinates)
          .setPopup(
            new maplibregl.Popup({ 
              offset: 25,
              maxWidth: '280px',
              className: 'custom-popup'
            }).setHTML(popupContent)
          )
          .addTo(map.current!)

        // Store marker info
        markersInfo.current.push({
          marker,
          place,
          element: el
        })

        console.log(`✅ Added marker for ${place.name}`)
      } catch (error) {
        console.error(`❌ Failed to add marker for ${place.name}:`, error)
      }
    })

    console.log(`✅ Added ${markersInfo.current.length}/${filteredPlaces.length} markers`)
  }, [mapLoaded, filteredPlaces, onPlaceSelect])

  // Handle selected place highlighting and camera movement
  useEffect(() => {
    if (!selectedPlaceId || !map.current || !mapLoaded) return

    const selectedPlace = filteredPlaces.find(p => p.id === selectedPlaceId)
    if (!selectedPlace) {
      console.warn(`❌ Selected place not found: ${selectedPlaceId}`)
      return
    }

    console.log(`✈️ Flying to: ${selectedPlace.name}`)

    // Update marker styles
    markersInfo.current.forEach(({ element, place }) => {
      if (place.id === selectedPlaceId) {
        // Highlight selected marker
        element.style.transform = 'scale(1.3)'
        element.style.zIndex = '20'
        element.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.8), 0 4px 12px rgba(0,0,0,0.4)'
        element.style.borderColor = '#3b82f6'
      } else {
        // Reset other markers
        element.style.transform = 'scale(1)'
        element.style.zIndex = '1'
        element.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)'
        element.style.borderColor = 'white'
      }
    })

    // Fly to selected place
    map.current.flyTo({
      center: selectedPlace.coordinates,
      zoom: 16,
      duration: 1500,
      essential: true
    })
  }, [selectedPlaceId, filteredPlaces, mapLoaded])

  // Error state
  if (mapError) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-slate-100 ${className}`}
           style={{ minHeight: '700px' }}>
        <div className="text-center p-8">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Map Error</h3>
          <p className="text-slate-600 text-sm max-w-md">
            {mapError}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  // Loading state
  if (!mapLoaded) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800/80 to-slate-900/80 ${className}`}
           style={{ minHeight: '700px' }}>
        <div className="text-center text-white">
          <div className="text-6xl mb-4 animate-pulse">🗺️</div>
          <p className="text-xl font-semibold text-slate-300">Cargando mapa...</p>
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative w-full h-full ${className}`} style={{ minHeight: '700px' }}>
      {/* Status indicator */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg text-sm z-10 border shadow-lg">
        <div className="font-medium text-green-600">
          ✅ Map Ready
        </div>
        <div className="text-xs text-gray-600">
          Places: {markersInfo.current.length}/{filteredPlaces.length}
        </div>
        {selectedPlaceId && (
          <div className="text-xs text-blue-600">
            Selected: {filteredPlaces.find(p => p.id === selectedPlaceId)?.name}
          </div>
        )}
      </div>

      {/* Map container */}
      <div 
        ref={mapContainer}
        className="w-full h-full rounded-lg overflow-hidden"
        style={{ minHeight: '700px' }}
      />
    </div>
  )
}