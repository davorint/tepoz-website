'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'
import { Users, Star, MapPin, Calendar } from 'lucide-react'
import { Locale } from '@/lib/i18n'

interface FloatingStatsSectionProps {
  lang: Locale
}

interface StatItem {
  id: string
  icon: React.ComponentType<{ className?: string }>
  value: number
  suffix: string
  label: string
  labelEn: string
  color: string
}

const stats: StatItem[] = [
  {
    id: 'visitors',
    icon: Users,
    value: 250000,
    suffix: '+',
    label: 'Visitantes Anuales',
    labelEn: 'Annual Visitors',
    color: 'text-blue-600'
  },
  {
    id: 'rating',
    icon: Star,
    value: 4.8,
    suffix: '/5',
    label: 'Calificación Promedio',
    labelEn: 'Average Rating',
    color: 'text-yellow-500'
  },
  {
    id: 'attractions',
    icon: MapPin,
    value: 45,
    suffix: '+',
    label: 'Atracciones Únicas',
    labelEn: 'Unique Attractions',
    color: 'text-green-600'
  },
  {
    id: 'events',
    icon: Calendar,
    value: 120,
    suffix: '+',
    label: 'Eventos Anuales',
    labelEn: 'Annual Events',
    color: 'text-purple-600'
  }
]

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(end) // Start with end value to prevent hydration mismatch
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setCount(0) // Reset to 0 after mount
  }, [])

  useEffect(() => {
    if (!isVisible || !isMounted) return

    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(end * easeOut)

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, isVisible, isMounted])

  return { count, setIsVisible }
}

function StatCard({ stat, lang }: { stat: StatItem, lang: Locale }) {
  const { count, setIsVisible } = useCountUp(stat.value)
  const Icon = stat.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6 }
      }}
      viewport={{ once: true, margin: '-50px' }}
      onViewportEnter={() => setIsVisible(true)}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      suppressHydrationWarning
    >
      <Card className="bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardContent className="p-6 text-center">
          <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 ${stat.color}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {stat.id === 'rating' ? count.toFixed(1) : count.toLocaleString()}
            {stat.suffix}
          </div>
          <div className="text-sm text-gray-700 font-medium">
            {lang === 'es' ? stat.label : stat.labelEn}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function FloatingStatsSection({ lang }: FloatingStatsSectionProps) {

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden" style={{containerType: 'inline-size'}}>
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-200/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
          suppressHydrationWarning
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent">
            {lang === 'es' ? 'Tepoztlán en Números' : 'Tepoztlán by Numbers'}
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {lang === 'es' 
              ? 'Descubre por qué miles de visitantes eligen Tepoztlán como su destino favorito'
              : 'Discover why thousands of visitors choose Tepoztlán as their favorite destination'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-2 container-lg:grid-cols-3 container-xl:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              suppressHydrationWarning
            >
              <StatCard stat={stat} lang={lang} />
            </motion.div>
          ))}
        </div>

        {/* Additional floating elements */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          suppressHydrationWarning
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-tepoztlan-sunset/10 text-tepoztlan-sunset rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-tepoztlan-sunset rounded-full animate-pulse" />
            {lang === 'es' ? 'Datos actualizados en tiempo real' : 'Real-time updated data'}
          </div>
        </motion.div>
      </div>
    </section>
  )
}