'use client'

import { useState } from 'react'
import { CategoryTabs } from '@/components/tourism/category-tabs'
import { MobileNavigation } from '@/components/tourism/mobile-navigation'
import { LanguageSwitcher } from '@/components/tourism/language-switcher'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Search, Filter } from 'lucide-react'
import type { Business } from '@/components/tourism/business-card'

// Mock data for demonstration
const sampleBusinesses: Record<string, Business[]> = {
  restaurants: [
    {
      id: '1',
      name: 'La Casa del Tepozteco',
      description: 'Traditional Mexican cuisine with a mystical touch, featuring locally sourced ingredients and ancient recipes.',
      category: 'Restaurante',
      rating: 4.8,
      phone: '+52 739 395 0123',
      address: 'Av. Revolución 123, Centro',
      tags: ['Mexican', 'Traditional', 'Organic'],
      openNow: true,
    },
    {
      id: '2',
      name: 'Café Colibrí',
      description: 'Artisan coffee and healthy breakfast options in a garden setting with views of the Tepozteco.',
      category: 'Café',
      rating: 4.5,
      phone: '+52 739 395 0456',
      address: 'Calle del Sol 45, Centro',
      tags: ['Coffee', 'Breakfast', 'Garden', 'View'],
      openNow: true,
    },
  ],
  hotels: [
    {
      id: '3',
      name: 'Hotel Boutique Tepoztlán',
      description: 'Luxury accommodation with spa services and panoramic views of the mountains.',
      category: 'Hotel Boutique',
      rating: 4.9,
      phone: '+52 739 395 0789',
      address: 'Cerrada del Paraíso 12',
      tags: ['Luxury', 'Spa', 'Mountain View', 'Pool'],
      openNow: true,
    },
  ],
  cafes: [
    {
      id: '4',
      name: 'Cacao & Canela',
      description: 'Specialty coffee roastery and dessert shop featuring local cacao and traditional sweets.',
      category: 'Cafetería',
      rating: 4.7,
      phone: '+52 739 395 0321',
      address: 'Plaza Principal 8',
      tags: ['Coffee', 'Desserts', 'Local Cacao'],
      openNow: false,
    },
  ],
  shops: [
    {
      id: '5',
      name: 'Artesanías Tepozteco',
      description: 'Authentic local handicrafts, textiles, and spiritual items made by local artisans.',
      category: 'Artesanías',
      rating: 4.6,
      address: 'Mercado Local, Puesto 15',
      tags: ['Handicrafts', 'Textiles', 'Spiritual', 'Local'],
      openNow: true,
    },
  ],
  attractions: [
    {
      id: '6',
      name: 'Pirámide del Tepozteco',
      description: 'Ancient Aztec temple dedicated to Tepoztecatl, offering spectacular valley views.',
      category: 'Sitio Arqueológico',
      rating: 4.9,
      address: 'Cerro del Tepozteco',
      tags: ['Archaeological', 'Hiking', 'Views', 'History'],
      openNow: true,
    },
  ],
  services: [
    {
      id: '7',
      name: 'Temazcal Ancestral',
      description: 'Traditional sweat lodge ceremonies for spiritual cleansing and healing.',
      category: 'Wellness',
      rating: 4.8,
      phone: '+52 739 395 0654',
      address: 'Barrio de la Santísima',
      tags: ['Temazcal', 'Spiritual', 'Healing', 'Traditional'],
      openNow: true,
    },
  ],
}

export default function DemoPage() {
  const [currentLang, setCurrentLang] = useState<'es' | 'en'>('es')
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleBusinessSelect = (business: Business) => {
    toast.success(
      currentLang === 'es' 
        ? `Seleccionaste: ${business.name}`
        : `Selected: ${business.name}`,
      {
        description: business.description,
        action: {
          label: currentLang === 'es' ? 'Ver detalles' : 'View details',
          onClick: () => console.log('Navigate to business details'),
        },
      }
    )
  }

  const handleSearch = () => {
    if (!searchTerm.trim()) return
    
    setIsLoading(true)
    toast.info(
      currentLang === 'es' 
        ? `Buscando: "${searchTerm}"`
        : `Searching: "${searchTerm}"`
    )
    
    // Simulate search
    setTimeout(() => {
      setIsLoading(false)
      toast.success(
        currentLang === 'es' 
          ? 'Búsqueda completada'
          : 'Search completed'
      )
    }, 2000)
  }

  const titles = {
    es: {
      main: 'Directorio Turístico de Tepoztlán',
      subtitle: 'Descubre la magia de este pueblo místico',
      search: 'Buscar negocios...',
      searchButton: 'Buscar',
      filter: 'Filtros',
      demo: '🎨 Página de Demostración'
    },
    en: {
      main: 'Tepoztlán Tourism Directory',
      subtitle: 'Discover the magic of this mystical town',
      search: 'Search businesses...',
      searchButton: 'Search',
      filter: 'Filters',
      demo: '🎨 Demo Page'
    }
  }

  const t = titles[currentLang]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <MobileNavigation 
                lang={currentLang}
                currentPath="/demo"
              />
              <div>
                <h1 className="text-xl font-bold">{t.main}</h1>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  {t.subtitle}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="hidden md:flex">
                {t.demo}
              </Badge>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="bg-muted/50 border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder={t.search}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button 
                onClick={handleSearch}
                disabled={isLoading}
              >
                <Search className="h-4 w-4 mr-2" />
                {t.searchButton}
              </Button>
              <Button variant="outline">
                <Filter className="h-4 w-4" />
                <span className="sr-only">{t.filter}</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <CategoryTabs
          lang={currentLang}
          businesses={sampleBusinesses}
          isLoading={isLoading}
          onBusinessSelect={handleBusinessSelect}
        />
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Tepoztlán Directory - {t.subtitle}</p>
            <p className="mt-1">
              {currentLang === 'es' 
                ? 'Creado con shadcn/ui y Next.js 15.5'
                : 'Built with shadcn/ui and Next.js 15.5'
              }
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}