import { Locale } from './i18n'

export interface AmatlanAttraction {
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
  longDescription: {
    es: string
    en: string
  }
  category: 'ancient-site' | 'natural' | 'cultural' | 'spiritual' | 'adventure' | 'historical'
  type: 'pool' | 'temple' | 'mountain' | 'trail' | 'workshop' | 'ceremony' | 'formation'
  difficulty?: 'easy' | 'moderate' | 'hard' | 'extreme'
  duration?: {
    es: string
    en: string
  }
  price?: {
    es: string
    en: string
  }
  images: string[]
  location: {
    address: string
    coordinates: [number, number]
    distance?: {
      es: string
      en: string
    }
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
  featured: boolean
  popular: boolean
  mustSee: boolean
}

// Category definitions
export const amatlanCategories = [
  { id: 'all', es: 'Todos', en: 'All', emoji: '✨', color: 'from-purple-400 to-pink-400' },
  { id: 'ancient-site', es: 'Sitios Ancestrales', en: 'Ancient Sites', emoji: '🏛️', color: 'from-indigo-400 to-purple-400' },
  { id: 'natural', es: 'Naturaleza', en: 'Nature', emoji: '🌊', color: 'from-cyan-400 to-blue-400' },
  { id: 'cultural', es: 'Cultural', en: 'Cultural', emoji: '🎨', color: 'from-orange-400 to-red-400' },
  { id: 'spiritual', es: 'Espiritual', en: 'Spiritual', emoji: '🧘', color: 'from-purple-400 to-violet-400' },
  { id: 'adventure', es: 'Aventura', en: 'Adventure', emoji: '🥾', color: 'from-green-400 to-emerald-400' },
  { id: 'historical', es: 'Histórico', en: 'Historical', emoji: '📜', color: 'from-amber-400 to-yellow-400' }
]

// Real Amatlán attractions data
const amatlanAttractions: AmatlanAttraction[] = [
  {
    id: 'pozas-quetzalcoatl',
    slug: 'pozas-quetzalcoatl',
    name: {
      es: 'Pozas de Quetzalcóatl',
      en: 'Pools of Quetzalcoatl'
    },
    description: {
      es: 'Pozas ancestrales de agua turquesa donde según la leyenda se bañó Quetzalcóatl',
      en: 'Ancient turquoise pools where legend says Quetzalcoatl bathed'
    },
    longDescription: {
      es: 'Un sendero mágico a través de exuberante vegetación verde te lleva a estas impresionantes pozas de agua turquesa cristalina. Consideradas ancestrales por los habitantes locales, estas pozas naturales están alimentadas por cascadas y ofrecen un lugar perfecto para nadar y conectar con la naturaleza.',
      en: 'A magical trail through lush green vegetation leads you to these stunning pools of crystal-clear turquoise water. Considered ancestral by locals, these natural pools are fed by waterfalls and offer a perfect spot for swimming and connecting with nature.'
    },
    category: 'ancient-site',
    type: 'pool',
    difficulty: 'moderate',
    duration: {
      es: '2-3 horas',
      en: '2-3 hours'
    },
    price: {
      es: '$50 MXN entrada',
      en: '$50 MXN entrance'
    },
    images: [
      '/pozasQuetzalcoatl.jpg',
      '/pozasQuetzalcoatl.jpg'
    ],
    location: {
      address: 'Amatlán de Quetzalcóatl, Morelos',
      coordinates: [18.9456, -99.0534],
      distance: {
        es: '2km del centro',
        en: '2km from center'
      }
    },
    highlights: {
      es: [
        'Agua turquesa cristalina',
        'Cascadas naturales',
        'Sitio sagrado',
        'Natación permitida'
      ],
      en: [
        'Crystal clear turquoise water',
        'Natural waterfalls',
        'Ancient site',
        'Swimming allowed'
      ]
    },
    bestTime: {
      es: 'Mejor en temporada de lluvias (junio-octubre)',
      en: 'Best during rainy season (June-October)'
    },
    requirements: {
      es: ['Zapatos para agua', 'Protector solar', 'Agua potable'],
      en: ['Water shoes', 'Sunscreen', 'Drinking water']
    },
    featured: true,
    popular: true,
    mustSee: true
  },
  {
    id: 'cerro-ventana',
    slug: 'cerro-ventana',
    name: {
      es: 'Cerro de la Ventana',
      en: 'Window Mountain'
    },
    description: {
      es: 'Formación geológica icónica con una ventana natural que enmarca vistas espectaculares',
      en: 'Iconic geological formation with a natural window framing spectacular views'
    },
    longDescription: {
      es: 'Una impresionante formación rocosa que se eleva sobre Amatlán, conocida como La Puerta de Quetzalcóatl. Esta ventana natural en la montaña ofrece vistas panorámicas del valle y es considerada un portal energético por los locales. La caminata requiere buena condición física pero las vistas valen la pena.',
      en: 'An impressive rock formation rising above Amatlán, known as The Door of Quetzalcoatl. This natural window in the mountain offers panoramic views of the valley and is considered an energy portal by locals. The hike requires good physical condition but the views are worth it.'
    },
    category: 'natural',
    type: 'mountain',
    difficulty: 'hard',
    duration: {
      es: '4-5 horas',
      en: '4-5 hours'
    },
    price: {
      es: 'Entrada libre (se recomienda guía)',
      en: 'Free entrance (guide recommended)'
    },
    images: [
      '/cerroVentana.jpg',
      '/cerroVentana.jpg'
    ],
    location: {
      address: 'Amatlán de Quetzalcóatl, Morelos',
      coordinates: [18.9467, -99.0523],
      distance: {
        es: '3km del centro',
        en: '3km from center'
      }
    },
    highlights: {
      es: [
        'Vistas panorámicas',
        'Formación geológica única',
        'Portal energético',
        'Fotografía espectacular'
      ],
      en: [
        'Panoramic views',
        'Unique geological formation',
        'Energy portal',
        'Spectacular photography'
      ]
    },
    bestTime: {
      es: 'Temprano en la mañana para evitar el calor',
      en: 'Early morning to avoid heat'
    },
    requirements: {
      es: ['Calzado de senderismo', 'Agua abundante', 'Protección solar', 'Buena condición física'],
      en: ['Hiking shoes', 'Plenty of water', 'Sun protection', 'Good physical condition']
    },
    featured: true,
    popular: true,
    mustSee: true
  },
  {
    id: 'casa-quetzalcoatl',
    slug: 'casa-natal-quetzalcoatl',
    name: {
      es: 'Casa Natal de Quetzalcóatl',
      en: 'Birthplace of Quetzalcoatl'
    },
    description: {
      es: 'Sitio arqueológico donde según la tradición nació Ce Acatl Topiltzin Quetzalcóatl',
      en: 'Archaeological site where tradition says Ce Acatl Topiltzin Quetzalcoatl was born'
    },
    longDescription: {
      es: 'Amatlán es reconocido como el lugar de nacimiento del rey-sacerdote Ce Acatl Topiltzin Quetzalcóatl en el año 947 d.C. Este sitio arqueológico preserva las ruinas donde según la tradición oral y los códices antiguos nació esta importante figura de la cultura mesoamericana.',
      en: 'Amatlán is recognized as the birthplace of the priest-king Ce Acatl Topiltzin Quetzalcoatl in 947 AD. This archaeological site preserves the ruins where according to oral tradition and ancient codices this important figure of Mesoamerican culture was born.'
    },
    category: 'historical',
    type: 'temple',
    difficulty: 'easy',
    duration: {
      es: '1-2 horas',
      en: '1-2 hours'
    },
    price: {
      es: 'Entrada libre',
      en: 'Free entrance'
    },
    images: [
      '/casaQuetzalcoatl.jpg',
      '/casaQuetzalcoatl.jpg'
    ],
    location: {
      address: 'Centro de Amatlán, Morelos',
      coordinates: [18.9456, -99.0534],
      distance: {
        es: 'En el centro',
        en: 'In the center'
      }
    },
    highlights: {
      es: [
        'Sitio histórico',
        'Ruinas arqueológicas',
        'Importancia cultural',
        'Museo comunitario'
      ],
      en: [
        'Historic site',
        'Archaeological ruins',
        'Cultural importance',
        'Community museum'
      ]
    },
    bestTime: {
      es: 'Todo el año',
      en: 'Year-round'
    },
    requirements: {
      es: [],
      en: []
    },
    featured: true,
    popular: true,
    mustSee: true
  },
  {
    id: 'temazcal-ceremonial',
    slug: 'temazcal-ceremonial',
    name: {
      es: 'Temazcal Ceremonial',
      en: 'Ceremonial Temazcal'
    },
    description: {
      es: 'Baño de vapor tradicional para purificación del cuerpo y espíritu',
      en: 'Traditional sweat lodge for body and spirit purification'
    },
    longDescription: {
      es: 'Experimente una auténtica ceremonia de temazcal dirigida por un guía espiritual local. Este antiguo ritual de purificación utiliza vapor, hierbas medicinales y cantos tradicionales para limpiar el cuerpo, mente y espíritu. Una experiencia transformadora en el lugar de nacimiento de Quetzalcóatl.',
      en: 'Experience an authentic temazcal ceremony led by a local spiritual guide. This ancient purification ritual uses steam, medicinal herbs, and traditional chants to cleanse body, mind, and spirit. A transformative experience in the birthplace of Quetzalcoatl.'
    },
    category: 'spiritual',
    type: 'ceremony',
    difficulty: 'moderate',
    duration: {
      es: '2-3 horas',
      en: '2-3 hours'
    },
    price: {
      es: '$600-800 MXN por persona',
      en: '$600-800 MXN per person'
    },
    images: [
      '/TemazcalTradicional.webp',
      '/temazcal.jpg'
    ],
    location: {
      address: 'Varios lugares en Amatlán',
      coordinates: [18.9456, -99.0534],
      distance: {
        es: 'Varios',
        en: 'Various'
      }
    },
    highlights: {
      es: [
        'Ceremonia tradicional',
        'Purificación espiritual',
        'Hierbas medicinales',
        'Guía espiritual'
      ],
      en: [
        'Traditional ceremony',
        'Spiritual purification',
        'Medicinal herbs',
        'Spiritual guide'
      ]
    },
    bestTime: {
      es: 'Todo el año, preferible al atardecer',
      en: 'Year-round, preferably at sunset'
    },
    requirements: {
      es: ['Reservación previa', 'Ropa ligera', 'Mente abierta'],
      en: ['Prior reservation', 'Light clothing', 'Open mind']
    },
    featured: false,
    popular: true,
    mustSee: false
  },
  {
    id: 'sendero-nahualatl',
    slug: 'sendero-nahualatl',
    name: {
      es: 'Sendero Nahualatl',
      en: 'Nahualatl Trail'
    },
    description: {
      es: 'Caminata mística a través del bosque tropical con pinturas rupestres',
      en: 'Mystical hike through tropical forest with cave paintings'
    },
    longDescription: {
      es: 'Un sendero ancestral que serpentea a través del bosque tropical, pasando por antiguos petroglifos y pinturas rupestres. El camino te lleva a miradores naturales y sitios ceremoniales utilizados por los antiguos habitantes. Se recomienda contratar un guía local para conocer las historias y leyendas del lugar.',
      en: 'An ancestral trail that winds through the tropical forest, passing ancient petroglyphs and cave paintings. The path leads to natural viewpoints and ceremonial sites used by ancient inhabitants. Hiring a local guide is recommended to learn the stories and legends of the place.'
    },
    category: 'adventure',
    type: 'trail',
    difficulty: 'moderate',
    duration: {
      es: '3-4 horas',
      en: '3-4 hours'
    },
    price: {
      es: '$300 MXN con guía',
      en: '$300 MXN with guide'
    },
    images: [
      '/senderoNahuatl.jpg',
      '/senderoNahuatl.jpg'
    ],
    location: {
      address: 'Bosque de Amatlán',
      coordinates: [18.9478, -99.0512],
      distance: {
        es: '2.5km del centro',
        en: '2.5km from center'
      }
    },
    highlights: {
      es: [
        'Pinturas rupestres',
        'Bosque tropical',
        'Miradores naturales',
        'Flora y fauna nativa'
      ],
      en: [
        'Cave paintings',
        'Tropical forest',
        'Natural viewpoints',
        'Native flora and fauna'
      ]
    },
    bestTime: {
      es: 'Temporada seca (noviembre-mayo)',
      en: 'Dry season (November-May)'
    },
    requirements: {
      es: ['Calzado adecuado', 'Repelente', 'Agua', 'Guía recomendado'],
      en: ['Proper footwear', 'Insect repellent', 'Water', 'Guide recommended']
    },
    featured: false,
    popular: true,
    mustSee: false
  },
  {
    id: 'taller-alfareria',
    slug: 'taller-alfareria-tradicional',
    name: {
      es: 'Taller de Alfarería Tradicional',
      en: 'Traditional Pottery Workshop'
    },
    description: {
      es: 'Aprende técnicas ancestrales de alfarería con artesanos locales',
      en: 'Learn ancestral pottery techniques with local artisans'
    },
    longDescription: {
      es: 'Visita los talleres de alfarería donde los artesanos locales mantienen vivas las técnicas prehispánicas de elaboración de cerámica. Puedes observar el proceso completo o participar en un taller práctico donde crearás tu propia pieza utilizando barro local y métodos tradicionales.',
      en: 'Visit pottery workshops where local artisans keep pre-Hispanic ceramic techniques alive. You can observe the complete process or participate in a hands-on workshop where you\'ll create your own piece using local clay and traditional methods.'
    },
    category: 'cultural',
    type: 'workshop',
    difficulty: 'easy',
    duration: {
      es: '2-3 horas',
      en: '2-3 hours'
    },
    price: {
      es: '$400-600 MXN taller práctico',
      en: '$400-600 MXN hands-on workshop'
    },
    images: [
      '/TallerAlfareria.jpg',
      '/tallerCeramica.jpg'
    ],
    location: {
      address: 'Barrio de artesanos, Amatlán',
      coordinates: [18.9445, -99.0545],
      distance: {
        es: '500m del centro',
        en: '500m from center'
      }
    },
    highlights: {
      es: [
        'Técnicas prehispánicas',
        'Artesanos locales',
        'Experiencia práctica',
        'Pieza para llevar'
      ],
      en: [
        'Pre-Hispanic techniques',
        'Local artisans',
        'Hands-on experience',
        'Take-home piece'
      ]
    },
    bestTime: {
      es: 'Todo el año',
      en: 'Year-round'
    },
    requirements: {
      es: ['Reservación recomendada', 'Ropa que se pueda ensuciar'],
      en: ['Reservation recommended', 'Clothes that can get dirty']
    },
    featured: false,
    popular: false,
    mustSee: false
  }
]

export class AmatlanService {
  static getAllAttractions(): AmatlanAttraction[] {
    return amatlanAttractions
  }

