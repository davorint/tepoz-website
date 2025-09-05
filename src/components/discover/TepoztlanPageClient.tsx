'use client'

import { useState, useMemo } from 'react'
import { Star, Search, MapPin, Clock, Users, ChevronRight, Mountain, Building, Palette, Filter, X, Sparkles } from 'lucide-react'
import { TepoztlanService } from '@/lib/tepoztlan'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import { buildLocalizedUrl } from '@/lib/url-mapping'


interface TepoztlanPageClientProps {
  lang: 'es' | 'en'
}

export default function TepoztlanPageClient({ lang }: TepoztlanPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'category' | 'name'>('featured')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const attractions = TepoztlanService.getAllAttractions()
  
  const filteredAttractions = useMemo(() => {
    let filtered = TepoztlanService.searchAttractions(searchQuery)
    
    if (selectedCategory !== 'all') {
      filtered = TepoztlanService.filterByCategory(filtered, selectedCategory)
    }
    
    return TepoztlanService.sortAttractions(filtered, sortBy, lang)
  }, [searchQuery, selectedCategory, sortBy, lang])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'archaeological': return 'bg-gradient-to-r from-orange-400 to-amber-400 text-white border-orange-400/50 shadow-lg'
      case 'natural': return 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white border-emerald-400/50 shadow-lg'
      case 'cultural': return 'bg-gradient-to-r from-blue-400 to-indigo-400 text-white border-blue-400/50 shadow-lg'
      case 'spiritual': return 'bg-gradient-to-r from-purple-400 to-pink-400 text-white border-purple-400/50 shadow-lg'
      case 'recreational': return 'bg-gradient-to-r from-green-400 to-lime-400 text-white border-green-400/50 shadow-lg'
      case 'gastronomic': return 'bg-gradient-to-r from-red-400 to-rose-400 text-white border-red-400/50 shadow-lg'
      default: return 'bg-gradient-to-r from-gray-400 to-slate-400 text-white border-gray-400/50 shadow-lg'
    }
  }


  const content = {
    es: {
      title: 'Descubre Tepoztlán',
      subtitle: 'Explora los tesoros mágicos de este Pueblo Mágico',
      description: 'Sumérgete en la rica cultura, historia ancestral y belleza natural de Tepoztlán. Desde pirámides prehispánicas hasta mercados coloridos, cada rincón cuenta una historia única.',
      searchPlaceholder: 'Buscar atracciones...',
      sortLabel: 'Ordenar por',
      categoryLabel: 'Categoría',
      allCategories: 'Todas las categorías',
      sortOptions: {
        featured: 'Destacados',
        rating: 'Calificación',
        category: 'Categoría',
        name: 'Nombre'
      },
      categories: {
        archaeological: 'Arqueológico',
        natural: 'Natural',
        cultural: 'Cultural',
        spiritual: 'Espiritual',
        recreational: 'Recreativo',
        gastronomic: 'Gastronómico'
      },
      learnMore: 'Saber más',
      sections: {
        title: 'Explora más sobre Tepoztlán',
        subtitle: 'Descubre todos los aspectos de este maravilloso destino',
        culture: {
          title: 'Cultura',
          description: 'Tradiciones ancestrales y expresiones artísticas'
        },
        gettingHere: {
          title: 'Cómo llegar',
          description: 'Todas las opciones de transporte y rutas'
        },
        history: {
          title: 'Historia',
          description: 'El pasado prehispánico y colonial de Tepoztlán'
        },
        neighborhoods: {
          title: 'Barrios',
          description: 'Los diferentes sectores y colonias del pueblo'
        },
        overview: {
          title: 'Información general',
          description: 'Todo lo básico que necesitas saber'
        },
        practicalInfo: {
          title: 'Información práctica',
          description: 'Consejos útiles para tu visita'
        },
        weather: {
          title: 'Clima',
          description: 'Temperaturas y mejor época para visitar'
        }
      }
    },
    en: {
      title: 'Discover Tepoztlán',
      subtitle: 'Explore the magical treasures of this Magic Town',
      description: 'Immerse yourself in the rich culture, ancestral history, and natural beauty of Tepoztlán. From pre-Hispanic pyramids to colorful markets, every corner tells a unique story.',
      searchPlaceholder: 'Search attractions...',
      sortLabel: 'Sort by',
      categoryLabel: 'Category',
      allCategories: 'All categories',
      sortOptions: {
        featured: 'Featured',
        rating: 'Rating',
        category: 'Category',
        name: 'Name'
      },
      categories: {
        archaeological: 'Archaeological',
        natural: 'Natural',
        cultural: 'Cultural',
        spiritual: 'Spiritual',
        recreational: 'Recreational',
        gastronomic: 'Gastronomic'
      },
      learnMore: 'Learn more',
      sections: {
        title: 'Explore more about Tepoztlán',
        subtitle: 'Discover all aspects of this wonderful destination',
        culture: {
          title: 'Culture',
          description: 'Ancestral traditions and artistic expressions'
        },
        gettingHere: {
          title: 'Getting here',
          description: 'All transport options and routes'
        },
        history: {
          title: 'History',
          description: 'The pre-Hispanic and colonial past of Tepoztlán'
        },
        neighborhoods: {
          title: 'Neighborhoods',
          description: 'The different sectors and districts of the town'
        },
        overview: {
          title: 'Overview',
          description: 'Everything basic you need to know'
        },
        practicalInfo: {
          title: 'Practical info',
          description: 'Useful tips for your visit'
        },
        weather: {
          title: 'Weather',
          description: 'Temperatures and best time to visit'
        }
      }
    }
  }

  const t = content[lang]

  const sectionLinks = [
    { key: 'culture', href: 'culture', icon: Palette },
    { key: 'gettingHere', href: 'getting-here', icon: MapPin },
    { key: 'history', href: 'history', icon: Building },
    { key: 'neighborhoods', href: 'neighborhoods', icon: Users },
    { key: 'overview', href: 'overview', icon: Star },
    { key: 'practicalInfo', href: 'practical-info', icon: Clock },
    { key: 'weather', href: 'weather', icon: Mountain }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 relative overflow-hidden">
      {/* Ultra Premium Background */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-amber-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-yellow-500/10 rounded-full blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Premium mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_transparent,_rgba(251,146,60,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(245,158,11,0.2))]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(251, 146, 60, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 146, 60, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10">
        {/* Premium Header */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-orange-400" />
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 blur-lg" />
                <Badge className="relative bg-gradient-to-r from-orange-400 to-amber-400 text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                  ✨ Pueblo Mágico ✨
                </Badge>
              </div>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-400" />
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
              <span className="text-white drop-shadow-2xl">
                {t.title.split(' ')[0]} {/* Descubre/Discover */}
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-300 via-amber-300 to-yellow-300 bg-clip-text text-transparent drop-shadow-2xl">
                TEPOZTLÁN
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 font-light max-w-4xl mx-auto leading-relaxed mb-8">
              {t.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
                <div className="text-3xl font-bold text-orange-400 mb-2">{attractions.length}</div>
                <div className="text-white/70 text-sm">{lang === 'es' ? 'Atracciones' : 'Attractions'}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
                <div className="text-3xl font-bold text-amber-400 mb-2">2000+</div>
                <div className="text-white/70 text-sm">{lang === 'es' ? 'Años de Historia' : 'Years of History'}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
                <div className="text-3xl font-bold text-yellow-400 mb-2">10K+</div>
                <div className="text-white/70 text-sm">{lang === 'es' ? 'Visitantes Anuales' : 'Annual Visitors'}</div>
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
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50"
                  />
                </div>
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  className="h-12 px-6 bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-white border-0 shadow-xl"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {lang === 'es' ? 'Filtros' : 'Filters'}
                </Button>
              </div>

              {/* Controls */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <Select value={sortBy} onValueChange={(value: string) => setSortBy(value as 'featured' | 'rating' | 'category' | 'name')}>
                    <SelectTrigger className="w-48 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                      <SelectValue placeholder={t.sortLabel} />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="featured" className="text-white">{t.sortOptions.featured}</SelectItem>
                      <SelectItem value="rating" className="text-white">{t.sortOptions.rating}</SelectItem>
                      <SelectItem value="category" className="text-white">{t.sortOptions.category}</SelectItem>
                      <SelectItem value="name" className="text-white">{t.sortOptions.name}</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="text-white/70 text-sm">
                    {filteredAttractions.length} {lang === 'es' ? 'resultados' : 'results'}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setViewMode('grid')}
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    className={viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-orange-400 to-amber-400 text-white' 
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
                      ? 'bg-gradient-to-r from-orange-400 to-amber-400 text-white' 
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-white font-semibold mb-3 block">{t.categoryLabel}</label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                          <SelectValue placeholder={t.categoryLabel} />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="all" className="text-white">{t.allCategories}</SelectItem>
                          <SelectItem value="archaeological" className="text-white">{t.categories.archaeological}</SelectItem>
                          <SelectItem value="natural" className="text-white">{t.categories.natural}</SelectItem>
                          <SelectItem value="cultural" className="text-white">{t.categories.cultural}</SelectItem>
                          <SelectItem value="spiritual" className="text-white">{t.categories.spiritual}</SelectItem>
                          <SelectItem value="recreational" className="text-white">{t.categories.recreational}</SelectItem>
                          <SelectItem value="gastronomic" className="text-white">{t.categories.gastronomic}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* Clear Filters */}
                  <div className="mt-6 text-center">
                    <Button
                      onClick={() => {
                        setSearchQuery('')
                        setSelectedCategory('all')
                        setSortBy('featured')
                      }}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
                    >
                      <X className="w-4 h-4 mr-2" />
                      {lang === 'es' ? 'Limpiar Filtros' : 'Clear Filters'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Attractions Grid */}
          <div className={`grid gap-8 mb-12 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredAttractions.map((attraction) => {
              return (
                <Card key={attraction.id} className={`group bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:shadow-[0_35px_60px_-15px_rgba(251,146,60,0.3)] transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
                  viewMode === 'list' ? 'flex flex-row' : ''
                }`}>
                  <div className={`relative overflow-hidden ${
                    viewMode === 'list' ? 'w-80 h-48' : 'h-64'
                  }`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={attraction.imageUrl}
                      alt={attraction.name[lang]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${getCategoryColor(attraction.category)} border font-semibold backdrop-blur-sm`}>
                        <Sparkles className="w-3 h-3 mr-1" />
                        {t.categories[attraction.category as keyof typeof t.categories]}
                      </Badge>
                    </div>
                    {attraction.featured && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-yellow-400/50 shadow-lg font-semibold">
                          {lang === 'es' ? 'Destacado' : 'Featured'}
                        </Badge>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(attraction.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm font-semibold ml-1">{attraction.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                      {attraction.name[lang]}
                    </h3>
                    <p className="text-white/70 text-sm mb-4 line-clamp-2">
                      {attraction.description[lang]}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-white/60">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{attraction.location[lang]}</span>
                      </div>
                      {attraction.duration && (
                        <div className="flex items-center text-sm text-white/60">
                          <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>{attraction.duration[lang]}</span>
                        </div>
                      )}
                      {attraction.difficulty && (
                        <div className="flex items-center text-sm text-white/60">
                          <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>{attraction.difficulty[lang]}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="px-6 pb-6">
                    <Button className="w-full bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-white border-0 shadow-xl">
                      {t.learnMore}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>

          {/* Empty State */}
          {filteredAttractions.length === 0 && (
            <div className="text-center py-20 mb-12">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-16 shadow-2xl max-w-2xl mx-auto">
                <div className="text-8xl mb-8 opacity-50">🏛️</div>
                <h3 className="text-3xl font-bold text-white mb-4 font-sans">
                  {lang === 'es' ? 'No se encontraron atracciones' : 'No attractions found'}
                </h3>
                <p className="text-white/70 text-lg mb-8">
                  {lang === 'es' 
                    ? 'Intenta ajustar los filtros o modificar tu búsqueda'
                    : 'Try adjusting your filters or modify your search'
                  }
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setSortBy('featured')
                  }}
                  className="bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-white border-0 shadow-xl"
                >
                  {lang === 'es' ? 'Limpiar Filtros' : 'Clear Filters'}
                </Button>
              </div>
            </div>
          )}

          {/* Section Links */}
          <div className="pb-24">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-orange-400" />
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 blur-lg" />
                  <Badge className="relative bg-gradient-to-r from-orange-400 to-amber-400 text-white px-6 py-2 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                    🌟 {lang === 'es' ? 'Explora más' : 'Explore more'} 🌟
                  </Badge>
                </div>
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-400" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl">{t.sections.title}</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">{t.sections.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sectionLinks.map((section) => {
                const IconComponent = section.icon
                const sectionContent = t.sections[section.key as keyof typeof t.sections] as { title: string; description: string }
                
                return (
                  <Link
                    key={section.key}
                    href={buildLocalizedUrl(`discover/tepoztlan/${section.href}`, lang)}
                    className="group block"
                  >
                    <Card className="h-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:shadow-[0_35px_60px_-15px_rgba(251,146,60,0.3)] transition-all duration-500 hover:-translate-y-2">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                          {sectionContent.title}
                        </h3>
                        <p className="text-sm text-white/70 leading-relaxed">
                          {sectionContent.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}