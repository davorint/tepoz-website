import { BusinessListing, BusinessCategory } from '@/types/business'

// Sample business categories
export const businessCategories: BusinessCategory[] = [
  {
    id: 'hotels',
    name: { es: 'Hoteles', en: 'Hotels' },
    slug: { es: 'hoteles', en: 'hotels' },
    description: { 
      es: 'Alojamiento cómodo y auténtico en Tepoztlán', 
      en: 'Comfortable and authentic accommodation in Tepoztlán' 
    },
    subcategories: [
      {
        id: 'luxury',
        name: { es: 'Lujo', en: 'Luxury' },
        slug: { es: 'lujo', en: 'luxury' },
        description: { es: 'Hoteles de lujo', en: 'Luxury hotels' }
      },
      {
        id: 'boutique',
        name: { es: 'Boutique', en: 'Boutique' },
        slug: { es: 'boutique', en: 'boutique' },
        description: { es: 'Hoteles boutique únicos', en: 'Unique boutique hotels' }
      }
    ]
  },
  {
    id: 'restaurants',
    name: { es: 'Restaurantes', en: 'Restaurants' },
    slug: { es: 'restaurantes', en: 'restaurants' },
    description: { 
      es: 'Gastronomía tradicional y contemporánea', 
      en: 'Traditional and contemporary gastronomy' 
    },
    subcategories: [
      {
        id: 'mexican-traditional',
        name: { es: 'Mexicana Tradicional', en: 'Traditional Mexican' },
        slug: { es: 'mexicana-tradicional', en: 'mexican-traditional' },
        description: { es: 'Auténtica comida mexicana', en: 'Authentic Mexican cuisine' }
      },
      {
        id: 'international',
        name: { es: 'Internacional', en: 'International' },
        slug: { es: 'internacional', en: 'international' },
        description: { es: 'Cocina internacional', en: 'International cuisine' }
      }
    ]
  }
]

// Sample business listings
export const sampleBusinesses: BusinessListing[] = [
  {
    id: 'casa-fernanda',
    slug: { es: 'casa-fernanda', en: 'casa-fernanda' },
    name: { es: 'Casa Fernanda', en: 'Casa Fernanda' },
    description: {
      es: 'Hotel boutique con arquitectura colonial y jardines exuberantes en el corazón de Tepoztlán.',
      en: 'Boutique hotel with colonial architecture and lush gardens in the heart of Tepoztlán.'
    },
    category: 'hotel',
    subcategory: 'boutique',
    location: {
      address: {
        es: 'Calle Paraíso 6, Centro, Tepoztlán, Morelos',
        en: 'Paraíso Street 6, Downtown, Tepoztlán, Morelos'
      },
      coordinates: { lat: 18.9847, lng: -99.0947 },
      neighborhood: 'Centro'
    },
    contact: {
      phone: '+52 739 395 0000',
      email: 'info@casafernanda.com',
      website: 'https://casafernanda.com'
    },
    images: ['/images/casa-fernanda-1.jpg', '/images/casa-fernanda-2.jpg'],
    amenities: {
      es: ['WiFi gratuito', 'Estacionamiento', 'Jardín', 'Terraza', 'Desayuno incluido'],
      en: ['Free WiFi', 'Parking', 'Garden', 'Terrace', 'Breakfast included']
    },
    priceRange: '$$$',
    rating: 4.8,
    reviewCount: 124,
    isVerified: true,
    acceptsCards: true,
    hasParking: true,
    hasWifi: true,
    isPetFriendly: false,
    operatingHours: {
      monday: { open: '00:00', close: '23:59' },
      tuesday: { open: '00:00', close: '23:59' },
      wednesday: { open: '00:00', close: '23:59' },
      thursday: { open: '00:00', close: '23:59' },
      friday: { open: '00:00', close: '23:59' },
      saturday: { open: '00:00', close: '23:59' },
      sunday: { open: '00:00', close: '23:59' }
    },
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-12-01')
  },
  {
    id: 'la-cocina-de-maria',
    slug: { es: 'la-cocina-de-maria', en: 'marias-kitchen' },
    name: { es: 'La Cocina de María', en: 'María\'s Kitchen' },
    description: {
      es: 'Restaurante familiar que ofrece auténtica comida casera mexicana con ingredientes orgánicos locales.',
      en: 'Family restaurant offering authentic Mexican home cooking with local organic ingredients.'
    },
    category: 'restaurant',
    subcategory: 'mexican-traditional',
    location: {
      address: {
        es: 'Av. Tepozteco 15, Centro, Tepoztlán, Morelos',
        en: 'Tepozteco Avenue 15, Downtown, Tepoztlán, Morelos'
      },
      coordinates: { lat: 18.9851, lng: -99.0943 },
      neighborhood: 'Centro'
    },
    contact: {
      phone: '+52 739 395 0101',
      whatsapp: '+52 739 395 0101'
    },
    images: ['/images/cocina-maria-1.jpg', '/images/cocina-maria-2.jpg'],
    amenities: {
      es: ['Terraza', 'Comida vegana', 'Ingredientes orgánicos'],
      en: ['Terrace', 'Vegan options', 'Organic ingredients']
    },
    priceRange: '$$',
    rating: 4.6,
    reviewCount: 89,
    isVerified: true,
    acceptsCards: false,
    hasParking: false,
    hasWifi: true,
    isPetFriendly: true,
    operatingHours: {
      monday: { closed: true },
      tuesday: { open: '08:00', close: '18:00' },
      wednesday: { open: '08:00', close: '18:00' },
      thursday: { open: '08:00', close: '18:00' },
      friday: { open: '08:00', close: '21:00' },
      saturday: { open: '08:00', close: '21:00' },
      sunday: { open: '08:00', close: '18:00' }
    },
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2024-11-28')
  }
]

// Business data service
export class BusinessService {
  static async getBusinessById(id: string): Promise<BusinessListing | null> {
    return sampleBusinesses.find(business => business.id === id) || null
  }

  static async getBusinessBySlug(slug: string, lang: 'es' | 'en'): Promise<BusinessListing | null> {
    return sampleBusinesses.find(business => 
      business.slug[lang] === slug || 
      business.slug.es === slug || 
      business.slug.en === slug
    ) || null
  }

  static async getBusinessesByCategory(
    category: string, 
    subcategory?: string,
    lang: 'es' | 'en' = 'es'
  ): Promise<BusinessListing[]> {
    return sampleBusinesses.filter(business => {
      const matchesCategory = business.category === category
      const matchesSubcategory = !subcategory || business.subcategory === subcategory
      return matchesCategory && matchesSubcategory
    })
  }

  static async searchBusinesses(
    query: string, 
    lang: 'es' | 'en' = 'es'
  ): Promise<BusinessListing[]> {
    const lowerQuery = query.toLowerCase()
    return sampleBusinesses.filter(business => 
      business.name[lang].toLowerCase().includes(lowerQuery) ||
      business.description[lang].toLowerCase().includes(lowerQuery) ||
      business.amenities[lang].some(amenity => 
        amenity.toLowerCase().includes(lowerQuery)
      )
    )
  }

  static async getAllBusinessSlugs(): Promise<Array<{ slug: string; lang: 'es' | 'en' }>> {
    const slugs: Array<{ slug: string; lang: 'es' | 'en' }> = []
    
    sampleBusinesses.forEach(business => {
      slugs.push({ slug: business.slug.es, lang: 'es' })
      slugs.push({ slug: business.slug.en, lang: 'en' })
    })
    
    return slugs
  }
}