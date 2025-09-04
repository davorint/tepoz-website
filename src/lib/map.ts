import { Locale } from './i18n'

export interface BusinessLocation {
  id: string
  name: {
    es: string
    en: string
  }
  category: 'restaurant' | 'hotel' | 'bar' | 'market' | 'tour' | 'activity' | 'service'
  coordinates: [number, number] // [longitude, latitude]
  rating: number
  reviewCount: number
  priceRange: '$' | '$$' | '$$$' | '$$$$'
  address: {
    es: string
    en: string
  }
  phone?: string
  website?: string
  hours?: {
    es: string
    en: string
  }
  images?: string[]
  description?: {
    es: string
    en: string
  }
  amenities?: string[]
  verified: boolean
}

export const categoryStyles = {
  restaurant: {
    color: '#f97316', // orange-500
    emoji: '🍽️',
    name: {
      es: 'Restaurantes',
      en: 'Restaurants'
    }
  },
  hotel: {
    color: '#3b82f6', // blue-500
    emoji: '🏨',
    name: {
      es: 'Hospedajes',
      en: 'Hotels'
    }
  },
  bar: {
    color: '#8b5cf6', // violet-500
    emoji: '🍹',
    name: {
      es: 'Bares',
      en: 'Bars'
    }
  },
  market: {
    color: '#ef4444', // red-500
    emoji: '🛍️',
    name: {
      es: 'Mercados',
      en: 'Markets'
    }
  },
  tour: {
    color: '#10b981', // emerald-500
    emoji: '🗺️',
    name: {
      es: 'Tours',
      en: 'Tours'
    }
  },
  activity: {
    color: '#f59e0b', // amber-500
    emoji: '⛰️',
    name: {
      es: 'Actividades',
      en: 'Activities'
    }
  },
  service: {
    color: '#6366f1', // indigo-500
    emoji: '🛠️',
    name: {
      es: 'Servicios',
      en: 'Services'
    }
  }
} as const

// Tepoztlán center coordinates
export const TEPOZTLAN_CENTER: [number, number] = [-99.0967, 18.9847]

