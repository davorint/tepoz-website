import { Locale } from './i18n'
import { BusinessService } from './services/BusinessService'
import { EcoLodge } from './types/business'

// Transform legacy eco-lodge data to BusinessEntity format
function transformEcoLodgeData(legacyLodge: LegacyEcoLodge): EcoLodge {
  return {
    id: legacyLodge.id,
    slug: generateSlug(legacyLodge.name.en),
    name: legacyLodge.name,
    description: legacyLodge.description,
    priceRange: legacyLodge.priceRange,
    rating: legacyLodge.rating,
    reviewCount: legacyLodge.reviews,
    images: legacyLodge.images,
    address: { es: legacyLodge.location.address, en: legacyLodge.location.address },
    coordinates: legacyLodge.location.coordinates,
    phone: legacyLodge.contact.phone,
    website: legacyLodge.contact.website,
    email: legacyLodge.contact.email,
    hours: { es: '24 horas', en: '24 hours' },
    amenities: legacyLodge.amenities,
    specialties: { es: legacyLodge.features, en: legacyLodge.features },
    dietary: legacyLodge.organicFood ? ['organic'] : [],
    verified: true,
    featured: legacyLodge.featured,
    delivery: false,
    parking: legacyLodge.amenities.includes('parking'),
    wifi: legacyLodge.amenities.includes('wifi'),
    acceptsCards: true,
    category: legacyLodge.category,
    roomTypes: legacyLodge.roomTypes,
    features: legacyLodge.features,
    sustainability: legacyLodge.sustainability,
    petFriendly: legacyLodge.petFriendly,
    adultsOnly: legacyLodge.adultsOnly,
    organicFood: legacyLodge.organicFood,
    solarPower: legacyLodge.solarPower,
    waterConservation: legacyLodge.waterConservation,
    localMaterials: legacyLodge.localMaterials
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

interface LegacyEcoLodge {
  id: string
  name: {
    es: string
    en: string
  }
  description: {
    es: string
    en: string
  }
  category: 'eco-resort' | 'treehouse' | 'glamping' | 'sustainable-hotel' | 'nature-retreat' | 'organic-farm'
  priceRange: '$' | '$$' | '$$$' | '$$$$'
  rating: number
  reviews: number
  images: string[]
  amenities: string[]
  roomTypes: Array<{
    type: string
    price: number
    capacity: number
  }>
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
  organicFood: boolean
  solarPower: boolean
  waterConservation: boolean
  localMaterials: boolean
}

// Category types for filtering
export const ecoLodgeCategories = [
  { id: 'all', es: 'Todos', en: 'All', emoji: '🌿' },
  { id: 'eco-resort', es: 'Eco Resort', en: 'Eco Resort', emoji: '🌴' },
  { id: 'treehouse', es: 'Casa del Árbol', en: 'Treehouse', emoji: '🌳' },
  { id: 'glamping', es: 'Glamping', en: 'Glamping', emoji: '⛺' },
  { id: 'sustainable-hotel', es: 'Hotel Sustentable', en: 'Sustainable Hotel', emoji: '🏨' },
  { id: 'nature-retreat', es: 'Retiro Natural', en: 'Nature Retreat', emoji: '🏔️' },
  { id: 'organic-farm', es: 'Granja Orgánica', en: 'Organic Farm', emoji: '🚜' }
]

// Eco amenity types for filtering
export const ecoAmenityTypes = [
  { id: 'all', es: 'Todas', en: 'All', emoji: '🌿' },
  { id: 'solar-power', es: 'Energía Solar', en: 'Solar Power', emoji: '☀️' },
  { id: 'organic-food', es: 'Comida Orgánica', en: 'Organic Food', emoji: '🥬' },
  { id: 'water-conservation', es: 'Conservación de Agua', en: 'Water Conservation', emoji: '💧' },
  { id: 'local-materials', es: 'Materiales Locales', en: 'Local Materials', emoji: '🏗️' },
  { id: 'composting', es: 'Compostaje', en: 'Composting', emoji: '♻️' },
  { id: 'garden', es: 'Jardín Orgánico', en: 'Organic Garden', emoji: '🌱' },
  { id: 'wildlife', es: 'Observación Fauna', en: 'Wildlife Watching', emoji: '🦋' },
  { id: 'hiking', es: 'Senderismo', en: 'Hiking', emoji: '🥾' }
]

// Price ranges for filtering
export const ecoLodgePriceRanges = [
  { id: 'all', symbol: 'All', es: 'Todos', en: 'All Prices' },
  { id: '$', symbol: '$', es: 'Económico ($800-1500/noche)', en: 'Budget ($800-1500/night)' },
  { id: '$$', symbol: '$$', es: 'Moderado ($1500-3000/noche)', en: 'Moderate ($1500-3000/night)' },
  { id: '$$$', symbol: '$$$', es: 'Premium ($3000-5000/noche)', en: 'Premium ($3000-5000/night)' },
  { id: '$$$$', symbol: '$$$$', es: 'Lujo ($5000+/noche)', en: 'Luxury ($5000+/night)' }
]

// Legacy eco-lodge data to be transformed
const legacyEcoLodges: LegacyEcoLodge[] = [
  {
    id: 'tubohotel-tepoztlan',
    name: {
      es: 'Tubohotel Tepoztlán',
      en: 'Tubohotel Tepoztlán'
    },
    description: {
      es: 'Hotel único construido con tubos de concreto reciclado. Experiencia minimalista eco-friendly con vistas panorámicas.',
      en: 'Unique hotel built with recycled concrete tubes. Minimalist eco-friendly experience with panoramic views.'
    },
    category: 'sustainable-hotel',
    priceRange: '$',
    rating: 4.2,
    reviews: 89,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop'
    ],
    amenities: ['solar-power', 'local-materials', 'hiking', 'wildlife'],
    roomTypes: [
      { type: 'Tubo Estándar', price: 850, capacity: 2 },
      { type: 'Tubo Premium', price: 1200, capacity: 3 }
    ],
    location: {
      address: 'Tepoztlán, Morelos',
      coordinates: [19.0133, -99.0936],
      neighborhood: 'Tepoztlán'
    },
    contact: {
      phone: '+52 739 395 0115',
      email: 'info@tubohotel.com',
      website: 'tubohotel.com'
    },
    features: ['unique-architecture', 'panoramic-views', 'minimalist'],
    featured: true,
    sustainability: true,
    petFriendly: false,
    adultsOnly: false,
    organicFood: false,
    solarPower: true,
    waterConservation: true,
    localMaterials: true
  },
  {
    id: 'huehuecoyotl-ecovillage',
    name: {
      es: 'Huehuecoyotl Ecoaldea',
      en: 'Huehuecoyotl Ecovillage'
    },
    description: {
      es: 'La ecoaldea más antigua de México, fundada en 1982. Experiencia comunitaria en cabañas de adobe rodeadas de bosque.',
      en: "Mexico's oldest sustainable ecovillage, founded in 1982. Community experience in adobe cabins surrounded by forest."
    },
    category: 'nature-retreat',
    priceRange: '$$',
    rating: 4.7,
    reviews: 142,
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502780402662-acc01917ef2e?w=800&h=600&fit=crop'
    ],
    amenities: ['solar-power', 'organic-food', 'composting', 'garden', 'hiking'],
    roomTypes: [
      { type: 'Cabaña Compartida', price: 1200, capacity: 1 },
      { type: 'Cabaña Privada', price: 2000, capacity: 2 },
      { type: 'Cabaña Familiar', price: 2800, capacity: 4 }
    ],
    location: {
      address: 'Colinas de Tepoztlán, Morelos',
      coordinates: [19.0187, -99.0856],
      neighborhood: 'Tepoztlán'
    },
    contact: {
      phone: '+52 739 395 0300',
      email: 'info@huehuecoyotl.org',
      website: 'huehuecoyotl.org'
    },
    features: ['permaculture', 'sweat-lodge', 'workshops', 'community-living'],
    featured: true,
    sustainability: true,
    petFriendly: true,
    adultsOnly: false,
    organicFood: true,
    solarPower: true,
    waterConservation: true,
    localMaterials: true
  },
  {
    id: 'glamping-valle-mistico',
    name: {
      es: 'Glamping Valle Místico',
      en: 'Mystical Valley Glamping'
    },
    description: {
      es: 'Glamping de lujo en el corazón del valle. Tiendas elegantes con todas las comodidades.',
      en: 'Luxury glamping in the heart of the valley. Elegant tents with all amenities.'
    },
    category: 'glamping',
    priceRange: '$$',
    rating: 4.6,
    reviews: 134,
    images: [
      'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1510312305653-8ed496efaeb1?w=800&h=600&fit=crop'
    ],
    amenities: ['solar-power', 'organic-food', 'water-conservation', 'hiking', 'wildlife'],
    roomTypes: [
      { type: 'Tienda Safari', price: 1800, capacity: 2 },
      { type: 'Tienda Familiar', price: 2600, capacity: 4 },
      { type: 'Tienda Premium', price: 3400, capacity: 2 }
    ],
    location: {
      address: 'Valle de Tepoztlán, Km 3',
      coordinates: [19.0156, -99.0867],
      neighborhood: 'Valle'
    },
    contact: {
      phone: '+52 739 200 3333',
      email: 'reservas@vallesagrado.com',
      website: 'glamping-vallesagrado.com'
    },
    features: ['stargazing', 'campfire', 'nature-walks'],
    featured: false,
    sustainability: true,
    petFriendly: true,
    adultsOnly: false,
    organicFood: true,
    solarPower: true,
    waterConservation: true,
    localMaterials: false
  },
  {
    id: 'centro-temachtiani-amatlan',
    name: {
      es: 'Centro Ecoturístico Temachtiani Quetzalcóatl',
      en: 'Temachtiani Quetzalcoatl Ecotourism Center'
    },
    description: {
      es: 'Centro ecoturístico comunitario en Amatlán con experiencias holísticas y espirituales. Cabañas, temazcal y piscina.',
      en: 'Community ecotourism center in Amatlan offering holistic and spiritual experiences. Cabins, temazcal, and pool.'
    },
    category: 'eco-resort',
    priceRange: '$$',
    rating: 4.5,
    reviews: 67,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop'
    ],
    amenities: ['organic-food', 'water-conservation', 'local-materials', 'hiking'],
    roomTypes: [
      { type: 'Cabaña Sencilla', price: 1500, capacity: 2 },
      { type: 'Cabaña Familiar', price: 2200, capacity: 4 },
      { type: 'Hostal Compartido', price: 800, capacity: 1 }
    ],
    location: {
      address: 'Amatlán de Quetzalcóatl, Morelos',
      coordinates: [18.9456, -99.0534],
      neighborhood: 'Amatlán'
    },
    contact: {
      phone: '+52 739 348 0234',
      email: 'info@temachtiani.com',
      website: 'temachtiani-quetzalcoatl.com'
    },
    features: ['temazcal', 'spiritual-retreats', 'community-tourism'],
    featured: false,
    sustainability: true,
    petFriendly: false,
    adultsOnly: false,
    organicFood: true,
    solarPower: false,
    waterConservation: true,
    localMaterials: true
  },
  {
    id: 'villas-amatlan-eco-village',
    name: {
      es: 'Villas Amatlán Eco Village',
      en: 'Villas Amatlan Eco Village'
    },
    description: {
      es: 'Ecoaldea con domos geodésicos de geometría especial. 1,800m² de áreas verdes en las montañas místicas de Amatlán.',
      en: 'Eco village with special geometry geodesic domes. 1,800m² of green areas in the mystical mountains of Amatlan.'
    },
    category: 'glamping',
    priceRange: '$$$',
    rating: 4.6,
    reviews: 45,
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop'
    ],
    amenities: ['solar-power', 'water-conservation', 'local-materials', 'hiking', 'wildlife'],
    roomTypes: [
      { type: 'Domo Geodésico Individual', price: 3200, capacity: 2 },
      { type: 'Domo Familiar', price: 4500, capacity: 4 }
    ],
    location: {
      address: 'Amatlán de Quetzalcóatl, Morelos',
      coordinates: [18.9445, -99.0523],
      neighborhood: 'Amatlán'
    },
    contact: {
      phone: '+52 739 348 0156',
      email: 'info@villasamatlan.com',
      website: 'villasamatlan-ecovillage.com'
    },
    features: ['special-geometry', 'mystical-location', 'mountain-views'],
    featured: true,
    sustainability: true,
    petFriendly: true,
    adultsOnly: false,
    organicFood: true,
    solarPower: true,
    waterConservation: true,
    localMaterials: true
  },
  {
    id: 'treehouse-magico',
    name: {
      es: 'Casa del Árbol Mágico',
      en: 'Magic Treehouse'
    },
    description: {
      es: 'Casa en el árbol construida en un ahuehuete centenario con plataformas de observación y baños compostables.',
      en: 'Treehouse built in a centennial ahuehuete tree with observation platforms and composting toilets.'
    },
    category: 'treehouse',
    priceRange: '$$',
    rating: 4.8,
    reviews: 156,
    images: [
      'https://images.unsplash.com/photo-1520637836862-4d197d17c35a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&h=600&fit=crop'
    ],
    amenities: ['composting', 'wildlife', 'hiking', 'garden'],
    roomTypes: [
      { type: 'Nido del Águila', price: 2200, capacity: 2 },
      { type: 'Refugio Familiar', price: 3000, capacity: 4 }
    ],
    location: {
      address: 'Bosque de los Ahuehuetes, Km 4',
      coordinates: [19.0245, -99.0756],
      neighborhood: 'Valle Alto'
    },
    contact: {
      phone: '+52 739 348 0567',
      email: 'reservas@treehousemagico.com',
      website: 'treehousemagico.com'
    },
    features: ['canopy-access', 'bird-watching', 'sunrise-yoga', 'nature-immersion'],
    featured: true,
    sustainability: true,
    petFriendly: false,
    adultsOnly: true,
    organicFood: true,
    solarPower: false,
    waterConservation: true,
    localMaterials: true
  },
  {
    id: 'eco-farm-tepoztlan',
    name: {
      es: 'Granja Ecológica Tepoztlán',
      en: 'Tepoztlán Ecological Farm'
    },
    description: {
      es: 'Granja orgánica con experiencias de agricultura sustentable, ordeña de cabras y producción de quesos artesanales.',
      en: 'Organic farm with sustainable agriculture experiences, goat milking and artisanal cheese production.'
    },
    category: 'organic-farm',
    priceRange: '$',
    rating: 4.6,
    reviews: 289,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop'
    ],
    amenities: ['organic-food', 'composting', 'garden', 'hiking'],
    roomTypes: [
      { type: 'Cabaña Granjera', price: 1200, capacity: 3 },
      { type: 'Dormitorio Compartido', price: 600, capacity: 1 },
      { type: 'Espacio Camping', price: 400, capacity: 2 }
    ],
    location: {
      address: 'Camino a la Granja, Km 2.5',
      coordinates: [19.0298, -99.0623],
      neighborhood: 'San Andrés de la Cal'
    },
    contact: {
      phone: '+52 739 348 0789',
      email: 'granja@ecofarmtepoztlan.org',
      website: 'ecofarmtepoztlan.org'
    },
    features: ['farm-experiences', 'cheese-making', 'animal-interaction', 'permaculture-workshops'],
    featured: false,
    sustainability: true,
    petFriendly: true,
    adultsOnly: false,
    organicFood: true,
    solarPower: true,
    waterConservation: true,
    localMaterials: true
  },
  {
    id: 'sustainable-resort-tepozteco',
    name: {
      es: 'Resort Sustentable Tepozteco',
      en: 'Tepozteco Sustainable Resort'
    },
    description: {
      es: 'Resort de lujo con certificación LEED, paneles solares, tratamiento de aguas grises y arquitectura bioclimática.',
      en: 'Luxury resort with LEED certification, solar panels, greywater treatment and bioclimatic architecture.'
    },
    category: 'sustainable-hotel',
    priceRange: '$$$$',
    rating: 4.7,
    reviews: 234,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop'
    ],
    amenities: ['solar-power', 'organic-food', 'water-conservation', 'composting', 'garden', 'hiking'],
    roomTypes: [
      { type: 'Habitación Sustentable', price: 3800, capacity: 2 },
      { type: 'Suite Ecológica', price: 5200, capacity: 4 },
      { type: 'Villa Verde', price: 7800, capacity: 6 }
    ],
    location: {
      address: 'Ladera del Tepozteco, Km 1',
      coordinates: [19.0156, -99.1023],
      neighborhood: 'Tepozteco'
    },
    contact: {
      phone: '+52 739 348 0012',
      email: 'reservas@resorttepozteco.com',
      website: 'resorttepozteco.com'
    },
    features: ['leed-certified', 'carbon-neutral', 'renewable-energy', 'green-architecture'],
    featured: true,
    sustainability: true,
    petFriendly: true,
    adultsOnly: false,
    organicFood: true,
    solarPower: true,
    waterConservation: true,
    localMaterials: true
  },
  {
    id: 'glamping-piedra-herrada',
    name: {
      es: 'Glamping Piedra Herrada',
      en: 'Piedra Herrada Glamping'
    },
    description: {
      es: 'Experiencia glamping en domos transparentes para observación de estrellas con fogatas y excursiones nocturnas.',
      en: 'Glamping experience in transparent domes for stargazing with bonfires and night expeditions.'
    },
    category: 'glamping',
    priceRange: '$$$',
    rating: 4.9,
    reviews: 178,
    images: [
      'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1510312305653-8ed496efaeb1?w=800&h=600&fit=crop'
    ],
    amenities: ['solar-power', 'composting', 'hiking', 'wildlife'],
    roomTypes: [
      { type: 'Domo Estelar', price: 3500, capacity: 2 },
      { type: 'Domo Familiar', price: 4800, capacity: 4 },
      { type: 'Domo Deluxe', price: 5200, capacity: 2 }
    ],
    location: {
      address: 'Mirador de Piedra Herrada, Km 8',
      coordinates: [19.0412, -99.0234],
      neighborhood: 'Piedra Herrada'
    },
    contact: {
      phone: '+52 739 348 0345',
      email: 'estrellas@glampingpiedra.com',
      website: 'glampingpiedraherrada.com'
    },
    features: ['stargazing', 'transparent-domes', 'astronomy-tours', 'night-photography'],
    featured: true,
    sustainability: true,
    petFriendly: false,
    adultsOnly: true,
    organicFood: false,
    solarPower: true,
    waterConservation: true,
    localMaterials: false
  },
  {
    id: 'retiro-cuernavaca-tepoztlan',
    name: {
      es: 'Retiro Natural Cuernavaca-Tepoztlán',
      en: 'Cuernavaca-Tepoztlán Nature Retreat'
    },
    description: {
      es: 'Centro de retiros con temazcal, medicina ancestral, ceremonias de cacao y terapias de sonido.',
      en: 'Retreat center with temazcal, ancestral medicine, cacao ceremonies and sound therapy.'
    },
    category: 'nature-retreat',
    priceRange: '$$',
    rating: 4.8,
    reviews: 145,
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502780402662-acc01917ef2e?w=800&h=600&fit=crop'
    ],
    amenities: ['organic-food', 'composting', 'garden', 'hiking', 'wildlife'],
    roomTypes: [
      { type: 'Habitación Sencilla', price: 1800, capacity: 1 },
      { type: 'Cabaña Retiro', price: 2400, capacity: 2 },
      { type: 'Suite Sanación', price: 3200, capacity: 2 }
    ],
    location: {
      address: 'Camino de los Ancestros, Km 5',
      coordinates: [19.0089, -99.1134],
      neighborhood: 'Santa Catarina'
    },
    contact: {
      phone: '+52 739 348 0678',
      email: 'retiro@naturacentro.com',
      website: 'retironaturacentro.com'
    },
    features: ['temazcal-ceremonies', 'plant-medicine', 'sound-healing', 'spiritual-guidance'],
    featured: false,
    sustainability: true,
    petFriendly: false,
    adultsOnly: true,
    organicFood: true,
    solarPower: false,
    waterConservation: true,
    localMaterials: true
  },
  {
    id: 'eco-resort-valle-perdido',
    name: {
      es: 'Eco-Resort Valle Perdido',
      en: 'Lost Valley Eco-Resort'
    },
    description: {
      es: 'Resort ecológico en valle privado con cascadas, piscinas naturales, senderos y avistamiento de venados.',
      en: 'Ecological resort in private valley with waterfalls, natural pools, trails and deer watching.'
    },
    category: 'eco-resort',
    priceRange: '$$$',
    rating: 4.5,
    reviews: 267,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop'
    ],
    amenities: ['solar-power', 'water-conservation', 'local-materials', 'hiking', 'wildlife', 'garden'],
    roomTypes: [
      { type: 'Cabaña Valle', price: 2800, capacity: 3 },
      { type: 'Suite Cascada', price: 3600, capacity: 4 },
      { type: 'Villa Perdida', price: 5000, capacity: 6 }
    ],
    location: {
      address: 'Valle Perdido, Acceso Km 12',
      coordinates: [18.9723, -99.0456],
      neighborhood: 'Valle Perdido'
    },
    contact: {
      phone: '+52 739 348 0901',
      email: 'valle@ecoresortperdido.com',
      website: 'ecoresortvalleperdido.com'
    },
    features: ['private-valley', 'natural-pools', 'wildlife-sanctuary', 'waterfall-access'],
    featured: true,
    sustainability: true,
    petFriendly: true,
    adultsOnly: false,
    organicFood: true,
    solarPower: true,
    waterConservation: true,
    localMaterials: true
  }
]

