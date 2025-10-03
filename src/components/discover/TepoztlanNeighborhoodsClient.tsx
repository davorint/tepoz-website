'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { 
  MapPin, Church, Calendar, Users, Music, Heart,
  Home, Sparkles, ChevronRight, ArrowRight, Info,
  Star, Mountain, TreePine
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { buildLocalizedUrl } from '@/lib/url-mapping'

interface TepoztlanNeighborhoodsClientProps {
  lang: 'es' | 'en'
}

export default function TepoztlanNeighborhoodsClient({ lang }: TepoztlanNeighborhoodsClientProps) {
  const [selectedBarrio, setSelectedBarrio] = useState<string | null>(null)
  const [activeView, setActiveView] = useState<'map' | 'grid'>('grid')
  
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const content = {
    es: {
      hero: {
        badge: 'Ocho Barrios Tradicionales',
        title: 'Los Barrios de',
        titleHighlight: 'TEPOZTLÁN',
        subtitle: 'Donde cada barrio cuenta su propia historia',
        description: 'Descubre los ocho barrios tradicionales que conforman el tejido cultural de Tepoztlán, cada uno con su capilla colonial, santo patrono y tradiciones únicas que se han preservado por generaciones.',
        stats: {
          barrios: '8 Barrios',
          chapels: '8 Capillas',
          festivals: '8+ Fiestas',
          history: '500+ Años'
        }
      },
      barrios: [
        {
          id: 'santo-domingo',
          name: 'Santo Domingo',
          patron: 'Santo Domingo de Guzmán',
          festival: '4 de Agosto',
          symbol: '🐸 Sapo',
          description: 'Uno de los barrios más extensos de Tepoztlán, celebra su gran fiesta patronal el 4 de agosto en Santo Domingo Ocotitlán.',
          highlights: [
            'Símbolo del barrio: Sapo',
            'Gran fiesta del 4 de agosto',
            'Arquitectura colonial preservada',
            'Comunidad de artesanos tradicionales'
          ],
          traditions: 'El barrio se distingue por sus tradiciones centenarias, procesiones religiosas y la elaboración de artesanías tradicionales.',
          icon: Church,
          color: 'from-purple-500 to-indigo-500',
          location: { lat: 18.985, lng: -99.093 }
        },
        {
          id: 'san-miguel',
          name: 'San Miguel',
          patron: 'San Miguel Arcángel',
          festival: '8 de Mayo y 29 de Septiembre',
          symbol: '🦎 Lagartija',
          description: 'Barrio dedicado al Arcángel San Miguel, celebra dos festividades anuales con música y espectaculares castillos nocturnos de fuegos artificiales.',
          highlights: [
            'Símbolo del barrio: Lagartija',
            'Doble celebración: 8 mayo y 29 septiembre',
            'Música tradicional y banda',
            'Castillo nocturno de fuegos artificiales'
          ],
          traditions: 'Las festividades del 8 de mayo y 29 de septiembre incluyen música tradicional, procesiones y espectaculares fuegos artificiales que iluminan la noche.',
          icon: Mountain,
          color: 'from-blue-500 to-cyan-500',
          location: { lat: 18.984, lng: -99.095 }
        },
        {
          id: 'la-santisima',
          name: 'La Santísima Trinidad',
          patron: 'Señor de la Santísima Trinidad',
          festival: 'Junio (fecha móvil)',
          symbol: '🐜 Hormiga',
          description: 'Barrio que celebra al Señor de la Santísima Trinidad en junio con mole tradicional y castillo nocturno de fuegos artificiales.',
          highlights: [
            'Símbolo del barrio: Hormiga',
            'Fiesta en junio con fecha móvil',
            'Preparación de mole tradicional',
            'Castillo nocturno de fuegos artificiales'
          ],
          traditions: 'La festividad de junio se caracteriza por la preparación comunitaria de mole, procesiones religiosas y espectaculares fuegos artificiales nocturnos.',
          icon: Sparkles,
          color: 'from-amber-500 to-orange-500',
          location: { lat: 18.983, lng: -99.091 }
        },
        {
          id: 'santa-cruz',
          name: 'Santa Cruz',
          patron: 'Santa Cruz / San Salvador',
          festival: '3 de Mayo y 6 de Agosto',
          symbol: '🦝 Cacomixtle',
          description: 'Barrio con doble festividad, celebra la Santa Cruz el 3 de mayo con arrieros trayendo ofrendas, y San Salvador el 6 de agosto.',
          highlights: [
            'Símbolo del barrio: Cacomixtle',
            'Doble fiesta: 3 mayo y 6 agosto',
            'Arrieros con ofrendas florales',
            'Fiesta de la Virgen del Rosario (7 octubre)'
          ],
          traditions: 'El 3 de mayo, arrieros traen ofrendas a la Santa Cruz. El 6 de agosto se celebra San Salvador. También festejan a la Virgen del Rosario el 7 de octubre.',
          icon: TreePine,
          color: 'from-green-500 to-emerald-500',
          location: { lat: 18.986, lng: -99.092 }
        },
        {
          id: 'san-sebastian',
          name: 'San Sebastián',
          patron: 'San Sebastián Mártir / Asunción de María',
          festival: '21 de Enero y 15 de Agosto',
          symbol: '🦂 Alacrán',
          description: 'Famoso por "los tiznados" el 21 de enero, que anuncian el carnaval con danzas de chinelos y jaripeo. También celebra la Asunción el 15 de agosto.',
          highlights: [
            'Símbolo del barrio: Alacrán',
            'Tradición única de "los tiznados"',
            'Danzas de chinelos y jaripeo',
            'Fiesta de la Asunción (15 agosto)'
          ],
          traditions: 'El 21 de enero, personas pintadas de negro (tiznados) recorren el pueblo anunciando el carnaval con chinelos, jaripeo y música. El 15 de agosto celebran a la Virgen de la Asunción.',
          icon: Music,
          color: 'from-red-500 to-pink-500',
          location: { lat: 18.987, lng: -99.094 }
        },
        {
          id: 'san-pedro',
          name: 'San Pedro',
          patron: 'San Pedro y San Pablo',
          festival: '29-30 de Abril y 29 de Junio',
          symbol: '🦨 Tlacuache',
          description: 'Barrio famoso por las "dancitas" infantiles tradicionales que se realizan del 29-30 de abril y la fiesta de San Pedro y San Pablo el 29 de junio.',
          highlights: [
            'Símbolo del barrio: Tlacuache',
            'Dancitas infantiles tradicionales',
            'Fiesta del 29-30 de abril',
            'Celebración de San Pedro y Pablo (29 junio)'
          ],
          traditions: 'Las tradicionales "dancitas" del 29-30 de abril son ejecutadas por niños locales con participación comunitaria. El 29 de junio celebran a San Pedro y San Pablo con música y comida tradicional.',
          icon: Users,
          color: 'from-teal-500 to-cyan-500',
          location: { lat: 18.982, lng: -99.096 }
        },
        {
          id: 'los-reyes',
          name: 'Los Reyes',
          patron: 'Los Santos Reyes / Virgen de la Natividad',
          festival: '6 de Enero y 8 de Septiembre',
          symbol: '🐛 Gusano de Mamey',
          description: 'Barrio que celebra a los Santos Reyes el 6 de enero y a la Virgen de la Natividad el 8 de septiembre, patrona de todo Tepoztlán.',
          highlights: [
            'Símbolo del barrio: Gusano de mamey',
            'Fiesta de los Santos Reyes (6 enero)',
            'Virgen de la Natividad (8 septiembre)',
            'Procesiones solemnes'
          ],
          traditions: 'El 6 de enero celebran a los Santos Reyes. El 8 de septiembre es la fiesta más importante del barrio, honrando a la Virgen de la Natividad, patrona de todo Tepoztlán.',
          icon: Star,
          color: 'from-purple-500 to-pink-500',
          location: { lat: 18.988, lng: -99.090 }
        },
        {
          id: 'san-jose',
          name: 'San José',
          patron: 'San José',
          festival: '9 de Marzo',
          symbol: '🌽 Maíz',
          description: 'También conocido como "la hoja", celebra a San José el 9 de marzo con preparación tradicional de mole, música en la capilla de calle Allende y baile nocturno.',
          highlights: [
            'Símbolo del barrio: Maíz/Hoja',
            'Fiesta de San José (9 marzo)',
            'Tradición del mole en hogares',
            'Música y baile nocturno en capilla'
          ],
          traditions: 'El 9 de marzo las familias preparan mole tradicional en sus hogares. Por la noche, música y baile en la capilla de calle Allende celebran a San José.',
          icon: Home,
          color: 'from-indigo-500 to-blue-500',
          location: { lat: 18.981, lng: -99.093 }
        }
      ],
      sections: {
        overview: {
          title: 'Organización Tradicional',
          description: 'Los ocho barrios de Tepoztlán mantienen el orden establecido desde tiempos coloniales, e incluso desde antes de la llegada de los españoles. Cada barrio tiene su propia identidad, capilla y celebraciones patronales.'
        },
        traditions: {
          title: 'Tradiciones Vivas',
          description: 'Cada barrio preserva sus propias tradiciones, desde danzas de chinelos hasta procesiones religiosas, manteniendo viva la herencia cultural de Tepoztlán.'
        },
        festivals: {
          title: 'Fiestas Patronales',
          description: 'A lo largo del año, cada barrio celebra a su santo patrono con música, danza, comida tradicional y fuegos artificiales.'
        }
      },
      viewModes: {
        map: 'Vista de Mapa',
        grid: 'Vista de Cuadrícula'
      },
      details: {
        patron: 'Santo Patrono',
        festival: 'Fiesta Patronal',
        highlights: 'Características',
        traditions: 'Tradiciones',
        location: 'Ubicación',
        learnMore: 'Descubrir más'
      },
      cta: {
        title: '¿Listo para explorar los barrios?',
        description: 'Descubre la riqueza cultural y las tradiciones únicas de cada barrio de Tepoztlán',
        button: 'Planear Recorrido'
      }
    },
    en: {
      hero: {
        badge: 'Eight Traditional Neighborhoods',
        title: 'The Barrios of',
        titleHighlight: 'TEPOZTLÁN',
        subtitle: 'Where each neighborhood tells its own story',
        description: 'Discover the eight traditional neighborhoods that form the cultural fabric of Tepoztlán, each with its colonial chapel, patron saint and unique traditions preserved for generations.',
        stats: {
          barrios: '8 Barrios',
          chapels: '8 Chapels',
          festivals: '8+ Festivals',
          history: '500+ Years'
        }
      },
      barrios: [
        {
          id: 'santo-domingo',
          name: 'Santo Domingo',
          patron: 'Saint Dominic of Guzmán',
          festival: 'August 4',
          symbol: '🐸 Toad',
          description: 'One of the largest neighborhoods in Tepoztlán, celebrates its grand patron festival on August 4 in Santo Domingo Ocotitlán.',
          highlights: [
            'Symbol: Toad',
            'Grand festival on August 4',
            'Preserved colonial architecture',
            'Traditional artisan community'
          ],
          traditions: 'The neighborhood is distinguished by its centuries-old traditions, religious processions and traditional crafts production.',
          icon: Church,
          color: 'from-purple-500 to-indigo-500',
          location: { lat: 18.985, lng: -99.093 }
        },
        {
          id: 'san-miguel',
          name: 'San Miguel',
          patron: 'Saint Michael the Archangel',
          festival: 'May 8 & September 29',
          symbol: '🦎 Lizard',
          description: 'Neighborhood dedicated to Archangel Michael, celebrates two annual festivities with music and spectacular nighttime fireworks castles.',
          highlights: [
            'Symbol: Lizard',
            'Double celebration: May 8 & Sept 29',
            'Traditional music and band',
            'Nighttime fireworks castle'
          ],
          traditions: 'Festivities on May 8 and September 29 include traditional music, processions and spectacular fireworks that light up the night.',
          icon: Mountain,
          color: 'from-blue-500 to-cyan-500',
          location: { lat: 18.984, lng: -99.095 }
        },
        {
          id: 'la-santisima',
          name: 'La Santísima Trinidad',
          patron: 'Lord of the Holy Trinity',
          festival: 'June (movable date)',
          symbol: '🐜 Ant',
          description: 'Neighborhood that celebrates the Lord of the Holy Trinity in June with traditional mole and nighttime fireworks castle.',
          highlights: [
            'Symbol: Ant',
            'June festival with movable date',
            'Traditional mole preparation',
            'Nighttime fireworks castle'
          ],
          traditions: 'The June festivity is characterized by communal mole preparation, religious processions and spectacular nighttime fireworks.',
          icon: Sparkles,
          color: 'from-amber-500 to-orange-500',
          location: { lat: 18.983, lng: -99.091 }
        },
        {
          id: 'santa-cruz',
          name: 'Santa Cruz',
          patron: 'Holy Cross / Holy Savior',
          festival: 'May 3 & August 6',
          symbol: '🦝 Ringtail',
          description: 'Neighborhood with double festivity, celebrates Holy Cross on May 3 with muleteers bringing offerings, and Holy Savior on August 6.',
          highlights: [
            'Symbol: Ringtail (Cacomixtle)',
            'Double festival: May 3 & Aug 6',
            'Muleteers with floral offerings',
            'Virgin of the Rosary feast (Oct 7)'
          ],
          traditions: 'On May 3, muleteers bring offerings to the Holy Cross. On August 6 they celebrate Holy Savior. They also celebrate the Virgin of the Rosary on October 7.',
          icon: TreePine,
          color: 'from-green-500 to-emerald-500',
          location: { lat: 18.986, lng: -99.092 }
        },
        {
          id: 'san-sebastian',
          name: 'San Sebastián',
          patron: 'Saint Sebastian Martyr / Assumption of Mary',
          festival: 'January 21 & August 15',
          symbol: '🦂 Scorpion',
          description: 'Famous for "los tiznados" on January 21, announcing carnival with chinelo dances and jaripeo. Also celebrates the Assumption on August 15.',
          highlights: [
            'Symbol: Scorpion',
            'Unique "los tiznados" tradition',
            'Chinelo dances and jaripeo',
            'Assumption feast (Aug 15)'
          ],
          traditions: 'On January 21, people painted black (tiznados) parade through town announcing carnival with chinelos, jaripeo and music. On August 15 they celebrate the Virgin of the Assumption.',
          icon: Music,
          color: 'from-red-500 to-pink-500',
          location: { lat: 18.987, lng: -99.094 }
        },
        {
          id: 'san-pedro',
          name: 'San Pedro',
          patron: 'Saint Peter and Saint Paul',
          festival: 'April 29-30 & June 29',
          symbol: '🦨 Opossum',
          description: 'Neighborhood famous for traditional children\'s "dancitas" performed April 29-30 and the feast of Saint Peter and Paul on June 29.',
          highlights: [
            'Symbol: Opossum (Tlacuache)',
            'Traditional children\'s dancitas',
            'April 29-30 festival',
            'Saint Peter and Paul celebration (June 29)'
          ],
          traditions: 'Traditional "dancitas" on April 29-30 are performed by local children with community participation. On June 29 they celebrate Saint Peter and Paul with music and traditional food.',
          icon: Users,
          color: 'from-teal-500 to-cyan-500',
          location: { lat: 18.982, lng: -99.096 }
        },
        {
          id: 'los-reyes',
          name: 'Los Reyes',
          patron: 'The Holy Kings / Virgin of the Nativity',
          festival: 'January 6 & September 8',
          symbol: '🐛 Mamey Worm',
          description: 'Neighborhood that celebrates the Holy Kings on January 6 and the Virgin of the Nativity on September 8, patroness of all Tepoztlán.',
          highlights: [
            'Symbol: Mamey worm',
            'Holy Kings feast (Jan 6)',
            'Virgin of the Nativity (Sept 8)',
            'Solemn processions'
          ],
          traditions: 'On January 6 they celebrate the Holy Kings. September 8 is the most important feast of the neighborhood, honoring the Virgin of the Nativity, patroness of all Tepoztlán.',
          icon: Star,
          color: 'from-purple-500 to-pink-500',
          location: { lat: 18.988, lng: -99.090 }
        },
        {
          id: 'san-jose',
          name: 'San José',
          patron: 'Saint Joseph',
          festival: 'March 9',
          symbol: '🌽 Corn',
          description: 'Also known as "la hoja", celebrates Saint Joseph on March 9 with traditional mole preparation, music at the Allende street chapel and nighttime dancing.',
          highlights: [
            'Symbol: Corn/Leaf',
            'Saint Joseph feast (March 9)',
            'Mole tradition in homes',
            'Music and night dancing at chapel'
          ],
          traditions: 'On March 9, families prepare traditional mole in their homes. At night, music and dancing at the Allende street chapel celebrate Saint Joseph.',
          icon: Home,
          color: 'from-indigo-500 to-blue-500',
          location: { lat: 18.981, lng: -99.093 }
        }
      ],
      sections: {
        overview: {
          title: 'Traditional Organization',
          description: 'The eight neighborhoods of Tepoztlán maintain the order established since colonial times, and even before the Spanish arrival. Each neighborhood has its own identity, chapel and patron celebrations.'
        },
        traditions: {
          title: 'Living Traditions',
          description: 'Each neighborhood preserves its own traditions, from chinelo dances to religious processions, keeping Tepoztlán\'s cultural heritage alive.'
        },
        festivals: {
          title: 'Patron Festivals',
          description: 'Throughout the year, each neighborhood celebrates its patron saint with music, dance, traditional food and fireworks.'
        }
      },
      viewModes: {
        map: 'Map View',
        grid: 'Grid View'
      },
      details: {
        patron: 'Patron Saint',
        festival: 'Patron Festival',
        highlights: 'Highlights',
        traditions: 'Traditions',
        location: 'Location',
        learnMore: 'Learn More'
      },
      cta: {
        title: 'Ready to explore the neighborhoods?',
        description: 'Discover the cultural richness and unique traditions of each Tepoztlán neighborhood',
        button: 'Plan Your Tour'
      }
    }
  }

  const t = content[lang]

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-indigo-400 to-purple-400"
        style={{ scaleX: progress, transformOrigin: "0%" }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/50 to-pink-900/50" />
            
            {/* Floating Barrio Icons */}
            <div className="absolute inset-0">
              {t.barrios.map((barrio, index) => (
                <motion.div
                  key={barrio.id}
                  className="absolute"
                  initial={{ 
                    x: `${20 + (index % 4) * 20}%`,
                    y: `${20 + Math.floor(index / 4) * 40}%`
                  }}
                  animate={{
                    y: [`${20 + Math.floor(index / 4) * 40}%`, `${15 + Math.floor(index / 4) * 40}%`, `${20 + Math.floor(index / 4) * 40}%`],
                  }}
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${barrio.color} rounded-2xl flex items-center justify-center opacity-20 blur-xl`}>
                    <barrio.icon className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
              <MapPin className="w-4 h-4 mr-2" />
              {t.hero.badge}
              <MapPin className="w-4 h-4 ml-2" />
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold">
              <span className="text-white drop-shadow-2xl">{t.hero.title}</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 font-light max-w-4xl mx-auto">
              {t.hero.subtitle}
            </p>

            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              {t.hero.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-12">
              {Object.entries(t.hero.stats).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-2xl"
                >
                  <div className="text-2xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                    {value}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* View Toggle */}
      <section className="relative py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setActiveView('grid')}
              className={`${
                activeView === 'grid'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                  : 'bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4 mr-2" />
              {t.viewModes.grid}
            </Button>
            <Button
              onClick={() => setActiveView('map')}
              className={`${
                activeView === 'map'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                  : 'bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              <MapPin className="w-4 h-4 mr-2" />
              {t.viewModes.map}
            </Button>
          </div>
        </div>
      </section>

      {/* Barrios Grid/Map */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4">
          {activeView === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.barrios.map((barrio, index) => {
                const Icon = barrio.icon
                return (
                  <motion.div
                    key={barrio.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedBarrio(barrio.id)}
                    className="cursor-pointer"
                  >
                    <Card className="h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 overflow-hidden">
                      <div className={`h-2 bg-gradient-to-r ${barrio.color}`} />
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${barrio.color} rounded-xl flex items-center justify-center shadow-xl`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <Badge className="bg-white/10 text-white/70">
                            <Calendar className="w-3 h-3 mr-1" />
                            {barrio.festival}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-bold text-white mb-2">
                          {barrio.name}
                        </CardTitle>
                        <p className="text-sm text-white/50">
                          {barrio.patron}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-white/70 text-sm mb-4">
                          {barrio.description}
                        </p>
                        <div className="space-y-2">
                          {barrio.highlights.slice(0, 2).map((highlight, i) => (
                            <div key={i} className="flex items-center text-white/50 text-xs">
                              <ChevronRight className="w-3 h-3 mr-1 text-indigo-400" />
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <div className="relative h-[600px] bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
              {/* Simplified Map View */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full max-w-4xl">
                  {t.barrios.map((barrio, index) => {
                    const Icon = barrio.icon
                    const angle = (index * 360) / t.barrios.length
                    const radius = 35
                    const x = 50 + radius * Math.cos((angle * Math.PI) / 180)
                    const y = 50 + radius * Math.sin((angle * Math.PI) / 180)
                    
                    return (
                      <motion.div
                        key={barrio.id}
                        className="absolute cursor-pointer"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.2 }}
                        onClick={() => setSelectedBarrio(barrio.id)}
                      >
                        <div className="relative group">
                          <div className={`w-16 h-16 bg-gradient-to-br ${barrio.color} rounded-2xl flex items-center justify-center shadow-2xl`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                            <p className="text-white/80 text-sm font-semibold">
                              {barrio.name}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                  
                  {/* Center point - Main Church */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-2xl">
                      <Church className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-white/80 text-sm font-bold mt-2 text-center">
                      {lang === 'es' ? 'Centro' : 'Center'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Selected Barrio Detail Modal */}
      <AnimatePresence>
        {selectedBarrio && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedBarrio(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-white/10 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const barrio = t.barrios.find(b => b.id === selectedBarrio)
                if (!barrio) return null
                const Icon = barrio.icon
                
                return (
                  <div>
                    <div className={`h-3 bg-gradient-to-r ${barrio.color}`} />
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-16 bg-gradient-to-br ${barrio.color} rounded-2xl flex items-center justify-center shadow-xl`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white">{barrio.name}</h3>
                            <p className="text-white/60">{barrio.patron}</p>
                          </div>
                        </div>
                        <Button
                          onClick={() => setSelectedBarrio(null)}
                          variant="ghost"
                          className="text-white/60 hover:text-white"
                        >
                          ✕
                        </Button>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-indigo-400" />
                            {t.details.festival}
                          </h4>
                          <p className="text-white/70">{barrio.festival}</p>
                        </div>

                        <div>
                          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                            <Info className="w-4 h-4 text-indigo-400" />
                            {lang === 'es' ? 'Descripción' : 'Description'}
                          </h4>
                          <p className="text-white/70">{barrio.description}</p>
                        </div>

                        <div>
                          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                            <Star className="w-4 h-4 text-indigo-400" />
                            {t.details.highlights}
                          </h4>
                          <ul className="space-y-2">
                            {barrio.highlights.map((highlight, i) => (
                              <li key={i} className="flex items-start text-white/70 text-sm">
                                <ChevronRight className="w-4 h-4 mr-2 text-indigo-400 flex-shrink-0 mt-0.5" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                            <Heart className="w-4 h-4 text-indigo-400" />
                            {t.details.traditions}
                          </h4>
                          <p className="text-white/70">{barrio.traditions}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Traditions Section */}
      <section className="relative py-20 bg-gradient-to-b from-transparent via-indigo-950/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t.sections.traditions.title}
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              {t.sections.traditions.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
                <CardContent className="p-6">
                  <Music className="w-12 h-12 text-indigo-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    {lang === 'es' ? 'Danzas de Chinelos' : 'Chinelo Dances'}
                  </h3>
                  <p className="text-white/70">
                    {lang === 'es'
                      ? 'Tradicionales danzas con máscaras coloridas y saltos característicos al ritmo de la música.'
                      : 'Traditional dances with colorful masks and characteristic jumps to the rhythm of music.'}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
                <CardContent className="p-6">
                  <Church className="w-12 h-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    {lang === 'es' ? 'Procesiones Religiosas' : 'Religious Processions'}
                  </h3>
                  <p className="text-white/70">
                    {lang === 'es'
                      ? 'Cada barrio organiza procesiones solemnes en honor a su santo patrono con gran devoción.'
                      : 'Each neighborhood organizes solemn processions honoring their patron saint with great devotion.'}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
                <CardContent className="p-6">
                  <Sparkles className="w-12 h-12 text-pink-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    {lang === 'es' ? 'Fuegos Artificiales' : 'Fireworks'}
                  </h3>
                  <p className="text-white/70">
                    {lang === 'es'
                      ? 'Espectaculares exhibiciones de fuegos artificiales iluminan el cielo durante las festividades.'
                      : 'Spectacular fireworks displays light up the sky during festivities.'}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-xl rounded-3xl border border-white/10 p-12 shadow-2xl text-center"
          >
            <MapPin className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.cta.title}
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              {t.cta.description}
            </p>
            <Link href={buildLocalizedUrl('/discover/tepoztlan/practical-info', lang)}>
              <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-6 text-lg shadow-2xl">
                {t.cta.button}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}