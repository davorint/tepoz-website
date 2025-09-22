// Comprehensive Tepoztlán business database for the store locator
import { Business } from '@/types/business-finder'

export const tepoztlanBusinesses: Business[] = [
  // RESTAURANTS & CAFES
  {
    id: 'los-colorines',
    name: 'Los Colorines',
    nameEn: 'Los Colorines',
    category: 'restaurant',
    subcategory: 'mexican',
    coordinates: [-99.0989, 18.9853] as [number, number],
    rating: 4.7,
    priceLevel: 3,
    description: 'Restaurante icónico con más de 20 años sirviendo auténtica cocina mexicana en un ambiente colorido y tradicional. Especialidades en mole, chiles en nogada y platillos regionales.',
    descriptionEn: 'Iconic restaurant with over 20 years serving authentic Mexican cuisine in a colorful traditional setting. Specialties in mole, chiles en nogada and regional dishes.',
    address: 'Del Tepozteco 13, Santísima Trinidad, Tepoztlán, Morelos',
    phone: '+52 739 395 0198',
    website: 'https://www.facebook.com/loscolorinestepoztlan',
    hours: '8:00 AM - 10:00 PM',
    featured: true,
    tags: ['mexicana', 'tradicional', 'icónico', 'mole', 'terraza'],
    amenities: {
      es: ['Terraza', 'WiFi gratis', 'Acepta tarjetas', 'Música en vivo'],
      en: ['Terrace', 'Free WiFi', 'Cards accepted', 'Live music']
    },
    hasWifi: true,
    acceptsCards: true,
    hasParking: true,
    images: ['/images/businesses/los-colorines-exterior.jpg', '/images/businesses/los-colorines-food.jpg'],
    operatingHours: {
      monday: { open: '08:00', close: '22:00' },
      tuesday: { open: '08:00', close: '22:00' },
      wednesday: { open: '08:00', close: '22:00' },
      thursday: { open: '08:00', close: '22:00' },
      friday: { open: '08:00', close: '22:00' },
      saturday: { open: '08:00', close: '22:00' },
      sunday: { open: '08:00', close: '22:00' }
    },
    reviewCount: 1247,
    isVerified: true
  },
  {
    id: 'la-veladora',
    name: 'La Veladora',
    nameEn: 'La Veladora',
    category: 'restaurant',
    subcategory: 'mexican',
    coordinates: [-99.1017, 18.9847] as [number, number],
    rating: 4.5,
    priceLevel: 2,
    description: 'Cocina mexicana tradicional en el corazón de Tepoztlán. Ambiente acogedor con decoración típica mexicana y deliciosos platillos caseros.',
    descriptionEn: 'Traditional Mexican cuisine in the heart of Tepoztlán. Cozy atmosphere with typical Mexican decoration and delicious homemade dishes.',
    address: 'Revolución 1910, Centro, Tepoztlán, Morelos',
    phone: '+52 739 395 1234',
    hours: '9:00 AM - 10:00 PM',
    tags: ['mexicana', 'centro', 'tradicional', 'casera'],
    amenities: {
      es: ['WiFi', 'Terraza pequeña', 'Acepta efectivo'],
      en: ['WiFi', 'Small terrace', 'Cash only']
    },
    hasWifi: true,
    acceptsCards: false,
    reviewCount: 892,
    isVerified: true
  },
  {
    id: 'cafe-tepozteco',
    name: 'Café Tepozteco',
    nameEn: 'Tepozteco Cafe',
    category: 'cafe',
    subcategory: 'coffee',
    coordinates: [-99.0992, 18.9849] as [number, number],
    rating: 4.4,
    priceLevel: 2,
    description: 'Café artesanal con vista a las montañas y ambiente acogedor. Especializado en café de Morelos, postres caseros y desayunos saludables.',
    descriptionEn: 'Artisan coffee with mountain views and cozy atmosphere. Specialized in Morelos coffee, homemade desserts and healthy breakfasts.',
    address: 'Zaragoza 12, Centro, Tepoztlán, Morelos',
    phone: '+52 739 395 5678',
    website: 'https://www.instagram.com/cafetepozteco',
    hours: '7:00 AM - 8:00 PM',
    tags: ['café', 'artesanal', 'vista', 'desayunos', 'postres'],
    amenities: {
      es: ['WiFi gratis', 'Enchufes', 'Vista panorámica', 'Pet friendly'],
      en: ['Free WiFi', 'Power outlets', 'Panoramic view', 'Pet friendly']
    },
    hasWifi: true,
    acceptsCards: true,
    isPetFriendly: true,
    reviewCount: 634,
    isVerified: true,
    operatingHours: {
      monday: { open: '07:00', close: '20:00' },
      tuesday: { open: '07:00', close: '20:00' },
      wednesday: { open: '07:00', close: '20:00' },
      thursday: { open: '07:00', close: '20:00' },
      friday: { open: '07:00', close: '20:00' },
      saturday: { open: '07:00', close: '20:00' },
      sunday: { open: '07:00', close: '20:00' }
    }
  },
  {
    id: 'el-ciruelo',
    name: 'El Ciruelo',
    nameEn: 'El Ciruelo',
    category: 'restaurant',
    subcategory: 'mexican',
    coordinates: [-99.0985, 18.9851] as [number, number],
    rating: 4.6,
    priceLevel: 3,
    description: 'Restaurante gourmet con terraza jardín. Cocina mexicana contemporánea con ingredientes locales y presentación artística.',
    descriptionEn: 'Gourmet restaurant with garden terrace. Contemporary Mexican cuisine with local ingredients and artistic presentation.',
    address: 'Paraíso 3, Centro, Tepoztlán, Morelos',
    phone: '+52 739 395 9876',
    website: 'https://elciruelo.com.mx',
    hours: '1:00 PM - 10:00 PM',
    featured: true,
    tags: ['gourmet', 'terraza', 'contemporánea', 'jardín', 'romántico'],
    amenities: {
      es: ['Terraza jardín', 'WiFi', 'Valet parking', 'Música ambiente', 'Reservaciones'],
      en: ['Garden terrace', 'WiFi', 'Valet parking', 'Ambient music', 'Reservations']
    },
    hasWifi: true,
    acceptsCards: true,
    hasParking: true,
    reviewCount: 756,
    isVerified: true
  },

  // HOTELS & ACCOMMODATION
  {
    id: 'posada-tepoztlan',
    name: 'Posada Tepoztlán',
    nameEn: 'Posada Tepoztlán',
    category: 'hotel',
    subcategory: 'boutique',
    coordinates: [-99.0995, 18.9850] as [number, number],
    rating: 4.6,
    priceLevel: 4,
    description: 'Hotel boutique con arquitectura colonial y jardines exuberantes. Habitaciones únicas decoradas con arte mexicano y todas las comodidades modernas.',
    descriptionEn: 'Boutique hotel with colonial architecture and lush gardens. Unique rooms decorated with Mexican art and all modern amenities.',
    address: 'Paraíso 3, Centro, Tepoztlán, Morelos',
    phone: '+52 739 395 0010',
    website: 'https://posadatepoztlan.com',
    email: 'info@posadatepoztlan.com',
    featured: true,
    tags: ['boutique', 'colonial', 'jardines', 'spa', 'piscina'],
    amenities: {
      es: ['Spa', 'Piscina', 'Restaurant', 'WiFi gratis', 'Jardines', 'Estacionamiento'],
      en: ['Spa', 'Pool', 'Restaurant', 'Free WiFi', 'Gardens', 'Parking']
    },
    hasWifi: true,
    acceptsCards: true,
    hasParking: true,
    reviewCount: 2341,
    isVerified: true,
    operatingHours: {
      monday: { open: '00:00', close: '23:59' },
      tuesday: { open: '00:00', close: '23:59' },
      wednesday: { open: '00:00', close: '23:59' },
      thursday: { open: '00:00', close: '23:59' },
      friday: { open: '00:00', close: '23:59' },
      saturday: { open: '00:00', close: '23:59' },
      sunday: { open: '00:00', close: '23:59' }
    }
  },
  {
    id: 'hotel-tepoztlan',
    name: 'Hotel Tepoztlán',
    nameEn: 'Hotel Tepoztlán',
    category: 'hotel',
    subcategory: 'traditional',
    coordinates: [-99.1000, 18.9845] as [number, number],
    rating: 4.2,
    priceLevel: 2,
    description: 'Hotel tradicional en el centro de Tepoztlán. Habitaciones cómodas con vista a las montañas y fácil acceso a todos los atractivos.',
    descriptionEn: 'Traditional hotel in downtown Tepoztlán. Comfortable rooms with mountain views and easy access to all attractions.',
    address: 'Revolución 1910 #33, Centro, Tepoztlán, Morelos',
    phone: '+52 739 395 0033',
    tags: ['tradicional', 'centro', 'montañas', 'económico'],
    amenities: {
      es: ['WiFi', 'Desayuno incluido', 'Recepción 24h'],
      en: ['WiFi', 'Breakfast included', '24h reception']
    },
    hasWifi: true,
    acceptsCards: true,
    reviewCount: 1156,
    isVerified: true
  },

  // ATTRACTIONS & CULTURE
  {
    id: 'tepozteco-pyramid',
    name: 'Pirámide del Tepozteco',
    nameEn: 'Tepozteco Pyramid',
    category: 'attraction',
    subcategory: 'archaeological',
    coordinates: [-99.0958, 18.9892] as [number, number],
    rating: 4.8,
    priceLevel: 1,
    description: 'Sitio arqueológico prehispánico dedicado a Tepoztécatl, dios del pulque. Ubicado en la cima del cerro con vistas espectaculares de todo el valle.',
    descriptionEn: 'Pre-Hispanic archaeological site dedicated to Tepoztécatl, god of pulque. Located at the hilltop with spectacular views of the entire valley.',
    address: 'Cerro del Tepozteco, Tepoztlán, Morelos',
    phone: '+52 739 395 0829',
    hours: '9:00 AM - 5:30 PM',
    featured: true,
    tags: ['arqueología', 'senderismo', 'vistas', 'historia', 'naturaleza'],
    amenities: {
      es: ['Guías certificados', 'Estacionamiento', 'Área de descanso', 'Sanitarios'],
      en: ['Certified guides', 'Parking', 'Rest area', 'Restrooms']
    },
    hasParking: true,
    reviewCount: 5423,
    isVerified: true,
    operatingHours: {
      tuesday: { open: '09:00', close: '17:30' },
      wednesday: { open: '09:00', close: '17:30' },
      thursday: { open: '09:00', close: '17:30' },
      friday: { open: '09:00', close: '17:30' },
      saturday: { open: '09:00', close: '17:30' },
      sunday: { open: '09:00', close: '17:30' },
      monday: { open: '00:00', close: '00:00', closed: true }
    }
  },
  {
    id: 'ex-convento',
    name: 'Ex-Convento Dominico de la Natividad',
    nameEn: 'Dominican Ex-Convent of the Nativity',
    category: 'attraction',
    subcategory: 'museum',
    coordinates: [-99.1015, 18.9848] as [number, number],
    rating: 4.5,
    priceLevel: 1,
    description: 'Monumento histórico del siglo XVI declarado Patrimonio de la Humanidad por la UNESCO. Museo con arte religioso y historia de la evangelización.',
    descriptionEn: 'Historic monument from the 16th century declared World Heritage Site by UNESCO. Museum with religious art and evangelization history.',
    address: 'Plaza Central, Centro, Tepoztlán, Morelos',
    phone: '+52 739 395 0717',
    hours: '10:00 AM - 6:00 PM',
    featured: true,
    tags: ['historia', 'unesco', 'museo', 'arte religioso', 'arquitectura'],
    amenities: {
      es: ['Guías', 'Biblioteca', 'Tienda de regalos', 'Acceso para discapacitados'],
      en: ['Guides', 'Library', 'Gift shop', 'Disabled access']
    },
    reviewCount: 1892,
    isVerified: true
  },

  // SHOPPING & CRAFTS
  {
    id: 'mercado-artesanal',
    name: 'Mercado de Artesanías',
    nameEn: 'Handicrafts Market',
    category: 'shopping',
    subcategory: 'market',
    coordinates: [-99.1012, 18.9850] as [number, number],
    rating: 4.3,
    priceLevel: 2,
    description: 'Mercado tradicional con artesanías locales, textiles, cerámica, joyería y productos típicos de Morelos. Ambiente colorido y auténtico.',
    descriptionEn: 'Traditional market with local handicrafts, textiles, ceramics, jewelry and typical products from Morelos. Colorful and authentic atmosphere.',
    address: 'Revolución 1910, Centro, Tepoztlán, Morelos',
    hours: '9:00 AM - 7:00 PM',
    tags: ['artesanías', 'textiles', 'cerámica', 'souvenirs', 'local'],
    amenities: {
      es: ['Variedad de productos', 'Precios negociables', 'Productos únicos'],
      en: ['Product variety', 'Negotiable prices', 'Unique products']
    },
    acceptsCards: false,
    reviewCount: 756,
    isVerified: true,
    operatingHours: {
      monday: { open: '09:00', close: '19:00' },
      tuesday: { open: '09:00', close: '19:00' },
      wednesday: { open: '09:00', close: '19:00' },
      thursday: { open: '09:00', close: '19:00' },
      friday: { open: '09:00', close: '19:00' },
      saturday: { open: '09:00', close: '19:00' },
      sunday: { open: '09:00', close: '19:00' }
    }
  },
  {
    id: 'casa-artesanias-morelos',
    name: 'Casa de las Artesanías de Morelos',
    nameEn: 'Morelos Handicrafts House',
    category: 'shopping',
    subcategory: 'crafts',
    coordinates: [-99.1020, 18.9852] as [number, number],
    rating: 4.4,
    priceLevel: 2,
    description: 'Tienda oficial de artesanías del estado de Morelos. Productos certificados de calidad con precios justos para los artesanos.',
    descriptionEn: 'Official handicrafts store of Morelos state. Certified quality products with fair prices for artisans.',
    address: 'Av. Revolución 1910, Centro, Tepoztlán, Morelos',
    phone: '+52 739 395 1122',
    hours: '10:00 AM - 6:00 PM',
    tags: ['oficial', 'certificado', 'calidad', 'comercio justo'],
    amenities: {
      es: ['Productos certificados', 'Acepta tarjetas', 'WiFi', 'Envíos'],
      en: ['Certified products', 'Cards accepted', 'WiFi', 'Shipping']
    },
    hasWifi: true,
    acceptsCards: true,
    reviewCount: 423,
    isVerified: true
  },

  // EXPERIENCES & TOURS
  {
    id: 'temazcal-tepoztlan',
    name: 'Temazcal Tepoztlán',
    nameEn: 'Temazcal Tepoztlán',
    category: 'experience',
    subcategory: 'wellness',
    coordinates: [-99.0975, 18.9840] as [number, number],
    rating: 4.7,
    priceLevel: 3,
    description: 'Experiencia ancestral de temazcal en un ambiente natural. Ceremonia tradicional con hierbas medicinales y guía espiritual certificado.',
    descriptionEn: 'Ancestral temazcal experience in a natural environment. Traditional ceremony with medicinal herbs and certified spiritual guide.',
    address: 'Camino al Tepozteco s/n, Tepoztlán, Morelos',
    phone: '+52 739 395 7788',
    website: 'https://www.temazcaltepoztlan.com',
    hours: 'Por cita - By appointment',
    featured: true,
    tags: ['temazcal', 'ancestral', 'wellness', 'espiritual', 'natural'],
    amenities: {
      es: ['Guía certificado', 'Hierbas medicinales', 'Ambiente natural', 'Reservación requerida'],
      en: ['Certified guide', 'Medicinal herbs', 'Natural environment', 'Reservation required']
    },
    reviewCount: 892,
    isVerified: true
  },

  // NIGHTLIFE & ENTERTAINMENT
  {
    id: 'bar-la-luna',
    name: 'Bar La Luna',
    nameEn: 'Bar La Luna',
    category: 'cafe',
    subcategory: 'bar',
    coordinates: [-99.1005, 18.9855] as [number, number],
    rating: 4.2,
    priceLevel: 2,
    description: 'Bar con ambiente bohemio y música en vivo. Mezcales artesanales, cócteles creativos y noches temáticas los fines de semana.',
    descriptionEn: 'Bar with bohemian atmosphere and live music. Artisanal mezcals, creative cocktails and themed nights on weekends.',
    address: 'Zaragoza 17, Centro, Tepoztlán, Morelos',
    phone: '+52 739 395 4455',
    hours: '6:00 PM - 2:00 AM',
    tags: ['bar', 'mezcal', 'música en vivo', 'bohemio', 'nocturna'],
    amenities: {
      es: ['Música en vivo', 'Terraza', 'WiFi', 'Eventos especiales'],
      en: ['Live music', 'Terrace', 'WiFi', 'Special events']
    },
    hasWifi: true,
    acceptsCards: true,
    reviewCount: 534,
    isVerified: true,
    operatingHours: {
      wednesday: { open: '18:00', close: '02:00' },
      thursday: { open: '18:00', close: '02:00' },
      friday: { open: '18:00', close: '02:00' },
      saturday: { open: '18:00', close: '02:00' },
      sunday: { open: '18:00', close: '02:00' },
      monday: { open: '00:00', close: '00:00', closed: true },
      tuesday: { open: '00:00', close: '00:00', closed: true }
    }
  },

  // SERVICES
  {
    id: 'farmacia-tepoztlan',
    name: 'Farmacia Tepoztlán',
    nameEn: 'Tepoztlán Pharmacy',
    category: 'service',
    subcategory: 'pharmacy',
    coordinates: [-99.1008, 18.9845] as [number, number],
    rating: 4.1,
    priceLevel: 2,
    description: 'Farmacia con servicio completo, medicamentos, productos de primeros auxilios y artículos de cuidado personal.',
    descriptionEn: 'Full-service pharmacy with medications, first aid products and personal care items.',
    address: 'Revolución 1910 #25, Centro, Tepoztlán, Morelos',
    phone: '+52 739 395 2233',
    hours: '8:00 AM - 10:00 PM',
    tags: ['farmacia', 'medicamentos', 'primeros auxilios', 'servicio'],
    amenities: {
      es: ['Medicamentos', 'Primeros auxilios', 'Acepta recetas', 'Servicio rápido'],
      en: ['Medications', 'First aid', 'Accepts prescriptions', 'Quick service']
    },
    acceptsCards: true,
    reviewCount: 267,
    isVerified: true
  }
]