// Transform legacy eco-lodges to new format
const ecoLodges: EcoLodge[] = legacyEcoLodges.map(transformEcoLodgeData)

// EcoLodge service extending BusinessService
class EcoLodgeServiceClass extends BusinessService<EcoLodge> {
  getAllItems(): EcoLodge[] {
    return ecoLodges
  }

  getFeaturedItems(): EcoLodge[] {
    return ecoLodges.filter(lodge => lodge.featured)
  }

  protected getEntityName(entity: EcoLodge, locale: Locale): string {
    return entity.name[locale]
  }

  protected getEntityDescription(entity: EcoLodge, locale: Locale): string {
    return entity.description[locale]
  }

  protected matchesCategory(entity: EcoLodge, category: string): boolean {
    return entity.category === category
  }

  protected matchesAtmosphere(entity: EcoLodge, atmosphere: string): boolean {
    // Map eco-lodge categories to atmosphere concepts
    const categoryToAtmosphere: Record<string, string[]> = {
      'eco-resort': ['natural', 'sustainable', 'relaxing'],
      'treehouse': ['adventurous', 'unique', 'natural'],
      'glamping': ['luxurious', 'outdoor', 'comfortable'],
      'sustainable-hotel': ['eco-friendly', 'modern', 'responsible'],
      'nature-retreat': ['peaceful', 'spiritual', 'natural'],
      'organic-farm': ['rustic', 'authentic', 'educational']
    }
    return categoryToAtmosphere[entity.category]?.includes(atmosphere) || false
  }

