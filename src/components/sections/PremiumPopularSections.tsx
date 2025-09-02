'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Locale } from '@/lib/i18n'
import { Translations } from '@/types/translations'
import { MapPin, Star, Clock, Camera, Utensils, Sparkles } from 'lucide-react'

interface PremiumPopularSectionsProps {
  lang: Locale
  translations: Translations
}

const attractionsData = [
  {
    title: "Pirámide del Tepozteco",
    description: "Ancient pyramid with breathtaking views",
    image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=400&h=300&fit=crop",
    rating: 4.8,
    duration: "3-4 horas",
    badge: "Most Popular"
  },
  {
    title: "Mercado de Tepoztlán",
    description: "Traditional crafts and local flavors",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    rating: 4.6,
    duration: "2 horas",
    badge: "Local Favorite"
  },
  {
    title: "Convento de Tepoztlán",
    description: "Colonial architecture and history",
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?w=400&h=300&fit=crop",
    rating: 4.7,
    duration: "1-2 horas",
    badge: "Historical"
  },
  {
    title: "Valle de Atongo",
    description: "Natural pools and hiking trails",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    rating: 4.9,
    duration: "Día completo",
    badge: "Adventure"
  }
]

const hotelsData = [
  {
    title: "Casa Fernanda Hotel Boutique",
    description: "Luxury boutique with garden views",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    rating: 4.9,
    price: "$2,500 MXN",
    badge: "Luxury"
  },
  {
    title: "Posada del Tepozteco",
    description: "Traditional charm with modern comfort",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
    rating: 4.7,
    price: "$1,800 MXN",
    badge: "Best Value"
  },
  {
    title: "Hotel Nilayam",
    description: "Wellness retreat with spa services",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    rating: 4.8,
    price: "$2,200 MXN",
    badge: "Wellness"
  }
]

const restaurantsData = [
  {
    title: "Los Colorines",
    description: "Traditional Mexican cuisine with mountain views",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    rating: 4.8,
    cuisine: "Mexicana",
    badge: "Award Winner"
  },
  {
    title: "El Ciruelo",
    description: "Farm-to-table restaurant with organic ingredients",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    rating: 4.9,
    cuisine: "Orgánica",
    badge: "Eco Friendly"
  },
  {
    title: "Casa Luna",
    description: "Fusion cuisine in a magical garden setting",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adaf?w=400&h=300&fit=crop",
    rating: 4.7,
    cuisine: "Fusión",
    badge: "Romantic"
  }
]

export default function PremiumPopularSections({ lang, translations }: PremiumPopularSectionsProps) {

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-200 to-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header with Premium Animation */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">
              {lang === 'es' ? 'Descubre lo Mejor' : 'Discover the Best'}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 bg-clip-text text-transparent animate-gradient bg-300%">
              {lang === 'es' ? 'Experiencias Populares' : 'Popular Experiences'}
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {lang === 'es' 
              ? 'Explora los lugares más emblemáticos, los mejores hoteles y restaurantes recomendados'
              : 'Explore the most iconic places, best hotels and recommended restaurants'
            }
          </p>
        </div>

        {/* Premium Tabs */}
        <Tabs defaultValue="attractions" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 bg-white/80 backdrop-blur-md shadow-lg rounded-full p-1">
            <TabsTrigger 
              value="attractions" 
              className="rounded-full transition-all duration-300 hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
            >
              <Camera className="w-4 h-4 mr-2" />
              {lang === 'es' ? 'Atracciones' : 'Attractions'}
            </TabsTrigger>
            <TabsTrigger 
              value="hotels"
              className="rounded-full transition-all duration-300 hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
            >
              <MapPin className="w-4 h-4 mr-2" />
              {translations.nav.stay || 'Stay'}
            </TabsTrigger>
            <TabsTrigger 
              value="restaurants"
              className="rounded-full transition-all duration-300 hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
            >
              <Utensils className="w-4 h-4 mr-2" />
              {translations.nav.eat || 'Eat'}
            </TabsTrigger>
          </TabsList>

          {/* Attractions Tab */}
          <TabsContent value="attractions" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {attractionsData.map((item, _index) => ( // eslint-disable-line @typescript-eslint/no-unused-vars
                <div
                  key={item.title}
                  className={`group relative animate-in fade-in slide-in-from-bottom-10 duration-700 fill-mode-both`}
                >
                  <Card className="overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-white/90 backdrop-blur-sm border-0">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Premium Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 animate-pulse-glow">
                          {item.badge}
                        </Badge>
                      </div>

                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium">{item.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{item.duration}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Hotels Tab */}
          <TabsContent value="hotels" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hotelsData.map((item, _index) => ( // eslint-disable-line @typescript-eslint/no-unused-vars
                <div
                  key={item.title}
                  className={`group relative animate-in fade-in slide-in-from-bottom-10 duration-700 fill-mode-both`}
                >
                  <Card className="overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-white/90 backdrop-blur-sm border-0">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                          {item.badge}
                        </Badge>
                      </div>

                      <div className="absolute bottom-3 right-3">
                        <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                          <span className="font-bold">{item.price}</span>
                          <span className="text-xs ml-1">/ noche</span>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium">{item.rating}</span>
                        </div>
                        <button className="text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors">
                          {lang === 'es' ? 'Ver detalles →' : 'View details →'}
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                  
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Restaurants Tab */}
          <TabsContent value="restaurants" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {restaurantsData.map((item, _index) => ( // eslint-disable-line @typescript-eslint/no-unused-vars
                <div
                  key={item.title}
                  className={`group relative animate-in fade-in slide-in-from-bottom-10 duration-700 fill-mode-both`}
                >
                  <Card className="overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-white/90 backdrop-blur-sm border-0">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-gradient-to-r from-green-500 to-teal-500 text-white border-0">
                          {item.badge}
                        </Badge>
                      </div>

                      <div className="absolute bottom-3 left-3">
                        <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                          {item.cuisine}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-green-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium">{item.rating}</span>
                        </div>
                        <button className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors">
                          {lang === 'es' ? 'Reservar →' : 'Reserve →'}
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                  
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom CTA with Premium Animation */}
        <div className="text-center mt-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25">
            <span className="relative z-10">
              {lang === 'es' ? 'Ver Todas las Experiencias' : 'View All Experiences'}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </section>
  )
}