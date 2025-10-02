'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { notFound } from 'next/navigation'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import * as turf from '@turf/turf'
import { Locale } from '@/lib/i18n'

interface StoreLocation {
  id: string
  name: string
  address: string
  phone: string
  category: string
  hours: string
  description: string
  coordinates: [number, number]
  website?: string
  image?: string
  distance?: number
}

const tepoztlanStores: StoreLocation[] = [
  // Restaurants
  {
    id: 'rest-1',
    name: 'El Ciruelo',
    address: 'Av. Revolución 13, Centro, Tepoztlán',
    phone: '+52 739 395 1203',
    category: 'restaurant',
    hours: '8:00 AM - 10:00 PM',
    description: 'Traditional Mexican cuisine with a modern twist. Famous for their mole and local specialties.',
    coordinates: [-99.1030, 18.9850],
    website: 'https://elciruelo.com.mx'
  },
  {
    id: 'rest-2', 
    name: 'La Sombra del Sabino',
    address: 'Calle Tepozteco 13, Centro, Tepoztlán',
    phone: '+52 739 395 0349',
    category: 'restaurant',
    hours: '9:00 AM - 11:00 PM',
    description: 'Cozy restaurant serving authentic Morelos cuisine in a beautiful garden setting.',
    coordinates: [-99.1025, 18.9845]
  },
  {
    id: 'rest-3',
    name: 'Los Colorines',
    address: 'Av. del Tepozteco 13, Centro, Tepoztlán',
    phone: '+52 739 395 0198',
    category: 'restaurant', 
    hours: '8:00 AM - 9:00 PM',
    description: 'Family-run restaurant specializing in traditional Mexican breakfast and comida corrida.',
    coordinates: [-99.1035, 18.9855]
  },
  // Hotels
  {
    id: 'hotel-1',
    name: 'Hotel Posada del Tepozteco',
    address: 'Calle del Paraíso 3, Centro, Tepoztlán',
    phone: '+52 739 395 0010',
    category: 'hotel',
    hours: '24 hours',
    description: 'Charming boutique hotel with panoramic views of the Tepozteco mountains.',
    coordinates: [-99.1040, 18.9840],
    website: 'https://posadadeltepozteco.com'
  },
  {
    id: 'hotel-2',
    name: 'Casa Bugambilia',
    address: 'Calle Revolución 8, Centro, Tepoztlán',
    phone: '+52 739 395 1348',
    category: 'hotel',
    hours: '24 hours',
    description: 'Eco-friendly bed & breakfast with beautiful gardens and sustainable practices.',
    coordinates: [-99.1020, 18.9865]
  },
  // Artesanías
  {
    id: 'art-1',
    name: 'Mercado de Artesanías',
    address: 'Plaza Principal, Centro, Tepoztlán',
    phone: '+52 739 395 0000',
    category: 'artesanias',
    hours: '9:00 AM - 7:00 PM',
    description: 'Traditional crafts market featuring local artisans selling pottery, textiles, and jewelry.',
    coordinates: [-99.1028, 18.9848]
  },
  {
    id: 'art-2',
    name: 'Galería Amate',
    address: 'Av. Revolución 15, Centro, Tepoztlán',
    phone: '+52 739 395 1567',
    category: 'artesanias',
    hours: '10:00 AM - 6:00 PM',
    description: 'Contemporary art gallery showcasing works by local and national Mexican artists.',
    coordinates: [-99.1032, 18.9852]
  },
  // Cafes
  {
    id: 'cafe-1',
    name: 'Café Tepoztlán',
    address: 'Calle 5 de Mayo 21, Centro, Tepoztlán',
    phone: '+52 739 395 2234',
    category: 'cafe',
    hours: '7:00 AM - 7:00 PM',
    description: 'Specialty coffee roastery featuring local organic beans and fresh pastries.',
    coordinates: [-99.1038, 18.9858]
  },
  {
    id: 'cafe-2',
    name: 'Luna Llena Café',
    address: 'Av. del Tepozteco 8, Centro, Tepoztlán',
    phone: '+52 739 395 1876',
    category: 'cafe',
    hours: '6:30 AM - 9:00 PM',
    description: 'Bohemian café with live music, vegetarian options, and stunning mountain views.',
    coordinates: [-99.1042, 18.9862]
  },
  // Shops
  {
    id: 'shop-1',
    name: 'Farmacia San Miguel',
    address: 'Av. Revolución 25, Centro, Tepoztlán',
    phone: '+52 739 395 0567',
    category: 'pharmacy',
    hours: '8:00 AM - 10:00 PM',
    description: 'Full-service pharmacy with medical supplies and natural remedies.',
    coordinates: [-99.1026, 18.9856]
  },
  {
    id: 'shop-2',
    name: 'Tienda Naturista Tepoztlán',
    address: 'Calle Tepozteco 18, Centro, Tepoztlán',
    phone: '+52 739 395 1789',
    category: 'shop',
    hours: '9:00 AM - 7:00 PM',
    description: 'Natural health store selling herbs, supplements, and organic products.',
    coordinates: [-99.1033, 18.9849]
  }
]

