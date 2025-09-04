import Image from 'next/image'
import { Locale } from '@/lib/i18n'
import { Restaurant, RestaurantService } from '@/lib/restaurants'
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
  Music,
  Wine
} from 'lucide-react'

interface RestaurantCardProps {
  restaurant: Restaurant
  locale: Locale
  viewMode?: 'grid' | 'list'
  animationDelay?: number
}

export default function RestaurantCard({ 
  restaurant, 
  locale, 
  viewMode = 'grid', 
  animationDelay = 0 
}: RestaurantCardProps) {
  return (
    <div 
      className="group relative animate-fade-in-up"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Card glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 rounded-3xl" />
      
      {/* Glassmorphism card */}
      <Card className={`relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl hover:shadow-3xl overflow-hidden transform-gpu transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/15 ${
        viewMode === 'list' ? 'flex' : ''
      }`}>
        {/* Featured Badge */}
        {restaurant.featured && (
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 font-semibold shadow-xl">
              ⭐ {locale === 'es' ? 'Destacado' : 'Featured'}
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

        {/* Restaurant Image */}
        <div className={`relative overflow-hidden ${
          viewMode === 'list' ? 'w-80 h-48' : 'h-64'
        }`}>
          <Image
            src={restaurant.images[0]}
            alt={RestaurantService.getRestaurantName(restaurant, locale)}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Premium accent gradient bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-400 opacity-80 group-hover:h-2 transition-all duration-500" />
          
          {/* Price Range Badge */}
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-black/50 backdrop-blur-sm text-white border-0">
              {restaurant.priceRange}
            </Badge>
          </div>

          {/* Quick Info for List View */}
          {viewMode === 'list' && (
            <div className="absolute bottom-4 right-4 flex gap-2">
              {restaurant.wifi && <Wifi className="w-4 h-4 text-white drop-shadow-lg" />}
              {restaurant.parking && <Car className="w-4 h-4 text-white drop-shadow-lg" />}
              {restaurant.delivery && <Navigation className="w-4 h-4 text-white drop-shadow-lg" />}
            </div>
          )}
        </div>

        <CardContent className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-orange-300 group-hover:to-red-300 transition-all">
              {RestaurantService.getRestaurantName(restaurant, locale)}
            </h3>
            
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-white text-sm font-bold">{restaurant.rating}</span>
                <span className="ml-1 text-white/70 text-xs">({restaurant.reviewCount})</span>
              </div>
              
              <Badge className="bg-orange-400/20 text-orange-300 border border-orange-400/30">
                {RestaurantService.getRestaurantCuisine(restaurant, locale)}
              </Badge>

              {/* Atmosphere Badge */}
              <Badge variant="outline" className="text-xs border-white/30 text-white/70 capitalize">
                {restaurant.atmosphere}
              </Badge>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/70 text-sm mb-4 line-clamp-2">
            {RestaurantService.getRestaurantDescription(restaurant, locale)}
          </p>

          {/* Specialties */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {RestaurantService.getRestaurantSpecialties(restaurant, locale).slice(0, viewMode === 'list' ? 3 : 2).map((specialty, idx) => (
                <Badge key={idx} variant="outline" className="text-xs border-white/30 text-white/80">
                  {specialty}
                </Badge>
              ))}
              {RestaurantService.getRestaurantSpecialties(restaurant, locale).length > (viewMode === 'list' ? 3 : 2) && (
                <Badge variant="outline" className="text-xs border-white/30 text-white/60">
                  +{RestaurantService.getRestaurantSpecialties(restaurant, locale).length - (viewMode === 'list' ? 3 : 2)}
                </Badge>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex items-center text-white/70">
              <MapPin className="w-4 h-4 mr-2 text-orange-400" />
              <span className="line-clamp-1">{RestaurantService.getRestaurantAddress(restaurant, locale)}</span>
            </div>
            <div className="flex items-center text-white/70">
              <Clock className="w-4 h-4 mr-2 text-orange-400" />
              {RestaurantService.getRestaurantHours(restaurant, locale)}
            </div>
          </div>

          {/* Dietary Options */}
          {restaurant.dietary.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {restaurant.dietary.slice(0, 3).map((diet) => {
                const dietaryMap = {
                  vegetarian: { emoji: '🌱', es: 'Vegetariano', en: 'Vegetarian' },
                  vegan: { emoji: '🌿', es: 'Vegano', en: 'Vegan' },
                  'gluten-free': { emoji: '🌾', es: 'Sin Gluten', en: 'Gluten Free' },
                  organic: { emoji: '🍃', es: 'Orgánico', en: 'Organic' }
                }
                const dietInfo = dietaryMap[diet as keyof typeof dietaryMap]
                return (
                  <Badge key={diet} className="bg-green-400/20 text-green-300 border border-green-400/30 text-xs">
                    {dietInfo.emoji} {locale === 'es' ? dietInfo.es : dietInfo.en}
                  </Badge>
                )
              })}
            </div>
          )}

          {/* Amenities Icons - Grid View Only */}
          {viewMode === 'grid' && (
            <div className="flex items-center gap-2 mb-4">
              {restaurant.wifi && <Wifi className="w-4 h-4 text-white/50" />}
              {restaurant.parking && <Car className="w-4 h-4 text-white/50" />}
              {restaurant.acceptsCards && <CreditCard className="w-4 h-4 text-white/50" />}
              {restaurant.delivery && <Navigation className="w-4 h-4 text-white/50" />}
              {restaurant.liveMusic && <Music className="w-4 h-4 text-white/50" />}
              {restaurant.alcoholic && <Wine className="w-4 h-4 text-white/50" />}
            </div>
          )}

          {/* Actions */}
          <div className={`flex gap-3 ${viewMode === 'list' ? 'mt-auto' : ''}`}>
            <Button className="flex-1 bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white border-0 shadow-xl">
              {locale === 'es' ? 'Ver Detalles' : 'View Details'}
            </Button>
            {restaurant.phone && (
              <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-0 aspect-square p-0">
                <Phone className="w-4 h-4" />
              </Button>
            )}
            {restaurant.website && (
              <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-0 aspect-square p-0">
                <Globe className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}