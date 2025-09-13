'use client'

import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { getPriceSymbol, type Place } from '@/data/tepoztlan-places'

interface MapTilerFixedProps {
  className?: string
  onPlaceSelect?: (placeId: string) => void
  filteredPlaces: Place[]
  selectedPlaceId?: string | null
}

export default function MapTilerFixed({ 
  className = '', 
  onPlaceSelect,
  filteredPlaces,
  selectedPlaceId
}: MapTilerFixedProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const markers = useRef<maplibregl.Marker[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)

  // Initialize map once
  useEffect(() => {
    if (!mapContainer.current) return

    const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY || ''
    const TEPOZTLAN_CENTER: [number, number] = [-99.1017, 18.9847]
    
    console.log('🗺️ Initializing fixed map...')

    // Create map instance
    const mapInstance = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: TEPOZTLAN_CENTER,
      zoom: 14,
      pitch: 45,
      bearing: 0
    })

    // Store map reference
    map.current = mapInstance

    // Wait for map to load
    mapInstance.on('load', () => {
      console.log('✅ Map loaded successfully')
      
      // Add navigation controls
      mapInstance.addControl(new maplibregl.NavigationControl(), 'top-right')
      
      // Set loaded state
      setMapLoaded(true)
    })

    // Handle errors silently
    mapInstance.on('error', (e) => {
      console.warn('Map error:', e)
    })

    // Cleanup
    return () => {
      mapInstance.remove()
      map.current = null
      setMapLoaded(false)
    }
  }, [])

  // Update markers when places change or map loads
  useEffect(() => {
    if (!map.current || !mapLoaded) {
      console.log('⏳ Waiting for map to load...')
      return
    }

    console.log(`📍 Updating markers for ${filteredPlaces.length} places`)

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

    const categoryIcons: Record<string, string> = {
      restaurant: '🍽️',
      hotel: '🏨',
      attraction: '🏔️',
      cafe: '☕',
      shopping: '🛍️',
      culture: '🎨',
      bar: '🍺'
    }

    // Add new markers
    filteredPlaces.forEach(place => {
      // Create custom HTML element for marker
      const el = document.createElement('div')
      el.className = 'marker-custom'
      el.innerHTML = `
        <div style="
          width: 36px;
          height: 36px;
          background: ${categoryColors[place.category] || '#6b7280'};
          border: 3px solid ${place.id === selectedPlaceId ? '#3b82f6' : 'white'};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          transition: all 0.2s;
        ">
          ${categoryIcons[place.category] || '📍'}
        </div>
      `

      // Add hover effect
      el.addEventListener('mouseenter', () => {
        el.firstElementChild!.setAttribute('style', `
          width: 36px;
          height: 36px;
          background: ${categoryColors[place.category] || '#6b7280'};
          border: 3px solid ${place.id === selectedPlaceId ? '#3b82f6' : 'white'};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          transform: scale(1.15);
          transition: all 0.2s;
        `)
      })

      el.addEventListener('mouseleave', () => {
        el.firstElementChild!.setAttribute('style', `
          width: 36px;
          height: 36px;
          background: ${categoryColors[place.category] || '#6b7280'};
          border: 3px solid ${place.id === selectedPlaceId ? '#3b82f6' : 'white'};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          transition: all 0.2s;
        `)
      })

      // Add click handler
      el.addEventListener('click', () => {
        if (onPlaceSelect) {
          onPlaceSelect(place.id)
        }
      })

      // Create popup
      const popup = new maplibregl.Popup({ offset: 25 })
        .setHTML(`
          <div style="padding: 12px; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">
              ${place.name}
            </h3>
            <div style="display: flex; gap: 8px; margin-bottom: 8px;">
              <span style="color: #facc15;">★ ${place.rating}</span>
              <span>${getPriceSymbol(place.priceLevel)}</span>
            </div>
            <p style="margin: 0; color: #666; font-size: 14px;">
              ${place.description.substring(0, 100)}...
            </p>
          </div>
        `)

      // Create and add marker
      const marker = new maplibregl.Marker(el)
        .setLngLat(place.coordinates)
        .setPopup(popup)
        .addTo(map.current!)

      markers.current.push(marker)
    })

    console.log(`✅ Added ${markers.current.length} markers`)
  }, [filteredPlaces, selectedPlaceId, mapLoaded, onPlaceSelect])

  return (
    <div 
      ref={mapContainer} 
      className={`w-full h-full ${className}`}
      style={{ minHeight: '700px' }}
    />
  )
}