  static getAttractionById(id: string): AmatlanAttraction | undefined {
    return amatlanAttractions.find(attraction => attraction.id === id)
  }

  static getAttractionName(attraction: AmatlanAttraction, locale: Locale): string {
    return attraction.name[locale]
  }

  static getAttractionDescription(attraction: AmatlanAttraction, locale: Locale): string {
    return attraction.description[locale]
  }

  static getAttractionLongDescription(attraction: AmatlanAttraction, locale: Locale): string {
    return attraction.longDescription[locale]
  }

  static getCategoryName(categoryId: string, locale: Locale): string {
    const category = amatlanCategories.find(cat => cat.id === categoryId)
    return category ? category[locale] : categoryId
  }

  static getAttractionDuration(attraction: AmatlanAttraction, locale: Locale): string | undefined {
    return attraction.duration ? attraction.duration[locale] : undefined
  }

  static getAttractionDistance(attraction: AmatlanAttraction, locale: Locale): string | undefined {
    return attraction.location.distance ? attraction.location.distance[locale] : undefined
  }

  static getAttractionHighlights(attraction: AmatlanAttraction, locale: Locale): string[] {
    return attraction.highlights[locale]
  }

  static getAttractionRequirements(attraction: AmatlanAttraction, locale: Locale): string[] {
    return attraction.requirements ? attraction.requirements[locale] : []
  }

  static getAttractionPrice(attraction: AmatlanAttraction, locale: Locale): string | undefined {
    return attraction.price ? attraction.price[locale] : undefined
  }

  static getFeaturedAttractions(): AmatlanAttraction[] {
    return amatlanAttractions.filter(a => a.featured)
  }

  static getMustSeeAttractions(): AmatlanAttraction[] {
    return amatlanAttractions.filter(a => a.mustSee)
  }

  static getAttractionsByCategory(category: string): AmatlanAttraction[] {
    if (category === 'all') return amatlanAttractions
    return amatlanAttractions.filter(a => a.category === category)
  }

  static searchAttractions(
    query: string = '',
    category: string = 'all',
    difficulty: string = 'all'
  ): AmatlanAttraction[] {
    let filtered = amatlanAttractions

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

    // Category filter
    if (category && category !== 'all') {
      filtered = filtered.filter(a => a.category === category)
    }

    // Difficulty filter
    if (difficulty && difficulty !== 'all') {
      filtered = filtered.filter(a => a.difficulty === difficulty)
    }

    return filtered
  }
}