'use client'

import { useState, useEffect } from 'react'
import { Locale } from '@/lib/i18n'
import { Restaurant, RestaurantService, cuisineTypes, atmosphereTypes, priceRanges } from '@/lib/restaurants'
import RestaurantCard from './RestaurantCard'
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

interface RestaurantsPageClientProps {
  locale: Locale
}


export default function RestaurantsPageClient({ locale }: RestaurantsPageClientProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCuisine, setSelectedCuisine] = useState('all')
  const [selectedAtmosphere, setSelectedAtmosphere] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [selectedDietary, setSelectedDietary] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'price' | 'name'>('featured')

  // Initialize restaurants
  useEffect(() => {
    const allRestaurants = RestaurantService.getAllRestaurants()
    setRestaurants(allRestaurants)
    setFilteredRestaurants(allRestaurants)
  }, [])

  // Filter and sort restaurants
  useEffect(() => {
    let filtered = RestaurantService.searchRestaurants(
      searchQuery,
      selectedCuisine,
      selectedAtmosphere,
      selectedPriceRange,
      selectedDietary
    )

    // Sort restaurants
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
          return RestaurantService.getRestaurantName(a, locale).localeCompare(
            RestaurantService.getRestaurantName(b, locale)
          )
        default:
          return 0
      }
    })

    setFilteredRestaurants(filtered)
  }, [searchQuery, selectedCuisine, selectedAtmosphere, selectedPriceRange, selectedDietary, sortBy, locale])

  const handleDietaryChange = (dietary: string, checked: boolean) => {
    if (checked) {
      setSelectedDietary([...selectedDietary, dietary])
    } else {
      setSelectedDietary(selectedDietary.filter(d => d !== dietary))
    }
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCuisine('all')
    setSelectedAtmosphere('all')
    setSelectedPriceRange('all')
    setSelectedDietary([])
  }

  const dietaryOptions = [
    { id: 'vegetarian', es: 'Vegetariano', en: 'Vegetarian', emoji: '🌱' },
    { id: 'vegan', es: 'Vegano', en: 'Vegan', emoji: '🌿' },
    { id: 'gluten-free', es: 'Sin Gluten', en: 'Gluten Free', emoji: '🌾' },
    { id: 'organic', es: 'Orgánico', en: 'Organic', emoji: '🍃' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-300/70 via-30% through-blue-400/50 through-60% to-indigo-400/40 dark:bg-gradient-to-b dark:from-sky-950 dark:via-sky-800 dark:via-30% dark:through-blue-800/70 dark:through-60% dark:to-indigo-900 relative overflow-hidden">
      {/* Ultra Premium Background */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs - independent light/dark controls */}
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-white/40 dark:bg-sky-400/15 rounded-full blur-3xl dark:blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-white/30 dark:bg-blue-400/10 rounded-full blur-3xl dark:blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-white/25 dark:bg-indigo-400/8 rounded-full blur-3xl dark:blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Premium mesh gradient - independent controls */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(224,242,254,0.4),_transparent_50%),radial-gradient(ellipse_at_bottom,_rgba(147,197,253,0.3),_transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.1),_transparent_50%),radial-gradient(ellipse_at_bottom,_rgba(99,102,241,0.1),_transparent_50%)]" />
        
        {/* Grid pattern overlay - independent opacity */}
        <div className="absolute inset-0 opacity-3 dark:opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(251, 146, 60, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 146, 60, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Premium Header */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-orange-400" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 blur-lg" />
              <Badge className="relative bg-gradient-to-r from-orange-400 to-red-400 text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                🍽️ {locale === 'es' ? 'Restaurantes & Terrazas' : 'Restaurants & Rooftop Dining'} 🍽️
              </Badge>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-red-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-slate-800 dark:text-white drop-shadow-lg dark:drop-shadow-2xl">
              {locale === 'es' ? 'Sabores de ' : 'Flavors of '}
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 dark:from-orange-300 dark:via-red-300 dark:to-yellow-300 bg-clip-text text-transparent drop-shadow-lg dark:drop-shadow-2xl">
              <span className="text-orange-500 dark:text-orange-300">TODO</span>TEPOZ
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-700 dark:text-white/80 font-light max-w-4xl mx-auto leading-relaxed mb-8">
            {locale === 'es' 
              ? 'Descubre la rica gastronomía de Tepoztlán. Desde cocina tradicional mexicana hasta fusión contemporánea.'
              : 'Discover the rich gastronomy of Tepoztlán. From traditional Mexican cuisine to contemporary fusion.'
            }
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-xl rounded-2xl border border-slate-300/20 dark:border-white/10 p-6 shadow-lg shadow-slate-300/15 dark:shadow-white/12 hover:bg-white/80 dark:hover:bg-white/8 hover:scale-105 dark:hover:scale-110 transition-all duration-300 dark:duration-500 cursor-pointer group">
              <div className="text-3xl font-bold text-orange-500 dark:text-orange-400 mb-2 drop-shadow-sm dark:drop-shadow-md">{restaurants.length}</div>
              <div className="text-slate-600 dark:text-white/70 text-sm group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-200 dark:duration-300">{locale === 'es' ? 'Restaurantes' : 'Restaurants'}</div>
            </div>
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-xl rounded-2xl border border-slate-300/20 dark:border-white/10 p-6 shadow-lg shadow-slate-300/15 dark:shadow-white/12 hover:bg-white/80 dark:hover:bg-white/8 hover:scale-105 dark:hover:scale-110 transition-all duration-300 dark:duration-500 cursor-pointer group">
              <div className="text-3xl font-bold text-red-500 dark:text-red-400 mb-2 drop-shadow-sm dark:drop-shadow-md">4.6</div>
              <div className="text-slate-600 dark:text-white/70 text-sm group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-200 dark:duration-300">{locale === 'es' ? 'Calificación Promedio' : 'Average Rating'}</div>
            </div>
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-xl rounded-2xl border border-slate-300/20 dark:border-white/10 p-6 shadow-lg shadow-slate-300/15 dark:shadow-white/12 hover:bg-white/80 dark:hover:bg-white/8 hover:scale-105 dark:hover:scale-110 transition-all duration-300 dark:duration-500 cursor-pointer group">
              <div className="text-3xl font-bold text-yellow-500 dark:text-yellow-400 mb-2 drop-shadow-sm dark:drop-shadow-md">2K+</div>
              <div className="text-slate-600 dark:text-white/70 text-sm group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-200 dark:duration-300">{locale === 'es' ? 'Reseñas' : 'Reviews'}</div>
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
                  placeholder={locale === 'es' ? 'Buscar restaurantes, platillos, cocina...' : 'Search restaurants, dishes, cuisine...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-white/80 dark:bg-white/10 backdrop-blur-sm dark:backdrop-blur-md border-slate-300/30 dark:border-white/20 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-white/50 hover:bg-white/90 dark:hover:bg-white/15 focus:bg-white/95 dark:focus:bg-white/15 transition-all duration-200 dark:duration-300"
                />
              </div>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-6 bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 dark:from-orange-400 dark:to-red-400 dark:hover:from-orange-500 dark:hover:to-red-500 text-white border-0 shadow-lg shadow-orange-400/20 dark:shadow-orange-400/30 hover:scale-105 dark:hover:scale-110 transition-all duration-200 dark:duration-300"
              >
                <Filter className="w-4 h-4 mr-2" />
                {locale === 'es' ? 'Filtros' : 'Filters'}
              </Button>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={(value: string) => setSortBy(value as 'featured' | 'rating' | 'price' | 'name')}>
                  <SelectTrigger className="w-48 bg-white/80 dark:bg-white/10 backdrop-blur-sm dark:backdrop-blur-md border-slate-300/30 dark:border-white/20 text-slate-900 dark:text-white hover:bg-white/90 dark:hover:bg-white/15 transition-all duration-200 dark:duration-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                    <SelectItem value="featured" className="text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">{locale === 'es' ? 'Destacados' : 'Featured'}</SelectItem>
                    <SelectItem value="rating" className="text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">{locale === 'es' ? 'Mejor Calificados' : 'Highest Rated'}</SelectItem>
                    <SelectItem value="price" className="text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">{locale === 'es' ? 'Precio' : 'Price'}</SelectItem>
                    <SelectItem value="name" className="text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">{locale === 'es' ? 'Nombre' : 'Name'}</SelectItem>
                  </SelectContent>
                </Select>

                <div className="text-slate-600 dark:text-white/70 text-sm">
                  {filteredRestaurants.length} {locale === 'es' ? 'resultados' : 'results'}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setViewMode('grid')}
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  className={viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-orange-400 to-red-400 text-white shadow-lg shadow-orange-400/20 dark:shadow-orange-400/30' 
                    : 'text-slate-600 dark:text-white/70 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10'
                  }
                >
                  Grid
                </Button>
                <Button
                  onClick={() => setViewMode('list')}
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  className={viewMode === 'list' 
                    ? 'bg-gradient-to-r from-orange-400 to-red-400 text-white shadow-lg shadow-orange-400/20 dark:shadow-orange-400/30' 
                    : 'text-slate-600 dark:text-white/70 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10'
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
                  {/* Cuisine Filter */}
                  <div>
                    <Label className="text-slate-800 dark:text-white font-semibold mb-3 block">{locale === 'es' ? 'Cocina' : 'Cuisine'}</Label>
                    <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                      <SelectTrigger className="bg-white/80 dark:bg-white/10 backdrop-blur-sm dark:backdrop-blur-md border-slate-300/30 dark:border-white/20 text-slate-900 dark:text-white hover:bg-white/90 dark:hover:bg-white/15 transition-all duration-200 dark:duration-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                        {cuisineTypes.map((cuisine) => (
                          <SelectItem key={cuisine.id} value={cuisine.id} className="text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">
                            {locale === 'es' ? cuisine.es : cuisine.en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Atmosphere Filter */}
                  <div>
                    <Label className="text-slate-800 dark:text-white font-semibold mb-3 block">{locale === 'es' ? 'Ambiente' : 'Atmosphere'}</Label>
                    <Select value={selectedAtmosphere} onValueChange={setSelectedAtmosphere}>
                      <SelectTrigger className="bg-white/80 dark:bg-white/10 backdrop-blur-sm dark:backdrop-blur-md border-slate-300/30 dark:border-white/20 text-slate-900 dark:text-white hover:bg-white/90 dark:hover:bg-white/15 transition-all duration-200 dark:duration-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                        {atmosphereTypes.map((atmosphere) => (
                          <SelectItem key={atmosphere.id} value={atmosphere.id} className="text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">
                            {locale === 'es' ? atmosphere.es : atmosphere.en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <Label className="text-slate-800 dark:text-white font-semibold mb-3 block">{locale === 'es' ? 'Precio' : 'Price'}</Label>
                    <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                      <SelectTrigger className="bg-white/80 dark:bg-white/10 backdrop-blur-sm dark:backdrop-blur-md border-slate-300/30 dark:border-white/20 text-slate-900 dark:text-white hover:bg-white/90 dark:hover:bg-white/15 transition-all duration-200 dark:duration-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                        {priceRanges.map((price) => (
                          <SelectItem key={price.id} value={price.id} className="text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">
                            {price.symbol} {locale === 'es' ? price.es : price.en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Dietary Restrictions */}
                  <div>
                    <Label className="text-slate-800 dark:text-white font-semibold mb-3 block">{locale === 'es' ? 'Dieta' : 'Dietary'}</Label>
                    <div className="space-y-2">
                      {dietaryOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={option.id}
                            checked={selectedDietary.includes(option.id)}
                            onCheckedChange={(checked) => handleDietaryChange(option.id, checked as boolean)}
                            className="border-white/30 data-[state=checked]:bg-orange-400 data-[state=checked]:border-orange-400"
                          />
                          <Label htmlFor={option.id} className="text-slate-700 dark:text-white/90 text-sm cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors duration-200 dark:duration-300">
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
                    className="bg-white/80 dark:bg-white/10 backdrop-blur-sm dark:backdrop-blur-md border border-slate-300/30 dark:border-white/20 text-slate-900 dark:text-white hover:bg-white/90 dark:hover:bg-white/20 hover:scale-105 dark:hover:scale-110 transition-all duration-200 dark:duration-300"
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
          {filteredRestaurants.map((restaurant, index) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              locale={locale}
              viewMode={viewMode}
              animationDelay={index * 100}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredRestaurants.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-xl rounded-3xl border border-slate-300/20 dark:border-white/10 p-16 shadow-xl shadow-slate-300/20 dark:shadow-white/15 max-w-2xl mx-auto">
              <div className="text-8xl mb-8 opacity-40 dark:opacity-50">🍽️</div>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-4 font-sans">
                {locale === 'es' ? 'No se encontraron restaurantes' : 'No restaurants found'}
              </h3>
              <p className="text-slate-600 dark:text-white/70 text-lg mb-8">
                {locale === 'es' 
                  ? 'Intenta ajustar los filtros o modificar tu búsqueda'
                  : 'Try adjusting your filters or modify your search'
                }
              </p>
              <Button
                onClick={clearFilters}
                className="bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white border-0 shadow-xl"
              >
                {locale === 'es' ? 'Limpiar Filtros' : 'Clear Filters'}
              </Button>
            </div>
          </div>
        )}

        {/* All Restaurants Directory Button */}
        <div className="text-center py-16">
          <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-xl rounded-3xl border border-slate-300/20 dark:border-white/10 p-12 shadow-xl shadow-slate-300/20 dark:shadow-white/15 max-w-4xl mx-auto hover:bg-white/80 dark:hover:bg-white/8 transition-all duration-300 dark:duration-500">
            <div className="text-6xl mb-6 opacity-60 dark:opacity-80">📊</div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4 font-sans">
              {locale === 'es' ? 'Directorio Completo' : 'Complete Directory'}
            </h2>
            <p className="text-slate-600 dark:text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              {locale === 'es' 
                ? 'Explora todos los restaurantes en una vista de tabla avanzada con filtros, búsqueda y exportación de datos.'
                : 'Explore all restaurants in an advanced table view with filters, search and data export capabilities.'
              }
            </p>
            <Button
              onClick={() => window.location.href = `/${locale}/eat/restaurants/all-restaurants`}
              size="lg"
              className="bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white border-0 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 px-8 py-4 text-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🗂️</span>
                <span className="font-semibold">
                  {locale === 'es' ? 'Ver Todos los Restaurantes' : 'View All Restaurants'}
                </span>
              </div>
            </Button>
          </div>
        </div>

        {/* Business Owner CTA */}
        <div className="text-center py-12">
          <Card className="bg-white/70 dark:from-orange-400/10 dark:to-red-400/10 backdrop-blur-md dark:backdrop-blur-xl border border-slate-300/20 dark:border-white/20 p-12 max-w-4xl mx-auto shadow-xl shadow-slate-300/20 dark:shadow-orange-400/20 hover:bg-white/80 hover:shadow-xl dark:hover:shadow-orange-400/30 transition-all duration-300 dark:duration-500">
            <CardContent className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
                {locale === 'es' 
                  ? '¿Tienes un restaurante en Tepoztlán?' 
                  : 'Do you own a restaurant in Tepoztlán?'
                }
              </h2>
              <p className="text-slate-600 dark:text-white/80 text-lg max-w-2xl mx-auto">
                {locale === 'es' 
                  ? 'Únete a nuestra plataforma y conecta con miles de visitantes que buscan experiencias gastronómicas auténticas en el corazón de este Pueblo Mágico.'
                  : 'Join our platform and connect with thousands of visitors looking for authentic culinary experiences in the heart of this Magical Town.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white px-8 py-6 text-lg">
                  <Star className="w-5 h-5 mr-2" />
                  {locale === 'es' ? 'Agregar mi Restaurante' : 'Add my Restaurant'}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-slate-400/30 dark:border-white/30 bg-white/80 dark:bg-white/10 text-slate-800 dark:text-white hover:bg-white/90 dark:hover:bg-white/20 px-8 py-6 text-lg hover:scale-105 dark:hover:scale-110 transition-all duration-200 dark:duration-300"
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