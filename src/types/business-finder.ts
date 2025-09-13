// Unified Business types for business-finder components

export interface Business {
  id: string
  name: string
  nameEn?: string
  category: 'hotel' | 'restaurant' | 'cafe' | 'shopping' | 'attraction' | 'culture' | 'experience' | 'service' | 'shop'
  subcategory?: string
  coordinates: [number, number]
  rating: number
  priceLevel: number
  description: string
  descriptionEn?: string
  address: string
  phone?: string
  hours?: string
  featured?: boolean
  tags?: string[]
  distance?: number
  relevanceScore?: number
  
  // Additional fields for compatibility
  website?: string
  email?: string
  whatsapp?: string
  images?: string[]
  amenities?: {
    es: string[]
    en: string[]
  }
  isVerified?: boolean
  acceptsCards?: boolean
  hasParking?: boolean
  hasWifi?: boolean
  isPetFriendly?: boolean
  operatingHours?: {
    [key: string]: {
      open: string
      close: string
      closed?: boolean
    }
  }
  createdAt?: Date
  updatedAt?: Date
  reviewCount?: number
}

export interface CategoryInfo {
  id: string
  name: string
  nameEn?: string
  icon: string
  color: string
  description?: string
  descriptionEn?: string
}

export interface BusinessFilters {
  category?: string
  subcategory?: string
  priceRange?: [number, number]
  ratingRange?: [number, number]
  location?: string
  searchQuery?: string
  features?: string[]
  acceptsCards?: boolean
  hasParking?: boolean
  hasWifi?: boolean
  isPetFriendly?: boolean
  isOpen?: boolean
  sortBy?: 'featured' | 'rating' | 'name' | 'price' | 'distance'
  sortByDistance?: boolean
}

export interface BusinessMapProps {
  businesses: Business[]
  selectedBusiness: string | null
  selectedCategory: string
  userLocation: [number, number] | null
  lang: 'es' | 'en'
  onBusinessSelect?: (businessId: string) => void
  onLocationUpdate?: (location: [number, number]) => void
}

export interface BusinessListProps {
  businesses: Business[]
  categories: CategoryInfo[]
  selectedBusiness: string | null
  hoveredBusiness: string | null
  lang: 'es' | 'en'
  isLoading: boolean
  onBusinessSelect: (businessId: string) => void
  onBusinessHover: (businessId: string | null) => void
}

export interface BusinessDetailsProps {
  business: Business | null
  category?: CategoryInfo
  isOpen: boolean
  lang: 'es' | 'en'
  onClose: () => void
  onGetDirections?: (coordinates: [number, number]) => void
  onCall?: (phone: string) => void
  onShare?: (business: Business) => void
  onFavorite?: (businessId: string) => void
  isFavorite?: boolean
}

export interface BusinessFiltersProps {
  searchQuery: string
  selectedCategory: string
  sortBy: string
  sortByDistance: boolean
  userLocation: [number, number] | null
  categories: CategoryInfo[]
  isFilterChanging: boolean
  showAdvancedFilters: boolean
  lang: 'es' | 'en'
  businessCount?: number
  
  // Advanced filters
  priceRange: [number, number]
  ratingRange: [number, number]
  selectedFeatures: string[]
  
  // Handlers
  onSearchChange: (query: string) => void
  onCategoryChange: (category: string) => void
  onSortChange: (sort: string) => void
  onSortByDistanceToggle: (enabled: boolean) => void
  onAdvancedFiltersToggle: (show: boolean) => void
  onPriceRangeChange: (range: [number, number]) => void
  onRatingRangeChange: (range: [number, number]) => void
  onFeaturesChange: (features: string[]) => void
  onGetUserLocation?: () => void
  onClearFilters?: () => void
}

// Utility functions
export const getPriceSymbol = (priceLevel: number): string => {
  return '$'.repeat(Math.min(Math.max(priceLevel, 1), 4))
}

export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`
  }
  return `${distance.toFixed(1)}km`
}

// Business data transformers
export const businessToBusinessListing = (business: Business) => ({
  id: business.id,
  slug: { 
    es: business.id, 
    en: business.id 
  },
  name: { 
    es: business.name, 
    en: business.nameEn || business.name 
  },
  description: { 
    es: business.description, 
    en: business.descriptionEn || business.description 
  },
  category: business.category,
  subcategory: business.subcategory,
  location: {
    address: { 
      es: business.address, 
      en: business.address 
    },
    coordinates: { 
      lat: business.coordinates[1], 
      lng: business.coordinates[0] 
    }
  },
  contact: {
    phone: business.phone,
    email: business.email,
    website: business.website,
    whatsapp: business.whatsapp
  },
  images: business.images || [],
  amenities: business.amenities || { es: [], en: [] },
  priceRange: getPriceSymbol(business.priceLevel) as '$' | '$$' | '$$$' | '$$$$',
  rating: business.rating,
  reviewCount: business.reviewCount || 0,
  isVerified: business.isVerified || false,
  acceptsCards: business.acceptsCards || false,
  hasParking: business.hasParking || false,
  hasWifi: business.hasWifi || false,
  isPetFriendly: business.isPetFriendly || false,
  operatingHours: business.operatingHours || {},
  createdAt: business.createdAt || new Date(),
  updatedAt: business.updatedAt || new Date()
})

// Interface for raw business listing data (API format)
interface BusinessListing {
  id: string
  name: {
    es: string
    en: string
  }
  category: Business['category']
  subcategory?: string
  location: {
    coordinates: {
      lng: number
      lat: number
    }
    address: {
      es: string
      en?: string
    }
  }
  description: {
    es: string
    en: string
  }
  contact: {
    phone?: string
    website?: string
    email?: string
    whatsapp?: string
  }
  rating: number
  priceRange?: string
  images?: string[]
  amenities?: {
    es: string[]
    en: string[]
  }
  isVerified?: boolean
  acceptsCards?: boolean
  hasParking?: boolean
  hasWifi?: boolean
  isPetFriendly?: boolean
  operatingHours?: Business['operatingHours']
  createdAt?: Date
  updatedAt?: Date
  reviewCount?: number
}

export const businessListingToBusiness = (listing: BusinessListing): Business => ({
  id: listing.id,
  name: listing.name.es,
  nameEn: listing.name.en,
  category: listing.category,
  subcategory: listing.subcategory,
  coordinates: [listing.location.coordinates.lng, listing.location.coordinates.lat],
  rating: listing.rating,
  priceLevel: listing.priceRange ? listing.priceRange.length : 2,
  description: listing.description.es,
  descriptionEn: listing.description.en,
  address: listing.location.address.es,
  phone: listing.contact.phone,
  website: listing.contact.website,
  email: listing.contact.email,
  whatsapp: listing.contact.whatsapp,
  images: listing.images,
  amenities: listing.amenities,
  featured: listing.isVerified,
  isVerified: listing.isVerified,
  acceptsCards: listing.acceptsCards,
  hasParking: listing.hasParking,
  hasWifi: listing.hasWifi,
  isPetFriendly: listing.isPetFriendly,
  operatingHours: listing.operatingHours,
  createdAt: listing.createdAt,
  updatedAt: listing.updatedAt,
  reviewCount: listing.reviewCount,
  tags: listing.amenities?.es || []
})