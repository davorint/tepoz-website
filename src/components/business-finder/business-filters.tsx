'use client'

import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search,
  Star,
  Navigation,
  Filter,
  X,
  Sparkles,
  TrendingUp,
  DollarSign,
  MapPin
} from 'lucide-react'

import { BusinessFiltersProps } from '@/types/business-finder'

const translations = {
  es: {
    searchPlaceholder: 'Buscar negocios, restaurantes, hoteles...',
    searchLabel: 'Buscar negocios',
    clearSearch: 'Limpiar búsqueda',
    clear: 'Limpiar',
    all: 'Todos',
    sortBy: 'Ordenar por:',
    featured: 'Destacados',
    highestRated: 'Mejor Calificados',
    nameAZ: 'Nombre A-Z',
    priceLowHigh: 'Precio Bajo-Alto',
    sortByDistance: 'Cerca de mí',
    advancedFilters: 'Filtros Avanzados',
    getUserLocation: 'Obtener ubicación',
    keepTyping: 'Sigue escribiendo...',
    more: 'más',
    filterByCategory: 'Filtrar por categoría',
    everything: 'Todo',
    priceRange: 'Rango de Precio',
    minimumRating: 'Mínima Calificación',
    features: 'Características',
    refineSearch: 'Refina tu búsqueda con precisión',
    showingResults: 'Mostrando ${count} de ${total} resultados',
    apply: 'Aplicar'
  },
  en: {
    searchPlaceholder: 'Search businesses, restaurants, hotels...',
    searchLabel: 'Search businesses',
    clearSearch: 'Clear search',
    clear: 'Clear',
    all: 'All',
    sortBy: 'Sort by:',
    featured: 'Featured',
    highestRated: 'Highest Rated',
    nameAZ: 'Name A-Z',
    priceLowHigh: 'Price Low-High',
    sortByDistance: 'Near me',
    advancedFilters: 'Advanced Filters',
    getUserLocation: 'Get location',
    keepTyping: 'Keep typing...',
    more: 'more',
    filterByCategory: 'Filter by category',
    everything: 'All',
    priceRange: 'Price Range',
    minimumRating: 'Minimum Rating',
    features: 'Features',
    refineSearch: 'Refine your search with precision',
    showingResults: 'Showing ${count} of ${total} results',
    apply: 'Apply'
  }
}

const featureOptions = [
  { id: 'featured', labelEs: 'Destacado', labelEn: 'Featured', icon: '⭐' },
  { id: 'outdoor', labelEs: 'Terraza', labelEn: 'Outdoor', icon: '🌳' },
  { id: 'wifi', labelEs: 'WiFi', labelEn: 'WiFi', icon: '📶' },
  { id: 'parking', labelEs: 'Estacionamiento', labelEn: 'Parking', icon: '🅿️' }
]

