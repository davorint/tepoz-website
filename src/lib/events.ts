export interface Event {
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
  date: string
  endDate?: string
  time: string
  endTime?: string
  location: {
    es: string
    en: string
  }
  address: {
    es: string
    en: string
  }
  category: 'festival' | 'cultural' | 'spiritual' | 'market' | 'music' | 'art' | 'food' | 'sports' | 'workshop' | 'ceremony'
  type: 'single' | 'recurring' | 'multi-day'
  recurring?: 'daily' | 'weekly' | 'monthly' | 'yearly'
  price: {
    es: string
    en: string
  }
  priceAmount?: number
  currency: 'MXN' | 'USD'
  images: string[]
  featured: boolean
  tags: {
    es: string[]
    en: string[]
  }
  organizer: {
    name: string
    contact?: string
    website?: string
  }
  capacity?: number
  ageRestriction?: string
  requirements: {
    es: string[]
    en: string[]
  }
  includes: {
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
    twitter?: string
  }
  accessibility?: {
    wheelchairAccessible: boolean
    parkingAvailable: boolean
    publicTransportAccess: boolean
  }
  atmosphere: 'traditional' | 'modern' | 'spiritual' | 'festive' | 'intimate' | 'educational' | 'outdoor' | 'family-friendly'
  weather: 'indoor' | 'outdoor' | 'mixed'
  intensity: 'low' | 'medium' | 'high'
  duration: {
    es: string
    en: string
  }
  highlights: {
    es: string[]
    en: string[]
  }
  cancellationPolicy: {
    es: string
    en: string
  }
  latitude?: number
  longitude?: number
}

export const eventCategories = [
  'festival',
  'cultural', 
  'spiritual',
  'market',
  'music',
  'art',
  'food',
  'sports',
  'workshop',
  'ceremony'
] as const

export const atmosphereTypes = [
  'traditional',
  'modern',
  'spiritual',
  'festive',
  'intimate',
  'educational',
  'outdoor',
  'family-friendly'
] as const

export const eventTypes = [
  'single',
  'recurring',
  'multi-day'
] as const

export const intensityLevels = [
  'low',
  'medium', 
  'high'
] as const

export const weatherTypes = [
  'indoor',
  'outdoor',
  'mixed'
] as const

