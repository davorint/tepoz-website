'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { 
  MapPin, 
  Mountain, 
  Utensils, 
  Hotel,
  Search,
  Filter,
  X,
  Star,
  Clock,
  Sparkles,
  TrendingUp,
  Eye,
  Heart,
  Share2,
  Layers,
  Coffee,
  ShoppingBag,
  Palette,
  TreePine
} from 'lucide-react'
import { Locale } from '@/lib/i18n'

interface MinimalMapSectionProps {
  lang: Locale
}

// Premium attraction categories
const categoryStyles = {
  attraction: {
    icon: Mountain,
    color: 'from-emerald-400 to-green-500',
    shadowColor: 'shadow-emerald-500/30',
    emoji: '🏔️',
    nameEs: 'Atracciones',
    nameEn: 'Attractions'
  },
  restaurant: {
    icon: Utensils,
    color: 'from-orange-400 to-red-500',
    shadowColor: 'shadow-orange-500/30',
    emoji: '🍽️',
    nameEs: 'Restaurantes',
    nameEn: 'Restaurants'
  },
  hotel: {
    icon: Hotel,
    color: 'from-purple-400 to-indigo-500',
    shadowColor: 'shadow-purple-500/30',
    emoji: '🏨',
    nameEs: 'Hoteles',
    nameEn: 'Hotels'
  },
  cafe: {
    icon: Coffee,
    color: 'from-amber-400 to-yellow-500',
    shadowColor: 'shadow-amber-500/30',
    emoji: '☕',
    nameEs: 'Cafeterías',
    nameEn: 'Coffee Shops'
  },
  shopping: {
    icon: ShoppingBag,
    color: 'from-pink-400 to-rose-500',
    shadowColor: 'shadow-pink-500/30',
    emoji: '🛍️',
    nameEs: 'Compras',
    nameEn: 'Shopping'
  },
  culture: {
    icon: Palette,
    color: 'from-cyan-400 to-blue-500',
    shadowColor: 'shadow-cyan-500/30',
    emoji: '🎨',
    nameEs: 'Cultura',
    nameEn: 'Culture'
  },
  nature: {
    icon: TreePine,
    color: 'from-lime-400 to-green-500',
    shadowColor: 'shadow-lime-500/30',
    emoji: '🌲',
    nameEs: 'Naturaleza',
    nameEn: 'Nature'
  }
}

// Premium locations data
const attractions = [
  {
    id: 1,
    name: 'Pirámide del Tepozteco',
    nameEs: 'Pirámide del Tepozteco',
    nameEn: 'Tepozteco Pyramid',
    description: 'Ancient Aztec pyramid with breathtaking views',
    descriptionEs: 'Antigua pirámide azteca con vistas impresionantes',
    category: 'attraction',
    coordinates: [-99.0963, 18.9847],
    rating: 4.9,
    reviews: 3420,
    priceRange: '$$',
    hours: '8:00 AM - 5:00 PM',
    phone: '+52 739 395 0000',
    website: 'tepozteco.com',
    featured: true,
    tags: ['hiking', 'history', 'views']
  },
  {
    id: 2,
    name: 'Los Colorines',
    nameEs: 'Los Colorines',
    nameEn: 'Los Colorines Restaurant',
    description: 'Traditional Mexican cuisine with a modern twist',
    descriptionEs: 'Cocina mexicana tradicional con un toque moderno',
    category: 'restaurant',
    coordinates: [-99.0965, 18.9845],
    rating: 4.7,
    reviews: 892,
    priceRange: '$$$',
    hours: '12:00 PM - 11:00 PM',
    phone: '+52 739 395 0198',
    website: 'loscolorines.mx',
    featured: true,
    tags: ['mexican', 'fine-dining', 'terrace']
  }
]

