'use client'

import { useState } from 'react'
import { Locale } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Clock, 
  Users, 
  Mountain, 
  TreePine, 
  Sunrise,
  ChevronRight,
  Play,
  Star
} from 'lucide-react'

interface TepoztlanOverviewClientProps {
  locale: Locale
}

export default function TepoztlanOverviewClient({ locale }: TepoztlanOverviewClientProps) {
  const [activeSection, setActiveSection] = useState('overview')

  const sections = [
    { id: 'overview', es: 'Visión General', en: 'Overview', icon: MapPin },
    { id: 'highlights', es: 'Destacados', en: 'Highlights', icon: Star },
    { id: 'geography', es: 'Geografía', en: 'Geography', icon: Mountain },
    { id: 'climate', es: 'Clima', en: 'Climate', icon: Sunrise }
  ]

  const highlights = [
    {
      title: { es: 'Pueblo Mágico', en: 'Magic Town' },
      description: { es: 'Designación oficial por su valor cultural', en: 'Official designation for cultural value' },
      icon: '🏛️'
    },
    {
      title: { es: 'Pirámide del Tepozteco', en: 'Tepozteco Pyramid' },
      description: { es: 'Sitio arqueológico prehispánico', en: 'Pre-Hispanic archaeological site' },
      icon: '⛰️'
    },
    {
      title: { es: 'Mercado Artesanal', en: 'Artisan Market' },
      description: { es: 'Tradiciones ancestrales vivas', en: 'Living ancestral traditions' },
      icon: '🎨'
    },
    {
      title: { es: 'Zona Energética', en: 'Energy Zone' },
      description: { es: 'Reconocido centro espiritual', en: 'Recognized spiritual center' },
      icon: '✨'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Ultra Premium Background */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-blue-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-indigo-500/10 rounded-full blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Premium mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_transparent,_rgba(16,185,129,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(59,130,246,0.2))]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Premium Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-emerald-400" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 blur-lg" />
              <Badge className="relative bg-gradient-to-r from-emerald-400 to-blue-400 text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                🏔️ {locale === 'es' ? 'Descubre Tepoztlán' : 'Discover Tepoztlán'} 🏔️
              </Badge>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-blue-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-white drop-shadow-2xl">
              {locale === 'es' ? 'Tepoztlán' : 'Tepoztlán'}
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-2xl">
              {locale === 'es' ? 'Pueblo Mágico' : 'Magic Town'}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-4xl mx-auto leading-relaxed mb-8">
            {locale === 'es' 
              ? 'Un destino místico donde la tradición prehispánica se encuentra con la modernidad, rodeado de montañas sagradas y energía ancestral.'
              : 'A mystical destination where pre-Hispanic tradition meets modernity, surrounded by sacred mountains and ancestral energy.'
            }
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-emerald-400 mb-2">1,200m</div>
              <div className="text-white/70 text-sm">{locale === 'es' ? 'Altitud' : 'Altitude'}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-blue-400 mb-2">14,000</div>
              <div className="text-white/70 text-sm">{locale === 'es' ? 'Habitantes' : 'Residents'}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-indigo-400 mb-2">1200</div>
              <div className="text-white/70 text-sm">{locale === 'es' ? 'Año Fundado' : 'Founded'}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-purple-400 mb-2">24°C</div>
              <div className="text-white/70 text-sm">{locale === 'es' ? 'Temp. Promedio' : 'Avg. Temp'}</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-12">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-2 shadow-2xl max-w-2xl mx-auto">
            <div className="flex flex-wrap gap-2">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all duration-300 ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-emerald-400 to-blue-400 text-white shadow-xl'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {locale === 'es' ? section.es : section.en}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-12 shadow-2xl">
              <h2 className="text-4xl font-bold text-white mb-8">
                {locale === 'es' ? 'Bienvenido a Tepoztlán' : 'Welcome to Tepoztlán'}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-white/80 text-lg leading-relaxed mb-6">
                    {locale === 'es'
                      ? 'Tepoztlán es un pueblo mágico ubicado en el estado de Morelos, México, reconocido por su rica herencia cultural, belleza natural y significado espiritual. Esta joya colonial se encuentra rodeada por impresionantes formaciones rocosas que crean un paisaje único.'
                      : 'Tepoztlán is a magic town located in the state of Morelos, Mexico, recognized for its rich cultural heritage, natural beauty, and spiritual significance. This colonial gem is surrounded by impressive rock formations that create a unique landscape.'
                    }
                  </p>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {locale === 'es'
                      ? 'El pueblo conserva tradiciones ancestrales mientras abraza la modernidad, ofreciendo a los visitantes una experiencia auténtica que combina historia prehispánica, arquitectura colonial y cultura contemporánea.'
                      : 'The town preserves ancestral traditions while embracing modernity, offering visitors an authentic experience that combines pre-Hispanic history, colonial architecture, and contemporary culture.'
                    }
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl">
                    <MapPin className="w-6 h-6 text-emerald-400 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">
                        {locale === 'es' ? 'Ubicación' : 'Location'}
                      </h4>
                      <p className="text-white/70 text-sm">
                        {locale === 'es' ? 'Morelos, México - 70km de Ciudad de México' : 'Morelos, Mexico - 70km from Mexico City'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl">
                    <Clock className="w-6 h-6 text-blue-400 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">
                        {locale === 'es' ? 'Mejor Época' : 'Best Time'}
                      </h4>
                      <p className="text-white/70 text-sm">
                        {locale === 'es' ? 'Todo el año - clima templado' : 'Year-round - temperate climate'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl">
                    <Users className="w-6 h-6 text-indigo-400 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">
                        {locale === 'es' ? 'Ideal Para' : 'Ideal For'}
                      </h4>
                      <p className="text-white/70 text-sm">
                        {locale === 'es' ? 'Familias, parejas, buscadores espirituales' : 'Families, couples, spiritual seekers'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Highlights Section */}
          {activeSection === 'highlights' && (
            <div className="grid md:grid-cols-2 gap-8">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                >
                  <div className="text-6xl mb-4">{highlight.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {locale === 'es' ? highlight.title.es : highlight.title.en}
                  </h3>
                  <p className="text-white/70 text-lg leading-relaxed mb-6">
                    {locale === 'es' ? highlight.description.es : highlight.description.en}
                  </p>
                  <Button className="bg-gradient-to-r from-emerald-400 to-blue-400 hover:from-emerald-500 hover:to-blue-500 text-white border-0 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                    {locale === 'es' ? 'Explorar' : 'Explore'}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Geography Section */}
          {activeSection === 'geography' && (
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-12 shadow-2xl">
              <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-4">
                <Mountain className="w-8 h-8 text-emerald-400" />
                {locale === 'es' ? 'Geografía y Naturaleza' : 'Geography & Nature'}
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-emerald-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mountain className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">
                    {locale === 'es' ? 'Montañas' : 'Mountains'}
                  </h4>
                  <p className="text-white/70 text-sm">
                    {locale === 'es' ? 'Sierra del Chichinautzin' : 'Chichinautzin Mountain Range'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TreePine className="w-10 h-10 text-blue-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">
                    {locale === 'es' ? 'Bosques' : 'Forests'}
                  </h4>
                  <p className="text-white/70 text-sm">
                    {locale === 'es' ? 'Bosque templado y tropical' : 'Temperate and tropical forest'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-indigo-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sunrise className="w-10 h-10 text-indigo-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">
                    {locale === 'es' ? 'Valle' : 'Valley'}
                  </h4>
                  <p className="text-white/70 text-sm">
                    {locale === 'es' ? 'Valle de Atongo' : 'Atongo Valley'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Climate Section */}
          {activeSection === 'climate' && (
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-12 shadow-2xl">
              <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-4">
                <Sunrise className="w-8 h-8 text-blue-400" />
                {locale === 'es' ? 'Clima y Temporadas' : 'Climate & Seasons'}
              </h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-6">
                    {locale === 'es' ? 'Clima Templado Subhúmedo' : 'Temperate Subhumid Climate'}
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-2xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">
                          {locale === 'es' ? 'Temperatura Promedio' : 'Average Temperature'}
                        </span>
                        <span className="text-emerald-400 font-bold">24°C</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-gradient-to-r from-emerald-400 to-blue-400 h-2 rounded-full w-3/4"></div>
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">
                          {locale === 'es' ? 'Precipitación Anual' : 'Annual Rainfall'}
                        </span>
                        <span className="text-blue-400 font-bold">1,200mm</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-400 to-indigo-400 h-2 rounded-full w-4/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-6">
                    {locale === 'es' ? 'Temporadas del Año' : 'Seasons'}
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-2xl">
                      <h4 className="text-white font-semibold mb-1">
                        {locale === 'es' ? 'Temporada Seca (Nov - May)' : 'Dry Season (Nov - May)'}
                      </h4>
                      <p className="text-white/70 text-sm">
                        {locale === 'es' ? 'Ideal para senderismo y actividades al aire libre' : 'Perfect for hiking and outdoor activities'}
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-blue-400/20 to-green-400/20 rounded-2xl">
                      <h4 className="text-white font-semibold mb-1">
                        {locale === 'es' ? 'Temporada de Lluvia (Jun - Oct)' : 'Rainy Season (Jun - Oct)'}
                      </h4>
                      <p className="text-white/70 text-sm">
                        {locale === 'es' ? 'Paisaje verde exuberante, tardes frescas' : 'Lush green landscape, cool afternoons'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-400/20 to-blue-400/20 backdrop-blur-xl rounded-3xl border border-white/10 p-12 shadow-2xl max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              {locale === 'es' ? '¿Listo para Explorar?' : 'Ready to Explore?'}
            </h2>
            <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto">
              {locale === 'es'
                ? 'Descubre todos los secretos y maravillas que Tepoztlán tiene para ofrecerte'
                : 'Discover all the secrets and wonders that Tepoztlán has to offer you'
              }
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-gradient-to-r from-emerald-400 to-blue-400 hover:from-emerald-500 hover:to-blue-500 text-white border-0 shadow-xl px-8 py-4 text-lg">
                <Play className="w-5 h-5 mr-2" />
                {locale === 'es' ? 'Ver Barrios' : 'Explore Neighborhoods'}
              </Button>
              <Button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-8 py-4 text-lg">
                {locale === 'es' ? 'Planificar Visita' : 'Plan Your Visit'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}