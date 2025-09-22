'use client'

import { useEffect, useRef, use, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Locale } from '@/lib/i18n'

interface AnimatedMarkersPageProps {
  params: Promise<{
    lang: Locale
  }>
}

export default function AnimatedMarkersPage({ params }: AnimatedMarkersPageProps) {
  const { lang } = use(params)
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [logs, setLogs] = useState<string[]>([])
  const [poisHidden, setPoisHidden] = useState(false)
  const [layerOpacity, setLayerOpacity] = useState(80)
  const [showOpacityControls, setShowOpacityControls] = useState(false)
  const [terrainEnabled, setTerrainEnabled] = useState(false)
  const [satelliteMode, setSatelliteMode] = useState(false)
  const [elevationQueryMode, setElevationQueryMode] = useState(false)
  const [trailVisible, setTrailVisible] = useState(false)
  const cameraAnimationRef = useRef<number | null>(null)

  const handleOpacityChange = (newOpacity: number) => {
    if (!map.current) return
    
    const mapInstance = map.current
    setLayerOpacity(newOpacity)
    
    // Apply opacity to the demo layer
    if (mapInstance.getLayer('opacity-demo-layer')) {
      mapInstance.setPaintProperty('opacity-demo-layer', 'circle-opacity', newOpacity / 100)
      addLog(`🎚️ Layer opacity set to ${newOpacity}%`)
    }
  }

  const toggle3DTerrain = () => {
    if (!map.current) return
    
    const mapInstance = map.current
    const newTerrainState = !terrainEnabled
    setTerrainEnabled(newTerrainState)
    
    try {
      if (newTerrainState) {
        // Enable 3D terrain
        addLog('🏔️ Enabling 3D terrain view...')
        
        // Add terrain source if it doesn't exist
        if (!mapInstance.getSource('mapbox-dem')) {
          addLog('📦 Adding Mapbox DEM terrain source...')
          mapInstance.addSource('mapbox-dem', {
            type: 'raster-dem',
            url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
            tileSize: 512,
            maxzoom: 14
          })
          addLog('✅ Terrain source added successfully')
        }
        
        // Set terrain with moderate exaggeration for Tepoztlán's mountainous terrain
        mapInstance.setTerrain({ 
          source: 'mapbox-dem', 
          exaggeration: 1.5 
        })
        
        // Adjust camera for better 3D viewing
        mapInstance.easeTo({
          pitch: 60, // Tilt camera for 3D effect
          bearing: 0,
          duration: 2000
        })
        
        addLog('🏔️ 3D terrain enabled with 1.5x exaggeration')
        addLog('📷 Camera tilted to 60° pitch for optimal 3D viewing')
        
      } else {
        // Disable 3D terrain
        addLog('🌍 Disabling 3D terrain view...')
        
        // Remove terrain
        mapInstance.setTerrain(null)
        
        // Reset camera to flat view
        mapInstance.easeTo({
          pitch: 0,
          bearing: 0,
          duration: 2000
        })
        
        addLog('🌍 3D terrain disabled - back to flat map view')
        addLog('📷 Camera reset to flat view (0° pitch)')
      }
      
    } catch (error) {
      addLog(`❌ Error toggling 3D terrain: ${error}`)
      setTerrainEnabled(!newTerrainState) // Revert state on error
    }
  }

  const toggleSatelliteMode = () => {
    if (!map.current) return
    
    const mapInstance = map.current
    const newSatelliteState = !satelliteMode
    setSatelliteMode(newSatelliteState)
    
    try {
      if (newSatelliteState) {
        // Switch to satellite view
        addLog('🛰️ Switching to satellite view of Tepoztlán, Morelos...')
        
        // Use Mapbox Standard Satellite style for best quality
        mapInstance.setStyle('mapbox://styles/mapbox/standard-satellite')
        
        addLog('🛰️ Satellite mode enabled - aerial view of Tepoztlán activated')
        addLog('🏔️ Perfect for viewing Tepoztlán\'s dramatic mountain landscape')
        
      } else {
        // Switch back to streets view
        addLog('🗺️ Switching back to street map view...')
        
        // Use Mapbox Streets style (the original style)
        mapInstance.setStyle('mapbox://styles/mapbox/streets-v12')
        
        addLog('🗺️ Street map mode enabled - detailed Tepoztlán street view')
        addLog('🏘️ Great for navigation and exploring local businesses')
      }
      
      // Note: When style changes, we need to re-add terrain if it was enabled
      mapInstance.on('style.load', () => {
        addLog('🎨 Map style loaded successfully')
        
        // Re-apply terrain if it was enabled
        if (terrainEnabled) {
          addLog('🏔️ Re-applying 3D terrain after style change...')
          
          // Re-add terrain source
          if (!mapInstance.getSource('mapbox-dem')) {
            mapInstance.addSource('mapbox-dem', {
              type: 'raster-dem',
              url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
              tileSize: 512,
              maxzoom: 14
            })
          }
          
          // Re-apply terrain
          mapInstance.setTerrain({ 
            source: 'mapbox-dem', 
            exaggeration: 1.5 
          })
          
          addLog('✅ 3D terrain restored on new map style')
        }
        
        addLog('✅ Style change complete - Tepoztlán ready to explore!')
      })
      
    } catch (error) {
      addLog(`❌ Error toggling satellite mode: ${error}`)
      setSatelliteMode(!newSatelliteState) // Revert state on error
    }
  }

  const toggleTrailRoute = () => {
    if (!map.current) return
    
    const mapInstance = map.current
    const newTrailState = !trailVisible
    setTrailVisible(newTrailState)
    
    try {
      if (newTrailState) {
        // Show trail - check if elevation query layers exist
        if (mapInstance.getLayer('elevation-query-layer')) {
          mapInstance.setLayoutProperty('elevation-query-layer', 'visibility', 'visible')
          addLog('🥾 Trail route to Pirámide del Tepozteco is now visible')
        } else {
          addLog('⚠️ Trail route not available - run Step 9 (terrain elevation query) first')
        }
        
        if (mapInstance.getLayer('pyramid-marker-layer')) {
          mapInstance.setLayoutProperty('pyramid-marker-layer', 'visibility', 'visible')
          addLog('🏛️ Pyramid marker is now visible')
        }
      } else {
        // Hide trail
        if (mapInstance.getLayer('elevation-query-layer')) {
          mapInstance.setLayoutProperty('elevation-query-layer', 'visibility', 'none')
          addLog('🚫 Trail route to Pirámide del Tepozteco is now hidden')
        }
        
        if (mapInstance.getLayer('pyramid-marker-layer')) {
          mapInstance.setLayoutProperty('pyramid-marker-layer', 'visibility', 'none')
          addLog('🚫 Pyramid marker is now hidden')
        }
      }
    } catch (error) {
      addLog(`❌ Error toggling trail route: ${error}`)
      setTrailVisible(!newTrailState) // Revert state on error
    }
  }

  const togglePOIs = () => {
    if (!map.current) return
    
    const mapInstance = map.current
    setPoisHidden(!poisHidden)
    
    try {
      const layers = mapInstance.getStyle().layers
      let hiddenCount = 0
      let shownCount = 0
      
      layers.forEach(layer => {
        if (layer.type === 'symbol' && 
            (layer.id.includes('poi') || 
             layer.id.includes('place-label') ||
             layer.id.includes('settlement-label') ||
             layer.id.includes('natural-label'))) {
          try {
            const newVisibility = poisHidden ? 'visible' : 'none'
            mapInstance.setLayoutProperty(layer.id, 'visibility', newVisibility)
            if (newVisibility === 'none') {
              hiddenCount++
            } else {
              shownCount++
            }
          } catch {
            // Ignore errors for layers that can't be modified
          }
        }
      })
      
      if (poisHidden) {
        addLog(`✅ Showed ${shownCount} default POI layers`)
      } else {
        addLog(`🙈 Hidden ${hiddenCount} default POI layers`)
      }
    } catch (error) {
      addLog(`❌ Error toggling POIs: ${error}`)
    }
  }

  const addLog = (message: string) => {
    console.log(message)
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testSteps = [
    "Initialize map with animated pulsing dot",
    "Add simple static test icon",
    "Add animated rotating icon", 
    "Add multiple animated markers",
    "Add animated restaurant markers",
    "Add animated moving car",
    "Add animated walking person",
    "Cross-platform iOS/Android features demo",
    "Query terrain elevation at Pirámide del Tepozteco",
    "Interactive layer opacity controls",
    "Add HTML cluster markers",
    "Load external GeoJSON data",
    "Fill opacity transition effects"
  ]

  const resetAllMarkers = () => {
    if (!map.current) return
    
    const mapInstance = map.current
    addLog('🧹 Resetting all markers and animations...')
    
    try {
      // Remove all layers and sources
      const layersToRemove = [
        'pulsing-dot-layer', 'static-test-layer', 'rotating-compass-layer', 
        'animated-layer-0', 'animated-layer-1', 'animated-layer-2',
        'restaurant-layer-0', 'restaurant-layer-1', 'restaurant-layer-2', 'restaurant-layer-3',
        'moving-car-layer', 'walking-person-layer', 'cross-platform-layer', 'elevation-query-layer',
        'pyramid-marker-layer', 'opacity-demo-layer', 'clusters', 'cluster-count', 'unclustered-point',
        'archaeological-sites', 'historical-sites', 'hiking-trail', 'fill-transition-layer'
      ]
      
      const sourcesToRemove = [
        'pulsing-dot-source', 'static-test-source', 'rotating-compass-source',
        'animated-source-0', 'animated-source-1', 'animated-source-2', 
        'restaurant-source-0', 'restaurant-source-1', 'restaurant-source-2', 'restaurant-source-3',
        'moving-car-source', 'walking-person-source', 'cross-platform-source', 'elevation-query-source',
        'opacity-demo-source', 'cluster-source', 'external-geojson', 'fill-transition-source'
      ]
      
      const imagesToRemove = [
        'pulsing-dot', 'static-test', 'rotating-compass',
        'animated-marker-0', 'animated-marker-1', 'animated-marker-2',
        'restaurant-0', 'restaurant-1', 'restaurant-2', 'restaurant-3',
        'moving-car', 'walking-person', 'cross-platform-icon', 'opacity-demo-icon'
      ]
      
      layersToRemove.forEach(layerId => {
        if (mapInstance.getLayer(layerId)) {
          mapInstance.removeLayer(layerId)
        }
      })
      
      sourcesToRemove.forEach(sourceId => {
        if (mapInstance.getSource(sourceId)) {
          mapInstance.removeSource(sourceId)
        }
      })
      
      imagesToRemove.forEach(imageId => {
        if (mapInstance.hasImage(imageId)) {
          mapInstance.removeImage(imageId)
        }
      })
      
      // Note: Event listeners are now properly controlled by state variables
      // - Global click handler is controlled by elevationQueryMode state
      // - Layer-specific event listeners are removed when layers are removed
      // - This approach avoids the complexity of tracking function references
      
      // Reset cursor
      mapInstance.getCanvas().style.cursor = ''
      
      // Stop camera animation if running
      if (cameraAnimationRef.current) {
        cancelAnimationFrame(cameraAnimationRef.current)
        cameraAnimationRef.current = null
      }
      
      // Hide opacity controls when resetting
      setShowOpacityControls(false)
      
      // Disable elevation query mode
      setElevationQueryMode(false)
      
      // Reset trail visibility
      setTrailVisible(false)
      
      // Reset 3D terrain to flat view
      if (terrainEnabled) {
        mapInstance.setTerrain(null)
        mapInstance.easeTo({
          pitch: 0,
          bearing: 0,
          duration: 1000
        })
        setTerrainEnabled(false)
        addLog('🌍 3D terrain disabled during reset')
      }
      
      // Reset to street map view if in satellite mode
      if (satelliteMode) {
        mapInstance.setStyle('mapbox://styles/mapbox/streets-v12')
        setSatelliteMode(false)
        addLog('🗺️ Switched back to street map view during reset')
      }
      
      setCurrentStep(1)
      addLog('✅ All markers and animations reset successfully')
    } catch (error) {
      addLog(`❌ Error during reset: ${error}`)
    }
  }

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

    if (!mapboxgl.accessToken) {
      addLog('❌ Mapbox access token not found')
      return
    }

    addLog('✅ Starting comprehensive markers implementation')

    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-99.1017, 18.9847],
      zoom: 14
    })

    map.current = mapInstance

    // Add navigation controls
    mapInstance.addControl(new mapboxgl.NavigationControl({
      showCompass: true,
      showZoom: true,
      visualizePitch: true
    }), 'top-right')
    
    // Add fullscreen control
    mapInstance.addControl(new mapboxgl.FullscreenControl(), 'top-left')

    mapInstance.on('load', () => {
      addLog('🗺️ Map loaded with controls, ready for advanced markers')
      
      // Add global click handler for elevation queries (controlled by elevationQueryMode state)
      mapInstance.on('click', (e) => {
        if (elevationQueryMode) {
          try {
            const elevation = mapInstance.queryTerrainElevation(e.lngLat, { exaggerated: false })
            if (elevation !== null && elevation !== undefined) {
              const roundedElevation = Math.round(elevation)
              addLog(`📍 Clicked location elevation: ${roundedElevation}m`)
              
              // Add a temporary marker at clicked location
              new mapboxgl.Popup({ closeOnClick: true })
                .setLngLat(e.lngLat)
                .setHTML(`
                  <div style="padding: 10px; text-align: center;">
                    <strong>Elevation Query</strong><br>
                    <span style="font-size: 18px; color: #2563eb;">${roundedElevation}m</span><br>
                    <small>Click anywhere to query elevation!</small>
                  </div>
                `)
                .addTo(mapInstance)
            }
          } catch (error) {
            addLog(`❌ Click elevation query error: ${error}`)
          }
        }
      })
      
      // Auto-hide default POIs on load to make custom markers more visible
      try {
        const layers = mapInstance.getStyle().layers
        let hiddenCount = 0
        
        layers.forEach(layer => {
          if (layer.type === 'symbol' && 
              (layer.id.includes('poi') || 
               layer.id.includes('place-label') ||
               layer.id.includes('settlement-label') ||
               layer.id.includes('natural-label'))) {
            try {
              mapInstance.setLayoutProperty(layer.id, 'visibility', 'none')
              hiddenCount++
            } catch {
              // Ignore errors for layers that can't be modified
            }
          }
        })
        
        setPoisHidden(true)
        addLog(`🙈 Auto-hidden ${hiddenCount} default POI layers for cleaner view`)
      } catch (error) {
        addLog(`⚠️ Could not auto-hide POIs: ${error}`)
      }
      
      setCurrentStep(1)
    })

    return () => {
      mapInstance.remove()
      map.current = null
    }
  }, [elevationQueryMode])

  const runStep = (step: number) => {
    if (!map.current) return

    const mapInstance = map.current

    switch(step) {
      case 1: // Animated pulsing dot
        addLog('🔴 Step 1: Adding animated pulsing dot')
        try {
          // Clean up existing sources/layers if they exist
          if (mapInstance.getSource('pulsing-dot-source')) {
            if (mapInstance.getLayer('pulsing-dot-layer')) {
              mapInstance.removeLayer('pulsing-dot-layer')
            }
            mapInstance.removeSource('pulsing-dot-source')
          }
          if (mapInstance.hasImage('pulsing-dot')) {
            mapInstance.removeImage('pulsing-dot')
          }

          const size = 100

          const pulsingDot = {
            width: size,
            height: size,
            data: new Uint8Array(size * size * 4),
            context: null as CanvasRenderingContext2D | null,

            onAdd: function () {
              const canvas = document.createElement('canvas')
              canvas.width = this.width
              canvas.height = this.height
              this.context = canvas.getContext('2d')
            },

            render: function () {
              const duration = 1000
              const t = (performance.now() % duration) / duration
              const radius = (size / 2) * 0.3
              const outerRadius = (size / 2) * 0.7 * t + radius

              if (!this.context) return false

              const context = this.context
              context.clearRect(0, 0, this.width, this.height)

              // Draw outer circle with pulsing effect
              context.beginPath()
              context.arc(
                this.width / 2,
                this.height / 2,
                outerRadius,
                0,
                Math.PI * 2
              )
              context.fillStyle = `rgba(229, 62, 62, ${1 - t})`
              context.fill()

              // Draw inner circle
              context.beginPath()
              context.arc(
                this.width / 2,
                this.height / 2,
                radius,
                0,
                Math.PI * 2
              )
              context.fillStyle = 'rgba(229, 62, 62, 1)'
              context.strokeStyle = 'white'
              context.lineWidth = 2 + 4 * (1 - t)
              context.fill()
              context.stroke()

              // Update image data and trigger repaint
              this.data = new Uint8Array(context.getImageData(0, 0, this.width, this.height).data)
              mapInstance.triggerRepaint()
              return true
            }
          }

          mapInstance.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 })

          mapInstance.addSource('pulsing-dot-source', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-99.1017, 18.9847]
                },
                properties: {
                  name: 'Tepoztlán Center - Animated Pulse'
                }
              }]
            }
          })

          mapInstance.addLayer({
            id: 'pulsing-dot-layer',
            type: 'symbol',
            source: 'pulsing-dot-source',
            layout: {
              'icon-image': 'pulsing-dot',
              'icon-allow-overlap': true
            }
          })

          addLog('✅ Pulsing dot animation added successfully')
        } catch (error) {
          addLog(`❌ Error adding pulsing dot: ${error}`)
        }
        setCurrentStep(2)
        break

      case 2: // Simple static test icon
        addLog('🔸 Step 2: Adding simple static test icon')
        try {
          // Clean up existing sources/layers if they exist
          if (mapInstance.getSource('static-test-source')) {
            if (mapInstance.getLayer('static-test-layer')) {
              mapInstance.removeLayer('static-test-layer')
            }
            mapInstance.removeSource('static-test-source')
          }
          if (mapInstance.hasImage('static-test')) {
            mapInstance.removeImage('static-test')
          }

          const size = 40

          const staticIcon = {
            width: size,
            height: size,
            data: new Uint8Array(size * size * 4),
            context: null as CanvasRenderingContext2D | null,

            onAdd: function () {
              const canvas = document.createElement('canvas')
              canvas.width = this.width
              canvas.height = this.height
              this.context = canvas.getContext('2d')
              
              if (!this.context) {
                console.log('❌ Static icon: Failed to get canvas context')
                return
              }

              // Draw a simple blue circle immediately (no animation)
              const context = this.context
              context.clearRect(0, 0, this.width, this.height)
              
              context.beginPath()
              context.arc(this.width / 2, this.height / 2, 15, 0, Math.PI * 2)
              context.fillStyle = '#3182ce'
              context.fill()
              context.strokeStyle = '#ffffff'
              context.lineWidth = 3
              context.stroke()
              
              // Add a simple triangle pointing up
              context.fillStyle = '#ffffff'
              context.beginPath()
              context.moveTo(this.width / 2, this.height / 2 - 8)
              context.lineTo(this.width / 2 - 5, this.height / 2 + 3)
              context.lineTo(this.width / 2 + 5, this.height / 2 + 3)
              context.closePath()
              context.fill()

              this.data = new Uint8Array(context.getImageData(0, 0, this.width, this.height).data)
              console.log('✅ Static icon: Canvas drawn and data set')
            },

            render: function () {
              // Static icon doesn't need animation, just return true
              return false // Return false to stop calling render
            }
          }

          mapInstance.addImage('static-test', staticIcon, { pixelRatio: 2 })
          addLog('✅ Static test icon image added to map')

          mapInstance.addSource('static-test-source', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-99.1030, 18.9860]
                },
                properties: {
                  name: 'Static Test Icon'
                }
              }]
            }
          })

          mapInstance.addLayer({
            id: 'static-test-layer',
            type: 'symbol',
            source: 'static-test-source',
            layout: {
              'icon-image': 'static-test',
              'icon-allow-overlap': true
            }
          })
          
          addLog('✅ Static test icon added successfully')
          
          // Check if the layer was added successfully
          setTimeout(() => {
            if (mapInstance.getLayer('static-test-layer')) {
              addLog('🔍 Confirmed: static-test-layer exists in map')
              const features = mapInstance.querySourceFeatures('static-test-source')
              addLog(`🔍 Found ${features.length} features in static-test-source`)
            } else {
              addLog('❌ Error: static-test-layer not found in map')
            }
          }, 100)
          
        } catch (error) {
          addLog(`❌ Error adding static test icon: ${error}`)
        }
        setCurrentStep(3)
        break

      case 3: // Rotating icon
        addLog('🔄 Step 3: Adding rotating compass icon')
        try {
          // Clean up existing sources/layers if they exist
          if (mapInstance.getSource('rotating-compass-source')) {
            if (mapInstance.getLayer('rotating-compass-layer')) {
              mapInstance.removeLayer('rotating-compass-layer')
            }
            mapInstance.removeSource('rotating-compass-source')
          }
          if (mapInstance.hasImage('rotating-compass')) {
            mapInstance.removeImage('rotating-compass')
          }

          const size = 60

          const rotatingIcon = {
            width: size,
            height: size,
            data: new Uint8Array(size * size * 4),
            context: null as CanvasRenderingContext2D | null,

            onAdd: function () {
              const canvas = document.createElement('canvas')
              canvas.width = this.width
              canvas.height = this.height
              this.context = canvas.getContext('2d')
            },

            render: function () {
              const duration = 4000
              const t = (performance.now() % duration) / duration
              const angle = t * Math.PI * 2

              if (!this.context) {
                console.log('❌ Rotating icon: No canvas context available')
                return false
              }

              const context = this.context
              context.clearRect(0, 0, this.width, this.height)
              
              // Debug: Log render calls occasionally
              if (Math.random() < 0.01) { // 1% chance to log
                console.log('🔄 Rotating compass render called, angle:', angle)
              }

              // Save context for rotation
              context.save()
              context.translate(this.width / 2, this.height / 2)
              context.rotate(angle)

              // Draw compass base circle
              context.beginPath()
              context.arc(0, 0, 18, 0, Math.PI * 2)
              context.fillStyle = 'rgba(49, 130, 206, 0.2)'
              context.fill()
              context.strokeStyle = '#3182ce'
              context.lineWidth = 2
              context.stroke()

              // Draw compass needle
              context.strokeStyle = '#e53e3e'
              context.fillStyle = '#e53e3e'
              context.lineWidth = 2
              
              context.beginPath()
              context.moveTo(0, -15)
              context.lineTo(-4, 8)
              context.lineTo(0, 5)
              context.lineTo(4, 8)
              context.closePath()
              context.fill()

              // Draw south pointer
              context.strokeStyle = '#718096'
              context.fillStyle = '#718096'
              context.beginPath()
              context.moveTo(0, 15)
              context.lineTo(-3, 5)
              context.lineTo(3, 5)
              context.closePath()
              context.fill()

              context.restore()

              this.data = new Uint8Array(context.getImageData(0, 0, this.width, this.height).data)
              mapInstance.triggerRepaint()
              return true
            }
          }

          mapInstance.addImage('rotating-compass', rotatingIcon, { pixelRatio: 2 })
          addLog('✅ Rotating compass image added to map')

          mapInstance.addSource('rotating-compass-source', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-99.1040, 18.9870]
                },
                properties: {
                  name: 'Rotating Compass'
                }
              }]
            }
          })

          mapInstance.addLayer({
            id: 'rotating-compass-layer',
            type: 'symbol',
            source: 'rotating-compass-source',
            layout: {
              'icon-image': 'rotating-compass',
              'icon-allow-overlap': true
            }
          })
          addLog('✅ Rotating compass source and layer added')
          
          // Check if the layer was added successfully
          setTimeout(() => {
            if (mapInstance.getLayer('rotating-compass-layer')) {
              addLog('🔍 Confirmed: rotating-compass-layer exists in map')
            } else {
              addLog('❌ Error: rotating-compass-layer not found in map')
            }
          }, 100)

          addLog('✅ Rotating compass animation added')
        } catch (error) {
          addLog(`❌ Error adding rotating compass: ${error}`)
        }
        setCurrentStep(4)
        break

      case 4: // Multiple animated markers
        addLog('🎯 Step 4: Adding multiple animated markers with different effects')
        try {
          const positions = [
            { coords: [-99.1010, 18.9840], color: '#38a169', name: 'Green Heartbeat', type: 'heartbeat' },
            { coords: [-99.1030, 18.9850], color: '#d69e2e', name: 'Yellow Ripple', type: 'ripple' },
            { coords: [-99.1005, 18.9860], color: '#805ad5', name: 'Purple Glow', type: 'glow' }
          ]

          positions.forEach((pos, index) => {
            const size = 80

            const animatedMarker = {
              width: size,
              height: size,
              data: new Uint8Array(size * size * 4),
              context: null as CanvasRenderingContext2D | null,
              color: pos.color,
              animationType: pos.type,

              onAdd: function () {
                const canvas = document.createElement('canvas')
                canvas.width = this.width
                canvas.height = this.height
                this.context = canvas.getContext('2d')
              },

              render: function () {
                const duration = 1500 + index * 300
                const t = (performance.now() % duration) / duration
                
                if (!this.context) return false

                const context = this.context
                context.clearRect(0, 0, this.width, this.height)

                const centerX = this.width / 2
                const centerY = this.height / 2

                if (this.animationType === 'heartbeat') {
                  // Heartbeat effect - double pulse
                  const heartbeat = t < 0.3 ? Math.sin(t * Math.PI * 10) : 
                                   t < 0.6 ? Math.sin((t - 0.3) * Math.PI * 10) : 0
                  const scale = 1 + heartbeat * 0.3
                  const radius = 15 * scale

                  context.beginPath()
                  context.arc(centerX, centerY, radius, 0, Math.PI * 2)
                  context.fillStyle = this.color
                  context.fill()
                  context.strokeStyle = 'white'
                  context.lineWidth = 2
                  context.stroke()

                } else if (this.animationType === 'ripple') {
                  // Multiple ripple rings
                  for (let i = 0; i < 3; i++) {
                    const offset = (i * 0.33)
                    const rippleT = ((t + offset) % 1)
                    const radius = 5 + rippleT * 25
                    const opacity = 1 - rippleT
                    
                    context.beginPath()
                    context.arc(centerX, centerY, radius, 0, Math.PI * 2)
                    context.strokeStyle = this.color + Math.round(opacity * 255).toString(16).padStart(2, '0')
                    context.lineWidth = 2
                    context.stroke()
                  }
                  
                  // Center dot
                  context.beginPath()
                  context.arc(centerX, centerY, 8, 0, Math.PI * 2)
                  context.fillStyle = this.color
                  context.fill()

                } else if (this.animationType === 'glow') {
                  // Glowing effect with gradient
                  const glowRadius = 20 + Math.sin(t * Math.PI * 2) * 8
                  const gradient = context.createRadialGradient(
                    centerX, centerY, 0,
                    centerX, centerY, glowRadius
                  )
                  gradient.addColorStop(0, this.color)
                  gradient.addColorStop(0.7, this.color + '80')
                  gradient.addColorStop(1, this.color + '00')

                  context.beginPath()
                  context.arc(centerX, centerY, glowRadius, 0, Math.PI * 2)
                  context.fillStyle = gradient
                  context.fill()

                  // Core
                  context.beginPath()
                  context.arc(centerX, centerY, 10, 0, Math.PI * 2)
                  context.fillStyle = this.color
                  context.fill()
                }

                this.data = new Uint8Array(context.getImageData(0, 0, this.width, this.height).data)
                mapInstance.triggerRepaint()
                return true
              }
            }

            mapInstance.addImage(`animated-marker-${index}`, animatedMarker, { pixelRatio: 2 })

            mapInstance.addSource(`animated-source-${index}`, {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: [{
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: pos.coords
                  },
                  properties: {
                    name: pos.name,
                    type: pos.type
                  }
                }]
              }
            })

            mapInstance.addLayer({
              id: `animated-layer-${index}`,
              type: 'symbol',
              source: `animated-source-${index}`,
              layout: {
                'icon-image': `animated-marker-${index}`,
                'icon-allow-overlap': true
              }
            })

            addLog(`✅ Added ${pos.name} with ${pos.type} animation`)
          })
        } catch (error) {
          addLog(`❌ Error adding animated markers: ${error}`)
        }
        setCurrentStep(5)
        break

      case 5: // Restaurant animated markers
        addLog('🍽️ Step 5: Adding bouncing restaurant markers')
        try {
          // Clean up existing restaurant markers first
          for (let i = 0; i < 10; i++) { // Clean up more than needed to be safe
            if (mapInstance.getSource(`restaurant-source-${i}`)) {
              if (mapInstance.getLayer(`restaurant-layer-${i}`)) {
                mapInstance.removeLayer(`restaurant-layer-${i}`)
              }
              mapInstance.removeSource(`restaurant-source-${i}`)
            }
            if (mapInstance.hasImage(`restaurant-${i}`)) {
              mapInstance.removeImage(`restaurant-${i}`)
            }
          }

          const restaurants = [
            { name: "El Ciruelo", position: [-99.1035, 18.9845], icon: "🍴", category: "restaurant" },
            { name: "Casa de las Flores", position: [-99.1000, 18.9835], icon: "🌿", category: "vegetarian" },
            { name: "Tepoznieves", position: [-99.1040, 18.9865], icon: "🍦", category: "dessert" },
            { name: "Mercado Local", position: [-99.0995, 18.9870], icon: "🏪", category: "market" }
          ]

          restaurants.forEach((restaurant, index) => {
            const size = 70

            const restaurantMarker = {
              width: size,
              height: size,
              data: new Uint8Array(size * size * 4),
              context: null as CanvasRenderingContext2D | null,
              icon: restaurant.icon,
              name: restaurant.name,

              onAdd: function () {
                const canvas = document.createElement('canvas')
                canvas.width = this.width
                canvas.height = this.height
                this.context = canvas.getContext('2d')
              },

              render: function () {
                const duration = 2500 + index * 200
                const t = (performance.now() % duration) / duration
                const bounce = Math.abs(Math.sin(t * Math.PI * 2)) * 8
                const scale = 1 + Math.sin(t * Math.PI * 4) * 0.1

                if (!this.context) return false

                const context = this.context
                context.clearRect(0, 0, this.width, this.height)

                const centerX = this.width / 2
                const centerY = this.height / 2

                // Shadow effect
                context.save()
                context.globalAlpha = 0.3
                context.fillStyle = '#000'
                context.beginPath()
                context.ellipse(centerX, centerY + bounce + 20, 20 * scale, 5, 0, 0, Math.PI * 2)
                context.fill()
                context.restore()

                // Background circle with pulse
                const pulseRadius = 25 * scale + Math.sin(t * Math.PI * 6) * 2
                context.beginPath()
                context.arc(centerX, centerY - bounce, pulseRadius, 0, Math.PI * 2)
                context.fillStyle = 'rgba(255, 255, 255, 0.95)'
                context.strokeStyle = '#2d3748'
                context.lineWidth = 2
                context.fill()
                context.stroke()

                // Icon with bounce and scale effect
                context.save()
                context.font = `${Math.round(22 * scale)}px serif`
                context.textAlign = 'center'
                context.textBaseline = 'middle'
                context.fillStyle = '#2d3748'
                context.fillText(
                  this.icon,
                  centerX,
                  centerY - bounce
                )
                context.restore()

                this.data = new Uint8Array(context.getImageData(0, 0, this.width, this.height).data)
                mapInstance.triggerRepaint()
                return true
              }
            }

            mapInstance.addImage(`restaurant-${index}`, restaurantMarker, { pixelRatio: 2 })

            mapInstance.addSource(`restaurant-source-${index}`, {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: [{
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: restaurant.position
                  },
                  properties: {
                    name: restaurant.name,
                    category: restaurant.category,
                    icon: restaurant.icon
                  }
                }]
              }
            })

            mapInstance.addLayer({
              id: `restaurant-layer-${index}`,
              type: 'symbol',
              source: `restaurant-source-${index}`,
              layout: {
                'icon-image': `restaurant-${index}`,
                'icon-allow-overlap': true
              }
            })

            // Add click interaction
            mapInstance.on('click', `restaurant-layer-${index}`, (e) => {
              if (!e.features?.[0]) return

              const coordinates = (e.features[0].geometry as GeoJSON.Point).coordinates.slice()
              const { name, category } = e.features[0].properties || {}

              new mapboxgl.Popup({ offset: 30 })
                .setLngLat(coordinates as [number, number])
                .setHTML(`
                  <div class="p-4">
                    <h3 class="font-bold text-lg mb-2 text-gray-800">${name}</h3>
                    <p class="text-sm text-gray-600 mb-2">Category: ${category}</p>
                    <p class="text-xs text-gray-500">Animated bouncing marker with shadow effects</p>
                  </div>
                `)
                .addTo(mapInstance)
            })

            mapInstance.on('mouseenter', `restaurant-layer-${index}`, () => {
              mapInstance.getCanvas().style.cursor = 'pointer'
            })

            mapInstance.on('mouseleave', `restaurant-layer-${index}`, () => {
              mapInstance.getCanvas().style.cursor = ''
            })

            addLog(`✅ Added ${restaurant.name} bouncing marker`)
          })
        } catch (error) {
          addLog(`❌ Error adding restaurant markers: ${error}`)
        }
        setCurrentStep(6)
        break

      case 6: // Moving car animation
        addLog('🚗 Step 6: Adding animated moving car')
        try {
          // Clean up existing sources/layers if they exist
          if (mapInstance.getSource('moving-car-source')) {
            if (mapInstance.getLayer('moving-car-layer')) {
              mapInstance.removeLayer('moving-car-layer')
            }
            mapInstance.removeSource('moving-car-source')
          }
          if (mapInstance.hasImage('moving-car')) {
            mapInstance.removeImage('moving-car')
          }

          const size = 50

          const movingCar = {
            width: size,
            height: size,
            data: new Uint8Array(size * size * 4),
            context: null as CanvasRenderingContext2D | null,
            currentPosition: [-99.1017, 18.9847] as [number, number],
            targetPosition: [-99.1050, 18.9880] as [number, number],
            startTime: 0,
            animationDuration: 5000, // 5 seconds
            bearing: 0,

            onAdd: function () {
              const canvas = document.createElement('canvas')
              canvas.width = this.width
              canvas.height = this.height
              this.context = canvas.getContext('2d')
              this.startTime = performance.now()
            },

            render: function () {
              if (!this.context) return false

              const now = performance.now()
              const elapsed = now - this.startTime
              const progress = Math.min(elapsed / this.animationDuration, 1)

              // Calculate current position using linear interpolation
              const lng = this.currentPosition[0] + (this.targetPosition[0] - this.currentPosition[0]) * progress
              const lat = this.currentPosition[1] + (this.targetPosition[1] - this.currentPosition[1]) * progress

              // Calculate bearing for car rotation
              const deltaLng = this.targetPosition[0] - this.currentPosition[0]
              const deltaLat = this.targetPosition[1] - this.currentPosition[1]
              this.bearing = Math.atan2(deltaLng, deltaLat)

              // Update the source with new position
              const source = mapInstance.getSource('moving-car-source') as mapboxgl.GeoJSONSource
              if (source) {
                source.setData({
                  type: 'FeatureCollection',
                  features: [{
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: [lng, lat]
                    },
                    properties: {
                      name: 'Moving Car',
                      progress: progress
                    }
                  }]
                })
              }

              const context = this.context
              context.clearRect(0, 0, this.width, this.height)

              // Save context for rotation
              context.save()
              context.translate(this.width / 2, this.height / 2)
              context.rotate(this.bearing)

              // Draw car body
              context.fillStyle = '#3182ce'
              context.fillRect(-15, -8, 30, 16)

              // Draw car windows
              context.fillStyle = '#87ceeb'
              context.fillRect(-12, -5, 10, 5)
              context.fillRect(2, -5, 10, 5)

              // Draw car wheels
              context.fillStyle = '#2d3748'
              context.beginPath()
              context.arc(-10, -10, 3, 0, Math.PI * 2)
              context.arc(10, -10, 3, 0, Math.PI * 2)
              context.arc(-10, 10, 3, 0, Math.PI * 2)
              context.arc(10, 10, 3, 0, Math.PI * 2)
              context.fill()

              // Draw direction indicator
              context.fillStyle = '#e53e3e'
              context.beginPath()
              context.moveTo(15, 0)
              context.lineTo(10, -3)
              context.lineTo(10, 3)
              context.closePath()
              context.fill()

              context.restore()

              // Check if animation should restart
              if (progress >= 1) {
                // Swap start and target positions for return trip
                const temp = this.currentPosition
                this.currentPosition = this.targetPosition
                this.targetPosition = temp
                this.startTime = now
              }

              this.data = new Uint8Array(context.getImageData(0, 0, this.width, this.height).data)
              mapInstance.triggerRepaint()
              return true
            }
          }

          mapInstance.addImage('moving-car', movingCar, { pixelRatio: 2 })

          mapInstance.addSource('moving-car-source', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-99.1017, 18.9847]
                },
                properties: {
                  name: 'Moving Car'
                }
              }]
            }
          })

          mapInstance.addLayer({
            id: 'moving-car-layer',
            type: 'symbol',
            source: 'moving-car-source',
            layout: {
              'icon-image': 'moving-car',
              'icon-allow-overlap': true,
              'icon-ignore-placement': true
            }
          })

          addLog('✅ Moving car animation added - watch it drive around!')
        } catch (error) {
          addLog(`❌ Error adding moving car: ${error}`)
        }
        setCurrentStep(7)
        break

      case 7: // Walking person animation
        addLog('🚶 Step 7: Adding animated walking person')
        try {
          // Clean up existing sources/layers if they exist
          if (mapInstance.getSource('walking-person-source')) {
            if (mapInstance.getLayer('walking-person-layer')) {
              mapInstance.removeLayer('walking-person-layer')
            }
            mapInstance.removeSource('walking-person-source')
          }
          if (mapInstance.hasImage('walking-person')) {
            mapInstance.removeImage('walking-person')
          }

          const size = 40

          const walkingPerson = {
            width: size,
            height: size,
            data: new Uint8Array(size * size * 4),
            context: null as CanvasRenderingContext2D | null,
            currentPosition: [-99.1000, 18.9830] as [number, number],
            targetPosition: [-99.1020, 18.9870] as [number, number],
            startTime: 0,
            animationDuration: 8000, // 8 seconds (slower walking)
            walkCycle: 0,

            onAdd: function () {
              const canvas = document.createElement('canvas')
              canvas.width = this.width
              canvas.height = this.height
              this.context = canvas.getContext('2d')
              this.startTime = performance.now()
            },

            render: function () {
              if (!this.context) return false

              const now = performance.now()
              const elapsed = now - this.startTime
              const progress = Math.min(elapsed / this.animationDuration, 1)

              // Calculate current position
              const lng = this.currentPosition[0] + (this.targetPosition[0] - this.currentPosition[0]) * progress
              const lat = this.currentPosition[1] + (this.targetPosition[1] - this.currentPosition[1]) * progress

              // Update walking cycle for leg animation
              this.walkCycle = (now % 1000) / 1000 * Math.PI * 2

              // Update the source with new position
              const source = mapInstance.getSource('walking-person-source') as mapboxgl.GeoJSONSource
              if (source) {
                source.setData({
                  type: 'FeatureCollection',
                  features: [{
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: [lng, lat]
                    },
                    properties: {
                      name: 'Walking Person',
                      progress: progress
                    }
                  }]
                })
              }

              const context = this.context
              context.clearRect(0, 0, this.width, this.height)

              const centerX = this.width / 2
              const centerY = this.height / 2

              // Draw person body
              context.fillStyle = '#2d3748'
              context.fillRect(centerX - 3, centerY - 8, 6, 12)

              // Draw head
              context.fillStyle = '#f7fafc'
              context.beginPath()
              context.arc(centerX, centerY - 12, 4, 0, Math.PI * 2)
              context.fill()

              // Draw animated legs (walking cycle)
              const legOffset = Math.sin(this.walkCycle) * 3
              context.strokeStyle = '#2d3748'
              context.lineWidth = 2

              // Left leg
              context.beginPath()
              context.moveTo(centerX - 1, centerY + 4)
              context.lineTo(centerX - 1 + legOffset, centerY + 12)
              context.stroke()

              // Right leg
              context.beginPath()
              context.moveTo(centerX + 1, centerY + 4)
              context.lineTo(centerX + 1 - legOffset, centerY + 12)
              context.stroke()

              // Draw arms
              const armOffset = Math.sin(this.walkCycle + Math.PI) * 2
              
              // Left arm
              context.beginPath()
              context.moveTo(centerX - 3, centerY - 5)
              context.lineTo(centerX - 5 + armOffset, centerY + 2)
              context.stroke()

              // Right arm
              context.beginPath()
              context.moveTo(centerX + 3, centerY - 5)
              context.lineTo(centerX + 5 - armOffset, centerY + 2)
              context.stroke()

              // Check if animation should restart
              if (progress >= 1) {
                // Swap start and target positions for return trip
                const temp = this.currentPosition
                this.currentPosition = this.targetPosition
                this.targetPosition = temp
                this.startTime = now
              }

              this.data = new Uint8Array(context.getImageData(0, 0, this.width, this.height).data)
              mapInstance.triggerRepaint()
              return true
            }
          }

          mapInstance.addImage('walking-person', walkingPerson, { pixelRatio: 2 })

          mapInstance.addSource('walking-person-source', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-99.1000, 18.9830]
                },
                properties: {
                  name: 'Walking Person'
                }
              }]
            }
          })

          mapInstance.addLayer({
            id: 'walking-person-layer',
            type: 'symbol',
            source: 'walking-person-source',
            layout: {
              'icon-image': 'walking-person',
              'icon-allow-overlap': true,
              'icon-ignore-placement': true
            }
          })

          addLog('✅ Walking person animation added - watch them stroll!')
        } catch (error) {
          addLog(`❌ Error adding walking person: ${error}`)
        }
        setCurrentStep(8)
        break

      case 8: // Cross-platform iOS/Android features demo
        addLog('📱 Step 8: Cross-platform iOS/Android features demo')
        try {
          // Clean up existing sources/layers if they exist
          if (mapInstance.getSource('cross-platform-source')) {
            if (mapInstance.getLayer('cross-platform-layer')) {
              mapInstance.removeLayer('cross-platform-layer')
            }
            mapInstance.removeSource('cross-platform-source')
          }
          if (mapInstance.hasImage('cross-platform-icon')) {
            mapInstance.removeImage('cross-platform-icon')
          }

          // Feature 1: Runtime Style Switching (common to both iOS & Android)
          addLog('🎨 Implementing runtime style switching...')
          
          const size = 60
          const crossPlatformIcon = {
            width: size,
            height: size,
            data: new Uint8Array(size * size * 4),
            context: null as CanvasRenderingContext2D | null,
            styleMode: 'ios',
            lastStyleSwitch: 0,
            styleSwitchInterval: 3000, // Switch every 3 seconds

            onAdd: function () {
              const canvas = document.createElement('canvas')
              canvas.width = this.width
              canvas.height = this.height
              this.context = canvas.getContext('2d')
              this.lastStyleSwitch = performance.now()
            },

            render: function () {
              if (!this.context) return false

              const now = performance.now()
              
              // Switch between iOS and Android styles
              if (now - this.lastStyleSwitch > this.styleSwitchInterval) {
                this.styleMode = this.styleMode === 'ios' ? 'android' : 'ios'
                this.lastStyleSwitch = now
              }

              const context = this.context
              context.clearRect(0, 0, this.width, this.height)

              const centerX = this.width / 2
              const centerY = this.height / 2

              if (this.styleMode === 'ios') {
                // iOS-style rounded design
                context.fillStyle = '#007AFF' // iOS blue
                context.beginPath()
                context.roundRect(centerX - 20, centerY - 15, 40, 30, 8)
                context.fill()

                // iOS-style icon (Apple logo inspired)
                context.fillStyle = '#FFFFFF'
                context.font = '16px Arial'
                context.textAlign = 'center'
                context.textBaseline = 'middle'
                context.fillText('📱', centerX, centerY - 2)

                // iOS-style shadow
                context.shadowColor = 'rgba(0, 122, 255, 0.3)'
                context.shadowBlur = 10
                context.shadowOffsetY = 2

                // Add "iOS" label
                context.fillStyle = '#FFFFFF'
                context.font = '8px Arial'
                context.fillText('iOS', centerX, centerY + 12)

              } else {
                // Android-style material design
                context.fillStyle = '#34A853' // Android green
                context.beginPath()
                context.roundRect(centerX - 20, centerY - 15, 40, 30, 4)
                context.fill()

                // Android-style icon (Robot inspired)
                context.fillStyle = '#FFFFFF'
                context.font = '16px Arial'
                context.textAlign = 'center'
                context.textBaseline = 'middle'
                context.fillText('🤖', centerX, centerY - 2)

                // Material design elevation shadow
                context.shadowColor = 'rgba(52, 168, 83, 0.3)'
                context.shadowBlur = 8
                context.shadowOffsetY = 4

                // Add "Android" label
                context.fillStyle = '#FFFFFF'
                context.font = '7px Arial'
                context.fillText('Android', centerX, centerY + 12)
              }

              this.data = new Uint8Array(context.getImageData(0, 0, this.width, this.height).data)
              mapInstance.triggerRepaint()
              return true
            }
          }

          mapInstance.addImage('cross-platform-icon', crossPlatformIcon, { pixelRatio: 2 })

          // Feature 2: Dynamic Data Layer (common feature)
          const crossPlatformData = {
            type: 'FeatureCollection' as const,
            features: [
              {
                type: 'Feature' as const,
                geometry: {
                  type: 'Point' as const,
                  coordinates: [-99.0980, 18.9890]
                },
                properties: {
                  name: 'Cross-Platform Demo',
                  platform: 'Both iOS & Android',
                  features: [
                    'Runtime Style Switching',
                    'Dynamic Data Overlays', 
                    'Camera Manipulation',
                    'Custom Markers',
                    'Map Querying'
                  ]
                }
              }
            ]
          }

          mapInstance.addSource('cross-platform-source', {
            type: 'geojson',
            data: crossPlatformData
          })

          mapInstance.addLayer({
            id: 'cross-platform-layer',
            type: 'symbol',
            source: 'cross-platform-source',
            layout: {
              'icon-image': 'cross-platform-icon',
              'icon-allow-overlap': true,
              'text-field': ['get', 'platform'],
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              'text-offset': [0, 2],
              'text-anchor': 'top',
              'text-size': 12
            },
            paint: {
              'text-color': '#2d3748',
              'text-halo-color': '#ffffff',
              'text-halo-width': 2
            }
          })

          // Feature 3: Camera Manipulation (iOS & Android common)
          addLog('📹 Adding smooth camera transitions...')
          
          // Stop any existing camera animation
          if (cameraAnimationRef.current) {
            cancelAnimationFrame(cameraAnimationRef.current)
          }
          
          const cameraAnimationStart = performance.now()
          const animationDuration = 8000 // 8 seconds total
          
          const animateCamera = () => {
            const elapsed = performance.now() - cameraAnimationStart
            
            // Stop animation after duration
            if (elapsed >= animationDuration) {
              // Reset to original position
              mapInstance.easeTo({
                zoom: 14,
                bearing: 0,
                duration: 1000
              })
              cameraAnimationRef.current = null
              addLog('📹 Camera animation completed')
              return
            }
            
            const cycle = elapsed / animationDuration // 0 to 1
            
            // Smooth zoom and rotation animation
            const zoom = 14 + Math.sin(cycle * Math.PI * 4) * 1 // 2 zoom cycles
            const bearing = cycle * 360 // One full rotation
            
            mapInstance.easeTo({
              zoom: zoom,
              bearing: bearing,
              duration: 100,
              essential: true
            })
            
            cameraAnimationRef.current = requestAnimationFrame(animateCamera)
          }
          
          // Start camera animation after a short delay
          setTimeout(() => {
            cameraAnimationRef.current = requestAnimationFrame(animateCamera)
            addLog('📹 Camera animation started - will run for 8 seconds')
          }, 1000)

          // Feature 4: Interactive Map Querying (common feature)
          mapInstance.on('click', 'cross-platform-layer', (e) => {
            if (!e.features?.[0]) return

            const feature = e.features[0]
            const coordinates = (feature.geometry as GeoJSON.Point).coordinates.slice()
            const { name, platform, features } = feature.properties || {}

            const featuresHtml = (features as string[])?.map(f => `<li>• ${f}</li>`).join('')

            new mapboxgl.Popup({ offset: 25 })
              .setLngLat(coordinates as [number, number])
              .setHTML(`
                <div class="p-4 max-w-xs">
                  <h3 class="font-bold text-lg mb-2">${name}</h3>
                  <p class="text-sm text-blue-600 mb-3">${platform}</p>
                  <h4 class="font-semibold text-sm mb-2">Common Features:</h4>
                  <ul class="text-xs text-gray-600 space-y-1">
                    ${featuresHtml}
                  </ul>
                  <div class="mt-3 p-2 bg-blue-50 rounded text-xs">
                    <strong>Live Demo:</strong> Icon switches between iOS and Android styles every 3 seconds!
                  </div>
                </div>
              `)
              .addTo(mapInstance)
          })

          mapInstance.on('mouseenter', 'cross-platform-layer', () => {
            mapInstance.getCanvas().style.cursor = 'pointer'
          })

          mapInstance.on('mouseleave', 'cross-platform-layer', () => {
            mapInstance.getCanvas().style.cursor = ''
          })

          addLog('✅ Cross-platform demo added with:')
          addLog('  📱 iOS/Android style switching')
          addLog('  📊 Dynamic data overlays')
          addLog('  📹 Smooth camera manipulation')
          addLog('  🔍 Interactive map querying')
          addLog('  🎨 Runtime style modifications')
          
        } catch (error) {
          addLog(`❌ Error adding cross-platform demo: ${error}`)
        }
        setCurrentStep(9)
        break

      case 9: // Query terrain elevation at Pirámide del Tepozteco
        addLog('🏔️ Step 9: Querying terrain elevation at Pirámide del Tepozteco')
        try {
          // Clean up existing sources/layers if they exist
          if (mapInstance.getSource('elevation-query-source')) {
            if (mapInstance.getLayer('elevation-query-layer')) {
              mapInstance.removeLayer('elevation-query-layer')
            }
            mapInstance.removeSource('elevation-query-source')
          }

          // Ensure terrain is enabled for elevation queries
          if (!mapInstance.getSource('mapbox-dem')) {
            addLog('📦 Adding DEM source for elevation queries...')
            mapInstance.addSource('mapbox-dem', {
              type: 'raster-dem',
              url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
              tileSize: 512,
              maxzoom: 14
            })
          }
          
          if (!mapInstance.getTerrain()) {
            mapInstance.setTerrain({ 
              source: 'mapbox-dem', 
              exaggeration: 1.5 
            })
            addLog('🏔️ Terrain enabled for elevation queries')
          }

          // Coordinates for Pirámide del Tepozteco
          const pyramidCoords: [number, number] = [-99.0990, 18.9880]
          
          // Create a hiking trail path to the pyramid
          const trailToPyramid = [
            [-99.1017, 18.9847], // Starting point (town center)
            [-99.1005, 18.9855], // Trail entrance  
            [-99.0995, 18.9862], // Mid-trail point 1
            [-99.0992, 18.9870], // Mid-trail point 2
            [-99.0990, 18.9875], // Near pyramid base
            pyramidCoords         // Pyramid peak
          ]

          // Add trail source
          mapInstance.addSource('elevation-query-source', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                properties: {
                  name: 'Trail to Pirámide del Tepozteco'
                },
                geometry: {
                  type: 'LineString',
                  coordinates: trailToPyramid
                }
              }, {
                type: 'Feature',
                properties: {
                  name: 'Pirámide del Tepozteco',
                  type: 'pyramid'
                },
                geometry: {
                  type: 'Point',
                  coordinates: pyramidCoords
                }
              }]
            }
          })

          // Add trail line layer
          mapInstance.addLayer({
            id: 'elevation-query-layer',
            type: 'line',
            source: 'elevation-query-source',
            filter: ['==', '$type', 'LineString'],
            paint: {
              'line-color': '#ff6b6b',
              'line-width': 4,
              'line-opacity': 0.8
            }
          })

          // Add pyramid marker layer
          mapInstance.addLayer({
            id: 'pyramid-marker-layer',
            type: 'circle',
            source: 'elevation-query-source',
            filter: ['==', '$type', 'Point'],
            paint: {
              'circle-color': '#ffd700',
              'circle-radius': 12,
              'circle-stroke-width': 3,
              'circle-stroke-color': '#fff'
            }
          })

          addLog('✅ Trail and pyramid marker added')
          
          // Enable trail visibility state
          setTrailVisible(true)

          // Query elevation at multiple points along the trail
          let pointIndex = 0
          const queryElevations = () => {
            if (pointIndex < trailToPyramid.length) {
              const coords = trailToPyramid[pointIndex] as [number, number]
              
              try {
                const elevation = mapInstance.queryTerrainElevation(coords, { exaggerated: false })
                const elevationExaggerated = mapInstance.queryTerrainElevation(coords, { exaggerated: true })
                
                if (elevation !== null && elevation !== undefined && elevationExaggerated !== null && elevationExaggerated !== undefined) {
                  const roundedElevation = Math.round(elevation)
                  const roundedExaggerated = Math.round(elevationExaggerated)
                  
                  if (pointIndex === trailToPyramid.length - 1) {
                    addLog(`🏛️ PYRAMID ELEVATION: ${roundedElevation}m (${roundedExaggerated}m exaggerated)`)
                    addLog('🎯 Pirámide del Tepozteco sits at approximately 2,050m above sea level!')
                  } else {
                    addLog(`📍 Trail point ${pointIndex + 1}: ${roundedElevation}m elevation`)
                  }
                } else {
                  addLog(`⚠️ Could not query elevation at point ${pointIndex + 1}`)
                }
              } catch (error) {
                addLog(`❌ Elevation query error at point ${pointIndex + 1}: ${error}`)
              }
              
              pointIndex++
              setTimeout(queryElevations, 1000) // Query next point after 1 second
            } else {
              addLog('✅ Elevation analysis complete!')
              addLog('📊 Trail elevation profile: Town (1,700m) → Pyramid (2,050m)')
              addLog('⛰️ Total elevation gain: ~350 meters climbing to the pyramid')
            }
          }

          // Start elevation queries after a short delay
          setTimeout(queryElevations, 1000)

          // Enable elevation query mode for click interactions
          setElevationQueryMode(true)
          addLog('🖱️ Click anywhere on the map to query elevation!')
          addLog('✅ Elevation query mode enabled')
          
        } catch (error) {
          addLog(`❌ Error adding terrain elevation query: ${error}`)
        }
        setCurrentStep(9)
        
        // Auto-advance to next step
        setTimeout(() => {
          setElevationQueryMode(false) // Disable elevation query mode before next step
          addLog('🔄 Elevation query mode disabled')
          runStep(10)
        }, 8000) // Give time to see all elevation queries
        break

      case 10: // Interactive layer opacity controls
        addLog('🎚️ Step 10: Adding interactive layer opacity controls')
        try {
          // Clean up existing sources/layers if they exist
          if (mapInstance.getSource('opacity-demo-source')) {
            if (mapInstance.getLayer('opacity-demo-layer')) {
              mapInstance.removeLayer('opacity-demo-layer')
            }
            mapInstance.removeSource('opacity-demo-source')
          }

          // Create a demo layer with multiple circles to demonstrate opacity
          const opacityDemoData = {
            type: 'FeatureCollection' as const,
            features: [
              {
                type: 'Feature' as const,
                geometry: {
                  type: 'Point' as const,
                  coordinates: [-99.0990, 18.9820]
                },
                properties: {
                  name: 'Opacity Demo Point 1',
                  size: 30
                }
              },
              {
                type: 'Feature' as const,
                geometry: {
                  type: 'Point' as const,
                  coordinates: [-99.1000, 18.9825]
                },
                properties: {
                  name: 'Opacity Demo Point 2',
                  size: 40
                }
              },
              {
                type: 'Feature' as const,
                geometry: {
                  type: 'Point' as const,
                  coordinates: [-99.1010, 18.9830]
                },
                properties: {
                  name: 'Opacity Demo Point 3',
                  size: 50
                }
              },
              {
                type: 'Feature' as const,
                geometry: {
                  type: 'Point' as const,
                  coordinates: [-99.1020, 18.9835]
                },
                properties: {
                  name: 'Opacity Demo Point 4',
                  size: 35
                }
              },
              {
                type: 'Feature' as const,
                geometry: {
                  type: 'Point' as const,
                  coordinates: [-99.1030, 18.9840]
                },
                properties: {
                  name: 'Opacity Demo Point 5',
                  size: 45
                }
              }
            ]
          }

          mapInstance.addSource('opacity-demo-source', {
            type: 'geojson',
            data: opacityDemoData
          })

          // Add a circle layer with varying sizes and colors
          mapInstance.addLayer({
            id: 'opacity-demo-layer',
            type: 'circle',
            source: 'opacity-demo-source',
            paint: {
              'circle-radius': ['get', 'size'],
              'circle-color': [
                'interpolate',
                ['linear'],
                ['get', 'size'],
                30, '#ff6b6b',
                35, '#ffa500', 
                40, '#ffeb3b',
                45, '#4caf50',
                50, '#2196f3'
              ],
              'circle-stroke-width': 3,
              'circle-stroke-color': '#ffffff',
              'circle-opacity': layerOpacity / 100,
              'circle-stroke-opacity': 0.8
            }
          })

          // Show opacity controls
          setShowOpacityControls(true)

          // Add click interactions for the opacity demo points
          mapInstance.on('click', 'opacity-demo-layer', (e) => {
            if (!e.features?.[0]) return

            const feature = e.features[0]
            const coordinates = (feature.geometry as GeoJSON.Point).coordinates.slice()
            const { name, size } = feature.properties || {}
            const currentOpacity = Math.round((layerOpacity / 100) * 100)

            new mapboxgl.Popup({ offset: 15 })
              .setLngLat(coordinates as [number, number])
              .setHTML(`
                <div class="p-3">
                  <h3 class="font-bold text-sm mb-2">${name}</h3>
                  <div class="text-xs text-gray-600 space-y-1">
                    <div>Circle Size: ${size}px</div>
                    <div>Current Opacity: ${currentOpacity}%</div>
                    <div class="mt-2 p-2 bg-blue-50 rounded">
                      <strong>Try adjusting the opacity slider!</strong><br>
                      Watch how all circles fade together
                    </div>
                  </div>
                </div>
              `)
              .addTo(mapInstance)
          })

          mapInstance.on('mouseenter', 'opacity-demo-layer', () => {
            mapInstance.getCanvas().style.cursor = 'pointer'
          })

          mapInstance.on('mouseleave', 'opacity-demo-layer', () => {
            mapInstance.getCanvas().style.cursor = ''
          })

          addLog('✅ Interactive opacity demo layer added')
          addLog('🎚️ Use the opacity slider to control layer transparency')
          addLog('🖱️ Click on circles to see current opacity values')
          
        } catch (error) {
          addLog(`❌ Error adding opacity controls: ${error}`)
        }
        setCurrentStep(9)
        
        // Auto-advance to next step after a short delay
        setTimeout(() => {
          runStep(11)
        }, 2000)
        break

      case 11: // HTML Cluster markers
        addLog('📊 Step 11: Adding HTML cluster markers')
        try {
          // Sample clustered data points
          const clusterData = {
            type: 'FeatureCollection' as const,
            features: [
              // Main cluster around town center
              ...Array.from({length: 15}, (_, i) => ({
                type: 'Feature' as const,
                geometry: {
                  type: 'Point' as const,
                  coordinates: [
                    -99.1017 + (Math.random() - 0.5) * 0.004,
                    18.9847 + (Math.random() - 0.5) * 0.004
                  ]
                },
                properties: {
                  cluster: false,
                  category: ['hotel', 'restaurant', 'shop', 'attraction'][Math.floor(Math.random() * 4)],
                  name: `Business ${i + 1}`
                }
              })),
              // Secondary cluster
              ...Array.from({length: 8}, (_, i) => ({
                type: 'Feature' as const,
                geometry: {
                  type: 'Point' as const,
                  coordinates: [
                    -99.1040 + (Math.random() - 0.5) * 0.003,
                    18.9830 + (Math.random() - 0.5) * 0.003
                  ]
                },
                properties: {
                  cluster: false,
                  category: ['hotel', 'restaurant'][Math.floor(Math.random() * 2)],
                  name: `Business ${i + 16}`
                }
              }))
            ]
          }

          mapInstance.addSource('cluster-source', {
            type: 'geojson',
            data: clusterData,
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 50
          })

          // Clusters
          mapInstance.addLayer({
            id: 'clusters',
            type: 'circle',
            source: 'cluster-source',
            filter: ['has', 'point_count'],
            paint: {
              'circle-color': [
                'step',
                ['get', 'point_count'],
                '#51bbd6', 10,
                '#f1f075', 20,
                '#f28cb1'
              ],
              'circle-radius': [
                'step',
                ['get', 'point_count'],
                20, 10,
                30, 20,
                40
              ],
              'circle-stroke-width': 2,
              'circle-stroke-color': '#fff'
            }
          })

          // Cluster count
          mapInstance.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: 'cluster-source',
            filter: ['has', 'point_count'],
            layout: {
              'text-field': '{point_count_abbreviated}',
              'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
              'text-size': 12
            },
            paint: {
              'text-color': '#fff'
            }
          })

          // Unclustered points
          mapInstance.addLayer({
            id: 'unclustered-point',
            type: 'circle',
            source: 'cluster-source',
            filter: ['!', ['has', 'point_count']],
            paint: {
              'circle-color': [
                'match',
                ['get', 'category'],
                'hotel', '#e53e3e',
                'restaurant', '#3182ce', 
                'shop', '#38a169',
                'attraction', '#d69e2e',
                '#718096'
              ],
              'circle-radius': 8,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#fff'
            }
          })

          // Click handlers for clusters
          mapInstance.on('click', 'clusters', (e) => {
            const features = mapInstance.queryRenderedFeatures(e.point, {
              layers: ['clusters']
            })
            
            if (!features.length) return
            
            const clusterId = features[0].properties?.cluster_id
            if (clusterId) {
              const source = mapInstance.getSource('cluster-source') as mapboxgl.GeoJSONSource
              source.getClusterExpansionZoom(clusterId, (err, zoom) => {
                if (err) return

                const coordinates = (features[0].geometry as GeoJSON.Point).coordinates
                mapInstance.easeTo({
                  center: coordinates as [number, number],
                  zoom: zoom || 15
                })
              })
            }
          })

          // Click handlers for individual points
          mapInstance.on('click', 'unclustered-point', (e) => {
            if (!e.features?.[0]) return

            const coordinates = (e.features[0].geometry as GeoJSON.Point).coordinates.slice()
            const { name, category } = e.features[0].properties || {}

            new mapboxgl.Popup()
              .setLngLat(coordinates as [number, number])
              .setHTML(`
                <div class="p-3">
                  <h3 class="font-bold text-sm mb-1">${name}</h3>
                  <p class="text-xs text-gray-600">${category}</p>
                  <p class="text-xs text-gray-500 mt-1">Part of cluster visualization</p>
                </div>
              `)
              .addTo(mapInstance)
          })

          // Mouse cursor effects
          mapInstance.on('mouseenter', 'clusters', () => {
            mapInstance.getCanvas().style.cursor = 'pointer'
          })
          
          mapInstance.on('mouseleave', 'clusters', () => {
            mapInstance.getCanvas().style.cursor = ''
          })

          mapInstance.on('mouseenter', 'unclustered-point', () => {
            mapInstance.getCanvas().style.cursor = 'pointer'
          })
          
          mapInstance.on('mouseleave', 'unclustered-point', () => {
            mapInstance.getCanvas().style.cursor = ''
          })

          addLog('✅ HTML cluster markers added with zoom interaction')
        } catch (error) {
          addLog(`❌ Error adding cluster markers: ${error}`)
        }
        setCurrentStep(11)
        
        // Auto-advance to final step
        setTimeout(() => {
          runStep(12)
        }, 2000)
        break

      case 12: // External GeoJSON
        addLog('🌍 Step 12: Loading external GeoJSON data')
        try {
          // Simulate external GeoJSON data (in production, this would be fetched from an API)
          const externalGeoJSON = {
            type: 'FeatureCollection' as const,
            features: [
              {
                type: 'Feature' as const,
                geometry: {
                  type: 'Point' as const,
                  coordinates: [-99.0990, 18.9880]
                },
                properties: {
                  name: 'Pirámide del Tepozteco',
                  type: 'archaeological-site',
                  description: 'Ancient Aztec temple with hiking trail',
                  elevation: 2050,
                  difficulty: 'Moderate'
                }
              },
              {
                type: 'Feature' as const,
                geometry: {
                  type: 'Point' as const,
                  coordinates: [-99.1050, 18.9820]
                },
                properties: {
                  name: 'Convento de Tepoztlán',
                  type: 'historical-site',
                  description: '16th century Dominican convent',
                  year_built: 1560,
                  status: 'UNESCO World Heritage candidate'
                }
              },
              {
                type: 'Feature' as const,
                geometry: {
                  type: 'LineString' as const,
                  coordinates: [
                    [-99.1017, 18.9847],
                    [-99.1000, 18.9860],
                    [-99.0995, 18.9870],
                    [-99.0990, 18.9880]
                  ]
                },
                properties: {
                  name: 'Tepozteco Trail',
                  type: 'hiking-trail',
                  distance_km: 2.3,
                  duration_hours: 1.5
                }
              }
            ]
          }

          mapInstance.addSource('external-geojson', {
            type: 'geojson',
            data: externalGeoJSON
          })

          // Points for archaeological sites
          mapInstance.addLayer({
            id: 'archaeological-sites',
            type: 'symbol',
            source: 'external-geojson',
            filter: ['==', ['get', 'type'], 'archaeological-site'],
            layout: {
              'icon-image': 'pulsing-dot', // Reuse animated icon
              'icon-allow-overlap': true,
              'text-field': '{name}',
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              'text-offset': [0, -3],
              'text-anchor': 'bottom'
            },
            paint: {
              'text-color': '#2d3748',
              'text-halo-color': '#fff',
              'text-halo-width': 1
            }
          })

          // Points for historical sites
          mapInstance.addLayer({
            id: 'historical-sites',
            type: 'circle',
            source: 'external-geojson',
            filter: ['==', ['get', 'type'], 'historical-site'],
            paint: {
              'circle-radius': 12,
              'circle-color': '#8b5cf6',
              'circle-stroke-width': 2,
              'circle-stroke-color': '#fff'
            }
          })

          // Hiking trail
          mapInstance.addLayer({
            id: 'hiking-trail',
            type: 'line',
            source: 'external-geojson',
            filter: ['==', ['get', 'type'], 'hiking-trail'],
            paint: {
              'line-color': '#f59e0b',
              'line-width': 4,
              'line-dasharray': [2, 2]
            }
          })

          // Click interactions for external GeoJSON
          const layerIds = ['archaeological-sites', 'historical-sites', 'hiking-trail'] as const
          layerIds.forEach((layerId: string) => {
            mapInstance.on('click', layerId, (e) => {
              if (!e.features?.[0]) return

              const feature = e.features[0]
              const coordinates = feature.geometry.type === 'Point' 
                ? (feature.geometry as GeoJSON.Point).coordinates
                : e.lngLat

              const properties = feature.properties || {}
              
              const popupContent = `
                <div class="p-4 max-w-xs">
                  <h3 class="font-bold text-lg mb-2">${properties.name}</h3>
                  <p class="text-sm text-gray-600 mb-2">${properties.description}</p>
                  <div class="text-xs text-gray-500 space-y-1">
                    ${properties.elevation ? `<div>Elevation: ${properties.elevation}m</div>` : ''}
                    ${properties.year_built ? `<div>Built: ${properties.year_built}</div>` : ''}
                    ${properties.distance_km ? `<div>Distance: ${properties.distance_km}km</div>` : ''}
                    ${properties.difficulty ? `<div>Difficulty: ${properties.difficulty}</div>` : ''}
                  </div>
                </div>
              `

              new mapboxgl.Popup({ offset: 15 })
                .setLngLat(Array.isArray(coordinates) ? coordinates as [number, number] : [coordinates.lng, coordinates.lat])
                .setHTML(popupContent)
                .addTo(mapInstance)
            })

            mapInstance.on('mouseenter', layerId, () => {
              mapInstance.getCanvas().style.cursor = 'pointer'
            })

            mapInstance.on('mouseleave', layerId, () => {
              mapInstance.getCanvas().style.cursor = ''
            })
          })

          addLog('✅ External GeoJSON data loaded with trails and points of interest')
          addLog('🎉 All marker implementations completed successfully!')
        } catch (error) {
          addLog(`❌ Error loading external GeoJSON: ${error}`)
        }
        setCurrentStep(12)
        
        // Auto-advance to final step
        setTimeout(() => {
          runStep(13)
        }, 2000)
        break

      case 13: // Fill opacity transition effects
        addLog('🎨 Step 13: Adding fill opacity transition effects')
        try {
          // Clean up existing sources/layers if they exist
          if (mapInstance.getSource('fill-transition-source')) {
            if (mapInstance.getLayer('fill-transition-layer')) {
              mapInstance.removeLayer('fill-transition-layer')
            }
            mapInstance.removeSource('fill-transition-source')
          }

          // Create a GeoJSON polygon covering the Tepoztlán area for transition effects
          const tepoztlanPolygon = {
            type: 'FeatureCollection' as const,
            features: [{
              type: 'Feature' as const,
              properties: {
                name: 'Tepoztlán Transition Zone',
                description: 'Demonstration area for fill opacity transitions'
              },
              geometry: {
                type: 'Polygon' as const,
                coordinates: [[
                  [-99.1080, 18.9900], // Northwest corner
                  [-99.0950, 18.9900], // Northeast corner  
                  [-99.0950, 18.9780], // Southeast corner
                  [-99.1080, 18.9780], // Southwest corner
                  [-99.1080, 18.9900]  // Close the polygon
                ]]
              }
            }]
          }

          // Add the source
          mapInstance.addSource('fill-transition-source', {
            type: 'geojson',
            data: tepoztlanPolygon
          })

          // Add the fill layer with transition properties
          mapInstance.addLayer({
            id: 'fill-transition-layer',
            type: 'fill',
            source: 'fill-transition-source',
            paint: {
              'fill-color': '#ff6b6b',
              'fill-opacity': 0.8,
              'fill-opacity-transition': {
                duration: 1000, // 1 second transition
                delay: 0
              }
            }
          })

          addLog('✅ Fill transition layer added over Tepoztlán area')
          addLog('🎨 Layer ready for opacity transition effects')
          addLog('🎚️ Use controls to fade in/out the overlay')

          // Demonstrate the transition effect automatically
          let isVisible = true
          const demoTransition = () => {
            setTimeout(() => {
              if (mapInstance.getLayer('fill-transition-layer')) {
                const newOpacity = isVisible ? 0.1 : 0.8
                mapInstance.setPaintProperty('fill-transition-layer', 'fill-opacity', newOpacity)
                addLog(`🎨 Auto-demo: Fading ${isVisible ? 'out' : 'in'} (opacity: ${newOpacity})`)
                isVisible = !isVisible
                
                // Continue demo for a few cycles
                if (performance.now() % 20000 < 10000) { // Demo for ~10 seconds
                  demoTransition()
                }
              }
            }, 2000)
          }
          
          demoTransition()

        } catch (error) {
          addLog(`❌ Error adding fill transition effects: ${error}`)
        }
        setCurrentStep(13)
        break
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">
          {lang === 'es' ? 'Implementación Completa de Marcadores - Mapbox GL JS' : 'Complete Markers Implementation - Mapbox GL JS'}
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Controls */}
          <div className="bg-white/5 rounded-lg p-4">
            <h2 className="text-white font-semibold mb-4">Implementation Steps</h2>
            <div className="space-y-2">
              <button
                onClick={resetAllMarkers}
                className="w-full p-2 rounded text-sm bg-red-600 text-white hover:bg-red-700 transition-colors mb-2"
              >
                🧹 Reset All Markers
              </button>
              <button
                onClick={togglePOIs}
                className={`w-full p-2 rounded text-sm transition-colors mb-3 ${
                  poisHidden 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-yellow-600 text-white hover:bg-yellow-700'
                }`}
              >
                {poisHidden ? '👁️ Show Default POIs' : '🙈 Hide Default POIs'}
              </button>
              
              {/* 3D Terrain Toggle */}
              <button
                onClick={toggle3DTerrain}
                className={`w-full p-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  terrainEnabled 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/30' 
                    : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">
                    {terrainEnabled ? '🏔️' : '🌍'}
                  </span>
                  <span>
                    {terrainEnabled ? 'Disable 3D Terrain' : 'Enable 3D Terrain'}
                  </span>
                </div>
                {terrainEnabled && (
                  <div className="text-xs mt-1 opacity-90">
                    60° camera tilt • 1.5x elevation
                  </div>
                )}
              </button>
              
              {/* Satellite Mode Toggle */}
              <button
                onClick={toggleSatelliteMode}
                className={`w-full p-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  satelliteMode 
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 shadow-lg shadow-orange-500/30' 
                    : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">
                    {satelliteMode ? '🛰️' : '🗺️'}
                  </span>
                  <span>
                    {satelliteMode ? 'Street Map View' : 'Satellite View'}
                  </span>
                </div>
                <div className="text-xs mt-1 opacity-90">
                  {satelliteMode 
                    ? 'Switch to detailed street map of Tepoztlán' 
                    : 'Aerial view of Tepoztlán\'s mountains'}
                </div>
              </button>
              
              {/* Trail Route Toggle */}
              <button
                onClick={toggleTrailRoute}
                className={`w-full p-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  trailVisible 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/30' 
                    : 'bg-gradient-to-r from-gray-600 to-slate-600 text-white hover:from-gray-700 hover:to-slate-700'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">
                    {trailVisible ? '🥾' : '🚫'}
                  </span>
                  <span>
                    {trailVisible ? 'Hide Trail Route' : 'Show Trail Route'}
                  </span>
                </div>
                <div className="text-xs mt-1 opacity-90">
                  {trailVisible 
                    ? 'Hide the hiking trail to Pirámide del Tepozteco' 
                    : 'Show trail route and pyramid marker'}
                </div>
              </button>
              
              {/* Layer Opacity Controls */}
              {showOpacityControls && (
                <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4 space-y-3">
                  <div className="text-white font-medium text-sm flex items-center gap-2">
                    🎚️ Layer Opacity Control
                    <span className="text-xs bg-purple-500 px-2 py-1 rounded">
                      Step 9 Active
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-300">
                      <span>Transparency</span>
                      <span className="font-mono">{layerOpacity}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={layerOpacity}
                      onChange={(e) => {
                        const newOpacity = parseInt(e.target.value)
                        setLayerOpacity(newOpacity)
                        handleOpacityChange(newOpacity)
                      }}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${layerOpacity}%, #374151 ${layerOpacity}%, #374151 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>0% (Invisible)</span>
                      <span>100% (Opaque)</span>
                    </div>
                    <div className="text-xs text-purple-300 bg-purple-900/30 p-2 rounded">
                      💡 Click on the colored circles in the map to see their current opacity values!
                    </div>
                  </div>
                </div>
              )}
              
              {testSteps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => runStep(index + 1)}
                  disabled={currentStep < index + 1}
                  className={`w-full p-2 rounded text-sm transition-colors text-left ${
                    currentStep === index + 1
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : currentStep > index + 1
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  <div className="font-medium">Step {index + 1}</div>
                  <div className="text-xs opacity-80">{step}</div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Logs */}
          <div className="bg-white/5 rounded-lg p-4">
            <h2 className="text-white font-semibold mb-4">Implementation Logs</h2>
            <div className="bg-black/30 rounded p-3 h-64 overflow-y-auto">
              {logs.map((log, index) => (
                <div key={index} className="text-xs text-green-400 font-mono mb-1">
                  {log}
                </div>
              ))}
            </div>
          </div>
          
          {/* Features Info */}
          <div className="bg-white/5 rounded-lg p-4">
            <h2 className="text-white font-semibold mb-4">Implementation Features</h2>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <span>Animated pulsing markers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 animate-spin" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}} />
                <span>Rotating compass icons</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-purple-500" />
                <span>Multi-effect animations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm animate-bounce">🏪</div>
                <span>Bouncing restaurant icons</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm">🚗</div>
                <span>Moving car with route animation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm">🚶</div>
                <span>Walking person with leg movement</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm">📱</div>
                <span>Cross-platform iOS/Android demo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm">🏛️</div>
                <span>Terrain elevation queries at Pirámide del Tepozteco</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm">🥾</div>
                <span>Interactive trail route toggle</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm">🎚️</div>
                <span>Interactive layer opacity controls</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm">🏔️</div>
                <span>3D terrain visualization with DEM</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm">🛰️</div>
                <span>Satellite imagery of Tepoztlán mountains</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full" />
                <span>HTML cluster visualization</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500" />
                <span>External GeoJSON data</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm">🎨</div>
                <span>Fill opacity transition effects</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/20 text-xs text-white/50">
              Based on official Mapbox GL JS documentation examples
            </div>
          </div>
        </div>

        {/* Map */}
        <div 
          ref={mapContainer}
          className="w-full bg-gray-800 rounded-lg border-2 border-white/20"
          style={{ minHeight: '600px' }}
        />
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h2 className="text-white font-semibold mb-2">Animation Techniques Used:</h2>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Canvas-based custom icon rendering with performance.now()</li>
              <li>• Multiple animation types: pulse, rotation, heartbeat, ripple, glow</li>
              <li>• Real-time coordinate interpolation for smooth movement</li>
              <li>• Dynamic bearing calculation and rotation based on movement</li>
              <li>• Walking cycle animation with synchronized arm/leg movement</li>
              <li>• Automatic route reversal for continuous back-and-forth motion</li>
              <li>• Shadow effects and bounce animations with proper physics</li>
            </ul>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h2 className="text-white font-semibold mb-2">Data Integration Features:</h2>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Clustering with zoom-to-expand functionality</li>
              <li>• Category-based color coding and filtering</li>
              <li>• Interactive popups with detailed information</li>
              <li>• Line and polygon rendering for trails</li>
              <li>• Click and hover interaction handlers</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* CSS for slider styling */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.3);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.3);
        }
        
        .slider:focus {
          outline: none;
        }
        
        .slider:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.5);
        }
      `}</style>
    </div>
  )
}