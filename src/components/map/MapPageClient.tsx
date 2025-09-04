'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Style, Circle, Fill, Stroke, Text } from 'ol/style'
import { fromLonLat } from 'ol/proj'
import { Locale } from '@/lib/i18n'
import { BusinessLocation, MapService, categoryStyles, TEPOZTLAN_CENTER } from '@/lib/map'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  MapPin, 
  Star, 
  Filter, 
  X,
  ZoomIn,
  ZoomOut,
  Locate,
  Phone,
  Clock,
  Globe
} from 'lucide-react'

// Import OpenLayers CSS
import 'ol/ol.css'

interface MapPageClientProps {
  locale: Locale
}


export default function MapPageClient({ locale }: MapPageClientProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<Map | null>(null)
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessLocation | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [businesses] = useState<BusinessLocation[]>(MapService.searchBusinesses('', 'all'))

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Tepoztlán center coordinates
    const tepoztlanCenter = fromLonLat(TEPOZTLAN_CENTER)

    // Create vector layer for business markers
    const vectorSource = new VectorSource()
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    })

    // Create map
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer
      ],
      view: new View({
        center: tepoztlanCenter,
        zoom: 15,
      }),
    })

    mapInstanceRef.current = map
    setMapLoaded(true)

    // Add business markers
    businesses.forEach((business) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(business.coordinates)),
        business: business
      })

      const categoryStyle = categoryStyles[business.category as keyof typeof categoryStyles]
      
      feature.setStyle(new Style({
        image: new Circle({
          radius: 12,
          fill: new Fill({
            color: categoryStyle.color
          }),
          stroke: new Stroke({
            color: '#ffffff',
            width: 3
          })
        }),
        text: new Text({
          text: categoryStyle.emoji,
          font: '16px Arial',
          offsetY: 1
        })
      }))

      vectorSource.addFeature(feature)
    })

    // Handle click events
    map.on('click', (event) => {
      const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => feature)
      if (feature) {
        const business = feature.get('business') as BusinessLocation
        setSelectedBusiness(business)
      } else {
        setSelectedBusiness(null)
      }
    })

    return () => {
      map.setTarget('')
    }
  }, [businesses])

  const filteredBusinesses = MapService.searchBusinesses(searchQuery, selectedCategory)

  const flyToLocation = useCallback((coordinates: [number, number]) => {
    if (mapInstanceRef.current) {
      const view = mapInstanceRef.current.getView()
      view.animate({
        center: fromLonLat(coordinates),
        zoom: 17,
        duration: 1000
      })
    }
  }, [])

  const categories = [
    { id: 'all', nameEs: 'Todos', nameEn: 'All', emoji: '🗺️' },
    ...Object.entries(categoryStyles).map(([key, value]) => ({
      id: key,
      nameEs: value.name.es,
      nameEn: value.name.en,
      emoji: value.emoji
    }))
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Ultra Premium Background */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-sky-500/10 rounded-full blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Premium mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_transparent,_rgba(59,130,246,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(14,165,233,0.2))]" />
      </div>

      <div className="relative z-10 h-screen flex">
        {/* Left Sidebar */}
        <div className="w-96 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-white font-sans mb-2">
                {locale === 'es' ? 'Mapa de ' : 'Map of '}
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-sky-300 bg-clip-text text-transparent">
                  <span className="text-cyan-300">TODO</span>TEPOZ
                </span>
              </h1>
              <p className="text-white/70 text-sm">
                {locale === 'es' 
                  ? 'Explora negocios en Tepoztlán' 
                  : 'Explore businesses in Tepoztlán'
                }
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <Input
                type="text"
                placeholder={locale === 'es' ? 'Buscar negocios...' : 'Search businesses...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
            >
              <Filter className="w-4 h-4 mr-2" />
              {locale === 'es' ? 'Categorías' : 'Categories'}
            </Button>

            {/* Categories */}
            {showFilters && (
              <div className="mt-4 space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    className={`w-full justify-start text-left ${
                      selectedCategory === category.id 
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-400 text-white' 
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="mr-2">{category.emoji}</span>
                    {locale === 'es' ? category.nameEs : category.nameEn}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Business List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredBusinesses.map((business) => (
              <Card 
                key={business.id}
                className={`bg-white/10 backdrop-blur-sm border-white/20 cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] ${
                  selectedBusiness?.id === business.id ? 'bg-white/20 scale-[1.02]' : ''
                }`}
                onClick={() => {
                  setSelectedBusiness(business)
                  flyToLocation(business.coordinates)
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-white text-sm">
                      {MapService.getBusinessName(business, locale)}
                    </h3>
                    <span className="text-lg">
                      {categoryStyles[business.category as keyof typeof categoryStyles]?.emoji}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-white/80 text-xs ml-1">{business.rating}</span>
                    </div>
                    <span className="text-cyan-400 text-xs font-medium">{business.priceRange}</span>
                  </div>
                  
                  <p className="text-white/60 text-xs mb-2">{MapService.getBusinessAddress(business, locale)}</p>
                  
                  {MapService.getBusinessHours(business, locale) && (
                    <div className="flex items-center text-white/50 text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {MapService.getBusinessHours(business, locale)}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <div className="p-4 border-t border-white/10">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-white mb-1">{filteredBusinesses.length}</p>
              <p className="text-white/70 text-sm">
                {locale === 'es' ? 'negocios encontrados' : 'businesses found'}
              </p>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          <div ref={mapRef} className="w-full h-full" />
          
          {/* Map Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <Button
              onClick={() => {
                if (mapInstanceRef.current) {
                  const view = mapInstanceRef.current.getView()
                  view.animate({ zoom: view.getZoom()! + 1, duration: 200 })
                }
              }}
              className="w-10 h-10 p-0 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => {
                if (mapInstanceRef.current) {
                  const view = mapInstanceRef.current.getView()
                  view.animate({ zoom: view.getZoom()! - 1, duration: 200 })
                }
              }}
              className="w-10 h-10 p-0 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => {
                if (mapInstanceRef.current) {
                  const view = mapInstanceRef.current.getView()
                  view.animate({
                    center: fromLonLat(TEPOZTLAN_CENTER),
                    zoom: 15,
                    duration: 1000
                  })
                }
              }}
              className="w-10 h-10 p-0 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
            >
              <Locate className="w-4 h-4" />
            </Button>
          </div>

          {/* Business Details Card */}
          {selectedBusiness && (
            <div className="absolute bottom-4 left-4 right-4">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {MapService.getBusinessName(selectedBusiness, locale)}
                      </h3>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white ml-1">{selectedBusiness.rating}</span>
                        </div>
                        <span className="text-cyan-400 font-medium">{selectedBusiness.priceRange}</span>
                        <Badge className="bg-white/20 text-white border-0">
                          {categoryStyles[selectedBusiness.category as keyof typeof categoryStyles]?.emoji}
                          <span className="ml-1">
                            {categories.find(cat => cat.id === selectedBusiness.category)?.[locale === 'es' ? 'nameEs' : 'nameEn']}
                          </span>
                        </Badge>
                      </div>
                    </div>
                    <Button
                      onClick={() => setSelectedBusiness(null)}
                      className="w-8 h-8 p-0 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center text-white/80">
                      <MapPin className="w-4 h-4 mr-2 text-cyan-400" />
                      {MapService.getBusinessAddress(selectedBusiness, locale)}
                    </div>
                    {selectedBusiness.phone && (
                      <div className="flex items-center text-white/80">
                        <Phone className="w-4 h-4 mr-2 text-cyan-400" />
                        {selectedBusiness.phone}
                      </div>
                    )}
                    {MapService.getBusinessHours(selectedBusiness, locale) && (
                      <div className="flex items-center text-white/80">
                        <Clock className="w-4 h-4 mr-2 text-cyan-400" />
                        {MapService.getBusinessHours(selectedBusiness, locale)}
                      </div>
                    )}
                    {selectedBusiness.website && (
                      <div className="flex items-center text-white/80">
                        <Globe className="w-4 h-4 mr-2 text-cyan-400" />
                        {selectedBusiness.website}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 mt-4">
                    <Button className="bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-500 hover:to-blue-500 text-white border-0 flex-1">
                      {locale === 'es' ? 'Ver Detalles' : 'View Details'}
                    </Button>
                    <Button className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-0">
                      {locale === 'es' ? 'Llamar' : 'Call'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Map Loading Indicator */}
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                <p className="text-white">
                  {locale === 'es' ? 'Cargando mapa...' : 'Loading map...'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}