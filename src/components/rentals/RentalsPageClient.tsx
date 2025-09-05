'use client'

import { useState, useEffect } from 'react'
import { Locale } from '@/lib/i18n'
import { Rental, RentalService, rentalCategories, amenityTypes, priceRanges } from '@/lib/rentals'
import RentalCard from './RentalCard'
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
  Home
} from 'lucide-react'

interface RentalsPageClientProps {
  locale: Locale
}

export default function RentalsPageClient({ locale }: RentalsPageClientProps) {
  const [rentals, setRentals] = useState<Rental[]>([])
  const [filteredRentals, setFilteredRentals] = useState<Rental[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'price' | 'name'>('featured')
  const [instantBookFilter, setInstantBookFilter] = useState<boolean | undefined>(undefined)
  const [petFriendlyFilter, setPetFriendlyFilter] = useState<boolean | undefined>(undefined)
  const [familyFriendlyFilter, setFamilyFriendlyFilter] = useState<boolean | undefined>(undefined)
  const [workFriendlyFilter, setWorkFriendlyFilter] = useState<boolean | undefined>(undefined)

  // Initialize rentals
  useEffect(() => {
    const allRentals = RentalService.getAllRentals()
    setRentals(allRentals)
    setFilteredRentals(allRentals)
  }, [])

  // Filter and sort rentals
  useEffect(() => {
    let filtered = RentalService.searchRentals(
      searchQuery,
      selectedCategory,
      selectedPriceRange,
      selectedAmenities,
      {
        instantBook: instantBookFilter,
        petFriendly: petFriendlyFilter,
        familyFriendly: familyFriendlyFilter,
        workFriendly: workFriendlyFilter
      }
    )

    // Sort rentals
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
          return RentalService.getRentalName(a, locale).localeCompare(
            RentalService.getRentalName(b, locale)
          )
        default:
          return 0
      }
    })

    setFilteredRentals(filtered)
  }, [searchQuery, selectedCategory, selectedPriceRange, selectedAmenities, sortBy, locale, instantBookFilter, petFriendlyFilter, familyFriendlyFilter, workFriendlyFilter])

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
    setInstantBookFilter(undefined)
    setPetFriendlyFilter(undefined)
    setFamilyFriendlyFilter(undefined)
    setWorkFriendlyFilter(undefined)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Ultra Premium Background */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-green-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-emerald-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-teal-500/10 rounded-full blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Premium mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_transparent,_rgba(34,197,94,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(16,185,129,0.2))]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
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
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 blur-lg" />
              <Badge className="relative bg-gradient-to-r from-green-400 to-emerald-400 text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                🏠 {locale === 'es' ? 'Rentas Vacacionales' : 'Vacation Rentals'} 🏠
              </Badge>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-emerald-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-white drop-shadow-2xl">
              {locale === 'es' ? 'Rentas en ' : 'Rentals in '}
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent drop-shadow-2xl">
              Tepoztlán
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-4xl mx-auto leading-relaxed mb-8">
            {locale === 'es' 
              ? 'Encuentra tu hogar temporal perfecto. Desde apartamentos modernos hasta villas de lujo con todas las comodidades.'
              : 'Find your perfect temporary home. From modern apartments to luxury villas with all the amenities.'
            }
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-green-400 mb-2">{rentals.length}</div>
              <div className="text-white/70 text-sm">{locale === 'es' ? 'Propiedades' : 'Properties'}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-emerald-400 mb-2">4.6</div>
              <div className="text-white/70 text-sm">{locale === 'es' ? 'Calificación Promedio' : 'Average Rating'}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-teal-400 mb-2">940+</div>
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
                  placeholder={locale === 'es' ? 'Buscar propiedades, ubicación, amenidades...' : 'Search properties, location, amenities...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50"
                />
              </div>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-6 bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white border-0 shadow-xl"
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
                  {filteredRentals.length} {locale === 'es' ? 'resultados' : 'results'}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setViewMode('grid')}
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  className={viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-white' 
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
                    ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-white' 
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
                    <Label className="text-white font-semibold mb-3 block">{locale === 'es' ? 'Tipo' : 'Type'}</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        {rentalCategories.map((category) => (
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
                            className="border-white/30 data-[state=checked]:bg-green-400 data-[state=checked]:border-green-400"
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
                          id="instantBook"
                          checked={instantBookFilter === true}
                          onCheckedChange={(checked) => setInstantBookFilter(checked ? true : undefined)}
                          className="border-white/30 data-[state=checked]:bg-blue-400 data-[state=checked]:border-blue-400"
                        />
                        <Label htmlFor="instantBook" className="text-white/90 text-sm cursor-pointer">
                          ⚡ {locale === 'es' ? 'Reserva Inmediata' : 'Instant Book'}
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
                          id="familyFriendly"
                          checked={familyFriendlyFilter === true}
                          onCheckedChange={(checked) => setFamilyFriendlyFilter(checked ? true : undefined)}
                          className="border-white/30 data-[state=checked]:bg-green-400 data-[state=checked]:border-green-400"
                        />
                        <Label htmlFor="familyFriendly" className="text-white/90 text-sm cursor-pointer">
                          👨‍👩‍👧‍👦 {locale === 'es' ? 'Familiar' : 'Family Friendly'}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="workFriendly"
                          checked={workFriendlyFilter === true}
                          onCheckedChange={(checked) => setWorkFriendlyFilter(checked ? true : undefined)}
                          className="border-white/30 data-[state=checked]:bg-purple-400 data-[state=checked]:border-purple-400"
                        />
                        <Label htmlFor="workFriendly" className="text-white/90 text-sm cursor-pointer">
                          💻 {locale === 'es' ? 'Para Trabajo' : 'Work Friendly'}
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
          {filteredRentals.map((rental) => (
            <RentalCard
              key={rental.id}
              rental={rental}
              locale={locale}
              viewMode={viewMode}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredRentals.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-16 shadow-2xl max-w-2xl mx-auto">
              <div className="text-8xl mb-8 opacity-50">🏠</div>
              <h3 className="text-3xl font-bold text-white mb-4 font-sans">
                {locale === 'es' ? 'No se encontraron propiedades' : 'No properties found'}
              </h3>
              <p className="text-white/70 text-lg mb-8">
                {locale === 'es' 
                  ? 'Intenta ajustar los filtros o modificar tu búsqueda'
                  : 'Try adjusting your filters or modify your search'
                }
              </p>
              <Button
                onClick={clearFilters}
                className="bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white border-0 shadow-xl"
              >
                {locale === 'es' ? 'Limpiar Filtros' : 'Clear Filters'}
              </Button>
            </div>
          </div>
        )}

        {/* Business Owner CTA */}
        <div className="text-center py-12">
          <Card className="bg-gradient-to-r from-green-400/10 to-emerald-400/10 backdrop-blur-xl border-white/20 p-12 max-w-4xl mx-auto">
            <CardContent className="space-y-6">
              <h2 className="text-3xl font-bold text-white">
                {locale === 'es' 
                  ? '¿Tienes una propiedad en Tepoztlán?' 
                  : 'Do you own a property in Tepoztlán?'
                }
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                {locale === 'es' 
                  ? 'Únete a nuestra plataforma y comparte tu casa, departamento o cabaña con viajeros que buscan una experiencia auténtica y hogareña en Tepoztlán.'
                  : 'Join our platform and share your house, apartment or cabin with travelers seeking an authentic and homely experience in Tepoztlán.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white px-8 py-6 text-lg">
                  <Home className="w-5 h-5 mr-2" />
                  {locale === 'es' ? 'Agregar mi Propiedad' : 'Add my Property'}
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