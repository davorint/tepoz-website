import { useState, useEffect, useCallback, useMemo } from 'react'
import { logger } from '@/lib/logger'
import * as turf from '@turf/turf'
import { Business } from '@/types/business-finder'

interface UseBusinessFinderProps {
  businesses: Business[]
  lang: 'es' | 'en'
}

interface UseBusinessFinderReturn {
  // State
  filteredBusinesses: Business[]
  selectedBusiness: string | null
  hoveredBusiness: string | null
  searchQuery: string
  selectedCategory: string
  sortBy: string
  sortByDistance: boolean
  userLocation: [number, number] | null
  isFilterChanging: boolean
  showAdvancedFilters: boolean
  priceRange: [number, number]
  ratingRange: [number, number]
  selectedFeatures: string[]
  
  // Actions
  setSelectedBusiness: (id: string | null) => void
  setHoveredBusiness: (id: string | null) => void
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string) => void
  setSortBy: (sort: string) => void
  setSortByDistance: (enabled: boolean) => void
  setUserLocation: (location: [number, number] | null) => void
  setIsFilterChanging: (changing: boolean) => void
  setShowAdvancedFilters: (show: boolean) => void
  setPriceRange: (range: [number, number]) => void
  setRatingRange: (range: [number, number]) => void
  setSelectedFeatures: (features: string[]) => void
  
  // Methods
  getUserLocation: () => Promise<void>
  clearAllFilters: () => void
  handleBusinessSelect: (businessId: string) => void
  
  // Computed
  selectedBusinessData: Business | null
  isLoading: boolean
}

export function useBusinessFinder({ businesses, lang }: UseBusinessFinderProps): UseBusinessFinderReturn {
  // State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null)
  const [hoveredBusiness, setHoveredBusiness] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('featured')
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>(businesses)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [sortByDistance, setSortByDistance] = useState(false)
  const [isFilterChanging, setIsFilterChanging] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Advanced filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 4])
  const [ratingRange, setRatingRange] = useState<[number, number]>([3, 5])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  // Calculate distances when user location is available
  const addDistanceToBusinesses = useCallback((businessList: Business[]): Business[] => {
    if (!userLocation) return businessList

    return businessList.map(business => ({
      ...business,
      distance: turf.distance(
        turf.point(userLocation), 
        turf.point(business.coordinates)
      )
    }))
  }, [userLocation])

  // Get user location
  const getUserLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      logger.warn('⚠️ Geolocation not supported')
      return
    }

    setIsLoading(true)
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        })
      })

      const coords: [number, number] = [position.coords.longitude, position.coords.latitude]
      setUserLocation(coords)
      logger.debug('📍 User location updated:', coords)
    } catch (error) {
      logger.error('❌ Error getting user location:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSortBy('featured')
    setSortByDistance(false)
    setPriceRange([1, 4])
    setRatingRange([3, 5])
    setSelectedFeatures([])
    setShowAdvancedFilters(false)
  }, [])

  // Handle business selection
  const handleBusinessSelect = useCallback((businessId: string) => {
    setSelectedBusiness(businessId)
  }, [])

  // Filter and sort businesses
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(true)
      let filtered = [...businesses]

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filtered = filtered.filter(business => {
          const searchName = lang === 'en' && business.nameEn ? business.nameEn : business.name
          const searchDesc = lang === 'en' && business.descriptionEn ? business.descriptionEn : business.description
          
          return (
            searchName.toLowerCase().includes(query) ||
            searchDesc.toLowerCase().includes(query) ||
            business.tags?.some(tag => tag.toLowerCase().includes(query)) ||
            business.category.toLowerCase().includes(query)
          )
        })
      }

      // Category filter
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(business => business.category === selectedCategory)
      }

      // Advanced filters
      filtered = filtered.filter(business => {
        const priceMatch = business.priceLevel >= priceRange[0] && business.priceLevel <= priceRange[1]
        const ratingMatch = business.rating >= ratingRange[0] && business.rating <= ratingRange[1]
        
        let featuresMatch = true
        if (selectedFeatures.length > 0) {
          featuresMatch = selectedFeatures.some(feature => {
            if (feature === 'featured') return business.featured
            if (feature === 'outdoor') return business.tags?.includes('terraza')
            if (feature === 'wifi') return business.hasWifi !== false // Assume true if not specified
            if (feature === 'parking') return business.hasParking
            return false
          })
        }
        
        return priceMatch && ratingMatch && featuresMatch
      })

      // Add distances if user location available
      filtered = addDistanceToBusinesses(filtered)

      // Apply sorting
      filtered.sort((a, b) => {
        if (sortByDistance && a.distance !== undefined && b.distance !== undefined) {
          return a.distance - b.distance
        }

        switch (sortBy) {
          case 'featured':
            if (a.featured && !b.featured) return -1
            if (!a.featured && b.featured) return 1
            return b.rating - a.rating
          case 'rating':
            return b.rating - a.rating
          case 'name':
            const nameA = lang === 'en' && a.nameEn ? a.nameEn : a.name
            const nameB = lang === 'en' && b.nameEn ? b.nameEn : b.name
            return nameA.localeCompare(nameB)
          case 'price':
            return a.priceLevel - b.priceLevel
          default:
            return 0
        }
      })

      setFilteredBusinesses(filtered)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [
    businesses,
    searchQuery, 
    selectedCategory, 
    sortBy, 
    sortByDistance, 
    userLocation, 
    lang, 
    addDistanceToBusinesses, 
    priceRange, 
    ratingRange, 
    selectedFeatures
  ])

  // Get selected business data
  const selectedBusinessData = useMemo(() => {
    return selectedBusiness 
      ? filteredBusinesses.find(b => b.id === selectedBusiness) || null
      : null
  }, [selectedBusiness, filteredBusinesses])

  return {
    // State
    filteredBusinesses,
    selectedBusiness,
    hoveredBusiness,
    searchQuery,
    selectedCategory,
    sortBy,
    sortByDistance,
    userLocation,
    isFilterChanging,
    showAdvancedFilters,
    priceRange,
    ratingRange,
    selectedFeatures,
    
    // Actions
    setSelectedBusiness,
    setHoveredBusiness,
    setSearchQuery,
    setSelectedCategory,
    setSortBy,
    setSortByDistance,
    setUserLocation,
    setIsFilterChanging,
    setShowAdvancedFilters,
    setPriceRange,
    setRatingRange,
    setSelectedFeatures,
    
    // Methods
    getUserLocation,
    clearAllFilters,
    handleBusinessSelect,
    
    // Computed
    selectedBusinessData,
    isLoading
  }
}