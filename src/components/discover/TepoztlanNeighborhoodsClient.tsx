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
          festival: '12 de Diciembre',
          description: 'El segundo barrio más extenso, conocido por su devoción a la Virgen de Guadalupe y sus tradiciones centenarias.',
          highlights: [
            'Segunda mayor extensión territorial',
            'Celebración guadalupana más grande',
            'Arquitectura colonial preservada',
            'Comunidad de artesanos tradicionales'
          ],
          traditions: 'Famoso por sus procesiones guadalupanas, danzas de chinelos y la elaboración de artesanías tradicionales.',
          icon: Church,
          color: 'from-purple-500 to-indigo-500',
          location: { lat: 18.985, lng: -99.093 }
        },
        {
          id: 'san-miguel',
          name: 'San Miguel',
          patron: 'San Miguel Arcángel',
          festival: '8 de Mayo y 29 de Septiembre',
          description: 'Tercer barrio en extensión, conocido por sus murales religiosos y el emblema del lagarto como símbolo protector.',
          highlights: [
            'Murales de arcángeles en la capilla',
            'Símbolo del lagarto prehispánico',
            'Doble celebración anual',
            'Fuegos artificiales nocturnos'
          ],
          traditions: 'Celebraciones con música tradicional, fuegos artificiales y el culto al lagarto como protector guerrero.',
          icon: Mountain,
          color: 'from-blue-500 to-cyan-500',
          location: { lat: 18.984, lng: -99.095 }
        },
        {
          id: 'la-santisima',
          name: 'La Santísima Trinidad',
          patron: 'Santísima Trinidad',
          festival: 'Domingo de Trinidad',
          description: 'El barrio más extenso de Tepoztlán, celebra el misterio de la Trinidad con gran devoción y tradición.',
          highlights: [
            'Mayor extensión territorial',
            'Celebración móvil según Pascua',
            'Tradiciones sincréticas únicas',
            'Vista panorámica del valle'
          ],
          traditions: 'Festividades que combinan rituales católicos con elementos prehispánicos, danzas tradicionales y comida comunitaria.',
          icon: Sparkles,
          color: 'from-amber-500 to-orange-500',
          location: { lat: 18.983, lng: -99.091 }
        },
        {
          id: 'santa-cruz',
          name: 'Santa Cruz',
          patron: 'Santa Cruz',
          festival: '3 de Mayo',
          description: 'Barrio dedicado a la Santa Cruz, con tradiciones de bendición de cruces en los cerros sagrados.',
          highlights: [
            'Bendición de cruces en cerros',
            'Peregrinaciones a sitios sagrados',
            'Tradición de flores y ofrendas',
            'Música de viento tradicional'
          ],
          traditions: 'Celebración del Día de la Santa Cruz con bendiciones, procesiones a los cerros y decoración floral de cruces.',
          icon: TreePine,
          color: 'from-green-500 to-emerald-500',
          location: { lat: 18.986, lng: -99.092 }
        },
        {
          id: 'san-sebastian',
          name: 'San Sebastián',
          patron: 'San Sebastián Mártir',
          festival: '21 de Enero',
          description: 'Conocido por "los tiznados" y el inicio del carnaval, con danzas de chinelos y jaripeo tradicional.',
          highlights: [
            'Tradición de "los tiznados"',
            'Inicio del carnaval tepozteco',
            'Danzas de chinelos',
            'Jaripeo y rodeo tradicional'
          ],
          traditions: 'Festival con personas pintadas de negro (tiznados), anunciando el carnaval con música, danza y celebraciones.',
          icon: Music,
          color: 'from-red-500 to-pink-500',
          location: { lat: 18.987, lng: -99.094 }
        },
        {
          id: 'san-pedro',
          name: 'San Pedro',
          patron: 'San Pedro Apóstol',
          festival: '29-30 de Junio',
          description: 'Barrio con tradición de "dancitas" infantiles y celebraciones que involucran a toda la comunidad.',
          highlights: [
            'Danzas infantiles tradicionales',
            'Participación comunitaria activa',
            'Tradición de dos días de fiesta',
            'Gastronomía típica compartida'
          ],
          traditions: 'Festividad con "dancitas" ejecutadas por niños locales, compartiendo comida tradicional y música.',
          icon: Users,
          color: 'from-teal-500 to-cyan-500',
          location: { lat: 18.982, lng: -99.096 }
        },
        {
          id: 'los-reyes',
          name: 'Los Reyes',
          patron: 'Los Santos Reyes',
          festival: '8 de Septiembre',
          description: 'Barrio que celebra a los Reyes Magos y la Natividad de María con gran devoción.',
          highlights: [
            'Celebración de la Natividad',
            'Tradiciones sincréticas',
            'Música de banda de viento',
            'Procesiones solemnes'
          ],
          traditions: 'Combinación de ceremonias católicas con costumbres prehispánicas, procesiones y música tradicional.',
          icon: Star,
          color: 'from-purple-500 to-pink-500',
          location: { lat: 18.988, lng: -99.090 }
        },
        {
          id: 'san-jose',
          name: 'San José',
          patron: 'San José',
          festival: '19 de Marzo',
          description: 'También llamado "la hoja", sus habitantes son conocidos como "totomaxtleros" con tradición de mole.',
          highlights: [
            'Apodo: "La Hoja"',
            'Habitantes: "Totomaxtleros"',
            'Tradición del mole en casas',
            'Baile nocturno en la capilla'
          ],
          traditions: 'Celebración con mole tradicional en hogares, música en la capilla de la calle Allende y baile nocturno.',
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
          festival: 'December 12',
          description: 'The second largest neighborhood, known for its devotion to the Virgin of Guadalupe and centuries-old traditions.',
          highlights: [
            'Second largest territorial extension',
            'Largest Guadalupe celebration',
            'Preserved colonial architecture',
            'Traditional artisan community'
          ],
          traditions: 'Famous for its Guadalupe processions, chinelo dances and traditional crafts production.',
          icon: Church,
          color: 'from-purple-500 to-indigo-500',
          location: { lat: 18.985, lng: -99.093 }
        },
        {
          id: 'san-miguel',
          name: 'San Miguel',
          patron: 'Saint Michael the Archangel',
          festival: 'May 8 & September 29',
          description: 'Third neighborhood in extension, known for its religious murals and the lizard emblem as protective symbol.',
          highlights: [
            'Archangel murals in chapel',
            'Pre-Hispanic lizard symbol',
            'Double annual celebration',
            'Nighttime fireworks'
          ],
          traditions: 'Celebrations with traditional music, fireworks and the lizard cult as warrior protector.',
          icon: Mountain,
          color: 'from-blue-500 to-cyan-500',
          location: { lat: 18.984, lng: -99.095 }
        },
        {
          id: 'la-santisima',
          name: 'La Santísima Trinidad',
          patron: 'Holy Trinity',
          festival: 'Trinity Sunday',
          description: 'The largest neighborhood in Tepoztlán, celebrates the Trinity mystery with great devotion and tradition.',
          highlights: [
            'Largest territorial extension',
            'Mobile celebration based on Easter',
            'Unique syncretic traditions',
            'Panoramic valley view'
          ],
          traditions: 'Festivities combining Catholic rituals with pre-Hispanic elements, traditional dances and community meals.',
          icon: Sparkles,
          color: 'from-amber-500 to-orange-500',
          location: { lat: 18.983, lng: -99.091 }
        },
        {
          id: 'santa-cruz',
          name: 'Santa Cruz',
          patron: 'Holy Cross',
          festival: 'May 3',
          description: 'Neighborhood dedicated to the Holy Cross, with traditions of blessing crosses on sacred hills.',
          highlights: [
            'Cross blessing on hills',
            'Pilgrimages to sacred sites',
            'Flower and offering tradition',
            'Traditional wind music'
          ],
          traditions: 'Holy Cross Day celebration with blessings, hill processions and floral cross decoration.',
          icon: TreePine,
          color: 'from-green-500 to-emerald-500',
          location: { lat: 18.986, lng: -99.092 }
        },
        {
          id: 'san-sebastian',
          name: 'San Sebastián',
          patron: 'Saint Sebastian Martyr',
          festival: 'January 21',
          description: 'Known for "the blackened ones" and carnival beginning, with chinelo dances and traditional rodeo.',
          highlights: [
            '"Los tiznados" tradition',
            'Tepozteco carnival beginning',
            'Chinelo dances',
            'Traditional jaripeo rodeo'
          ],
          traditions: 'Festival with people painted black (tiznados), announcing carnival with music, dance and celebrations.',
          icon: Music,
          color: 'from-red-500 to-pink-500',
          location: { lat: 18.987, lng: -99.094 }
        },
        {
          id: 'san-pedro',
          name: 'San Pedro',
          patron: 'Saint Peter the Apostle',
          festival: 'June 29-30',
          description: 'Neighborhood with tradition of children\'s "dancitas" and celebrations involving the entire community.',
          highlights: [
            'Traditional children dances',
            'Active community participation',
            'Two-day festival tradition',
            'Shared typical gastronomy'
          ],
          traditions: 'Festival with "dancitas" performed by local children, sharing traditional food and music.',
          icon: Users,
          color: 'from-teal-500 to-cyan-500',
          location: { lat: 18.982, lng: -99.096 }
        },
        {
          id: 'los-reyes',
          name: 'Los Reyes',
          patron: 'The Holy Kings',
          festival: 'September 8',
          description: 'Neighborhood celebrating the Three Kings and the Nativity of Mary with great devotion.',
          highlights: [
            'Nativity celebration',
            'Syncretic traditions',
            'Wind band music',
            'Solemn processions'
          ],
          traditions: 'Combination of Catholic ceremonies with pre-Hispanic customs, processions and traditional music.',
          icon: Star,
          color: 'from-purple-500 to-pink-500',
          location: { lat: 18.988, lng: -99.090 }
        },
        {
          id: 'san-jose',
          name: 'San José',
          patron: 'Saint Joseph',
          festival: 'March 19',
          description: 'Also called "la hoja", its inhabitants known as "totomaxtleros" with mole tradition.',
          highlights: [
            'Nickname: "La Hoja"',
            'Inhabitants: "Totomaxtleros"',
            'Mole tradition in homes',
            'Night dancing at chapel'
          ],
          traditions: 'Celebration with traditional mole in homes, music at Allende street chapel and night dancing.',
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