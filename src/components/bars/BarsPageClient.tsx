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
import { Card, CardContent } from '@/components/ui/card'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  Search,
  Filter,
  X,
  Beer,
  Music,
  MapPin,
  Home,
  UtensilsCrossed
} from 'lucide-react'
import Link from 'next/link'

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
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-teal-50 to-emerald-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-teal-900 dark:to-slate-900 relative overflow-hidden">
      {/* Ultra Premium Background */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs - independent light/dark controls */}
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-white/40 dark:bg-teal-500/15 rounded-full blur-3xl dark:blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-white/30 dark:bg-cyan-500/10 rounded-full blur-3xl dark:blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-white/25 dark:bg-emerald-500/8 rounded-full blur-3xl dark:blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Premium mesh gradient - independent controls */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_rgba(20,184,166,0.1),_transparent),radial-gradient(at_bottom_right,_rgba(6,182,212,0.1),_transparent)] dark:bg-[radial-gradient(at_top_left,_transparent,_rgba(20,184,166,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(6,182,212,0.2))]" />
        
        {/* Grid pattern overlay - independent opacity */}
        <div className="absolute inset-0 opacity-3 dark:opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb className="text-slate-700 dark:text-white/80">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${locale}`} className="flex items-center gap-1.5 hover:text-teal-500 dark:hover:text-teal-400 transition-colors">
                    <Home className="w-4 h-4" />
                    {locale === 'es' ? 'Inicio' : 'Home'}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${locale}/food-drink`} className="flex items-center gap-1.5 hover:text-teal-500 dark:hover:text-teal-400 transition-colors">
                    <UtensilsCrossed className="w-4 h-4" />
                    {locale === 'es' ? 'Comida y Bebida' : 'Food & Drink'}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center gap-1.5 font-medium text-teal-600 dark:text-teal-400">
                  🍺 {locale === 'es' ? 'Bares y Pulquerías' : 'Bars & Pulquerías'}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Premium Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-teal-400" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 blur-lg" />
              <Badge className="relative bg-gradient-to-r from-teal-400 to-cyan-400 text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                🌵 {locale === 'es' ? 'Tradición y Diversión' : 'Tradition & Fun'} 🎉
              </Badge>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-slate-800 dark:text-white drop-shadow-lg dark:drop-shadow-2xl">
              {locale === 'es' ? 'Sabor Social de ' : 'Social Flavors of '}
            </span>
            <br />
            <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 dark:from-teal-300 dark:via-cyan-300 dark:to-emerald-300 bg-clip-text text-transparent drop-shadow-lg dark:drop-shadow-2xl">
              <span className="text-teal-500 dark:text-teal-300">TODO</span>TEPOZ
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-700 dark:text-white/80 font-light max-w-4xl mx-auto leading-relaxed mb-8">
            {locale === 'es' 
              ? 'Vive la experiencia de las bebidas tradicionales mexicanas. Pulquerías históricas, mezcalerías artesanales y espacios sociales únicos para compartir con amigos.'
              : 'Experience traditional Mexican beverages. Historic pulquerías, artisanal mezcal bars, and unique social spaces to share with friends.'
            }
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-xl rounded-2xl border border-slate-300/20 dark:border-white/10 p-6 shadow-lg shadow-slate-300/15 dark:shadow-white/12 hover:bg-white/80 dark:hover:bg-white/8 hover:scale-105 dark:hover:scale-110 transition-all duration-300 dark:duration-500 cursor-pointer group">
              <div className="text-3xl font-bold text-teal-500 dark:text-teal-400 mb-2 drop-shadow-sm dark:drop-shadow-md">{bars.length}</div>
              <div className="text-slate-600 dark:text-white/70 text-sm group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-200 dark:duration-300">{locale === 'es' ? 'Bares' : 'Bars'}</div>
            </div>
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-xl rounded-2xl border border-slate-300/20 dark:border-white/10 p-6 shadow-lg shadow-slate-300/15 dark:shadow-white/12 hover:bg-white/80 dark:hover:bg-white/8 hover:scale-105 dark:hover:scale-110 transition-all duration-300 dark:duration-500 cursor-pointer group">
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {bars.filter(b => b.type === 'pulqueria').length}
              </div>
              <div className="text-slate-600 dark:text-white/70 text-sm group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-200 dark:duration-300">{locale === 'es' ? 'Pulquerías' : 'Pulquerias'}</div>
            </div>
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-xl rounded-2xl border border-slate-300/20 dark:border-white/10 p-6 shadow-lg shadow-slate-300/15 dark:shadow-white/12 hover:bg-white/80 dark:hover:bg-white/8 hover:scale-105 dark:hover:scale-110 transition-all duration-300 dark:duration-500 cursor-pointer group">
              <div className="text-3xl font-bold text-emerald-400 mb-2">
                {bars.filter(b => b.atmosphere === 'traditional' || b.atmosphere === 'casual').length}
              </div>
              <div className="text-slate-600 dark:text-white/70 text-sm group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-200 dark:duration-300">{locale === 'es' ? 'Ambiente Social' : 'Social Atmosphere'}</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-xl rounded-3xl border border-slate-300/20 dark:border-white/10 p-8 shadow-xl shadow-slate-300/20 dark:shadow-white/15 hover:bg-white/80 dark:hover:bg-white/8 transition-all duration-300 dark:duration-500">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-white/50 w-5 h-5" />
                <Input
                  type="text"
                  placeholder={locale === 'es' ? 'Buscar bares, pulquerías, mezcal...' : 'Search bars, pulquerias, mezcal...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-white/80 dark:bg-white/10 backdrop-blur-sm dark:backdrop-blur-md border-slate-300/30 dark:border-white/20 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-white/50 hover:bg-white/90 dark:hover:bg-white/15 focus:bg-white/95 dark:focus:bg-white/15 transition-all duration-200 dark:duration-300"
                />
              </div>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-6 bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white border-0 shadow-xl"
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

            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'featured' | 'rating' | 'price' | 'name')}>
                  <SelectTrigger className="w-48 bg-white/10 backdrop-blur-sm border-white/20 text-slate-900 dark:text-white">
                    <SelectValue placeholder={locale === 'es' ? 'Ordenar por' : 'Sort by'} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="featured" className="text-slate-900 dark:text-white">
                      {locale === 'es' ? 'Destacados' : 'Featured'}
                    </SelectItem>
                    <SelectItem value="rating" className="text-slate-900 dark:text-white">
                      {locale === 'es' ? 'Mejor Valorados' : 'Highest Rated'}
                    </SelectItem>
                    <SelectItem value="price" className="text-slate-900 dark:text-white">
                      {locale === 'es' ? 'Precio' : 'Price'}
                    </SelectItem>
                    <SelectItem value="name" className="text-slate-900 dark:text-white">
                      {locale === 'es' ? 'Nombre' : 'Name'}
                    </SelectItem>
                  </SelectContent>
                </Select>

                <div className="text-slate-600 dark:text-white/70 text-sm group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-200 dark:duration-300">
                  {filteredBars.length} {locale === 'es' ? 'resultados' : 'results'}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setViewMode('grid')}
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  className={viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-teal-400 to-cyan-400 text-white' 
                    : 'text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-white/10'
                  }
                >
                  Grid
                </Button>
                <Button
                  onClick={() => setViewMode('list')}
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  className={viewMode === 'list' 
                    ? 'bg-gradient-to-r from-teal-400 to-cyan-400 text-white' 
                    : 'text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-white/10'
                  }
                >
                  List
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
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
                    <Label className="text-slate-900 dark:text-white font-semibold mb-3 block">
                      {locale === 'es' ? 'Tipo' : 'Type'}
                    </Label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-slate-900 dark:text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        {barTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id} className="text-slate-900 dark:text-white">
                            {locale === 'es' ? type.es : type.en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Atmosphere Filter */}
                  <div>
                    <Label className="text-slate-900 dark:text-white font-semibold mb-3 block">
                      {locale === 'es' ? 'Ambiente' : 'Atmosphere'}
                    </Label>
                    <Select value={selectedAtmosphere} onValueChange={setSelectedAtmosphere}>
                      <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-slate-900 dark:text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        {atmosphereTypes.map((atmosphere) => (
                          <SelectItem key={atmosphere.id} value={atmosphere.id} className="text-slate-900 dark:text-white">
                            {locale === 'es' ? atmosphere.es : atmosphere.en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <Label className="text-slate-900 dark:text-white font-semibold mb-3 block">
                      {locale === 'es' ? 'Precio' : 'Price'}
                    </Label>
                    <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                      <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-slate-900 dark:text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        {priceRanges.map((price) => (
                          <SelectItem key={price.id} value={price.id} className="text-slate-900 dark:text-white">
                            {price.symbol} {locale === 'es' ? price.es : price.en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Drink Types */}
                  <div>
                    <Label className="text-slate-900 dark:text-white font-semibold mb-3 block">
                      {locale === 'es' ? 'Bebidas' : 'Drinks'}
                    </Label>
                    <div className="space-y-2">
                      {drinkTypes.slice(0, 4).map((drink) => (
                        <div key={drink.id} className="flex items-center">
                          <Checkbox
                            id={drink.id}
                            checked={selectedDrinks.includes(drink.id)}
                            onCheckedChange={() => handleDrinkToggle(drink.id)}
                            className="border-white/40 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
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
        </div>

        {/* Featured Bars */}
        {!searchQuery && selectedType === 'all' && selectedAtmosphere === 'all' && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <Music className="w-8 h-8 text-teal-400" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                {locale === 'es' ? 'Bares Destacados' : 'Featured Bars'}
              </h2>
            </div>
            <div className={`grid gap-8 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
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
            <h2 className="text-3xl font-bold text-white mb-8">
              {locale === 'es' ? 'Resultados de Búsqueda' : 'Search Results'}
            </h2>
          )}
          <div className={`grid gap-8 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
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
          <div className="text-center py-20">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-12 shadow-2xl max-w-md mx-auto">
              <Beer className="w-20 h-20 text-teal-400/50 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                {locale === 'es' ? 'No se encontraron bares' : 'No bars found'}
              </h3>
              <p className="text-white/70 mb-6">
                {locale === 'es' 
                  ? 'Intenta ajustar los filtros o la búsqueda'
                  : 'Try adjusting your filters or search'}
              </p>
              <Button
                onClick={resetFilters}
                className="bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white border-0 shadow-xl"
              >
                {locale === 'es' ? 'Limpiar Filtros' : 'Clear Filters'}
              </Button>
            </div>
          </div>
        )}

        {/* Premium Directory Navigation Section */}
        <div 
          className="text-center py-16"
        >
          <div className="relative max-w-4xl mx-auto">
            {/* Animated Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400/5 to-cyan-400/5 rounded-3xl blur-3xl" />
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl animate-pulse animation-delay-2s" />
            
            {/* Main Content Card */}
            <div className="relative bg-gradient-to-br from-slate-900/90 via-teal-900/30 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-teal-400/20 p-12 shadow-2xl hover:shadow-teal-400/20 transition-all duration-500">
              {/* Badge */}
              <div className="flex justify-center mb-6">
                <Badge className="bg-gradient-to-r from-teal-400/20 to-cyan-400/20 text-teal-300 px-4 py-1.5 text-xs font-bold tracking-wider uppercase border border-teal-400/30">
                  {locale === 'es' ? '🌟 Experiencia Premium' : '🌟 Premium Experience'}
                </Badge>
              </div>
              
              {/* Title */}
              <h3 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                  {locale === 'es' ? 'Explora la Vida Nocturna de Tepoztlán' : 'Explore Tepoztlán Nightlife'}
                </span>
              </h3>
              
              {/* Description */}
              <p className="text-white/70 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
                {locale === 'es' 
                  ? 'Descubre los mejores bares, pulquerías y cantinas con nuestro directorio interactivo. Filtra por ambiente, encuentra música en vivo y explora experiencias únicas.'
                  : 'Discover the best bars, pulquerías and cantinas with our interactive directory. Filter by atmosphere, find live music and explore unique experiences.'
                }
              </p>
              
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-xl p-4 border border-teal-400/20">
                  <div className="text-2xl font-bold text-teal-400">50+</div>
                  <div className="text-sm text-white/60">{locale === 'es' ? 'Lugares' : 'Venues'}</div>
                </div>
                <div className="bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-xl p-4 border border-cyan-400/20">
                  <div className="text-2xl font-bold text-cyan-400">4.5★</div>
                  <div className="text-sm text-white/60">{locale === 'es' ? 'Promedio' : 'Average'}</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl p-4 border border-emerald-400/20">
                  <div className="text-2xl font-bold text-emerald-400">1000+</div>
                  <div className="text-sm text-white/60">{locale === 'es' ? 'Reseñas' : 'Reviews'}</div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.location.href = `/${locale}/eat/bars-pulquerias/all-bars-pulquerias`}
                  size="lg"
                  className="group bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white border-0 shadow-xl hover:shadow-2xl hover:shadow-teal-500/30 transform hover:scale-[1.02] transition-all duration-300 px-8 py-4 text-lg font-semibold"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl group-hover:animate-bounce">🍻</span>
                    <span>
                      {locale === 'es' ? 'Ver Directorio Completo' : 'View Full Directory'}
                    </span>
                    <Beer className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </div>
                </Button>
                
                <Button
                  onClick={() => window.location.href = `/${locale}/eat/bars-pulquerias/map`}
                  size="lg"
                  variant="outline"
                  className="group bg-white/5 hover:bg-white/10 text-white border-teal-400/30 hover:border-teal-400/50 backdrop-blur-sm transition-all duration-300 px-8 py-4 text-lg font-semibold"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-teal-400 group-hover:scale-110 transition-transform" />
                    <span>
                      {locale === 'es' ? 'Ver en Mapa' : 'View on Map'}
                    </span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20">
          <Card className="bg-gradient-to-r from-teal-400/10 to-cyan-400/10 backdrop-blur-xl border-white/20 p-12 max-w-4xl mx-auto">
            <CardContent className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                {locale === 'es' 
                  ? '¿Tienes un bar o pulquería en Tepoztlán?' 
                  : 'Do you own a bar or pulqueria in Tepoztlán?'
                }
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                {locale === 'es' 
                  ? 'Únete a nuestra plataforma y conecta con miles de visitantes que buscan experiencias auténticas de vida nocturna en el corazón de este Pueblo Mágico.'
                  : 'Join our platform and connect with thousands of visitors looking for authentic nightlife experiences in the heart of this Magical Town.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white px-8 py-6 text-lg">
                  {locale === 'es' ? 'Registra tu Bar' : 'List Your Bar'}
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg">
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