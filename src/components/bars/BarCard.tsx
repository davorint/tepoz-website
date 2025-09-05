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
  Beer,
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
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 rounded-3xl" />
      
      {/* Glassmorphism card */}
      <Card className={`relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl hover:shadow-3xl overflow-hidden transform-gpu transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/15 ${
        viewMode === 'list' ? 'flex' : ''
      }`}>
        {/* Featured Badge */}
        {bar.featured && (
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 font-semibold shadow-xl">
              {locale === 'es' ? 'Destacado' : 'Featured'}
            </Badge>
          </div>
        )}

        {/* Favorite Button */}
        <button className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all duration-300 group/fav">
          <Heart className="w-5 h-5 text-white group-hover/fav:text-red-400 transition-colors" />
        </button>

        {/* Image Section */}
        <div className={`relative ${viewMode === 'list' ? 'w-1/3' : 'h-64'} overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-[1]" />
          <Image
            src={bar.images[0]}
            alt={bar.name[locale]}
            fill
            className="object-cover transform group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Type Badge */}
          <div className="absolute bottom-3 left-3 z-[2]">
            <Badge className="bg-purple-600/80 backdrop-blur-sm text-white px-3 py-1">
              {getTypeLabel()}
            </Badge>
          </div>

          {/* Price Badge */}
          <div className="absolute bottom-3 right-3 z-[2]">
            <Badge className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 font-bold">
              {bar.priceRange}
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
          {/* Title and Rating */}
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
              {bar.name[locale]}
            </h3>
            <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg backdrop-blur-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-white font-semibold">{bar.rating}</span>
              <span className="text-white/60 text-sm">({bar.reviewCount})</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/80 text-sm mb-4 line-clamp-2">
            {bar.description[locale]}
          </p>

          {/* Atmosphere and Drinks */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="bg-white/10 text-white/90 backdrop-blur-sm">
              {getAtmosphereLabel()}
            </Badge>
            {bar.drinks.slice(0, 2).map((drink) => (
              <Badge key={drink} variant="secondary" className="bg-white/10 text-white/90 backdrop-blur-sm">
                <Beer className="w-3 h-3 mr-1" />
                {drink}
              </Badge>
            ))}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="flex items-center gap-2 text-white/70">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span className="truncate">{bar.address[locale]}</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="truncate">{bar.hours[locale]}</span>
            </div>
          </div>

          {/* Happy Hour */}
          {bar.happyHour && (
            <div className="mb-4 p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-2 text-white/90">
                <Timer className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium">
                  Happy Hour: {bar.happyHour[locale]}
                </span>
              </div>
            </div>
          )}

          {/* Amenities */}
          <div className="flex flex-wrap gap-3 mb-4">
            {bar.liveMusic && (
              <div className="flex items-center gap-1">
                <Music className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-white/70">
                  {locale === 'es' ? 'Música en Vivo' : 'Live Music'}
                </span>
              </div>
            )}
            {bar.outdoorSeating && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-white/70">
                  {locale === 'es' ? 'Terraza' : 'Outdoor'}
                </span>
              </div>
            )}
            {bar.parking && (
              <div className="flex items-center gap-1">
                <Car className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-white/70">
                  {locale === 'es' ? 'Estacionamiento' : 'Parking'}
                </span>
              </div>
            )}
            {bar.wifi && (
              <div className="flex items-center gap-1">
                <Wifi className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-white/70">WiFi</span>
              </div>
            )}
            {bar.acceptsCards && (
              <div className="flex items-center gap-1">
                <CreditCard className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-white/70">
                  {locale === 'es' ? 'Tarjetas' : 'Cards'}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              variant="default" 
              size="sm"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {locale === 'es' ? 'Ver Detalles' : 'View Details'}
            </Button>
            {bar.phone && (
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm"
              >
                <Phone className="w-4 h-4" />
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm"
            >
              <Navigation className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}