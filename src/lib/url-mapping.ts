import { Locale } from './i18n'

// URL mapping between Spanish and English routes
export const routeMapping = {
  // Discover/Descubre
  'descubre': 'discover',
  'descubre/tepoztlan': 'discover/tepoztlan',
  'descubre/amatlan': 'discover/amatlan',
  'descubre/ocotitlan': 'discover/ocotitlan',
  'descubre/san-juan-tlacotenco': 'discover/san-juan-tlacotenco',
  
  // Hospedaje/Stay
  'hospedaje': 'stay',
  'hospedaje/hoteles': 'stay/hotels',
  'hospedaje/eco-lodges': 'stay/eco-lodges',
  'hospedaje/rentas-vacacionales': 'stay/vacation-rentals',
  'hospedaje/hostales': 'stay/hostels',
  'hospedaje/retiros': 'stay/retreats',
  'hospedaje/camping': 'stay/camping',
  
  // Comer/Eat
  'comer': 'eat',
  'comer/restaurantes': 'eat/restaurants',
  'comer/cafeterias': 'eat/cafes',
  'comer/comida-callejera': 'eat/street-food',
  'comer/bares': 'eat/bars',
  'comer/experiencias-gastronomicas': 'eat/food-experiences',
  
  // Experiencias/Experience
  'experiencias': 'experience',
  'experiencias/piramide-tepozteco': 'experience/tepozteco-pyramid',
  'experiencias/senderismo': 'experience/hiking',
  'experiencias/bienestar': 'experience/wellness',
  'experiencias/cultura': 'experience/cultural',
  'experiencias/aventura': 'experience/adventure',
  'experiencias/espiritual': 'experience/spiritual',
  'experiencias/tours': 'experience/tours',
  
  // Eventos/Events
  'eventos': 'events',
  'eventos/calendario': 'events/calendar',
  'eventos/festivales': 'events/festivals',
  'eventos/mercados': 'events/markets',
  
  // Compras/Shop
  'compras': 'shop',
  'compras/mercados': 'shop/markets',
  'compras/artesanos': 'shop/artisans',
  'compras/galerias': 'shop/galleries',
  
  // Servicios/Services
  'servicios': 'services',
  'servicios/transporte': 'services/transportation',
  'servicios/medicos': 'services/medical',
  'servicios/financieros': 'services/financial',
  
  // Other routes
  'mapa': 'map',
  'buscar': 'search',
  'planificar': 'plan',
  'blog': 'blog',
  'comunidad': 'community',
  'negocios': 'business',
  'usuario': 'user',
  'informacion': 'info'
} as const

// Get the appropriate route for a given language
export function getLocalizedRoute(route: string, targetLang: Locale): string {
  // Remove leading slash and language prefix
  const cleanRoute = route.replace(/^\/[a-z]{2}\//, '').replace(/^\//, '')
  
  if (targetLang === 'es') {
    // Find Spanish route from English
    const spanishRoute = Object.entries(routeMapping).find(([sp, en]) => en === cleanRoute)?.[0]
    return spanishRoute || cleanRoute
  } else {
    // Find English route from Spanish
    const englishRoute = routeMapping[cleanRoute as keyof typeof routeMapping]
    return englishRoute || cleanRoute
  }
}

// Build full localized URL
export function buildLocalizedUrl(route: string, lang: Locale): string {
  const localizedRoute = getLocalizedRoute(route, lang)
  return `/${lang}/${localizedRoute}`
}