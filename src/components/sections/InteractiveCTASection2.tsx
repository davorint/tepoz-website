import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Sparkles,
  ArrowRight,
  Globe,
  Users,
  Star,
  MapPin,
  Clock,
  Mail,
  Heart,
  TrendingUp
} from 'lucide-react'
import { Locale } from '@/lib/i18n'

interface InteractiveCTASection2Props {
  lang: Locale
}

const mainFeatures = [
  {
    id: 'discover',
    icon: Globe,
    titleEs: 'Descubre Tepoztlán',
    titleEn: 'Discover Tepoztlán',
    descEs: 'Explora restaurantes, hoteles, actividades y más',
    descEn: 'Explore restaurants, hotels, activities and more',
    gradient: 'from-emerald-400 via-teal-400 to-cyan-400',
    stats: '500+',
    statsLabel: 'negocios'
  },
  {
    id: 'connect',
    icon: Users,
    titleEs: 'Conecta con Locales',
    titleEn: 'Connect with Locals',
    descEs: 'Encuentra recomendaciones auténticas de la comunidad',
    descEn: 'Find authentic recommendations from the community',
    gradient: 'from-violet-400 via-purple-400 to-indigo-400',
    stats: '2.5K',
    statsLabel: 'reseñas'
  },
  {
    id: 'experience',
    icon: Heart,
    titleEs: 'Vive Experiencias',
    titleEn: 'Live Experiences',
    descEs: 'Reserva tours, actividades y eventos únicos',
    descEn: 'Book tours, activities and unique events',
    gradient: 'from-rose-400 via-pink-400 to-fuchsia-400',
    stats: '4.9',
    statsLabel: 'calificación'
  }
]

const quickStats = [
  { icon: MapPin, value: '15+', label: 'Categorías', labelEn: 'Categories' },
  { icon: Clock, value: '24/7', label: 'Disponible', labelEn: 'Available' },
  { icon: Star, value: '98%', label: 'Satisfacción', labelEn: 'Satisfaction' },
  { icon: TrendingUp, value: '50K+', label: 'Visitantes', labelEn: 'Visitors' }
]

export default function InteractiveCTASection2({ lang }: InteractiveCTASection2Props) {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-gray-50 to-white dark:from-indigo-900 dark:via-blue-900 dark:to-indigo-900 relative overflow-hidden">
      {/* Modern background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/50 to-purple-100/30 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-100/40 to-teal-100/30 dark:from-emerald-500/10 dark:to-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-violet-100/30 to-pink-100/20 dark:from-violet-500/5 dark:to-pink-500/5 rounded-full blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Clean modern header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'es' ? 'Directorio Completo' : 'Complete Directory'}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            {lang === 'es' ? 'Todo lo que Necesitas' : 'Everything You Need'}
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {lang === 'es' ? 'en un Solo Lugar' : 'in One Place'}
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {lang === 'es' 
              ? 'La plataforma más completa para descubrir, conectar y disfrutar todo lo que Tepoztlán tiene para ofrecer'
              : 'The most complete platform to discover, connect and enjoy everything Tepoztlán has to offer'
            }
          </p>
        </div>

        {/* Main feature cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.id} className="group relative">
                {/* Card glow effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500`} />
                
                <Card className="relative bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 rounded-2xl overflow-hidden group-hover:bg-white/90 dark:group-hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-8">
                    {/* Icon with gradient background */}
                    <div className="relative mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      {/* Stats badge */}
                      <div className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">{feature.stats}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{feature.statsLabel}</div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {lang === 'es' ? feature.titleEs : feature.titleEn}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {lang === 'es' ? feature.descEs : feature.descEn}
                    </p>

                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-gray-50 dark:group-hover:bg-white/5 border-gray-300 dark:border-gray-600"
                    >
                      {lang === 'es' ? 'Explorar' : 'Explore'}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Newsletter signup */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-3xl p-8 md:p-12 text-white mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-3xl font-bold mb-4">
              {lang === 'es' ? 'Mantente Conectado' : 'Stay Connected'}
            </h3>
            
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              {lang === 'es' 
                ? 'Recibe las mejores ofertas, eventos y novedades directamente en tu correo'
                : 'Get the best offers, events and news directly in your inbox'
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder={lang === 'es' ? 'tu@email.com' : 'your@email.com'}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:bg-white/20 focus:border-white/40 focus:outline-none backdrop-blur-sm"
                />
              </div>
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl font-semibold whitespace-nowrap">
                {lang === 'es' ? 'Suscribirse' : 'Subscribe'}
              </Button>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {lang === 'es' ? stat.label : stat.labelEn}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}