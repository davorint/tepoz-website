'use client'

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
import { useRouter, usePathname } from 'next/navigation'

interface TopNavigationProps {
  lang: Locale
  translations: Translations
}

export default function TopNavigation({ lang, translations }: TopNavigationProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageToggle = () => {
    const newLang = lang === 'es' ? 'en' : 'es'
    const currentPath = pathname.replace(/^\/[a-z]{2}/, '')
    router.push(`/${newLang}${currentPath}`)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gradient-to-br from-tepoztlan-earth to-tepoztlan-sunset rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="font-bold text-lg">Tepoztlán</span>
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{translations.nav.discover}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                  <NavigationMenuLink asChild>
                    <Link href={`/${lang}/descubre/amatlan`} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Amatlan</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Explora este hermoso pueblo cercano
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href={`/${lang}/descubre/san-juan-tlacotenco`} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">San Juan Tlacotenco</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Descubre tradiciones locales
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
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href={`/${lang}/hospedaje/eco-lodges`} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">{translations.stay.categories.ecoLodges}</div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href={`/${lang}/hospedaje/rentas-vacacionales`} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">{translations.stay.categories.vacationRentals}</div>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href={`/${lang}/comer`} className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50")}>
                  {translations.nav.eat}
                </Link>
              </NavigationMenuLink>
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
          </NavigationMenuList>
        </NavigationMenu>

        {/* Language Toggle & Mobile Menu */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLanguageToggle}
            className="flex items-center space-x-1"
          >
            <Globe className="h-4 w-4" />
            <span className="text-xs">{lang.toUpperCase()}</span>
          </Button>
          
          {/* Mobile menu button - placeholder */}
          <Button variant="outline" size="sm" className="md:hidden">
            ☰
          </Button>
        </div>
      </div>
    </header>
  )
}