const categories = [
  { id: 'all', name: 'All Businesses', emoji: '🏢' },
  { id: 'restaurant', name: 'Restaurants', emoji: '🍽️' },
  { id: 'hotel', name: 'Hotels', emoji: '🏨' },
  { id: 'cafe', name: 'Cafés', emoji: '☕' },
  { id: 'artesanias', name: 'Artesanías', emoji: '🎨' },
  { id: 'shop', name: 'Shops', emoji: '🛍️' },
  { id: 'pharmacy', name: 'Pharmacy', emoji: '💊' }
]

export default function StoreLocatorPage({ params }: { params: Promise<{ lang: Locale }> }) {
  // Disable in production
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }

  const [lang, setLang] = useState<Locale>('es')

  useEffect(() => {
    params.then(({ lang }) => setLang(lang))
  }, [params])
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStore, setSelectedStore] = useState<StoreLocation | null>(null)
  const [filteredStores, setFilteredStores] = useState<StoreLocation[]>(tepoztlanStores)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [sortByDistance, setSortByDistance] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)

  // Get user location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(lang === 'es' ? 'Geolocalización no soportada' : 'Geolocation not supported')
      return
    }

    setLocationError(null)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords: [number, number] = [position.coords.longitude, position.coords.latitude]
        setUserLocation(userCoords)
        
        if (map.current) {
          // Add user location marker
          new mapboxgl.Marker({ color: '#3b82f6' })
            .setLngLat(userCoords)
            .addTo(map.current)
            
          // Fly to user location
          map.current.flyTo({
            center: userCoords,
            zoom: 14,
            duration: 2000
          })
        }
      },
      (error) => {
        setLocationError(
          lang === 'es' 
            ? 'No se pudo obtener tu ubicación' 
            : 'Could not get your location'
        )
        console.error('Geolocation error:', error)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    )
  }

  // Calculate distances and sort stores
  const calculateDistances = useCallback((stores: StoreLocation[]) => {
    if (!userLocation) return stores

    return stores.map(store => ({
      ...store,
      distance: turf.distance(
        turf.point(userLocation),
        turf.point(store.coordinates),
        { units: 'kilometers' }
      )
    }))
  }, [userLocation])

  // Filter stores based on category and search query
  useEffect(() => {
    let filtered = tepoztlanStores

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(store => store.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(store => 
        store.name.toLowerCase().includes(query) ||
        store.description.toLowerCase().includes(query) ||
        store.address.toLowerCase().includes(query)
      )
    }

    // Calculate distances if user location is available
    if (userLocation) {
      filtered = calculateDistances(filtered)
    }

    // Sort by distance if enabled
    if (sortByDistance && userLocation) {
      filtered = filtered.sort((a, b) => (a.distance || 0) - (b.distance || 0))
    }

    setFilteredStores(filtered)
  }, [selectedCategory, searchQuery, userLocation, sortByDistance, calculateDistances])

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

    if (!mapboxgl.accessToken) {
      console.error('Mapbox access token not found')
      return
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-99.1030, 18.9850], // Tepoztlán center
      zoom: 15,
      bearing: 0,
      pitch: 0
    })

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-left')

    map.current.on('load', () => {
      setMapLoaded(true)
      
      // Auto-hide default Mapbox POIs to make custom store markers more visible
      try {
        const mapInstance = map.current!
        const layers = mapInstance.getStyle().layers
        let hiddenCount = 0
        
        layers.forEach(layer => {
          if (layer.type === 'symbol' && 
              (layer.id.includes('poi') || 
               layer.id.includes('place-label') ||
               layer.id.includes('settlement-label') ||
               layer.id.includes('natural-label'))) {
            try {
              mapInstance.setLayoutProperty(layer.id, 'visibility', 'none')
              hiddenCount++
            } catch {
              // Ignore errors for layers that can't be modified
            }
          }
        })
        
        console.log(`🚫 Hidden ${hiddenCount} default POI layers for cleaner map`)
      } catch (error) {
        console.log('⚠️ Could not hide POI layers:', error)
      }
      
      addStoreMarkers()
    })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Add store markers to map using symbol layers (like animated-markers page)
  const addStoreMarkers = useCallback(() => {
    if (!map.current) return

    const mapInstance = map.current

    try {
      console.log('🔍 Adding enhanced category-specific store markers...')
      
      // Create category-specific animated markers (inspired by animated-markers page)
      const categoryConfigs = [
        { name: 'restaurant', color: '#e53e3e', symbol: 'R', animation: 'heartbeat' },
        { name: 'hotel', color: '#3182ce', symbol: 'H', animation: 'glow' },
        { name: 'cafe', color: '#d69e2e', symbol: 'C', animation: 'ripple' },
        { name: 'artesanias', color: '#38a169', symbol: 'A', animation: 'heartbeat' },
        { name: 'shop', color: '#805ad5', symbol: 'S', animation: 'glow' },
        { name: 'pharmacy', color: '#dc2626', symbol: 'P', animation: 'ripple' }
      ]
      
      console.log('📊 Categories to create markers for:', categoryConfigs.map(c => c.name))

      // Create simple static markers for each category (more reliable)
      categoryConfigs.forEach((config) => {
        const size = 40
        
        // Create a canvas for the static marker
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const context = canvas.getContext('2d')
        
        if (context) {
          console.log(`🎨 Creating static marker for ${config.name}`)
          
          // Clear canvas
          context.clearRect(0, 0, size, size)
          
          // Draw circle background
          const centerX = size / 2
          const centerY = size / 2
          const radius = 16
          
          // Main circle
          context.beginPath()
          context.arc(centerX, centerY, radius, 0, Math.PI * 2)
          context.fillStyle = config.color
          context.fill()
          
          // White border
          context.strokeStyle = '#ffffff'
          context.lineWidth = 3
          context.stroke()
          
          // Add symbol/letter in center
          context.font = 'bold 16px Arial'
          context.textAlign = 'center'
          context.textBaseline = 'middle'
          context.fillStyle = '#ffffff'
          context.strokeStyle = '#000000'
          context.lineWidth = 1
          context.strokeText(config.symbol, centerX, centerY)
          context.fillText(config.symbol, centerX, centerY)
          
          // Get image data
          const imageData = context.getImageData(0, 0, size, size)
          const staticMarker = {
            width: size,
            height: size,
            data: new Uint8Array(imageData.data)
          }
          
          // Add the marker image to the map
          try {
            if (!mapInstance.hasImage(`marker-${config.name}`)) {
              mapInstance.addImage(`marker-${config.name}`, staticMarker)
              console.log(`✅ Added static marker for ${config.name}`)
              
              // Verify the image was actually added
              if (mapInstance.hasImage(`marker-${config.name}`)) {
                console.log(`✅ Confirmed marker-${config.name} exists in map`)
              } else {
                console.error(`❌ Failed to add marker-${config.name} to map!`)
              }
            } else {
              console.log(`⚠️ Marker image marker-${config.name} already exists`)
            }
          } catch (error) {
            console.error(`❌ Error adding marker image for ${config.name}:`, error)
          }
        } else {
          console.error(`❌ Failed to get canvas context for ${config.name}`)
        }
      })

      // Create GeoJSON data
      const storesGeoJSON = {
        type: 'FeatureCollection' as const,
        features: tepoztlanStores.map(store => ({
          type: 'Feature' as const,
          properties: {
            id: store.id,
            name: store.name,
            category: store.category,
            address: store.address,
            phone: store.phone,
            hours: store.hours,
            description: store.description,
            website: store.website
          },
          geometry: {
            type: 'Point' as const,
            coordinates: store.coordinates
          }
        }))
      }

      console.log('📍 GeoJSON data created with', storesGeoJSON.features.length, 'stores')
      console.log('🏪 Store categories in data:', storesGeoJSON.features.map(f => f.properties.category))
      console.log('🗄️ Unique categories:', [...new Set(storesGeoJSON.features.map(f => f.properties.category))])

      // Add source
      if (!mapInstance.getSource('stores')) {
        mapInstance.addSource('stores', {
          type: 'geojson',
          data: storesGeoJSON
        })
        console.log('✅ Added stores source')
      }

      // Add layer with category-specific icons
      if (!mapInstance.getLayer('store-markers')) {
        console.log('🎯 Adding store-markers layer...')
        mapInstance.addLayer({
          id: 'store-markers',
          type: 'symbol',
          source: 'stores',
          layout: {
            'icon-image': [
              'case',
              ['==', ['get', 'category'], 'restaurant'], 'marker-restaurant',
              ['==', ['get', 'category'], 'hotel'], 'marker-hotel',
              ['==', ['get', 'category'], 'cafe'], 'marker-cafe',
              ['==', ['get', 'category'], 'artesanias'], 'marker-artesanias',
              ['==', ['get', 'category'], 'shop'], 'marker-shop',
              ['==', ['get', 'category'], 'pharmacy'], 'marker-pharmacy',
              'marker-restaurant' // fallback
            ],
            'icon-size': 0.7,
            'icon-allow-overlap': true,
            'icon-ignore-placement': true,
            'text-field': ['get', 'name'],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 2.5],
            'text-anchor': 'top',
            'text-size': 11
          },
          paint: {
            'text-color': '#2d3748',
            'text-halo-color': '#ffffff',
            'text-halo-width': 2
          }
        })
        console.log('✅ Added store-markers layer')
        
        // Debug: Check if all store categories have corresponding marker images
        const storeCategoriesInData = [...new Set(storesGeoJSON.features.map(f => f.properties.category))]
        const markerImageNames = categoryConfigs.map(c => `marker-${c.name}`)
        console.log('🔍 Store categories in data:', storeCategoriesInData)
        console.log('🔍 Marker images created:', markerImageNames)
        
        storeCategoriesInData.forEach(category => {
          const hasMarkerImage = mapInstance.hasImage(`marker-${category}`)
          console.log(`🔍 Category "${category}" has marker image: ${hasMarkerImage}`)
          if (!hasMarkerImage) {
            console.error(`❌ CRITICAL: Missing marker image for category "${category}"! Stores with this category will not display!`)
          }
        })
        
        // Also log all available images
        console.log('🖼️ All available marker images:', categoryConfigs.map(c => `marker-${c.name}`).filter(name => mapInstance.hasImage(name)))
      }

      // Add click handler
      mapInstance.on('click', 'store-markers', (e) => {
        if (!e.features?.[0]) return
        
        const feature = e.features[0]
        const storeId = feature.properties?.id
        const store = tepoztlanStores.find(s => s.id === storeId)
        
        if (store) {
          setSelectedStore(store)
          flyToStore(store)
        }
      })

      // Change cursor on hover
      mapInstance.on('mouseenter', 'store-markers', () => {
        mapInstance.getCanvas().style.cursor = 'pointer'
      })

      mapInstance.on('mouseleave', 'store-markers', () => {
        mapInstance.getCanvas().style.cursor = ''
      })
      
      console.log('🎉 Store markers setup complete!')
      
    } catch (error) {
      console.error('❌ Error adding store markers:', error)
    }
  }, [])

  // Update map markers when filters change
  useEffect(() => {
    if (!map.current) return

    const mapInstance = map.current

    const applyFilter = () => {
      // Check if the layer exists before setting filter
      if (mapInstance.getLayer('store-markers')) {
        console.log(`🔍 Filtering markers for category: ${selectedCategory}`)
        
        try {
          // Update map filter
          if (selectedCategory === 'all') {
            mapInstance.setFilter('store-markers', null)
            console.log('✅ Showing all markers (filter removed)')
          } else {
            mapInstance.setFilter('store-markers', ['==', ['get', 'category'], selectedCategory])
            console.log(`✅ Filtered to show only: ${selectedCategory}`)
          }
        } catch (error) {
          console.error('❌ Error applying filter:', error)
        }
      } else {
        console.log('⚠️ store-markers layer not found, retrying in 100ms...')
        // Retry after a small delay if layer not ready
        setTimeout(applyFilter, 100)
      }
    }

    applyFilter()
  }, [selectedCategory, mapLoaded])

  const flyToStore = (store: StoreLocation) => {
    if (!map.current) return

    map.current.flyTo({
      center: store.coordinates,
      zoom: 17,
      duration: 1000
    })
  }

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category)
    return cat?.emoji || '🏢'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">
            {lang === 'es' ? 'Localizador de Negocios - Tepoztlán' : 'Business Locator - Tepoztlán'}
          </h1>
          <p className="text-gray-600 mt-2">
            {lang === 'es' 
              ? 'Encuentra restaurantes, hoteles, tiendas y más en el hermoso pueblo mágico de Tepoztlán' 
              : 'Find restaurants, hotels, shops and more in the beautiful magical town of Tepoztlán'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Search and Location */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {lang === 'es' ? 'Buscar Negocios' : 'Search Businesses'}
              </h2>
              <input
                type="text"
                placeholder={lang === 'es' ? 'Buscar por nombre, tipo o dirección...' : 'Search by name, type or address...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              />
              
              {/* Location Controls */}
              <div className="space-y-3">
                <button
                  onClick={getUserLocation}
                  disabled={!!userLocation}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                    userLocation
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {userLocation 
                    ? (lang === 'es' ? 'Ubicación obtenida' : 'Location found')
                    : (lang === 'es' ? 'Obtener mi ubicación' : 'Get my location')
                  }
                </button>
                
                {locationError && (
                  <p className="text-sm text-red-600">{locationError}</p>
                )}
                
                {userLocation && (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={sortByDistance}
                      onChange={(e) => setSortByDistance(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      {lang === 'es' ? 'Ordenar por distancia' : 'Sort by distance'}
                    </span>
                  </label>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {lang === 'es' ? 'Filtrar por Categoría' : 'Filter by Category'}
              </h2>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center gap-3 ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="text-lg">{category.emoji}</span>
                    <span className="font-medium">{category.name}</span>
                    <span className="ml-auto text-sm text-gray-500">
                      {category.id === 'all' ? tepoztlanStores.length : tepoztlanStores.filter(s => s.category === category.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Store Listings */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  {lang === 'es' ? 'Resultados' : 'Results'} ({filteredStores.length})
                </h2>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {filteredStores.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    {lang === 'es' ? 'No se encontraron resultados' : 'No results found'}
                  </div>
                ) : (
                  filteredStores.map(store => (
                    <div
                      key={store.id}
                      onClick={() => {
                        setSelectedStore(store)
                        flyToStore(store)
                      }}
                      className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedStore?.id === store.id ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{getCategoryIcon(store.category)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 truncate">{store.name}</h3>
                            {store.distance && (
                              <span className="text-sm font-medium text-blue-600 ml-2">
                                {store.distance.toFixed(1)} km
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{store.address}</p>
                          <p className="text-sm text-gray-500 mt-1">{store.hours}</p>
                          {store.phone && (
                            <p className="text-sm text-blue-600 mt-1">{store.phone}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div 
                ref={mapContainer}
                className="w-full h-96 lg:h-[600px]"
              />
              
              {/* Store Details Panel */}
              {selectedStore && (
                <div className="p-6 border-t bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{getCategoryIcon(selectedStore.category)}</span>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{selectedStore.name}</h3>
                          <p className="text-sm text-gray-600">{selectedStore.address}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{selectedStore.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {lang === 'es' ? 'Horarios' : 'Hours'}
                          </p>
                          <p className="text-sm text-gray-600">{selectedStore.hours}</p>
                        </div>
                        
                        {selectedStore.phone && (
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {lang === 'es' ? 'Teléfono' : 'Phone'}
                            </p>
                            <a 
                              href={`tel:${selectedStore.phone}`}
                              className="text-sm text-blue-600 hover:text-blue-800"
                            >
                              {selectedStore.phone}
                            </a>
                          </div>
                        )}
                        
                        {selectedStore.website && (
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {lang === 'es' ? 'Sitio Web' : 'Website'}
                            </p>
                            <a 
                              href={selectedStore.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:text-blue-800"
                            >
                              {lang === 'es' ? 'Visitar sitio' : 'Visit website'}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setSelectedStore(null)}
                      className="ml-4 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}