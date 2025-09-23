'use client'

import { Hotel, HotelServiceStatic } from '@/lib/hotels'
import { Locale } from '@/lib/i18n'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  Star, 
  MapPin, 
  Wifi, 
  Car, 
  Coffee,
  Waves,
  Sparkles,
  Heart,
  Share2,
  Users,
  Dog,
  Leaf,
  ChevronRight,
  Dumbbell,
  Utensils
} from 'lucide-react'
import Image from 'next/image'

interface HotelCardProps {
  hotel: Hotel
  locale: Locale
  viewMode?: 'grid' | 'list'
}

const amenityIcons: Record<string, React.ReactNode> = {
  'pool': <Waves className="w-4 h-4" />,
  'spa': <Sparkles className="w-4 h-4" />,
  'gym': <Dumbbell className="w-4 h-4" />,
  'restaurant': <Utensils className="w-4 h-4" />,
  'bar': <Coffee className="w-4 h-4" />,
  'parking': <Car className="w-4 h-4" />,
  'wifi': <Wifi className="w-4 h-4" />,
  'breakfast': <Coffee className="w-4 h-4" />
}

const categoryGradients: Record<string, string> = {
  'boutique': 'from-amber-400 to-orange-400',
  'resort': 'from-orange-400 to-red-400',
  'eco': 'from-green-400 to-emerald-400',
  'luxury': 'from-amber-500 to-yellow-400',
  'budget': 'from-gray-400 to-slate-400',
  'hostel': 'from-red-400 to-orange-400'
}

export default function HotelCard({ hotel, locale, viewMode = 'grid' }: HotelCardProps) {
  const name = HotelServiceStatic.getHotelName(hotel, locale)
  const description = HotelServiceStatic.getHotelDescription(hotel, locale)

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
                src={hotel.images[0]}
                alt={name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {hotel.featured && (
                <Badge className="absolute top-2 left-2 z-20 bg-gradient-to-r from-amber-400 to-yellow-400 text-white border-0">
                  ⭐ {locale === 'es' ? 'Destacado' : 'Featured'}
                </Badge>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                    {name}
                  </h3>
                  <p className="text-white/60 text-sm line-clamp-1">
                    {description}
                  </p>
                </div>
                <Badge className={`bg-gradient-to-r ${categoryGradients[hotel.category]} text-white border-0`}>
                  {hotel.category}
                </Badge>
              </div>

              {/* Details */}
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white font-medium">{hotel.rating}</span>
                  <span className="text-white/50 text-sm">({hotel.reviews?.length || 0})</span>
                </div>
                <Badge className="bg-white/10 text-white/70 border-white/20">
                  {hotel.priceRange}
                </Badge>
                <div className="flex items-center gap-1 text-white/60">
                  <MapPin className="w-3 h-3" />
                  <span className="text-sm">{HotelServiceStatic.getHotelAddress(hotel, locale)}</span>
                </div>
                {hotel.sustainability && (
                  <Badge className="bg-green-400/20 text-green-400 border-green-400/30">
                    <Leaf className="w-3 h-3 mr-1" />
                    Eco
                  </Badge>
                )}
              </div>

              {/* Amenities */}
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  {hotel.amenities.slice(0, 5).map((amenity) => (
                    <div key={amenity} className="text-white/50">
                      {amenityIcons[amenity]}
                    </div>
                  ))}
                  {hotel.amenities.length > 5 && (
                    <span className="text-white/50 text-sm">+{hotel.amenities.length - 5}</span>
                  )}
                </div>
                <div className="ml-auto flex gap-2">
                  <Link href={`/${locale}/stay/hotels/${HotelServiceStatic.generateSlug(hotel, locale)}`}>
                    <Button size="sm" className="bg-gradient-to-r from-amber-400 to-yellow-400 text-white">
                      {locale === 'es' ? 'Ver Detalles' : 'View Details'}
                    </Button>
                  </Link>
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
          src={hotel.images[0]}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {hotel.featured && (
          <Badge className="absolute top-3 left-3 z-20 bg-gradient-to-r from-amber-400 to-yellow-400 text-white border-0 shadow-xl">
            ⭐ {locale === 'es' ? 'Destacado' : 'Featured'}
          </Badge>
        )}
        <Badge className={`absolute top-3 right-3 z-20 bg-gradient-to-r ${categoryGradients[hotel.category]} text-white border-0 shadow-xl`}>
          {hotel.category}
        </Badge>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Title & Rating */}
        <div>
          <h3 className="font-bold text-white text-lg mb-1 group-hover:text-amber-400 transition-colors">
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
              <span className="text-white font-medium">{hotel.rating}</span>
            </div>
            <span className="text-white/50 text-sm">({hotel.reviews?.length || 0} {locale === 'es' ? 'reseñas' : 'reviews'})</span>
          </div>
          <Badge className="bg-white/10 text-white/70 border-white/20">
            {hotel.priceRange}
          </Badge>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-white/60">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{HotelServiceStatic.getHotelAddress(hotel, locale)}</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2">
          {hotel.amenities.slice(0, 4).map((amenity) => (
            <div key={amenity} className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-1">
              <span className="text-white/70 text-xs">
                {amenityIcons[amenity]}
              </span>
            </div>
          ))}
          {hotel.amenities.length > 4 && (
            <Badge className="bg-white/10 text-white/50 border-0 text-xs">
              +{hotel.amenities.length - 4}
            </Badge>
          )}
        </div>

        {/* Features */}
        <div className="flex gap-2">
          {hotel.sustainability && (
            <Badge className="bg-green-400/20 text-green-400 border-green-400/30">
              <Leaf className="w-3 h-3 mr-1" />
              Eco
            </Badge>
          )}
          {hotel.petFriendly && (
            <Badge className="bg-amber-400/20 text-amber-400 border-amber-400/30">
              <Dog className="w-3 h-3 mr-1" />
              Pet OK
            </Badge>
          )}
          {hotel.adultsOnly && (
            <Badge className="bg-red-400/20 text-red-400 border-red-400/30">
              <Users className="w-3 h-3 mr-1" />
              +18
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
                ${hotel.roomTypes[0]?.price || 'N/A'}
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
          <Link href={`/${locale}/stay/hotels/${HotelServiceStatic.generateSlug(hotel, locale)}`}>
            <Button className="w-full bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-white">
              {locale === 'es' ? 'Ver Disponibilidad' : 'Check Availability'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}