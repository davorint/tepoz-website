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
  Coffee,
  Heart,
  Share2,
  Clock,
  Wifi,
  Car,
  Music,
  Truck
} from 'lucide-react'
import { Locale } from '@/lib/i18n'
import { Cafe, CafeService } from '@/lib/cafes'

interface CafeMapProps {
  locale: Locale
  selectedCafes: Cafe[]
  onCafeSelect?: (cafe: Cafe) => void
  className?: string
}

// Atmosphere styles for map markers with coffee theme
const atmosphereStyles = {
  'cozy': { color: 'rgba(180, 83, 9, 0.8)', emoji: '🛋️' },
  'modern': { color: 'rgba(59, 130, 246, 0.8)', emoji: '✨' },
  'traditional': { color: 'rgba(101, 163, 13, 0.8)', emoji: '🏛️' },
  'artistic': { color: 'rgba(168, 85, 247, 0.8)', emoji: '🎨' },
  'minimalist': { color: 'rgba(107, 114, 128, 0.8)', emoji: '⚪' },
  'rustic': { color: 'rgba(120, 53, 15, 0.8)', emoji: '🌿' },
  'casual': { color: 'rgba(34, 197, 94, 0.8)', emoji: '😊' },
  'family': { color: 'rgba(236, 72, 153, 0.8)', emoji: '👨‍👩‍👧‍👦' }
}

