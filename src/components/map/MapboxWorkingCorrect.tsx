'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { getPriceSymbol, type Place } from '@/data/tepoztlan-places'

interface MapboxWorkingCorrectProps {
  className?: string
  onPlaceSelect?: (placeId: string) => void
  filteredPlaces: Place[]
  selectedPlaceId?: string | null
}

export default function MapboxWorkingCorrect({ 
  className = '', 
  onPlaceSelect,
  filteredPlaces,
  selectedPlaceId
}: MapboxWorkingCorrectProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)

  // Initialize map - based on official Mapbox GL JS v3.14.0 example
  useEffect(() => {
    if (!mapContainer.current) return

    console.log('🗺️ Initializing Mapbox with official v3.14.0 pattern...')

    // Set access token exactly like official example
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    if (!accessToken) {
      console.error('❌ NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN is required')
      return
    }

    mapboxgl.accessToken = accessToken
    console.log('✅ Access token set')

    // Create map exactly like official example
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12', // Official example uses streets
      center: [-99.1017, 18.9847], // Tepoztlán center
      zoom: 14
    })

    map.current = mapInstance
    console.log('📍 Map instance created')

    // Wait for map to load - exactly like official pattern
    mapInstance.on('load', () => {
      console.log('✅ Map loaded! Ready for markers.')
      
      // Remove POI labels to avoid clutter with our custom markers
      try {
        console.log('🧹 Hiding default POI labels...')
        
        // For streets style, we need to hide specific symbol layers
        const layersToHide = [
          'poi-label',
          'poi-scalerank1',
          'poi-scalerank2', 
          'poi-scalerank3',
          'poi-scalerank4-l1',
          'poi-scalerank4-l15',
          'poi-parks-scalerank1',
          'poi-parks-scalerank2', 
          'poi-parks-scalerank3'
        ]
        
        const layers = mapInstance.getStyle().layers
        let hiddenCount = 0
        
        // Hide symbol layers that contain POI labels
        layers.forEach(layer => {
          if (layer.type === 'symbol' && 
              (layer.id.includes('poi') || 
               layer.id.includes('place-label') ||
               layersToHide.includes(layer.id))) {
            try {
              mapInstance.setLayoutProperty(layer.id, 'visibility', 'none')
              hiddenCount++
              console.log(`   ✅ Hidden POI layer: ${layer.id}`)
            } catch {
              console.log(`   ⚠️ Could not hide layer: ${layer.id}`)
            }
          }
        })
        
        console.log(`🧹 Hidden ${hiddenCount} POI layers`)
      } catch (error) {
        console.warn('Failed to hide POI labels:', error)
      }
      
      setMapLoaded(true)
    })

    // Error handling
    mapInstance.on('error', (e) => {
      console.error('❌ Map error:', e.error)
    })

    // Cleanup
    return () => {
      console.log('🧹 Cleaning up map')
      mapInstance.remove()
      map.current = null
      setMapLoaded(false)
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

    console.log(`📍 Adding ${filteredPlaces.length} markers using official patterns`)

    // Clear existing markers first
    markers.current.forEach(marker => {
      marker.remove()
    })
    markers.current = []

    // Add markers using THREE different official patterns for testing
    filteredPlaces.forEach((place, index) => {
      console.log(`📍 Adding marker ${index + 1}: ${place.name} at [${place.coordinates}]`)

      try {
        let marker: mapboxgl.Marker

        // Pattern 1: Default marker (like official example)
        if (index % 3 === 0) {
          marker = new mapboxgl.Marker()
            .setLngLat(place.coordinates)
            .addTo(map.current!)
          
          console.log(`✅ Default marker added for ${place.name}`)
        }
        // Pattern 2: Colored marker (like official example) 
        else if (index % 3 === 1) {
          const colors = ['red', 'blue', 'green', 'orange', 'purple', 'yellow']
          const color = colors[index % colors.length]
          
          marker = new mapboxgl.Marker({ color })
            .setLngLat(place.coordinates)
            .addTo(map.current!)
          
          console.log(`✅ Colored marker (${color}) added for ${place.name}`)
        }
        // Pattern 3: Custom HTML element (like official custom marker example)
        else {
          const el = document.createElement('div')
          el.className = 'marker' // Use class from official example
          
          // Styling from official example
          el.style.display = 'block'
          el.style.border = 'none'
          el.style.borderRadius = '50%'
          el.style.cursor = 'pointer'
          el.style.padding = '0'
          el.style.width = '30px'
          el.style.height = '30px'
          el.style.backgroundColor = '#ff6b6b'
          
          // Add category icon
          const categoryIcons: Record<string, string> = {
            restaurant: '🍽️',
            hotel: '🏨',
            attraction: '🏔️',
            cafe: '☕',
            shopping: '🛍️',
            culture: '🎨',
            bar: '🍺'
          }
          
          el.innerHTML = categoryIcons[place.category] || '📍'
          el.style.display = 'flex'
          el.style.alignItems = 'center'
          el.style.justifyContent = 'center'
          el.style.fontSize = '16px'

          marker = new mapboxgl.Marker(el)
            .setLngLat(place.coordinates)
            .addTo(map.current!)
          
          console.log(`✅ Custom HTML marker added for ${place.name}`)
        }

        // Add popup (from official examples)
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div style="padding: 10px;">
              <h3 style="margin: 0 0 5px 0; font-size: 16px;">${place.name}</h3>
              <div style="font-size: 14px; color: #666; margin-bottom: 5px;">
                ⭐ ${place.rating} • ${getPriceSymbol(place.priceLevel)}
              </div>
              <p style="margin: 0; font-size: 13px; color: #333;">
                ${place.description.substring(0, 80)}...
              </p>
            </div>
          `)

        marker.setPopup(popup)

        // Add click handler with proper event handling
        if (onPlaceSelect) {
          const markerElement = marker.getElement()
          const clickHandler = (e: Event) => {
            e.stopPropagation() // Prevent map click event
            console.log(`🎯 Marker clicked: ${place.name} (${place.id})`)
            onPlaceSelect(place.id)
          }
          
          markerElement.addEventListener('click', clickHandler)
          console.log(`✅ Click handler added to marker for ${place.name}`)
        }

        // Store marker reference
        markers.current.push(marker)

      } catch (error) {
        console.error(`❌ Failed to add marker for ${place.name}:`, error)
      }
    })

    console.log(`✅ Successfully added ${markers.current.length}/${filteredPlaces.length} markers`)
  }, [mapLoaded, filteredPlaces, onPlaceSelect])

  // Handle selected place highlighting
  useEffect(() => {
    if (selectedPlaceId && map.current && mapLoaded) {
      const selectedPlace = filteredPlaces.find(p => p.id === selectedPlaceId)
      if (selectedPlace) {
        // Fly to the selected place
        map.current.flyTo({
          center: selectedPlace.coordinates,
          zoom: 16,
          duration: 1500
        })
      }
    }
  }, [selectedPlaceId, filteredPlaces, mapLoaded])

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Status indicator */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm z-10 border">
        <div className="font-medium">
          {mapLoaded ? '✅ Map Ready' : '⏳ Loading...'}
        </div>
        <div className="text-xs text-gray-600">
          Markers: {markers.current.length}/{filteredPlaces.length}
        </div>
        <div className="text-xs text-gray-600">
          Selected: {selectedPlaceId || 'None'}
        </div>
      </div>

      {/* Map container */}
      <div 
        ref={mapContainer}
        className="w-full h-full"
        style={{ minHeight: '700px' }}
      />
    </div>
  )
}