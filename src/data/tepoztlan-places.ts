export interface Place {
  id: string
  name: string
  nameEn?: string
  category: 'restaurant' | 'hotel' | 'attraction' | 'cafe' | 'shopping' | 'culture' | 'bar'
  coordinates: [number, number]
  rating: number
  priceLevel: 1 | 2 | 3 | 4
  description: string
  descriptionEn?: string
  address: string
  phone?: string
  website?: string
  hours?: string
  image?: string
  featured?: boolean
  tags?: string[]
}

export const tepoztlanPlaces: Place[] = [
  // ATTRACTIONS
  {
    id: 'tepozteco-pyramid',
    name: 'Pirámide del Tepozteco',
    nameEn: 'Tepozteco Pyramid',
    category: 'attraction',
    coordinates: [-99.0983, 18.9875],
    rating: 4.9,
    priceLevel: 2,
    description: 'Templo azteca del siglo XIII dedicado a Tepoztēcatl, dios del pulque. Subida de 2km con vistas espectaculares.',
    descriptionEn: '13th-century Aztec temple dedicated to Tepoztēcatl, god of pulque. 2km hike with spectacular views.',
    address: 'Cerro del Tepozteco, Tepoztlán',
    hours: '9:00 AM - 5:00 PM',
    featured: true,
    tags: ['histórico', 'senderismo', 'vistas', 'arqueología']
  },
  {
    id: 'ex-convento',
    name: 'Ex Convento Dominico de la Natividad',
    nameEn: 'Ex-Convent of the Nativity',
    category: 'culture',
    coordinates: [-99.0997, 18.9847],
    rating: 4.7,
    priceLevel: 1,
    description: 'Ex-convento colonial del siglo XVI, Patrimonio de la Humanidad UNESCO con murales históricos.',
    descriptionEn: '16th-century colonial ex-convent, UNESCO World Heritage site with historic murals.',
    address: 'Plaza Principal, Centro, Tepoztlán',
    hours: '10:00 AM - 6:00 PM',
    featured: true,
    tags: ['histórico', 'arquitectura', 'UNESCO', 'colonial']
  },
  {
    id: 'museo-pellicer',
    name: 'Museo Carlos Pellicer',
    nameEn: 'Carlos Pellicer Museum',
    category: 'culture',
    coordinates: [-99.0995, 18.9845],
    rating: 4.5,
    priceLevel: 1,
    description: 'Museo arqueológico con colección prehispánica detrás del monasterio.',
    descriptionEn: 'Archaeological museum with pre-Hispanic collection behind the monastery.',
    address: 'Pablo González 2, Centro, Tepoztlán',
    hours: '10:00 AM - 5:00 PM',
    tags: ['museo', 'arqueología', 'arte prehispánico']
  },

  // RESTAURANTS
  {
    id: 'los-colorines',
    name: 'Los Colorines',
    category: 'restaurant',
    coordinates: [-99.0989, 18.9853],
    rating: 4.7,
    priceLevel: 3,
    description: 'Restaurante icónico con más de 20 años, cocina mexicana auténtica en un ambiente colorido.',
    descriptionEn: 'Iconic restaurant with over 20 years, authentic Mexican cuisine in a colorful setting.',
    address: 'Del Tepozteco 13, Santísima Trinidad, Tepoztlán',
    phone: '+52 739 395 0198',
    hours: '8:00 AM - 10:00 PM',
    featured: true,
    tags: ['mexicana', 'tradicional', 'familiar', 'desayuno']
  },
  {
    id: 'el-ciruelo',
    name: 'El Ciruelo',
    category: 'restaurant',
    coordinates: [-99.0994, 18.9851],
    rating: 4.8,
    priceLevel: 3,
    description: 'Vista panorámica del cerro del Tepozteco, fusión de cocina de Morelos con alta cocina internacional.',
    descriptionEn: 'Panoramic view of Tepozteco hill, fusion of Morelos cuisine with international haute cuisine.',
    address: 'Av. Ignacio Zaragoza 17, Santísima Trinidad, Tepoztlán',
    phone: '+52 739 395 1203',
    website: 'https://www.elciruelo.com.mx',
    hours: '8:00 AM - 11:00 PM',
    featured: true,
    tags: ['fusión', 'vista panorámica', 'romántico', 'alta cocina']
  },
  {
    id: 'tepozramen',
    name: 'TepoznRamen',
    category: 'restaurant',
    coordinates: [-99.0986, 18.9844],
    rating: 4.6,
    priceLevel: 2,
    description: 'Restaurante japonés al aire libre con ambiente encantador, excelente ramen y sushi.',
    descriptionEn: 'Open-air Japanese restaurant with charming atmosphere, excellent ramen and sushi.',
    address: 'Av. Revolución 44, Centro, Tepoztlán',
    hours: '1:00 PM - 10:00 PM',
    tags: ['japonés', 'ramen', 'sushi', 'vegetariano']
  },
  {
    id: 'la-sombra-del-sabino',
    name: 'La Sombra del Sabino',
    category: 'cafe',
    coordinates: [-99.0991, 18.9849],
    rating: 4.5,
    priceLevel: 2,
    description: 'Café literario con hermoso jardín, tés especiales y opciones veganas.',
    descriptionEn: 'Literary cafe with beautiful garden, special teas and vegan options.',
    address: 'Av. Revolución 15, Centro, Tepoztlán',
    hours: '9:00 AM - 9:00 PM',
    tags: ['café', 'té', 'vegano', 'jardín', 'literario']
  },
  {
    id: 'el-pan-nuestro',
    name: 'El Pan Nuestro Gourmet',
    category: 'cafe',
    coordinates: [-99.0988, 18.9846],
    rating: 4.6,
    priceLevel: 2,
    description: 'Restaurante jardín ideal para brunch con panadería artesanal.',
    descriptionEn: 'Garden restaurant ideal for brunch with artisanal bakery.',
    address: 'Av. del Tepozteco 5, Centro, Tepoztlán',
    hours: '8:00 AM - 6:00 PM',
    tags: ['brunch', 'panadería', 'jardín', 'desayuno']
  },

  // HOTELS
  {
    id: 'casa-fernanda',
    name: 'Casa Fernanda Hotel Boutique',
    category: 'hotel',
    coordinates: [-99.0982, 18.9841],
    rating: 4.8,
    priceLevel: 4,
    description: 'Hotel boutique de lujo a 4 cuadras del centro con restaurante La Veladora.',
    descriptionEn: 'Luxury boutique hotel 4 blocks from center with La Veladora restaurant.',
    address: 'Camino a Meztitla 4, Valle de Atongo, Tepoztlán',
    phone: '+52 739 395 3522',
    featured: true,
    tags: ['lujo', 'boutique', 'spa', 'romántico']
  },
  {
    id: 'amomoxtli',
    name: 'Amomoxtli',
    category: 'hotel',
    coordinates: [-99.0975, 18.9835],
    rating: 4.9,
    priceLevel: 4,
    description: 'Santuario con jardines tropicales, reconocido con Una Llave MICHELIN.',
    descriptionEn: 'Sanctuary with tropical gardens, recognized with One MICHELIN Key.',
    address: 'Km 2 Carretera Tepoztlán-Milpa Alta, Tepoztlán',
    phone: '+52 739 395 0012',
    featured: true,
    tags: ['lujo', 'MICHELIN', 'jardines', 'spa']
  },
  {
    id: 'valle-mistico',
    name: 'Valle Místico',
    category: 'hotel',
    coordinates: [-99.0970, 18.9830],
    rating: 4.6,
    priceLevel: 3,
    description: 'Hotel con jardín, alberca y cabañas que se integran al paisaje montañoso.',
    descriptionEn: 'Hotel with garden, pool and cabins that blend into the mountain landscape.',
    address: 'Camino Real al Cacahuatal s/n, Tepoztlán',
    tags: ['naturaleza', 'cabañas', 'alberca', 'montaña']
  },
  {
    id: 'hotel-ciruelo',
    name: 'Hotel El Ciruelo',
    category: 'hotel',
    coordinates: [-99.0994, 18.9850],
    rating: 4.5,
    priceLevel: 3,
    description: 'Hotel tranquilo al final del jardín del restaurante El Ciruelo.',
    descriptionEn: 'Peaceful hotel at the end of El Ciruelo restaurant garden.',
    address: 'Av. Ignacio Zaragoza 17, Santísima Trinidad, Tepoztlán',
    tags: ['jardín', 'tranquilo', 'romántico']
  },

  // SHOPPING & MARKETS
  {
    id: 'mercado-tradicional',
    name: 'Mercado Tradicional',
    nameEn: 'Traditional Market',
    category: 'shopping',
    coordinates: [-99.0996, 18.9846],
    rating: 4.5,
    priceLevel: 1,
    description: 'Mercado diario con productos frescos, comida auténtica y artesanías locales.',
    descriptionEn: 'Daily market with fresh produce, authentic food and local crafts.',
    address: 'Plaza Principal, Centro, Tepoztlán',
    hours: '7:00 AM - 6:00 PM',
    featured: true,
    tags: ['mercado', 'comida local', 'artesanías', 'productos frescos']
  },
  {
    id: 'mercado-artesanal',
    name: 'Mercado Artesanal de Fin de Semana',
    nameEn: 'Weekend Artisan Market',
    category: 'shopping',
    coordinates: [-99.0990, 18.9848],
    rating: 4.6,
    priceLevel: 2,
    description: 'Mercado de artesanos cada fin de semana en Av. Revolución.',
    descriptionEn: 'Artisan market every weekend on Av. Revolución.',
    address: 'Av. Revolución, Centro, Tepoztlán',
    hours: 'Viernes 6:00 PM - Domingo 8:00 PM',
    tags: ['artesanías', 'fin de semana', 'souvenirs', 'arte local']
  },

  // SPECIALTY
  {
    id: 'tepoznieves',
    name: 'Tepoznieves',
    category: 'cafe',
    coordinates: [-99.0992, 18.9850],
    rating: 4.7,
    priceLevel: 1,
    description: 'Famosa heladería con más de 100 sabores únicos, desde clásicos hasta aguacate o nopal.',
    descriptionEn: 'Famous ice cream shop with over 100 unique flavors, from classics to avocado or cactus.',
    address: 'Av. 5 de Mayo 21, Centro, Tepoztlán',
    hours: '10:00 AM - 9:00 PM',
    featured: true,
    tags: ['helados', 'postres', 'sabores únicos', 'local']
  },
  {
    id: 'la-guarida-baco',
    name: 'La Guarida de Baco',
    category: 'bar',
    coordinates: [-99.0987, 18.9845],
    rating: 4.4,
    priceLevel: 2,
    description: 'Bar junto al mercado principal, famoso por sus huevos rancheros y chilaquiles.',
    descriptionEn: 'Bar beside the main market, famous for huevos rancheros and chilaquiles.',
    address: 'Av. Revolución 32, Centro, Tepoztlán',
    hours: '8:00 AM - 11:00 PM',
    tags: ['bar', 'desayuno', 'mexicana', 'económico']
  },
  {
    id: 'mercadella',
    name: 'Mercadella',
    category: 'cafe',
    coordinates: [-99.0985, 18.9843],
    rating: 4.5,
    priceLevel: 2,
    description: 'Tienda orgánica con café al aire libre, açai bowls y opciones veganas.',
    descriptionEn: 'Organic grocery with outdoor cafe, açai bowls and vegan options.',
    address: 'Av. del Tepozteco 28, Centro, Tepoztlán',
    hours: '8:00 AM - 8:00 PM',
    tags: ['orgánico', 'vegano', 'saludable', 'açai']
  },

  // ADDITIONAL RESTAURANTS
  {
    id: 'la-veladora',
    name: 'La Veladora',
    category: 'restaurant',
    coordinates: [-99.0982, 18.9841],
    rating: 4.9,
    priceLevel: 4,
    description: 'Restaurante de alta cocina mexicana contemporánea en Casa Fernanda Hotel.',
    descriptionEn: 'Contemporary Mexican haute cuisine restaurant at Casa Fernanda Hotel.',
    address: 'Camino a Meztitla 4, Valle de Atongo, Tepoztlán',
    featured: true,
    tags: ['alta cocina', 'romántico', 'orgánico', 'sustentable']
  },
  {
    id: 'axitla',
    name: 'Axitla',
    category: 'restaurant',
    coordinates: [-99.0979, 18.9838],
    rating: 4.6,
    priceLevel: 3,
    description: 'Cocina tradicional mexicana con ingredientes locales y vista a las montañas.',
    descriptionEn: 'Traditional Mexican cuisine with local ingredients and mountain views.',
    address: 'Carretera Federal Tepoztlán km 4.5, Tepoztlán',
    tags: ['mexicana', 'vista', 'tradicional', 'local']
  },
  {
    id: 'luna-mestiza',
    name: 'Luna Mestiza',
    category: 'cafe',
    coordinates: [-99.0993, 18.9852],
    rating: 4.4,
    priceLevel: 2,
    description: 'Café bohemio con música en vivo los fines de semana y ambiente artístico.',
    descriptionEn: 'Bohemian cafe with live music on weekends and artistic atmosphere.',
    address: 'Av. Revolución 5, Centro, Tepoztlán',
    hours: '10:00 AM - 11:00 PM',
    tags: ['café', 'música en vivo', 'bohemio', 'arte']
  }
]

// Helper functions for filtering and searching
export const getPlacesByCategory = (category: Place['category']) => 
  tepoztlanPlaces.filter(place => place.category === category)

export const getFeaturedPlaces = () => 
  tepoztlanPlaces.filter(place => place.featured)

export const searchPlaces = (query: string, lang: 'es' | 'en' = 'es') => {
  const searchTerm = query.toLowerCase()
  return tepoztlanPlaces.filter(place => {
    const name = lang === 'en' && place.nameEn ? place.nameEn : place.name
    const description = lang === 'en' && place.descriptionEn ? place.descriptionEn : place.description
    
    return name.toLowerCase().includes(searchTerm) ||
           description.toLowerCase().includes(searchTerm) ||
           place.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
           place.category.includes(searchTerm)
  })
}

export const getCategoryCount = () => {
  const counts: Record<string, number> = {}
  tepoztlanPlaces.forEach(place => {
    counts[place.category] = (counts[place.category] || 0) + 1
  })
  return counts
}

export const getPriceSymbol = (level: number) => {
  return '$'.repeat(level)
}