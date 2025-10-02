import { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/env'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl()
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/es/',
          '/en/',
          '/sitemap.xml'
        ],
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
          '*.pdf$',
          '*.json$'
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/es/',
          '/en/',
          '/sitemap.xml'
        ],
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/'
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}