// Enhanced category configurations with more details
export const businessCategories = [
  { 
    id: 'all', 
    name: 'Todos', 
    nameEn: 'All',
    icon: '🔍', 
    color: 'from-gray-400 to-gray-600',
    description: 'Ver todos los negocios',
    descriptionEn: 'View all businesses'
  },
  { 
    id: 'restaurant', 
    name: 'Restaurantes', 
    nameEn: 'Restaurants',
    icon: '🍽️', 
    color: 'from-red-400 to-red-600',
    description: 'Cocina tradicional y gourmet',
    descriptionEn: 'Traditional and gourmet cuisine'
  },
  { 
    id: 'hotel', 
    name: 'Hoteles', 
    nameEn: 'Hotels',
    icon: '🏨', 
    color: 'from-blue-400 to-blue-600',
    description: 'Alojamiento y hospedaje',
    descriptionEn: 'Accommodation and lodging'
  },
  { 
    id: 'cafe', 
    name: 'Cafeterías', 
    nameEn: 'Cafes',
    icon: '☕', 
    color: 'from-amber-400 to-amber-600',
    description: 'Café, bares y bebidas',
    descriptionEn: 'Coffee, bars and beverages'
  },
  { 
    id: 'shopping', 
    name: 'Compras', 
    nameEn: 'Shopping',
    icon: '🛍️', 
    color: 'from-green-400 to-green-600',
    description: 'Artesanías y souvenirs',
    descriptionEn: 'Handicrafts and souvenirs'
  },
  { 
    id: 'attraction', 
    name: 'Atracciones', 
    nameEn: 'Attractions',
    icon: '🏛️', 
    color: 'from-purple-400 to-purple-600',
    description: 'Sitios históricos y museos',
    descriptionEn: 'Historic sites and museums'
  },
  { 
    id: 'experience', 
    name: 'Experiencias', 
    nameEn: 'Experiences',
    icon: '🌟', 
    color: 'from-pink-400 to-pink-600',
    description: 'Tours y actividades',
    descriptionEn: 'Tours and activities'
  },
  { 
    id: 'service', 
    name: 'Servicios', 
    nameEn: 'Services',
    icon: '⚕️', 
    color: 'from-teal-400 to-teal-600',
    description: 'Servicios esenciales',
    descriptionEn: 'Essential services'
  }
]

