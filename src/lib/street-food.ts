import { Locale } from './i18n'

export interface StreetFood {
  id: string
  name: {
    es: string
    en: string
  }
  description: {
    es: string
    en: string
  }
  type: {
    es: string
    en: string
  }
  venueType: 'street-cart' | 'market-stall' | 'food-truck' | 'tianguis' | 'plaza'
  priceRange: '$' | '$$' | '$$$' | '$$$$'
  rating: number
  reviewCount: number
  images: string[]
  location: {
    es: string
    en: string
  }
  coordinates: [number, number] // [longitude, latitude]
  phone?: string
  hours: {
    es: string
    en: string
  }
  specialties: {
    es: string[]
    en: string[]
  }
  dietary: ('vegetarian' | 'vegan' | 'gluten-free' | 'spicy')[]
  verified: boolean
  featured: boolean
  cashOnly: boolean
  spicyLevel: 1 | 2 | 3 | 4 | 5
  localFavorite: boolean
}

export const mockStreetFoods: StreetFood[] = [
  {
    id: '1',
    name: {
      es: 'Tacos de Doña Carmen',
      en: 'Doña Carmen\'s Tacos'
    },
    description: {
      es: 'Los mejores tacos al pastor de Tepoztlán, preparados en trompo tradicional con carne marinada 24 horas y tortillas hechas a mano.',
      en: 'The best tacos al pastor in Tepoztlán, prepared on traditional trompo with 24-hour marinated meat and handmade tortillas.'
    },
    type: {
      es: 'Tacos',
      en: 'Tacos'
    },
    venueType: 'street-cart',
    priceRange: '$',
    rating: 4.9,
    reviewCount: 892,
    images: [
      'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    location: {
      es: 'Esquina de Av. 5 de Mayo y Revolución',
      en: 'Corner of 5 de Mayo Ave and Revolución'
    },
    coordinates: [-99.0955, 18.9851],
    phone: '+52 777 123 4567',
    hours: {
      es: 'Mar-Dom: 18:00-01:00',
      en: 'Tue-Sun: 6:00 PM-1:00 AM'
    },
    specialties: {
      es: ['Tacos al Pastor', 'Tacos de Suadero', 'Quesadillas', 'Salsas Artesanales'],
      en: ['Tacos al Pastor', 'Suadero Tacos', 'Quesadillas', 'Artisan Salsas']
    },
    dietary: ['spicy'],
    verified: true,
    featured: true,
    cashOnly: true,
    spicyLevel: 4,
    localFavorite: true
  },
  {
    id: '2',
    name: {
      es: 'Elotes y Esquites La Michoacana',
      en: 'La Michoacana Corn Stand'
    },
    description: {
      es: 'Tradicionales elotes y esquites preparados con ingredientes frescos: mayo, chile piquín, queso y limón. Una experiencia auténtica mexicana.',
      en: 'Traditional corn on the cob and corn cups prepared with fresh ingredients: mayo, chili powder, cheese and lime. An authentic Mexican experience.'
    },
    type: {
      es: 'Elotes y Esquites',
      en: 'Corn & Corn Cups'
    },
    venueType: 'street-cart',
    priceRange: '$',
    rating: 4.7,
    reviewCount: 234,
    images: [
      'https://images.unsplash.com/photo-1614213007194-21450a6a3751?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574343635028-462c1b68578b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    location: {
      es: 'Plaza Principal, junto al kiosco',
      en: 'Main Plaza, next to the kiosk'
    },
    coordinates: [-99.0940, 18.9847],
    hours: {
      es: 'Vie-Dom: 16:00-22:00',
      en: 'Fri-Sun: 4:00 PM-10:00 PM'
    },
    specialties: {
      es: ['Elote con Mayo', 'Esquites con Queso', 'Elote Asado', 'Combinaciones Especiales'],
      en: ['Corn with Mayo', 'Corn Cup with Cheese', 'Grilled Corn', 'Special Combinations']
    },
    dietary: ['vegetarian', 'gluten-free'],
    verified: true,
    featured: false,
    cashOnly: true,
    spicyLevel: 2,
    localFavorite: true
  },
  {
    id: '3',
    name: {
      es: 'Quesadillas de Flor Los Compadres',
      en: 'Los Compadres Flower Quesadillas'
    },
    description: {
      es: 'Quesadillas artesanales con flor de calabaza, huitlacoche, quelites y otros ingredientes locales frescos. Tortillas de masa azul hechas al momento.',
      en: 'Artisan quesadillas with squash blossoms, huitlacoche, quelites and other fresh local ingredients. Blue corn tortillas made to order.'
    },
    type: {
      es: 'Quesadillas',
      en: 'Quesadillas'
    },
    venueType: 'market-stall',
    priceRange: '$',
    rating: 4.8,
    reviewCount: 445,
    images: [
      'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    location: {
      es: 'Mercado Municipal, Puesto 15',
      en: 'Municipal Market, Stall 15'
    },
    coordinates: [-99.0948, 18.9835],
    hours: {
      es: 'Mar-Dom: 9:00-17:00',
      en: 'Tue-Sun: 9:00 AM-5:00 PM'
    },
    specialties: {
      es: ['Quesadilla de Flor de Calabaza', 'Quesadilla de Huitlacoche', 'Quesadilla de Quelites', 'Salsas Verdes'],
      en: ['Squash Blossom Quesadilla', 'Huitlacoche Quesadilla', 'Quelites Quesadilla', 'Green Salsas']
    },
    dietary: ['vegetarian'],
    verified: true,
    featured: true,
    cashOnly: true,
    spicyLevel: 3,
    localFavorite: true
  },
  {
    id: '4',
    name: {
      es: 'Churros Don Pepe',
      en: 'Don Pepe\'s Churros'
    },
    description: {
      es: 'Churros tradicionales recién hechos, crujientes por fuera y suaves por dentro. Servidos con cajeta, chocolate caliente o azúcar y canela.',
      en: 'Traditional freshly made churros, crispy on the outside and soft inside. Served with cajeta, hot chocolate or sugar and cinnamon.'
    },
    type: {
      es: 'Postres',
      en: 'Desserts'
    },
    venueType: 'street-cart',
    priceRange: '$',
    rating: 4.6,
    reviewCount: 178,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571167781600-9113f8eed2d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    location: {
      es: 'Parque Nacional El Tepozteco, entrada',
      en: 'Tepozteco National Park, entrance'
    },
    coordinates: [-99.1001, 18.9889],
    hours: {
      es: 'Sáb-Dom: 10:00-18:00',
      en: 'Sat-Sun: 10:00 AM-6:00 PM'
    },
    specialties: {
      es: ['Churros con Cajeta', 'Churros con Chocolate', 'Churros Rellenos', 'Chocolate Caliente'],
      en: ['Churros with Cajeta', 'Churros with Chocolate', 'Filled Churros', 'Hot Chocolate']
    },
    dietary: ['vegetarian'],
    verified: true,
    featured: false,
    cashOnly: true,
    spicyLevel: 1,
    localFavorite: false
  },
  {
    id: '5',
    name: {
      es: 'Tamales La Abuela Rosa',
      en: 'Grandma Rosa\'s Tamales'
    },
    description: {
      es: 'Tamales caseros preparados con recetas familiares de más de 50 años. Masa suave y rellenos tradicionales envueltos en hojas de maíz.',
      en: 'Homemade tamales prepared with family recipes over 50 years old. Soft dough and traditional fillings wrapped in corn husks.'
    },
    type: {
      es: 'Tamales',
      en: 'Tamales'
    },
    venueType: 'tianguis',
    priceRange: '$',
    rating: 4.8,
    reviewCount: 312,
    images: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1630873478543-9c4a14c6ecb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    location: {
      es: 'Tianguis del Miércoles, Calle Matamoros',
      en: 'Wednesday Market, Matamoros Street'
    },
    coordinates: [-99.0962, 18.9841],
    phone: '+52 777 987 6543',
    hours: {
      es: 'Mié: 6:00-14:00',
      en: 'Wed: 6:00 AM-2:00 PM'
    },
    specialties: {
      es: ['Tamales de Pollo', 'Tamales de Rajas con Queso', 'Tamales Dulces', 'Atole de Masa'],
      en: ['Chicken Tamales', 'Cheese & Pepper Tamales', 'Sweet Tamales', 'Masa Atole']
    },
    dietary: ['gluten-free'],
    verified: true,
    featured: true,
    cashOnly: true,
    spicyLevel: 2,
    localFavorite: true
  },
  {
    id: '6',
    name: {
      es: 'Agua Fresca El Oasis',
      en: 'El Oasis Fresh Waters'
    },
    description: {
      es: 'Refrescantes aguas frescas preparadas con frutas de temporada y endulzadas naturalmente. Perfectas para el clima cálido de Tepoztlán.',
      en: 'Refreshing fresh waters prepared with seasonal fruits and naturally sweetened. Perfect for Tepoztlán\'s warm weather.'
    },
    type: {
      es: 'Bebidas',
      en: 'Beverages'
    },
    venueType: 'street-cart',
    priceRange: '$',
    rating: 4.5,
    reviewCount: 156,
    images: [
      'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    location: {
      es: 'Centro Histórico, varias ubicaciones',
      en: 'Historic Center, various locations'
    },
    coordinates: [-99.0940, 18.9847],
    hours: {
      es: 'Lun-Dom: 10:00-20:00',
      en: 'Mon-Sun: 10:00 AM-8:00 PM'
    },
    specialties: {
      es: ['Agua de Jamaica', 'Agua de Horchata', 'Agua de Tamarindo', 'Agua de Limón con Chía'],
      en: ['Hibiscus Water', 'Horchata Water', 'Tamarind Water', 'Lime Chia Water']
    },
    dietary: ['vegan', 'gluten-free'],
    verified: true,
    featured: false,
    cashOnly: true,
    spicyLevel: 1,
    localFavorite: false
  }
]

