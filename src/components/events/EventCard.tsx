import Image from 'next/image'
import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { Event, EventService } from '@/lib/events'
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
  Calendar,
  Users,
  Globe,
  Timer,
  Ticket
} from 'lucide-react'

interface EventCardProps {
  event: Event
  locale: Locale
  viewMode?: 'grid' | 'list'
  animationDelay?: number
}

export default function EventCard({ 
  event, 
  locale, 
  viewMode = 'grid', 
  animationDelay = 0 
}: EventCardProps) {
  const handlePhoneClick = () => {
    if (event.phone) {
      window.open(`tel:${event.phone}`, '_self')
    }
  }

  const handleWebsiteClick = () => {
    if (event.website) {
      window.open(event.website, '_blank', 'noopener,noreferrer')
    }
  }

  const handleNavigationClick = () => {
    if (event.latitude && event.longitude) {
      const mapsUrl = `https://www.google.com/maps?q=${event.latitude},${event.longitude}`
      window.open(mapsUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const handleHeartClick = () => {
    // TODO: Implement favorite functionality
    console.log('Heart clicked for event:', event.id)
  }

  const getCategoryColor = () => {
    const categoryColors = {
      'festival': 'from-amber-400 to-pink-400',
      'cultural': 'from-blue-400 to-indigo-400',
      'spiritual': 'from-orange-400 to-amber-400',
      'market': 'from-green-400 to-emerald-400',
      'music': 'from-red-400 to-rose-400',
      'art': 'from-violet-400 to-fuchsia-400',
      'food': 'from-yellow-400 to-orange-400',
      'sports': 'from-teal-400 to-cyan-400',
      'workshop': 'from-indigo-400 to-amber-400',
      'ceremony': 'from-amber-400 to-yellow-400'
    }
    return categoryColors[event.category] || 'from-gray-400 to-slate-400'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      day: date.getDate(),
      month: date.toLocaleDateString(locale, { month: 'short' }),
      year: date.getFullYear()
    }
  }

  const dateInfo = formatDate(event.date)
  const isMultiDay = event.endDate && event.endDate !== event.date

  return (
    <div 
      className="group relative animate-fade-in-up"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Card glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor()} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 rounded-3xl`} />
      
      {/* Glassmorphism card */}
      <Card className={`relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl hover:shadow-3xl overflow-hidden transform-gpu transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/15 ${
        viewMode === 'list' ? 'flex' : ''
      }`}>
        {/* Featured Badge */}
        {event.featured && (
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 font-semibold shadow-xl">
              ⭐ {locale === 'es' ? 'Destacado' : 'Featured'}
            </Badge>
          </div>
        )}

        {/* Date Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-3 text-center min-w-[80px] shadow-lg">
            <div className="text-2xl font-bold text-white">
              {dateInfo.day}
            </div>
            <div className="text-xs text-white/70 uppercase">
              {dateInfo.month}
            </div>
            <div className="text-xs text-white/60">
              {dateInfo.year}
            </div>
          </div>
        </div>

        {/* Event Image */}
        <div className={`relative overflow-hidden ${
          viewMode === 'list' ? 'w-80 h-48' : 'h-64'
        }`}>
          <Image
            src={event.images[0]}
            alt={EventService.getEventName(event, locale)}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Premium accent gradient bar */}
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getCategoryColor()} opacity-80 group-hover:h-2 transition-all duration-500`} />
          
          {/* Category Badge */}
          <div className="absolute bottom-4 left-4">
            <Badge className={`bg-gradient-to-r ${getCategoryColor()} text-white border-0 font-semibold`}>
              {EventService.getEventCategoryLabel(event.category, locale)}
            </Badge>
          </div>

          {/* Type Indicator for Multi-day events */}
          {isMultiDay && (
            <div className="absolute bottom-4 right-4">
              <Badge className="bg-black/50 backdrop-blur-sm text-white border-0 text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                {event.endDate ? EventService.formatEventDate(event, locale) : locale === 'es' ? 'Varios días' : 'Multi-day'}
              </Badge>
            </div>
          )}

          {/* Quick Info for List View */}
          {viewMode === 'list' && (
            <div className="absolute bottom-4 right-4 flex gap-2">
              {event.capacity && <Users className="w-4 h-4 text-white drop-shadow-lg" />}
              {event.phone && <Phone className="w-4 h-4 text-white drop-shadow-lg" />}
              {event.website && <Globe className="w-4 h-4 text-white drop-shadow-lg" />}
            </div>
          )}
        </div>

        <CardContent className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all line-clamp-2">
              {EventService.getEventName(event, locale)}
            </h3>
            
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-white text-sm font-bold">{event.rating}</span>
                <span className="ml-1 text-white/70 text-xs">({event.reviewCount})</span>
              </div>
              
              {/* Atmosphere Badge */}
              <Badge variant="outline" className="text-xs border-white/30 text-white/70 capitalize">
                {EventService.getAtmosphereLabel(event.atmosphere, locale)}
              </Badge>

              {/* Type Badge */}
              <Badge variant="outline" className="text-xs border-white/30 text-white/70">
                {event.type === 'recurring' ? (locale === 'es' ? 'Recurrente' : 'Recurring') : 
                 event.type === 'multi-day' ? (locale === 'es' ? 'Varios días' : 'Multi-day') : 
                 (locale === 'es' ? 'Único' : 'Single')}
              </Badge>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-white/70 text-sm mb-4 line-clamp-2">
            {EventService.getEventShortDescription(event, locale)}
          </p>

          {/* Tags */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {EventService.getEventTags(event, locale).slice(0, viewMode === 'list' ? 4 : 3).map((tag, idx) => (
                <Badge key={idx} variant="outline" className="text-xs border-white/30 text-white/80">
                  {tag}
                </Badge>
              ))}
              {EventService.getEventTags(event, locale).length > (viewMode === 'list' ? 4 : 3) && (
                <Badge variant="outline" className="text-xs border-white/30 text-white/60">
                  +{EventService.getEventTags(event, locale).length - (viewMode === 'list' ? 4 : 3)}
                </Badge>
              )}
            </div>
          </div>

          {/* Event Info */}
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex items-center text-white/70">
              <MapPin className="w-4 h-4 mr-2 text-amber-400" />
              <span className="line-clamp-1">{EventService.getEventLocation(event, locale)}</span>
            </div>
            <div className="flex items-center text-white/70">
              <Clock className="w-4 h-4 mr-2 text-amber-400" />
              {EventService.formatEventTime(event)}
            </div>
            {event.duration && (
              <div className="flex items-center text-white/70">
                <Timer className="w-4 h-4 mr-2 text-amber-400" />
                {EventService.getEventDuration(event, locale)}
              </div>
            )}
          </div>

          {/* Price */}
          <div className="mb-4 p-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg border border-amber-400/30 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-white/90">
              <Ticket className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">
                {EventService.getEventPrice(event, locale)}
              </span>
              {event.priceAmount && event.priceAmount > 0 && (
                <Badge className="ml-auto bg-white/20 text-white border-0 text-xs">
                  {event.currency}
                </Badge>
              )}
            </div>
          </div>

          {/* Highlights */}
          {event.highlights && event.highlights[locale].length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {EventService.getEventHighlights(event, locale).slice(0, 2).map((highlight, idx) => (
                <Badge key={idx} variant="outline" className={`text-xs border-amber-400/30 text-amber-300 bg-gradient-to-r ${getCategoryColor()}/10`}>
                  ✨ {highlight}
                </Badge>
              ))}
              {EventService.getEventHighlights(event, locale).length > 2 && (
                <Badge variant="outline" className="text-xs border-white/30 text-white/60">
                  +{EventService.getEventHighlights(event, locale).length - 2}
                </Badge>
              )}
            </div>
          )}

          {/* Capacity and Age Restriction */}
          <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
            {event.capacity && (
              <div className="flex items-center gap-1 text-white/70">
                <Users className="w-3 h-3 text-amber-400" />
                <span>{event.capacity} {locale === 'es' ? 'personas' : 'people'}</span>
              </div>
            )}
            {event.ageRestriction && (
              <div className="flex items-center gap-1 text-white/70">
                <span className="text-amber-400">🔞</span>
                <span>{event.ageRestriction}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Link 
              href={`/${locale}/events/${EventService.generateSlug(event, locale)}`}
              className="flex-1"
            >
              <Button 
                variant="default" 
                size="sm"
                className={`w-full bg-gradient-to-r ${getCategoryColor()} hover:opacity-90 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300`}
              >
                {locale === 'es' ? 'Ver Detalles' : 'View Details'}
              </Button>
            </Link>
            {event.phone && (
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm hover:scale-105 transition-all duration-300"
                onClick={handlePhoneClick}
              >
                <Phone className="w-4 h-4" />
              </Button>
            )}
            {event.website && (
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm hover:scale-105 transition-all duration-300"
                onClick={handleWebsiteClick}
              >
                <Globe className="w-4 h-4" />
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm hover:scale-105 transition-all duration-300"
              onClick={handleNavigationClick}
            >
              <Navigation className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
              onClick={handleHeartClick}
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}