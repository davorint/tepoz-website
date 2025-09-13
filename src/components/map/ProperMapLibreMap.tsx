'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import maplibregl from 'maplibre-gl'
import { getPriceSymbol, type Place } from '@/data/tepoztlan-places'

interface ProperMapLibreMapProps {
  className?: string
  onPlaceSelect?: (placeId: string) => void
  filteredPlaces: Place[]
  selectedPlaceId?: string | null
}

interface MarkerInfo {
  marker: maplibregl.Marker
  place: Place
  element: HTMLElement
  clickHandler: (e: Event) => void
}

export default function ProperMapLibreMap({ 
  className = '', 
  onPlaceSelect,
  filteredPlaces,
  selectedPlaceId
}: ProperMapLibreMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapContainerWrapper = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const markersInfo = useRef<MarkerInfo[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Check fullscreen support
  const isFullscreenSupported = useCallback(() => {
    return !!(
      document.fullscreenEnabled ||
      (document as Document & { webkitFullscreenEnabled?: boolean }).webkitFullscreenEnabled ||
      (document as Document & { mozFullScreenEnabled?: boolean }).mozFullScreenEnabled ||
      (document as Document & { msFullscreenEnabled?: boolean }).msFullscreenEnabled
    )
  }, [])

  // Cross-browser fullscreen methods
  const requestFullscreen = useCallback((element: HTMLElement): Promise<void> => {
    return new Promise((resolve, reject) => {
      const requestMethod = 
        element.requestFullscreen ||
        (element as HTMLElement & { webkitRequestFullscreen?: () => Promise<void> }).webkitRequestFullscreen ||
        (element as HTMLElement & { mozRequestFullScreen?: () => Promise<void> }).mozRequestFullScreen ||
        (element as HTMLElement & { msRequestFullscreen?: () => Promise<void> }).msRequestFullscreen

      if (!requestMethod) {
        reject(new Error('Fullscreen not supported'))
        return
      }

      try {
        const result = requestMethod.call(element)
        if (result && typeof result.then === 'function') {
          result.then(resolve).catch(reject)
        } else {
          resolve()
        }
      } catch (error) {
        reject(error)
      }
    })
  }, [])

  const exitFullscreen = useCallback((): Promise<void> => {
    return new Promise((resolve, reject) => {
      const exitMethod = 
        document.exitFullscreen ||
        (document as Document & { webkitExitFullscreen?: () => Promise<void> }).webkitExitFullscreen ||
        (document as Document & { mozCancelFullScreen?: () => Promise<void> }).mozCancelFullScreen ||
        (document as Document & { msExitFullscreen?: () => Promise<void> }).msExitFullscreen

      if (!exitMethod) {
        reject(new Error('Exit fullscreen not supported'))
        return
      }

      try {
        const result = exitMethod.call(document)
        if (result && typeof result.then === 'function') {
          result.then(resolve).catch(reject)
        } else {
          resolve()
        }
      } catch (error) {
        reject(error)
      }
    })
  }, [])

  // Toggle fullscreen
  const toggleFullscreen = useCallback(async () => {
    if (!mapContainerWrapper.current || !isFullscreenSupported()) {
      console.warn('Fullscreen not supported or no container')
      return
    }

    try {
      const currentFullscreenElement = 
        document.fullscreenElement ||
        (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement ||
        (document as Document & { mozFullScreenElement?: Element }).mozFullScreenElement ||
        (document as Document & { msFullscreenElement?: Element }).msFullscreenElement

      if (!currentFullscreenElement) {
        await requestFullscreen(mapContainerWrapper.current)
      } else {
        await exitFullscreen()
      }
    } catch (error) {
      console.error('Fullscreen error:', error)
    }
  }, [requestFullscreen, exitFullscreen, isFullscreenSupported])

  // Listen to fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement ||
        (document as Document & { mozFullScreenElement?: Element }).mozFullScreenElement ||
        (document as Document & { msFullscreenElement?: Element }).msFullscreenElement
      )
      
      setIsFullscreen(isCurrentlyFullscreen)
      
      // Resize map when fullscreen changes
      setTimeout(() => {
        if (map.current) {
          map.current.resize()
        }
      }, 100)
    }

    const events = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'msfullscreenchange']
    events.forEach(event => {
      document.addEventListener(event, handleFullscreenChange)
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleFullscreenChange)
      })
    }
  }, [])

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    console.log('🗺️ Initializing map with proper MapLibre positioning...')

    const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY
    if (!API_KEY || API_KEY === 'your_maptiler_api_key_here') {
      setMapError('MapTiler API key is missing or invalid')
      return
    }

    try {
      const mapInstance = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
        center: [-99.1017, 18.9847], // Tepoztlán
        zoom: 14,
        attributionControl: false
      })

      map.current = mapInstance

      // Add attribution control
      mapInstance.addControl(new maplibregl.AttributionControl(), 'bottom-right')

      // Add navigation controls
      mapInstance.addControl(new maplibregl.NavigationControl(), 'top-left')

      mapInstance.on('load', () => {
        console.log('✅ Map loaded successfully')
        setMapLoaded(true)
        setMapError(null)
      })

      mapInstance.on('error', (e) => {
        console.error('❌ Map error:', e.error)
        setMapError(`Map error: ${e.error?.message || 'Unknown error'}`)
      })

      return () => {
        console.log('🧹 Cleaning up map')
        // Clean up in reverse order to prevent transform accumulation
        markersInfo.current.reverse().forEach(({ marker, element, clickHandler }) => {
          element.removeEventListener('click', clickHandler)
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

  // Stable click handler
  const handleMarkerClick = useCallback((placeId: string, placeName: string) => {
    console.log(`🎯 Marker clicked: ${placeName}`)
    if (onPlaceSelect) {
      onPlaceSelect(placeId)
    }
  }, [onPlaceSelect])

  // Add markers when map loads and places change - using batch creation to prevent drift
  useEffect(() => {
    if (!map.current || !mapLoaded || filteredPlaces.length === 0) return

    console.log(`📍 Creating ${filteredPlaces.length} markers with clean context (batch mode)`)

    // CRITICAL: Clean up ALL existing markers first to reset transform context
    markersInfo.current.forEach(({ marker, element, clickHandler }) => {
      element.removeEventListener('click', clickHandler)
      marker.remove()
    })
    markersInfo.current = []

    // Force garbage collection to prevent transform accumulation
    if (typeof window.gc === 'function') {
      window.gc()
    }

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

    // Batch create markers with completely clean DOM contexts
    const newMarkers: MarkerInfo[] = []
    
    filteredPlaces.forEach((place, index) => {
      try {
        console.log(`📍 Creating marker ${index + 1}: ${place.name}`)

        // Create completely isolated marker element
        const el = document.createElement('div')
        
        // Set a unique class to prevent CSS conflicts
        el.className = `tepoztlan-marker-${place.category}`
        el.setAttribute('data-place-id', place.id)
        el.setAttribute('data-marker-index', index.toString())
        
        // Use inline styles to avoid CSS cascade issues
        // Based on Mapbox best practices for custom markers
        el.style.cssText = `
          background-color: ${categoryColors[place.category] || '#666'};
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 1px 4px rgba(0,0,0,0.3);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-family: system-ui, sans-serif;
          transition: all 0.15s ease;
          user-select: none;
          -webkit-user-select: none;
          position: relative;
          z-index: 1;
        `
        el.innerHTML = categoryIcons[place.category] || '📍'
        
        // Create click handler with proper event isolation
        const clickHandler = (e: Event) => {
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()
          
          // Visual feedback
          el.style.transform = 'scale(0.9)'
          setTimeout(() => {
            el.style.transform = 'scale(1)'
          }, 100)
          
          handleMarkerClick(place.id, place.name)
        }

        // Hover effects with proper cleanup
        const mouseEnterHandler = () => {
          el.style.transform = 'scale(1.2)'
          el.style.zIndex = '10'
        }

        const mouseLeaveHandler = () => {
          const isSelected = selectedPlaceId === place.id
          el.style.transform = isSelected ? 'scale(1.3)' : 'scale(1)'
          el.style.zIndex = isSelected ? '20' : '1'
        }

        // Create popup with proper content
        const popupContent = `
          <div style="min-width: 180px; font-family: system-ui, sans-serif; padding: 6px;">
            <h3 style="margin: 0 0 6px 0; color: #1f2937; font-size: 14px; font-weight: 600;">
              ${place.name}
            </h3>
            <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 4px;">
              <span style="color: #facc15; font-size: 12px;">★ ${place.rating}</span>
              <span style="color: #6b7280; font-size: 12px;">•</span>
              <span style="color: #6b7280; font-size: 12px;">${getPriceSymbol(place.priceLevel)}</span>
            </div>
            <p style="margin: 0 0 4px 0; color: #4b5563; font-size: 11px; line-height: 1.3;">
              ${place.description.substring(0, 60)}${place.description.length > 60 ? '...' : ''}
            </p>
            ${place.address ? `
              <p style="margin: 0; color: #6b7280; font-size: 10px;">
                📍 ${place.address}
              </p>
            ` : ''}
          </div>
        `

        // Use proper MapLibre v5.x syntax with optimized positioning
        const marker = new maplibregl.Marker({
          element: el,
          anchor: 'center', // Use center anchor for most stable positioning
          offset: [0, 0],   // No offset to prevent drift accumulation
          draggable: false,
          // Enable subpixel positioning for smoother movement (MapLibre feature)
          pitchAlignment: 'map',
          rotationAlignment: 'map'
        })
          .setLngLat(place.coordinates)
          .setPopup(
            new maplibregl.Popup({ 
              offset: 15,
              maxWidth: '200px',
              className: 'tepoztlan-popup',
              closeButton: true,
              closeOnClick: false,
              // Disable subpixel positioning for popups to prevent drift
              subpixelPositioning: false
            }).setHTML(popupContent)
          )

        // Enable subpixel positioning for smoother movement (MapLibre specific)
        if (typeof marker.setSubpixelPositioning === 'function') {
          marker.setSubpixelPositioning(true)
        }

        // Add marker to map
        marker.addTo(map.current!)

        // Get marker element and add event listeners
        const markerElement = marker.getElement()
        markerElement.addEventListener('click', clickHandler, { passive: false })
        markerElement.addEventListener('mouseenter', mouseEnterHandler, { passive: true })
        markerElement.addEventListener('mouseleave', mouseLeaveHandler, { passive: true })

        // Store marker info for batch management
        newMarkers.push({
          marker,
          place,
          element: markerElement,
          clickHandler
        })

        console.log(`✅ Added marker for ${place.name} (${index + 1}/${filteredPlaces.length})`)

      } catch (error) {
        console.error(`❌ Failed to add marker for ${place.name}:`, error)
      }
    })

    // Update markers reference atomically to prevent partial state
    markersInfo.current = newMarkers

    console.log(`✅ Batch created ${markersInfo.current.length} markers successfully`)
  }, [mapLoaded, filteredPlaces, handleMarkerClick, selectedPlaceId])

  // Handle selected place highlighting with proper coordinate handling
  useEffect(() => {
    if (!selectedPlaceId || !map.current || !mapLoaded) return

    const selectedPlace = filteredPlaces.find(p => p.id === selectedPlaceId)
    if (!selectedPlace) return

    console.log(`✈️ Flying to: ${selectedPlace.name}`)

    // Update marker styles efficiently
    markersInfo.current.forEach(({ element, place }) => {
      if (place.id === selectedPlaceId) {
        element.style.transform = 'scale(1.3)'
        element.style.zIndex = '20'
        element.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.6), 0 1px 4px rgba(0,0,0,0.3)'
        element.style.borderColor = '#3b82f6'
        element.style.borderWidth = '3px'
      } else {
        element.style.transform = 'scale(1)'
        element.style.zIndex = '1'
        element.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)'
        element.style.borderColor = 'white'
        element.style.borderWidth = '2px'
      }
    })

    // Use precise coordinates for smooth flying
    map.current.flyTo({
      center: selectedPlace.coordinates,
      zoom: 16,
      duration: 1200,
      essential: true,
      // Reduce animation curves to prevent positioning issues
      curve: 1.2
    })
  }, [selectedPlaceId, filteredPlaces, mapLoaded])

  // Add fullscreen control
  useEffect(() => {
    if (!map.current || !mapLoaded || !isFullscreenSupported()) return

    const canvasContainer = map.current.getCanvasContainer()
    
    // Create fullscreen button
    const fullscreenBtn = document.createElement('button')
    fullscreenBtn.innerHTML = isFullscreen ? '⛶' : '⛶'
    fullscreenBtn.title = isFullscreen ? 'Exit Fullscreen (ESC)' : 'Enter Fullscreen'
    fullscreenBtn.style.cssText = `
      position: absolute;
      top: 8px;
      right: 8px;
      width: 28px;
      height: 28px;
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid #ddd;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      transition: all 0.15s ease;
      font-family: system-ui, sans-serif;
    `

    fullscreenBtn.addEventListener('mouseenter', () => {
      fullscreenBtn.style.background = 'rgba(255, 255, 255, 1)'
      fullscreenBtn.style.transform = 'scale(1.05)'
    })

    fullscreenBtn.addEventListener('mouseleave', () => {
      fullscreenBtn.style.background = 'rgba(255, 255, 255, 0.95)'
      fullscreenBtn.style.transform = 'scale(1)'
    })

    fullscreenBtn.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      toggleFullscreen()
    })

    canvasContainer.appendChild(fullscreenBtn)

    return () => {
      if (canvasContainer.contains(fullscreenBtn)) {
        canvasContainer.removeChild(fullscreenBtn)
      }
    }
  }, [mapLoaded, isFullscreen, toggleFullscreen, isFullscreenSupported])

  // Error state
  if (mapError) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-slate-100 ${className}`}
           style={{ minHeight: '700px' }}>
        <div className="text-center p-8">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Map Error</h3>
          <p className="text-slate-600 text-sm max-w-md mb-4">
            {mapError}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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
          <p className="text-sm text-slate-400 mt-2">Using proper MapLibre positioning</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={mapContainerWrapper}
      className={`relative w-full h-full ${className} ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`} 
      style={{ minHeight: '700px' }}
    >
      {/* Status indicator */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg text-sm z-10 border shadow-lg">
        <div className="font-medium text-green-600 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Proper MapLibre
        </div>
        <div className="text-xs text-gray-600 mt-1">
          Markers: {markersInfo.current.length}/{filteredPlaces.length}
        </div>
        {selectedPlaceId && (
          <div className="text-xs text-blue-600 mt-1 font-medium">
            📍 {filteredPlaces.find(p => p.id === selectedPlaceId)?.name}
          </div>
        )}
        <div className="text-xs text-gray-500 mt-1">
          {isFullscreen ? '🖥️ Fullscreen' : '🖼️ Window'} | Positioning: ✅
        </div>
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