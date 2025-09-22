'use client'

import { Locale } from '@/lib/i18n'
import { Experience } from '@/lib/experiences'
import ExperienceCard from './ExperienceCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Compass,
  Grid3X3,
  List,
  SortAsc,
  SortDesc
} from 'lucide-react'

export interface ExperienceResultsProps {
  experiences: Experience[]
  totalCount: number
  locale: Locale
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
  hasActiveFilters: boolean
  isLoading?: boolean
  onViewOnMap?: (experience: Experience) => void
  sortBy: string
  onSortChange: (sortBy: string) => void
  className?: string
}

const SORT_OPTIONS = [
  { value: 'rating', labelEs: 'Calificación', labelEn: 'Rating' },
  { value: 'name', labelEs: 'Nombre', labelEn: 'Name' },
  { value: 'price', labelEs: 'Precio', labelEn: 'Price' },
  { value: 'duration', labelEs: 'Duración', labelEn: 'Duration' },
  { value: 'distance', labelEs: 'Distancia', labelEn: 'Distance' }
] as const

export default function ExperienceResults({
  experiences,
  totalCount,
  locale,
  viewMode,
  onViewModeChange,
  hasActiveFilters,
  isLoading = false,
  onViewOnMap,
  sortBy,
  onSortChange,
  className
}: ExperienceResultsProps) {

  const getSortLabel = (value: string) => {
    const option = SORT_OPTIONS.find(opt => opt.value === value)
    return option ? (locale === 'es' ? option.labelEs : option.labelEn) : value
  }

  const nextSortOption = () => {
    const currentIndex = SORT_OPTIONS.findIndex(opt => opt.value === sortBy)
    const nextIndex = (currentIndex + 1) % SORT_OPTIONS.length
    return SORT_OPTIONS[nextIndex].value
  }

  if (isLoading) {
    return (
      <div className={className}>
        <ExperienceResultsSkeleton viewMode={viewMode} />
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Results Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <p className="text-slate-600 dark:text-white/70">
            {locale === 'es'
              ? `Mostrando ${experiences.length} de ${totalCount} experiencias`
              : `Showing ${experiences.length} of ${totalCount} experiences`
            }
          </p>
          {hasActiveFilters && (
            <Badge className="bg-teal-100 dark:bg-teal-400/20 text-teal-700 dark:text-teal-300 border border-teal-300 dark:border-teal-400/30">
              {locale === 'es' ? 'Filtrado' : 'Filtered'}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Sort Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSortChange(nextSortOption())}
            className="bg-white/10 dark:bg-white/10 hover:bg-white/20 dark:hover:bg-white/20 text-slate-900 dark:text-white border-slate-300 dark:border-white/20"
            title={`${locale === 'es' ? 'Ordenar por' : 'Sort by'}: ${getSortLabel(sortBy)}`}
          >
            {sortBy === 'name' ? <SortAsc className="w-4 h-4 mr-1" /> : <SortDesc className="w-4 h-4 mr-1" />}
            {getSortLabel(sortBy)}
          </Button>

          {/* View Mode Toggle */}
          <div className="flex rounded-md overflow-hidden border border-slate-300 dark:border-white/20">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="rounded-none bg-white/10 dark:bg-white/10 hover:bg-white/20 dark:hover:bg-white/20 text-slate-900 dark:text-white border-0"
            >
              <Grid3X3 className="w-4 h-4" />
              <span className="sr-only">{locale === 'es' ? 'Vista de cuadrícula' : 'Grid view'}</span>
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="rounded-none bg-white/10 dark:bg-white/10 hover:bg-white/20 dark:hover:bg-white/20 text-slate-900 dark:text-white border-0"
            >
              <List className="w-4 h-4" />
              <span className="sr-only">{locale === 'es' ? 'Vista de lista' : 'List view'}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Results Content */}
      {experiences.length > 0 ? (
        <div className={`experiences-results mb-16 ${
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            : 'space-y-6'
        }`}>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              locale={locale}
              viewMode={viewMode}
              animationDelay={index * 100}
              onViewOnMap={onViewOnMap}
            />
          ))}
        </div>
      ) : (
        <ExperienceNoResults
          locale={locale}
          hasActiveFilters={hasActiveFilters}
        />
      )}
    </div>
  )
}

interface ExperienceNoResultsProps {
  locale: Locale
  hasActiveFilters: boolean
}

function ExperienceNoResults({ locale, hasActiveFilters }: ExperienceNoResultsProps) {
  return (
    <div className="text-center py-16">
      <Compass className="h-16 w-16 text-slate-400 dark:text-white/30 mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
        {locale === 'es' ? 'No se encontraron experiencias' : 'No experiences found'}
      </h3>
      <p className="text-slate-600 dark:text-white/60 mb-6 max-w-md mx-auto">
        {locale === 'es'
          ? hasActiveFilters
            ? 'Intenta ajustar tus filtros o buscar algo diferente para encontrar más experiencias.'
            : 'Parece que no hay experiencias disponibles en este momento.'
          : hasActiveFilters
            ? 'Try adjusting your filters or searching for something different to find more experiences.'
            : 'It looks like there are no experiences available at the moment.'
        }
      </p>
      {hasActiveFilters && (
        <Button
          variant="outline"
          className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-0"
        >
          {locale === 'es' ? 'Limpiar filtros' : 'Clear filters'}
        </Button>
      )}
    </div>
  )
}

function ExperienceResultsSkeleton({ viewMode }: { viewMode: 'grid' | 'list' }) {
  const skeletonItems = Array.from({ length: viewMode === 'grid' ? 6 : 3 })

  return (
    <>
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-48" />
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse w-16" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-20" />
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-16" />
        </div>
      </div>

      {/* Results Skeleton */}
      <div className={`${
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          : 'space-y-6'
      }`}>
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className={`bg-white/80 dark:bg-white/10 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-white/20 p-6 animate-pulse ${
              viewMode === 'list' ? 'flex' : ''
            }`}
          >
            <div className={`${viewMode === 'list' ? 'w-80 h-48 mr-6' : 'h-64 mb-4'} bg-slate-200 dark:bg-slate-700 rounded-2xl`} />
            <div className={viewMode === 'list' ? 'flex-1' : ''}>
              <div className="space-y-4">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
                <div className="flex gap-2">
                  <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-16" />
                  <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-20" />
                </div>
                <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-lg w-full mt-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}