  // EcoLodge-specific methods
  getEcoLodgesByCategory(category: string): EcoLodge[] {
    if (category === 'all') return this.getAllItems()
    return this.getAllItems().filter(lodge => lodge.category === category)
  }

  searchEcoLodges(
    query: string = '',
    category: string = 'all',
    priceRange: string = 'all',
    amenities: string[] = [],
    features: {
      sustainability?: boolean,
      organicFood?: boolean,
      solarPower?: boolean,
      petFriendly?: boolean,
      adultsOnly?: boolean
    } = {}
  ): EcoLodge[] {
    let filtered = this.searchItems(query, category, 'all', priceRange, [], amenities)

    // Apply eco-lodge-specific filters
    if (features.sustainability !== undefined) {
      filtered = filtered.filter(l => l.sustainability === features.sustainability)
    }
    if (features.organicFood !== undefined) {
      filtered = filtered.filter(l => l.organicFood === features.organicFood)
    }
    if (features.solarPower !== undefined) {
      filtered = filtered.filter(l => l.solarPower === features.solarPower)
    }
    if (features.petFriendly !== undefined) {
      filtered = filtered.filter(l => l.petFriendly === features.petFriendly)
    }
    if (features.adultsOnly !== undefined) {
      filtered = filtered.filter(l => l.adultsOnly === features.adultsOnly)
    }

    return filtered
  }
}

