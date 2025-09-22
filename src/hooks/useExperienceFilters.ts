import { useState, useEffect, useMemo, useCallback } from 'react'
import { Experience, ExperienceService } from '@/lib/experiences'
import { Locale } from '@/lib/i18n'

export interface ExperienceFiltersState {
  searchQuery: string
  selectedCategory: string
  selectedAtmosphere: string
  selectedType: string
  selectedPriceRange: string
  selectedDuration: string
  featuredOnly: boolean
  sortBy: 'rating' | 'name' | 'price' | 'duration' | 'distance'
  userLocation: [number, number] | null
}

export interface ExperienceFiltersActions {
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string) => void
  setSelectedAtmosphere: (atmosphere: string) => void
  setSelectedType: (type: string) => void
  setSelectedPriceRange: (priceRange: string) => void
  setSelectedDuration: (duration: string) => void
  setFeaturedOnly: (featured: boolean) => void
  setSortBy: (sortBy: ExperienceFiltersState['sortBy']) => void
  setUserLocation: (location: [number, number] | null) => void
  clearFilters: () => void
  toggleFilter: (filterType: keyof ExperienceFiltersState, value: string | boolean | [number, number] | null) => void
}

export interface UseExperienceFiltersOptions {
  locale: Locale
  initialFilters?: Partial<ExperienceFiltersState>
  experiences?: Experience[]
  autoFilter?: boolean
}

export interface UseExperienceFiltersReturn {
  // State
  filters: ExperienceFiltersState
  filteredExperiences: Experience[]
  isLoading: boolean

  // Actions
  actions: ExperienceFiltersActions

  // Computed values
  hasActiveFilters: boolean
  totalCount: number
  filteredCount: number

  // Utility functions
  getCategoryCount: (category: string) => number
  getFilterSummary: () => string[]
}

const DEFAULT_FILTERS: ExperienceFiltersState = {
  searchQuery: '',
  selectedCategory: 'all',
  selectedAtmosphere: 'all',
  selectedType: 'all',
  selectedPriceRange: 'all',
  selectedDuration: 'all',
  featuredOnly: false,
  sortBy: 'rating',
  userLocation: null
}

