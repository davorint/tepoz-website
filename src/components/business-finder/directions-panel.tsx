'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Navigation, Car, Route, X, Phone, Share2, MapPin, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Business } from '@/types/business-finder'
import mapboxgl from 'mapbox-gl'
// turf removed - not used in current implementation

interface DirectionsPanelProps {
  business: Business | null
  userLocation: [number, number] | null
  isOpen: boolean
  lang: 'es' | 'en'
  onClose: () => void
  onCall?: (phone: string) => void
  onShare?: (business: Business) => void
}

interface DirectionsData {
  distance: number
  duration: number
  steps: RouteStep[]
  geometry: number[][]
}

interface RouteStep {
  instruction: string
  distance: number
  duration: number
  maneuver: string
}

export function DirectionsPanel({
  business,
  userLocation,
  isOpen,
  lang,
  onClose,
  onCall,
  onShare
}: DirectionsPanelProps) {
  const [directions, setDirections] = useState<DirectionsData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [travelMode, setTravelMode] = useState<'driving' | 'walking'>('driving')
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  // Get directions from Mapbox
  const getDirections = useCallback(async () => {
    if (!business || !userLocation) return

    setIsLoading(true)
    setError(null)

    try {
      const profile = travelMode === 'driving' ? 'driving' : 'walking'
      const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${userLocation[0]},${userLocation[1]};${business.coordinates[0]},${business.coordinates[1]}`
      
      const params = new URLSearchParams({
        access_token: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '',
        geometries: 'geojson',
        steps: 'true',
        voice_instructions: 'true',
        language: lang
      })

      const response = await fetch(`${url}?${params}`)
      
      if (!response.ok) {
        throw new Error('Failed to get directions')
      }

      const data = await response.json()
      
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0]
        
        setDirections({
          distance: route.distance,
          duration: route.duration,
          steps: route.legs[0].steps.map((step: { maneuver: { instruction: string; type: string }; distance: number; duration: number }) => ({
            instruction: step.maneuver.instruction,
            distance: step.distance,
            duration: step.duration,
            maneuver: step.maneuver.type
          })),
          geometry: route.geometry.coordinates
        })
      }
    } catch (err) {
      setError(lang === 'es' ? 'Error al obtener direcciones' : 'Error getting directions')
      console.error('Directions error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [business, userLocation, travelMode, lang])

  // Initialize mini map
  useEffect(() => {
    if (!isOpen || !business || !userLocation || !mapContainerRef.current) return

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: userLocation,
      zoom: 12,
      attributionControl: false,
      interactive: false
    })

    mapRef.current = mapInstance

    mapInstance.on('load', () => {
      // Add markers
      new mapboxgl.Marker({ color: '#3b82f6' })
        .setLngLat(userLocation)
        .addTo(mapInstance)

      new mapboxgl.Marker({ color: '#ef4444' })
        .setLngLat(business.coordinates)
        .addTo(mapInstance)

      // Fit bounds to show both points
      const bounds = new mapboxgl.LngLatBounds()
      bounds.extend(userLocation)
      bounds.extend(business.coordinates)
      
      mapInstance.fitBounds(bounds, {
        padding: 40,
        maxZoom: 15
      })
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [isOpen, business, userLocation])

  // Add route to map when directions are loaded
  useEffect(() => {
    if (!mapRef.current || !directions) return

    // Add route source and layer
    if (mapRef.current.getSource('route')) {
      (mapRef.current.getSource('route') as mapboxgl.GeoJSONSource).setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: directions.geometry
        }
      })
    } else {
      mapRef.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: directions.geometry
          }
        }
      })

      mapRef.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': travelMode === 'driving' ? '#3b82f6' : '#10b981',
          'line-width': 4,
          'line-opacity': 0.8
        }
      })
    }
  }, [directions, travelMode])

  // Load directions when panel opens
  useEffect(() => {
    if (isOpen && business && userLocation) {
      getDirections()
    }
  }, [isOpen, business, userLocation, travelMode, getDirections])

  // Format duration
  const formatDuration = (seconds: number) => {
    const minutes = Math.round(seconds / 60)
    if (minutes < 60) {
      return lang === 'es' ? `${minutes} min` : `${minutes} min`
    }
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return lang === 'es' 
      ? `${hours}h ${remainingMinutes}min`
      : `${hours}h ${remainingMinutes}min`
  }

  // Format distance
  const formatDistance = (meters: number) => {
    if (meters < 1000) {
      return `${Math.round(meters)} m`
    }
    return `${(meters / 1000).toFixed(1)} km`
  }

  // Open in external map app
  const openInMaps = () => {
    if (!business) return

    const url = `https://www.google.com/maps/dir/?api=1&destination=${business.coordinates[1]},${business.coordinates[0]}&travelmode=${travelMode}`
    window.open(url, '_blank')
  }

  if (!business) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white dark:bg-slate-800 rounded-t-3xl md:rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <Navigation className="w-6 h-6" />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {lang === 'es' ? 'Direcciones' : 'Directions'}
                    </h3>
                    <p className="text-blue-100 text-sm truncate max-w-48">
                      {lang === 'en' && business.nameEn ? business.nameEn : business.name}
                    </p>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={onClose}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Travel Mode Selector */}
              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  variant={travelMode === 'driving' ? 'secondary' : 'ghost'}
                  onClick={() => setTravelMode('driving')}
                  className={`flex-1 ${travelMode === 'driving' 
                    ? 'bg-white/20 text-white' 
                    : 'text-white hover:bg-white/10'
                  }`}
                >
                  <Car className="w-4 h-4 mr-2" />
                  {lang === 'es' ? 'Auto' : 'Drive'}
                </Button>
                <Button
                  size="sm"
                  variant={travelMode === 'walking' ? 'secondary' : 'ghost'}
                  onClick={() => setTravelMode('walking')}
                  className={`flex-1 ${travelMode === 'walking' 
                    ? 'bg-white/20 text-white' 
                    : 'text-white hover:bg-white/10'
                  }`}
                >
                  <Route className="w-4 h-4 mr-2" />
                  {lang === 'es' ? 'Caminar' : 'Walk'}
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Route Summary */}
              {directions && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-gradient-to-r from-blue-50 to-emerald-50 border-b"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatDistance(directions.distance)}
                        </div>
                        <div className="text-xs text-gray-600">
                          {lang === 'es' ? 'Distancia' : 'Distance'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">
                          {formatDuration(directions.duration)}
                        </div>
                        <div className="text-xs text-gray-600">
                          {lang === 'es' ? 'Tiempo' : 'Time'}
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={openInMaps}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {lang === 'es' ? 'Abrir' : 'Open'}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Mini Map */}
              <div className="h-40 bg-gray-100 relative">
                <div ref={mapContainerRef} className="w-full h-full" />
                {isLoading && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
                    />
                  </div>
                )}
              </div>

              {/* Error State */}
              {error && (
                <div className="p-4 text-center text-red-600">
                  <p>{error}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={getDirections}
                    className="mt-2"
                  >
                    {lang === 'es' ? 'Reintentar' : 'Retry'}
                  </Button>
                </div>
              )}

              {/* Loading State */}
              {isLoading && (
                <div className="p-8 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
                  />
                  <p className="text-gray-600">
                    {lang === 'es' ? 'Calculando ruta...' : 'Calculating route...'}
                  </p>
                </div>
              )}

              {/* Business Info */}
              <div className="p-4 border-b">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">
                      {lang === 'en' && business.nameEn ? business.nameEn : business.name}
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">{business.address}</p>
                    {business.phone && (
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => business.phone && onCall?.(business.phone)}
                          className="flex-1"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          {lang === 'es' ? 'Llamar' : 'Call'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onShare?.(business)}
                          className="flex-1"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          {lang === 'es' ? 'Compartir' : 'Share'}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Step-by-step directions */}
              {directions && directions.steps.length > 0 && (
                <div className="p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">
                    {lang === 'es' ? 'Indicaciones' : 'Turn-by-turn'}
                  </h5>
                  <div className="space-y-3">
                    {directions.steps.slice(0, 5).map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-blue-600">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 text-sm">{step.instruction}</p>
                          <p className="text-gray-500 text-xs">
                            {formatDistance(step.distance)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    {directions.steps.length > 5 && (
                      <p className="text-gray-500 text-sm text-center">
                        {lang === 'es' 
                          ? `... y ${directions.steps.length - 5} pasos más`
                          : `... and ${directions.steps.length - 5} more steps`
                        }
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}