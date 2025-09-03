'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ClientOnly from '@/components/ui/client-only'
import { 
  Calendar, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Users, 
  Star,
  ChevronRight,
  Send
} from 'lucide-react'
import { Locale } from '@/lib/i18n'

interface InteractiveCTASectionProps {
  lang: Locale
}

const quickActions = [
  {
    id: 'booking',
    icon: Calendar,
    titleEs: 'Reservar Ahora',
    titleEn: 'Book Now',
    descEs: 'Asegura tu hospedaje con descuentos exclusivos',
    descEn: 'Secure your accommodation with exclusive discounts',
    color: 'bg-gradient-to-r from-blue-500 to-blue-600',
    hoverColor: 'hover:from-blue-600 hover:to-blue-700'
  },
  {
    id: 'chat',
    icon: MessageCircle,
    titleEs: 'Chat en Vivo',
    titleEn: 'Live Chat',
    descEs: 'Obtén ayuda instantánea de expertos locales',
    descEn: 'Get instant help from local experts',
    color: 'bg-gradient-to-r from-green-500 to-green-600',
    hoverColor: 'hover:from-green-600 hover:to-green-700'
  },
  {
    id: 'call',
    icon: Phone,
    titleEs: 'Llamar',
    titleEn: 'Call Us',
    descEs: 'Habla directamente con nuestros asesores',
    descEn: 'Speak directly with our advisors',
    color: 'bg-gradient-to-r from-purple-500 to-purple-600',
    hoverColor: 'hover:from-purple-600 hover:to-purple-700'
  }
]

const features = [
  {
    icon: MapPin,
    titleEs: 'Ubicación Premium',
    titleEn: 'Premium Location',
    descEs: 'Centro histórico de Tepoztlán'
  },
  {
    icon: Clock,
    titleEs: 'Disponible 24/7',
    titleEn: 'Available 24/7',
    descEs: 'Asistencia en todo momento'
  },
  {
    icon: Users,
    titleEs: 'Guías Expertos',
    titleEn: 'Expert Guides',
    descEs: 'Conocimiento local auténtico'
  },
  {
    icon: Star,
    titleEs: 'Servicio 5 Estrellas',
    titleEn: '5-Star Service',
    descEs: 'Experiencias inolvidables'
  }
]

