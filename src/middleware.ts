import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Supported languages
export const locales = ['es', 'en'] as const
export type Locale = typeof locales[number]
export const defaultLocale = 'es'

// Language detection function
function getLocale(request: NextRequest): string {
  // Check if there's a locale cookie
  const localeCookie = request.cookies.get('locale')
  if (localeCookie && locales.includes(localeCookie.value as Locale)) {
    return localeCookie.value
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language')
  if (acceptLanguage) {
    const detectedLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().toLowerCase())
      .find(lang => {
        if (lang.startsWith('es')) return 'es'
        if (lang.startsWith('en')) return 'en'
        return null
      })
    
    if (detectedLocale) {
      return detectedLocale.startsWith('es') ? 'es' : 'en'
    }
  }

  // Check if request is from Mexico (you could integrate with a geo-IP service)
  // For now, default to Spanish for Mexican timezone
  const timezone = request.headers.get('X-Timezone')
  if (timezone && timezone.includes('Mexico')) {
    return 'es'
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    
    // Handle root path
    if (pathname === '/') {
      const response = NextResponse.redirect(
        new URL(`/${locale}`, request.url)
      )
      response.cookies.set('locale', locale, { 
        maxAge: 60 * 60 * 24 * 30, // 30 days
        sameSite: 'lax'
      })
      return response
    }

    // Redirect to the localized path
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    )
  }

  // Set locale cookie if visiting a specific locale
  const currentLocale = pathname.split('/')[1]
  if (locales.includes(currentLocale as Locale)) {
    const response = NextResponse.next()
    response.cookies.set('locale', currentLocale, { 
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: 'lax'
    })
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|manifest.json|.*\\..*|demo).*)',
  ]
}