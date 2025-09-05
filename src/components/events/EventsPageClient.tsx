'use client'

import { useState, useEffect } from 'react'
import { Locale } from '@/lib/i18n'
import { Event, EventService, eventCategories, atmosphereTypes, eventTypes } from '@/lib/events'
import EventCard from './EventCard'
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
  Calendar,
  Music,
  Heart,
  Star,
  Sparkles,
  Users,
  Camera,
} from 'lucide-react'

interface EventsPageClientProps {
  locale: Locale
}

export default function EventsPageClient({ locale }: EventsPageClientProps) {
  const [isClient, setIsClient] = useState(false)
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedAtmosphere, setSelectedAtmosphere] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [selectedDateRange, setSelectedDateRange] = useState('all')
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'rating' | 'price'>('date')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [featuredOnly, setFeaturedOnly] = useState(false)

  // Load events on component mount - avoiding hydration issues
  useEffect(() => {
    setIsClient(true)
    setEvents(EventService.getAllEvents())
  }, [])

  // Apply filters and search
  useEffect(() => {
    let filtered = [...events]

    // Apply search
    if (searchQuery.trim()) {
      filtered = EventService.searchEvents(searchQuery, locale)
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory)
    }

    // Apply atmosphere filter
    if (selectedAtmosphere !== 'all') {
      filtered = filtered.filter(event => event.atmosphere === selectedAtmosphere)
    }

    // Apply type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(event => event.type === selectedType)
    }

    // Apply price filter
    if (selectedPriceRange !== 'all') {
      filtered = EventService.filterEvents({ priceRange: selectedPriceRange as 'free' | 'low' | 'medium' | 'high' }).filter(event => 
        filtered.includes(event)
      )
    }

    // Apply date filter
    if (selectedDateRange !== 'all') {
      filtered = EventService.filterEvents({ dateRange: selectedDateRange as 'today' | 'week' | 'month' | 'all' }).filter(event => 
        filtered.includes(event)
      )
    }

    // Apply featured filter
    if (featuredOnly) {
      filtered = filtered.filter(event => event.featured)
    }

    // Apply sorting
    filtered = EventService.sortEvents(filtered, sortBy)

    setFilteredEvents(filtered)
  }, [events, searchQuery, selectedCategory, selectedAtmosphere, selectedType, selectedPriceRange, selectedDateRange, sortBy, featuredOnly, locale])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedAtmosphere('all')
    setSelectedType('all')
    setSelectedPriceRange('all')
    setSelectedDateRange('all')
    setFeaturedOnly(false)
  }

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedAtmosphere !== 'all' || 
    selectedType !== 'all' || selectedPriceRange !== 'all' || selectedDateRange !== 'all' || featuredOnly


  const getCategoryCount = (category: string) => {
    if (category === 'all') return events.length
    return events.filter(event => event.category === category).length
  }

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">
          {locale === 'es' ? 'Cargando eventos...' : 'Loading events...'}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Ultra Premium Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-900/40 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-900/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
      <div className="absolute top-3/4 -right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-delay" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-slow" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6 p-1 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3">
              <Calendar className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">
              {locale === 'es' ? 'Eventos en Tepoztlán' : 'Events in Tepoztlán'}
            </span>
          </h1>
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            {locale === 'es' 
              ? 'Descubre celebraciones únicas, festivales tradicionales, ceremonias espirituales y experiencias culturales auténticas en el corazón místico de México.'
              : 'Discover unique celebrations, traditional festivals, spiritual ceremonies and authentic cultural experiences in the mystical heart of Mexico.'
            }
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="mb-12">
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                  <Input
                    placeholder={locale === 'es' ? 'Buscar eventos, festivales, ceremonias...' : 'Search events, festivals, ceremonies...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20"
                  />
                </div>

                {/* Quick Filters */}
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={selectedDateRange === 'week' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedDateRange(selectedDateRange === 'week' ? 'all' : 'week')}
                    className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                  >
                    {locale === 'es' ? 'Esta Semana' : 'This Week'}
                  </Button>
                  <Button
                    variant={featuredOnly ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFeaturedOnly(!featuredOnly)}
                    className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                  >
                    <Star className="h-4 w-4 mr-1" />
                    {locale === 'es' ? 'Destacados' : 'Featured'}
                  </Button>
                  <Button
                    variant={selectedPriceRange === 'free' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPriceRange(selectedPriceRange === 'free' ? 'all' : 'free')}
                    className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                  >
                    {locale === 'es' ? 'Gratuitos' : 'Free'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="bg-white/10 hover:bg-white/20 text-white border-white/20"
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
                      <Label className="text-white/80 text-sm mb-2 block">
                        {locale === 'es' ? 'Categoría' : 'Category'}
                      </Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{locale === 'es' ? 'Todas' : 'All'}</SelectItem>
                          {eventCategories.map(category => (
                            <SelectItem key={category} value={category}>
                              {EventService.getEventCategoryLabel(category, locale)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Atmosphere Filter */}
                    <div>
                      <Label className="text-white/80 text-sm mb-2 block">
                        {locale === 'es' ? 'Ambiente' : 'Atmosphere'}
                      </Label>
                      <Select value={selectedAtmosphere} onValueChange={setSelectedAtmosphere}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{locale === 'es' ? 'Todos' : 'All'}</SelectItem>
                          {atmosphereTypes.map(atmosphere => (
                            <SelectItem key={atmosphere} value={atmosphere}>
                              {EventService.getAtmosphereLabel(atmosphere, locale)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Type Filter */}
                    <div>
                      <Label className="text-white/80 text-sm mb-2 block">
                        {locale === 'es' ? 'Tipo' : 'Type'}
                      </Label>
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{locale === 'es' ? 'Todos' : 'All'}</SelectItem>
                          {eventTypes.map(type => (
                            <SelectItem key={type} value={type}>
                              {type === 'single' ? (locale === 'es' ? 'Único' : 'Single') :
                               type === 'recurring' ? (locale === 'es' ? 'Recurrente' : 'Recurring') :
                               (locale === 'es' ? 'Varios días' : 'Multi-day')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price Filter */}
                    <div>
                      <Label className="text-white/80 text-sm mb-2 block">
                        {locale === 'es' ? 'Precio' : 'Price'}
                      </Label>
                      <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{locale === 'es' ? 'Todos' : 'All'}</SelectItem>
                          <SelectItem value="free">{locale === 'es' ? 'Gratis' : 'Free'}</SelectItem>
                          <SelectItem value="low">{locale === 'es' ? 'Bajo ($1-200)' : 'Low ($1-200)'}</SelectItem>
                          <SelectItem value="medium">{locale === 'es' ? 'Medio ($200-500)' : 'Medium ($200-500)'}</SelectItem>
                          <SelectItem value="high">{locale === 'es' ? 'Alto ($500+)' : 'High ($500+)'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sort */}
                    <div>
                      <Label className="text-white/80 text-sm mb-2 block">
                        {locale === 'es' ? 'Ordenar' : 'Sort'}
                      </Label>
                      <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'date' | 'name' | 'rating' | 'price')}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="date">{locale === 'es' ? 'Fecha' : 'Date'}</SelectItem>
                          <SelectItem value="name">{locale === 'es' ? 'Nombre' : 'Name'}</SelectItem>
                          <SelectItem value="rating">{locale === 'es' ? 'Calificación' : 'Rating'}</SelectItem>
                          <SelectItem value="price">{locale === 'es' ? 'Precio' : 'Price'}</SelectItem>
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
                      <Label htmlFor="featured" className="text-white/80 text-sm">
                        {locale === 'es' ? 'Solo eventos destacados' : 'Featured events only'}
                      </Label>
                    </div>

                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-white/70 hover:text-white hover:bg-white/10"
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
              { id: 'all', name: locale === 'es' ? 'Todos' : 'All', icon: Calendar, gradient: 'from-purple-500 to-pink-500' },
              { id: 'festival', name: locale === 'es' ? 'Festivales' : 'Festivals', icon: Music, gradient: 'from-purple-500 to-pink-600' },
              { id: 'spiritual', name: locale === 'es' ? 'Espirituales' : 'Spiritual', icon: Sparkles, gradient: 'from-orange-500 to-red-600' },
              { id: 'cultural', name: locale === 'es' ? 'Culturales' : 'Cultural', icon: Camera, gradient: 'from-blue-500 to-indigo-600' },
              { id: 'market', name: locale === 'es' ? 'Mercados' : 'Markets', icon: Users, gradient: 'from-green-500 to-emerald-600' }
            ].map((category) => {
              const Icon = category.icon
              const isActive = selectedCategory === category.id
              return (
                <Button
                  key={category.id}
                  variant="ghost"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`relative group h-auto p-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                    isActive ? 'ring-2 ring-purple-400/50' : ''
                  }`}
                >
                  <div className="p-4 text-center">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${category.gradient} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-1">{category.name}</h3>
                    <p className="text-xs text-white/60">
                      {getCategoryCount(category.id)} {locale === 'es' ? 'eventos' : 'events'}
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
            <p className="text-white/70">
              {locale === 'es' 
                ? `Mostrando ${filteredEvents.length} de ${events.length} eventos`
                : `Showing ${filteredEvents.length} of ${events.length} events`
              }
            </p>
            {hasActiveFilters && (
              <Badge className="bg-purple-400/20 text-purple-300 border border-purple-400/30">
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

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className={`mb-16 ${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-6'
          }`}>
            {filteredEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                locale={locale}
                viewMode={viewMode}
                animationDelay={index * 100}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Calendar className="h-16 w-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              {locale === 'es' ? 'No se encontraron eventos' : 'No events found'}
            </h3>
            <p className="text-white/60 mb-6">
              {locale === 'es' 
                ? 'Intenta ajustar tus filtros o buscar algo diferente'
                : 'Try adjusting your filters or searching for something different'
              }
            </p>
            {hasActiveFilters && (
              <Button onClick={clearFilters} className="bg-gradient-to-r from-purple-500 to-pink-500">
                {locale === 'es' ? 'Limpiar filtros' : 'Clear filters'}
              </Button>
            )}
          </div>
        )}

        {/* Load More Events */}
        {filteredEvents.length >= 6 && (
          <div className="text-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] transition-all duration-300"
            >
              {locale === 'es' ? 'Ver Más Eventos' : 'View More Events'}
            </Button>
          </div>
        )}

        {/* CTA Section for Event Organizers */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-purple-400/10 to-pink-400/10 backdrop-blur-xl border-white/20 p-12 max-w-4xl mx-auto">
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center mb-6 p-1 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-4">
                  {locale === 'es' 
                    ? '¿Organizas eventos en Tepoztlán?' 
                    : 'Do you organize events in Tepoztlán?'
                  }
                </h2>
                
                <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                  {locale === 'es'
                    ? 'Únete a nuestra plataforma y conecta con miles de visitantes interesados en experiencias auténticas. Desde festivales tradicionales hasta ceremonias espirituales, ayudamos a promover tu evento.'
                    : 'Join our platform and connect with thousands of visitors interested in authentic experiences. From traditional festivals to spiritual ceremonies, we help promote your event.'
                  }
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    {locale === 'es' ? 'Publicar Mi Evento' : 'List My Event'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm"
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
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8 max-w-2xl mx-auto">
            <CardContent className="space-y-4">
              <Calendar className="h-12 w-12 mx-auto text-purple-400 mb-4" />
              <h2 className="text-2xl font-bold text-white">
                {locale === 'es' 
                  ? 'No te Pierdas Ningún Evento' 
                  : 'Don\'t Miss Any Event'
                }
              </h2>
              <p className="text-white/70 max-w-lg mx-auto">
                {locale === 'es'
                  ? 'Suscríbete a nuestro calendario de eventos y recibe notificaciones sobre las mejores celebraciones y festivales.'
                  : 'Subscribe to our events calendar and receive notifications about the best celebrations and festivals.'
                }
              </p>
              <div className="flex gap-3 max-w-md mx-auto">
                <Input
                  placeholder={locale === 'es' ? 'Tu email' : 'Your email'}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
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