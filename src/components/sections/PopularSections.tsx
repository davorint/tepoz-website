'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'motion/react'
import { Locale } from '@/lib/i18n'
import { Translations } from '@/types/translations'
import { MapPin, Star, Clock, Heart, Camera, Utensils, Calendar } from 'lucide-react'

interface PopularSectionsProps {
  lang: Locale
  translations: Translations
}

const attractionsData = [
  {
    title: "Pirámide del Tepozteco",
    description: "Ancient pyramid with breathtaking views",
    image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=400&h=300&fit=crop",
    rating: 4.8,
    duration: "3-4 horas"
  },
  {
    title: "Mercado de Tepoztlán",
    description: "Traditional crafts and local flavors",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    rating: 4.6,
    duration: "2 horas"
  },
  {
    title: "Convento de Tepoztlán",
    description: "Colonial architecture and history",
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?w=400&h=300&fit=crop",
    rating: 4.7,
    duration: "1-2 horas"
  },
  {
    title: "Valle de Atongo",
    description: "Natural pools and hiking trails",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    rating: 4.9,
    duration: "Día completo"
  }
]

const hotelsData = [
  {
    title: "Casa Fernanda Hotel Boutique",
    description: "Luxury boutique with garden views",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    rating: 4.9,
    price: "$2,500 MXN"
  },
  {
    title: "Posada del Tepozteco",
    description: "Traditional charm with modern comfort",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
    rating: 4.7,
    price: "$1,800 MXN"
  },
  {
    title: "Hotel Nilayam",
    description: "Wellness retreat with spa services",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    rating: 4.8,
    price: "$2,200 MXN"
  }
]

const restaurantsData = [
  {
    title: "Los Colorines",
    description: "Traditional Mexican cuisine with mountain views",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    rating: 4.8,
    cuisine: "Mexicana"
  },
  {
    title: "El Ciruelo",
    description: "Farm-to-table restaurant with organic ingredients",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    rating: 4.9,
    cuisine: "Orgánica"
  },
  {
    title: "Casa Luna",
    description: "Fusion cuisine in a magical garden setting",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adaf?w=400&h=300&fit=crop",
    rating: 4.7,
    cuisine: "Fusión"
  }
]

