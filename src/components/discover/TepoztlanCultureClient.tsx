'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Sparkles, Music, Users, Calendar, Star, 
  ChevronRight, ArrowRight,
  Mountain, Palette, Globe, Clock,
  Book, Award, Shield
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { buildLocalizedUrl } from '@/lib/url-mapping'

interface TepoztlanCultureClientProps {
  lang: 'es' | 'en'
}

export default function TepoztlanCultureClient({ lang }: TepoztlanCultureClientProps) {
  const [activeTab, setActiveTab] = useState('traditions')
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [floatingElements, setFloatingElements] = useState<Array<{x: number, y: number, targetX: number, targetY: number, duration: number}>>([])
  const [mounted, setMounted] = useState(false)
  
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  useEffect(() => {
    setMounted(true)
    const elements = Array(20).fill(null).map(() => ({
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
      targetX: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      targetY: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
      duration: Math.random() * 20 + 20
    }))
    setFloatingElements(elements)
  }, [])

  const content = {
    es: {
      hero: {
        badge: 'Herencia Cultural Viva',
        title: 'La Cultura de',
        titleHighlight: 'TEPOZTLÁN',
        subtitle: 'Donde las tradiciones ancestrales cobran vida',
        description: 'Sumérgete en un mundo donde el pasado prehispánico se entrelaza con el presente, donde cada danza cuenta una historia y cada ceremonia conecta con lo divino.',
        cta: 'Explorar Tradiciones',
        stats: {
          years: '2000+ años de historia',
          festivals: '12 festivales anuales',
          traditions: '50+ tradiciones vivas'
        }
      },
      tabs: {
        traditions: 'Tradiciones',
        festivals: 'Festivales',
        crafts: 'Artesanías',
        ceremonies: 'Ceremonias'
      },
      traditions: {
        title: 'Tradiciones Ancestrales',
        subtitle: 'El alma viva de Tepoztlán',
        items: [
          {
            id: 'chinelos',
            title: 'Danza de los Chinelos',
            description: 'El "brinco del chinelo" es la danza más emblemática de Tepoztlán. Con vestimentas de ascendencia árabe-española y máscaras coloridas, los danzantes saltan al ritmo de la música tradicional.',
            details: 'La palabra "Chinelos" proviene del náhuatl "zineloquie" que significa "disfrazado". Esta tradición centenaria es el corazón del carnaval.',
            icon: Music,
            color: 'from-purple-500 to-pink-500',
            image: '/images/chinelos.jpg'
          },
          {
            id: 'temazcal',
            title: 'Ceremonias del Temazcal',
            description: 'Baño de vapor ritual prehispánico que purifica cuerpo y espíritu. Los chamanes conducen la ceremonia con cantos en náhuatl y copal sagrado.',
            details: 'El temazcal o "casa de vapor" es una tradición de más de 1000 años que conecta con las energías ancestrales de la tierra.',
            icon: Mountain,
            color: 'from-orange-500 to-red-500',
            image: '/images/temazcal.jpg'
          },
          {
            id: 'nahuatl',
            title: 'Lengua Náhuatl',
            description: 'El idioma de los antiguos aztecas sigue vivo en Tepoztlán. Muchos habitantes aún hablan náhuatl y mantienen vivas las tradiciones orales.',
            details: 'Con 1.7 millones de hablantes en México, el náhuatl es parte esencial de la identidad cultural de Tepoztlán.',
            icon: Globe,
            color: 'from-green-500 to-teal-500',
            image: '/images/nahuatl.jpg'
          },
          {
            id: 'reto',
            title: 'Reto al Tepozteco',
            description: 'Representación teatral que narra la conversión del rey Tepoztécatl al catolicismo, con procesiones hasta la pirámide del Tepozteco.',
            details: 'Esta festividad del 7-8 de septiembre combina elementos prehispánicos y coloniales en una celebración única.',
            icon: Shield,
            color: 'from-blue-500 to-indigo-500',
            image: '/images/reto.jpg'
          }
        ]
      },
      festivals: {
        title: 'Festivales Vibrantes',
        subtitle: 'Un calendario lleno de celebraciones',
        calendar: [
          {
            month: 'Febrero',
            name: 'Carnaval de Tepoztlán',
            description: 'El festival más grande con chinelos, comparsas de "viejos" y "jaguares".',
            duration: '4 días',
            highlight: true
          },
          {
            month: 'Marzo',
            name: 'Festival del Pulque',
            description: 'Celebración de la bebida sagrada prehispánica.',
            duration: '2 días'
          },
          {
            month: 'Mayo',
            name: 'Santa Cruz',
            description: 'Bendición de las cruces en los cerros sagrados.',
            duration: '1 día'
          },
          {
            month: 'Septiembre',
            name: 'Reto al Tepozteco',
            description: 'Representación histórica y procesión a la pirámide.',
            duration: '2 días',
            highlight: true
          },
          {
            month: 'Noviembre',
            name: 'Día de Muertos',
            description: 'Altares tradicionales y ofrendas a los ancestros.',
            duration: '3 días'
          },
          {
            month: 'Diciembre',
            name: 'Festival de la Virgen',
            description: 'Procesiones y danzas tradicionales.',
            duration: '9 días'
          }
        ]
      },
      crafts: {
        title: 'Artesanías Únicas',
        subtitle: 'El arte hecho a mano de Tepoztlán',
        categories: [
          {
            name: 'Textiles',
            description: 'Rebozos, huipiles y bordados tradicionales con diseños prehispánicos.',
            icon: Palette,
            items: ['Rebozos de algodón', 'Huipiles bordados', 'Manteles decorados']
          },
          {
            name: 'Cerámica',
            description: 'Piezas de barro negro y colorido con técnicas ancestrales.',
            icon: Award,
            items: ['Ollas de barro', 'Figurillas decorativas', 'Vajillas tradicionales']
          },
          {
            name: 'Papel Amate',
            description: 'Arte en papel de corteza de árbol, herencia prehispánica.',
            icon: Book,
            items: ['Pinturas en amate', 'Códices decorativos', 'Tarjetas artesanales']
          },
          {
            name: 'Joyería',
            description: 'Piezas únicas con piedras semipreciosas y diseños místicos.',
            icon: Sparkles,
            items: ['Collares de obsidiana', 'Pulseras de jade', 'Aretes de plata']
          }
        ]
      },
      ceremonies: {
        title: 'Ceremonias Sagradas',
        subtitle: 'Rituales que conectan con lo divino',
        types: [
          {
            name: 'Temazcal de Luna Llena',
            description: 'Ceremonia especial durante la luna llena para conectar con energías femeninas.',
            frequency: 'Mensual',
            duration: '3 horas',
            participants: '10-15 personas'
          },
          {
            name: 'Bendición del Maíz',
            description: 'Ritual de agradecimiento por la cosecha con ofrendas a la Madre Tierra.',
            frequency: 'Anual (agosto)',
            duration: '1 día',
            participants: 'Toda la comunidad'
          },
          {
            name: 'Ceremonia del Fuego Nuevo',
            description: 'Renovación espiritual con encendido del fuego sagrado.',
            frequency: 'Equinoccios',
            duration: '4 horas',
            participants: '20-30 personas'
          },
          {
            name: 'Limpia Espiritual',
            description: 'Purificación con hierbas sagradas, copal y cantos ancestrales.',
            frequency: 'Diaria',
            duration: '30 minutos',
            participants: 'Individual'
          }
        ]
      },
      cta: {
        title: '¿Listo para vivir la cultura?',
        description: 'Descubre experiencias culturales únicas en Tepoztlán',
        button: 'Ver Experiencias',
        link: '/experiencias'
      }
    },
    en: {
      hero: {
        badge: 'Living Cultural Heritage',
        title: 'The Culture of',
        titleHighlight: 'TEPOZTLÁN',
        subtitle: 'Where ancestral traditions come to life',
        description: 'Immerse yourself in a world where the pre-Hispanic past intertwines with the present, where every dance tells a story and every ceremony connects with the divine.',
        cta: 'Explore Traditions',
        stats: {
          years: '2000+ years of history',
          festivals: '12 annual festivals',
          traditions: '50+ living traditions'
        }
      },
      tabs: {
        traditions: 'Traditions',
        festivals: 'Festivals',
        crafts: 'Crafts',
        ceremonies: 'Ceremonies'
      },
      traditions: {
        title: 'Ancestral Traditions',
        subtitle: 'The living soul of Tepoztlán',
        items: [
          {
            id: 'chinelos',
            title: 'Chinelos Dance',
            description: 'The "chinelo jump" is the most emblematic dance of Tepoztlán. With Arab-Spanish clothing and colorful masks, dancers jump to the rhythm of traditional music.',
            details: 'The word "Chinelos" comes from Nahuatl "zineloquie" meaning "disguised". This century-old tradition is the heart of carnival.',
            icon: Music,
            color: 'from-purple-500 to-pink-500',
            image: '/images/chinelos.jpg'
          },
          {
            id: 'temazcal',
            title: 'Temazcal Ceremonies',
            description: 'Pre-Hispanic ritual steam bath that purifies body and spirit. Shamans lead the ceremony with Nahuatl chants and sacred copal.',
            details: 'The temazcal or "house of steam" is a tradition of over 1000 years that connects with the ancestral energies of the earth.',
            icon: Mountain,
            color: 'from-orange-500 to-red-500',
            image: '/images/temazcal.jpg'
          },
          {
            id: 'nahuatl',
            title: 'Nahuatl Language',
            description: "The language of the ancient Aztecs is still alive in Tepoztlán. Many inhabitants still speak Nahuatl and keep oral traditions alive.",
            details: 'With 1.7 million speakers in Mexico, Nahuatl is an essential part of Tepoztlán\'s cultural identity.',
            icon: Globe,
            color: 'from-green-500 to-teal-500',
            image: '/images/nahuatl.jpg'
          },
          {
            id: 'reto',
            title: 'Challenge to Tepozteco',
            description: 'Theatrical representation narrating King Tepoztécatl\'s conversion to Catholicism, with processions to the Tepozteco pyramid.',
            details: 'This September 7-8 festivity combines pre-Hispanic and colonial elements in a unique celebration.',
            icon: Shield,
            color: 'from-blue-500 to-indigo-500',
            image: '/images/reto.jpg'
          }
        ]
      },
      festivals: {
        title: 'Vibrant Festivals',
        subtitle: 'A calendar full of celebrations',
        calendar: [
          {
            month: 'February',
            name: 'Tepoztlán Carnival',
            description: 'The biggest festival with chinelos, "old men" and "jaguars" troupes.',
            duration: '4 days',
            highlight: true
          },
          {
            month: 'March',
            name: 'Pulque Festival',
            description: 'Celebration of the sacred pre-Hispanic drink.',
            duration: '2 days'
          },
          {
            month: 'May',
            name: 'Holy Cross',
            description: 'Blessing of crosses on sacred hills.',
            duration: '1 day'
          },
          {
            month: 'September',
            name: 'Challenge to Tepozteco',
            description: 'Historical representation and procession to the pyramid.',
            duration: '2 days',
            highlight: true
          },
          {
            month: 'November',
            name: 'Day of the Dead',
            description: 'Traditional altars and offerings to ancestors.',
            duration: '3 days'
          },
          {
            month: 'December',
            name: 'Virgin Festival',
            description: 'Processions and traditional dances.',
            duration: '9 days'
          }
        ]
      },
      crafts: {
        title: 'Unique Crafts',
        subtitle: 'The handmade art of Tepoztlán',
        categories: [
          {
            name: 'Textiles',
            description: 'Shawls, huipiles and traditional embroidery with pre-Hispanic designs.',
            icon: Palette,
            items: ['Cotton shawls', 'Embroidered huipiles', 'Decorated tablecloths']
          },
          {
            name: 'Ceramics',
            description: 'Black and colorful clay pieces with ancestral techniques.',
            icon: Award,
            items: ['Clay pots', 'Decorative figurines', 'Traditional tableware']
          },
          {
            name: 'Amate Paper',
            description: 'Art on tree bark paper, pre-Hispanic heritage.',
            icon: Book,
            items: ['Amate paintings', 'Decorative codices', 'Handmade cards']
          },
          {
            name: 'Jewelry',
            description: 'Unique pieces with semi-precious stones and mystical designs.',
            icon: Sparkles,
            items: ['Obsidian necklaces', 'Jade bracelets', 'Silver earrings']
          }
        ]
      },
      ceremonies: {
        title: 'Sacred Ceremonies',
        subtitle: 'Rituals that connect with the divine',
        types: [
          {
            name: 'Full Moon Temazcal',
            description: 'Special ceremony during full moon to connect with feminine energies.',
            frequency: 'Monthly',
            duration: '3 hours',
            participants: '10-15 people'
          },
          {
            name: 'Corn Blessing',
            description: 'Thanksgiving ritual for harvest with offerings to Mother Earth.',
            frequency: 'Annual (August)',
            duration: '1 day',
            participants: 'Entire community'
          },
          {
            name: 'New Fire Ceremony',
            description: 'Spiritual renewal with lighting of sacred fire.',
            frequency: 'Equinoxes',
            duration: '4 hours',
            participants: '20-30 people'
          },
          {
            name: 'Spiritual Cleansing',
            description: 'Purification with sacred herbs, copal and ancestral chants.',
            frequency: 'Daily',
            duration: '30 minutes',
            participants: 'Individual'
          }
        ]
      },
      cta: {
        title: 'Ready to experience the culture?',
        description: 'Discover unique cultural experiences in Tepoztlán',
        button: 'View Experiences',
        link: '/experiences'
      }
    }
  }

  const t = content[lang]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  }

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div 
            style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-pink-900/50 to-orange-900/50" />
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse animation-delay-2s" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse animation-delay-4s" />
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {mounted && floatingElements.map((element, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: element.x,
                y: element.y
              }}
              animate={{
                x: element.targetX,
                y: element.targetY,
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Sparkles className="w-4 h-4 text-yellow-400/30" />
            </motion.div>
          ))}
        </div>

        {/* Hero Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto px-4 text-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
              <Sparkles className="w-4 h-4 mr-2" />
              {t.hero.badge}
              <Sparkles className="w-4 h-4 ml-2" />
            </Badge>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-8xl font-bold mb-8"
          >
            <span className="text-white drop-shadow-2xl">{t.hero.title}</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              {t.hero.titleHighlight}
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-8 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.p 
            variants={itemVariants}
            className="text-lg text-white/60 max-w-3xl mx-auto mb-12"
          >
            {t.hero.description}
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-6 justify-center mb-12"
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg shadow-2xl"
              onClick={() => setActiveTab('traditions')}
            >
              {t.hero.cta}
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {Object.values(t.hero.stats).map((stat, index) => (
              <motion.div
                key={index}
                animate={floatingAnimation}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-2xl"
              >
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat}
                </div>
              </motion.div>
            ))}
          </motion.div>
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
      </motion.section>

      {/* Main Content */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 bg-white/10 backdrop-blur-xl border border-white/20">
              {Object.entries(t.tabs).map(([key, label]) => (
                <TabsTrigger 
                  key={key}
                  value={key}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white text-white/70"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Traditions Tab */}
            <TabsContent value="traditions" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {t.traditions.title}
                </h2>
                <p className="text-xl text-white/70 max-w-3xl mx-auto">
                  {t.traditions.subtitle}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {t.traditions.items.map((tradition, index) => {
                  const Icon = tradition.icon
                  return (
                    <motion.div
                      key={tradition.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      onHoverStart={() => setHoveredCard(tradition.id)}
                      onHoverEnd={() => setHoveredCard(null)}
                      className="group relative"
                    >
                      <Card className="overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500">
                        <div className="relative h-64 overflow-hidden">
                          <div className={`absolute inset-0 bg-gradient-to-br ${tradition.color} opacity-80`} />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              animate={hoveredCard === tradition.id ? { scale: 1.2, rotate: 360 } : {}}
                              transition={{ duration: 0.5 }}
                            >
                              <Icon className="w-32 h-32 text-white/20" />
                            </motion.div>
                          </div>
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30">
                              <Sparkles className="w-3 h-3 mr-1" />
                              {lang === 'es' ? 'Tradición Viva' : 'Living Tradition'}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                            {tradition.title}
                          </h3>
                          <p className="text-white/70 mb-4">
                            {tradition.description}
                          </p>
                          <p className="text-white/50 text-sm mb-4">
                            {tradition.details}
                          </p>
                          <Button 
                            variant="ghost"
                            className="text-white hover:text-purple-400 group/btn"
                          >
                            {lang === 'es' ? 'Descubrir más' : 'Discover more'}
                            <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </TabsContent>

            {/* Festivals Tab */}
            <TabsContent value="festivals" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {t.festivals.title}
                </h2>
                <p className="text-xl text-white/70 max-w-3xl mx-auto">
                  {t.festivals.subtitle}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {t.festivals.calendar.map((festival, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className={`bg-white/5 backdrop-blur-xl border ${festival.highlight ? 'border-purple-500/50' : 'border-white/10'} hover:border-white/20 transition-all`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <Badge className={`${festival.highlight ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/20'} text-white`}>
                            <Calendar className="w-3 h-3 mr-1" />
                            {festival.month}
                          </Badge>
                          {festival.highlight && (
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {festival.name}
                        </h3>
                        <p className="text-white/70 text-sm mb-3">
                          {festival.description}
                        </p>
                        <div className="flex items-center text-white/50 text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          {festival.duration}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Crafts Tab */}
            <TabsContent value="crafts" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {t.crafts.title}
                </h2>
                <p className="text-xl text-white/70 max-w-3xl mx-auto">
                  {t.crafts.subtitle}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {t.crafts.categories.map((category, index) => {
                  const Icon = category.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-xl">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-white mb-2">
                                {category.name}
                              </h3>
                              <p className="text-white/70 text-sm mb-4">
                                {category.description}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {category.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex items-center text-white/50 text-sm">
                                <ChevronRight className="w-4 h-4 mr-2 text-purple-400" />
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </TabsContent>

            {/* Ceremonies Tab */}
            <TabsContent value="ceremonies" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {t.ceremonies.title}
                </h2>
                <p className="text-xl text-white/70 max-w-3xl mx-auto">
                  {t.ceremonies.subtitle}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {t.ceremonies.types.map((ceremony, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-bold text-white">
                            {ceremony.name}
                          </h3>
                          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                            {ceremony.frequency}
                          </Badge>
                        </div>
                        <p className="text-white/70 mb-4">
                          {ceremony.description}
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center text-white/50 text-sm">
                            <Clock className="w-4 h-4 mr-2 text-purple-400" />
                            {ceremony.duration}
                          </div>
                          <div className="flex items-center text-white/50 text-sm">
                            <Users className="w-4 h-4 mr-2 text-purple-400" />
                            {ceremony.participants}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-3xl border border-white/10 p-12 shadow-2xl"
          >
            <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.cta.title}
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              {t.cta.description}
            </p>
            <Link href={buildLocalizedUrl(t.cta.link, lang)}>
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg shadow-2xl">
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