'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import { Locale } from '@/lib/i18n'
import { Translations } from '@/types/translations'
import { Play, MapPin, Calendar, Users } from 'lucide-react'
import { useState, useEffect } from 'react'

interface HeroSectionProps {
  lang: Locale
  translations: Translations
}

export default function HeroSection({ lang, translations }: HeroSectionProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section className="relative h-screen h-[100dvh] overflow-hidden" suppressHydrationWarning>
      {/* Video Background */}
      <div className="absolute inset-0" suppressHydrationWarning>
        {isClient && isVideoPlaying ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            aria-label={lang === 'es' ? 'Video de fondo de Tepoztlán' : 'Tepoztlán background video'}
          >
            <source src="/videos/tepoztlan-hero.mp4" type="video/mp4" />
          </video>
        ) : (
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            role="img"
            aria-label={lang === 'es' ? 'Vista panorámica de Tepoztlán, Pueblo Mágico de México' : 'Panoramic view of Tepoztlán, Magical Town of Mexico'}
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
            }}
          />
        )}
      </div>

      {/* Gradient Overlay - Much stronger for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      
      {/* Parallax Background Elements */}
      <motion.div
        className="absolute inset-0"
        initial={{ y: 0 }}
        animate={{ y: -20 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/30 rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-white/10 rounded-full" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          {/* Subtitle Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 mb-8 text-white shadow-2xl"
          >
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-semibold drop-shadow-lg">Pueblo Mágico · Morelos, México</span>
          </motion.div>

          {/* Main Title with Better Contrast */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-white drop-shadow-2xl"
            style={{ textShadow: '0 4px 8px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {translations.home.hero.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto font-medium leading-relaxed text-white drop-shadow-xl"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {translations.home.hero.subtitle}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-tepoztlan-sunset hover:bg-tepoztlan-sunset/90 text-white border-0"
            >
              {translations.home.hero.cta}
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20"
              onClick={() => setIsVideoPlaying(!isVideoPlaying)}
            >
              <Play className="w-5 h-5 mr-2" />
              {lang === 'es' ? 'Ver Video' : 'Watch Video'}
            </Button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
              <Calendar className="w-6 h-6 mx-auto mb-2 text-tepoztlan-sunset" />
              <div className="text-2xl font-bold">365</div>
              <div className="text-sm opacity-90">{lang === 'es' ? 'Días al año' : 'Days a year'}</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
              <MapPin className="w-6 h-6 mx-auto mb-2 text-tepoztlan-sunset" />
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm opacity-90">{lang === 'es' ? 'Atracciones' : 'Attractions'}</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
              <Users className="w-6 h-6 mx-auto mb-2 text-tepoztlan-sunset" />
              <div className="text-2xl font-bold">1M+</div>
              <div className="text-sm opacity-90">{lang === 'es' ? 'Visitantes' : 'Visitors'}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}