'use client'

import { Locale } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import GlassmorphismCard from '@/components/ui/GlassmorphismCard'
import { Compass, Heart, Sun } from 'lucide-react'

interface ProviderCTASectionProps {
  locale: Locale
}

export default function ProviderCTASection({ locale }: ProviderCTASectionProps) {
  return (
    <div className="mb-16">
      <GlassmorphismCard level="light" className="bg-gradient-to-r from-teal-100/30 to-cyan-100/30 dark:from-teal-400/10 dark:to-cyan-400/10 p-12 max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-6 p-1 bg-white/50 dark:bg-white/10 backdrop-blur-xl rounded-full border border-slate-200 dark:border-white/20">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-3">
                <Sun className="h-8 w-8 text-white" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {locale === 'es'
                ? '¿Ofreces experiencias en Tepoztlán?'
                : 'Do you offer experiences in Tepoztlán?'
              }
            </h2>

            <p className="text-slate-700 dark:text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              {locale === 'es'
                ? 'Únete a nuestra plataforma y comparte tus aventuras únicas con viajeros de todo el mundo. Desde temazcales hasta escaladas, ayudamos a conectar experiencias auténticas con exploradores conscientes.'
                : 'Join our platform and share your unique adventures with travelers from around the world. From temazcals to climbs, we help connect authentic experiences with conscious explorers.'
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
              >
                <Compass className="h-5 w-5 mr-2" />
                {locale === 'es' ? 'Publicar Mi Experiencia' : 'List My Experience'}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="bg-white/70 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 text-slate-900 dark:text-white border-slate-300 dark:border-white/30 backdrop-blur-sm"
              >
                <Heart className="h-5 w-5 mr-2" />
                {locale === 'es' ? 'Más Información' : 'Learn More'}
              </Button>
            </div>
          </div>
        </div>
      </GlassmorphismCard>
    </div>
  )
}