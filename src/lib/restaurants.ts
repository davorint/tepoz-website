import { Locale } from './i18n'

export interface Restaurant {
  id: string
  slug: string
  name: {
    es: string
    en: string
  }
  description: {
    es: string
    en: string
  }
  cuisine: {
    es: string
    en: string
  }
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
  atmosphere: 'casual' | 'fine-dining' | 'family' | 'romantic' | 'traditional' | 'modern'
  dietary: ('vegetarian' | 'vegan' | 'gluten-free' | 'organic')[]
  verified: boolean
  featured: boolean
  delivery: boolean
  reservation: boolean
  outdoorSeating: boolean
  liveMusic: boolean
  parking: boolean
  wifi: boolean
  acceptsCards: boolean
  alcoholic: boolean
}

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    slug: 'la-casa-del-tepozteco',
    name: {
      es: 'La Casa del Tepozteco',
      en: 'Tepozteco House Restaurant'
    },
    description: {
      es: 'Restaurante de alta cocina mexicana con vista espectacular al cerro del Tepozteco. Especializado en platillos tradicionales con un toque contemporáneo.',
      en: 'High-end Mexican cuisine restaurant with spectacular views of Tepozteco hill. Specialized in traditional dishes with a contemporary twist.'
    },
    cuisine: {
      es: 'Mexicana Contemporánea',
      en: 'Contemporary Mexican'
    },
    priceRange: '$$$',
    rating: 4.8,
    reviewCount: 324,
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    address: {
      es: 'Av. del Tepozteco 13, Centro Histórico',
      en: 'Tepozteco Ave 13, Historic Center'
    },
    coordinates: [-99.0967, 18.9847],
    phone: '+52 777 395 0010',
    website: 'www.casadeltepozteco.com',
    email: 'reservas@casadeltepozteco.com',
    hours: {
      es: 'Lun-Dom: 8:00-22:00',
      en: 'Mon-Sun: 8:00 AM-10:00 PM'
    },
    amenities: ['terrace', 'garden', 'bar', 'private-dining'],
    specialties: {
      es: ['Mole Poblano', 'Cochinita Pibil', 'Chiles en Nogada', 'Pozole Rojo'],
      en: ['Mole Poblano', 'Cochinita Pibil', 'Chiles en Nogada', 'Red Pozole']
    },
    atmosphere: 'fine-dining',
    dietary: ['vegetarian', 'gluten-free'],
    verified: true,
    featured: true,
    delivery: false,
    reservation: true,
    outdoorSeating: true,
    liveMusic: true,
    parking: true,
    wifi: true,
    acceptsCards: true,
    alcoholic: true
  },
  {
    id: '2',
    slug: 'los-colorines',
    name: {
      es: 'Los Colorines',
      en: 'Los Colorines Traditional Restaurant'
    },
    description: {
      es: 'Auténtica cocina tradicional mexicana en un ambiente familiar. Famoso por sus platillos caseros y sus salsas artesanales preparadas con ingredientes locales.',
      en: 'Authentic traditional Mexican cuisine in a family atmosphere. Famous for homemade dishes and artisanal salsas prepared with local ingredients.'
    },
    cuisine: {
      es: 'Mexicana Tradicional',
      en: 'Traditional Mexican'
    },
    priceRange: '$$',
    rating: 4.5,
    reviewCount: 567,
    images: [
      'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606787947604-46c24704aa69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    address: {
      es: 'Av. 5 de Mayo 21, Centro',
      en: '5 de Mayo Ave 21, Downtown'
    },
    coordinates: [-99.0955, 18.9851],
    phone: '+52 777 395 1234',
    hours: {
      es: 'Lun-Dom: 7:00-21:00',
      en: 'Mon-Sun: 7:00 AM-9:00 PM'
    },
    amenities: ['family-friendly', 'traditional-music', 'patio'],
    specialties: {
      es: ['Tacos al Pastor', 'Quesadillas de Flor de Calabaza', 'Tamales Oaxaqueños', 'Agua Fresca'],
      en: ['Tacos al Pastor', 'Squash Blossom Quesadillas', 'Oaxacan Tamales', 'Fresh Water']
    },
    atmosphere: 'family',
    dietary: ['vegetarian'],
    verified: true,
    featured: true,
    delivery: true,
    reservation: false,
    outdoorSeating: true,
    liveMusic: false,
    parking: false,
    wifi: true,
    acceptsCards: true,
    alcoholic: true
  },
  {
    id: '3',
    slug: 'el-jardin-de-los-sabores',
    name: {
      es: 'El Jardín de los Sabores',
      en: 'The Garden of Flavors'
    },
    description: {
      es: 'Restaurante orgánico con ingredientes cultivados en nuestra propia huerta. Especializado en comida saludable y opciones veganas sin sacrificar el sabor.',
      en: 'Organic restaurant with ingredients grown in our own garden. Specialized in healthy food and vegan options without sacrificing flavor.'
    },
    cuisine: {
      es: 'Orgánica Vegana',
      en: 'Organic Vegan'
    },
    priceRange: '$$',
    rating: 4.6,
    reviewCount: 189,
    images: [
      'https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    address: {
      es: 'Calle Revolución 8, Barrio de la Santísima',
      en: 'Revolution St 8, Santísima Neighborhood'
    },
    coordinates: [-99.0945, 18.9835],
    phone: '+52 777 395 5678',
    website: 'www.jardinsabores.com',
    email: 'hola@jardinsabores.com',
    hours: {
      es: 'Mar-Dom: 9:00-20:00 (Cerrado Lunes)',
      en: 'Tue-Sun: 9:00 AM-8:00 PM (Closed Mondays)'
    },
    amenities: ['garden', 'organic', 'workshops', 'yoga-space'],
    specialties: {
      es: ['Bowl de Quinoa', 'Hamburguesa de Lentejas', 'Smoothie Verde', 'Ensalada de Nopales'],
      en: ['Quinoa Bowl', 'Lentil Burger', 'Green Smoothie', 'Cactus Salad']
    },
    atmosphere: 'casual',
    dietary: ['vegetarian', 'vegan', 'gluten-free', 'organic'],
    verified: true,
    featured: false,
    delivery: true,
    reservation: true,
    outdoorSeating: true,
    liveMusic: false,
    parking: false,
    wifi: true,
    acceptsCards: true,
    alcoholic: false
  },
  {
    id: '4',
    slug: 'la-terraza-del-centro',
    name: {
      es: 'La Terraza del Centro',
      en: 'Downtown Terrace Restaurant'
    },
    description: {
      es: 'Elegante restaurante con terraza panorámica en el corazón de Tepoztlán. Fusión de cocina mexicana e internacional con una carta de vinos selecta.',
      en: 'Elegant restaurant with panoramic terrace in the heart of Tepoztlán. Fusion of Mexican and international cuisine with a select wine list.'
    },
    cuisine: {
      es: 'Fusión Internacional',
      en: 'International Fusion'
    },
    priceRange: '$$$$',
    rating: 4.7,
    reviewCount: 278,
    images: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    address: {
      es: 'Plaza de Armas 1, Centro',
      en: 'Main Square 1, Downtown'
    },
    coordinates: [-99.0960, 18.9845],
    phone: '+52 777 395 9012',
    website: 'www.terrazacentro.mx',
    email: 'reservaciones@terrazacentro.mx',
    hours: {
      es: 'Mié-Lun: 18:00-24:00 (Cerrado Mar)',
      en: 'Wed-Mon: 6:00 PM-12:00 AM (Closed Tue)'
    },
    amenities: ['wine-bar', 'terrace', 'piano', 'private-events'],
    specialties: {
      es: ['Filete de Res Wagyu', 'Salmón en Costra de Hierbas', 'Risotto de Hongos', 'Tiramisú Artesanal'],
      en: ['Wagyu Beef Fillet', 'Herb-Crusted Salmon', 'Mushroom Risotto', 'Artisanal Tiramisu']
    },
    atmosphere: 'romantic',
    dietary: ['gluten-free'],
    verified: true,
    featured: true,
    delivery: false,
    reservation: true,
    outdoorSeating: true,
    liveMusic: true,
    parking: true,
    wifi: true,
    acceptsCards: true,
    alcoholic: true
  },
  {
    id: '5',
    slug: 'tacos-y-antojitos-lupita',
    name: {
      es: 'Tacos y Antojitos Lupita',
      en: 'Lupita\'s Tacos & Antojitos'
    },
    description: {
      es: 'Puesto tradicional de tacos y antojitos mexicanos. Reconocido por la autenticidad de sus sabores y la calidad de sus ingredientes frescos.',
      en: 'Traditional taco and Mexican snacks stand. Recognized for the authenticity of its flavors and the quality of its fresh ingredients.'
    },
    cuisine: {
      es: 'Comida Callejera',
      en: 'Street Food'
    },
    priceRange: '$',
    rating: 4.3,
    reviewCount: 892,
    images: [
      'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1613564834361-9436948817d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    address: {
      es: 'Mercado Municipal, Local 15',
      en: 'Municipal Market, Stall 15'
    },
    coordinates: [-99.0958, 18.9843],
    phone: '+52 777 395 3456',
    hours: {
      es: 'Lun-Sáb: 8:00-16:00 (Cerrado Dom)',
      en: 'Mon-Sat: 8:00 AM-4:00 PM (Closed Sun)'
    },
    amenities: ['market-stall', 'quick-service'],
    specialties: {
      es: ['Tacos de Carnitas', 'Quesadillas', 'Sopes', 'Huaraches'],
      en: ['Carnitas Tacos', 'Quesadillas', 'Sopes', 'Huaraches']
    },
    atmosphere: 'casual',
    dietary: [],
    verified: true,
    featured: false,
    delivery: false,
    reservation: false,
    outdoorSeating: false,
    liveMusic: false,
    parking: false,
    wifi: false,
    acceptsCards: false,
    alcoholic: false
  },
  {
    id: '6',
    slug: 'cafe-de-la-montana',
    name: {
      es: 'Café de la Montaña',
      en: 'Mountain Coffee House'
    },
    description: {
      es: 'Acogedora cafetería con café orgánico de altura cultivado en las montañas cercanas. Perfecto para desayunos y reuniones casuales.',
      en: 'Cozy coffee shop with organic high-altitude coffee grown in nearby mountains. Perfect for breakfasts and casual meetings.'
    },
    cuisine: {
      es: 'Cafetería',
      en: 'Coffee House'
    },
    priceRange: '$$',
    rating: 4.4,
    reviewCount: 156,
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559496417-e7f25cb247cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    address: {
      es: 'Avenida Tepozteco 45, Colonia Centro',
      en: 'Tepozteco Avenue 45, Downtown'
    },
    coordinates: [-99.0972, 18.9849],
    phone: '+52 777 395 7890',
    website: 'www.cafemontana.mx',
    hours: {
      es: 'Lun-Dom: 6:30-20:00',
      en: 'Mon-Sun: 6:30 AM-8:00 PM'
    },
    amenities: ['coffee-bar', 'pastries', 'co-working', 'books'],
    specialties: {
      es: ['Café Americano de Altura', 'Cappuccino', 'Croissants', 'Panini'],
      en: ['High Altitude American Coffee', 'Cappuccino', 'Croissants', 'Panini']
    },
    atmosphere: 'casual',
    dietary: ['vegetarian', 'vegan'],
    verified: true,
    featured: false,
    delivery: true,
    reservation: false,
    outdoorSeating: true,
    liveMusic: false,
    parking: false,
    wifi: true,
    acceptsCards: true,
    alcoholic: false
  }
]

