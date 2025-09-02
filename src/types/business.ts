export interface BusinessListing {
  id: string
  slug: {
    es: string
    en: string
  }
  name: {
    es: string
    en: string
  }
  description: {
    es: string
    en: string
  }
  category: 'hotel' | 'restaurant' | 'experience' | 'service' | 'shop'
  subcategory?: string
  location: {
    address: {
      es: string
      en: string
    }
    coordinates: {
      lat: number
      lng: number
    }
    neighborhood?: string
  }
  contact: {
    phone?: string
    email?: string
    website?: string
    whatsapp?: string
  }
  images: string[]
  amenities: {
    es: string[]
    en: string[]
  }
  priceRange: '$' | '$$' | '$$$' | '$$$$'
  rating: number
  reviewCount: number
  isVerified: boolean
  acceptsCards: boolean
  hasParking: boolean
  hasWifi: boolean
  isPetFriendly: boolean
  operatingHours: {
    [key: string]: {
      open: string
      close: string
      closed?: boolean
    }
  }
  createdAt: Date
  updatedAt: Date
}

export interface BusinessCategory {
  id: string
  name: {
    es: string
    en: string
  }
  slug: {
    es: string
    en: string
  }
  description: {
    es: string
    en: string
  }
  subcategories?: BusinessCategory[]
}

export interface BusinessFilters {
  category?: string
  subcategory?: string
  priceRange?: string[]
  rating?: number
  amenities?: string[]
  location?: string
  acceptsCards?: boolean
  hasParking?: boolean
  hasWifi?: boolean
  isPetFriendly?: boolean
  isOpen?: boolean
}