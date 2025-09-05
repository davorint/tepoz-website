import { Locale } from './i18n'

export interface Hotel {
  id: string
  name: {
    es: string
    en: string
  }
  description: {
    es: string
    en: string
  }
  category: 'boutique' | 'resort' | 'eco' | 'budget' | 'luxury' | 'hostel'
  priceRange: '$' | '$$' | '$$$' | '$$$$'
  rating: number
  reviews: number
  images: string[]
  amenities: string[]
  roomTypes: {
    name: { es: string; en: string }
    capacity: number
    price: number
  }[]
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
  sustainability: boolean
  petFriendly: boolean
  adultsOnly: boolean
}

// Category types for filtering
export const hotelCategories = [
  { id: 'all', es: 'Todos', en: 'All', emoji: '🏨' },
  { id: 'boutique', es: 'Boutique', en: 'Boutique', emoji: '✨' },
  { id: 'resort', es: 'Resort', en: 'Resort', emoji: '🏖️' },
  { id: 'eco', es: 'Eco-Lodge', en: 'Eco-Lodge', emoji: '🌿' },
  { id: 'luxury', es: 'Lujo', en: 'Luxury', emoji: '💎' },
  { id: 'budget', es: 'Económico', en: 'Budget', emoji: '💰' },
  { id: 'hostel', es: 'Hostal', en: 'Hostel', emoji: '🏠' }
]

// Amenity types
export const amenityTypes = [
  { id: 'all', es: 'Todas', en: 'All' },
  { id: 'pool', es: 'Piscina', en: 'Pool' },
  { id: 'spa', es: 'Spa', en: 'Spa' },
  { id: 'gym', es: 'Gimnasio', en: 'Gym' },
  { id: 'restaurant', es: 'Restaurante', en: 'Restaurant' },
  { id: 'bar', es: 'Bar', en: 'Bar' },
  { id: 'parking', es: 'Estacionamiento', en: 'Parking' },
  { id: 'wifi', es: 'WiFi', en: 'WiFi' },
  { id: 'breakfast', es: 'Desayuno', en: 'Breakfast' }
]

// Price ranges
export const priceRanges = [
  { id: 'all', symbol: '', es: 'Todos', en: 'All' },
  { id: '$', symbol: '$', es: 'Económico', en: 'Budget' },
  { id: '$$', symbol: '$$', es: 'Moderado', en: 'Moderate' },
  { id: '$$$', symbol: '$$$', es: 'Premium', en: 'Premium' },
  { id: '$$$$', symbol: '$$$$', es: 'Lujo', en: 'Luxury' }
]