// Filter options
export const streetFoodTypes = [
  { id: 'all', es: 'Todos', en: 'All' },
  { id: 'tacos', es: 'Tacos', en: 'Tacos' },
  { id: 'quesadillas', es: 'Quesadillas', en: 'Quesadillas' },
  { id: 'antojitos', es: 'Antojitos', en: 'Snacks' },
  { id: 'desserts', es: 'Postres', en: 'Desserts' },
  { id: 'beverages', es: 'Bebidas', en: 'Beverages' },
  { id: 'tamales', es: 'Tamales', en: 'Tamales' },
  { id: 'corn', es: 'Elotes y Esquites', en: 'Corn & Corn Cups' }
]

export const venueTypes = [
  { id: 'all', es: 'Todos', en: 'All' },
  { id: 'street-cart', es: 'Carrito Callejero', en: 'Street Cart' },
  { id: 'market-stall', es: 'Puesto de Mercado', en: 'Market Stall' },
  { id: 'food-truck', es: 'Food Truck', en: 'Food Truck' },
  { id: 'tianguis', es: 'Tianguis', en: 'Street Market' },
  { id: 'plaza', es: 'Plaza', en: 'Plaza' }
]

export const priceRanges = [
  { id: 'all', symbol: '', es: 'Todos', en: 'All' },
  { id: '$', symbol: '$', es: 'Económico (< $50)', en: 'Budget (< $50)' },
  { id: '$$', symbol: '$$', es: 'Moderado ($50-100)', en: 'Moderate ($50-100)' },
  { id: '$$$', symbol: '$$$', es: 'Alto ($100-200)', en: 'High ($100-200)' },
  { id: '$$$$', symbol: '$$$$', es: 'Premium (> $200)', en: 'Premium (> $200)' }
]

