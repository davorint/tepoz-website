import { Locale } from './i18n'

export interface Cafe {
  id: string
  name: {
    es: string
    en: string
  }
  description: {
    es: string
    en: string
  }
  cafeType: {
    es: string
    en: string
  }
  priceRange: '$' | '$$' | '$$$'
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
  atmosphere: 'cozy' | 'modern' | 'traditional' | 'artistic' | 'minimalist' | 'rustic'
  dietary: ('vegetarian' | 'vegan' | 'gluten-free' | 'organic')[]
  verified: boolean
  featured: boolean
  delivery: boolean
  takeaway: boolean
  outdoorSeating: boolean
  wifi: boolean
  liveMusic: boolean
  parking: boolean
  acceptsCards: boolean
  studyFriendly: boolean
  petFriendly: boolean
  roastery: boolean
}

// Cafe type categories
export const cafeTypes = [
  { id: 'all', es: 'Todos', en: 'All', emoji: '☕', color: 'from-amber-400 to-orange-400' },
  { id: 'specialty-coffee', es: 'Café Especialidad', en: 'Specialty Coffee', emoji: '☕', color: 'from-amber-600 to-yellow-600' },
  { id: 'traditional', es: 'Tradicional', en: 'Traditional', emoji: '🏛️', color: 'from-brown-500 to-amber-500' },
  { id: 'artisan', es: 'Artesanal', en: 'Artisan', emoji: '🎨', color: 'from-purple-500 to-pink-500' },
  { id: 'bakery-cafe', es: 'Panadería Café', en: 'Bakery Cafe', emoji: '🥐', color: 'from-orange-500 to-red-500' },
  { id: 'traditional-bakery', es: 'Panadería Tradicional', en: 'Traditional Bakery', emoji: '🍞', color: 'from-yellow-600 to-orange-600' },
  { id: 'roastery', es: 'Tostadora', en: 'Roastery', emoji: '🔥', color: 'from-red-600 to-orange-600' },
  { id: 'organic', es: 'Orgánico', en: 'Organic', emoji: '🌿', color: 'from-green-500 to-emerald-500' }
]

// Atmosphere types
export const atmosphereTypes = [
  { id: 'all', es: 'Todos', en: 'All' },
  { id: 'cozy', es: 'Acogedor', en: 'Cozy' },
  { id: 'modern', es: 'Moderno', en: 'Modern' },
  { id: 'traditional', es: 'Tradicional', en: 'Traditional' },
  { id: 'artistic', es: 'Artístico', en: 'Artistic' },
  { id: 'minimalist', es: 'Minimalista', en: 'Minimalist' },
  { id: 'rustic', es: 'Rústico', en: 'Rustic' }
]

// Price ranges
export const priceRanges = [
  { id: 'all', es: 'Todos', en: 'All' },
  { id: '$', es: 'Económico ($)', en: 'Budget ($)' },
  { id: '$$', es: 'Moderado ($$)', en: 'Moderate ($$)' },
  { id: '$$$', es: 'Premium ($$$)', en: 'Premium ($$$)' }
]

