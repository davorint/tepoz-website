// Static path generation utilities for optimal build performance
import { locales, Locale } from './i18n'
import { routeMapping } from './url-mapping'

export interface StaticPath {
  params: {
    lang: string
    [key: string]: string | string[]
  }
}

export interface CategoryPath extends StaticPath {
  params: {
    lang: string
    category?: string
    subcategory?: string
  }
}

export interface BusinessPath extends StaticPath {
  params: {
    lang: string
    category: string
    slug: string
  }
}

// Priority routes for static generation (most important pages)
export const PRIORITY_ROUTES = [
  '', // Homepage
  'descubre',
  'descubre/tepoztlan',
  'hospedaje', 
  'hospedaje/hoteles',
  'comer',
  'comer/restaurantes',
  'experiencias',
  'experiencias/piramide-tepozteco',
  'eventos',
  'buscar'
] as const

// Secondary routes (generated on-demand or at build time with lower priority)
export const SECONDARY_ROUTES = [
  'descubre/amatlan',
  'descubre/san-juan-tlacotenco',
  'descubre/ocotitlan',
  'hospedaje/eco-lodges',
  'hospedaje/rentas-vacacionales',
  'hospedaje/hostales',
  'hospedaje/retiros',
  'hospedaje/camping',
  'comer/cafeterias',
  'comer/comida-callejera', 
  'comer/bares',
  'comer/experiencias-gastronomicas',
  'experiencias/senderismo',
  'experiencias/bienestar',
  'experiencias/cultura',
  'experiencias/aventura',
  'experiencias/espiritual',
  'experiencias/tours',
  'eventos/calendario',
  'eventos/festivales',
  'eventos/mercados',
  'compras',
  'compras/mercados',
  'compras/artesanos',
  'compras/galerias',
  'servicios',
  'servicios/transporte',
  'servicios/medicos',
  'servicios/financieros',
  'mapa',
  'planificar',
  'blog',
  'comunidad',
  'negocios',
  'usuario',
  'informacion'
] as const

/**
 * Generate static params for language-aware routes
 */
export function generateLanguageParams(): Array<{ lang: string }> {
  return locales.map((lang) => ({ lang }))
}

/**
 * Generate static params for priority routes (pre-rendered at build time)
 */
export function generatePriorityStaticParams(): StaticPath[] {
  const params: StaticPath[] = []
  
  locales.forEach(lang => {
    PRIORITY_ROUTES.forEach(route => {
      const localizedRoute = getLocalizedRoute(route, lang)
      const segments = localizedRoute.split('/').filter(Boolean)
      
      if (segments.length === 0) {
        // Homepage
        params.push({ params: { lang } })
      } else if (segments.length === 1) {
        // Category pages
        params.push({ 
          params: { 
            lang,
            category: segments[0]
          } 
        })
      } else if (segments.length === 2) {
        // Subcategory pages
        params.push({ 
          params: { 
            lang,
            category: segments[0],
            subcategory: segments[1]
          } 
        })
      }
    })
  })
  
  return params
}

/**
 * Generate static params for all routes (for sitemap generation)
 */
export function generateAllStaticParams(): StaticPath[] {
  const params: StaticPath[] = []
  const allRoutes = [...PRIORITY_ROUTES, ...SECONDARY_ROUTES]
  
  locales.forEach(lang => {
    allRoutes.forEach(route => {
      const localizedRoute = getLocalizedRoute(route, lang)
      const segments = localizedRoute.split('/').filter(Boolean)
      
      if (segments.length === 0) {
        params.push({ params: { lang } })
      } else {
        // Create nested param structure based on segments
        const paramObj: { lang: string; [key: string]: string | string[] } = { lang }
        segments.forEach((segment, index) => {
          if (index === 0) paramObj.category = segment
          else if (index === 1) paramObj.subcategory = segment
          else if (index === 2) paramObj.slug = segment
        })
        
        params.push({ params: paramObj })
      }
    })
  })
  
  return params
}

/**
 * Get localized route for a given language
 */
function getLocalizedRoute(route: string, lang: Locale): string {
  if (lang === 'en') {
    // Convert Spanish route to English
    return routeMapping[route as keyof typeof routeMapping] || route
  }
  return route
}

/**
 * Generate static params for business listings
 */
export async function generateBusinessStaticParams(): Promise<BusinessPath[]> {
  // In a real application, this would query your database
  // For now, return sample business paths
  const businessPaths: BusinessPath[] = []
  
  const sampleBusinesses = [
    { category: 'hotel', slug: { es: 'casa-fernanda', en: 'casa-fernanda' } },
    { category: 'restaurant', slug: { es: 'la-cocina-de-maria', en: 'marias-kitchen' } }
  ]
  
  locales.forEach(lang => {
    sampleBusinesses.forEach(business => {
      const categoryMap: Record<string, string> = {
        hotel: lang === 'es' ? 'hospedaje' : 'stay',
        restaurant: lang === 'es' ? 'comer' : 'eat',
        experience: lang === 'es' ? 'experiencias' : 'experience',
        service: lang === 'es' ? 'servicios' : 'services',
        shop: lang === 'es' ? 'compras' : 'shop'
      }
      
      businessPaths.push({
        params: {
          lang,
          category: categoryMap[business.category],
          slug: business.slug[lang]
        }
      })
    })
  })
  
  return businessPaths
}

/**
 * Check if a route should be statically generated
 */
export function shouldGenerateStatic(route: string): boolean {
  return PRIORITY_ROUTES.includes(route as (typeof PRIORITY_ROUTES)[number]) || 
         route === '' || 
         route.split('/').length <= 2 // Generate category and subcategory pages
}

/**
 * Get revalidation time based on route type
 */
export function getRevalidationTime(route: string): number | false {
  // Homepage and main categories: revalidate every hour
  if (PRIORITY_ROUTES.includes(route as (typeof PRIORITY_ROUTES)[number])) {
    return 3600 // 1 hour
  }
  
  // Business listings: revalidate every 6 hours
  if (route.includes('hoteles') || route.includes('restaurantes')) {
    return 21600 // 6 hours
  }
  
  // Events: revalidate every 30 minutes
  if (route.includes('eventos')) {
    return 1800 // 30 minutes
  }
  
  // Other pages: revalidate daily
  return 86400 // 24 hours
}

/**
 * Metadata priorities for different route types
 */
export function getMetadataPriority(route: string): number {
  if (route === '') return 1.0 // Homepage
  if (PRIORITY_ROUTES.includes(route as (typeof PRIORITY_ROUTES)[number])) return 0.9
  if (route.split('/').length === 1) return 0.8 // Category pages
  if (route.split('/').length === 2) return 0.7 // Subcategory pages
  return 0.6 // Individual pages
}