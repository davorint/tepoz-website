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
  Leaf,
  Heart,
  Share2,
  Recycle
} from 'lucide-react'
import { Locale } from '@/lib/i18n'
import { EcoLodge, EcoLodgeServiceStatic, ecoLodgeCategories } from '@/lib/eco-lodges'

interface EcoLodgeMapProps {
  locale: Locale
  selectedEcoLodges: EcoLodge[]
  onEcoLodgeSelect?: (ecoLodge: EcoLodge) => void
  className?: string
}

// Category styles for map markers with eco-friendly theme
const categoryStyles = {
  'eco-resort': { color: 'rgba(34, 197, 94, 0.8)', emoji: '🌴' },
  'treehouse': { color: 'rgba(22, 163, 74, 0.8)', emoji: '🌳' },
  'glamping': { color: 'rgba(132, 204, 22, 0.8)', emoji: '⛺' },
  'sustainable-hotel': { color: 'rgba(16, 185, 129, 0.8)', emoji: '🏨' },
  'nature-retreat': { color: 'rgba(5, 150, 105, 0.8)', emoji: '🏔️' },
  'organic-farm': { color: 'rgba(101, 163, 13, 0.8)', emoji: '🚜' }
}

export default function EcoLodgeMap({ locale, selectedEcoLodges, onEcoLodgeSelect, className }: EcoLodgeMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapInstance, ] = useState<unknown>(null)
  const [selectedEcoLodge, ] = useState<EcoLodge | null>(null)
  
  // Get all eco-lodges for display
  const allEcoLodges = EcoLodgeServiceStatic.getAllEcoLodges()
  const ecoLodgesToShow = selectedEcoLodges.length > 0 ? selectedEcoLodges : allEcoLodges

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstance) return

    const initializeMap = async () => {
      try {
        // TODO: Migrate to Mapbox GL - OpenLayers has been removed
        console.warn('[EcoLodgeMap]: OpenLayers has been removed. Please use Mapbox GL implementation.')
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

        // Add eco-lodge markers
        ecoLodgesToShow.forEach((ecoLodge) => {
          if (!ecoLodge.location?.coordinates) return

          const feature = new Feature({
            geometry: new Point(fromLonLat([ecoLodge.location.coordinates[1], ecoLodge.location.coordinates[0]])), // Convert [lat, lng] to [lng, lat]
            ecoLodge: ecoLodge
          })

          const categoryStyle = categoryStyles[ecoLodge.category] || categoryStyles['eco-resort']

          feature.setStyle(new Style({
            image: new Circle({
              radius: ecoLodge.featured ? 18 : 14,
              fill: new Fill({
                color: selectedEcoLodges.some(el => el.id === ecoLodge.id) ? 'rgba(16, 185, 129, 0.9)' : categoryStyle.color
              }),
              stroke: new Stroke({
                color: '#ffffff',
                width: 3
              })
            }),
            text: new Text({
              text: categoryStyle.emoji,
              font: `${ecoLodge.featured ? '22px' : '18px'} Arial`,
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
            const ecoLodge = feature.get('ecoLodge')
            setSelectedEcoLodge(ecoLodge)
            if (onEcoLodgeSelect) {
              onEcoLodgeSelect(ecoLodge)
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
        console.error('Error initializing eco-lodge map:', error)
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
  }, [ecoLodgesToShow, mapInstance, onEcoLodgeSelect, selectedEcoLodges])

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
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 blur-xl opacity-50" />
                  <div className="relative bg-gradient-to-r from-emerald-400 to-green-400 p-3 rounded-2xl shadow-2xl">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-white">
                    {locale === 'es' ? 'Mapa de Eco-Lodges' : 'Eco-Lodges Map'}
                  </CardTitle>
                  <p className="text-white/70 mt-1">
                    {locale === 'es' 
                      ? `Mostrando ${ecoLodgesToShow.length} eco-lodges sustentables`
                      : `Showing ${ecoLodgesToShow.length} sustainable eco-lodges`
                    }
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-lg px-6 py-3 bg-gradient-to-r from-emerald-400/10 to-green-400/10 text-white border-emerald-400/30 backdrop-blur-sm">
                <Leaf className="h-4 w-4 mr-2 text-emerald-400" />
                {ecoLodgesToShow.length} {locale === 'es' ? 'Eco-Lodges' : 'Eco-Lodges'}
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
                        {locale === 'es' ? 'Cargando mapa de eco-lodges...' : 'Loading eco-lodges map...'}
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
                      className="w-10 h-10 p-0 bg-gradient-to-r from-emerald-400 to-green-400 text-white"
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

      {/* Selected Eco-Lodge Details */}
      {selectedEcoLodge && (
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
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-400 to-green-400 flex items-center justify-center shadow-xl">
                  <span className="text-2xl">{categoryStyles[selectedEcoLodge.category]?.emoji || '🌿'}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-white text-lg">
                        {EcoLodgeServiceStatic.getEcoLodgeName(selectedEcoLodge, locale)}
                      </h3>
                      <p className="text-white/70 text-sm mt-1">
                        {EcoLodgeServiceStatic.getEcoLodgeDescription(selectedEcoLodge, locale)}
                      </p>
                      <p className="text-white/60 text-sm mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {selectedEcoLodge.location?.address || selectedEcoLodge.address[locale]}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {selectedEcoLodge.featured && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black">
                          Featured
                        </Badge>
                      )}
                      {selectedEcoLodge.sustainability && (
                        <Badge className="bg-gradient-to-r from-emerald-400/20 to-green-400/20 text-emerald-300 border-emerald-400/30">
                          <Recycle className="w-3 h-3 mr-1" />
                          Eco
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-medium">{selectedEcoLodge.rating}</span>
                      <span className="text-white/50 text-sm">({selectedEcoLodge.reviews?.length || 0})</span>
                    </div>
                    <Badge className="bg-white/10 text-white/70">
                      {selectedEcoLodge.priceRange}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-emerald-400/20 to-green-400/20 text-emerald-300 border-emerald-400/30">
                      {ecoLodgeCategories.find(c => c.id === selectedEcoLodge.category)?.[locale] || selectedEcoLodge.category}
                    </Badge>
                  </div>

                  {/* Sustainability Features */}
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {selectedEcoLodge.solarPower && (
                      <Badge className="bg-yellow-400/20 text-yellow-300 border-yellow-400/30 text-xs">
                        ☀️ Solar
                      </Badge>
                    )}
                    {selectedEcoLodge.organicFood && (
                      <Badge className="bg-green-400/20 text-green-300 border-green-400/30 text-xs">
                        🥬 Organic
                      </Badge>
                    )}
                    {selectedEcoLodge.waterConservation && (
                      <Badge className="bg-blue-400/20 text-blue-300 border-blue-400/30 text-xs">
                        💧 Water
                      </Badge>
                    )}
                    {selectedEcoLodge.localMaterials && (
                      <Badge className="bg-amber-400/20 text-amber-300 border-amber-400/30 text-xs">
                        🏗️ Local
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <Button size="sm" className="bg-gradient-to-r from-emerald-400 to-green-400 text-white">
                      <Navigation className="w-3 h-3 mr-1" />
                      {locale === 'es' ? 'Direcciones' : 'Directions'}
                    </Button>
                    {selectedEcoLodge.contact?.phone && (
                      <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                        <Phone className="w-3 h-3" />
                      </Button>
                    )}
                    {selectedEcoLodge.contact?.website && (
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