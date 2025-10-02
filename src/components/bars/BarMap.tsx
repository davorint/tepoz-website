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
  Wine,
  Heart,
  Share2,
  Clock,
  Wifi,
  Car,
  Music,
  Cigarette
} from 'lucide-react'
import { Locale } from '@/lib/i18n'
import { Bar, BarService } from '@/lib/bars'

interface BarMapProps {
  locale: Locale
  selectedBars: Bar[]
  onBarSelect?: (bar: Bar) => void
  className?: string
}

// Bar type styles for map markers with nightlife theme
const barTypeStyles = {
  'bar': { color: 'rgba(59, 130, 246, 0.8)', emoji: '🍺' },
  'pulqueria': { color: 'rgba(34, 197, 94, 0.8)', emoji: '🌵' },
  'cantina': { color: 'rgba(251, 146, 60, 0.8)', emoji: '🤠' },
  'mezcaleria': { color: 'rgba(168, 85, 247, 0.8)', emoji: '🥃' },
  'cocktail-bar': { color: 'rgba(236, 72, 153, 0.8)', emoji: '🍸' },
  'sports-bar': { color: 'rgba(34, 197, 94, 0.8)', emoji: '⚽' }
}

export default function BarMap({ locale, selectedBars, onBarSelect, className }: BarMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapInstance] = useState<unknown>(null)
  const [selectedBar] = useState<Bar | null>(null)
  
  // Get all bars for display
  const allBars = BarService.getAllBars()
  const barsToShow = selectedBars.length > 0 ? selectedBars : allBars

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstance) return

    const initializeMap = async () => {
      try {
        // TODO: Migrate to Mapbox GL - OpenLayers has been removed
        console.warn('BarMap: OpenLayers has been removed. Please use Mapbox GL implementation.')
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

        // Add bar markers
        barsToShow.forEach((bar) => {
          const feature = new Feature({
            geometry: new Point(fromLonLat(bar.coordinates)), // Bars already have [lng, lat] format
            bar: bar
          })

          const typeStyle = barTypeStyles[bar.type] || barTypeStyles['bar']

          feature.setStyle(new Style({
            image: new Circle({
              radius: bar.featured ? 18 : 14,
              fill: new Fill({
                color: selectedBars.some(b => b.id === bar.id) ? 'rgba(251, 146, 60, 0.9)' : typeStyle.color
              }),
              stroke: new Stroke({
                color: '#ffffff',
                width: 3
              })
            }),
            text: new Text({
              text: typeStyle.emoji,
              font: `${bar.featured ? '22px' : '18px'} Arial`,
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
            const bar = feature.get('bar')
            setSelectedBar(bar)
            if (onBarSelect) {
              onBarSelect(bar)
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
        console.error('Error initializing bar map:', error)
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
  }, [barsToShow, mapInstance, onBarSelect, selectedBars])

  const getBarTypeLabel = (type: string) => {
    switch (type) {
      case 'bar': return locale === 'es' ? 'Bar' : 'Bar'
      case 'pulqueria': return locale === 'es' ? 'Pulquería' : 'Pulquería'
      case 'cantina': return locale === 'es' ? 'Cantina' : 'Cantina'
      case 'mezcaleria': return locale === 'es' ? 'Mezcalería' : 'Mezcalería'
      case 'cocktail-bar': return locale === 'es' ? 'Bar de Cócteles' : 'Cocktail Bar'
      case 'sports-bar': return locale === 'es' ? 'Bar Deportivo' : 'Sports Bar'
      default: return type
    }
  }

  const getAtmosphereLabel = (atmosphere: string) => {
    switch (atmosphere) {
      case 'casual': return locale === 'es' ? 'Casual' : 'Casual'
      case 'upscale': return locale === 'es' ? 'Elegante' : 'Upscale'
      case 'traditional': return locale === 'es' ? 'Tradicional' : 'Traditional'
      case 'modern': return locale === 'es' ? 'Moderno' : 'Modern'
      case 'rustic': return locale === 'es' ? 'Rústico' : 'Rustic'
      case 'party': return locale === 'es' ? 'Fiesta' : 'Party'
      default: return atmosphere
    }
  }

  const getDrinksEmoji = (drinks: string[]) => {
    if (drinks.includes('pulque')) return '🌵'
    if (drinks.includes('mezcal')) return '🥃'
    if (drinks.includes('cocktails')) return '🍸'
    if (drinks.includes('craft-beer')) return '🍺'
    if (drinks.includes('wine')) return '🍷'
    if (drinks.includes('champagne')) return '🥂'
    if (drinks.includes('beer')) return '🍻'
    return '🥤'
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
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 blur-xl opacity-50" />
                  <div className="relative bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-2xl shadow-2xl">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-white">
                    {locale === 'es' ? 'Mapa de Bares y Pulquerías' : 'Bars & Pulquerías Map'}
                  </CardTitle>
                  <p className="text-white/70 mt-1">
                    {locale === 'es' 
                      ? `Mostrando ${barsToShow.length} lugares sociales y tradicionales en Tepoztlán`
                      : `Showing ${barsToShow.length} social and traditional venues in Tepoztlán`
                    }
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-lg px-6 py-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-white border-amber-500/30 backdrop-blur-sm">
                <Wine className="h-4 w-4 mr-2 text-amber-500" />
                {barsToShow.length} {locale === 'es' ? 'Bares' : 'Bars'}
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
                        {locale === 'es' ? 'Cargando mapa de bares...' : 'Loading bars map...'}
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

      {/* Selected Bar Details */}
      {selectedBar && (
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
                  <span className="text-2xl">{barTypeStyles[selectedBar.type]?.emoji || '🍷'}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-white text-lg">
                        {BarService.getBarName(selectedBar, locale)}
                      </h3>
                      <p className="text-white/70 text-sm mt-1">
                        {BarService.getBarDescription(selectedBar, locale)}
                      </p>
                      <p className="text-white/60 text-sm mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {BarService.getBarAddress(selectedBar, locale)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {selectedBar.featured && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black">
                          Featured
                        </Badge>
                      )}
                      {selectedBar.verified && (
                        <Badge className="bg-gradient-to-r from-green-400/20 to-emerald-400/20 text-green-300 border-green-400/30">
                          ✅ Verified
                        </Badge>
                      )}
                      {selectedBar.ageRestriction && (
                        <Badge className="bg-gradient-to-r from-red-400/20 to-pink-400/20 text-red-300 border-red-400/30">
                          🔞 21+
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-medium">{selectedBar.rating}</span>
                      <span className="text-white/50 text-sm">({selectedBar.reviewCount})</span>
                    </div>
                    <Badge className="bg-white/10 text-white/70">
                      {selectedBar.priceRange}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
                      {getBarTypeLabel(selectedBar.type)}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border-indigo-500/30">
                      {getAtmosphereLabel(selectedBar.atmosphere)}
                    </Badge>
                  </div>

                  {/* Hours and Happy Hour */}
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1 text-white/80 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{selectedBar.hours[locale]}</span>
                    </div>
                    {selectedBar.happyHour && (
                      <Badge className="bg-yellow-400/20 text-yellow-300 border-yellow-400/30 text-xs">
                        🕐 Happy Hour: {selectedBar.happyHour[locale]}
                      </Badge>
                    )}
                  </div>

                  {/* Drinks */}
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {selectedBar.drinks.slice(0, 4).map((drink, index) => (
                      <Badge key={index} className="bg-amber-400/20 text-amber-300 border-amber-400/30 text-xs">
                        {getDrinksEmoji([drink])} {drink === 'craft-beer' ? (locale === 'es' ? 'Cerveza Artesanal' : 'Craft Beer') :
                         drink === 'cocktails' ? (locale === 'es' ? 'Cócteles' : 'Cocktails') :
                         drink === 'mezcal' ? 'Mezcal' :
                         drink === 'pulque' ? 'Pulque' :
                         drink === 'tequila' ? 'Tequila' :
                         drink === 'wine' ? (locale === 'es' ? 'Vino' : 'Wine') :
                         drink === 'beer' ? (locale === 'es' ? 'Cerveza' : 'Beer') :
                         drink === 'champagne' ? 'Champagne' : drink}
                      </Badge>
                    ))}
                  </div>

                  {/* Amenities */}
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {selectedBar.wifi && (
                      <Badge className="bg-blue-400/20 text-blue-300 border-blue-400/30 text-xs">
                        <Wifi className="w-3 h-3 mr-1" />
                        WiFi
                      </Badge>
                    )}
                    {selectedBar.parking && (
                      <Badge className="bg-gray-400/20 text-gray-300 border-gray-400/30 text-xs">
                        <Car className="w-3 h-3 mr-1" />
                        {locale === 'es' ? 'Parking' : 'Parking'}
                      </Badge>
                    )}
                    {selectedBar.liveMusic && (
                      <Badge className="bg-purple-400/20 text-purple-300 border-purple-400/30 text-xs">
                        <Music className="w-3 h-3 mr-1" />
                        {locale === 'es' ? 'Música en Vivo' : 'Live Music'}
                      </Badge>
                    )}
                    {selectedBar.danceFloor && (
                      <Badge className="bg-pink-400/20 text-pink-300 border-pink-400/30 text-xs">
                        💃 {locale === 'es' ? 'Pista de Baile' : 'Dance Floor'}
                      </Badge>
                    )}
                    {selectedBar.outdoorSeating && (
                      <Badge className="bg-green-400/20 text-green-300 border-green-400/30 text-xs">
                        🌿 {locale === 'es' ? 'Terraza' : 'Outdoor'}
                      </Badge>
                    )}
                    {selectedBar.smokingArea && (
                      <Badge className="bg-orange-400/20 text-orange-300 border-orange-400/30 text-xs">
                        <Cigarette className="w-3 h-3 mr-1" />
                        {locale === 'es' ? 'Área de Fumar' : 'Smoking Area'}
                      </Badge>
                    )}
                    {selectedBar.acceptsCards && (
                      <Badge className="bg-emerald-400/20 text-emerald-300 border-emerald-400/30 text-xs">
                        💳 {locale === 'es' ? 'Acepta Tarjetas' : 'Cards Accepted'}
                      </Badge>
                    )}
                  </div>

                  {/* Specialties */}
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {selectedBar.specialties[locale].slice(0, 3).map((specialty, index) => (
                      <Badge key={index} className="bg-yellow-400/20 text-yellow-300 border-yellow-400/30 text-xs">
                        ⭐ {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                      <Navigation className="w-3 h-3 mr-1" />
                      {locale === 'es' ? 'Direcciones' : 'Directions'}
                    </Button>
                    {selectedBar.phone && (
                      <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                        <Phone className="w-3 h-3" />
                      </Button>
                    )}
                    {selectedBar.website && (
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