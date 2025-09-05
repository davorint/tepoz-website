'use client'

import { useState, useEffect } from 'react'
import { Locale } from '@/lib/i18n'
import { Cafe, CafeService, cafeTypes, atmosphereTypes, priceRanges } from '@/lib/cafes'
import CafeCard from './CafeCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Search, 
  Filter, 
  X,
  Grid3X3,
  List,
  Coffee,
  Sparkles,
  MapPin,
  Star
} from 'lucide-react'

interface CafesPageClientProps {
  locale: Locale
}

export default function CafesPageClient({ locale }: CafesPageClientProps) {
  const [filteredCafes, setFilteredCafes] = useState<Cafe[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCafeType, setSelectedCafeType] = useState('all')
  const [selectedAtmosphere, setSelectedAtmosphere] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [selectedDietary, setSelectedDietary] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'price' | 'name'>('featured')

  // Initialize cafes
  useEffect(() => {
    const allCafes = CafeService.getAllCafes()
    setFilteredCafes(allCafes)
  }, [])

  // Filter and sort cafes
  useEffect(() => {
    let filtered = CafeService.searchCafes(
      searchQuery,
      selectedCafeType,
      selectedAtmosphere,
      selectedPriceRange,
      selectedDietary
    )

    // Sort cafes
    filtered = CafeService.sortCafes(filtered, sortBy)

    setFilteredCafes(filtered)
  }, [searchQuery, selectedCafeType, selectedAtmosphere, selectedPriceRange, selectedDietary, sortBy])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCafeType('all')
    setSelectedAtmosphere('all')
    setSelectedPriceRange('all')
    setSelectedDietary([])
  }

  const handleDietaryChange = (dietary: string, checked: boolean) => {
    if (checked) {
      setSelectedDietary([...selectedDietary, dietary])
    } else {
      setSelectedDietary(selectedDietary.filter(d => d !== dietary))
    }
  }

  const activeFiltersCount = [
    searchQuery ? 1 : 0,
    selectedCafeType !== 'all' ? 1 : 0,
    selectedAtmosphere !== 'all' ? 1 : 0,
    selectedPriceRange !== 'all' ? 1 : 0,
    selectedDietary.length
  ].reduce((a, b) => a + b, 0)

  const featuredCafes = CafeService.getFeaturedCafes()

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900">
      {/* Ultra Premium Background */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-[30rem] h-[30rem] bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-20 w-[25rem] h-[25rem] bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-[20rem] h-[20rem] bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* Premium grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.8)_1px,transparent_0)]" style={{ backgroundSize: '24px 24px' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Premium Hero Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white border-0 px-6 py-2 text-sm">
            <Coffee className="w-4 h-4 mr-2" />
            {locale === 'es' ? 'Cafés y Panaderías de Tepoztlán' : 'Tepoztlán Cafés & Bakeries'}
          </Badge>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              {locale === 'es' ? 'Cafés' : 'Cafés'}
            </span>
            <br />
            <span className="text-white/90 text-4xl md:text-5xl">
              & {locale === 'es' ? 'Panaderías' : 'Bakeries'}
            </span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            {locale === 'es' 
              ? 'Descubre los mejores cafés de especialidad, panaderías tradicionales y espacios únicos para disfrutar del mejor café y pan artesanal de Tepoztlán'
              : 'Discover the best specialty coffee shops, traditional bakeries and unique spaces to enjoy the finest coffee and artisan bread in Tepoztlán'
            }
          </p>

          {/* Stats Cards */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 px-6 py-4">
              <CardContent className="p-0 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">{filteredCafes.length}</div>
                  <div className="text-white/70 text-sm">
                    {locale === 'es' ? 'Cafés y Panaderías' : 'Cafés & Bakeries'}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border-white/20 px-6 py-4">
              <CardContent className="p-0 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">{featuredCafes.length}</div>
                  <div className="text-white/70 text-sm">
                    {locale === 'es' ? 'Destacados' : 'Featured'}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border-white/20 px-6 py-4">
              <CardContent className="p-0 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-400 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">5</div>
                  <div className="text-white/70 text-sm">
                    {locale === 'es' ? 'Zonas' : 'Areas'}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Decorative Line */}
          <div className="w-32 h-1 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full" />
        </div>

        {/* Search and Filter Controls */}
        <div className="space-y-6 mb-8">
          {/* Main Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <Input
              type="text"
              placeholder={locale === 'es' ? 'Buscar cafés, panaderías o especialidades...' : 'Search cafés, bakeries or specialties...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 bg-white/10 backdrop-blur-xl border-white/20 text-white placeholder-white/60 text-lg rounded-2xl"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                className="h-10 px-4 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white border-0 shadow-xl"
              >
                <Filter className="w-4 h-4 mr-2" />
                {locale === 'es' ? 'Filtros' : 'Filters'}
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 bg-white text-amber-600 text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'featured' | 'rating' | 'price' | 'name')}>
                <SelectTrigger className="w-48 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <SelectValue placeholder={locale === 'es' ? 'Ordenar por' : 'Sort by'} />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="featured" className="text-white">
                    {locale === 'es' ? 'Destacados' : 'Featured'}
                  </SelectItem>
                  <SelectItem value="rating" className="text-white">
                    {locale === 'es' ? 'Mejor Valorados' : 'Highest Rated'}
                  </SelectItem>
                  <SelectItem value="price" className="text-white">
                    {locale === 'es' ? 'Precio' : 'Price'}
                  </SelectItem>
                  <SelectItem value="name" className="text-white">
                    {locale === 'es' ? 'Nombre' : 'Name'}
                  </SelectItem>
                </SelectContent>
              </Select>

              <div className="text-white/70 text-sm">
                {filteredCafes.length} {locale === 'es' ? 'resultados' : 'results'}
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setViewMode('grid')}
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                className={viewMode === 'grid' 
                  ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white' 
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
                  ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
                }
              >
                <List className="w-4 h-4 mr-2" />
                List
              </Button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-6">
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">
                    {locale === 'es' ? 'Filtros Avanzados' : 'Advanced Filters'}
                  </h3>
                  <Button 
                    onClick={() => setShowFilters(false)}
                    variant="ghost" 
                    size="sm"
                    className="text-white/70 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Cafe Type Filter */}
                  <div>
                    <label className="text-white font-semibold mb-3 block">
                      {locale === 'es' ? 'Tipo' : 'Type'}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {cafeTypes.map((type) => (
                        <Badge
                          key={type.id}
                          onClick={() => setSelectedCafeType(selectedCafeType === type.id ? 'all' : type.id)}
                          className={cn(
                            "cursor-pointer transition-all px-4 py-2",
                            selectedCafeType === type.id
                              ? `bg-gradient-to-r ${type.color} text-white border-0`
                              : "bg-white/10 text-white/70 border-white/20 hover:bg-white/20"
                          )}
                        >
                          <span className="mr-2">{type.emoji}</span>
                          {locale === 'es' ? type.es : type.en}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Atmosphere Filter */}
                  <div>
                    <label className="text-white font-semibold mb-3 block">
                      {locale === 'es' ? 'Ambiente' : 'Atmosphere'}
                    </label>
                    <Select value={selectedAtmosphere} onValueChange={setSelectedAtmosphere}>
                      <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                        <SelectValue placeholder={locale === 'es' ? 'Todos' : 'All'} />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        {atmosphereTypes.map((atmosphere) => (
                          <SelectItem key={atmosphere.id} value={atmosphere.id} className="text-white">
                            {locale === 'es' ? atmosphere.es : atmosphere.en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="text-white font-semibold mb-3 block">
                      {locale === 'es' ? 'Precio' : 'Price Range'}
                    </label>
                    <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                      <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                        <SelectValue placeholder={locale === 'es' ? 'Todos' : 'All'} />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        {priceRanges.map((price) => (
                          <SelectItem key={price.id} value={price.id} className="text-white">
                            {locale === 'es' ? price.es : price.en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Dietary Preferences */}
                <div>
                  <label className="text-white font-semibold mb-3 block">
                    {locale === 'es' ? 'Opciones Dietéticas' : 'Dietary Options'}
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {['vegetarian', 'vegan', 'gluten-free', 'organic'].map((dietary) => (
                      <div key={dietary} className="flex items-center space-x-2">
                        <Checkbox
                          id={dietary}
                          checked={selectedDietary.includes(dietary)}
                          onCheckedChange={(checked) => handleDietaryChange(dietary, checked as boolean)}
                          className="border-white/30 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                        />
                        <Label htmlFor={dietary} className="text-white/80 capitalize">
                          {dietary === 'gluten-free' 
                            ? locale === 'es' ? 'Sin Gluten' : 'Gluten Free'
                            : dietary === 'organic'
                            ? locale === 'es' ? 'Orgánico' : 'Organic'
                            : dietary === 'vegetarian'
                            ? locale === 'es' ? 'Vegetariano' : 'Vegetarian'
                            : locale === 'es' ? 'Vegano' : 'Vegan'
                          }
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters Button */}
                {activeFiltersCount > 0 && (
                  <Button 
                    onClick={clearFilters} 
                    className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white"
                  >
                    {locale === 'es' ? 'Limpiar Filtros' : 'Clear Filters'}
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Cafes Grid/List */}
        <div className={`grid gap-6 mb-12 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredCafes.map((cafe, index) => (
            <CafeCard
              key={cafe.id}
              cafe={cafe}
              locale={locale}
              viewMode={viewMode}
              animationDelay={index * 100}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredCafes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">☕</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {locale === 'es' ? 'No se encontraron cafés' : 'No cafés found'}
            </h3>
            <p className="text-white/70 mb-4">
              {locale === 'es' 
                ? 'Intenta ajustar tus filtros o buscar algo diferente'
                : 'Try adjusting your filters or searching for something else'
              }
            </p>
            <Button 
              onClick={clearFilters}
              className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white"
            >
              {locale === 'es' ? 'Limpiar Filtros' : 'Clear Filters'}
            </Button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center py-12">
          <Card className="bg-gradient-to-r from-amber-400/10 to-orange-400/10 backdrop-blur-xl border-white/20 p-12 max-w-4xl mx-auto">
            <CardContent className="space-y-6">
              <h2 className="text-3xl font-bold text-white">
                {locale === 'es' 
                  ? '¿Tienes un café o panadería en Tepoztlán?' 
                  : 'Do you own a café or bakery in Tepoztlán?'
                }
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                {locale === 'es' 
                  ? 'Únete a nuestra plataforma y conecta con miles de visitantes que buscan experiencias auténticas de café y pan artesanal.'
                  : 'Join our platform and connect with thousands of visitors looking for authentic coffee and artisan bread experiences.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white px-8 py-6 text-lg">
                  <Star className="w-5 h-5 mr-2" />
                  {locale === 'es' ? 'Agregar mi Negocio' : 'Add my Business'}
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
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}