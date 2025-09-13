'use client'

import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

interface DebugMapProps {
  className?: string
}

export default function DebugMap({ className = '' }: DebugMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const [debugInfo, setDebugInfo] = useState<string[]>([])

  const addDebugInfo = (info: string) => {
    console.log(info)
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${info}`])
  }

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    addDebugInfo('🚀 Starting debug map initialization')

    const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY
    addDebugInfo(`🔑 API Key present: ${!!API_KEY} (length: ${API_KEY?.length || 0})`)
    
    if (!API_KEY || API_KEY === 'your_maptiler_api_key_here') {
      addDebugInfo('❌ API key is missing or invalid')
      return
    }

    // Check if CSS is loaded by looking for known MapLibre CSS classes
    const cssCheck = document.querySelector('.maplibregl-map') !== null
    addDebugInfo(`🎨 MapLibre CSS already applied to DOM: ${cssCheck}`)

    try {
      const mapInstance = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
        center: [-99.1017, 18.9847], // Tepoztlán
        zoom: 14,
        attributionControl: false
      })

      map.current = mapInstance
      addDebugInfo('✅ Map instance created successfully')

      mapInstance.on('load', () => {
        addDebugInfo('✅ Map loaded event fired')
        
        // Check if map container has proper CSS classes
        const container = mapContainer.current
        if (container) {
          const classes = container.className
          addDebugInfo(`📦 Map container classes: ${classes}`)
        }

        // Test basic marker
        addDebugInfo('🧪 Creating test marker')
        try {
          const testMarker = new maplibregl.Marker({
            color: 'red'
          })
            .setLngLat([-99.1017, 18.9847])
            .addTo(mapInstance)

          addDebugInfo('✅ Test marker created and added to map')
          
          // Check marker element
          const markerElement = testMarker.getElement()
          if (markerElement) {
            addDebugInfo(`📍 Marker element classes: ${markerElement.className}`)
            addDebugInfo(`📍 Marker element style: ${markerElement.getAttribute('style')}`)
            addDebugInfo(`📍 Marker element visible: ${markerElement.offsetWidth > 0 && markerElement.offsetHeight > 0}`)
          }

          // Test custom HTML marker
          addDebugInfo('🧪 Creating custom HTML marker')
          const customEl = document.createElement('div')
          customEl.className = 'custom-test-marker'
          customEl.style.cssText = `
            background-color: blue;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 3px solid white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
          `
          customEl.innerHTML = '📍'

          new maplibregl.Marker(customEl)
            .setLngLat([-99.099, 18.985])
            .addTo(mapInstance)

          addDebugInfo('✅ Custom HTML marker created')

        } catch (markerError) {
          addDebugInfo(`❌ Error creating markers: ${markerError}`)
        }
      })

      mapInstance.on('error', (e) => {
        addDebugInfo(`❌ Map error: ${e.error?.message || 'Unknown error'}`)
      })

      mapInstance.on('style.load', () => {
        addDebugInfo('🎨 Map style loaded')
      })

      return () => {
        addDebugInfo('🧹 Cleaning up map')
        mapInstance.remove()
        map.current = null
      }
    } catch (error) {
      addDebugInfo(`❌ Error initializing map: ${error}`)
    }
  }, [])

  // Test fullscreen functionality
  const testFullscreen = async () => {
    addDebugInfo('🖥️ Testing fullscreen functionality')
    
    if (!mapContainer.current) {
      addDebugInfo('❌ No map container for fullscreen')
      return
    }

    try {
      addDebugInfo(`🔍 Fullscreen enabled: ${document.fullscreenEnabled}`)
      addDebugInfo(`🔍 Current fullscreen element: ${!!document.fullscreenElement}`)
      
      if (!document.fullscreenElement) {
        addDebugInfo('🚀 Requesting fullscreen...')
        await mapContainer.current.requestFullscreen()
        addDebugInfo('✅ Fullscreen request completed')
      } else {
        addDebugInfo('🚪 Exiting fullscreen...')
        await document.exitFullscreen()
        addDebugInfo('✅ Exit fullscreen completed')
      }
    } catch (error) {
      addDebugInfo(`❌ Fullscreen error: ${error}`)
    }
  }

  return (
    <div className={`relative w-full h-full ${className}`} style={{ minHeight: '700px' }}>
      {/* Debug Info Panel */}
      <div className="absolute top-4 left-4 bg-black/90 text-green-400 p-4 rounded-lg text-xs font-mono z-50 max-w-md max-h-80 overflow-y-auto">
        <div className="font-bold mb-2">🐛 DEBUG MAP</div>
        {debugInfo.map((info, i) => (
          <div key={i} className="mb-1">{info}</div>
        ))}
        
        <button 
          onClick={testFullscreen}
          className="mt-2 px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
        >
          Test Fullscreen
        </button>
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