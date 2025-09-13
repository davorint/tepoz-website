'use client'

import { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { useGSAP } from '@gsap/react'
import { Locale } from '@/lib/i18n'
import { motion, AnimatePresence } from 'motion/react'

// Dynamic imports for performance
const FinalFireballComponent = dynamic(() => import('./NoInteractionFireball'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black" />
})

const ApollonianLoader = dynamic(() => import('@/components/loading/ApollonianLoader'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black z-50" />
})


gsap.registerPlugin(ScrollTrigger, TextPlugin)

interface UltraPremiumLandingProps {
  lang: Locale
}

function LoadingScreen({ message }: { message: string }) {
  return <ApollonianLoader message={message} />
}

const content = {
  es: {
    loading: 'Cargando experiencia inmersiva...',
    hero: {
      title: ['T', 'E', 'P', 'O', 'Z', 'T', 'L', 'Á', 'N'],
      subtitle: 'Lugar de las hachas y Hogar de Tepoztécatl, El Dios de la Fermentación',
      tagline: 'Comida y Bebida | Hoteles y Spas | Historia y Cultura | Magia y Naturaleza | Todas las Tiendas'
    },
    sections: [
      {
        title: 'Sabores Auténticos',
        subtitle: 'Tradición culinaria',
        description: 'Descubre los secretos gastronómicos de Tepoztlán, desde cocina tradicional hasta experiencias gourmet'
      },
      {
        title: 'Descanso Sagrado',
        subtitle: 'Hoteles y spas',
        description: 'Hospédate en lugares únicos donde el lujo se encuentra con la espiritualidad ancestral'
      },
      {
        title: 'Herencia Milenaria',
        subtitle: 'Historia y cultura',
        description: 'Explora templos, museos y tradiciones que han perdurado por siglos en este pueblo mágico'
      },
      {
        title: 'Naturaleza Mística',
        subtitle: 'Magia y naturaleza',
        description: 'Conecta con la energía sagrada de montañas, cascadas y paisajes que inspiran el alma'
      }
    ],
    cta: {
      primary: 'TEPOZTLÁN | Descubre la Magia y Encuéntrate',
      secondary: 'Explorar Experiencias'
    }
  },
  en: {
    loading: 'Loading immersive experience...',
    hero: {
      title: ['T', 'E', 'P', 'O', 'Z', 'T', 'L', 'A', 'N'],
      subtitle: 'Place of The Copper Axe & Home of Tepoztecatl, The God of Fermentation',
      tagline: 'Food & Drink | Hotels & Spas | History & Culture | Magic & Nature | All Stores'
    },
    sections: [
      {
        title: 'Authentic Flavors',
        subtitle: 'Culinary tradition',
        description: 'Discover Tepoztlán\'s gastronomic secrets, from traditional cuisine to gourmet experiences'
      },
      {
        title: 'Sacred Rest',
        subtitle: 'Hotels and spas',
        description: 'Stay in unique places where luxury meets ancestral spirituality'
      },
      {
        title: 'Millennial Heritage',
        subtitle: 'History and culture',
        description: 'Explore temples, museums and traditions that have endured for centuries in this magical town'
      },
      {
        title: 'Mystical Nature',
        subtitle: 'Magic and nature',
        description: 'Connect with the sacred energy of mountains, waterfalls and landscapes that inspire the soul'
      }
    ],
    cta: {
      primary: 'TEPOZTLÁN | Discover the Magic & Find Yourself',
      secondary: 'Explore Experiences'
    }
  }
}

export default function UltraPremiumLanding({ lang }: UltraPremiumLandingProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  const t = content[lang]

  // Custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && cursorDotRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX - 20,
          y: e.clientY - 20,
          duration: 0.5,
          ease: 'power2.out'
        })
        gsap.to(cursorDotRef.current, {
          x: e.clientX - 4,
          y: e.clientY - 4,
          duration: 0.1
        })
      }
    }

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 1.5,
          borderColor: '#00ffff',
          duration: 0.3
        })
      }
    }

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 1,
          borderColor: '#ffffff',
          duration: 0.3
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    const interactiveElements = document.querySelectorAll('button, a, .interactive')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [isLoaded])

  useGSAP(() => {
    if (!isLoaded) return

    // Elegant hero title animation - smooth fade in per letter
    const heroLetters = document.querySelectorAll('.hero-letter')
    if (heroLetters.length > 0) {
      gsap.fromTo('.hero-letter',
        {
          opacity: 0,
          y: 30,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.3
        }
      )
    }

    // Subtle, elegant glow pulse effect on hover only
    if (heroLetters.length > 0) {
      heroLetters.forEach((letter) => {
        letter.addEventListener('mouseenter', () => {
          gsap.to(letter, {
            scale: 1.1,
            textShadow: '0 0 120px rgba(0, 255, 255, 1), 0 0 60px rgba(168, 85, 247, 0.8)',
            duration: 0.3,
            ease: 'power2.out'
          })
        })
        
        letter.addEventListener('mouseleave', () => {
          gsap.to(letter, {
            scale: 1,
            textShadow: '0 0 80px rgba(0, 255, 255, 0.8)',
            duration: 0.4,
            ease: 'power2.out'
          })
        })
      })
    }

    // Subtitle typewriter effect
    const heroSubtitle = document.querySelector('.hero-subtitle')
    if (heroSubtitle) {
      gsap.to('.hero-subtitle', {
        text: t.hero.subtitle,
        duration: 3,
        ease: 'none',
        delay: 2
      })
    }

    // Tagline fade in with glow
    const heroTagline = document.querySelector('.hero-tagline')
    if (heroTagline) {
      gsap.fromTo('.hero-tagline',
        {
          opacity: 0,
          scale: 0.8,
          filter: 'blur(20px)'
        },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 2,
          delay: 3,
          ease: 'power3.out'
        }
      )
    }

    // Section parallax with 3D rotation - with error handling
    try {
      const premiumSections = gsap.utils.toArray('.premium-section')
      if (premiumSections.length > 0) {
        premiumSections.forEach((section, i) => {
          if (!section) return
          
          ScrollTrigger.create({
            trigger: section as Element,
            start: 'top bottom',
            end: 'bottom top',
            onEnter: () => setActiveSection(i),
            onEnterBack: () => setActiveSection(i),
            animation: gsap.timeline()
              .fromTo(section,
                {
                  opacity: 0,
                  y: 100
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 1,
                  ease: 'power3.out'
                }
              )
          })
        })
      }
    } catch (error) {
      console.warn('ScrollTrigger animation failed:', error)
    }


    // Pulsating CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button')
    if (ctaButtons.length > 0) {
      gsap.to('.cta-button', {
        scale: 1.05,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.2
      })
    }


  }, { scope: containerRef, dependencies: [isLoaded, lang] })

  // Initialize loading
  useEffect(() => {
    // Simulate loading - extended duration for better experience
    const timer = setTimeout(() => setIsLoaded(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className="fixed w-10 h-10 border-2 border-white rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div 
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      {/* Loading Screen */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 2, filter: 'blur(20px)' }}
            transition={{ duration: 1 }}
          >
            <LoadingScreen message="Loading Platform" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div ref={containerRef} className="relative overflow-hidden bg-black" style={{ perspective: '1000px' }}>

        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center">          
          <div className="relative text-center pt-32" style={{ zIndex: 20 }}>
            <h1 className="text-8xl md:text-[12rem] font-black mb-8">
              {t.hero.title.map((letter, i) => (
                <span
                  key={i}
                  className="hero-letter inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400"
                  style={{ textShadow: '0 0 80px rgba(0, 255, 255, 0.8)' }}
                >
                  {letter}
                </span>
              ))}
            </h1>
            
            {/* Fireball below title */}
            <div className="mb-4">
              <FinalFireballComponent />
            </div>
            
            <p className="hero-subtitle text-2xl md:text-4xl text-white/80 mb-4 h-10"></p>
            
            <p className="hero-tagline text-lg md:text-xl text-cyan-400 font-light tracking-widest">
              {t.hero.tagline}
            </p>
            
            <div className="mt-12 flex gap-6 justify-center">
              <button className="cta-button interactive px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300">
                {t.cta.primary}
              </button>
              <button className="cta-button interactive px-8 py-4 border-2 border-white/30 rounded-full text-white font-bold text-lg backdrop-blur-xl hover:bg-white/10 transition-all duration-300">
                {t.cta.secondary}
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <div className="w-6 h-12 border-2 border-white/30 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-white rounded-full mt-2"
              />
            </div>
          </div>
        </section>

        {/* Premium Sections */}
        {t.sections.map((section, i) => (
          <section
            key={i}
            className="premium-section relative min-h-screen flex items-center justify-center py-32"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1, type: 'spring' }}
                className="text-9xl mb-8"
              >
                {['🌀', '⚡', '🔮', '✨'][i]}
              </motion.div>
              
              <h2 className="text-6xl md:text-8xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400">
                {section.title}
              </h2>
              
              <h3 className="text-3xl md:text-4xl text-white/60 mb-8 font-light">
                {section.subtitle}
              </h3>
              
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                {section.description}
              </p>
              
              {/* Interactive orbs */}
              <div className="mt-16 flex justify-center gap-8">
                {[...Array(3)].map((_, j) => (
                  <motion.div
                    key={j}
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-600/20 backdrop-blur-xl border border-white/20"
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3 + j,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Section background effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  background: `radial-gradient(circle at ${25 * (i + 1)}% ${25 * (i + 1)}%, ${['cyan', 'purple', 'yellow', 'pink'][i]} 0%, transparent 50%)`
                }}
              />
            </div>
          </section>
        ))}

        {/* Navigation dots */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === i 
                  ? 'bg-white border-white scale-150' 
                  : 'bg-transparent border-white/30 hover:border-white'
              }`}
              onClick={() => {
                const section = document.querySelectorAll('.premium-section')[i]
                section?.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>

    </>
  )
}