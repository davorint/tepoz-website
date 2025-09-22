import { Locale } from './i18n'
import { BusinessService } from './services/BusinessService'
import { Rental } from './types/business'

// Transform legacy rental data to BusinessEntity format
function transformRentalData(legacyRental: LegacyRental): Rental {
  return {
    id: legacyRental.id,
    slug: generateSlug(legacyRental.name.en),
    name: legacyRental.name,
    description: legacyRental.description,
    priceRange: legacyRental.priceRange,
    rating: legacyRental.rating,
    reviewCount: legacyRental.reviews,
    images: legacyRental.images,
    address: { es: legacyRental.location.address, en: legacyRental.location.address },
    coordinates: legacyRental.location.coordinates,
    phone: legacyRental.contact.phone,
    website: legacyRental.contact.website,
    email: legacyRental.contact.email,
    hours: { es: 'Check-in flexible', en: 'Flexible check-in' },
    amenities: legacyRental.amenities,
    specialties: { es: legacyRental.features, en: legacyRental.features },
    dietary: [],
    verified: true,
    featured: legacyRental.featured,
    delivery: false,
    parking: legacyRental.hasParking,
    wifi: legacyRental.hasWifi,
    acceptsCards: true,
    category: legacyRental.category,
    roomInfo: legacyRental.roomInfo,
    features: legacyRental.features,
    instantBook: legacyRental.instantBook,
    petFriendly: legacyRental.petFriendly,
    familyFriendly: legacyRental.familyFriendly,
    workFriendly: legacyRental.workFriendly,
    hasKitchen: legacyRental.hasKitchen,
    hasWifi: legacyRental.hasWifi,
    hasParking: legacyRental.hasParking
  }
}