export const cuisineTypes = [
  { id: 'all', es: 'Todas', en: 'All' },
  { id: 'mexicana-contemporanea', es: 'Mexicana Contemporánea', en: 'Contemporary Mexican' },
  { id: 'mexicana-tradicional', es: 'Mexicana Tradicional', en: 'Traditional Mexican' },
  { id: 'organica-vegana', es: 'Orgánica Vegana', en: 'Organic Vegan' },
  { id: 'fusion-internacional', es: 'Fusión Internacional', en: 'International Fusion' },
  { id: 'comida-callejera', es: 'Comida Callejera', en: 'Street Food' },
  { id: 'cafeteria', es: 'Cafetería', en: 'Coffee House' }
]

export const atmosphereTypes = [
  { id: 'all', es: 'Todos', en: 'All' },
  { id: 'casual', es: 'Casual', en: 'Casual' },
  { id: 'fine-dining', es: 'Alta Cocina', en: 'Fine Dining' },
  { id: 'family', es: 'Familiar', en: 'Family' },
  { id: 'romantic', es: 'Romántico', en: 'Romantic' },
  { id: 'traditional', es: 'Tradicional', en: 'Traditional' },
  { id: 'modern', es: 'Moderno', en: 'Modern' }
]

export const priceRanges = [
  { id: 'all', es: 'Todos', en: 'All', symbol: '' },
  { id: '$', es: 'Económico', en: 'Budget', symbol: '$' },
  { id: '$$', es: 'Moderado', en: 'Moderate', symbol: '$$' },
  { id: '$$$', es: 'Premium', en: 'Premium', symbol: '$$$' },
  { id: '$$$$', es: 'Lujo', en: 'Luxury', symbol: '$$$$' }
]