// Real Tepoztlán cafes data
const cafes: Cafe[] = [
  {
    id: 'cafe-tepoznieves',
    name: {
      es: 'Café Tepoznieves',
      en: 'Café Tepoznieves'
    },
    description: {
      es: 'Encantador café local con helados artesanales y café de especialidad en el centro histórico',
      en: 'Charming local cafe with artisan ice creams and specialty coffee in the historic center'
    },
    cafeType: {
      es: 'Café Especialidad',
      en: 'Specialty Coffee'
    },
    priceRange: '$$',
    rating: 4.6,
    reviewCount: 245,
    images: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559305616-f3a1e5d2e097?w=800&h=600&fit=crop'
    ],
    address: {
      es: 'Av. del Tepozteco 13, Centro',
      en: 'Av. del Tepozteco 13, Downtown'
    },
    coordinates: [-99.0947, 18.9874],
    phone: '+52 777 395 5555',
    hours: {
      es: 'Lun-Dom: 8:00-22:00',
      en: 'Mon-Sun: 8:00 AM - 10:00 PM'
    },
    amenities: ['wifi', 'outdoor-seating', 'takeaway', 'cards'],
    specialties: {
      es: ['Helados artesanales', 'Café orgánico', 'Postres caseros', 'Bebidas frías'],
      en: ['Artisan ice cream', 'Organic coffee', 'Homemade desserts', 'Cold beverages']
    },
    atmosphere: 'traditional',
    dietary: ['vegetarian', 'organic'],
    verified: true,
    featured: true,
    delivery: false,
    takeaway: true,
    outdoorSeating: true,
    wifi: true,
    liveMusic: false,
    parking: false,
    acceptsCards: true,
    studyFriendly: true,
    petFriendly: false,
    roastery: false
  },
  {
    id: 'luna-cafe',
    name: {
      es: 'Luna Café',
      en: 'Luna Café'
    },
    description: {
      es: 'Ambiente bohemio con arte local, café orgánico y deliciosos desayunos hasta tarde',
      en: 'Bohemian atmosphere with local art, organic coffee and delicious late breakfasts'
    },
    cafeType: {
      es: 'Artesanal',
      en: 'Artisan'
    },
    priceRange: '$$',
    rating: 4.5,
    reviewCount: 189,
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&h=600&fit=crop'
    ],
    address: {
      es: 'Av. 5 de Mayo 21, Centro',
      en: 'Av. 5 de Mayo 21, Downtown'
    },
    coordinates: [-99.0952, 18.9871],
    phone: '+52 777 395 4444',
    hours: {
      es: 'Lun-Dom: 8:00-23:00',
      en: 'Mon-Sun: 8:00 AM - 11:00 PM'
    },
    amenities: ['wifi', 'outdoor-seating', 'live-music', 'art-gallery'],
    specialties: {
      es: ['Café orgánico', 'Desayunos tardíos', 'Postres veganos', 'Arte local'],
      en: ['Organic coffee', 'Late breakfasts', 'Vegan desserts', 'Local art']
    },
    atmosphere: 'artistic',
    dietary: ['vegetarian', 'vegan', 'organic'],
    verified: true,
    featured: true,
    delivery: false,
    takeaway: true,
    outdoorSeating: true,
    wifi: true,
    liveMusic: true,
    parking: false,
    acceptsCards: true,
    studyFriendly: true,
    petFriendly: true,
    roastery: false
  },
  {
    id: 'cafe-del-arbol',
    name: {
      es: 'Café del Árbol',
      en: 'Tree Café'
    },
    description: {
      es: 'Acogedor café con terraza jardín, café de altura y repostería artesanal bajo los árboles',
      en: 'Cozy cafe with garden terrace, high altitude coffee and artisan pastries under the trees'
    },
    cafeType: {
      es: 'Orgánico',
      en: 'Organic'
    },
    priceRange: '$$$',
    rating: 4.8,
    reviewCount: 156,
    images: [
      'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    ],
    address: {
      es: 'Calle del Tecolote 8, San Miguel',
      en: 'Calle del Tecolote 8, San Miguel'
    },
    coordinates: [-99.0955, 18.9868],
    phone: '+52 777 395 3333',
    website: 'https://cafedelarbol.com.mx',
    hours: {
      es: 'Mar-Dom: 9:00-19:00 (Cerrado Lunes)',
      en: 'Tue-Sun: 9:00 AM - 7:00 PM (Closed Mondays)'
    },
    amenities: ['wifi', 'outdoor-seating', 'parking', 'garden'],
    specialties: {
      es: ['Café orgánico de altura', 'Repostería artesanal', 'Smoothies naturales', 'Pan integral'],
      en: ['High altitude organic coffee', 'Artisan pastries', 'Natural smoothies', 'Whole grain bread']
    },
    atmosphere: 'rustic',
    dietary: ['vegetarian', 'vegan', 'organic', 'gluten-free'],
    verified: true,
    featured: true,
    delivery: false,
    takeaway: true,
    outdoorSeating: true,
    wifi: true,
    liveMusic: false,
    parking: true,
    acceptsCards: true,
    studyFriendly: true,
    petFriendly: true,
    roastery: false
  },
  {
    id: 'tepoznieves-original',
    name: {
      es: 'Tepoznieves Original',
      en: 'Tepoznieves Original'
    },
    description: {
      es: 'La heladería tradicional más famosa de Tepoztlán con sabores exóticos y café espresso',
      en: 'The most famous traditional ice cream shop in Tepoztlán with exotic flavors and espresso coffee'
    },
    cafeType: {
      es: 'Tradicional',
      en: 'Traditional'
    },
    priceRange: '$',
    rating: 4.4,
    reviewCount: 892,
    images: [
      'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop'
    ],
    address: {
      es: 'Av. del Tepozteco 15, Centro',
      en: 'Av. del Tepozteco 15, Downtown'
    },
    coordinates: [-99.0948, 18.9875],
    phone: '+52 777 395 2222',
    hours: {
      es: 'Lun-Dom: 10:00-22:00',
      en: 'Mon-Sun: 10:00 AM - 10:00 PM'
    },
    amenities: ['takeaway', 'outdoor-seating'],
    specialties: {
      es: ['Helados exóticos', 'Café espresso', 'Nieves de agua', 'Sabores de temporada'],
      en: ['Exotic ice creams', 'Espresso coffee', 'Water ice', 'Seasonal flavors']
    },
    atmosphere: 'traditional',
    dietary: ['vegetarian'],
    verified: true,
    featured: false,
    delivery: false,
    takeaway: true,
    outdoorSeating: true,
    wifi: false,
    liveMusic: false,
    parking: false,
    acceptsCards: false,
    studyFriendly: false,
    petFriendly: false,
    roastery: false
  },
  {
    id: 'cafe-amate',
    name: {
      es: 'Café Amate',
      en: 'Café Amate'
    },
    description: {
      es: 'Moderno café con tostado propio, métodos alternativos y ambiente minimalista zen',
      en: 'Modern cafe with own roasting, alternative brewing methods and zen minimalist atmosphere'
    },
    cafeType: {
      es: 'Tostadora',
      en: 'Roastery'
    },
    priceRange: '$$$',
    rating: 4.7,
    reviewCount: 134,
    images: [
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop'
    ],
    address: {
      es: 'Calle Revolución 12, Santo Domingo',
      en: 'Calle Revolución 12, Santo Domingo'
    },
    coordinates: [-99.0960, 18.9863],
    phone: '+52 777 395 1111',
    website: 'https://cafeamate.mx',
    email: 'contacto@cafeamate.mx',
    hours: {
      es: 'Lun-Sáb: 8:00-18:00, Dom: 9:00-17:00',
      en: 'Mon-Sat: 8:00 AM - 6:00 PM, Sun: 9:00 AM - 5:00 PM'
    },
    amenities: ['wifi', 'parking', 'roastery-tours', 'coffee-classes'],
    specialties: {
      es: ['Café de tueste propio', 'Métodos alternativos', 'Pour over', 'Cold brew'],
      en: ['Own roasted coffee', 'Alternative methods', 'Pour over', 'Cold brew']
    },
    atmosphere: 'minimalist',
    dietary: ['vegetarian', 'organic'],
    verified: true,
    featured: true,
    delivery: true,
    takeaway: true,
    outdoorSeating: false,
    wifi: true,
    liveMusic: false,
    parking: true,
    acceptsCards: true,
    studyFriendly: true,
    petFriendly: false,
    roastery: true
  },
  {
    id: 'cafe-quetzal',
    name: {
      es: 'Café Quetzal',
      en: 'Café Quetzal'
    },
    description: {
      es: 'Café familiar con vista a las montañas, desayunos caseros y ambiente relajado',
      en: 'Family cafe with mountain views, homemade breakfasts and relaxed atmosphere'
    },
    cafeType: {
      es: 'Panadería Café',
      en: 'Bakery Cafe'
    },
    priceRange: '$$',
    rating: 4.3,
    reviewCount: 167,
    images: [
      'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800&h=600&fit=crop'
    ],
    address: {
      es: 'Av. 5 de Mayo 45, Centro',
      en: 'Av. 5 de Mayo 45, Downtown'
    },
    coordinates: [-99.0945, 18.9878],
    phone: '+52 777 395 6666',
    hours: {
      es: 'Lun-Dom: 7:00-15:00',
      en: 'Mon-Sun: 7:00 AM - 3:00 PM'
    },
    amenities: ['wifi', 'outdoor-seating', 'family-friendly', 'mountain-view'],
    specialties: {
      es: ['Desayunos caseros', 'Pan dulce', 'Café americano', 'Jugos naturales'],
      en: ['Homemade breakfasts', 'Sweet bread', 'American coffee', 'Natural juices']
    },
    atmosphere: 'cozy',
    dietary: ['vegetarian'],
    verified: true,
    featured: false,
    delivery: false,
    takeaway: true,
    outdoorSeating: true,
    wifi: true,
    liveMusic: false,
    parking: false,
    acceptsCards: true,
    studyFriendly: false,
    petFriendly: true,
    roastery: false
  },
  {
    id: 'panaderia-el-sol',
    name: {
      es: 'Panadería El Sol',
      en: 'El Sol Bakery'
    },
    description: {
      es: 'Panadería tradicional familiar con más de 30 años, famosa por su pan dulce y concha',
      en: 'Traditional family bakery with over 30 years, famous for sweet bread and concha'
    },
    cafeType: {
      es: 'Panadería Tradicional',
      en: 'Traditional Bakery'
    },
    priceRange: '$',
    rating: 4.7,
    reviewCount: 312,
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop'
    ],
    address: {
      es: 'Calle Revolución 8, Centro',
      en: 'Calle Revolución 8, Downtown'
    },
    coordinates: [-99.0950, 18.9876],
    phone: '+52 777 395 7777',
    hours: {
      es: 'Lun-Dom: 6:00-20:00',
      en: 'Mon-Sun: 6:00 AM - 8:00 PM'
    },
    amenities: ['takeaway', 'family-friendly', 'traditional-recipes'],
    specialties: {
      es: ['Pan dulce', 'Conchas', 'Cuernitos', 'Bolillos', 'Pan de muerto (temporada)'],
      en: ['Sweet bread', 'Conchas', 'Croissants', 'Bolillos', 'Bread of the dead (seasonal)']
    },
    atmosphere: 'traditional',
    dietary: ['vegetarian'],
    verified: true,
    featured: true,
    delivery: false,
    takeaway: true,
    outdoorSeating: false,
    wifi: false,
    liveMusic: false,
    parking: false,
    acceptsCards: false,
    studyFriendly: false,
    petFriendly: false,
    roastery: false
  },
  {
    id: 'panaderia-cafe-maya',
    name: {
      es: 'Panadería Café Maya',
      en: 'Maya Bakery Café'
    },
    description: {
      es: 'Moderna panadería café con recetas prehispánicas, café de olla y pan integral orgánico',
      en: 'Modern bakery cafe with pre-Hispanic recipes, clay pot coffee and organic whole grain bread'
    },
    cafeType: {
      es: 'Panadería Café',
      en: 'Bakery Cafe'
    },
    priceRange: '$$',
    rating: 4.5,
    reviewCount: 178,
    images: [
      'https://images.unsplash.com/photo-1555507036-ab794f4ec035?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549358077-1c5b2b7ce65f?w=800&h=600&fit=crop'
    ],
    address: {
      es: 'Av. 5 de Mayo 33, Centro',
      en: 'Av. 5 de Mayo 33, Downtown'
    },
    coordinates: [-99.0949, 18.9873],
    phone: '+52 777 395 8888',
    website: 'https://panaderiacafemaya.mx',
    hours: {
      es: 'Lun-Dom: 7:00-21:00',
      en: 'Mon-Sun: 7:00 AM - 9:00 PM'
    },
    amenities: ['wifi', 'outdoor-seating', 'organic-ingredients', 'traditional-recipes'],
    specialties: {
      es: ['Café de olla', 'Pan integral', 'Amaranto', 'Chia bread', 'Postres con miel de agave'],
      en: ['Clay pot coffee', 'Whole grain bread', 'Amaranth', 'Chia bread', 'Agave honey desserts']
    },
    atmosphere: 'modern',
    dietary: ['vegetarian', 'vegan', 'organic', 'gluten-free'],
    verified: true,
    featured: true,
    delivery: true,
    takeaway: true,
    outdoorSeating: true,
    wifi: true,
    liveMusic: false,
    parking: false,
    acceptsCards: true,
    studyFriendly: true,
    petFriendly: true,
    roastery: false
  },
  {
    id: 'panaderia-la-espiga',
    name: {
      es: 'Panadería La Espiga',
      en: 'La Espiga Bakery'
    },
    description: {
      es: 'Acogedora panadería artesanal con horno de leña, especializada en pan europeo y mexicano',
      en: 'Cozy artisan bakery with wood-fired oven, specializing in European and Mexican bread'
    },
    cafeType: {
      es: 'Panadería Tradicional',
      en: 'Traditional Bakery'
    },
    priceRange: '$$',
    rating: 4.6,
    reviewCount: 203,
    images: [
      'https://images.unsplash.com/photo-1549388604-817d15aa0110?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop'
    ],
    address: {
      es: 'Calle del Tecolote 15, San Miguel',
      en: 'Calle del Tecolote 15, San Miguel'
    },
    coordinates: [-99.0958, 18.9865],
    phone: '+52 777 395 9999',
    hours: {
      es: 'Mar-Dom: 7:00-18:00 (Cerrado Lunes)',
      en: 'Tue-Sun: 7:00 AM - 6:00 PM (Closed Mondays)'
    },
    amenities: ['wood-oven', 'artisan-bread', 'european-style'],
    specialties: {
      es: ['Pan de centeno', 'Baguettes', 'Pan de masa madre', 'Focaccia', 'Empanadas'],
      en: ['Rye bread', 'Baguettes', 'Sourdough bread', 'Focaccia', 'Empanadas']
    },
    atmosphere: 'rustic',
    dietary: ['vegetarian'],
    verified: true,
    featured: false,
    delivery: false,
    takeaway: true,
    outdoorSeating: false,
    wifi: false,
    liveMusic: false,
    parking: false,
    acceptsCards: true,
    studyFriendly: false,
    petFriendly: false,
    roastery: false
  },
  {
    id: 'cafe-panaderia-azul',
    name: {
      es: 'Café Panadería Azul',
      en: 'Blue Bakery Café'
    },
    description: {
      es: 'Encantador café panadería con decoración azul talavera, postres únicos y café gourmet',
      en: 'Charming bakery cafe with blue Talavera decor, unique desserts and gourmet coffee'
    },
    cafeType: {
      es: 'Panadería Café',
      en: 'Bakery Cafe'
    },
    priceRange: '$$',
    rating: 4.4,
    reviewCount: 145,
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc7e?w=800&h=600&fit=crop'
    ],
    address: {
      es: 'Av. del Tepozteco 25, Centro',
      en: 'Av. del Tepozteco 25, Downtown'
    },
    coordinates: [-99.0946, 18.9877],
    phone: '+52 777 395 1010',
    hours: {
      es: 'Lun-Dom: 8:00-20:00',
      en: 'Mon-Sun: 8:00 AM - 8:00 PM'
    },
    amenities: ['wifi', 'outdoor-seating', 'artisan-desserts', 'talavera-decor'],
    specialties: {
      es: ['Cheesecakes artesanales', 'Café gourmet', 'Macarrones', 'Tartas de temporada'],
      en: ['Artisan cheesecakes', 'Gourmet coffee', 'Macarons', 'Seasonal tarts']
    },
    atmosphere: 'artistic',
    dietary: ['vegetarian'],
    verified: true,
    featured: false,
    delivery: false,
    takeaway: true,
    outdoorSeating: true,
    wifi: true,
    liveMusic: false,
    parking: false,
    acceptsCards: true,
    studyFriendly: true,
    petFriendly: false,
    roastery: false
  }
]

