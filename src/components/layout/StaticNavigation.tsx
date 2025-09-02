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

interface StaticNavigationProps {
  lang: Locale
  translations: Translations
}

export default function StaticNavigation({ lang, translations }: StaticNavigationProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="font-bold text-lg">Tepoztlán</span>
        </Link>

        {/* Navigation Menu with Submenus */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{translations.nav.discover}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                  <NavigationMenuLink asChild>
                    <Link href={`/${lang}/descubre/tepoztlan`} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Tepoztlán Centro</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {lang === 'es' ? 'El corazón del Pueblo Mágico' : 'Heart of the Magical Town'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href={`/${lang}/descubre/amatlan`} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Amatlán</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {lang === 'es' ? 'Cuna de Quetzalcóatl' : 'Birthplace of Quetzalcoatl'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href={`/${lang}/descubre/san-juan-tlacotenco`} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">San Juan Tlacotenco</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {lang === 'es' ? 'Tradición del pulque' : 'Pulque tradition'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>{translations.nav.stay}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                  <NavigationMenuLink asChild>
                    <Link href={`/${lang}/hospedaje/hoteles`} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">{translations.stay.categories.hotels}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {lang === 'es' ? 'Boutique y tradicionales' : 'Boutique and traditional'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href={`/${lang}/hospedaje/eco-lodges`} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">{translations.stay.categories.ecoLodges}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {lang === 'es' ? 'Conecta con la naturaleza' : 'Connect with nature'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href={`/${lang}/hospedaje/rentas-vacacionales`} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">{translations.stay.categories.vacationRentals}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {lang === 'es' ? 'Casas y departamentos' : 'Houses and apartments'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>{translations.nav.eat}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                  <NavigationMenuLink asChild>
                    <Link href={`/${lang}/comer/restaurantes`} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">{translations.eat.categories.restaurants}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {lang === 'es' ? 'Cocina tradicional e internacional' : 'Traditional and international cuisine'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href={`/${lang}/comer/cafeterias`} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">{translations.eat.categories.cafes}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {lang === 'es' ? 'Café y panaderías artesanales' : 'Coffee and artisan bakeries'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href={`/${lang}/comer/comida-callejera`} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">{translations.eat.categories.streetFood}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {lang === 'es' ? 'Antojitos y mercados locales' : 'Local snacks and markets'}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href={`/${lang}/experiencias`} className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50")}>
                  {translations.nav.experience}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href={`/${lang}/eventos`} className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50")}>
                  {translations.nav.events}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href={`/${lang}/mapa`} className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50")}>
                  {translations.nav.map}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Search Button */}
          <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
            <Link href={`/${lang}/buscar`}>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
              </svg>
              <span className="ml-2 hidden md:inline">{translations.nav.search}</span>
            </Link>
          </Button>
          
          {/* Language Display */}
          <Button variant="outline" size="sm" className="flex items-center space-x-1">
            <Globe className="h-4 w-4" />
            <span className="text-xs">{lang.toUpperCase()}</span>
          </Button>
          
          {/* Mobile menu button */}
          <Button variant="outline" size="sm" className="md:hidden">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  )
}