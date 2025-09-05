import { Locale } from '@/lib/i18n'
import { getLocalizedRoute } from '@/lib/url-mapping'

interface HreflangTagsProps {
  currentLang: Locale
  currentPath: string
  baseUrl?: string
}

export default function HreflangTags({ 
  currentLang: _currentLang, // eslint-disable-line @typescript-eslint/no-unused-vars
  currentPath, 
  baseUrl = 'https://tepoztlan.com' 
}: HreflangTagsProps) {
  // Remove language prefix from current path
  const cleanPath = currentPath.replace(/^\/[a-z]{2}/, '').replace(/^\//, '')
  
  // Generate hreflang tags for both languages
  const hreflangTags = [
    {
      hreflang: 'es',
      href: `${baseUrl}/es/${getLocalizedRoute(cleanPath)}`
    },
    {
      hreflang: 'en', 
      href: `${baseUrl}/en/${getLocalizedRoute(cleanPath)}`
    },
    {
      hreflang: 'x-default',
      href: `${baseUrl}/es/${getLocalizedRoute(cleanPath)}` // Default to Spanish
    }
  ]

  return (
    <>
      {hreflangTags.map(({ hreflang, href }) => (
        <link
          key={hreflang}
          rel="alternate"
          hrefLang={hreflang}
          href={href}
        />
      ))}
    </>
  )
}