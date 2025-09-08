import { Locale } from '@/lib/i18n'
import { EventService } from '@/lib/events'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  MapPin, 
  Star, 
  Phone,
  Clock,
  Heart,
  Users,
  Globe,
  Navigation,
  Calendar,
  CheckCircle,
  AlertCircle,
  Ticket,
  Timer
} from 'lucide-react'

interface EventPageProps {
  params: Promise<{ 
    lang: Locale
    'event-slug': string
  }>
}

export default async function EventPage({ params }: EventPageProps) {
  const { lang, 'event-slug': eventSlug } = await params
  
  const event = EventService.getEventBySlug(eventSlug, lang)
  
  if (!event) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':')
    const date = new Date()
    date.setHours(parseInt(hours), parseInt(minutes))
    return date.toLocaleTimeString(lang === 'es' ? 'es-MX' : 'en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-orange-900">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative mb-8 rounded-3xl overflow-hidden">
          <div className="relative h-96 md:h-[500px]">
            <Image
              src={event.images[0]}
              alt={EventService.getEventName(event, lang)}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {EventService.getEventName(event, lang)}
              </h1>
              <div className="flex flex-wrap gap-4 items-center mb-4">
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
                  <span className="text-white font-bold">{event.rating}</span>
                  <span className="text-white/70 ml-1">({event.reviewCount})</span>
                </div>
                <Badge className="bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {EventService.getEventCategoryLabel(event.category, lang)}
                </Badge>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Calendar className="w-5 h-5 text-white mr-2" />
                  <span className="text-white font-bold">{formatDate(event.date)}</span>
                </div>
              </div>
              <div className="text-white font-bold text-xl">
                {EventService.getEventPrice(event, lang)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {lang === 'es' ? 'Descripción' : 'Description'}
                </h2>
                <p className="text-white/80 leading-relaxed">
                  {EventService.getEventDescription(event, lang)}
                </p>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {lang === 'es' ? 'Lo más destacado' : 'Highlights'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {EventService.getEventHighlights(event, lang).map((highlight, idx) => (
                    <div key={idx} className="flex items-center text-white/80">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      {highlight}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* What's Included */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {lang === 'es' ? 'Qué incluye' : "What's Included"}
                </h2>
                <div className="space-y-2">
                  {EventService.getEventIncludes(event, lang).map((item, idx) => (
                    <div key={idx} className="flex items-center text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            {event.requirements && event.requirements[lang].length > 0 && (
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {lang === 'es' ? 'Requisitos' : 'Requirements'}
                  </h2>
                  <div className="space-y-2">
                    {EventService.getEventRequirements(event, lang).map((req, idx) => (
                      <div key={idx} className="flex items-center text-white/80">
                        <AlertCircle className="w-4 h-4 text-yellow-400 mr-3 flex-shrink-0" />
                        {req}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Info Card */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 sticky top-4">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-white mb-2">
                    {EventService.getEventPrice(event, lang)}
                  </div>
                  <div className="text-white/60">
                    {event.capacity && `${lang === 'es' ? 'Capacidad:' : 'Capacity:'} ${event.capacity}`}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-white/80">
                    <Calendar className="w-5 h-5 text-amber-400 mr-3" />
                    <div>
                      <div className="font-medium">{formatDate(event.date)}</div>
                      {event.endDate && event.endDate !== event.date && (
                        <div className="text-sm text-white/60">
                          {lang === 'es' ? 'hasta' : 'until'} {formatDate(event.endDate)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center text-white/80">
                    <Clock className="w-5 h-5 text-amber-400 mr-3" />
                    <span>{formatTime(event.time)}</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <MapPin className="w-5 h-5 text-amber-400 mr-3" />
                    <span>{EventService.getEventLocation(event, lang)}</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <Timer className="w-5 h-5 text-amber-400 mr-3" />
                    <span>{EventService.getEventDuration(event, lang)}</span>
                  </div>
                  {event.capacity && (
                    <div className="flex items-center text-white/80">
                      <Users className="w-5 h-5 text-amber-400 mr-3" />
                      <span>
                        {lang === 'es' ? 'Capacidad:' : 'Capacity:'} {event.capacity} {lang === 'es' ? 'personas' : 'people'}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3">
                    <Ticket className="w-5 h-5 mr-2" />
                    {lang === 'es' ? 'Obtener Boletos' : 'Get Tickets'}
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    {event.phone && (
                      <Button 
                        className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                        onClick={() => window.open(`tel:${event.phone}`, '_self')}
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        {lang === 'es' ? 'Llamar' : 'Call'}
                      </Button>
                    )}
                    {event.website && (
                      <Button 
                        className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                        onClick={() => window.open(event.website, '_blank', 'noopener,noreferrer')}
                      >
                        <Globe className="w-4 h-4 mr-1" />
                        {lang === 'es' ? 'Web' : 'Website'}
                      </Button>
                    )}
                    <Button 
                      className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                      onClick={() => {
                        if (event.latitude && event.longitude) {
                          window.open(`https://www.google.com/maps?q=${event.latitude},${event.longitude}`, '_blank', 'noopener,noreferrer')
                        }
                      }}
                    >
                      <Navigation className="w-4 h-4 mr-1" />
                      {lang === 'es' ? 'Ubicación' : 'Location'}
                    </Button>
                    <Button 
                      className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                      onClick={() => console.log('Heart clicked for event:', event.id)}
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      {lang === 'es' ? 'Guardar' : 'Save'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Event Tags */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  {lang === 'es' ? 'Tags' : 'Tags'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {EventService.getEventTags(event, lang).map((tag, idx) => (
                    <Badge 
                      key={idx} 
                      variant="outline" 
                      className="border-amber-400/30 text-amber-300 bg-amber-400/10"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Organizer Info */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  {lang === 'es' ? 'Organizador' : 'Organizer'}
                </h3>
                <div className="space-y-2">
                  <div className="text-white font-medium">{event.organizer.name}</div>
                  {event.organizer.contact && (
                    <div className="text-white/70 text-sm">{event.organizer.contact}</div>
                  )}
                  {event.organizer.website && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="mt-2 border-white/30 text-white hover:bg-white/10"
                      onClick={() => window.open(event.organizer.website, '_blank', 'noopener,noreferrer')}
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      {lang === 'es' ? 'Sitio Web' : 'Website'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}