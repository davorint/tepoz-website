import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Locale } from '@/lib/i18n'
import { BusinessService } from '@/lib/business-data'
import { buildLocalizedUrl } from '@/lib/url-mapping'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  MapPin, 
  Phone, 
  Globe, 
  Star, 
  Wifi, 
  Car, 
  Heart,
  Clock,
  CreditCard,
  MessageCircle
} from 'lucide-react'

interface BusinessPageProps {
  params: Promise<{ lang: string; category: string; slug: string }>
}

// Generate static params for all business listings
export async function generateStaticParams() {
  const allSlugs = await BusinessService.getAllBusinessSlugs()
  const params = []
  
  for (const { slug, lang } of allSlugs) {
    const business = await BusinessService.getBusinessBySlug(slug, lang)
    if (business) {
      // Map category to URL segment
      const categoryMap = {
        hotel: lang === 'es' ? 'hospedaje' : 'stay',
        restaurant: lang === 'es' ? 'comer' : 'eat',
        experience: lang === 'es' ? 'experiencias' : 'experience',
        service: lang === 'es' ? 'servicios' : 'services',
        shop: lang === 'es' ? 'compras' : 'shop'
      }
      
      params.push({
        lang,
        category: categoryMap[business.category],
        slug
      })
    }
  }
  
  return params
}

export default async function BusinessPage({ params }: BusinessPageProps) {
  const { lang: langParam, category, slug } = await params
  const lang = langParam as Locale
  
  // Get business by slug
  const business = await BusinessService.getBusinessBySlug(slug, lang)
  
  if (!business) {
    notFound()
  }

  const isOpen = () => {
    const now = new Date()
    const day = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
    const currentTime = now.toTimeString().slice(0, 5)
    const todayHours = business.operatingHours[day]
    
    if (!todayHours || todayHours.closed) return false
    
    return currentTime >= todayHours.open && currentTime <= todayHours.close
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground mb-6">
        <a href={buildLocalizedUrl('', lang)} className="hover:text-foreground">
          {lang === 'es' ? 'Inicio' : 'Home'}
        </a>
        {' > '}
        <a href={buildLocalizedUrl(category, lang)} className="hover:text-foreground">
          {category}
        </a>
        {' > '}
        <span className="text-foreground">{business.name[lang]}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">{business.name[lang]}</h1>
              {business.isVerified && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {lang === 'es' ? 'Verificado' : 'Verified'}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{business.rating}</span>
                <span>({business.reviewCount} {lang === 'es' ? 'reseñas' : 'reviews'})</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{business.location.address[lang]}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span className={isOpen() ? 'text-green-600' : 'text-red-600'}>
                  {isOpen() ? (lang === 'es' ? 'Abierto' : 'Open') : (lang === 'es' ? 'Cerrado' : 'Closed')}
                </span>
              </div>
            </div>
            
            <p className="text-muted-foreground text-lg">
              {business.description[lang]}
            </p>
          </div>

          {/* Image Gallery */}
          {business.images.length > 0 && (
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {business.images.map((image, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${business.name[lang]} - ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Amenities */}
          {business.amenities[lang].length > 0 && (
            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {lang === 'es' ? 'Amenidades' : 'Amenities'}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {business.amenities[lang].map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                {lang === 'es' ? 'Información de Contacto' : 'Contact Information'}
              </h3>
              
              <div className="space-y-3">
                {business.contact.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${business.contact.phone}`} className="hover:text-primary">
                      {business.contact.phone}
                    </a>
                  </div>
                )}
                
                {business.contact.whatsapp && (
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={`https://wa.me/${business.contact.whatsapp.replace(/[^\d]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      WhatsApp
                    </a>
                  </div>
                )}
                
                {business.contact.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={business.contact.website} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {lang === 'es' ? 'Sitio Web' : 'Website'}
                    </a>
                  </div>
                )}
              </div>

              {/* Quick Info Icons */}
              <div className="flex gap-4 mt-6 pt-4 border-t">
                {business.hasWifi && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Wifi className="h-4 w-4" />
                    <span>WiFi</span>
                  </div>
                )}
                {business.hasParking && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Car className="h-4 w-4" />
                    <span>{lang === 'es' ? 'Parking' : 'Parking'}</span>
                  </div>
                )}
                {business.acceptsCards && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    <span>{lang === 'es' ? 'Tarjetas' : 'Cards'}</span>
                  </div>
                )}
                {business.isPetFriendly && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Heart className="h-4 w-4" />
                    <span>{lang === 'es' ? 'Pet Friendly' : 'Pet Friendly'}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Operating Hours */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                {lang === 'es' ? 'Horarios' : 'Operating Hours'}
              </h3>
              
              <div className="space-y-2 text-sm">
                {Object.entries(business.operatingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span className="capitalize">
                      {lang === 'es' 
                        ? day === 'monday' ? 'Lunes'
                          : day === 'tuesday' ? 'Martes'
                          : day === 'wednesday' ? 'Miércoles'
                          : day === 'thursday' ? 'Jueves'
                          : day === 'friday' ? 'Viernes'
                          : day === 'saturday' ? 'Sábado'
                          : 'Domingo'
                        : day.charAt(0).toUpperCase() + day.slice(1)
                      }
                    </span>
                    <span className="text-muted-foreground">
                      {hours.closed 
                        ? (lang === 'es' ? 'Cerrado' : 'Closed')
                        : `${hours.open} - ${hours.close}`
                      }
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full" size="lg">
              {lang === 'es' ? 'Reservar Ahora' : 'Book Now'}
            </Button>
            <Button variant="outline" className="w-full">
              {lang === 'es' ? 'Ver en Mapa' : 'View on Map'}
            </Button>
            <Button variant="outline" className="w-full">
              {lang === 'es' ? 'Escribir Reseña' : 'Write Review'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}