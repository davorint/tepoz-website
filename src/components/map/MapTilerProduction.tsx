'use client'

import { useEffect, useRef, useCallback, useMemo } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { type Place } from '@/data/tepoztlan-places'

interface MapTilerProductionProps {
  className?: string
  onPlaceSelect?: (placeId: string) => void
  filteredPlaces: Place[]
  selectedPlaceId?: string | null
}

// Marker states for visual feedback
type MarkerState = 'default' | 'hovered' | 'selected' | 'highlighted'

interface ManagedMarker {
  id: string
  marker: maplibregl.Marker
  element: HTMLDivElement
  state: MarkerState
  isHovered: boolean
  place: Place
  cleanup: () => void
}

export default function MapTilerProduction({ 
  className = '', 
  onPlaceSelect,
  filteredPlaces,
  selectedPlaceId
}: MapTilerProductionProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const managedMarkers = useRef<Map<string, ManagedMarker>>(new Map())

  // Category colors and icons (memoized to prevent dependency changes)
  const categoryColors = useMemo(() => ({
    restaurant: '#f97316',
    hotel: '#8b5cf6',
    attraction: '#10b981',
    cafe: '#a78bfa',
    shopping: '#ec4899',
    culture: '#3b82f6',
    bar: '#ef4444'
  }), [])


  // Get correct marker state based on priority system
  const getCorrectMarkerState = useCallback((markerId: string, isHovered: boolean): MarkerState => {
    // Priority: selected > hovered > default
    if (markerId === selectedPlaceId) {
      return isHovered ? 'selected' : 'selected' // Selected markers stay selected even when not hovered
    }
    return isHovered ? 'hovered' : 'default'
  }, [selectedPlaceId])

  // Update marker visual state (optimized to prevent re-renders)
  const updateMarkerState = useCallback((managedMarker: ManagedMarker, newState: MarkerState) => {
    if (managedMarker.state === newState) return
    
    managedMarker.state = newState
    const { element, place } = managedMarker
    const baseColor = categoryColors[place.category] || '#6b7280'
    
    // Batch DOM updates for better performance
    const updates: Array<() => void> = []
    
    switch (newState) {
      case 'hovered':
        updates.push(() => {
          element.style.transform = 'scale(1.3)'
          element.style.boxShadow = '0 6px 20px rgba(0,0,0,0.6)'
          element.style.zIndex = '2000'
          element.style.backgroundColor = baseColor
          element.style.border = '3px solid white'
        })
        break
      case 'selected':
        updates.push(() => {
          element.style.transform = 'scale(1.2)'
          element.style.border = '4px solid #3b82f6'
          element.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.6)'
          element.style.zIndex = '1500'
          element.style.backgroundColor = baseColor
        })
        break
      case 'highlighted':
        updates.push(() => {
          element.style.backgroundColor = '#3b82f6'
          element.style.transform = 'scale(1.15)'
          element.style.zIndex = '1200'
          element.style.border = '3px solid white'
        })
        break
      case 'default':
      default:
        updates.push(() => {
          element.style.transform = 'scale(1)'
          element.style.backgroundColor = baseColor
          element.style.border = '3px solid white'
          element.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)'
          element.style.zIndex = '1000'
        })
        break
    }
    
    // Execute all updates in a single frame
    if (updates.length > 0) {
      requestAnimationFrame(() => {
        updates.forEach(update => update())
      })
    }
  }, [categoryColors])

  // Clear all markers with proper cleanup
  const clearAllMarkers = useCallback(() => {
    managedMarkers.current.forEach((managedMarker) => {
      managedMarker.cleanup()
      managedMarker.marker.remove()
    })
    managedMarkers.current.clear()
  }, [])


  // FIXED: Use official MapLibre marker approach
  const updateMarkers = useCallback(() => {
    console.log('📍 FIXED updateMarkers called:', {
      mapExists: !!map.current,
      mapLoaded: map.current?.loaded(),
      filteredPlacesCount: filteredPlaces.length
    })
    
    if (!map.current || !map.current.loaded()) {
      console.log('❌ Map not ready for markers')
      return
    }

    // Clear all existing markers first
    clearAllMarkers()
    console.log('🧹 Cleared existing markers')

    // Use official MapLibre marker approach - no custom DOM elements
    console.log('➕ Adding', filteredPlaces.length, 'markers using official approach...')
    filteredPlaces.forEach((place) => {
      try {
        // Get category color
        const color = categoryColors[place.category] || '#f97316'
        
        // Create marker using official MapLibre approach
        const marker = new maplibregl.Marker({ 
          color: color,
          scale: 1.2
        })
          .setLngLat(place.coordinates)
          .addTo(map.current!)

        // Store minimal reference for cleanup
        const managedMarker: ManagedMarker = {
          id: place.id,
          marker,
          element: marker.getElement() as HTMLDivElement, // Get the element MapLibre creates
          state: 'default',
          isHovered: false,
          place,
          cleanup: () => {} // MapLibre handles cleanup
        }

        // Add click handler to the marker element
        if (onPlaceSelect) {
          managedMarker.element.addEventListener('click', () => onPlaceSelect(place.id))
        }

        managedMarkers.current.set(place.id, managedMarker)
        console.log('✅ FIXED: Created official marker for:', place.name, 'at', place.coordinates)
      } catch (error) {
        console.error(`❌ Error creating marker for ${place.name}:`, error)
      }
    })
    
    console.log('🎯 Total markers created:', managedMarkers.current.size)
  }, [filteredPlaces, categoryColors, clearAllMarkers, onPlaceSelect])

  // Initialize map
  useEffect(() => {
    if (map.current || !mapContainer.current) return

    const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY || 'your-api-key-here'
    const TEPOZTLAN_CENTER: [number, number] = [-99.1017, 18.9847]
    
    console.log('🗺️ Initializing map with API key:', API_KEY?.substring(0, 8) + '...')

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
        console.log('🎉 FIXED: Map loaded successfully! Adding markers...')
        if (!map.current) return

        // Add navigation controls
        map.current.addControl(new maplibregl.NavigationControl(), 'top-right')

        // Add markers immediately - simplified approach
        console.log('🔄 FIXED: Calling updateMarkers from map load event')
        updateMarkers()
      })

      map.current.on('error', () => {
        // Silent error handling for production
      })

    } catch {
      // Silent error handling for production
    }

    return () => {
      clearAllMarkers()
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [updateMarkers, clearAllMarkers])

  // FIXED: Simple marker updates when data changes
  useEffect(() => {
    console.log('🔄 FIXED: useEffect for marker updates triggered')
    
    if (map.current && map.current.loaded()) {
      console.log('✅ FIXED: Map ready, updating markers')
      updateMarkers()
    } else {
      console.log('⏳ FIXED: Map not ready yet')
    }
  }, [updateMarkers])

  // Handle visual selection state changes
  useEffect(() => {
    managedMarkers.current.forEach((managedMarker) => {
      const correctState = getCorrectMarkerState(managedMarker.id, managedMarker.isHovered)
      updateMarkerState(managedMarker, correctState)
    })
  }, [selectedPlaceId, updateMarkerState, getCorrectMarkerState])

  return (
    <div 
      ref={mapContainer} 
      className={`w-full h-full ${className}`}
      style={{ minHeight: '700px' }}
    />
  )
}