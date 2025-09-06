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


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 relative overflow-hidden">
      {/* Ultra Premium Background */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-orange-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-yellow-500/10 rounded-full blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Premium mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_transparent,_rgba(251,146,60,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(245,158,11,0.2))]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(251, 146, 60, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 146, 60, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Premium Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-400" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 blur-lg" />
              <Badge className="relative bg-gradient-to-r from-amber-400 to-orange-400 text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                ☕ {locale === 'es' ? 'Cafés & Panaderías Premium' : 'Premium Cafés & Bakeries'} ☕
              </Badge>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-orange-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-white drop-shadow-2xl">
              {locale === 'es' ? 'Aromas de ' : 'Aromas of '}
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent drop-shadow-2xl">
              TEPOZTLÁN
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-4xl mx-auto leading-relaxed mb-8">
            {locale === 'es' 
              ? 'Descubre los mejores cafés de especialidad, panaderías tradicionales y espacios únicos para disfrutar del mejor café y pan artesanal de Tepoztlán'
              : 'Discover the best specialty coffee shops, traditional bakeries and unique spaces to enjoy the finest coffee and artisan bread in Tepoztlán'
            }
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-amber-400 mb-2">{filteredCafes.length}</div>
              <div className="text-white/70 text-sm">{locale === 'es' ? 'Cafés & Panaderías' : 'Cafés & Bakeries'}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-orange-400 mb-2">4.7</div>
              <div className="text-white/70 text-sm">{locale === 'es' ? 'Calificación Promedio' : 'Average Rating'}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-yellow-400 mb-2">1K+</div>
              <div className="text-white/70 text-sm">{locale === 'es' ? 'Reseñas' : 'Reviews'}</div>
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
                  placeholder={locale === 'es' ? 'Buscar cafés, panaderías, especialidades...' : 'Search cafés, bakeries, specialties...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50"
                />
              </div>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-6 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white border-0 shadow-xl"
              >
                <Filter className="w-4 h-4 mr-2" />
                {locale === 'es' ? 'Filtros' : 'Filters'}
              </Button>
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
                  List
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-8 pt-8 border-t border-white/10">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Cafe Type Filter */}
                  <div>
                    <Label className="text-white font-semibold mb-3 block">{locale === 'es' ? 'Tipo' : 'Type'}</Label>
                    <Select value={selectedCafeType} onValueChange={setSelectedCafeType}>
                      <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        {cafeTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id} className="text-white">
                            {locale === 'es' ? type.es : type.en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Atmosphere Filter */}
                  <div>
                    <Label className="text-white font-semibold mb-3 block">{locale === 'es' ? 'Ambiente' : 'Atmosphere'}</Label>
                    <Select value={selectedAtmosphere} onValueChange={setSelectedAtmosphere}>
                      <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                        <SelectValue />
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
                    <Label className="text-white font-semibold mb-3 block">{locale === 'es' ? 'Precio' : 'Price'}</Label>
                    <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                      <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                        <SelectValue />
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

                  {/* Dietary Restrictions */}
                  <div>
                    <Label className="text-white font-semibold mb-3 block">{locale === 'es' ? 'Dieta' : 'Dietary'}</Label>
                    <div className="space-y-2">
                      {[
                        { id: 'vegetarian', es: 'Vegetariano', en: 'Vegetarian', emoji: '🌱' },
                        { id: 'vegan', es: 'Vegano', en: 'Vegan', emoji: '🌿' },
                        { id: 'gluten-free', es: 'Sin Gluten', en: 'Gluten Free', emoji: '🌾' },
                        { id: 'organic', es: 'Orgánico', en: 'Organic', emoji: '🍃' }
                      ].map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={option.id}
                            checked={selectedDietary.includes(option.id)}
                            onCheckedChange={(checked) => handleDietaryChange(option.id, checked as boolean)}
                            className="border-white/30 data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400"
                          />
                          <Label htmlFor={option.id} className="text-white/90 text-sm cursor-pointer">
                            {option.emoji} {locale === 'es' ? option.es : option.en}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="mt-6 text-center">
                  <Button
                    onClick={clearFilters}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
                  >
                    <X className="w-4 h-4 mr-2" />
                    {locale === 'es' ? 'Limpiar Filtros' : 'Clear Filters'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className={`grid gap-8 ${
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

        {/* Empty State */}
        {filteredCafes.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-16 shadow-2xl max-w-2xl mx-auto">
              <div className="text-8xl mb-8 opacity-50">☕</div>
              <h3 className="text-3xl font-bold text-white mb-4 font-sans">
                {locale === 'es' ? 'No se encontraron cafés' : 'No cafés found'}
              </h3>
              <p className="text-white/70 text-lg mb-8">
                {locale === 'es' 
                  ? 'Intenta ajustar los filtros o modificar tu búsqueda'
                  : 'Try adjusting your filters or modify your search'
                }
              </p>
              <Button
                onClick={clearFilters}
                className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white border-0 shadow-xl"
              >
                {locale === 'es' ? 'Limpiar Filtros' : 'Clear Filters'}
              </Button>
            </div>
          </div>
        )}

        {/* All Cafés & Bakeries Directory Button */}
        <div className="text-center py-16">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-12 shadow-2xl max-w-4xl mx-auto">
            <div className="text-6xl mb-6 opacity-80">📊</div>
            <h2 className="text-3xl font-bold text-white mb-4 font-sans">
              {locale === 'es' ? 'Directorio Completo' : 'Complete Directory'}
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              {locale === 'es' 
                ? 'Explora todos los cafés y panaderías en una vista de tabla avanzada con filtros, búsqueda y exportación de datos.'
                : 'Explore all cafés and bakeries in an advanced table view with filters, search and data export capabilities.'
              }
            </p>
            <Button
              onClick={() => window.location.href = `/${locale}/eat/cafes-bakeries/all-cafes-bakeries`}
              size="lg"
              className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white border-0 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 px-8 py-4 text-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🗂️</span>
                <span className="font-semibold">
                  {locale === 'es' ? 'Ver Todos los Cafés & Panaderías' : 'View All Cafés & Bakeries'}
                </span>
              </div>
            </Button>
          </div>
        </div>

        {/* Business Owner CTA */}
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
                  ? 'Únete a nuestra plataforma y conecta con miles de visitantes que buscan experiencias auténticas de café y repostería artesanal en este Pueblo Mágico.'
                  : 'Join our platform and connect with thousands of visitors looking for authentic coffee and artisan bakery experiences in this Magical Town.'
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

