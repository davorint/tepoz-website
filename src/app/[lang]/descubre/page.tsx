import Image from 'next/image'
import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { buildLocalizedUrl } from '@/lib/url-mapping'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  Users,
  Mountain,
  Sparkles,
  ArrowRight,
  Camera,
  Calendar
} from 'lucide-react'

interface DiscoverPageProps {
  params: Promise<{ lang: string }>
}

export default async function DiscoverPage({ params }: DiscoverPageProps) {
  const { lang: langParam } = await params
  const lang = langParam as Locale

  const destinations = [
    {
      id: 'tepoztlan',
      name: lang === 'es' ? 'Tepoztlán Centro' : 'Tepoztlán Downtown',
      description: lang === 'es' 
        ? 'El corazón del Pueblo Mágico con su mercado tradicional, ex-convento dominico y calles empedradas llenas de historia.'
        : 'The heart of the Magical Town with its traditional market, Dominican ex-convent and cobblestone streets full of history.',
      image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?q=80&w=2070',
      highlights: lang === 'es' 
        ? ['Ex-Convento Dominico', 'Mercado Local', 'Centro Histórico', 'Arquitectura Colonial']
        : ['Dominican Ex-Convent', 'Local Market', 'Historic Center', 'Colonial Architecture'],
      duration: lang === 'es' ? '2-3 horas' : '2-3 hours',
      difficulty: lang === 'es' ? 'Fácil' : 'Easy'
    },
    {
      id: 'amatlan',
      name: 'Amatlán de Quetzalcóatl',
      description: lang === 'es'
        ? 'Pueblo místico conocido como la cuna de Quetzalcóatl, con hermosas pozas naturales y un ambiente de tranquilidad absoluta.'
        : 'Mystical town known as the birthplace of Quetzalcoatl, with beautiful natural pools and an atmosphere of absolute tranquility.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070',
      highlights: lang === 'es'
        ? ['Pozas Naturales', 'Leyenda de Quetzalcóatl', 'Ambiente Místico', 'Naturaleza Virgen']
        : ['Natural Pools', 'Quetzalcoatl Legend', 'Mystical Atmosphere', 'Pristine Nature'],
      duration: lang === 'es' ? '4-5 horas' : '4-5 hours',
      difficulty: lang === 'es' ? 'Moderado' : 'Moderate'
    },
    {
      id: 'san-juan-tlacotenco',
      name: 'San Juan Tlacotenco',
      description: lang === 'es'
        ? 'Pueblo tradicional famoso por su producción artesanal de pulque y su vida rural auténtica en las montañas.'
        : 'Traditional town famous for its artisanal pulque production and authentic rural life in the mountains.',
      image: 'https://images.unsplash.com/photo-1573160103600-75c7b7f2b9e2?q=80&w=2070',
      highlights: lang === 'es'
        ? ['Producción de Pulque', 'Turismo Rural', 'Tradiciones Ancestrales', 'Vida Comunitaria']
        : ['Pulque Production', 'Rural Tourism', 'Ancestral Traditions', 'Community Life'],
      duration: lang === 'es' ? '6-8 horas' : '6-8 hours',
      difficulty: lang === 'es' ? 'Fácil' : 'Easy'
    },
    {
      id: 'ocotitlan',
      name: 'Ocotitlán',
      description: lang === 'es'
        ? 'Comunidad serrana con impresionantes senderos de montaña y vistas panorámicas del valle de Morelos.'
        : 'Mountain community with impressive mountain trails and panoramic views of the Morelos valley.',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070',
      highlights: lang === 'es'
        ? ['Senderos Montañosos', 'Vistas Panorámicas', 'Flora y Fauna', 'Comunidad Rural']
        : ['Mountain Trails', 'Panoramic Views', 'Flora and Fauna', 'Rural Community'],
      duration: lang === 'es' ? '5-6 horas' : '5-6 hours',
      difficulty: lang === 'es' ? 'Difícil' : 'Difficult'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Mountain className="h-8 w-8 text-primary mr-2" />
          <h1 className="text-4xl font-bold">
            {lang === 'es' ? 'Descubre Tepoztlán' : 'Discover Tepoztlán'}
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {lang === 'es'
            ? 'Explora los destinos más fascinantes de la región, desde el centro histórico hasta pueblos escondidos entre las montañas.'
            : 'Explore the most fascinating destinations in the region, from the historic center to hidden villages among the mountains.'
          }
        </p>
      </div>

      {/* Featured Destinations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {destinations.map((destination, _index) => ( // eslint-disable-line @typescript-eslint/no-unused-vars
          <Card key={destination.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
            <div className="relative h-64">
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Duration and Difficulty Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                  <Clock className="h-3 w-3 mr-1" />
                  {destination.duration}
                </Badge>
                <Badge 
                  className={`backdrop-blur-sm border-white/30 ${
                    destination.difficulty === 'Fácil' || destination.difficulty === 'Easy'
                      ? 'bg-green-500/20 text-green-100'
                      : destination.difficulty === 'Moderado' || destination.difficulty === 'Moderate' 
                      ? 'bg-yellow-500/20 text-yellow-100'
                      : 'bg-red-500/20 text-red-100'
                  }`}
                >
                  {destination.difficulty}
                </Badge>
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {destination.name}
                </h3>
              </div>
            </div>

            <CardContent className="p-6">
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {destination.description}
              </p>

              {/* Highlights */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm mb-2 text-foreground">
                  {lang === 'es' ? 'Destacados:' : 'Highlights:'}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {destination.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center text-xs text-muted-foreground">
                      <Sparkles className="h-3 w-3 mr-1 text-primary" />
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Button className="w-full group" asChild>
                <Link href={buildLocalizedUrl(`descubre/${destination.id}`, lang)}>
                  {lang === 'es' ? 'Explorar Destino' : 'Explore Destination'}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="text-center p-6">
          <Camera className="h-12 w-12 mx-auto text-primary mb-4" />
          <h3 className="font-semibold mb-2">
            {lang === 'es' ? 'Fotogénico' : 'Photogenic'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {lang === 'es'
              ? 'Paisajes perfectos para capturar momentos inolvidables'
              : 'Perfect landscapes to capture unforgettable moments'
            }
          </p>
        </Card>

        <Card className="text-center p-6">
          <Users className="h-12 w-12 mx-auto text-primary mb-4" />
          <h3 className="font-semibold mb-2">
            {lang === 'es' ? 'Para Todos' : 'For Everyone'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {lang === 'es'
              ? 'Experiencias diseñadas para familias, parejas y aventureros'
              : 'Experiences designed for families, couples and adventurers'
            }
          </p>
        </Card>

        <Card className="text-center p-6">
          <Calendar className="h-12 w-12 mx-auto text-primary mb-4" />
          <h3 className="font-semibold mb-2">
            {lang === 'es' ? 'Todo el Año' : 'Year Round'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {lang === 'es'
              ? 'Cada estación ofrece una experiencia única y especial'
              : 'Each season offers a unique and special experience'
            }
          </p>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-muted/50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4">
          {lang === 'es' 
            ? '¿Listo para tu Aventura?' 
            : 'Ready for Your Adventure?'
          }
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          {lang === 'es'
            ? 'Planifica tu itinerario perfecto y descubre los secretos mejor guardados de Tepoztlán y sus alrededores.'
            : 'Plan your perfect itinerary and discover the best kept secrets of Tepoztlán and its surroundings.'
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href={buildLocalizedUrl('planificar', lang)}>
              {lang === 'es' ? 'Crear Itinerario' : 'Create Itinerary'}
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href={buildLocalizedUrl('mapa', lang)}>
              {lang === 'es' ? 'Ver en Mapa' : 'View on Map'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}