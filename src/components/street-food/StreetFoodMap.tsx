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
  ZoomIn,
  ZoomOut,
  Heart,
  Share2,
  Clock,
  ShoppingCart,
  Flame
} from 'lucide-react'
import { Locale } from '@/lib/i18n'
import { StreetFood, StreetFoodService } from '@/lib/street-food'

interface StreetFoodMapProps {
  locale: Locale
  selectedStreetFoods: StreetFood[]
  onStreetFoodSelect?: (streetFood: StreetFood) => void
  className?: string
}

// Venue type styles for map markers with vibrant street food theme
const venueTypeStyles = {
  'street-cart': { color: 'rgba(239, 68, 68, 0.8)', emoji: '🛒' },
  'market-stall': { color: 'rgba(34, 197, 94, 0.8)', emoji: '🏪' },
  'food-truck': { color: 'rgba(59, 130, 246, 0.8)', emoji: '🚚' },
  'tianguis': { color: 'rgba(168, 85, 247, 0.8)', emoji: '🏛️' },
  'plaza': { color: 'rgba(251, 146, 60, 0.8)', emoji: '🏞️' }
}

export default function StreetFoodMap({ locale, selectedStreetFoods, onStreetFoodSelect, className }: StreetFoodMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapInstance, ] = useState<unknown>(null)
  const [selectedStreetFood, ] = useState<StreetFood | null>(null)
  
  // Get all street foods for display
  const allStreetFoods = StreetFoodService.getAllStreetFoods()
  const streetFoodsToShow = selectedStreetFoods.length > 0 ? selectedStreetFoods : allStreetFoods

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstance) return

    const initializeMap = async () => {
      try {
        // TODO: Migrate to Mapbox GL - OpenLayers has been removed
        console.warn('[StreetFoodMap]: OpenLayers has been removed. Please use Mapbox GL implementation.')
        return

        /* OpenLayers code commented out - migrate to Mapbox
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

        // Add street food markers
        streetFoodsToShow.forEach((streetFood) => {
          const feature = new Feature({
            geometry: new Point(fromLonLat(streetFood.coordinates)), // Street foods already have [lng, lat] format
            streetFood: streetFood
          })

          const venueStyle = venueTypeStyles[streetFood.venueType] || venueTypeStyles['street-cart']

          feature.setStyle(new Style({
            image: new Circle({
              radius: streetFood.featured ? 18 : 14,
              fill: new Fill({
                color: selectedStreetFoods.some(sf => sf.id === streetFood.id) ? 'rgba(239, 68, 68, 0.9)' : venueStyle.color
              }),
              stroke: new Stroke({
                color: '#ffffff',
                width: 3
              })
            }),
            text: new Text({
              text: venueStyle.emoji,
              font: `${streetFood.featured ? '22px' : '18px'} Arial`,
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
            const streetFood = feature.get('streetFood')
            setSelectedStreetFood(streetFood)
            if (onStreetFoodSelect) {
              onStreetFoodSelect(streetFood)
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
        End of OpenLayers code */
      } catch (error) {
        console.error('Error initializing street food map:', error)
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
  }, [streetFoodsToShow, mapInstance, onStreetFoodSelect, selectedStreetFoods])

  const getSpicyLevelEmoji = (level: number) => {
    switch (level) {
      case 1: return '🌶️'
      case 2: return '🌶️🌶️'
      case 3: return '🌶️🌶️🌶️'
      case 4: return '🌶️🌶️🌶️🌶️'
      case 5: return '🌶️🌶️🌶️🌶️🌶️'
      default: return '🌶️'
    }
  }

  const getVenueTypeLabel = (venueType: string) => {
    switch (venueType) {
      case 'street-cart': return locale === 'es' ? 'Carrito Callejero' : 'Street Cart'
      case 'market-stall': return locale === 'es' ? 'Puesto de Mercado' : 'Market Stall'
      case 'food-truck': return 'Food Truck'
      case 'tianguis': return locale === 'es' ? 'Tianguis' : 'Street Market'
      case 'plaza': return 'Plaza'
      default: return venueType
    }
  }

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
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 blur-xl opacity-50" />
                  <div className="relative bg-gradient-to-r from-red-500 to-pink-500 p-3 rounded-2xl shadow-2xl">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-white">
                    {locale === 'es' ? 'Mapa de Comida Callejera' : 'Street Food Map'}
                  </CardTitle>
                  <p className="text-white/70 mt-1">
                    {locale === 'es' 
                      ? `Mostrando ${streetFoodsToShow.length} puestos en Tepoztlán`
                      : `Showing ${streetFoodsToShow.length} street food stalls in Tepoztlán`
                    }
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-lg px-6 py-3 bg-gradient-to-r from-red-500/10 to-pink-500/10 text-white border-red-500/30 backdrop-blur-sm">
                <ShoppingCart className="h-4 w-4 mr-2 text-red-500" />
                {streetFoodsToShow.length} {locale === 'es' ? 'Puestos' : 'Stalls'}
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
                      <div className="w-16 h-16 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-white/60 text-lg">
                        {locale === 'es' ? 'Cargando mapa de comida callejera...' : 'Loading street food map...'}
                      </p>
                    </div>
                  </div>
                )}
                {/* Map Controls */}
                {mapLoaded && (
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <Button
                      size="sm"
                      className="w-10 h-10 p-0 bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="w-10 h-10 p-0 bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="w-10 h-10 p-0 bg-gradient-to-r from-red-500 to-pink-500 text-white"
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

      {/* Selected Street Food Details */}
      {selectedStreetFood && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center shadow-xl">
                  <span className="text-2xl">{venueTypeStyles[selectedStreetFood.venueType]?.emoji || '🍴'}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-white text-lg">
                        {StreetFoodService.getStreetFoodName(selectedStreetFood, locale)}
                      </h3>
                      <p className="text-white/70 text-sm mt-1">
                        {StreetFoodService.getStreetFoodDescription(selectedStreetFood, locale)}
                      </p>
                      <p className="text-white/60 text-sm mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {StreetFoodService.getStreetFoodLocation(selectedStreetFood, locale)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {selectedStreetFood.featured && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black">
                          Featured
                        </Badge>
                      )}
                      {selectedStreetFood.verified && (
                        <Badge className="bg-gradient-to-r from-green-400/20 to-emerald-400/20 text-green-300 border-green-400/30">
                          ✅ Verified
                        </Badge>
                      )}
                      {selectedStreetFood.localFavorite && (
                        <Badge className="bg-gradient-to-r from-pink-400/20 to-red-400/20 text-pink-300 border-pink-400/30">
                          ❤️ {locale === 'es' ? 'Favorito Local' : 'Local Favorite'}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-medium">{selectedStreetFood.rating}</span>
                      <span className="text-white/50 text-sm">({selectedStreetFood.reviewCount})</span>
                    </div>
                    <Badge className="bg-white/10 text-white/70">
                      {selectedStreetFood.priceRange}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 border-red-500/30">
                      {StreetFoodService.getStreetFoodType(selectedStreetFood, locale)}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 border-purple-500/30">
                      {getVenueTypeLabel(selectedStreetFood.venueType)}
                    </Badge>
                  </div>

                  {/* Hours and Spicy Level */}
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1 text-white/80 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{StreetFoodService.getStreetFoodHours(selectedStreetFood, locale)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/80 text-sm">
                      <Flame className="w-4 h-4 text-orange-400" />
                      <span>{getSpicyLevelEmoji(selectedStreetFood.spicyLevel)}</span>
                    </div>
                    {selectedStreetFood.cashOnly && (
                      <Badge className="bg-green-400/20 text-green-300 border-green-400/30 text-xs">
                        💵 {locale === 'es' ? 'Solo Efectivo' : 'Cash Only'}
                      </Badge>
                    )}
                  </div>

                  {/* Specialties */}
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {StreetFoodService.getStreetFoodSpecialties(selectedStreetFood, locale).slice(0, 3).map((specialty, index) => (
                      <Badge key={index} className="bg-yellow-400/20 text-yellow-300 border-yellow-400/30 text-xs">
                        🍽️ {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* Dietary Options */}
                  {selectedStreetFood.dietary.length > 0 && (
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {selectedStreetFood.dietary.map((diet) => (
                        <Badge key={diet} className="bg-emerald-400/20 text-emerald-300 border-emerald-400/30 text-xs">
                          {diet === 'vegetarian' ? '🥬 ' + (locale === 'es' ? 'Vegetariano' : 'Vegetarian') : 
                           diet === 'vegan' ? '🌱 ' + (locale === 'es' ? 'Vegano' : 'Vegan') :
                           diet === 'gluten-free' ? '🌾 ' + (locale === 'es' ? 'Sin Gluten' : 'Gluten-Free') :
                           diet === 'spicy' ? '🌶️ ' + (locale === 'es' ? 'Picante' : 'Spicy') : diet}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-4">
                    <Button size="sm" className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                      <Navigation className="w-3 h-3 mr-1" />
                      {locale === 'es' ? 'Direcciones' : 'Directions'}
                    </Button>
                    {selectedStreetFood.phone && (
                      <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                        <Phone className="w-3 h-3" />
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                      <Heart className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
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