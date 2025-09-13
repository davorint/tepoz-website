'use client'

import { useState, useEffect, useCallback } from 'react'

interface FavoriteItem {
  id: string
  name: string
  category: string
  addedAt: Date
  coordinates?: [number, number]
}

interface UseFavoritesReturn {
  favorites: string[]
  favoriteItems: FavoriteItem[]
  isFavorite: (businessId: string) => boolean
  addToFavorites: (businessId: string, businessData?: Partial<FavoriteItem>) => void
  removeFromFavorites: (businessId: string) => void
  toggleFavorite: (businessId: string, businessData?: Partial<FavoriteItem>) => void
  clearAllFavorites: () => void
  getFavoritesByCategory: (category: string) => FavoriteItem[]
  exportFavorites: () => string
  importFavorites: (data: string) => boolean
  favoritesCount: number
}

export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites] = useState<string[]>([])
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([])

  // Storage keys
  const FAVORITES_KEY = 'tepoztlan-favorites'
  const FAVORITES_DATA_KEY = 'tepoztlan-favorites-data'

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem(FAVORITES_KEY)
      const savedFavoriteItems = localStorage.getItem(FAVORITES_DATA_KEY)
      
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites)
        setFavorites(Array.isArray(parsedFavorites) ? parsedFavorites : [])
      }

      if (savedFavoriteItems) {
        const parsedItems = JSON.parse(savedFavoriteItems)
        // Convert date strings back to Date objects
        const itemsWithDates = parsedItems.map((item: FavoriteItem & { addedAt: string }) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }))
        setFavoriteItems(Array.isArray(itemsWithDates) ? itemsWithDates : [])
      }
    } catch (error) {
      console.warn('Error loading favorites from localStorage:', error)
      setFavorites([])
      setFavoriteItems([])
    }
  }, [])

  // Save favorites to localStorage whenever they change
  const saveFavorites = useCallback((newFavorites: string[], newFavoriteItems: FavoriteItem[]) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
      localStorage.setItem(FAVORITES_DATA_KEY, JSON.stringify(newFavoriteItems))
    } catch (error) {
      console.warn('Error saving favorites to localStorage:', error)
    }
  }, [])

  // Check if a business is in favorites
  const isFavorite = useCallback((businessId: string): boolean => {
    return favorites.includes(businessId)
  }, [favorites])

  // Add business to favorites
  const addToFavorites = useCallback((businessId: string, businessData?: Partial<FavoriteItem>) => {
    if (isFavorite(businessId)) {
      return // Already in favorites
    }

    const newFavorites = [...favorites, businessId]
    
    const newFavoriteItem: FavoriteItem = {
      id: businessId,
      name: businessData?.name || businessId,
      category: businessData?.category || 'unknown',
      addedAt: new Date(),
      coordinates: businessData?.coordinates
    }
    
    const newFavoriteItems = [...favoriteItems, newFavoriteItem]

    setFavorites(newFavorites)
    setFavoriteItems(newFavoriteItems)
    saveFavorites(newFavorites, newFavoriteItems)

    // Dispatch custom event for tracking
    window.dispatchEvent(new CustomEvent('favoriteAdded', { 
      detail: { businessId, businessData: newFavoriteItem } 
    }))
  }, [favorites, favoriteItems, isFavorite, saveFavorites])

  // Remove business from favorites
  const removeFromFavorites = useCallback((businessId: string) => {
    if (!isFavorite(businessId)) {
      return // Not in favorites
    }

    const newFavorites = favorites.filter(id => id !== businessId)
    const newFavoriteItems = favoriteItems.filter(item => item.id !== businessId)

    setFavorites(newFavorites)
    setFavoriteItems(newFavoriteItems)
    saveFavorites(newFavorites, newFavoriteItems)

    // Dispatch custom event for tracking
    window.dispatchEvent(new CustomEvent('favoriteRemoved', { 
      detail: { businessId } 
    }))
  }, [favorites, favoriteItems, isFavorite, saveFavorites])

  // Toggle favorite status
  const toggleFavorite = useCallback((businessId: string, businessData?: Partial<FavoriteItem>) => {
    if (isFavorite(businessId)) {
      removeFromFavorites(businessId)
    } else {
      addToFavorites(businessId, businessData)
    }
  }, [isFavorite, addToFavorites, removeFromFavorites])

  // Clear all favorites
  const clearAllFavorites = useCallback(() => {
    setFavorites([])
    setFavoriteItems([])
    
    try {
      localStorage.removeItem(FAVORITES_KEY)
      localStorage.removeItem(FAVORITES_DATA_KEY)
    } catch (error) {
      console.warn('Error clearing favorites from localStorage:', error)
    }

    // Dispatch custom event for tracking
    window.dispatchEvent(new CustomEvent('favoritesCleared'))
  }, [])

  // Get favorites by category
  const getFavoritesByCategory = useCallback((category: string): FavoriteItem[] => {
    return favoriteItems.filter(item => item.category === category)
  }, [favoriteItems])

  // Export favorites as JSON string
  const exportFavorites = useCallback((): string => {
    const exportData = {
      favorites,
      favoriteItems,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    }
    return JSON.stringify(exportData, null, 2)
  }, [favorites, favoriteItems])

  // Import favorites from JSON string
  const importFavorites = useCallback((data: string): boolean => {
    try {
      const importData = JSON.parse(data)
      
      if (!importData.favorites || !importData.favoriteItems) {
        throw new Error('Invalid favorites data format')
      }

      // Validate data structure
      const validFavorites = Array.isArray(importData.favorites) ? importData.favorites : []
      const validFavoriteItems = Array.isArray(importData.favoriteItems) 
        ? importData.favoriteItems.map((item: FavoriteItem & { addedAt: string }) => ({
            ...item,
            addedAt: new Date(item.addedAt || new Date())
          }))
        : []

      // Merge with existing favorites (avoid duplicates)
      const mergedFavorites = [...new Set([...favorites, ...validFavorites])]
      const mergedItems = [...favoriteItems]
      
      validFavoriteItems.forEach((newItem: FavoriteItem) => {
        if (!mergedItems.find(item => item.id === newItem.id)) {
          mergedItems.push(newItem)
        }
      })

      setFavorites(mergedFavorites)
      setFavoriteItems(mergedItems)
      saveFavorites(mergedFavorites, mergedItems)

      // Dispatch custom event for tracking
      window.dispatchEvent(new CustomEvent('favoritesImported', { 
        detail: { importedCount: validFavorites.length } 
      }))

      return true
    } catch (error) {
      console.error('Error importing favorites:', error)
      return false
    }
  }, [favorites, favoriteItems, saveFavorites])

  return {
    favorites,
    favoriteItems,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearAllFavorites,
    getFavoritesByCategory,
    exportFavorites,
    importFavorites,
    favoritesCount: favorites.length
  }
}