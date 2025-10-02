'use client'

import { useEffect, useRef, use, useState } from 'react'
import { notFound } from 'next/navigation'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Locale } from '@/lib/i18n'

interface MarkerTestPageProps {
  params: Promise<{
    lang: Locale
  }>
}

export default function MarkerTestPage({ params }: MarkerTestPageProps) {
  // Disable in production
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }

  const { lang } = use(params)
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    console.log(message)
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testSteps = [
    "Initialize empty map",
    "Add basic controls", 
    "Add default Mapbox marker",
    "Add custom HTML marker",
    "Add multiple custom markers",
    "Add GeoJSON source",
    "Add circle layer",
    "Add click interactions"
  ]

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    // Set Mapbox access token
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

    if (!mapboxgl.accessToken) {
      addLog('❌ Mapbox access token not found')
      return
    }

    addLog('✅ Mapbox access token found')

    // Step 1: Initialize empty map
    addLog('🗺️ Step 1: Creating basic map')
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-99.1017, 18.9847], // Tepoztlán
      zoom: 14
    })

    map.current = mapInstance
    setCurrentStep(1)

    mapInstance.on('load', () => {
      addLog('🎯 Map loaded successfully')
      setCurrentStep(2)
    })

    return () => {
      mapInstance.remove()
      map.current = null
    }
  }, [])

  const runStep = (step: number) => {
    if (!map.current) return

    const mapInstance = map.current

    switch(step) {
      case 2: // Add basic controls
        addLog('🎮 Step 2: Adding basic controls')
        mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right')
        mapInstance.addControl(new mapboxgl.FullscreenControl(), 'top-left')
        addLog('✅ Controls added')
        setCurrentStep(3)
        break

      case 3: // Add default Mapbox marker
        addLog('📍 Step 3: Adding default Mapbox marker')
        try {
          new mapboxgl.Marker()
            .setLngLat([-99.1017, 18.9847])
            .addTo(mapInstance)
          addLog('✅ Default marker added successfully')
          
          // Check DOM
          setTimeout(() => {
            const markers = document.querySelectorAll('.mapboxgl-marker')
            addLog(`🔍 Found ${markers.length} .mapboxgl-marker elements in DOM`)
          }, 100)
          
        } catch (error) {
          addLog(`❌ Error adding default marker: ${error}`)
        }
        setCurrentStep(4)
        break

      case 4: // Add custom HTML marker
        addLog('🎨 Step 4: Adding custom HTML marker')
        try {
          const el = document.createElement('div')
          el.style.cssText = `
            background-color: #e53e3e;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid #ffffff;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          `
          
          new mapboxgl.Marker({ element: el })
            .setLngLat([-99.1020, 18.9847])
            .addTo(mapInstance)
          
          addLog('✅ Custom HTML marker added successfully')
          
          // Check DOM
          setTimeout(() => {
            const markers = document.querySelectorAll('.mapboxgl-marker')
            addLog(`🔍 Found ${markers.length} total .mapboxgl-marker elements`)
            
            const customMarkers = Array.from(markers).filter(marker => 
              marker.querySelector('div[style*="background-color: rgb(229, 62, 62)"]')
            )
            addLog(`🔍 Found ${customMarkers.length} custom styled markers`)
          }, 100)
          
        } catch (error) {
          addLog(`❌ Error adding custom marker: ${error}`)
        }
        setCurrentStep(5)
        break

      case 5: // Add multiple custom markers
        addLog('🎯 Step 5: Adding multiple custom markers')
        const restaurants = [
          { name: "El Ciruelo", position: [-99.1025, 18.9855], color: '#3182ce' },
          { name: "Casa de las Flores", position: [-99.1010, 18.9840], color: '#38a169' },
          { name: "Tepoznieves", position: [-99.1030, 18.9850], color: '#d69e2e' }
        ]
        
        try {
          restaurants.forEach((restaurant, index) => {
            const el = document.createElement('div')
            el.className = `custom-marker-${index}`
            el.style.cssText = `
              background-color: ${restaurant.color};
              width: 18px;
              height: 18px;
              border-radius: 50%;
              border: 2px solid #ffffff;
              cursor: pointer;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            `
            
            new mapboxgl.Marker({ element: el })
              .setLngLat(restaurant.position as [number, number])
              .addTo(mapInstance)
            
            addLog(`✅ Added ${restaurant.name} marker`)
          })
          
          // Check DOM
          setTimeout(() => {
            const markers = document.querySelectorAll('.mapboxgl-marker')
            addLog(`🔍 Found ${markers.length} total markers in DOM`)
          }, 100)
          
        } catch (error) {
          addLog(`❌ Error adding multiple markers: ${error}`)
        }
        setCurrentStep(6)
        break

      case 6: // Add GeoJSON source
        addLog('📊 Step 6: Adding GeoJSON source')
        try {
          const geoJsonData = {
            type: 'FeatureCollection' as const,
            features: [
              {
                type: 'Feature' as const,
                geometry: {
                  type: 'Point' as const,
                  coordinates: [-99.1035, 18.9845]
                },
                properties: {
                  name: 'GeoJSON Point',
                  category: 'test'
                }
              }
            ]
          }
          
          mapInstance.addSource('test-points', {
            type: 'geojson',
            data: geoJsonData
          })
          
          addLog('✅ GeoJSON source added successfully')
        } catch (error) {
          addLog(`❌ Error adding GeoJSON source: ${error}`)
        }
        setCurrentStep(7)
        break

      case 7: // Add circle layer
        addLog('⭕ Step 7: Adding circle layer')
        try {
          mapInstance.addLayer({
            id: 'test-circles',
            type: 'circle',
            source: 'test-points',
            paint: {
              'circle-radius': 8,
              'circle-color': '#ff6b6b',
              'circle-stroke-width': 2,
              'circle-stroke-color': '#ffffff'
            }
          })
          
          addLog('✅ Circle layer added successfully')
        } catch (error) {
          addLog(`❌ Error adding circle layer: ${error}`)
        }
        setCurrentStep(8)
        break

      case 8: // Add click interactions
        addLog('🖱️ Step 8: Adding click interactions')
        try {
          // Add popup to default marker
          const markers = document.querySelectorAll('.mapboxgl-marker')
          if (markers.length > 0) {
            markers[0].addEventListener('click', () => {
              new mapboxgl.Popup()
                .setLngLat([-99.1017, 18.9847])
                .setHTML('<div style="padding: 10px;"><h3>Default Marker</h3><p>This is the default Mapbox marker</p></div>')
                .addTo(mapInstance)
            })
          }
          
          // Add layer click handler
          mapInstance.on('click', 'test-circles', (e) => {
            if (!e.features?.[0]) return
            
            const coordinates = (e.features[0].geometry as GeoJSON.Point).coordinates.slice() as [number, number]
            const { name } = e.features[0].properties || {}
            
            new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(`<div style="padding: 10px;"><h3>${name}</h3><p>This is a GeoJSON circle layer</p></div>`)
              .addTo(mapInstance)
          })
          
          mapInstance.on('mouseenter', 'test-circles', () => {
            mapInstance.getCanvas().style.cursor = 'pointer'
          })
          
          mapInstance.on('mouseleave', 'test-circles', () => {
            mapInstance.getCanvas().style.cursor = ''
          })
          
          addLog('✅ Click interactions added successfully')
          addLog('🎉 All steps completed!')
        } catch (error) {
          addLog(`❌ Error adding interactions: ${error}`)
        }
        setCurrentStep(9)
        break
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">
          {lang === 'es' ? 'Prueba Paso a Paso - Marcadores Mapbox' : 'Step-by-Step Marker Test - Mapbox'}
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Controls */}
          <div className="bg-white/5 rounded-lg p-4">
            <h2 className="text-white font-semibold mb-4">Test Controls</h2>
            <div className="space-y-2">
              {testSteps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => runStep(index + 1)}
                  disabled={currentStep < index + 1 || currentStep > index + 1}
                  className={`w-full p-2 rounded text-sm transition-colors ${
                    currentStep === index + 1
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : currentStep > index + 1
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  Step {index + 1}: {step}
                </button>
              ))}
            </div>
          </div>
          
          {/* Logs */}
          <div className="bg-white/5 rounded-lg p-4">
            <h2 className="text-white font-semibold mb-4">Debug Logs</h2>
            <div className="bg-black/30 rounded p-3 h-64 overflow-y-auto">
              {logs.map((log, index) => (
                <div key={index} className="text-xs text-green-400 font-mono mb-1">
                  {log}
                </div>
              ))}
            </div>
          </div>
          
          {/* Status */}
          <div className="bg-white/5 rounded-lg p-4">
            <h2 className="text-white font-semibold mb-4">Current Status</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${currentStep >= 1 ? 'bg-green-500' : 'bg-gray-500'}`} />
                <span className="text-white/70">Map Initialized</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${currentStep >= 2 ? 'bg-green-500' : 'bg-gray-500'}`} />
                <span className="text-white/70">Map Loaded</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${currentStep >= 3 ? 'bg-green-500' : 'bg-gray-500'}`} />
                <span className="text-white/70">Controls Added</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${currentStep >= 4 ? 'bg-green-500' : 'bg-gray-500'}`} />
                <span className="text-white/70">Default Marker</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${currentStep >= 5 ? 'bg-green-500' : 'bg-gray-500'}`} />
                <span className="text-white/70">Custom Marker</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${currentStep >= 6 ? 'bg-green-500' : 'bg-gray-500'}`} />
                <span className="text-white/70">Multiple Markers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${currentStep >= 7 ? 'bg-green-500' : 'bg-gray-500'}`} />
                <span className="text-white/70">GeoJSON Source</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${currentStep >= 8 ? 'bg-green-500' : 'bg-gray-500'}`} />
                <span className="text-white/70">Circle Layer</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${currentStep >= 9 ? 'bg-green-500' : 'bg-gray-500'}`} />
                <span className="text-white/70">Interactions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div 
          ref={mapContainer}
          className="w-full bg-gray-800 rounded-lg border-2 border-white/20"
          style={{ minHeight: '500px' }}
        />
        
        <div className="mt-4 bg-white/5 rounded-lg p-4">
          <h2 className="text-white font-semibold mb-2">Instructions:</h2>
          <ul className="text-white/70 text-sm space-y-1">
            <li>1. Wait for map to load (Step 1-2 complete)</li>
            <li>2. Click each step button in order</li>
            <li>3. Watch the debug logs for detailed feedback</li>
            <li>4. Check if markers appear on the map after each step</li>
            <li>5. Test interactions by clicking on markers/circles</li>
          </ul>
        </div>
      </div>
    </div>
  )
}