import { Locale } from './i18n'

export interface SanJuanAttraction {
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
  category: 'archaeological' | 'natural' | 'cultural' | 'adventure' | 'traditional' | 'spiritual'
  type: 'temple' | 'cave' | 'museum' | 'trail' | 'workshop' | 'ceremony' | 'chapel'
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
export const sanJuanCategories = [
  { id: 'all', es: 'Todos', en: 'All', emoji: '🌄', color: 'from-amber-400 to-orange-400' },
  { id: 'archaeological', es: 'Arqueológico', en: 'Archaeological', emoji: '🏛️', color: 'from-stone-400 to-amber-400' },
  { id: 'natural', es: 'Natural', en: 'Natural', emoji: '🌿', color: 'from-green-400 to-emerald-400' },
  { id: 'cultural', es: 'Cultural', en: 'Cultural', emoji: '🎭', color: 'from-blue-400 to-indigo-400' },
  { id: 'adventure', es: 'Aventura', en: 'Adventure', emoji: '🥾', color: 'from-red-400 to-pink-400' },
  { id: 'traditional', es: 'Tradicional', en: 'Traditional', emoji: '🍺', color: 'from-yellow-400 to-amber-400' },
  { id: 'spiritual', es: 'Espiritual', en: 'Spiritual', emoji: '⛪', color: 'from-purple-400 to-violet-400' }
]

// Real San Juan Tlacotenco attractions data
const sanJuanAttractions: SanJuanAttraction[] = [
  {
    id: 'templo-tepozteco',
    slug: 'templo-tepozteco',
    name: {
      es: 'Templo del Tepozteco',
      en: 'Tepozteco Temple'
    },
    description: {
      es: 'Pirámide prehispánica dedicada a Ometochtli-Tepoztēcatl, dios del pulque',
      en: 'Pre-Hispanic pyramid dedicated to Ometochtli-Tepoztēcatl, god of pulque'
    },
    longDescription: {
      es: 'En la cima del cerro se encuentra esta pequeña pirámide consagrada a Ometochtli-Tepoztēcatl, el supuesto inventor del pulque. Este templo arqueológico está dedicado a uno de los 400 dioses de la fertilidad vegetal y el pulque. La caminata hasta la cima es desafiante pero las vistas panorámicas son espectaculares.',
      en: 'At the top of the hill stands this small pyramid consecrated to Ometochtli-Tepoztēcatl, the supposed inventor of pulque. This archaeological temple is dedicated to one of the 400 gods of plant fertility and pulque. The hike to the top is challenging but the panoramic views are spectacular.'
    },
    category: 'archaeological',
    type: 'temple',
    difficulty: 'hard',
    duration: {
      es: '3-4 horas ida y vuelta',
      en: '3-4 hours round trip'
    },
    price: {
      es: '$50 MXN entrada',
      en: '$50 MXN entrance'
    },
    images: [
      'https://images.unsplash.com/photo-1609960554796-4cee89edbf02?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop&q=80'
    ],
    location: {
      address: 'Cerro del Tepozteco, San Juan Tlacotenco',
      coordinates: [18.9833, -99.1000],
      distance: {
        es: '2369m de altitud',
        en: '2369m altitude'
      }
    },
    highlights: {
      es: [
        'Pirámide prehispánica',
        'Vistas panorámicas',
        'Dios del pulque',
        'Sitio arqueológico'
      ],
      en: [
        'Pre-Hispanic pyramid',
        'Panoramic views',
        'God of pulque',
        'Archaeological site'
      ]
    },
    bestTime: {
      es: 'Temprano en la mañana para evitar el calor',
      en: 'Early morning to avoid heat'
    },
    requirements: {
      es: ['Calzado de senderismo', 'Agua abundante', 'Protector solar', 'Buena condición física'],
      en: ['Hiking shoes', 'Plenty of water', 'Sunscreen', 'Good physical condition']
    },
    featured: true,
    popular: true,
    mustSee: true
  },
  {
    id: 'cueva-del-diablo',
    slug: 'cueva-del-diablo',
    name: {
      es: 'Cueva del Diablo',
      en: 'Devil\'s Cave'
    },
    description: {
      es: 'Fascinante sistema de cuevas volcánicas para exploración espeleológica',
      en: 'Fascinating volcanic cave system for spelunking exploration'
    },
    longDescription: {
      es: 'Una impresionante cueva volcánica que forma parte de un complejo sistema subterráneo. Los espeleólogos pueden explorar túneles volcánicos formados hace miles de años. Esta aventura subterránea ofrece una experiencia única para conocer la geología volcánica de la región.',
      en: 'An impressive volcanic cave that forms part of a complex underground system. Spelunkers can explore volcanic tunnels formed thousands of years ago. This underground adventure offers a unique experience to learn about the volcanic geology of the region.'
    },
    category: 'adventure',
    type: 'cave',
    difficulty: 'moderate',
    duration: {
      es: '2-3 horas',
      en: '2-3 hours'
    },
    price: {
      es: '$300 MXN con guía especializado',
      en: '$300 MXN with specialized guide'
    },
    images: [
      'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc7e?w=800&h=600&fit=crop&q=80'
    ],
    location: {
      address: 'San Juan Tlacotenco, Morelos',
      coordinates: [18.9856, -99.0978],
      distance: {
        es: '1km del centro',
        en: '1km from center'
      }
    },
    highlights: {
      es: [
        'Túneles volcánicos',
        'Formaciones geológicas',
        'Aventura subterránea',
        'Guía especializado'
      ],
      en: [
        'Volcanic tunnels',
        'Geological formations',
        'Underground adventure',
        'Specialized guide'
      ]
    },
    bestTime: {
      es: 'Todo el año, preferible temporada seca',
      en: 'Year-round, preferably dry season'
    },
    requirements: {
      es: ['Ropa cómoda y que se pueda ensuciar', 'Zapatos cerrados', 'Lámpara frontal', 'Guía obligatorio'],
      en: ['Comfortable clothes that can get dirty', 'Closed shoes', 'Headlamp', 'Guide required']
    },
    featured: true,
    popular: true,
    mustSee: false
  },
  {
    id: 'cueva-del-ferrocarril',
    slug: 'cueva-del-ferrocarril',
    name: {
      es: 'Cueva del Ferrocarril',
      en: 'Railroad Cave'
    },
    description: {
      es: 'Cueva histórica relacionada con la antigua estación de tren',
      en: 'Historic cave related to the old train station'
    },
    longDescription: {
      es: 'Esta cueva debe su nombre a la proximidad con la antigua estación del ferrocarril México-Cuernavaca que funcionó de 1897 a 1997. San Juan era la parada más cercana a Tepoztlán. La cueva ofrece una exploración más accesible para familias y principiantes en espeleología.',
      en: 'This cave owes its name to its proximity to the old Mexico City-Cuernavaca railroad station that operated from 1897 to 1997. San Juan was the stop closest to Tepoztlán. The cave offers a more accessible exploration for families and spelunking beginners.'
    },
    category: 'natural',
    type: 'cave',
    difficulty: 'easy',
    duration: {
      es: '1-2 horas',
      en: '1-2 hours'
    },
    price: {
      es: '$200 MXN entrada guiada',
      en: '$200 MXN guided entrance'
    },
    images: [
      'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80'
    ],
    location: {
      address: 'San Juan Tlacotenco, Morelos',
      coordinates: [18.9845, -99.0965],
      distance: {
        es: '800m del centro',
        en: '800m from center'
      }
    },
    highlights: {
      es: [
        'Historia ferroviaria',
        'Accesible para familias',
        'Formaciones naturales',
        'Fácil exploración'
      ],
      en: [
        'Railway history',
        'Family accessible',
        'Natural formations',
        'Easy exploration'
      ]
    },
    bestTime: {
      es: 'Todo el año',
      en: 'Year-round'
    },
    requirements: {
      es: ['Zapatos cerrados', 'Ropa cómoda', 'Lámpara o linterna'],
      en: ['Closed shoes', 'Comfortable clothes', 'Lamp or flashlight']
    },
    featured: false,
    popular: true,
    mustSee: false
  },
  {
    id: 'museo-arqueologico',
    slug: 'museo-arqueologico-local',
    name: {
      es: 'Museo Arqueológico Local',
      en: 'Local Archaeological Museum'
    },
    description: {
      es: 'Pequeño museo con piezas arqueológicas de 1028 d.C. encontradas en Chimalacatepetl',
      en: 'Small museum with archaeological pieces from 1028 AD found in Chimalacatepetl'
    },
    longDescription: {
      es: 'Inaugurado en 1995, este pequeño pero valioso museo alberga piezas arqueológicas encontradas en 1993 en el cerro Chimalacatepetl, que datan del año 1028 d.C. Las piezas muestran la rica historia prehispánica de la zona y la cultura nahua que se estableció aquí alrededor de 1100 d.C.',
      en: 'Opened in 1995, this small but valuable museum houses archaeological pieces found in 1993 on Chimalacatepetl hill, dating from 1028 AD. The pieces show the rich pre-Hispanic history of the area and the Nahua culture that settled here around 1100 AD.'
    },
    category: 'cultural',
    type: 'museum',
    difficulty: 'easy',
    duration: {
      es: '45 minutos - 1 hora',
      en: '45 minutes - 1 hour'
    },
    price: {
      es: '$30 MXN entrada',
      en: '$30 MXN entrance'
    },
    images: [
      'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800&h=600&fit=crop&q=80'
    ],
    location: {
      address: 'Centro de San Juan Tlacotenco',
      coordinates: [18.9867, -99.0934],
      distance: {
        es: 'En el centro',
        en: 'In the center'
      }
    },
    highlights: {
      es: [
        'Piezas de 1028 d.C.',
        'Historia nahua',
        'Cultura prehispánica',
        'Museo comunitario'
      ],
      en: [
        '1028 AD artifacts',
        'Nahua history',
        'Pre-Hispanic culture',
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
    popular: false,
    mustSee: true
  },
  {
    id: 'capilla-san-juan-bautista',
    slug: 'capilla-san-juan-bautista',
    name: {
      es: 'Capilla de San Juan Bautista',
      en: 'Chapel of San Juan Bautista'
    },
    description: {
      es: 'Histórica capilla al pie del Cerro de la Luz, centro espiritual del pueblo',
      en: 'Historic chapel at the foot of Cerro de la Luz, spiritual center of the town'
    },
    longDescription: {
      es: 'Esta hermosa capilla colonial se encuentra al pie del Cerro de la Luz y es el corazón espiritual de San Juan Tlacotenco. Cada 24 de junio se celebra la festividad de San Juan Bautista con tradiciones locales, danzas y una gran celebración comunitaria que mantiene vivas las tradiciones nahuas.',
      en: 'This beautiful colonial chapel is located at the foot of Cerro de la Luz and is the spiritual heart of San Juan Tlacotenco. Every June 24th, the feast of San Juan Bautista is celebrated with local traditions, dances, and a great community celebration that keeps Nahua traditions alive.'
    },
    category: 'spiritual',
    type: 'chapel',
    difficulty: 'easy',
    duration: {
      es: '30-45 minutos',
      en: '30-45 minutes'
    },
    price: {
      es: 'Entrada libre',
      en: 'Free entrance'
    },
    images: [
      'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608205011156-72dd6c2d82ac?w=800&h=600&fit=crop&q=80'
    ],
    location: {
      address: 'Centro de San Juan Tlacotenco',
      coordinates: [18.9872, -99.0928],
      distance: {
        es: 'En el centro',
        en: 'In the center'
      }
    },
    highlights: {
      es: [
        'Arquitectura colonial',
        'Festividad del 24 de junio',
        'Tradiciones nahuas',
        'Centro espiritual'
      ],
      en: [
        'Colonial architecture',
        'June 24th festival',
        'Nahua traditions',
        'Spiritual center'
      ]
    },
    bestTime: {
      es: 'Todo el año, especial 24 de junio',
      en: 'Year-round, special June 24th'
    },
    requirements: {
      es: [],
      en: []
    },
    featured: false,
    popular: true,
    mustSee: false
  },
  {
    id: 'taller-medicina-tradicional',
    slug: 'taller-medicina-tradicional',
    name: {
      es: 'Taller de Medicina Tradicional',
      en: 'Traditional Medicine Workshop'
    },
    description: {
      es: 'Aprende sobre las plantas medicinales y conocimiento ancestral nahua',
      en: 'Learn about medicinal plants and ancestral Nahua knowledge'
    },
    longDescription: {
      es: 'San Juan Tlacotenco mantiene un 12% de población indígena que preserva el conocimiento ancestral sobre medicina tradicional. En estos talleres dirigidos por curanderos locales, aprenderás sobre las plantas medicinales de la región, sus usos terapéuticos y las prácticas curativas tradicionales nahuas.',
      en: 'San Juan Tlacotenco maintains a 12% indigenous population that preserves ancestral knowledge about traditional medicine. In these workshops led by local healers, you will learn about the medicinal plants of the region, their therapeutic uses, and traditional Nahua healing practices.'
    },
    category: 'traditional',
    type: 'workshop',
    difficulty: 'easy',
    duration: {
      es: '2-3 horas',
      en: '2-3 hours'
    },
    price: {
      es: '$500 MXN por persona',
      en: '$500 MXN per person'
    },
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=600&fit=crop&q=80'
    ],
    location: {
      address: 'San Juan Tlacotenco',
      coordinates: [18.9860, -99.0940],
      distance: {
        es: '300m del centro',
        en: '300m from center'
      }
    },
    highlights: {
      es: [
        'Conocimiento nahua',
        'Plantas medicinales',
        'Curanderos locales',
        'Medicina ancestral'
      ],
      en: [
        'Nahua knowledge',
        'Medicinal plants',
        'Local healers',
        'Ancestral medicine'
      ]
    },
    bestTime: {
      es: 'Todo el año',
      en: 'Year-round'
    },
    requirements: {
      es: ['Reservación previa', 'Mente abierta', 'Respeto por tradiciones'],
      en: ['Prior reservation', 'Open mind', 'Respect for traditions']
    },
    featured: false,
    popular: false,
    mustSee: false
  }
]

export class SanJuanService {
  static getAllAttractions(): SanJuanAttraction[] {
    return sanJuanAttractions
  }

  static getAttractionById(id: string): SanJuanAttraction | undefined {
    return sanJuanAttractions.find(attraction => attraction.id === id)
  }

  static getAttractionName(attraction: SanJuanAttraction, locale: Locale): string {
    return attraction.name[locale]
  }

  static getAttractionDescription(attraction: SanJuanAttraction, locale: Locale): string {
    return attraction.description[locale]
  }

  static getAttractionLongDescription(attraction: SanJuanAttraction, locale: Locale): string {
    return attraction.longDescription[locale]
  }

  static getCategoryName(categoryId: string, locale: Locale): string {
    const category = sanJuanCategories.find(cat => cat.id === categoryId)
    return category ? category[locale] : categoryId
  }

  static getAttractionDuration(attraction: SanJuanAttraction, locale: Locale): string | undefined {
    return attraction.duration ? attraction.duration[locale] : undefined
  }

  static getAttractionDistance(attraction: SanJuanAttraction, locale: Locale): string | undefined {
    return attraction.location.distance ? attraction.location.distance[locale] : undefined
  }

  static getAttractionHighlights(attraction: SanJuanAttraction, locale: Locale): string[] {
    return attraction.highlights[locale]
  }

  static getAttractionRequirements(attraction: SanJuanAttraction, locale: Locale): string[] {
    return attraction.requirements ? attraction.requirements[locale] : []
  }

  static getAttractionPrice(attraction: SanJuanAttraction, locale: Locale): string | undefined {
    return attraction.price ? attraction.price[locale] : undefined
  }

  static getFeaturedAttractions(): SanJuanAttraction[] {
    return sanJuanAttractions.filter(a => a.featured)
  }

  static getMustSeeAttractions(): SanJuanAttraction[] {
    return sanJuanAttractions.filter(a => a.mustSee)
  }

  static getAttractionsByCategory(category: string): SanJuanAttraction[] {
    if (category === 'all') return sanJuanAttractions
    return sanJuanAttractions.filter(a => a.category === category)
  }

  static searchAttractions(
    query: string = '',
    category: string = 'all',
    difficulty: string = 'all'
  ): SanJuanAttraction[] {
    let filtered = sanJuanAttractions

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