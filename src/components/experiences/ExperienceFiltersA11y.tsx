'use client'

import React, { useState, useCallback, useRef, useId } from 'react'
import { Locale } from '@/lib/i18n'
import { experienceCategories, atmosphereTypes, experienceTypes } from '@/lib/experiences'
import { ExperienceService } from '@/lib/experiences'
import { ExperienceFiltersState } from '@/hooks/useExperienceFiltersOptimized'
import { useExperienceUI } from '@/hooks/useExperienceUI'
import GlassmorphismCard from '@/components/ui/GlassmorphismCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Search,
  Filter,
  X,
  Star,
  Navigation,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

export interface ExperienceFiltersA11yProps {
  locale: Locale
  filters: ExperienceFiltersState
  onFiltersChange: (filters: Partial<ExperienceFiltersState>) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
  userLocation?: readonly [number, number] | null
  isLoading?: boolean
  filteredCount: number
  totalCount: number
  className?: string
}

export default function ExperienceFiltersA11y({
  locale,
  filters,
  onFiltersChange,
  onClearFilters,
  hasActiveFilters,
  userLocation,
  isLoading = false,
  filteredCount,
  totalCount,
  className
}: ExperienceFiltersA11yProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const { t } = useExperienceUI()

  // Accessibility IDs
  const searchId = useId()
  const filtersRegionId = useId()
  const resultsId = useId()

  // Refs for focus management
  const searchInputRef = useRef<HTMLInputElement>(null)
  const filtersToggleRef = useRef<HTMLButtonElement>(null)

  const handleFilterChange = useCallback(
    (key: keyof ExperienceFiltersState, value: string | boolean | [number, number] | null) => {
      onFiltersChange({ [key]: value })
    },
    [onFiltersChange]
  )

  const toggleQuickFilter = useCallback(
    (key: keyof ExperienceFiltersState, value: string | boolean | [number, number] | null) => {
      const currentValue = filters[key]
      const newValue = currentValue === value ?
        (key === 'featuredOnly' ? false : 'all') :
        value
      onFiltersChange({ [key]: newValue })
    },
    [filters, onFiltersChange]
  )

  const handleAdvancedToggle = useCallback(() => {
    setShowAdvanced(prev => !prev)
    // Announce the state change to screen readers
    setTimeout(() => {
      const announcement = showAdvanced
        ? locale === 'es' ? 'Filtros avanzados cerrados' : 'Advanced filters closed'
        : locale === 'es' ? 'Filtros avanzados abiertos' : 'Advanced filters opened'

      // Create temporary live region for announcement
      const liveRegion = document.createElement('div')
      liveRegion.setAttribute('aria-live', 'polite')
      liveRegion.setAttribute('aria-atomic', 'true')
      liveRegion.className = 'sr-only'
      liveRegion.textContent = announcement
      document.body.appendChild(liveRegion)

      setTimeout(() => document.body.removeChild(liveRegion), 1000)
    }, 100)
  }, [showAdvanced, locale])

  const handleClearFilters = useCallback(() => {
    onClearFilters()
    // Focus search input after clearing
    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 100)
  }, [onClearFilters])

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    // Handle keyboard navigation
    if (event.key === 'Escape' && showAdvanced) {
      setShowAdvanced(false)
      filtersToggleRef.current?.focus()
    }
  }, [showAdvanced])

  // Screen reader status message
  const statusMessage = locale === 'es'
    ? `${filteredCount} de ${totalCount} experiencias mostradas${hasActiveFilters ? ' (filtrado activo)' : ''}`
    : `${filteredCount} of ${totalCount} experiences shown${hasActiveFilters ? ' (filters active)' : ''}`

  return (
    <GlassmorphismCard
      level="medium"
      className={className}
      role="search"
      aria-labelledby={`${searchId}-label`}
    >
      <div className="p-6" onKeyDown={handleKeyDown}>
        {/* Screen reader only label */}
        <h2 id={`${searchId}-label`} className="sr-only">
          {locale === 'es' ? 'Buscar y filtrar experiencias' : 'Search and filter experiences'}
        </h2>

        {/* Live region for filter results */}
        <div
          id={resultsId}
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {statusMessage}
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Label htmlFor={searchId} className="sr-only">
              {locale === 'es' ? 'Buscar experiencias' : 'Search experiences'}
            </Label>
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-white/50 h-4 w-4"
              aria-hidden="true"
            />
            <Input
              id={searchId}
              ref={searchInputRef}
              placeholder={locale === 'es' ? 'Buscar aventuras, retiros, ceremonias...' : 'Search adventures, retreats, ceremonies...'}
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              className="pl-10 bg-white/80 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-white/50 focus:border-teal-400 focus:ring-teal-400/20"
              aria-describedby={hasActiveFilters ? `${filtersRegionId}-status` : undefined}
            />
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2 flex-wrap" role="group" aria-label={locale === 'es' ? 'Filtros rápidos' : 'Quick filters'}>
            <Button
              variant={filters.selectedDuration === 'full-day' ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleQuickFilter('selectedDuration', 'full-day')}
              className="bg-slate-200/50 dark:bg-white/10 hover:bg-slate-300/50 dark:hover:bg-white/20 text-slate-900 dark:text-white border-slate-300 dark:border-white/20"
              aria-pressed={filters.selectedDuration === 'full-day'}
            >
              {locale === 'es' ? 'Día Completo' : 'Full Day'}
            </Button>

            <Button
              variant={filters.featuredOnly ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleQuickFilter('featuredOnly', true)}
              className="bg-slate-200/50 dark:bg-white/10 hover:bg-slate-300/50 dark:hover:bg-white/20 text-slate-900 dark:text-white border-slate-300 dark:border-white/20"
              aria-pressed={filters.featuredOnly}
            >
              <Star className="h-4 w-4 mr-1" aria-hidden="true" />
              {locale === 'es' ? 'Destacadas' : 'Featured'}
            </Button>

            {userLocation && (
              <Button
                variant={filters.sortBy === 'distance' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange('sortBy', filters.sortBy === 'distance' ? 'rating' : 'distance')}
                className="bg-slate-200/50 dark:bg-white/10 hover:bg-slate-300/50 dark:hover:bg-white/20 text-slate-900 dark:text-white border-slate-300 dark:border-white/20"
                aria-pressed={filters.sortBy === 'distance'}
              >
                <Navigation className="h-4 w-4 mr-1" aria-hidden="true" />
                {locale === 'es' ? 'Por Distancia' : 'By Distance'}
              </Button>
            )}

            <Button
              variant={filters.selectedCategory === 'adventure' ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleQuickFilter('selectedCategory', 'adventure')}
              className="bg-slate-200/50 dark:bg-white/10 hover:bg-slate-300/50 dark:hover:bg-white/20 text-slate-900 dark:text-white border-slate-300 dark:border-white/20"
              aria-pressed={filters.selectedCategory === 'adventure'}
            >
              {locale === 'es' ? 'Aventura' : 'Adventure'}
            </Button>
          </div>
        </div>

        {/* Advanced Filters Controls */}
        <div className="flex justify-between items-center mt-4">
          <Button
            ref={filtersToggleRef}
            variant="outline"
            size="sm"
            onClick={handleAdvancedToggle}
            className="bg-slate-200/50 dark:bg-white/10 hover:bg-slate-300/50 dark:hover:bg-white/20 text-slate-900 dark:text-white border-slate-300 dark:border-white/20"
            aria-expanded={showAdvanced}
            aria-controls={filtersRegionId}
          >
            <Filter className="h-4 w-4 mr-1" aria-hidden="true" />
            {t('filters', locale)}
            {showAdvanced ? (
              <ChevronUp className="h-4 w-4 ml-1" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-1" aria-hidden="true" />
            )}
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10"
            >
              <X className="h-4 w-4 mr-1" aria-hidden="true" />
              {t('clearFilters', locale)}
              <span className="sr-only">
                {locale === 'es' ? 'Limpiar todos los filtros activos' : 'Clear all active filters'}
              </span>
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div
            id={filtersRegionId}
            className="mt-6 pt-6 border-t border-white/20"
            role="region"
            aria-label={locale === 'es' ? 'Filtros avanzados' : 'Advanced filters'}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {locale === 'es' ? 'Filtros Avanzados' : 'Advanced Filters'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <Label htmlFor={`${filtersRegionId}-category`} className="text-slate-700 dark:text-white/80 text-sm mb-2 block">
                  {t('category', locale)}
                </Label>
                <Select
                  value={filters.selectedCategory}
                  onValueChange={(value) => handleFilterChange('selectedCategory', value)}
                >
                  <SelectTrigger
                    id={`${filtersRegionId}-category`}
                    className="bg-white/80 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white"
                    aria-label={`${t('category', locale)}: ${filters.selectedCategory === 'all' ? t('all', locale) : filters.selectedCategory}`}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('all', locale)}</SelectItem>
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
                <Label htmlFor={`${filtersRegionId}-atmosphere`} className="text-slate-700 dark:text-white/80 text-sm mb-2 block">
                  {t('atmosphere', locale)}
                </Label>
                <Select
                  value={filters.selectedAtmosphere}
                  onValueChange={(value) => handleFilterChange('selectedAtmosphere', value)}
                >
                  <SelectTrigger
                    id={`${filtersRegionId}-atmosphere`}
                    className="bg-white/80 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('all', locale)}</SelectItem>
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
                <Label htmlFor={`${filtersRegionId}-type`} className="text-slate-700 dark:text-white/80 text-sm mb-2 block">
                  {t('type', locale)}
                </Label>
                <Select
                  value={filters.selectedType}
                  onValueChange={(value) => handleFilterChange('selectedType', value)}
                >
                  <SelectTrigger
                    id={`${filtersRegionId}-type`}
                    className="bg-white/80 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('all', locale)}</SelectItem>
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
            </div>

            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`${filtersRegionId}-featured`}
                  checked={filters.featuredOnly}
                  onCheckedChange={(checked) => handleFilterChange('featuredOnly', checked === true)}
                  aria-describedby={`${filtersRegionId}-featured-desc`}
                />
                <Label htmlFor={`${filtersRegionId}-featured`} className="text-slate-700 dark:text-white/80 text-sm">
                  {locale === 'es' ? 'Solo experiencias destacadas' : 'Featured experiences only'}
                </Label>
                <span id={`${filtersRegionId}-featured-desc`} className="sr-only">
                  {locale === 'es'
                    ? 'Mostrar únicamente las experiencias marcadas como destacadas'
                    : 'Show only experiences marked as featured'
                  }
                </span>
              </div>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10"
                >
                  <X className="h-4 w-4 mr-1" aria-hidden="true" />
                  {t('clearFilters', locale)}
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="mt-4 text-center" role="status" aria-live="polite">
            <span className="text-slate-600 dark:text-white/70">
              {locale === 'es' ? 'Actualizando resultados...' : 'Updating results...'}
            </span>
          </div>
        )}
      </div>
    </GlassmorphismCard>
  )
}