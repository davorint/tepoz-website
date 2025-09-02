'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Navigation, Mountain, Camera, Utensils, Hotel } from 'lucide-react'
import { Locale } from '@/lib/i18n'

// Import OpenLayers (we'll use dynamic import to avoid SSR issues)
let Map: unknown
let View: unknown
let TileLayer: unknown
let VectorLayer: unknown
let VectorSource: unknown
let Feature: unknown
let Point: unknown
let Style: unknown
let Icon: unknown
let OSM: unknown

interface InteractiveMapSectionProps {
  lang: Locale
}

const attractions = [
  {
    id: 1,
    name: 'Pirámide del Tepozteco',
    type: 'attraction',
    coordinates: [-99.0963, 18.9847],
    icon: Mountain,
    color: 'text-green-600'
  },
  {
    id: 2,
    name: 'Mercado de Tepoztlán',
    type: 'market',
    coordinates: [-99.0967, 18.9841],
    icon: Camera,
    color: 'text-blue-600'
  },
  {
    id: 3,
    name: 'Los Colorines Restaurant',
    type: 'restaurant',
    coordinates: [-99.0965, 18.9845],
    icon: Utensils,
    color: 'text-red-600'
  },
  {
    id: 4,
    name: 'Casa Fernanda Hotel',
    type: 'hotel',
    coordinates: [-99.0961, 18.9843],
    icon: Hotel,
    color: 'text-purple-600'
  }
]

export default function InteractiveMapSection({ lang }: InteractiveMapSectionProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedAttraction, setSelectedAttraction] = useState<typeof attractions[0] | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [olMap, setOlMap] = useState<unknown>(null)

  useEffect(() => {
    const loadOpenLayers = async () => {
      try {
        // Only load on client side
        if (typeof window === 'undefined') return
        
        const olModules = await Promise.all([
          import('ol/Map'),
          import('ol/View'),
          import('ol/layer/Tile'),
          import('ol/layer/Vector'),
          import('ol/source/Vector'),
          import('ol/Feature'),
          import('ol/geom/Point'),
          import('ol/style/Style'),
          import('ol/style/Icon'),
          import('ol/source/OSM')
        ])

        Map = olModules[0].default
        View = olModules[1].default
        TileLayer = olModules[2].default
        VectorLayer = olModules[3].default
        VectorSource = olModules[4].default
        Feature = olModules[5].default
        Point = olModules[6].default
        Style = olModules[7].default
        Icon = olModules[8].default
        OSM = olModules[9].default
        
        setMapLoaded(true)
      } catch (error) {
        console.error('Failed to load OpenLayers:', error)
        setMapLoaded(false)
      }
    }

    loadOpenLayers()
  }, [])

  useEffect(() => {
    if (!mapLoaded || !mapRef.current || olMap) return

    // Tepoztlán coordinates
    const tepoztlanCoords = [-99.0967, 18.9841]

    // Create vector source for markers
    const vectorSource = new VectorSource()

    // Add attraction markers
    attractions.forEach((attraction) => {
      const feature = new Feature({
        geometry: new Point(attraction.coordinates),
        name: attraction.name,
        type: attraction.type,
        id: attraction.id
      })

      vectorSource.addFeature(feature)
    })

    // Create vector layer for markers
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new Icon({
          src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
          scale: 1.5,
        })
      })
    })

    // Create the map
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new View({
        center: tepoztlanCoords,
        zoom: 15,
        projection: 'EPSG:4326'
      })
    })

    // Add click handler for markers
    map.on('click', (evt: unknown) => {
      const feature = map.forEachFeatureAtPixel((evt as any).pixel, (feature: unknown) => feature)
      if (feature) {
        const attraction = attractions.find(a => a.id === feature.get('id'))
        setSelectedAttraction(attraction)
      } else {
        setSelectedAttraction(null)
      }
    })

    setOlMap(map)

    return () => {
      map.setTarget(undefined)
    }
  }, [mapLoaded, olMap])

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-green-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent">
            {lang === 'es' ? 'Explora Tepoztlán' : 'Explore Tepoztlán'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {lang === 'es' 
              ? 'Descubre la ubicación exacta de cada atracción, restaurante y hotel en nuestro mapa interactivo'
              : 'Discover the exact location of each attraction, restaurant and hotel on our interactive map'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="overflow-hidden border-0 bg-white/60 backdrop-blur-md shadow-xl">
              <CardContent className="p-0">
                <div 
                  ref={mapRef} 
                  className="w-full h-96 lg:h-[500px] bg-gray-200 relative"
                  style={{ minHeight: '400px' }}
                >
                  {!mapLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="text-center">
                        <div className="w-8 h-8 border-4 border-tepoztlan-sunset border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-gray-600">
                          {lang === 'es' ? 'Cargando mapa...' : 'Loading map...'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Attractions List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              {lang === 'es' ? 'Puntos de Interés' : 'Points of Interest'}
            </h3>
            
            {attractions.map((attraction, index) => (
              <motion.div
                key={attraction.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-0 bg-white/60 backdrop-blur-md ${
                    selectedAttraction?.id === attraction.id 
                      ? 'ring-2 ring-tepoztlan-sunset bg-white/80' 
                      : 'hover:bg-white/70'
                  }`}
                  onClick={() => setSelectedAttraction(attraction)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${attraction.color}`}>
                        <attraction.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{attraction.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {attraction.coordinates[0].toFixed(4)}, {attraction.coordinates[1].toFixed(4)}
                          </span>
                        </div>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="bg-tepoztlan-sunset/10 text-tepoztlan-sunset border-tepoztlan-sunset/20"
                      >
                        {attraction.type}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Map Navigation Buttons */}
            <div className="space-y-3 pt-4">
              <Button 
                variant="outline" 
                className="w-full bg-white/60 backdrop-blur-md border-white/30 hover:bg-white/80"
              >
                <Navigation className="w-4 h-4 mr-2" />
                {lang === 'es' ? 'Obtener Direcciones' : 'Get Directions'}
              </Button>
              <Button 
                variant="outline"
                className="w-full bg-white/60 backdrop-blur-md border-white/30 hover:bg-white/80"
              >
                <Camera className="w-4 h-4 mr-2" />
                {lang === 'es' ? 'Vista 360°' : '360° View'}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Selected Attraction Details */}
        {selectedAttraction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            <Card className="border-0 bg-white/80 backdrop-blur-md shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${selectedAttraction.color}`}>
                    <selectedAttraction.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedAttraction.name}</h3>
                    <p className="text-gray-600">
                      {lang === 'es' ? 'Punto seleccionado en el mapa' : 'Selected point on the map'}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="bg-tepoztlan-sunset hover:bg-tepoztlan-sunset/90">
                    {lang === 'es' ? 'Ver Detalles' : 'View Details'}
                  </Button>
                  <Button variant="outline">
                    {lang === 'es' ? 'Compartir' : 'Share'}
                  </Button>
                  <Button variant="outline">
                    {lang === 'es' ? 'Guardar' : 'Save'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  )
}