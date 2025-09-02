import { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'
import { routeMapping } from '@/lib/url-mapping'
import { 
  PRIORITY_ROUTES, 
  SECONDARY_ROUTES, 
  getMetadataPriority, 
  generateBusinessStaticParams 
} from '@/lib/static-paths'

const baseUrl = 'https://tepoztlan.com'

function getLocalizedRoute(route: string, lang: 'es' | 'en'): string {
  if (lang === 'en') {
    return routeMapping[route as keyof typeof routeMapping] || route
  }
  return route
}

function getChangeFrequency(route: string): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {
  // Events change frequently
  if (route.includes('eventos')) return 'daily'
  
  // Business listings change regularly  
  if (route.includes('hoteles') || route.includes('restaurantes') || route.includes('hospedaje') || route.includes('comer')) {
    return 'weekly'
  }
  
  // Static content pages
  if (route.includes('informacion') || route.includes('info')) return 'monthly'
  
  // Main pages
  if (PRIORITY_ROUTES.includes(route as (typeof PRIORITY_ROUTES)[number])) return 'weekly'
  
  return 'monthly'
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = []
  const allRoutes = [...PRIORITY_ROUTES, ...SECONDARY_ROUTES]

  // Generate static route entries
  allRoutes.forEach(route => {
    locales.forEach(lang => {
      const localizedRoute = getLocalizedRoute(route, lang)
      const url = route === '' 
        ? `${baseUrl}/${lang}`
        : `${baseUrl}/${lang}/${localizedRoute}`

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: getChangeFrequency(route),
        priority: getMetadataPriority(route),
        alternates: {
          languages: {
            es: route === '' 
              ? `${baseUrl}/es`
              : `${baseUrl}/es/${route}`,
            en: route === '' 
              ? `${baseUrl}/en`
              : `${baseUrl}/en/${getLocalizedRoute(route, 'en')}`,
          },
        },
      })
    })
  })

  // Generate business listing entries
  try {
    const businessParams = await generateBusinessStaticParams()
    
    businessParams.forEach(({ params }) => {
      const { lang, category, slug } = params
      const url = `${baseUrl}/${lang}/${category}/${slug}`
      
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
        alternates: {
          languages: {
            es: url.replace(`/${lang}/`, '/es/'),
            en: url.replace(`/${lang}/`, '/en/'),
          },
        },
      })
    })
  } catch (error) {
    console.warn('Failed to generate business sitemap entries:', error)
  }

  // Sort by priority (highest first) then alphabetically
  sitemapEntries.sort((a, b) => {
    if (a.priority !== b.priority) {
      return (b.priority || 0) - (a.priority || 0)
    }
    return a.url.localeCompare(b.url)
  })

  return sitemapEntries
}