import Image from 'next/image'
import { Locale } from '@/lib/i18n'
import { Bar } from '@/lib/bars'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  MapPin, 
  Star, 
  Phone,
  Clock,
  Heart,
  Navigation,
  Car,
  Wifi,
  CreditCard,
  Music,
  Users,
  Timer
} from 'lucide-react'

interface BarCardProps {
  bar: Bar
  locale: Locale
  viewMode?: 'grid' | 'list'
  animationDelay?: number
}

export default function BarCard({ 
  bar, 
  locale, 
  viewMode = 'grid', 
  animationDelay = 0 
}: BarCardProps) {
  const getTypeLabel = () => {
    const typeLabels = {
      'bar': { es: 'Bar', en: 'Bar' },
      'pulqueria': { es: 'Pulquería', en: 'Pulqueria' },
      'cantina': { es: 'Cantina', en: 'Cantina' },
      'mezcaleria': { es: 'Mezcalería', en: 'Mezcal Bar' },
      'cocktail-bar': { es: 'Bar de Cócteles', en: 'Cocktail Bar' },
      'sports-bar': { es: 'Bar Deportivo', en: 'Sports Bar' }
    }
    return typeLabels[bar.type][locale]
  }

  const getAtmosphereLabel = () => {
    const atmosphereLabels = {
      'casual': { es: 'Casual', en: 'Casual' },
      'upscale': { es: 'Elegante', en: 'Upscale' },
      'traditional': { es: 'Tradicional', en: 'Traditional' },
      'modern': { es: 'Moderno', en: 'Modern' },
      'rustic': { es: 'Rústico', en: 'Rustic' },
      'party': { es: 'Fiesta', en: 'Party' }
    }
    return atmosphereLabels[bar.atmosphere][locale]
  }

  return (
    <div 
      className="group relative animate-fade-in-up"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Card glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 rounded-3xl" />
      
      {/* Glassmorphism card */}
      <Card className={`relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl hover:shadow-3xl overflow-hidden transform-gpu transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/15 ${
        viewMode === 'list' ? 'flex' : ''
      }`}>
        {/* Featured Badge */}
        {bar.featured && (
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

        {/* Bar Image */}
        <div className={`relative overflow-hidden ${
          viewMode === 'list' ? 'w-80 h-48' : 'h-64'
        }`}>
          <Image
            src={bar.images[0]}
            alt={bar.name[locale]}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Premium accent gradient bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-cyan-400 opacity-80 group-hover:h-2 transition-all duration-500" />
          
          {/* Price Range Badge */}
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-black/50 backdrop-blur-sm text-white border-0">
              {bar.priceRange}
            </Badge>
          </div>

          {/* Quick Info for List View */}
          {viewMode === 'list' && (
            <div className="absolute bottom-4 right-4 flex gap-2">
              {bar.wifi && <Wifi className="w-4 h-4 text-white drop-shadow-lg" />}
              {bar.parking && <Car className="w-4 h-4 text-white drop-shadow-lg" />}
              {bar.liveMusic && <Music className="w-4 h-4 text-white drop-shadow-lg" />}
            </div>
          )}
        </div>

        <CardContent className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-teal-300 group-hover:to-cyan-300 transition-all">
              {bar.name[locale]}
            </h3>
            
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-white text-sm font-bold">{bar.rating}</span>
                <span className="ml-1 text-white/70 text-xs">({bar.reviewCount})</span>
              </div>
              
              <Badge className="bg-teal-400/20 text-teal-300 border border-teal-400/30">
                {getTypeLabel()}
              </Badge>

              {/* Atmosphere Badge */}
              <Badge variant="outline" className="text-xs border-white/30 text-white/70 capitalize">
                {getAtmosphereLabel()}
              </Badge>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/70 text-sm mb-4 line-clamp-2">
            {bar.description[locale]}
          </p>

          {/* Specialties */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {bar.specialties[locale].slice(0, viewMode === 'list' ? 3 : 2).map((specialty, idx) => (
                <Badge key={idx} variant="outline" className="text-xs border-white/30 text-white/80">
                  {specialty}
                </Badge>
              ))}
              {bar.specialties[locale].length > (viewMode === 'list' ? 3 : 2) && (
                <Badge variant="outline" className="text-xs border-white/30 text-white/60">
                  +{bar.specialties[locale].length - (viewMode === 'list' ? 3 : 2)}
                </Badge>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex items-center text-white/70">
              <MapPin className="w-4 h-4 mr-2 text-teal-400" />
              <span className="line-clamp-1">{bar.address[locale]}</span>
            </div>
            <div className="flex items-center text-white/70">
              <Clock className="w-4 h-4 mr-2 text-teal-400" />
              {bar.hours[locale]}
            </div>
          </div>

          {/* Happy Hour */}
          {bar.happyHour && (
            <div className="mb-4 p-3 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-lg border border-teal-400/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-white/90">
                <Timer className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium">
                  Happy Hour: {bar.happyHour[locale]}
                </span>
              </div>
            </div>
          )}

          {/* Drinks */}
          {bar.drinks.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {bar.drinks.slice(0, 3).map((drink) => {
                const drinkMap = {
                  'beer': { emoji: '🍺', es: 'Cerveza', en: 'Beer' },
                  'wine': { emoji: '🍷', es: 'Vino', en: 'Wine' },
                  'cocktails': { emoji: '🍸', es: 'Cócteles', en: 'Cocktails' },
                  'pulque': { emoji: '🥛', es: 'Pulque', en: 'Pulque' },
                  'mezcal': { emoji: '🥃', es: 'Mezcal', en: 'Mezcal' },
                  'tequila': { emoji: '🥃', es: 'Tequila', en: 'Tequila' },
                  'craft-beer': { emoji: '🍻', es: 'Cerveza Artesanal', en: 'Craft Beer' },
                  'champagne': { emoji: '🥂', es: 'Champagne', en: 'Champagne' }
                } as const

                const drinkInfo = drinkMap[drink as keyof typeof drinkMap] || { emoji: '🍹', es: drink, en: drink }
                return (
                  <Badge key={drink} variant="outline" className="text-xs border-teal-400/30 text-teal-300 bg-teal-400/10">
                    {drinkInfo.emoji} {locale === 'es' ? drinkInfo.es : drinkInfo.en}
                  </Badge>
                )
              })}
              {bar.drinks.length > 3 && (
                <Badge variant="outline" className="text-xs border-white/30 text-white/60">
                  +{bar.drinks.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Amenities Grid */}
          <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
            {bar.liveMusic && (
              <div className="flex items-center gap-1 text-white/70">
                <Music className="w-3 h-3 text-teal-400" />
                <span>{locale === 'es' ? 'Música' : 'Music'}</span>
              </div>
            )}
            {bar.outdoorSeating && (
              <div className="flex items-center gap-1 text-white/70">
                <Users className="w-3 h-3 text-teal-400" />
                <span>{locale === 'es' ? 'Terraza' : 'Outdoor'}</span>
              </div>
            )}
            {bar.parking && (
              <div className="flex items-center gap-1 text-white/70">
                <Car className="w-3 h-3 text-teal-400" />
                <span>{locale === 'es' ? 'Parking' : 'Parking'}</span>
              </div>
            )}
            {bar.wifi && (
              <div className="flex items-center gap-1 text-white/70">
                <Wifi className="w-3 h-3 text-teal-400" />
                <span>WiFi</span>
              </div>
            )}
            {bar.acceptsCards && (
              <div className="flex items-center gap-1 text-white/70">
                <CreditCard className="w-3 h-3 text-teal-400" />
                <span>{locale === 'es' ? 'Tarjetas' : 'Cards'}</span>
              </div>
            )}
            {bar.danceFloor && (
              <div className="flex items-center gap-1 text-white/70">
                <Music className="w-3 h-3 text-teal-400" />
                <span>{locale === 'es' ? 'Pista' : 'Dance'}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              variant="default" 
              size="sm"
              className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
            >
              {locale === 'es' ? 'Ver Detalles' : 'View Details'}
            </Button>
            {bar.phone && (
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm hover:scale-105 transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm hover:scale-105 transition-all duration-300"
            >
              <Navigation className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}