// Service class
export class StreetFoodService {
  static getAllStreetFoods(): StreetFood[] {
    return mockStreetFoods
  }

  static getStreetFoodById(id: string): StreetFood | undefined {
    return mockStreetFoods.find(streetFood => streetFood.id === id)
  }

  static searchStreetFoods(
    query: string = '',
    type: string = 'all',
    venue: string = 'all',
    priceRange: string = 'all',
    dietary: string[] = []
  ): StreetFood[] {
    let filtered = mockStreetFoods

    // Text search
    if (query) {
      const searchLower = query.toLowerCase()
      filtered = filtered.filter(streetFood => 
        streetFood.name.es.toLowerCase().includes(searchLower) ||
        streetFood.name.en.toLowerCase().includes(searchLower) ||
        streetFood.description.es.toLowerCase().includes(searchLower) ||
        streetFood.description.en.toLowerCase().includes(searchLower) ||
        streetFood.type.es.toLowerCase().includes(searchLower) ||
        streetFood.type.en.toLowerCase().includes(searchLower) ||
        streetFood.specialties.es.some(specialty => specialty.toLowerCase().includes(searchLower)) ||
        streetFood.specialties.en.some(specialty => specialty.toLowerCase().includes(searchLower))
      )
    }

    // Type filter
    if (type !== 'all') {
      filtered = filtered.filter(streetFood => {
        const typeEn = streetFood.type.en.toLowerCase()
        switch (type) {
          case 'tacos':
            return typeEn.includes('taco')
          case 'quesadillas':
            return typeEn.includes('quesadilla')
          case 'antojitos':
            return typeEn.includes('snack') || typeEn.includes('antojito')
          case 'desserts':
            return typeEn.includes('dessert') || typeEn.includes('churro')
          case 'beverages':
            return typeEn.includes('beverage') || typeEn.includes('drink') || typeEn.includes('water')
          case 'tamales':
            return typeEn.includes('tamal')
          case 'corn':
            return typeEn.includes('corn')
          default:
            return true
        }
      })
    }

    // Venue filter
    if (venue !== 'all') {
      filtered = filtered.filter(streetFood => streetFood.venueType === venue)
    }

    // Price range filter
    if (priceRange !== 'all') {
      filtered = filtered.filter(streetFood => streetFood.priceRange === priceRange)
    }

    // Dietary filter
    if (dietary.length > 0) {
      filtered = filtered.filter(streetFood => 
        dietary.some(diet => streetFood.dietary.includes(diet as 'vegetarian' | 'vegan' | 'gluten-free' | 'spicy'))
      )
    }

    return filtered
  }

  static getStreetFoodName(streetFood: StreetFood, locale: Locale): string {
    return streetFood.name[locale]
  }

  static getStreetFoodDescription(streetFood: StreetFood, locale: Locale): string {
    return streetFood.description[locale]
  }

  static getStreetFoodType(streetFood: StreetFood, locale: Locale): string {
    return streetFood.type[locale]
  }

  static getStreetFoodLocation(streetFood: StreetFood, locale: Locale): string {
    return streetFood.location[locale]
  }

  static getStreetFoodHours(streetFood: StreetFood, locale: Locale): string {
    return streetFood.hours[locale]
  }

  static getStreetFoodSpecialties(streetFood: StreetFood, locale: Locale): string[] {
    return streetFood.specialties[locale]
  }

  static getFeaturedStreetFoods(): StreetFood[] {
    return mockStreetFoods.filter(streetFood => streetFood.featured)
  }

  static getLocalFavorites(): StreetFood[] {
    return mockStreetFoods.filter(streetFood => streetFood.localFavorite)
  }
}