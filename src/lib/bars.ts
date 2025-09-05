import { Locale } from './i18n'

export interface Bar {
  id: string
  name: {
    es: string
    en: string
  }
  description: {
    es: string
    en: string
  }
  type: 'bar' | 'pulqueria' | 'cantina' | 'mezcaleria' | 'cocktail-bar' | 'sports-bar'
  priceRange: '$' | '$$' | '$$$' | '$$$$'
  rating: number
  reviewCount: number
  images: string[]
  address: {
    es: string
    en: string
  }
  coordinates: [number, number] // [longitude, latitude]
  phone?: string
  website?: string
  email?: string
  hours: {
    es: string
    en: string
  }
  amenities: string[]
  specialties: {
    es: string[]
    en: string[]
  }
  atmosphere: 'casual' | 'upscale' | 'traditional' | 'modern' | 'rustic' | 'party'
  drinks: ('beer' | 'wine' | 'cocktails' | 'pulque' | 'mezcal' | 'tequila' | 'craft-beer' | 'champagne')[]
  verified: boolean
  featured: boolean
  liveMusic: boolean
  danceFloor: boolean
  outdoorSeating: boolean
  parking: boolean
  wifi: boolean
  acceptsCards: boolean
  ageRestriction: boolean
  smokingArea: boolean
  happyHour?: {
    es: string
    en: string
  }
}

export const barTypes = [
  { id: 'all', es: 'Todos', en: 'All' },
  { id: 'bar', es: 'Bar', en: 'Bar' },
  { id: 'pulqueria', es: 'Pulquería', en: 'Pulqueria' },
  { id: 'cantina', es: 'Cantina', en: 'Cantina' },
  { id: 'mezcaleria', es: 'Mezcalería', en: 'Mezcal Bar' },
  { id: 'cocktail-bar', es: 'Bar de Cócteles', en: 'Cocktail Bar' },
  { id: 'sports-bar', es: 'Bar Deportivo', en: 'Sports Bar' }
]

export const atmosphereTypes = [
  { id: 'all', es: 'Todos', en: 'All' },
  { id: 'casual', es: 'Casual', en: 'Casual' },
  { id: 'upscale', es: 'Elegante', en: 'Upscale' },
  { id: 'traditional', es: 'Tradicional', en: 'Traditional' },
  { id: 'modern', es: 'Moderno', en: 'Modern' },
  { id: 'rustic', es: 'Rústico', en: 'Rustic' },
  { id: 'party', es: 'Fiesta', en: 'Party' }
]

export const drinkTypes = [
  { id: 'beer', es: 'Cerveza', en: 'Beer' },
  { id: 'wine', es: 'Vino', en: 'Wine' },
  { id: 'cocktails', es: 'Cócteles', en: 'Cocktails' },
  { id: 'pulque', es: 'Pulque', en: 'Pulque' },
  { id: 'mezcal', es: 'Mezcal', en: 'Mezcal' },
  { id: 'tequila', es: 'Tequila', en: 'Tequila' },
  { id: 'craft-beer', es: 'Cerveza Artesanal', en: 'Craft Beer' }
]

export const priceRanges = [
  { id: 'all', es: 'Todos', en: 'All', symbol: '' },
  { id: '$', es: 'Económico', en: 'Budget', symbol: '$' },
  { id: '$$', es: 'Moderado', en: 'Moderate', symbol: '$$' },
  { id: '$$$', es: 'Premium', en: 'Premium', symbol: '$$$' },
  { id: '$$$$', es: 'Lujo', en: 'Luxury', symbol: '$$$$' }
]

