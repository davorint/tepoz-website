'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  MapPin, 
  Navigation, 
  Star,
  Phone,
  Globe,
  ZoomIn,
  ZoomOut,
  Utensils,
  Heart,
  Share2,
  Clock,
  Wifi,
  Car,
  Music
} from 'lucide-react'
import { Locale } from '@/lib/i18n'
import { Restaurant, RestaurantService } from '@/lib/restaurants'

interface RestaurantMapProps {
  locale: Locale
  selectedRestaurants: Restaurant[]
  onRestaurantSelect?: (restaurant: Restaurant) => void
  className?: string
}

// Atmosphere styles for map markers with restaurant theme
const atmosphereStyles = {
  'casual': { color: 'rgba(34, 197, 94, 0.8)', emoji: '🍴' },
  'fine-dining': { color: 'rgba(168, 85, 247, 0.8)', emoji: '🍽️' },
  'family': { color: 'rgba(251, 146, 60, 0.8)', emoji: '👨‍👩‍👧‍👦' },
  'romantic': { color: 'rgba(236, 72, 153, 0.8)', emoji: '💕' },
  'traditional': { color: 'rgba(180, 83, 9, 0.8)', emoji: '🏛️' },
  'modern': { color: 'rgba(59, 130, 246, 0.8)', emoji: '✨' }
}

