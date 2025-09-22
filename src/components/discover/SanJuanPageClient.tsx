'use client'

import { useState, useMemo } from 'react'
import { SanJuanService, sanJuanCategories } from '@/lib/san-juan-tlacotenco'
import SanJuanAttractionCard from './SanJuanAttractionCard'
import { Locale } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search, 
  SlidersHorizontal, 
  Grid3X3, 
  List,
  Mountain,
  Calendar,
  Heart
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SanJuanPageClientProps {
  locale: Locale
}

export default function SanJuanPageClient({ locale }: SanJuanPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('featured')

  // Get filtered attractions
  const filteredAttractions = useMemo(() => {
    const attractions = SanJuanService.searchAttractions(
      searchQuery,
      selectedCategory,
      selectedDifficulty
    )

    // Sort
    switch (sortBy) {
      case 'featured':
        attractions.sort((a, b) => {
          if (a.mustSee && !b.mustSee) return -1
          if (!a.mustSee && b.mustSee) return 1
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return 0
        })
        break
      case 'popular':
        attractions.sort((a, b) => {
          if (a.popular && !b.popular) return -1
          if (!a.popular && b.popular) return 1
          return 0
        })
        break
      case 'difficulty':
        const difficultyOrder = { 'easy': 0, 'moderate': 1, 'hard': 2, 'extreme': 3 }
        attractions.sort((a, b) => {
          const aOrder = a.difficulty ? difficultyOrder[a.difficulty] : 999
          const bOrder = b.difficulty ? difficultyOrder[b.difficulty] : 999
          return aOrder - bOrder
        })
        break
    }

    return attractions
  }, [searchQuery, selectedCategory, selectedDifficulty, sortBy])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedDifficulty('all')
  }

  const activeFiltersCount = [
    selectedCategory !== 'all' ? 1 : 0,
    selectedDifficulty !== 'all' ? 1 : 0,
    searchQuery ? 1 : 0
  ].reduce((a, b) => a + b, 0)

  const mustSeeAttractions = SanJuanService.getMustSeeAttractions()

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-amber-50 via-yellow-50 to-orange-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-amber-900 dark:to-slate-900">
      {/* Ultra Premium Background */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-orange-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-yellow-500/10 rounded-full blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Premium mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_transparent,_rgba(245,158,11,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(249,115,22,0.2))]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Premium Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-400" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 blur-lg" />
              <Badge className="relative bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 dark:text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                🏛️ {locale === 'es' ? 'Tradición del Pulque y Ferrocarril' : 'Pulque and Railway Tradition'} 🚂
              </Badge>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-orange-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-slate-900 dark:text-white drop-shadow-2xl">
              {locale === 'es' ? 'Descubre ' : 'Discover '}
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent drop-shadow-2xl">
              San Juan Tlacotenco
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-900 dark:text-slate-700 dark:text-white/80 font-light max-w-4xl mx-auto leading-relaxed mb-8">
            {locale === 'es' 
              ? 'Pueblo nahua ancestral a 2,368 metros de altitud. Hogar del templo de Tepoztēcatl, la tradición del pulque y el legado ferroviario.'
              : 'Ancestral Nahua village at 2,368 meters altitude. Home to the Tepoztēcatl temple, pulque tradition and railway heritage.'
            }
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-amber-400 mb-2">{filteredAttractions.length}</div>
              <div className="text-slate-900 dark:text-slate-700 dark:text-white/70 text-sm">{locale === 'es' ? 'Atracciones' : 'Attractions'}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-orange-400 mb-2">{mustSeeAttractions.length}</div>
              <div className="text-slate-900 dark:text-slate-700 dark:text-white/70 text-sm">{locale === 'es' ? 'Imperdibles' : 'Must See'}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-yellow-400 mb-2">2,368</div>
              <div className="text-slate-900 dark:text-slate-700 dark:text-white/70 text-sm">{locale === 'es' ? 'msnm' : 'masl'}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-stone-400 mb-2">1100</div>
              <div className="text-slate-900 dark:text-slate-700 dark:text-white/70 text-sm">{locale === 'es' ? 'Año d.C.' : 'AD Year'}</div>
            </div>
          </div>

          {/* Decorative Line */}
          <div className="w-32 h-1 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full" />
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-900 dark:text-white/40" />
                <Input
                  placeholder={locale === 'es' ? 'Buscar templos, cuevas, medicina tradicional...' : 'Search temples, caves, traditional medicine...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-white/80 dark:bg-white/10 backdrop-blur-sm border-amber-300/50 dark:border-white/20 text-slate-900 dark:text-white placeholder:text-slate-900 dark:text-white/40 text-base"
                />
              </div>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-6 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-slate-900 dark:text-white border-0 shadow-xl"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                {locale === 'es' ? 'Filtros' : 'Filters'}
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 bg-white text-amber-600 text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-white/80 dark:bg-white/10 backdrop-blur-sm border-amber-300/50 dark:border-white/20 text-slate-900 dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="featured" className="text-slate-900 dark:text-white">
                      {locale === 'es' ? 'Destacados' : 'Featured'}
                    </SelectItem>
                    <SelectItem value="popular" className="text-slate-900 dark:text-white">
                      {locale === 'es' ? 'Popular' : 'Popular'}
                    </SelectItem>
                    <SelectItem value="difficulty" className="text-slate-900 dark:text-white">
                      {locale === 'es' ? 'Dificultad' : 'Difficulty'}
                    </SelectItem>
                  </SelectContent>
                </Select>

                <div className="text-slate-900 dark:text-slate-700 dark:text-white/70 text-sm">
                  {filteredAttractions.length} {locale === 'es' ? 'resultados' : 'results'}
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setViewMode('grid')}
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  className={viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 dark:text-white' 
                    : 'text-slate-900 dark:text-slate-700 dark:text-white/70 hover:text-slate-900 dark:text-white hover:bg-white/80 dark:bg-white/10'
                  }
                >
                  <Grid3X3 className="w-4 h-4 mr-2" />
                  Grid
                </Button>
                <Button
                  onClick={() => setViewMode('list')}
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  className={viewMode === 'list' 
                    ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 dark:text-white' 
                    : 'text-slate-900 dark:text-slate-700 dark:text-white/70 hover:text-slate-900 dark:text-white hover:bg-white/80 dark:bg-white/10'
                  }
                >
                  <List className="w-4 h-4 mr-2" />
                  List
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {locale === 'es' ? 'Filtros Avanzados' : 'Advanced Filters'}
                  </h3>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-slate-900 dark:text-white/60 hover:text-slate-900 dark:text-white hover:bg-white/80 dark:bg-white/10"
                    >
                      {locale === 'es' ? 'Limpiar Todo' : 'Clear All'}
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="text-slate-900 dark:text-white font-semibold mb-3 block">
                      {locale === 'es' ? 'Categoría' : 'Category'}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {sanJuanCategories.map((category) => (
                        <Badge
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={cn(
                            "cursor-pointer transition-all px-4 py-2",
                            selectedCategory === category.id
                              ? `bg-gradient-to-r ${category.color} text-slate-900 dark:text-white border-0`
                              : "bg-white/80 dark:bg-white/10 text-slate-900 dark:text-slate-700 dark:text-white/70 border-amber-300/50 dark:border-white/20 hover:bg-white/20"
                          )}
                        >
                          <span className="mr-2">{category.emoji}</span>
                          {locale === 'es' ? category.es : category.en}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Difficulty Filter */}
                  <div>
                    <label className="text-slate-900 dark:text-white font-semibold mb-3 block">
                      {locale === 'es' ? 'Dificultad' : 'Difficulty'}
                    </label>
                    <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                      <SelectTrigger className="bg-white/80 dark:bg-white/10 backdrop-blur-sm border-amber-300/50 dark:border-white/20 text-slate-900 dark:text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="all" className="text-slate-900 dark:text-white">
                          {locale === 'es' ? 'Todas' : 'All'}
                        </SelectItem>
                        <SelectItem value="easy" className="text-slate-900 dark:text-white">
                          {locale === 'es' ? 'Fácil' : 'Easy'}
                        </SelectItem>
                        <SelectItem value="moderate" className="text-slate-900 dark:text-white">
                          {locale === 'es' ? 'Moderado' : 'Moderate'}
                        </SelectItem>
                        <SelectItem value="hard" className="text-slate-900 dark:text-white">
                          {locale === 'es' ? 'Difícil' : 'Hard'}
                        </SelectItem>
                        <SelectItem value="extreme" className="text-slate-900 dark:text-white">
                          {locale === 'es' ? 'Extremo' : 'Extreme'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>

        {/* Attractions Grid/List */}
        <div className="mb-12">
          {filteredAttractions.length === 0 ? (
            <div className="text-center py-16">
              <Mountain className="w-16 h-16 text-slate-900 dark:text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {locale === 'es' ? 'No se encontraron atracciones' : 'No attractions found'}
              </h3>
              <p className="text-slate-900 dark:text-white/60 mb-4">
                {locale === 'es' 
                  ? 'Intenta ajustar tus filtros para encontrar más opciones.'
                  : 'Try adjusting your filters to find more options.'
                }
              </p>
              <Button 
                onClick={clearFilters} 
                className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-slate-900 dark:text-white"
              >
                {locale === 'es' ? 'Limpiar Filtros' : 'Clear Filters'}
              </Button>
            </div>
          ) : (
            <div className={cn(
              "grid gap-6",
              viewMode === 'grid' 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            )}>
              {filteredAttractions.map((attraction) => (
                <SanJuanAttractionCard
                  key={attraction.id}
                  attraction={attraction}
                  locale={locale}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-12">
          <Card className="bg-gradient-to-r from-amber-400/10 to-orange-400/10 backdrop-blur-xl border-amber-300/50 dark:border-white/20 p-12 max-w-4xl mx-auto">
            <CardContent className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                {locale === 'es' 
                  ? '¿Listo para la aventura ancestral?' 
                  : 'Ready for the ancestral adventure?'
                }
              </h2>
              <p className="text-slate-900 dark:text-slate-700 dark:text-white/80 text-lg max-w-2xl mx-auto">
                {locale === 'es'
                  ? 'Explora templos prehispánicos, cuevas volcánicas y tradiciones nahuas en el pueblo del pulque'
                  : 'Explore pre-Hispanic temples, volcanic caves, and Nahua traditions in the village of pulque'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-slate-900 dark:text-white px-8 py-6 text-lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  {locale === 'es' ? 'Planear Visita' : 'Plan Visit'}
                </Button>
                <Button variant="outline" className="border-amber-300/50 dark:border-white/20 text-slate-900 dark:text-white hover:bg-white/80 dark:bg-white/10 px-8 py-6 text-lg">
                  <Heart className="w-5 h-5 mr-2" />
                  {locale === 'es' ? 'Guardar Lugares' : 'Save Places'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}