export default function CafeMap({ locale, selectedCafes, onCafeSelect, className }: CafeMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapInstance, ] = useState<unknown>(null)
  const [selectedCafe, ] = useState<Cafe | null>(null)
  
  // Get all cafes for display
  const allCafes = CafeService.getAllCafes()
  const cafesToShow = selectedCafes.length > 0 ? selectedCafes : allCafes

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstance) return

    const initializeMap = async () => {
      try {
        // TODO: Migrate to Mapbox GL - OpenLayers has been removed
        console.warn('[CafeMap]: OpenLayers has been removed. Please use Mapbox GL implementation.')
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

        // Add cafe markers
        cafesToShow.forEach((cafe) => {
          const feature = new Feature({
            geometry: new Point(fromLonLat(cafe.coordinates)), // Cafes already have [lng, lat] format
            cafe: cafe
          })

          const atmosphereStyle = atmosphereStyles[cafe.atmosphere] || atmosphereStyles['cozy']

          feature.setStyle(new Style({
            image: new Circle({
              radius: cafe.featured ? 18 : 14,
              fill: new Fill({
                color: selectedCafes.some(c => c.id === cafe.id) ? 'rgba(180, 83, 9, 0.9)' : atmosphereStyle.color
              }),
              stroke: new Stroke({
                color: '#ffffff',
                width: 3
              })
            }),
            text: new Text({
              text: atmosphereStyle.emoji,
              font: `${cafe.featured ? '22px' : '18px'} Arial`,
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
            const cafe = feature.get('cafe')
            setSelectedCafe(cafe)
            if (onCafeSelect) {
              onCafeSelect(cafe)
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
        console.error('Error initializing cafe map:', error)
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
  }, [cafesToShow, mapInstance, onCafeSelect, selectedCafes])

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
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 blur-xl opacity-50" />
                  <div className="relative bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-2xl shadow-2xl">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-white">
                    {locale === 'es' ? 'Mapa de Cafés y Panaderías' : 'Cafes & Bakeries Map'}
                  </CardTitle>
                  <p className="text-white/70 mt-1">
                    {locale === 'es' 
                      ? `Mostrando ${cafesToShow.length} establecimientos en Tepoztlán`
                      : `Showing ${cafesToShow.length} establishments in Tepoztlán`
                    }
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-lg px-6 py-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-white border-amber-500/30 backdrop-blur-sm">
                <Coffee className="h-4 w-4 mr-2 text-amber-500" />
                {cafesToShow.length} {locale === 'es' ? 'Establecimientos' : 'Establishments'}
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
                      <div className="w-16 h-16 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-white/60 text-lg">
                        {locale === 'es' ? 'Cargando mapa de cafés...' : 'Loading cafes map...'}
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
                      className="w-10 h-10 p-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white"
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

      {/* Selected Cafe Details */}
      {selectedCafe && (
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
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-xl">
                  <span className="text-2xl">{atmosphereStyles[selectedCafe.atmosphere]?.emoji || '☕'}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-white text-lg">
                        {CafeService.getCafeName(selectedCafe, locale)}
                      </h3>
                      <p className="text-white/70 text-sm mt-1">
                        {CafeService.getCafeDescription(selectedCafe, locale)}
                      </p>
                      <p className="text-white/60 text-sm mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {CafeService.getCafeAddress(selectedCafe, locale)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {selectedCafe.featured && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black">
                          Featured
                        </Badge>
                      )}
                      {selectedCafe.verified && (
                        <Badge className="bg-gradient-to-r from-green-400/20 to-emerald-400/20 text-green-300 border-green-400/30">
                          ✅ Verified
                        </Badge>
                      )}
                      {selectedCafe.roastery && (
                        <Badge className="bg-gradient-to-r from-red-400/20 to-orange-400/20 text-red-300 border-red-400/30">
                          🔥 Roastery
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-medium">{selectedCafe.rating}</span>
                      <span className="text-white/50 text-sm">({selectedCafe.reviewCount})</span>
                    </div>
                    <Badge className="bg-white/10 text-white/70">
                      {selectedCafe.priceRange}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30">
                      {CafeService.getCafeType(selectedCafe, locale)}
                    </Badge>
                  </div>

                  {/* Cafe Info */}
                  <div className="flex items-center gap-1 mt-3 text-white/80 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{CafeService.getCafeHours(selectedCafe, locale)}</span>
                  </div>

                  {/* Specialties */}
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {CafeService.getCafeSpecialties(selectedCafe, locale).slice(0, 3).map((specialty, index) => (
                      <Badge key={index} className="bg-yellow-400/20 text-yellow-300 border-yellow-400/30 text-xs">
                        ☕ {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* Amenities */}
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {selectedCafe.wifi && (
                      <Badge className="bg-blue-400/20 text-blue-300 border-blue-400/30 text-xs">
                        <Wifi className="w-3 h-3 mr-1" />
                        WiFi
                      </Badge>
                    )}
                    {selectedCafe.parking && (
                      <Badge className="bg-gray-400/20 text-gray-300 border-gray-400/30 text-xs">
                        <Car className="w-3 h-3 mr-1" />
                        {locale === 'es' ? 'Parking' : 'Parking'}
                      </Badge>
                    )}
                    {selectedCafe.liveMusic && (
                      <Badge className="bg-purple-400/20 text-purple-300 border-purple-400/30 text-xs">
                        <Music className="w-3 h-3 mr-1" />
                        {locale === 'es' ? 'Música' : 'Live Music'}
                      </Badge>
                    )}
                    {selectedCafe.outdoorSeating && (
                      <Badge className="bg-green-400/20 text-green-300 border-green-400/30 text-xs">
                        🌿 {locale === 'es' ? 'Terraza' : 'Outdoor'}
                      </Badge>
                    )}
                    {selectedCafe.delivery && (
                      <Badge className="bg-orange-400/20 text-orange-300 border-orange-400/30 text-xs">
                        <Truck className="w-3 h-3 mr-1" />
                        {locale === 'es' ? 'Delivery' : 'Delivery'}
                      </Badge>
                    )}
                    {selectedCafe.takeaway && (
                      <Badge className="bg-indigo-400/20 text-indigo-300 border-indigo-400/30 text-xs">
                        📦 {locale === 'es' ? 'Para llevar' : 'Takeaway'}
                      </Badge>
                    )}
                    {selectedCafe.studyFriendly && (
                      <Badge className="bg-cyan-400/20 text-cyan-300 border-cyan-400/30 text-xs">
                        📚 {locale === 'es' ? 'Para estudiar' : 'Study friendly'}
                      </Badge>
                    )}
                    {selectedCafe.petFriendly && (
                      <Badge className="bg-pink-400/20 text-pink-300 border-pink-400/30 text-xs">
                        🐾 Pet OK
                      </Badge>
                    )}
                  </div>

                  {/* Dietary Options */}
                  {selectedCafe.dietary.length > 0 && (
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {selectedCafe.dietary.map((diet) => (
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
                    <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                      <Navigation className="w-3 h-3 mr-1" />
                      {locale === 'es' ? 'Direcciones' : 'Directions'}
                    </Button>
                    {selectedCafe.phone && (
                      <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                        <Phone className="w-3 h-3" />
                      </Button>
                    )}
                    {selectedCafe.website && (
                      <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                        <Globe className="w-3 h-3" />
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