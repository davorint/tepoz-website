'use client'

import { EcoLodge, EcoLodgeService } from '@/lib/eco-lodges'
import { Locale } from '@/lib/i18n'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Star, 
  MapPin, 
  Leaf, 
  TreePine, 
  Heart,
  Share2,
  Users,
  Recycle,
  Sun,
  Droplets,
  Sprout,
  ChevronRight
} from 'lucide-react'
import Image from 'next/image'

interface EcoLodgeCardProps {
  lodge: EcoLodge
  locale: Locale
  viewMode?: 'grid' | 'list'
}

const amenityIcons: Record<string, React.ReactNode> = {
  'solar-power': <Sun className="w-4 h-4" />,
  'organic-food': <Sprout className="w-4 h-4" />,
  'water-conservation': <Droplets className="w-4 h-4" />,
  'local-materials': <TreePine className="w-4 h-4" />,
  'composting': <Recycle className="w-4 h-4" />,
  'garden': <Leaf className="w-4 h-4" />,
  'wildlife': <TreePine className="w-4 h-4" />,
  'hiking': <Users className="w-4 h-4" />
}

const categoryGradients: Record<string, string> = {
  'eco-resort': 'from-emerald-400 to-green-400',
  'treehouse': 'from-green-400 to-lime-400',
  'glamping': 'from-teal-400 to-cyan-400',
  'sustainable-hotel': 'from-green-500 to-emerald-500',
  'nature-retreat': 'from-lime-400 to-green-400',
  'organic-farm': 'from-yellow-400 to-green-400'
}

export default function EcoLodgeCard({ lodge, locale, viewMode = 'grid' }: EcoLodgeCardProps) {
  const name = EcoLodgeService.getEcoLodgeName(lodge, locale)
  const description = EcoLodgeService.getEcoLodgeDescription(lodge, locale)

  if (viewMode === 'list') {
    return (
      <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden group">
        <CardContent className="p-6">
          <div className="flex gap-6">
            {/* Image */}
            <div className="relative w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
              <Image
                src={lodge.images[0]}
                alt={name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {lodge.featured && (
                <Badge className="absolute top-2 left-2 z-20 bg-gradient-to-r from-green-400 to-emerald-400 text-white border-0">
                  ⭐ {locale === 'es' ? 'Destacado' : 'Featured'}
                </Badge>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-green-400 transition-colors">
                    {name}
                  </h3>
                  <p className="text-white/60 text-sm line-clamp-1">
                    {description}
                  </p>
                </div>
                <Badge className={`bg-gradient-to-r ${categoryGradients[lodge.category]} text-white border-0`}>
                  {lodge.category}
                </Badge>
              </div>

              {/* Details */}
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white font-medium">{lodge.rating}</span>
                  <span className="text-white/50 text-sm">({lodge.reviews})</span>
                </div>
                <Badge className="bg-white/10 text-white/70 border-white/20">
                  {lodge.priceRange}
                </Badge>
                <div className="flex items-center gap-1 text-white/60">
                  <MapPin className="w-3 h-3" />
                  <span className="text-sm">{lodge.location.neighborhood}</span>
                </div>
                {lodge.sustainability && (
                  <Badge className="bg-green-400/20 text-green-400 border-green-400/30">
                    <Leaf className="w-3 h-3 mr-1" />
                    Eco
                  </Badge>
                )}
              </div>

              {/* Amenities */}
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  {lodge.amenities.slice(0, 5).map((amenity) => (
                    <div key={amenity} className="text-green-400/70">
                      {amenityIcons[amenity]}
                    </div>
                  ))}
                  {lodge.amenities.length > 5 && (
                    <span className="text-white/50 text-sm">+{lodge.amenities.length - 5}</span>
                  )}
                </div>
                <div className="ml-auto flex gap-2">
                  <Button size="sm" className="bg-gradient-to-r from-green-400 to-emerald-400 text-white">
                    {locale === 'es' ? 'Ver Detalles' : 'View Details'}
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Grid View
  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden group h-full">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
        <Image
          src={lodge.images[0]}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {lodge.featured && (
          <Badge className="absolute top-3 left-3 z-20 bg-gradient-to-r from-green-400 to-emerald-400 text-white border-0 shadow-xl">
            ⭐ {locale === 'es' ? 'Destacado' : 'Featured'}
          </Badge>
        )}
        <Badge className={`absolute top-3 right-3 z-20 bg-gradient-to-r ${categoryGradients[lodge.category]} text-white border-0 shadow-xl`}>
          {lodge.category}
        </Badge>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Title & Rating */}
        <div>
          <h3 className="font-bold text-white text-lg mb-1 group-hover:text-green-400 transition-colors">
            {name}
          </h3>
          <p className="text-white/60 text-sm line-clamp-2">
            {description}
          </p>
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-white font-medium">{lodge.rating}</span>
            </div>
            <span className="text-white/50 text-sm">({lodge.reviews} {locale === 'es' ? 'reseñas' : 'reviews'})</span>
          </div>
          <Badge className="bg-white/10 text-white/70 border-white/20">
            {lodge.priceRange}
          </Badge>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-white/60">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{lodge.location.neighborhood}</span>
        </div>

        {/* Eco Amenities */}
        <div className="flex flex-wrap gap-2">
          {lodge.amenities.slice(0, 4).map((amenity) => (
            <div key={amenity} className="flex items-center gap-1 bg-green-400/10 rounded-full px-2 py-1">
              <span className="text-green-400/70 text-xs">
                {amenityIcons[amenity]}
              </span>
            </div>
          ))}
          {lodge.amenities.length > 4 && (
            <Badge className="bg-green-400/10 text-green-400/70 border-0 text-xs">
              +{lodge.amenities.length - 4}
            </Badge>
          )}
        </div>

        {/* Eco Features */}
        <div className="flex gap-2">
          {lodge.sustainability && (
            <Badge className="bg-green-400/20 text-green-400 border-green-400/30">
              <Leaf className="w-3 h-3 mr-1" />
              Eco
            </Badge>
          )}
          {lodge.solarPower && (
            <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
              <Sun className="w-3 h-3 mr-1" />
              Solar
            </Badge>
          )}
          {lodge.organicFood && (
            <Badge className="bg-emerald-400/20 text-emerald-400 border-emerald-400/30">
              <Sprout className="w-3 h-3 mr-1" />
              Organic
            </Badge>
          )}
        </div>

        {/* Price */}
        <div className="border-t border-white/10 pt-4">
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-white/50 text-xs">
                {locale === 'es' ? 'Desde' : 'From'}
              </p>
              <p className="text-white text-2xl font-bold">
                ${lodge.roomTypes[0]?.price || 'N/A'}
                <span className="text-sm font-normal text-white/50">
                  /{locale === 'es' ? 'noche' : 'night'}
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                <Heart className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button className="w-full bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white">
            {locale === 'es' ? 'Ver Disponibilidad' : 'Check Availability'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}