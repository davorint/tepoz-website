'use client'

import { useState } from 'react'
import { Locale } from '@/lib/i18n'
import { experienceCategories, atmosphereTypes, experienceTypes } from '@/lib/experiences'
import { ExperienceService } from '@/lib/experiences'
import { ExperienceFiltersState } from '@/hooks/useExperienceFilters'
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
  Navigation
} from 'lucide-react'

export interface ExperienceFiltersProps {
  locale: Locale
  filters: ExperienceFiltersState
  onFiltersChange: (filters: Partial<ExperienceFiltersState>) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
  userLocation?: [number, number] | null
  className?: string
}

export default function ExperienceFilters({
  locale,
  filters,
  onFiltersChange,
  onClearFilters,
  hasActiveFilters,
  userLocation,
  className
}: ExperienceFiltersProps) {

  const handleFilterChange = (key: keyof ExperienceFiltersState, value: string | boolean | [number, number] | null) => {
    onFiltersChange({ [key]: value })
  }

  const toggleQuickFilter = (key: keyof ExperienceFiltersState, value: string | boolean | [number, number] | null) => {
    const currentValue = filters[key]
    const newValue = currentValue === value ?
      (key === 'featuredOnly' ? false : 'all') :
      value
    onFiltersChange({ [key]: newValue })
  }

  return (
    <GlassmorphismCard level="medium" className={className}>
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-white/50 h-4 w-4" />
            <Input
              placeholder={locale === 'es' ? 'Buscar aventuras, retiros, ceremonias...' : 'Search adventures, retreats, ceremonies...'}
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              className="pl-10 bg-white/80 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-white/50 focus:border-teal-400 focus:ring-teal-400/20"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filters.selectedDuration === 'full-day' ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleQuickFilter('selectedDuration', 'full-day')}
              className="bg-slate-200/50 dark:bg-white/10 hover:bg-slate-300/50 dark:hover:bg-white/20 text-slate-900 dark:text-white border-slate-300 dark:border-white/20"
            >
              {locale === 'es' ? 'Día Completo' : 'Full Day'}
            </Button>

            <Button
              variant={filters.featuredOnly ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleQuickFilter('featuredOnly', true)}
              className="bg-slate-200/50 dark:bg-white/10 hover:bg-slate-300/50 dark:hover:bg-white/20 text-slate-900 dark:text-white border-slate-300 dark:border-white/20"
            >
              <Star className="h-4 w-4 mr-1" />
              {locale === 'es' ? 'Destacadas' : 'Featured'}
            </Button>

            {userLocation && (
              <Button
                variant={filters.sortBy === 'distance' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange('sortBy', filters.sortBy === 'distance' ? 'rating' : 'distance')}
                className="bg-slate-200/50 dark:bg-white/10 hover:bg-slate-300/50 dark:hover:bg-white/20 text-slate-900 dark:text-white border-slate-300 dark:border-white/20"
              >
                <Navigation className="h-4 w-4 mr-1" />
                {locale === 'es' ? 'Por Distancia' : 'By Distance'}
              </Button>
            )}

            <Button
              variant={filters.selectedCategory === 'adventure' ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleQuickFilter('selectedCategory', 'adventure')}
              className="bg-slate-200/50 dark:bg-white/10 hover:bg-slate-300/50 dark:hover:bg-white/20 text-slate-900 dark:text-white border-slate-300 dark:border-white/20"
            >
              {locale === 'es' ? 'Aventura' : 'Adventure'}
            </Button>
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <AdvancedFilters
          locale={locale}
          filters={filters}
          onFiltersChange={onFiltersChange}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={onClearFilters}
        />
      </div>
    </GlassmorphismCard>
  )
}

interface AdvancedFiltersProps {
  locale: Locale
  filters: ExperienceFiltersState
  onFiltersChange: (filters: Partial<ExperienceFiltersState>) => void
  hasActiveFilters: boolean
  onClearFilters: () => void
}

function AdvancedFilters({
  locale,
  filters,
  onFiltersChange,
  hasActiveFilters,
  onClearFilters
}: AdvancedFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const experienceUI = useExperienceUI()
  const t = (key: string) => experienceUI.t(key as never, locale)

  const handleFilterChange = (key: keyof ExperienceFiltersState, value: string | boolean | [number, number] | null) => {
    onFiltersChange({ [key]: value })
  }

  if (!showAdvanced) {
    return (
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdvanced(true)}
          className="bg-slate-200/50 dark:bg-white/10 hover:bg-slate-300/50 dark:hover:bg-white/20 text-slate-900 dark:text-white border-slate-300 dark:border-white/20"
        >
          <Filter className="h-4 w-4 mr-1" />
          {t('filters')}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10"
          >
            <X className="h-4 w-4 mr-1" />
            {t('clearFilters')}
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="mt-6 pt-6 border-t border-white/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          {locale === 'es' ? 'Filtros Avanzados' : 'Advanced Filters'}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAdvanced(false)}
          className="text-slate-600 dark:text-white/70"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Category Filter */}
        <div>
          <Label className="text-slate-700 dark:text-white/80 text-sm mb-2 block">
            {t('category')}
          </Label>
          <Select value={filters.selectedCategory} onValueChange={(value) => handleFilterChange('selectedCategory', value)}>
            <SelectTrigger className="bg-white/80 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('all')}</SelectItem>
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
            {t('atmosphere')}
          </Label>
          <Select value={filters.selectedAtmosphere} onValueChange={(value) => handleFilterChange('selectedAtmosphere', value)}>
            <SelectTrigger className="bg-white/80 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('all')}</SelectItem>
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
            {t('type')}
          </Label>
          <Select value={filters.selectedType} onValueChange={(value) => handleFilterChange('selectedType', value)}>
            <SelectTrigger className="bg-white/80 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('all')}</SelectItem>
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
            {t('price')}
          </Label>
          <Select value={filters.selectedPriceRange} onValueChange={(value) => handleFilterChange('selectedPriceRange', value)}>
            <SelectTrigger className="bg-white/80 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('all')}</SelectItem>
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
            {t('duration')}
          </Label>
          <Select value={filters.selectedDuration} onValueChange={(value) => handleFilterChange('selectedDuration', value)}>
            <SelectTrigger className="bg-white/80 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('all')}</SelectItem>
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
            checked={filters.featuredOnly}
            onCheckedChange={(checked) => handleFilterChange('featuredOnly', checked === true)}
          />
          <Label htmlFor="featured" className="text-slate-700 dark:text-white/80 text-sm">
            {locale === 'es' ? 'Solo experiencias destacadas' : 'Featured experiences only'}
          </Label>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10"
          >
            <X className="h-4 w-4 mr-1" />
            {t('clearFilters')}
          </Button>
        )}
      </div>
    </div>
  )
}