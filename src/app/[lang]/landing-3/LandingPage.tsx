'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Locale } from '@/lib/i18n'

// Dynamic import Three.js scene to avoid SSR issues
const ThreeScene = dynamic(() => import('./ThreeScene'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="text-white text-2xl animate-pulse">Loading 3D Scene...</div>
    </div>
  )
})

gsap.registerPlugin(ScrollTrigger)

interface LandingPageProps {
  lang: Locale
}

const content = {
  es: {
    hero: {
      title: 'TEPOZTLÁN',
      subtitle: 'Donde la magia cobra vida',
      cta: 'Descubre el Pueblo Mágico'
    },
    sections: {
      mystical: {
        title: 'Energía Mística',
        description: 'Siente la energía ancestral que emana del Tepozteco'
      },
      culture: {
        title: 'Cultura Viva',
        description: 'Tradiciones milenarias que perduran en el tiempo'
      },
      nature: {
        title: 'Naturaleza Sagrada',
        description: 'Montañas que guardan secretos ancestrales'
      },
      experience: {
        title: 'Experiencias Únicas',
        description: 'Vive momentos que transformarán tu espíritu'
      }
    }
  },
  en: {
    hero: {
      title: 'TEPOZTLÁN',
      subtitle: 'Where magic comes to life',
      cta: 'Discover the Magic Town'
    },
    sections: {
      mystical: {
        title: 'Mystical Energy',
        description: 'Feel the ancestral energy emanating from Tepozteco'
      },
      culture: {
        title: 'Living Culture',
        description: 'Ancient traditions that endure through time'
      },
      nature: {
        title: 'Sacred Nature',
        description: 'Mountains that hold ancient secrets'
      },
      experience: {
        title: 'Unique Experiences',
        description: 'Live moments that will transform your spirit'
      }
    }
  }
}

export default function LandingPage({ lang }: LandingPageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLElement[]>([])
  const t = content[lang]

  useGSAP(() => {
    // Hero text animations
    gsap.fromTo('.hero-title',
      { 
        opacity: 0,
        y: 100,
        scale: 0.5
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 2,
        ease: 'power4.out',
        delay: 1
      }
    )

    gsap.fromTo('.hero-subtitle',
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 1.5
      }
    )

    gsap.fromTo('.hero-cta',
      {
        opacity: 0,
        scale: 0.8
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.7)',
        delay: 2
      }
    )

    // Parallax sections
    sectionsRef.current.forEach((section, index) => {
      if (!section) return

      gsap.fromTo(section,
        {
          opacity: 0,
          y: 150,
          rotationX: -30
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Background parallax
      const bg = section.querySelector('.section-bg')
      if (bg) {
        gsap.to(bg, {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      }

      // Text animations
      const title = section.querySelector('.section-title')
      const desc = section.querySelector('.section-desc')
      
      if (title) {
        gsap.fromTo(title,
          {
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }

      if (desc) {
        gsap.fromTo(desc,
          {
            x: index % 2 === 0 ? 100 : -100,
            opacity: 0
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }
    })


  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="relative bg-white dark:bg-black text-gray-900 dark:text-white overflow-x-hidden">
      {/* Hero Section with Three.js */}
      <section className="relative h-screen overflow-hidden">
        <ThreeScene />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
          <h1 className="hero-title text-7xl md:text-9xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            {t.hero.title}
          </h1>
          <p className="hero-subtitle text-2xl md:text-3xl mb-8 text-gray-600 dark:text-gray-300">
            {t.hero.subtitle}
          </p>
          <button className="hero-cta pointer-events-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-2xl hover:shadow-purple-500/50">
            {t.hero.cta}
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-gray-400/50 dark:border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-600 dark:bg-white rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Mystical Energy Section */}
      <section 
        ref={el => { if (el) sectionsRef.current[0] = el }}
        className="relative min-h-screen flex items-center justify-center py-20 px-8"
      >
        <div className="section-bg absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 via-indigo-200/30 to-white dark:from-purple-900/50 dark:via-indigo-900/50 dark:to-black" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="text-8xl mb-8">🔮</div>
          <h2 className="section-title text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-700 dark:from-purple-400 dark:to-pink-600 bg-clip-text text-transparent">
            {t.sections.mystical.title}
          </h2>
          <p className="section-desc text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            {t.sections.mystical.description}
          </p>
        </div>
      </section>

      {/* Living Culture Section */}
      <section 
        ref={el => { if (el) sectionsRef.current[1] = el }}
        className="relative min-h-screen flex items-center justify-center py-20 px-8"
      >
        <div className="section-bg absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-bl from-orange-900/50 via-red-900/50 to-black" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="floating-element inline-block mb-8">
            <div className="text-8xl">🎭</div>
          </div>
          <h2 className="section-title text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
            {t.sections.culture.title}
          </h2>
          <p className="section-desc text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            {t.sections.culture.description}
          </p>
        </div>
      </section>

      {/* Sacred Nature Section */}
      <section 
        ref={el => { if (el) sectionsRef.current[2] = el }}
        className="relative min-h-screen flex items-center justify-center py-20 px-8"
      >
        <div className="section-bg absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-tr from-green-900/50 via-emerald-900/50 to-black" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="floating-element inline-block mb-8">
            <div className="text-8xl">🏔️</div>
          </div>
          <h2 className="section-title text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            {t.sections.nature.title}
          </h2>
          <p className="section-desc text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            {t.sections.nature.description}
          </p>
        </div>
      </section>

      {/* Unique Experiences Section */}
      <section 
        ref={el => { if (el) sectionsRef.current[3] = el }}
        className="relative min-h-screen flex items-center justify-center py-20 px-8"
      >
        <div className="section-bg absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-bl from-blue-900/50 via-cyan-900/50 to-black" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="floating-element inline-block mb-8">
            <div className="text-8xl">✨</div>
          </div>
          <h2 className="section-title text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent">
            {t.sections.experience.title}
          </h2>
          <p className="section-desc text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            {t.sections.experience.description}
          </p>
        </div>
      </section>
    </div>
  )
}