'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as maptilersdk from '@maptiler/sdk'
import '@maptiler/sdk/dist/maptiler-sdk.css'
import { maptiler3DStyle } from '@/lib/maptiler-3d-style'

// You'll need to get a free API key from https://cloud.maptiler.com/
const MAPTILER_API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY || 'get_your_own_key'

interface MapTilerComponentProps {
  center?: [number, number]
  zoom?: number
  pitch?: number
  bearing?: number
  className?: string
  onMapLoad?: (map: maptilersdk.Map) => void
  markers?: Array<{
    id: string
    coordinates: [number, number]
    popup?: {
      title: string
      description: string
    }
    color?: string
    category?: string
  }>
}

export default function MapTilerComponent({
  center = [-99.0965, 18.9843], // Tepoztlán center
  zoom = 15,
  pitch = 45,
  bearing = 0,
  className = 'w-full h-full',
  onMapLoad,
  markers = []
}: MapTilerComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maptilersdk.Map | null>(null)
  const markersRef = useRef<maptilersdk.Marker[]>([])
  const onMapLoadRef = useRef(onMapLoad)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Update ref when onMapLoad changes
  onMapLoadRef.current = onMapLoad


  useEffect(() => {
    if (!mapContainer.current || map.current) return

    // Set the API key
    maptilersdk.config.apiKey = MAPTILER_API_KEY

    try {
      // Create the map with the OpenMapTiles 3D style
      const mapInstance = new maptilersdk.Map({
        container: mapContainer.current,
        style: {
          ...maptiler3DStyle,
          sources: {
            ...maptiler3DStyle.sources,
            openmaptiles: {
              type: 'vector',
              url: `https://api.maptiler.com/tiles/v3/tiles.json?key=${MAPTILER_API_KEY}`
            }
          },
          sprite: `https://api.maptiler.com/maps/streets/sprite?key=${MAPTILER_API_KEY}`,
          glyphs: `https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key=${MAPTILER_API_KEY}`
        } as maptilersdk.StyleSpecification,
        center: center,
        zoom: zoom,
        pitch: pitch,
        bearing: bearing
      })

      map.current = mapInstance

      // Wait for map to load
      mapInstance.on('load', () => {
        setIsLoaded(true)
        setError(null)
        
        // Add navigation controls
        mapInstance.addControl(new maptilersdk.NavigationControl(), 'top-right')
        
        // Add scale control
        mapInstance.addControl(new maptilersdk.ScaleControl({
          maxWidth: 100,
          unit: 'metric'
        }), 'bottom-left')

        // Call onMapLoad callback if provided
        if (onMapLoadRef.current) {
          onMapLoadRef.current(mapInstance)
        }
      })

      mapInstance.on('error', (e) => {
        console.error('MapTiler error:', e)
        setError('Failed to load map. Please check your API key.')
        setIsLoaded(false)
      })

    } catch (err) {
      console.error('Error initializing MapTiler:', err)
      setError('Failed to initialize map')
      setIsLoaded(false)
    }

    // Cleanup function
    return () => {
      // Clear markers
      markersRef.current.forEach(marker => marker.remove())
      markersRef.current = []
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [center, zoom, pitch, bearing])

  // Add markers when they change
  useEffect(() => {
    if (!map.current || !isLoaded) return

    // Clear existing markers first
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    // Add new markers
    markers.forEach((markerData) => {
      if (!markerData) return

      // Create marker
      const marker = new maptilersdk.Marker({
        color: markerData.color || '#10b981'
      })
        .setLngLat(markerData.coordinates)
        .addTo(map.current!)

      // Add popup if provided
      if (markerData.popup) {
        const popup = new maptilersdk.Popup({
          offset: 25,
          closeButton: true,
          closeOnClick: false
        }).setHTML(`
          <div class="p-3">
            <h3 class="font-bold text-lg mb-2">${markerData.popup.title}</h3>
            <p class="text-sm text-gray-600">${markerData.popup.description}</p>
          </div>
        `)

        marker.setPopup(popup)
      }

      // Store marker reference for cleanup
      markersRef.current.push(marker)
    })
  }, [markers, isLoaded])

  const handleMapClick = useCallback((e: maptilersdk.MapMouseEvent) => {
    // You can add custom click handling here
    console.log('Map clicked at:', e.lngLat)
  }, [])

  // Add click handler
  useEffect(() => {
    if (!map.current || !isLoaded) return

    map.current.on('click', handleMapClick)

    return () => {
      if (map.current) {
        map.current.off('click', handleMapClick)
      }
    }
  }, [isLoaded, handleMapClick])

  return (
    <div className={className}>
      <div 
        ref={mapContainer} 
        className="w-full h-full relative"
        style={{ minHeight: '400px' }}
      >

        {/* Error state */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 z-10">
            <div className="text-center p-8">
              <div className="text-red-400 text-6xl mb-4">⚠️</div>
              <h3 className="text-white text-xl font-bold mb-2">Map Error</h3>
              <p className="text-white/70 text-sm max-w-md">{error}</p>
              <p className="text-white/50 text-xs mt-4">
                Make sure NEXT_PUBLIC_MAPTILER_API_KEY is set in your environment
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Utility function to create map markers for different business categories
export const createBusinessMarker = (business: {
  id: string
  name: string
  description: string
  coordinates: [number, number]
  category: string
}) => {
  const categoryColors: Record<string, string> = {
    restaurant: '#f97316', // orange
    hotel: '#3b82f6',      // blue
    attraction: '#10b981',  // emerald
    cafe: '#f59e0b',       // amber
    shopping: '#ec4899',   // pink
    culture: '#06b6d4',    // cyan
    nature: '#84cc16'      // lime
  }

  return {
    id: business.id,
    coordinates: business.coordinates,
    color: categoryColors[business.category] || '#6366f1',
    category: business.category,
    popup: {
      title: business.name,
      description: business.description
    }
  }
}