'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'motion/react'
import { Locale } from '@/lib/i18n'
import { BusinessList } from '@/components/business-finder/business-list'
import { BusinessDetails } from '@/components/business-finder/business-details'
import { BusinessFilters } from '@/components/business-finder/business-filters'
import { BusinessMap } from '@/components/business-finder/business-map'
import { Business, CategoryInfo } from '@/types/business-finder'
import * as turf from '@turf/turf'

interface BusinessFinderPageProps {
  params: Promise<{ lang: string }>
}


// Enhanced business data combining both map and store-locator patterns
const tepoztlanBusinesses: Business[] = [
  // Restaurants
  {
    id: 'los-colorines',
    name: 'Los Colorines',
    nameEn: 'Los Colorines',
    category: 'restaurant',
    coordinates: [-99.0989, 18.9853] as [number, number],
    rating: 4.7,
    priceLevel: 3,
    description: 'Restaurante icónico con más de 20 años, cocina mexicana auténtica en un ambiente colorido.',
    descriptionEn: 'Iconic restaurant with over 20 years, authentic Mexican cuisine in a colorful setting.',
    address: 'Del Tepozteco 13, Santísima Trinidad, Tepoztlán',
    phone: '+52 739 395 0198',
    hours: '8:00 AM - 10:00 PM',
    featured: true,
    tags: ['mexicana', 'tradicional', 'icónico']
  },
  {
    id: 'la-veladora',
    name: 'La Veladora',
    nameEn: 'La Veladora',
    category: 'restaurant',
    coordinates: [-99.1017, 18.9847] as [number, number],
    rating: 4.5,
    priceLevel: 2,
    description: 'Cocina mexicana tradicional en el corazón de Tepoztlán',
    descriptionEn: 'Traditional Mexican cuisine in the heart of Tepoztlán',
    address: 'Centro Histórico, Tepoztlán',
    hours: '9:00 AM - 10:00 PM',
    tags: ['mexicana', 'centro', 'tradicional']
  },
  // Hotels
  {
    id: 'posada-tepoztlan',
    name: 'Posada Tepoztlán',
    nameEn: 'Posada Tepoztlán',
    category: 'hotel',
    coordinates: [-99.0995, 18.9850] as [number, number],
    rating: 4.6,
    priceLevel: 3,
    description: 'Hotel boutique con arquitectura colonial y jardines exuberantes.',
    descriptionEn: 'Boutique hotel with colonial architecture and lush gardens.',
    address: 'Paraíso 3, Centro, Tepoztlán',
    phone: '+52 739 395 0010',
    featured: true,
    tags: ['boutique', 'colonial', 'jardines']
  },
  // Cafes
  {
    id: 'cafe-tepozteco',
    name: 'Café Tepozteco',
    nameEn: 'Tepozteco Cafe',
    category: 'cafe',
    coordinates: [-99.0992, 18.9849] as [number, number],
    rating: 4.4,
    priceLevel: 2,
    description: 'Café artesanal con vista a las montañas y ambiente acogedor.',
    descriptionEn: 'Artisan coffee with mountain views and cozy atmosphere.',
    address: 'Zaragoza 12, Centro, Tepoztlán',
    hours: '7:00 AM - 8:00 PM',
    tags: ['café', 'artesanal', 'vista']
  },
  // Attractions
  {
    id: 'tepozteco-pyramid',
    name: 'Pirámide del Tepozteco',
    nameEn: 'Tepozteco Pyramid',
    category: 'attraction',
    coordinates: [-99.0958, 18.9892] as [number, number],
    rating: 4.8,
    priceLevel: 1,
    description: 'Sitio arqueológico prehispánico en la cima del cerro con vistas espectaculares.',
    descriptionEn: 'Pre-Hispanic archaeological site at the hilltop with spectacular views.',
    address: 'Cerro del Tepozteco, Tepoztlán',
    hours: '9:00 AM - 5:30 PM',
    featured: true,
    tags: ['arqueología', 'senderismo', 'vistas']
  }
]