export class CafeService {
  static getAllCafes(): Cafe[] {
    return cafes
  }

  static getCafeById(id: string): Cafe | undefined {
    return cafes.find(cafe => cafe.id === id)
  }

  static getFeaturedCafes(): Cafe[] {
    return cafes.filter(cafe => cafe.featured)
  }

  static getCafesByType(type: string): Cafe[] {
    if (type === 'all') return cafes
    return cafes.filter(cafe => {
      const cafeTypeId = cafeTypes.find(ct => 
        ct.es.toLowerCase().includes(cafe.cafeType.es.toLowerCase()) ||
        ct.en.toLowerCase().includes(cafe.cafeType.en.toLowerCase())
      )?.id
      return cafeTypeId === type
    })
  }

  static searchCafes(
    query: string = '',
    cafeType: string = 'all',
    atmosphere: string = 'all',
    priceRange: string = 'all',
    dietary: string[] = []
  ): Cafe[] {
    let filtered = cafes

    // Text search
    if (query.trim()) {
      const searchTerm = query.toLowerCase()
      filtered = filtered.filter(cafe => 
        cafe.name.es.toLowerCase().includes(searchTerm) ||
        cafe.name.en.toLowerCase().includes(searchTerm) ||
        cafe.description.es.toLowerCase().includes(searchTerm) ||
        cafe.description.en.toLowerCase().includes(searchTerm) ||
        cafe.cafeType.es.toLowerCase().includes(searchTerm) ||
        cafe.cafeType.en.toLowerCase().includes(searchTerm)
      )
    }

    // Cafe type filter
    if (cafeType && cafeType !== 'all') {
      filtered = filtered.filter(cafe => {
        const cafeTypeId = cafeTypes.find(ct => 
          ct.es.toLowerCase().includes(cafe.cafeType.es.toLowerCase()) ||
          ct.en.toLowerCase().includes(cafe.cafeType.en.toLowerCase())
        )?.id
        return cafeTypeId === cafeType
      })
    }

    // Atmosphere filter
    if (atmosphere && atmosphere !== 'all') {
      filtered = filtered.filter(cafe => cafe.atmosphere === atmosphere)
    }

    // Price range filter
    if (priceRange && priceRange !== 'all') {
      filtered = filtered.filter(cafe => cafe.priceRange === priceRange)
    }

    // Dietary filter
    if (dietary.length > 0) {
      filtered = filtered.filter(cafe => 
        dietary.some(diet => cafe.dietary.includes(diet as 'vegetarian' | 'vegan' | 'gluten-free' | 'organic'))
      )
    }

    return filtered
  }

  static sortCafes(cafes: Cafe[], sortBy: string): Cafe[] {
    const sorted = [...cafes]
    
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
        const priceOrder = { '$': 1, '$$': 2, '$$$': 3 }
        return sorted.sort((a, b) => priceOrder[a.priceRange] - priceOrder[b.priceRange])
      case 'name':
        return sorted.sort((a, b) => a.name.es.localeCompare(b.name.es))
      default:
        return sorted
    }
  }

  static getCafeName(cafe: Cafe, locale: Locale): string {
    return cafe.name[locale]
  }

  static getCafeDescription(cafe: Cafe, locale: Locale): string {
    return cafe.description[locale]
  }

  static getCafeType(cafe: Cafe, locale: Locale): string {
    return cafe.cafeType[locale]
  }

  static getCafeAddress(cafe: Cafe, locale: Locale): string {
    return cafe.address[locale]
  }

  static getCafeHours(cafe: Cafe, locale: Locale): string {
    return cafe.hours[locale]
  }

  static getCafeSpecialties(cafe: Cafe, locale: Locale): string[] {
    return cafe.specialties[locale]
  }
}