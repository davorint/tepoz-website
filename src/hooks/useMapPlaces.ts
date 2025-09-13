import { useMemo } from 'react'
import { tepoztlanPlaces } from '@/data/tepoztlan-places'
import type { Locale } from '@/lib/i18n'

export interface MapPlacesFilters {
  searchQuery: string
  selectedCategory: string
  sortBy: string
  lang: Locale
}

export function useMapPlaces(filters: MapPlacesFilters) {
  const { searchQuery, selectedCategory, sortBy, lang } = filters

  const filteredPlaces = useMemo(() => {
    let places = [...tepoztlanPlaces]
    
    // Filter by category FIRST
    if (selectedCategory !== 'all') {
      places = places.filter(p => p.category === selectedCategory)
    }
    
    // Then filter by search query
    if (searchQuery.trim()) {
      const searchTerm = searchQuery.toLowerCase().trim()
      places = places.filter(place => {
        // Language-aware search
        const currentName = lang === 'en' && place.nameEn ? place.nameEn : place.name
        const currentDescription = lang === 'en' && place.descriptionEn ? place.descriptionEn : place.description
        
        const matchesName = currentName.toLowerCase().includes(searchTerm)
        const matchesDescription = currentDescription.toLowerCase().includes(searchTerm)
        const matchesTags = place.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) || false
        // Only exact category match to prevent false positives
        const matchesCategory = place.category.toLowerCase() === searchTerm
        
        return matchesName || matchesDescription || matchesTags || matchesCategory
      })
    }
    
    // Sort places
    switch (sortBy) {
      case 'rating':
        return [...places].sort((a, b) => b.rating - a.rating)
      case 'name':
        return [...places].sort((a, b) => {
          const nameA = lang === 'en' && a.nameEn ? a.nameEn : a.name
          const nameB = lang === 'en' && b.nameEn ? b.nameEn : b.name
          return nameA.localeCompare(nameB)
        })
      case 'price':
        return [...places].sort((a, b) => a.priceLevel - b.priceLevel)
      case 'featured':
      default:
        return [...places].sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return b.rating - a.rating
        })
    }
  }, [searchQuery, selectedCategory, sortBy, lang])

  return {
    filteredPlaces,
    totalPlaces: tepoztlanPlaces.length
  }
}