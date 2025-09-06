'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { Hotel, HotelService, hotelCategories, amenityTypes, priceRanges } from '@/lib/hotels'
import HotelCard from './HotelCardSimple'
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
  Star,
  Database
} from 'lucide-react'

interface HotelsPageClientProps {
  locale: Locale
}

export default function HotelsPageClient({ locale }: HotelsPageClientProps) {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'price' | 'name'>('featured')
  const [sustainabilityFilter, setSustainabilityFilter] = useState<boolean | undefined>(undefined)
  const [petFriendlyFilter, setPetFriendlyFilter] = useState<boolean | undefined>(undefined)
  const [adultsOnlyFilter, setAdultsOnlyFilter] = useState<boolean | undefined>(undefined)

  // Initialize hotels
  useEffect(() => {
    const allHotels = HotelService.getAllHotels()
    setHotels(allHotels)
    setFilteredHotels(allHotels)
  }, [])

  // Filter and sort hotels
  useEffect(() => {
    let filtered = HotelService.searchHotels(
      searchQuery,
      selectedCategory,
      selectedPriceRange,
      selectedAmenities,
      {
        sustainability: sustainabilityFilter,
        petFriendly: petFriendlyFilter,
        adultsOnly: adultsOnlyFilter
      }
    )

    // Sort hotels
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
          return HotelService.getHotelName(a, locale).localeCompare(
            HotelService.getHotelName(b, locale)
          )
        default:
          return 0
      }
    })

    setFilteredHotels(filtered)
  }, [searchQuery, selectedCategory, selectedPriceRange, selectedAmenities, sortBy, locale, sustainabilityFilter, petFriendlyFilter, adultsOnlyFilter])

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenity])
    } else {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity))
    }
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedPriceRange('all')
    setSelectedAmenities([])
    setSustainabilityFilter(undefined)
    setPetFriendlyFilter(undefined)
    setAdultsOnlyFilter(undefined)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Ultra Premium Background */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-indigo-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Premium mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_transparent,_rgba(59,130,246,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(99,102,241,0.2))]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Premium Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-blue-400" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 blur-lg" />
              <Badge className="relative bg-gradient-to-r from-blue-400 to-indigo-400 text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                🏨 {locale === 'es' ? 'Hoteles Premium' : 'Premium Hotels'} 🏨
              </Badge>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-indigo-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-white drop-shadow-2xl">
              {locale === 'es' ? 'Hospedaje en ' : 'Stay in '}
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl">
              Tepoztlán
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-4xl mx-auto leading-relaxed mb-8">
            {locale === 'es' 
              ? 'Descubre alojamientos únicos en Tepoztlán. Desde hoteles boutique hasta eco-lodges sustentables.'
              : 'Discover unique accommodations in Tepoztlán. From boutique hotels to sustainable eco-lodges.'
            }
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-blue-400 mb-2">{hotels.length}</div>
              <div className="text-white/70 text-sm">{locale === 'es' ? 'Hoteles' : 'Hotels'}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-indigo-400 mb-2">4.7</div>
              <div className="text-white/70 text-sm">{locale === 'es' ? 'Calificación Promedio' : 'Average Rating'}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-purple-400 mb-2">1.8K+</div>
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
                  placeholder={locale === 'es' ? 'Buscar hoteles, ubicación, amenidades...' : 'Search hotels, location, amenities...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50"
                />
              </div>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-6 bg-gradient-to-r from-blue-400 to-indigo-400 hover:from-blue-500 hover:to-indigo-500 text-white border-0 shadow-xl"
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

                <div className="text-white/70 text-sm">
                  {filteredHotels.length} {locale === 'es' ? 'resultados' : 'results'}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setViewMode('grid')}
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  className={viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-blue-400 to-indigo-400 text-white' 
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
                    ? 'bg-gradient-to-r from-blue-400 to-indigo-400 text-white' 
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
                  {/* Category Filter */}
                  <div>
                    <Label className="text-white font-semibold mb-3 block">{locale === 'es' ? 'Categoría' : 'Category'}</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        {hotelCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id} className="text-white">
                            {category.emoji} {locale === 'es' ? category.es : category.en}
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

                  {/* Amenities Filter */}
                  <div>
                    <Label className="text-white font-semibold mb-3 block">{locale === 'es' ? 'Amenidades' : 'Amenities'}</Label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {amenityTypes.slice(1).map((amenity) => (
                        <div key={amenity.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity.id}
                            checked={selectedAmenities.includes(amenity.id)}
                            onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                            className="border-white/30 data-[state=checked]:bg-blue-400 data-[state=checked]:border-blue-400"
                          />
                          <Label htmlFor={amenity.id} className="text-white/90 text-sm cursor-pointer">
                            {locale === 'es' ? amenity.es : amenity.en}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Special Features */}
                  <div>
                    <Label className="text-white font-semibold mb-3 block">{locale === 'es' ? 'Características' : 'Features'}</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sustainability"
                          checked={sustainabilityFilter === true}
                          onCheckedChange={(checked) => setSustainabilityFilter(checked ? true : undefined)}
                          className="border-white/30 data-[state=checked]:bg-green-400 data-[state=checked]:border-green-400"
                        />
                        <Label htmlFor="sustainability" className="text-white/90 text-sm cursor-pointer">
                          🌱 {locale === 'es' ? 'Sustentable' : 'Sustainable'}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="petFriendly"
                          checked={petFriendlyFilter === true}
                          onCheckedChange={(checked) => setPetFriendlyFilter(checked ? true : undefined)}
                          className="border-white/30 data-[state=checked]:bg-blue-400 data-[state=checked]:border-blue-400"
                        />
                        <Label htmlFor="petFriendly" className="text-white/90 text-sm cursor-pointer">
                          🐕 {locale === 'es' ? 'Mascotas OK' : 'Pet Friendly'}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="adultsOnly"
                          checked={adultsOnlyFilter === true}
                          onCheckedChange={(checked) => setAdultsOnlyFilter(checked ? true : undefined)}
                          className="border-white/30 data-[state=checked]:bg-purple-400 data-[state=checked]:border-purple-400"
                        />
                        <Label htmlFor="adultsOnly" className="text-white/90 text-sm cursor-pointer">
                          🔞 {locale === 'es' ? 'Solo Adultos' : 'Adults Only'}
                        </Label>
                      </div>
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
          {filteredHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              locale={locale}
              viewMode={viewMode}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredHotels.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-16 shadow-2xl max-w-2xl mx-auto">
              <div className="text-8xl mb-8 opacity-50">🏨</div>
              <h3 className="text-3xl font-bold text-white mb-4 font-sans">
                {locale === 'es' ? 'No se encontraron hoteles' : 'No hotels found'}
              </h3>
              <p className="text-white/70 text-lg mb-8">
                {locale === 'es' 
                  ? 'Intenta ajustar los filtros o modificar tu búsqueda'
                  : 'Try adjusting your filters or modify your search'
                }
              </p>
              <Button
                onClick={clearFilters}
                className="bg-gradient-to-r from-blue-400 to-indigo-400 hover:from-blue-500 hover:to-indigo-500 text-white border-0 shadow-xl"
              >
                {locale === 'es' ? 'Limpiar Filtros' : 'Clear Filters'}
              </Button>
            </div>
          </div>
        )}

        {/* Directory Button */}
        <div className="text-center py-12">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl max-w-2xl mx-auto">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 blur-xl opacity-50" />
                <div className="relative bg-gradient-to-r from-blue-400 to-indigo-400 p-4 rounded-2xl shadow-2xl">
                  <Database className="h-12 w-12 text-white" />
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {locale === 'es' ? 'Explora Todos los Hoteles' : 'Explore All Hotels'}
                </h3>
                <p className="text-white/70 mb-6 max-w-lg">
                  {locale === 'es'
                    ? 'Accede a nuestro directorio completo con herramientas avanzadas de búsqueda, filtros y análisis detallado'
                    : 'Access our complete directory with advanced search tools, filters and detailed analysis'
                  }
                </p>
              </div>
              
              <Link href={`/${locale}/stay/hotels/all-hotels`}>
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-4 text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <Database className="w-5 h-5 mr-3" />
                  {locale === 'es' ? 'Ver Directorio Completo' : 'View Complete Directory'}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Business Owner CTA */}
        <div className="text-center py-12">
          <Card className="bg-gradient-to-r from-blue-400/10 to-indigo-400/10 backdrop-blur-xl border-white/20 p-12 max-w-4xl mx-auto">
            <CardContent className="space-y-6">
              <h2 className="text-3xl font-bold text-white">
                {locale === 'es' 
                  ? '¿Tienes un hotel en Tepoztlán?' 
                  : 'Do you own a hotel in Tepoztlán?'
                }
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                {locale === 'es' 
                  ? 'Únete a nuestra plataforma y conecta con miles de viajeros que buscan experiencias auténticas de hospedaje en el corazón de este Pueblo Mágico.'
                  : 'Join our platform and connect with thousands of travelers looking for authentic accommodation experiences in the heart of this Magical Town.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-blue-400 to-indigo-400 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-6 text-lg">
                  <Star className="w-5 h-5 mr-2" />
                  {locale === 'es' ? 'Agregar mi Hotel' : 'Add my Hotel'}
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