export default function PopularSections({ lang, translations }: PopularSectionsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent">
            {lang === 'es' ? 'Descubre lo Mejor de Tepoztlán' : 'Discover the Best of Tepoztlán'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {lang === 'es' 
              ? 'Explora atracciones fascinantes, sabores únicos y experiencias inolvidables en nuestro Pueblo Mágico'
              : 'Explore fascinating attractions, unique flavors, and unforgettable experiences in our Magical Town'
            }
          </p>
        </motion.div>

        <Tabs defaultValue="attractions" className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-white/90 backdrop-blur-md border border-white/30 rounded-xl p-2 mb-12">
              <TabsTrigger value="attractions" className="data-[state=active]:bg-white/80 data-[state=active]:shadow-lg rounded-lg">
                <Camera className="w-4 h-4 mr-2" />
                {translations.home.sections.attractions}
              </TabsTrigger>
              <TabsTrigger value="hotels" className="data-[state=active]:bg-white/80 data-[state=active]:shadow-lg rounded-lg">
                <MapPin className="w-4 h-4 mr-2" />
                {translations.home.sections.hotels}
              </TabsTrigger>
              <TabsTrigger value="restaurants" className="data-[state=active]:bg-white/80 data-[state=active]:shadow-lg rounded-lg">
                <Utensils className="w-4 h-4 mr-2" />
                {translations.home.sections.restaurants}
              </TabsTrigger>
              <TabsTrigger value="events" className="data-[state=active]:bg-white/80 data-[state=active]:shadow-lg rounded-lg">
                <Clock className="w-4 h-4 mr-2" />
                {translations.home.sections.events}
              </TabsTrigger>
              <TabsTrigger value="experiences" className="data-[state=active]:bg-white/80 data-[state=active]:shadow-lg rounded-lg">
                <Heart className="w-4 h-4 mr-2" />
                {translations.home.sections.experiences}
              </TabsTrigger>
            </TabsList>
          </motion.div>
          
          <TabsContent value="attractions" className="mt-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {attractionsData.map((attraction, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="group cursor-pointer overflow-hidden border-0 bg-white/90 backdrop-blur-md shadow-xl border border-gray-200/30 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                    <div className="relative overflow-hidden">
                      <img 
                        src={attraction.image} 
                        alt={attraction.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{attraction.rating}</span>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold group-hover:text-tepoztlan-sunset transition-colors">
                        {attraction.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {attraction.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-tepoztlan-sunset/10 text-tepoztlan-sunset border-tepoztlan-sunset/20">
                          <Clock className="w-3 h-3 mr-1" />
                          {attraction.duration}
                        </Badge>
                        <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 hover:fill-red-500 transition-colors cursor-pointer" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="hotels" className="mt-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {hotelsData.map((hotel, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="group cursor-pointer overflow-hidden border-0 bg-white/90 backdrop-blur-md shadow-xl border border-gray-200/30 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                    <div className="relative overflow-hidden">
                      <img 
                        src={hotel.image} 
                        alt={hotel.title}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{hotel.rating}</span>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl font-semibold group-hover:text-tepoztlan-sunset transition-colors">
                        {hotel.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {hotel.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-tepoztlan-sunset">
                          {hotel.price}
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {lang === 'es' ? 'Disponible' : 'Available'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="restaurants" className="mt-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {restaurantsData.map((restaurant, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="group cursor-pointer overflow-hidden border-0 bg-white/90 backdrop-blur-md shadow-xl border border-gray-200/30 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                    <div className="relative overflow-hidden">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.title}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{restaurant.rating}</span>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl font-semibold group-hover:text-tepoztlan-sunset transition-colors">
                        {restaurant.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {restaurant.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-orange-50 text-orange-700 border-orange-200">
                          {restaurant.cuisine}
                        </Badge>
                        <Badge className="bg-green-500 text-white">
                          {lang === 'es' ? 'Abierto' : 'Open Now'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="events" className="mt-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[1, 2, 3, 4].map((i) => (
                <motion.div key={i} variants={itemVariants}>
                  <Card className="group cursor-pointer overflow-hidden border-0 bg-white/90 backdrop-blur-md shadow-xl border border-gray-200/30 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] h-full">
                    <CardHeader className="text-center py-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-tepoztlan-sunset to-tepoztlan-earth rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Calendar className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-lg font-semibold group-hover:text-tepoztlan-sunset transition-colors">
                        {lang === 'es' ? `Festival ${i}` : `Festival ${i}`}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {lang === 'es' ? 'Festival tradicional próximo' : 'Upcoming traditional festival'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 text-center">
                      <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
                        {lang === 'es' ? 'Este fin de semana' : 'This Weekend'}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="experiences" className="mt-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[1, 2, 3, 4].map((i) => (
                <motion.div key={i} variants={itemVariants}>
                  <Card className="group cursor-pointer overflow-hidden border-0 bg-white/90 backdrop-blur-md shadow-xl border border-gray-200/30 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] h-full">
                    <div className="relative overflow-hidden">
                      <img 
                        src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=400&h=300&fit=crop`} 
                        alt={`Experience ${i}`}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold group-hover:text-tepoztlan-sunset transition-colors">
                        {lang === 'es' ? `Experiencia ${i}` : `Experience ${i}`}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {lang === 'es' ? 'Aventura única e inolvidable' : 'Unique and unforgettable adventure'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Badge variant="secondary" className="bg-red-50 text-red-700 border-red-200">
                        {lang === 'es' ? 'Imperdible' : 'Must Try'}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}