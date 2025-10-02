'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
// ScrollArea removed - using native scrolling for better glow effect performance
import { Star, Sparkles, Search } from 'lucide-react'

import { BusinessListProps, getPriceSymbol } from '@/types/business-finder'


export function BusinessList({
  businesses,
  categories,
  selectedBusiness,
  hoveredBusiness,
  lang,
  isLoading,
  onBusinessSelect,
  onBusinessHover
}: BusinessListProps) {
  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4">
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="w-64 flex-shrink-0 bg-linear-to-br from-slate-50 to-gray-100/50 dark:bg-white/5 backdrop-blur-xl border border-slate-200/50 shadow-lg shadow-slate-300/15 dark:shadow-white/25">
              <CardContent className="p-4">
                <div className="animate-pulse">
                  <div className="h-4 bg-linear-to-r from-slate-200 to-blue-200/50 dark:bg-white/10 rounded mb-2"></div>
                  <div className="h-3 bg-linear-to-r from-blue-200/70 to-indigo-200/50 dark:bg-white/10 rounded mb-2"></div>
                  <div className="h-3 bg-linear-to-r from-indigo-200/60 to-purple-200/40 dark:bg-white/10 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    )
  }

  if (businesses.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 0.6,
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
      >
        <Card className="border border-slate-200/30 bg-linear-to-br from-white to-slate-50/60 dark:bg-white/5 backdrop-blur-xl overflow-hidden shadow-xl shadow-slate-300/15 dark:shadow-white/25">
          <CardContent className="p-8 text-center relative">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div 
                className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-400/10 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  x: [0, 10, 0],
                  y: [0, -5, 0]
                }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -bottom-10 -right-10 w-24 h-24 bg-cyan-400/10 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  x: [0, -8, 0],
                  y: [0, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
              />
            </div>

            {/* Main illustration */}
            <motion.div 
              className="relative z-10 mb-6"
              animate={{ 
                y: [0, -10, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="text-6xl mb-4">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                >
                  🔍
                </motion.div>
              </div>
              <Search className="w-16 h-16 text-white/20 mx-auto mb-4" />
            </motion.div>

            <div className="relative z-10">
              <motion.h3 
                className="text-xl font-bold text-slate-900 dark:text-white mb-2 drop-shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {lang === 'es' ? 'No se encontraron lugares' : 'No places found'}
              </motion.h3>
              <motion.p 
                className="text-slate-700 dark:text-white/60 max-w-md mx-auto leading-relaxed drop-shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {lang === 'es' 
                  ? 'Intenta ajustar los filtros o busca con otros términos para descubrir lugares increíbles en Tepoztlán.'
                  : 'Try adjusting your filters or search with different terms to discover amazing places in Tepoztlán.'
                }
              </motion.p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="w-full relative overflow-visible">
      <div 
        className="w-full overflow-x-auto overflow-y-visible pb-8 pt-2"
        role="list" 
        aria-label={lang === 'es' ? 'Lista de negocios' : 'Business list'}
      >
        <div className="flex gap-6 px-8" style={{ paddingTop: '40px', paddingBottom: '32px' }}>
        {businesses.map((business, index) => {
          const categoryInfo = categories.find(c => c.id === business.category)
          const isSelected = selectedBusiness === business.id
          const isHovered = hoveredBusiness === business.id
          const businessName = lang === 'en' && business.nameEn ? business.nameEn : business.name
          
          return (
            <motion.div
              key={business.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
              whileTap={{ scale: 0.98 }}
              layout
              className="relative flex-shrink-0 group"
              style={{ 
                minWidth: '280px'
              }}
              onMouseEnter={() => onBusinessHover(business.id)}
              onMouseLeave={() => onBusinessHover(null)}
            >
              {/* Outer glow effects - individual card hover feedback */}
              <div className={`absolute -top-6 -left-6 -right-6 -bottom-6 bg-radial from-emerald-400/0 from-30% via-emerald-400/0 via-60% to-transparent rounded-full blur-2xl
                transition-all duration-300 ease-out pointer-events-none z-0
                motion-reduce:transition-none ${isHovered ? 'from-emerald-400/15 via-emerald-400/3 opacity-100' : 'opacity-0'}`} />
              
              <div className={`absolute -top-4 -left-4 -right-4 -bottom-4 bg-radial from-cyan-400/0 from-40% to-transparent rounded-full blur-xl
                transition-all duration-300 ease-out pointer-events-none z-1  
                motion-reduce:transition-none ${isHovered ? 'from-cyan-400/3 opacity-100' : 'opacity-0'}`} />
            <Card 
              id={`business-${business.id}`}
              className={`relative w-60 sm:w-64 border cursor-pointer backdrop-blur-md dark:backdrop-blur-xl
                transition-all duration-300 dark:duration-500 ease-out
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
                motion-reduce:transition-none z-10 opacity-95 dark:opacity-100
                hover:scale-105 dark:hover:scale-110 hover:-translate-y-1 dark:hover:-translate-y-2 hover:opacity-100 dark:hover:opacity-100
                ${isSelected ? 'bg-gradient-to-br from-emerald-50/80 to-green-100/40 dark:from-emerald-900/20 dark:to-green-900/10 ring-2 ring-emerald-400 dark:ring-emerald-300 shadow-lg shadow-emerald-400/25 dark:shadow-emerald-400/25 border-emerald-300/30 dark:border-emerald-400/50 drop-shadow-md dark:drop-shadow-lg' : 
                  isHovered ? 'bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-purple-50/30 dark:from-blue-900/15 dark:via-indigo-900/10 dark:to-purple-900/5 shadow-xl shadow-blue-300/15 dark:shadow-cyan-400/15 ring-1 ring-blue-300/20 dark:ring-cyan-300/30 border-blue-300/20 dark:border-cyan-400/30 drop-shadow-lg dark:drop-shadow-xl' : 'bg-white/60 dark:bg-white/5 border-slate-300/20 dark:border-white/10 shadow-sm shadow-slate-300/8 dark:shadow-white/8 drop-shadow-sm dark:drop-shadow-sm'}`}
              onClick={() => onBusinessSelect(business.id)}
              role="listitem"
              aria-label={`${businessName}, ${categoryInfo?.name}, ${business.rating} estrellas, ${business.priceLevel ? '$'.repeat(business.priceLevel) : ''}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onBusinessSelect(business.id)
                  // Scroll card into view when focused
                  e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'nearest' })
                }
              }}
              onFocus={(e) => {
                // Ensure focused card is visible
                e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'nearest' })
              }}
            >
              <CardContent className="p-5 relative">
                
                {/* Inner coordinated glow - individual card hover feedback */}
                <div className={`absolute inset-0 bg-gradient-to-br from-emerald-400/0 via-transparent to-cyan-400/0 rounded-2xl
                  transition-all duration-300 ease-out z-5
                  motion-reduce:transition-none ${isHovered ? 'from-emerald-400/3 to-cyan-400/3 opacity-100' : 'opacity-0'}`} />
                
                
                
                <div className="flex items-start gap-3 relative z-10">
                  {/* Icon container with proper scaling bounds */}
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <motion.div 
                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${categoryInfo?.color} 
                        flex items-center justify-center shadow-lg shadow-slate-400/20 dark:shadow-white/30
                        group-hover:scale-110 dark:group-hover:scale-125 group-hover:rotate-1 dark:group-hover:rotate-3
                        transition-transform duration-200 dark:duration-300 ease-out
                        motion-reduce:group-hover:scale-100 motion-reduce:group-hover:rotate-0 motion-reduce:transition-none`}
                    animate={isSelected ? {
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    } : {}}
                    transition={isSelected ? { 
                      duration: 0.8,
                      repeat: Infinity,
                      repeatDelay: 3
                    } : {}}
                  >
                      <span className="text-sm">{categoryInfo?.icon}</span>
                    </motion.div>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Business Name with Enhanced Animation */}
                    <motion.h4 
                      className="font-semibold text-slate-900 dark:text-white text-sm truncate transition-colors duration-1000 mb-1
                        text-shadow-sm text-shadow-slate-900/40 drop-shadow-sm"
                      style={{
                        color: isSelected ? '#10b981' : undefined,
                      }}
                    >
                      {lang === 'en' && business.nameEn ? business.nameEn : business.name}
                    </motion.h4>

                    {/* Optimized Rating and Info Section */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1 group-hover:scale-105 dark:group-hover:scale-110 transition-transform duration-200 dark:duration-300 motion-reduce:group-hover:scale-100 motion-reduce:transition-none">
                        <Star className="w-3 h-3 text-yellow-400 dark:text-yellow-300 fill-current group-hover:scale-110 dark:group-hover:scale-125 transition-transform duration-200 dark:duration-300 motion-reduce:group-hover:scale-100 motion-reduce:transition-none" />
                        <span className="text-xs text-slate-700 dark:text-white/70 font-medium">{business.rating}</span>
                      </div>
                      
                      <span className="text-xs text-slate-500 dark:text-white/50">•</span>
                      
                      <span className="text-xs text-emerald-500 dark:text-emerald-400 font-medium hover:scale-110 dark:hover:scale-115 transition-transform duration-150 dark:duration-200 motion-reduce:hover:scale-100 motion-reduce:transition-none">
                        {getPriceSymbol(business.priceLevel)}
                      </span>
                      
                      {business.distance && (
                        <>
                          <span className="text-xs text-slate-500 dark:text-white/50">•</span>
                          <motion.span 
                            className="text-xs text-cyan-500 dark:text-cyan-400 font-medium motion-reduce:animate-none"
                            animate={{ 
                              scale: [1, 1.05, 1]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 2
                            }}
                          >
                            {business.distance.toFixed(1)}km
                          </motion.span>
                        </>
                      )}
                    </div>

                    {/* Optimized Description with Tailwind 4.1 mask fade */}
                    <p className="relative text-xs text-slate-700 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white/80 line-clamp-2 mb-2 transition-colors duration-200 motion-reduce:transition-none overflow-hidden mask-r-from-85% mask-r-to-transparent">
                      {lang === 'en' && business.descriptionEn 
                        ? business.descriptionEn 
                        : business.description
                      }
                    </p>

                    {/* Enhanced Hours */}
                    {business.hours && (
                      <p className="text-xs text-slate-600 dark:text-white/50 flex items-center gap-1 truncate">
                        <span>🕐</span>
                        <span className="truncate">{business.hours}</span>
                      </p>
                    )}
                  </div>

                  {/* Enhanced Featured Badge */}
                  {business.featured && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.2 }
                      }}
                      className="self-start"
                    >
                      <Badge className="bg-gradient-to-r from-yellow-100/60 to-orange-100/40 dark:from-yellow-400/20 dark:to-orange-400/20 text-yellow-600 dark:text-yellow-400 border-yellow-300/40 dark:border-yellow-400/30 shadow-lg shadow-yellow-400/15 dark:shadow-yellow-400/30 backdrop-blur-sm dark:backdrop-blur-md">
                        <motion.div
                          animate={{ 
                            rotate: [0, 180, 360],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 2
                          }}
                        >
                          <Sparkles className="w-3 h-3" />
                        </motion.div>
                      </Badge>
                    </motion.div>
                  )}
                </div>

                {/* Hover action indicators */}
                <motion.div
                  className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                >
                  <div className="flex gap-1">
                    <motion.div 
                      className="w-2 h-2 bg-emerald-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-blue-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
      </div>
        {/* Custom scrollbar styling */}
        <style jsx>{`
          div::-webkit-scrollbar {
            height: 8px;
          }
          div::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
          }
          div::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 4px;
            transition: background 0.2s;
          }
          div::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
          }
        `}</style>
      </div>
    </div>
  )
}