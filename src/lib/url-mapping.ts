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
  'hospedaje/rentas-vacacionales': 'stay/rentals',
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
  'mapas': 'map',
  'buscar': 'search',
  'planificar': 'plan',
  'blog': 'blog',
  'comunidad': 'community',
  'negocios': 'business',
  'usuario': 'user',
  'informacion': 'info'
} as const

// Get the appropriate route for a given language
export function getLocalizedRoute(route: string): string {
  // Remove leading slash and language prefix
  const cleanRoute = route.replace(/^\/[a-z]{2}\//, '').replace(/^\//, '')
  
  // Since we now use English folder structure for both languages,
  // we always return English routes regardless of target language
  const isSpanishRoute = routeMapping.hasOwnProperty(cleanRoute as keyof typeof routeMapping)
  
  if (isSpanishRoute) {
    // Convert Spanish route to English
    const englishRoute = routeMapping[cleanRoute as keyof typeof routeMapping]
    return englishRoute || cleanRoute
  } else {
    // Route is already English or unknown - use as is
    return cleanRoute
  }
}

// Build full localized URL
export function buildLocalizedUrl(route: string, lang: Locale): string {
  const localizedRoute = getLocalizedRoute(route)
  return `/${lang}/${localizedRoute}`
}