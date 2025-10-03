'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { AdvancedSearchService, SearchResult } from '@/lib/search'
import { BusinessFilters, BusinessListing } from '@/types/business'
import { buildLocalizedUrl } from '@/lib/url-mapping'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Search,
  MapPin,
  Star,
  Filter,
  Wifi,
  Car,
  CreditCard,
  Heart,
  X
} from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from '@/components/ui/empty'

interface SearchPageClientProps {
  locale: Locale
}

export default function SearchPageClient({ locale }: SearchPageClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<BusinessFilters>({})
  const [popularSearches] = useState<string[]>(AdvancedSearchService.getPopularSearches(locale))

  const performSearch = useCallback(async (searchQuery: string, searchFilters: BusinessFilters = {}) => {
    if (!searchQuery.trim() && Object.keys(searchFilters).length === 0) {
      setSearchResult(null)
      return
    }

    setIsLoading(true)
    try {
      const result = await AdvancedSearchService.search(searchQuery, {
        lang: locale,
        filters: searchFilters,
        fuzzySearch: true,
        includeAlternatives: true
      })
      setSearchResult(result)
    } catch (error) {
      console.error('Search error:', error)
      setSearchResult(null)
    } finally {
      setIsLoading(false)
    }
  }, [locale])

  // Debounced search
  const debouncedSearch = useCallback((searchQuery: string, searchFilters: BusinessFilters) => {
    setTimeout(() => performSearch(searchQuery, searchFilters), 300)
  }, [performSearch])

  // Update URL with search params
  const updateURL = useCallback((newQuery: string, newFilters: BusinessFilters) => {
    const params = new URLSearchParams()
    if (newQuery) params.set('q', newQuery)
    if (newFilters.category) params.set('category', newFilters.category)
    if (newFilters.priceRange?.length) params.set('price', newFilters.priceRange.join(','))
    if (newFilters.rating) params.set('rating', newFilters.rating.toString())
    
    const newURL = `${buildLocalizedUrl('buscar', locale)}?${params.toString()}`
    router.push(newURL, { scroll: false })
  }, [locale, router])

  // Handle search input change
  const handleSearchChange = (newQuery: string) => {
    setQuery(newQuery)
    debouncedSearch(newQuery, filters)
    updateURL(newQuery, filters)
  }

  // Handle filter changes
  const handleFilterChange = (newFilters: BusinessFilters) => {
    setFilters(newFilters)
    performSearch(query, newFilters)
    updateURL(query, newFilters)
  }

  // Initialize search from URL params
  useEffect(() => {
    const urlQuery = searchParams.get('q') || ''
    const urlCategory = searchParams.get('category') || ''
    const urlPrice = searchParams.get('price')?.split(',') || []
    const urlRating = parseFloat(searchParams.get('rating') || '0') || undefined

    const urlFilters: BusinessFilters = {}
    if (urlCategory) urlFilters.category = urlCategory
    if (urlPrice.length) urlFilters.priceRange = urlPrice
    if (urlRating) urlFilters.rating = urlRating

    setQuery(urlQuery)
    setFilters(urlFilters)

    if (urlQuery || Object.keys(urlFilters).length > 0) {
      performSearch(urlQuery, urlFilters)
    }
  }, [searchParams, performSearch])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Ultra Premium Background */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-sky-500/10 rounded-full blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Premium mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_transparent,_rgba(59,130,246,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(14,165,233,0.2))]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Premium Search Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-cyan-400" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 blur-lg" />
              <Badge className="relative bg-gradient-to-r from-cyan-400 to-blue-400 text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                🔍 {locale === 'es' ? 'Buscar Negocios' : 'Search Businesses'} 🔍
              </Badge>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-blue-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-white drop-shadow-2xl">
              {locale === 'es' ? 'Encuentra en ' : 'Find in '}
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-sky-300 bg-clip-text text-transparent drop-shadow-2xl">
              <span className="text-cyan-300">TODO</span>TEPOZ
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed mb-12">
            {locale === 'es' 
              ? 'Descubre los mejores negocios locales de Tepoztlán en un solo lugar'
              : 'Discover the best local businesses in Tepoztlán in one place'
            }
          </p>

          {/* Premium Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700 rounded-3xl" />
              
              {/* Glassmorphism search container */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/70 w-6 h-6" />
                    <Input
                      type="text"
                      placeholder={locale === 'es' ? 'Buscar restaurantes, hoteles, bares, tours...' : 'Search restaurants, hotels, bars, tours...'}
                      value={query}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="pl-16 pr-6 h-16 text-lg bg-transparent border-0 text-white placeholder-white/50 focus:ring-0 focus:outline-none"
                    />
                  </div>
                  <Button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="h-16 px-8 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-500 hover:to-blue-500 text-white border-0 shadow-xl font-semibold rounded-2xl"
                  >
                    <Filter className="w-5 h-5 mr-2" />
                    {locale === 'es' ? 'Filtros' : 'Filters'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Searches */}
        {!query && popularSearches.length > 0 && (
          <div className="text-center mb-12">
            <p className="text-white/70 text-lg mb-6">
              {locale === 'es' ? 'Búsquedas populares:' : 'Popular searches:'}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularSearches.slice(0, 6).map((search, index) => (
                <Badge 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 px-6 py-3 text-base cursor-pointer hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-xl"
                  onClick={() => handleSearchChange(search)}
                >
                  {search}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Premium Filters Panel */}
        {showFilters && (
          <div className="mb-12">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 font-sans text-center">
                {locale === 'es' ? 'Filtrar Búsqueda' : 'Filter Search'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Category Filter */}
                <div>
                  <Label className="text-lg font-semibold mb-4 block text-white">
                    {locale === 'es' ? 'Categoría' : 'Category'}
                  </Label>
                  <Select 
                    value={filters.category || ''} 
                    onValueChange={(value) => handleFilterChange({ ...filters, category: value || undefined })}
                  >
                    <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-12">
                      <SelectValue placeholder={locale === 'es' ? 'Todas las categorías' : 'All categories'} />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="" className="text-white">{locale === 'es' ? 'Todas' : 'All'}</SelectItem>
                      <SelectItem value="restaurant" className="text-white">{locale === 'es' ? 'Restaurantes' : 'Restaurants'}</SelectItem>
                      <SelectItem value="hotel" className="text-white">{locale === 'es' ? 'Hospedaje' : 'Hotels'}</SelectItem>
                      <SelectItem value="activity" className="text-white">{locale === 'es' ? 'Actividades' : 'Activities'}</SelectItem>
                      <SelectItem value="bar" className="text-white">{locale === 'es' ? 'Bares' : 'Bars'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <Label className="text-lg font-semibold mb-4 block text-white">
                    {locale === 'es' ? 'Rango de Precio' : 'Price Range'}
                  </Label>
                  <div className="space-y-4">
                    {['$', '$$', '$$$', '$$$$'].map((price) => (
                      <div key={price} className="flex items-center space-x-3 group">
                        <Checkbox 
                          id={`price-${price}`}
                          checked={filters.priceRange?.includes(price) || false}
                          onCheckedChange={(checked) => {
                            const currentPrices = filters.priceRange || []
                            const newPrices = checked 
                              ? [...currentPrices, price]
                              : currentPrices.filter(p => p !== price)
                            handleFilterChange({ ...filters, priceRange: newPrices.length > 0 ? newPrices : undefined })
                          }}
                          className="border-white/30 data-[state=checked]:bg-cyan-400 data-[state=checked]:border-cyan-400"
                        />
                        <Label htmlFor={`price-${price}`} className="text-white/90 text-base font-medium group-hover:text-white cursor-pointer">
                          {price} {price === '$' ? '(Económico)' : price === '$$' ? '(Moderado)' : price === '$$$' ? '(Premium)' : '(Lujo)'}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <Label className="text-lg font-semibold mb-4 block text-white">
                    {locale === 'es' ? 'Calificación Mínima' : 'Minimum Rating'}
                  </Label>
                  <Select 
                    value={filters.rating?.toString() || ''} 
                    onValueChange={(value) => handleFilterChange({ ...filters, rating: value ? parseFloat(value) : undefined })}
                  >
                    <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-12">
                      <SelectValue placeholder={locale === 'es' ? 'Cualquier calificación' : 'Any rating'} />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="" className="text-white">{locale === 'es' ? 'Cualquiera' : 'Any'}</SelectItem>
                      <SelectItem value="3" className="text-white">3+ ⭐ {locale === 'es' ? '(Bueno)' : '(Good)'}</SelectItem>
                      <SelectItem value="4" className="text-white">4+ ⭐ {locale === 'es' ? '(Muy Bueno)' : '(Very Good)'}</SelectItem>
                      <SelectItem value="4.5" className="text-white">4.5+ ⭐ {locale === 'es' ? '(Excelente)' : '(Excellent)'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Clear Filters */}
              {(filters.category || filters.priceRange?.length || filters.rating) && (
                <div className="text-center mt-8">
                  <Button 
                    onClick={() => handleFilterChange({})}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-8 py-3 rounded-2xl font-semibold"
                  >
                    <X className="w-5 h-5 mr-2" />
                    {locale === 'es' ? 'Limpiar Filtros' : 'Clear Filters'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Search Results */}
        <div className="space-y-8">
          {isLoading && (
            <div className="text-center py-16">
              <Spinner className="h-12 w-12 text-cyan-400 mx-auto" />
              <p className="mt-6 text-white/80 text-xl">
                {locale === 'es' ? 'Buscando negocios...' : 'Searching businesses...'}
              </p>
            </div>
          )}

          {!isLoading && searchResult && (
            <>
              {/* Search Stats */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white mb-2">
                    {searchResult.businesses.length}
                  </p>
                  <p className="text-white/70 text-lg">
                    {locale === 'es' 
                      ? `negocio${searchResult.businesses.length !== 1 ? 's' : ''} encontrado${searchResult.businesses.length !== 1 ? 's' : ''}`
                      : `business${searchResult.businesses.length !== 1 ? 'es' : ''} found`
                    }
                  </p>
                </div>
              </div>

              {/* Premium Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchResult.businesses.map((business: BusinessListing) => (
                  <div key={business.id} className="group relative animate-fade-in-up">
                    {/* Card glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 rounded-3xl" />
                    
                    {/* Glassmorphism card */}
                    <Card className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl hover:shadow-3xl overflow-hidden transform-gpu transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/15">
                      <div className="relative h-64 overflow-hidden">
                        {business.images?.[0] ? (
                          <Image
                            src={business.images[0]}
                            alt={typeof business.name === 'string' ? business.name : business.name[locale]}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-400/20" />
                            <span className="relative text-white text-6xl drop-shadow-2xl">
                              {business.category === 'restaurant' ? '🍽️' :
                               business.category === 'hotel' ? '🏨' :
                               business.category === 'experience' ? '🎯' :
                               business.category === 'service' ? '🔧️' : '🛍️'}
                            </span>
                          </div>
                        )}
                        
                        {/* Premium accent gradient bar */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-80 group-hover:h-2 transition-all duration-500" />

                        {/* Premium Favorite Button */}
                        <div className="absolute top-4 right-4">
                          <Button
                            size="sm"
                            className="h-10 w-10 p-0 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 rounded-full"
                          >
                            <Heart className="h-5 w-5 text-white" />
                          </Button>
                        </div>
                      </div>

                      <CardContent className="p-8">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="font-bold text-xl text-white font-sans line-clamp-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-300 group-hover:to-blue-300 transition-all">
                            {typeof business.name === 'string' ? business.name : business.name[locale]}
                          </h3>
                        </div>

                        {business.rating && (
                          <div className="flex items-center mb-4">
                            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="ml-2 text-sm font-bold text-white">{business.rating}</span>
                              {business.reviewCount && (
                                <span className="ml-2 text-xs text-white/70">
                                  ({business.reviewCount})
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {business.location?.address && (
                          <div className="flex items-center text-sm text-white/70 mb-4">
                            <MapPin className="w-4 h-4 mr-2 text-cyan-400" />
                            <span className="line-clamp-1">{business.location.address[locale]}</span>
                          </div>
                        )}

                        {/* Premium price and amenities */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 mb-6">
                          <div className="flex items-center justify-between mb-3">
                            {business.priceRange && (
                              <span className="text-lg font-bold text-cyan-400">
                                {business.priceRange}
                              </span>
                            )}
                            
                            {/* Amenities */}
                            <div className="flex space-x-2">
                              {business.hasWifi && <Wifi className="w-4 h-4 text-white/60" />}
                              {business.hasParking && <Car className="w-4 h-4 text-white/60" />}
                              {business.acceptsCards && <CreditCard className="w-4 h-4 text-white/60" />}
                            </div>
                          </div>
                          
                          <Link href={buildLocalizedUrl(`business/${business.slug[locale]}`, locale)}>
                            <Button className="w-full bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-500 hover:to-blue-500 text-white border-0 shadow-xl font-semibold">
                              {locale === 'es' ? 'Ver Detalles' : 'View Details'}
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              {/* No Results with Empty Component */}
              {searchResult.businesses.length === 0 && (
                <div className="py-20">
                  <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-12 shadow-2xl max-w-2xl mx-auto">
                    <Empty>
                      <EmptyHeader>
                        <EmptyMedia>
                          <div className="text-8xl opacity-50">🔍</div>
                        </EmptyMedia>
                        <EmptyTitle className="text-3xl font-bold text-white font-sans">
                          {locale === 'es' ? 'No se encontraron negocios' : 'No businesses found'}
                        </EmptyTitle>
                        <EmptyDescription className="text-white/70 text-lg">
                          {locale === 'es'
                            ? 'Intenta con diferentes palabras clave o ajusta los filtros'
                            : 'Try different keywords or adjust your filters'
                          }
                        </EmptyDescription>
                      </EmptyHeader>

                      {/* Suggestions */}
                      {searchResult.suggestions && searchResult.suggestions.length > 0 && (
                        <div className="mt-8">
                          <p className="text-white/80 text-lg mb-4">
                            {locale === 'es' ? '¿Quisiste decir?' : 'Did you mean?'}
                          </p>
                          <div className="flex flex-wrap justify-center gap-3">
                            {searchResult.suggestions.map((suggestion, index) => (
                              <Badge
                                key={index}
                                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 px-4 py-2 cursor-pointer hover:bg-white/20 hover:scale-105 transition-all duration-300"
                                onClick={() => handleSearchChange(suggestion)}
                              >
                                {suggestion}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </Empty>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Premium Welcome State */}
          {!isLoading && !searchResult && !query && (
            <div className="text-center py-20">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-16 shadow-2xl max-w-4xl mx-auto">
                <div className="text-8xl mb-8 opacity-80">🏔️</div>
                <h3 className="text-4xl font-bold text-white mb-6 font-sans">
                  {locale === 'es' ? 'Descubre los Mejores Negocios' : 'Discover the Best Businesses'}
                </h3>
                <p className="text-white/70 text-xl mb-12">
                  {locale === 'es' 
                    ? 'Encuentra restaurantes, hospedajes, bares, tours y mucho más en Tepoztlán'
                    : 'Find restaurants, accommodations, bars, tours and much more in Tepoztlán'
                  }
                </p>
                
                {/* Quick category buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: locale === 'es' ? 'Restaurantes' : 'Restaurants', emoji: '🍽️', query: 'restaurantes' },
                    { name: locale === 'es' ? 'Hospedajes' : 'Hotels', emoji: '🏨', query: 'hoteles' },
                    { name: locale === 'es' ? 'Bares' : 'Bars', emoji: '🍹', query: 'bares' },
                    { name: locale === 'es' ? 'Tours' : 'Tours', emoji: '🗺️', query: 'tours' }
                  ].map((category) => (
                    <Button
                      key={category.name}
                      onClick={() => handleSearchChange(category.query)}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 p-6 rounded-2xl flex-col h-auto space-y-2 hover:scale-105 transition-all duration-300"
                    >
                      <span className="text-3xl">{category.emoji}</span>
                      <span className="font-semibold">{category.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}