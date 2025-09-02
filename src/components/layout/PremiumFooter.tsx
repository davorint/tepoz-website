import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Star,
  Award,
  Shield,
  Heart
} from 'lucide-react'
import { Locale } from '@/lib/i18n'

interface PremiumFooterProps {
  lang: Locale
}

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/tepoztlan', icon: Facebook },
  { name: 'Instagram', href: 'https://instagram.com/tepoztlan', icon: Instagram },
  { name: 'Twitter', href: 'https://twitter.com/tepoztlan', icon: Twitter },
  { name: 'YouTube', href: 'https://youtube.com/tepoztlan', icon: Youtube },
]

const quickLinks = {
  es: [
    { name: 'Inicio', href: '/es' },
    { name: 'Descubre', href: '/es/descubre' },
    { name: 'Hospedaje', href: '/es/hospedaje' },
    { name: 'Restaurantes', href: '/es/comer' },
    { name: 'Eventos', href: '/es/eventos' },
    { name: 'Mapa', href: '/es/mapa' }
  ],
  en: [
    { name: 'Home', href: '/en' },
    { name: 'Discover', href: '/en/discover' },
    { name: 'Stay', href: '/en/stay' },
    { name: 'Eat', href: '/en/eat' },
    { name: 'Events', href: '/en/events' },
    { name: 'Map', href: '/en/map' }
  ]
}

const supportLinks = {
  es: [
    { name: 'Centro de Ayuda', href: '/es/ayuda' },
    { name: 'Contacto', href: '/es/contacto' },
    { name: 'Términos', href: '/es/terminos' },
    { name: 'Privacidad', href: '/es/privacidad' },
    { name: 'Cookies', href: '/es/cookies' }
  ],
  en: [
    { name: 'Help Center', href: '/en/help' },
    { name: 'Contact', href: '/en/contact' },
    { name: 'Terms', href: '/en/terms' },
    { name: 'Privacy', href: '/en/privacy' },
    { name: 'Cookies', href: '/en/cookies' }
  ]
}

const features = [
  { icon: Star, labelEs: 'Calidad Premium', labelEn: 'Premium Quality' },
  { icon: Award, labelEs: 'Pueblo Mágico', labelEn: 'Magical Town' },
  { icon: Shield, labelEs: 'Seguro y Confiable', labelEn: 'Safe & Trusted' },
  { icon: Heart, labelEs: 'Hecho con Amor', labelEn: 'Made with Love' }
]

export default function PremiumFooter({ lang }: PremiumFooterProps) {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-tepoztlan-sunset/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-tepoztlan-earth/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link href={`/${lang}`} className="flex items-center space-x-3 mb-6">
                <div className="h-12 w-12 bg-gradient-to-br from-tepoztlan-sunset to-tepoztlan-earth rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <div>
                  <span className="font-bold text-xl">Tepoztlán</span>
                  <div className="text-sm text-gray-400">
                    {lang === 'es' ? 'Pueblo Mágico' : 'Magical Town'}
                  </div>
                </div>
              </Link>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {lang === 'es' 
                  ? 'Tu guía completa para descubrir la magia, cultura y belleza natural de Tepoztlán, Morelos.'
                  : 'Your complete guide to discover the magic, culture and natural beauty of Tepoztlán, Morelos.'
                }
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-tepoztlan-sunset" />
                  <span className="text-gray-300">Tepoztlán, Morelos, México</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-tepoztlan-sunset" />
                  <span className="text-gray-300">+52 (777) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-tepoztlan-sunset" />
                  <span className="text-gray-300">hola@tepoztlan.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-tepoztlan-sunset" />
                  <span className="text-gray-300">
                    {lang === 'es' ? 'Disponible 24/7' : 'Available 24/7'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-6">
                {lang === 'es' ? 'Enlaces Rápidos' : 'Quick Links'}
              </h3>
              <ul className="space-y-3">
                {quickLinks[lang].map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-gray-300 hover:text-tepoztlan-sunset transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-bold text-lg mb-6">
                {lang === 'es' ? 'Soporte' : 'Support'}
              </h3>
              <ul className="space-y-3">
                {supportLinks[lang].map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-gray-300 hover:text-tepoztlan-sunset transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div>
              <h3 className="font-bold text-lg mb-6">
                {lang === 'es' ? 'Mantente Conectado' : 'Stay Connected'}
              </h3>
              
              {/* Newsletter */}
              <div className="mb-6">
                <p className="text-gray-300 text-sm mb-4">
                  {lang === 'es' 
                    ? 'Recibe las mejores ofertas y noticias'
                    : 'Get the best deals and news'
                  }
                </p>
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder={lang === 'es' ? 'tu@email.com' : 'your@email.com'}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-tepoztlan-sunset"
                  />
                  <Button className="bg-tepoztlan-sunset hover:bg-tepoztlan-sunset/90">
                    {lang === 'es' ? 'Suscribir' : 'Subscribe'}
                  </Button>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="font-semibold mb-4">
                  {lang === 'es' ? 'Síguenos' : 'Follow Us'}
                </h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <Link
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-800 hover:bg-tepoztlan-sunset rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                      >
                        <Icon className="w-4 h-4" />
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Features Banner */}
          <div className="border-t border-gray-800 pt-8 mt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.labelEn} className="flex items-center space-x-2 text-sm">
                    <Icon className="w-4 h-4 text-tepoztlan-sunset" />
                    <span className="text-gray-300">
                      {lang === 'es' ? feature.labelEs : feature.labelEn}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Tepoztlán Directory. 
                {lang === 'es' 
                  ? ' Todos los derechos reservados.' 
                  : ' All rights reserved.'
                }
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span>
                  {lang === 'es' 
                    ? 'Hecho con ❤️ para Tepoztlán'
                    : 'Made with ❤️ for Tepoztlán'
                  }
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>4.9/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}