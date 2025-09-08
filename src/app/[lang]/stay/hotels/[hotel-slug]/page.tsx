'use client'

import { Locale } from '@/lib/i18n'
import { HotelService } from '@/lib/hotels'
import { notFound } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Hotel } from '@/lib/hotels'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { generateHotelStructuredData } from '@/lib/seo-utils'
import { 
  MapPin, 
  Star, 
  Phone,
  Heart,
  Users,
  Globe,
  Navigation,
  CheckCircle,
  Wifi,
  Car,
  Coffee,
  Waves,
  Sparkles,
  Dumbbell,
  Utensils,
  Leaf,
  Dog,
  Share2,
  Calendar,
  CreditCard
} from 'lucide-react'

interface HotelPageProps {
  params: Promise<{ 
    lang: Locale
    'hotel-slug': string
  }>
}

export default function HotelPage({ params }: HotelPageProps) {
  const [hotel, setHotel] = useState<Hotel | null>(null)
  const [locale, setLocale] = useState<Locale>('en')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadHotel = async () => {
      try {
        const { lang, 'hotel-slug': hotelSlug } = await params
        setLocale(lang)
        
        const foundHotel = HotelService.getHotelBySlug(hotelSlug, lang)
        setHotel(foundHotel || null)
        
        // Add structured data
        if (foundHotel) {
          const structuredData = generateHotelStructuredData(foundHotel, lang, hotelSlug)
          const script = document.createElement('script')
          script.type = 'application/ld+json'
          script.text = JSON.stringify(structuredData)
          document.head.appendChild(script)
          
          // Clean up function
          return () => {
            document.head.removeChild(script)
          }
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Error loading hotel:', error)
        setLoading(false)
      }
    }

    loadHotel()
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-orange-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!hotel) {
    notFound()
  }

  const amenityIcons: Record<string, React.ReactNode> = {
    'pool': <Waves className="w-5 h-5 text-amber-400" />,
    'spa': <Sparkles className="w-5 h-5 text-amber-400" />,
    'gym': <Dumbbell className="w-5 h-5 text-amber-400" />,
    'restaurant': <Utensils className="w-5 h-5 text-amber-400" />,
    'bar': <Coffee className="w-5 h-5 text-amber-400" />,
    'parking': <Car className="w-5 h-5 text-amber-400" />,
    'wifi': <Wifi className="w-5 h-5 text-amber-400" />,
    'breakfast': <Coffee className="w-5 h-5 text-amber-400" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-orange-900">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative mb-8 rounded-3xl overflow-hidden">
          <div className="relative h-96 md:h-[500px]">
            <Image
              src={hotel.images[0]}
              alt={HotelService.getHotelName(hotel, locale)}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {HotelService.getHotelName(hotel, locale)}
              </h1>
              <div className="flex flex-wrap gap-4 items-center mb-4">
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
                  <span className="text-white font-bold">{hotel.rating}</span>
                  <span className="text-white/70 ml-1">({hotel.reviews})</span>
                </div>
                <Badge className="bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {hotel.category}
                </Badge>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <MapPin className="w-5 h-5 text-white mr-2" />
                  <span className="text-white font-bold">{hotel.location.neighborhood}</span>
                </div>
              </div>
              <div className="text-white font-bold text-xl">
                {hotel.priceRange} • ${hotel.roomTypes[0]?.price || 'N/A'}/{locale === 'es' ? 'noche' : 'night'}
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
                  {locale === 'es' ? 'Descripción' : 'Description'}
                </h2>
                <p className="text-white/80 leading-relaxed">
                  {HotelService.getHotelDescription(hotel, locale)}
                </p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {locale === 'es' ? 'Amenidades' : 'Amenities'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {hotel.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center text-white/80">
                      {amenityIcons[amenity] || <CheckCircle className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0" />}
                      <span className="ml-3">{amenity.charAt(0).toUpperCase() + amenity.slice(1)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Room Types */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {locale === 'es' ? 'Tipos de Habitación' : 'Room Types'}
                </h2>
                <div className="space-y-4">
                  {hotel.roomTypes.map((room, idx) => (
                    <div key={idx} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-white">{room.name[locale]}</h3>
                        <div className="text-amber-400 font-bold text-lg">${room.price}/{locale === 'es' ? 'noche' : 'night'}</div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/60 mt-3">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{room.capacity} {locale === 'es' ? 'huéspedes' : 'guests'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 sticky top-4">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-white mb-2">
                    ${hotel.roomTypes[0]?.price || 'N/A'}
                  </div>
                  <div className="text-white/60">
                    {locale === 'es' ? 'por noche' : 'per night'}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-white/80">
                    <MapPin className="w-5 h-5 text-amber-400 mr-3" />
                    <div>
                      <div className="font-medium">{hotel.location.address}</div>
                      <div className="text-sm text-white/60">{hotel.location.neighborhood}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-white/80">
                    <Star className="w-5 h-5 text-amber-400 mr-3" />
                    <span>{hotel.rating} ({hotel.reviews} {locale === 'es' ? 'reseñas' : 'reviews'})</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <Users className="w-5 h-5 text-amber-400 mr-3" />
                    <span>{locale === 'es' ? 'Hasta' : 'Up to'} {hotel.roomTypes[0]?.capacity || 2} {locale === 'es' ? 'huéspedes' : 'guests'}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3">
                    <Calendar className="w-5 h-5 mr-2" />
                    {locale === 'es' ? 'Reservar Ahora' : 'Book Now'}
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3">
                    <CreditCard className="w-5 h-5 mr-2" />
                    {locale === 'es' ? 'Ver Disponibilidad' : 'Check Availability'}
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    {hotel.contact.phone && (
                      <Button 
                        className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                        onClick={() => window.open(`tel:${hotel.contact.phone}`, '_self')}
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        {locale === 'es' ? 'Llamar' : 'Call'}
                      </Button>
                    )}
                    {hotel.contact.website && (
                      <Button 
                        className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                        onClick={() => window.open(hotel.contact.website, '_blank', 'noopener,noreferrer')}
                      >
                        <Globe className="w-4 h-4 mr-1" />
                        {locale === 'es' ? 'Web' : 'Website'}
                      </Button>
                    )}
                    <Button 
                      className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                      onClick={() => {
                        if (hotel.location.coordinates) {
                          window.open(`https://www.google.com/maps?q=${hotel.location.coordinates[0]},${hotel.location.coordinates[1]}`, '_blank', 'noopener,noreferrer')
                        }
                      }}
                    >
                      <Navigation className="w-4 h-4 mr-1" />
                      {locale === 'es' ? 'Ubicación' : 'Location'}
                    </Button>
                    <Button 
                      className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                      onClick={() => console.log('Heart clicked for hotel:', hotel.id)}
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      {locale === 'es' ? 'Guardar' : 'Save'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  {locale === 'es' ? 'Características' : 'Features'}
                </h3>
                <div className="space-y-3">
                  {hotel.sustainability && (
                    <div className="flex items-center text-white/80">
                      <Leaf className="w-5 h-5 text-green-400 mr-3" />
                      <span>{locale === 'es' ? 'Hotel Sustentable' : 'Sustainable Hotel'}</span>
                    </div>
                  )}
                  {hotel.petFriendly && (
                    <div className="flex items-center text-white/80">
                      <Dog className="w-5 h-5 text-amber-400 mr-3" />
                      <span>{locale === 'es' ? 'Se Permiten Mascotas' : 'Pet Friendly'}</span>
                    </div>
                  )}
                  {hotel.adultsOnly && (
                    <div className="flex items-center text-white/80">
                      <Users className="w-5 h-5 text-red-400 mr-3" />
                      <span>{locale === 'es' ? 'Solo Adultos' : 'Adults Only'}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Share */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-4">
                  {locale === 'es' ? 'Compartir' : 'Share'}
                </h3>
                <Button
                  className="w-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: HotelService.getHotelName(hotel, locale),
                        text: HotelService.getHotelDescription(hotel, locale),
                        url: window.location.href,
                      })
                    } else {
                      navigator.clipboard.writeText(window.location.href)
                    }
                  }}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  {locale === 'es' ? 'Compartir Hotel' : 'Share Hotel'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}