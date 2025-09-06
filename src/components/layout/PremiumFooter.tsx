import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  MapPin, 
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

const businessLinks = {
  es: [
    { name: 'Restaurantes', href: '/es/eat/restaurants' },
    { name: 'Hospedajes', href: '/es/stay' },
    { name: 'Bares y Cantinas', href: '/es/eat/bars' },
    { name: 'Tours', href: '/es/experience/tours' },
    { name: 'Mercados', href: '/es/events/markets' },
    { name: 'Senderismo', href: '/es/experience/hiking' }
  ],
  en: [
    { name: 'Restaurants', href: '/en/eat/restaurants' },
    { name: 'Accommodations', href: '/en/stay' },
    { name: 'Bars & Cantinas', href: '/en/eat/bars' },
    { name: 'Tours', href: '/en/experience/tours' },
    { name: 'Markets', href: '/en/events/markets' },
    { name: 'Hiking', href: '/en/experience/hiking' }
  ]
}

const businessOwnerLinks = {
  es: [
    { name: 'Registrar Negocio', href: '/es/business' },
    { name: 'Panel de Control', href: '/es/user' },
    { name: 'Promocionar', href: '/es/business' },
    { name: 'Estadísticas', href: '/es/user' },
    { name: 'Soporte', href: '/es/info' }
  ],
  en: [
    { name: 'Register Business', href: '/en/business' },
    { name: 'Dashboard', href: '/en/user' },
    { name: 'Promote', href: '/en/business' },
    { name: 'Analytics', href: '/en/user' },
    { name: 'Support', href: '/en/info' }
  ]
}

const features = [
  { icon: Star, labelEs: '500+ Negocios', labelEn: '500+ Businesses' },
  { icon: Award, labelEs: 'Información Verificada', labelEn: 'Verified Information' },
  { icon: Shield, labelEs: 'Plataforma Segura', labelEn: 'Secure Platform' },
  { icon: Heart, labelEs: 'Comunidad Local', labelEn: 'Local Community' }
]

export default function PremiumFooter({ lang }: PremiumFooterProps) {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      {/* Ultra Premium Background */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-sky-500/10 rounded-full blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Premium mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_transparent,_rgba(59,130,246,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(14,165,233,0.2))]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
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
                  <span className="font-bold text-xl">
                    <span className="text-cyan-400">TODO</span>
                    <span className="text-white">TEPOZ</span>
                  </span>
                  <div className="text-sm text-white/60">
                    {lang === 'es' ? 'Directorio de Negocios' : 'Business Directory'}
                  </div>
                </div>
              </Link>
              
              <p className="text-white/70 mb-6 leading-relaxed">
                {lang === 'es' 
                  ? 'El directorio más completo de negocios locales en Tepoztlán. Conectamos visitantes con los mejores servicios.'
                  : 'The most complete local business directory in Tepoztlán. Connecting visitors with the best services.'
                }
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span className="text-white/70">Tepoztlán, Morelos, México</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span className="text-white/70">todotepoz@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span className="text-white/70">
                    {lang === 'es' ? 'Disponible 24/7' : 'Available 24/7'}
                  </span>
                </div>
              </div>
            </div>

            {/* Business Categories */}
            <div>
              <h3 className="font-bold text-lg mb-6 font-sans text-white">
                {lang === 'es' ? 'Categorías' : 'Categories'}
              </h3>
              <ul className="space-y-3">
                {businessLinks[lang].map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-white/70 hover:text-cyan-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Business Owners */}
            <div>
              <h3 className="font-bold text-lg mb-6 font-sans text-white">
                {lang === 'es' ? 'Para Negocios' : 'For Businesses'}
              </h3>
              <ul className="space-y-3">
                {businessOwnerLinks[lang].map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-white/70 hover:text-cyan-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div>
              <h3 className="font-bold text-lg mb-6 font-sans text-white">
                {lang === 'es' ? 'Mantente Conectado' : 'Stay Connected'}
              </h3>
              
              {/* Newsletter */}
              <div className="mb-6">
                <p className="text-white/70 text-sm mb-4">
                  {lang === 'es' 
                    ? 'Recibe noticias de nuevos negocios y ofertas especiales'
                    : 'Get news about new businesses and special offers'
                  }
                </p>
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder={lang === 'es' ? 'tu@email.com' : 'your@email.com'}
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-cyan-400 focus:bg-white/15"
                  />
                  <Button className="bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-500 hover:to-blue-500 text-white border-0 shadow-xl">
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
                        className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-400 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl"
                      >
                        <Icon className="w-4 h-4" />
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Features Banner with Glassmorphism */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 mt-12 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.labelEn} className="flex items-center space-x-3 text-sm group">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white/90 font-medium">
                      {lang === 'es' ? feature.labelEs : feature.labelEn}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar with Glassmorphism */}
        <div className="bg-white/5 backdrop-blur-sm border-t border-white/10 mt-8">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-white/60 text-sm">
                © 2025 TODOTEPOZ. 
                {lang === 'es' 
                  ? ' Todos los derechos reservados.' 
                  : ' All rights reserved.'
                }
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-white/60">
                <span>
                  {lang === 'es' 
                    ? 'Hecho con ❤️ para Tepoztlán'
                    : 'Made with ❤️ for Tepoztlán'
                  }
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-white/80">4.9/5 • 500+ negocios</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}