import Image from 'next/image'
import { Locale } from '@/lib/i18n'
import { Cafe, CafeService } from '@/lib/cafes'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  MapPin, 
  Star, 
  Phone,
  Clock,
  Globe,
  Heart,
  Navigation,
  Car,
  Wifi,
  CreditCard,
  Coffee,
  Truck,
  TreePine,
  Dog,
  BookOpen,
  Flame
} from 'lucide-react'

interface CafeCardProps {
  cafe: Cafe
  locale: Locale
  viewMode?: 'grid' | 'list'
  animationDelay?: number
}

export default function CafeCard({ 
  cafe, 
  locale, 
  viewMode = 'grid', 
  animationDelay = 0 
}: CafeCardProps) {
  const name = CafeService.getCafeName(cafe, locale)
  const description = CafeService.getCafeDescription(cafe, locale)
  const cafeType = CafeService.getCafeType(cafe, locale)
  const address = CafeService.getCafeAddress(cafe, locale)
  const hours = CafeService.getCafeHours(cafe, locale)
  const specialties = CafeService.getCafeSpecialties(cafe, locale)

  return (
    <div 
      className="group relative animate-fade-in-up"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Card glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 rounded-3xl" />
      
      {/* Glassmorphism card */}
      <Card className={`relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl hover:shadow-3xl overflow-hidden transform-gpu transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/15 ${
        viewMode === 'list' ? 'flex' : ''
      }`}>
        {/* Featured Badge */}
        {cafe.featured && (
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-gradient-to-r from-yellow-400 to-amber-400 text-black px-3 py-1 font-semibold shadow-xl">
              ☕ {locale === 'es' ? 'Destacado' : 'Featured'}
            </Badge>
          </div>
        )}

        {/* Favorite Button */}
        <div className="absolute top-4 right-4 z-10">
          <Button
            size="sm"
            className="h-10 w-10 p-0 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 rounded-full"
          >
            <Heart className="h-4 w-4 text-white" />
          </Button>
        </div>

        {/* Cafe Image */}
        <div className={`relative overflow-hidden ${
          viewMode === 'list' ? 'w-80 h-48' : 'h-64'
        }`}>
          <Image
            src={cafe.images[0]}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Premium accent gradient bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-400 opacity-80 group-hover:h-2 transition-all duration-500" />
          
          {/* Price Range Badge */}
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-black/60 text-white font-mono px-2 py-1">
              {cafe.priceRange}
            </Badge>
          </div>

          {/* Rating Badge */}
          <div className="absolute bottom-4 right-4">
            <Badge className="bg-white/90 text-black font-semibold px-3 py-1 shadow-lg">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
              {cafe.rating}
            </Badge>
          </div>
        </div>

        {/* Card Content */}
        <CardContent className={`p-6 space-y-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
          {/* Header */}
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors duration-300">
                {name}
              </h3>
              {cafe.roastery && (
                <Badge className="bg-orange-500/20 text-orange-300 border-orange-400/30">
                  <Flame className="w-3 h-3 mr-1" />
                  {locale === 'es' ? 'Tostadora' : 'Roastery'}
                </Badge>
              )}
            </div>
            
            <Badge className="bg-amber-400/20 text-amber-300 border-amber-400/30">
              <Coffee className="w-3 h-3 mr-1" />
              {cafeType}
            </Badge>
            
            <p className="text-white/80 text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* Details */}
          <div className="space-y-3">
            {/* Location */}
            <div className="flex items-center text-white/70 text-sm">
              <MapPin className="w-4 h-4 mr-2 text-amber-400 shrink-0" />
              <span className="truncate">{address}</span>
            </div>

            {/* Hours */}
            <div className="flex items-center text-white/70 text-sm">
              <Clock className="w-4 h-4 mr-2 text-amber-400 shrink-0" />
              <span>{hours}</span>
            </div>

            {/* Phone */}
            {cafe.phone && (
              <div className="flex items-center text-white/70 text-sm">
                <Phone className="w-4 h-4 mr-2 text-amber-400 shrink-0" />
                <span>{cafe.phone}</span>
              </div>
            )}

            {/* Website */}
            {cafe.website && (
              <div className="flex items-center text-white/70 text-sm">
                <Globe className="w-4 h-4 mr-2 text-amber-400 shrink-0" />
                <span className="truncate">{cafe.website.replace('https://', '')}</span>
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2">
            {cafe.wifi && (
              <div className="flex items-center bg-white/10 rounded-full px-2 py-1">
                <Wifi className="w-3 h-3 text-blue-400 mr-1" />
                <span className="text-xs text-white/70">WiFi</span>
              </div>
            )}
            {cafe.parking && (
              <div className="flex items-center bg-white/10 rounded-full px-2 py-1">
                <Car className="w-3 h-3 text-green-400 mr-1" />
                <span className="text-xs text-white/70">
                  {locale === 'es' ? 'Estacionamiento' : 'Parking'}
                </span>
              </div>
            )}
            {cafe.outdoorSeating && (
              <div className="flex items-center bg-white/10 rounded-full px-2 py-1">
                <TreePine className="w-3 h-3 text-green-400 mr-1" />
                <span className="text-xs text-white/70">
                  {locale === 'es' ? 'Terraza' : 'Outdoor'}
                </span>
              </div>
            )}
            {cafe.delivery && (
              <div className="flex items-center bg-white/10 rounded-full px-2 py-1">
                <Truck className="w-3 h-3 text-purple-400 mr-1" />
                <span className="text-xs text-white/70">
                  {locale === 'es' ? 'Entrega' : 'Delivery'}
                </span>
              </div>
            )}
            {cafe.acceptsCards && (
              <div className="flex items-center bg-white/10 rounded-full px-2 py-1">
                <CreditCard className="w-3 h-3 text-blue-400 mr-1" />
                <span className="text-xs text-white/70">
                  {locale === 'es' ? 'Tarjetas' : 'Cards'}
                </span>
              </div>
            )}
            {cafe.studyFriendly && (
              <div className="flex items-center bg-white/10 rounded-full px-2 py-1">
                <BookOpen className="w-3 h-3 text-indigo-400 mr-1" />
                <span className="text-xs text-white/70">
                  {locale === 'es' ? 'Estudio' : 'Study'}
                </span>
              </div>
            )}
            {cafe.petFriendly && (
              <div className="flex items-center bg-white/10 rounded-full px-2 py-1">
                <Dog className="w-3 h-3 text-pink-400 mr-1" />
                <span className="text-xs text-white/70">
                  {locale === 'es' ? 'Pet Friendly' : 'Pet Friendly'}
                </span>
              </div>
            )}
          </div>

          {/* Specialties */}
          {specialties.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-amber-300">
                {locale === 'es' ? 'Especialidades' : 'Specialties'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {specialties.slice(0, viewMode === 'list' ? 4 : 3).map((specialty, index) => (
                  <Badge key={index} className="bg-amber-500/10 text-amber-200 border-amber-400/20 text-xs">
                    {specialty}
                  </Badge>
                ))}
                {specialties.length > (viewMode === 'list' ? 4 : 3) && (
                  <Badge className="bg-amber-500/10 text-amber-200 border-amber-400/20 text-xs">
                    +{specialties.length - (viewMode === 'list' ? 4 : 3)}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2 border-t border-white/10">
            <Button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-lg">
              <Navigation className="w-4 h-4 mr-2" />
              {locale === 'es' ? 'Visitar' : 'Visit'}
            </Button>
            <Button 
              variant="outline" 
              className="border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              {locale === 'es' ? 'Detalles' : 'Details'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}