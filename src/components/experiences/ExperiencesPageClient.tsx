'use client'

import { useState, useEffect } from 'react'
import { Locale } from '@/lib/i18n'
import { Experience, ExperienceService, experienceCategories, atmosphereTypes, experienceTypes } from '@/lib/experiences'
import ExperienceCard from './ExperienceCard'
import TepoztlanHillshade from './TepoztlanHillshade'
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
  Compass,
  Mountain,
  Heart,
  Star,
  Sparkles,
  Camera,
  Leaf,
  Sun,
  Navigation
} from 'lucide-react'

interface ExperiencesPageClientProps {
  locale: Locale
}

export default function ExperiencesPageClient({ locale }: ExperiencesPageClientProps) {
  const [isClient, setIsClient] = useState(false)
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedAtmosphere, setSelectedAtmosphere] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [selectedDuration, setSelectedDuration] = useState('all')
  const [sortBy, setSortBy] = useState<'rating' | 'name' | 'price' | 'duration' | 'distance'>('rating')
  const [showFilters, setShowFilters] = useState(false)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [mapFlyToExperience, setMapFlyToExperience] = useState<((experience: Experience) => void) | null>(null)

  // Load experiences on component mount - avoiding hydration issues
  useEffect(() => {
    setIsClient(true)
    setExperiences(ExperienceService.getAllExperiences())
  }, [])

  // Apply filters and search
  useEffect(() => {
    let filtered = [...experiences]

    // Apply search
    if (searchQuery.trim()) {
      filtered = ExperienceService.searchExperiences(searchQuery, locale)
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(experience => experience.category === selectedCategory)
    }

    // Apply atmosphere filter
    if (selectedAtmosphere !== 'all') {
      filtered = filtered.filter(experience => experience.atmosphere === selectedAtmosphere)
    }

    // Apply type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(experience => experience.type === selectedType)
    }

    // Apply price filter
    if (selectedPriceRange !== 'all') {
      filtered = ExperienceService.filterExperiences({ priceRange: selectedPriceRange as 'budget' | 'mid' | 'luxury' | 'premium' }).filter(experience => 
        filtered.includes(experience)
      )
    }

    // Apply duration filter
    if (selectedDuration !== 'all') {
      filtered = ExperienceService.filterExperiences({ duration: selectedDuration as 'short' | 'half-day' | 'full-day' | 'multi-day' }).filter(experience => 
        filtered.includes(experience)
      )
    }

    // Apply featured filter
    if (featuredOnly) {
      filtered = filtered.filter(experience => experience.featured)
    }

    // Apply sorting
    filtered = ExperienceService.sortExperiences(filtered, sortBy, userLocation || undefined)

    setFilteredExperiences(filtered)
  }, [experiences, searchQuery, selectedCategory, selectedAtmosphere, selectedType, selectedPriceRange, selectedDuration, sortBy, featuredOnly, locale, userLocation])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedAtmosphere('all')
    setSelectedType('all')
    setSelectedPriceRange('all')
    setSelectedDuration('all')
    setFeaturedOnly(false)
  }

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedAtmosphere !== 'all' || 
    selectedType !== 'all' || selectedPriceRange !== 'all' || selectedDuration !== 'all' || featuredOnly

  const getCategoryCount = (category: string) => {
    if (category === 'all') return experiences.length
    return experiences.filter(experience => experience.category === category).length
  }

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-slate-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-teal-900 dark:to-slate-900 flex items-center justify-center">
        <div className="text-slate-900 dark:text-white text-xl">
          {locale === 'es' ? 'Cargando experiencias...' : 'Loading experiences...'}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-slate-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-teal-900 dark:to-slate-900 relative overflow-hidden">
      {/* Ultra Premium Background - Teal/Cyan Theme */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-200/20 dark:from-teal-900/40 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cyan-200/15 dark:from-cyan-900/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-turquoise-200/10 dark:from-turquoise-900/20 via-transparent to-transparent" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/20 rounded-full mix-blend-multiply filter blur-xl animate-float" />
      <div className="absolute top-3/4 -right-20 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-xl animate-float-delay" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-turquoise-500/10 dark:bg-turquoise-500/20 rounded-full mix-blend-multiply filter blur-xl animate-float-slow" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6 p-1 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-3">
              <Compass className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-turquoise-600 dark:from-teal-300 dark:via-cyan-300 dark:to-turquoise-300 bg-clip-text text-transparent">
              {locale === 'es' ? 'Experiencias en Tepoztlán' : 'Experiences in Tepoztlán'}
            </span>
          </h1>
          
          <p className="text-xl text-slate-700 dark:text-white/70 max-w-3xl mx-auto leading-relaxed">
            {locale === 'es' 
              ? 'Vive aventuras transformadoras, conecta con la naturaleza sagrada y descubre la magia ancestral de Tepoztlán a través de experiencias únicas e inolvidables.'
              : 'Live transformative adventures, connect with sacred nature and discover the ancient magic of Tepoztlán through unique and unforgettable experiences.'
            }
          </p>
        </div>

        {/* Interactive Hillshade Map Section */}
        <div className="mb-16 hillshade-map-section">
          <Card className="bg-white/80 dark:bg-white/10 backdrop-blur-xl border-slate-200/50 dark:border-white/20 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6 pb-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-2">
                    <Mountain className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {locale === 'es' ? 'Explora el Valle Mágico' : 'Explore the Magic Valley'}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-white/70">
                      {locale === 'es' 
                        ? 'Descubre la majestuosa topografía de Tepoztlán y sus alrededores' 
                        : 'Discover the majestic topography of Tepoztlán and its surroundings'
                      }
                    </p>
                  </div>
                </div>
              </div>
              <TepoztlanHillshade 
                className="w-full" 
                height="500px" 
                locale={locale}
                experiences={filteredExperiences}
                showGeocoding={true}
                showSidebar={false}
                onLocationSearch={(query) => {
                  setSearchQuery(query)
                  // Scroll to results section
                  setTimeout(() => {
                    const resultsSection = document.querySelector('.experiences-results')
                    if (resultsSection) {
                      resultsSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }, 100)
                }}
                onExperienceSelect={(experience) => {
                  // Scroll to the selected experience card
                  setTimeout(() => {
                    const experienceCard = document.querySelector(`[data-experience-id="${experience.id}"]`)
                    if (experienceCard) {
                      experienceCard.scrollIntoView({ behavior: 'smooth', block: 'center' })
                      // Add a temporary highlight effect
                      experienceCard.classList.add('ring-4', 'ring-teal-400/50')
                      setTimeout(() => {
                        experienceCard.classList.remove('ring-4', 'ring-teal-400/50')
                      }, 3000)
                    }
                  }, 100)
                }}
                onUserLocationSet={(location) => {
                  setUserLocation(location)
                  // Automatically sort by distance when user location is set
                  setSortBy('distance')
                }}
                onMapReady={(flyToFn) => {
                  setMapFlyToExperience(() => flyToFn)
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters Bar */}
        <div className="mb-12">
          <Card className="bg-white/80 dark:bg-white/10 backdrop-blur-xl border-slate-200/50 dark:border-white/20 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-white/50 h-4 w-4" />
                  <Input
                    placeholder={locale === 'es' ? 'Buscar aventuras, retiros, ceremonias...' : 'Search adventures, retreats, ceremonies...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/80 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-white/50 focus:border-teal-400 focus:ring-teal-400/20"
                  />
                </div>

                {/* Quick Filters */}
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={selectedDuration === 'full-day' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedDuration(selectedDuration === 'full-day' ? 'all' : 'full-day')}
                    className="bg-slate-200/50 dark:bg-white/10 hover:bg-slate-300/50 dark:hover:bg-white/20 text-slate-900 dark:text-white border-slate-300 dark:border-white/20"
                  >
                    {locale === 'es' ? 'Día Completo' : 'Full Day'}
                  </Button>
                  <Button
                    variant={featuredOnly ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFeaturedOnly(!featuredOnly)}
                    className="bg-slate-200/50 dark:bg-white/10 hover:bg-slate-300/50 dark:hover:bg-white/20 text-slate-900 dark:text-white border-slate-300 dark:border-white/20"
                  >
                    <Star className="h-4 w-4 mr-1" />
                    {locale === 'es' ? 'Destacadas' : 'Featured'}
                  </Button>
                  
                  {userLocation && (
                    <Button
                      variant={sortBy === 'distance' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSortBy(sortBy === 'distance' ? 'rating' : 'distance')}
                      className="bg-slate-200/50 dark:bg-white/10 hover:bg-slate-300/50 dark:hover:bg-white/20 text-slate-900 dark:text-white border-slate-300 dark:border-white/20"
                    >
                      <Navigation className="h-4 w-4 mr-1" />
                      {locale === 'es' ? 'Por Distancia' : 'By Distance'}
                    </Button>
                  )}
                  <Button
                    variant={selectedCategory === 'adventure' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(selectedCategory === 'adventure' ? 'all' : 'adventure')}
                    className="bg-slate-200/50 dark:bg-white/10 hover:bg-slate-300/50 dark:hover:bg-white/20 text-slate-900 dark:text-white border-slate-300 dark:border-white/20"
                  >
                    {locale === 'es' ? 'Aventura' : 'Adventure'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="bg-slate-200/50 dark:bg-white/10 hover:bg-slate-300/50 dark:hover:bg-white/20 text-slate-900 dark:text-white border-slate-300 dark:border-white/20"
                  >
                    <Filter className="h-4 w-4 mr-1" />
                    {locale === 'es' ? 'Filtros' : 'Filters'}
                  </Button>
                </div>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {/* Category Filter */}
                    <div>
                      <Label className="text-slate-700 dark:text-white/80 text-sm mb-2 block">
                        {locale === 'es' ? 'Categoría' : 'Category'}
                      </Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="bg-white/80 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{locale === 'es' ? 'Todas' : 'All'}</SelectItem>
                          {experienceCategories.map(category => (
                            <SelectItem key={category} value={category}>
                              {ExperienceService.getExperienceCategoryLabel(category, locale)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Atmosphere Filter */}
                    <div>
                      <Label className="text-slate-700 dark:text-white/80 text-sm mb-2 block">
                        {locale === 'es' ? 'Ambiente' : 'Atmosphere'}
                      </Label>
                      <Select value={selectedAtmosphere} onValueChange={setSelectedAtmosphere}>
                        <SelectTrigger className="bg-white/80 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{locale === 'es' ? 'Todos' : 'All'}</SelectItem>
                          {atmosphereTypes.map(atmosphere => (
                            <SelectItem key={atmosphere} value={atmosphere}>
                              {ExperienceService.getAtmosphereLabel(atmosphere, locale)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Type Filter */}
                    <div>
                      <Label className="text-slate-700 dark:text-white/80 text-sm mb-2 block">
                        {locale === 'es' ? 'Tipo' : 'Type'}
                      </Label>
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger className="bg-white/80 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{locale === 'es' ? 'Todos' : 'All'}</SelectItem>
                          {experienceTypes.map(type => (
                            <SelectItem key={type} value={type}>
                              {type === 'individual' ? (locale === 'es' ? 'Individual' : 'Individual') :
                               type === 'group' ? (locale === 'es' ? 'Grupal' : 'Group') :
                               (locale === 'es' ? 'Privado' : 'Private')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price Filter */}
                    <div>
                      <Label className="text-slate-700 dark:text-white/80 text-sm mb-2 block">
                        {locale === 'es' ? 'Precio' : 'Price'}
                      </Label>
                      <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                        <SelectTrigger className="bg-white/80 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{locale === 'es' ? 'Todos' : 'All'}</SelectItem>
                          <SelectItem value="budget">{locale === 'es' ? 'Económico ($200-500)' : 'Budget ($200-500)'}</SelectItem>
                          <SelectItem value="mid">{locale === 'es' ? 'Medio ($500-1000)' : 'Mid ($500-1000)'}</SelectItem>
                          <SelectItem value="luxury">{locale === 'es' ? 'Lujo ($1000-2000)' : 'Luxury ($1000-2000)'}</SelectItem>
                          <SelectItem value="premium">{locale === 'es' ? 'Premium ($2000+)' : 'Premium ($2000+)'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Duration Filter */}
                    <div>
                      <Label className="text-slate-700 dark:text-white/80 text-sm mb-2 block">
                        {locale === 'es' ? 'Duración' : 'Duration'}
                      </Label>
                      <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                        <SelectTrigger className="bg-white/80 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{locale === 'es' ? 'Todas' : 'All'}</SelectItem>
                          <SelectItem value="short">{locale === 'es' ? 'Corta (1-3 hrs)' : 'Short (1-3 hrs)'}</SelectItem>
                          <SelectItem value="half-day">{locale === 'es' ? 'Medio día (3-6 hrs)' : 'Half day (3-6 hrs)'}</SelectItem>
                          <SelectItem value="full-day">{locale === 'es' ? 'Día completo (6+ hrs)' : 'Full day (6+ hrs)'}</SelectItem>
                          <SelectItem value="multi-day">{locale === 'es' ? 'Varios días' : 'Multi-day'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={featuredOnly}
                        onCheckedChange={(checked) => setFeaturedOnly(checked === true)}
                      />
                      <Label htmlFor="featured" className="text-slate-700 dark:text-white/80 text-sm">
                        {locale === 'es' ? 'Solo experiencias destacadas' : 'Featured experiences only'}
                      </Label>
                    </div>

                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10"
                      >
                        <X className="h-4 w-4 mr-1" />
                        {locale === 'es' ? 'Limpiar filtros' : 'Clear filters'}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Category Quick Access */}
        <div className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { id: 'all', name: locale === 'es' ? 'Todas' : 'All', icon: Compass, gradient: 'from-teal-500 to-cyan-500' },
              { id: 'adventure', name: locale === 'es' ? 'Aventura' : 'Adventure', icon: Mountain, gradient: 'from-teal-500 to-cyan-600' },
              { id: 'spiritual', name: locale === 'es' ? 'Espiritual' : 'Spiritual', icon: Sparkles, gradient: 'from-orange-500 to-amber-600' },
              { id: 'wellness', name: locale === 'es' ? 'Bienestar' : 'Wellness', icon: Leaf, gradient: 'from-green-500 to-emerald-600' },
              { id: 'cultural', name: locale === 'es' ? 'Cultural' : 'Cultural', icon: Camera, gradient: 'from-blue-500 to-indigo-600' }
            ].map((category) => {
              const Icon = category.icon
              const isActive = selectedCategory === category.id
              return (
                <Button
                  key={category.id}
                  variant="ghost"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`relative group h-auto p-0 bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-slate-200/50 dark:border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                    isActive ? 'ring-2 ring-teal-400/50' : ''
                  }`}
                >
                  <div className="p-4 text-center">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${category.gradient} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">{category.name}</h3>
                    <p className="text-xs text-slate-600 dark:text-white/60">
                      {getCategoryCount(category.id)} {locale === 'es' ? 'experiencias' : 'experiences'}
                    </p>
                  </div>
                </Button>
              )
            })}
          </div>
        </div>

        {/* View Mode Toggle & Results Count */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <p className="text-slate-600 dark:text-white/70">
              {locale === 'es' 
                ? `Mostrando ${filteredExperiences.length} de ${experiences.length} experiencias`
                : `Showing ${filteredExperiences.length} of ${experiences.length} experiences`
              }
            </p>
            {hasActiveFilters && (
              <Badge className="bg-teal-100 dark:bg-teal-400/20 text-teal-700 dark:text-teal-300 border border-teal-300 dark:border-teal-400/30">
                {locale === 'es' ? 'Filtrado' : 'Filtered'}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              {locale === 'es' ? 'Cuadrícula' : 'Grid'}
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              {locale === 'es' ? 'Lista' : 'List'}
            </Button>
          </div>
        </div>

        {/* Experiences Grid */}
        {filteredExperiences.length > 0 ? (
          <div className={`experiences-results mb-16 ${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-6'
          }`}>
            {filteredExperiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                locale={locale}
                viewMode={viewMode}
                animationDelay={index * 100}
                onViewOnMap={(experience) => {
                  if (mapFlyToExperience) {
                    mapFlyToExperience(experience)
                    // Scroll to map section
                    const mapSection = document.querySelector('.hillshade-map-section')
                    if (mapSection) {
                      mapSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Compass className="h-16 w-16 text-slate-400 dark:text-white/30 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              {locale === 'es' ? 'No se encontraron experiencias' : 'No experiences found'}
            </h3>
            <p className="text-slate-600 dark:text-white/60 mb-6">
              {locale === 'es' 
                ? 'Intenta ajustar tus filtros o buscar algo diferente'
                : 'Try adjusting your filters or searching for something different'
              }
            </p>
            {hasActiveFilters && (
              <Button onClick={clearFilters} className="bg-gradient-to-r from-teal-500 to-cyan-500">
                {locale === 'es' ? 'Limpiar filtros' : 'Clear filters'}
              </Button>
            )}
          </div>
        )}

        {/* CTA Section for Experience Providers */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-teal-100/30 to-cyan-100/30 dark:from-teal-400/10 dark:to-cyan-400/10 backdrop-blur-xl border-slate-200/50 dark:border-white/20 p-12 max-w-4xl mx-auto">
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center mb-6 p-1 bg-white/50 dark:bg-white/10 backdrop-blur-xl rounded-full border border-slate-200 dark:border-white/20">
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-3">
                    <Sun className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  {locale === 'es' 
                    ? '¿Ofreces experiencias en Tepoztlán?' 
                    : 'Do you offer experiences in Tepoztlán?'
                  }
                </h2>
                
                <p className="text-slate-700 dark:text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                  {locale === 'es'
                    ? 'Únete a nuestra plataforma y comparte tus aventuras únicas con viajeros de todo el mundo. Desde temazcales hasta escaladas, ayudamos a conectar experiencias auténticas con exploradores conscientes.'
                    : 'Join our platform and share your unique adventures with travelers from around the world. From temazcals to climbs, we help connect authentic experiences with conscious explorers.'
                  }
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
                  >
                    <Compass className="h-5 w-5 mr-2" />
                    {locale === 'es' ? 'Publicar Mi Experiencia' : 'List My Experience'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="bg-white/70 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 text-slate-900 dark:text-white border-slate-300 dark:border-white/30 backdrop-blur-sm"
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    {locale === 'es' ? 'Más Información' : 'Learn More'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Newsletter Section */}
        <div className="text-center">
          <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-slate-200/50 dark:border-white/10 p-8 max-w-2xl mx-auto">
            <CardContent className="space-y-4">
              <Compass className="h-12 w-12 mx-auto text-teal-600 dark:text-teal-400 mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {locale === 'es' 
                  ? 'Descubre Nuevas Aventuras' 
                  : 'Discover New Adventures'
                }
              </h2>
              <p className="text-slate-700 dark:text-white/70 max-w-lg mx-auto">
                {locale === 'es'
                  ? 'Suscríbete y recibe las mejores experiencias, aventuras espirituales y retiros de bienestar en Tepoztlán.'
                  : 'Subscribe and receive the best experiences, spiritual adventures and wellness retreats in Tepoztlán.'
                }
              </p>
              <div className="flex gap-3 max-w-md mx-auto">
                <Input
                  placeholder={locale === 'es' ? 'Tu email' : 'Your email'}
                  className="bg-white/80 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-white/50"
                />
                <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white">
                  {locale === 'es' ? 'Suscribirse' : 'Subscribe'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}