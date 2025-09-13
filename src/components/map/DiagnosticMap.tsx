'use client'

import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'

interface DiagnosticMapProps {
  className?: string
}

export default function DiagnosticMap({ className = '' }: DiagnosticMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const [diagnostics, setDiagnostics] = useState<string[]>([])

  const addDiagnostic = (info: string) => {
    console.log(info)
    setDiagnostics(prev => [...prev, `${new Date().toLocaleTimeString()}: ${info}`])
  }

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    addDiagnostic('🔍 Starting marker diagnostics')

    const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY
    if (!API_KEY) return

    try {
      const mapInstance = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
        center: [-99.1017, 18.9847],
        zoom: 14,
        attributionControl: false
      })

      map.current = mapInstance

      mapInstance.on('load', () => {
        addDiagnostic('📍 Map loaded, testing different marker types')

        // Test 1: Default marker
        addDiagnostic('🧪 Creating default marker')
        const defaultMarker = new maplibregl.Marker()
          .setLngLat([-99.1017, 18.9847])
          .addTo(mapInstance)
        
        const defaultElement = defaultMarker.getElement()
        addDiagnostic(`📊 Default marker classes: ${defaultElement.className}`)
        addDiagnostic(`📊 Default marker computed style: ${window.getComputedStyle(defaultElement).transform}`)

        // Test 2: Custom element without anchor/offset
        addDiagnostic('🧪 Creating custom marker (no anchor/offset)')
        const customEl1 = document.createElement('div')
        customEl1.style.cssText = `
          background-color: red;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        `
        const customMarker1 = new maplibregl.Marker({ element: customEl1 })
          .setLngLat([-99.102, 18.9847])
          .addTo(mapInstance)

        const custom1Element = customMarker1.getElement()
        addDiagnostic(`📊 Custom1 marker classes: ${custom1Element.className}`)
        
        // Test 3: Custom element with bottom anchor
        addDiagnostic('🧪 Creating custom marker (bottom anchor)')
        const customEl2 = document.createElement('div')
        customEl2.style.cssText = `
          background-color: blue;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        `
        new maplibregl.Marker({ element: customEl2, anchor: 'bottom' })
          .setLngLat([-99.103, 18.9847])
          .addTo(mapInstance)

        // Test 4: Custom element with offset
        addDiagnostic('🧪 Creating custom marker (with offset)')
        const customEl3 = document.createElement('div')
        customEl3.style.cssText = `
          background-color: green;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        `
        new maplibregl.Marker({ 
          element: customEl3,
          anchor: 'bottom',
          offset: [0, 0]
        })
          .setLngLat([-99.104, 18.9847])
          .addTo(mapInstance)

        // Test 5: Pin-style marker
        addDiagnostic('🧪 Creating pin-style marker')
        const pinEl = document.createElement('div')
        pinEl.innerHTML = '📍'
        pinEl.style.cssText = `
          font-size: 30px;
          text-align: center;
          line-height: 30px;
        `
        new maplibregl.Marker({ element: pinEl, anchor: 'bottom' })
          .setLngLat([-99.105, 18.9847])
          .addTo(mapInstance)

        // Check CSS loading
        setTimeout(() => {
          const maplibreMarkers = document.querySelectorAll('.maplibregl-marker')
          addDiagnostic(`📊 Found ${maplibreMarkers.length} markers with maplibregl-marker class`)
          
          maplibreMarkers.forEach((marker, i) => {
            const style = window.getComputedStyle(marker as Element)
            addDiagnostic(`📊 Marker ${i}: position=${style.position}, transform=${style.transform}`)
            addDiagnostic(`📊 Marker ${i}: zIndex=${style.zIndex}, display=${style.display}`)
          })

          // Check if CSS variables are loaded
          const testEl = document.createElement('div')
          testEl.className = 'maplibregl-marker'
          document.body.appendChild(testEl)
          const testStyle = window.getComputedStyle(testEl)
          addDiagnostic(`📊 Test element position: ${testStyle.position}`)
          document.body.removeChild(testEl)

        }, 1000)
      })

      return () => {
        mapInstance.remove()
        map.current = null
      }
    } catch (error) {
      addDiagnostic(`❌ Error: ${error}`)
    }
  }, [])

  return (
    <div className={`relative w-full h-full ${className}`} style={{ minHeight: '700px' }}>
      {/* Diagnostic Panel */}
      <div className="absolute top-4 left-4 bg-black/95 text-green-400 p-4 rounded-lg text-xs font-mono z-50 max-w-lg max-h-96 overflow-y-auto">
        <div className="font-bold mb-2 text-yellow-400">🔍 MARKER DIAGNOSTICS</div>
        {diagnostics.map((info, i) => (
          <div key={i} className="mb-1 break-words">{info}</div>
        ))}
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