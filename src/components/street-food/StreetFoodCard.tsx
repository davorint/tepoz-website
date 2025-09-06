import Image from 'next/image'
import { Locale } from '@/lib/i18n'
import { StreetFood, StreetFoodService } from '@/lib/street-food'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  MapPin, 
  Star, 
  Phone,
  Clock,
  Heart,
  Banknote,
  Flame,
  ShoppingCart
} from 'lucide-react'

interface StreetFoodCardProps {
  streetFood: StreetFood
  locale: Locale
  viewMode?: 'grid' | 'list'
  animationDelay?: number
}

export default function StreetFoodCard({ 
  streetFood, 
  locale, 
  viewMode = 'grid', 
  animationDelay = 0 
}: StreetFoodCardProps) {
  return (
    <div 
      className="group relative animate-fade-in-up"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Card glow effect - Street Food Theme */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-yellow-400 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 rounded-3xl" />
      
      {/* Glassmorphism card */}
      <Card className={`relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl hover:shadow-3xl overflow-hidden transform-gpu transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/15 ${
        viewMode === 'list' ? 'flex' : ''
      }`}>
        {/* Featured Badge */}
        {streetFood.featured && (
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-gradient-to-r from-yellow-400 to-green-400 text-black px-3 py-1 font-semibold shadow-xl">
              ⭐ {locale === 'es' ? 'Destacado' : 'Featured'}
            </Badge>
          </div>
        )}

        {/* Local Favorite Badge */}
        {streetFood.localFavorite && (
          <div className="absolute top-4 left-4 z-10" style={{ top: streetFood.featured ? '3.5rem' : '1rem' }}>
            <Badge className="bg-gradient-to-r from-lime-400 to-green-500 text-black px-3 py-1 font-semibold shadow-xl">
              🏆 {locale === 'es' ? 'Favorito Local' : 'Local Favorite'}
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

        {/* Street Food Image */}
        <div className={`relative overflow-hidden ${
          viewMode === 'list' ? 'w-80 h-48' : 'h-64'
        }`}>
          <Image
            src={streetFood.images[0]}
            alt={StreetFoodService.getStreetFoodName(streetFood, locale)}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Premium accent gradient bar - Street Food Colors */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-yellow-400 opacity-80 group-hover:h-2 transition-all duration-500" />
          
          {/* Price Range Badge */}
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-black/50 backdrop-blur-sm text-white border-0">
              {streetFood.priceRange}
            </Badge>
          </div>

          {/* Spicy Level */}
          {streetFood.spicyLevel > 1 && (
            <div className="absolute bottom-4 right-4 flex items-center">
              <Badge className="bg-red-500/80 backdrop-blur-sm text-white border-0 flex items-center gap-1">
                <Flame className="w-3 h-3" />
                {streetFood.spicyLevel}/5
              </Badge>
            </div>
          )}

          {/* Cash Only for List View */}
          {viewMode === 'list' && streetFood.cashOnly && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-yellow-500/80 backdrop-blur-sm text-black border-0 flex items-center gap-1">
                <Banknote className="w-3 h-3" />
                {locale === 'es' ? 'Solo Efectivo' : 'Cash Only'}
              </Badge>
            </div>
          )}
        </div>

        <CardContent className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-green-300 group-hover:to-yellow-300 transition-all">
              {StreetFoodService.getStreetFoodName(streetFood, locale)}
            </h3>
            
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-white text-sm font-bold">{streetFood.rating}</span>
                <span className="ml-1 text-white/70 text-xs">({streetFood.reviewCount})</span>
              </div>
              
              <Badge className="bg-green-400/20 text-green-300 border border-green-400/30">
                {StreetFoodService.getStreetFoodType(streetFood, locale)}
              </Badge>

              {/* Venue Type Badge */}
              <Badge variant="outline" className="text-xs border-white/30 text-white/70 capitalize">
                {streetFood.venueType.replace('-', ' ')}
              </Badge>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/70 text-sm mb-4 line-clamp-2">
            {StreetFoodService.getStreetFoodDescription(streetFood, locale)}
          </p>

          {/* Specialties */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {StreetFoodService.getStreetFoodSpecialties(streetFood, locale).slice(0, viewMode === 'list' ? 3 : 2).map((specialty, idx) => (
                <Badge key={idx} variant="outline" className="text-xs border-white/30 text-white/80">
                  {specialty}
                </Badge>
              ))}
              {StreetFoodService.getStreetFoodSpecialties(streetFood, locale).length > (viewMode === 'list' ? 3 : 2) && (
                <Badge variant="outline" className="text-xs border-white/30 text-white/60">
                  +{StreetFoodService.getStreetFoodSpecialties(streetFood, locale).length - (viewMode === 'list' ? 3 : 2)}
                </Badge>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex items-center text-white/70">
              <MapPin className="w-4 h-4 mr-2 text-green-400" />
              <span className="line-clamp-1">{StreetFoodService.getStreetFoodLocation(streetFood, locale)}</span>
            </div>
            <div className="flex items-center text-white/70">
              <Clock className="w-4 h-4 mr-2 text-green-400" />
              {StreetFoodService.getStreetFoodHours(streetFood, locale)}
            </div>
          </div>

          {/* Dietary Options */}
          {streetFood.dietary.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {streetFood.dietary.slice(0, 3).map((diet) => {
                const dietaryMap = {
                  vegetarian: { emoji: '🌱', es: 'Vegetariano', en: 'Vegetarian' },
                  vegan: { emoji: '🌿', es: 'Vegano', en: 'Vegan' },
                  'gluten-free': { emoji: '🌾', es: 'Sin Gluten', en: 'Gluten Free' },
                  spicy: { emoji: '🌶️', es: 'Picante', en: 'Spicy' }
                }
                const dietInfo = dietaryMap[diet as keyof typeof dietaryMap]
                return (
                  <Badge key={diet} className="bg-lime-400/20 text-lime-300 border border-lime-400/30 text-xs">
                    {dietInfo.emoji} {locale === 'es' ? dietInfo.es : dietInfo.en}
                  </Badge>
                )
              })}
            </div>
          )}

          {/* Features - Grid View Only */}
          {viewMode === 'grid' && (
            <div className="flex items-center gap-2 mb-4">
              {streetFood.cashOnly && <Banknote className="w-4 h-4 text-white/50" />}
              {streetFood.verified && <Badge className="bg-blue-400/20 text-blue-300 border border-blue-400/30 text-xs">✓ Verified</Badge>}
            </div>
          )}

          {/* Actions */}
          <div className={`flex gap-3 ${viewMode === 'list' ? 'mt-auto' : ''}`}>
            <Button className="flex-1 bg-gradient-to-r from-green-400 to-yellow-400 hover:from-green-500 hover:to-yellow-500 text-black border-0 shadow-xl font-semibold">
              {locale === 'es' ? 'Ver Detalles' : 'View Details'}
            </Button>
            {streetFood.phone && (
              <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-0 aspect-square p-0">
                <Phone className="w-4 h-4" />
              </Button>
            )}
            <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-0 aspect-square p-0">
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}