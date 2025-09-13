'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import maplibregl from 'maplibre-gl'
import { getPriceSymbol, type Place } from '@/data/tepoztlan-places'

interface CorrectMapLibreMapProps {
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

export default function CorrectMapLibreMap({ 
  className = '', 
  onPlaceSelect,
  filteredPlaces,
  selectedPlaceId
}: CorrectMapLibreMapProps) {
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

    console.log('🗺️ Initializing map with correct MapLibre v5.x syntax...')

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
        markersInfo.current.forEach(({ marker, element, clickHandler }) => {
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

  // Add markers when map loads and places change
  useEffect(() => {
    if (!map.current || !mapLoaded || filteredPlaces.length === 0) return

    console.log(`📍 Adding ${filteredPlaces.length} markers with CORRECT v5.x syntax`)

    // Clean up existing markers
    markersInfo.current.forEach(({ marker, element, clickHandler }) => {
      element.removeEventListener('click', clickHandler)
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

    // Add markers for all places using CORRECT v5.x syntax
    filteredPlaces.forEach((place, index) => {
      try {
        console.log(`📍 Creating marker ${index + 1}: ${place.name}`)

        // Create custom marker element
        const el = document.createElement('div')
        
        // Add proper CSS class for MapLibre styling
        el.className = 'custom-place-marker'
        el.setAttribute('data-place-id', place.id)
        
        // Style the element properly for pin-style marker
        el.style.cssText = `
          background-color: ${categoryColors[place.category] || '#666'};
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          transition: all 0.2s ease;
          user-select: none;
          position: relative;
        `
        el.innerHTML = categoryIcons[place.category] || '📍'
        
        // Create click handler
        const clickHandler = (e: Event) => {
          e.preventDefault()
          e.stopPropagation()
          
          // Visual feedback
          el.style.transform = 'scale(0.9)'
          setTimeout(() => {
            el.style.transform = 'scale(1)'
          }, 150)
          
          handleMarkerClick(place.id, place.name)
        }

        // Hover effects
        const mouseEnterHandler = () => {
          el.style.transform = 'scale(1.2)'
          el.style.zIndex = '10'
        }

        const mouseLeaveHandler = () => {
          const isSelected = selectedPlaceId === place.id
          el.style.transform = isSelected ? 'scale(1.3)' : 'scale(1)'
          el.style.zIndex = isSelected ? '20' : '1'
        }

        // Create popup
        const popupContent = `
          <div style="min-width: 200px; font-family: system-ui, sans-serif; padding: 8px;">
            <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 15px; font-weight: 600;">
              ${place.name}
            </h3>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
              <span style="color: #facc15; font-size: 13px;">★ ${place.rating}</span>
              <span style="color: #6b7280; font-size: 13px;">•</span>
              <span style="color: #6b7280; font-size: 13px;">${getPriceSymbol(place.priceLevel)}</span>
            </div>
            <p style="margin: 0 0 6px 0; color: #4b5563; font-size: 12px; line-height: 1.4;">
              ${place.description.substring(0, 80)}${place.description.length > 80 ? '...' : ''}
            </p>
            ${place.address ? `
              <p style="margin: 0; color: #6b7280; font-size: 11px;">
                📍 ${place.address}
              </p>
            ` : ''}
          </div>
        `

        // CORRECT v5.x marker constructor syntax with options object
        const marker = new maplibregl.Marker({
          element: el,
          anchor: 'center', // Center the marker on the coordinate
          offset: [0, 0], // No offset needed for center anchor
          draggable: false
        })
          .setLngLat(place.coordinates)
          .setPopup(
            new maplibregl.Popup({ 
              offset: 25,
              maxWidth: '240px',
              className: 'place-popup'
            }).setHTML(popupContent)
          )
          .addTo(map.current!)

        // Add event listeners to marker element
        const markerElement = marker.getElement()
        markerElement.addEventListener('click', clickHandler)
        markerElement.addEventListener('mouseenter', mouseEnterHandler)
        markerElement.addEventListener('mouseleave', mouseLeaveHandler)

        // Store marker info
        markersInfo.current.push({
          marker,
          place,
          element: markerElement,
          clickHandler
        })

        console.log(`✅ Added marker for ${place.name} using correct v5.x syntax`)

      } catch (error) {
        console.error(`❌ Failed to add marker for ${place.name}:`, error)
      }
    })

    console.log(`✅ Added ${markersInfo.current.length} markers successfully`)
  }, [mapLoaded, filteredPlaces, handleMarkerClick, selectedPlaceId])

  // Handle selected place highlighting
  useEffect(() => {
    if (!selectedPlaceId || !map.current || !mapLoaded) return

    const selectedPlace = filteredPlaces.find(p => p.id === selectedPlaceId)
    if (!selectedPlace) return

    console.log(`✈️ Flying to: ${selectedPlace.name}`)

    // Update marker styles
    markersInfo.current.forEach(({ element, place }) => {
      if (place.id === selectedPlaceId) {
        element.style.transform = 'scale(1.3)'
        element.style.zIndex = '20'
        element.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.8), 0 2px 8px rgba(0,0,0,0.3)'
        element.style.borderColor = '#3b82f6'
        element.style.borderWidth = '3px'
      } else {
        element.style.transform = 'scale(1)'
        element.style.zIndex = '1'
        element.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)'
        element.style.borderColor = 'white'
        element.style.borderWidth = '2px'
      }
    })

    // Fly to selected place
    map.current.flyTo({
      center: selectedPlace.coordinates,
      zoom: 16,
      duration: 1500
    })
  }, [selectedPlaceId, filteredPlaces, mapLoaded])

  // Add fullscreen control
  useEffect(() => {
    if (!map.current || !mapLoaded || !isFullscreenSupported()) return

    const canvasContainer = map.current.getCanvasContainer()
    
    // Create fullscreen button
    const fullscreenBtn = document.createElement('button')
    fullscreenBtn.innerHTML = isFullscreen ? '⛶' : '⛶'
    fullscreenBtn.title = isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'
    fullscreenBtn.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      width: 32px;
      height: 32px;
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid #ccc;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 1px 4px rgba(0,0,0,0.2);
      transition: all 0.2s ease;
    `

    fullscreenBtn.addEventListener('mouseenter', () => {
      fullscreenBtn.style.background = 'rgba(255, 255, 255, 1)'
      fullscreenBtn.style.transform = 'scale(1.05)'
    })

    fullscreenBtn.addEventListener('mouseleave', () => {
      fullscreenBtn.style.background = 'rgba(255, 255, 255, 0.9)'
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
          <p className="text-sm text-slate-400 mt-2">Using correct MapLibre v5.x syntax</p>
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
          MapLibre v5.x Ready
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
          {isFullscreen ? '🖥️ Fullscreen' : '🖼️ Window'} | Syntax: ✅
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