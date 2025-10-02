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

/**
 * Security Headers - CSP, HSTS, Permissions-Policy
 */
function setSecurityHeaders(response: NextResponse): void {
  // Generate a unique nonce for this request
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  // Content Security Policy
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com https://www.google-analytics.com ${
      process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : ''
    };
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.maptiler.com;
    font-src 'self' data: https://fonts.gstatic.com;
    img-src 'self' data: https: blob:;
    connect-src 'self' https://api.maptiler.com https://events.mapbox.com https://api.mapbox.com https://www.google-analytics.com https://region1.google-analytics.com;
    worker-src 'self' blob:;
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
    ${process.env.NODE_ENV === 'production' ? 'upgrade-insecure-requests;' : ''}
  `
    .replace(/\s{2,}/g, ' ')
    .trim()

  response.headers.set('Content-Security-Policy', cspHeader)
  response.headers.set('X-Nonce', nonce)

  // Strict-Transport-Security (HSTS) - Only in production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    )
  }

  // Permissions-Policy
  response.headers.set(
    'Permissions-Policy',
    'geolocation=(self), camera=(), microphone=(), payment=(), usb=()'
  )
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
      setSecurityHeaders(response)
      return response
    }

    // Redirect to the localized path
    const response = NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    )
    setSecurityHeaders(response)
    return response
  }

  // Set locale cookie if visiting a specific locale
  const currentLocale = pathname.split('/')[1]
  if (locales.includes(currentLocale as Locale)) {
    const response = NextResponse.next()
    response.cookies.set('locale', currentLocale, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: 'lax'
    })
    setSecurityHeaders(response)
    return response
  }

  const response = NextResponse.next()
  setSecurityHeaders(response)
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - static image files (jpg, jpeg, png, gif, svg, webp, ico)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|svg|webp|ico)$).*)',
  ]
}