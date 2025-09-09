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
  category: 'boutique' | 'resort' | 'eco' | 'budget' | 'luxury' | 'hostel' | 'business' | 'wellness' | 'romantic' | 'historic'
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
  { id: 'hostel', es: 'Hostal', en: 'Hostel', emoji: '🏠' },
  { id: 'business', es: 'Negocios', en: 'Business', emoji: '🏢' },
  { id: 'wellness', es: 'Bienestar', en: 'Wellness', emoji: '🧘' },
  { id: 'romantic', es: 'Romántico', en: 'Romantic', emoji: '💕' },
  { id: 'historic', es: 'Histórico', en: 'Historic', emoji: '🏛️' }
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
    images: ['/HotelAmoxtli.jpg'],
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
    images: ['/posada-del-tepozteco.jpg'],
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
    images: ['/casaAmates.jpeg'],
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
    images: ['/home-ecoposada-tepoztli.jpg'],
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
    images: ['/posada_Lapalma.jpg'],
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
    images: ['/hostal-de-la-luz-spa.jpg'],
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
    images: ['/casaAmates.jpeg'],
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
    images: ['/posada-del-tepozteco.jpg'],
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
  },
  {
    id: 'casa-bugambilia',
    name: {
      es: 'Casa Bugambilia',
      en: 'Casa Bugambilia'
    },
    description: {
      es: 'Casa boutique con vistas panorámicas al Valle de Atongo y decoración artesanal mexicana',
      en: 'Boutique house with panoramic views of Atongo Valley and Mexican artisan decor'
    },
    category: 'boutique',
    priceRange: '$$',
    rating: 4.5,
    reviews: 234,
    images: ['/HotelAmoxtli.jpg'],
    amenities: ['wifi', 'breakfast', 'parking', 'garden'],
    roomTypes: [
      { name: { es: 'Habitación Estándar', en: 'Standard Room' }, capacity: 2, price: 120 },
      { name: { es: 'Suite Vista', en: 'View Suite' }, capacity: 4, price: 200 }
    ],
    location: {
      address: 'Camino Real al Valle 15',
      coordinates: [18.9845, -99.0915],
      neighborhood: 'Valle de Atongo'
    },
    contact: {
      phone: '+52 739 395 0013',
      email: 'reservas@casabugambilia.com',
      website: 'https://casabugambilia.com'
    },
    features: ['panoramic-views', 'artisan-decor', 'yoga-classes'],
    featured: false,
    sustainability: true,
    petFriendly: true,
    adultsOnly: false
  },
  {
    id: 'hotel-quetzal',
    name: {
      es: 'Hotel Quetzal',
      en: 'Hotel Quetzal'
    },
    description: {
      es: 'Hotel moderno con arquitectura contemporánea y todas las comodidades para el viajero de negocios',
      en: 'Modern hotel with contemporary architecture and all amenities for business travelers'
    },
    category: 'business',
    priceRange: '$$$',
    rating: 4.3,
    reviews: 445,
    images: ['/hotel-Quetzal.jpg'],
    amenities: ['wifi', 'gym', 'business-center', 'parking', 'restaurant', 'bar'],
    roomTypes: [
      { name: { es: 'Habitación Ejecutiva', en: 'Executive Room' }, capacity: 2, price: 220 },
      { name: { es: 'Suite Ejecutiva', en: 'Executive Suite' }, capacity: 3, price: 320 },
      { name: { es: 'Suite Presidencial', en: 'Presidential Suite' }, capacity: 4, price: 450 }
    ],
    location: {
      address: 'Av. Revolución 1910, 45',
      coordinates: [18.9855, -99.0925],
      neighborhood: 'Centro'
    },
    contact: {
      phone: '+52 739 395 0014',
      email: 'reservaciones@hotelquetzal.com',
      website: 'https://hotelquetzal.com'
    },
    features: ['business-center', 'conference-rooms', 'airport-shuttle'],
    featured: true,
    sustainability: false,
    petFriendly: false,
    adultsOnly: false
  },
  {
    id: 'villa-del-alma',
    name: {
      es: 'Villa del Alma',
      en: 'Villa del Alma'
    },
    description: {
      es: 'Retiro espiritual y wellness con temazcales, terapias holísticas y conexión con la naturaleza',
      en: 'Spiritual retreat and wellness center with temazcal, holistic therapies and nature connection'
    },
    category: 'wellness',
    priceRange: '$$$',
    rating: 4.8,
    reviews: 167,
    images: ['/casaAmates.jpeg'],
    amenities: ['spa', 'yoga', 'meditation', 'organic-restaurant', 'wifi', 'pool'],
    roomTypes: [
      { name: { es: 'Habitación Zen', en: 'Zen Room' }, capacity: 2, price: 250 },
      { name: { es: 'Suite Mandala', en: 'Mandala Suite' }, capacity: 2, price: 350 },
      { name: { es: 'Cabaña Chakra', en: 'Chakra Cabin' }, capacity: 3, price: 400 }
    ],
    location: {
      address: 'Camino a San Andrés de la Cal, Km 3',
      coordinates: [18.9820, -99.0890],
      neighborhood: 'San Andrés'
    },
    contact: {
      phone: '+52 739 395 0015',
      email: 'contacto@villadelama.com',
      website: 'https://villadelama.com'
    },
    features: ['temazcal', 'meditation-garden', 'holistic-therapies', 'organic-food'],
    featured: true,
    sustainability: true,
    petFriendly: false,
    adultsOnly: true
  },
  {
    id: 'posada-amor-eterno',
    name: {
      es: 'Posada Amor Eterno',
      en: 'Posada Amor Eterno'
    },
    description: {
      es: 'Posada romántica perfecta para parejas, con jacuzzis privados y cenas a la luz de las velas',
      en: 'Romantic inn perfect for couples, featuring private jacuzzis and candlelight dinners'
    },
    category: 'romantic',
    priceRange: '$$',
    rating: 4.6,
    reviews: 298,
    images: ['/posada-del-tepozteco.jpg'],
    amenities: ['jacuzzi', 'romantic-dining', 'wifi', 'breakfast', 'couples-massage'],
    roomTypes: [
      { name: { es: 'Suite Romántica', en: 'Romantic Suite' }, capacity: 2, price: 180 },
      { name: { es: 'Suite Luna de Miel', en: 'Honeymoon Suite' }, capacity: 2, price: 250 }
    ],
    location: {
      address: 'Calle del Amor 12',
      coordinates: [18.9865, -99.0930],
      neighborhood: 'Barrio de los Remedios'
    },
    contact: {
      phone: '+52 739 395 0016',
      email: 'amor@posadaamoreterno.com',
      website: 'https://posadaamoreterno.com'
    },
    features: ['couples-only', 'private-jacuzzi', 'romantic-dinners', 'champagne-service'],
    featured: false,
    sustainability: false,
    petFriendly: false,
    adultsOnly: true
  },
  {
    id: 'eco-posada-tepoztli',
    name: {
      es: 'Eco-Posada Tepoztli',
      en: 'Eco-Posada Tepoztli'
    },
    description: {
      es: 'Alojamiento sustentable con paneles solares, huerto orgánico y arquitectura bioclimática',
      en: 'Sustainable accommodation with solar panels, organic garden and bioclimatic architecture'
    },
    category: 'eco',
    priceRange: '$$',
    rating: 4.7,
    reviews: 189,
    images: ['/home-ecoposada-tepoztli.jpg'],
    amenities: ['solar-power', 'organic-garden', 'composting', 'wifi', 'breakfast'],
    roomTypes: [
      { name: { es: 'Habitación Eco', en: 'Eco Room' }, capacity: 2, price: 130 },
      { name: { es: 'Cabaña Solar', en: 'Solar Cabin' }, capacity: 4, price: 220 },
      { name: { es: 'Suite Sustentable', en: 'Sustainable Suite' }, capacity: 3, price: 180 }
    ],
    location: {
      address: 'Callejón Verde 8',
      coordinates: [18.9840, -99.0905],
      neighborhood: 'Barrio del Niño Jesús'
    },
    contact: {
      phone: '+52 739 395 0017',
      email: 'eco@posadatepoztli.com',
      website: 'https://posadatepoztli.eco'
    },
    features: ['zero-waste', 'renewable-energy', 'permaculture-garden', 'eco-workshops'],
    featured: true,
    sustainability: true,
    petFriendly: true,
    adultsOnly: false
  },
  {
    id: 'hotel-colonial-plaza',
    name: {
      es: 'Hotel Colonial Plaza',
      en: 'Hotel Colonial Plaza'
    },
    description: {
      es: 'Hotel histórico frente a la plaza principal con arquitectura colonial del siglo XVIII restaurada',
      en: 'Historic hotel facing the main plaza with restored 18th century colonial architecture'
    },
    category: 'historic',
    priceRange: '$$$',
    rating: 4.4,
    reviews: 567,
    images: ['/posada-del-tepozteco.jpg'],
    amenities: ['restaurant', 'bar', 'wifi', 'parking', 'concierge', 'breakfast'],
    roomTypes: [
      { name: { es: 'Habitación Colonial', en: 'Colonial Room' }, capacity: 2, price: 200 },
      { name: { es: 'Suite Virreinal', en: 'Viceregal Suite' }, capacity: 3, price: 300 },
      { name: { es: 'Suite Plaza', en: 'Plaza Suite' }, capacity: 4, price: 400 }
    ],
    location: {
      address: 'Plaza Principal 1',
      coordinates: [18.9847, -99.0937],
      neighborhood: 'Centro Histórico'
    },
    contact: {
      phone: '+52 739 395 0018',
      email: 'reservas@colonialplaza.com',
      website: 'https://colonialplaza.com'
    },
    features: ['historic-building', 'plaza-views', 'cultural-tours', 'antique-furniture'],
    featured: true,
    sustainability: false,
    petFriendly: true,
    adultsOnly: false
  },
  {
    id: 'hostal-viajeros',
    name: {
      es: 'Hostal de los Viajeros',
      en: 'Travelers Hostel'
    },
    description: {
      es: 'Hostal económico para mochileros y viajeros jóvenes con ambiente internacional y actividades grupales',
      en: 'Budget hostel for backpackers and young travelers with international atmosphere and group activities'
    },
    category: 'hostel',
    priceRange: '$',
    rating: 4.2,
    reviews: 743,
    images: ['/iglesiaNatividad.jpg'],
    amenities: ['shared-kitchen', 'common-area', 'wifi', 'laundry', 'lockers'],
    roomTypes: [
      { name: { es: 'Cama en Dormitorio', en: 'Dorm Bed' }, capacity: 1, price: 25 },
      { name: { es: 'Habitación Privada', en: 'Private Room' }, capacity: 2, price: 60 },
      { name: { es: 'Habitación Familiar', en: 'Family Room' }, capacity: 4, price: 100 }
    ],
    location: {
      address: 'Calle Moctezuma 23',
      coordinates: [18.9843, -99.0932],
      neighborhood: 'Centro'
    },
    contact: {
      phone: '+52 739 395 0019',
      email: 'hola@hostalviajeros.com',
      website: 'https://hostalviajeros.com'
    },
    features: ['international-crowd', 'group-tours', 'party-atmosphere', 'travel-info'],
    featured: false,
    sustainability: false,
    petFriendly: false,
    adultsOnly: false
  },
  {
    id: 'hacienda-monte-calvario',
    name: {
      es: 'Hacienda Monte Calvario',
      en: 'Hacienda Monte Calvario'
    },
    description: {
      es: 'Hacienda restaurada del siglo XIX con extensos jardines, capilla colonial y experiencias ecuestres',
      en: 'Restored 19th century hacienda with extensive gardens, colonial chapel and equestrian experiences'
    },
    category: 'luxury',
    priceRange: '$$$$',
    rating: 4.9,
    reviews: 124,
    images: ['/HotelAmoxtli.jpg'],
    amenities: ['horse-riding', 'chapel', 'gardens', 'restaurant', 'bar', 'pool', 'spa', 'wifi'],
    roomTypes: [
      { name: { es: 'Habitación Hacienda', en: 'Hacienda Room' }, capacity: 2, price: 400 },
      { name: { es: 'Suite Patrón', en: 'Master Suite' }, capacity: 3, price: 600 },
      { name: { es: 'Villa Independiente', en: 'Private Villa' }, capacity: 6, price: 900 }
    ],
    location: {
      address: 'Camino a Monte Calvario, Km 2',
      coordinates: [18.9890, -99.0850],
      neighborhood: 'Monte Calvario'
    },
    contact: {
      phone: '+52 739 395 0020',
      email: 'reservas@haciendamontecalvario.com',
      website: 'https://haciendamontecalvario.com'
    },
    features: ['historic-hacienda', 'horseback-riding', 'private-chapel', 'wedding-venue'],
    featured: true,
    sustainability: true,
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

  static generateSlug(hotel: Hotel, locale: Locale): string {
    const name = hotel.name[locale]
    return name
      .toLowerCase()
      .replace(/[áàäâã]/g, 'a')
      .replace(/[éèëê]/g, 'e')
      .replace(/[íìïî]/g, 'i')
      .replace(/[óòöôõ]/g, 'o')
      .replace(/[úùüû]/g, 'u')
      .replace(/[ñ]/g, 'n')
      .replace(/[ç]/g, 'c')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  static getHotelBySlug(slug: string, locale: Locale): Hotel | undefined {
    return hotels.find(hotel => 
      this.generateSlug(hotel, locale) === slug
    )
  }

  static sortHotels(hotels: Hotel[], sortBy: string): Hotel[] {
    return [...hotels].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'name':
          return a.name.en.localeCompare(b.name.en)
        case 'priceAsc':
          const priceOrderA = a.priceRange === '$' ? 1 : a.priceRange === '$$' ? 2 : a.priceRange === '$$$' ? 3 : 4
          const priceOrderB = b.priceRange === '$' ? 1 : b.priceRange === '$$' ? 2 : b.priceRange === '$$$' ? 3 : 4
          return priceOrderA - priceOrderB
        case 'priceDesc':
          const priceOrderDescA = a.priceRange === '$' ? 1 : a.priceRange === '$$' ? 2 : a.priceRange === '$$$' ? 3 : 4
          const priceOrderDescB = b.priceRange === '$' ? 1 : b.priceRange === '$$' ? 2 : b.priceRange === '$$$' ? 3 : 4
          return priceOrderDescB - priceOrderDescA
        case 'reviews':
          return b.reviews - a.reviews
        default:
          return 0
      }
    })
  }

  static getCategoryLabel(category: string, locale: Locale): string {
    const labels = hotelCategories.find(cat => cat.id === category)
    return labels ? labels[locale] : category
  }
}