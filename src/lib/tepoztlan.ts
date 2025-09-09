import { Locale } from './i18n'

export interface TepoztlanAttraction {
  id: string
  name: {
    es: string
    en: string
  }
  description: {
    es: string
    en: string
  }
  longDescription: {
    es: string
    en: string
  }
  category: 'archaeological' | 'natural' | 'cultural' | 'spiritual' | 'recreational' | 'gastronomic'
  type: 'pyramid' | 'market' | 'church' | 'museum' | 'viewpoint' | 'plaza' | 'trail' | 'restaurant' | 'shop'
  difficulty?: {
    es: string
    en: string
  }
  duration?: {
    es: string
    en: string
  }
  price?: {
    es: string
    en: string
  }
  imageUrl: string
  images?: string[]
  location: {
    es: string
    en: string
  }
  highlights: {
    es: string[]
    en: string[]
  }
  bestTime?: {
    es: string
    en: string
  }
  requirements?: {
    es: string[]
    en: string[]
  }
  rating: number
  featured: boolean
  popular: boolean
  mustSee?: boolean
}

// Category definitions
export const tepoztlanCategories = [
  { id: 'all', es: 'Todos', en: 'All', emoji: '🏛️', color: 'from-orange-400 to-red-400' },
  { id: 'archaeological', es: 'Arqueológico', en: 'Archaeological', emoji: '⛰️', color: 'from-stone-400 to-amber-400' },
  { id: 'cultural', es: 'Cultural', en: 'Cultural', emoji: '🎭', color: 'from-purple-400 to-indigo-400' },
  { id: 'spiritual', es: 'Espiritual', en: 'Spiritual', emoji: '🙏', color: 'from-blue-400 to-cyan-400' },
  { id: 'natural', es: 'Natural', en: 'Natural', emoji: '🌿', color: 'from-green-400 to-emerald-400' },
  { id: 'recreational', es: 'Recreativo', en: 'Recreational', emoji: '🎯', color: 'from-yellow-400 to-orange-400' },
  { id: 'gastronomic', es: 'Gastronómico', en: 'Gastronomic', emoji: '🍽️', color: 'from-red-400 to-pink-400' }
]

