import { useState, useEffect, useMemo, useCallback, useReducer } from 'react'
import { Experience, ExperienceService } from '@/lib/experiences'
import { Locale } from '@/lib/i18n'

// Strict TypeScript interfaces
export interface ExperienceFiltersState {
  readonly searchQuery: string
  readonly selectedCategory: string
  readonly selectedAtmosphere: string
  readonly selectedType: string
  readonly selectedPriceRange: string
  readonly selectedDuration: string
  readonly featuredOnly: boolean
  readonly sortBy: 'rating' | 'name' | 'price' | 'duration' | 'distance'
  readonly userLocation: readonly [number, number] | null
}

export type FilterKey = keyof ExperienceFiltersState

export interface ExperienceFiltersActions {
  readonly setSearchQuery: (query: string) => void
  readonly setSelectedCategory: (category: string) => void
  readonly setSelectedAtmosphere: (atmosphere: string) => void
  readonly setSelectedType: (type: string) => void
  readonly setSelectedPriceRange: (priceRange: string) => void
  readonly setSelectedDuration: (duration: string) => void
  readonly setFeaturedOnly: (featured: boolean) => void
  readonly setSortBy: (sortBy: ExperienceFiltersState['sortBy']) => void
  readonly setUserLocation: (location: readonly [number, number] | null) => void
  readonly clearFilters: () => void
  readonly toggleFilter: <K extends FilterKey>(filterType: K, value: ExperienceFiltersState[K]) => void
  readonly resetFilter: <K extends FilterKey>(filterType: K) => void
}

export interface UseExperienceFiltersOptions {
  readonly locale: Locale
  readonly initialFilters?: Partial<ExperienceFiltersState>
  readonly experiences?: readonly Experience[]
  readonly autoFilter?: boolean
  readonly debounceMs?: number
}

export interface UseExperienceFiltersReturn {
  readonly filters: ExperienceFiltersState
  readonly filteredExperiences: readonly Experience[]
  readonly isLoading: boolean
  readonly error: Error | null
  readonly actions: ExperienceFiltersActions
  readonly hasActiveFilters: boolean
  readonly totalCount: number
  readonly filteredCount: number
  readonly getCategoryCount: (category: string) => number
  readonly getFilterSummary: () => readonly string[]
  readonly retry: () => void
}

// Action types for useReducer
type FilterAction =
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string }
  | { type: 'SET_SELECTED_ATMOSPHERE'; payload: string }
  | { type: 'SET_SELECTED_TYPE'; payload: string }
  | { type: 'SET_SELECTED_PRICE_RANGE'; payload: string }
  | { type: 'SET_SELECTED_DURATION'; payload: string }
  | { type: 'SET_FEATURED_ONLY'; payload: boolean }
  | { type: 'SET_SORT_BY'; payload: ExperienceFiltersState['sortBy'] }
  | { type: 'SET_USER_LOCATION'; payload: readonly [number, number] | null }
  | { type: 'CLEAR_FILTERS'; payload?: { keepLocation?: boolean } }
  | { type: 'RESET_FILTER'; payload: FilterKey }

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
} as const

// Reducer for complex filter state management
function filtersReducer(
  state: ExperienceFiltersState,
  action: FilterAction
): ExperienceFiltersState {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload }
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload }
    case 'SET_SELECTED_ATMOSPHERE':
      return { ...state, selectedAtmosphere: action.payload }
    case 'SET_SELECTED_TYPE':
      return { ...state, selectedType: action.payload }
    case 'SET_SELECTED_PRICE_RANGE':
      return { ...state, selectedPriceRange: action.payload }
    case 'SET_SELECTED_DURATION':
      return { ...state, selectedDuration: action.payload }
    case 'SET_FEATURED_ONLY':
      return { ...state, featuredOnly: action.payload }
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload }
    case 'SET_USER_LOCATION':
      return { ...state, userLocation: action.payload }
    case 'CLEAR_FILTERS':
      return {
        ...DEFAULT_FILTERS,
        userLocation: action.payload?.keepLocation ? state.userLocation : null
      }
    case 'RESET_FILTER':
      return {
        ...state,
        [action.payload]: DEFAULT_FILTERS[action.payload]
      }
    default:
      return state
  }
}

