'use client'

import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { BusinessMapProps } from '@/types/business-finder'

const TEPOZTLAN_CENTER: [number, number] = [-99.1017, 18.9847]

export function BusinessMap({
  businesses,
  selectedBusiness,
  selectedCategory,
  userLocation,
  lang,
  onBusinessSelect,
  onLocationUpdate
}: BusinessMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  
  const [mapLoaded, setMapLoaded] = useState(false)
  const [is3DMode, setIs3DMode] = useState(false)
  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite'>('streets')
  const [isStyleLoading, setIsStyleLoading] = useState(false)
  const [isZoomingToFit, setIsZoomingToFit] = useState(false)
  const [lastZoomAction, setLastZoomAction] = useState<'success' | 'error' | null>(null)

  // Category configurations for markers
  const categoryConfigs = useMemo(() => [
    { name: 'restaurant', color: '#e53e3e', symbol: 'R' },
    { name: 'hotel', color: '#3182ce', symbol: 'H' },
    { name: 'cafe', color: '#d69e2e', symbol: 'C' },
    { name: 'shopping', color: '#38a169', symbol: 'S' },
    { name: 'culture', color: '#805ad5', symbol: 'U' },
    { name: 'attraction', color: '#d53f8c', symbol: 'A' }
  ], [])

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

    if (!mapboxgl.accessToken) {
      console.error('Mapbox access token not found')
      return
    }

    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: TEPOZTLAN_CENTER,
      zoom: 14,
      attributionControl: false
    })

    map.current = mapInstance

    // Add controls
    mapInstance.addControl(new mapboxgl.NavigationControl({
      showCompass: true,
      showZoom: true,
      visualizePitch: true
    }), 'top-left')

    mapInstance.addControl(new mapboxgl.FullscreenControl(), 'top-left')

    mapInstance.on('load', () => {
      console.log('🗺️ Map loaded, setting up markers...')
      setMapLoaded(true)

      // Create marker images
      categoryConfigs.forEach((config) => {
        const size = 40
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const context = canvas.getContext('2d')

        if (context) {
          console.log(`🎨 Creating marker for ${config.name}`)
          
          context.clearRect(0, 0, size, size)
          
          const centerX = size / 2
          const centerY = size / 2
          const radius = 16

          // Main circle
          context.beginPath()
          context.arc(centerX, centerY, radius, 0, Math.PI * 2)
          context.fillStyle = config.color
          context.fill()

          // White border
          context.strokeStyle = '#ffffff'
          context.lineWidth = 3
          context.stroke()

          // Symbol
          context.font = 'bold 16px Arial'
          context.textAlign = 'center'
          context.textBaseline = 'middle'
          context.fillStyle = '#ffffff'
          context.strokeStyle = '#000000'
          context.lineWidth = 1
          context.strokeText(config.symbol, centerX, centerY)
          context.fillStyle = '#ffffff'
          context.fillText(config.symbol, centerX, centerY)

          const imageData = context.getImageData(0, 0, size, size)
          const marker = {
            width: size,
            height: size,
            data: new Uint8Array(imageData.data)
          }

          try {
            if (!mapInstance.hasImage(`marker-${config.name}`)) {
              mapInstance.addImage(`marker-${config.name}`, marker)
              console.log(`✅ Added marker for ${config.name}`)
            }
          } catch (error) {
            console.error(`❌ Error adding marker for ${config.name}:`, error)
          }
        }
      })

      // Add source and layer for businesses
      updateBusinessMarkers(mapInstance)

      // Handle marker clicks
      mapInstance.on('click', 'business-markers', (e) => {
        if (e.features && e.features[0]) {
          const businessId = e.features[0].properties?.id
          if (businessId && onBusinessSelect) {
            onBusinessSelect(businessId)
            console.log('🏢 Business selected:', businessId)
          }
        }
      })

      // Change cursor on hover
      mapInstance.on('mouseenter', 'business-markers', () => {
        mapInstance.getCanvas().style.cursor = 'pointer'
      })

      mapInstance.on('mouseleave', 'business-markers', () => {
        mapInstance.getCanvas().style.cursor = ''
      })
    })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [onBusinessSelect, categoryConfigs]) // eslint-disable-line react-hooks/exhaustive-deps

  // Update business markers
  const updateBusinessMarkers = useCallback((mapInstance: mapboxgl.Map) => {
    const geojsonData = {
      type: 'FeatureCollection' as const,
      features: businesses.map(business => ({
        type: 'Feature' as const,
        properties: {
          id: business.id,
          name: business.name,
          category: business.category,
          rating: business.rating,
          description: business.description
        },
        geometry: {
          type: 'Point' as const,
          coordinates: business.coordinates
        }
      }))
    }

    if (mapInstance.getSource('businesses')) {
      (mapInstance.getSource('businesses') as mapboxgl.GeoJSONSource).setData(geojsonData)
    } else {
      mapInstance.addSource('businesses', {
        type: 'geojson',
        data: geojsonData
      })

      mapInstance.addLayer({
        id: 'business-markers',
        type: 'symbol',
        source: 'businesses',
        layout: {
          'icon-image': [
            'case',
            ['==', ['get', 'category'], 'restaurant'], 'marker-restaurant',
            ['==', ['get', 'category'], 'hotel'], 'marker-hotel',
            ['==', ['get', 'category'], 'cafe'], 'marker-cafe',
            ['==', ['get', 'category'], 'shopping'], 'marker-shopping',
            ['==', ['get', 'category'], 'culture'], 'marker-culture',
            ['==', ['get', 'category'], 'attraction'], 'marker-attraction',
            'marker-restaurant' // fallback
          ],
          'icon-size': 0.7,
          'icon-allow-overlap': true,
          'icon-ignore-placement': true,
          'text-field': ['get', 'name'],
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 2.5],
          'text-anchor': 'top',
          'text-size': 12
        },
        paint: {
          'text-color': '#1a202c',
          'text-halo-color': '#ffffff',
          'text-halo-width': 2
        }
      })
    }
  }, [businesses])

  // Update map filter when category changes
  useEffect(() => {
    if (!map.current || !mapLoaded) return

    const applyFilter = () => {
      if (map.current?.getLayer('business-markers')) {
        try {
          if (selectedCategory === 'all') {
            map.current.setFilter('business-markers', null)
            console.log('✅ Showing all businesses')
          } else {
            map.current.setFilter('business-markers', ['==', ['get', 'category'], selectedCategory])
            console.log(`✅ Filtered to: ${selectedCategory}`)
          }
        } catch (error) {
          console.error('❌ Error applying filter:', error)
        }
      }
    }

    const timeoutId = setTimeout(applyFilter, 100)
    return () => clearTimeout(timeoutId)
  }, [selectedCategory, mapLoaded])

  // Update markers when businesses change
  useEffect(() => {
    if (map.current && mapLoaded) {
      updateBusinessMarkers(map.current)
    }
  }, [businesses, mapLoaded, updateBusinessMarkers])

  // Fly to selected business
  useEffect(() => {
    if (!selectedBusiness || !map.current) return

    const business = businesses.find(b => b.id === selectedBusiness)
    if (business) {
      map.current.flyTo({
        center: business.coordinates,
        zoom: 16,
        duration: 1500
      })
    }
  }, [selectedBusiness, businesses])

  // Add user location marker
  useEffect(() => {
    if (!map.current || !userLocation) return

    // Remove existing user location marker
    if (map.current.getSource('user-location')) {
      map.current.removeLayer('user-location')
      map.current.removeSource('user-location')
    }

    // Add user location source and layer
    map.current.addSource('user-location', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: userLocation
          },
          properties: {}
        }]
      }
    })

    map.current.addLayer({
      id: 'user-location',
      type: 'circle',
      source: 'user-location',
      paint: {
        'circle-radius': 8,
        'circle-color': '#3b82f6',
        'circle-stroke-width': 3,
        'circle-stroke-color': '#ffffff'
      }
    })
  }, [userLocation])

  // Toggle 3D mode
  const toggle3DMode = async () => {
    if (!map.current) return
    
    try {
      const newMode = !is3DMode
      const newPitch = newMode ? 45 : 0
      const newBearing = newMode ? -17.6 : 0
      
      await new Promise<void>((resolve) => {
        map.current!.easeTo({
          pitch: newPitch,
          bearing: newBearing,
          duration: 2000
        })
        
        const onMoveEnd = () => {
          map.current!.off('moveend', onMoveEnd)
          resolve()
        }
        map.current!.on('moveend', onMoveEnd)
      })
      
      setIs3DMode(newMode)
      console.log(`🎮 3D mode ${newMode ? 'enabled' : 'disabled'}`)
    } catch (error) {
      console.error('❌ Error toggling 3D mode:', error)
    }
  }

  // Toggle map style
  const toggleMapStyle = async () => {
    if (!map.current || isStyleLoading) return
    
    setIsStyleLoading(true)
    
    try {
      const newStyle = mapStyle === 'streets' ? 'satellite' : 'streets'
      const styleUrl = newStyle === 'satellite' 
        ? 'mapbox://styles/mapbox/satellite-streets-v12'
        : 'mapbox://styles/mapbox/streets-v12'
      
      const onStyleLoad = () => {
        setMapStyle(newStyle)
        setIsStyleLoading(false)
        map.current?.off('style.load', onStyleLoad)
        console.log(`🛰️ Map style changed to: ${newStyle}`)
        
        // Re-add markers after style change
        if (map.current && mapLoaded) {
          updateBusinessMarkers(map.current)
        }
      }
      
      const onStyleError = (error: mapboxgl.ErrorEvent) => {
        console.error('❌ Failed to load map style:', error)
        setIsStyleLoading(false)
        map.current?.off('error', onStyleError)
      }
      
      map.current.on('style.load', onStyleLoad)
      map.current.on('error', onStyleError)
      map.current.setStyle(styleUrl)
      
    } catch (error) {
      console.error('❌ Error changing map style:', error)
      setIsStyleLoading(false)
    }
  }

  // Zoom to fit all businesses
  const zoomToFitBusinesses = async () => {
    if (isZoomingToFit || !map.current || businesses.length === 0) {
      if (businesses.length === 0) {
        console.warn('⚠️ No businesses to zoom to')
      }
      return
    }

    setIsZoomingToFit(true)

    try {
      const bounds = new mapboxgl.LngLatBounds()
      const validBusinesses = businesses.filter(business => {
        const [lng, lat] = business.coordinates
        return lng && lat && 
               lng >= -180 && lng <= 180 && 
               lat >= -90 && lat <= 90
      })

      if (validBusinesses.length === 0) {
        throw new Error('No valid business coordinates found')
      }

      validBusinesses.forEach(business => {
        bounds.extend(business.coordinates)
      })

      const options: mapboxgl.FitBoundsOptions = {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        maxZoom: 16,
        duration: 2000
      }

      await new Promise<void>((resolve, reject) => {
        const onMoveEnd = () => {
          map.current!.off('moveend', onMoveEnd)
          map.current!.off('error', onError)
          resolve()
        }

        const onError = (error: mapboxgl.ErrorEvent) => {
          map.current!.off('moveend', onMoveEnd)
          map.current!.off('error', onError)
          reject(error)
        }

        map.current!.on('moveend', onMoveEnd)
        map.current!.on('error', onError)
        map.current!.fitBounds(bounds, options)
      })

      setLastZoomAction('success')
      console.log(`🎯 Successfully zoomed to fit ${validBusinesses.length} businesses`)

    } catch (error) {
      setLastZoomAction('error')
      console.error('❌ Zoom to fit error:', error)
    } finally {
      setIsZoomingToFit(false)
      setTimeout(() => setLastZoomAction(null), 2000)
    }
  }

  // Get user location
  const getUserLocation = async () => {
    if (!navigator.geolocation) {
      console.warn('⚠️ Geolocation not supported')
      return
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        })
      })

      const coords: [number, number] = [position.coords.longitude, position.coords.latitude]
      
      if (onLocationUpdate) {
        onLocationUpdate(coords)
      }

      // Smooth fly to user location
      if (map.current) {
        await new Promise<void>((resolve) => {
          map.current!.flyTo({
            center: coords,
            zoom: 16,
            duration: 2500,
            essential: true
          })

          const onMoveEnd = () => {
            map.current!.off('moveend', onMoveEnd)
            resolve()
          }
          map.current!.on('moveend', onMoveEnd)
        })
      }

      console.log('📍 User location updated:', coords)
    } catch (error) {
      console.error('❌ Error getting user location:', error)
    }
  }

  return (
    <div className="w-full h-[539px] relative overflow-hidden">
      <div 
        ref={mapContainer}
        className="w-full h-full"
      />
      
      {!mapLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/95 to-blue-900/95 backdrop-blur-xl flex items-center justify-center">
          <div className="text-center">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-6xl mb-4"
            >
              🗺️
            </motion.div>
            <motion.p 
              className="text-white text-lg font-medium"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {lang === 'es' ? 'Cargando mapa interactivo...' : 'Loading interactive map...'}
            </motion.p>
            <motion.div 
              className="mt-4 w-48 h-2 bg-slate-700 rounded-full overflow-hidden mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                animate={{ x: [-192, 192] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </div>
      )}

      {/* Map Controls */}
      {mapLoaded && (
        <>
          {/* 3D Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-4 right-4 z-10"
          >
            <Button
              size="icon"
              className={`w-12 h-12 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-lg ${
                is3DMode
                  ? 'bg-emerald-500/30 border-emerald-400/50 text-emerald-400'
                  : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-cyan-400/50 hover:shadow-cyan-400/25'
              }`}
              onClick={toggle3DMode}
            >
              <span className="text-sm">⛰️</span>
            </Button>
          </motion.div>

          {/* Map Style Toggle */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute top-20 right-4 z-10"
          >
            <Button
              size="icon"
              disabled={isStyleLoading}
              className={`w-12 h-12 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-lg ${
                isStyleLoading
                  ? 'bg-blue-500/20 border-blue-400/30 cursor-not-allowed opacity-70'
                  : mapStyle === 'satellite'
                    ? 'bg-blue-500/30 border-blue-400/50 text-blue-400'
                    : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-emerald-400/50 shadow-emerald-400/25'
              }`}
              onClick={toggleMapStyle}
            >
              {isStyleLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="text-sm"
                >
                  🔄
                </motion.div>
              ) : (
                <span className="text-sm">
                  {mapStyle === 'satellite' ? '🗺️' : '🛰️'}
                </span>
              )}
            </Button>
          </motion.div>

          {/* Zoom to Fit Button */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute top-36 right-4 z-10"
          >
            <Button
              size="icon"
              disabled={isZoomingToFit || businesses.length === 0}
              className={`w-12 h-12 rounded-full backdrop-blur-xl border text-white transition-all duration-300 shadow-lg ${
                isZoomingToFit
                  ? 'bg-blue-500/30 border-blue-400/50 cursor-not-allowed opacity-70'
                  : businesses.length === 0
                    ? 'bg-gray-500/20 border-gray-400/30 cursor-not-allowed opacity-50'
                    : lastZoomAction === 'success'
                      ? 'bg-emerald-500/30 border-emerald-400/50 text-emerald-400'
                      : lastZoomAction === 'error'
                        ? 'bg-red-500/30 border-red-400/50 text-red-400'
                        : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-emerald-400/50'
              }`}
              onClick={zoomToFitBusinesses}
            >
              {isZoomingToFit ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="text-sm"
                >
                  🔄
                </motion.div>
              ) : businesses.length === 0 ? (
                <span className="text-sm opacity-50">📍</span>
              ) : lastZoomAction === 'success' ? (
                <span className="text-sm">✅</span>
              ) : lastZoomAction === 'error' ? (
                <span className="text-sm">❌</span>
              ) : (
                <span className="text-sm">🎯</span>
              )}
            </Button>
          </motion.div>

          {/* User Location Button */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute top-52 right-4 z-10"
          >
            <Button
              size="icon"
              className="w-12 h-12 rounded-full backdrop-blur-xl border text-white transition-all duration-300 shadow-lg bg-white/10 border-white/20 hover:bg-white/20 hover:border-cyan-400/50"
              onClick={getUserLocation}
            >
              <span className="text-sm">📍</span>
            </Button>
          </motion.div>
        </>
      )}
    </div>
  )
}