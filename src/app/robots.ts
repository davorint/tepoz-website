import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://tepoztlan.com'
  
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