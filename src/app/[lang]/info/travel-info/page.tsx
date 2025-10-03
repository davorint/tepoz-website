'use client'

import { use } from 'react'
import { Locale } from '@/lib/i18n'
import { Card, CardContent } from '@/components/ui/card'
import {
  MapPin,
  DollarSign,
  Clock,
  Phone,
  Wifi,
  Droplet,
  Thermometer,
  AlertCircle,
  Heart,
  Users,
  Plane,
  Bus,
  Languages,
  Mountain
} from 'lucide-react'

interface TravelInfoPageProps {
  params: Promise<{ lang: Locale }>
}

export default function TravelInfoPage({ params }: TravelInfoPageProps) {
  const { lang } = use(params)

  const content = {
    es: {
      title: 'Información de Viaje',
      subtitle: 'Todo lo que necesitas saber antes de visitar Tepoztlán',
      sections: [
        {
          icon: MapPin,
          title: 'Ubicación y Acceso',
          color: 'text-red-500',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800',
          items: [
            {
              label: 'Estado',
              value: 'Morelos, México',
            },
            {
              label: 'Distancia desde CDMX',
              value: '80 km (1.5-2 horas en auto)',
            },
            {
              label: 'Altitud',
              value: '1,700 metros sobre el nivel del mar',
            },
            {
              label: 'Código Postal',
              value: '62520',
            },
            {
              label: 'Población',
              value: '~50,000 habitantes',
            },
          ],
        },
        {
          icon: Bus,
          title: 'Cómo Llegar',
          color: 'text-blue-500',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-800',
          subsections: [
            {
              subtitle: 'En Autobús',
              content: 'Desde la Terminal del Sur (Taxqueña) en CDMX, autobuses directos salen cada hora. Líneas principales: Pullman de Morelos y OCC. Duración: 1.5-2 horas. Costo: $80-120 pesos.',
            },
            {
              subtitle: 'En Auto',
              content: 'Toma la autopista México-Cuernavaca (95D). Toma la salida "Tepoztlán" antes de llegar a Cuernavaca. Hay estacionamientos públicos en el centro ($30-50 pesos/día).',
            },
            {
              subtitle: 'En Taxi/Uber',
              content: 'Desde CDMX: $800-1,200 pesos. Desde Cuernavaca: $150-250 pesos. Uber está disponible pero limitado.',
            },
          ],
        },
        {
          icon: Thermometer,
          title: 'Clima',
          color: 'text-orange-500',
          bgColor: 'bg-orange-50 dark:bg-orange-900/20',
          borderColor: 'border-orange-200 dark:border-orange-800',
          subsections: [
            {
              subtitle: 'Temporada Seca (Nov-Abril)',
              content: 'Días cálidos (20-28°C), noches frescas (10-15°C). Cielos despejados, ideal para senderismo.',
            },
            {
              subtitle: 'Temporada de Lluvias (Mayo-Oct)',
              content: 'Lluvias por la tarde/noche. Temperatura: 18-25°C. Vegetación más verde, menos turistas.',
            },
            {
              subtitle: 'Qué Empacar',
              content: 'Ropa en capas, protector solar, sombrero, zapatos cómodos para caminar, impermeable (mayo-oct), traje de baño.',
            },
          ],
        },
        {
          icon: DollarSign,
          title: 'Dinero y Presupuesto',
          color: 'text-green-500',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-800',
          subsections: [
            {
              subtitle: 'Moneda',
              content: 'Peso Mexicano (MXN). Tipo de cambio aproximado: 1 USD = 17-20 MXN (varía).',
            },
            {
              subtitle: 'Cajeros y Bancos',
              content: 'Hay varios cajeros en el centro. Algunos negocios no aceptan tarjetas, lleva efectivo.',
            },
            {
              subtitle: 'Presupuesto Diario',
              content: 'Económico: $500-800 MXN. Medio: $1,000-2,000 MXN. Alto: $2,500+ MXN.',
            },
            {
              subtitle: 'Propinas',
              content: 'Restaurantes: 10-15%. Guías turísticos: $100-200 MXN. Taxis: no es obligatorio pero apreciado.',
            },
          ],
        },
        {
          icon: Languages,
          title: 'Idioma',
          color: 'text-purple-500',
          bgColor: 'bg-purple-50 dark:bg-purple-900/20',
          borderColor: 'border-purple-200 dark:border-purple-800',
          items: [
            {
              label: 'Idioma Principal',
              value: 'Español',
            },
            {
              label: 'Inglés',
              value: 'Hablado en hoteles y restaurantes turísticos',
            },
            {
              label: 'Lenguas Indígenas',
              value: 'Náhuatl (hablado por algunos residentes)',
            },
          ],
        },
        {
          icon: Wifi,
          title: 'Conectividad',
          color: 'text-cyan-500',
          bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
          borderColor: 'border-cyan-200 dark:border-cyan-800',
          subsections: [
            {
              subtitle: 'Internet',
              content: 'WiFi disponible en la mayoría de hoteles, restaurantes y cafés. Velocidad variable, más lenta en áreas remotas.',
            },
            {
              subtitle: 'Telefonía',
              content: 'Cobertura celular buena en el centro, limitada en zonas montañosas. Principales operadores: Telcel, Movistar, AT&T.',
            },
            {
              subtitle: 'Código de Área',
              content: '+52 739',
            },
          ],
        },
        {
          icon: Droplet,
          title: 'Salud y Seguridad',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-800',
          subsections: [
            {
              subtitle: 'Agua',
              content: 'No bebas agua del grifo. Usa agua embotellada o purificada disponible en todas partes.',
            },
            {
              subtitle: 'Seguridad',
              content: 'Tepoztlán es generalmente seguro. Guarda tus pertenencias, evita mostrar objetos de valor, no camines solo por senderos remotos de noche.',
            },
            {
              subtitle: 'Servicios Médicos',
              content: 'Clínicas privadas y farmacias en el centro. Hospital más cercano en Cuernavaca (20 min).',
            },
            {
              subtitle: 'Emergencias',
              content: 'Policía: 911. Cruz Roja: 065. Protección Civil: 739-395-5555.',
            },
            {
              subtitle: 'Seguro de Viaje',
              content: 'Recomendado para cobertura médica y de viaje.',
            },
          ],
        },
        {
          icon: Clock,
          title: 'Horarios Generales',
          color: 'text-indigo-500',
          bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
          borderColor: 'border-indigo-200 dark:border-indigo-800',
          items: [
            {
              label: 'Restaurantes',
              value: '8:00 AM - 10:00 PM',
            },
            {
              label: 'Tiendas',
              value: '9:00 AM - 8:00 PM',
            },
            {
              label: 'Mercado',
              value: '7:00 AM - 7:00 PM (más concurrido fines de semana)',
            },
            {
              label: 'Pirámide del Tepozteco',
              value: '9:00 AM - 5:30 PM (último acceso 4:30 PM)',
            },
            {
              label: 'Bancos',
              value: 'Lun-Vie: 9:00 AM - 4:00 PM',
            },
          ],
        },
        {
          icon: Users,
          title: 'Cultura y Etiqueta',
          color: 'text-pink-500',
          bgColor: 'bg-pink-50 dark:bg-pink-900/20',
          borderColor: 'border-pink-200 dark:border-pink-800',
          subsections: [
            {
              subtitle: 'Saludos',
              content: 'Los mexicanos son amigables. Un simple "Buenos días/tardes/noches" es apreciado.',
            },
            {
              subtitle: 'Respeto Cultural',
              content: 'Tepoztlán tiene tradiciones indígenas profundas. Sé respetuoso en sitios sagrados y ceremonias.',
            },
            {
              subtitle: 'Fotografía',
              content: 'Pide permiso antes de fotografiar a personas locales o ceremonias religiosas.',
            },
            {
              subtitle: 'Regateo',
              content: 'Común en mercados de artesanías, pero sé justo y respetuoso.',
            },
            {
              subtitle: 'Vestimenta',
              content: 'Casual y cómoda. Ropa modesta para visitar iglesias.',
            },
          ],
        },
        {
          icon: Mountain,
          title: 'Consejos de Senderismo',
          color: 'text-emerald-500',
          bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
          borderColor: 'border-emerald-200 dark:border-emerald-800',
          subsections: [
            {
              subtitle: 'Pirámide del Tepozteco',
              content: 'Dificultad: Moderada. Duración: 2-4 horas ida y vuelta. Lleva agua (2+ litros), snacks, zapatos con buen agarre, protector solar.',
            },
            {
              subtitle: 'Mejor Horario',
              content: 'Comienza temprano (7-8 AM) para evitar calor y multitudes. Evita días muy lluviosos (senderos resbaladizos).',
            },
            {
              subtitle: 'Qué Llevar',
              content: 'Agua, protector solar, sombrero, repelente de insectos, snacks, cámara, efectivo para entrada ($85 pesos).',
            },
          ],
        },
      ],
      quickTips: {
        title: 'Consejos Rápidos',
        tips: [
          '🌞 Usa protector solar - el sol de montaña es fuerte',
          '💧 Mantente hidratado - altitud + clima seco',
          '💵 Lleva efectivo en denominaciones pequeñas',
          '👟 Zapatos cómodos para caminar son esenciales',
          '📱 Descarga mapas offline (señal limitada)',
          '🍽️ Prueba la comida local en el mercado',
          '🕐 Llega temprano a lugares populares',
          '🎒 Empaca ligero pero lleva capas',
          '🗣️ Aprende frases básicas en español',
          '🚫 No tires basura - respeta la naturaleza',
        ],
      },
    },
    en: {
      title: 'Travel Information',
      subtitle: 'Everything you need to know before visiting Tepoztlán',
      sections: [
        {
          icon: MapPin,
          title: 'Location and Access',
          color: 'text-red-500',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800',
          items: [
            {
              label: 'State',
              value: 'Morelos, Mexico',
            },
            {
              label: 'Distance from CDMX',
              value: '80 km (1.5-2 hours by car)',
            },
            {
              label: 'Altitude',
              value: '1,700 meters above sea level',
            },
            {
              label: 'Zip Code',
              value: '62520',
            },
            {
              label: 'Population',
              value: '~50,000 inhabitants',
            },
          ],
        },
        {
          icon: Bus,
          title: 'How to Get There',
          color: 'text-blue-500',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-800',
          subsections: [
            {
              subtitle: 'By Bus',
              content: 'From Terminal del Sur (Taxqueña) in CDMX, direct buses leave every hour. Main lines: Pullman de Morelos and OCC. Duration: 1.5-2 hours. Cost: $80-120 pesos.',
            },
            {
              subtitle: 'By Car',
              content: 'Take the Mexico-Cuernavaca highway (95D). Take the "Tepoztlán" exit before reaching Cuernavaca. Public parking available in center ($30-50 pesos/day).',
            },
            {
              subtitle: 'By Taxi/Uber',
              content: 'From CDMX: $800-1,200 pesos. From Cuernavaca: $150-250 pesos. Uber is available but limited.',
            },
          ],
        },
        {
          icon: Thermometer,
          title: 'Weather',
          color: 'text-orange-500',
          bgColor: 'bg-orange-50 dark:bg-orange-900/20',
          borderColor: 'border-orange-200 dark:border-orange-800',
          subsections: [
            {
              subtitle: 'Dry Season (Nov-April)',
              content: 'Warm days (20-28°C), cool nights (10-15°C). Clear skies, ideal for hiking.',
            },
            {
              subtitle: 'Rainy Season (May-Oct)',
              content: 'Afternoon/evening rains. Temperature: 18-25°C. Greener vegetation, fewer tourists.',
            },
            {
              subtitle: 'What to Pack',
              content: 'Layered clothing, sunscreen, hat, comfortable walking shoes, raincoat (May-Oct), swimsuit.',
            },
          ],
        },
        {
          icon: DollarSign,
          title: 'Money and Budget',
          color: 'text-green-500',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-800',
          subsections: [
            {
              subtitle: 'Currency',
              content: 'Mexican Peso (MXN). Approximate exchange rate: 1 USD = 17-20 MXN (varies).',
            },
            {
              subtitle: 'ATMs and Banks',
              content: 'Several ATMs in the center. Some businesses don\'t accept cards, carry cash.',
            },
            {
              subtitle: 'Daily Budget',
              content: 'Budget: $500-800 MXN. Mid-range: $1,000-2,000 MXN. High: $2,500+ MXN.',
            },
            {
              subtitle: 'Tipping',
              content: 'Restaurants: 10-15%. Tour guides: $100-200 MXN. Taxis: not mandatory but appreciated.',
            },
          ],
        },
        {
          icon: Languages,
          title: 'Language',
          color: 'text-purple-500',
          bgColor: 'bg-purple-50 dark:bg-purple-900/20',
          borderColor: 'border-purple-200 dark:border-purple-800',
          items: [
            {
              label: 'Primary Language',
              value: 'Spanish',
            },
            {
              label: 'English',
              value: 'Spoken in hotels and tourist restaurants',
            },
            {
              label: 'Indigenous Languages',
              value: 'Nahuatl (spoken by some residents)',
            },
          ],
        },
        {
          icon: Wifi,
          title: 'Connectivity',
          color: 'text-cyan-500',
          bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
          borderColor: 'border-cyan-200 dark:border-cyan-800',
          subsections: [
            {
              subtitle: 'Internet',
              content: 'WiFi available in most hotels, restaurants, and cafes. Variable speed, slower in remote areas.',
            },
            {
              subtitle: 'Phone Service',
              content: 'Good cell coverage in center, limited in mountainous areas. Main carriers: Telcel, Movistar, AT&T.',
            },
            {
              subtitle: 'Area Code',
              content: '+52 739',
            },
          ],
        },
        {
          icon: Droplet,
          title: 'Health and Safety',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-800',
          subsections: [
            {
              subtitle: 'Water',
              content: "Don't drink tap water. Use bottled or purified water available everywhere.",
            },
            {
              subtitle: 'Safety',
              content: "Tepoztlán is generally safe. Keep your belongings secure, avoid displaying valuables, don't walk alone on remote trails at night.",
            },
            {
              subtitle: 'Medical Services',
              content: 'Private clinics and pharmacies in center. Nearest hospital in Cuernavaca (20 min).',
            },
            {
              subtitle: 'Emergencies',
              content: 'Police: 911. Red Cross: 065. Civil Protection: 739-395-5555.',
            },
            {
              subtitle: 'Travel Insurance',
              content: 'Recommended for medical and travel coverage.',
            },
          ],
        },
        {
          icon: Clock,
          title: 'General Hours',
          color: 'text-indigo-500',
          bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
          borderColor: 'border-indigo-200 dark:border-indigo-800',
          items: [
            {
              label: 'Restaurants',
              value: '8:00 AM - 10:00 PM',
            },
            {
              label: 'Shops',
              value: '9:00 AM - 8:00 PM',
            },
            {
              label: 'Market',
              value: '7:00 AM - 7:00 PM (busier on weekends)',
            },
            {
              label: 'Tepozteco Pyramid',
              value: '9:00 AM - 5:30 PM (last entry 4:30 PM)',
            },
            {
              label: 'Banks',
              value: 'Mon-Fri: 9:00 AM - 4:00 PM',
            },
          ],
        },
        {
          icon: Users,
          title: 'Culture and Etiquette',
          color: 'text-pink-500',
          bgColor: 'bg-pink-50 dark:bg-pink-900/20',
          borderColor: 'border-pink-200 dark:border-pink-800',
          subsections: [
            {
              subtitle: 'Greetings',
              content: 'Mexicans are friendly. A simple "Buenos días/tardes/noches" is appreciated.',
            },
            {
              subtitle: 'Cultural Respect',
              content: 'Tepoztlán has deep indigenous traditions. Be respectful at sacred sites and ceremonies.',
            },
            {
              subtitle: 'Photography',
              content: 'Ask permission before photographing local people or religious ceremonies.',
            },
            {
              subtitle: 'Bargaining',
              content: 'Common in craft markets, but be fair and respectful.',
            },
            {
              subtitle: 'Dress Code',
              content: 'Casual and comfortable. Modest clothing for church visits.',
            },
          ],
        },
        {
          icon: Mountain,
          title: 'Hiking Tips',
          color: 'text-emerald-500',
          bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
          borderColor: 'border-emerald-200 dark:border-emerald-800',
          subsections: [
            {
              subtitle: 'Tepozteco Pyramid',
              content: 'Difficulty: Moderate. Duration: 2-4 hours round trip. Bring water (2+ liters), snacks, shoes with good grip, sunscreen.',
            },
            {
              subtitle: 'Best Time',
              content: 'Start early (7-8 AM) to avoid heat and crowds. Avoid very rainy days (slippery trails).',
            },
            {
              subtitle: 'What to Bring',
              content: 'Water, sunscreen, hat, insect repellent, snacks, camera, cash for entry ($85 pesos).',
            },
          ],
        },
      ],
      quickTips: {
        title: 'Quick Tips',
        tips: [
          '🌞 Use sunscreen - mountain sun is strong',
          '💧 Stay hydrated - altitude + dry climate',
          '💵 Carry cash in small denominations',
          '👟 Comfortable walking shoes are essential',
          '📱 Download offline maps (limited signal)',
          '🍽️ Try local food at the market',
          '🕐 Arrive early at popular places',
          '🎒 Pack light but bring layers',
          '🗣️ Learn basic Spanish phrases',
          '🚫 Don\'t litter - respect nature',
        ],
      },
    },
  }

  const t = content[lang]

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-16">
        <div className="absolute inset-0 bg-[url('/images/tepoztlan-pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Plane className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">{t.title}</h1>
            <p className="text-xl opacity-90">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Quick Tips Banner */}
        <Card className="mb-12 bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">{t.quickTips.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {t.quickTips.tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-white/90">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {t.sections.map((section, index) => (
            <Card
              key={index}
              className={`hover:shadow-xl transition-shadow ${section.bgColor} ${section.borderColor} border-2`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <section.icon className={`w-8 h-8 ${section.color}`} />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>

                {/* Simple Items */}
                {section.items && (
                  <div className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between items-start gap-4">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          {item.label}:
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 text-right">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Subsections */}
                {section.subsections && (
                  <div className="space-y-4">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex}>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                          {subsection.subtitle}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {subsection.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Contact Card */}
        <Card className="mt-12 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {lang === 'es' ? 'Números de Emergencia' : 'Emergency Numbers'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <Phone className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <p className="font-bold text-gray-900 dark:text-white">{lang === 'es' ? 'Policía' : 'Police'}</p>
                <p className="text-2xl font-bold text-red-600">911</p>
              </div>
              <div className="text-center">
                <Heart className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <p className="font-bold text-gray-900 dark:text-white">{lang === 'es' ? 'Cruz Roja' : 'Red Cross'}</p>
                <p className="text-2xl font-bold text-red-600">065</p>
              </div>
              <div className="text-center">
                <AlertCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <p className="font-bold text-gray-900 dark:text-white">
                  {lang === 'es' ? 'Protección Civil' : 'Civil Protection'}
                </p>
                <p className="text-xl font-bold text-red-600">739-395-5555</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {lang === 'es'
              ? '¿Necesitas más información o tienes preguntas?'
              : 'Need more information or have questions?'}
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href={`/${lang}/info/faq`}>
              <button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-bold hover:from-teal-600 hover:to-cyan-600 transition-colors">
                {lang === 'es' ? 'Ver Preguntas Frecuentes' : 'View FAQ'}
              </button>
            </a>
            <a href={`/${lang}/info/contact`}>
              <button className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                {lang === 'es' ? 'Contáctanos' : 'Contact Us'}
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