export function BusinessFilters({
  searchQuery,
  selectedCategory,
  sortBy,
  sortByDistance,
  userLocation,
  categories,
  isFilterChanging,
  showAdvancedFilters,
  lang,
  businessCount = 0,
  priceRange,
  ratingRange,
  selectedFeatures,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onSortByDistanceToggle,
  onAdvancedFiltersToggle,
  onPriceRangeChange,
  onRatingRangeChange,
  onFeaturesChange,
  onGetUserLocation,
  onClearFilters
}: BusinessFiltersProps) {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const t = translations[lang]

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
      // Escape to clear search
      if (e.key === 'Escape' && searchQuery) {
        onSearchChange('')
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [searchQuery, onSearchChange])

  const getCurrentCategoryInfo = () => {
    const currentIndex = categories.findIndex(c => c.id === selectedCategory)
    const current = categories[currentIndex]
    const nextIndex = (currentIndex + 1) % categories.length
    const next = categories[nextIndex]
    return { current, next, currentIndex, nextIndex }
  }

  const clearAllFilters = () => {
    onSearchChange('')
    onCategoryChange('all')
    onSortChange('featured')
    onSortByDistanceToggle(false)
    onPriceRangeChange([1, 4])
    onRatingRangeChange([3, 5])
    onFeaturesChange([])
    onAdvancedFiltersToggle(false)
    onClearFilters?.()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mb-8"
      role="search"
      aria-label={lang === 'es' ? 'Filtros de búsqueda de negocios' : 'Business search filters'}
    >
      <div className="backdrop-blur-md dark:backdrop-blur-xl bg-white/60 dark:bg-white/5 rounded-3xl border border-slate-300/20 dark:border-white/10 p-8 shadow-xl shadow-slate-300/20 dark:shadow-white/15 hover:bg-white/80 dark:hover:bg-white/8 hover:shadow-2xl hover:shadow-slate-400/25 dark:hover:shadow-white/20 transition-all duration-300 dark:duration-500 ease-out">
        {/* Main Search and Category Filter */}
        <div className="space-y-3 mb-4">
          {/* Main Search Row */}
          <div className="flex gap-3">
            {/* Optimized Search Input */}
            <div className="relative flex-1">
              {/* Single optimized glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400/15 to-cyan-400/15 dark:from-emerald-400/25 dark:to-cyan-400/25 rounded-xl opacity-0 
                focus-within:opacity-100 transition-opacity duration-200 dark:duration-400 blur-sm dark:blur-md" />
              
              <div className="relative bg-white/70 dark:bg-white/10 backdrop-blur-sm dark:backdrop-blur-sm border border-slate-300/30 dark:border-white/20 rounded-xl 
                hover:bg-white/85 dark:hover:bg-white/15 focus-within:bg-white/90 dark:focus-within:bg-white/15 focus-within:border-emerald-400 dark:focus-within:border-emerald-400
                transition-all duration-200 dark:duration-300 overflow-hidden group">
                
                {/* Simplified search icon */}
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none
                  transition-colors duration-300
                  ${searchQuery ? 'text-emerald-400' : 'text-slate-600 dark:text-white/50 group-hover:text-slate-700 dark:group-hover:text-white/70 group-focus-within:text-emerald-400/80'}`} 
                />
                
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-12 pr-10 h-12 bg-transparent border-0 text-slate-900 dark:text-white placeholder-slate-600 dark:placeholder-white/50 font-medium 
                    focus:ring-0 focus:outline-none"
                  aria-label={t.searchLabel}
                  aria-describedby={searchQuery ? "search-status" : undefined}
                  autoComplete="off"
                  spellCheck="false"
                />
                
                {/* Optimized clear button */}
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 
                        text-slate-600 dark:text-white/50 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/25 p-2 h-8 w-8 rounded-lg 
                        transition-all duration-150 dark:duration-250 backdrop-blur-sm dark:backdrop-blur-md border border-slate-300/20 dark:border-white/10 hover:border-slate-400/30 dark:hover:border-white/20
                        flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-400/50 dark:focus:ring-emerald-300/60 hover:scale-110 dark:hover:scale-125 hover:-translate-y-0.5 dark:hover:-translate-y-1 opacity-90 dark:opacity-100 hover:opacity-100 dark:hover:opacity-100"
                      onClick={() => onSearchChange('')}
                      aria-label={t.clearSearch}
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  )}
                </AnimatePresence>
                
                {/* Search status for screen readers */}
                {searchQuery && (
                  <div id="search-status" className="sr-only" aria-live="polite">
                    {businessCount > 0 
                      ? `${businessCount} ${lang === 'es' ? 'resultados encontrados' : 'results found'}`
                      : `${lang === 'es' ? 'Sin resultados' : 'No results'}`
                    }
                  </div>
                )}
              </div>
            </div>
            
            {/* Category Filter Button */}
            <Button
              size="sm"
              disabled={isFilterChanging}
              className={`h-12 px-4 rounded-xl backdrop-blur-sm dark:backdrop-blur-md border transition-all duration-200 dark:duration-300 flex-shrink-0 min-w-[140px] hover:scale-105 dark:hover:scale-110 hover:-translate-y-0.5 dark:hover:-translate-y-1 ${
                isFilterChanging
                  ? 'bg-emerald-500/30 dark:bg-emerald-500/20 border-emerald-400/50 dark:border-emerald-400/40 cursor-not-allowed opacity-70'
                  : selectedCategory !== 'all'
                    ? 'bg-emerald-500/40 dark:bg-emerald-500/30 border-emerald-400/60 dark:border-emerald-400/50 hover:bg-emerald-500/50 dark:hover:bg-emerald-500/40 hover:border-emerald-400/80 dark:hover:border-emerald-400/70 text-white shadow-lg shadow-emerald-400/20 dark:shadow-emerald-400/30 opacity-95 dark:opacity-100 hover:opacity-100 dark:hover:opacity-100'
                    : 'bg-white/70 dark:bg-white/10 border-slate-300/30 dark:border-white/20 hover:bg-white/85 dark:hover:bg-white/20 hover:border-emerald-400/40 dark:hover:border-emerald-400/30 text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white opacity-95 dark:opacity-100 hover:opacity-100 dark:hover:opacity-100'
              }`}
              onClick={async () => {
                if (isFilterChanging) return
                const { next } = getCurrentCategoryInfo()
                if (next) {
                  onCategoryChange(next.id)
                }
              }}
              aria-label={t.filterByCategory}
            >
              <span className="mr-2 text-lg">
                {isFilterChanging ? '🔄' : (() => {
                  const { current } = getCurrentCategoryInfo()
                  return current?.icon || '🔍'
                })()}
              </span>
              <span className="font-medium truncate">
                {(() => {
                  const { current } = getCurrentCategoryInfo()
                  return current?.name || t.everything
                })()}
              </span>
              {selectedCategory !== 'all' && (
                <div className="ml-2 w-2 h-2 bg-emerald-400 dark:bg-emerald-300 rounded-full flex-shrink-0" />
              )}
            </Button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {searchQuery && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-3 text-xs text-slate-700 dark:text-white/60 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/15 rounded-lg transition-all duration-150 dark:duration-200 hover:scale-110 dark:hover:scale-125 backdrop-blur-sm dark:backdrop-blur-md border border-slate-300/20 dark:border-white/10 hover:border-slate-400/30 dark:hover:border-white/20 opacity-90 dark:opacity-100 hover:opacity-100 dark:hover:opacity-100"
                  onClick={() => onSearchChange('')}
                >
                  {t.clear}
                </Button>
              )}
              {selectedCategory !== 'all' && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-3 text-xs text-slate-700 dark:text-white/60 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/15 rounded-lg transition-all duration-150 dark:duration-200 hover:scale-110 dark:hover:scale-125 backdrop-blur-sm dark:backdrop-blur-md border border-slate-300/20 dark:border-white/10 hover:border-slate-400/30 dark:hover:border-white/20 opacity-90 dark:opacity-100 hover:opacity-100 dark:hover:opacity-100"
                  onClick={() => onCategoryChange('all')}
                >
                  {t.all}
                </Button>
              )}
            </div>
            
            {/* Results count */}
            {businessCount > 0 && (
              <div className="text-xs text-slate-700 dark:text-white/50 bg-slate-200/70 dark:bg-white/12 px-3 py-1.5 rounded-full backdrop-blur-sm dark:backdrop-blur-md border border-slate-300/20 dark:border-white/10 shadow-sm shadow-slate-300/10 dark:shadow-white/15 hover:bg-slate-200/80 dark:hover:bg-white/20 hover:scale-105 dark:hover:scale-110 transition-all duration-200 dark:duration-300 opacity-90 dark:opacity-100 hover:opacity-100 dark:hover:opacity-100">
                {businessCount} {lang === 'es' ? 'lugares' : 'places'}
              </div>
            )}
          </div>
        </div>

        {/* Optimized Search Suggestions */}
        {searchQuery.length > 0 && searchQuery.length < 3 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mb-4"
          >
            <div className="bg-amber-500/15 dark:bg-amber-500/8 backdrop-blur-md dark:backdrop-blur-xl rounded-xl px-4 py-3 
              border border-amber-400/40 dark:border-amber-400/25 shadow-sm shadow-amber-400/10 dark:shadow-amber-400/15 hover:bg-amber-500/20 dark:hover:bg-amber-500/12 hover:scale-[1.002] dark:hover:scale-[1.005] transition-all duration-200 dark:duration-300 opacity-95 dark:opacity-100">
              
              <div className="flex items-center gap-3 text-amber-100 text-sm">
                <span className="text-lg animate-spin motion-reduce:animate-none">
                  💡
                </span>
                
                <div className="flex-1">
                  <span className="font-medium">
                    {t.keepTyping}
                  </span>
                  <span className="ml-2 px-2 py-0.5 bg-amber-400/20 text-amber-300 rounded-full text-xs font-semibold
                    border border-amber-400/30">
                    {3 - searchQuery.length} {t.more}
                  </span>
                </div>
                
                {/* Simplified progress dots */}
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        i < searchQuery.length 
                          ? 'bg-amber-400 scale-110' 
                          : 'bg-amber-400/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Controls Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          {/* Left side: Sorting and Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-slate-800 dark:text-white/70 text-sm font-medium">
                {t.sortBy}
              </span>
              <Select value={sortBy} onValueChange={onSortChange}>
                <SelectTrigger className="w-48 h-11 bg-slate-100/80 dark:bg-white/10 backdrop-blur-sm dark:backdrop-blur-md border-slate-300/50 dark:border-white/20 text-slate-900 dark:text-white hover:bg-slate-200/90 dark:hover:bg-white/18 transition-all duration-200 dark:duration-300 hover:scale-105 dark:hover:scale-110 hover:-translate-y-0.5 dark:hover:-translate-y-1 opacity-95 dark:opacity-100 hover:opacity-100 dark:hover:opacity-100 shadow-sm shadow-slate-300/10 dark:shadow-white/10 hover:shadow-md hover:shadow-slate-400/15 dark:hover:shadow-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="featured" className="text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      {t.featured}
                    </div>
                  </SelectItem>
                  <SelectItem value="rating" className="text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      {t.highestRated}
                    </div>
                  </SelectItem>
                  <SelectItem value="name" className="text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-blue-400" />
                      {t.nameAZ}
                    </div>
                  </SelectItem>
                  <SelectItem value="price" className="text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      {t.priceLowHigh}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Distance Sort Toggle */}
            {userLocation && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => onSortByDistanceToggle(!sortByDistance)}
                  variant={sortByDistance ? "default" : "outline"}
                  className={`px-4 py-2.5 rounded-xl backdrop-blur-sm dark:backdrop-blur-md border-white/20 dark:border-white/15 transition-all duration-200 dark:duration-300 hover:scale-105 dark:hover:scale-110 hover:-translate-y-0.5 dark:hover:-translate-y-1 ${
                    sortByDistance
                      ? 'bg-emerald-500/35 dark:bg-emerald-500/25 border-emerald-400/60 dark:border-emerald-400/50 text-emerald-400 dark:text-emerald-300 shadow-lg shadow-emerald-400/20 dark:shadow-emerald-400/30 opacity-100 dark:opacity-100'
                      : 'bg-slate-100/80 dark:bg-white/10 text-slate-900 dark:text-white/80 hover:bg-slate-200/90 dark:hover:bg-white/20 hover:border-emerald-400/40 dark:hover:border-emerald-400/30 opacity-95 dark:opacity-100 hover:opacity-100 dark:hover:opacity-100'
                  }`}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  {t.sortByDistance}
                </Button>
              </motion.div>
            )}

            {/* Get User Location Button */}
            {!userLocation && onGetUserLocation && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={onGetUserLocation}
                  variant="outline"
                  className="px-4 py-2.5 rounded-xl backdrop-blur-sm dark:backdrop-blur-md border-slate-300/50 dark:border-white/20 bg-slate-100/80 dark:bg-white/10 text-slate-900 dark:text-white/80 hover:bg-slate-200/90 dark:hover:bg-white/20 hover:border-cyan-400/40 dark:hover:border-cyan-400/30 transition-all duration-200 dark:duration-300 hover:scale-105 dark:hover:scale-110 hover:-translate-y-0.5 dark:hover:-translate-y-1 opacity-95 dark:opacity-100 hover:opacity-100 dark:hover:opacity-100 shadow-sm shadow-slate-300/10 dark:shadow-white/10 hover:shadow-md hover:shadow-cyan-400/15 dark:hover:shadow-cyan-400/20"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {t.getUserLocation}
                </Button>
              </motion.div>
            )}
          </div>

          {/* Right side: Advanced Filters Toggle */}
          <div className="flex items-center gap-3">
            {(searchQuery || selectedCategory !== 'all' || sortByDistance || selectedFeatures.length > 0) && (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 px-3 text-xs text-slate-700 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/40 dark:hover:bg-white/10 rounded-lg"
                onClick={clearAllFilters}
              >
                {t.clear}
              </Button>
            )}
            
            <Button
              onClick={() => onAdvancedFiltersToggle(!showAdvancedFilters)}
              variant={showAdvancedFilters ? "default" : "outline"}
              className={`px-4 py-2.5 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                showAdvancedFilters
                  ? 'bg-purple-500/30 border-purple-400/50 text-purple-400 shadow-lg shadow-purple-400/25'
                  : 'bg-slate-100/80 dark:bg-white/10 border-slate-300/50 dark:border-white/20 text-slate-900 dark:text-white/80 hover:bg-slate-200/80 dark:hover:bg-white/20 hover:border-purple-400/50'
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              {t.advancedFilters}
              {selectedFeatures.length > 0 && (
                <div className="ml-2 w-2 h-2 bg-purple-400 rounded-full" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {showAdvancedFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.9 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.9 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="mt-6 p-6 bg-gradient-to-r from-slate-900/90 to-blue-900/90 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center justify-center">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="text-xl"
                  >
                    ⚙️
                  </motion.span>
                </div>
                <div>
                  <h3 className="text-slate-900 dark:text-white font-semibold text-lg">
                    {t.advancedFilters}
                  </h3>
                  <p className="text-slate-700 dark:text-white/60 text-sm">
                    {t.refineSearch}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-slate-700 dark:text-white/50 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/40 dark:hover:bg-white/10 rounded-full"
                onClick={() => onAdvancedFiltersToggle(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Price Range */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-slate-900 dark:text-white font-medium text-sm">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  {t.priceRange}
                </label>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-700 dark:text-white/60">
                    <span>${'$'.repeat(priceRange[0])}</span>
                    <span>${'$'.repeat(priceRange[1])}</span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="4"
                      value={priceRange[0]}
                      onChange={(e) => onPriceRangeChange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>
              
              {/* Rating Range */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-slate-900 dark:text-white font-medium text-sm">
                  <Star className="w-4 h-4 text-yellow-400" />
                  {t.minimumRating}
                </label>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-700 dark:text-white/60">
                    <span>{ratingRange[0]}.0 ★</span>
                    <span>{ratingRange[1]}.0 ★</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="0.5"
                    value={ratingRange[0]}
                    onChange={(e) => onRatingRangeChange([parseFloat(e.target.value), ratingRange[1]])}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
              
              {/* Features */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-slate-900 dark:text-white font-medium text-sm">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  {t.features}
                </label>
                <div className="space-y-2">
                  {featureOptions.map((feature) => (
                    <motion.button
                      key={feature.id}
                      className={`flex items-center gap-2 w-full p-2 rounded-lg text-sm transition-all ${
                        selectedFeatures.includes(feature.id)
                          ? 'bg-purple-500/30 text-white border border-purple-400/50'
                          : 'bg-slate-200/40 dark:bg-white/5 text-slate-700 dark:text-white/70 hover:bg-slate-300/50 dark:hover:bg-white/10 border border-slate-300/40 dark:border-white/10'
                      }`}
                      onClick={() => {
                        const newFeatures = selectedFeatures.includes(feature.id)
                          ? selectedFeatures.filter(f => f !== feature.id)
                          : [...selectedFeatures, feature.id]
                        onFeaturesChange(newFeatures)
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{feature.icon}</span>
                      <span>{lang === 'es' ? feature.labelEs : feature.labelEn}</span>
                      {selectedFeatures.includes(feature.id) && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto text-purple-400"
                        >
                          ✓
                        </motion.span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Filter Actions */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs text-slate-700 dark:text-white/50">
                {businessCount > 0 && `${lang === 'es' ? 'Mostrando' : 'Showing'} ${businessCount} ${lang === 'es' ? 'resultados' : 'results'}`}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-slate-200/40 dark:bg-white/5 border-slate-300/40 dark:border-white/20 text-slate-700 dark:text-white/70 hover:bg-slate-300/50 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all"
                  onClick={() => {
                    onPriceRangeChange([1, 4])
                    onRatingRangeChange([3, 5])
                    onFeaturesChange([])
                  }}
                >
                  {t.clear}
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-400 to-indigo-400 text-white hover:from-purple-500 hover:to-indigo-500 transition-all"
                  onClick={() => {
                    console.log('✨ Advanced filters applied:', {
                      priceRange,
                      ratingRange,
                      selectedFeatures
                    })
                    onAdvancedFiltersToggle(false)
                  }}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {t.apply}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}