'use client'

import { Locale } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import GlassmorphismCard from '@/components/ui/GlassmorphismCard'
import { Compass } from 'lucide-react'

interface NewsletterSectionProps {
  locale: Locale
}

export default function NewsletterSection({ locale }: NewsletterSectionProps) {
  return (
    <div className="text-center">
      <GlassmorphismCard level="heavy" className="p-8 max-w-2xl mx-auto">
        <div className="space-y-4">
          <Compass className="h-12 w-12 mx-auto text-teal-600 dark:text-teal-400 mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {locale === 'es'
              ? 'Descubre Nuevas Aventuras'
              : 'Discover New Adventures'
            }
          </h2>
          <p className="text-slate-700 dark:text-white/70 max-w-lg mx-auto">
            {locale === 'es'
              ? 'Suscríbete y recibe las mejores experiencias, aventuras espirituales y retiros de bienestar en Tepoztlán.'
              : 'Subscribe and receive the best experiences, spiritual adventures and wellness retreats in Tepoztlán.'
            }
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <Input
              placeholder={locale === 'es' ? 'Tu email' : 'Your email'}
              className="bg-white/80 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-white/50"
            />
            <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white">
              {locale === 'es' ? 'Suscribirse' : 'Subscribe'}
            </Button>
          </div>
        </div>
      </GlassmorphismCard>
    </div>
  )
}