export default function RestaurantMap({ locale, selectedRestaurants, onRestaurantSelect, className }: RestaurantMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapInstance, setMapInstance] = useState<unknown>(null)
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  
  // Get all restaurants for display
  const allRestaurants = RestaurantService.getAllRestaurants()
  const restaurantsToShow = selectedRestaurants.length > 0 ? selectedRestaurants : allRestaurants

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstance) return

    const initializeMap = async () => {
      try {
        // Dynamic imports for OpenLayers
        const [
          { Map, View },
          { default: TileLayer },
          { default: OSM },
          { default: VectorLayer },
          { default: VectorSource },
          { default: Feature },
          { default: Point },
          { Style, Circle, Fill, Stroke, Text },
          { fromLonLat }
        ] = await Promise.all([
          import('ol'),
          import('ol/layer/Tile'),
          import('ol/source/OSM'),
          import('ol/layer/Vector'),
          import('ol/source/Vector'),
          import('ol/Feature'),
          import('ol/geom/Point'),
          import('ol/style'),
          import('ol/proj')
        ])

        // Import OpenLayers CSS
        await import('ol/ol.css' as string)

        const tepoztlanCenter = fromLonLat([-99.0965, 18.9843])
        const vectorSource = new VectorSource()

        // Add restaurant markers
        restaurantsToShow.forEach((restaurant) => {
          const feature = new Feature({
            geometry: new Point(fromLonLat(restaurant.coordinates)), // Restaurants already have [lng, lat] format
            restaurant: restaurant
          })

          const atmosphereStyle = atmosphereStyles[restaurant.atmosphere] || atmosphereStyles['casual']
          
          feature.setStyle(new Style({
            image: new Circle({
              radius: restaurant.featured ? 18 : 14,
              fill: new Fill({
                color: selectedRestaurants.some(r => r.id === restaurant.id) ? 'rgba(251, 146, 60, 0.9)' : atmosphereStyle.color
              }),
              stroke: new Stroke({
                color: '#ffffff',
                width: 3
              })
            }),
            text: new Text({
              text: atmosphereStyle.emoji,
              font: `${restaurant.featured ? '22px' : '18px'} Arial`,
              offsetY: 1
            })
          }))

          vectorSource.addFeature(feature)
        })

        // Create map
        const map = new Map({
          target: mapRef.current!,
          layers: [
            new TileLayer({
              source: new OSM(),
              opacity: 0.9
            }),
            new VectorLayer({
              source: vectorSource,
            })
          ],
          view: new View({
            center: tepoztlanCenter,
            zoom: 13,
          }),
        })

        // Handle click events
        map.on('click', (evt) => {
          const feature = map.forEachFeatureAtPixel(evt.pixel, (feature) => feature)
          if (feature) {
            const restaurant = feature.get('restaurant')
            setSelectedRestaurant(restaurant)
            if (onRestaurantSelect) {
              onRestaurantSelect(restaurant)
            }
          }
        })

        // Add hover cursor
        map.on('pointermove', (evt) => {
          const pixel = map.getEventPixel(evt.originalEvent)
          const hit = map.hasFeatureAtPixel(pixel)
          map.getTargetElement().style.cursor = hit ? 'pointer' : ''
        })

        setMapInstance(map)
        setMapLoaded(true)
      } catch (error) {
        console.error('Error initializing restaurant map:', error)
        setMapLoaded(false)
      }
    }

    initializeMap()

    return () => {
      if (mapInstance && typeof mapInstance === 'object' && 'setTarget' in mapInstance) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mapInstance as any).setTarget('')
      }
    }
  }, [restaurantsToShow, mapInstance, onRestaurantSelect, selectedRestaurants])

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-white/10 pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 blur-xl opacity-50" />
                  <div className="relative bg-gradient-to-r from-orange-400 to-amber-400 p-3 rounded-2xl shadow-2xl">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-white">
                    {locale === 'es' ? 'Mapa de Restaurantes' : 'Restaurants Map'}
                  </CardTitle>
                  <p className="text-white/70 mt-1">
                    {locale === 'es' 
                      ? `Mostrando ${restaurantsToShow.length} restaurantes en Tepoztlán`
                      : `Showing ${restaurantsToShow.length} restaurants in Tepoztlán`
                    }
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-lg px-6 py-3 bg-gradient-to-r from-orange-400/10 to-amber-400/10 text-white border-orange-400/30 backdrop-blur-sm">
                <Utensils className="h-4 w-4 mr-2 text-orange-400" />
                {restaurantsToShow.length} {locale === 'es' ? 'Restaurantes' : 'Restaurants'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative">
              <div 
                ref={mapRef} 
                className="w-full h-[500px] bg-slate-800 relative"
              >
                {!mapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-white/60 text-lg">
                        {locale === 'es' ? 'Cargando mapa de restaurantes...' : 'Loading restaurants map...'}
                      </p>
                    </div>
                  </div>
                )}
                {/* Map Controls */}
                {mapLoaded && (
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <Button
                      size="sm"
                      className="w-10 h-10 p-0 bg-white/80 dark:bg-white/10 backdrop-blur-md dark:backdrop-blur-xl border border-slate-300/30 dark:border-white/20 text-slate-800 dark:text-white hover:bg-white/90 dark:hover:bg-white/20 transition-all duration-200 dark:duration-300"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="w-10 h-10 p-0 bg-white/80 dark:bg-white/10 backdrop-blur-md dark:backdrop-blur-xl border border-slate-300/30 dark:border-white/20 text-slate-800 dark:text-white hover:bg-white/90 dark:hover:bg-white/20 transition-all duration-200 dark:duration-300"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="w-10 h-10 p-0 bg-gradient-to-r from-orange-400 to-amber-400 text-white"
                    >
                      <Navigation className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Selected Restaurant Details */}
      {selectedRestaurant && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <Card className="border-0 bg-white/70 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-xl shadow-xl shadow-slate-300/20 dark:shadow-white/15 rounded-3xl hover:bg-white/80 dark:hover:bg-white/8 transition-all duration-300 dark:duration-500">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-400 flex items-center justify-center shadow-xl">
                  <span className="text-2xl">{atmosphereStyles[selectedRestaurant.atmosphere]?.emoji || '🍽️'}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-white text-lg">
                        {RestaurantService.getRestaurantName(selectedRestaurant, locale)}
                      </h3>
                      <p className="text-slate-600 dark:text-white/70 text-sm mt-1">
                        {RestaurantService.getRestaurantDescription(selectedRestaurant, locale)}
                      </p>
                      <p className="text-slate-500 dark:text-white/60 text-sm mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {RestaurantService.getRestaurantAddress(selectedRestaurant, locale)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {selectedRestaurant.featured && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black">
                          Featured
                        </Badge>
                      )}
                      {selectedRestaurant.verified && (
                        <Badge className="bg-gradient-to-r from-green-400/20 to-emerald-400/20 text-green-300 border-green-400/30">
                          ✅ Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-slate-800 dark:text-white font-medium">{selectedRestaurant.rating}</span>
                      <span className="text-slate-500 dark:text-white/50 text-sm">({selectedRestaurant.reviewCount})</span>
                    </div>
                    <Badge className="bg-white/80 dark:bg-white/10 text-slate-600 dark:text-white/70">
                      {selectedRestaurant.priceRange}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-orange-400/30 to-amber-400/30 dark:from-orange-400/20 dark:to-amber-400/20 text-orange-600 dark:text-orange-300 border-orange-400/50 dark:border-orange-400/30">
                      {RestaurantService.getRestaurantCuisine(selectedRestaurant, locale)}
                    </Badge>
                  </div>

                  {/* Restaurant Info */}
                  <div className="flex items-center gap-1 mt-3 text-slate-600 dark:text-white/80 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{RestaurantService.getRestaurantHours(selectedRestaurant, locale)}</span>
                  </div>

                  {/* Amenities */}
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {selectedRestaurant.wifi && (
                      <Badge className="bg-blue-400/20 text-blue-300 border-blue-400/30 text-xs">
                        <Wifi className="w-3 h-3 mr-1" />
                        WiFi
                      </Badge>
                    )}
                    {selectedRestaurant.parking && (
                      <Badge className="bg-gray-400/20 text-gray-300 border-gray-400/30 text-xs">
                        <Car className="w-3 h-3 mr-1" />
                        {locale === 'es' ? 'Parking' : 'Parking'}
                      </Badge>
                    )}
                    {selectedRestaurant.liveMusic && (
                      <Badge className="bg-purple-400/20 text-purple-300 border-purple-400/30 text-xs">
                        <Music className="w-3 h-3 mr-1" />
                        {locale === 'es' ? 'Música' : 'Live Music'}
                      </Badge>
                    )}
                    {selectedRestaurant.outdoorSeating && (
                      <Badge className="bg-green-400/20 text-green-300 border-green-400/30 text-xs">
                        🌿 {locale === 'es' ? 'Terraza' : 'Outdoor'}
                      </Badge>
                    )}
                    {selectedRestaurant.delivery && (
                      <Badge className="bg-yellow-400/20 text-yellow-300 border-yellow-400/30 text-xs">
                        🚚 {locale === 'es' ? 'Delivery' : 'Delivery'}
                      </Badge>
                    )}
                    {selectedRestaurant.reservation && (
                      <Badge className="bg-indigo-400/20 text-indigo-300 border-indigo-400/30 text-xs">
                        📅 {locale === 'es' ? 'Reservas' : 'Reservations'}
                      </Badge>
                    )}
                  </div>

                  {/* Dietary Options */}
                  {selectedRestaurant.dietary.length > 0 && (
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {selectedRestaurant.dietary.map((diet) => (
                        <Badge key={diet} className="bg-emerald-400/20 text-emerald-300 border-emerald-400/30 text-xs">
                          🌱 {diet === 'vegetarian' ? (locale === 'es' ? 'Vegetariano' : 'Vegetarian') : 
                              diet === 'vegan' ? (locale === 'es' ? 'Vegano' : 'Vegan') :
                              diet === 'gluten-free' ? (locale === 'es' ? 'Sin Gluten' : 'Gluten-Free') :
                              diet === 'organic' ? (locale === 'es' ? 'Orgánico' : 'Organic') : diet}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-4">
                    <Button size="sm" className="bg-gradient-to-r from-orange-400 to-amber-400 text-white">
                      <Navigation className="w-3 h-3 mr-1" />
                      {locale === 'es' ? 'Direcciones' : 'Directions'}
                    </Button>
                    {selectedRestaurant.phone && (
                      <Button size="sm" variant="ghost" className="text-slate-500 dark:text-white/60 hover:text-slate-800 dark:hover:text-white transition-colors duration-200 dark:duration-300">
                        <Phone className="w-3 h-3" />
                      </Button>
                    )}
                    {selectedRestaurant.website && (
                      <Button size="sm" variant="ghost" className="text-slate-500 dark:text-white/60 hover:text-slate-800 dark:hover:text-white transition-colors duration-200 dark:duration-300">
                        <Globe className="w-3 h-3" />
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="text-slate-500 dark:text-white/60 hover:text-slate-800 dark:hover:text-white transition-colors duration-200 dark:duration-300">
                      <Heart className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-slate-500 dark:text-white/60 hover:text-slate-800 dark:hover:text-white transition-colors duration-200 dark:duration-300">
                      <Share2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}