export const sampleEvents: Event[] = [
  {
    id: 'carnaval-tepoztlan-2025',
    name: {
      es: 'Carnaval de Tepoztlán 2025',
      en: 'Tepoztlán Carnival 2025'
    },
    description: {
      es: 'La celebración más colorida y alegre del año en Tepoztlán. El Carnaval incluye desfiles espectaculares con comparsas tradicionales, música en vivo, danzas folclóricas y la famosa ceremonia de la quema del mal humor. Una tradición centenaria que llena las calles de color, música y alegría durante cinco días consecutivos.',
      en: 'The most colorful and joyful celebration of the year in Tepoztlán. The Carnival includes spectacular parades with traditional troupes, live music, folk dances and the famous burning of bad mood ceremony. A century-old tradition that fills the streets with color, music and joy for five consecutive days.'
    },
    shortDescription: {
      es: 'Celebración tradicional con desfiles, música y la famosa quema del mal humor',
      en: 'Traditional celebration with parades, music and the famous burning of bad mood'
    },
    date: '2025-02-28',
    endDate: '2025-03-04',
    time: '18:00',
    endTime: '23:00',
    location: {
      es: 'Centro Histórico de Tepoztlán',
      en: 'Historic Center of Tepoztlán'
    },
    address: {
      es: 'Plaza Central y calles principales, Tepoztlán, Morelos',
      en: 'Central Plaza and main streets, Tepoztlán, Morelos'
    },
    category: 'festival',
    type: 'multi-day',
    price: {
      es: 'Gratis',
      en: 'Free'
    },
    currency: 'MXN',
    images: [
      'https://images.unsplash.com/photo-1533906966484-a9c978a3f090?q=80&w=2069',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070'
    ],
    featured: true,
    tags: {
      es: ['Tradicional', 'Familiar', 'Cultural', 'Música', 'Danza'],
      en: ['Traditional', 'Family', 'Cultural', 'Music', 'Dance']
    },
    organizer: {
      name: 'Municipio de Tepoztlán',
      contact: '+52 739 395 0006'
    },
    requirements: {
      es: ['Ninguno'],
      en: ['None']
    },
    includes: {
      es: ['Desfiles', 'Música en vivo', 'Danzas tradicionales', 'Comida típica', 'Artesanías'],
      en: ['Parades', 'Live music', 'Traditional dances', 'Typical food', 'Handicrafts']
    },
    rating: 4.8,
    reviewCount: 324,
    accessibility: {
      wheelchairAccessible: true,
      parkingAvailable: true,
      publicTransportAccess: true
    },
    atmosphere: 'festive',
    weather: 'outdoor',
    intensity: 'high',
    duration: {
      es: '5 días',
      en: '5 days'
    },
    highlights: {
      es: ['Quema del Mal Humor', 'Desfiles de Comparsas', 'Música Tradicional', 'Gastronomía Local'],
      en: ['Burning of Bad Mood', 'Troupe Parades', 'Traditional Music', 'Local Gastronomy']
    },
    cancellationPolicy: {
      es: 'Evento gratuito. En caso de lluvia intensa, algunos eventos pueden ser pospuestos.',
      en: 'Free event. In case of heavy rain, some events may be postponed.'
    },
    latitude: 18.9847,
    longitude: -99.0940
  },
  {
    id: 'equinoccio-primavera-tepozteco',
    name: {
      es: 'Equinoccio de Primavera en el Tepozteco',
      en: 'Spring Equinox at Tepozteco'
    },
    description: {
      es: 'Ceremonia ancestral maya-azteca para recibir la energía renovadora del equinoccio de primavera en la pirámide sagrada del Tepozteco. Los participantes se visten de blanco y realizan meditaciones colectivas al amanecer, aprovechando la alineación energética especial de este día para purificar el espíritu y renovar intenciones.',
      en: 'Ancestral Maya-Aztec ceremony to receive the renewing energy of the spring equinox at the sacred pyramid of Tepozteco. Participants dress in white and perform collective meditations at sunrise, taking advantage of the special energetic alignment of this day to purify the spirit and renew intentions.'
    },
    shortDescription: {
      es: 'Ceremonia espiritual ancestral al amanecer en la pirámide del Tepozteco',
      en: 'Ancestral spiritual ceremony at sunrise at the Tepozteco pyramid'
    },
    date: '2025-03-21',
    time: '06:00',
    endTime: '09:00',
    location: {
      es: 'Pirámide del Tepozteco',
      en: 'Tepozteco Pyramid'
    },
    address: {
      es: 'Cerro del Tepozteco, Tepoztlán, Morelos (requiere caminata de 1.5 hrs)',
      en: 'Tepozteco Hill, Tepoztlán, Morelos (requires 1.5 hr hike)'
    },
    category: 'spiritual',
    type: 'single',
    price: {
      es: '$50 MXN',
      en: '$50 MXN ($3 USD)'
    },
    priceAmount: 50,
    currency: 'MXN',
    images: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070'
    ],
    featured: true,
    tags: {
      es: ['Espiritual', 'Ceremonial', 'Amanecer', 'Meditación', 'Ancestral'],
      en: ['Spiritual', 'Ceremonial', 'Sunrise', 'Meditation', 'Ancestral']
    },
    organizer: {
      name: 'Centro de Estudios Tepoztecas',
      contact: '+52 739 395 1234',
      website: 'https://tepozteco.org'
    },
    capacity: 150,
    ageRestriction: '12+',
    requirements: {
      es: ['Ropa blanca', 'Calzado cómodo para senderismo', 'Agua', 'Estado físico bueno'],
      en: ['White clothing', 'Comfortable hiking shoes', 'Water', 'Good physical condition']
    },
    includes: {
      es: ['Ceremonia guiada', 'Meditación colectiva', 'Información histórica'],
      en: ['Guided ceremony', 'Collective meditation', 'Historical information']
    },
    rating: 4.9,
    reviewCount: 187,
    phone: '+52 739 395 1234',
    accessibility: {
      wheelchairAccessible: false,
      parkingAvailable: true,
      publicTransportAccess: false
    },
    atmosphere: 'spiritual',
    weather: 'outdoor',
    intensity: 'high',
    duration: {
      es: '3 horas',
      en: '3 hours'
    },
    highlights: {
      es: ['Amanecer en la Pirámide', 'Ceremonia Ancestral', 'Energía del Equinoccio', 'Vista Panorámica'],
      en: ['Sunrise at Pyramid', 'Ancestral Ceremony', 'Equinox Energy', 'Panoramic View']
    },
    cancellationPolicy: {
      es: 'Reembolso completo 48hrs antes. En caso de lluvia se pospone automáticamente.',
      en: 'Full refund 48hrs before. In case of rain it is automatically postponed.'
    },
    latitude: 18.9875,
    longitude: -99.0963
  },
  {
    id: 'tianguis-dominical',
    name: {
      es: 'Tianguis Dominical de Tepoztlán',
      en: 'Sunday Market of Tepoztlán'
    },
    description: {
      es: 'El mercado tradicional más auténtico de Tepoztlán, donde cada domingo se reúnen productores locales, artesanos y cocineros tradicionales. Encuentra productos orgánicos cultivados en la región, artesanías hechas a mano, comida típica preparada al momento y un ambiente familiar lleno de colores, aromas y sabores tradicionales mexicanos.',
      en: 'The most authentic traditional market in Tepoztlán, where local producers, artisans and traditional cooks gather every Sunday. Find organic products grown in the region, handmade crafts, typical food prepared on the spot and a family atmosphere full of colors, aromas and traditional Mexican flavors.'
    },
    shortDescription: {
      es: 'Mercado tradicional semanal con productos locales y artesanías auténticas',
      en: 'Weekly traditional market with local products and authentic crafts'
    },
    date: '2025-01-05',
    time: '08:00',
    endTime: '16:00',
    location: {
      es: 'Plaza Central y Ex Convento',
      en: 'Central Plaza and Ex Convent'
    },
    address: {
      es: 'Plaza Central, Centro, Tepoztlán, Morelos',
      en: 'Central Plaza, Downtown, Tepoztlán, Morelos'
    },
    category: 'market',
    type: 'recurring',
    recurring: 'weekly',
    price: {
      es: 'Gratis entrada',
      en: 'Free entry'
    },
    currency: 'MXN',
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070',
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?q=80&w=2070'
    ],
    featured: true,
    tags: {
      es: ['Mercado', 'Local', 'Artesanías', 'Comida', 'Familia', 'Orgánico'],
      en: ['Market', 'Local', 'Handicrafts', 'Food', 'Family', 'Organic']
    },
    organizer: {
      name: 'Asociación de Comerciantes de Tepoztlán'
    },
    requirements: {
      es: ['Ninguno'],
      en: ['None']
    },
    includes: {
      es: ['Productos orgánicos', 'Artesanías locales', 'Comida tradicional', 'Música en vivo ocasional'],
      en: ['Organic products', 'Local handicrafts', 'Traditional food', 'Occasional live music']
    },
    rating: 4.6,
    reviewCount: 453,
    accessibility: {
      wheelchairAccessible: true,
      parkingAvailable: true,
      publicTransportAccess: true
    },
    atmosphere: 'traditional',
    weather: 'outdoor',
    intensity: 'low',
    duration: {
      es: '8 horas',
      en: '8 hours'
    },
    highlights: {
      es: ['Productos Orgánicos', 'Artesanías Únicas', 'Comida Tradicional', 'Ambiente Familiar'],
      en: ['Organic Products', 'Unique Handicrafts', 'Traditional Food', 'Family Atmosphere']
    },
    cancellationPolicy: {
      es: 'Evento gratuito. Solo se cancela por condiciones climáticas extremas.',
      en: 'Free event. Only canceled due to extreme weather conditions.'
    },
    latitude: 18.9847,
    longitude: -99.0940
  },
  {
    id: 'festival-jazz-tepoztlan',
    name: {
      es: 'Festival de Jazz de Tepoztlán',
      en: 'Tepoztlán Jazz Festival'
    },
    description: {
      es: 'Un festival íntimo de jazz que combina la magia de la música con la energía espiritual de Tepoztlán. Artistas nacionales e internacionales se presentan en escenarios únicos como patios coloniales y terrazas con vista a las montañas, creando una experiencia musical inolvidable bajo las estrellas.',
      en: 'An intimate jazz festival that combines the magic of music with the spiritual energy of Tepoztlán. National and international artists perform on unique stages like colonial patios and terraces with mountain views, creating an unforgettable musical experience under the stars.'
    },
    shortDescription: {
      es: 'Festival íntimo de jazz en escenarios únicos con vista a las montañas',
      en: 'Intimate jazz festival on unique stages with mountain views'
    },
    date: '2025-04-12',
    endDate: '2025-04-14',
    time: '19:00',
    endTime: '23:00',
    location: {
      es: 'Diversos Venues en el Centro Histórico',
      en: 'Various Venues in Historic Center'
    },
    address: {
      es: 'Centro Histórico, Tepoztlán, Morelos',
      en: 'Historic Center, Tepoztlán, Morelos'
    },
    category: 'music',
    type: 'multi-day',
    price: {
      es: 'Desde $350 MXN',
      en: 'From $350 MXN ($20 USD)'
    },
    priceAmount: 350,
    currency: 'MXN',
    images: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070',
      'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2070'
    ],
    featured: false,
    tags: {
      es: ['Jazz', 'Música', 'Internacional', 'Nocturno', 'Íntimo'],
      en: ['Jazz', 'Music', 'International', 'Nighttime', 'Intimate']
    },
    organizer: {
      name: 'Festival Jazz Tepoztlán',
      website: 'https://jazztepoztlan.com',
      contact: '+52 739 395 2000'
    },
    capacity: 200,
    ageRestriction: '18+',
    requirements: {
      es: ['Boleto válido', 'Identificación oficial'],
      en: ['Valid ticket', 'Official ID']
    },
    includes: {
      es: ['3 noches de conciertos', 'Bebidas incluidas', 'Jam sessions'],
      en: ['3 nights of concerts', 'Drinks included', 'Jam sessions']
    },
    rating: 4.7,
    reviewCount: 98,
    website: 'https://jazztepoztlan.com',
    phone: '+52 739 395 2000',
    accessibility: {
      wheelchairAccessible: false,
      parkingAvailable: true,
      publicTransportAccess: true
    },
    atmosphere: 'intimate',
    weather: 'mixed',
    intensity: 'medium',
    duration: {
      es: '3 días',
      en: '3 days'
    },
    highlights: {
      es: ['Artistas Internacionales', 'Venues Únicos', 'Jam Sessions', 'Gastronomía Local'],
      en: ['International Artists', 'Unique Venues', 'Jam Sessions', 'Local Gastronomy']
    },
    cancellationPolicy: {
      es: 'Reembolso hasta 7 días antes del evento. No reembolsable por lluvia.',
      en: 'Refund up to 7 days before event. Non-refundable due to rain.'
    },
    latitude: 18.9847,
    longitude: -99.0940
  },
  {
    id: 'taller-ceramica-tradicional',
    name: {
      es: 'Taller de Cerámica Tradicional',
      en: 'Traditional Pottery Workshop'
    },
    description: {
      es: 'Aprende las técnicas ancestrales de la cerámica tepozteca con maestros artesanos locales. Durante este taller intensivo, conocerás el proceso completo desde la preparación del barro hasta el decorado tradicional, creando tu propia pieza única que podrás llevarte a casa como recuerdo de esta experiencia cultural auténtica.',
      en: 'Learn the ancestral techniques of Tepozteca pottery with local master artisans. During this intensive workshop, you will learn the complete process from clay preparation to traditional decoration, creating your own unique piece that you can take home as a souvenir of this authentic cultural experience.'
    },
    shortDescription: {
      es: 'Aprende técnicas ancestrales de cerámica con maestros artesanos locales',
      en: 'Learn ancestral pottery techniques with local master artisans'
    },
    date: '2025-02-15',
    time: '10:00',
    endTime: '16:00',
    location: {
      es: 'Taller de Cerámica Tepozteca',
      en: 'Tepozteca Pottery Workshop'
    },
    address: {
      es: 'Calle del Tepozteco 45, Barrio de Santísima Trinidad, Tepoztlán',
      en: 'Calle del Tepozteco 45, Santísima Trinidad Neighborhood, Tepoztlán'
    },
    category: 'workshop',
    type: 'single',
    price: {
      es: '$450 MXN',
      en: '$450 MXN ($25 USD)'
    },
    priceAmount: 450,
    currency: 'MXN',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070',
      'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=2070',
      'https://images.unsplash.com/photo-1594736797933-d0d19b4b4d89?q=80&w=2070'
    ],
    featured: false,
    tags: {
      es: ['Artesanía', 'Tradicional', 'Taller', 'Cultural', 'Manos'],
      en: ['Handicraft', 'Traditional', 'Workshop', 'Cultural', 'Hands-on']
    },
    organizer: {
      name: 'Maestra Elena Vásquez',
      contact: '+52 739 395 3456'
    },
    capacity: 12,
    ageRestriction: '8+',
    requirements: {
      es: ['Ropa que se pueda ensuciar', 'Ganas de aprender'],
      en: ['Clothes that can get dirty', 'Willingness to learn']
    },
    includes: {
      es: ['Materiales', 'Herramientas', 'Pieza terminada', 'Refrigerio'],
      en: ['Materials', 'Tools', 'Finished piece', 'Refreshments']
    },
    rating: 4.9,
    reviewCount: 67,
    phone: '+52 739 395 3456',
    accessibility: {
      wheelchairAccessible: true,
      parkingAvailable: false,
      publicTransportAccess: true
    },
    atmosphere: 'educational',
    weather: 'indoor',
    intensity: 'medium',
    duration: {
      es: '6 horas',
      en: '6 hours'
    },
    highlights: {
      es: ['Maestros Locales', 'Técnicas Ancestrales', 'Pieza Personalizada', 'Experiencia Auténtica'],
      en: ['Local Masters', 'Ancestral Techniques', 'Personalized Piece', 'Authentic Experience']
    },
    cancellationPolicy: {
      es: 'Reembolso completo 24hrs antes. Reprogramación gratuita por enfermedad.',
      en: 'Full refund 24hrs before. Free rescheduling for illness.'
    },
    latitude: 18.9854,
    longitude: -99.0932
  }
]

