'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Locale } from '@/lib/i18n'

interface TestimonialsProps {
  lang: Locale
}

const testimonials = {
  es: [
    {
      id: 1,
      name: "María González",
      location: "Ciudad de México",
      rating: 5,
      text: "Tepoztlán es un lugar mágico que te conecta con la naturaleza y la cultura mexicana. La subida al Tepozteco fue increíble y las vistas son espectaculares.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b05b?w=150&h=150&fit=crop&crop=face",
      experience: "Senderismo y Cultura"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      location: "Guadalajara",
      rating: 5,
      text: "La gastronomía local es excepcional. Cada restaurante tiene su propia personalidad y los sabores son auténticos. Definitivamente regresaré.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      experience: "Experiencia Gastronómica"
    },
    {
      id: 3,
      name: "Ana Martínez",
      location: "Puebla",
      rating: 5,
      text: "El hospedaje en Casa Fernanda fue extraordinario. La atención al detalle y el ambiente acogedor hicieron de nuestra estancia una experiencia memorable.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      experience: "Hospedaje Boutique"
    },
    {
      id: 4,
      name: "Roberto Silva",
      location: "Monterrey",
      rating: 5,
      text: "Perfecto para una escapada de fin de semana. Los mercados locales, la arquitectura colonial y la energía del lugar son únicos.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      experience: "Escapada de Fin de Semana"
    },
    {
      id: 5,
      name: "Isabella López",
      location: "Querétaro",
      rating: 5,
      text: "Como fotógrafa, Tepoztlán me ofreció paisajes y momentos únicos. Cada rincón tiene una historia que contar y una belleza que capturar.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      experience: "Fotografía y Arte"
    }
  ],
  en: [
    {
      id: 1,
      name: "María González",
      location: "Mexico City",
      rating: 5,
      text: "Tepoztlán is a magical place that connects you with nature and Mexican culture. The hike to Tepozteco was incredible and the views are spectacular.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b05b?w=150&h=150&fit=crop&crop=face",
      experience: "Hiking and Culture"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      location: "Guadalajara",
      rating: 5,
      text: "The local cuisine is exceptional. Each restaurant has its own personality and the flavors are authentic. I will definitely return.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      experience: "Gastronomic Experience"
    },
    {
      id: 3,
      name: "Ana Martínez",
      location: "Puebla",
      rating: 5,
      text: "The accommodation at Casa Fernanda was extraordinary. The attention to detail and cozy atmosphere made our stay a memorable experience.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      experience: "Boutique Accommodation"
    },
    {
      id: 4,
      name: "Roberto Silva",
      location: "Monterrey",
      rating: 5,
      text: "Perfect for a weekend getaway. The local markets, colonial architecture, and the energy of the place are unique.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      experience: "Weekend Getaway"
    },
    {
      id: 5,
      name: "Isabella López",
      location: "Querétaro",
      rating: 5,
      text: "As a photographer, Tepoztlán offered me unique landscapes and moments. Every corner has a story to tell and beauty to capture.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      experience: "Photography and Art"
    }
  ]
}

export default function TestimonialsSection({ lang }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const currentTestimonials = testimonials[lang]

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentTestimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex, isAutoPlaying, currentTestimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % currentTestimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + currentTestimonials.length) % currentTestimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent">
            {lang === 'es' ? 'Lo Que Dicen Nuestros Visitantes' : 'What Our Visitors Say'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {lang === 'es' 
              ? 'Experiencias reales de personas que han descubierto la magia de Tepoztlán'
              : 'Real experiences from people who have discovered the magic of Tepoztlán'
            }
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <div className="relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
              <Card className="max-w-4xl mx-auto border-0 bg-white/70 backdrop-blur-md shadow-2xl overflow-hidden">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <Avatar className="w-24 h-24 ring-4 ring-white/50">
                        <AvatarImage 
                          src={currentTestimonials[currentIndex].image} 
                          alt={currentTestimonials[currentIndex].name} 
                        />
                        <AvatarFallback className="bg-gradient-to-br from-tepoztlan-sunset to-tepoztlan-earth text-white text-2xl">
                          {currentTestimonials[currentIndex].name[0]}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      {/* Quote Icon */}
                      <Quote className="w-8 h-8 text-tepoztlan-sunset/60 mb-4 mx-auto md:mx-0" />
                      
                      {/* Testimonial Text */}
                      <blockquote className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed italic">
                        &ldquo;{currentTestimonials[currentIndex].text}&rdquo;
                      </blockquote>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-4 justify-center md:justify-start">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${
                              i < currentTestimonials[currentIndex].rating 
                                ? 'text-yellow-400 fill-yellow-400' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>

                      {/* Author Info */}
                      <div className="space-y-1">
                        <div className="font-semibold text-gray-900 text-lg">
                          {currentTestimonials[currentIndex].name}
                        </div>
                        <div className="text-gray-600">
                          {currentTestimonials[currentIndex].location}
                        </div>
                        <div className="inline-block px-3 py-1 bg-tepoztlan-sunset/10 text-tepoztlan-sunset rounded-full text-sm font-medium">
                          {currentTestimonials[currentIndex].experience}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button
              variant="outline"
              size="lg"
              onClick={prevTestimonial}
              className="rounded-full bg-white/60 backdrop-blur-md border-white/30 hover:bg-white/80"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex gap-2">
              {currentTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-tepoztlan-sunset scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={nextTestimonial}
              className="rounded-full bg-white/60 backdrop-blur-md border-white/30 hover:bg-white/80"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Thumbnail Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {currentTestimonials.map((testimonial, index) => (
            <motion.button
              key={testimonial.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => goToTestimonial(index)}
              className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                index === currentIndex
                  ? 'ring-3 ring-tepoztlan-sunset ring-offset-2 shadow-lg'
                  : 'hover:shadow-md opacity-70 hover:opacity-100'
              }`}
            >
              <Card className="border-0 bg-white/60 backdrop-blur-md">
                <CardContent className="p-4 text-center">
                  <Avatar className="w-12 h-12 mx-auto mb-2">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className="bg-gradient-to-br from-tepoztlan-sunset to-tepoztlan-earth text-white">
                      {testimonial.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-gray-600 truncate">
                    {testimonial.location}
                  </div>
                  <div className="flex justify-center mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}