// Custom hook for debounced values
function useDebounced<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export const useExperienceFiltersOptimized = ({
  locale,
  initialFilters = {},
  experiences,
  autoFilter = true,
  debounceMs = 300
}: UseExperienceFiltersOptions): UseExperienceFiltersReturn => {
  // Use reducer for complex state management
  const [filters, dispatch] = useReducer(filtersReducer, {
    ...DEFAULT_FILTERS,
    ...initialFilters
  })

  const [allExperiences, setAllExperiences] = useState<readonly Experience[]>(
    experiences ?? ExperienceService.getAllExperiences()
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Debounced search query for performance
  const debouncedSearchQuery = useDebounced(filters.searchQuery, debounceMs)

  // Update experiences if prop changes
  useEffect(() => {
    if (experiences) {
      setAllExperiences(experiences)
    }
  }, [experiences])

  // Memoized actions with useCallback for stable references
  const actions: ExperienceFiltersActions = useMemo(
    () => ({
      setSearchQuery: (searchQuery: string) =>
        dispatch({ type: 'SET_SEARCH_QUERY', payload: searchQuery }),

      setSelectedCategory: (selectedCategory: string) =>
        dispatch({ type: 'SET_SELECTED_CATEGORY', payload: selectedCategory }),

      setSelectedAtmosphere: (selectedAtmosphere: string) =>
        dispatch({ type: 'SET_SELECTED_ATMOSPHERE', payload: selectedAtmosphere }),

      setSelectedType: (selectedType: string) =>
        dispatch({ type: 'SET_SELECTED_TYPE', payload: selectedType }),

      setSelectedPriceRange: (selectedPriceRange: string) =>
        dispatch({ type: 'SET_SELECTED_PRICE_RANGE', payload: selectedPriceRange }),

      setSelectedDuration: (selectedDuration: string) =>
        dispatch({ type: 'SET_SELECTED_DURATION', payload: selectedDuration }),

      setFeaturedOnly: (featuredOnly: boolean) =>
        dispatch({ type: 'SET_FEATURED_ONLY', payload: featuredOnly }),

      setSortBy: (sortBy: ExperienceFiltersState['sortBy']) =>
        dispatch({ type: 'SET_SORT_BY', payload: sortBy }),

      setUserLocation: (userLocation: readonly [number, number] | null) =>
        dispatch({ type: 'SET_USER_LOCATION', payload: userLocation }),

      clearFilters: () =>
        dispatch({ type: 'CLEAR_FILTERS', payload: { keepLocation: true } }),

      toggleFilter: <K extends FilterKey>(
        filterType: K,
        value: ExperienceFiltersState[K]
      ) => {
        const currentValue = filters[filterType]
        const newValue =
          currentValue === value
            ? filterType === 'featuredOnly'
              ? false
              : 'all'
            : value

        dispatch({
          type: `SET_${filterType.toUpperCase().replace(/([A-Z])/g, '_$1')}`,
          payload: newValue
        } as FilterAction)
      },

      resetFilter: <K extends FilterKey>(filterType: K) =>
        dispatch({ type: 'RESET_FILTER', payload: filterType })
    }),
    [filters]
  )

  // Filter and sort experiences with proper error handling
  const filteredExperiences = useMemo(() => {
    if (!autoFilter) return allExperiences

    setIsLoading(true)
    setError(null)

    try {
      let filtered = [...allExperiences]

      // Apply search with debounced query
      if (debouncedSearchQuery.trim()) {
        filtered = ExperienceService.searchExperiences(debouncedSearchQuery, locale)
      }

      // Apply filters in order of selectivity (most selective first for performance)
      if (filters.featuredOnly) {
        filtered = filtered.filter((experience) => experience.featured)
      }

      if (filters.selectedCategory !== 'all') {
        filtered = filtered.filter(
          (experience) => experience.category === filters.selectedCategory
        )
      }

      if (filters.selectedAtmosphere !== 'all') {
        filtered = filtered.filter(
          (experience) => experience.atmosphere === filters.selectedAtmosphere
        )
      }

      if (filters.selectedType !== 'all') {
        filtered = filtered.filter(
          (experience) => experience.type === filters.selectedType
        )
      }

      // Apply price and duration filters
      if (filters.selectedPriceRange !== 'all') {
        const priceFiltered = ExperienceService.filterExperiences({
          priceRange: filters.selectedPriceRange as 'budget' | 'mid' | 'luxury' | 'premium'
        })
        filtered = filtered.filter((experience) => priceFiltered.includes(experience))
      }

      if (filters.selectedDuration !== 'all') {
        const durationFiltered = ExperienceService.filterExperiences({
          duration: filters.selectedDuration as 'short' | 'half-day' | 'full-day' | 'multi-day'
        })
        filtered = filtered.filter((experience) => durationFiltered.includes(experience))
      }

      // Apply sorting
      filtered = ExperienceService.sortExperiences(
        filtered,
        filters.sortBy,
        filters.userLocation ? [...filters.userLocation] : undefined
      )

      return filtered
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown filtering error')
      setError(error)
      console.error('Error filtering experiences:', error)
      return allExperiences
    } finally {
      setIsLoading(false)
    }
  }, [
    allExperiences,
    debouncedSearchQuery,
    filters,
    locale,
    autoFilter
  ])

  // Computed values with memoization
  const hasActiveFilters = useMemo(
    () =>
      filters.searchQuery !== '' ||
      filters.selectedCategory !== 'all' ||
      filters.selectedAtmosphere !== 'all' ||
      filters.selectedType !== 'all' ||
      filters.selectedPriceRange !== 'all' ||
      filters.selectedDuration !== 'all' ||
      filters.featuredOnly,
    [filters]
  )

  const getCategoryCount = useCallback(
    (category: string) => {
      if (category === 'all') return allExperiences.length
      return allExperiences.filter((experience) => experience.category === category)
        .length
    },
    [allExperiences]
  )

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

  const retry = useCallback(() => {
    setError(null)
    setIsLoading(true)
    // Force a re-computation by updating a dependency
    setAllExperiences([...allExperiences])
  }, [allExperiences])

  return {
    filters,
    filteredExperiences,
    isLoading,
    error,
    actions,
    hasActiveFilters,
    totalCount: allExperiences.length,
    filteredCount: filteredExperiences.length,
    getCategoryCount,
    getFilterSummary,
    retry
  } as const
}

// Specialized optimized hooks
export const useOptimizedQuickFilters = (locale: Locale) =>
  useExperienceFiltersOptimized({
    locale,
    initialFilters: { sortBy: 'rating' },
    debounceMs: 200
  })

export const useOptimizedFeaturedExperiences = (locale: Locale) =>
  useExperienceFiltersOptimized({
    locale,
    initialFilters: { featuredOnly: true, sortBy: 'rating' },
    autoFilter: true
  })

export const useOptimizedCategoryFilters = (locale: Locale, category: string) =>
  useExperienceFiltersOptimized({
    locale,
    initialFilters: { selectedCategory: category, sortBy: 'rating' }
  })

export const useOptimizedSearchFilters = (locale: Locale, searchQuery: string) =>
  useExperienceFiltersOptimized({
    locale,
    initialFilters: { searchQuery, sortBy: 'rating' },
    debounceMs: 500 // Longer debounce for search
  })