'use client'

import { useState, useEffect } from 'react'
import { Locale } from '@/lib/i18n'
import { Bar, BarService, barTypes, atmosphereTypes, priceRanges, drinkTypes } from '@/lib/bars'
import BarCard from './BarCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { 
  Search, 
  Filter, 
  X,
  Wine,
  Beer,
  Music
} from 'lucide-react'

interface BarsPageClientProps {
  locale: Locale
}

export default function BarsPageClient({ locale }: BarsPageClientProps) {
  const [bars, setBars] = useState<Bar[]>([])
  const [filteredBars, setFilteredBars] = useState<Bar[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedAtmosphere, setSelectedAtmosphere] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [selectedDrinks, setSelectedDrinks] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'price' | 'name'>('featured')

  // Initialize bars
  useEffect(() => {
    const allBars = BarService.getAllBars()
    setBars(allBars)
    setFilteredBars(allBars)
  }, [])

  // Filter and sort bars
  useEffect(() => {
    let filtered = BarService.searchBars(
      searchQuery,
      selectedType,
      selectedAtmosphere,
      selectedPriceRange,
      selectedDrinks
    )

    // Sort bars
    filtered = BarService.sortBars(filtered, sortBy, locale)

    setFilteredBars(filtered)
  }, [searchQuery, selectedType, selectedAtmosphere, selectedPriceRange, selectedDrinks, sortBy, locale])

  const handleDrinkToggle = (drink: string) => {
    setSelectedDrinks(prev => 
      prev.includes(drink)
        ? prev.filter(d => d !== drink)
        : [...prev, drink]
    )
  }

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedType('all')
    setSelectedAtmosphere('all')
    setSelectedPriceRange('all')
    setSelectedDrinks([])
  }

  const activeFiltersCount = [
    selectedType !== 'all' ? 1 : 0,
    selectedAtmosphere !== 'all' ? 1 : 0,
    selectedPriceRange !== 'all' ? 1 : 0,
    selectedDrinks.length
  ].reduce((a, b) => a + b, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900">
      {/* Hero Section */}
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-pink-600/40 to-orange-600/40" />
          <div className="absolute inset-0 bg-black/10 opacity-20" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <div className="flex items-center justify-center mb-6">
            <Wine className="w-12 h-12 text-purple-400 mr-2" />
            <Beer className="w-12 h-12 text-yellow-400" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
            {locale === 'es' ? 'Bares y Pulquerías' : 'Bars & Pulquerias'}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-lg">
            {locale === 'es' 
              ? 'Descubre la vida nocturna de Tepoztlán. Desde pulquerías tradicionales hasta bares modernos con mezcal artesanal.'
              : 'Discover Tepoztlán\'s nightlife. From traditional pulquerias to modern bars with artisanal mezcal.'}
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
              <div className="text-3xl font-bold text-white">{bars.length}</div>
              <div className="text-sm text-white/70">{locale === 'es' ? 'Bares' : 'Bars'}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
              <div className="text-3xl font-bold text-white">
                {bars.filter(b => b.type === 'pulqueria').length}
              </div>
              <div className="text-sm text-white/70">{locale === 'es' ? 'Pulquerías' : 'Pulquerias'}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
              <div className="text-3xl font-bold text-white">
                {bars.filter(b => b.liveMusic).length}
              </div>
              <div className="text-sm text-white/70">{locale === 'es' ? 'Con Música' : 'Live Music'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder={locale === 'es' 
                        ? 'Buscar bares, pulquerías, mezcal...' 
                        : 'Search bars, pulquerias, mezcal...'}
                      className="pl-12 bg-transparent border-0 text-white placeholder:text-white/50 h-12 focus:ring-2 focus:ring-purple-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={() => setShowFilters(!showFilters)}
                    variant={showFilters ? 'default' : 'outline'}
                    className={showFilters 
                      ? 'h-12 px-6 bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white border-0 shadow-xl'
                      : 'h-12 px-6 bg-white/10 hover:bg-white/20 text-white border-white/20'
                    }
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    {locale === 'es' ? 'Filtros' : 'Filters'}
                    {activeFiltersCount > 0 && (
                      <Badge className="ml-2 bg-white/20 text-white">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
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
              {filteredBars.length} {locale === 'es' ? 'resultados' : 'results'}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setViewMode('grid')}
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className={viewMode === 'grid' 
                ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white' 
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
                ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white' 
                : 'text-white/70 hover:text-white hover:bg-white/10'
              }
            >
              List
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-8 p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">
                {locale === 'es' ? 'Filtros Avanzados' : 'Advanced Filters'}
              </h3>
              <Button
                onClick={resetFilters}
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4 mr-2" />
                {locale === 'es' ? 'Limpiar' : 'Clear'}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Type Filter */}
              <div>
                <Label className="text-white font-semibold mb-3 block">
                  {locale === 'es' ? 'Tipo' : 'Type'}
                </Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {barTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id} className="text-white">
                        {locale === 'es' ? type.es : type.en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Atmosphere Filter */}
              <div>
                <Label className="text-white font-semibold mb-3 block">
                  {locale === 'es' ? 'Ambiente' : 'Atmosphere'}
                </Label>
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
                <Label className="text-white font-semibold mb-3 block">
                  {locale === 'es' ? 'Precio' : 'Price'}
                </Label>
                <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                  <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {priceRanges.map((price) => (
                      <SelectItem key={price.id} value={price.id} className="text-white">
                        {price.symbol} {locale === 'es' ? price.es : price.en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Drink Types */}
              <div>
                <Label className="text-white font-semibold mb-3 block">
                  {locale === 'es' ? 'Bebidas' : 'Drinks'}
                </Label>
                <div className="space-y-2">
                  {drinkTypes.slice(0, 4).map((drink) => (
                    <div key={drink.id} className="flex items-center">
                      <Checkbox
                        id={drink.id}
                        checked={selectedDrinks.includes(drink.id)}
                        onCheckedChange={() => handleDrinkToggle(drink.id)}
                        className="border-white/40 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                      />
                      <label
                        htmlFor={drink.id}
                        className="ml-2 text-sm text-white/80 cursor-pointer"
                      >
                        {locale === 'es' ? drink.es : drink.en}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Featured Bars */}
        {!searchQuery && selectedType === 'all' && selectedAtmosphere === 'all' && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Music className="w-8 h-8 text-purple-400" />
              <h2 className="text-3xl font-bold text-white">
                {locale === 'es' ? 'Bares Destacados' : 'Featured Bars'}
              </h2>
            </div>
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredBars.filter(bar => bar.featured).map((bar, index) => (
                <BarCard
                  key={bar.id}
                  bar={bar}
                  locale={locale}
                  viewMode={viewMode}
                  animationDelay={index * 100}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Bars */}
        <div>
          {(searchQuery || selectedType !== 'all' || selectedAtmosphere !== 'all') && (
            <h2 className="text-2xl font-bold text-white mb-6">
              {locale === 'es' ? 'Resultados de Búsqueda' : 'Search Results'}
            </h2>
          )}
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredBars
              .filter(bar => searchQuery || selectedType !== 'all' || selectedAtmosphere !== 'all' ? true : !bar.featured)
              .map((bar, index) => (
                <BarCard
                  key={bar.id}
                  bar={bar}
                  locale={locale}
                  viewMode={viewMode}
                  animationDelay={index * 100}
                />
              ))}
          </div>
        </div>

        {/* No Results */}
        {filteredBars.length === 0 && (
          <div className="text-center py-16">
            <Beer className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white/70 mb-2">
              {locale === 'es' ? 'No se encontraron bares' : 'No bars found'}
            </h3>
            <p className="text-white/50">
              {locale === 'es' 
                ? 'Intenta ajustar los filtros o la búsqueda'
                : 'Try adjusting your filters or search'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}