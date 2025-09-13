'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { getPriceSymbol, type Place } from '@/data/tepoztlan-places'

interface MapboxClickFixedProps {
  className?: string
  onPlaceSelect?: (placeId: string) => void
  filteredPlaces: Place[]
  selectedPlaceId?: string | null
  is3DMode?: boolean
  isFullscreen?: boolean
  onToggleFullscreen?: () => void
}

interface MarkerInfo {
  marker: mapboxgl.Marker
  place: Place
  element: HTMLElement
  clickHandler: (e: Event) => void
}

export default function MapboxClickFixed({ 
  className = '', 
  onPlaceSelect,
  filteredPlaces,
  selectedPlaceId,
  is3DMode = false,
  isFullscreen = false,
  onToggleFullscreen
}: MapboxClickFixedProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersInfo = useRef<MarkerInfo[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)

  // Stable click handler that doesn't change
  const handleMarkerClick = useCallback((placeId: string, placeName: string) => {
    console.log(`🎯 CLICK HANDLER: ${placeName} (${placeId})`)
    if (onPlaceSelect) {
      onPlaceSelect(placeId)
    }
  }, [onPlaceSelect])

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return

    console.log('🗺️ Initializing Mapbox with click fixes...')

    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    if (!accessToken) {
      console.error('❌ NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN is required')
      return
    }

    mapboxgl.accessToken = accessToken
    console.log('✅ Access token set')

    // Create map
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-99.1017, 18.9847], // Tepoztlán center
      zoom: 14
    })

    map.current = mapInstance
    console.log('📍 Map instance created')

    // Wait for map to load
    mapInstance.on('load', () => {
      console.log('✅ Map loaded! Ready for markers.')
      
      // Remove POI labels
      try {
        console.log('🧹 Hiding default POI labels...')
        const layers = mapInstance.getStyle().layers
        let hiddenCount = 0
        
        layers.forEach(layer => {
          if (layer.type === 'symbol' && 
              (layer.id.includes('poi') || 
               layer.id.includes('place-label'))) {
            try {
              mapInstance.setLayoutProperty(layer.id, 'visibility', 'none')
              hiddenCount++
            } catch {
              // Ignore errors for layers that can't be hidden
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
      // Clean up event listeners
      markersInfo.current.forEach(({ element, clickHandler }) => {
        element.removeEventListener('click', clickHandler)
      })
      markersInfo.current = []
      
      mapInstance.remove()
      map.current = null
      setMapLoaded(false)
    }
  }, [])

  // Handle 3D mode changes
  useEffect(() => {
    if (!map.current || !mapLoaded) return

    console.log('🏔️ 3D Mode changed to:', is3DMode)
    
    try {
      if (is3DMode) {
        // Enable 3D mode with tilted view
        map.current.easeTo({
          pitch: 45,
          bearing: 0,
          duration: 1000
        })
        console.log('✅ 3D mode activated: pitch set to 45°')
      } else {
        // Return to 2D mode
        map.current.easeTo({
          pitch: 0,
          bearing: 0,
          duration: 1000
        })
        console.log('✅ 2D mode activated: pitch reset to 0°')
      }
    } catch (error) {
      console.error('❌ Error changing 3D mode:', error)
    }
  }, [is3DMode, mapLoaded])

  // Handle fullscreen changes - resize map
  useEffect(() => {
    if (!map.current || !mapLoaded) return

    console.log('📺 Fullscreen mode changed to:', isFullscreen)
    
    try {
      // Resize map to fit new container
      setTimeout(() => {
        if (map.current) {
          map.current.resize()
          console.log('✅ Map resized for fullscreen change')
        }
      }, 100)
    } catch (error) {
      console.error('❌ Error resizing map for fullscreen:', error)
    }
  }, [isFullscreen, mapLoaded])

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

    console.log(`📍 ADDING MARKERS: ${filteredPlaces.length} places`)

    // Clean up existing markers and event listeners
    markersInfo.current.forEach(({ marker, element, clickHandler }) => {
      console.log('🧹 Cleaning up marker and event listener')
      element.removeEventListener('click', clickHandler)
      marker.remove()
    })
    markersInfo.current = []

    // Add new markers
    filteredPlaces.forEach((place, index) => {
      console.log(`📍 Adding marker ${index + 1}: ${place.name}`)

      try {
        let marker: mapboxgl.Marker

        // Create marker using different methods for variety
        if (index % 3 === 0) {
          // Default marker
          marker = new mapboxgl.Marker()
            .setLngLat(place.coordinates)
            .addTo(map.current!)
        } else if (index % 3 === 1) {
          // Colored marker
          const colors = ['red', 'blue', 'green', 'orange', 'purple']
          const color = colors[index % colors.length]
          marker = new mapboxgl.Marker({ color })
            .setLngLat(place.coordinates)
            .addTo(map.current!)
        } else {
          // Custom HTML marker
          const el = document.createElement('div')
          el.style.cssText = `
            width: 30px;
            height: 30px;
            background-color: #ff6b6b;
            border: 2px solid white;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          `
          
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

          marker = new mapboxgl.Marker(el)
            .setLngLat(place.coordinates)
            .addTo(map.current!)
        }

        // Add popup
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

        // Get marker element and add click handler
        const element = marker.getElement()
        
        // Create click handler for this specific marker
        const clickHandler = (e: Event) => {
          e.preventDefault()
          e.stopPropagation()
          console.log(`🎯 MARKER CLICKED: ${place.name}`)
          handleMarkerClick(place.id, place.name)
        }

        // Add event listener
        element.addEventListener('click', clickHandler)
        
        // Make sure marker is clickable
        element.style.cursor = 'pointer'
        element.style.zIndex = '1000'
        
        console.log(`✅ Marker ${index + 1} created with click handler`)

        // Store marker info for cleanup
        markersInfo.current.push({
          marker,
          place,
          element,
          clickHandler
        })

      } catch (error) {
        console.error(`❌ Failed to add marker for ${place.name}:`, error)
      }
    })

    console.log(`✅ MARKERS ADDED: ${markersInfo.current.length}/${filteredPlaces.length} markers`)
  }, [mapLoaded, filteredPlaces, handleMarkerClick])

  // Handle selected place highlighting and fly-to
  useEffect(() => {
    console.log(`🔄 Selection effect triggered:`, {
      selectedPlaceId,
      mapReady: !!map.current,
      mapLoaded,
      filteredPlacesCount: filteredPlaces.length
    })

    if (selectedPlaceId && map.current && mapLoaded) {
      const selectedPlace = filteredPlaces.find(p => p.id === selectedPlaceId)
      
      console.log(`🔍 Looking for place with ID: ${selectedPlaceId}`)
      console.log(`🔍 Available places:`, filteredPlaces.map(p => p.id))
      console.log(`🔍 Found place:`, selectedPlace ? selectedPlace.name : 'NOT FOUND')
      
      if (selectedPlace) {
        console.log(`✈️ Flying to selected place: ${selectedPlace.name} at [${selectedPlace.coordinates}]`)
        
        // Update marker styles to show selection
        let highlightedCount = 0
        markersInfo.current.forEach(({ place, element }) => {
          if (place.id === selectedPlaceId) {
            // Highlight selected marker
            element.style.transform = 'scale(1.2)'
            element.style.zIndex = '2000'
            element.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.8)'
            highlightedCount++
            console.log(`✨ Highlighted marker for: ${place.name}`)
          } else {
            // Reset other markers
            element.style.transform = 'scale(1)'
            element.style.zIndex = '1000'
            element.style.boxShadow = 'none'
          }
        })
        
        console.log(`✨ Highlighted ${highlightedCount} markers`)
        
        // Fly to the selected place
        map.current.flyTo({
          center: selectedPlace.coordinates,
          zoom: 16,
          duration: 1500
        })
        
        console.log(`✈️ Initiated flyTo to [${selectedPlace.coordinates}]`)
      } else {
        console.warn(`❌ Could not find place with ID: ${selectedPlaceId}`)
        console.warn(`❌ Available IDs:`, filteredPlaces.map(p => p.id))
      }
    } else {
      console.log(`⏳ Not ready for selection:`, {
        hasSelectedPlace: !!selectedPlaceId,
        hasMap: !!map.current,
        mapLoaded
      })
    }
  }, [selectedPlaceId, filteredPlaces, mapLoaded])

  // Zoom functions



  // Call the map methods directly - don't call parent callbacks to avoid recursion
  const zoomInHandler = useCallback(() => {
    if (map.current && mapLoaded) {
      console.log('🔍 ZOOM IN HANDLER: Executing zoom in')
      const currentZoom = map.current.getZoom()
      map.current.easeTo({ zoom: currentZoom + 1, duration: 500 })
      // Don't call onZoomIn() here - it would cause recursion
    }
  }, [mapLoaded])

  const zoomOutHandler = useCallback(() => {
    if (map.current && mapLoaded) {
      console.log('🔍 ZOOM OUT HANDLER: Executing zoom out')
      const currentZoom = map.current.getZoom()
      map.current.easeTo({ zoom: currentZoom - 1, duration: 500 })
      // Don't call onZoomOut() here - it would cause recursion
    }
  }, [mapLoaded])

  const resetViewHandler = useCallback(() => {
    if (map.current && mapLoaded) {
      console.log('🔄 RESET VIEW HANDLER: Executing reset')
      map.current.easeTo({
        center: [-99.0983, 18.9875], // Tepoztlán coordinates
        zoom: 13,
        pitch: 0,
        bearing: 0,
        duration: 1000
      })
      // Don't call onResetView() here - it would cause recursion
    }
  }, [mapLoaded])

  // Set up window methods for external access
  useEffect(() => {
    if (mapLoaded) {
      console.log('🗺️ Setting up window methods for map controls')
      ;(window as Window & { mapZoomIn?: () => void, mapZoomOut?: () => void, mapResetView?: () => void }).mapZoomIn = zoomInHandler
      ;(window as Window & { mapZoomIn?: () => void, mapZoomOut?: () => void, mapResetView?: () => void }).mapZoomOut = zoomOutHandler
      ;(window as Window & { mapZoomIn?: () => void, mapZoomOut?: () => void, mapResetView?: () => void }).mapResetView = resetViewHandler
      console.log('✅ Window methods set up:', {
        zoomIn: !!zoomInHandler,
        zoomOut: !!zoomOutHandler,
        resetView: !!resetViewHandler
      })
    }
  }, [zoomInHandler, zoomOutHandler, resetViewHandler, mapLoaded])

  // Add overlay controls directly to the canvas container
  useEffect(() => {
    if (!map.current || !mapLoaded) return

    console.log('🎛️ Adding overlay controls to canvas container')
    const canvasContainer = map.current.getCanvasContainer()
    
    // Create controls container
    const controlsContainer = document.createElement('div')
    controlsContainer.id = 'mapbox-overlay-controls'
    controlsContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 10;
    `

    // Top-right controls
    const topRightControls = document.createElement('div')
    topRightControls.style.cssText = `
      position: absolute;
      top: 16px;
      right: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      pointer-events: none;
    `

    // Bottom-right controls
    const bottomRightControls = document.createElement('div')
    bottomRightControls.style.cssText = `
      position: absolute;
      bottom: 20px;
      right: 20px;
      display: flex;
      flex-direction: column-reverse;
      gap: 8px;
      pointer-events: none;
      max-height: 120px;
      overflow: visible;
    `

    // Create buttons
    const createButton = (icon: string, onClick: () => void, className: string = '') => {
      const button = document.createElement('button')
      button.innerHTML = icon
      button.style.cssText = `
        width: 44px;
        height: 44px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(8px);
        border: 2px solid rgba(255, 255, 255, 0.2);
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        transition: all 0.3s ease;
        pointer-events: auto;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        margin: 0;
        padding: 0;
        ${className}
      `
      button.addEventListener('mouseenter', () => {
        button.style.background = 'rgba(255, 255, 255, 0.2)'
        button.style.transform = 'scale(1.05)'
      })
      button.addEventListener('mouseleave', () => {
        button.style.background = 'rgba(255, 255, 255, 0.1)'
        button.style.transform = 'scale(1)'
      })
      button.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick()
      })
      return button
    }

    // 3D Toggle Button
    const toggle3DButton = createButton(
      is3DMode ? '🏔️' : '🌍', 
      () => {
        console.log('🚨 3D TOGGLE FROM CANVAS!')
        if (map.current && mapLoaded) {
          const newPitch = is3DMode ? 0 : 45
          console.log('🔄 Setting pitch to:', newPitch)
          map.current.easeTo({ pitch: newPitch, duration: 1000 })
        } else {
          console.log('❌ Map not available for 3D toggle')
        }
      },
      is3DMode ? 'background: rgba(16, 185, 129, 0.9) !important; border-color: rgba(16, 185, 129, 0.6);' : ''
    )

    // Zoom In Button
    const zoomInButton = createButton('➕', zoomInHandler)
    zoomInButton.id = 'zoom-in-button'
    zoomInButton.setAttribute('data-testid', 'zoom-in')
    // Zoom Out Button  
    const zoomOutButton = createButton('➖', zoomOutHandler)
    zoomOutButton.id = 'zoom-out-button'
    zoomOutButton.setAttribute('data-testid', 'zoom-out')

    // Reset View Button
    const resetButton = createButton('🔄', resetViewHandler)

    // Fullscreen Button
    const fullscreenButton = createButton(
      isFullscreen ? '🗗' : '🗖',
      () => {
        console.log('🚨 FULLSCREEN FROM CANVAS OVERLAY!')
        if (onToggleFullscreen) {
          console.log('🚨 Calling parent fullscreen toggle from canvas')
          onToggleFullscreen()
        } else {
          console.log('❌ No fullscreen callback provided to canvas button')
        }
      }
    )

    // Add buttons to containers
    topRightControls.appendChild(toggle3DButton)
    topRightControls.appendChild(fullscreenButton)
    topRightControls.appendChild(resetButton)
    
    bottomRightControls.appendChild(zoomInButton)
    bottomRightControls.appendChild(zoomOutButton)

    // Add containers to controls container
    controlsContainer.appendChild(topRightControls)
    controlsContainer.appendChild(bottomRightControls)

    // Add to canvas container
    canvasContainer.appendChild(controlsContainer)

    // Cleanup function
    return () => {
      const existingControls = canvasContainer.querySelector('#mapbox-overlay-controls')
      if (existingControls) {
        canvasContainer.removeChild(existingControls)
      }
    }
  }, [mapLoaded, is3DMode, isFullscreen, zoomInHandler, zoomOutHandler, resetViewHandler, onToggleFullscreen])

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Status indicator */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm z-10 border">
        <div className="font-medium">
          {mapLoaded ? '✅ Map Ready' : '⏳ Loading...'}
        </div>
        <div className="text-xs text-gray-600">
          Markers: {markersInfo.current.length}/{filteredPlaces.length}
        </div>
        <div className="text-xs text-gray-600">
          Selected: {selectedPlaceId || 'None'}
        </div>
        <div className="text-xs text-blue-600">
          Click markers to select!
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