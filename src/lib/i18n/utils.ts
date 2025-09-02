import { Locale, locales, defaultLocale } from './config'

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export function getValidLocale(locale: string): Locale {
  return isValidLocale(locale) ? locale : defaultLocale
}

export function getLocalePath(path: string, locale: Locale): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  // If path is empty or already has locale, return as is
  if (!cleanPath || cleanPath.startsWith(`${locale}/`)) {
    return `/${locale}${cleanPath ? `/${cleanPath}` : ''}`
  }
  
  return `/${locale}/${cleanPath}`
}

export function removeLocalePath(path: string): string {
  for (const locale of locales) {
    if (path.startsWith(`/${locale}`)) {
      return path.slice(`/${locale}`.length) || '/'
    }
  }
  return path
}

export function getLocaleFromPath(path: string): Locale | null {
  const segments = path.split('/').filter(Boolean)
  if (segments.length === 0) return null
  
  const potentialLocale = segments[0]
  return isValidLocale(potentialLocale) ? potentialLocale : null
}