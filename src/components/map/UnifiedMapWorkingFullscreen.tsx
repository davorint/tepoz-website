'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { getPriceSymbol, type Place } from '@/data/tepoztlan-places'

interface UnifiedMapWorkingFullscreenProps {
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

export default function UnifiedMapWorkingFullscreen({ 
  className = '', 
  onPlaceSelect,
  filteredPlaces,
  selectedPlaceId
}: UnifiedMapWorkingFullscreenProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapContainerWrapper = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const markersInfo = useRef<MarkerInfo[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fullscreenSupported, setFullscreenSupported] = useState(false)

  // Check fullscreen support on mount
  useEffect(() => {
    const checkFullscreenSupport = () => {
      const isSupported = !!(
        document.fullscreenEnabled ||
        (document as Document & { webkitFullscreenEnabled?: boolean, mozFullScreenEnabled?: boolean, msFullscreenEnabled?: boolean, webkitFullscreenElement?: Element, mozFullScreenElement?: Element, msFullscreenElement?: Element, webkitExitFullscreen?: () => Promise<void>, mozCancelFullScreen?: () => Promise<void>, msExitFullscreen?: () => Promise<void> }).webkitFullscreenEnabled ||
        (document as Document & { webkitFullscreenEnabled?: boolean, mozFullScreenEnabled?: boolean, msFullscreenEnabled?: boolean, webkitFullscreenElement?: Element, mozFullScreenElement?: Element, msFullscreenElement?: Element, webkitExitFullscreen?: () => Promise<void>, mozCancelFullScreen?: () => Promise<void>, msExitFullscreen?: () => Promise<void> }).mozFullScreenEnabled ||
        (document as Document & { webkitFullscreenEnabled?: boolean, mozFullScreenEnabled?: boolean, msFullscreenEnabled?: boolean, webkitFullscreenElement?: Element, mozFullScreenElement?: Element, msFullscreenElement?: Element, webkitExitFullscreen?: () => Promise<void>, mozCancelFullScreen?: () => Promise<void>, msExitFullscreen?: () => Promise<void> }).msFullscreenEnabled
      )
      
      console.log('🔍 Fullscreen API Support Check:', {
        fullscreenEnabled: document.fullscreenEnabled,
        webkitFullscreenEnabled: (document as Document & { webkitFullscreenEnabled?: boolean, mozFullScreenEnabled?: boolean, msFullscreenEnabled?: boolean, webkitFullscreenElement?: Element, mozFullScreenElement?: Element, msFullscreenElement?: Element, webkitExitFullscreen?: () => Promise<void>, mozCancelFullScreen?: () => Promise<void>, msExitFullscreen?: () => Promise<void> }).webkitFullscreenEnabled,
        mozFullScreenEnabled: (document as Document & { webkitFullscreenEnabled?: boolean, mozFullScreenEnabled?: boolean, msFullscreenEnabled?: boolean, webkitFullscreenElement?: Element, mozFullScreenElement?: Element, msFullscreenElement?: Element, webkitExitFullscreen?: () => Promise<void>, mozCancelFullScreen?: () => Promise<void>, msExitFullscreen?: () => Promise<void> }).mozFullScreenEnabled,
        msFullscreenEnabled: (document as Document & { webkitFullscreenEnabled?: boolean, mozFullScreenEnabled?: boolean, msFullscreenEnabled?: boolean, webkitFullscreenElement?: Element, mozFullScreenElement?: Element, msFullscreenElement?: Element, webkitExitFullscreen?: () => Promise<void>, mozCancelFullScreen?: () => Promise<void>, msExitFullscreen?: () => Promise<void> }).msFullscreenEnabled,
        isSupported
      })
      
      setFullscreenSupported(isSupported)
      return isSupported
    }

    checkFullscreenSupport()
  }, [])

  // Cross-browser fullscreen methods
  const requestFullscreen = useCallback((element: HTMLElement): Promise<void> => {
    console.log('🚀 Attempting to request fullscreen on element:', element)
    
    return new Promise((resolve, reject) => {
      const requestMethod = 
        element.requestFullscreen ||
        (element as HTMLElement & { webkitRequestFullscreen?: () => Promise<void>, mozRequestFullScreen?: () => Promise<void>, msRequestFullscreen?: () => Promise<void> }).webkitRequestFullscreen ||
        (element as HTMLElement & { webkitRequestFullscreen?: () => Promise<void>, mozRequestFullScreen?: () => Promise<void>, msRequestFullscreen?: () => Promise<void> }).webkitRequestFullscreen ||
        (element as HTMLElement & { webkitRequestFullscreen?: () => Promise<void>, mozRequestFullScreen?: () => Promise<void>, msRequestFullscreen?: () => Promise<void> }).mozRequestFullScreen ||
        (element as HTMLElement & { webkitRequestFullscreen?: () => Promise<void>, mozRequestFullScreen?: () => Promise<void>, msRequestFullscreen?: () => Promise<void> }).msRequestFullscreen

      if (!requestMethod) {
        console.error('❌ No fullscreen method available')
        reject(new Error('Fullscreen not supported'))
        return
      }

      console.log('✅ Fullscreen method found:', requestMethod.name)
      
      try {
        const result = requestMethod.call(element)
        if (result && typeof result.then === 'function') {
          // Modern browsers return a Promise
          result.then(resolve).catch(reject)
        } else {
          // Older browsers don't return a Promise
          resolve()
        }
      } catch (error) {
        console.error('❌ Error calling fullscreen method:', error)
        reject(error)
      }
    })
  }, [])

  const exitFullscreen = useCallback((): Promise<void> => {
    console.log('🚪 Attempting to exit fullscreen')
    
    return new Promise((resolve, reject) => {
      const exitMethod = 
        document.exitFullscreen ||
        (document as Document & { webkitFullscreenEnabled?: boolean, mozFullScreenEnabled?: boolean, msFullscreenEnabled?: boolean, webkitFullscreenElement?: Element, mozFullScreenElement?: Element, msFullscreenElement?: Element, webkitExitFullscreen?: () => Promise<void>, mozCancelFullScreen?: () => Promise<void>, msExitFullscreen?: () => Promise<void> }).webkitExitFullscreen ||
        (document as Document & { webkitFullscreenEnabled?: boolean, mozFullScreenEnabled?: boolean, msFullscreenEnabled?: boolean, webkitFullscreenElement?: Element, mozFullScreenElement?: Element, msFullscreenElement?: Element, webkitExitFullscreen?: () => Promise<void>, mozCancelFullScreen?: () => Promise<void>, msExitFullscreen?: () => Promise<void> }).webkitExitFullscreen ||
        (document as Document & { webkitFullscreenEnabled?: boolean, mozFullScreenEnabled?: boolean, msFullscreenEnabled?: boolean, webkitFullscreenElement?: Element, mozFullScreenElement?: Element, msFullscreenElement?: Element, webkitExitFullscreen?: () => Promise<void>, mozCancelFullScreen?: () => Promise<void>, msExitFullscreen?: () => Promise<void> }).mozCancelFullScreen ||
        (document as Document & { webkitFullscreenEnabled?: boolean, mozFullScreenEnabled?: boolean, msFullscreenEnabled?: boolean, webkitFullscreenElement?: Element, mozFullScreenElement?: Element, msFullscreenElement?: Element, webkitExitFullscreen?: () => Promise<void>, mozCancelFullScreen?: () => Promise<void>, msExitFullscreen?: () => Promise<void> }).msExitFullscreen

      if (!exitMethod) {
        console.error('❌ No exit fullscreen method available')
        reject(new Error('Exit fullscreen not supported'))
        return
      }

      console.log('✅ Exit fullscreen method found:', exitMethod.name)
      
      try {
        const result = exitMethod.call(document)
        if (result && typeof result.then === 'function') {
          // Modern browsers return a Promise
          result.then(resolve).catch(reject)
        } else {
          // Older browsers don't return a Promise
          resolve()
        }
      } catch (error) {
        console.error('❌ Error calling exit fullscreen method:', error)
        reject(error)
      }
    })
  }, [])

  // Get current fullscreen element across browsers
  const getCurrentFullscreenElement = useCallback(() => {
    return document.fullscreenElement ||
           (document as Document & { webkitFullscreenEnabled?: boolean, mozFullScreenEnabled?: boolean, msFullscreenEnabled?: boolean, webkitFullscreenElement?: Element, mozFullScreenElement?: Element, msFullscreenElement?: Element, webkitExitFullscreen?: () => Promise<void>, mozCancelFullScreen?: () => Promise<void>, msExitFullscreen?: () => Promise<void> }).webkitFullscreenElement ||
           (document as Document & { webkitFullscreenEnabled?: boolean, mozFullScreenEnabled?: boolean, msFullscreenEnabled?: boolean, webkitFullscreenElement?: Element, mozFullScreenElement?: Element, msFullscreenElement?: Element, webkitExitFullscreen?: () => Promise<void>, mozCancelFullScreen?: () => Promise<void>, msExitFullscreen?: () => Promise<void> }).mozFullScreenElement ||
           (document as Document & { webkitFullscreenEnabled?: boolean, mozFullScreenEnabled?: boolean, msFullscreenEnabled?: boolean, webkitFullscreenElement?: Element, mozFullScreenElement?: Element, msFullscreenElement?: Element, webkitExitFullscreen?: () => Promise<void>, mozCancelFullScreen?: () => Promise<void>, msExitFullscreen?: () => Promise<void> }).msFullscreenElement
  }, [])

  // Enhanced fullscreen toggle with comprehensive debugging
  const toggleFullscreen = useCallback(async () => {
    console.log('🎯 Fullscreen toggle button clicked!')
    
    if (!mapContainerWrapper.current) {
      console.error('❌ Map container wrapper not found')
      return
    }

    if (!fullscreenSupported) {
      console.error('❌ Fullscreen not supported in this browser')
      alert('Fullscreen mode is not supported in this browser')
      return
    }

    try {
      const currentFullscreenElement = getCurrentFullscreenElement()
      console.log('📊 Current fullscreen state:', {
        currentElement: currentFullscreenElement,
        isFullscreen: !!currentFullscreenElement,
        targetElement: mapContainerWrapper.current
      })

      if (!currentFullscreenElement) {
        // Enter fullscreen
        console.log('🚀 Entering fullscreen mode...')
        console.log('🎯 Target element:', mapContainerWrapper.current)
        
        await requestFullscreen(mapContainerWrapper.current)
        console.log('✅ Fullscreen request completed')
        
      } else {
        // Exit fullscreen
        console.log('🚪 Exiting fullscreen mode...')
        
        await exitFullscreen()
        console.log('✅ Exit fullscreen completed')
      }
      
    } catch (error) {
      console.error('❌ Fullscreen operation failed:', error)
      console.error('Error details:', {
        message: error instanceof Error ? error.message : String(error),
        name: error instanceof Error ? error.name : 'Unknown',
        stack: error instanceof Error ? error.stack : 'No stack trace'
      })
      
      // Show user-friendly error
      alert(`Fullscreen failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }, [fullscreenSupported, requestFullscreen, exitFullscreen, getCurrentFullscreenElement])

  // Listen to fullscreen changes with all browser prefixes
  useEffect(() => {
    const handleFullscreenChange = (eventName: string) => {
      const currentElement = getCurrentFullscreenElement()
      const isCurrentlyFullscreen = !!currentElement
      
      console.log('📺 Fullscreen change event:', {
        eventName,
        element: currentElement,
        isFullscreen: isCurrentlyFullscreen,
        previousState: isFullscreen
      })
      
      setIsFullscreen(isCurrentlyFullscreen)
      
      // Resize map when fullscreen changes
      setTimeout(() => {
        if (map.current) {
          map.current.resize()
          console.log('✅ Map resized for fullscreen change')
        }
      }, 100)
    }

    // Add all possible event listeners
    const events = [
      { name: 'fullscreenchange', handler: () => handleFullscreenChange('fullscreenchange') },
      { name: 'webkitfullscreenchange', handler: () => handleFullscreenChange('webkitfullscreenchange') },
      { name: 'mozfullscreenchange', handler: () => handleFullscreenChange('mozfullscreenchange') },
      { name: 'msfullscreenchange', handler: () => handleFullscreenChange('msfullscreenchange') }
    ]

    events.forEach(({ name, handler }) => {
      document.addEventListener(name, handler)
      console.log(`📡 Added listener for ${name}`)
    })

    return () => {
      events.forEach(({ name, handler }) => {
        document.removeEventListener(name, handler)
        console.log(`🧹 Removed listener for ${name}`)
      })
    }
  }, [getCurrentFullscreenElement, isFullscreen])

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    console.log('🗺️ Initializing unified map with working fullscreen...')

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
      mapInstance.addControl(new maplibregl.NavigationControl(), 'top-left')

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
        // Clean up markers and their event listeners
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
    console.log(`🎯 MARKER CLICKED: ${placeName} (ID: ${placeId})`)
    if (onPlaceSelect) {
      onPlaceSelect(placeId)
    }
  }, [onPlaceSelect])

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

    console.log(`📍 Adding ${filteredPlaces.length} markers with click handlers`)

    // Clean up existing markers and their event listeners
    markersInfo.current.forEach(({ marker, element, clickHandler }) => {
      console.log('🧹 Removing old marker and event listener')
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

    // Add markers for all places
    filteredPlaces.forEach((place, index) => {
      try {
        console.log(`📍 Creating marker ${index + 1}: ${place.name}`)

        // Create marker element with proper styling
        const el = document.createElement('div')
        el.className = 'custom-marker'
        el.setAttribute('data-place-id', place.id)
        el.style.cssText = `
          background-color: ${categoryColors[place.category] || '#666'};
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          transition: all 0.2s ease;
          z-index: 1;
          user-select: none;
          -webkit-user-select: none;
          position: relative;
        `
        el.innerHTML = categoryIcons[place.category] || '📍'
        
        // Create click handler for this specific marker
        const clickHandler = (e: Event) => {
          e.preventDefault()
          e.stopPropagation()
          console.log(`🎯 CLICK EVENT FIRED for: ${place.name}`)
          
          // Add visual feedback
          el.style.transform = 'scale(0.9)'
          setTimeout(() => {
            el.style.transform = 'scale(1.1)'
          }, 100)
          
          // Use setTimeout to prevent map click interference
          setTimeout(() => {
            handleMarkerClick(place.id, place.name)
          }, 0)
        }

        // Hover effects
        const mouseEnterHandler = () => {
          el.style.transform = 'scale(1.2)'
          el.style.zIndex = '10'
          el.style.boxShadow = '0 6px 20px rgba(0,0,0,0.6)'
        }

        const mouseLeaveHandler = () => {
          const isSelected = selectedPlaceId === place.id
          el.style.transform = isSelected ? 'scale(1.3)' : 'scale(1)'
          el.style.zIndex = isSelected ? '20' : '1'
          el.style.boxShadow = isSelected 
            ? '0 0 20px rgba(59, 130, 246, 0.8), 0 4px 12px rgba(0,0,0,0.4)'
            : '0 4px 12px rgba(0,0,0,0.4)'
        }

        // Create popup content
        const popupContent = `
          <div style="min-width: 240px; font-family: system-ui, -apple-system, sans-serif; padding: 4px;">
            <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">
              ${place.name}
            </h3>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="color: #facc15; font-size: 14px;">★ ${place.rating}</span>
              <span style="color: #6b7280; font-size: 14px;">•</span>
              <span style="color: #6b7280; font-size: 14px;">${getPriceSymbol(place.priceLevel)}</span>
              ${place.featured ? '<span style="color: #10b981; font-size: 12px;">✨ Featured</span>' : ''}
            </div>
            <p style="margin: 0 0 8px 0; color: #4b5563; font-size: 13px; line-height: 1.4;">
              ${place.description.substring(0, 120)}${place.description.length > 120 ? '...' : ''}
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
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #9ca3af;">
              Click marker to select • Category: ${categoryIcons[place.category]} ${place.category}
            </div>
          </div>
        `

        // Create marker
        const marker = new maplibregl.Marker(el)
          .setLngLat(place.coordinates)
          .setPopup(
            new maplibregl.Popup({ 
              offset: 30,
              maxWidth: '300px',
              className: 'custom-popup',
              closeButton: true,
              closeOnClick: false
            }).setHTML(popupContent)
          )
          .addTo(map.current!)

        // Get the marker element and add event listeners
        const markerElement = marker.getElement()
        
        // Add event listeners using the proper MapLibre pattern
        markerElement.addEventListener('click', clickHandler, { passive: false })
        markerElement.addEventListener('mouseenter', mouseEnterHandler)
        markerElement.addEventListener('mouseleave', mouseLeaveHandler)

        console.log(`✅ Added marker for ${place.name} with click handler`)

        // Store marker info for cleanup
        markersInfo.current.push({
          marker,
          place,
          element: markerElement,
          clickHandler
        })

      } catch (error) {
        console.error(`❌ Failed to add marker for ${place.name}:`, error)
      }
    })

    console.log(`✅ Successfully added ${markersInfo.current.length}/${filteredPlaces.length} markers`)
  }, [mapLoaded, filteredPlaces, handleMarkerClick, selectedPlaceId])

  // Handle selected place highlighting and camera movement
  useEffect(() => {
    if (!selectedPlaceId || !map.current || !mapLoaded) return

    const selectedPlace = filteredPlaces.find(p => p.id === selectedPlaceId)
    if (!selectedPlace) {
      console.warn(`❌ Selected place not found: ${selectedPlaceId}`)
      return
    }

    console.log(`✈️ Flying to selected place: ${selectedPlace.name}`)

    // Update marker styles to show selection
    let highlightedCount = 0
    markersInfo.current.forEach(({ element, place }) => {
      if (place.id === selectedPlaceId) {
        // Highlight selected marker
        element.style.transform = 'scale(1.3)'
        element.style.zIndex = '20'
        element.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.8), 0 4px 12px rgba(0,0,0,0.4)'
        element.style.borderColor = '#3b82f6'
        element.style.borderWidth = '4px'
        highlightedCount++
        console.log(`✨ Highlighted marker for: ${place.name}`)
      } else {
        // Reset other markers
        element.style.transform = 'scale(1)'
        element.style.zIndex = '1'
        element.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)'
        element.style.borderColor = 'white'
        element.style.borderWidth = '3px'
      }
    })

    console.log(`✨ Highlighted ${highlightedCount} markers`)

    // Fly to the selected place
    map.current.flyTo({
      center: selectedPlace.coordinates,
      zoom: 16,
      duration: 1500,
      essential: true
    })
  }, [selectedPlaceId, filteredPlaces, mapLoaded])

  // Add custom controls overlay
  useEffect(() => {
    if (!map.current || !mapLoaded) return

    console.log('🎛️ Adding custom controls overlay with working fullscreen button')
    const canvasContainer = map.current.getCanvasContainer()
    
    // Create controls container
    const controlsContainer = document.createElement('div')
    controlsContainer.id = 'unified-map-controls-working'
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

    // Create button helper
    const createButton = (icon: string, onClick: () => void, isActive = false, title = '') => {
      const button = document.createElement('button')
      button.innerHTML = icon
      button.title = title
      button.style.cssText = `
        width: 44px;
        height: 44px;
        border-radius: 8px;
        background: ${isActive ? 'rgba(59, 130, 246, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
        backdrop-filter: blur(8px);
        border: 1px solid ${isActive ? 'rgba(59, 130, 246, 0.6)' : 'rgba(0, 0, 0, 0.1)'};
        color: ${isActive ? 'white' : '#374151'};
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: bold;
        transition: all 0.2s ease;
        pointer-events: auto;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        margin: 0;
        padding: 0;
        user-select: none;
        -webkit-user-select: none;
      `
      
      button.addEventListener('mouseenter', () => {
        button.style.background = isActive ? 'rgba(59, 130, 246, 1)' : 'rgba(255, 255, 255, 1)'
        button.style.transform = 'scale(1.05)'
        button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)'
      })
      
      button.addEventListener('mouseleave', () => {
        button.style.background = isActive ? 'rgba(59, 130, 246, 0.95)' : 'rgba(255, 255, 255, 0.95)'
        button.style.transform = 'scale(1)'
        button.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)'
      })
      
      button.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log(`🔘 Button clicked: ${title}`)
        
        // Visual feedback
        button.style.transform = 'scale(0.95)'
        setTimeout(() => {
          button.style.transform = 'scale(1)'
        }, 100)
        
        onClick()
      })
      
      return button
    }

    // Fullscreen Button with debug info
    const fullscreenButton = createButton(
      isFullscreen ? '⤡' : '⤢', 
      () => {
        console.log('🎯 FULLSCREEN BUTTON CLICKED!')
        console.log('🔍 Button state:', {
          isFullscreen,
          fullscreenSupported,
          element: mapContainerWrapper.current,
          currentFullscreenElement: getCurrentFullscreenElement()
        })
        toggleFullscreen()
      },
      isFullscreen,
      fullscreenSupported 
        ? (isFullscreen ? 'Exit Fullscreen (ESC)' : 'Enter Fullscreen') 
        : 'Fullscreen not supported in this browser'
    )

    // Disable button if not supported
    if (!fullscreenSupported) {
      fullscreenButton.style.opacity = '0.5'
      fullscreenButton.style.cursor = 'not-allowed'
      fullscreenButton.disabled = true
    }

    // Reset View Button
    const resetButton = createButton('🏠', () => {
      if (map.current) {
        console.log('🔄 Resetting view to Tepoztlán center')
        map.current.flyTo({
          center: [-99.1017, 18.9847],
          zoom: 14,
          pitch: 0,
          bearing: 0,
          duration: 1000
        })
      }
    }, false, 'Reset View')

    // Add buttons to container
    topRightControls.appendChild(fullscreenButton)
    topRightControls.appendChild(resetButton)
    controlsContainer.appendChild(topRightControls)

    // Add to canvas container
    canvasContainer.appendChild(controlsContainer)

    console.log('🎛️ Added controls with fullscreen button')

    // Cleanup function
    return () => {
      const existingControls = canvasContainer.querySelector('#unified-map-controls-working')
      if (existingControls) {
        canvasContainer.removeChild(existingControls)
      }
    }
  }, [mapLoaded, isFullscreen, fullscreenSupported, toggleFullscreen, getCurrentFullscreenElement])

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
          <p className="text-sm text-slate-400 mt-2">Initializing MapLibre with working fullscreen...</p>
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
      {/* Enhanced status indicator with fullscreen debug info */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl text-sm z-10 border shadow-lg max-w-sm">
        <div className="font-medium text-green-600 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Map Ready
        </div>
        <div className="text-xs text-gray-600 mt-1">
          Places: {markersInfo.current.length}/{filteredPlaces.length}
        </div>
        {selectedPlaceId && (
          <div className="text-xs text-blue-600 mt-1 font-medium">
            📍 {filteredPlaces.find(p => p.id === selectedPlaceId)?.name}
          </div>
        )}
        <div className="text-xs text-gray-500 mt-1">
          🖼️ {isFullscreen ? 'Fullscreen Mode' : 'Window Mode'}
        </div>
        <div className="text-xs text-gray-400 mt-1">
          🔧 Fullscreen: {fullscreenSupported ? '✅ Supported' : '❌ Not Supported'}
        </div>
        <div className="text-xs text-gray-400">
          🎯 Click markers to select • ⤢ for fullscreen
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