// Sample business data for Tepoztlán
export const mockBusinessLocations: BusinessLocation[] = [
  {
    id: '1',
    name: {
      es: 'La Casa del Tepozteco',
      en: 'Tepozteco House Restaurant'
    },
    category: 'restaurant',
    coordinates: [-99.0967, 18.9847],
    rating: 4.5,
    reviewCount: 127,
    priceRange: '$$$',
    address: {
      es: 'Av. del Tepozteco 13, Centro',
      en: 'Tepozteco Ave 13, Downtown'
    },
    phone: '+52 777 395 0010',
    hours: {
      es: '8:00 - 22:00',
      en: '8:00 AM - 10:00 PM'
    },
    description: {
      es: 'Restaurante de cocina mexicana tradicional con vista al Tepozteco',
      en: 'Traditional Mexican cuisine restaurant with Tepozteco views'
    },
    verified: true
  },
  {
    id: '2', 
    name: {
      es: 'Hotel Posada del Tepozteco',
      en: 'Tepozteco Inn Hotel'
    },
    category: 'hotel',
    coordinates: [-99.0945, 18.9851],
    rating: 4.2,
    reviewCount: 89,
    priceRange: '$$',
    address: {
      es: 'Paraíso 3, Centro',
      en: 'Paradise 3, Downtown'
    },
    phone: '+52 777 395 0323',
    website: 'www.posadadeltepozteco.com',
    description: {
      es: 'Hotel boutique en el corazón de Tepoztlán',
      en: 'Boutique hotel in the heart of Tepoztlán'
    },
    amenities: ['wifi', 'parking', 'pool', 'restaurant'],
    verified: true
  },
  {
    id: '3',
    name: {
      es: 'Bar La Sombra del Sabino',
      en: 'Sabino Shadow Bar'
    },
    category: 'bar',
    coordinates: [-99.0955, 18.9839],
    rating: 4.0,
    reviewCount: 65,
    priceRange: '$$',
    address: {
      es: 'Av. 5 de Mayo 15, Centro',
      en: '5 de Mayo Ave 15, Downtown'
    },
    hours: {
      es: '17:00 - 01:00',
      en: '5:00 PM - 1:00 AM'
    },
    description: {
      es: 'Bar tradicional con mezcal y pulque artesanal',
      en: 'Traditional bar with craft mezcal and pulque'
    },
    verified: true
  },
  {
    id: '4',
    name: {
      es: 'Mercado Municipal',
      en: 'Municipal Market'
    },
    category: 'market',
    coordinates: [-99.0960, 18.9845],
    rating: 4.3,
    reviewCount: 156,
    priceRange: '$',
    address: {
      es: 'Plaza de Armas s/n, Centro',
      en: 'Main Square, Downtown'
    },
    hours: {
      es: '6:00 - 18:00',
      en: '6:00 AM - 6:00 PM'
    },
    description: {
      es: 'Mercado tradicional con productos locales y artesanías',
      en: 'Traditional market with local products and crafts'
    },
    verified: true
  },
  {
    id: '5',
    name: {
      es: 'Tours Aventura Tepoztlán',
      en: 'Tepoztlán Adventure Tours'
    },
    category: 'tour',
    coordinates: [-99.0970, 18.9855],
    rating: 4.7,
    reviewCount: 203,
    priceRange: '$$',
    address: {
      es: 'Zaragoza 17, Centro',
      en: 'Zaragoza 17, Downtown'
    },
    phone: '+52 777 395 1234',
    website: 'www.tepoztlanadventure.com',
    description: {
      es: 'Tours guiados al Tepozteco y actividades de aventura',
      en: 'Guided tours to Tepozteco and adventure activities'
    },
    amenities: ['guide', 'transport', 'equipment'],
    verified: true
  },
  {
    id: '6',
    name: {
      es: 'Sendero del Tepozteco',
      en: 'Tepozteco Trail'
    },
    category: 'activity',
    coordinates: [-99.0980, 18.9890],
    rating: 4.8,
    reviewCount: 342,
    priceRange: '$',
    address: {
      es: 'Inicio del sendero, Valle del Atongo',
      en: 'Trailhead, Atongo Valley'
    },
    hours: {
      es: '6:00 - 17:00',
      en: '6:00 AM - 5:00 PM'
    },
    description: {
      es: 'Sendero hacia la pirámide del Tepozteco con vistas espectaculares',
      en: 'Trail to Tepozteco pyramid with spectacular views'
    },
    verified: true
  }
]

export class MapService {
  static searchBusinesses(query: string, category?: string): BusinessLocation[] {
    return mockBusinessLocations.filter(business => {
      const matchesQuery = !query || 
        business.name.es.toLowerCase().includes(query.toLowerCase()) ||
        business.name.en.toLowerCase().includes(query.toLowerCase())
      
      const matchesCategory = !category || category === 'all' || business.category === category
      
      return matchesQuery && matchesCategory
    })
  }

  static getBusinessById(id: string): BusinessLocation | undefined {
    return mockBusinessLocations.find(business => business.id === id)
  }

  static getBusinessesByCategory(category: string): BusinessLocation[] {
    if (category === 'all') return mockBusinessLocations
    return mockBusinessLocations.filter(business => business.category === category)
  }

  static getBusinessName(business: BusinessLocation, locale: Locale): string {
    return business.name[locale]
  }

  static getBusinessAddress(business: BusinessLocation, locale: Locale): string {
    return business.address[locale]
  }

  static getBusinessDescription(business: BusinessLocation, locale: Locale): string | undefined {
    return business.description?.[locale]
  }

  static getBusinessHours(business: BusinessLocation, locale: Locale): string | undefined {
    return business.hours?.[locale]
  }

  static getCategoryName(category: string, locale: Locale): string {
    const categoryData = categoryStyles[category as keyof typeof categoryStyles]
    return categoryData?.name[locale] || category
  }
}