export const locales = ['es', 'en'] as const
export const defaultLocale = 'es' as const

export type Locale = typeof locales[number]

export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English'
}

// Route mappings between languages
export const routeMappings: Record<string, Record<Locale, string>> = {
  // Main sections
  'descubre': { es: 'descubre', en: 'discover' },
  'discover': { es: 'descubre', en: 'discover' },
  
  'hospedaje': { es: 'hospedaje', en: 'stay' },
  'stay': { es: 'hospedaje', en: 'stay' },
  
  'comer': { es: 'comer', en: 'eat' },
  'eat': { es: 'comer', en: 'eat' },
  
  'experiencias': { es: 'experiencias', en: 'experience' },
  'experience': { es: 'experiencias', en: 'experience' },
  
  'eventos': { es: 'eventos', en: 'events' },
  'events': { es: 'eventos', en: 'events' },
  
  'compras': { es: 'compras', en: 'shop' },
  'shop': { es: 'compras', en: 'shop' },
  
  'servicios': { es: 'servicios', en: 'services' },
  'services': { es: 'servicios', en: 'services' },
  
  'mapa': { es: 'mapa', en: 'map' },
  'map': { es: 'mapa', en: 'map' },
  
  'buscar': { es: 'buscar', en: 'search' },
  'search': { es: 'buscar', en: 'search' },
  
  'planificar': { es: 'planificar', en: 'plan' },
  'plan': { es: 'planificar', en: 'plan' },
  
  'blog': { es: 'blog', en: 'blog' },
  
  'comunidad': { es: 'comunidad', en: 'community' },
  'community': { es: 'comunidad', en: 'community' },
  
  'negocios': { es: 'negocios', en: 'business' },
  'business': { es: 'negocios', en: 'business' },
  
  'usuario': { es: 'usuario', en: 'user' },
  'user': { es: 'usuario', en: 'user' },
  
  'informacion': { es: 'informacion', en: 'info' },
  'info': { es: 'informacion', en: 'info' }
}