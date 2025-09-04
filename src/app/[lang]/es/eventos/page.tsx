import { Locale, getTranslation } from '@/lib/i18n'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  MapPin, 
  Clock,
  Users,
  Music,
  Sparkles,
  Heart,
  Camera
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { buildLocalizedUrl } from '@/lib/url-mapping'

interface EventsPageProps {
  params: Promise<{ lang: string }>
}

export default async function EventsPage({ params }: EventsPageProps) {
  const { lang: langParam } = await params
  const lang = langParam as Locale
  const translations = getTranslation(lang)

  // Sample events data (in real app, this would come from API/database)
  const upcomingEvents = [
    {
      id: 'carnaval-tepoztlan',
      title: lang === 'es' ? 'Carnaval de Tepoztlán' : 'Tepoztlán Carnival',
      date: '2025-02-28',
      endDate: '2025-03-04',
      time: '18:00',
      location: lang === 'es' ? 'Centro Histórico' : 'Historic Center',
      category: 'festival',
      description: lang === 'es'
        ? 'La celebración más colorida del año con desfiles, música tradicional, danzas folclóricas y la famosa quema del mal humor.'
        : 'The most colorful celebration of the year with parades, traditional music, folk dances and the famous burning of bad mood.',
      image: 'https://images.unsplash.com/photo-1533906966484-a9c978a3f090?q=80&w=2069',
      price: lang === 'es' ? 'Gratis' : 'Free',
      tags: lang === 'es' ? ['Tradicional', 'Familiar', 'Cultural'] : ['Traditional', 'Family', 'Cultural']
    },
    {
      id: 'equinoccio-primavera',
      title: lang === 'es' ? 'Equinoccio de Primavera' : 'Spring Equinox',
      date: '2025-03-21',
      time: '06:00',
      location: lang === 'es' ? 'Pirámide del Tepozteco' : 'Tepozteco Pyramid',
      category: 'spiritual',
      description: lang === 'es'
        ? 'Ceremonia ancestral para recibir la energía del equinoccio en la pirámide sagrada del Tepozteco.'
        : 'Ancestral ceremony to receive the energy of the equinox at the sacred pyramid of Tepozteco.',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070',
      price: lang === 'es' ? '$50 MXN' : '$50 MXN ($3 USD)',
      tags: lang === 'es' ? ['Espiritual', 'Ceremonial', 'Amanecer'] : ['Spiritual', 'Ceremonial', 'Sunrise']
    },
    {
      id: 'tianguis-domingo',
      title: lang === 'es' ? 'Tianguis Dominical' : 'Sunday Market',
      date: '2025-01-05',
      recurring: 'weekly',
      time: '08:00',
      endTime: '16:00',
      location: lang === 'es' ? 'Plaza Central' : 'Central Plaza',
      category: 'market',
      description: lang === 'es'
        ? 'Mercado tradicional con productos locales, artesanías, comida típica y ambiente festivo familiar.'
        : 'Traditional market with local products, handicrafts, typical food and festive family atmosphere.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070',
      price: lang === 'es' ? 'Gratis' : 'Free',
      tags: lang === 'es' ? ['Mercado', 'Local', 'Artesanías'] : ['Market', 'Local', 'Handicrafts']
    }
  ]

  const eventCategories = [
    {
      id: 'festivals',
      name: lang === 'es' ? 'Festivales' : 'Festivals',
      icon: Music,
      color: 'from-purple-500 to-pink-600',
      count: 12
    },
    {
      id: 'markets',
      name: lang === 'es' ? 'Mercados' : 'Markets', 
      icon: Users,
      color: 'from-green-500 to-emerald-600',
      count: 8
    },
    {
      id: 'cultural',
      name: lang === 'es' ? 'Culturales' : 'Cultural',
      icon: Camera,
      color: 'from-blue-500 to-indigo-600',
      count: 15
    },
    {
      id: 'spiritual',
      name: lang === 'es' ? 'Espirituales' : 'Spiritual',
      icon: Sparkles,
      color: 'from-orange-500 to-red-600',
      count: 6
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Calendar className="h-8 w-8 text-primary mr-2" />
          <h1 className="text-4xl font-bold">
            {translations.events.title}
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {translations.events.subtitle}
        </p>
      </div>

      {/* Event Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {eventCategories.map((category) => {
          const Icon = category.icon
          return (
            <Card key={category.id} className="text-center hover:shadow-lg transition-shadow cursor-pointer group">
              <Link href={buildLocalizedUrl(`eventos/${category.id}`, lang)}>
                <CardContent className="p-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm">{category.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {category.count} {lang === 'es' ? 'eventos' : 'events'}
                  </p>
                </CardContent>
              </Link>
            </Card>
          )
        })}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <Button variant="default" size="sm">
          {lang === 'es' ? 'Todos' : 'All'}
        </Button>
        <Button variant="outline" size="sm">
          {lang === 'es' ? 'Esta Semana' : 'This Week'}
        </Button>
        <Button variant="outline" size="sm">
          {lang === 'es' ? 'Este Mes' : 'This Month'}
        </Button>
        <Button variant="outline" size="sm">
          {lang === 'es' ? 'Gratuitos' : 'Free'}
        </Button>
      </div>

      {/* Upcoming Events */}
      <div className="space-y-6">
        {upcomingEvents.map((event, _index) => ( // eslint-disable-line @typescript-eslint/no-unused-vars
          <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="md:flex">
              {/* Event Image */}
              <div className="relative md:w-1/3 h-48 md:h-auto">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                {event.price === 'Gratis' || event.price === 'Free' ? (
                  <Badge className="absolute top-4 right-4 bg-green-100 text-green-800">
                    <Heart className="h-3 w-3 mr-1" />
                    {event.price}
                  </Badge>
                ) : (
                  <Badge className="absolute top-4 right-4 bg-blue-100 text-blue-800">
                    {event.price}
                  </Badge>
                )}
              </div>

              {/* Event Details */}
              <div className="md:w-2/3 p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {event.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Date */}
                  <div className="text-center bg-primary/10 rounded-lg p-3 min-w-[100px]">
                    <div className="text-2xl font-bold text-primary">
                      {new Date(event.date).getDate()}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase">
                      {new Date(event.date).toLocaleDateString(lang, { month: 'short' })}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(event.date).getFullYear()}
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {event.description}
                </p>

                {/* Event Meta Information */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {event.time}
                    {event.endTime && ` - ${event.endTime}`}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {event.location}
                  </div>
                  {event.recurring && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {lang === 'es' ? 'Semanal' : 'Weekly'}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1" asChild>
                    <Link href={buildLocalizedUrl(`eventos/${event.id}`, lang)}>
                      {lang === 'es' ? 'Ver Detalles' : 'View Details'}
                    </Link>
                  </Button>
                  <Button variant="outline">
                    {lang === 'es' ? 'Agregar al Calendario' : 'Add to Calendar'}
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button variant="outline" size="lg">
          {lang === 'es' ? 'Ver Más Eventos' : 'View More Events'}
        </Button>
      </div>

      {/* Newsletter Signup */}
      <div className="mt-16 bg-muted/50 rounded-2xl p-8 text-center">
        <Calendar className="h-12 w-12 mx-auto text-primary mb-4" />
        <h2 className="text-2xl font-bold mb-4">
          {lang === 'es' 
            ? 'No te Pierdas Ningún Evento' 
            : 'Don\'t Miss Any Event'
          }
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          {lang === 'es'
            ? 'Suscríbete a nuestro calendario de eventos y recibe notificaciones sobre las mejores celebraciones y festivales de Tepoztlán.'
            : 'Subscribe to our events calendar and receive notifications about the best celebrations and festivals in Tepoztlán.'
          }
        </p>
        <Button size="lg">
          {lang === 'es' ? 'Suscribirse al Calendario' : 'Subscribe to Calendar'}
        </Button>
      </div>
    </div>
  )
}