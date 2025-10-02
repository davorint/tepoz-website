
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from '@/components/ui/navigation-menu'
import { Globe } from 'lucide-react'
import { Locale } from '@/lib/i18n'
import { Translations } from '@/types/translations'
import { cn } from '@/lib/utils'
import { buildLocalizedUrl } from '@/lib/url-mapping'
import { ModeToggle } from '@/components/theme/mode-toggle-wrapper'

interface StaticNavigationProps {
  lang: Locale
  translations: Translations
}

export default function StaticNavigation({ lang, translations }: StaticNavigationProps) {
  console.log('StaticNavigation received lang parameter:', lang)
  const otherLang: Locale = lang === 'es' ? 'en' : 'es'
  const languages: Record<Locale, { label: string; flag: string }> = {
    es: { label: 'Español', flag: '🇲🇽' },
    en: { label: 'English', flag: '🇺🇸' },
  }
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        {lang === 'es' ? 'Saltar al contenido principal' : 'Skip to main content'}
      </a>

      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href={`/${lang}`} className="group flex items-center space-x-2 transition-all duration-300 hover:scale-105">
          <div className="h-8 w-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-md flex items-center justify-center transition-all duration-300 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-orange-500/25">
            <span className="text-white font-bold text-sm transition-transform duration-300 group-hover:scale-110">T</span>
          </div>
          <span className="font-bold text-lg transition-colors duration-300 text-slate-900 dark:text-white">
            <span className="group-hover:text-orange-500">TODO</span>
            <span className="text-orange-500 group-hover:text-orange-600">TEPOZ</span>
          </span>
        </Link>

        {/* Navigation Menu with Submenus */}
        <NavigationMenu className="hidden md:flex text-slate-900 dark:text-white">
          <NavigationMenuList>
            <NavigationMenuItem className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both [animation-delay:100ms]">
              <NavigationMenuTrigger className="transition-all duration-300 hover:scale-105">{translations.nav.discover}</NavigationMenuTrigger>
              <NavigationMenuContent className="animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                  <NavigationMenuLink asChild>
                    <Link href={buildLocalizedUrl('discover/tepoztlan', lang)} className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] hover:shadow-md focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Tepoztlán Centro</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {lang === 'es' ? 'El corazón del Pueblo Mágico' : 'Heart of the Magical Town'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href={buildLocalizedUrl('discover/amatlan', lang)} className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] hover:shadow-md focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Amatlán</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {lang === 'es' ? 'Cuna de Quetzalcóatl' : 'Birthplace of Quetzalcoatl'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href={buildLocalizedUrl('discover/san-juan-tlacotenco', lang)} className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] hover:shadow-md focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">San Juan Tlacotenco</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {lang === 'es' ? 'Tradición del pulque' : 'Pulque tradition'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both [animation-delay:200ms]">
              <NavigationMenuTrigger className="transition-all duration-300 hover:scale-105">{translations.nav.stay}</NavigationMenuTrigger>
              <NavigationMenuContent className="animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                  <NavigationMenuLink asChild>
                    <Link href={`/${lang}/stay/hotels`} className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] hover:shadow-md focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">{translations.stay.categories.hotels}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {lang === 'es' ? 'Boutique y tradicionales' : 'Boutique and traditional'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href={buildLocalizedUrl('stay/vacation-rentals', lang)} className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] hover:shadow-md focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">{translations.stay.categories.vacationRentals}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {lang === 'es' ? 'Casas y departamentos' : 'Houses and apartments'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both [animation-delay:300ms]">
              <NavigationMenuTrigger className="transition-all duration-300 hover:scale-105">{translations.nav.eat}</NavigationMenuTrigger>
              <NavigationMenuContent className="animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                  <NavigationMenuLink asChild>
                    <Link href={buildLocalizedUrl('food-drink/restaurants', lang)} className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] hover:shadow-md focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">{translations.eat.categories.restaurants}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {lang === 'es' ? 'Restaurantes y terrazas con vista' : 'Restaurants and rooftop dining'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href={buildLocalizedUrl('food-drink/cafes-bakeries', lang)} className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] hover:shadow-md focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">{translations.eat.categories.cafes}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {lang === 'es' ? 'Café y panaderías artesanales' : 'Coffee and artisan bakeries'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href={buildLocalizedUrl('food-drink/street-food', lang)} className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] hover:shadow-md focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">{translations.eat.categories.streetFood}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {lang === 'es' ? 'Antojitos y mercados locales' : 'Local snacks and markets'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href={buildLocalizedUrl('food-drink/bars-pulquerias', lang)} className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] hover:shadow-md focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">{lang === 'es' ? 'Bares y Pulquerías' : 'Bars & Pulquerias'}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {lang === 'es' ? 'Vida nocturna y pulque tradicional' : 'Nightlife and traditional pulque'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both [animation-delay:400ms]">
              <NavigationMenuLink asChild>
                <Link href={buildLocalizedUrl('experience', lang)} className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-105 focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50")}>
                  {translations.nav.experience}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both [animation-delay:500ms]">
              <NavigationMenuLink asChild>
                <Link href={buildLocalizedUrl('events', lang)} className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-105 focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50")}>
                  {translations.nav.events}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both [animation-delay:600ms]">
              <NavigationMenuLink asChild>
                <Link href={buildLocalizedUrl('map', lang)} className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-105 focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50")}>
                  {translations.nav.map}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2 animate-in fade-in slide-in-from-right-4 duration-700 [animation-delay:300ms] text-slate-900 dark:text-white">
          {/* Language Toggle */}
          {/* Simple Server-Side Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="group gap-1 transition-all duration-300 hover:scale-105 hover:shadow-md"
          >
            <Link
              href={`/${otherLang}`}
              aria-label={lang === 'es' ? `Cambiar a ${languages[otherLang].label}` : `Switch to ${languages[otherLang].label}`}
            >
              <Globe className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
              <span className="hidden sm:inline font-medium">
                {languages[otherLang].flag} {languages[otherLang].label}
              </span>
              <span className="sm:hidden" aria-hidden="true">
                {languages[otherLang].flag}
              </span>
            </Link>
          </Button>
          
          {/* Theme Toggle */}
          <ModeToggle />
          
          {/* Search Button */}
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="hidden sm:flex group transition-all duration-300 hover:scale-105 hover:shadow-md"
          >
            <Link
              href={buildLocalizedUrl('search', lang)}
              aria-label={translations.nav.search}
            >
              <svg
                className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
              </svg>
              <span className="ml-2 hidden md:inline transition-colors duration-300 group-hover:text-primary">{translations.nav.search}</span>
            </Link>
          </Button>
          
        </div>
      </div>
    </header>
  )
}