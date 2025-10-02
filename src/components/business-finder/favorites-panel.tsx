'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Heart, X, Trash2, Download, Upload, Star, MapPin, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFavorites } from '@/hooks/use-favorites'
import { Business, CategoryInfo } from '@/types/business-finder'

interface FavoritesPanelProps {
  businesses: Business[]
  categories: CategoryInfo[]
  isOpen: boolean
  lang: 'es' | 'en'
  onClose: () => void
  onBusinessSelect?: (businessId: string) => void
}

export function FavoritesPanel({
  businesses,
  categories,
  isOpen,
  lang,
  onClose,
  onBusinessSelect
}: FavoritesPanelProps) {
  const {
    favorites,
    favoriteItems,
    removeFromFavorites,
    clearAllFavorites,
    exportFavorites,
    importFavorites,
    favoritesCount
  } = useFavorites()

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showExportDialog, setShowExportDialog] = useState(false)
  // const [importData, setImportData] = useState('')

  // Get favorite businesses with full data
  const favoriteBusinesses = favorites
    .map(id => businesses.find(business => business.id === id))
    .filter(Boolean) as Business[]

  // Filter by category
  const filteredFavorites = selectedCategory === 'all' 
    ? favoriteBusinesses
    : favoriteBusinesses.filter(business => business.category === selectedCategory)

  // Get category icon
  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId)
    return category?.icon || '📍'
  }

  // Handle business selection
  const handleBusinessSelect = (businessId: string) => {
    onBusinessSelect?.(businessId)
    onClose()
  }

  // Handle import - Currently unused, may be used in future
  // const handleImport = () => {
  //   if (!importData.trim()) return
  //   
  //   const success = importFavorites(importData)
  //   if (success) {
  //     setImportData('')
  //     alert(lang === 'es' ? 'Favoritos importados exitosamente' : 'Favorites imported successfully')
  //   } else {
  //     alert(lang === 'es' ? 'Error al importar favoritos' : 'Error importing favorites')
  //   }
  // }

  // Handle export
  const handleExport = () => {
    const data = exportFavorites()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tepoztlan-favorites-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setShowExportDialog(false)
  }

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white dark:bg-slate-800 rounded-t-3xl md:rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 to-red-500 p-6 flex-shrink-0">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <Heart className="w-6 h-6 fill-current" />
                  <div>
                    <h3 className="font-semibold text-xl">
                      {lang === 'es' ? 'Mis Favoritos' : 'My Favorites'}
                    </h3>
                    <p className="text-pink-100 text-sm">
                      {favoritesCount} {lang === 'es' ? 'lugares guardados' : 'saved places'}
                    </p>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={onClose}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setShowExportDialog(true)}
                  disabled={favoritesCount === 0}
                  className="flex-1 bg-white/20 text-white hover:bg-white/30"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {lang === 'es' ? 'Exportar' : 'Export'}
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    const input = document.createElement('input')
                    input.type = 'file'
                    input.accept = '.json'
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onload = (e) => {
                          const content = e.target?.result as string
                          if (importFavorites(content)) {
                            alert(lang === 'es' ? 'Favoritos importados' : 'Favorites imported')
                          } else {
                            alert(lang === 'es' ? 'Error en el archivo' : 'File error')
                          }
                        }
                        reader.readAsText(file)
                      }
                    }
                    input.click()
                  }}
                  className="flex-1 bg-white/20 text-white hover:bg-white/30"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {lang === 'es' ? 'Importar' : 'Import'}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    if (confirm(lang === 'es' ? '¿Eliminar todos los favoritos?' : 'Clear all favorites?')) {
                      clearAllFavorites()
                    }
                  }}
                  disabled={favoritesCount === 0}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Category Filter */}
            {favoritesCount > 0 && (
              <div className="p-4 border-b bg-gray-50 flex-shrink-0">
                <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory scroll-smooth">
                  <Button
                    size="sm"
                    variant={selectedCategory === 'all' ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory('all')}
                    className="whitespace-nowrap"
                  >
                    {lang === 'es' ? 'Todos' : 'All'} ({favoriteBusinesses.length})
                  </Button>
                  {categories.filter(c => c.id !== 'all').map(category => {
                    const count = favoriteBusinesses.filter(b => b.category === category.id).length
                    if (count === 0) return null
                    
                    return (
                      <Button
                        key={category.id}
                        size="sm"
                        variant={selectedCategory === category.id ? 'default' : 'outline'}
                        onClick={() => setSelectedCategory(category.id)}
                        className="whitespace-nowrap"
                      >
                        {category.icon} {lang === 'en' && category.nameEn ? category.nameEn : category.name} ({count})
                      </Button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {favoritesCount === 0 ? (
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-gray-700 mb-2">
                      {lang === 'es' ? 'Sin favoritos aún' : 'No favorites yet'}
                    </h4>
                    <p className="text-gray-500">
                      {lang === 'es' 
                        ? 'Toca el corazón en cualquier lugar para guardarlo aquí'
                        : 'Tap the heart on any place to save it here'
                      }
                    </p>
                  </motion.div>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {filteredFavorites.map((business, index) => {
                    const favoriteItem = favoriteItems.find(item => item.id === business.id)
                    
                    return (
                      <motion.div
                        key={business.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                        onClick={() => handleBusinessSelect(business.id)}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xl">{getCategoryIcon(business.category)}</span>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 truncate">
                                  {lang === 'en' && business.nameEn ? business.nameEn : business.name}
                                </h4>
                                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                                  {lang === 'en' && business.descriptionEn ? business.descriptionEn : business.description}
                                </p>
                              </div>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeFromFavorites(business.id)
                                }}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50 flex-shrink-0"
                              >
                                <Heart className="w-4 h-4 fill-current" />
                              </Button>
                            </div>

                            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span>{business.rating}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>
                                  {business.distance 
                                    ? (business.distance < 1 
                                        ? `${Math.round(business.distance * 1000)}m`
                                        : `${business.distance.toFixed(1)}km`
                                      )
                                    : categories.find(c => c.id === business.category)?.name
                                  }
                                </span>
                              </div>
                              {favoriteItem && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>{formatDate(favoriteItem.addedAt)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Export Dialog */}
      <AnimatePresence>
        {showExportDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setShowExportDialog(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <Download className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {lang === 'es' ? 'Exportar Favoritos' : 'Export Favorites'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {lang === 'es' 
                    ? 'Descargar un archivo con todos tus lugares favoritos'
                    : 'Download a file with all your favorite places'
                  }
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowExportDialog(false)}
                  className="flex-1"
                >
                  {lang === 'es' ? 'Cancelar' : 'Cancel'}
                </Button>
                <Button
                  onClick={handleExport}
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {lang === 'es' ? 'Exportar' : 'Export'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  )
}