// Categories with enhanced styling
const categories: CategoryInfo[] = [
  { id: 'all', name: 'Todos', icon: '🔍', color: 'from-gray-400 to-gray-600' },
  { id: 'restaurant', name: 'Restaurantes', icon: '🍽️', color: 'from-red-400 to-red-600' },
  { id: 'hotel', name: 'Hoteles', icon: '🏨', color: 'from-blue-400 to-blue-600' },
  { id: 'cafe', name: 'Cafeterías', icon: '☕', color: 'from-amber-400 to-amber-600' },
  { id: 'shopping', name: 'Compras', icon: '🛍️', color: 'from-green-400 to-green-600' },
  { id: 'attraction', name: 'Atracciones', icon: '🏛️', color: 'from-sky-400 to-sky-600' }
]

export default function BusinessFinderPage({ params }: BusinessFinderPageProps) {
  const [lang, setLang] = useState<Locale>('es')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null)
  const [hoveredBusiness, setHoveredBusiness] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('featured')
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>(tepoztlanBusinesses)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [sortByDistance, setSortByDistance] = useState(false)
  const [isFilterChanging, setIsFilterChanging] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [showBusinessDetails, setShowBusinessDetails] = useState(false)

  // Advanced filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 4])
  const [ratingRange, setRatingRange] = useState<[number, number]>([3, 5])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  // Get language from params
  useEffect(() => {
    params.then(({ lang: langParam }) => {
      setLang(langParam as Locale)
    })
  }, [params])

  // Calculate distances when user location is available
  const addDistanceToBusinesses = useCallback((businesses: Business[]): Business[] => {
    if (!userLocation) return businesses

    return businesses.map(business => ({
      ...business,
      distance: turf.distance(
        turf.point(userLocation), 
        turf.point(business.coordinates)
      )
    }))
  }, [userLocation])

  // Handle business selection
  const handleBusinessSelect = useCallback((businessId: string) => {
    setSelectedBusiness(businessId)
    setShowBusinessDetails(true)
  }, [])

  // Get user location
  const getUserLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      console.warn('⚠️ Geolocation not supported')
      return
    }

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
      console.log('📍 User location updated:', coords)
    } catch (error) {
      console.error('❌ Error getting user location:', error)
    }
  }, [])

  // Optimized search algorithm with ranking
  const calculateRelevanceScore = useCallback((business: Business, query: string): number => {
    if (!query) return business.featured ? 1 : 0.8
    
    const lowerQuery = query.toLowerCase()
    const searchName = lang === 'en' && business.nameEn ? business.nameEn : business.name
    const searchDesc = lang === 'en' && business.descriptionEn ? business.descriptionEn : business.description
    
    let score = 0
    
    // Name matches (highest priority)
    if (searchName.toLowerCase().includes(lowerQuery)) {
      score += searchName.toLowerCase().startsWith(lowerQuery) ? 100 : 80
    }
    
    // Category matches
    if (business.category.toLowerCase().includes(lowerQuery)) {
      score += 60
    }
    
    // Description matches
    if (searchDesc.toLowerCase().includes(lowerQuery)) {
      score += 40
    }
    
    // Tag matches
    if (business.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) {
      score += 30
    }
    
    // Address matches (lowest priority)
    if (business.address.toLowerCase().includes(lowerQuery)) {
      score += 20
    }
    
    // Boost for featured businesses
    if (business.featured) {
      score += 10
    }
    
    // Boost for higher ratings
    score += business.rating * 2
    
    return score
  }, [lang])

  // Memoized filter and sort function
  const processBusinesses = useCallback(() => {
    let filtered = [...tepoztlanBusinesses]

    // Single-pass filtering with relevance scoring
    if (searchQuery) {
      filtered = filtered
        .map(business => ({
          ...business,
          relevanceScore: calculateRelevanceScore(business, searchQuery)
        }))
        .filter(business => business.relevanceScore > 0)
    } else {
      // Add default relevance score when no search query
      filtered = filtered.map(business => ({
        ...business,
        relevanceScore: business.featured ? 100 : 80
      }))
    }

    // Apply other filters in single pass
    filtered = filtered.filter(business => {
      // Category filter
      const categoryMatch = selectedCategory === 'all' || business.category === selectedCategory
      
      // Advanced filters
      const priceMatch = business.priceLevel >= priceRange[0] && business.priceLevel <= priceRange[1]
      const ratingMatch = business.rating >= ratingRange[0] && business.rating <= ratingRange[1]
      
      // Feature filter - fixed logic (AND instead of OR)
      const featureMatch = selectedFeatures.length === 0 || selectedFeatures.every(feature => {
        switch (feature) {
          case 'featured': return business.featured
          case 'outdoor': return business.tags?.includes('terraza') || business.tags?.includes('outdoor')
          case 'wifi': return business.tags?.includes('wifi') || business.tags?.includes('WiFi')
          case 'parking': return business.tags?.includes('estacionamiento') || business.tags?.includes('parking')
          default: return true
        }
      })

      return categoryMatch && priceMatch && ratingMatch && featureMatch
    })

    // Add distance if available
    if (userLocation) {
      filtered = addDistanceToBusinesses(filtered)
    }

    // Optimized sorting
    filtered.sort((a, b) => {
      // Distance sort has priority if enabled
      if (sortByDistance && a.distance !== undefined && b.distance !== undefined) {
        return a.distance - b.distance
      }
      
      // Use relevance score if search query exists
      if (searchQuery) {
        return (b.relevanceScore || 0) - (a.relevanceScore || 0)
      }
      
      // Standard sorting
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
          return (b.relevanceScore || 0) - (a.relevanceScore || 0)
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, sortBy, sortByDistance, userLocation, lang, addDistanceToBusinesses, priceRange, ratingRange, selectedFeatures, calculateRelevanceScore])

  // Debounced effect with AbortController for cleanup
  useEffect(() => {
    const abortController = new AbortController()
    
    const timeoutId = setTimeout(() => {
      if (!abortController.signal.aborted) {
        const filtered = processBusinesses()
        setFilteredBusinesses(filtered)
      }
    }, searchQuery ? 150 : 50) // Faster debounce for better UX

    return () => {
      clearTimeout(timeoutId)
      abortController.abort()
    }
  }, [processBusinesses, searchQuery])

  const selectedBusinessData = selectedBusiness 
    ? filteredBusinesses.find(b => b.id === selectedBusiness) || null
    : null

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50/80 from-10% via-blue-50/60 via-40% to-cyan-50/50 to-90% dark:bg-linear-to-br dark:from-slate-800 dark:via-blue-900 dark:to-sky-800">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden py-16"
        role="banner"
        aria-labelledby="main-heading"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-400/0.5 dark:bg-emerald-400/1 rounded-full blur-3xl motion-reduce:animate-none
              mask-radial-from-40% mask-radial-to-transparent mask-radial-at-center"
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-400/1 dark:bg-cyan-400/2 rounded-full blur-2xl motion-reduce:animate-none
              mask-radial-from-50% mask-radial-to-transparent mask-radial-at-center"
            animate={{ 
              scale: [1, 1.1, 1],
              x: [0, -30, 0],
              y: [0, 20, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          />
          
          {/* Premium gradient mask overlay for sophisticated edge fading */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/5
            mask-b-from-90% mask-b-to-transparent" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          
          {/* Restaurant-style Banner */}
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-emerald-400 dark:to-emerald-400" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 blur-lg" />
              <div className="relative bg-gradient-to-r from-emerald-400 to-cyan-400 text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl rounded-full">
                🏢 {lang === 'es' ? 'Negocios & Servicios' : 'Businesses & Services'} 🏢
              </div>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-cyan-400 dark:to-cyan-400" />
          </div>
          
          <h1 id="main-heading" className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-black dark:text-white drop-shadow-2xl text-shadow-lg text-shadow-emerald-400/30">
              {lang === 'es' ? 'Descubre' : 'Discover'}
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent 
              text-shadow-xl text-shadow-cyan-400/40 drop-shadow-lg drop-shadow-cyan-400/20">
              TEPOZTLÁN
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-800 dark:text-white/80 font-light max-w-4xl mx-auto leading-relaxed mb-8
            text-shadow-md text-shadow-slate-600/50">
            {lang === 'es' 
              ? 'Descubre lugares mágicos, restaurantes excepcionales y experiencias únicas en nuestro pueblo mágico'
              : 'Discover magical places, exceptional restaurants and unique experiences in our magical town'
            }
          </p>

          {/* Stats */}
          <div className="@container max-w-4xl mx-auto">
            <div className="grid grid-cols-2 @md:grid-cols-3 gap-6 justify-items-center">
            <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-xl rounded-2xl border border-slate-300/20 dark:border-white/10 p-6 shadow-lg shadow-slate-300/15 dark:shadow-white/12 hover:bg-white/80 dark:hover:bg-white/10 hover:scale-105 dark:hover:scale-110 hover:-translate-y-2 dark:hover:-translate-y-3 hover:shadow-xl hover:shadow-slate-400/20 dark:hover:shadow-white/18 transition-all duration-300 dark:duration-500 ease-out cursor-pointer group overflow-visible opacity-95 dark:opacity-100 hover:opacity-100 dark:hover:opacity-100">
              
              {/* Organic glow effect */}
              <div className="absolute -inset-1 bg-radial from-emerald-400/0 from-40% to-transparent rounded-full blur-lg dark:blur-2xl
                group-hover:from-emerald-400/15 dark:group-hover:from-emerald-400/25
                transition-all duration-300 dark:duration-500 ease-out opacity-0 group-hover:opacity-100 -z-10
                motion-reduce:transition-none motion-reduce:group-hover:opacity-0" />
              
              <motion.div 
                className="text-3xl font-bold text-emerald-500 dark:text-emerald-400 mb-2 motion-reduce:animate-none relative z-10
                  text-shadow-md dark:text-shadow-lg text-shadow-emerald-600/40 dark:text-shadow-emerald-600/60
                  drop-shadow-sm dark:drop-shadow-md"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                suppressHydrationWarning
              >
                {tepoztlanBusinesses.length}
              </motion.div>
              <div className="text-slate-700 dark:text-white/70 text-sm group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-200 dark:duration-300 relative z-10">
                {lang === 'es' ? 'Negocios' : 'Businesses'}
              </div>
            </div>
            <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-xl rounded-2xl border border-slate-300/20 dark:border-white/10 p-6 shadow-lg shadow-slate-300/15 dark:shadow-white/12 hover:bg-white/80 dark:hover:bg-white/10 hover:scale-105 dark:hover:scale-110 hover:-translate-y-2 dark:hover:-translate-y-3 hover:shadow-xl hover:shadow-slate-400/20 dark:hover:shadow-white/18 transition-all duration-300 dark:duration-500 ease-out cursor-pointer group overflow-visible opacity-95 dark:opacity-100 hover:opacity-100 dark:hover:opacity-100">
              
              {/* Organic glow effect */}
              <div className="absolute -inset-1 bg-radial from-blue-400/0 from-40% to-transparent rounded-full blur-lg dark:blur-2xl
                group-hover:from-blue-400/15 dark:group-hover:from-blue-400/25
                transition-all duration-300 dark:duration-500 ease-out opacity-0 group-hover:opacity-100 -z-10
                motion-reduce:transition-none motion-reduce:group-hover:opacity-0" />
              
              <div className="text-3xl font-bold text-blue-500 dark:text-blue-400 mb-2 relative z-10 text-shadow-md dark:text-shadow-lg text-shadow-blue-600/40 dark:text-shadow-blue-600/60 drop-shadow-sm dark:drop-shadow-md" suppressHydrationWarning>{categories.length - 1}</div>
              <div className="text-slate-700 dark:text-white/70 text-sm group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-200 dark:duration-300 relative z-10">
                {lang === 'es' ? 'Categorías' : 'Categories'}
              </div>
            </div>
            <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-xl rounded-2xl border border-slate-300/20 dark:border-white/10 p-6 shadow-lg shadow-slate-300/15 dark:shadow-white/12 hover:bg-white/80 dark:hover:bg-white/10 hover:scale-105 dark:hover:scale-110 hover:-translate-y-2 dark:hover:-translate-y-3 hover:shadow-xl hover:shadow-slate-400/20 dark:hover:shadow-white/18 transition-all duration-300 dark:duration-500 ease-out cursor-pointer group overflow-visible opacity-95 dark:opacity-100 hover:opacity-100 dark:hover:opacity-100">
              
              {/* Organic glow effect */}
              <div className="absolute -inset-1 bg-radial from-cyan-400/0 from-40% to-transparent rounded-full blur-lg dark:blur-2xl
                group-hover:from-cyan-400/15 dark:group-hover:from-cyan-400/25
                transition-all duration-300 dark:duration-500 ease-out opacity-0 group-hover:opacity-100 -z-10
                motion-reduce:transition-none motion-reduce:group-hover:opacity-0" />
              
              <motion.div 
                className="text-3xl font-bold text-cyan-500 dark:text-cyan-400 mb-2 motion-reduce:animate-none relative z-10
                  text-shadow-md dark:text-shadow-lg text-shadow-cyan-600/40 dark:text-shadow-cyan-600/60
                  drop-shadow-sm dark:drop-shadow-md"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                suppressHydrationWarning
              >
                {tepoztlanBusinesses.filter(b => b.featured).length}
              </motion.div>
              <div className="text-slate-700 dark:text-white/70 text-sm group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-200 dark:duration-300 relative z-10">
                {lang === 'es' ? 'Destacados' : 'Featured'}
              </div>
            </div>
          </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16" role="main" aria-label={lang === 'es' ? 'Contenido principal del buscador de negocios' : 'Main business finder content'}>
        {/* Filters */}
        <BusinessFilters
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          sortBy={sortBy}
          sortByDistance={sortByDistance}
          userLocation={userLocation}
          categories={categories}
          isFilterChanging={isFilterChanging}
          showAdvancedFilters={showAdvancedFilters}
          lang={lang}
          businessCount={filteredBusinesses.length}
          priceRange={priceRange}
          ratingRange={ratingRange}
          selectedFeatures={selectedFeatures}
          onSearchChange={setSearchQuery}
          onCategoryChange={(category) => {
            setIsFilterChanging(true)
            setSelectedCategory(category)
            setTimeout(() => setIsFilterChanging(false), 300)
          }}
          onSortChange={setSortBy}
          onSortByDistanceToggle={setSortByDistance}
          onAdvancedFiltersToggle={setShowAdvancedFilters}
          onPriceRangeChange={setPriceRange}
          onRatingRangeChange={setRatingRange}
          onFeaturesChange={setSelectedFeatures}
          onGetUserLocation={getUserLocation}
          onClearFilters={() => {
            setSearchQuery('')
            setSelectedCategory('all')
            setSortBy('featured')
            setSortByDistance(false)
            setPriceRange([1, 4])
            setRatingRange([3, 5])
            setSelectedFeatures([])
            setShowAdvancedFilters(false)
          }}
        />
      </div>

      {/* Full-Width Map */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-8 group w-full"
        role="region"
        aria-label={lang === 'es' ? 'Mapa interactivo de negocios' : 'Interactive business map'}
      >
        <div className="relative @container backdrop-blur-xl bg-white/60 dark:bg-white/5 shadow-xl shadow-slate-300/20 dark:shadow-white/15 border-y border-slate-300/20 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/8 hover:shadow-2xl hover:shadow-slate-400/25 dark:hover:shadow-white/20 transition-all duration-300 dark:duration-500 ease-out overflow-visible">
            
          {/* Premium edge fade effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-400/5
            mask-b-from-70% mask-b-to-transparent opacity-50" />
          
          {/* Subtle container glow */}
          <div className="absolute inset-0 bg-radial from-emerald-400/0 from-50% to-transparent blur-md
            group-hover:from-emerald-400/10
            transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 -z-10
            motion-reduce:transition-none motion-reduce:group-hover:opacity-0" />
            <BusinessMap
              businesses={filteredBusinesses}
              selectedBusiness={selectedBusiness}
              selectedCategory={selectedCategory}
              userLocation={userLocation}
              lang={lang}
              onBusinessSelect={handleBusinessSelect}
              onLocationUpdate={setUserLocation}
            />
        </div>
      </motion.div>

      {/* Main Content Continued */}
      <div className="container mx-auto px-4 pb-16">
        {/* Business List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8 group"
          role="region"
          aria-label={lang === 'es' ? 'Lista de resultados de negocios' : 'Business results list'}
        >
          <div className="relative @container backdrop-blur-xl bg-white/60 dark:bg-white/5 rounded-3xl border border-slate-300/20 dark:border-white/10 px-6 pt-6 pb-3 shadow-xl shadow-slate-300/20 dark:shadow-white/15 hover:bg-white/80 dark:hover:bg-white/8 hover:shadow-2xl hover:shadow-slate-400/25 dark:hover:shadow-white/20 transition-all duration-300 dark:duration-500 ease-out overflow-visible">
            
            {/* Premium edge fade effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-cyan-400/5 rounded-3xl
              mask-t-from-70% mask-t-to-transparent opacity-50" />
            
            {/* Subtle container glow */}
            <div className="absolute -inset-0.5 bg-radial from-cyan-400/0 from-50% to-transparent rounded-3xl blur-md
              group-hover:from-cyan-400/10
              transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 -z-10
              motion-reduce:transition-none motion-reduce:group-hover:opacity-0" />
            <div className="flex items-center justify-between mb-8 relative">
              {/* Background decorative elements */}
              <div className="absolute -left-4 -top-2 w-32 h-16 bg-gradient-to-r from-emerald-400/10 to-cyan-400/5 rounded-full blur-xl opacity-60" />
              
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="relative"
                >
                  <div className="w-1.5 h-12 bg-gradient-to-b from-emerald-400 via-cyan-400 to-blue-400 rounded-full 
                    shadow-lg shadow-emerald-400/30 drop-shadow-lg drop-shadow-emerald-400/20" />
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        '0 0 20px rgba(16, 185, 129, 0.3)',
                        '0 0 30px rgba(34, 197, 234, 0.4)', 
                        '0 0 20px rgba(16, 185, 129, 0.3)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 w-1.5 h-12 bg-gradient-to-b from-emerald-400 via-cyan-400 to-blue-400 rounded-full"
                  />
                </motion.div>
                
                <div className="relative">
                  <h2 className="text-3xl lg:text-4xl font-bold text-black dark:text-white 
                    text-shadow-xl text-shadow-slate-800/60 
                    drop-shadow-lg drop-shadow-emerald-400/25
                    bg-gradient-to-r from-gray-800 via-gray-900 to-black dark:from-white dark:via-emerald-100 dark:to-cyan-100 bg-clip-text text-transparent
                    filter brightness-110">
                    <span className="inline-block">
                      {selectedCategory === 'all'
                        ? (lang === 'es' ? 'Todos los Negocios' : 'All Businesses')
                        : categories.find(c => c.id === selectedCategory)?.name
                      }
                    </span>
                    <motion.span 
                      className="ml-3 px-4 py-1.5 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 
                        text-emerald-300 rounded-full text-lg font-semibold
                        border border-emerald-400/30 backdrop-blur-sm
                        shadow-lg shadow-emerald-400/20
                        drop-shadow-md drop-shadow-emerald-400/30"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 1, -1, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      ({filteredBusinesses.length})
                    </motion.span>
                  </h2>
                  
                  {/* Subtitle with category description */}
                  <motion.p 
                    className="text-sm text-gray-700 dark:text-white/60 mt-2 mask-r-from-90% mask-r-to-transparent"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {selectedCategory === 'all' 
                      ? (lang === 'es' 
                        ? 'Descubre todos los lugares únicos en Tepoztlán' 
                        : 'Discover all unique places in Tepoztlán')
                      : (lang === 'es' 
                        ? `Explora ${categories.find(c => c.id === selectedCategory)?.name?.toLowerCase()} seleccionados especialmente`
                        : `Explore specially selected ${categories.find(c => c.id === selectedCategory)?.name?.toLowerCase()}`
                      )
                    }
                  </motion.p>
                </div>
              </div>
            </div>

            <div className="py-4">
              <BusinessList
                businesses={filteredBusinesses}
                categories={categories}
                selectedBusiness={selectedBusiness}
                hoveredBusiness={hoveredBusiness}
                lang={lang}
                isLoading={false}
                onBusinessSelect={handleBusinessSelect}
                onBusinessHover={setHoveredBusiness}
              />
            </div>

            {filteredBusinesses.length > 0 && (
              <div className="text-center pt-4">
                <p className="text-gray-500 dark:text-white/50 text-sm">
                  {lang === 'es' 
                    ? `Mostrando ${filteredBusinesses.length} lugares`
                    : `Showing ${filteredBusinesses.length} places`
                  }
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Business Details Modal */}
      <BusinessDetails
        business={selectedBusinessData}
        category={selectedBusinessData ? categories.find(c => c.id === selectedBusinessData.category) : undefined}
        isOpen={showBusinessDetails}
        lang={lang}
        onClose={() => {
          setShowBusinessDetails(false)
          setSelectedBusiness(null)
        }}
        onGetDirections={(coords) => {
          // Open directions in default map app
          const url = `https://www.google.com/maps/dir/?api=1&destination=${coords[1]},${coords[0]}`
          window.open(url, '_blank')
        }}
        onCall={(phone) => {
          window.location.href = `tel:${phone}`
        }}
        onShare={(business) => {
          if (navigator.share) {
            navigator.share({
              title: business.name,
              text: business.description,
              url: window.location.href
            })
          } else {
            navigator.clipboard.writeText(`${business.name}: ${window.location.href}`)
          }
        }}
        onFavorite={(id) => {
          // TODO: Implement favorites functionality
          console.log('Toggle favorite:', id)
        }}
      />
    </div>
  )
}