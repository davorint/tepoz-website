'use client'

import { useState } from 'react'
import { Locale } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Crown, 
  Church, 
  Users2,
  Scroll,
  ChevronRight,
  ChevronLeft,
  Calendar
} from 'lucide-react'

interface TepoztlanHistoryClientProps {
  locale: Locale
}

export default function TepoztlanHistoryClient({ locale }: TepoztlanHistoryClientProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('prehispanic')

  const periods = [
    {
      id: 'prehispanic',
      es: 'Era Prehispánica',
      en: 'Pre-Hispanic Era',
      date: '1200-1521',
      icon: Crown,
      color: 'from-amber-400 to-orange-400'
    },
    {
      id: 'colonial',
      es: 'Período Colonial',
      en: 'Colonial Period',
      date: '1521-1821',
      icon: Church,
      color: 'from-red-400 to-pink-400'
    },
    {
      id: 'independence',
      es: 'Independencia',
      en: 'Independence',
      date: '1821-1910',
      icon: Users2,
      color: 'from-green-400 to-emerald-400'
    },
    {
      id: 'modern',
      es: 'Era Moderna',
      en: 'Modern Era',
      date: '1910-Presente',
      icon: BookOpen,
      color: 'from-blue-400 to-indigo-400'
    }
  ]

  const historyContent = {
    prehispanic: {
      title: { es: 'Los Orígenes Místicos', en: 'The Mystical Origins' },
      content: {
        es: 'Tepoztlán fue fundado alrededor del año 1200 d.C. por los tlahuicas, quienes eligieron este valle sagrado por su conexión espiritual con los dioses. El nombre "Tepoztlán" deriva del náhuatl "Tepoztlan", que significa "lugar del hacha de cobre" o "lugar de la piedra rajada".',
        en: 'Tepoztlán was founded around 1200 AD by the Tlahuicas, who chose this sacred valley for its spiritual connection to the gods. The name "Tepoztlán" derives from Nahuatl "Tepoztlan", meaning "place of the copper axe" or "place of the split stone".'
      },
      highlights: [
        {
          title: { es: 'Construcción del Templo', en: 'Temple Construction' },
          description: { es: 'Se erige el templo al dios Tepoztécatl en la cima del cerro', en: 'The temple to god Tepoztécatl is built on the mountaintop' },
          date: '1200-1300'
        },
        {
          title: { es: 'Comercio Ancestral', en: 'Ancient Trade' },
          description: { es: 'Tepoztlán se convierte en importante centro comercial regional', en: 'Tepoztlán becomes an important regional trading center' },
          date: '1300-1450'
        },
        {
          title: { es: 'Resistencia Azteca', en: 'Aztec Resistance' },
          description: { es: 'Los tlahuicas mantienen autonomía frente al imperio azteca', en: 'The Tlahuicas maintain autonomy against the Aztec empire' },
          date: '1450-1521'
        }
      ]
    },
    colonial: {
      title: { es: 'La Transformación Colonial', en: 'Colonial Transformation' },
      content: {
        es: 'Con la llegada de los españoles, Tepoztlán experimenta una profunda transformación. Los dominicos construyen el impresionante Convento de la Natividad en 1559, fusionando elementos arquitectónicos europeos con técnicas constructivas indígenas.',
        en: 'With the arrival of the Spanish, Tepoztlán experiences a profound transformation. The Dominicans build the impressive Convent of the Nativity in 1559, fusing European architectural elements with indigenous construction techniques.'
      },
      highlights: [
        {
          title: { es: 'Llegada de los Dominicos', en: 'Arrival of Dominicans' },
          description: { es: 'Los frailes dominicos establecen la primera misión cristiana', en: 'Dominican friars establish the first Christian mission' },
          date: '1521'
        },
        {
          title: { es: 'Construcción del Convento', en: 'Convent Construction' },
          description: { es: 'Se inicia la construcción del Convento de la Natividad', en: 'Construction of the Convent of the Nativity begins' },
          date: '1559-1570'
        },
        {
          title: { es: 'Fusión Cultural', en: 'Cultural Fusion' },
          description: { es: 'Síntesis entre tradiciones prehispánicas y coloniales', en: 'Synthesis between pre-Hispanic and colonial traditions' },
          date: '1570-1821'
        }
      ]
    },
    independence: {
      title: { es: 'Camino a la Independencia', en: 'Road to Independence' },
      content: {
        es: 'Durante el período de la Independencia, Tepoztlán juega un papel importante en los movimientos libertarios. Los habitantes del pueblo participan activamente en la lucha por la autonomía nacional, manteniendo su identidad cultural distintiva.',
        en: 'During the Independence period, Tepoztlán plays an important role in the liberation movements. The town\'s inhabitants actively participate in the struggle for national autonomy, maintaining their distinctive cultural identity.'
      },
      highlights: [
        {
          title: { es: 'Apoyo a la Independencia', en: 'Independence Support' },
          description: { es: 'Los tepoztecas se unen al movimiento independentista', en: 'Tepoztecans join the independence movement' },
          date: '1810-1821'
        },
        {
          title: { es: 'Desarrollo Económico', en: 'Economic Development' },
          description: { es: 'Crecimiento del comercio local y artesanías tradicionales', en: 'Growth of local commerce and traditional crafts' },
          date: '1821-1850'
        },
        {
          title: { es: 'Preservación Cultural', en: 'Cultural Preservation' },
          description: { es: 'Mantenimiento de tradiciones y festivales ancestrales', en: 'Maintenance of ancestral traditions and festivals' },
          date: '1850-1910'
        }
      ]
    },
    modern: {
      title: { es: 'Tepoztlán Contemporáneo', en: 'Contemporary Tepoztlán' },
      content: {
        es: 'En la era moderna, Tepoztlán se transforma en un destino turístico respetado mundialmente, siendo designado Pueblo Mágico en 2002. La comunidad logra equilibrar el desarrollo turístico con la preservación de su patrimonio cultural y natural.',
        en: 'In the modern era, Tepoztlán transforms into a globally respected tourist destination, being designated a Magic Town in 2002. The community manages to balance tourist development with the preservation of its cultural and natural heritage.'
      },
      highlights: [
        {
          title: { es: 'Revolución Mexicana', en: 'Mexican Revolution' },
          description: { es: 'Tepoztlán participa en los movimientos revolucionarios', en: 'Tepoztlán participates in revolutionary movements' },
          date: '1910-1920'
        },
        {
          title: { es: 'Desarrollo Turístico', en: 'Tourism Development' },
          description: { es: 'Inicio del turismo cultural y espiritual', en: 'Beginning of cultural and spiritual tourism' },
          date: '1960-1990'
        },
        {
          title: { es: 'Pueblo Mágico', en: 'Magic Town' },
          description: { es: 'Reconocimiento oficial como Pueblo Mágico de México', en: 'Official recognition as Magic Town of Mexico' },
          date: '2002'
        }
      ]
    }
  }

  const currentContent = historyContent[selectedPeriod as keyof typeof historyContent]
  const currentPeriod = periods.find(p => p.id === selectedPeriod)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Ultra Premium Background */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-purple-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-indigo-500/10 rounded-full blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Premium mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_transparent,_rgba(245,158,11,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(147,51,234,0.2))]" />
        
        {/* Ancient scroll pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Premium Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-400" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-purple-400 blur-lg" />
              <Badge className="relative bg-gradient-to-r from-amber-400 to-purple-400 text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                📜 {locale === 'es' ? 'Historia de Tepoztlán' : 'History of Tepoztlán'} 📜
              </Badge>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-purple-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-white drop-shadow-2xl">
              {locale === 'es' ? 'Mil Años de' : 'A Thousand Years of'}
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-2xl">
              {locale === 'es' ? 'Historia Viva' : 'Living History'}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-4xl mx-auto leading-relaxed">
            {locale === 'es' 
              ? 'Desde sus orígenes prehispánicos hasta convertirse en Pueblo Mágico, descubre la fascinante evolución de Tepoztlán a través de los siglos.'
              : 'From its pre-Hispanic origins to becoming a Magic Town, discover the fascinating evolution of Tepoztlán through the centuries.'
            }
          </p>
        </div>

        {/* Historical Timeline */}
        <div className="mb-12">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              {locale === 'es' ? 'Línea de Tiempo Histórica' : 'Historical Timeline'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {periods.map((period) => {
                const Icon = period.icon
                return (
                  <button
                    key={period.id}
                    onClick={() => setSelectedPeriod(period.id)}
                    className={`p-6 rounded-2xl transition-all duration-500 text-left group ${
                      selectedPeriod === period.id
                        ? `bg-gradient-to-br ${period.color} text-white shadow-2xl scale-105`
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className={`w-6 h-6 ${selectedPeriod === period.id ? 'text-white' : 'text-white/50'}`} />
                      <span className="text-xs font-mono">{period.date}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">
                      {locale === 'es' ? period.es : period.en}
                    </h3>
                    <div className={`h-1 w-full rounded-full transition-all duration-300 ${
                      selectedPeriod === period.id 
                        ? 'bg-white/30' 
                        : 'bg-white/10 group-hover:bg-white/20'
                    }`} />
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Selected Period Content */}
        <div className="space-y-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-12 shadow-2xl">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r ${currentPeriod?.color} text-white shadow-xl mb-6`}>
                {currentPeriod && (
                  <>
                    <currentPeriod.icon className="w-6 h-6" />
                    <span className="font-bold text-lg">
                      {locale === 'es' ? currentPeriod.es : currentPeriod.en}
                    </span>
                    <span className="text-sm font-mono opacity-80">
                      {currentPeriod.date}
                    </span>
                  </>
                )}
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">
                {locale === 'es' ? currentContent.title.es : currentContent.title.en}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Main Content */}
              <div>
                <p className="text-white/80 text-lg leading-relaxed mb-8">
                  {locale === 'es' ? currentContent.content.es : currentContent.content.en}
                </p>
                
                <div className="flex gap-4 mt-8">
                  {selectedPeriod !== 'prehispanic' && (
                    <Button
                      onClick={() => {
                        const currentIndex = periods.findIndex(p => p.id === selectedPeriod)
                        if (currentIndex > 0) {
                          setSelectedPeriod(periods[currentIndex - 1].id)
                        }
                      }}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      {locale === 'es' ? 'Período Anterior' : 'Previous Period'}
                    </Button>
                  )}
                  {selectedPeriod !== 'modern' && (
                    <Button
                      onClick={() => {
                        const currentIndex = periods.findIndex(p => p.id === selectedPeriod)
                        if (currentIndex < periods.length - 1) {
                          setSelectedPeriod(periods[currentIndex + 1].id)
                        }
                      }}
                      className={`bg-gradient-to-r ${currentPeriod?.color} text-white border-0 shadow-xl`}
                    >
                      {locale === 'es' ? 'Siguiente Período' : 'Next Period'}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Timeline Events */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-amber-400" />
                  {locale === 'es' ? 'Eventos Importantes' : 'Key Events'}
                </h3>
                {currentContent.highlights.map((event, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-2xl p-6 border-l-4 border-amber-400 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-white font-semibold text-lg">
                        {locale === 'es' ? event.title.es : event.title.en}
                      </h4>
                      <Badge className="bg-amber-400/20 text-amber-400 text-xs">
                        {event.date}
                      </Badge>
                    </div>
                    <p className="text-white/70 leading-relaxed">
                      {locale === 'es' ? event.description.es : event.description.en}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-amber-400/20 to-purple-400/20 backdrop-blur-xl rounded-3xl border border-white/10 p-12 shadow-2xl max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              {locale === 'es' ? 'Explora el Patrimonio Histórico' : 'Explore the Historical Heritage'}
            </h2>
            <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto">
              {locale === 'es'
                ? 'Visita los sitios históricos de Tepoztlán y camina por los mismos senderos que han recorrido generaciones'
                : 'Visit the historic sites of Tepoztlán and walk the same paths that generations have traveled'
              }
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-gradient-to-r from-amber-400 to-purple-400 hover:from-amber-500 hover:to-purple-500 text-white border-0 shadow-xl px-8 py-4 text-lg">
                <Scroll className="w-5 h-5 mr-2" />
                {locale === 'es' ? 'Ver Monumentos' : 'View Monuments'}
              </Button>
              <Button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-8 py-4 text-lg">
                {locale === 'es' ? 'Tours Históricos' : 'Historical Tours'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}