function generateSlug(name: string): string {
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

interface LegacyRental {
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

// Legacy rental data to be transformed
const legacyRentals: LegacyRental[] = [
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
  },
  {
    id: 'penthouse-tepoztlan',
    name: {
      es: 'Penthouse Tepoztlán Centro',
      en: 'Tepoztlán Downtown Penthouse'
    },
    description: {
      es: 'Penthouse de lujo en el corazón del centro histórico con terraza privada y vistas a 360° del pueblo y montañas.',
      en: 'Luxury penthouse in the heart of the historic center with private terrace and 360° views of town and mountains.'
    },
    category: 'apartment',
    priceRange: '$$$$',
    rating: 4.9,
    reviews: 87,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571079570759-1f0e821ad1b6?w=800&h=600&fit=crop'
    ],
    amenities: ['kitchen', 'wifi', 'ac', 'terrace', 'washer', 'tv'],
    roomInfo: {
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
      pricePerNight: 4200
    },
    location: {
      address: 'Plaza de Armas 8, Piso 4',
      coordinates: [19.0125, -99.0938],
      neighborhood: 'Centro Histórico'
    },
    contact: {
      phone: '+52 739 111 7777',
      email: 'penthouse@tepozlux.com',
      website: 'tepozlux.com'
    },
    features: ['panoramic-views', 'rooftop-terrace', 'luxury-finishes', 'historic-location'],
    featured: true,
    instantBook: false,
    petFriendly: false,
    familyFriendly: true,
    workFriendly: true,
    hasKitchen: true,
    hasWifi: true,
    hasParking: false
  },
  {
    id: 'casa-adobe-tradicional',
    name: {
      es: 'Casa de Adobe Tradicional',
      en: 'Traditional Adobe House'
    },
    description: {
      es: 'Casa tradicional de adobe de 200 años restaurada con técnicas ancestrales, jardín con plantas medicinales.',
      en: '200-year-old traditional adobe house restored with ancestral techniques, medicinal plant garden.'
    },
    category: 'house',
    priceRange: '$$',
    rating: 4.6,
    reviews: 156,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    ],
    amenities: ['kitchen', 'wifi', 'fireplace', 'garden', 'terrace'],
    roomInfo: {
      bedrooms: 2,
      bathrooms: 2,
      maxGuests: 5,
      pricePerNight: 1600
    },
    location: {
      address: 'Calle de las Flores 34',
      coordinates: [19.0140, -99.0920],
      neighborhood: 'Barrio de la Santísima'
    },
    contact: {
      phone: '+52 739 111 8888',
      email: 'adobe@casatradicional.com',
      website: 'casatradicional.com'
    },
    features: ['adobe-walls', 'medicinal-garden', 'traditional-architecture', 'cultural-experience'],
    featured: true,
    instantBook: true,
    petFriendly: true,
    familyFriendly: true,
    workFriendly: false,
    hasKitchen: true,
    hasWifi: true,
    hasParking: true
  },
  {
    id: 'studio-artist-retreat',
    name: {
      es: 'Estudio Retiro de Artista',
      en: 'Artist Retreat Studio'
    },
    description: {
      es: 'Estudio luminoso diseñado para artistas con caballete, materiales incluidos y vista inspiradora a los cerros.',
      en: 'Bright studio designed for artists with easel, materials included and inspiring mountain views.'
    },
    category: 'studio',
    priceRange: '$',
    rating: 4.4,
    reviews: 203,
    images: [
      'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=800&h=600&fit=crop'
    ],
    amenities: ['kitchen', 'wifi', 'art-supplies', 'natural-light'],
    roomInfo: {
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
      pricePerNight: 900
    },
    location: {
      address: 'Callejón del Arte 15',
      coordinates: [19.0118, -99.0928],
      neighborhood: 'San Miguel'
    },
    contact: {
      phone: '+52 739 111 9999',
      email: 'studio@artistretreat.com',
      website: 'artistretreat.com'
    },
    features: ['art-studio', 'natural-light', 'mountain-views', 'creative-space'],
    featured: false,
    instantBook: true,
    petFriendly: false,
    familyFriendly: false,
    workFriendly: true,
    hasKitchen: true,
    hasWifi: true,
    hasParking: false
  },
  {
    id: 'villa-spa-wellness',
    name: {
      es: 'Villa Spa & Wellness',
      en: 'Villa Spa & Wellness'
    },
    description: {
      es: 'Villa exclusiva con spa privado, jacuzzi exterior, sauna y terapista personal disponible.',
      en: 'Exclusive villa with private spa, outdoor jacuzzi, sauna and personal therapist available.'
    },
    category: 'villa',
    priceRange: '$$$$',
    rating: 4.8,
    reviews: 98,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?w=800&h=600&fit=crop'
    ],
    amenities: ['kitchen', 'wifi', 'parking', 'pool', 'garden', 'spa', 'jacuzzi', 'sauna'],
    roomInfo: {
      bedrooms: 4,
      bathrooms: 4,
      maxGuests: 8,
      pricePerNight: 5500
    },
    location: {
      address: 'Privada Bienestar 3',
      coordinates: [19.0160, -99.0880],
      neighborhood: 'Las Ventanas'
    },
    contact: {
      phone: '+52 739 111 0000',
      email: 'reservas@villaspa.com',
      website: 'villaspa.com'
    },
    features: ['private-spa', 'wellness-programs', 'luxury-amenities', 'therapeutic-treatments'],
    featured: true,
    instantBook: false,
    petFriendly: false,
    familyFriendly: true,
    workFriendly: false,
    hasKitchen: true,
    hasWifi: true,
    hasParking: true
  },
  {
    id: 'cabana-familiar-bosque',
    name: {
      es: 'Cabaña Familiar del Bosque',
      en: 'Family Forest Cabin'
    },
    description: {
      es: 'Cabaña de madera con 3 recámaras, fogata exterior, zona de juegos infantiles y senderos naturales.',
      en: 'Wooden cabin with 3 bedrooms, outdoor fire pit, children\'s play area and nature trails.'
    },
    category: 'cabin',
    priceRange: '$$',
    rating: 4.5,
    reviews: 234,
    images: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    ],
    amenities: ['kitchen', 'wifi', 'fireplace', 'garden', 'playground', 'bbq'],
    roomInfo: {
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 8,
      pricePerNight: 1800
    },
    location: {
      address: 'Sendero del Bosque, Km 1.5',
      coordinates: [19.0185, -99.0845],
      neighborhood: 'Valle'
    },
    contact: {
      phone: '+52 739 111 1111',
      email: 'familia@cabanabosque.com',
      website: 'cabanabosque.com'
    },
    features: ['family-friendly', 'nature-trails', 'outdoor-activities', 'campfire'],
    featured: false,
    instantBook: true,
    petFriendly: true,
    familyFriendly: true,
    workFriendly: false,
    hasKitchen: true,
    hasWifi: true,
    hasParking: true
  },
  {
    id: 'loft-industrial-chic',
    name: {
      es: 'Loft Industrial Chic',
      en: 'Industrial Chic Loft'
    },
    description: {
      es: 'Loft moderno con diseño industrial, techos altos, mezzanine y decoración contemporánea urbana.',
      en: 'Modern loft with industrial design, high ceilings, mezzanine and contemporary urban decor.'
    },
    category: 'loft',
    priceRange: '$$$',
    rating: 4.7,
    reviews: 145,
    images: [
      'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=800&h=600&fit=crop'
    ],
    amenities: ['kitchen', 'wifi', 'ac', 'washer', 'tv', 'sound-system'],
    roomInfo: {
      bedrooms: 2,
      bathrooms: 2,
      maxGuests: 4,
      pricePerNight: 2200
    },
    location: {
      address: 'Av. Revolución 1910, 78',
      coordinates: [19.0130, -99.0935],
      neighborhood: 'Centro'
    },
    contact: {
      phone: '+52 739 111 2222',
      email: 'loft@industrialchic.com',
      website: 'industrialchic.com'
    },
    features: ['modern-design', 'high-ceilings', 'urban-style', 'mezzanine'],
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
    id: 'casa-yoga-meditation',
    name: {
      es: 'Casa Yoga & Meditación',
      en: 'Yoga & Meditation House'
    },
    description: {
      es: 'Casa especializada en retiros espirituales con sala de yoga, jardín zen y desayunos veganos.',
      en: 'House specialized in spiritual retreats with yoga room, zen garden and vegan breakfasts.'
    },
    category: 'house',
    priceRange: '$$',
    rating: 4.9,
    reviews: 167,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571079570759-1f0e821ad1b6?w=800&h=600&fit=crop'
    ],
    amenities: ['kitchen', 'wifi', 'yoga-room', 'meditation-garden', 'organic-breakfast'],
    roomInfo: {
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
      pricePerNight: 1900
    },
    location: {
      address: 'Sendero de la Paz 21',
      coordinates: [19.0175, -99.0890],
      neighborhood: 'Los Ocotes'
    },
    contact: {
      phone: '+52 739 111 3333',
      email: 'zen@casayoga.com',
      website: 'casayoga.com'
    },
    features: ['spiritual-retreats', 'yoga-classes', 'meditation-space', 'vegan-cuisine'],
    featured: true,
    instantBook: false,
    petFriendly: false,
    familyFriendly: false,
    workFriendly: false,
    hasKitchen: true,
    hasWifi: true,
    hasParking: true
  }
]

