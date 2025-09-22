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
  Home,
  Heart,
  Share2,
  Bed,
  Users,
  Wifi,
  Car
} from 'lucide-react'
import { Locale } from '@/lib/i18n'
import { Rental, RentalServiceStatic, rentalCategories } from '@/lib/rentals'

interface VacationRentalMapProps {
  locale: Locale
  selectedRentals: Rental[]
  onRentalSelect?: (rental: Rental) => void
  className?: string
}

// Category styles for map markers with vacation rental theme
const categoryStyles = {
  'apartment': { color: 'rgba(59, 130, 246, 0.8)', emoji: '🏢' },
  'house': { color: 'rgba(34, 197, 94, 0.8)', emoji: '🏡' },
  'villa': { color: 'rgba(168, 85, 247, 0.8)', emoji: '🏘️' },
  'studio': { color: 'rgba(251, 146, 60, 0.8)', emoji: '🏠' },
  'cabin': { color: 'rgba(101, 163, 13, 0.8)', emoji: '🏕️' },
  'loft': { color: 'rgba(236, 72, 153, 0.8)', emoji: '🏢' }
}

export default function VacationRentalMap({ locale, selectedRentals, onRentalSelect, className }: VacationRentalMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapInstance, setMapInstance] = useState<unknown>(null)
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null)
  
  // Get all vacation rentals for display
  const allRentals = RentalServiceStatic.getAllRentals()
  const rentalsToShow = selectedRentals.length > 0 ? selectedRentals : allRentals

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

        // Add rental markers
        rentalsToShow.forEach((rental) => {
          // Skip rentals without valid coordinates
          if (!rental.location?.coordinates || rental.location.coordinates.length < 2) {
            return
          }

          const feature = new Feature({
            geometry: new Point(fromLonLat([rental.location.coordinates[1], rental.location.coordinates[0]])), // Convert [lat, lng] to [lng, lat]
            rental: rental
          })

          const categoryStyle = categoryStyles[rental.category] || categoryStyles['apartment']
          
          feature.setStyle(new Style({
            image: new Circle({
              radius: rental.featured ? 18 : 14,
              fill: new Fill({
                color: selectedRentals.some(r => r.id === rental.id) ? 'rgba(16, 185, 129, 0.9)' : categoryStyle.color
              }),
              stroke: new Stroke({
                color: '#ffffff',
                width: 3
              })
            }),
            text: new Text({
              text: categoryStyle.emoji,
              font: `${rental.featured ? '22px' : '18px'} Arial`,
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
            const rental = feature.get('rental')
            setSelectedRental(rental)
            if (onRentalSelect) {
              onRentalSelect(rental)
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
        console.error('Error initializing vacation rental map:', error)
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
  }, [rentalsToShow, mapInstance, onRentalSelect, selectedRentals])

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
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 blur-xl opacity-50" />
                  <div className="relative bg-gradient-to-r from-emerald-400 to-teal-400 p-3 rounded-2xl shadow-2xl">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-white">
                    {locale === 'es' ? 'Mapa de Rentas Vacacionales' : 'Vacation Rentals Map'}
                  </CardTitle>
                  <p className="text-white/70 mt-1">
                    {locale === 'es' 
                      ? `Mostrando ${rentalsToShow.length} propiedades disponibles`
                      : `Showing ${rentalsToShow.length} available properties`
                    }
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-lg px-6 py-3 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 text-white border-emerald-400/30 backdrop-blur-sm">
                <Home className="h-4 w-4 mr-2 text-emerald-400" />
                {rentalsToShow.length} {locale === 'es' ? 'Propiedades' : 'Properties'}
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
                      <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-white/60 text-lg">
                        {locale === 'es' ? 'Cargando mapa de propiedades...' : 'Loading properties map...'}
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
                      className="w-10 h-10 p-0 bg-gradient-to-r from-emerald-400 to-teal-400 text-white"
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

      {/* Selected Vacation Rental Details */}
      {selectedRental && (
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
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 flex items-center justify-center shadow-xl">
                  <span className="text-2xl">{categoryStyles[selectedRental.category]?.emoji || '🏠'}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-white text-lg">
                        {RentalServiceStatic.getRentalName(selectedRental, locale)}
                      </h3>
                      <p className="text-white/70 text-sm mt-1">
                        {RentalServiceStatic.getRentalDescription(selectedRental, locale)}
                      </p>
                      <p className="text-white/60 text-sm mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {selectedRental.location.address}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {selectedRental.featured && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black">
                          Featured
                        </Badge>
                      )}
                      {selectedRental.instantBook && (
                        <Badge className="bg-gradient-to-r from-emerald-400/20 to-teal-400/20 text-emerald-300 border-emerald-400/30">
                          ⚡ Instant
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-medium">{selectedRental.rating}</span>
                      <span className="text-white/50 text-sm">({selectedRental.reviews})</span>
                    </div>
                    <Badge className="bg-white/10 text-white/70">
                      {selectedRental.priceRange}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-emerald-400/20 to-teal-400/20 text-emerald-300 border-emerald-400/30">
                      {rentalCategories.find(c => c.id === selectedRental.category)?.[locale] || selectedRental.category}
                    </Badge>
                  </div>

                  {/* Property Info */}
                  <div className="flex items-center gap-4 mt-3 flex-wrap">
                    <div className="flex items-center gap-1 text-white/80 text-sm">
                      <Bed className="w-4 h-4" />
                      <span>{selectedRental.roomInfo.bedrooms} {locale === 'es' ? 'habitaciones' : 'bedrooms'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/80 text-sm">
                      <Users className="w-4 h-4" />
                      <span>{selectedRental.roomInfo.maxGuests} {locale === 'es' ? 'huéspedes' : 'guests'}</span>
                    </div>
                    <div className="text-white/80 text-sm">
                      ${selectedRental.roomInfo.pricePerNight}/{locale === 'es' ? 'noche' : 'night'}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {selectedRental.hasWifi && (
                      <Badge className="bg-blue-400/20 text-blue-300 border-blue-400/30 text-xs">
                        <Wifi className="w-3 h-3 mr-1" />
                        WiFi
                      </Badge>
                    )}
                    {(selectedRental.parking || selectedRental.hasParking) && (
                      <Badge className="bg-gray-400/20 text-gray-300 border-gray-400/30 text-xs">
                        <Car className="w-3 h-3 mr-1" />
                        {locale === 'es' ? 'Parking' : 'Parking'}
                      </Badge>
                    )}
                    {selectedRental.hasKitchen && (
                      <Badge className="bg-orange-400/20 text-orange-300 border-orange-400/30 text-xs">
                        🍳 {locale === 'es' ? 'Cocina' : 'Kitchen'}
                      </Badge>
                    )}
                    {selectedRental.petFriendly && (
                      <Badge className="bg-green-400/20 text-green-300 border-green-400/30 text-xs">
                        🐾 Pet OK
                      </Badge>
                    )}
                    {selectedRental.familyFriendly && (
                      <Badge className="bg-pink-400/20 text-pink-300 border-pink-400/30 text-xs">
                        👨‍👩‍👧‍👦 Family
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <Button size="sm" className="bg-gradient-to-r from-emerald-400 to-teal-400 text-white">
                      <Navigation className="w-3 h-3 mr-1" />
                      {locale === 'es' ? 'Direcciones' : 'Directions'}
                    </Button>
                    {selectedRental.contact.phone && (
                      <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                        <Phone className="w-3 h-3" />
                      </Button>
                    )}
                    {selectedRental.contact.website && (
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