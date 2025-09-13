import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
  Sparkles,
  Shield,
  Award,
  Zap
} from 'lucide-react'
import { Locale } from '@/lib/i18n'

interface InteractiveCTASectionProps {
  lang: Locale
}

const quickActions = [
  {
    id: 'register',
    icon: Calendar,
    titleEs: 'Registra tu Negocio',
    titleEn: 'Register Your Business',
    descEs: 'Únete al directorio líder de Tepoztlán',
    descEn: 'Join Tepoztlán\'s leading directory',
    gradient: 'from-blue-400 to-cyan-400',
    shadowColor: 'shadow-blue-500/20',
    badge: 'GRATIS',
    badgeColor: 'bg-blue-500'
  },
  {
    id: 'explore',
    icon: MessageCircle,
    titleEs: 'Explorar Negocios',
    titleEn: 'Explore Businesses',
    descEs: 'Encuentra los mejores lugares y servicios',
    descEn: 'Find the best places and services',
    gradient: 'from-emerald-400 to-green-400',
    shadowColor: 'shadow-green-500/20',
    badge: '500+',
    badgeColor: 'bg-green-500'
  },
  {
    id: 'contact',
    icon: Phone,
    titleEs: 'Contactar Negocios',
    titleEn: 'Contact Businesses',
    descEs: 'Conecta directamente con propietarios',
    descEn: 'Connect directly with owners',
    gradient: 'from-purple-400 to-pink-400',
    shadowColor: 'shadow-purple-500/20',
    badge: 'Directo',
    badgeColor: 'bg-purple-500'
  }
]

const features = [
  {
    icon: MapPin,
    titleEs: 'Mapa Interactivo',
    titleEn: 'Interactive Map',
    descEs: 'Localiza negocios',
    gradient: 'from-orange-400 to-red-400'
  },
  {
    icon: Clock,
    titleEs: 'Horarios Actualizados',
    titleEn: 'Updated Hours',
    descEs: 'En tiempo real',
    gradient: 'from-blue-400 to-purple-400'
  },
  {
    icon: Users,
    titleEs: 'Reseñas Verificadas',
    titleEn: 'Verified Reviews',
    descEs: 'Opiniones reales',
    gradient: 'from-green-400 to-teal-400'
  },
  {
    icon: Star,
    titleEs: 'Negocios Premium',
    titleEn: 'Premium Businesses',
    descEs: 'Los mejores',
    gradient: 'from-yellow-400 to-orange-400'
  }
]

const premiumBenefits = [
  {
    icon: Shield,
    text: 'Información Verificada',
    textEn: 'Verified Information'
  },
  {
    icon: Award,
    text: 'Negocios Certificados',
    textEn: 'Certified Businesses'
  },
  {
    icon: Zap,
    text: 'Búsqueda Instantánea',
    textEn: 'Instant Search'
  },
  {
    icon: Sparkles,
    text: 'Ofertas Exclusivas',
    textEn: 'Exclusive Deals'
  }
]

