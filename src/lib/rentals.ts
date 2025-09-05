import { Locale } from './i18n'

export interface Rental {
  id: string
  name: {
    es: string
    en: string
  }
  description: {
    es: string
    en: string
  }
  category: 'apartment' | 'house' | 'villa' | 'studio' | 'cabin' | 'loft'
  priceRange: '$' | '$$' | '$$$' | '$$$$'
  rating: number
  reviews: number
  images: string[]
  amenities: string[]
  roomInfo: {
    bedrooms: number
    bathrooms: number
    maxGuests: number
    pricePerNight: number
  }
  location: {
    address: string
    coordinates: [number, number]
    neighborhood: string
  }
  contact: {
    phone: string
    email: string
    website: string
  }
  features: string[]
  featured: boolean
  instantBook: boolean
  petFriendly: boolean
  familyFriendly: boolean
  workFriendly: boolean
  hasKitchen: boolean
  hasWifi: boolean
  hasParking: boolean
}

// Category types for filtering
export const rentalCategories = [
  { id: 'all', es: 'Todos', en: 'All', emoji: '🏠' },
  { id: 'apartment', es: 'Apartamento', en: 'Apartment', emoji: '🏢' },
  { id: 'house', es: 'Casa', en: 'House', emoji: '🏡' },
  { id: 'villa', es: 'Villa', en: 'Villa', emoji: '🏘️' },
  { id: 'studio', es: 'Estudio', en: 'Studio', emoji: '🏠' },
  { id: 'cabin', es: 'Cabaña', en: 'Cabin', emoji: '🏕️' },
  { id: 'loft', es: 'Loft', en: 'Loft', emoji: '🏢' }
]

// Amenity types for filtering
export const amenityTypes = [
  { id: 'all', es: 'Todas', en: 'All', emoji: '🏠' },
  { id: 'kitchen', es: 'Cocina', en: 'Kitchen', emoji: '🍳' },
  { id: 'wifi', es: 'WiFi', en: 'WiFi', emoji: '📶' },
  { id: 'parking', es: 'Estacionamiento', en: 'Parking', emoji: '🅿️' },
  { id: 'pool', es: 'Piscina', en: 'Pool', emoji: '🏊' },
  { id: 'garden', es: 'Jardín', en: 'Garden', emoji: '🌿' },
  { id: 'terrace', es: 'Terraza', en: 'Terrace', emoji: '🏡' },
  { id: 'ac', es: 'Aire Acondicionado', en: 'Air Conditioning', emoji: '❄️' },
  { id: 'heating', es: 'Calefacción', en: 'Heating', emoji: '🔥' },
  { id: 'washer', es: 'Lavadora', en: 'Washing Machine', emoji: '🧺' },
  { id: 'tv', es: 'TV', en: 'TV', emoji: '📺' },
  { id: 'fireplace', es: 'Chimenea', en: 'Fireplace', emoji: '🔥' }
]

// Price ranges for filtering
export const priceRanges = [
  { id: 'all', symbol: 'All', es: 'Todos', en: 'All Prices' },
  { id: '$', symbol: '$', es: 'Económico ($500-1000/noche)', en: 'Budget ($500-1000/night)' },
  { id: '$$', symbol: '$$', es: 'Moderado ($1000-2000/noche)', en: 'Moderate ($1000-2000/night)' },
  { id: '$$$', symbol: '$$$', es: 'Premium ($2000-4000/noche)', en: 'Premium ($2000-4000/night)' },
  { id: '$$$$', symbol: '$$$$', es: 'Lujo ($4000+/noche)', en: 'Luxury ($4000+/night)' }
]