export const mockBars: Bar[] = [
  {
    id: '1',
    name: {
      es: 'La Pulquería Los Amantes',
      en: 'Los Amantes Pulqueria'
    },
    description: {
      es: 'Auténtica pulquería tradicional con más de 50 años de historia. Ofrecemos pulque natural y curados artesanales en un ambiente bohemio y cultural.',
      en: 'Authentic traditional pulqueria with over 50 years of history. We offer natural pulque and artisanal flavored varieties in a bohemian cultural atmosphere.'
    },
    type: 'pulqueria',
    priceRange: '$',
    rating: 4.7,
    reviewCount: 892,
    images: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    address: {
      es: 'Calle 5 de Mayo 23, Centro',
      en: '5 de Mayo St 23, Downtown'
    },
    coordinates: [-99.0950, 18.9841],
    phone: '+52 777 395 2345',
    hours: {
      es: 'Mar-Dom: 12:00-22:00',
      en: 'Tue-Sun: 12:00 PM-10:00 PM'
    },
    amenities: ['live-music', 'cultural-events', 'traditional-games'],
    specialties: {
      es: ['Pulque Natural', 'Curado de Guayaba', 'Curado de Piñón', 'Curado de Apio'],
      en: ['Natural Pulque', 'Guava Pulque', 'Pine Nut Pulque', 'Celery Pulque']
    },
    atmosphere: 'traditional',
    drinks: ['pulque'],
    verified: true,
    featured: true,
    liveMusic: true,
    danceFloor: false,
    outdoorSeating: true,
    parking: false,
    wifi: false,
    acceptsCards: false,
    ageRestriction: true,
    smokingArea: true,
    happyHour: {
      es: 'Lun-Vie: 14:00-17:00',
      en: 'Mon-Fri: 2:00 PM-5:00 PM'
    }
  },
  {
    id: '2',
    name: {
      es: 'Mezcalería El Coyote',
      en: 'El Coyote Mezcal Bar'
    },
    description: {
      es: 'Bar especializado en mezcales artesanales de Oaxaca y Guerrero. Más de 100 etiquetas diferentes y maridajes con sal de gusano y chapulines.',
      en: 'Bar specialized in artisanal mezcals from Oaxaca and Guerrero. Over 100 different labels and pairings with worm salt and grasshoppers.'
    },
    type: 'mezcaleria',
    priceRange: '$$$',
    rating: 4.9,
    reviewCount: 567,
    images: [
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    address: {
      es: 'Av. Revolución 45, La Santísima',
      en: 'Revolution Ave 45, La Santisima'
    },
    coordinates: [-99.0932, 18.9856],
    phone: '+52 777 395 6789',
    website: 'www.mezcaleriaelcoyote.com',
    email: 'info@mezcaleriaelcoyote.com',
    hours: {
      es: 'Mie-Dom: 17:00-02:00',
      en: 'Wed-Sun: 5:00 PM-2:00 AM'
    },
    amenities: ['terrace', 'tasting-room', 'private-events'],
    specialties: {
      es: ['Mezcal Tobalá', 'Mezcal Pechuga', 'Cócteles de Mezcal', 'Degustación Guiada'],
      en: ['Tobala Mezcal', 'Pechuga Mezcal', 'Mezcal Cocktails', 'Guided Tasting']
    },
    atmosphere: 'upscale',
    drinks: ['mezcal', 'cocktails', 'wine'],
    verified: true,
    featured: true,
    liveMusic: false,
    danceFloor: false,
    outdoorSeating: true,
    parking: true,
    wifi: true,
    acceptsCards: true,
    ageRestriction: true,
    smokingArea: true
  },
  {
    id: '3',
    name: {
      es: 'Bar La Cueva',
      en: 'La Cueva Bar'
    },
    description: {
      es: 'Bar temático ubicado en una cueva natural. Música en vivo todos los fines de semana, especializado en rock y jazz. Amplia selección de cervezas artesanales.',
      en: 'Themed bar located in a natural cave. Live music every weekend, specialized in rock and jazz. Wide selection of craft beers.'
    },
    type: 'bar',
    priceRange: '$$',
    rating: 4.6,
    reviewCount: 1203,
    images: [
      'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    address: {
      es: 'Camino a la Cueva s/n, Valle Atongo',
      en: 'Cave Road, Valle Atongo'
    },
    coordinates: [-99.0971, 18.9823],
    phone: '+52 777 395 3456',
    website: 'www.barlacueva.mx',
    hours: {
      es: 'Jue-Dom: 18:00-03:00',
      en: 'Thu-Sun: 6:00 PM-3:00 AM'
    },
    amenities: ['stage', 'sound-system', 'pool-table', 'darts'],
    specialties: {
      es: ['Cerveza Artesanal Local', 'Cócteles de la Casa', 'Shots de Mezcal', 'Micheladas'],
      en: ['Local Craft Beer', 'House Cocktails', 'Mezcal Shots', 'Micheladas']
    },
    atmosphere: 'rustic',
    drinks: ['beer', 'craft-beer', 'cocktails', 'mezcal', 'tequila'],
    verified: true,
    featured: false,
    liveMusic: true,
    danceFloor: true,
    outdoorSeating: false,
    parking: true,
    wifi: true,
    acceptsCards: true,
    ageRestriction: true,
    smokingArea: true,
    happyHour: {
      es: 'Jue-Vie: 18:00-20:00',
      en: 'Thu-Fri: 6:00 PM-8:00 PM'
    }
  },
  {
    id: '4',
    name: {
      es: 'Cantina El Tepozteco',
      en: 'El Tepozteco Cantina'
    },
    description: {
      es: 'Cantina tradicional mexicana con más de 80 años. Botanas gratis con tu bebida, dominó, y el mejor ambiente local.',
      en: 'Traditional Mexican cantina with over 80 years. Free snacks with your drink, dominoes, and the best local atmosphere.'
    },
    type: 'cantina',
    priceRange: '$',
    rating: 4.5,
    reviewCount: 745,
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    address: {
      es: 'Portal Guerrero 12, Centro',
      en: 'Portal Guerrero 12, Downtown'
    },
    coordinates: [-99.0948, 18.9850],
    phone: '+52 777 395 1234',
    hours: {
      es: 'Lun-Sab: 11:00-23:00',
      en: 'Mon-Sat: 11:00 AM-11:00 PM'
    },
    amenities: ['traditional-games', 'jukebox', 'tv-sports'],
    specialties: {
      es: ['Cerveza de Barril', 'Tequila', 'Botanas Tradicionales', 'Cubas'],
      en: ['Draft Beer', 'Tequila', 'Traditional Snacks', 'Rum & Coke']
    },
    atmosphere: 'traditional',
    drinks: ['beer', 'tequila', 'mezcal'],
    verified: true,
    featured: false,
    liveMusic: false,
    danceFloor: false,
    outdoorSeating: false,
    parking: false,
    wifi: false,
    acceptsCards: false,
    ageRestriction: true,
    smokingArea: true
  },
  {
    id: '5',
    name: {
      es: 'Sky Bar Tepoztlán',
      en: 'Sky Bar Tepoztlan'
    },
    description: {
      es: 'Bar en azotea con vista panorámica al Tepozteco. Cócteles de autor y cocina fusion. El mejor atardecer de Tepoztlán.',
      en: 'Rooftop bar with panoramic views of Tepozteco. Signature cocktails and fusion cuisine. The best sunset in Tepoztlan.'
    },
    type: 'cocktail-bar',
    priceRange: '$$$$',
    rating: 4.8,
    reviewCount: 423,
    images: [
      'https://images.unsplash.com/photo-1536638317175-32449deccfc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587057272637-2ea0f2c6d9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    address: {
      es: 'Hotel Boutique Casa Fernanda, Piso 4',
      en: 'Casa Fernanda Boutique Hotel, 4th Floor'
    },
    coordinates: [-99.0955, 18.9842],
    phone: '+52 777 395 9999',
    website: 'www.skybartepoztlan.com',
    email: 'reservations@skybartepoztlan.com',
    hours: {
      es: 'Mie-Dom: 16:00-01:00',
      en: 'Wed-Sun: 4:00 PM-1:00 AM'
    },
    amenities: ['rooftop', 'lounge', 'vip-area', 'heaters'],
    specialties: {
      es: ['Mixología Molecular', 'Vinos Premium', 'Champagne', 'Tapas Gourmet'],
      en: ['Molecular Mixology', 'Premium Wines', 'Champagne', 'Gourmet Tapas']
    },
    atmosphere: 'upscale',
    drinks: ['cocktails', 'wine', 'champagne'],
    verified: true,
    featured: true,
    liveMusic: false,
    danceFloor: false,
    outdoorSeating: true,
    parking: true,
    wifi: true,
    acceptsCards: true,
    ageRestriction: true,
    smokingArea: true,
    happyHour: {
      es: 'Mie-Vie: 16:00-19:00',
      en: 'Wed-Fri: 4:00 PM-7:00 PM'
    }
  }
]

export class BarService {
  static getAllBars(): Bar[] {
    return [...mockBars]
  }

  static getBarById(id: string): Bar | undefined {
    return mockBars.find(bar => bar.id === id)
  }

  static getFeaturedBars(): Bar[] {
    return mockBars.filter(bar => bar.featured)
  }

  static searchBars(
    query: string,
    type: string = 'all',
    atmosphere: string = 'all',
    priceRange: string = 'all',
    drinks: string[] = []
  ): Bar[] {
    let filtered = [...mockBars]

    // Filter by search query
    if (query) {
      const searchTerm = query.toLowerCase()
      filtered = filtered.filter(bar => 
        bar.name.es.toLowerCase().includes(searchTerm) ||
        bar.name.en.toLowerCase().includes(searchTerm) ||
        bar.description.es.toLowerCase().includes(searchTerm) ||
        bar.description.en.toLowerCase().includes(searchTerm) ||
        bar.specialties.es.some(s => s.toLowerCase().includes(searchTerm)) ||
        bar.specialties.en.some(s => s.toLowerCase().includes(searchTerm))
      )
    }

    // Filter by type
    if (type && type !== 'all') {
      filtered = filtered.filter(bar => bar.type === type)
    }

    // Filter by atmosphere
    if (atmosphere && atmosphere !== 'all') {
      filtered = filtered.filter(bar => bar.atmosphere === atmosphere)
    }

    // Filter by price range
    if (priceRange && priceRange !== 'all') {
      filtered = filtered.filter(bar => bar.priceRange === priceRange)
    }

    // Filter by drinks
    if (drinks.length > 0) {
      filtered = filtered.filter(bar => 
        drinks.some(drink => bar.drinks.includes(drink as Bar['drinks'][number]))
      )
    }

    return filtered
  }

  static sortBars(bars: Bar[], sortBy: 'featured' | 'rating' | 'price' | 'name', locale: Locale = 'es'): Bar[] {
    const sorted = [...bars]

    switch (sortBy) {
      case 'featured':
        return sorted.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return b.rating - a.rating
        })
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating)
      case 'price':
        const priceOrder = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 }
        return sorted.sort((a, b) => priceOrder[a.priceRange] - priceOrder[b.priceRange])
      case 'name':
        return sorted.sort((a, b) => 
          a.name[locale].localeCompare(b.name[locale])
        )
      default:
        return sorted
    }
  }
}