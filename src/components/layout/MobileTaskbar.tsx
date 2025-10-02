'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  MapPin,
  Bed,
  Coffee,
  Sparkles,
  Calendar,
  Map,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Locale } from '@/lib/i18n'
import { Translations } from '@/types/translations'
import { buildLocalizedUrl } from '@/lib/url-mapping'

interface TaskbarItem {
  key: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  isActive: (pathname: string, lang: Locale) => boolean
}

interface MobileTaskbarProps {
  lang: Locale
  translations: Translations
}

const getTaskbarItems = (lang: Locale, translations: Translations): TaskbarItem[] => [
  {
    key: 'discover',
    href: buildLocalizedUrl('descubre', lang),
    icon: MapPin,
    label: translations.nav.discover,
    isActive: (pathname: string, lang: Locale) => 
      pathname.startsWith(`/${lang}/discover`) || pathname.startsWith(`/${lang}/descubre`)
  },
  {
    key: 'stay', 
    href: buildLocalizedUrl('hospedaje', lang),
    icon: Bed,
    label: translations.nav.stay,
    isActive: (pathname: string, lang: Locale) => 
      pathname.startsWith(`/${lang}/stay`) || pathname.startsWith(`/${lang}/hospedaje`)
  },
  {
    key: 'eat',
    href: buildLocalizedUrl('comer', lang),
    icon: Coffee,
    label: translations.nav.eat,
    isActive: (pathname: string, lang: Locale) => 
      pathname.startsWith(`/${lang}/eat`) || pathname.startsWith(`/${lang}/comer`)
  },
  {
    key: 'experience',
    href: buildLocalizedUrl('experiencias', lang),
    icon: Sparkles,
    label: translations.nav.experience,
    isActive: (pathname: string, lang: Locale) => 
      pathname.startsWith(`/${lang}/experience`) || pathname.startsWith(`/${lang}/experiencias`)
  },
  {
    key: 'events',
    href: buildLocalizedUrl('eventos', lang),
    icon: Calendar,
    label: translations.nav.events,
    isActive: (pathname: string, lang: Locale) => 
      pathname.startsWith(`/${lang}/events`) || pathname.startsWith(`/${lang}/eventos`)
  },
  {
    key: 'map',
    href: buildLocalizedUrl('mapas', lang),
    icon: Map,
    label: translations.nav.map,
    isActive: (pathname: string, lang: Locale) => 
      pathname.startsWith(`/${lang}/map`) || pathname.startsWith(`/${lang}/mapas`)
  }
]

export default function MobileTaskbar({ lang, translations }: MobileTaskbarProps) {
  const pathname = usePathname()
  const taskbarItems = getTaskbarItems(lang, translations)

  return (
    <>
      {/* Spacer to prevent content from being hidden behind the taskbar */}
      <div className="h-20 md:hidden" />
      
      {/* Mobile Taskbar */}
      <nav 
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90"
        role="navigation"
        aria-label={lang === 'es' ? 'Navegación principal móvil' : 'Mobile main navigation'}
      >
        <div className="flex items-center justify-around px-2 py-2">
          {taskbarItems.map((item) => {
            const Icon = item.icon
            const isActive = item.isActive(pathname, lang)
            
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-0 flex-1 max-w-[80px] group",
                  "hover:bg-accent/10 focus:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:ring-offset-1",
                  isActive 
                    ? "text-accent bg-accent/10" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon
                  className={cn(
                    "h-6 w-6 mb-1 transition-transform duration-200",
                    isActive && "scale-110",
                    "group-hover:scale-105 group-focus:scale-105"
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    // Changed from text-[10px] to text-xs (12px) for better mobile readability
                    // Meets Material Design minimum (12sp) and improves accessibility
                    "text-xs font-medium leading-none text-center truncate w-full transition-all duration-200",
                    isActive && "font-semibold"
                  )}
                >
                  {item.label}
                </span>
                
                {/* Active indicator */}
                {isActive && (
                  <div 
                    className="absolute -top-px left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-accent rounded-full"
                    aria-hidden="true"
                  />
                )}
              </Link>
            )
          })}
        </div>
        
        {/* Accessibility enhancement for screen readers */}
        <div className="sr-only" aria-live="polite">
          {lang === 'es' 
            ? `Navegación actual: ${taskbarItems.find(item => item.isActive(pathname, lang))?.label || 'Inicio'}`
            : `Current navigation: ${taskbarItems.find(item => item.isActive(pathname, lang))?.label || 'Home'}`
          }
        </div>
      </nav>
    </>
  )
}