'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Locale } from '@/lib/i18n'
import { Globe } from 'lucide-react'

interface LanguageToggleProperProps {
  currentLang: Locale
}

const languages: Record<Locale, { label: string; flag: string }> = {
  es: { label: 'Español', flag: '🇪🇸' },
  en: { label: 'English', flag: '🇺🇸' },
}

// URL mapping between Spanish and English routes
const routeMapping: Record<string, string> = {
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
  'hospedaje/rentas-vacacionales': 'stay/vacation-rentals',
  'hospedaje/hostales': 'stay/hostels',
  'hospedaje/retiros': 'stay/retreats',
  'hospedaje/camping': 'stay/camping',
  
  // Comer/Eat
  'comer': 'eat',
  'comer/restaurantes': 'eat/restaurants',
  'comer/cafeterias': 'eat/cafes',
  'comer/comida-callejera': 'eat/street-food',
  'comer/bares': 'eat/bars',
  'comer/experiencias-gastronomicas': 'eat/culinary-experiences',
  
  // Search
  'buscar': 'search',
  
  // Other routes
  'eventos': 'events',
  'experiencias': 'experience',
  'mapa': 'map',
  'planificar': 'plan',
  'servicios': 'services',
  'compras': 'shop',
  'comunidad': 'community',
  'negocios': 'business',
  'usuario': 'user',
  'informacion': 'info',
  'blog': 'blog',
}

function getLocalizedRoute(route: string, targetLang: Locale): string {
  // Remove leading slash and language prefix
  const cleanRoute = route.replace(/^\/[a-z]{2}\//, '').replace(/^\//, '')
  
  if (targetLang === 'es') {
    // Find Spanish route from English
    const spanishRoute = Object.entries(routeMapping).find(([, en]) => en === cleanRoute)?.[0]
    return spanishRoute || cleanRoute
  } else {
    // Find English route from Spanish
    const englishRoute = routeMapping[cleanRoute as keyof typeof routeMapping]
    return englishRoute || cleanRoute
  }
}

export function LanguageToggleProper({ currentLang }: LanguageToggleProperProps) {
  const pathname = usePathname()
  const otherLang: Locale = currentLang === 'es' ? 'en' : 'es'
  
  const getLanguageUrl = () => {
    // Get the route without the language prefix
    const route = pathname.replace(/^\/[a-z]{2}/, '').replace(/^\//, '')
    
    if (!route) {
      // Home page
      return `/${otherLang}`
    }
    
    // Get localized route for the other language
    const localizedRoute = getLocalizedRoute(route, otherLang)
    return `/${otherLang}/${localizedRoute}`
  }

  return (
    <Button variant="ghost" size="sm" asChild className="group gap-1 transition-all duration-300 hover:scale-105 hover:shadow-md">
      <Link href={getLanguageUrl()}>
        <Globe className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
        <span className="hidden sm:inline font-medium">
          {languages[otherLang].flag} {languages[otherLang].label}
        </span>
        <span className="sm:hidden">
          {languages[otherLang].flag}
        </span>
      </Link>
    </Button>
  )
}