export default function InteractiveCTASection({ lang }: InteractiveCTASectionProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setEmail('')
    
    // Show success message (could be implemented with toast)
    alert(lang === 'es' ? '¡Suscripción exitosa!' : 'Successfully subscribed!')
  }

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gray-100/50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <ClientOnly fallback={
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent">
                {lang === 'es' ? 'Planea tu Visita Perfecta' : 'Plan Your Perfect Visit'}
              </h2>
              <p className="text-xl text-gray-800 max-w-3xl mx-auto">
                {lang === 'es' 
                  ? 'Todo lo que necesitas para una experiencia inolvidable en Tepoztlán está a un clic de distancia'
                  : 'Everything you need for an unforgettable experience in Tepoztlán is just a click away'
                }
              </p>
            </div>
          }>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent">
                {lang === 'es' ? 'Planea tu Visita Perfecta' : 'Plan Your Perfect Visit'}
              </h2>
              <p className="text-xl text-gray-800 max-w-3xl mx-auto">
                {lang === 'es' 
                  ? 'Todo lo que necesitas para una experiencia inolvidable en Tepoztlán está a un clic de distancia'
                  : 'Everything you need for an unforgettable experience in Tepoztlán is just a click away'
                }
              </p>
            </motion.div>
          </ClientOnly>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Quick Actions */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {lang === 'es' ? 'Acciones Rápidas' : 'Quick Actions'}
            </h3>
            
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <ClientOnly key={action.id} fallback={
                  <Button
                    className={`w-full h-auto p-6 text-left ${action.color} ${action.hoverColor} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300`}
                    onClick={() => {
                      // Handle different actions
                      switch(action.id) {
                        case 'booking':
                          window.open('https://booking.com', '_blank')
                          break
                        case 'chat':
                          // Open chat widget
                          alert(lang === 'es' ? 'Chat iniciado' : 'Chat started')
                          break
                        case 'call':
                          window.location.href = 'tel:+527731234567'
                          break
                      }
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-lg mb-1">
                          {lang === 'es' ? action.titleEs : action.titleEn}
                        </div>
                        <div className="text-white text-sm">
                          {lang === 'es' ? action.descEs : action.descEn}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </Button>
                }>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className={`w-full h-auto p-6 text-left ${action.color} ${action.hoverColor} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300`}
                      onClick={() => {
                        // Handle different actions
                        switch(action.id) {
                          case 'booking':
                            window.open('https://booking.com', '_blank')
                            break
                          case 'chat':
                            // Open chat widget
                            alert(lang === 'es' ? 'Chat iniciado' : 'Chat started')
                            break
                          case 'call':
                            window.location.href = 'tel:+527731234567'
                            break
                        }
                      }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-lg mb-1">
                            {lang === 'es' ? action.titleEs : action.titleEn}
                          </div>
                          <div className="text-white text-sm">
                            {lang === 'es' ? action.descEs : action.descEn}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </Button>
                  </motion.div>
                </ClientOnly>
              )
            })}
          </div>

          {/* Newsletter & Features */}
          <div className="space-y-8">
            {/* Premium Newsletter */}
            <Card className="border-0 bg-white/95 backdrop-blur-md shadow-xl border border-gray-200/30">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {lang === 'es' ? 'Experiencias VIP' : 'VIP Experiences'}
                  </h3>
                  <p className="text-gray-700">
                    {lang === 'es' 
                      ? 'Suscríbete y accede a ofertas exclusivas y contenido premium'
                      : 'Subscribe and access exclusive offers and premium content'
                    }
                  </p>
                </div>
                
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={lang === 'es' ? 'tu@email.com' : 'your@email.com'}
                      className="pl-10 h-12 border-2 border-gray-200 focus:border-tepoztlan-sunset"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-tepoztlan-sunset hover:bg-tepoztlan-sunset/90 text-white font-semibold"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{lang === 'es' ? 'Suscribiendo...' : 'Subscribing...'}</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="w-4 h-4" />
                        <span>{lang === 'es' ? 'Suscribirse' : 'Subscribe'}</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <ClientOnly key={feature.titleEn} fallback={
                    <Card className="border-0 bg-white/90 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/20">
                      <CardContent className="p-4 text-center">
                        <div className="w-10 h-10 bg-tepoztlan-sunset/10 text-tepoztlan-sunset rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="font-semibold text-sm text-gray-900 mb-1">
                          {lang === 'es' ? feature.titleEs : feature.titleEn}
                        </div>
                        <div className="text-xs text-gray-700">
                          {lang === 'es' ? feature.descEs : feature.titleEn}
                        </div>
                      </CardContent>
                    </Card>
                  }>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Card className="border-0 bg-white/90 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/20">
                        <CardContent className="p-4 text-center">
                          <div className="w-10 h-10 bg-tepoztlan-sunset/10 text-tepoztlan-sunset rounded-lg flex items-center justify-center mx-auto mb-3">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="font-semibold text-sm text-gray-900 mb-1">
                            {lang === 'es' ? feature.titleEs : feature.titleEn}
                          </div>
                          <div className="text-xs text-gray-700">
                            {lang === 'es' ? feature.descEs : feature.titleEn}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </ClientOnly>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <ClientOnly fallback={
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-tepoztlan-sunset to-tepoztlan-earth text-white rounded-full text-sm font-medium shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              {lang === 'es' ? 'Más de 10,000 experiencias exitosas' : 'Over 10,000 successful experiences'}
            </div>
          }>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-tepoztlan-sunset to-tepoztlan-earth text-white rounded-full text-sm font-medium shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                {lang === 'es' ? 'Más de 10,000 experiencias exitosas' : 'Over 10,000 successful experiences'}
              </div>
            </motion.div>
          </ClientOnly>
        </div>
      </div>
    </section>
  )
}