export class RestaurantService {
  static getAllRestaurants(): Restaurant[] {
    return mockRestaurants
  }

  static getFeaturedRestaurants(): Restaurant[] {
    return mockRestaurants.filter(restaurant => restaurant.featured)
  }

  static searchRestaurants(
    query: string = '',
    cuisine: string = 'all',
    atmosphere: string = 'all',
    priceRange: string = 'all',
    dietary: string[] = [],
    amenities: string[] = []
  ): Restaurant[] {
    return mockRestaurants.filter(restaurant => {
      const matchesQuery = !query || 
        restaurant.name.es.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.name.en.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.description.es.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.description.en.toLowerCase().includes(query.toLowerCase())

      const matchesCuisine = cuisine === 'all' || 
        restaurant.cuisine.es.toLowerCase().replace(/\s+/g, '-') === cuisine ||
        restaurant.cuisine.en.toLowerCase().replace(/\s+/g, '-') === cuisine

      const matchesAtmosphere = atmosphere === 'all' || restaurant.atmosphere === atmosphere

      const matchesPriceRange = priceRange === 'all' || restaurant.priceRange === priceRange

      const matchesDietary = dietary.length === 0 || 
        dietary.every(diet => restaurant.dietary.includes(diet as 'vegetarian' | 'vegan' | 'gluten-free' | 'organic'))

      const matchesAmenities = amenities.length === 0 ||
        amenities.every(amenity => restaurant.amenities.includes(amenity))

      return matchesQuery && matchesCuisine && matchesAtmosphere && matchesPriceRange && matchesDietary && matchesAmenities
    })
  }

  static getRestaurantById(id: string): Restaurant | undefined {
    return mockRestaurants.find(restaurant => restaurant.id === id)
  }

  static getRestaurantBySlug(slug: string): Restaurant | undefined {
    return mockRestaurants.find(restaurant => restaurant.slug === slug)
  }

  static getRestaurantName(restaurant: Restaurant, locale: Locale): string {
    return restaurant.name[locale]
  }

  static getRestaurantDescription(restaurant: Restaurant, locale: Locale): string {
    return restaurant.description[locale]
  }

  static getRestaurantCuisine(restaurant: Restaurant, locale: Locale): string {
    return restaurant.cuisine[locale]
  }

  static getRestaurantAddress(restaurant: Restaurant, locale: Locale): string {
    return restaurant.address[locale]
  }

  static getRestaurantHours(restaurant: Restaurant, locale: Locale): string {
    return restaurant.hours[locale]
  }

  static getRestaurantSpecialties(restaurant: Restaurant, locale: Locale): string[] {
    return restaurant.specialties[locale]
  }
}