export class EventService {
  static getAllEvents(): Event[] {
    return sampleEvents
  }

  static getEventById(id: string): Event | undefined {
    return sampleEvents.find(event => event.id === id)
  }

  static getFeaturedEvents(): Event[] {
    return sampleEvents.filter(event => event.featured)
  }

  static getEventsByCategory(category: Event['category']): Event[] {
    return sampleEvents.filter(event => event.category === category)
  }

  static getEventsByType(type: Event['type']): Event[] {
    return sampleEvents.filter(event => event.type === type)
  }

  static getUpcomingEvents(limit?: number): Event[] {
    const now = new Date()
    const upcoming = sampleEvents
      .filter(event => new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    
    return limit ? upcoming.slice(0, limit) : upcoming
  }

  static getPastEvents(limit?: number): Event[] {
    const now = new Date()
    const past = sampleEvents
      .filter(event => new Date(event.date) < now)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    return limit ? past.slice(0, limit) : past
  }

  static searchEvents(query: string, locale: 'es' | 'en' = 'es'): Event[] {
    const searchTerm = query.toLowerCase()
    return sampleEvents.filter(event => {
      const name = event.name[locale].toLowerCase()
      const description = event.description[locale].toLowerCase()
      const tags = event.tags[locale].map(tag => tag.toLowerCase())
      const location = event.location[locale].toLowerCase()
      
      return name.includes(searchTerm) ||
             description.includes(searchTerm) ||
             tags.some(tag => tag.includes(searchTerm)) ||
             location.includes(searchTerm)
    })
  }

  static filterEvents(filters: {
    category?: Event['category']
    atmosphere?: Event['atmosphere']
    type?: Event['type']
    priceRange?: 'free' | 'low' | 'medium' | 'high'
    dateRange?: 'today' | 'week' | 'month' | 'all'
    featured?: boolean
  }): Event[] {
    let filtered = [...sampleEvents]

    if (filters.category) {
      filtered = filtered.filter(event => event.category === filters.category)
    }

    if (filters.atmosphere) {
      filtered = filtered.filter(event => event.atmosphere === filters.atmosphere)
    }

    if (filters.type) {
      filtered = filtered.filter(event => event.type === filters.type)
    }

    if (filters.priceRange) {
      filtered = filtered.filter(event => {
        if (filters.priceRange === 'free') {
          return !event.priceAmount || event.priceAmount === 0
        }
        if (filters.priceRange === 'low') {
          return event.priceAmount && event.priceAmount <= 200
        }
        if (filters.priceRange === 'medium') {
          return event.priceAmount && event.priceAmount > 200 && event.priceAmount <= 500
        }
        if (filters.priceRange === 'high') {
          return event.priceAmount && event.priceAmount > 500
        }
        return true
      })
    }

    if (filters.dateRange && filters.dateRange !== 'all') {
      const now = new Date()
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date)
        if (filters.dateRange === 'today') {
          return eventDate.toDateString() === now.toDateString()
        }
        if (filters.dateRange === 'week') {
          const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
          return eventDate >= now && eventDate <= weekFromNow
        }
        if (filters.dateRange === 'month') {
          const monthFromNow = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
          return eventDate >= now && eventDate <= monthFromNow
        }
        return true
      })
    }

    if (filters.featured !== undefined) {
      filtered = filtered.filter(event => event.featured === filters.featured)
    }

    return filtered
  }

  static sortEvents(events: Event[], sortBy: 'date' | 'name' | 'rating' | 'price', order: 'asc' | 'desc' = 'asc'): Event[] {
    return [...events].sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
          break
        case 'name':
          comparison = a.name.es.localeCompare(b.name.es)
          break
        case 'rating':
          comparison = a.rating - b.rating
          break
        case 'price':
          comparison = (a.priceAmount || 0) - (b.priceAmount || 0)
          break
      }
      
      return order === 'desc' ? -comparison : comparison
    })
  }

  static getEventName(event: Event, locale: 'es' | 'en'): string {
    return event.name[locale]
  }

  static getEventDescription(event: Event, locale: 'es' | 'en'): string {
    return event.description[locale]
  }

  static getEventShortDescription(event: Event, locale: 'es' | 'en'): string {
    return event.shortDescription[locale]
  }

  static getEventLocation(event: Event, locale: 'es' | 'en'): string {
    return event.location[locale]
  }

  static getEventAddress(event: Event, locale: 'es' | 'en'): string {
    return event.address[locale]
  }

  static getEventTags(event: Event, locale: 'es' | 'en'): string[] {
    return event.tags[locale]
  }

  static getEventPrice(event: Event, locale: 'es' | 'en'): string {
    return event.price[locale]
  }

  static getEventRequirements(event: Event, locale: 'es' | 'en'): string[] {
    return event.requirements[locale]
  }

  static getEventIncludes(event: Event, locale: 'es' | 'en'): string[] {
    return event.includes[locale]
  }

  static getEventDuration(event: Event, locale: 'es' | 'en'): string {
    return event.duration[locale]
  }

  static getEventHighlights(event: Event, locale: 'es' | 'en'): string[] {
    return event.highlights[locale]
  }

  static getEventCancellationPolicy(event: Event, locale: 'es' | 'en'): string {
    return event.cancellationPolicy[locale]
  }

  static isEventToday(event: Event): boolean {
    const today = new Date().toDateString()
    return new Date(event.date).toDateString() === today
  }

  static isEventThisWeek(event: Event): boolean {
    const now = new Date()
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    const eventDate = new Date(event.date)
    return eventDate >= now && eventDate <= weekFromNow
  }

  static isEventThisMonth(event: Event): boolean {
    const now = new Date()
    const monthFromNow = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
    const eventDate = new Date(event.date)
    return eventDate >= now && eventDate <= monthFromNow
  }

  static formatEventDate(event: Event, locale: 'es' | 'en'): string {
    const date = new Date(event.date)
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return date.toLocaleDateString(locale === 'es' ? 'es-MX' : 'en-US', options)
  }

  static formatEventTime(event: Event): string {
    if (event.endTime) {
      return `${event.time} - ${event.endTime}`
    }
    return event.time
  }

  static getEventCategoryLabel(category: Event['category'], locale: 'es' | 'en'): string {
    const labels = {
      festival: { es: 'Festival', en: 'Festival' },
      cultural: { es: 'Cultural', en: 'Cultural' },
      spiritual: { es: 'Espiritual', en: 'Spiritual' },
      market: { es: 'Mercado', en: 'Market' },
      music: { es: 'Música', en: 'Music' },
      art: { es: 'Arte', en: 'Art' },
      food: { es: 'Gastronomía', en: 'Food' },
      sports: { es: 'Deportes', en: 'Sports' },
      workshop: { es: 'Taller', en: 'Workshop' },
      ceremony: { es: 'Ceremonia', en: 'Ceremony' }
    }
    return labels[category][locale]
  }

  static getAtmosphereLabel(atmosphere: Event['atmosphere'], locale: 'es' | 'en'): string {
    const labels = {
      traditional: { es: 'Tradicional', en: 'Traditional' },
      modern: { es: 'Moderno', en: 'Modern' },
      spiritual: { es: 'Espiritual', en: 'Spiritual' },
      festive: { es: 'Festivo', en: 'Festive' },
      intimate: { es: 'Íntimo', en: 'Intimate' },
      educational: { es: 'Educativo', en: 'Educational' },
      outdoor: { es: 'Al aire libre', en: 'Outdoor' },
      'family-friendly': { es: 'Familiar', en: 'Family-friendly' }
    }
    return labels[atmosphere][locale]
  }
}