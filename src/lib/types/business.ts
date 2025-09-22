import { Locale } from '../i18n'

// Generic localized text interface
export interface LocalizedText {
  es: string
  en: string
}

// Generic localized array interface
export interface LocalizedArray {
  es: string[]
  en: string[]
}

// Common price range type
export type PriceRange = '$' | '$$' | '$$$' | '$$$$'

// Common atmosphere types (can be extended by specific business types)
export type BaseAtmosphere = 'casual' | 'family' | 'traditional' | 'modern'

// Common dietary options
export type DietaryOption = 'vegetarian' | 'vegan' | 'gluten-free' | 'organic' | 'spicy'

// Base business entity interface
export interface BusinessEntity {
  id: string
  slug: string
  name: LocalizedText
  description: LocalizedText
  priceRange: PriceRange
  rating: number
  reviewCount: number
  images: string[]
  address: LocalizedText
  coordinates: [number, number] // [longitude, latitude]
  phone?: string
  website?: string
  email?: string
  hours: LocalizedText
  amenities: string[]
  specialties: LocalizedArray
  dietary: DietaryOption[]
  verified: boolean
  featured: boolean
  delivery: boolean
  parking: boolean
  wifi: boolean
  acceptsCards: boolean
}

// Restaurant-specific extensions
export interface Restaurant extends BusinessEntity {
  cuisine: LocalizedText
  atmosphere: BaseAtmosphere | 'fine-dining' | 'romantic'
  reservation: boolean
  outdoorSeating: boolean
  liveMusic: boolean
  alcoholic: boolean
}

// Bar-specific extensions
export interface Bar extends BusinessEntity {
  type: 'bar' | 'pulqueria' | 'cantina' | 'mezcaleria' | 'cocktail-bar' | 'sports-bar'
  atmosphere: BaseAtmosphere | 'upscale' | 'rustic' | 'party'
  drinks: ('beer' | 'wine' | 'cocktails' | 'pulque' | 'mezcal' | 'tequila' | 'craft-beer' | 'champagne')[]
  liveMusic: boolean
  danceFloor: boolean
  outdoorSeating: boolean
  ageRestriction: boolean
  smokingArea: boolean
  happyHour?: LocalizedText
}

// Cafe-specific extensions
export interface Cafe extends BusinessEntity {
  cafeType: LocalizedText
  atmosphere: BaseAtmosphere | 'cozy' | 'artistic' | 'minimalist' | 'rustic'
  takeaway: boolean
  outdoorSeating: boolean
  liveMusic: boolean
  studyFriendly: boolean
  petFriendly: boolean
  roastery: boolean
}

// StreetFood-specific extensions
export interface StreetFood extends BusinessEntity {
  type: LocalizedText
  venueType: 'street-cart' | 'market-stall' | 'food-truck' | 'tianguis' | 'plaza'
  location: LocalizedText
  cashOnly: boolean
  spicyLevel: 1 | 2 | 3 | 4 | 5
  localFavorite: boolean
}

// Hotel-specific extensions
export interface Hotel extends BusinessEntity {
  category: 'boutique' | 'resort' | 'eco' | 'budget' | 'luxury' | 'hostel' | 'business' | 'wellness' | 'romantic' | 'historic'
  roomTypes: Array<{
    name: LocalizedText
    capacity: number
    price: number
  }>
  features: string[]
  sustainability: boolean
  petFriendly: boolean
  adultsOnly: boolean
  location?: {
    address: LocalizedText
    neighborhood: LocalizedText
    coordinates: [number, number]
  }
  reviews?: Array<{
    id: string
    author: string
    rating: number
    comment: LocalizedText
    date: string
  }>
  contact?: {
    phone?: string
    email?: string
    website?: string
  }
}

// EcoLodge-specific extensions
export interface EcoLodge extends BusinessEntity {
  category: 'eco-resort' | 'treehouse' | 'glamping' | 'sustainable-hotel' | 'nature-retreat' | 'organic-farm'
  roomTypes: Array<{
    type: string
    price: number
    capacity: number
  }>
  features: string[]
  sustainability: boolean
  petFriendly: boolean
  adultsOnly: boolean
  organicFood: boolean
  solarPower: boolean
  waterConservation: boolean
  localMaterials: boolean
  reviews?: Array<{
    id: string
    author: string
    rating: number
    comment: string
    date: string
  }>
  location?: {
    address: string
    coordinates: [number, number]
    neighborhood?: string
  }
  contact?: {
    phone?: string
    email?: string
    website?: string
  }
}

// Rental-specific extensions
export interface Rental extends BusinessEntity {
  category: 'apartment' | 'house' | 'villa' | 'studio' | 'cabin' | 'loft'
  roomInfo: {
    bedrooms: number
    bathrooms: number
    maxGuests: number
    pricePerNight: number
  }
  features: string[]
  instantBook: boolean
  petFriendly: boolean
  familyFriendly: boolean
  workFriendly: boolean
  hasKitchen: boolean
  hasWifi: boolean
  hasParking: boolean
  reviews?: Array<{
    id: string
    author: string
    rating: number
    comment: string
    date: string
  }>
  location?: {
    address: string
    coordinates: [number, number]
    neighborhood?: string
  }
  contact?: {
    phone?: string
    email?: string
    website?: string
  }
}

// Generic filter options
export interface FilterOptions {
  query?: string
  category?: string
  atmosphere?: string
  priceRange?: string
  dietary?: string[]
  amenities?: string[]
}

// Generic sort options
export type SortOption = 'featured' | 'rating' | 'price' | 'name'

// Business page configuration
export interface BusinessPageConfig {
  type: string
  title: LocalizedText
  description: LocalizedText
  icon: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  categories: Array<{
    id: string
    es: string
    en: string
  }>
  atmosphereTypes: Array<{
    id: string
    es: string
    en: string
  }>
}

// Helper functions for business entities
export class BusinessEntityHelpers {
  static getName<T extends BusinessEntity>(entity: T, locale: Locale): string {
    return entity.name?.[locale] || entity.name?.en || 'Name not available'
  }

  static getDescription<T extends BusinessEntity>(entity: T, locale: Locale): string {
    return entity.description?.[locale] || entity.description?.en || 'Description not available'
  }

  static getAddress<T extends BusinessEntity>(entity: T, locale: Locale): string {
    return entity.address?.[locale] || entity.address?.en || 'Address not available'
  }

  static getHours<T extends BusinessEntity>(entity: T, locale: Locale): string {
    return entity.hours?.[locale] || entity.hours?.en || 'Hours not available'
  }

  static getSpecialties<T extends BusinessEntity>(entity: T, locale: Locale): string[] {
    return entity.specialties?.[locale] || entity.specialties?.en || []
  }

  static sortEntities<T extends BusinessEntity>(
    entities: T[],
    sortBy: SortOption,
    locale: Locale,
    getEntityName?: (entity: T, locale: Locale) => string
  ): T[] {
    const getName = getEntityName || ((entity, locale) => BusinessEntityHelpers.getName(entity, locale))

    return entities.sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return b.rating - a.rating
        case 'rating':
          return b.rating - a.rating
        case 'price':
          const priceOrder = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 }
          return priceOrder[a.priceRange] - priceOrder[b.priceRange]
        case 'name':
          return getName(a, locale).localeCompare(getName(b, locale))
        default:
          return 0
      }
    })
  }
}