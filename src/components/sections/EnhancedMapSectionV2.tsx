'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search,
  Star,
  Sparkles,
  Clock,
  X
} from 'lucide-react'
import { Locale } from '@/lib/i18n'
import dynamic from 'next/dynamic'
import { 
  tepoztlanPlaces, 
  getFeaturedPlaces, 
  getCategoryCount, 
  searchPlaces,
  getPriceSymbol,
  type Place 
} from '@/data/tepoztlan-places'

const MapTiler3DDebug = dynamic(() => import('@/components/map/MapTiler3DDebug'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[700px] bg-gradient-to-br from-slate-800/80 to-slate-900/80 relative rounded-2xl overflow-hidden flex items-center justify-center border-2 border-slate-600/50">
      <div className="text-center text-white">
        <div className="text-6xl mb-4">🗺️</div>
        <p className="text-xl font-semibold text-slate-300">Cargando mapa 3D...</p>
      </div>
    </div>
  )
})

interface EnhancedMapSectionV2Props {
  lang: Locale
}

export default function EnhancedMapSectionV2({ lang }: EnhancedMapSectionV2Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null)
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>(tepoztlanPlaces)
  const [sortBy, setSortBy] = useState('featured')
  
  const categoryCount = getCategoryCount()
  const totalPlaces = tepoztlanPlaces.length

  // Filter and sort places
  useEffect(() => {
    let places = [...tepoztlanPlaces]
    
    // Filter by category
    if (selectedCategory !== 'all') {
      places = places.filter(p => p.category === selectedCategory)
    }
    
    // Filter by search query
    if (searchQuery) {
      places = searchPlaces(searchQuery, lang)
    }
    
    // Sort places
    switch (sortBy) {
      case 'rating':
        places.sort((a, b) => b.rating - a.rating)
        break
      case 'name':
        places.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'price':
        places.sort((a, b) => a.priceLevel - b.priceLevel)
        break
      case 'featured':
      default:
        places.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return b.rating - a.rating
        })
    }
    
    setFilteredPlaces(places)
  }, [searchQuery, selectedCategory, sortBy, lang])

  const categories = [
    { id: 'all', name: lang === 'es' ? 'Todos' : 'All', icon: '📍', color: 'from-emerald-400 to-cyan-400' },
    { id: 'attraction', name: lang === 'es' ? 'Atracciones' : 'Attractions', icon: '🏔️', color: 'from-green-400 to-emerald-400' },
    { id: 'restaurant', name: lang === 'es' ? 'Restaurantes' : 'Restaurants', icon: '🍽️', color: 'from-orange-400 to-red-400' },
    { id: 'hotel', name: lang === 'es' ? 'Hoteles' : 'Hotels', icon: '🏨', color: 'from-purple-400 to-pink-400' },
    { id: 'cafe', name: lang === 'es' ? 'Cafeterías' : 'Cafes', icon: '☕', color: 'from-violet-400 to-purple-400' },
    { id: 'shopping', name: lang === 'es' ? 'Compras' : 'Shopping', icon: '🛍️', color: 'from-pink-400 to-rose-400' },
    { id: 'culture', name: lang === 'es' ? 'Cultura' : 'Culture', icon: '🎨', color: 'from-blue-400 to-indigo-400' },
    { id: 'bar', name: lang === 'es' ? 'Bares' : 'Bars', icon: '🍺', color: 'from-red-400 to-orange-400' }
  ]

  const handlePlaceSelect = (placeId: string) => {
    setSelectedPlace(placeId)
    const place = tepoztlanPlaces.find(p => p.id === placeId)
    if (place) {
      // Scroll to place in sidebar if it exists
      const element = document.getElementById(`place-${placeId}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // Trigger search
      console.log('Searching for:', searchQuery)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden font-sans">
      {/* Ultra Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_transparent,_rgba(16,185,129,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(6,182,212,0.2))]" />
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-emerald-400" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 blur-lg" />
              <Badge className="relative bg-gradient-to-r from-emerald-400 to-cyan-400 text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                🗺️ {lang === 'es' ? 'Mapa Interactivo' : 'Interactive Map'} 🗺️
              </Badge>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-white drop-shadow-2xl">
              {lang === 'es' ? 'Explora ' : 'Explore '}
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent drop-shadow-2xl">
              TEPOZTLÁN
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-4xl mx-auto leading-relaxed mb-8">
            {lang === 'es' 
              ? 'Descubre lugares mágicos, restaurantes excepcionales y experiencias únicas en nuestro pueblo mágico'
              : 'Discover magical places, exceptional restaurants and unique experiences in our magical town'
            }
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-emerald-400 mb-2">{totalPlaces}</div>
              <div className="text-white/70 text-sm">{lang === 'es' ? 'Lugares' : 'Places'}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-cyan-400 mb-2">4.7</div>
              <div className="text-white/70 text-sm">{lang === 'es' ? 'Calificación' : 'Rating'}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-blue-400 mb-2">8</div>
              <div className="text-white/70 text-sm">{lang === 'es' ? 'Categorías' : 'Categories'}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {getFeaturedPlaces().length}
              </div>
              <div className="text-white/70 text-sm">{lang === 'es' ? 'Destacados' : 'Featured'}</div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Search and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 shadow-2xl">
            {/* *** FUNCTIONAL SEARCH BAR *** */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <Input
                  type="text"
                  placeholder={lang === 'es' ? 'Buscar lugares, restaurantes, hoteles...' : 'Search places, restaurants, hotels...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-12 pr-20 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:bg-white/15 focus:border-emerald-400 transition-all"
                />
                {searchQuery && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white p-1 h-auto"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="featured" className="text-white">
                    {lang === 'es' ? 'Destacados' : 'Featured'}
                  </SelectItem>
                  <SelectItem value="rating" className="text-white">
                    {lang === 'es' ? 'Mejor Calificados' : 'Highest Rated'}
                  </SelectItem>
                  <SelectItem value="name" className="text-white">
                    {lang === 'es' ? 'Nombre' : 'Name'}
                  </SelectItem>
                  <SelectItem value="price" className="text-white">
                    {lang === 'es' ? 'Precio' : 'Price'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Enhanced Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white/70 text-sm">
                    {filteredPlaces.length} {lang === 'es' ? 'resultados' : 'results'}
                  </span>
                  <div className="w-px h-4 bg-white/20 mx-2" />
                  <Clock className="w-3 h-3 text-white/50" />
                  <span className="text-white/50 text-xs">0.1s</span>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 flex-wrap">
                {categories.map(cat => {
                  const count = cat.id === 'all' ? totalPlaces : (categoryCount[cat.id] || 0)
                  const isActive = selectedCategory === cat.id
                  
                  return (
                    <Badge 
                      key={cat.id}
                      className={`cursor-pointer px-4 py-2 transition-all ${
                        isActive 
                          ? `bg-gradient-to-r ${cat.color} text-white border-0`
                          : 'bg-white/10 text-white/70 hover:bg-white/20 border-white/20'
                      }`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      <span className="mr-1">{cat.icon}</span>
                      {cat.name}
                      <span className="ml-2 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                        {count}
                      </span>
                    </Badge>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* MAIN CONTENT - MAP + SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D MAP - LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="overflow-hidden border-0 bg-white/5 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-0">
                <div className="w-full h-[700px] relative rounded-2xl overflow-hidden">
                  <MapTiler3DDebug 
                    className="rounded-2xl"
                    onPlaceSelect={handlePlaceSelect}
                    selectedCategory={selectedCategory}
                    searchQuery={searchQuery}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* DYNAMIC SIDEBAR - RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4 max-h-[700px] overflow-y-auto pr-2"
          >
            <h3 className="text-2xl font-bold text-white mb-6 sticky top-0 bg-gradient-to-b from-slate-900 to-transparent pb-4">
              {selectedCategory === 'all' 
                ? (lang === 'es' ? 'Todos los Lugares' : 'All Places')
                : categories.find(c => c.id === selectedCategory)?.name
              }
            </h3>
            
            <div className="space-y-4">
              {filteredPlaces.length === 0 ? (
                <Card className="border-0 bg-white/5 backdrop-blur-xl">
                  <CardContent className="p-6 text-center">
                    <p className="text-white/60">
                      {lang === 'es' ? 'No se encontraron lugares' : 'No places found'}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredPlaces.slice(0, 10).map(place => {
                  const categoryInfo = categories.find(c => c.id === place.category)
                  const isSelected = selectedPlace === place.id
                  
                  return (
                    <Card 
                      key={place.id}
                      id={`place-${place.id}`}
                      className={`border-0 backdrop-blur-xl transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-white/15 ring-2 ring-emerald-400' 
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                      onClick={() => handlePlaceSelect(place.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${categoryInfo?.color} flex items-center justify-center flex-shrink-0`}>
                            <span className="text-lg">{categoryInfo?.icon}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white text-sm truncate">
                              {lang === 'en' && place.nameEn ? place.nameEn : place.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-white/70">{place.rating}</span>
                              <span className="text-xs text-white/50">•</span>
                              <span className="text-xs text-white/70">
                                {getPriceSymbol(place.priceLevel)}
                              </span>
                            </div>
                            <p className="text-xs text-white/60 mt-2 line-clamp-2">
                              {lang === 'en' && place.descriptionEn 
                                ? place.descriptionEn 
                                : place.description
                              }
                            </p>
                            {place.hours && (
                              <p className="text-xs text-white/50 mt-2">
                                🕐 {place.hours}
                              </p>
                            )}
                          </div>
                          {place.featured && (
                            <Badge className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-400 border-yellow-400/30">
                              <Sparkles className="w-3 h-3" />
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              )}
            </div>

            {filteredPlaces.length > 10 && (
              <div className="text-center pt-4">
                <p className="text-white/50 text-sm">
                  {lang === 'es' 
                    ? `Mostrando 10 de ${filteredPlaces.length} lugares`
                    : `Showing 10 of ${filteredPlaces.length} places`
                  }
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}