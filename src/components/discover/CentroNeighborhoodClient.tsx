'use client'

import { motion } from 'framer-motion'
import {
  MapPin, Church, Calendar, Users, Heart,
  Home, Sparkles, ArrowLeft, Star
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Locale } from '@/lib/i18n'

interface CentroNeighborhoodClientProps {
  locale: Locale
}

export default function CentroNeighborhoodClient({ locale }: CentroNeighborhoodClientProps) {
  const content = {
    es: {
      backToNeighborhoods: 'Volver a Barrios',
      hero: {
        badge: 'Centro Histórico',
        name: 'Centro',
        patron: 'Nuestra Señora de la Natividad',
        festival: '8 de Septiembre',
        intro: 'El corazón histórico y cultural de Tepoztlán',
      },
      overview: {
        title: 'Descripción General',
        text: 'El Centro de Tepoztlán es el núcleo histórico y cultural del pueblo mágico. Aquí se encuentra el Ex Convento de la Natividad, declarado Patrimonio de la Humanidad por la UNESCO, así como el zócalo principal donde convergen la vida comercial, social y cultural de la comunidad.',
      },
      highlights: {
        title: 'Características Destacadas',
        items: [
          {
            icon: Church,
            title: 'Ex Convento de la Natividad',
            description: 'Patrimonio Mundial UNESCO del siglo XVI con arquitectura colonial excepcional',
          },
          {
            icon: Home,
            title: 'Zócalo Principal',
            description: 'Plaza central rodeada de restaurantes, cafés y tiendas de artesanías',
          },
          {
            icon: Sparkles,
            title: 'Mercado de Artesanías',
            description: 'Artesanos locales ofrecen textiles, cerámica y joyería tradicional',
          },
          {
            icon: Users,
            title: 'Centro Cultural',
            description: 'Eventos culturales, exposiciones y actividades comunitarias regulares',
          },
        ],
      },
      traditions: {
        title: 'Tradiciones y Festividades',
        festival: {
          title: 'Fiesta de la Natividad',
          date: '8 de Septiembre',
          description: 'La celebración más importante del centro, honrando a la patrona del pueblo con procesiones, música tradicional, danzas de chinelos, fuegos artificiales y feria popular.',
        },
        activities: [
          'Procesiones religiosas desde el convento',
          'Danzas tradicionales de chinelos y concheros',
          'Misa solemne en el atrio del Ex Convento',
          'Feria popular con antojitos y comida tradicional',
          'Castillo de fuegos artificiales',
        ],
      },
      visit: {
        title: 'Qué Visitar',
        places: [
          {
            name: 'Ex Convento de la Natividad',
            description: 'Monumento del siglo XVI con frescos únicos y arquitectura dominicana',
            hours: 'Martes a domingo 10:00-18:00',
          },
          {
            name: 'Zócalo y Jardín Principal',
            description: 'Plaza central con kiosco, árboles centenarios y ambiente vibrante',
            hours: 'Abierto 24/7',
          },
          {
            name: 'Mercado de Artesanías',
            description: 'Variedad de productos locales y artesanías tradicionales',
            hours: 'Lunes a domingo 9:00-19:00',
          },
          {
            name: 'Museo Arqueológico',
            description: 'Colección de piezas prehispánicas de la región',
            hours: 'Martes a domingo 10:00-17:00',
          },
        ],
      },
      location: {
        title: 'Ubicación',
        description: 'El Centro se encuentra en el corazón de Tepoztlán, accesible desde cualquier punto del pueblo a pie.',
        coordinates: '18.9875° N, 99.0930° O',
      },
    },
    en: {
      backToNeighborhoods: 'Back to Neighborhoods',
      hero: {
        badge: 'Historic Center',
        name: 'Centro',
        patron: 'Our Lady of the Nativity',
        festival: 'September 8th',
        intro: 'The historic and cultural heart of Tepoztlán',
      },
      overview: {
        title: 'Overview',
        text: 'The Centro of Tepoztlán is the historic and cultural core of the magical town. Here you will find the Ex-Convent of the Nativity, declared a UNESCO World Heritage Site, as well as the main zócalo where the commercial, social and cultural life of the community converges.',
      },
      highlights: {
        title: 'Key Features',
        items: [
          {
            icon: Church,
            title: 'Ex-Convent of the Nativity',
            description: '16th century UNESCO World Heritage Site with exceptional colonial architecture',
          },
          {
            icon: Home,
            title: 'Main Zócalo',
            description: 'Central plaza surrounded by restaurants, cafés, and craft shops',
          },
          {
            icon: Sparkles,
            title: 'Craft Market',
            description: 'Local artisans offer textiles, ceramics, and traditional jewelry',
          },
          {
            icon: Users,
            title: 'Cultural Center',
            description: 'Regular cultural events, exhibitions, and community activities',
          },
        ],
      },
      traditions: {
        title: 'Traditions and Festivities',
        festival: {
          title: 'Nativity Festival',
          date: 'September 8th',
          description: 'The most important celebration in the center, honoring the town\'s patron saint with processions, traditional music, chinelo dances, fireworks, and a popular fair.',
        },
        activities: [
          'Religious processions from the convent',
          'Traditional chinelo and conchero dances',
          'Solemn mass in the Ex-Convent atrium',
          'Popular fair with traditional food and snacks',
          'Fireworks castle',
        ],
      },
      visit: {
        title: 'What to Visit',
        places: [
          {
            name: 'Ex-Convent of the Nativity',
            description: '16th century monument with unique frescoes and Dominican architecture',
            hours: 'Tuesday to Sunday 10:00-18:00',
          },
          {
            name: 'Zócalo and Main Garden',
            description: 'Central plaza with kiosk, century-old trees, and vibrant atmosphere',
            hours: 'Open 24/7',
          },
          {
            name: 'Craft Market',
            description: 'Variety of local products and traditional crafts',
            hours: 'Monday to Sunday 9:00-19:00',
          },
          {
            name: 'Archaeological Museum',
            description: 'Collection of pre-Hispanic pieces from the region',
            hours: 'Tuesday to Sunday 10:00-17:00',
          },
        ],
      },
      location: {
        title: 'Location',
        description: 'The Centro is located in the heart of Tepoztlán, accessible from anywhere in town on foot.',
        coordinates: '18.9875° N, 99.0930° W',
      },
    },
  }

  const t = content[locale]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2s" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link href={`/${locale}/discover/tepoztlan/neighborhoods`}>
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.backToNeighborhoods}
          </Button>
        </Link>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl">
            <Badge className="bg-gradient-to-r from-amber-400 to-orange-400 text-white mb-4">
              {t.hero.badge}
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              {t.hero.name}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4">
                <Church className="w-6 h-6 text-amber-400" />
                <div>
                  <p className="text-white/70 text-sm">{locale === 'es' ? 'Patrona' : 'Patron Saint'}</p>
                  <p className="text-white font-semibold">{t.hero.patron}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4">
                <Calendar className="w-6 h-6 text-amber-400" />
                <div>
                  <p className="text-white/70 text-sm">{locale === 'es' ? 'Fiesta Patronal' : 'Patron Festival'}</p>
                  <p className="text-white font-semibold">{t.hero.festival}</p>
                </div>
              </div>
            </div>

            <p className="text-white/90 text-xl leading-relaxed">
              {t.hero.intro}
            </p>
          </div>
        </motion.div>

        {/* Overview Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-3xl">{t.overview.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 text-lg leading-relaxed">
                {t.overview.text}
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Highlights Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">{t.highlights.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.highlights.items.map((item, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-lg p-3">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-white/70">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Traditions Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-3xl">{t.traditions.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-amber-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-amber-400" />
                  <h3 className="text-white font-bold text-xl">{t.traditions.festival.title}</h3>
                </div>
                <p className="text-amber-200 font-semibold mb-3">{t.traditions.festival.date}</p>
                <p className="text-white/90 leading-relaxed">{t.traditions.festival.description}</p>
              </div>

              <div>
                <h4 className="text-white font-semibold text-lg mb-4">
                  {locale === 'es' ? 'Actividades Tradicionales:' : 'Traditional Activities:'}
                </h4>
                <ul className="space-y-3">
                  {t.traditions.activities.map((activity, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* What to Visit Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">{t.visit.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.visit.places.map((place, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all"
              >
                <CardContent className="p-6">
                  <h3 className="text-white font-bold text-lg mb-2">{place.name}</h3>
                  <p className="text-white/70 mb-3">{place.description}</p>
                  <div className="flex items-center gap-2 text-amber-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{place.hours}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Location Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-3xl flex items-center gap-3">
                <MapPin className="w-8 h-8 text-amber-400" />
                {t.location.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 text-lg leading-relaxed mb-4">
                {t.location.description}
              </p>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/70 text-sm mb-1">
                  {locale === 'es' ? 'Coordenadas:' : 'Coordinates:'}
                </p>
                <p className="text-white font-mono">{t.location.coordinates}</p>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  )
}