// Search suggestions for autocomplete
export const searchSuggestions = {
  es: [
    'comida mexicana', 'mole', 'chiles en nogada', 'café artesanal', 'mezcal',
    'hotel boutique', 'posada', 'pirámide', 'temazcal', 'artesanías',
    'mercado', 'museo', 'centro histórico', 'terraza', 'vista panorámica'
  ],
  en: [
    'mexican food', 'mole', 'chiles en nogada', 'artisan coffee', 'mezcal',
    'boutique hotel', 'inn', 'pyramid', 'temazcal', 'handicrafts',
    'market', 'museum', 'historic center', 'terrace', 'panoramic view'
  ]
}

// Popular filters for quick access
export const popularFilters = {
  es: [
    { name: 'Con WiFi', value: 'wifi' },
    { name: 'Acepta tarjetas', value: 'cards' },
    { name: 'Pet friendly', value: 'pets' },
    { name: 'Con estacionamiento', value: 'parking' },
    { name: 'Terraza', value: 'terrace' },
    { name: 'Vista panorámica', value: 'view' }
  ],
  en: [
    { name: 'WiFi available', value: 'wifi' },
    { name: 'Cards accepted', value: 'cards' },
    { name: 'Pet friendly', value: 'pets' },
    { name: 'Parking available', value: 'parking' },
    { name: 'Terrace', value: 'terrace' },
    { name: 'Panoramic view', value: 'view' }
  ]
}

// Utility functions for business data
export const getBusinessesByCategory = (category: string) => {
  if (category === 'all') return tepoztlanBusinesses
  return tepoztlanBusinesses.filter(business => business.category === category)
}

export const getFeaturedBusinesses = () => {
  return tepoztlanBusinesses.filter(business => business.featured)
}

export const getBusinessesByRating = (minRating: number = 4.0) => {
  return tepoztlanBusinesses.filter(business => business.rating >= minRating)
}

export const searchBusinesses = (query: string, lang: 'es' | 'en' = 'es') => {
  const lowerQuery = query.toLowerCase()
  return tepoztlanBusinesses.filter(business => {
    const name = lang === 'en' && business.nameEn ? business.nameEn : business.name
    const description = lang === 'en' && business.descriptionEn ? business.descriptionEn : business.description
    
    return (
      name.toLowerCase().includes(lowerQuery) ||
      description.toLowerCase().includes(lowerQuery) ||
      business.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      business.category.toLowerCase().includes(lowerQuery) ||
      business.address.toLowerCase().includes(lowerQuery)
    )
  })
}