// Sample rental data
const sampleRentals: Rental[] = [
  {
    id: 'casa-colonial-centro',
    name: {
      es: 'Casa Colonial en el Centro',
      en: 'Colonial House in Downtown'
    },
    description: {
      es: 'Hermosa casa colonial completamente restaurada en el corazón de Tepoztlán. Ideal para familias y grupos.',
      en: 'Beautiful fully restored colonial house in the heart of Tepoztlán. Perfect for families and groups.'
    },
    category: 'house',
    priceRange: '$$$',
    rating: 4.8,
    reviews: 124,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571079570759-1f0e821ad1b6?w=800&h=600&fit=crop'
    ],
    amenities: ['kitchen', 'wifi', 'parking', 'garden', 'terrace', 'ac'],
    roomInfo: {
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 8,
      pricePerNight: 2500
    },
    location: {
      address: 'Centro Histórico, Tepoztlán',
      coordinates: [19.0133, -99.0936],
      neighborhood: 'Centro'
    },
    contact: {
      phone: '+52 739 111 2222',
      email: 'colonial@tepozrentals.com',
      website: 'tepozrentals.com'
    },
    features: ['historic', 'garden', 'traditional'],
    featured: true,
    instantBook: true,
    petFriendly: false,
    familyFriendly: true,
    workFriendly: true,
    hasKitchen: true,
    hasWifi: true,
    hasParking: true
  },
  {
    id: 'villa-vista-montana',
    name: {
      es: 'Villa Vista a la Montaña',
      en: 'Mountain View Villa'
    },
    description: {
      es: 'Lujosa villa con vista panorámica al Tepozteco. Piscina privada y jardín tropical.',
      en: 'Luxurious villa with panoramic views of Tepozteco. Private pool and tropical garden.'
    },
    category: 'villa',
    priceRange: '$$$$',
    rating: 4.9,
    reviews: 89,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?w=800&h=600&fit=crop'
    ],
    amenities: ['kitchen', 'wifi', 'parking', 'pool', 'garden', 'terrace', 'ac'],
    roomInfo: {
      bedrooms: 4,
      bathrooms: 3,
      maxGuests: 10,
      pricePerNight: 4500
    },
    location: {
      address: 'Las Ventanas, Tepoztlán',
      coordinates: [19.0145, -99.0889],
      neighborhood: 'Las Ventanas'
    },
    contact: {
      phone: '+52 739 111 3333',
      email: 'villa@tepozluxury.com',
      website: 'tepozluxury.com'
    },
    features: ['luxury', 'views', 'pool'],
    featured: true,
    instantBook: false,
    petFriendly: true,
    familyFriendly: true,
    workFriendly: true,
    hasKitchen: true,
    hasWifi: true,
    hasParking: true
  },
  {
    id: 'apartamento-moderno',
    name: {
      es: 'Apartamento Moderno Céntrico',
      en: 'Modern Downtown Apartment'
    },
    description: {
      es: 'Apartamento contemporáneo completamente equipado a pasos del mercado y restaurantes.',
      en: 'Fully equipped contemporary apartment steps from market and restaurants.'
    },
    category: 'apartment',
    priceRange: '$$',
    rating: 4.6,
    reviews: 156,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
    ],
    amenities: ['kitchen', 'wifi', 'ac', 'washer', 'tv'],
    roomInfo: {
      bedrooms: 2,
      bathrooms: 1,
      maxGuests: 4,
      pricePerNight: 1200
    },
    location: {
      address: 'Av. Revolución 1910, Centro',
      coordinates: [19.0125, -99.0942],
      neighborhood: 'Centro'
    },
    contact: {
      phone: '+52 739 111 4444',
      email: 'moderno@tepozstay.com',
      website: 'tepozstay.com'
    },
    features: ['modern', 'central', 'walkable'],
    featured: false,
    instantBook: true,
    petFriendly: false,
    familyFriendly: true,
    workFriendly: true,
    hasKitchen: true,
    hasWifi: true,
    hasParking: false
  },
  {
    id: 'cabana-bosque',
    name: {
      es: 'Cabaña en el Bosque',
      en: 'Forest Cabin'
    },
    description: {
      es: 'Acogedora cabaña rodeada de naturaleza. Perfecta para una escapada romántica o retiro espiritual.',
      en: 'Cozy cabin surrounded by nature. Perfect for romantic getaway or spiritual retreat.'
    },
    category: 'cabin',
    priceRange: '$$',
    rating: 4.7,
    reviews: 78,
    images: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    ],
    amenities: ['kitchen', 'wifi', 'fireplace', 'garden', 'terrace'],
    roomInfo: {
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
      pricePerNight: 1500
    },
    location: {
      address: 'Camino al Tepozteco, Km 2',
      coordinates: [19.0178, -99.0856],
      neighborhood: 'Valle'
    },
    contact: {
      phone: '+52 739 111 5555',
      email: 'cabana@tepozescape.com',
      website: 'tepozescape.com'
    },
    features: ['nature', 'romantic', 'secluded'],
    featured: false,
    instantBook: true,
    petFriendly: true,
    familyFriendly: false,
    workFriendly: false,
    hasKitchen: true,
    hasWifi: true,
    hasParking: true
  },
  {
    id: 'loft-artistico',
    name: {
      es: 'Loft Artístico',
      en: 'Artistic Loft'
    },
    description: {
      es: 'Espacio creativo con arte local y diseño único. Ideal para artistas y creativos.',
      en: 'Creative space with local art and unique design. Ideal for artists and creatives.'
    },
    category: 'loft',
    priceRange: '$$',
    rating: 4.5,
    reviews: 92,
    images: [
      'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=800&h=600&fit=crop'
    ],
    amenities: ['kitchen', 'wifi', 'terrace', 'ac', 'washer', 'tv'],
    roomInfo: {
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 3,
      pricePerNight: 1400
    },
    location: {
      address: 'Barrio San Miguel',
      coordinates: [19.0115, -99.0925],
      neighborhood: 'San Miguel'
    },
    contact: {
      phone: '+52 739 111 6666',
      email: 'loft@tepozart.com',
      website: 'tepozart.com'
    },
    features: ['artistic', 'unique', 'creative'],
    featured: false,
    instantBook: true,
    petFriendly: false,
    familyFriendly: true,
    workFriendly: true,
    hasKitchen: true,
    hasWifi: true,
    hasParking: false
  }
]

