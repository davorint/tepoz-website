'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import { BusinessList } from '@/components/business-finder/business-list'
import { BusinessDetails } from '@/components/business-finder/business-details'
import { BusinessFilters } from '@/components/business-finder/business-filters'

// Disable in production
if (process.env.NODE_ENV === 'production') {
  notFound()
}

// Sample data for testing
const sampleBusinesses = [
  {
    id: 'los-colorines',
    name: 'Los Colorines',
    nameEn: 'Los Colorines',
    category: 'restaurant' as const,
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
    id: 'posada-tepoztlan',
    name: 'Posada Tepoztlán',
    nameEn: 'Posada Tepoztlán',
    category: 'hotel' as const,
    coordinates: [-99.0995, 18.9850] as [number, number],
    rating: 4.6,
    priceLevel: 3,
    description: 'Hotel boutique con arquitectura colonial y jardines exuberantes.',
    descriptionEn: 'Boutique hotel with colonial architecture and lush gardens.',
    address: 'Paraíso 3, Centro, Tepoztlán',
    phone: '+52 739 395 0010',
    featured: true,
    tags: ['boutique', 'colonial', 'jardines']
  }
]

const sampleCategories = [
  { id: 'all', name: 'Todos', icon: '🔍', color: 'from-gray-400 to-gray-600' },
  { id: 'restaurant', name: 'Restaurantes', icon: '🍽️', color: 'from-red-400 to-red-600' },
  { id: 'hotel', name: 'Hoteles', icon: '🏨', color: 'from-blue-400 to-blue-600' }
]

export default function ComponentTestPage() {
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null)
  const [hoveredBusiness, setHoveredBusiness] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [sortByDistance, setSortByDistance] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 4])
  const [ratingRange, setRatingRange] = useState<[number, number]>([3, 5])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [showDetails, setShowDetails] = useState(false)

  const filteredBusinesses = sampleBusinesses.filter(business => {
    const matchesSearch = !searchQuery || business.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || business.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const selectedBusinessData = selectedBusiness 
    ? sampleBusinesses.find(b => b.id === selectedBusiness) 
    : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Component Test Page
        </h1>

        {/* Filters Component Test */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">🔍 Filters Component</h2>
          <BusinessFilters
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            sortBy={sortBy}
            sortByDistance={sortByDistance}
            userLocation={null}
            categories={sampleCategories}
            isFilterChanging={false}
            showAdvancedFilters={showAdvancedFilters}
            lang="es"
            businessCount={filteredBusinesses.length}
            priceRange={priceRange}
            ratingRange={ratingRange}
            selectedFeatures={selectedFeatures}
            onSearchChange={setSearchQuery}
            onCategoryChange={setSelectedCategory}
            onSortChange={setSortBy}
            onSortByDistanceToggle={setSortByDistance}
            onAdvancedFiltersToggle={setShowAdvancedFilters}
            onPriceRangeChange={setPriceRange}
            onRatingRangeChange={setRatingRange}
            onFeaturesChange={setSelectedFeatures}
          />
        </div>

        {/* Business List Component Test */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">📋 Business List Component</h2>
          <BusinessList
            businesses={filteredBusinesses}
            categories={sampleCategories}
            selectedBusiness={selectedBusiness}
            hoveredBusiness={hoveredBusiness}
            lang="es"
            isLoading={false}
            onBusinessSelect={(id) => {
              setSelectedBusiness(id)
              setShowDetails(true)
            }}
            onBusinessHover={setHoveredBusiness}
          />
        </div>

        {/* Business Details Component Test */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">📄 Business Details Component</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setShowDetails(true)}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Show Details Modal
            </button>
            <span className="text-white/70 text-sm self-center">
              Selected: {selectedBusiness || 'None'}
            </span>
          </div>
        </div>

        {/* Component Statistics */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">📊 Component Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">✅</div>
              <div className="text-white text-sm">Business List</div>
              <div className="text-white/60 text-xs">Extracted & Working</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">✅</div>
              <div className="text-white text-sm">Business Filters</div>
              <div className="text-white/60 text-xs">Extracted & Working</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">✅</div>
              <div className="text-white text-sm">Business Details</div>
              <div className="text-white/60 text-xs">Created & Working</div>
            </div>
          </div>
        </div>
      </div>

      {/* Business Details Modal */}
      <BusinessDetails
        business={selectedBusinessData || null}
        category={selectedBusinessData ? sampleCategories.find(c => c.id === selectedBusinessData.category) || undefined : undefined}
        isOpen={showDetails}
        lang="es"
        onClose={() => setShowDetails(false)}
        onGetDirections={(coords) => console.log('Get directions to:', coords)}
        onCall={(phone) => console.log('Call:', phone)}
        onShare={(business) => console.log('Share:', business.name)}
        onFavorite={(id) => console.log('Toggle favorite:', id)}
      />
    </div>
  )
}