// Premium hotel data
const hotels: Hotel[] = [
  {
    id: 'amomoxtli',
    name: {
      es: 'Hotel Boutique Amomoxtli',
      en: 'Amomoxtli Boutique Hotel'
    },
    description: {
      es: 'Un santuario de lujo con vistas espectaculares al valle y diseño arquitectónico único',
      en: 'A luxury sanctuary with spectacular valley views and unique architectural design'
    },
    category: 'luxury',
    priceRange: '$$$$',
    rating: 4.9,
    reviews: 342,
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    amenities: ['pool', 'spa', 'restaurant', 'bar', 'wifi', 'parking', 'gym'],
    roomTypes: [
      { name: { es: 'Suite Valley View', en: 'Suite Valley View' }, capacity: 2, price: 450 },
      { name: { es: 'Master Suite', en: 'Master Suite' }, capacity: 4, price: 650 }
    ],
    location: {
      address: 'Carretera Tepoztlán-Amatlan KM 4',
      coordinates: [18.9847, -99.0931],
      neighborhood: 'Valle Atongo'
    },
    contact: {
      phone: '+52 739 395 0100',
      email: 'reservations@amomoxtli.com',
      website: 'https://amomoxtli.com'
    },
    features: ['infinity-pool', 'michelin-chef', 'helicopter-pad', 'wine-cellar'],
    featured: true,
    sustainability: true,
    petFriendly: false,
    adultsOnly: true
  },
  {
    id: 'posada-del-tepozteco',
    name: {
      es: 'Posada del Tepozteco',
      en: 'Posada del Tepozteco'
    },
    description: {
      es: 'Hotel colonial con jardines exuberantes y arquitectura tradicional mexicana',
      en: 'Colonial hotel with lush gardens and traditional Mexican architecture'
    },
    category: 'boutique',
    priceRange: '$$$',
    rating: 4.7,
    reviews: 523,
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    amenities: ['pool', 'restaurant', 'wifi', 'parking', 'breakfast'],
    roomTypes: [
      { name: { es: 'Habitación Estándar', en: 'Standard Room' }, capacity: 2, price: 180 },
      { name: { es: 'Suite Jardín', en: 'Garden Suite' }, capacity: 3, price: 280 }
    ],
    location: {
      address: 'Calle del Paraíso 3',
      coordinates: [18.9850, -99.0920],
      neighborhood: 'Barrio de la Santísima'
    },
    contact: {
      phone: '+52 739 395 0010',
      email: 'info@posadadeltepozteco.com',
      website: 'https://posadadeltepozteco.com'
    },
    features: ['garden-terrace', 'colonial-architecture', 'art-gallery'],
    featured: true,
    sustainability: false,
    petFriendly: true,
    adultsOnly: false
  },
  {
    id: 'casa-fernanda',
    name: {
      es: 'Casa Fernanda Hotel & Spa',
      en: 'Casa Fernanda Hotel & Spa'
    },
    description: {
      es: 'Refugio íntimo con spa holístico y cocina orgánica de la granja a la mesa',
      en: 'Intimate retreat with holistic spa and farm-to-table organic cuisine'
    },
    category: 'boutique',
    priceRange: '$$$',
    rating: 4.8,
    reviews: 287,
    images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    amenities: ['pool', 'spa', 'restaurant', 'wifi', 'parking', 'breakfast'],
    roomTypes: [
      { name: { es: 'Habitación Deluxe', en: 'Deluxe Room' }, capacity: 2, price: 220 },
      { name: { es: 'Suite Spa', en: 'Spa Suite' }, capacity: 2, price: 320 }
    ],
    location: {
      address: 'Calle Netzahualcóyotl 115',
      coordinates: [18.9845, -99.0935],
      neighborhood: 'Centro'
    },
    contact: {
      phone: '+52 739 395 0522',
      email: 'stay@casafernanda.com',
      website: 'https://casafernanda.com'
    },
    features: ['organic-restaurant', 'temazcal', 'yoga-pavilion', 'meditation-garden'],
    featured: true,
    sustainability: true,
    petFriendly: false,
    adultsOnly: true
  },
  {
    id: 'eco-hotel-ixquenda',
    name: {
      es: 'Eco Hotel Ixquenda',
      en: 'Eco Hotel Ixquenda'
    },
    description: {
      es: 'Lodge ecológico con cabañas sustentables y experiencias de conexión con la naturaleza',
      en: 'Ecological lodge with sustainable cabins and nature connection experiences'
    },
    category: 'eco',
    priceRange: '$$',
    rating: 4.6,
    reviews: 198,
    images: ['https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    amenities: ['restaurant', 'wifi', 'parking', 'breakfast'],
    roomTypes: [
      { name: { es: 'Cabaña Eco', en: 'Eco Cabin' }, capacity: 2, price: 120 },
      { name: { es: 'Cabaña Familiar', en: 'Family Cabin' }, capacity: 4, price: 180 }
    ],
    location: {
      address: 'Camino a Meztitla 22',
      coordinates: [18.9860, -99.0910],
      neighborhood: 'Valle de Atongo'
    },
    contact: {
      phone: '+52 739 395 1234',
      email: 'reservas@ixquenda.com',
      website: 'https://ixquenda.com'
    },
    features: ['permaculture', 'solar-power', 'organic-farm', 'hiking-trails'],
    featured: false,
    sustainability: true,
    petFriendly: true,
    adultsOnly: false
  },
  {
    id: 'hotel-spa-las-palmas',
    name: {
      es: 'Hotel Spa Las Palmas',
      en: 'Las Palmas Hotel Spa'
    },
    description: {
      es: 'Resort de montaña con spa completo y vistas panorámicas del valle',
      en: 'Mountain resort with full spa and panoramic valley views'
    },
    category: 'resort',
    priceRange: '$$$',
    rating: 4.5,
    reviews: 412,
    images: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    amenities: ['pool', 'spa', 'gym', 'restaurant', 'bar', 'wifi', 'parking'],
    roomTypes: [
      { name: { es: 'Habitación Vista Montaña', en: 'Mountain View Room' }, capacity: 2, price: 200 },
      { name: { es: 'Suite Panorámica', en: 'Panoramic Suite' }, capacity: 3, price: 350 }
    ],
    location: {
      address: 'Prolongación 5 de Mayo 45',
      coordinates: [18.9830, -99.0940],
      neighborhood: 'San José'
    },
    contact: {
      phone: '+52 739 395 2000',
      email: 'info@laspalmas.mx',
      website: 'https://laspalmas.mx'
    },
    features: ['tennis-courts', 'conference-rooms', 'wedding-venue'],
    featured: false,
    sustainability: false,
    petFriendly: false,
    adultsOnly: false
  },
  {
    id: 'hostal-de-la-luz',
    name: {
      es: 'Hostal de la Luz',
      en: 'Hostal de la Luz'
    },
    description: {
      es: 'Alojamiento económico con ambiente bohemio y terraza con vista al Tepozteco',
      en: 'Budget accommodation with bohemian atmosphere and terrace overlooking Tepozteco'
    },
    category: 'hostel',
    priceRange: '$',
    rating: 4.3,
    reviews: 567,
    images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    amenities: ['wifi', 'breakfast'],
    roomTypes: [
      { name: { es: 'Dormitorio Compartido', en: 'Shared Dorm' }, capacity: 8, price: 35 },
      { name: { es: 'Habitación Privada', en: 'Private Room' }, capacity: 2, price: 80 }
    ],
    location: {
      address: 'Av. Revolución 44',
      coordinates: [18.9855, -99.0925],
      neighborhood: 'Centro'
    },
    contact: {
      phone: '+52 739 395 3456',
      email: 'hola@hostaldelaluz.com',
      website: 'https://hostaldelaluz.com'
    },
    features: ['rooftop-terrace', 'communal-kitchen', 'book-exchange'],
    featured: false,
    sustainability: true,
    petFriendly: true,
    adultsOnly: false
  },
  {
    id: 'quinta-los-amates',
    name: {
      es: 'Quinta Los Amates',
      en: 'Quinta Los Amates'
    },
    description: {
      es: 'Villa boutique con arquitectura contemporánea y arte mexicano',
      en: 'Boutique villa with contemporary architecture and Mexican art'
    },
    category: 'luxury',
    priceRange: '$$$$',
    rating: 4.8,
    reviews: 156,
    images: ['https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    amenities: ['pool', 'spa', 'restaurant', 'bar', 'wifi', 'parking', 'gym'],
    roomTypes: [
      { name: { es: 'Suite Artista', en: 'Artist Suite' }, capacity: 2, price: 380 },
      { name: { es: 'Villa Master', en: 'Master Villa' }, capacity: 6, price: 850 }
    ],
    location: {
      address: 'Calle de los Amates 12',
      coordinates: [18.9840, -99.0915],
      neighborhood: 'Barrio de San José'
    },
    contact: {
      phone: '+52 739 395 4000',
      email: 'luxury@quintaamates.com',
      website: 'https://quintaamates.com'
    },
    features: ['private-villas', 'art-collection', 'personal-chef', 'concierge'],
    featured: true,
    sustainability: false,
    petFriendly: false,
    adultsOnly: true
  },
  {
    id: 'mesón-del-indio',
    name: {
      es: 'Mesón del Indio',
      en: 'Mesón del Indio'
    },
    description: {
      es: 'Hotel tradicional con auténtica hospitalidad mexicana y cocina regional',
      en: 'Traditional hotel with authentic Mexican hospitality and regional cuisine'
    },
    category: 'budget',
    priceRange: '$$',
    rating: 4.4,
    reviews: 389,
    images: ['https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    amenities: ['restaurant', 'wifi', 'parking', 'breakfast'],
    roomTypes: [
      { name: { es: 'Habitación Sencilla', en: 'Single Room' }, capacity: 1, price: 90 },
      { name: { es: 'Habitación Doble', en: 'Double Room' }, capacity: 2, price: 110 }
    ],
    location: {
      address: 'Av. 5 de Mayo 22',
      coordinates: [18.9852, -99.0928],
      neighborhood: 'Centro'
    },
    contact: {
      phone: '+52 739 395 0012',
      email: 'reservaciones@mesondelindio.com',
      website: 'https://mesondelindio.com'
    },
    features: ['traditional-decor', 'local-cuisine', 'cultural-events'],
    featured: false,
    sustainability: false,
    petFriendly: true,
    adultsOnly: false
  }
]

export class HotelService {
  static getAllHotels(): Hotel[] {
    return hotels
  }

  static getHotelById(id: string): Hotel | undefined {
    return hotels.find(h => h.id === id)
  }

  static getHotelName(hotel: Hotel, locale: Locale): string {
    return hotel.name[locale]
  }

  static getHotelDescription(hotel: Hotel, locale: Locale): string {
    return hotel.description[locale]
  }

  static searchHotels(
    query: string,
    category: string,
    priceRange: string,
    amenities: string[],
    features: {
      sustainability?: boolean
      petFriendly?: boolean
      adultsOnly?: boolean
    } = {}
  ): Hotel[] {
    let filtered = hotels

    // Search by query
    if (query) {
      const lowerQuery = query.toLowerCase()
      filtered = filtered.filter(hotel =>
        hotel.name.es.toLowerCase().includes(lowerQuery) ||
        hotel.name.en.toLowerCase().includes(lowerQuery) ||
        hotel.description.es.toLowerCase().includes(lowerQuery) ||
        hotel.description.en.toLowerCase().includes(lowerQuery) ||
        hotel.location.neighborhood.toLowerCase().includes(lowerQuery)
      )
    }

    // Filter by category
    if (category && category !== 'all') {
      filtered = filtered.filter(h => h.category === category)
    }

    // Filter by price range
    if (priceRange && priceRange !== 'all') {
      filtered = filtered.filter(h => h.priceRange === priceRange)
    }

    // Filter by amenities
    if (amenities.length > 0) {
      filtered = filtered.filter(hotel =>
        amenities.every(amenity => hotel.amenities.includes(amenity))
      )
    }

    // Filter by features
    if (features.sustainability !== undefined) {
      filtered = filtered.filter(h => h.sustainability === features.sustainability)
    }
    if (features.petFriendly !== undefined) {
      filtered = filtered.filter(h => h.petFriendly === features.petFriendly)
    }
    if (features.adultsOnly !== undefined) {
      filtered = filtered.filter(h => h.adultsOnly === features.adultsOnly)
    }

    return filtered
  }

  static getFeaturedHotels(): Hotel[] {
    return hotels.filter(h => h.featured)
  }

  static getHotelsByCategory(category: string): Hotel[] {
    return hotels.filter(h => h.category === category)
  }

  static getHotelsByPriceRange(priceRange: string): Hotel[] {
    return hotels.filter(h => h.priceRange === priceRange)
  }
}