export default function InteractiveCTASection({ lang }: InteractiveCTASectionProps) {
  return (
    <section className="py-32 px-4 bg-gradient-to-br from-white via-gray-25/5 to-white dark:from-indigo-900 dark:via-blue-900 dark:to-indigo-900 relative overflow-hidden">
      {/* Ultra Premium animated background */}
      <div className="absolute inset-0">
        {/* Large animated orbs */}
        <div className="absolute top-10 left-10 w-[40rem] h-[40rem] bg-blue-500/1 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-[35rem] h-[35rem] bg-cyan-500/3 dark:bg-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-indigo-500/2 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L45 15L30 30L15 15L30 0z' fill='%233b82f6' fill-opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Premium mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent,_rgba(59,130,246,0.05)),radial-gradient(ellipse_at_bottom,_transparent,_rgba(14,165,233,0.05))]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Ultra Premium Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-cyan-300" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-300 blur-lg" />
              <Badge className="relative bg-gradient-to-r from-cyan-300 to-blue-300 text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                ✨ {lang === 'es' ? 'Directorio Premium' : 'Premium Directory'} ✨
              </Badge>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-blue-300" />
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-gray-700 dark:text-white drop-shadow-2xl">
              {lang === 'es' ? 'Conecta con' : 'Connect with'}
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 dark:from-cyan-300 dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent drop-shadow-2xl">
              {lang === 'es' ? 'Negocios Locales' : 'Local Businesses'}
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-500 dark:text-white/80 font-light max-w-3xl mx-auto leading-relaxed mb-8">
            {lang === 'es' 
              ? 'Tu puerta de entrada a los mejores negocios y servicios de Tepoztlán'
              : 'Your gateway to the best businesses and services in Tepoztlán'
            }
          </p>

          {/* Premium Benefits Bar */}
          <div className="flex flex-wrap justify-center gap-6">
            {premiumBenefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div 
                  key={index}
                  className="flex items-center gap-2 text-white/70 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="w-5 h-5 text-cyan-300" />
                  <span className="text-sm font-medium text-gray-500 dark:text-white/70">
                    {lang === 'es' ? benefit.text : benefit.textEn}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Ultra Premium Quick Actions */}
          <div className="space-y-6">
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-3xl font-bold text-gray-700 dark:text-white mb-3 font-sans">
                {lang === 'es' ? 'Acciones Rápidas' : 'Quick Actions'}
              </h3>
              <p className="text-gray-500 dark:text-white/60">
                {lang === 'es' ? 'Herramientas para explorar y conectar con negocios' : 'Tools to explore and connect with businesses'}
              </p>
            </div>
            
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <div
                  key={action.id}
                  className="group relative animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 rounded-2xl`} />
                  
                  {/* Glassmorphism button */}
                  <Button className="relative w-full h-auto p-8 text-left bg-white/40 dark:bg-white/10 backdrop-blur-xl border border-gray-200/20 dark:border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/60 dark:hover:bg-white/15 transition-all duration-500 group-hover:scale-[1.02] rounded-2xl">
                    {/* Premium Badge */}
                    <div className={`absolute top-4 right-4 ${action.badgeColor} text-white text-xs px-3 py-1 rounded-full font-semibold animate-pulse`}>
                      {action.badge}
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      {/* Ultra Premium Icon Container */}
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-r ${action.gradient} rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity`} />
                        <div className={`relative w-16 h-16 bg-gradient-to-r ${action.gradient} rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-bold text-xl text-gray-700 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-400 dark:group-hover:from-cyan-300 group-hover:to-blue-400 dark:group-hover:to-blue-300 transition-all">
                          {lang === 'es' ? action.titleEs : action.titleEn}
                        </div>
                        <div className="text-gray-500 dark:text-white/70 text-sm leading-relaxed">
                          {lang === 'es' ? action.descEs : action.descEn}
                        </div>
                      </div>
                      
                      <ChevronRight className="w-6 h-6 text-gray-300 dark:text-white/50 group-hover:text-gray-500 dark:group-hover:text-white group-hover:translate-x-2 transition-all" />
                    </div>
                  </Button>
                </div>
              )
            })}
          </div>

          {/* Ultra Premium Newsletter & Features */}
          <div className="space-y-8">
            {/* VIP Access Card */}
            <div className="relative group animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              {/* Card glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700 rounded-3xl" />
              
              {/* Glassmorphism card */}
              <Card className="relative bg-white/40 dark:bg-white/10 backdrop-blur-xl border border-gray-200/20 dark:border-white/20 shadow-xl hover:shadow-2xl rounded-3xl overflow-hidden">
                {/* Premium accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-400 opacity-80" />
                
                <CardContent className="p-10">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl mb-4 shadow-2xl">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3">
                      {lang === 'es' ? 'Acceso VIP' : 'VIP Access'}
                    </h3>
                    <p className="text-white/70">
                      {lang === 'es' 
                        ? 'Únete a nuestra lista exclusiva para ofertas premium'
                        : 'Join our exclusive list for premium offers'
                      }
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity" />
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 z-10" />
                        <input
                          type="email"
                          placeholder={lang === 'es' ? 'tu@email.com' : 'your@email.com'}
                          className="w-full pl-12 pr-4 h-14 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:bg-white/10 focus:border-amber-400 transition-all duration-300 focus:outline-none"
                        />
                      </div>
                    </div>
                    
                    <Button className="w-full h-14 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 transform hover:scale-[1.02]">
                      <div className="flex items-center justify-center space-x-3">
                        <Sparkles className="w-5 h-5" />
                        <span>{lang === 'es' ? 'Obtener Acceso VIP' : 'Get VIP Access'}</span>
                        <Sparkles className="w-5 h-5" />
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ultra Premium Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div 
                    key={feature.titleEn} 
                    className="group relative animate-fade-in-up"
                    style={{ animationDelay: `${500 + index * 100}ms` }}
                  >
                    {/* Feature glow */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500 rounded-2xl`} />
                    
                    {/* Glassmorphism feature card */}
                    <Card className="relative bg-white/8 backdrop-blur-xl border border-white/15 shadow-lg hover:shadow-xl rounded-2xl overflow-hidden group-hover:bg-white/12 transition-all duration-500">
                      <CardContent className="p-6 text-center">
                        <div className="relative mb-4">
                          <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity`} />
                          <div className={`relative w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                        </div>
                        <div className="font-bold text-white mb-1">
                          {lang === 'es' ? feature.titleEs : feature.titleEn}
                        </div>
                        <div className="text-xs text-white/60">
                          {lang === 'es' ? feature.descEs : feature.titleEn}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Ultra Premium Bottom CTA */}
        <div className="text-center mt-20">
          <div className="relative inline-flex items-center gap-4 px-10 py-5 group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
            
            {/* Button */}
            <div className="relative bg-gradient-to-r from-cyan-300/10 to-blue-300/10 backdrop-blur-xl border border-white/20 rounded-full px-10 py-5 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-3 h-3 bg-cyan-300 rounded-full animate-pulse" />
                  <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse animation-delay-1s" />
                  <div className="w-3 h-3 bg-indigo-300 rounded-full animate-pulse animation-delay-2s" />
                </div>
                <span className="text-white font-semibold text-lg">
                  {lang === 'es' ? 'Más de 10,000 experiencias exitosas' : 'Over 10,000 successful experiences'}
                </span>
                <Award className="w-6 h-6 text-amber-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}