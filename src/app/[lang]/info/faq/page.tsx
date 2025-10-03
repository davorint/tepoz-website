'use client'

import { use, useState } from 'react'
import { Locale } from '@/lib/i18n'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { HelpCircle, Search, ChevronDown, ChevronUp } from 'lucide-react'

interface FAQPageProps {
  params: Promise<{ lang: Locale }>
}

interface FAQItem {
  question: string
  answer: string
  category: string
}

export default function FAQPage({ params }: FAQPageProps) {
  const { lang } = use(params)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const content = {
    es: {
      title: 'Preguntas Frecuentes',
      subtitle: 'Encuentra respuestas a las preguntas más comunes sobre Tepoztlán',
      searchPlaceholder: 'Buscar preguntas...',
      categories: {
        visit: 'Planificación de Visita',
        transport: 'Transporte',
        accommodation: 'Alojamiento',
        food: 'Comida y Bebida',
        activities: 'Actividades',
        practical: 'Información Práctica',
      },
      faqs: [
        {
          category: 'visit',
          question: '¿Cuál es la mejor época para visitar Tepoztlán?',
          answer: 'Tepoztlán es hermoso durante todo el año. La temporada seca (noviembre a abril) ofrece clima agradable. Los fines de semana largos y festivales pueden estar muy concurridos. El Festival del Tepozteco en septiembre es especialmente popular.',
        },
        {
          category: 'visit',
          question: '¿Cuántos días necesito para visitar Tepoztlán?',
          answer: 'Un fin de semana (2-3 días) es ideal para disfrutar de las principales atracciones, escalar la pirámide, explorar el pueblo y relajarse. Si deseas hacer más actividades de bienestar o senderismo, considera quedarte 4-5 días.',
        },
        {
          category: 'visit',
          question: '¿Tepoztlán es seguro para turistas?',
          answer: 'Sí, Tepoztlán es generalmente seguro para turistas. Es un Pueblo Mágico popular con buena seguridad. Como en cualquier destino turístico, mantén tus pertenencias seguras, evita mostrar objetos de valor, y usa el sentido común.',
        },
        {
          category: 'transport',
          question: '¿Cómo llego a Tepoztlán desde la Ciudad de México?',
          answer: 'Desde CDMX puedes tomar un autobús directo desde la Terminal del Sur (Taxqueña). El viaje dura aproximadamente 1.5-2 horas. También puedes conducir por la autopista México-Cuernavaca (95D) y tomar la salida a Tepoztlán.',
        },
        {
          category: 'transport',
          question: '¿Necesito un auto en Tepoztlán?',
          answer: 'No es necesario. El centro de Tepoztlán es muy caminable y la mayoría de las atracciones principales están a poca distancia. Para lugares más alejados como Amatlan, puedes tomar taxis locales o servicios de transporte.',
        },
        {
          category: 'transport',
          question: '¿Hay estacionamiento disponible?',
          answer: 'Sí, hay varios estacionamientos públicos cerca del centro. Los fines de semana pueden llenarse, así que llega temprano. Muchos hoteles también ofrecen estacionamiento para huéspedes.',
        },
        {
          category: 'accommodation',
          question: '¿Qué tipos de alojamiento hay disponibles?',
          answer: 'Tepoztlán ofrece opciones para todos los presupuestos: hoteles boutique, eco-lodges, hostales, casas de retiro y rentas vacacionales. Desde alojamientos económicos hasta opciones de lujo enfocadas en bienestar.',
        },
        {
          category: 'accommodation',
          question: '¿Es necesario reservar con anticipación?',
          answer: 'Durante la semana, generalmente puedes encontrar alojamiento sin reserva. Sin embargo, los fines de semana, días festivos y festivales especiales se llenan rápido. Recomendamos reservar con 1-2 semanas de anticipación para estas fechas.',
        },
        {
          category: 'food',
          question: '¿Qué debo probar en Tepoztlán?',
          answer: 'No te pierdas: nieves exóticas (helados artesanales), pulque tradicional, quesadillas y tlacoyos del mercado, cecina tepozteca, y el famoso pan de Tepoztlán. Los restaurantes locales ofrecen cocina tradicional mexicana e internacional.',
        },
        {
          category: 'food',
          question: '¿Hay opciones vegetarianas/veganas?',
          answer: 'Sí, Tepoztlán tiene muchas opciones vegetarianas y veganas. Muchos restaurantes ofrecen menús enfocados en alimentación saludable y consciente. El mercado también tiene excelentes opciones vegetarianas.',
        },
        {
          category: 'activities',
          question: '¿Qué tan difícil es subir a la Pirámide del Tepozteco?',
          answer: 'La caminata es de dificultad moderada. Toma aproximadamente 1-2 horas subir (dependiendo de tu condición física) con escalones empinados en algunos tramos. Usa zapatos cómodos, lleva agua, y ve temprano para evitar el calor. La vista vale totalmente la pena.',
        },
        {
          category: 'activities',
          question: '¿Cuánto cuesta entrar a la pirámide?',
          answer: 'La entrada cuesta aproximadamente 85 pesos (sujeto a cambios). El acceso es gratuito los domingos para mexicanos y residentes. El sitio abre de 9:00 AM a 5:30 PM.',
        },
        {
          category: 'activities',
          question: '¿Qué otras actividades hay además de la pirámide?',
          answer: 'Tepoztlán ofrece: senderismo, tirolesas, retiros de yoga y meditación, temazcales, talleres artesanales, mercados locales, galerías de arte, y exploración de pueblos cercanos como Amatlan.',
        },
        {
          category: 'practical',
          question: '¿Cuál es el código postal de Tepoztlán?',
          answer: 'El código postal de Tepoztlán, Morelos es 62520.',
        },
        {
          category: 'practical',
          question: '¿Hay cajeros automáticos disponibles?',
          answer: 'Sí, hay varios cajeros automáticos en el centro del pueblo. Sin embargo, recomendamos llevar efectivo ya que algunos negocios pequeños y puestos del mercado no aceptan tarjetas.',
        },
        {
          category: 'practical',
          question: '¿Qué debo empacar?',
          answer: 'Esenciales: zapatos cómodos para caminar, protector solar, sombrero, botella de agua reutilizable, repelente de insectos, ropa en capas (las mañanas pueden ser frescas), traje de baño si tu hotel tiene alberca, y efectivo.',
        },
        {
          category: 'practical',
          question: '¿Se habla inglés en Tepoztlán?',
          answer: 'Muchos negocios turísticos tienen personal que habla inglés básico, especialmente hoteles y restaurantes principales. Sin embargo, conocer algo de español será muy útil, especialmente en mercados locales y con residentes.',
        },
        {
          category: 'practical',
          question: '¿Cuál es la altitud de Tepoztlán?',
          answer: 'Tepoztlán se encuentra a aproximadamente 1,700 metros (5,577 pies) sobre el nivel del mar. La mayoría de las personas no experimenta problemas de altitud, pero mantente hidratado.',
        },
      ],
    },
    en: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to the most common questions about Tepoztlán',
      searchPlaceholder: 'Search questions...',
      categories: {
        visit: 'Visit Planning',
        transport: 'Transportation',
        accommodation: 'Accommodation',
        food: 'Food & Drink',
        activities: 'Activities',
        practical: 'Practical Information',
      },
      faqs: [
        {
          category: 'visit',
          question: 'When is the best time to visit Tepoztlán?',
          answer: "Tepoztlán is beautiful year-round. The dry season (November to April) offers pleasant weather. Long weekends and festivals can be very crowded. The Tepozteco Festival in September is especially popular.",
        },
        {
          category: 'visit',
          question: 'How many days do I need to visit Tepoztlán?',
          answer: 'A weekend (2-3 days) is ideal to enjoy the main attractions, climb the pyramid, explore the town, and relax. If you want to do more wellness activities or hiking, consider staying 4-5 days.',
        },
        {
          category: 'visit',
          question: 'Is Tepoztlán safe for tourists?',
          answer: "Yes, Tepoztlán is generally safe for tourists. It's a popular Pueblo Mágico with good security. As with any tourist destination, keep your belongings secure, avoid displaying valuables, and use common sense.",
        },
        {
          category: 'transport',
          question: 'How do I get to Tepoztlán from Mexico City?',
          answer: 'From CDMX you can take a direct bus from Terminal del Sur (Taxqueña). The journey takes approximately 1.5-2 hours. You can also drive via the Mexico-Cuernavaca highway (95D) and take the exit to Tepoztlán.',
        },
        {
          category: 'transport',
          question: 'Do I need a car in Tepoztlán?',
          answer: "It's not necessary. Downtown Tepoztlán is very walkable and most main attractions are within walking distance. For farther places like Amatlan, you can take local taxis or transportation services.",
        },
        {
          category: 'transport',
          question: 'Is parking available?',
          answer: 'Yes, there are several public parking lots near the center. Weekends can get full, so arrive early. Many hotels also offer parking for guests.',
        },
        {
          category: 'accommodation',
          question: 'What types of accommodation are available?',
          answer: 'Tepoztlán offers options for all budgets: boutique hotels, eco-lodges, hostels, retreat centers, and vacation rentals. From budget-friendly to luxury wellness-focused accommodations.',
        },
        {
          category: 'accommodation',
          question: 'Do I need to book in advance?',
          answer: 'During weekdays, you can generally find accommodation without booking. However, weekends, holidays, and special festivals fill up quickly. We recommend booking 1-2 weeks in advance for these dates.',
        },
        {
          category: 'food',
          question: 'What should I try in Tepoztlán?',
          answer: "Don't miss: exotic ice creams (nieves), traditional pulque, quesadillas and tlacoyos from the market, cecina tepozteca, and the famous bread of Tepoztlán. Local restaurants offer traditional Mexican and international cuisine.",
        },
        {
          category: 'food',
          question: 'Are there vegetarian/vegan options?',
          answer: 'Yes, Tepoztlán has many vegetarian and vegan options. Many restaurants offer menus focused on healthy and conscious eating. The market also has excellent vegetarian options.',
        },
        {
          category: 'activities',
          question: 'How difficult is climbing the Tepozteco Pyramid?',
          answer: 'The hike is moderate difficulty. It takes approximately 1-2 hours to climb (depending on your fitness level) with steep steps in some sections. Wear comfortable shoes, bring water, and go early to avoid the heat. The view is totally worth it.',
        },
        {
          category: 'activities',
          question: 'How much does it cost to enter the pyramid?',
          answer: 'Entry costs approximately 85 pesos (subject to change). Access is free on Sundays for Mexicans and residents. The site opens from 9:00 AM to 5:30 PM.',
        },
        {
          category: 'activities',
          question: 'What other activities are there besides the pyramid?',
          answer: 'Tepoztlán offers: hiking, zip-lining, yoga and meditation retreats, temazcal, artisan workshops, local markets, art galleries, and exploration of nearby villages like Amatlan.',
        },
        {
          category: 'practical',
          question: 'What is the zip code of Tepoztlán?',
          answer: 'The zip code for Tepoztlán, Morelos is 62520.',
        },
        {
          category: 'practical',
          question: 'Are ATMs available?',
          answer: 'Yes, there are several ATMs in the town center. However, we recommend carrying cash as some small businesses and market stalls do not accept cards.',
        },
        {
          category: 'practical',
          question: 'What should I pack?',
          answer: 'Essentials: comfortable walking shoes, sunscreen, hat, reusable water bottle, insect repellent, layered clothing (mornings can be cool), swimsuit if your hotel has a pool, and cash.',
        },
        {
          category: 'practical',
          question: 'Is English spoken in Tepoztlán?',
          answer: 'Many tourist businesses have staff who speak basic English, especially hotels and main restaurants. However, knowing some Spanish will be very helpful, especially in local markets and with residents.',
        },
        {
          category: 'practical',
          question: 'What is the altitude of Tepoztlán?',
          answer: 'Tepoztlán is located at approximately 1,700 meters (5,577 feet) above sea level. Most people do not experience altitude problems, but stay hydrated.',
        },
      ],
    },
  }

  const t = content[lang]

  // Filter FAQs based on search query
  const filteredFAQs = t.faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Group FAQs by category
  const faqsByCategory = filteredFAQs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = []
    }
    acc[faq.category].push(faq)
    return acc
  }, {} as Record<string, FAQItem[]>)

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white py-16">
        <div className="absolute inset-0 bg-[url('/images/tepoztlan-pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">{t.title}</h1>
            <p className="text-xl opacity-90 mb-8">{t.subtitle}</p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {Object.keys(faqsByCategory).length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                {lang === 'es'
                  ? 'No se encontraron resultados. Intenta con otra búsqueda.'
                  : 'No results found. Try a different search.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {Object.entries(faqsByCategory).map(([category, faqs]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded" />
                  {t.categories[category as keyof typeof t.categories]}
                </h2>
                <div className="space-y-3">
                  {faqs.map((faq) => {
                    const globalIndex = t.faqs.indexOf(faq)
                    const isExpanded = expandedIndex === globalIndex

                    return (
                      <Card
                        key={globalIndex}
                        className="hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => toggleExpand(globalIndex)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
                              {faq.question}
                            </h3>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                            )}
                          </div>
                          {isExpanded && (
                            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Still Have Questions CTA */}
        <Card className="mt-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              {lang === 'es' ? '¿Aún tienes preguntas?' : 'Still have questions?'}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {lang === 'es'
                ? 'Contáctanos directamente y estaremos encantados de ayudarte.'
                : "Contact us directly and we'll be happy to help."}
            </p>
            <a href={`/${lang}/info/contact`}>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
                {lang === 'es' ? 'Contáctanos' : 'Contact Us'}
              </button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
