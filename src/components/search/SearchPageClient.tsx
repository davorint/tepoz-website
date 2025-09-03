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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {locale === 'es' ? 'Buscar en TODOTEPOZ' : 'Search TODOTEPOZ'}
          </h1>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder={locale === 'es' ? 'Buscar restaurantes, hoteles, actividades...' : 'Search restaurants, hotels, activities...'}
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
            <Button 
              onClick={() => setShowFilters(!showFilters)}
              variant="outline" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <Filter className="w-4 h-4 mr-2" />
              {locale === 'es' ? 'Filtros' : 'Filters'}
            </Button>
          </div>

          {/* Popular Searches */}
          {!query && popularSearches.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 mr-2">
                {locale === 'es' ? 'Búsquedas populares:' : 'Popular searches:'}
              </span>
              {popularSearches.slice(0, 5).map((search, index) => (
                <Badge 
                  key={index}
                  variant="secondary" 
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSearchChange(search)}
                >
                  {search}
                </Badge>
              ))}
            </div>
          )}

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    {locale === 'es' ? 'Categoría' : 'Category'}
                  </Label>
                  <Select 
                    value={filters.category || ''} 
                    onValueChange={(value) => handleFilterChange({ ...filters, category: value || undefined })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={locale === 'es' ? 'Todas las categorías' : 'All categories'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">{locale === 'es' ? 'Todas' : 'All'}</SelectItem>
                      <SelectItem value="restaurant">{locale === 'es' ? 'Restaurantes' : 'Restaurants'}</SelectItem>
                      <SelectItem value="hotel">{locale === 'es' ? 'Hospedaje' : 'Hotels'}</SelectItem>
                      <SelectItem value="activity">{locale === 'es' ? 'Actividades' : 'Activities'}</SelectItem>
                      <SelectItem value="bar">{locale === 'es' ? 'Bares' : 'Bars'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    {locale === 'es' ? 'Precio' : 'Price Range'}
                  </Label>
                  <div className="space-y-2">
                    {['$', '$$', '$$$', '$$$$'].map((price) => (
                      <div key={price} className="flex items-center space-x-2">
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
                        />
                        <Label htmlFor={`price-${price}`} className="text-sm">
                          {price}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    {locale === 'es' ? 'Calificación mínima' : 'Minimum Rating'}
                  </Label>
                  <Select 
                    value={filters.rating?.toString() || ''} 
                    onValueChange={(value) => handleFilterChange({ ...filters, rating: value ? parseFloat(value) : undefined })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={locale === 'es' ? 'Cualquier calificación' : 'Any rating'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">{locale === 'es' ? 'Cualquiera' : 'Any'}</SelectItem>
                      <SelectItem value="3">3+ ⭐</SelectItem>
                      <SelectItem value="4">4+ ⭐</SelectItem>
                      <SelectItem value="4.5">4.5+ ⭐</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Clear Filters */}
              {(filters.category || filters.priceRange?.length || filters.rating) && (
                <Button 
                  variant="outline" 
                  onClick={() => handleFilterChange({})}
                  className="mt-4"
                >
                  <X className="w-4 h-4 mr-2" />
                  {locale === 'es' ? 'Limpiar filtros' : 'Clear filters'}
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Search Results */}
        <div className="space-y-6">
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-tepoztlan-sunset"></div>
              <p className="mt-4 text-gray-600">
                {locale === 'es' ? 'Buscando...' : 'Searching...'}
              </p>
            </div>
          )}

          {!isLoading && searchResult && (
            <>
              {/* Search Stats */}
              <div className="text-sm text-gray-600">
                {locale === 'es' 
                  ? `${searchResult.businesses.length} resultado${searchResult.businesses.length !== 1 ? 's' : ''} encontrado${searchResult.businesses.length !== 1 ? 's' : ''}`
                  : `${searchResult.businesses.length} result${searchResult.businesses.length !== 1 ? 's' : ''} found`
                }
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResult.businesses.map((business: BusinessListing) => (
                  <Card key={business.id} className="hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48 rounded-t-lg overflow-hidden">
                      {business.images?.[0] ? (
                        <Image
                          src={business.images[0]}
                          alt={typeof business.name === 'string' ? business.name : business.name[locale]}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-tepoztlan-sunset to-tepoztlan-earth flex items-center justify-center">
                          <span className="text-white text-4xl">
                            {business.category === 'restaurant' ? '🍽️' :
                             business.category === 'hotel' ? '🏨' :
                             business.category === 'experience' ? '🎯' :
                             business.category === 'service' ? '🛠️' : '🛍️'}
                          </span>
                        </div>
                      )}
                      
                      {/* Favorite Button */}
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute top-2 right-2 h-8 w-8 p-0"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>

                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                          {typeof business.name === 'string' ? business.name : business.name[locale]}
                        </h3>
                      </div>

                      {business.rating && (
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm font-medium">{business.rating}</span>
                          </div>
                          {business.reviewCount && (
                            <span className="ml-2 text-sm text-gray-600">
                              ({business.reviewCount} {locale === 'es' ? 'reseñas' : 'reviews'})
                            </span>
                          )}
                        </div>
                      )}

                      {business.location?.address && (
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="line-clamp-1">{business.location.address[locale]}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {business.priceRange && (
                            <span className="text-sm font-medium text-tepoztlan-sunset">
                              {business.priceRange}
                            </span>
                          )}
                          
                          {/* Amenities */}
                          <div className="flex space-x-1">
                            {business.hasWifi && <Wifi className="w-4 h-4 text-gray-400" />}
                            {business.hasParking && <Car className="w-4 h-4 text-gray-400" />}
                            {business.acceptsCards && <CreditCard className="w-4 h-4 text-gray-400" />}
                          </div>
                        </div>

                        <Link href={buildLocalizedUrl(`business/${business.slug[locale]}`, locale)}>
                          <Button size="sm">
                            {locale === 'es' ? 'Ver detalles' : 'View details'}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* No Results */}
              {searchResult.businesses.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {locale === 'es' ? 'No se encontraron resultados' : 'No results found'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {locale === 'es' 
                      ? 'Intenta con diferentes palabras clave o ajusta los filtros'
                      : 'Try different keywords or adjust your filters'
                    }
                  </p>
                  
                  {/* Suggestions */}
                  {searchResult.suggestions && searchResult.suggestions.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        {locale === 'es' ? '¿Quisiste decir?' : 'Did you mean?'}
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {searchResult.suggestions.map((suggestion, index) => (
                          <Badge 
                            key={index}
                            variant="outline" 
                            className="cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSearchChange(suggestion)}
                          >
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* No search performed */}
          {!isLoading && !searchResult && !query && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏔️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === 'es' ? 'Descubre Tepoztlán' : 'Discover Tepoztlán'}
              </h3>
              <p className="text-gray-600">
                {locale === 'es' 
                  ? 'Busca restaurantes, hoteles, actividades y más'
                  : 'Search for restaurants, hotels, activities and more'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}