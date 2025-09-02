import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
import { Locale } from '@/lib/i18n'

interface SimpleTestimonialsSectionProps {
  lang: Locale
}

const testimonials = {
  es: [
    {
      id: 1,
      name: "María González",
      location: "Ciudad de México",
      rating: 5,
      text: "Tepoztlán es un lugar mágico que te conecta con la naturaleza y la cultura mexicana.",
      image: "MG"
    },
    {
      id: 2,
      name: "Carlos Rodríguez", 
      location: "Guadalajara",
      rating: 5,
      text: "La gastronomía local es excepcional. Cada restaurante tiene su propia personalidad.",
      image: "CR"
    },
    {
      id: 3,
      name: "Ana Martínez",
      location: "Puebla", 
      rating: 5,
      text: "El hospedaje fue extraordinario. La atención al detalle hizo de nuestra estancia una experiencia memorable.",
      image: "AM"
    }
  ],
  en: [
    {
      id: 1,
      name: "María González",
      location: "Mexico City",
      rating: 5,
      text: "Tepoztlán is a magical place that connects you with nature and Mexican culture.",
      image: "MG"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      location: "Guadalajara", 
      rating: 5,
      text: "The local cuisine is exceptional. Each restaurant has its own personality.",
      image: "CR"
    },
    {
      id: 3,
      name: "Ana Martínez",
      location: "Puebla",
      rating: 5,
      text: "The accommodation was extraordinary. The attention to detail made our stay memorable.",
      image: "AM"
    }
  ]
}

export default function SimpleTestimonialsSection({ lang }: SimpleTestimonialsSectionProps) {
  const currentTestimonials = testimonials[lang]

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent">
            {lang === 'es' ? 'Lo Que Dicen Nuestros Visitantes' : 'What Our Visitors Say'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {lang === 'es' 
              ? 'Experiencias reales de personas que han descubierto la magia de Tepoztlán'
              : 'Real experiences from people who have discovered the magic of Tepoztlán'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 bg-white/95 backdrop-blur-md shadow-xl border border-gray-200/20">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.image}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                <blockquote className="text-gray-700 italic">
                  {testimonial.text}
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}