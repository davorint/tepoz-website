'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Locale } from '@/lib/i18n'
import ClientOnly from '@/components/ui/client-only'

// Dynamic import for ScrollTrigger
let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger | null = null

interface ScrollRevealCardsProps {
  lang: Locale
}

const directoryItems = [
  {
    id: 1,
    titleEs: 'Restaurantes',
    titleEn: 'Restaurants',
    descEs: 'Cocina tradicional mexicana y fusión internacional',
    descEn: 'Traditional Mexican cuisine and international fusion',
    icon: '🍽️',
    count: '150+',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 2,
    titleEs: 'Hospedajes',
    titleEn: 'Stays',
    descEs: 'Hoteles boutique, cabañas y eco-lodges',
    descEn: 'Boutique hotels, cabins and eco-lodges',
    icon: '🏨',
    count: '80+',
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 3,
    titleEs: 'Bares & Cantinas',
    titleEn: 'Bars & Cantinas',
    descEs: 'Mezcal, pulque y cocteles artesanales',
    descEn: 'Mezcal, pulque and craft cocktails',
    icon: '🍹',
    count: '45+',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 4,
    titleEs: 'Senderismo',
    titleEn: 'Hiking',
    descEs: 'Rutas al Tepozteco y senderos naturales',
    descEn: 'Routes to Tepozteco and nature trails',
    icon: '🥾',
    count: '12',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 5,
    titleEs: 'Tours',
    titleEn: 'Tours',
    descEs: 'Experiencias guiadas y actividades culturales',
    descEn: 'Guided experiences and cultural activities',
    icon: '🗺️',
    count: '30+',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 6,
    titleEs: 'Mercados',
    titleEn: 'Markets',
    descEs: 'Artesanías locales y productos orgánicos',
    descEn: 'Local crafts and organic products',
    icon: '🛍️',
    count: '5',
    color: 'from-pink-500 to-rose-500'
  }
]

export default function ScrollRevealCards({ lang }: ScrollRevealCardsProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [gsapLoaded, setGsapLoaded] = useState(false)

  // Initialize GSAP ScrollTrigger
  useEffect(() => {
    const initGSAP = async () => {
      if (typeof window !== 'undefined') {
        try {
          const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger')
          ScrollTrigger = ST
          gsap.registerPlugin(ScrollTrigger)
          setGsapLoaded(true)
        } catch (error) {
          console.warn('GSAP ScrollTrigger initialization error:', error)
        }
      }
    }
    initGSAP()
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !gsapLoaded || !ScrollTrigger) return

    // Staggered card reveal on scroll
    cardsRef.current.forEach((card, index) => {
      if (!card) return

      // Initial state
      gsap.set(card, {
        y: 100,
        opacity: 0,
        rotationY: -30,
        transformPerspective: 1000
      })

      // Scroll-triggered animation
      if (ScrollTrigger) {
        ScrollTrigger.create({
        trigger: card,
        start: "top bottom-=100",
        onEnter: () => {
          gsap.to(card, {
            y: 0,
            opacity: 1,
            rotationY: 0,
            duration: 1,
            delay: index * 0.1,
            ease: "power3.out"
          })
        },
        once: true
        })
      }

      // 3D tilt effect on hover
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          rotationY: 0,
          rotationX: 0,
          duration: 0.3,
          ease: "power2.out"
        })
      })

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        
        const rotateX = ((y - centerY) / centerY) * -10
        const rotateY = ((x - centerX) / centerX) * 10

        gsap.to(card, {
          rotationY: rotateY,
          rotationX: rotateX,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
          transformOrigin: "center"
        })
      })
    })

    // Animated counter for statistics
    const counters = sectionRef.current.querySelectorAll('.counter')
    counters.forEach(counter => {
      const endValue = parseInt(counter.textContent || '0')
      
      if (ScrollTrigger) {
        ScrollTrigger.create({
        trigger: counter,
        start: "top bottom-=50",
        onEnter: () => {
          gsap.fromTo(counter,
            { textContent: 0 },
            {
              textContent: endValue,
              duration: 2,
              ease: "power1.inOut",
              snap: { textContent: 1 },
              onUpdate: function() {
                counter.textContent = Math.ceil(this.targets()[0].textContent).toString()
              }
            }
          )
        },
        once: true
        })
      }
    })

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }
  }, [gsapLoaded])

  return (
    <ClientOnly fallback={
      <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-playfair">
            {lang === 'es' ? 'Explora Nuestro Directorio' : 'Explore Our Directory'}
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 font-montserrat">
            {lang === 'es' 
              ? 'Todo lo que Tepoztlán tiene para ofrecerte en un solo lugar'
              : 'Everything Tepoztlán has to offer in one place'
            }
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {directoryItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${item.color}`} />
                <div className="p-8">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-2 font-playfair">
                    {lang === 'es' ? item.titleEs : item.titleEn}
                  </h3>
                  <p className="text-gray-600 mb-4 font-montserrat">
                    {lang === 'es' ? item.descEs : item.descEn}
                  </p>
                  <div className="text-3xl font-bold text-gray-900">
                    {item.count}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    }>
      <section ref={sectionRef} className="py-24 px-4 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-100 via-transparent to-purple-100 animate-gradient-shift" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section header with fade-in animation */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-playfair bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {lang === 'es' ? 'Explora Nuestro Directorio' : 'Explore Our Directory'}
            </h2>
            <p className="text-xl text-gray-600 font-montserrat">
              {lang === 'es' 
                ? 'Todo lo que Tepoztlán tiene para ofrecerte en un solo lugar'
                : 'Everything Tepoztlán has to offer in one place'
              }
            </p>
          </div>

          {/* Directory cards with 3D effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {directoryItems.map((item, index) => (
              <div
                key={item.id}
                ref={el => {cardsRef.current[index] = el}}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform-gpu"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Gradient accent bar */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color} group-hover:h-2 transition-all duration-300`} />
                
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative p-8">
                  {/* Icon with bounce animation */}
                  <div className="text-5xl mb-4 group-hover:animate-bounce">{item.icon}</div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-2 font-playfair text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-orange-500 group-hover:to-purple-500 transition-all duration-300">
                    {lang === 'es' ? item.titleEs : item.titleEn}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 mb-4 font-montserrat text-sm">
                    {lang === 'es' ? item.descEs : item.descEn}
                  </p>
                  
                  {/* Animated counter */}
                  <div className="flex items-baseline space-x-1">
                    <span className="counter text-3xl font-bold text-gray-900">{parseInt(item.count).toString()}</span>
                    {item.count.includes('+') && <span className="text-2xl font-bold text-gray-900">+</span>}
                    <span className="text-sm text-gray-500 font-montserrat">
                      {lang === 'es' ? 'lugares' : 'places'}
                    </span>
                  </div>
                  
                  {/* Hover action indicator */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                      →
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ClientOnly>
  )
}