export const useExperienceFilters = ({
  locale,
  initialFilters = {},
  experiences,
  autoFilter = true
}: UseExperienceFiltersOptions): UseExperienceFiltersReturn => {
  // Initialize filters with defaults and overrides
  const [filters, setFilters] = useState<ExperienceFiltersState>({
    ...DEFAULT_FILTERS,
    ...initialFilters
  })

  const [allExperiences, setAllExperiences] = useState<Experience[]>(
    experiences || ExperienceService.getAllExperiences()
  )

  const [isLoading, setIsLoading] = useState(false)

  // Update experiences if prop changes
  useEffect(() => {
    if (experiences) {
      setAllExperiences(experiences)
    }
  }, [experiences])

  // Filter and sort experiences
  const filteredExperiences = useMemo(() => {
    if (!autoFilter) return allExperiences

    setIsLoading(true)

    let filtered = [...allExperiences]

    try {
      // Apply search
      if (filters.searchQuery.trim()) {
        filtered = ExperienceService.searchExperiences(filters.searchQuery, locale)
      }

      // Apply category filter
      if (filters.selectedCategory !== 'all') {
        filtered = filtered.filter(experience => experience.category === filters.selectedCategory)
      }

      // Apply atmosphere filter
      if (filters.selectedAtmosphere !== 'all') {
        filtered = filtered.filter(experience => experience.atmosphere === filters.selectedAtmosphere)
      }

      // Apply type filter
      if (filters.selectedType !== 'all') {
        filtered = filtered.filter(experience => experience.type === filters.selectedType)
      }

      // Apply price filter
      if (filters.selectedPriceRange !== 'all') {
        const priceFiltered = ExperienceService.filterExperiences({
          priceRange: filters.selectedPriceRange as 'budget' | 'mid' | 'luxury' | 'premium'
        })
        filtered = filtered.filter(experience => priceFiltered.includes(experience))
      }

      // Apply duration filter
      if (filters.selectedDuration !== 'all') {
        const durationFiltered = ExperienceService.filterExperiences({
          duration: filters.selectedDuration as 'short' | 'half-day' | 'full-day' | 'multi-day'
        })
        filtered = filtered.filter(experience => durationFiltered.includes(experience))
      }

      // Apply featured filter
      if (filters.featuredOnly) {
        filtered = filtered.filter(experience => experience.featured)
      }

      // Apply sorting
      filtered = ExperienceService.sortExperiences(filtered, filters.sortBy, filters.userLocation || undefined)

    } catch (error) {
      console.error('Error filtering experiences:', error)
      filtered = allExperiences
    } finally {
      setIsLoading(false)
    }

    return filtered
  }, [allExperiences, filters, locale, autoFilter])

  // Actions
  const actions: ExperienceFiltersActions = useMemo(() => ({
    setSearchQuery: (searchQuery: string) => {
      setFilters(prev => ({ ...prev, searchQuery }))
    },

    setSelectedCategory: (selectedCategory: string) => {
      setFilters(prev => ({ ...prev, selectedCategory }))
    },

    setSelectedAtmosphere: (selectedAtmosphere: string) => {
      setFilters(prev => ({ ...prev, selectedAtmosphere }))
    },

    setSelectedType: (selectedType: string) => {
      setFilters(prev => ({ ...prev, selectedType }))
    },

    setSelectedPriceRange: (selectedPriceRange: string) => {
      setFilters(prev => ({ ...prev, selectedPriceRange }))
    },

    setSelectedDuration: (selectedDuration: string) => {
      setFilters(prev => ({ ...prev, selectedDuration }))
    },

    setFeaturedOnly: (featuredOnly: boolean) => {
      setFilters(prev => ({ ...prev, featuredOnly }))
    },

    setSortBy: (sortBy: ExperienceFiltersState['sortBy']) => {
      setFilters(prev => ({ ...prev, sortBy }))
    },

    setUserLocation: (userLocation: [number, number] | null) => {
      setFilters(prev => ({ ...prev, userLocation }))
    },

    clearFilters: () => {
      setFilters({
        ...DEFAULT_FILTERS,
        userLocation: filters.userLocation // Keep user location
      })
    },

    toggleFilter: (filterType: keyof ExperienceFiltersState, value: string | boolean | [number, number] | null) => {
      setFilters(prev => ({
        ...prev,
        [filterType]: prev[filterType] === value ?
          (filterType === 'featuredOnly' ? false : 'all') :
          value
      }))
    }
  }), [filters.userLocation])

  // Computed values
  const hasActiveFilters = useMemo(() => {
    return filters.searchQuery !== '' ||
           filters.selectedCategory !== 'all' ||
           filters.selectedAtmosphere !== 'all' ||
           filters.selectedType !== 'all' ||
           filters.selectedPriceRange !== 'all' ||
           filters.selectedDuration !== 'all' ||
           filters.featuredOnly
  }, [filters])

  const getCategoryCount = useCallback((category: string) => {
    if (category === 'all') return allExperiences.length
    return allExperiences.filter(experience => experience.category === category).length
  }, [allExperiences])

  const getFilterSummary = useCallback(() => {
    const summary: string[] = []

    if (filters.searchQuery) {
      summary.push(`Search: "${filters.searchQuery}"`)
    }
    if (filters.selectedCategory !== 'all') {
      summary.push(`Category: ${filters.selectedCategory}`)
    }
    if (filters.selectedAtmosphere !== 'all') {
      summary.push(`Atmosphere: ${filters.selectedAtmosphere}`)
    }
    if (filters.selectedType !== 'all') {
      summary.push(`Type: ${filters.selectedType}`)
    }
    if (filters.selectedPriceRange !== 'all') {
      summary.push(`Price: ${filters.selectedPriceRange}`)
    }
    if (filters.selectedDuration !== 'all') {
      summary.push(`Duration: ${filters.selectedDuration}`)
    }
    if (filters.featuredOnly) {
      summary.push('Featured only')
    }

    return summary
  }, [filters])

  return {
    // State
    filters,
    filteredExperiences,
    isLoading,

    // Actions
    actions,

    // Computed values
    hasActiveFilters,
    totalCount: allExperiences.length,
    filteredCount: filteredExperiences.length,

    // Utility functions
    getCategoryCount,
    getFilterSummary
  }
}

// Specialized hooks for common use cases
export const useQuickFilters = (locale: Locale) => {
  return useExperienceFilters({
    locale,
    initialFilters: {
      sortBy: 'rating'
    }
  })
}

export const useFeaturedExperiences = (locale: Locale) => {
  return useExperienceFilters({
    locale,
    initialFilters: {
      featuredOnly: true,
      sortBy: 'rating'
    }
  })
}

export const useCategoryFilters = (locale: Locale, category: string) => {
  return useExperienceFilters({
    locale,
    initialFilters: {
      selectedCategory: category,
      sortBy: 'rating'
    }
  })
}

export const useSearchFilters = (locale: Locale, searchQuery: string) => {
  return useExperienceFilters({
    locale,
    initialFilters: {
      searchQuery,
      sortBy: 'rating'
    }
  })
}