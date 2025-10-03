'use client'

import { use } from 'react'
import { Locale } from '@/lib/i18n'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Users, Heart, Sparkles, Globe, Target } from 'lucide-react'

interface AboutPageProps {
  params: Promise<{ lang: Locale }>
}

export default function AboutPage({ params }: AboutPageProps) {
  const { lang } = use(params)

  const content = {
    es: {
      title: 'Sobre Nosotros',
      subtitle: 'Tu guía confiable para descubrir la magia de Tepoztlán',
      mission: {
        title: 'Nuestra Misión',
        description: 'Conectar a viajeros con las mejores experiencias, alojamientos y restaurantes de Tepoztlán, preservando la autenticidad y promoviendo el turismo sostenible en este Pueblo Mágico.',
      },
      story: {
        title: 'Nuestra Historia',
        description: 'Nacidos del amor por Tepoztlán y su rica herencia cultural, creamos esta plataforma para compartir las joyas escondidas y experiencias auténticas que hacen de este lugar un destino único en México.',
      },
      values: {
        title: 'Nuestros Valores',
        items: [
          {
            icon: Heart,
            title: 'Autenticidad',
            description: 'Promovemos experiencias genuinas y negocios locales',
          },
          {
            icon: Sparkles,
            title: 'Calidad',
            description: 'Seleccionamos cuidadosamente cada recomendación',
          },
          {
            icon: Users,
            title: 'Comunidad',
            description: 'Apoyamos a la comunidad local y su desarrollo',
          },
          {
            icon: Globe,
            title: 'Sostenibilidad',
            description: 'Fomentamos un turismo responsable y consciente',
          },
        ],
      },
      what: {
        title: 'Qué Ofrecemos',
        items: [
          '150+ negocios locales verificados',
          'Guías detalladas de experiencias y actividades',
          'Información actualizada sobre eventos y festivales',
          'Mapas interactivos y direcciones',
          'Recomendaciones personalizadas',
          'Contenido en español e inglés',
        ],
      },
      contact: {
        title: '¿Tienes preguntas?',
        description: 'Estamos aquí para ayudarte. Contáctanos en:',
        email: 'info@tepoztlan.com',
      },
    },
    en: {
      title: 'About Us',
      subtitle: 'Your trusted guide to discover the magic of Tepoztlán',
      mission: {
        title: 'Our Mission',
        description: 'Connect travelers with the best experiences, accommodations, and restaurants in Tepoztlán, preserving authenticity and promoting sustainable tourism in this Magical Town.',
      },
      story: {
        title: 'Our Story',
        description: 'Born from a love for Tepoztlán and its rich cultural heritage, we created this platform to share the hidden gems and authentic experiences that make this place a unique destination in Mexico.',
      },
      values: {
        title: 'Our Values',
        items: [
          {
            icon: Heart,
            title: 'Authenticity',
            description: 'We promote genuine experiences and local businesses',
          },
          {
            icon: Sparkles,
            title: 'Quality',
            description: 'We carefully select every recommendation',
          },
          {
            icon: Users,
            title: 'Community',
            description: 'We support the local community and its development',
          },
          {
            icon: Globe,
            title: 'Sustainability',
            description: 'We encourage responsible and conscious tourism',
          },
        ],
      },
      what: {
        title: 'What We Offer',
        items: [
          '150+ verified local businesses',
          'Detailed guides to experiences and activities',
          'Updated information on events and festivals',
          'Interactive maps and directions',
          'Personalized recommendations',
          'Content in Spanish and English',
        ],
      },
      contact: {
        title: 'Have questions?',
        description: 'We are here to help. Contact us at:',
        email: 'info@tepoztlan.com',
      },
    },
  }

  const t = content[lang]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
        <div className="absolute inset-0 bg-[url('/images/tepoztlan-pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <MapPin className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">{t.title}</h1>
            <p className="text-xl opacity-90">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Mission */}
        <Card className="mb-8 border-2 border-orange-200 dark:border-orange-900">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <Target className="w-12 h-12 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {t.mission.title}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t.mission.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Story */}
        <Card className="mb-8 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t.story.title}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.story.description}
            </p>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            {t.values.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.values.items.map((value, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800"
              >
                <CardContent className="p-6">
                  <value.icon className="w-10 h-10 text-orange-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* What We Offer */}
        <Card className="mb-8 border-2 border-orange-200 dark:border-orange-900">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {t.what.title}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.what.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">{t.contact.title}</h2>
            <p className="text-xl mb-4 opacity-90">{t.contact.description}</p>
            <a
              href={`mailto:${t.contact.email}`}
              className="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-300"
            >
              {t.contact.email}
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
