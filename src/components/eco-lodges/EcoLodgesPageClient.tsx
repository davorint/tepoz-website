'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { EcoLodge, EcoLodgeService, ecoLodgeCategories, ecoAmenityTypes, ecoLodgePriceRanges } from '@/lib/eco-lodges'
import { Locale } from '@/lib/i18n'
import EcoLodgeCard from './EcoLodgeCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Search, 
  Grid3X3, 
  List, 
  SlidersHorizontal,
  Leaf,
  TreePine,
  Sun,
  Sprout,
  Database
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface EcoLodgesPageClientProps {
  locale: Locale
}

export default function EcoLodgesPageClient({ locale }: EcoLodgesPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [ecoFeatures, setEcoFeatures] = useState({
    sustainability: undefined as boolean | undefined,
    organicFood: undefined as boolean | undefined,
    solarPower: undefined as boolean | undefined,
    petFriendly: undefined as boolean | undefined,
    adultsOnly: undefined as boolean | undefined
  })
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [filteredLodges, setFilteredLodges] = useState<EcoLodge[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort lodges
  useEffect(() => {
    let lodges = EcoLodgeService.searchEcoLodges(
      searchQuery,
      selectedCategory,
      selectedPriceRange,
      selectedAmenities,
      ecoFeatures
    )

    // Sort lodges
    lodges = lodges.sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        case 'price-low':
          return a.roomTypes[0].price - b.roomTypes[0].price
        case 'price-high':
          return b.roomTypes[0].price - a.roomTypes[0].price
        case 'rating':
          return b.rating - a.rating
        case 'reviews':
          return b.reviews - a.reviews
        default:
          return 0
      }
    })

    setFilteredLodges(lodges)
  }, [searchQuery, selectedCategory, selectedPriceRange, selectedAmenities, ecoFeatures, sortBy])

  const handleAmenityToggle = (amenityId: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    )
  }

  const handleEcoFeatureToggle = (feature: keyof typeof ecoFeatures) => {
    setEcoFeatures(prev => ({
      ...prev,
      [feature]: prev[feature] === true ? undefined : true
    }))
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedPriceRange('all')
    setSelectedAmenities([])
    setEcoFeatures({
      sustainability: undefined,
      organicFood: undefined,
      solarPower: undefined,
      petFriendly: undefined,
      adultsOnly: undefined
    })
  }

  const activeFiltersCount = [
    selectedCategory !== 'all' ? 1 : 0,
    selectedPriceRange !== 'all' ? 1 : 0,
    selectedAmenities.length,
    Object.values(ecoFeatures).filter(v => v === true).length
  ].reduce((a, b) => a + b, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 relative overflow-hidden">
      {/* Ultra Premium Background */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-green-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-emerald-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-lime-500/10 rounded-full blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Premium mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_transparent,_rgba(34,197,94,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(16,185,129,0.2))]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Premium Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-green-400" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 blur-lg" />
              <Badge className="relative bg-gradient-to-r from-green-400 to-emerald-400 text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                🌿 {locale === 'es' ? 'Turismo Sustentable' : 'Sustainable Tourism'} 🌿
              </Badge>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-emerald-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-white drop-shadow-2xl">
              {locale === 'es' ? 'Eco Lodges' : 'Eco Lodges'}
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-300 via-emerald-300 to-lime-300 bg-clip-text text-transparent drop-shadow-2xl">
              <span className="text-green-300">TODO</span>TEPOZ
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-4xl mx-auto leading-relaxed mb-8">
            {locale === 'es' 
              ? 'Descubre alojamientos ecológicos únicos donde el lujo se encuentra con la sostenibilidad. Conecta con la naturaleza sin sacrificar comodidad.'
              : 'Discover unique eco-friendly accommodations where luxury meets sustainability. Connect with nature without sacrificing comfort.'
            }
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-green-400 mb-2">{filteredLodges.length}</div>
              <div className="text-white/70 text-sm">{locale === 'es' ? 'Eco Lodges' : 'Eco Lodges'}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-emerald-400 mb-2">100%</div>
              <div className="text-white/70 text-sm">{locale === 'es' ? 'Sustentables' : 'Sustainable'}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-lime-400 mb-2">4.8</div>
              <div className="text-white/70 text-sm">{locale === 'es' ? 'Calificación Promedio' : 'Average Rating'}</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <Input
                  type="text"
                  placeholder={locale === 'es' ? 'Buscar eco lodges, ubicación, características...' : 'Search eco lodges, location, features...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50"
                />
              </div>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-6 bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white border-0 shadow-xl"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                {locale === 'es' ? 'Filtros' : 'Filters'}
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 bg-white text-green-600 text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="featured" className="text-white">
                      {locale === 'es' ? 'Destacados' : 'Featured'}
                    </SelectItem>
                    <SelectItem value="price-low" className="text-white">
                      {locale === 'es' ? 'Precio: Menor' : 'Price: Low to High'}
                    </SelectItem>
                    <SelectItem value="price-high" className="text-white">
                      {locale === 'es' ? 'Precio: Mayor' : 'Price: High to Low'}
                    </SelectItem>
                    <SelectItem value="rating" className="text-white">
                      {locale === 'es' ? 'Calificación' : 'Rating'}
                    </SelectItem>
                    <SelectItem value="reviews" className="text-white">
                      {locale === 'es' ? 'Reseñas' : 'Reviews'}
                    </SelectItem>
                  </SelectContent>
                </Select>

                <div className="text-white/70 text-sm">
                  {filteredLodges.length} {locale === 'es' ? 'resultados' : 'results'}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setViewMode('grid')}
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  className={viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-white' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                  }
                >
                  <Grid3X3 className="w-4 h-4 mr-2" />
                  Grid
                </Button>
                <Button
                  onClick={() => setViewMode('list')}
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  className={viewMode === 'list' 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-white' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                  }
                >
                  <List className="w-4 h-4 mr-2" />
                  List
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">
                    {locale === 'es' ? 'Filtros Avanzados' : 'Advanced Filters'}
                  </h3>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-white/60 hover:text-white hover:bg-white/10"
                    >
                      {locale === 'es' ? 'Limpiar Todo' : 'Clear All'}
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="text-white font-semibold mb-3 block">
                      {locale === 'es' ? 'Tipo' : 'Category'}
                    </label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        {ecoLodgeCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id} className="text-white">
                            {category.emoji} {locale === 'es' ? category.es : category.en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="text-white font-semibold mb-3 block">
                      {locale === 'es' ? 'Precio' : 'Price'}
                    </label>
                    <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                      <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        {ecoLodgePriceRanges.map((range) => (
                          <SelectItem key={range.id} value={range.id} className="text-white">
                            {range.symbol !== 'All' && range.symbol} {locale === 'es' ? range.es : range.en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Eco Features */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <label className="text-white font-semibold mb-4 block">
                    {locale === 'es' ? 'Características Ecológicas' : 'Eco Features'}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <Badge
                      variant={ecoFeatures.sustainability ? 'default' : 'outline'}
                      className={cn(
                        "cursor-pointer transition-all px-4 py-2",
                        ecoFeatures.sustainability 
                          ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-white hover:from-green-500 hover:to-emerald-500 border-0' 
                          : 'bg-white/5 border-white/20 text-white/70 hover:text-white hover:bg-white/10'
                      )}
                      onClick={() => handleEcoFeatureToggle('sustainability')}
                    >
                      <Leaf className="w-4 h-4 mr-2" />
                      {locale === 'es' ? 'Certificación Eco' : 'Eco Certified'}
                    </Badge>
                    <Badge
                      variant={ecoFeatures.solarPower ? 'default' : 'outline'}
                      className={cn(
                        "cursor-pointer transition-all px-4 py-2",
                        ecoFeatures.solarPower 
                          ? 'bg-gradient-to-r from-yellow-400 to-amber-400 text-white hover:from-yellow-500 hover:to-amber-500 border-0' 
                          : 'bg-white/5 border-white/20 text-white/70 hover:text-white hover:bg-white/10'
                      )}
                      onClick={() => handleEcoFeatureToggle('solarPower')}
                    >
                      <Sun className="w-4 h-4 mr-2" />
                      {locale === 'es' ? 'Energía Solar' : 'Solar Power'}
                    </Badge>
                    <Badge
                      variant={ecoFeatures.organicFood ? 'default' : 'outline'}
                      className={cn(
                        "cursor-pointer transition-all px-4 py-2",
                        ecoFeatures.organicFood 
                          ? 'bg-gradient-to-r from-emerald-400 to-green-400 text-white hover:from-emerald-500 hover:to-green-500 border-0' 
                          : 'bg-white/5 border-white/20 text-white/70 hover:text-white hover:bg-white/10'
                      )}
                      onClick={() => handleEcoFeatureToggle('organicFood')}
                    >
                      <Sprout className="w-4 h-4 mr-2" />
                      {locale === 'es' ? 'Comida Orgánica' : 'Organic Food'}
                    </Badge>
                  </div>
                </div>

                {/* Eco Amenities */}
                <div className="mt-6">
                  <label className="text-white font-semibold mb-4 block">
                    {locale === 'es' ? 'Amenidades Ecológicas' : 'Eco Amenities'}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {ecoAmenityTypes.slice(1).map((amenity) => (
                      <Badge
                        key={amenity.id}
                        variant={selectedAmenities.includes(amenity.id) ? 'default' : 'outline'}
                        className={cn(
                          "cursor-pointer transition-all px-4 py-2",
                          selectedAmenities.includes(amenity.id)
                            ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-white hover:from-green-500 hover:to-emerald-500 border-0'
                            : 'bg-white/5 border-white/20 text-white/70 hover:text-white hover:bg-white/10'
                        )}
                        onClick={() => handleAmenityToggle(amenity.id)}
                      >
                        {amenity.emoji} {locale === 'es' ? amenity.es : amenity.en}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Eco Lodges Grid/List */}
        <div className="mb-12">
        {filteredLodges.length === 0 ? (
          <div className="text-center py-16">
            <TreePine className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {locale === 'es' ? 'No se encontraron eco lodges' : 'No eco lodges found'}
            </h3>
            <p className="text-white/60 mb-4">
              {locale === 'es' 
                ? 'Intenta ajustar tus filtros para encontrar más opciones.'
                : 'Try adjusting your filters to find more options.'
              }
            </p>
            <Button onClick={clearAllFilters} className="bg-green-400 hover:bg-green-500 text-white">
              {locale === 'es' ? 'Limpiar Filtros' : 'Clear Filters'}
            </Button>
          </div>
        ) : (
          <div className={cn(
            "grid gap-6",
            viewMode === 'grid' 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1"
          )}>
            {filteredLodges.map((lodge) => (
              <EcoLodgeCard
                key={lodge.id}
                lodge={lodge}
                locale={locale}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {/* Directory Button */}
        <div className="text-center py-12">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl max-w-2xl mx-auto">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 blur-xl opacity-50" />
                <div className="relative bg-gradient-to-r from-emerald-400 to-green-400 p-4 rounded-2xl shadow-2xl">
                  <Database className="h-12 w-12 text-white" />
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {locale === 'es' ? 'Explora Todos los Eco-Lodges' : 'Explore All Eco-Lodges'}
                </h3>
                <p className="text-white/70 mb-6 max-w-lg">
                  {locale === 'es'
                    ? 'Accede a nuestro directorio sustentable con herramientas avanzadas de búsqueda, filtros ecológicos y análisis'
                    : 'Access our sustainable directory with advanced search tools, ecological filters and analysis'
                  }
                </p>
              </div>
              
              <Link href={`/${locale}/stay/eco-lodges/all-eco-lodges`}>
                <Button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-8 py-4 text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <Database className="w-5 h-5 mr-3" />
                  {locale === 'es' ? 'Ver Directorio Sustentable' : 'View Sustainable Directory'}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Business Owner CTA */}
        <div className="text-center py-12">
          <Card className="bg-gradient-to-r from-emerald-400/10 to-green-400/10 backdrop-blur-xl border-white/20 p-12 max-w-4xl mx-auto">
            <CardContent className="space-y-6">
              <h2 className="text-3xl font-bold text-white">
                {locale === 'es' 
                  ? '¿Tienes un eco lodge en Tepoztlán?' 
                  : 'Do you own an eco lodge in Tepoztlán?'
                }
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                {locale === 'es' 
                  ? 'Únete a nuestra plataforma y conecta con viajeros conscientes que buscan experiencias sustentables e inmersivas en la naturaleza de Tepoztlán.'
                  : 'Join our platform and connect with conscious travelers seeking sustainable and immersive experiences in Tepoztlán\'s nature.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-emerald-400 to-green-400 hover:from-emerald-500 hover:to-green-500 text-white px-8 py-6 text-lg">
                  <Leaf className="w-5 h-5 mr-2" />
                  {locale === 'es' ? 'Agregar mi Eco Lodge' : 'Add my Eco Lodge'}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20 px-8 py-6 text-lg"
                >
                  {locale === 'es' ? 'Más Información' : 'Learn More'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </div>
  )
}