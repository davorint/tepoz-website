'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Star, Phone } from "lucide-react"

export interface Business {
  id: string
  name: string
  description: string
  category: string
  rating: number
  phone?: string
  address: string
  image?: string
  tags: string[]
  openNow: boolean
}

interface BusinessCardProps {
  business: Business
  isLoading?: boolean
  onViewDetails?: (id: string) => void
  onCall?: (phone: string) => void
  lang: 'es' | 'en'
}

const translations = {
  es: {
    viewDetails: 'Ver detalles',
    call: 'Llamar',
    open: 'Abierto',
    closed: 'Cerrado',
    rating: 'Calificación',
    featured: 'Destacado'
  },
  en: {
    viewDetails: 'View Details',
    call: 'Call',
    open: 'Open',
    closed: 'Closed',
    rating: 'Rating',
    featured: 'Featured'
  }
}

export function BusinessCard({ 
  business, 
  isLoading = false, 
  onViewDetails,
  onCall,
  lang = 'es'
}: BusinessCardProps) {
  const t = translations[lang]

  if (isLoading) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-24 w-full mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-8 w-full" />
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{business.name}</CardTitle>
          <Badge variant={business.openNow ? "default" : "secondary"}>
            {business.openNow ? t.open : t.closed}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {business.address}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {business.description}
        </p>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{business.rating}</span>
            <span className="text-xs text-muted-foreground">({t.rating})</span>
          </div>
          <Badge variant="outline">{business.category}</Badge>
        </div>

        {business.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {business.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {business.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{business.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button 
          variant="default" 
          className="flex-1"
          onClick={() => onViewDetails?.(business.id)}
        >
          {t.viewDetails}
        </Button>
        {business.phone && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => onCall?.(business.phone!)}
          >
            <Phone className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}