// Export singleton instance
export const EcoLodgeService = new EcoLodgeServiceClass()

// Static methods for backward compatibility
export class EcoLodgeServiceStatic {
  static getAllEcoLodges(): EcoLodge[] {
    return EcoLodgeService.getAllItems()
  }

  static getEcoLodgeById(id: string): EcoLodge | undefined {
    return EcoLodgeService.getItemById(id)
  }

  static getEcoLodgeName(lodge: EcoLodge, locale: Locale): string {
    return EcoLodgeService.getName(lodge, locale)
  }

  static getEcoLodgeDescription(lodge: EcoLodge, locale: Locale): string {
    return EcoLodgeService.getDescription(lodge, locale)
  }

  static getEcoLodgeAddress(lodge: EcoLodge, locale: Locale): string {
    return EcoLodgeService.getAddress(lodge, locale)
  }

  static getEcoLodgeHours(lodge: EcoLodge, locale: Locale): string {
    return EcoLodgeService.getHours(lodge, locale)
  }

  static getEcoLodgeSpecialties(lodge: EcoLodge, locale: Locale): string[] {
    return EcoLodgeService.getSpecialties(lodge, locale)
  }

  static getFeaturedEcoLodges(): EcoLodge[] {
    return EcoLodgeService.getFeaturedItems()
  }

  static searchEcoLodges(
    query: string = '',
    category: string = 'all',
    priceRange: string = 'all',
    amenities: string[] = [],
    features: {
      sustainability?: boolean,
      organicFood?: boolean,
      solarPower?: boolean,
      petFriendly?: boolean,
      adultsOnly?: boolean
    } = {}
  ): EcoLodge[] {
    return EcoLodgeService.searchEcoLodges(query, category, priceRange, amenities, features)
  }

  static getEcoLodgesByCategory(category: string): EcoLodge[] {
    return EcoLodgeService.getEcoLodgesByCategory(category)
  }
}

// EcoLodgeServiceStatic is already exported above
export type { EcoLodge } from './types/business'