// Tepoztlán attractions data
const tepoztlanAttractions: TepoztlanAttraction[] = [
  {
    id: 'piramide-tepozteco',
    name: {
      es: 'Pirámide del Tepozteco',
      en: 'Tepozteco Pyramid'
    },
    description: {
      es: 'Templo prehispánico dedicado al dios Tepoztécatl en la cima del cerro',
      en: 'Pre-Hispanic temple dedicated to god Tepoztécatl at the hilltop'
    },
    longDescription: {
      es: 'La Pirámide del Tepozteco es un templo prehispánico construido entre 1150 y 1350 d.C., dedicado al dios Tepoztécatl, deidad del pulque, la fertilidad y la cosecha. Ubicada en la cima del Cerro del Tepozteco a 2,000 metros de altura, ofrece vistas panorámicas espectaculares del valle de Morelos.',
      en: 'The Tepozteco Pyramid is a pre-Hispanic temple built between 1150-1350 AD, dedicated to god Tepoztécatl, deity of pulque, fertility and harvest. Located at the summit of Tepozteco Hill at 2,000 meters elevation, it offers spectacular panoramic views of the Morelos valley.'
    },
    category: 'archaeological',
    type: 'pyramid',
    difficulty: {
      es: 'Difícil',
      en: 'Hard'
    },
    duration: {
      es: '3-4 horas (incluyendo caminata)',
      en: '3-4 hours (including hike)'
    },
    price: {
      es: '$75 MXN entrada + costo del sendero',
      en: '$75 MXN entrance + trail cost'
    },
    imageUrl: '/tepozteco.png',
    location: {
      es: '2.5 km del centro (sendero)',
      en: '2.5 km from center (trail)'
    },
    highlights: {
      es: [
        'Vista panorámica del valle',
        'Templo prehispánico auténtico',
        'Senderismo desafiante',
        'Historia ancestral de Tepoztécatl'
      ],
      en: [
        'Panoramic valley view',
        'Authentic pre-Hispanic temple',
        'Challenging hiking',
        'Ancestral history of Tepoztécatl'
      ]
    },
    bestTime: {
      es: 'Temprano en la mañana o tarde',
      en: 'Early morning or afternoon'
    },
    requirements: {
      es: [
        'Excelente condición física',
        'Zapatos de senderismo',
        'Agua abundante',
        'Protección solar'
      ],
      en: [
        'Excellent physical condition',
        'Hiking shoes',
        'Plenty of water',
        'Sun protection'
      ]
    },
    rating: 4.8,
    featured: true,
    popular: true,
    mustSee: true
  },
  {
    id: 'mercado-artesanias',
    name: {
      es: 'Mercado de Artesanías',
      en: 'Handicrafts Market'
    },
    description: {
      es: 'Mercado tradicional con artesanías locales y productos típicos',
      en: 'Traditional market with local handicrafts and typical products'
    },
    longDescription: {
      es: 'El mercado de artesanías de Tepoztlán es un espacio vibrante donde artesanos locales exhiben y venden sus creaciones. Desde textiles bordados hasta cerámica tradicional, joyería de plata y productos naturales como miel y hierbas medicinales, el mercado es un reflejo auténtico de la cultura local.',
      en: 'Tepoztlán\'s handicrafts market is a vibrant space where local artisans display and sell their creations. From embroidered textiles to traditional ceramics, silver jewelry and natural products like honey and medicinal herbs, the market is an authentic reflection of local culture.'
    },
    category: 'cultural',
    type: 'market',
    difficulty: {
      es: 'Fácil',
      en: 'Easy'
    },
    duration: {
      es: '1-2 horas',
      en: '1-2 hours'
    },
    price: {
      es: 'Entrada libre',
      en: 'Free entrance'
    },
    imageUrl: '/mercadoArtesanias.jpg',
    location: {
      es: 'Centro histórico, cerca de la plaza principal',
      en: 'Historic center, near main plaza'
    },
    highlights: {
      es: [
        'Artesanías auténticas',
        'Productos naturales locales',
        'Interacción con artesanos',
        'Precios justos'
      ],
      en: [
        'Authentic handicrafts',
        'Local natural products',
        'Interaction with artisans',
        'Fair prices'
      ]
    },
    bestTime: {
      es: 'Fines de semana y festivales',
      en: 'Weekends and festivals'
    },
    rating: 4.5,
    featured: true,
    popular: true
  },
  {
    id: 'ex-convento-natividad',
    name: {
      es: 'Ex Convento de la Natividad',
      en: 'Former Convent of the Nativity'
    },
    description: {
      es: 'Monumento histórico del siglo XVI con arquitectura colonial excepcional',
      en: '16th-century historical monument with exceptional colonial architecture'
    },
    longDescription: {
      es: 'Construido por los dominicos en 1560, este ex convento es Patrimonio Mundial de la UNESCO. Sus murales del siglo XVI narran la evangelización de México. La arquitectura combina elementos góticos, renacentistas y mudéjares, creando un conjunto arquitectónico único en América.',
      en: 'Built by Dominicans in 1560, this former convent is a UNESCO World Heritage site. Its 16th-century murals narrate Mexico\'s evangelization. The architecture combines Gothic, Renaissance and Mudejar elements, creating a unique architectural ensemble in America.'
    },
    category: 'cultural',
    type: 'church',
    difficulty: {
      es: 'Fácil',
      en: 'Easy'
    },
    duration: {
      es: '45 minutos - 1 hora',
      en: '45 minutes - 1 hour'
    },
    price: {
      es: '$45 MXN entrada',
      en: '$45 MXN entrance'
    },
    imageUrl: '/iglesiaNatividad.jpg',
    location: {
      es: 'Plaza principal, Centro',
      en: 'Main plaza, Downtown'
    },
    highlights: {
      es: [
        'Patrimonio UNESCO',
        'Murales del siglo XVI',
        'Arquitectura colonial',
        'Historia de evangelización'
      ],
      en: [
        'UNESCO Heritage',
        '16th-century murals',
        'Colonial architecture',
        'Evangelization history'
      ]
    },
    bestTime: {
      es: 'Todo el año',
      en: 'Year-round'
    },
    rating: 4.6,
    featured: true,
    popular: true,
    mustSee: true
  },
  {
    id: 'plaza-principal',
    name: {
      es: 'Plaza Principal',
      en: 'Main Plaza'
    },
    description: {
      es: 'Corazón social y cultural de Tepoztlán con eventos y vida cotidiana',
      en: 'Social and cultural heart of Tepoztlán with events and daily life'
    },
    longDescription: {
      es: 'El zócalo de Tepoztlán es el punto de encuentro donde late la vida del pueblo. Rodeado de portales coloniales, restaurantes y cafés, la plaza cobra vida especialmente los fines de semana con eventos culturales, música en vivo y la famosa feria dominical.',
      en: 'Tepoztlán\'s main square is the meeting point where the town\'s life beats. Surrounded by colonial portals, restaurants and cafes, the plaza comes alive especially on weekends with cultural events, live music and the famous Sunday fair.'
    },
    category: 'cultural',
    type: 'plaza',
    difficulty: {
      es: 'Fácil',
      en: 'Easy'
    },
    duration: {
      es: '30 minutos - 1 hora',
      en: '30 minutes - 1 hour'
    },
    price: {
      es: 'Entrada libre',
      en: 'Free entrance'
    },
    imageUrl: '/zocaloTepoztlan.jpg',
    location: {
      es: 'Centro del pueblo',
      en: 'Town center'
    },
    highlights: {
      es: [
        'Portales coloniales',
        'Eventos culturales',
        'Feria dominical',
        'Vida local auténtica'
      ],
      en: [
        'Colonial portals',
        'Cultural events',
        'Sunday fair',
        'Authentic local life'
      ]
    },
    bestTime: {
      es: 'Fines de semana y festivales',
      en: 'Weekends and festivals'
    },
    rating: 4.4,
    featured: false,
    popular: true
  },
  {
    id: 'museo-carlos-pellicer',
    name: {
      es: 'Museo Carlos Pellicer',
      en: 'Carlos Pellicer Museum'
    },
    description: {
      es: 'Museo arqueológico con piezas prehispánicas de la región',
      en: 'Archaeological museum with pre-Hispanic pieces from the region'
    },
    longDescription: {
      es: 'Ubicado en el Ex Convento de la Natividad, este museo alberga una importante colección de piezas arqueológicas prehispánicas donadas por el poeta tabasqueño Carlos Pellicer Cámara. La colección incluye cerámicas, esculturas y objetos rituales de diversas culturas mesoamericanas.',
      en: 'Located in the Former Convent of the Nativity, this museum houses an important collection of pre-Hispanic archaeological pieces donated by Tabascan poet Carlos Pellicer Cámara. The collection includes ceramics, sculptures and ritual objects from various Mesoamerican cultures.'
    },
    category: 'cultural',
    type: 'museum',
    difficulty: {
      es: 'Fácil',
      en: 'Easy'
    },
    duration: {
      es: '1-1.5 horas',
      en: '1-1.5 hours'
    },
    price: {
      es: '$45 MXN entrada',
      en: '$45 MXN entrance'
    },
    imageUrl: '/Museo_Pellicer.jpg',
    location: {
      es: 'Ex Convento de la Natividad, Centro',
      en: 'Former Convent of the Nativity, Downtown'
    },
    highlights: {
      es: [
        'Colección arqueológica',
        'Arte prehispánico',
        'Cerámicas antiguas',
        'Historia mesoamericana'
      ],
      en: [
        'Archaeological collection',
        'Pre-Hispanic art',
        'Ancient ceramics',
        'Mesoamerican history'
      ]
    },
    bestTime: {
      es: 'Todo el año',
      en: 'Year-round'
    },
    rating: 4.2,
    featured: false,
    popular: false
  },
  {
    id: 'mirador-valle',
    name: {
      es: 'Mirador del Valle',
      en: 'Valley Viewpoint'
    },
    description: {
      es: 'Punto panorámico con vistas espectaculares del valle de Morelos',
      en: 'Panoramic viewpoint with spectacular views of the Morelos valley'
    },
    longDescription: {
      es: 'Ubicado en las faldas del cerro del Tepozteco, este mirador ofrece vistas panorámicas del valle de Morelos y los pueblos circundantes. Es un lugar perfecto para el atardecer, la fotografía y para apreciar la geografía sagrada de la región desde una perspectiva única.',
      en: 'Located on the slopes of Tepozteco hill, this viewpoint offers panoramic views of the Morelos valley and surrounding villages. It\'s a perfect spot for sunset, photography and appreciating the sacred geography of the region from a unique perspective.'
    },
    category: 'natural',
    type: 'viewpoint',
    difficulty: {
      es: 'Moderado',
      en: 'Moderate'
    },
    duration: {
      es: '30-45 minutos caminata',
      en: '30-45 minutes hike'
    },
    price: {
      es: 'Entrada libre',
      en: 'Free entrance'
    },
    imageUrl: '/tepozteco-pyramid.jpg',
    location: {
      es: '500m del centro',
      en: '500m from center'
    },
    highlights: {
      es: [
        'Vista panorámica',
        'Fotografía de paisaje',
        'Atardeceres espectaculares',
        'Geografía sagrada'
      ],
      en: [
        'Panoramic view',
        'Landscape photography',
        'Spectacular sunsets',
        'Sacred geography'
      ]
    },
    bestTime: {
      es: 'Atardecer y amanecer',
      en: 'Sunset and sunrise'
    },
    requirements: {
      es: ['Zapatos cómodos', 'Cámara fotográfica'],
      en: ['Comfortable shoes', 'Camera']
    },
    rating: 4.3,
    featured: false,
    popular: true
  }
]

