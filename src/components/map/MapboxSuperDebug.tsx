'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { type Place } from '@/data/tepoztlan-places'

interface MapboxSuperDebugProps {
  filteredPlaces: Place[]
  selectedPlaceId?: string | null
  onPlaceSelect?: (placeId: string) => void
}

export default function MapboxSuperDebug({ 
  filteredPlaces,
  selectedPlaceId,
  onPlaceSelect
}: MapboxSuperDebugProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])
  const [debugInfo, setDebugInfo] = useState<string[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)

  // Debug logging function
  const addDebugInfo = (message: string) => {
    console.log('🐛 DEBUG:', message)
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  // Initialize map
  useEffect(() => {
    addDebugInfo('🚀 Starting map initialization...')
    
    if (!mapContainer.current) {
      addDebugInfo('❌ Map container not found!')
      return
    }
    addDebugInfo('✅ Map container found')

    // Check environment variables
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    addDebugInfo(`Access token: ${accessToken ? 'Present (' + accessToken.substring(0, 20) + '...)' : 'MISSING!'}`)
    
    if (!accessToken) {
      addDebugInfo('❌ CRITICAL: No access token!')
      return
    }

    // Set access token
    mapboxgl.accessToken = accessToken
    addDebugInfo('✅ Access token set globally')

    // Check if we're in client-side environment
    addDebugInfo(`Environment: ${typeof window !== 'undefined' ? 'Client' : 'Server'}`)
    if (typeof window === 'undefined') {
      addDebugInfo('❌ Running on server side!')
      return
    }

    addDebugInfo('✅ Client-side environment confirmed')

    // Create map
    try {
      addDebugInfo('📍 Creating map instance...')
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-99.1017, 18.9847], // Tepoztlán
        zoom: 14
      })
      
      map.current = mapInstance
      addDebugInfo('✅ Map instance created successfully')

      // Map load event
      mapInstance.on('load', () => {
        addDebugInfo('🎉 MAP LOADED! Ready for markers.')
        
        // Remove POIs using v3 Standard Style method
        try {
          addDebugInfo('🧹 Attempting to hide POI labels...')
          mapInstance.setConfigProperty('basemap', 'showPointOfInterestLabels', false)
          addDebugInfo('✅ POI labels hidden via setConfigProperty')
        } catch (error) {
          addDebugInfo(`⚠️ setConfigProperty failed: ${error}`)
          
          // Fallback: Try to hide common POI layers manually
          const layersToHide = [
            'poi-label',
            'poi-scalerank1',
            'poi-scalerank2', 
            'poi-scalerank3',
            'poi-scalerank4-l1',
            'poi-scalerank4-l15',
            'poi-parks-scalerank1',
            'poi-parks-scalerank2',
            'poi-parks-scalerank3',
            'place-city-sm',
            'place-city-md-s',
            'place-city-lg-s',
            'place-state-label-sm',
            'place-state-label-lg'
          ]
          
          const layers = mapInstance.getStyle().layers
          addDebugInfo(`📋 Found ${layers?.length || 0} total layers`)
          
          let hiddenCount = 0
          layersToHide.forEach(layerId => {
            try {
              mapInstance.setLayoutProperty(layerId, 'visibility', 'none')
              hiddenCount++
              addDebugInfo(`   ✅ Hidden layer: ${layerId}`)
            } catch {
              addDebugInfo(`   ⚠️ Could not hide layer: ${layerId}`)
            }
          })
          
          addDebugInfo(`🧹 Fallback method hid ${hiddenCount} POI layers`)
        }
        
        setMapLoaded(true)
        
        // Add some styling for markers
        const style = document.createElement('style')
        style.textContent = `
          .mapboxgl-marker { 
            width: 25px !important; 
            height: 25px !important; 
            border-radius: 50% !important; 
            border: 2px solid white !important; 
            background-color: red !important;
            display: block !important;
            cursor: pointer !important;
          }
          .debug-marker {
            width: 30px !important;
            height: 30px !important;
            background: blue !important;
            border: 3px solid yellow !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 16px !important;
            cursor: pointer !important;
          }
        `
        document.head.appendChild(style)
        addDebugInfo('✅ CSS styles added for markers')
      })

      // Style load event (more reliable than load for some cases)
      mapInstance.on('style.load', () => {
        addDebugInfo('🎨 Map style loaded')
      })

      // Error handling
      mapInstance.on('error', (e) => {
        addDebugInfo(`❌ Map error: ${e.error?.message || 'Unknown error'}`)
        console.error('Map error:', e)
      })

      // Other events for debugging
      mapInstance.on('idle', () => {
        addDebugInfo('💤 Map idle (finished loading/transitioning)')
      })

      addDebugInfo('📋 Event listeners registered')

    } catch (error) {
      addDebugInfo(`❌ CRITICAL ERROR creating map: ${error}`)
      console.error('Error creating map:', error)
    }

    // Cleanup
    return () => {
      addDebugInfo('🧹 Cleaning up map')
      if (map.current) {
        map.current.remove()
        map.current = null
        setMapLoaded(false)
      }
    }
  }, [])

  // Add markers effect
  useEffect(() => {
    addDebugInfo(`🎯 Marker effect triggered - mapLoaded: ${mapLoaded}, places: ${filteredPlaces.length}`)
    
    if (!map.current) {
      addDebugInfo('⏳ No map instance yet')
      return
    }

    if (!mapLoaded) {
      addDebugInfo('⏳ Map not loaded yet')
      return
    }

    if (filteredPlaces.length === 0) {
      addDebugInfo('⚠️ No places to show')
      return
    }

    addDebugInfo(`🚀 Starting to add ${filteredPlaces.length} markers...`)

    // Clear existing markers
    addDebugInfo(`🧹 Clearing ${markers.current.length} existing markers`)
    markers.current.forEach((marker, index) => {
      addDebugInfo(`  Removing marker ${index}`)
      marker.remove()
    })
    markers.current = []

    // Add test markers using multiple methods
    filteredPlaces.slice(0, 5).forEach((place, index) => {
      addDebugInfo(`📍 Adding marker ${index + 1}/${filteredPlaces.length}: ${place.name}`)
      addDebugInfo(`   Coordinates: [${place.coordinates[0]}, ${place.coordinates[1]}]`)
      
      try {
        let marker: mapboxgl.Marker

        if (index === 0) {
          // Method 1: Default marker
          addDebugInfo('   Using DEFAULT marker method')
          marker = new mapboxgl.Marker()
            .setLngLat(place.coordinates)
            .addTo(map.current!)
        } 
        else if (index === 1) {
          // Method 2: Colored marker
          addDebugInfo('   Using COLORED marker method')
          marker = new mapboxgl.Marker({ color: 'red' })
            .setLngLat(place.coordinates)
            .addTo(map.current!)
        }
        else if (index === 2) {
          // Method 3: Custom HTML element with strong styling
          addDebugInfo('   Using CUSTOM HTML marker method')
          const el = document.createElement('div')
          el.className = 'debug-marker'
          el.innerHTML = '🎯'
          el.style.width = '40px'
          el.style.height = '40px'
          el.style.backgroundColor = 'green'
          el.style.border = '3px solid white'
          el.style.borderRadius = '50%'
          el.style.display = 'flex'
          el.style.alignItems = 'center'
          el.style.justifyContent = 'center'
          el.style.fontSize = '20px'
          el.style.cursor = 'pointer'
          el.style.zIndex = '1000'

          marker = new mapboxgl.Marker(el)
            .setLngLat(place.coordinates)
            .addTo(map.current!)
        }
        else if (index === 3) {
          // Method 4: Test if DOM manipulation works
          addDebugInfo('   Using DOM MANIPULATION marker method')
          const el = document.createElement('div')
          el.innerHTML = `<div style="
            width: 50px !important;
            height: 50px !important;
            background: purple !important;
            border: 4px solid orange !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            color: white !important;
            font-weight: bold !important;
            font-size: 18px !important;
            cursor: pointer !important;
            position: relative !important;
            z-index: 10000 !important;
          ">4</div>`

          marker = new mapboxgl.Marker(el)
            .setLngLat(place.coordinates)
            .addTo(map.current!)
        }
        else {
          // Method 5: Simple text marker
          addDebugInfo('   Using SIMPLE TEXT marker method')
          const el = document.createElement('div')
          el.textContent = `${index + 1}`
          el.style.cssText = `
            width: 30px; height: 30px; background: orange; color: white;
            border-radius: 50%; display: flex; align-items: center; 
            justify-content: center; font-weight: bold; cursor: pointer;
            border: 2px solid white; font-size: 14px; z-index: 1000;
          `

          marker = new mapboxgl.Marker(el)
            .setLngLat(place.coordinates)
            .addTo(map.current!)
        }

        // Verify marker was created
        if (marker) {
          addDebugInfo(`   ✅ Marker ${index + 1} created successfully`)
          addDebugInfo(`   ✅ Marker element: ${marker.getElement() ? 'Present' : 'Missing'}`)
          addDebugInfo(`   ✅ Marker LngLat: [${marker.getLngLat().lng}, ${marker.getLngLat().lat}]`)
          
          // Store marker
          markers.current.push(marker)
          
          // Add click handler
          const element = marker.getElement()
          if (element) {
            element.addEventListener('click', () => {
              addDebugInfo(`🎯 Marker clicked: ${place.name}`)
              if (onPlaceSelect) {
                onPlaceSelect(place.id)
              }
            })
            addDebugInfo(`   ✅ Click handler added to marker ${index + 1}`)
          }
        } else {
          addDebugInfo(`   ❌ Failed to create marker ${index + 1}`)
        }

      } catch (error) {
        addDebugInfo(`   ❌ ERROR adding marker ${index + 1}: ${error}`)
        console.error(`Error adding marker ${index + 1}:`, error)
      }
    })

    addDebugInfo(`🎉 MARKER PROCESS COMPLETE! Added ${markers.current.length} markers`)
    addDebugInfo(`📊 Markers in DOM: ${document.querySelectorAll('.mapboxgl-marker').length}`)
    addDebugInfo(`📊 Custom markers in DOM: ${document.querySelectorAll('.debug-marker').length}`)

  }, [mapLoaded, filteredPlaces, onPlaceSelect])

  return (
    <div className="w-full h-full relative">
      {/* Debug Panel */}
      <div className="absolute top-4 right-4 w-80 max-h-96 bg-black/90 text-white p-3 rounded-lg text-xs overflow-y-auto z-20 font-mono">
        <div className="font-bold mb-2">🐛 SUPER DEBUG MODE</div>
        <div className="mb-2 text-yellow-300">
          Map: {mapLoaded ? '✅ Ready' : '⏳ Loading'} | 
          Markers: {markers.current.length} | 
          Places: {filteredPlaces.length}
        </div>
        <div className="space-y-1 max-h-60 overflow-y-auto">
          {debugInfo.slice(-15).map((info, index) => (
            <div key={index} className="text-xs whitespace-pre-wrap">
              {info}
            </div>
          ))}
        </div>
        <div className="mt-2 text-yellow-300">
          Selected: {selectedPlaceId || 'None'}
        </div>
      </div>

      {/* Map Container */}
      <div 
        ref={mapContainer}
        className="w-full h-full"
        style={{ minHeight: '700px' }}
      />
    </div>
  )
}