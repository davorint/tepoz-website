'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BusinessCard, type Business } from "./business-card"
import { Coffee, Bed, ShoppingBag, Camera, Utensils, MapPin } from "lucide-react"

interface CategoryTabsProps {
  lang: 'es' | 'en'
  businesses: Record<string, Business[]>
  isLoading?: boolean
  onBusinessSelect?: (business: Business) => void
}

const categories = {
  es: [
    { id: 'restaurants', label: 'Restaurantes', icon: <Utensils className="h-4 w-4" /> },
    { id: 'hotels', label: 'Hoteles', icon: <Bed className="h-4 w-4" /> },
    { id: 'cafes', label: 'Cafés', icon: <Coffee className="h-4 w-4" /> },
    { id: 'shops', label: 'Tiendas', icon: <ShoppingBag className="h-4 w-4" /> },
    { id: 'attractions', label: 'Atracciones', icon: <Camera className="h-4 w-4" /> },
    { id: 'services', label: 'Servicios', icon: <MapPin className="h-4 w-4" /> },
  ],
  en: [
    { id: 'restaurants', label: 'Restaurants', icon: <Utensils className="h-4 w-4" /> },
    { id: 'hotels', label: 'Hotels', icon: <Bed className="h-4 w-4" /> },
    { id: 'cafes', label: 'Cafés', icon: <Coffee className="h-4 w-4" /> },
    { id: 'shops', label: 'Shops', icon: <ShoppingBag className="h-4 w-4" /> },
    { id: 'attractions', label: 'Attractions', icon: <Camera className="h-4 w-4" /> },
    { id: 'services', label: 'Services', icon: <MapPin className="h-4 w-4" /> },
  ]
}

const emptyStateMessages = {
  es: {
    title: 'No hay resultados',
    description: 'No se encontraron negocios en esta categoría.',
  },
  en: {
    title: 'No results found',
    description: 'No businesses found in this category.',
  }
}

export function CategoryTabs({
  lang,
  businesses,
  isLoading = false,
  onBusinessSelect
}: CategoryTabsProps) {
  const categoryList = categories[lang]
  const emptyState = emptyStateMessages[lang]

  const handleBusinessSelect = (businessId: string) => {
    // Find business in all categories
    const business = Object.values(businesses)
      .flat()
      .find(b => b.id === businessId)
    
    if (business && onBusinessSelect) {
      onBusinessSelect(business)
    }
  }

  const renderBusinessGrid = (categoryBusinesses: Business[]) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <BusinessCard
              key={index}
              business={{} as Business}
              isLoading={true}
              lang={lang}
            />
          ))}
        </div>
      )
    }

    if (!categoryBusinesses || categoryBusinesses.length === 0) {
      return (
        <div className="text-center py-8">
          <h3 className="text-lg font-semibold text-muted-foreground">
            {emptyState.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {emptyState.description}
          </p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categoryBusinesses.map((business) => (
          <BusinessCard
            key={business.id}
            business={business}
            lang={lang}
            onViewDetails={handleBusinessSelect}
            onCall={(phone) => window.open(`tel:${phone}`)}
          />
        ))}
      </div>
    )
  }

  return (
    <Tabs defaultValue="restaurants" className="w-full">
      <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6">
        {categoryList.map((category) => {
          const count = businesses[category.id]?.length || 0
          return (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="flex items-center gap-2"
            >
              {category.icon}
              <span className="hidden sm:inline">{category.label}</span>
              <Badge variant="secondary" className="ml-1">
                {count}
              </Badge>
            </TabsTrigger>
          )
        })}
      </TabsList>

      {categoryList.map((category) => (
        <TabsContent key={category.id} value={category.id} className="mt-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {category.icon}
              {category.label}
              <Badge variant="outline">
                {businesses[category.id]?.length || 0} 
                {lang === 'es' ? ' resultados' : ' results'}
              </Badge>
            </h2>
          </div>
          {renderBusinessGrid(businesses[category.id] || [])}
        </TabsContent>
      ))}
    </Tabs>
  )
}