export class TepoztlanService {
  static getAllAttractions(): TepoztlanAttraction[] {
    return tepoztlanAttractions
  }

  static getAttractionById(id: string): TepoztlanAttraction | undefined {
    return tepoztlanAttractions.find(attraction => attraction.id === id)
  }

  static getAttractionName(attraction: TepoztlanAttraction, locale: Locale): string {
    return attraction.name[locale]
  }

  static getAttractionDescription(attraction: TepoztlanAttraction, locale: Locale): string {
    return attraction.description[locale]
  }

  static getAttractionLongDescription(attraction: TepoztlanAttraction, locale: Locale): string {
    return attraction.longDescription[locale]
  }

  static getCategoryName(categoryId: string, locale: Locale): string {
    const category = tepoztlanCategories.find(cat => cat.id === categoryId)
    return category ? category[locale] : categoryId
  }

  static getAttractionDuration(attraction: TepoztlanAttraction, locale: Locale): string | undefined {
    return attraction.duration ? attraction.duration[locale] : undefined
  }

  static getAttractionLocation(attraction: TepoztlanAttraction, locale: Locale): string {
    return attraction.location[locale]
  }

  static getAttractionHighlights(attraction: TepoztlanAttraction, locale: Locale): string[] {
    return attraction.highlights[locale]
  }

