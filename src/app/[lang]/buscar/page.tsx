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
  TrendingUp,
  X
} from 'lucide-react'

interface SearchPageProps {
  params: Promise<{ lang: string }>
}

export default async function SearchPage({ params }: SearchPageProps) {
  const { lang } = await params
  const locale = lang as Locale
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
        locale,
        filters: searchFilters,
        fuzzySearch: true,
        includeAlternatives: true
      })
      setSearchResult(result)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }, [locale])

  // Debounced search function
  const debouncedSearch = useCallback((searchQuery: string, searchFilters: BusinessFilters) => {
    const timeoutId = setTimeout(() => performSearch(searchQuery, searchFilters), 300)
    return () => clearTimeout(timeoutId)
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
    debouncedSearch(query, newFilters)
    updateURL(query, newFilters)
  }

  // Clear all filters
  const clearFilters = () => {
    const clearedFilters: BusinessFilters = {}
    setFilters(clearedFilters)
    debouncedSearch(query, clearedFilters)
    updateURL(query, clearedFilters)
  }

  // Initial search from URL params
  useEffect(() => {
    const urlQuery = searchParams.get('q') || ''
    const urlFilters: BusinessFilters = {
      category: searchParams.get('category') || undefined,
      priceRange: searchParams.get('price')?.split(',') || undefined,
      rating: searchParams.get('rating') ? parseFloat(searchParams.get('rating')!) : undefined
    }
    
    if (urlQuery || Object.values(urlFilters).some(v => v !== undefined)) {
      setQuery(urlQuery)
      setFilters(urlFilters)
      performSearch(urlQuery, urlFilters)
    }
  }, [searchParams, performSearch])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {locale === 'es' ? 'Buscar en Tepoztlán' : 'Search in Tepoztlán'}
        </h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder={locale === 'es' ? 'Buscar hoteles, restaurantes, experiencias...' : 'Search hotels, restaurants, experiences...'}
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 text-lg h-12"
          />
        </div>

        {/* Popular Searches */}
        {!query && !searchResult && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">
              {locale === 'es' ? 'Búsquedas populares:' : 'Popular searches:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSearchChange(search)}
                  className="text-xs"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {search}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="sticky top-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {locale === 'es' ? 'Filtros' : 'Filters'}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              {/* Category Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  {locale === 'es' ? 'Categoría' : 'Category'}
                </Label>
                <Select 
                  value={filters.category || ''} 
                  onValueChange={(value) => handleFilterChange({...filters, category: value || undefined})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={locale === 'es' ? 'Todas las categorías' : 'All categories'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">{locale === 'es' ? 'Todas' : 'All'}</SelectItem>
                    <SelectItem value="hotel">{locale === 'es' ? 'Hoteles' : 'Hotels'}</SelectItem>
                    <SelectItem value="restaurant">{locale === 'es' ? 'Restaurantes' : 'Restaurants'}</SelectItem>
                    <SelectItem value="experience">{locale === 'es' ? 'Experiencias' : 'Experiences'}</SelectItem>
                    <SelectItem value="service">{locale === 'es' ? 'Servicios' : 'Services'}</SelectItem>
                    <SelectItem value="shop">{locale === 'es' ? 'Compras' : 'Shopping'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  {locale === 'es' ? 'Rango de Precio' : 'Price Range'}
                </Label>
                <div className="space-y-2">
                  {['$', '$$', '$$$', '$$$$'].map((price) => (
                    <div key={price} className="flex items-center space-x-2">
                      <Checkbox
                        id={price}
                        checked={filters.priceRange?.includes(price) || false}
                        onCheckedChange={(checked) => {
                          const currentRange = filters.priceRange || []
                          const newRange = checked
                            ? [...currentRange, price]
                            : currentRange.filter(p => p !== price)
                          handleFilterChange({...filters, priceRange: newRange.length ? newRange : undefined})
                        }}
                      />
                      <Label htmlFor={price} className="text-sm">{price}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  {locale === 'es' ? 'Calificación Mínima' : 'Minimum Rating'}
                </Label>
                <Select 
                  value={filters.rating?.toString() || ''} 
                  onValueChange={(value) => handleFilterChange({...filters, rating: value ? parseFloat(value) : undefined})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={locale === 'es' ? 'Cualquier calificación' : 'Any rating'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">{locale === 'es' ? 'Cualquiera' : 'Any'}</SelectItem>
                    <SelectItem value="4">4+ ★</SelectItem>
                    <SelectItem value="4.5">4.5+ ★</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Amenities Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  {locale === 'es' ? 'Amenidades' : 'Amenities'}
                </Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="wifi"
                      checked={filters.hasWifi || false}
                      onCheckedChange={(checked) => 
                        handleFilterChange({...filters, hasWifi: checked === true ? true : undefined})
                      }
                    />
                    <Label htmlFor="wifi" className="text-sm flex items-center gap-1">
                      <Wifi className="h-3 w-3" />
                      WiFi
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="parking"
                      checked={filters.hasParking || false}
                      onCheckedChange={(checked) => 
                        handleFilterChange({...filters, hasParking: checked === true ? true : undefined})
                      }
                    />
                    <Label htmlFor="parking" className="text-sm flex items-center gap-1">
                      <Car className="h-3 w-3" />
                      {locale === 'es' ? 'Estacionamiento' : 'Parking'}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cards"
                      checked={filters.acceptsCards || false}
                      onCheckedChange={(checked) => 
                        handleFilterChange({...filters, acceptsCards: checked === true ? true : undefined})
                      }
                    />
                    <Label htmlFor="cards" className="text-sm flex items-center gap-1">
                      <CreditCard className="h-3 w-3" />
                      {locale === 'es' ? 'Acepta tarjetas' : 'Accepts cards'}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="petfriendly"
                      checked={filters.isPetFriendly || false}
                      onCheckedChange={(checked) => 
                        handleFilterChange({...filters, isPetFriendly: checked === true ? true : undefined})
                      }
                    />
                    <Label htmlFor="petfriendly" className="text-sm flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      Pet Friendly
                    </Label>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {Object.values(filters).some(v => v !== undefined && v !== null) && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full"
                >
                  <X className="h-4 w-4 mr-2" />
                  {locale === 'es' ? 'Limpiar filtros' : 'Clear filters'}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="lg:w-3/4">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}

          {searchResult && !isLoading && (
            <>
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  {searchResult.totalResults > 0 
                    ? `${searchResult.totalResults} ${locale === 'es' ? 'resultados encontrados' : 'results found'}`
                    : locale === 'es' ? 'No se encontraron resultados' : 'No results found'
                  }
                  {searchResult.query && ` ${locale === 'es' ? 'para' : 'for'} "${searchResult.query}"`}
                </p>
              </div>

              {/* Suggestions */}
              {searchResult.suggestions && searchResult.suggestions.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    {locale === 'es' ? '¿Quisiste decir?' : 'Did you mean?'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {searchResult.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSearchChange(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {searchResult.businesses.map((business) => (
                  <BusinessCard key={business.id} business={business} locale={locale} />
                ))}
              </div>
            </>
          )}

          {/* No search performed */}
          {!searchResult && !isLoading && query && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {locale === 'es' 
                  ? 'Introduce una búsqueda para encontrar lugares en Tepoztlán' 
                  : 'Enter a search to find places in Tepoztlán'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Business card component
function BusinessCard({ business, locale }: { business: BusinessListing; locale: Locale }) {
  const getCategoryUrl = (category: string) => {
    const categoryMap: Record<string, string> = {
      hotel: locale === 'es' ? 'hospedaje' : 'stay',
      restaurant: locale === 'es' ? 'comer' : 'eat',
      experience: locale === 'es' ? 'experiencias' : 'experience',
      service: locale === 'es' ? 'servicios' : 'services',
      shop: locale === 'es' ? 'compras' : 'shop'
    }
    return categoryMap[category] || category
  }

  const businessUrl = `/${locale}/${getCategoryUrl(business.category)}/${business.slug[locale]}`

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={businessUrl}>
        {business.images.length > 0 && (
          <div className="relative aspect-video">
            <Image
              src={business.images[0]}
              alt={business.name[locale]}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            {business.isVerified && (
              <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                {locale === 'es' ? 'Verificado' : 'Verified'}
              </Badge>
            )}
          </div>
        )}
        
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">{business.name[locale]}</h3>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{business.rating}</span>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {business.description[locale]}
          </p>
          
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="line-clamp-1">{business.location.address[locale]}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {business.hasWifi && <Wifi className="h-4 w-4 text-muted-foreground" />}
              {business.hasParking && <Car className="h-4 w-4 text-muted-foreground" />}
              {business.acceptsCards && <CreditCard className="h-4 w-4 text-muted-foreground" />}
              {business.isPetFriendly && <Heart className="h-4 w-4 text-muted-foreground" />}
            </div>
            <Badge variant="outline">{business.priceRange}</Badge>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}