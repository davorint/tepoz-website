import { Locale } from './i18n'

export interface Experience {
  id: string
  name: {
    es: string
    en: string
  }
  description: {
    es: string
    en: string
  }
  shortDescription: {
    es: string
    en: string
  }
  duration: {
    es: string
    en: string
  }
  location: {
    es: string
    en: string
  }
  address: {
    es: string
    en: string
  }
  category: 'adventure' | 'spiritual' | 'wellness' | 'cultural' | 'nature' | 'food' | 'art' | 'photography' | 'healing'
  type: 'individual' | 'group' | 'private'
  price: {
    es: string
    en: string
  }
  priceAmount: number
  currency: 'MXN' | 'USD'
  images: string[]
  featured: boolean
  tags: {
    es: string[]
    en: string[]
  }
  provider: {
    name: string
    contact?: string
    website?: string
    certification?: string
  }
  maxParticipants?: number
  minParticipants?: number
  ageRestriction?: string
  requirements: {
    es: string[]
    en: string[]
  }
  includes: {
    es: string[]
    en: string[]
  }
  excludes: {
    es: string[]
    en: string[]
  }
  rating: number
  reviewCount: number
  website?: string
  phone?: string
  email?: string
  socialMedia?: {
    facebook?: string
    instagram?: string
    whatsapp?: string
  }
  accessibility?: {
    wheelchairAccessible: boolean
    parkingAvailable: boolean
    difficultyLevel: 'easy' | 'moderate' | 'challenging' | 'expert'
  }
  atmosphere: 'peaceful' | 'adventurous' | 'spiritual' | 'educational' | 'relaxing' | 'challenging' | 'mystical' | 'transformative'
  environment: 'outdoor' | 'indoor' | 'mixed' | 'natural' | 'urban'
  intensity: 'low' | 'medium' | 'high' | 'extreme'
  highlights: {
    es: string[]
    en: string[]
  }
  cancellationPolicy: {
    es: string
    en: string
  }
  seasons: string[] // Available seasons
  bestTime: {
    es: string
    en: string
  }
  equipment: {
    es: string[]
    en: string[]
  }
  preparation: {
    es: string[]
    en: string[]
  }
  latitude?: number
  longitude?: number
  verified: boolean
  sustainable: boolean
  indigenous: boolean // Indigenous-led experience
}