  static getAttractionRequirements(attraction: TepoztlanAttraction, locale: Locale): string[] {
    return attraction.requirements ? attraction.requirements[locale] : []
  }

  static getAttractionPrice(attraction: TepoztlanAttraction, locale: Locale): string | undefined {
    return attraction.price ? attraction.price[locale] : undefined
  }

  static getFeaturedAttractions(): TepoztlanAttraction[] {
    return tepoztlanAttractions.filter(a => a.featured)
  }

  static getMustSeeAttractions(): TepoztlanAttraction[] {
    return tepoztlanAttractions.filter(a => a.mustSee)
  }

  static getAttractionsByCategory(category: string): TepoztlanAttraction[] {
    if (category === 'all') return tepoztlanAttractions
    return tepoztlanAttractions.filter(a => a.category === category)
  }

  static searchAttractions(
    query: string = ''
  ): TepoztlanAttraction[] {
    let filtered = tepoztlanAttractions

    // Text search
    if (query.trim()) {
      const searchTerm = query.toLowerCase()
      filtered = filtered.filter(attraction => 
        attraction.name.es.toLowerCase().includes(searchTerm) ||
        attraction.name.en.toLowerCase().includes(searchTerm) ||
        attraction.description.es.toLowerCase().includes(searchTerm) ||
        attraction.description.en.toLowerCase().includes(searchTerm)
      )
    }

    return filtered
  }

  static filterByCategory(attractions: TepoztlanAttraction[], category: string): TepoztlanAttraction[] {
    if (category === 'all') return attractions
    return attractions.filter(a => a.category === category)
  }

  static sortAttractions(
    attractions: TepoztlanAttraction[], 
    sortBy: 'featured' | 'rating' | 'category' | 'name',
    locale: Locale = 'es'
  ): TepoztlanAttraction[] {
    const sorted = [...attractions]
    
    switch (sortBy) {
      case 'featured':
        return sorted.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return 0
        })
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      case 'category':
        return sorted.sort((a, b) => a.category.localeCompare(b.category))
      case 'name':
        return sorted.sort((a, b) => a.name[locale].localeCompare(b.name[locale]))
      default:
        return sorted
    }
  }
}