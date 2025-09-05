'use client'

import { useState } from 'react'
import { Locale } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Mountain, 
  Clock, 
  MapPin, 
  Sun, 
  Star,
  Camera,
  AlertTriangle,
  Compass,
  Heart,
  ChevronRight,
  Play,
  Info,
  Award
} from 'lucide-react'

interface TepoztecoPyramidClientProps {
  locale: Locale
}

export default function TepoztecoPyramidClient({ locale }: TepoztecoPyramidClientProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', es: 'Visión General', en: 'Overview', icon: Mountain },
    { id: 'hiking', es: 'Senderismo', en: 'Hiking', icon: Compass },
    { id: 'history', es: 'Historia', en: 'History', icon: Star },
    { id: 'tips', es: 'Consejos', en: 'Tips', icon: Info }
  ]

  const difficultyLevels = [
    { level: 1, active: true },
    { level: 2, active: true },
    { level: 3, active: true },
    { level: 4, active: false },
    { level: 5, active: false }
  ]

  const hikingStats = [
    { 
      icon: Clock, 
      label: { es: 'Duración', en: 'Duration' }, 
      value: '2-3h', 
      color: 'text-blue-400' 
    },
    { 
      icon: Mountain, 
      label: { es: 'Desnivel', en: 'Elevation' }, 
      value: '450m', 
      color: 'text-emerald-400' 
    },
    { 
      icon: MapPin, 
      label: { es: 'Distancia', en: 'Distance' }, 
      value: '3.2km', 
      color: 'text-purple-400' 
    },
    { 
      icon: Sun, 
      label: { es: 'Mejor Horario', en: 'Best Time' }, 
      value: '6-10am', 
      color: 'text-orange-400' 
    }
  ]

  const safetyTips = [
    {
      title: { es: 'Hidratación Constante', en: 'Stay Hydrated' },
      description: { es: 'Lleva al menos 2 litros de agua por persona', en: 'Bring at least 2 liters of water per person' }
    },
    {
      title: { es: 'Calzado Adecuado', en: 'Proper Footwear' },
      description: { es: 'Usa botas de montaña con buena tracción', en: 'Wear hiking boots with good traction' }
    },
    {
      title: { es: 'Salida Temprana', en: 'Early Start' },
      description: { es: 'Inicia antes de las 8am para evitar el calor', en: 'Start before 8am to avoid the heat' }
    },
    {
      title: { es: 'Respeto al Sitio', en: 'Respect the Site' },
      description: { es: 'No toques las estructuras arqueológicas', en: 'Do not touch archaeological structures' }
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 relative overflow-hidden">
      {/* Ultra Premium Background */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-red-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-amber-500/10 rounded-full blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Premium mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_transparent,_rgba(251,146,60,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(239,68,68,0.2))]" />
        
        {/* Mountain pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(251, 146, 60, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 146, 60, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Premium Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-orange-400" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 blur-lg" />
              <Badge className="relative bg-gradient-to-r from-orange-400 to-red-400 text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                ⛰️ {locale === 'es' ? 'Pirámide del Tepozteco' : 'Tepozteco Pyramid'} ⛰️
              </Badge>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-red-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-white drop-shadow-2xl">
              {locale === 'es' ? 'Templo en las' : 'Temple in the'}
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-300 via-red-300 to-yellow-300 bg-clip-text text-transparent drop-shadow-2xl">
              {locale === 'es' ? 'Nubes' : 'Clouds'}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-4xl mx-auto leading-relaxed mb-8">
            {locale === 'es' 
              ? 'Asciende al templo sagrado del dios Tepoztécatl y descubre vistas panorámicas incomparables del Valle de Morelos.'
              : 'Ascend to the sacred temple of god Tepoztécatl and discover incomparable panoramic views of the Morelos Valley.'
            }
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {hikingStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
                  <Icon className={`w-8 h-8 ${stat.color} mb-3 mx-auto`} />
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-white/70 text-sm">
                    {locale === 'es' ? stat.label.es : stat.label.en}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Difficulty Level */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-white/80 font-medium">
              {locale === 'es' ? 'Dificultad:' : 'Difficulty:'}
            </span>
            <div className="flex gap-1">
              {difficultyLevels.map((level, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full ${
                    level.active ? 'bg-orange-400' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            <Badge className="bg-orange-400/20 text-orange-400 border border-orange-400/30">
              {locale === 'es' ? 'Intermedio' : 'Intermediate'}
            </Badge>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-12">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-2 shadow-2xl max-w-2xl mx-auto">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-orange-400 to-red-400 text-white shadow-xl'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {locale === 'es' ? tab.es : tab.en}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-10 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Mountain className="w-8 h-8 text-orange-400" />
                  {locale === 'es' ? 'La Experiencia' : 'The Experience'}
                </h2>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  {locale === 'es'
                    ? 'La caminata al Tepozteco es una de las experiencias más emblemáticas de México. Este templo prehispánico, dedicado al dios del pulque, se alza majestuosamente a 2,040 metros sobre el nivel del mar.'
                    : 'The hike to Tepozteco is one of Mexico\'s most emblematic experiences. This pre-Hispanic temple, dedicated to the god of pulque, rises majestically 2,040 meters above sea level.'
                  }
                </p>
                <p className="text-white/80 text-lg leading-relaxed mb-8">
                  {locale === 'es'
                    ? 'El sendero serpentea a través de bosques de encino y pino, revelando gradualmente vistas espectaculares del valle. La recompensa final es una vista de 360 grados que abarca desde el Popocatépetl hasta el Iztaccíhuatl.'
                    : 'The trail winds through oak and pine forests, gradually revealing spectacular valley views. The final reward is a 360-degree view spanning from Popocatépetl to Iztaccíhuatl.'
                  }
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-orange-400/10 rounded-2xl border border-orange-400/20">
                    <Award className="w-6 h-6 text-orange-400" />
                    <div>
                      <h4 className="text-white font-semibold">
                        {locale === 'es' ? 'Sitio Arqueológico' : 'Archaeological Site'}
                      </h4>
                      <p className="text-white/70 text-sm">
                        {locale === 'es' ? 'Protegido por INAH desde 1938' : 'Protected by INAH since 1938'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-red-400/10 rounded-2xl border border-red-400/20">
                    <Heart className="w-6 h-6 text-red-400" />
                    <div>
                      <h4 className="text-white font-semibold">
                        {locale === 'es' ? 'Experiencia Espiritual' : 'Spiritual Experience'}
                      </h4>
                      <p className="text-white/70 text-sm">
                        {locale === 'es' ? 'Centro energético reconocido mundialmente' : 'Globally recognized energy center'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-10 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Camera className="w-8 h-8 text-red-400" />
                  {locale === 'es' ? 'Puntos Destacados' : 'Highlights'}
                </h2>
                
                <div className="space-y-6">
                  <div className="group cursor-pointer">
                    <div className="bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-2xl p-6 group-hover:from-orange-400/30 group-hover:to-red-400/30 transition-all duration-300">
                      <h4 className="text-white font-semibold text-lg mb-2">
                        {locale === 'es' ? '🏛️ Templo Prehispánico' : '🏛️ Pre-Hispanic Temple'}
                      </h4>
                      <p className="text-white/80">
                        {locale === 'es'
                          ? 'Arquitectura teotihuacana del siglo XIII'
                          : 'Teotihuacan architecture from the 13th century'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="group cursor-pointer">
                    <div className="bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-2xl p-6 group-hover:from-red-400/30 group-hover:to-pink-400/30 transition-all duration-300">
                      <h4 className="text-white font-semibold text-lg mb-2">
                        {locale === 'es' ? '🌄 Vista Panorámica' : '🌄 Panoramic View'}
                      </h4>
                      <p className="text-white/80">
                        {locale === 'es'
                          ? 'Vistas de volcanes y 5 estados mexicanos'
                          : 'Views of volcanoes and 5 Mexican states'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="group cursor-pointer">
                    <div className="bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-2xl p-6 group-hover:from-pink-400/30 group-hover:to-purple-400/30 transition-all duration-300">
                      <h4 className="text-white font-semibold text-lg mb-2">
                        {locale === 'es' ? '🌿 Biodiversidad' : '🌿 Biodiversity'}
                      </h4>
                      <p className="text-white/80">
                        {locale === 'es'
                          ? 'Flora y fauna endémica del Corredor Biológico'
                          : 'Endemic flora and fauna of the Biological Corridor'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="group cursor-pointer">
                    <div className="bg-gradient-to-r from-purple-400/20 to-indigo-400/20 rounded-2xl p-6 group-hover:from-purple-400/30 group-hover:to-indigo-400/30 transition-all duration-300">
                      <h4 className="text-white font-semibold text-lg mb-2">
                        {locale === 'es' ? '✨ Energía Ancestral' : '✨ Ancestral Energy'}
                      </h4>
                      <p className="text-white/80">
                        {locale === 'es'
                          ? 'Sitio sagrado de poder espiritual'
                          : 'Sacred site of spiritual power'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hiking Tab */}
          {activeTab === 'hiking' && (
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-12 shadow-2xl">
              <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-4">
                <Compass className="w-10 h-10 text-orange-400" />
                {locale === 'es' ? 'Guía de Senderismo' : 'Hiking Guide'}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-6">
                    {locale === 'es' ? 'Ruta Paso a Paso' : 'Step-by-Step Route'}
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        step: 1,
                        title: { es: 'Inicio del Sendero', en: 'Trailhead' },
                        description: { es: 'Entrada oficial al Parque Nacional', en: 'Official entrance to National Park' },
                        time: '0min'
                      },
                      {
                        step: 2,
                        title: { es: 'Primera Parada', en: 'First Stop' },
                        description: { es: 'Mirador con vista al pueblo', en: 'Viewpoint overlooking the town' },
                        time: '30min'
                      },
                      {
                        step: 3,
                        title: { es: 'Zona Rocosa', en: 'Rocky Section' },
                        description: { es: 'Ascenso por formaciones rocosas', en: 'Climb through rock formations' },
                        time: '60min'
                      },
                      {
                        step: 4,
                        title: { es: 'Cumbre', en: 'Summit' },
                        description: { es: 'Templo del Tepozteco', en: 'Tepozteco Temple' },
                        time: '90-120min'
                      }
                    ].map((point, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl">
                        <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {point.step}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-white font-semibold">
                              {locale === 'es' ? point.title.es : point.title.en}
                            </h4>
                            <Badge className="bg-orange-400/20 text-orange-400 text-xs">
                              {point.time}
                            </Badge>
                          </div>
                          <p className="text-white/70 text-sm">
                            {locale === 'es' ? point.description.es : point.description.en}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                    {locale === 'es' ? 'Consejos de Seguridad' : 'Safety Tips'}
                  </h3>
                  <div className="space-y-4">
                    {safetyTips.map((tip, index) => (
                      <div key={index} className="p-4 bg-red-400/10 rounded-2xl border border-red-400/20">
                        <h4 className="text-white font-semibold mb-2">
                          {locale === 'es' ? tip.title.es : tip.title.en}
                        </h4>
                        <p className="text-white/80 text-sm">
                          {locale === 'es' ? tip.description.es : tip.description.en}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-orange-400/10 rounded-2xl border border-orange-400/20">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-400" />
                      {locale === 'es' ? 'Horarios de Acceso' : 'Access Hours'}
                    </h4>
                    <div className="space-y-2 text-white/80 text-sm">
                      <div className="flex justify-between">
                        <span>{locale === 'es' ? 'Lunes - Viernes:' : 'Monday - Friday:'}</span>
                        <span>8:00 - 17:30</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{locale === 'es' ? 'Sábado - Domingo:' : 'Saturday - Sunday:'}</span>
                        <span>8:00 - 17:30</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{locale === 'es' ? 'Costo:' : 'Cost:'}</span>
                        <span>$65 MXN</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-12 shadow-2xl">
              <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-4">
                <Star className="w-10 h-10 text-orange-400" />
                {locale === 'es' ? 'Historia Sagrada' : 'Sacred History'}
              </h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-6">
                    {locale === 'es' ? 'El Dios Tepoztécatl' : 'The God Tepoztécatl'}
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed mb-6">
                    {locale === 'es'
                      ? 'Tepoztécatl era el dios del pulque, la bebida sagrada obtenida del agave. Según la mitología nahua, nació de una doncella que fue fertilizada por el viento. Su templo fue construido en el siglo XIII como un centro ceremonial donde se realizaban rituales relacionados con la fertilidad y la embriaguez sagrada.'
                      : 'Tepoztécatl was the god of pulque, the sacred drink obtained from agave. According to Nahua mythology, he was born from a maiden who was fertilized by the wind. His temple was built in the 13th century as a ceremonial center where rituals related to fertility and sacred intoxication were performed.'
                    }
                  </p>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {locale === 'es'
                      ? 'El templo se construyó estratégicamente en la cima del cerro para estar más cerca de los dioses celestes y servir como observatorio astronómico para las ceremonias relacionadas con los ciclos agrícolas.'
                      : 'The temple was strategically built on the mountaintop to be closer to the celestial gods and serve as an astronomical observatory for ceremonies related to agricultural cycles.'
                    }
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-6">
                    {locale === 'es' ? 'Arquitectura Sagrada' : 'Sacred Architecture'}
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-400/10 rounded-2xl">
                      <h4 className="text-white font-semibold mb-2">🏛️ {locale === 'es' ? 'Estilo Teotihuacano' : 'Teotihuacan Style'}</h4>
                      <p className="text-white/70 text-sm">
                        {locale === 'es' ? 'Influencia arquitectónica de la gran Teotihuacán' : 'Architectural influence from great Teotihuacán'}
                      </p>
                    </div>
                    <div className="p-4 bg-red-400/10 rounded-2xl">
                      <h4 className="text-white font-semibold mb-2">🔺 {locale === 'es' ? 'Pirámide Escalonada' : 'Step Pyramid'}</h4>
                      <p className="text-white/70 text-sm">
                        {locale === 'es' ? 'Estructura de tres cuerpos con escalinatas' : 'Three-body structure with staircases'}
                      </p>
                    </div>
                    <div className="p-4 bg-yellow-400/10 rounded-2xl">
                      <h4 className="text-white font-semibold mb-2">🌟 {locale === 'es' ? 'Orientación Astronómica' : 'Astronomical Orientation'}</h4>
                      <p className="text-white/70 text-sm">
                        {locale === 'es' ? 'Alineado con eventos celestiales importantes' : 'Aligned with important celestial events'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tips Tab */}
          {activeTab === 'tips' && (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  🎒 {locale === 'es' ? 'Qué Llevar' : 'What to Bring'}
                </h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    {locale === 'es' ? 'Agua abundante (2L mínimo)' : 'Abundant water (2L minimum)'}
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    {locale === 'es' ? 'Botas de montaña' : 'Hiking boots'}
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    {locale === 'es' ? 'Protector solar' : 'Sunscreen'}
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    {locale === 'es' ? 'Snacks energéticos' : 'Energy snacks'}
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    {locale === 'es' ? 'Gorra o sombrero' : 'Cap or hat'}
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  ⏰ {locale === 'es' ? 'Mejor Momento' : 'Best Time'}
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-400/10 rounded-2xl">
                    <h4 className="text-white font-semibold mb-1">
                      {locale === 'es' ? 'Temporada Seca' : 'Dry Season'}
                    </h4>
                    <p className="text-white/70 text-sm">Nov - Abr</p>
                  </div>
                  <div className="p-4 bg-blue-400/10 rounded-2xl">
                    <h4 className="text-white font-semibold mb-1">
                      {locale === 'es' ? 'Horario Ideal' : 'Ideal Time'}
                    </h4>
                    <p className="text-white/70 text-sm">6:00 - 10:00 AM</p>
                  </div>
                  <div className="p-4 bg-purple-400/10 rounded-2xl">
                    <h4 className="text-white font-semibold mb-1">
                      {locale === 'es' ? 'Evitar' : 'Avoid'}
                    </h4>
                    <p className="text-white/70 text-sm">
                      {locale === 'es' ? 'Domingos y días festivos' : 'Sundays and holidays'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  📱 {locale === 'es' ? 'Información Práctica' : 'Practical Info'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      {locale === 'es' ? 'Contacto Emergencia' : 'Emergency Contact'}
                    </h4>
                    <p className="text-white/70 text-sm">911</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      {locale === 'es' ? 'Guardaparques' : 'Park Rangers'}
                    </h4>
                    <p className="text-white/70 text-sm">739 395 0525</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      {locale === 'es' ? 'Ubicación' : 'Location'}
                    </h4>
                    <p className="text-white/70 text-sm">
                      {locale === 'es' ? 'Parque Nacional El Tepozteco' : 'El Tepozteco National Park'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-400/20 to-red-400/20 backdrop-blur-xl rounded-3xl border border-white/10 p-12 shadow-2xl max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              {locale === 'es' ? '¿Listo para la Aventura?' : 'Ready for the Adventure?'}
            </h2>
            <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto">
              {locale === 'es'
                ? 'Únete a miles de aventureros que han conquistado esta montaña sagrada y descubierto su magia ancestral'
                : 'Join thousands of adventurers who have conquered this sacred mountain and discovered its ancestral magic'
              }
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white border-0 shadow-xl px-8 py-4 text-lg">
                <Play className="w-5 h-5 mr-2" />
                {locale === 'es' ? 'Reservar Guía' : 'Book Guide'}
              </Button>
              <Button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-8 py-4 text-lg">
                {locale === 'es' ? 'Ver Mapa' : 'View Map'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}