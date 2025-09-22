'use client'

import { useState, useEffect } from 'react'
import { Locale } from '@/lib/i18n'
import { StreetFood, StreetFoodService, streetFoodTypes, venueTypes, priceRanges } from '@/lib/street-food'
import StreetFoodCard from './StreetFoodCard'
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

interface StreetFoodPageClientProps {
  locale: Locale
}


export default function StreetFoodPageClient({ locale }: StreetFoodPageClientProps) {
  const [, setStreetFoods] = useState<StreetFood[]>([])
  const [filteredStreetFoods, setFilteredStreetFoods] = useState<StreetFood[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedVenue, setSelectedVenue] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [selectedDietary, setSelectedDietary] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'price' | 'name'>('featured')

  // Initialize street foods
  useEffect(() => {
    const allStreetFoods = StreetFoodService.getAllStreetFoods()
    setStreetFoods(allStreetFoods)
    setFilteredStreetFoods(allStreetFoods)
  }, [])

  // Filter and sort street foods
  useEffect(() => {
    let filtered = StreetFoodService.searchStreetFoods(
      searchQuery,
      selectedType,
      selectedVenue,
      selectedPriceRange,
      selectedDietary
    )

    // Sort street foods
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return b.rating - a.rating
        case 'rating':
          return b.rating - a.rating
        case 'price':
          const priceOrder = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 }
          return priceOrder[a.priceRange] - priceOrder[b.priceRange]
        case 'name':
          return StreetFoodService.getStreetFoodName(a, locale).localeCompare(
            StreetFoodService.getStreetFoodName(b, locale)
          )
        default:
          return 0
      }
    })

    setFilteredStreetFoods(filtered)
  }, [searchQuery, selectedType, selectedVenue, selectedPriceRange, selectedDietary, sortBy, locale])

  const handleDietaryChange = (dietary: string, checked: boolean) => {
    if (checked) {
      setSelectedDietary([...selectedDietary, dietary])
    } else {
      setSelectedDietary(selectedDietary.filter(d => d !== dietary))
    }
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedType('all')
    setSelectedVenue('all')
    setSelectedPriceRange('all')
    setSelectedDietary([])
  }

  const dietaryOptions = [
    { id: 'vegetarian', es: 'Vegetariano', en: 'Vegetarian', emoji: '🌱' },
    { id: 'vegan', es: 'Vegano', en: 'Vegan', emoji: '🌿' },
    { id: 'gluten-free', es: 'Sin Gluten', en: 'Gluten Free', emoji: '🌾' },
    { id: 'spicy', es: 'Picante', en: 'Spicy', emoji: '🌶️' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-300/70 via-blue-400/50 to-indigo-400/40 dark:bg-gradient-to-b dark:from-slate-950 dark:via-emerald-800 dark:to-slate-900 relative overflow-hidden">
      {/* Ultra Premium Background - Street Food Theme */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-white/40 dark:bg-green-500/15 rounded-full blur-3xl dark:blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-white/30 dark:bg-yellow-500/10 rounded-full blur-3xl dark:blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-white/25 dark:bg-lime-500/8 rounded-full blur-3xl dark:blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Premium mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(224,242,254,0.4),_transparent_50%),radial-gradient(ellipse_at_bottom,_rgba(147,197,253,0.3),_transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(34,197,94,0.1),_transparent_50%),radial-gradient(ellipse_at_bottom,_rgba(234,179,8,0.1),_transparent_50%)]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-3 dark:opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Premium Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-green-400" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-yellow-400 blur-lg" />
              <Badge className="relative bg-gradient-to-r from-green-400 to-yellow-400 text-black px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                🌮 {locale === 'es' ? 'Comida Callejera & Antojitos' : 'Street Food & Local Snacks'} 🌮
              </Badge>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-yellow-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-slate-800 dark:text-white drop-shadow-lg dark:drop-shadow-2xl">
              {locale === 'es' ? 'Sabores de la ' : 'Flavors of the '}
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-300 via-yellow-300 to-lime-300 bg-clip-text text-transparent drop-shadow-2xl">
              <span className="text-green-300">CALLE</span>TEPOZ
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-700 dark:text-white/80 font-light max-w-4xl mx-auto leading-relaxed mb-8">
            {locale === 'es' 
              ? 'Descubre los auténticos sabores callejeros de Tepoztlán. Desde antojitos tradicionales hasta delicias del mercado local.'
              : 'Discover the authentic street flavors of Tepoztlán. From traditional antojitos to local market delights.'
            }
          </p>

          {/* Stats - Use static data to prevent hydration issues */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-xl rounded-2xl border border-slate-300/20 dark:border-white/10 p-6 shadow-lg shadow-slate-300/15 dark:shadow-white/12 hover:bg-white/80 dark:hover:bg-white/8 hover:scale-105 dark:hover:scale-110 transition-all duration-300 dark:duration-500 cursor-pointer group">
              <div className="text-3xl font-bold text-green-400 mb-2">6</div>
              <div className="text-slate-600 dark:text-white/70 text-sm group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-200 dark:duration-300">{locale === 'es' ? 'Puestos' : 'Street Vendors'}</div>
            </div>
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-xl rounded-2xl border border-slate-300/20 dark:border-white/10 p-6 shadow-lg shadow-slate-300/15 dark:shadow-white/12 hover:bg-white/80 dark:hover:bg-white/8 hover:scale-105 dark:hover:scale-110 transition-all duration-300 dark:duration-500 cursor-pointer group">
              <div className="text-3xl font-bold text-yellow-400 mb-2">4.8</div>
              <div className="text-slate-600 dark:text-white/70 text-sm group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-200 dark:duration-300">{locale === 'es' ? 'Calificación Promedio' : 'Average Rating'}</div>
            </div>
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-xl rounded-2xl border border-slate-300/20 dark:border-white/10 p-6 shadow-lg shadow-slate-300/15 dark:shadow-white/12 hover:bg-white/80 dark:hover:bg-white/8 hover:scale-105 dark:hover:scale-110 transition-all duration-300 dark:duration-500 cursor-pointer group">
              <div className="text-3xl font-bold text-lime-400 mb-2">1.5K+</div>
              <div className="text-slate-600 dark:text-white/70 text-sm group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-200 dark:duration-300">{locale === 'es' ? 'Reseñas' : 'Reviews'}</div>
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
                  placeholder={locale === 'es' ? 'Buscar antojitos, tacos, puestos...' : 'Search antojitos, tacos, vendors...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50"
                />
              </div>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-6 bg-gradient-to-r from-green-400 to-yellow-400 hover:from-green-500 hover:to-yellow-500 text-black border-0 shadow-xl"
              >
                <Filter className="w-4 h-4 mr-2" />
                {locale === 'es' ? 'Filtros' : 'Filters'}
              </Button>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={(value: string) => setSortBy(value as 'featured' | 'rating' | 'price' | 'name')}>
                  <SelectTrigger className="w-48 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="featured" className="text-white">{locale === 'es' ? 'Destacados' : 'Featured'}</SelectItem>
                    <SelectItem value="rating" className="text-white">{locale === 'es' ? 'Mejor Calificados' : 'Highest Rated'}</SelectItem>
                    <SelectItem value="price" className="text-white">{locale === 'es' ? 'Precio' : 'Price'}</SelectItem>
                    <SelectItem value="name" className="text-white">{locale === 'es' ? 'Nombre' : 'Name'}</SelectItem>
                  </SelectContent>
                </Select>

                <div className="text-slate-600 dark:text-white/70 text-sm group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-200 dark:duration-300">
                  {filteredStreetFoods.length} {locale === 'es' ? 'resultados' : 'results'}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setViewMode('grid')}
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  className={viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-green-400 to-yellow-400 text-black' 
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
                    ? 'bg-gradient-to-r from-green-400 to-yellow-400 text-black' 
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
                  {/* Type Filter */}
                  <div>
                    <Label className="text-white font-semibold mb-3 block">{locale === 'es' ? 'Tipo' : 'Type'}</Label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        {streetFoodTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id} className="text-white">
                            {locale === 'es' ? type.es : type.en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Venue Filter */}
                  <div>
                    <Label className="text-white font-semibold mb-3 block">{locale === 'es' ? 'Lugar' : 'Venue'}</Label>
                    <Select value={selectedVenue} onValueChange={setSelectedVenue}>
                      <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        {venueTypes.map((venue) => (
                          <SelectItem key={venue.id} value={venue.id} className="text-white">
                            {locale === 'es' ? venue.es : venue.en}
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
                            {price.symbol} {locale === 'es' ? price.es : price.en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Dietary Restrictions */}
                  <div>
                    <Label className="text-white font-semibold mb-3 block">{locale === 'es' ? 'Dieta' : 'Dietary'}</Label>
                    <div className="space-y-2">
                      {dietaryOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={option.id}
                            checked={selectedDietary.includes(option.id)}
                            onCheckedChange={(checked) => handleDietaryChange(option.id, checked as boolean)}
                            className="border-white/30 data-[state=checked]:bg-green-400 data-[state=checked]:border-green-400"
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
          {filteredStreetFoods.map((streetFood, index) => (
            <StreetFoodCard
              key={streetFood.id}
              streetFood={streetFood}
              locale={locale}
              viewMode={viewMode}
              animationDelay={index * 100}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredStreetFoods.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-16 shadow-2xl max-w-2xl mx-auto">
              <div className="text-8xl mb-8 opacity-50">🌮</div>
              <h3 className="text-3xl font-bold text-white mb-4 font-sans">
                {locale === 'es' ? 'No se encontró comida callejera' : 'No street food found'}
              </h3>
              <p className="text-white/70 text-lg mb-8">
                {locale === 'es' 
                  ? 'Intenta ajustar los filtros o modificar tu búsqueda'
                  : 'Try adjusting your filters or modify your search'
                }
              </p>
              <Button
                onClick={clearFilters}
                className="bg-gradient-to-r from-green-400 to-yellow-400 hover:from-green-500 hover:to-yellow-500 text-black border-0 shadow-xl"
              >
                {locale === 'es' ? 'Limpiar Filtros' : 'Clear Filters'}
              </Button>
            </div>
          </div>
        )}

        {/* All Street Food Directory Button */}
        <div className="text-center py-16">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-12 shadow-2xl max-w-4xl mx-auto">
            <div className="text-6xl mb-6 opacity-80">📊</div>
            <h2 className="text-3xl font-bold text-white mb-4 font-sans">
              {locale === 'es' ? 'Directorio Completo' : 'Complete Directory'}
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              {locale === 'es' 
                ? 'Explora toda la comida callejera en una vista de tabla avanzada con filtros, búsqueda y exportación de datos.'
                : 'Explore all street food in an advanced table view with filters, search and data export capabilities.'
              }
            </p>
            <Button
              onClick={() => window.location.href = `/${locale}/eat/street-food/all-street-food`}
              size="lg"
              className="bg-gradient-to-r from-green-400 to-yellow-400 hover:from-green-500 hover:to-yellow-500 text-black border-0 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 px-8 py-4 text-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🗂️</span>
                <span className="font-semibold">
                  {locale === 'es' ? 'Ver Toda la Comida Callejera' : 'View All Street Food'}
                </span>
              </div>
            </Button>
          </div>
        </div>

        {/* Business Owner CTA */}
        <div className="text-center py-12">
          <Card className="bg-gradient-to-r from-green-400/10 to-yellow-400/10 backdrop-blur-xl border-white/20 p-12 max-w-4xl mx-auto">
            <CardContent className="space-y-6">
              <h2 className="text-3xl font-bold text-white">
                {locale === 'es' 
                  ? '¿Tienes un puesto de comida en Tepoztlán?' 
                  : 'Do you have a food stand in Tepoztlán?'
                }
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                {locale === 'es' 
                  ? 'Únete a nuestra plataforma y conecta con miles de visitantes que buscan auténticos sabores callejeros y antojitos tradicionales en este Pueblo Mágico.'
                  : 'Join our platform and connect with thousands of visitors looking for authentic street flavors and traditional antojitos in this Magical Town.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-green-400 to-yellow-400 hover:from-green-500 hover:to-yellow-500 text-black px-8 py-6 text-lg">
                  <Star className="w-5 h-5 mr-2" />
                  {locale === 'es' ? 'Agregar mi Puesto' : 'Add my Stand'}
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