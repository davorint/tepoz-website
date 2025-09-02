'use client'

import { useState, useEffect } from 'react'

// Placeholder for the 3D scene - will be loaded dynamically
function Scene3DPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-32 h-32 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full opacity-20 blur-xl" />
      </div>
    </div>
  )
}

interface Hero3DProps {
  lang: 'es' | 'en'
}

export default function Hero3D({ lang }: Hero3DProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)
  const [Scene3D, setScene3D] = useState<React.ComponentType | null>(null)
  const [useOptimized, setUseOptimized] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Check device capabilities and user preferences
    const checkOptimization = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
      const isMobile = window.innerWidth < 768
      
      setUseOptimized(prefersReducedMotion || isLowEndDevice || isMobile)
    }
    
    checkOptimization()
    
    // Dynamically import the appropriate 3D scene based on device capabilities
    const loadScene = async () => {
      try {
        if (useOptimized) {
          // Load optimized version for low-end devices
          const { default: OptimizedScene3D } = await import('@/components/3d/OptimizedScene3D')
          setScene3D(() => OptimizedScene3D)
          return
        }

        // Load full version for high-end devices
        const { default: FullScene3D } = await import('@/components/3d/Scene3D')
        setScene3D(() => FullScene3D)
      } catch (error) {
        console.error('Failed to load 3D scene:', error)
      }
    }

    loadScene()
  }, [useOptimized])

  // Apply mouse transform after hydration
  useEffect(() => {
    if (isClient) {
      const heroContent = document.querySelector('.hero-content') as HTMLElement
      if (heroContent) {
        heroContent.style.transform = `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
      }
    }
  }, [mousePosition, isClient])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isClient) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePosition({ x, y })
  }

  return (
    <div 
      className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-black via-purple-950/20 to-black"
      onMouseMove={handleMouseMove}
      suppressHydrationWarning
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        {Scene3D ? <Scene3D /> : <Scene3DPlaceholder />}
      </div>
      
      {/* Enhanced Gradient Overlays for Better Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      
      {/* Overlay Content with Parallax */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div 
          className="hero-content max-w-5xl text-center animate-in fade-in slide-in-from-bottom-10 duration-1000 transition-transform duration-300 ease-out"
          suppressHydrationWarning
        >
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full border border-white/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-sm font-medium text-white text-shadow-sm">
              {lang === 'es' ? 'Experiencia Premium' : 'Premium Experience'}
            </span>
          </div>
          
          <h1 className="mb-6 text-6xl md:text-8xl lg:text-9xl font-bold">
            <span className="bg-gradient-to-r from-orange-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient bg-300%">
              Tepoztlán
            </span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 [animation-delay:300ms] text-shadow-md">
            {lang === 'es' 
              ? 'Un portal hacia experiencias místicas y transformadoras'
              : 'A gateway to mystical and transformative experiences'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-10 duration-1000 [animation-delay:600ms]" suppressHydrationWarning>
            <button className="group relative px-10 py-5 overflow-hidden rounded-full font-semibold transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500 animate-gradient bg-300%" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient bg-300%" />
              <span className="relative z-10 text-white">
                {lang === 'es' ? 'Comenzar Aventura' : 'Start Adventure'}
              </span>
            </button>
            
            <button className="group px-10 py-5 backdrop-blur-md bg-white/15 border border-white/30 text-white font-semibold rounded-full transition-all duration-500 hover:scale-105 hover:bg-white/25 hover:border-white/50 hover:shadow-lg hover:shadow-purple-500/20">
              <span className="group-hover:text-white transition-colors">
                {lang === 'es' ? 'Explorar Mapa 3D' : 'Explore 3D Map'}
              </span>
            </button>
          </div>
          
          {/* Animated Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-gray-200 uppercase tracking-widest">
                {lang === 'es' ? 'Desliza' : 'Scroll'}
              </span>
              <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center">
                <div className="w-1 h-2 bg-white/80 rounded-full mt-2 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Premium Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-purple-500/20 via-transparent to-transparent animate-pulse-slow" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-orange-500/20 via-transparent to-transparent animate-pulse-slow animation-delay-2000" />
      </div>
    </div>
  )
}