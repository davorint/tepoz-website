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
  Hotel as HotelIcon,
  Heart,
  Share2
} from 'lucide-react'
import { Locale } from '@/lib/i18n'
import { Hotel, HotelServiceStatic, hotelCategories } from '@/lib/hotels'

interface HotelMapProps {
  locale: Locale
  selectedHotels: Hotel[]
  onHotelSelect?: (hotel: Hotel) => void
  className?: string
}

// Category styles for map markers
const categoryStyles = {
  boutique: { color: 'rgba(168, 85, 247, 0.8)', emoji: '✨' },
  resort: { color: 'rgba(34, 197, 94, 0.8)', emoji: '🏖️' },
  eco: { color: 'rgba(22, 163, 74, 0.8)', emoji: '🌿' },
  budget: { color: 'rgba(251, 146, 60, 0.8)', emoji: '💰' },
  luxury: { color: 'rgba(217, 70, 239, 0.8)', emoji: '💎' },
  hostel: { color: 'rgba(59, 130, 246, 0.8)', emoji: '🏠' },
  business: { color: 'rgba(107, 114, 128, 0.8)', emoji: '🏢' },
  wellness: { color: 'rgba(16, 185, 129, 0.8)', emoji: '🧘' },
  romantic: { color: 'rgba(236, 72, 153, 0.8)', emoji: '💕' },
  historic: { color: 'rgba(180, 83, 9, 0.8)', emoji: '🏛️' }
}

export default function HotelMap({ locale, selectedHotels, onHotelSelect, className }: HotelMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapInstance, setMapInstance] = useState<unknown>(null)
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)
  
  // Get all hotels for display
  const allHotels = HotelServiceStatic.getAllHotels()
  const hotelsToShow = selectedHotels.length > 0 ? selectedHotels : allHotels

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

        // Add hotel markers
        hotelsToShow.forEach((hotel) => {
          const feature = new Feature({
            geometry: new Point(fromLonLat([hotel.location.coordinates[1], hotel.location.coordinates[0]])), // Convert [lat, lng] to [lng, lat]
            hotel: hotel
          })

          const categoryStyle = categoryStyles[hotel.category] || categoryStyles.boutique
          
          feature.setStyle(new Style({
            image: new Circle({
              radius: hotel.featured ? 18 : 14,
              fill: new Fill({
                color: selectedHotels.some(h => h.id === hotel.id) ? 'rgba(59, 130, 246, 0.9)' : categoryStyle.color
              }),
              stroke: new Stroke({
                color: '#ffffff',
                width: 3
              })
            }),
            text: new Text({
              text: categoryStyle.emoji,
              font: `${hotel.featured ? '22px' : '18px'} Arial`,
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
            const hotel = feature.get('hotel')
            setSelectedHotel(hotel)
            if (onHotelSelect) {
              onHotelSelect(hotel)
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
        console.error('Error initializing hotel map:', error)
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
  }, [hotelsToShow, mapInstance, onHotelSelect, selectedHotels])

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
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 blur-xl opacity-50" />
                  <div className="relative bg-gradient-to-r from-purple-400 to-blue-400 p-3 rounded-2xl shadow-2xl">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-white">
                    {locale === 'es' ? 'Mapa de Hoteles' : 'Hotels Map'}
                  </CardTitle>
                  <p className="text-white/70 mt-1">
                    {locale === 'es' 
                      ? `Mostrando ${hotelsToShow.length} hoteles en Tepoztlán`
                      : `Showing ${hotelsToShow.length} hotels in Tepoztlán`
                    }
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-lg px-6 py-3 bg-gradient-to-r from-purple-400/10 to-blue-400/10 text-white border-purple-400/30 backdrop-blur-sm">
                <HotelIcon className="h-4 w-4 mr-2 text-purple-400" />
                {hotelsToShow.length} {locale === 'es' ? 'Hoteles' : 'Hotels'}
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
                      <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-white/60 text-lg">
                        {locale === 'es' ? 'Cargando mapa de hoteles...' : 'Loading hotels map...'}
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
                      className="w-10 h-10 p-0 bg-gradient-to-r from-purple-400 to-blue-400 text-white"
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

      {/* Selected Hotel Details */}
      {selectedHotel && (
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
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center shadow-xl">
                  <span className="text-2xl">{categoryStyles[selectedHotel.category]?.emoji || '🏨'}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-white text-lg">
                        {HotelServiceStatic.getHotelName(selectedHotel, locale)}
                      </h3>
                      <p className="text-white/70 text-sm mt-1">
                        {HotelServiceStatic.getHotelDescription(selectedHotel, locale)}
                      </p>
                      <p className="text-white/60 text-sm mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {selectedHotel.location.address}
                      </p>
                    </div>
                    {selectedHotel.featured && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black">
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-medium">{selectedHotel.rating}</span>
                      <span className="text-white/50 text-sm">({selectedHotel.reviews?.length || 0})</span>
                    </div>
                    <Badge className="bg-white/10 text-white/70">
                      {selectedHotel.priceRange}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-purple-400/20 to-blue-400/20 text-purple-300 border-purple-400/30">
                      {hotelCategories.find(c => c.id === selectedHotel.category)?.[locale] || selectedHotel.category}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <Button size="sm" className="bg-gradient-to-r from-purple-400 to-blue-400 text-white">
                      <Navigation className="w-3 h-3 mr-1" />
                      {locale === 'es' ? 'Direcciones' : 'Directions'}
                    </Button>
                    {selectedHotel.contact.phone && (
                      <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                        <Phone className="w-3 h-3" />
                      </Button>
                    )}
                    {selectedHotel.contact.website && (
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