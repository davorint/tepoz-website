'use client'

import { useEffect, useRef, useState } from 'react'
import { Locale } from '@/lib/i18n'

interface PremiumHeroProps {
  lang: Locale
}

export default function PremiumHero({ lang }: PremiumHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Client-side hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  // GSAP animations with proper cleanup
  useEffect(() => {
    if (!isClient) return

    let cleanupFn: (() => void) | null = null

    const initAnimations = async () => {
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        
        gsap.registerPlugin(ScrollTrigger)

        if (!heroRef.current) return

        // Parallax background
        if (bgRef.current) {
          gsap.to(bgRef.current, {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true
            }
          })
        }

        // Title animation
        if (titleRef.current) {
          const spans = titleRef.current.querySelectorAll('span')
          if (spans.length > 0) {
            gsap.set(spans, { y: 100, opacity: 0, rotationX: -90 })
            gsap.to(spans, {
              y: 0,
              opacity: 1,
              rotationX: 0,
              duration: 1.2,
              stagger: 0.1,
              ease: "elastic.out(1, 0.5)",
              delay: 0.3
            })
          }
        }

        // Subtitle animation
        if (textRef.current) {
          gsap.fromTo(textRef.current,
            { y: 50, opacity: 0, filter: "blur(10px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, delay: 1.2, ease: "power3.out" }
          )
        }

        // Orb animations
        const orbs = heroRef.current.querySelectorAll('.orb')
        orbs.forEach((orb, index) => {
          gsap.to(orb, {
            x: "random(-50, 50)",
            y: "random(-50, 50)",
            duration: "random(15, 25)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.5
          })
        })

        cleanupFn = () => {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }

      } catch (error) {
        console.warn('GSAP initialization failed:', error)
        cleanupFn = () => {}
      }
    }

    initAnimations()

    return () => {
      if (cleanupFn) cleanupFn()
    }
  }, [isClient])

  // Mouse tracking
  useEffect(() => {
    if (!isClient) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered || !titleRef.current) return
      
      const rect = titleRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) * 0.15
      const deltaY = (e.clientY - centerY) * 0.15
      
      setMousePosition({ x: deltaX, y: deltaY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isHovered, isClient])

  return (
    <div ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Parallax Background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{ backgroundImage: 'url(/tepoztlan-hero.jpg)' }}
        suppressHydrationWarning
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-purple-950/40 to-black/70" />
      </div>
      
      {/* Premium Animated Background Elements */}
      <div className="absolute inset-0 z-[1]">
        <div className="orb absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-orange-400/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="orb absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl" />
        <div className="orb absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-orange-400/10 rounded-full blur-2xl" />
        <div className="orb absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-green-400/10 to-blue-500/10 rounded-full blur-xl" />
        <div className="orb absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-bl from-yellow-400/10 to-red-500/10 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="max-w-5xl text-center">
          {/* Magnetic hover title */}
          <h1 
            ref={titleRef}
            className="mb-6 text-7xl md:text-9xl lg:text-[10rem] font-bebas tracking-wider cursor-pointer perspective-1000"
            style={{
              transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) rotateX(${-mousePosition.y * 0.05}deg) rotateY(${mousePosition.x * 0.05}deg)`,
              transition: isHovered ? 'none' : 'transform 0.3s ease-out'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false)
              setMousePosition({ x: 0, y: 0 })
            }}
            suppressHydrationWarning
          >
            <span className="inline-block text-blue-600 hover:text-blue-500 transition-colors">TO</span>
            <span className="inline-block text-sky-500 hover:text-sky-400 transition-colors">DO</span>
            <span className="inline-block text-tepoztlan-sunset hover:text-orange-400 transition-colors">TEPOZ</span>
          </h1>
          
          {/* Animated subtitle */}
          <p ref={textRef} className="mx-auto max-w-2xl text-lg md:text-xl lg:text-2xl text-white mb-8 font-montserrat font-light">
            {lang === 'es' 
              ? 'Tu directorio completo: Restaurantes • Hospedajes • Bares • Tours • Experiencias'
              : 'Your complete directory: Restaurants • Stays • Bars • Tours • Experiences'
            }
          </p>
          
          {/* Interactive CTA */}
          <div className="mt-12">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-tepoztlan-sunset to-orange-500 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105">
              <span className="relative z-10">
                {lang === 'es' ? 'Explorar Directorio' : 'Explore Directory'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 bg-white/20 transition-transform duration-500 origin-left" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer group">
          <span className="text-sm mb-2 font-medium font-montserrat group-hover:scale-110 transition-transform">
            {lang === 'es' ? 'Descubre' : 'Discover'}
          </span>
          <div className="w-6 h-10 border-2 border-gray-300/70 rounded-full flex justify-center group-hover:border-white transition-colors duration-300">
            <div className="w-1 h-3 bg-gradient-to-b from-orange-400 to-purple-500 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  )
}