// Transform legacy rentals to new format
const rentals: Rental[] = legacyRentals.map(transformRentalData)

// Rental service extending BusinessService
class RentalServiceClass extends BusinessService<Rental> {
  getAllItems(): Rental[] {
    return rentals
  }

  getFeaturedItems(): Rental[] {
    return rentals.filter(rental => rental.featured)
  }

  protected getEntityName(entity: Rental, locale: Locale): string {
    return entity.name[locale]
  }

  protected getEntityDescription(entity: Rental, locale: Locale): string {
    return entity.description[locale]
  }

  protected matchesCategory(entity: Rental, category: string): boolean {
    return entity.category === category
  }

  protected matchesAtmosphere(entity: Rental, atmosphere: string): boolean {
    // Map rental categories to atmosphere concepts
    const categoryToAtmosphere: Record<string, string[]> = {
      'apartment': ['modern', 'urban', 'convenient'],
      'house': ['family', 'spacious', 'traditional'],
      'villa': ['luxury', 'exclusive', 'elegant'],
      'studio': ['compact', 'artistic', 'minimalist'],
      'cabin': ['rustic', 'cozy', 'natural'],
      'loft': ['industrial', 'modern', 'urban']
    }
    return categoryToAtmosphere[entity.category]?.includes(atmosphere) || false
  }

  // Rental-specific methods
  getRentalsByCategory(category: string): Rental[] {
    if (category === 'all') return this.getAllItems()
    return this.getAllItems().filter(rental => rental.category === category)
  }

  getRentalCategory(rental: Rental, locale: Locale): string {
    const categoryTranslations: Record<string, { es: string; en: string }> = {
      'apartment': { es: 'Departamento', en: 'Apartment' },
      'house': { es: 'Casa', en: 'House' },
      'villa': { es: 'Villa', en: 'Villa' },
      'studio': { es: 'Studio', en: 'Studio' },
      'cabin': { es: 'Cabaña', en: 'Cabin' },
      'loft': { es: 'Loft', en: 'Loft' }
    }
    return categoryTranslations[rental.category]?.[locale] || rental.category
  }

  searchRentals(
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
    let filtered = this.searchItems(query, category, 'all', priceRange, [], amenities)

    // Apply rental-specific filters
    if (features.instantBook !== undefined) {
      filtered = filtered.filter(r => r.instantBook === features.instantBook)
    }
    if (features.petFriendly !== undefined) {
      filtered = filtered.filter(r => r.petFriendly === features.petFriendly)
    }
    if (features.familyFriendly !== undefined) {
      filtered = filtered.filter(r => r.familyFriendly === features.familyFriendly)
    }
    if (features.workFriendly !== undefined) {
      filtered = filtered.filter(r => r.workFriendly === features.workFriendly)
    }

    return filtered
  }
}

// Export singleton instance
export const RentalService = new RentalServiceClass()

// Static methods for backward compatibility
export class RentalServiceStatic {
  static getAllRentals(): Rental[] {
    return RentalService.getAllItems()
  }

  static getRentalById(id: string): Rental | undefined {
    return RentalService.getItemById(id)
  }

  static getRentalName(rental: Rental, locale: Locale): string {
    return RentalService.getName(rental, locale)
  }

  static getRentalDescription(rental: Rental, locale: Locale): string {
    return RentalService.getDescription(rental, locale)
  }

  static getRentalAddress(rental: Rental, locale: Locale): string {
    return RentalService.getAddress(rental, locale)
  }

  static getRentalHours(rental: Rental, locale: Locale): string {
    return RentalService.getHours(rental, locale)
  }

  static getRentalSpecialties(rental: Rental, locale: Locale): string[] {
    return RentalService.getSpecialties(rental, locale)
  }

  static getFeaturedRentals(): Rental[] {
    return RentalService.getFeaturedItems()
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
    return RentalService.searchRentals(query, category, priceRange, amenities, features)
  }

  static getRentalsByCategory(category: string): Rental[] {
    return RentalService.getRentalsByCategory(category)
  }

  static getRentalCategory(rental: Rental, locale: Locale): string {
    return RentalService.getRentalCategory(rental, locale)
  }
}

// RentalServiceStatic is already exported above
export type { Rental } from './types/business'