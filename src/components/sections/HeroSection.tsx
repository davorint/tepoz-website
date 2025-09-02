'use client'

import { Button } from '@/components/ui/button'
import { Locale } from '@/lib/i18n'

interface HeroSectionProps {
  lang: Locale
  translations: any
}

export default function HeroSection({ lang, translations }: HeroSectionProps) {
  return (
    <section className="hero-section">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" />
      <div className="relative z-10 section-container text-center text-white">
        <h1 className="mb-6 animate-fade-in">
          {translations.home.hero.title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-in-up">
          {translations.home.hero.subtitle}
        </p>
        <Button 
          size="lg" 
          className="btn-primary text-lg px-8 py-6 animate-slide-in-up"
        >
          {translations.home.hero.cta}
        </Button>
      </div>
    </section>
  )
}