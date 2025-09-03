'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { motion } from 'motion/react'
import { Locale } from '@/lib/i18n'
import ClientOnly from '@/components/ui/client-only'

interface PremiumCTAProps {
  lang: Locale
}

const quickLinks = [
  {
    id: 'top-restaurants',
    titleEs: 'Top 10 Restaurantes',
    titleEn: 'Top 10 Restaurants',
    emoji: '🌟',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'weekend-stays',
    titleEs: 'Escapadas de Fin de Semana',
    titleEn: 'Weekend Getaways',
    emoji: '🏡',
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'night-life',
    titleEs: 'Vida Nocturna',
    titleEn: 'Night Life',
    emoji: '🌙',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'adventure',
    titleEs: 'Aventuras al Aire Libre',
    titleEn: 'Outdoor Adventures',
    emoji: '⛰️',
    color: 'from-green-500 to-teal-500'
  }
]

export default function PremiumCTA({ lang }: PremiumCTAProps) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([])
  const liquidRef = useRef<(HTMLDivElement | null)[]>([])
  const [isMounted, setIsMounted] = useState(false)

  // Ensure component is mounted before animations
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    // Liquid button effects
    buttonsRef.current.forEach((button, index) => {
      if (!button) return

      const liquid = liquidRef.current[index]
      if (!liquid) return

      // Create liquid morphing effect
      button.addEventListener('mouseenter', (e) => {
        const rect = button.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        gsap.to(liquid, {
          scale: 3,
          x: x - rect.width / 2,
          y: y - rect.height / 2,
          duration: 0.5,
          ease: "power2.out"
        })
      })

      button.addEventListener('mouseleave', () => {
        gsap.to(liquid, {
          scale: 0,
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        })
      })

      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        gsap.to(liquid, {
          x: x - rect.width / 2,
          y: y - rect.height / 2,
          duration: 0.1
        })
      })
    })

    // Floating animation for emojis
    const emojis = document.querySelectorAll('.floating-emoji')
    emojis.forEach((emoji, index) => {
      gsap.to(emoji, {
        y: "random(-10, 10)",
        x: "random(-5, 5)",
        rotation: "random(-15, 15)",
        duration: "random(2, 3)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2
      })
    })

    // Particle system for background
    const container = document.querySelector('.particle-container')
    if (container) {
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div')
        particle.className = 'particle'
        particle.style.cssText = `
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          border-radius: 50%;
          pointer-events: none;
        `
        container.appendChild(particle)

        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * 400,
          opacity: Math.random()
        })

        gsap.to(particle, {
          y: "-=200",
          x: "+=100",
          opacity: 0,
          duration: "random(3, 6)",
          repeat: -1,
          delay: Math.random() * 2,
          ease: "none"
        })
      }
    }

    return () => {
      // Cleanup
      buttonsRef.current.forEach(button => {
        if (button) {
          button.removeEventListener('mouseenter', () => {})
          button.removeEventListener('mouseleave', () => {})
          button.removeEventListener('mousemove', () => {})
        }
      })
    }
  }, [isMounted])

  return (
    <ClientOnly fallback={
      <section className="py-24 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-playfair">
            {lang === 'es' ? '¿Qué Buscas Hoy?' : 'What Are You Looking For Today?'}
          </h2>
          <p className="text-xl mb-12 text-gray-300 font-montserrat">
            {lang === 'es' 
              ? 'Acceso rápido a las mejores experiencias de Tepoztlán'
              : 'Quick access to the best experiences in Tepoztlán'
            }
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickLinks.map(link => (
              <button
                key={link.id}
                className={`p-6 bg-gradient-to-r ${link.color} rounded-2xl text-white font-semibold text-lg hover:scale-105 transition-transform duration-300`}
              >
                <span className="text-3xl mr-3">{link.emoji}</span>
                {lang === 'es' ? link.titleEs : link.titleEn}
              </button>
            ))}
          </div>
        </div>
      </section>
    }>
      <section className="relative py-24 px-4 bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-800 text-white overflow-hidden">
        {/* Particle container */}
        <div className="particle-container absolute inset-0" />
        
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Animated header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-playfair bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {lang === 'es' ? '¿Qué Buscas Hoy?' : 'What Are You Looking For Today?'}
            </h2>
            <p className="text-xl text-gray-300 font-montserrat">
              {lang === 'es' 
                ? 'Acceso rápido a las mejores experiencias de Tepoztlán'
                : 'Quick access to the best experiences in Tepoztlán'
              }
            </p>
          </motion.div>

          {/* Liquid buttons grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickLinks.map((link, index) => (
              <motion.button
                key={link.id}
                ref={el => {buttonsRef.current[index] = el}}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative p-8 bg-gradient-to-r ${link.color} rounded-2xl text-white font-semibold text-lg overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                onMouseEnter={() => setHoveredButton(link.id)}
                onMouseLeave={() => setHoveredButton(null)}
              >
                {/* Liquid effect layer */}
                <div 
                  ref={el => {liquidRef.current[index] = el}}
                  className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/20 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2 scale-0 pointer-events-none"
                />
                
                {/* Ripple effect on hover */}
                {hoveredButton === link.id && (
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                )}
                
                {/* Content */}
                <div className="relative z-10 flex items-center justify-center space-x-3">
                  <span className="floating-emoji text-4xl">{link.emoji}</span>
                  <span className="text-xl font-montserrat">
                    {lang === 'es' ? link.titleEs : link.titleEn}
                  </span>
                </div>
                
                {/* Shimmer effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
                
                {/* Arrow indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-2xl"
                  >
                    →
                  </motion.div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Interactive stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 flex flex-wrap justify-center gap-8"
          >
            {[
              { number: '500+', label: lang === 'es' ? 'Negocios Registrados' : 'Registered Businesses' },
              { number: '10K+', label: lang === 'es' ? 'Visitantes Mensuales' : 'Monthly Visitors' },
              { number: '4.8', label: lang === 'es' ? 'Calificación Promedio' : 'Average Rating' }
            ].map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent"
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-gray-400 mt-2 font-montserrat group-hover:text-white transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </ClientOnly>
  )
}