export const mockExperiences: Experience[] = [
  {
    id: '1',
    name: {
      es: 'Ascenso al Tepozteco - Aventura Sagrada',
      en: 'Tepozteco Pyramid Hike - Sacred Adventure'
    },
    description: {
      es: 'Vive una experiencia transformadora subiendo a la pirámide del Tepozteco, uno de los sitios arqueológicos más místicos de México. Este sendero sagrado te llevará a través de bosques de encinos hasta la cima donde se encuentra el templo dedicado al dios Tepoztecatl.',
      en: 'Experience a transformative journey climbing the Tepozteco pyramid, one of Mexico\'s most mystical archaeological sites. This sacred trail will take you through oak forests to the summit where the temple dedicated to god Tepoztecatl stands.'
    },
    shortDescription: {
      es: 'Senderismo místico hasta la pirámide prehispánica con vista panorámica.',
      en: 'Mystical hiking to pre-Hispanic pyramid with panoramic views.'
    },
    duration: {
      es: '4-6 horas',
      en: '4-6 hours'
    },
    location: {
      es: 'Parque Nacional El Tepozteco',
      en: 'Tepozteco National Park'
    },
    address: {
      es: 'Entrada del Parque Nacional, Av. del Tepozteco s/n',
      en: 'National Park Entrance, Tepozteco Ave s/n'
    },
    category: 'adventure',
    type: 'group',
    price: {
      es: '$450 MXN por persona',
      en: '$450 MXN per person'
    },
    priceAmount: 450,
    currency: 'MXN',
    images: [
      '/tepozteco.png',
      '/tepozteco-pyramid.jpg'
    ],
    featured: true,
    tags: {
      es: ['Senderismo', 'Arqueología', 'Naturaleza', 'Aventura', 'Místico'],
      en: ['Hiking', 'Archaeology', 'Nature', 'Adventure', 'Mystical']
    },
    provider: {
      name: 'Guías del Tepozteco',
      contact: '+52 777 395 1234',
      certification: 'SECTUR Certificado'
    },
    maxParticipants: 12,
    minParticipants: 2,
    ageRestriction: '12+',
    requirements: {
      es: ['Buena condición física', 'Calzado deportivo', 'Protector solar', 'Agua abundante'],
      en: ['Good physical condition', 'Athletic shoes', 'Sunscreen', 'Plenty of water']
    },
    includes: {
      es: ['Guía certificado', 'Entrada al parque', 'Información histórica', 'Ritual de limpia opcional'],
      en: ['Certified guide', 'Park entrance', 'Historical information', 'Optional cleansing ritual']
    },
    excludes: {
      es: ['Comida', 'Transporte', 'Equipo personal'],
      en: ['Food', 'Transportation', 'Personal equipment']
    },
    rating: 4.8,
    reviewCount: 342,
    phone: '+52 777 395 1234',
    atmosphere: 'adventurous',
    environment: 'natural',
    intensity: 'medium',
    highlights: {
      es: ['Vista panorámica de Tepoztlán', 'Pirámide prehispánica', 'Bosque de encinos', 'Experiencia espiritual'],
      en: ['Panoramic view of Tepoztlán', 'Pre-Hispanic pyramid', 'Oak forest', 'Spiritual experience']
    },
    cancellationPolicy: {
      es: 'Cancelación gratuita hasta 24h antes',
      en: 'Free cancellation up to 24h before'
    },
    seasons: ['spring', 'summer', 'fall', 'winter'],
    bestTime: {
      es: 'Todo el año, mejor temprano en la mañana',
      en: 'Year-round, best early morning'
    },
    equipment: {
      es: ['Zapatos de senderismo', 'Mochila', 'Gorra', 'Bastón de caminata (opcional)'],
      en: ['Hiking shoes', 'Backpack', 'Cap', 'Walking stick (optional)']
    },
    preparation: {
      es: ['Desayuno ligero', 'Hidratación previa', 'Descanso suficiente'],
      en: ['Light breakfast', 'Pre-hydration', 'Adequate rest']
    },
    latitude: 18.9889,
    longitude: -99.1001,
    verified: true,
    sustainable: true,
    indigenous: false
  },
  {
    id: '2',
    name: {
      es: 'Temazcal Sagrado - Ceremonia de Purificación',
      en: 'Sacred Temazcal - Purification Ceremony'
    },
    description: {
      es: 'Participa en una ceremonia ancestral de temazcal dirigida por un curandero tradicional. Esta experiencia de purificación física, mental y espiritual te conectará con las tradiciones prehispánicas en un ambiente de respeto y sanación profunda.',
      en: 'Participate in an ancestral temazcal ceremony led by a traditional healer. This physical, mental and spiritual purification experience will connect you with pre-Hispanic traditions in an atmosphere of respect and deep healing.'
    },
    shortDescription: {
      es: 'Ceremonia ancestral de purificación en cabaña de vapor tradicional.',
      en: 'Ancestral purification ceremony in traditional sweat lodge.'
    },
    duration: {
      es: '3-4 horas',
      en: '3-4 hours'
    },
    location: {
      es: 'Centro de Medicina Tradicional',
      en: 'Traditional Medicine Center'
    },
    address: {
      es: 'Barrio de la Santísima, Tepoztlán',
      en: 'La Santísima Neighborhood, Tepoztlán'
    },
    category: 'spiritual',
    type: 'group',
    price: {
      es: '$800 MXN por persona',
      en: '$800 MXN per person'
    },
    priceAmount: 800,
    currency: 'MXN',
    images: [
      '/temazcal.jpg'
    ],
    featured: true,
    tags: {
      es: ['Temazcal', 'Purificación', 'Medicina Tradicional', 'Ceremonia', 'Sanación'],
      en: ['Temazcal', 'Purification', 'Traditional Medicine', 'Ceremony', 'Healing']
    },
    provider: {
      name: 'Don Roberto Curandero',
      contact: '+52 777 123 4567',
      certification: 'Medicina Tradicional Mexicana'
    },
    maxParticipants: 8,
    minParticipants: 4,
    ageRestriction: '16+',
    requirements: {
      es: ['Salud cardiovascular estable', 'No claustrofobia', 'Ayuno de 3 horas', 'Traje de baño'],
      en: ['Stable cardiovascular health', 'No claustrophobia', '3-hour fast', 'Swimsuit']
    },
    includes: {
      es: ['Ceremonia completa', 'Guía espiritual', 'Hierbas medicinales', 'Té ceremonial'],
      en: ['Complete ceremony', 'Spiritual guide', 'Medicinal herbs', 'Ceremonial tea']
    },
    excludes: {
      es: ['Toallas', 'Transporte', 'Comida posterior'],
      en: ['Towels', 'Transportation', 'Post-meal']
    },
    rating: 4.9,
    reviewCount: 156,
    phone: '+52 777 123 4567',
    atmosphere: 'spiritual',
    environment: 'indoor',
    intensity: 'high',
    highlights: {
      es: ['Purificación ancestral', 'Conexión espiritual', 'Sanación energética', 'Tradición auténtica'],
      en: ['Ancestral purification', 'Spiritual connection', 'Energy healing', 'Authentic tradition']
    },
    cancellationPolicy: {
      es: 'Cancelación gratuita hasta 48h antes',
      en: 'Free cancellation up to 48h before'
    },
    seasons: ['spring', 'summer', 'fall', 'winter'],
    bestTime: {
      es: 'Todo el año, mejor al atardecer',
      en: 'Year-round, best at sunset'
    },
    equipment: {
      es: ['Traje de baño', 'Toalla', 'Ropa cómoda', 'Botella de agua'],
      en: ['Swimsuit', 'Towel', 'Comfortable clothes', 'Water bottle']
    },
    preparation: {
      es: ['Ayuno de 3 horas', 'Hidratación', 'Intención clara', 'Mente abierta'],
      en: ['3-hour fast', 'Hydration', 'Clear intention', 'Open mind']
    },
    latitude: 18.9835,
    longitude: -99.0962,
    verified: true,
    sustainable: true,
    indigenous: true
  },
  {
    id: '3',
    name: {
      es: 'Retiro de Yoga y Meditación Sunrise',
      en: 'Sunrise Yoga and Meditation Retreat'
    },
    description: {
      es: 'Comienza tu día con una práctica transformadora de yoga y meditación al amanecer, con vista a las montañas sagradas de Tepoztlán. Esta experiencia combina asanas tradicionales, pranayama y meditación silenciosa para conectarte con la energía del lugar.',
      en: 'Start your day with a transformative yoga and meditation practice at sunrise, overlooking the sacred mountains of Tepoztlán. This experience combines traditional asanas, pranayama and silent meditation to connect you with the energy of the place.'
    },
    shortDescription: {
      es: 'Yoga matutino y meditación con vista panorámica de montañas.',
      en: 'Morning yoga and meditation with panoramic mountain views.'
    },
    duration: {
      es: '2-3 horas',
      en: '2-3 hours'
    },
    location: {
      es: 'Terraza Jardín Zen',
      en: 'Zen Garden Terrace'
    },
    address: {
      es: 'Av. del Tepozteco 45, Centro',
      en: 'Tepozteco Ave 45, Downtown'
    },
    category: 'wellness',
    type: 'group',
    price: {
      es: '$350 MXN por persona',
      en: '$350 MXN per person'
    },
    priceAmount: 350,
    currency: 'MXN',
    images: [
      '/tepoztlan-hero.jpg'
    ],
    featured: false,
    tags: {
      es: ['Yoga', 'Meditación', 'Amanecer', 'Bienestar', 'Naturaleza'],
      en: ['Yoga', 'Meditation', 'Sunrise', 'Wellness', 'Nature']
    },
    provider: {
      name: 'Luna Wellness Center',
      contact: '+52 777 987 6543',
      certification: 'RYT 500 Certified'
    },
    maxParticipants: 15,
    minParticipants: 3,
    ageRestriction: '14+',
    requirements: {
      es: ['Nivel principiante-intermedio', 'Mat de yoga propio', 'Ropa cómoda', 'Puntualidad'],
      en: ['Beginner-intermediate level', 'Own yoga mat', 'Comfortable clothes', 'Punctuality']
    },
    includes: {
      es: ['Clase guiada', 'Té herbal post-práctica', 'Vista panorámica', 'Música relajante'],
      en: ['Guided class', 'Post-practice herbal tea', 'Panoramic view', 'Relaxing music']
    },
    excludes: {
      es: ['Mat de yoga', 'Desayuno', 'Transporte'],
      en: ['Yoga mat', 'Breakfast', 'Transportation']
    },
    rating: 4.7,
    reviewCount: 89,
    phone: '+52 777 987 6543',
    atmosphere: 'peaceful',
    environment: 'outdoor',
    intensity: 'low',
    highlights: {
      es: ['Vista al amanecer', 'Práctica al aire libre', 'Conexión con naturaleza', 'Paz interior'],
      en: ['Sunrise view', 'Outdoor practice', 'Nature connection', 'Inner peace']
    },
    cancellationPolicy: {
      es: 'Cancelación gratuita hasta 12h antes',
      en: 'Free cancellation up to 12h before'
    },
    seasons: ['spring', 'summer', 'fall', 'winter'],
    bestTime: {
      es: 'Todo el año, 6:00-8:00 AM',
      en: 'Year-round, 6:00-8:00 AM'
    },
    equipment: {
      es: ['Mat de yoga', 'Bloque de yoga (opcional)', 'Manta ligera', 'Agua'],
      en: ['Yoga mat', 'Yoga block (optional)', 'Light blanket', 'Water']
    },
    preparation: {
      es: ['Desayuno muy ligero', 'Llegar 15 min antes', 'Ropa de capas'],
      en: ['Very light breakfast', 'Arrive 15 min early', 'Layered clothing']
    },
    latitude: 18.9851,
    longitude: -99.0955,
    verified: true,
    sustainable: true,
    indigenous: false
  },
  {
    id: '4',
    name: {
      es: 'Tour Gastronómico y Mercado Local',
      en: 'Culinary Tour and Local Market'
    },
    description: {
      es: 'Descubre los sabores auténticos de Tepoztlán en un recorrido gastronómico que incluye el mercado local, puestos de comida tradicional y una cocina familiar donde aprenderás a preparar platillos típicos con ingredientes locales.',
      en: 'Discover the authentic flavors of Tepoztlán on a culinary tour that includes the local market, traditional food stalls and a family kitchen where you\'ll learn to prepare typical dishes with local ingredients.'
    },
    shortDescription: {
      es: 'Experiencia culinaria completa con mercado, cocina y degustación.',
      en: 'Complete culinary experience with market, cooking and tasting.'
    },
    duration: {
      es: '5-6 horas',
      en: '5-6 hours'
    },
    location: {
      es: 'Mercado Municipal y Cocina Tradicional',
      en: 'Municipal Market and Traditional Kitchen'
    },
    address: {
      es: 'Mercado Municipal, Calle Revolución s/n',
      en: 'Municipal Market, Revolución Street s/n'
    },
    category: 'food',
    type: 'group',
    price: {
      es: '$1,200 MXN por persona',
      en: '$1,200 MXN per person'
    },
    priceAmount: 1200,
    currency: 'MXN',
    images: [
      '/MercadoTepoztlan.jpg',
      '/traditional-market.jpg'
    ],
    featured: true,
    tags: {
      es: ['Gastronomía', 'Cocina', 'Mercado', 'Cultura', 'Tradicional'],
      en: ['Gastronomy', 'Cooking', 'Market', 'Culture', 'Traditional']
    },
    provider: {
      name: 'Sabores de Tepoztlán',
      contact: '+52 777 456 7890',
      certification: 'Chef Tradicional Certificado'
    },
    maxParticipants: 8,
    minParticipants: 4,
    ageRestriction: '10+',
    requirements: {
      es: ['Apetito abundante', 'Sin alergias severas', 'Curiosidad culinaria', 'Manos limpias'],
      en: ['Good appetite', 'No severe allergies', 'Culinary curiosity', 'Clean hands']
    },
    includes: {
      es: ['Guía gastronómico', 'Todas las degustaciones', 'Clase de cocina', 'Recetario digital'],
      en: ['Gastronomic guide', 'All tastings', 'Cooking class', 'Digital recipe book']
    },
    excludes: {
      es: ['Bebidas alcohólicas', 'Transporte', 'Propinas'],
      en: ['Alcoholic beverages', 'Transportation', 'Tips']
    },
    rating: 4.8,
    reviewCount: 234,
    phone: '+52 777 456 7890',
    atmosphere: 'educational',
    environment: 'mixed',
    intensity: 'low',
    highlights: {
      es: ['Mercado tradicional', 'Cocina auténtica', 'Ingredientes locales', 'Técnicas ancestrales'],
      en: ['Traditional market', 'Authentic cooking', 'Local ingredients', 'Ancestral techniques']
    },
    cancellationPolicy: {
      es: 'Cancelación gratuita hasta 24h antes',
      en: 'Free cancellation up to 24h before'
    },
    seasons: ['spring', 'summer', 'fall', 'winter'],
    bestTime: {
      es: 'Todo el año, mejor mañana',
      en: 'Year-round, best morning'
    },
    equipment: {
      es: ['Cámara fotográfica', 'Apetito', 'Libreta de notas'],
      en: ['Camera', 'Appetite', 'Notebook']
    },
    preparation: {
      es: ['Desayuno ligero', 'Informar alergias', 'Venir con hambre'],
      en: ['Light breakfast', 'Report allergies', 'Come hungry']
    },
    latitude: 18.9841,
    longitude: -99.0948,
    verified: true,
    sustainable: true,
    indigenous: false
  }
]

