'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { 
  MapPin, Mountain, Users, Thermometer, Shield,
  TreePine, Bird, Flower2, Map, 
  Award, Globe, Sparkles, ArrowRight,
  Zap, Sun, Cloud, Wind, Route
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { buildLocalizedUrl } from '@/lib/url-mapping'

interface TepoztlanOverviewClientProps {
  lang: 'es' | 'en'
}

export default function TepoztlanOverviewClient({ lang }: TepoztlanOverviewClientProps) {
  const [activeSection, setActiveSection] = useState('location')
  const [progress, setProgress] = useState(0)
  const [floatingElements, setFloatingElements] = useState<Array<{x: number, y: number, duration: number, delay: number}>>([])
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const unsubscribe = springProgress.onChange(v => setProgress(v * 100))
    return unsubscribe
  }, [springProgress])

  useEffect(() => {
    setMounted(true)
    const elements = Array(30).fill(null).map(() => ({
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }))
    setFloatingElements(elements)
  }, [])

  const content = {
    es: {
      hero: {
        badge: 'Pueblo Mágico desde 2002',
        title: 'TEPOZTLÁN',
        subtitle: 'Donde la magia cobra vida',
        description: 'Un místico pueblo enclavado entre montañas sagradas, donde convergen historia milenaria, naturaleza extraordinaria y energía espiritual única.',
        stats: [
          { icon: MapPin, label: 'Ubicación', value: '75km de CDMX', detail: 'Morelos, México' },
          { icon: Mountain, label: 'Altitud', value: '1,713m', detail: 'sobre el nivel del mar' },
          { icon: Users, label: 'Población', value: '14,719', detail: 'habitantes' },
          { icon: Thermometer, label: 'Temperatura', value: '19-24°C', detail: 'promedio anual' }
        ]
      },
      sections: {
        location: {
          title: 'Ubicación Estratégica',
          subtitle: 'En el corazón de México',
          description: 'Tepoztlán se encuentra estratégicamente ubicado en el estado de Morelos, a solo 75 km al sur de la Ciudad de México y 17 km al noreste de Cuernavaca.',
          features: [
            {
              icon: Route,
              title: 'Accesibilidad',
              description: 'Fácil acceso desde las principales ciudades del centro de México'
            },
            {
              icon: Mountain,
              title: 'Entorno Natural',
              description: 'Rodeado por las impresionantes montañas de la Sierra del Tepozteco'
            },
            {
              icon: Map,
              title: 'Ubicación Privilegiada',
              description: 'Entre dos importantes centros urbanos: CDMX y Cuernavaca'
            }
          ],
          distances: [
            { city: 'Ciudad de México', distance: '75 km', time: '1h 15min' },
            { city: 'Cuernavaca', distance: '17 km', time: '25 min' },
            { city: 'Aeropuerto CDMX', distance: '95 km', time: '1h 30min' },
            { city: 'Puebla', distance: '145 km', time: '2h 30min' }
          ]
        },
        geography: {
          title: 'Geografía Única',
          subtitle: 'Entre montañas y valles',
          description: 'Tepoztlán se asienta en un valle montañoso rodeado por dramáticos acantilados de tonos cobrizos, parte del Parque Nacional El Tepozteco.',
          highlights: [
            {
              title: 'Parque Nacional El Tepozteco',
              value: '24,000',
              unit: 'hectáreas protegidas',
              icon: TreePine
            },
            {
              title: 'Cerro del Tepozteco',
              value: '2,310',
              unit: 'metros de altura',
              icon: Mountain
            },
            {
              title: 'Sierra de Tepoztlán',
              value: '232.58',
              unit: 'km² de extensión',
              icon: Map
            }
          ],
          ecosystems: [
            'Bosque de pino-encino',
            'Selva baja caducifolia',
            'Vegetación riparia',
            'Matorral xerófilo'
          ]
        },
        climate: {
          title: 'Clima Perfecto',
          subtitle: 'Primavera eterna',
          description: 'Tepoztlán goza de un clima templado subhúmedo con lluvias en verano, ideal para visitar durante todo el año.',
          seasons: [
            {
              name: 'Primavera',
              months: 'Mar - May',
              temp: '22-28°C',
              icon: Sun,
              description: 'Días soleados y temperaturas agradables'
            },
            {
              name: 'Verano',
              months: 'Jun - Ago',
              temp: '20-26°C',
              icon: Cloud,
              description: 'Lluvias refrescantes por las tardes'
            },
            {
              name: 'Otoño',
              months: 'Sep - Nov',
              temp: '19-25°C',
              icon: Wind,
              description: 'Clima fresco y cielos despejados'
            },
            {
              name: 'Invierno',
              months: 'Dic - Feb',
              temp: '15-23°C',
              icon: Thermometer,
              description: 'Días templados, noches frescas'
            }
          ],
          bestTime: {
            title: 'Mejor época para visitar',
            months: 'Octubre - Mayo',
            reason: 'Clima seco y temperaturas ideales para actividades al aire libre'
          }
        },
        biodiversity: {
          title: 'Biodiversidad Extraordinaria',
          subtitle: 'Un tesoro natural',
          description: 'El Parque Nacional El Tepozteco alberga una rica biodiversidad con especies endémicas y ecosistemas únicos.',
          stats: [
            { category: 'Aves', count: '126', endemic: '42', icon: Bird },
            { category: 'Mamíferos', count: '35', endemic: '3', icon: Users },
            { category: 'Reptiles', count: '27', endemic: '19', icon: Shield },
            { category: 'Flora', count: '800+', endemic: '150+', icon: Flower2 }
          ],
          highlights: [
            {
              type: 'Ave Emblemática',
              name: 'Águila Real',
              status: 'Protegida',
              description: 'Símbolo nacional de México'
            },
            {
              type: 'Mamífero Notable',
              name: 'Venado Cola Blanca',
              status: 'Común',
              description: 'Habitante de los bosques'
            },
            {
              type: 'Reptil Endémico',
              name: 'Cascabel Pigmea',
              status: 'Endémica',
              description: 'Exclusiva de la región'
            },
            {
              type: 'Flora Especial',
              name: 'Encino Tepozteco',
              status: 'Nativa',
              description: 'Árbol característico'
            }
          ]
        },
        history: {
          title: 'Historia Milenaria',
          subtitle: '2000+ años de legado',
          timeline: [
            {
              year: '1200 a.C.',
              event: 'Primeros asentamientos',
              description: 'Grupos olmecoides se establecen en la región'
            },
            {
              year: '1230 d.C.',
              event: 'Construcción del Tepozteco',
              description: 'Se edifica el templo dedicado a Tepoztécatl'
            },
            {
              year: '1502',
              event: 'Dominio Azteca',
              description: 'Tepoztlán es conquistado por Moctezuma Ilhuicamina'
            },
            {
              year: '1521',
              event: 'Conquista Española',
              description: 'Llegada de los conquistadores españoles'
            },
            {
              year: '1559',
              event: 'Convento Dominico',
              description: 'Construcción del Ex-convento de la Natividad'
            },
            {
              year: '2002',
              event: 'Pueblo Mágico',
              description: 'Designación como Pueblo Mágico de México'
            }
          ]
        },
        culture: {
          title: 'Riqueza Cultural',
          subtitle: 'Tradiciones vivas',
          aspects: [
            {
              title: 'Lengua Náhuatl',
              description: 'Aún se enseña en las escuelas locales',
              icon: Globe
            },
            {
              title: 'Leyenda de Quetzalcóatl',
              description: 'Lugar de nacimiento de la serpiente emplumada',
              icon: Sparkles
            },
            {
              title: 'Carnaval más grande',
              description: 'El carnaval más importante de Morelos',
              icon: Award
            },
            {
              title: 'Centro energético',
              description: 'Considerado un punto de energía espiritual',
              icon: Zap
            }
          ]
        }
      },
      cta: {
        title: '¿Listo para explorar Tepoztlán?',
        description: 'Descubre todas las maravillas que este Pueblo Mágico tiene para ofrecer',
        buttons: [
          { text: 'Ver Atracciones', link: '/discover/tepoztlan' },
          { text: 'Planear Visita', link: '/discover/tepoztlan/practical-info' }
        ]
      }
    },
    en: {
      hero: {
        badge: 'Magic Town since 2002',
        title: 'TEPOZTLÁN',
        subtitle: 'Where magic comes to life',
        description: 'A mystical town nestled among sacred mountains, where millenary history, extraordinary nature and unique spiritual energy converge.',
        stats: [
          { icon: MapPin, label: 'Location', value: '75km from CDMX', detail: 'Morelos, Mexico' },
          { icon: Mountain, label: 'Altitude', value: '1,713m', detail: 'above sea level' },
          { icon: Users, label: 'Population', value: '14,719', detail: 'inhabitants' },
          { icon: Thermometer, label: 'Temperature', value: '19-24°C', detail: 'annual average' }
        ]
      },
      sections: {
        location: {
          title: 'Strategic Location',
          subtitle: 'In the heart of Mexico',
          description: 'Tepoztlán is strategically located in the state of Morelos, just 75 km south of Mexico City and 17 km northeast of Cuernavaca.',
          features: [
            {
              icon: Route,
              title: 'Accessibility',
              description: 'Easy access from major cities in central Mexico'
            },
            {
              icon: Mountain,
              title: 'Natural Setting',
              description: 'Surrounded by the impressive Sierra del Tepozteco mountains'
            },
            {
              icon: Map,
              title: 'Privileged Location',
              description: 'Between two important urban centers: CDMX and Cuernavaca'
            }
          ],
          distances: [
            { city: 'Mexico City', distance: '75 km', time: '1h 15min' },
            { city: 'Cuernavaca', distance: '17 km', time: '25 min' },
            { city: 'CDMX Airport', distance: '95 km', time: '1h 30min' },
            { city: 'Puebla', distance: '145 km', time: '2h 30min' }
          ]
        },
        geography: {
          title: 'Unique Geography',
          subtitle: 'Between mountains and valleys',
          description: 'Tepoztlán sits in a mountain valley surrounded by dramatic copper-toned cliffs, part of El Tepozteco National Park.',
          highlights: [
            {
              title: 'El Tepozteco National Park',
              value: '24,000',
              unit: 'protected hectares',
              icon: TreePine
            },
            {
              title: 'Tepozteco Hill',
              value: '2,310',
              unit: 'meters high',
              icon: Mountain
            },
            {
              title: 'Sierra de Tepoztlán',
              value: '232.58',
              unit: 'km² extension',
              icon: Map
            }
          ],
          ecosystems: [
            'Pine-oak forest',
            'Tropical deciduous forest',
            'Riparian vegetation',
            'Xerophilous scrubland'
          ]
        },
        climate: {
          title: 'Perfect Climate',
          subtitle: 'Eternal spring',
          description: 'Tepoztlán enjoys a temperate sub-humid climate with summer rains, ideal for visiting year-round.',
          seasons: [
            {
              name: 'Spring',
              months: 'Mar - May',
              temp: '22-28°C',
              icon: Sun,
              description: 'Sunny days and pleasant temperatures'
            },
            {
              name: 'Summer',
              months: 'Jun - Aug',
              temp: '20-26°C',
              icon: Cloud,
              description: 'Refreshing afternoon rains'
            },
            {
              name: 'Autumn',
              months: 'Sep - Nov',
              temp: '19-25°C',
              icon: Wind,
              description: 'Cool weather and clear skies'
            },
            {
              name: 'Winter',
              months: 'Dec - Feb',
              temp: '15-23°C',
              icon: Thermometer,
              description: 'Mild days, cool nights'
            }
          ],
          bestTime: {
            title: 'Best time to visit',
            months: 'October - May',
            reason: 'Dry weather and ideal temperatures for outdoor activities'
          }
        },
        biodiversity: {
          title: 'Extraordinary Biodiversity',
          subtitle: 'A natural treasure',
          description: 'El Tepozteco National Park hosts rich biodiversity with endemic species and unique ecosystems.',
          stats: [
            { category: 'Birds', count: '126', endemic: '42', icon: Bird },
            { category: 'Mammals', count: '35', endemic: '3', icon: Users },
            { category: 'Reptiles', count: '27', endemic: '19', icon: Shield },
            { category: 'Flora', count: '800+', endemic: '150+', icon: Flower2 }
          ],
          highlights: [
            {
              type: 'Emblematic Bird',
              name: 'Golden Eagle',
              status: 'Protected',
              description: 'National symbol of Mexico'
            },
            {
              type: 'Notable Mammal',
              name: 'White-tailed Deer',
              status: 'Common',
              description: 'Forest inhabitant'
            },
            {
              type: 'Endemic Reptile',
              name: 'Pygmy Rattlesnake',
              status: 'Endemic',
              description: 'Exclusive to the region'
            },
            {
              type: 'Special Flora',
              name: 'Tepozteco Oak',
              status: 'Native',
              description: 'Characteristic tree'
            }
          ]
        },
        history: {
          title: 'Millenary History',
          subtitle: '2000+ years of legacy',
          timeline: [
            {
              year: '1200 BC',
              event: 'First settlements',
              description: 'Olmecoid groups settle in the region'
            },
            {
              year: '1230 AD',
              event: 'Tepozteco Construction',
              description: 'Temple dedicated to Tepoztécatl is built'
            },
            {
              year: '1502',
              event: 'Aztec Domain',
              description: 'Tepoztlán is conquered by Moctezuma Ilhuicamina'
            },
            {
              year: '1521',
              event: 'Spanish Conquest',
              description: 'Arrival of Spanish conquistadors'
            },
            {
              year: '1559',
              event: 'Dominican Convent',
              description: 'Construction of Ex-convent of Nativity'
            },
            {
              year: '2002',
              event: 'Magic Town',
              description: 'Designation as Magic Town of Mexico'
            }
          ]
        },
        culture: {
          title: 'Cultural Wealth',
          subtitle: 'Living traditions',
          aspects: [
            {
              title: 'Nahuatl Language',
              description: 'Still taught in local schools',
              icon: Globe
            },
            {
              title: 'Quetzalcoatl Legend',
              description: 'Birthplace of the feathered serpent',
              icon: Sparkles
            },
            {
              title: 'Largest Carnival',
              description: 'The most important carnival in Morelos',
              icon: Award
            },
            {
              title: 'Energy Center',
              description: 'Considered a spiritual energy point',
              icon: Zap
            }
          ]
        }
      },
      cta: {
        title: 'Ready to explore Tepoztlán?',
        description: 'Discover all the wonders this Magic Town has to offer',
        buttons: [
          { text: 'View Attractions', link: '/discover/tepoztlan' },
          { text: 'Plan Your Visit', link: '/discover/tepoztlan/practical-info' }
        ]
      }
    }
  }

  const t = content[lang]

  const locationRef = useRef<HTMLElement>(null)
  const geographyRef = useRef<HTMLElement>(null)
  const climateRef = useRef<HTMLElement>(null)
  const biodiversityRef = useRef<HTMLElement>(null)
  const historyRef = useRef<HTMLElement>(null)
  const cultureRef = useRef<HTMLElement>(null)

  const sectionRefs = useMemo(() => ({
    location: locationRef,
    geography: geographyRef,
    climate: climateRef,
    biodiversity: biodiversityRef,
    history: historyRef,
    culture: cultureRef
  }), [locationRef, geographyRef, climateRef, biodiversityRef, historyRef, cultureRef])

  // Update active section based on scroll
  useEffect(() => {
    const observers = Object.entries(sectionRefs).map(([key, ref]) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(key)
          }
        },
        { threshold: 0.5 }
      )
      if (ref.current) {
        observer.observe(ref.current)
      }
      return observer
    })

    return () => {
      observers.forEach(observer => observer.disconnect())
    }
  }, [sectionRefs])

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/20">
        <motion.div 
          className="h-full bg-gradient-to-r from-emerald-400 to-teal-400"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 via-teal-900/50 to-green-900/50" />
            <div className="absolute inset-0">
              {mounted && floatingElements.map((element, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-emerald-400/30 rounded-full"
                  initial={{ 
                    x: element.x,
                    y: element.y
                  }}
                  animate={{
                    y: [null, typeof window !== 'undefined' ? -window.innerHeight : -1080],
                  }}
                  transition={{
                    duration: element.duration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: element.delay
                  }}
                />
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
            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
              <Award className="w-4 h-4 mr-2" />
              {t.hero.badge}
              <Award className="w-4 h-4 ml-2" />
            </Badge>

            <h1 className="text-6xl md:text-7xl lg:text-9xl font-bold">
              <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-green-300 bg-clip-text text-transparent">
                {t.hero.title}
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-white/80 font-light">
              {t.hero.subtitle}
            </p>

            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              {t.hero.description}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
              {t.hero.stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-2xl"
                  >
                    <Icon className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs text-white/50 uppercase tracking-wider mb-1">{stat.label}</div>
                    <div className="text-xs text-emerald-400/70">{stat.detail}</div>
                  </motion.div>
                )
              })}
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

      {/* Navigation */}
      <nav className="sticky top-1 z-40 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-4 no-scrollbar">
            {Object.keys(t.sections).map((key) => (
              <Button
                key={key}
                variant="ghost"
                className={`whitespace-nowrap transition-all ${
                  activeSection === key 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => {
                  sectionRefs[key as keyof typeof sectionRefs].current?.scrollIntoView({ 
                    behavior: 'smooth' 
                  })
                }}
              >
                {t.sections[key as keyof typeof t.sections].title}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Location Section */}
      <section ref={locationRef} className="relative py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t.sections.location.title}
            </h2>
            <p className="text-xl text-white/70">
              {t.sections.location.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
                <CardContent className="p-6">
                  <p className="text-white/80 mb-6">
                    {t.sections.location.description}
                  </p>
                  <div className="space-y-4">
                    {t.sections.location.features.map((feature, index) => {
                      const Icon = feature.icon
                      return (
                        <div key={index} className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                            <p className="text-white/60 text-sm">{feature.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Route className="w-5 h-5 text-emerald-400" />
                    {lang === 'es' ? 'Distancias' : 'Distances'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {t.sections.location.distances.map((distance, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-emerald-400" />
                          <span className="text-white font-medium">{distance.city}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-white/80 text-sm">{distance.distance}</div>
                          <div className="text-emerald-400/70 text-xs">{distance.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Geography Section */}
      <section ref={geographyRef} className="relative py-20 bg-gradient-to-b from-transparent via-emerald-950/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t.sections.geography.title}
            </h2>
            <p className="text-xl text-white/70 mb-8">
              {t.sections.geography.subtitle}
            </p>
            <p className="text-white/60 max-w-3xl mx-auto">
              {t.sections.geography.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {t.sections.geography.highlights.map((highlight, index) => {
              const Icon = highlight.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 text-center p-6">
                    <Icon className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">{highlight.title}</h3>
                    <div className="text-3xl font-bold text-emerald-400 mb-1">{highlight.value}</div>
                    <div className="text-white/60 text-sm">{highlight.unit}</div>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TreePine className="w-5 h-5 text-emerald-400" />
                {lang === 'es' ? 'Ecosistemas' : 'Ecosystems'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {t.sections.geography.ecosystems.map((ecosystem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg p-3 text-center"
                  >
                    <span className="text-white/80 text-sm">{ecosystem}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Climate Section */}
      <section ref={climateRef} className="relative py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t.sections.climate.title}
            </h2>
            <p className="text-xl text-white/70 mb-8">
              {t.sections.climate.subtitle}
            </p>
            <p className="text-white/60 max-w-3xl mx-auto">
              {t.sections.climate.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {t.sections.climate.seasons.map((season, index) => {
              const Icon = season.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="bg-white/5 backdrop-blur-xl border border-white/10 h-full">
                    <CardContent className="p-6">
                      <Icon className="w-10 h-10 text-emerald-400 mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">{season.name}</h3>
                      <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 mb-3">
                        {season.months}
                      </Badge>
                      <div className="text-2xl font-bold text-white mb-2">{season.temp}</div>
                      <p className="text-white/60 text-sm">{season.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 backdrop-blur-xl border border-emerald-500/30">
              <CardContent className="p-8 text-center">
                <Sun className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t.sections.climate.bestTime.title}
                </h3>
                <p className="text-xl text-emerald-300 mb-2">
                  {t.sections.climate.bestTime.months}
                </p>
                <p className="text-white/70">
                  {t.sections.climate.bestTime.reason}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Biodiversity Section */}
      <section ref={biodiversityRef} className="relative py-20 bg-gradient-to-b from-transparent via-teal-950/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t.sections.biodiversity.title}
            </h2>
            <p className="text-xl text-white/70 mb-8">
              {t.sections.biodiversity.subtitle}
            </p>
            <p className="text-white/60 max-w-3xl mx-auto">
              {t.sections.biodiversity.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {t.sections.biodiversity.stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="bg-white/5 backdrop-blur-xl border border-white/10 text-center p-6">
                    <Icon className="w-8 h-8 text-teal-400 mx-auto mb-3" />
                    <h4 className="text-white/70 text-sm mb-2">{stat.category}</h4>
                    <div className="text-3xl font-bold text-white mb-1">{stat.count}</div>
                    <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30">
                      {stat.endemic} {lang === 'es' ? 'endémicas' : 'endemic'}
                    </Badge>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.sections.biodiversity.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <Badge className="bg-white/10 text-white/70 mb-2">
                          {highlight.type}
                        </Badge>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {highlight.name}
                        </h3>
                        <p className="text-white/60 text-sm mb-2">
                          {highlight.description}
                        </p>
                        <Badge className={`${
                          highlight.status === 'Protegida' || highlight.status === 'Protected' 
                            ? 'bg-red-500/20 text-red-300 border-red-500/30'
                            : highlight.status === 'Endémica' || highlight.status === 'Endemic'
                            ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                            : 'bg-green-500/20 text-green-300 border-green-500/30'
                        }`}>
                          {highlight.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section ref={historyRef} className="relative py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t.sections.history.title}
            </h2>
            <p className="text-xl text-white/70">
              {t.sections.history.subtitle}
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-emerald-400 via-teal-400 to-green-400" />
            
            <div className="space-y-12">
              {t.sections.history.timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 inline-block">
                      <CardContent className="p-6">
                        <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white mb-3">
                          {item.year}
                        </Badge>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {item.event}
                        </h3>
                        <p className="text-white/60 text-sm">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    <div className="w-4 h-4 bg-emerald-400 rounded-full border-4 border-slate-950" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section ref={cultureRef} className="relative py-20 bg-gradient-to-b from-transparent via-emerald-950/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t.sections.culture.title}
            </h2>
            <p className="text-xl text-white/70">
              {t.sections.culture.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.sections.culture.aspects.map((aspect, index) => {
              const Icon = aspect.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="bg-white/5 backdrop-blur-xl border border-white/10 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">
                            {aspect.title}
                          </h3>
                          <p className="text-white/70">
                            {aspect.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
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
            className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 backdrop-blur-xl rounded-3xl border border-white/10 p-12 shadow-2xl text-center"
          >
            <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.cta.title}
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              {t.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {t.cta.buttons.map((button, index) => (
                <Link key={index} href={buildLocalizedUrl(button.link, lang)}>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-6 text-lg shadow-2xl w-full sm:w-auto"
                  >
                    {button.text}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}