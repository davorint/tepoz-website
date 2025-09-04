import { Users, Star, MapPin, Calendar, TrendingUp, Award, Heart, Clock } from 'lucide-react'
import { Locale } from '@/lib/i18n'

interface FloatingStatsSectionProps {
  lang: Locale
}

const stats = [
  {
    id: 'businesses',
    icon: MapPin,
    value: '500',
    suffix: '+',
    label: 'Negocios Registrados',
    labelEn: 'Registered Businesses',
    gradient: 'from-blue-400 to-cyan-400',
    glowColor: 'blue',
    trend: '+25%',
    trendLabel: 'crecimiento anual',
    trendLabelEn: 'annual growth'
  },
  {
    id: 'rating',
    icon: Star,
    value: '4.8',
    suffix: '/5',
    label: 'Calificación Promedio',
    labelEn: 'Average Rating',
    gradient: 'from-yellow-400 to-amber-400',
    glowColor: 'yellow',
    trend: '⭐⭐⭐⭐⭐',
    trendLabel: '98% recomiendan',
    trendLabelEn: '98% recommend'
  },
  {
    id: 'categories',
    icon: Users,
    value: '15',
    suffix: '+',
    label: 'Categorías de Negocios',
    labelEn: 'Business Categories',
    gradient: 'from-emerald-400 to-teal-400',
    glowColor: 'emerald',
    trend: '📈',
    trendLabel: 'en expansión',
    trendLabelEn: 'expanding'
  },
  {
    id: 'reviews',
    icon: Calendar,
    value: '2,500',
    suffix: '+',
    label: 'Reseñas Verificadas',
    labelEn: 'Verified Reviews',
    gradient: 'from-purple-400 to-pink-400',
    glowColor: 'purple',
    trend: '📝',
    trendLabel: 'este mes',
    trendLabelEn: 'this month'
  }
]

const additionalStats = [
  {
    icon: Heart,
    value: '10K+',
    label: 'Usuarios Activos',
    labelEn: 'Active Users'
  },
  {
    icon: Clock,
    value: '24/7',
    label: 'Soporte',
    labelEn: 'Support'
  },
  {
    icon: Award,
    value: '#1',
    label: 'Directorio Local',
    labelEn: 'Local Directory'
  },
  {
    icon: TrendingUp,
    value: '50K+',
    label: 'Visitas Mensuales',
    labelEn: 'Monthly Visits'
  }
]

export default function FloatingStatsSection({ lang }: FloatingStatsSectionProps) {
  return (
    <section className="py-32 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Ultra Premium animated background */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-[30rem] h-[30rem] bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[35rem] h-[35rem] bg-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-sky-500/10 rounded-full blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
        
        {/* Premium mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_transparent,_rgba(59,130,246,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(14,165,233,0.2))]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Ultra Premium Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-400" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 blur-md" />
              <div className="relative bg-gradient-to-r from-blue-400 to-cyan-400 text-white px-8 py-3 rounded-full text-sm font-semibold tracking-wider uppercase">
                {lang === 'es' ? '📊 Estadísticas del Directorio' : '📊 Directory Statistics'}
              </div>
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-white drop-shadow-2xl">
              {lang === 'es' ? 'Nuestro Directorio en' : 'Our Directory by'}
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-sky-300 bg-clip-text text-transparent drop-shadow-2xl">
              {lang === 'es' ? 'Números' : 'Numbers'}
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed">
            {lang === 'es' 
              ? 'La plataforma líder para conectar negocios y visitantes en Tepoztlán'
              : 'The leading platform connecting businesses and visitors in Tepoztlán'
            }
          </p>
        </div>

        {/* Ultra Premium Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div 
                key={stat.id} 
                className="group relative animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700 rounded-3xl`} />
                
                {/* Glassmorphism card */}
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl hover:shadow-3xl overflow-hidden transform-gpu transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/15">
                  
                  {/* Top accent bar */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.gradient} opacity-80 group-hover:h-2 transition-all duration-500`} />
                  
                  <div className="p-8">
                    {/* Icon with glow */}
                    <div className="relative mb-6">
                      <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-all duration-500 animate-pulse`} />
                      <div className="relative w-20 h-20 mx-auto">
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-2xl opacity-20 rotate-6 group-hover:rotate-12 transition-all duration-500`} />
                        <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center h-full border border-white/20 group-hover:border-white/30">
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Counter with premium styling */}
                    <div className="text-center mb-4">
                      <div className="relative inline-block">
                        <span className={`text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent drop-shadow-lg`}>
                          {stat.value}
                        </span>
                        <span className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent ml-1`}>
                          {stat.suffix}
                        </span>
                      </div>
                    </div>
                    
                    {/* Label */}
                    <div className="text-center mb-4">
                      <p className="text-white/90 font-medium text-lg">
                        {lang === 'es' ? stat.label : stat.labelEn}
                      </p>
                    </div>
                    
                    {/* Trend indicator */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg">{stat.trend}</span>
                        <span className="text-xs text-white/60 font-light">
                          {lang === 'es' ? stat.trendLabel : stat.trendLabelEn}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional mini stats */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {additionalStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div 
                  key={index} 
                  className="text-center group animate-fade-in-up"
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60">
                    {lang === 'es' ? stat.label : stat.labelEn}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Premium CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 backdrop-blur-sm border border-white/20 rounded-full text-white">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse" />
            <span className="font-medium">
              {lang === 'es' ? 'Datos actualizados en tiempo real' : 'Real-time updated data'}
            </span>
            <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse animation-delay-1s" />
          </div>
        </div>
      </div>
    </section>
  )
}