// Filter options
export const experienceCategories = [
  'adventure',
  'spiritual', 
  'wellness',
  'cultural',
  'nature',
  'food',
  'art',
  'photography',
  'healing'
]

export const atmosphereTypes = [
  'peaceful',
  'adventurous',
  'spiritual', 
  'educational',
  'relaxing',
  'challenging',
  'mystical',
  'transformative'
]

export const experienceTypes = [
  'individual',
  'group',
  'private'
]

// Service class
export class ExperienceService {
  static getAllExperiences(): Experience[] {
    return mockExperiences
  }

  static getExperienceById(id: string): Experience | undefined {
    return mockExperiences.find(experience => experience.id === id)
  }

  static searchExperiences(query: string, locale: Locale): Experience[] {
    const searchLower = query.toLowerCase()
    return mockExperiences.filter(experience => 
      experience.name[locale].toLowerCase().includes(searchLower) ||
      experience.description[locale].toLowerCase().includes(searchLower) ||
      experience.shortDescription[locale].toLowerCase().includes(searchLower) ||
      experience.tags[locale].some(tag => tag.toLowerCase().includes(searchLower)) ||
      experience.highlights[locale].some(highlight => highlight.toLowerCase().includes(searchLower))
    )
  }

  static filterExperiences(filters: {
    category?: string
    priceRange?: string
    duration?: string
    atmosphere?: string
    type?: string
  }): Experience[] {
    let filtered = mockExperiences

    if (filters.category) {
      filtered = filtered.filter(exp => exp.category === filters.category)
    }

    if (filters.priceRange) {
      filtered = filtered.filter(exp => {
        const price = exp.priceAmount
        switch (filters.priceRange) {
          case 'budget': return price <= 500
          case 'mid': return price > 500 && price <= 1000
          case 'luxury': return price > 1000 && price <= 2000
          case 'premium': return price > 2000
          default: return true
        }
      })
    }

    if (filters.duration) {
      filtered = filtered.filter(exp => {
        const duration = exp.duration.en.toLowerCase()
        switch (filters.duration) {
          case 'short': return duration.includes('1') || duration.includes('2') || duration.includes('3')
          case 'half-day': return duration.includes('3') || duration.includes('4') || duration.includes('5') || duration.includes('6')
          case 'full-day': return duration.includes('6') || duration.includes('7') || duration.includes('8') || duration.includes('full')
          case 'multi-day': return duration.includes('day') && !duration.includes('hour')
          default: return true
        }
      })
    }

    if (filters.atmosphere) {
      filtered = filtered.filter(exp => exp.atmosphere === filters.atmosphere)
    }

    if (filters.type) {
      filtered = filtered.filter(exp => exp.type === filters.type)
    }

    return filtered
  }

