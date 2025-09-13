'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, X, Clock, MapPin, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Business } from '@/types/business-finder'
import { searchSuggestions, popularFilters } from '@/data/tepoztlan-businesses'

interface SearchAutocompleteProps {
  businesses: Business[]
  searchQuery: string
  lang: 'es' | 'en'
  onSearchChange: (query: string) => void
  onBusinessSelect?: (businessId: string) => void
  onFilterSelect?: (filter: string) => void
  className?: string
}

interface SearchResult {
  type: 'business' | 'suggestion' | 'filter'
  id: string
  name: string
  category?: string
  rating?: number
  distance?: number
  icon?: string
}

export function SearchAutocomplete({
  businesses,
  searchQuery,
  lang,
  onSearchChange,
  onBusinessSelect,
  onFilterSelect,
  className = ''
}: SearchAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tepoztlan-recent-searches')
      if (saved) {
        setRecentSearches(JSON.parse(saved).slice(0, 5))
      }
    } catch (error) {
      console.warn('Could not load recent searches:', error)
    }
  }, [])

  // Save recent search
  const saveRecentSearch = useCallback((query: string) => {
    if (!query.trim() || query.length < 2) return
    
    try {
      const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5)
      setRecentSearches(updated)
      localStorage.setItem('tepoztlan-recent-searches', JSON.stringify(updated))
    } catch (error) {
      console.warn('Could not save recent search:', error)
    }
  }, [recentSearches])

  // Generate search results
  const generateSearchResults = useCallback((query: string): SearchResult[] => {
    const results: SearchResult[] = []
    const lowerQuery = query.toLowerCase()

    if (!query.trim()) {
      // Show recent searches when no query
      recentSearches.forEach(search => {
        results.push({
          type: 'suggestion',
          id: `recent-${search}`,
          name: search,
          icon: '🕐'
        })
      })

      // Show popular filters
      popularFilters[lang].forEach(filter => {
        results.push({
          type: 'filter',
          id: `filter-${filter.value}`,
          name: filter.name,
          icon: '🔍'
        })
      })

      return results.slice(0, 8)
    }

    // Search businesses
    const matchingBusinesses = businesses.filter(business => {
      const name = lang === 'en' && business.nameEn ? business.nameEn : business.name
      const description = lang === 'en' && business.descriptionEn ? business.descriptionEn : business.description
      
      return (
        name.toLowerCase().includes(lowerQuery) ||
        description.toLowerCase().includes(lowerQuery) ||
        business.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
        business.category.toLowerCase().includes(lowerQuery) ||
        business.address.toLowerCase().includes(lowerQuery)
      )
    }).slice(0, 5)

    matchingBusinesses.forEach(business => {
      results.push({
        type: 'business',
        id: business.id,
        name: lang === 'en' && business.nameEn ? business.nameEn : business.name,
        category: business.category,
        rating: business.rating,
        distance: business.distance
      })
    })

    // Add matching suggestions
    const matchingSuggestions = searchSuggestions[lang].filter(suggestion =>
      suggestion.toLowerCase().includes(lowerQuery)
    ).slice(0, 3)

    matchingSuggestions.forEach(suggestion => {
      results.push({
        type: 'suggestion',
        id: `suggestion-${suggestion}`,
        name: suggestion,
        icon: '💡'
      })
    })

    return results
  }, [businesses, lang, recentSearches])

  // Update search results when query changes
  useEffect(() => {
    const results = generateSearchResults(searchQuery)
    setSearchResults(results)
    setHighlightedIndex(-1)
  }, [searchQuery, generateSearchResults])

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onSearchChange(value)
    setIsOpen(true)
  }

  // Handle input focus
  const handleInputFocus = () => {
    setIsOpen(true)
  }

  // Handle input blur
  const handleInputBlur = () => {
    // Delay closing to allow clicks on results
    setTimeout(() => setIsOpen(false), 200)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < searchResults.length) {
          handleResultSelect(searchResults[highlightedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        searchInputRef.current?.blur()
        break
    }
  }

  // Handle result selection
  const handleResultSelect = (result: SearchResult) => {
    switch (result.type) {
      case 'business':
        saveRecentSearch(result.name)
        onBusinessSelect?.(result.id)
        onSearchChange(result.name)
        break
      case 'suggestion':
        onSearchChange(result.name)
        saveRecentSearch(result.name)
        break
      case 'filter':
        onFilterSelect?.(result.id.replace('filter-', ''))
        break
    }
    setIsOpen(false)
  }

  // Clear search
  const handleClear = () => {
    onSearchChange('')
    searchInputRef.current?.focus()
  }

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('tepoztlan-recent-searches')
  }

  // Get category icon
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      restaurant: '🍽️',
      hotel: '🏨',
      cafe: '☕',
      shopping: '🛍️',
      attraction: '🏛️',
      experience: '🌟',
      service: '⚕️'
    }
    return icons[category] || '📍'
  }

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          placeholder={lang === 'es' ? 'Buscar restaurantes, hoteles, atracciones...' : 'Search restaurants, hotels, attractions...'}
          className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all duration-300"
        />
        {searchQuery && (
          <Button
            size="icon"
            variant="ghost"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 text-white/60 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-96 overflow-y-auto"
          >
            {searchResults.length > 0 ? (
              <div className="py-2">
                {searchResults.map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center px-4 py-3 cursor-pointer transition-colors duration-200 ${
                      index === highlightedIndex
                        ? 'bg-emerald-100/80'
                        : 'hover:bg-slate-100/60'
                    }`}
                    onClick={() => handleResultSelect(result)}
                  >
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3">
                      {result.type === 'business' && result.category ? (
                        <span className="text-lg">{getCategoryIcon(result.category)}</span>
                      ) : (
                        <span className="text-lg">{result.icon}</span>
                      )}
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-slate-800 truncate">
                          {result.name}
                        </p>
                        {result.type === 'business' && result.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-slate-600">{result.rating}</span>
                          </div>
                        )}
                      </div>
                      {result.type === 'business' && result.distance && (
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-500">
                            {result.distance < 1 
                              ? `${Math.round(result.distance * 1000)}m`
                              : `${result.distance.toFixed(1)}km`
                            }
                          </span>
                        </div>
                      )}
                    </div>

                    {result.type === 'suggestion' && result.icon === '🕐' && (
                      <Clock className="w-4 h-4 text-slate-400" />
                    )}
                  </motion.div>
                ))}

                {/* Clear recent searches option */}
                {!searchQuery && recentSearches.length > 0 && (
                  <div className="border-t border-slate-200/60 pt-2 mt-2">
                    <button
                      onClick={clearRecentSearches}
                      className="w-full px-4 py-2 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100/60 transition-colors duration-200 text-left"
                    >
                      {lang === 'es' ? 'Limpiar búsquedas recientes' : 'Clear recent searches'}
                    </button>
                  </div>
                )}
              </div>
            ) : searchQuery ? (
              <div className="py-8 text-center text-slate-500">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">
                  {lang === 'es' 
                    ? `No se encontraron resultados para "${searchQuery}"`
                    : `No results found for "${searchQuery}"`
                  }
                </p>
              </div>
            ) : (
              <div className="py-8 text-center text-slate-500">
                <p className="text-sm">
                  {lang === 'es' 
                    ? 'Comienza a escribir para buscar...'
                    : 'Start typing to search...'
                  }
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}