export default function MinimalMapSection({ lang }: MinimalMapSectionProps) {
  const [selectedAttraction, setSelectedAttraction] = useState<typeof attractions[0] | null>(null)
  
  // Filters state
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'distance' | 'name'>('featured')
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map')
  const [priceFilter, setPriceFilter] = useState<string[]>([])
  
  // Filter attractions
  const filteredAttractions = useMemo(() => {
    return attractions.filter(attraction => {
      const matchesSearch = searchQuery === '' || 
        (lang === 'es' ? attraction.nameEs : attraction.nameEn).toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lang === 'es' ? attraction.descriptionEs : attraction.description).toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || attraction.category === selectedCategory
      const matchesPrice = priceFilter.length === 0 || priceFilter.includes(attraction.priceRange)
      
      return matchesSearch && matchesCategory && matchesPrice
    }).sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return b.rating - a.rating
        case 'rating':
          return b.rating - a.rating
        case 'name':
          const nameA = lang === 'es' ? a.nameEs : a.nameEn
          const nameB = lang === 'es' ? b.nameEs : b.nameEn
          return nameA.localeCompare(nameB)
        default:
          return 0
      }
    })
  }, [searchQuery, selectedCategory, priceFilter, sortBy, lang])

  const handlePriceFilter = useCallback((price: string, checked: boolean) => {
    if (checked) {
      setPriceFilter(prev => [...prev, price])
    } else {
      setPriceFilter(prev => prev.filter(p => p !== price))
    }
  }, [])

  const clearFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedCategory('all')
    setPriceFilter([])
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden font-sans">
      {/* Ultra Premium Background */}
      <div className="absolute inset-0">
        {/* Static gradient orbs */}
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-blue-500/10 rounded-full blur-3xl" />
        
        {/* Premium mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_transparent,_rgba(16,185,129,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(6,182,212,0.2))]" />
        
        {/* Grid pattern overlay */}
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
              <div className="text-3xl font-bold text-emerald-400 mb-2">7</div>
              <div className="text-white/70 text-sm">{lang === 'es' ? 'Lugares' : 'Places'}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-cyan-400 mb-2">4.7</div>
              <div className="text-white/70 text-sm">{lang === 'es' ? 'Rating Promedio' : 'Average Rating'}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-blue-400 mb-2">5K+</div>
              <div className="text-white/70 text-sm">{lang === 'es' ? 'Reseñas' : 'Reviews'}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="flex items-center justify-center text-3xl">
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-white/70 text-sm">Trending</div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <Input
                  type="text"
                  placeholder={lang === 'es' ? 'Buscar lugares, restaurantes, hoteles...' : 'Search places, restaurants, hotels...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50"
                />
              </div>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-6 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 text-white border-0 shadow-xl"
              >
                <Filter className="w-4 h-4 mr-2" />
                {lang === 'es' ? 'Filtros' : 'Filters'}
              </Button>
              <Button
                onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
                className="h-12 px-6 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                {viewMode === 'map' ? <Layers className="w-4 h-4 mr-2" /> : <MapPin className="w-4 h-4 mr-2" />}
                {viewMode === 'map' ? (lang === 'es' ? 'Ver Lista' : 'View List') : (lang === 'es' ? 'Ver Mapa' : 'View Map')}
              </Button>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={(value: 'featured' | 'rating' | 'distance' | 'name') => setSortBy(value)}>
                  <SelectTrigger className="w-48 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="featured" className="text-white">{lang === 'es' ? 'Destacados' : 'Featured'}</SelectItem>
                    <SelectItem value="rating" className="text-white">{lang === 'es' ? 'Mejor Calificados' : 'Highest Rated'}</SelectItem>
                    <SelectItem value="distance" className="text-white">{lang === 'es' ? 'Más Cercanos' : 'Nearest'}</SelectItem>
                    <SelectItem value="name" className="text-white">{lang === 'es' ? 'Nombre' : 'Name'}</SelectItem>
                  </SelectContent>
                </Select>

                <div className="text-white/70 text-sm">
                  {filteredAttractions.length} {lang === 'es' ? 'resultados' : 'results'}
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge 
                  onClick={() => setSelectedCategory('all')}
                  className={`cursor-pointer px-4 py-2 transition-all ${
                    selectedCategory === 'all' 
                      ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-white' 
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {lang === 'es' ? 'Todos' : 'All'}
                </Badge>
                {Object.entries(categoryStyles).map(([key, style]) => (
                  <Badge
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`cursor-pointer px-4 py-2 transition-all ${
                      selectedCategory === key
                        ? 'bg-gradient-to-r ' + style.color + ' text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <span className="mr-1">{style.emoji}</span>
                    {lang === 'es' ? style.nameEs : style.nameEn}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="mt-8 pt-8 border-t border-white/10"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Price Range Filter */}
                  <div>
                    <Label className="text-white font-semibold mb-3 block">{lang === 'es' ? 'Precio' : 'Price'}</Label>
                    <div className="space-y-2">
                      {['$', '$$', '$$$', '$$$$'].map((price) => (
                        <div key={price} className="flex items-center space-x-2">
                          <Checkbox
                            id={price}
                            checked={priceFilter.includes(price)}
                            onCheckedChange={(checked) => handlePriceFilter(price, checked as boolean)}
                            className="border-white/30 data-[state=checked]:bg-emerald-400 data-[state=checked]:border-emerald-400"
                          />
                          <Label htmlFor={price} className="text-white/90 cursor-pointer">{price}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <div className="md:col-span-3 flex items-end">
                    <Button
                      onClick={clearFilters}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
                    >
                      <X className="w-4 h-4 mr-2" />
                      {lang === 'es' ? 'Limpiar Filtros' : 'Clear Filters'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map or List View */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            {viewMode === 'map' ? (
              <Card className="overflow-hidden border-0 bg-white/5 backdrop-blur-xl shadow-2xl">
                <CardContent className="p-0">
                  <div className="w-full h-[600px] bg-slate-800 relative rounded-2xl overflow-hidden flex items-center justify-center">
                    <div className="text-white text-center">
                      <h3 className="text-2xl font-bold mb-4">Map Disabled for Testing</h3>
                      <p className="text-lg">Testing everything except the map component</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredAttractions.map((attraction, index) => (
                  <motion.div
                    key={attraction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] border-0 bg-white/5 backdrop-blur-xl hover:bg-white/10 ${
                        selectedAttraction?.id === attraction.id 
                          ? 'ring-2 ring-emerald-400 bg-white/10' 
                          : ''
                      }`}
                      onClick={() => setSelectedAttraction(attraction)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${categoryStyles[attraction.category as keyof typeof categoryStyles].color} flex items-center justify-center shadow-lg`}>
                            <span className="text-2xl">{categoryStyles[attraction.category as keyof typeof categoryStyles].emoji}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-bold text-white text-base">
                                  {lang === 'es' ? attraction.nameEs : attraction.nameEn}
                                </h3>
                                <p className="text-white/60 text-sm mt-1">
                                  {lang === 'es' ? attraction.descriptionEs : attraction.description}
                                </p>
                              </div>
                              {attraction.featured && (
                                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                                  <Sparkles className="w-3 h-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-4 mt-3">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-white font-medium">{attraction.rating}</span>
                                <span className="text-white/50 text-sm">({attraction.reviews})</span>
                              </div>
                              <Badge className="bg-white/10 text-white/70">
                                {attraction.priceRange}
                              </Badge>
                              {attraction.hours && (
                                <div className="flex items-center gap-1 text-white/60 text-sm">
                                  <Clock className="w-3 h-3" />
                                  {attraction.hours}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-2 mt-4">
                              <Button size="sm" className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-white">
                                <Eye className="w-3 h-3 mr-1" />
                                {lang === 'es' ? 'Ver' : 'View'}
                              </Button>
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
                ))}
              </div>
            )}
          </motion.div>

          {/* Side Panel - Attractions List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              {lang === 'es' ? 'Lugares Destacados' : 'Featured Places'}
            </h3>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
              {filteredAttractions.map((attraction, index) => (
                <motion.div
                  key={attraction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card 
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-0 bg-white/5 backdrop-blur-xl hover:bg-white/10 ${
                      selectedAttraction?.id === attraction.id 
                        ? 'ring-2 ring-emerald-400 bg-white/10' 
                        : ''
                    }`}
                    onClick={() => setSelectedAttraction(attraction)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${categoryStyles[attraction.category as keyof typeof categoryStyles].color} flex items-center justify-center`}>
                          <span className="text-lg">{categoryStyles[attraction.category as keyof typeof categoryStyles].emoji}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white text-sm">
                            {lang === 'es' ? attraction.nameEs : attraction.nameEn}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-white/70">{attraction.rating}</span>
                            <span className="text-xs text-white/50">•</span>
                            <span className="text-xs text-white/70">{attraction.priceRange}</span>
                          </div>
                        </div>
                        {attraction.featured && (
                          <Badge className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-400 border-yellow-400/30">
                            <Sparkles className="w-3 h-3" />
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-2s {
          animation-delay: 2s;
        }
        
        .animation-delay-4s {
          animation-delay: 4s;
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(16, 185, 129, 0.3) transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #06b6d4);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #10b981, #06b6d4);
        }
      `}</style>
    </div>
  )
}