  static sortExperiences(experiences: Experience[], sortBy: string): Experience[] {
    return [...experiences].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'name':
          return a.name.en.localeCompare(b.name.en)
        case 'price':
          return a.priceAmount - b.priceAmount
        case 'duration':
          // Simple duration comparison based on first number found
          const getDurationHours = (exp: Experience) => {
            const match = exp.duration.en.match(/\d+/)
            return match ? parseInt(match[0]) : 0
          }
          return getDurationHours(a) - getDurationHours(b)
        default:
          return 0
      }
    })
  }

  static getFeaturedExperiences(): Experience[] {
    return mockExperiences.filter(exp => exp.featured)
  }

  static getExperiencesByCategory(category: string): Experience[] {
    return mockExperiences.filter(exp => exp.category === category)
  }

  static getExperienceCategoryLabel(category: string, locale: Locale): string {
    const categoryLabels = {
      adventure: { es: 'Aventura', en: 'Adventure' },
      spiritual: { es: 'Espiritual', en: 'Spiritual' },
      wellness: { es: 'Bienestar', en: 'Wellness' },
      cultural: { es: 'Cultural', en: 'Cultural' },
      nature: { es: 'Naturaleza', en: 'Nature' },
      food: { es: 'Gastronomía', en: 'Food' },
      art: { es: 'Arte', en: 'Art' },
      photography: { es: 'Fotografía', en: 'Photography' },
      healing: { es: 'Sanación', en: 'Healing' }
    }
    return categoryLabels[category as keyof typeof categoryLabels]?.[locale] || category
  }

  static getAtmosphereLabel(atmosphere: string, locale: Locale): string {
    const atmosphereLabels = {
      peaceful: { es: 'Pacífico', en: 'Peaceful' },
      adventurous: { es: 'Aventurero', en: 'Adventurous' },
      spiritual: { es: 'Espiritual', en: 'Spiritual' },
      educational: { es: 'Educativo', en: 'Educational' },
      relaxing: { es: 'Relajante', en: 'Relaxing' },
      challenging: { es: 'Desafiante', en: 'Challenging' },
      mystical: { es: 'Místico', en: 'Mystical' },
      transformative: { es: 'Transformador', en: 'Transformative' }
    }
    return atmosphereLabels[atmosphere as keyof typeof atmosphereLabels]?.[locale] || atmosphere
  }

  static getExperienceName(experience: Experience, locale: Locale): string {
    return experience.name[locale]
  }

  static getExperienceDescription(experience: Experience, locale: Locale): string {
    return experience.description[locale]
  }

  static getExperienceShortDescription(experience: Experience, locale: Locale): string {
    return experience.shortDescription[locale]
  }

  static generateSlug(experience: Experience, locale: Locale): string {
    const name = experience.name[locale]
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

  static getExperienceBySlug(slug: string, locale: Locale): Experience | undefined {
    return mockExperiences.find(experience => 
      this.generateSlug(experience, locale) === slug
    )
  }
}