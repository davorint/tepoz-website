'use client'

import { motion, AnimatePresence } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  X, 
  Navigation,
  Share2,
  Heart,
  Sparkles
} from 'lucide-react'

import { BusinessDetailsProps, getPriceSymbol } from '@/types/business-finder'


const translations = {
  es: {
    getDirections: 'Cómo llegar',
    call: 'Llamar',
    share: 'Compartir',
    addToFavorites: 'Agregar a favoritos',
    removeFromFavorites: 'Quitar de favoritos',
    rating: 'Calificación',
    priceRange: 'Rango de precio',
    distance: 'Distancia',
    openingHours: 'Horarios',
    address: 'Dirección',
    features: 'Características',
    about: 'Acerca de',
    featured: 'Destacado'
  },
  en: {
    getDirections: 'Get Directions',
    call: 'Call',
    share: 'Share',
    addToFavorites: 'Add to Favorites',
    removeFromFavorites: 'Remove from Favorites',
    rating: 'Rating',
    priceRange: 'Price Range',
    distance: 'Distance',
    openingHours: 'Opening Hours',
    address: 'Address',
    features: 'Features',
    about: 'About',
    featured: 'Featured'
  }
}

export function BusinessDetails({
  business,
  category,
  isOpen,
  lang,
  onClose,
  onGetDirections,
  onCall,
  onShare,
  onFavorite,
  isFavorite = false
}: BusinessDetailsProps) {
  const t = translations[lang]

  if (!business) return null

  const businessName = lang === 'en' && business.nameEn ? business.nameEn : business.name
  const businessDescription = lang === 'en' && business.descriptionEn ? business.descriptionEn : business.description

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
            aria-label={lang === 'es' ? 'Cerrar diálogo' : 'Close dialog'}
            role="button"
            tabIndex={0}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-2 md:inset-6 lg:inset-12 xl:inset-16 z-60 flex items-center justify-center p-4 group"
            role="dialog"
            aria-modal="true"
            aria-labelledby="business-details-title"
            aria-describedby="business-details-description"
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                e.preventDefault()
                onClose()
              }
            }}
          >
            {/* Outer modal glow */}
            <div className="absolute inset-0 bg-radial from-emerald-400/0 from-60% to-transparent rounded-2xl blur-2xl
              opacity-30 motion-reduce:opacity-0 -z-10" />
            
            <Card className="relative w-full max-w-2xl max-h-full bg-gradient-to-br from-white/95 to-amber-50/95 dark:from-slate-900/95 dark:to-blue-900/95 backdrop-blur-xl border-amber-200/30 dark:border-white/20 shadow-2xl overflow-hidden">
              
              {/* Modal border glow */}
              <div className="absolute -inset-0.5 bg-radial from-cyan-400/0 from-50% to-transparent rounded-2xl blur-sm
                opacity-40 motion-reduce:opacity-0 -z-10" />
              
              {/* Scrollable content wrapper */}
              <div className="max-h-full overflow-y-auto">
              <CardContent className="p-0">
                {/* Header */}
                <div className="relative p-6 pb-4">
                  {/* Background decorative elements */}
                  <div className="absolute inset-0 overflow-hidden rounded-t-xl">
                    <motion.div 
                      className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-r ${category?.color} opacity-10 rounded-full blur-xl`}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ duration: 20, repeat: Infinity }}
                    />
                  </div>

                  {/* Close button */}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-4 right-4 h-8 w-8 text-white/50 hover:text-white hover:bg-white/10 rounded-full z-20"
                    onClick={onClose}
                    aria-label={lang === 'es' ? 'Cerrar detalles del negocio' : 'Close business details'}
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </Button>

                  {/* Business header */}
                  <div className="flex items-start gap-4 relative z-10">
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category?.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-2xl">{category?.icon}</span>
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 id="business-details-title" className="text-2xl font-bold text-slate-800 dark:text-white truncate
                          text-shadow-lg text-shadow-slate-800/60 drop-shadow-md drop-shadow-emerald-400/20">
                          {businessName}
                        </h2>
                        {business.featured && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Badge className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-400 border-yellow-400/30">
                              <Sparkles className="w-3 h-3 mr-1" />
                              {t.featured}
                            </Badge>
                          </motion.div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-white/70">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{business.rating}</span>
                          <span className="text-white/50">• {t.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-emerald-400 font-medium">{getPriceSymbol(business.priceLevel)}</span>
                          <span className="text-white/50">• {t.priceRange}</span>
                        </div>
                        {business.distance && (
                          <div className="flex items-center gap-1">
                            <span className="text-cyan-400 font-medium">{business.distance.toFixed(1)}km</span>
                            <span className="text-white/50">• {t.distance}</span>
                          </div>
                        )}
                      </div>

                      <p id="business-details-description" className="text-white/60 mt-2 text-sm">{category?.name}</p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 mt-4 relative z-10">
                    {business.coordinates && onGetDirections && (
                      <Button
                        onClick={() => onGetDirections(business.coordinates)}
                        className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border-emerald-400/30"
                        variant="outline"
                        aria-label={`${t.getDirections} a ${businessName}`}
                      >
                        <Navigation className="w-4 h-4 mr-2" aria-hidden="true" />
                        {t.getDirections}
                      </Button>
                    )}
                    
                    {business.phone && onCall && (
                      <Button
                        onClick={() => onCall(business.phone!)}
                        className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-400/30"
                        variant="outline"
                        aria-label={`${t.call} a ${businessName} al ${business.phone}`}
                      >
                        <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                        {t.call}
                      </Button>
                    )}
                    
                    {onShare && (
                      <Button
                        onClick={() => onShare(business)}
                        size="icon"
                        className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                        variant="outline"
                        aria-label={`${t.share} ${businessName}`}
                      >
                        <Share2 className="w-4 h-4" aria-hidden="true" />
                      </Button>
                    )}
                    
                    {onFavorite && (
                      <Button
                        onClick={() => onFavorite(business.id)}
                        size="icon"
                        className={`border-white/20 ${
                          isFavorite 
                            ? 'bg-red-500/20 text-red-400 border-red-400/30' 
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                        variant="outline"
                        aria-label={isFavorite ? `${t.removeFromFavorites} ${businessName}` : `${t.addToFavorites} ${businessName}`}
                        aria-pressed={isFavorite}
                      >
                        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} aria-hidden="true" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 pb-6 space-y-6">
                  {/* About section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2
                      text-shadow-md text-shadow-slate-700/50">
                      <span className="w-1 h-6 bg-emerald-400 rounded-full drop-shadow-sm drop-shadow-emerald-400/60"></span>
                      {t.about}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {businessDescription}
                    </p>
                  </motion.div>

                  {/* Details grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {/* Address */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{t.address}</span>
                      </div>
                      <p className="text-white pl-6">{business.address}</p>
                    </div>

                    {/* Hours */}
                    {business.hours && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-white/60 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{t.openingHours}</span>
                        </div>
                        <div className="pl-6 space-y-2">
                          <p className="text-white">{business.hours}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-400/30">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                              <span className="font-medium text-sm">
                                {lang === 'es' ? 'Abierto hoy' : 'Open Today'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Tags/Features */}
                  {business.tags && business.tags.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2
                        text-shadow-md text-shadow-slate-700/50">
                        <span className="w-1 h-6 bg-cyan-400 rounded-full drop-shadow-sm drop-shadow-cyan-400/60"></span>
                        {t.features}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {business.tags.map((tag, index) => (
                          <motion.div
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.05 }}
                          >
                            <Badge 
                              variant="secondary" 
                              className="bg-white/10 text-white/80 border-white/20"
                            >
                              {tag}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </CardContent>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}