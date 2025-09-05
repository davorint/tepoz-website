'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, Home, MapPin, Calendar, Search, Coffee, Bed, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { LanguageSwitcher } from "./language-switcher"

interface NavigationItem {
  href: string
  label: string
  icon: React.ReactNode
  badge?: string
}

interface MobileNavigationProps {
  lang: 'es' | 'en'
  currentPath: string
}

const getNavigationItems = (lang: 'es' | 'en'): NavigationItem[] => {
  if (lang === 'es') {
    return [
      { href: `/${lang}`, label: 'Inicio', icon: <Home className="h-4 w-4" /> },
      { href: `/${lang}/search`, label: 'Buscar', icon: <Search className="h-4 w-4" /> },
      { href: `/${lang}/discover`, label: 'Descubrir', icon: <MapPin className="h-4 w-4" /> },
      { href: `/${lang}/eat`, label: 'Comer', icon: <Coffee className="h-4 w-4" /> },
      { href: `/${lang}/stay`, label: 'Hospedarse', icon: <Bed className="h-4 w-4" /> },
      { href: `/${lang}/shop`, label: 'Comprar', icon: <ShoppingBag className="h-4 w-4" /> },
      { href: `/${lang}/events`, label: 'Eventos', icon: <Calendar className="h-4 w-4" />, badge: '5' },
    ]
  }
  
  return [
    { href: `/${lang}`, label: 'Home', icon: <Home className="h-4 w-4" /> },
    { href: `/${lang}/search`, label: 'Search', icon: <Search className="h-4 w-4" /> },
    { href: `/${lang}/discover`, label: 'Discover', icon: <MapPin className="h-4 w-4" /> },
    { href: `/${lang}/eat`, label: 'Eat', icon: <Coffee className="h-4 w-4" /> },
    { href: `/${lang}/stay`, label: 'Stay', icon: <Bed className="h-4 w-4" /> },
    { href: `/${lang}/shop`, label: 'Shop', icon: <ShoppingBag className="h-4 w-4" /> },
    { href: `/${lang}/events`, label: 'Events', icon: <Calendar className="h-4 w-4" />, badge: '5' },
  ]
}

const titles = {
  es: 'Menú de Tepoztlán',
  en: 'Tepoztlán Menu'
}

export function MobileNavigation({ lang, currentPath }: MobileNavigationProps) {
  const navigationItems = getNavigationItems(lang)
  const title = titles[lang]

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 sm:w-96">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-muted-foreground">
              {lang === 'es' ? 'Idioma' : 'Language'}
            </h3>
            <LanguageSwitcher />
          </div>

          <div className="border-t pt-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const isActive = currentPath === item.href
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className="w-full justify-start gap-3"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {item.badge && (
                        <Badge variant="default" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="border-t pt-4 text-xs text-muted-foreground">
            <p>© 2024 Tepoztlán Directory</p>
            <p>{lang === 'es' ? 'Descubre la magia de Tepoztlán' : 'Discover the magic of Tepoztlán'}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}