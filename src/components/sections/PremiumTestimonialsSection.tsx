import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote, MessageCircle, ThumbsUp, Camera } from 'lucide-react'
import { Locale } from '@/lib/i18n'

interface PremiumTestimonialsSectionProps {
  lang: Locale
}

const testimonials = {
  es: [
    {
      id: 1,
      name: "María González",
      location: "Ciudad de México",
      rating: 5,
      text: "Tepoztlán es un lugar mágico que te conecta con la naturaleza y la cultura mexicana. Cada rincón tiene una historia que contar.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      date: "Hace 2 semanas",
      verified: true,
      category: "Experiencia Cultural"
    },
    {
      id: 2,
      name: "Carlos Rodríguez", 
      location: "Guadalajara",
      rating: 5,
      text: "La gastronomía local es excepcional. Cada restaurante tiene su propia personalidad y los sabores son auténticos.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      date: "Hace 1 mes",
      verified: true,
      category: "Gastronomía"
    },
    {
      id: 3,
      name: "Ana Martínez",
      location: "Puebla", 
      rating: 5,
      text: "El hospedaje fue extraordinario. La atención al detalle hizo de nuestra estancia una experiencia memorable.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      date: "Hace 3 semanas",
      verified: true,
      category: "Hospedaje"
    },
    {
      id: 4,
      name: "Luis Hernández",
      location: "Monterrey",
      rating: 5,
      text: "Subir al Tepozteco fue una experiencia transformadora. Las vistas son espectaculares y la energía del lugar es única.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      date: "Hace 2 meses",
      verified: false,
      category: "Aventura"
    },
    {
      id: 5,
      name: "Isabella Torres",
      location: "Querétaro",
      rating: 5,
      text: "Los mercados artesanales son increíbles. Encontré piezas únicas y los artesanos locales son muy amables.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
      date: "Hace 1 semana",
      verified: true,
      category: "Compras"
    },
    {
      id: 6,
      name: "Roberto Silva",
      location: "Cuernavaca",
      rating: 5,
      text: "La energía espiritual del lugar es incomparable. Perfecto para desconectar y reconectar contigo mismo.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      date: "Hace 5 días",
      verified: true,
      category: "Bienestar"
    }
  ],
  en: [
    {
      id: 1,
      name: "María González",
      location: "Mexico City",
      rating: 5,
      text: "Tepoztlán is a magical place that connects you with nature and Mexican culture. Every corner has a story to tell.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      date: "2 weeks ago",
      verified: true,
      category: "Cultural Experience"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      location: "Guadalajara", 
      rating: 5,
      text: "The local cuisine is exceptional. Each restaurant has its own personality and the flavors are authentic.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      date: "1 month ago",
      verified: true,
      category: "Gastronomy"
    },
    {
      id: 3,
      name: "Ana Martínez",
      location: "Puebla",
      rating: 5,
      text: "The accommodation was extraordinary. The attention to detail made our stay memorable.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      date: "3 weeks ago",
      verified: true,
      category: "Accommodation"
    },
    {
      id: 4,
      name: "Luis Hernández",
      location: "Monterrey",
      rating: 5,
      text: "Climbing Tepozteco was a transformative experience. The views are spectacular and the energy of the place is unique.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      date: "2 months ago",
      verified: false,
      category: "Adventure"
    },
    {
      id: 5,
      name: "Isabella Torres",
      location: "Querétaro",
      rating: 5,
      text: "The artisan markets are incredible. I found unique pieces and the local artisans are very friendly.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
      date: "1 week ago",
      verified: true,
      category: "Shopping"
    },
    {
      id: 6,
      name: "Roberto Silva",
      location: "Cuernavaca",
      rating: 5,
      text: "The spiritual energy of the place is incomparable. Perfect for disconnecting and reconnecting with yourself.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      date: "5 days ago",
      verified: true,
      category: "Wellness"
    }
  ]
}

export default function PremiumTestimonialsSection({ lang }: PremiumTestimonialsSectionProps) {
  const currentTestimonials = testimonials[lang]

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-white via-gray-25/5 to-white dark:from-slate-900 dark:via-blue-900/50 dark:to-slate-800 relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-blue-300/2 dark:bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-cyan-300/8 dark:bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute top-2/3 left-1/3 w-80 h-80 bg-indigo-300/5 dark:bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Clean Modern Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-blue-700" />
            <span>{lang === 'es' ? 'Testimonios Verificados' : 'Verified Reviews'}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white font-sans">
            {lang === 'es' ? 'Historias de Nuestros Visitantes' : 'Stories from Our Visitors'}
          </h2>
          
          <p className="text-lg text-gray-500 dark:text-gray-300">
            {lang === 'es' 
              ? 'Descubre experiencias auténticas de quienes han visitado Tepoztlán'
              : 'Discover authentic experiences from those who have visited Tepoztlán'
            }
          </p>
        </div>

        {/* Modern Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {currentTestimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="break-inside-avoid"
            >
              <Card className="bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:bg-white/80 dark:hover:bg-white/15">
                <CardContent className="p-6">
                  {/* Modern Quote Design */}
                  <div className="relative mb-4">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-50 dark:text-blue-900/50" />
                    <p className="relative text-gray-600 dark:text-gray-300 leading-relaxed pl-6">
                      {testimonial.text}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">5.0</span>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-white shadow-md bg-gray-200">
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">Loading...</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-800 dark:text-white">{testimonial.name}</p>
                        {testimonial.verified && (
                          <svg className="w-4 h-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 dark:text-gray-400">{testimonial.location} • {testimonial.date}</p>
                    </div>
                  </div>

                  {/* Category Tag */}
                  <div className="mt-4 pt-4 border-t border-gray-100/50 dark:border-gray-600/30">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-50/60 to-cyan-50/60 backdrop-blur-sm text-blue-700 rounded-full text-xs font-medium border border-blue-100/20">
                      {testimonial.category}
                    </span>
                  </div>

                  {/* Interaction Bar */}
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100/50">
                    <button className="flex items-center gap-1 text-gray-400 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-xs">{lang === 'es' ? 'Útil' : 'Helpful'}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-400 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs">{lang === 'es' ? 'Comentar' : 'Comment'}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-400 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                      <Camera className="w-4 h-4" />
                      <span className="text-xs">{lang === 'es' ? 'Ver fotos' : 'View photos'}</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Simple Stats Bar */}
        <div className="mt-16 bg-white/50 dark:bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 dark:border-white/20 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">4.9</div>
              <div className="text-sm text-gray-500 dark:text-gray-300">{lang === 'es' ? 'Calificación' : 'Rating'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">500+</div>
              <div className="text-sm text-gray-500 dark:text-gray-300">{lang === 'es' ? 'Reseñas' : 'Reviews'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">98%</div>
              <div className="text-sm text-gray-500 dark:text-gray-300">{lang === 'es' ? 'Recomiendan' : 'Recommend'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">#1</div>
              <div className="text-sm text-gray-500 dark:text-gray-300">{lang === 'es' ? 'En Morelos' : 'In Morelos'}</div>
            </div>
          </div>
        </div>

        {/* Simple CTA */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full transition-colors">
            {lang === 'es' ? 'Ver todas las reseñas' : 'View all reviews'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}