export class RentalService {
  static getAllRentals(): Rental[] {
    return sampleRentals
  }

  static getRentalById(id: string): Rental | undefined {
    return sampleRentals.find(rental => rental.id === id)
  }

  static getRentalName(rental: Rental, locale: Locale): string {
    return rental.name[locale]
  }

  static getRentalDescription(rental: Rental, locale: Locale): string {
    return rental.description[locale]
  }

  static searchRentals(
    query: string = '',
    category: string = 'all',
    priceRange: string = 'all',
    amenities: string[] = [],
    features: {
      instantBook?: boolean,
      petFriendly?: boolean,
      familyFriendly?: boolean,
      workFriendly?: boolean
    } = {}
  ): Rental[] {
    let filtered = sampleRentals

    // Text search
    if (query.trim()) {
      const searchTerm = query.toLowerCase()
      filtered = filtered.filter(rental => 
        rental.name.es.toLowerCase().includes(searchTerm) ||
        rental.name.en.toLowerCase().includes(searchTerm) ||
        rental.description.es.toLowerCase().includes(searchTerm) ||
        rental.description.en.toLowerCase().includes(searchTerm) ||
        rental.location.neighborhood.toLowerCase().includes(searchTerm)
      )
    }

    // Category filter
    if (category && category !== 'all') {
      filtered = filtered.filter(rental => rental.category === category)
    }

    // Price range filter
    if (priceRange && priceRange !== 'all') {
      filtered = filtered.filter(rental => rental.priceRange === priceRange)
    }

    // Amenities filter
    if (amenities.length > 0) {
      filtered = filtered.filter(rental =>
        amenities.every(amenity => rental.amenities.includes(amenity))
      )
    }

    // Features filter
    if (features.instantBook !== undefined) {
      filtered = filtered.filter(rental => rental.instantBook === features.instantBook)
    }
    if (features.petFriendly !== undefined) {
      filtered = filtered.filter(rental => rental.petFriendly === features.petFriendly)
    }
    if (features.familyFriendly !== undefined) {
      filtered = filtered.filter(rental => rental.familyFriendly === features.familyFriendly)
    }
    if (features.workFriendly !== undefined) {
      filtered = filtered.filter(rental => rental.workFriendly === features.workFriendly)
    }

    return filtered
  }

  static getFeaturedRentals(): Rental[] {
    return sampleRentals.filter(rental => rental.featured)
  }

  static getRentalsByCategory(category: string): Rental[] {
    if (category === 'all') return sampleRentals
    return sampleRentals.filter(rental => rental.category === category)
  }
}