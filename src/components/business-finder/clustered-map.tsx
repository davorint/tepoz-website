'use client'

import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { BusinessMapProps } from '@/types/business-finder'

const TEPOZTLAN_CENTER: [number, number] = [-99.1017, 18.9847]

export function ClusteredBusinessMap({
  businesses,
  selectedBusiness,
  selectedCategory,
  userLocation,
  lang,
  onBusinessSelect,
}: BusinessMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  
  const [mapLoaded, setMapLoaded] = useState(false)
  const [is3DMode, setIs3DMode] = useState(false)
  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite'>('streets')
  const [isStyleLoading, setIsStyleLoading] = useState(false)
  const [clusteringEnabled, setClusteringEnabled] = useState(true)

  // Category configurations for markers
  const categoryConfigs = useMemo(() => [
    { name: 'restaurant', color: '#e53e3e', symbol: 'R' },
    { name: 'hotel', color: '#3182ce', symbol: 'H' },
    { name: 'cafe', color: '#d69e2e', symbol: 'C' },
    { name: 'shopping', color: '#38a169', symbol: 'S' },
    { name: 'culture', color: '#805ad5', symbol: 'U' },
    { name: 'attraction', color: '#d53f8c', symbol: 'A' },
    { name: 'experience', color: '#ec4899', symbol: 'E' },
    { name: 'service', color: '#06b6d4', symbol: 'S' }
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
      console.log('🗺️ Clustered map loaded, setting up markers...')
      setMapLoaded(true)

      // Create marker images for categories
      categoryConfigs.forEach((config) => {
        createMarkerImage(mapInstance, config)
      })

      // Create cluster circle image
      createClusterImage(mapInstance)

      // Add business data source and layers
      setupBusinessLayers(mapInstance)

      // Handle marker and cluster clicks
      setupMapInteractions(mapInstance)
    })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [onBusinessSelect, lang, categoryConfigs]) // eslint-disable-line react-hooks/exhaustive-deps

  // Create marker image for category
  const createMarkerImage = (mapInstance: mapboxgl.Map, config: { name: string; color: string; symbol: string }) => {
    const size = 40
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const context = canvas.getContext('2d')

    if (context) {
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
        }
      } catch (error) {
        console.error(`❌ Error adding marker for ${config.name}:`, error)
      }
    }
  }

  // Create cluster circle image
  const createClusterImage = (mapInstance: mapboxgl.Map) => {
    const size = 50
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const context = canvas.getContext('2d')

    if (context) {
      context.clearRect(0, 0, size, size)
      
      const centerX = size / 2
      const centerY = size / 2
      const radius = 20

      // Outer circle (white border)
      context.beginPath()
      context.arc(centerX, centerY, radius + 2, 0, Math.PI * 2)
      context.fillStyle = '#ffffff'
      context.fill()

      // Inner circle (blue background)
      context.beginPath()
      context.arc(centerX, centerY, radius, 0, Math.PI * 2)
      context.fillStyle = '#3b82f6'
      context.fill()

      const imageData = context.getImageData(0, 0, size, size)
      const clusterImage = {
        width: size,
        height: size,
        data: new Uint8Array(imageData.data)
      }

      try {
        if (!mapInstance.hasImage('cluster-marker')) {
          mapInstance.addImage('cluster-marker', clusterImage)
        }
      } catch (error) {
        console.error('❌ Error adding cluster marker:', error)
      }
    }
  }

  // Setup business data source and layers
  const setupBusinessLayers = useCallback((mapInstance: mapboxgl.Map) => {
    const geojsonData = {
      type: 'FeatureCollection' as const,
      features: businesses.map(business => ({
        type: 'Feature' as const,
        properties: {
          id: business.id,
          name: business.name,
          nameEn: business.nameEn,
          category: business.category,
          rating: business.rating,
          description: business.description,
          descriptionEn: business.descriptionEn,
          priceLevel: business.priceLevel,
          featured: business.featured
        },
        geometry: {
          type: 'Point' as const,
          coordinates: business.coordinates
        }
      }))
    }

    // Add source with clustering
    mapInstance.addSource('businesses', {
      type: 'geojson',
      data: geojsonData,
      cluster: clusteringEnabled,
      clusterMaxZoom: 16,
      clusterRadius: 50,
      clusterProperties: {
        'featured_count': ['+', ['case', ['get', 'featured'], 1, 0]],
        'avg_rating': ['/', ['+', ['get', 'rating']], ['get', 'point_count']],
        'categories': ['concat', ['get', 'category']]
      }
    })

    // Add cluster circles layer
    if (clusteringEnabled) {
      mapInstance.addLayer({
        id: 'business-clusters',
        type: 'symbol',
        source: 'businesses',
        filter: ['has', 'point_count'],
        layout: {
          'icon-image': 'cluster-marker',
          'icon-size': [
            'interpolate',
            ['linear'],
            ['get', 'point_count'],
            5, 0.8,
            20, 1.2,
            50, 1.5
          ],
          'text-field': '{point_count}',
          'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
          'text-size': 14,
          'text-allow-overlap': true,
          'icon-allow-overlap': true
        },
        paint: {
          'text-color': '#ffffff',
          'text-halo-color': 'rgba(0,0,0,0.2)',
          'text-halo-width': 1
        }
      })
    }

    // Add individual business markers layer
    mapInstance.addLayer({
      id: 'business-markers',
      type: 'symbol',
      source: 'businesses',
      filter: clusteringEnabled ? ['!', ['has', 'point_count']] : undefined,
      layout: {
        'icon-image': [
          'case',
          ['==', ['get', 'category'], 'restaurant'], 'marker-restaurant',
          ['==', ['get', 'category'], 'hotel'], 'marker-hotel',
          ['==', ['get', 'category'], 'cafe'], 'marker-cafe',
          ['==', ['get', 'category'], 'shopping'], 'marker-shopping',
          ['==', ['get', 'category'], 'culture'], 'marker-culture',
          ['==', ['get', 'category'], 'attraction'], 'marker-attraction',
          ['==', ['get', 'category'], 'experience'], 'marker-experience',
          ['==', ['get', 'category'], 'service'], 'marker-service',
          'marker-restaurant' // fallback
        ],
        'icon-size': [
          'case',
          ['get', 'featured'],
          0.8,
          0.7
        ],
        'icon-allow-overlap': true,
        'icon-ignore-placement': false,
        'text-field': ['get', 'name'],
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 2.5],
        'text-anchor': 'top',
        'text-size': [
          'case',
          ['get', 'featured'],
          13,
          12
        ],
        'text-max-width': 8
      },
      paint: {
        'text-color': '#1a202c',
        'text-halo-color': '#ffffff',
        'text-halo-width': 2,
        'icon-opacity': [
          'case',
          ['==', ['get', 'id'], selectedBusiness || ''],
          1,
          0.85
        ]
      }
    })
  }, [businesses, clusteringEnabled, selectedBusiness])

  // Setup map interactions
  const setupMapInteractions = useCallback((mapInstance: mapboxgl.Map) => {
    // Handle cluster clicks (zoom in)
    if (clusteringEnabled) {
      mapInstance.on('click', 'business-clusters', async (e) => {
        if (!e.features || !e.features[0] || !e.features[0].properties) return

        const clusterId = e.features[0].properties.cluster_id
        const zoom = await new Promise<number>((resolve) => {
          const source = mapInstance.getSource('businesses') as mapboxgl.GeoJSONSource
          source.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) {
              console.error('Error getting cluster expansion zoom:', err)
              resolve(mapInstance.getZoom() + 2)
            } else {
              resolve(zoom || mapInstance.getZoom() + 2)
            }
          })
        })

        mapInstance.easeTo({
          center: e.lngLat,
          zoom: zoom,
          duration: 1000
        })
      })
    }

    // Handle individual business marker clicks
    mapInstance.on('click', 'business-markers', (e) => {
      if (e.features && e.features[0] && e.features[0].properties) {
        const businessId = e.features[0].properties.id
        if (businessId && onBusinessSelect) {
          onBusinessSelect(businessId)
        }
      }
    })

    // Change cursor on hover
    const layers = clusteringEnabled ? ['business-clusters', 'business-markers'] : ['business-markers']
    
    layers.forEach(layerId => {
      mapInstance.on('mouseenter', layerId, () => {
        mapInstance.getCanvas().style.cursor = 'pointer'
      })

      mapInstance.on('mouseleave', layerId, () => {
        mapInstance.getCanvas().style.cursor = ''
      })
    })

    // Add popup on hover for individual markers
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: [0, -40]
    })

    mapInstance.on('mouseenter', 'business-markers', (e) => {
      if (!e.features || !e.features[0]) return

      const feature = e.features[0]
      const props = feature.properties
      if (!props) return

      const name = lang === 'en' && props.nameEn ? props.nameEn : props.name
      const description = lang === 'en' && props.descriptionEn ? props.descriptionEn : props.description

      popup
        .setLngLat(e.lngLat)
        .setHTML(`
          <div class="p-3 max-w-xs">
            <h4 class="font-semibold text-gray-900 mb-1">${name}</h4>
            <p class="text-sm text-gray-600 mb-2">${description.substring(0, 100)}${description.length > 100 ? '...' : ''}</p>
            <div class="flex items-center gap-2">
              <div class="flex items-center">
                <span class="text-yellow-400">★</span>
                <span class="text-sm font-medium ml-1">${props.rating}</span>
              </div>
              <div class="text-sm text-gray-500">
                ${'$'.repeat(props.priceLevel)}
              </div>
              ${props.featured ? '<span class="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">Featured</span>' : ''}
            </div>
          </div>
        `)
        .addTo(mapInstance)
    })

    mapInstance.on('mouseleave', 'business-markers', () => {
      popup.remove()
    })
  }, [clusteringEnabled, lang, onBusinessSelect])

  // Update business data
  const updateBusinessData = useCallback((mapInstance: mapboxgl.Map) => {
    const geojsonData = {
      type: 'FeatureCollection' as const,
      features: businesses.map(business => ({
        type: 'Feature' as const,
        properties: {
          id: business.id,
          name: business.name,
          nameEn: business.nameEn,
          category: business.category,
          rating: business.rating,
          description: business.description,
          descriptionEn: business.descriptionEn,
          priceLevel: business.priceLevel,
          featured: business.featured
        },
        geometry: {
          type: 'Point' as const,
          coordinates: business.coordinates
        }
      }))
    }

    if (mapInstance.getSource('businesses')) {
      (mapInstance.getSource('businesses') as mapboxgl.GeoJSONSource).setData(geojsonData)
    }
  }, [businesses])

  // Update map when businesses change
  useEffect(() => {
    if (map.current && mapLoaded) {
      updateBusinessData(map.current)
    }
  }, [businesses, mapLoaded, updateBusinessData])

  // Update map filter when category changes
  useEffect(() => {
    if (!map.current || !mapLoaded) return

    const applyFilter = () => {
      if (map.current?.getLayer('business-markers')) {
        try {
          if (selectedCategory === 'all') {
            map.current.setFilter('business-markers', clusteringEnabled ? ['!', ['has', 'point_count']] : null)
          } else {
            const filter = clusteringEnabled 
              ? ['all', ['!', ['has', 'point_count']], ['==', ['get', 'category'], selectedCategory]]
              : ['==', ['get', 'category'], selectedCategory]
            map.current.setFilter('business-markers', filter)
          }
        } catch (error) {
          console.error('❌ Error applying filter:', error)
        }
      }
    }

    const timeoutId = setTimeout(applyFilter, 100)
    return () => clearTimeout(timeoutId)
  }, [selectedCategory, mapLoaded, clusteringEnabled])

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

  // Toggle clustering
  const toggleClustering = () => {
    if (!map.current) return

    const newClusteringState = !clusteringEnabled
    setClusteringEnabled(newClusteringState)

    // Remove existing layers and source
    if (map.current.getLayer('business-clusters')) {
      map.current.removeLayer('business-clusters')
    }
    if (map.current.getLayer('business-markers')) {
      map.current.removeLayer('business-markers')
    }
    if (map.current.getSource('businesses')) {
      map.current.removeSource('businesses')
    }

    // Re-setup with new clustering state
    setupBusinessLayers(map.current)
    setupMapInteractions(map.current)
  }

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
        
        // Re-add markers after style change
        if (map.current && mapLoaded) {
          categoryConfigs.forEach(config => createMarkerImage(map.current!, config))
          createClusterImage(map.current!)
          setupBusinessLayers(map.current!)
          setupMapInteractions(map.current!)
        }
      }
      
      map.current.on('style.load', onStyleLoad)
      map.current.setStyle(styleUrl)
      
    } catch (error) {
      console.error('❌ Error changing map style:', error)
      setIsStyleLoading(false)
    }
  }

  return (
    <div className="w-full h-[560px] relative overflow-hidden rounded-2xl">
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
              {lang === 'es' ? 'Cargando mapa con clustering...' : 'Loading clustered map...'}
            </motion.p>
          </div>
        </div>
      )}

      {/* Map Controls */}
      {mapLoaded && (
        <>
          {/* Clustering Toggle */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute top-4 right-4 z-10"
          >
            <Button
              size="icon"
              className={`w-12 h-12 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-lg ${
                clusteringEnabled
                  ? 'bg-emerald-500/30 border-emerald-400/50 text-emerald-400'
                  : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-cyan-400/50'
              }`}
              onClick={toggleClustering}
            >
              <span className="text-sm">🔗</span>
            </Button>
          </motion.div>

          {/* 3D Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-20 right-4 z-10"
          >
            <Button
              size="icon"
              className={`w-12 h-12 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-lg ${
                is3DMode
                  ? 'bg-emerald-500/30 border-emerald-400/50 text-emerald-400'
                  : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-cyan-400/50'
              }`}
              onClick={toggle3DMode}
            >
              <span className="text-sm">🎮</span>
            </Button>
          </motion.div>

          {/* Map Style Toggle */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute top-36 right-4 z-10"
          >
            <Button
              size="icon"
              disabled={isStyleLoading}
              className={`w-12 h-12 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-lg ${
                isStyleLoading
                  ? 'bg-blue-500/20 border-blue-400/30 cursor-not-allowed opacity-70'
                  : mapStyle === 'satellite'
                    ? 'bg-blue-500/30 border-blue-400/50 text-blue-400'
                    : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-emerald-400/50'
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
        </>
      )}
    </div>
  )
}