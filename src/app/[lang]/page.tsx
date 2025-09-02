import { Locale, getTranslation } from '@/lib/i18n'
import HeroSection from '@/components/sections/HeroSection'
import PopularSections from '@/components/sections/PopularSections'
import FloatingStatsSection from '@/components/sections/FloatingStatsSection'
import InteractiveCTASection from '@/components/sections/InteractiveCTASection'
import SimpleTestimonialsSection from '@/components/sections/SimpleTestimonialsSection'

export default async function HomePage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params
  const t = getTranslation(lang)

  return (
    <main className="min-h-screen">
      <HeroSection lang={lang} translations={t} />
      <PopularSections lang={lang} translations={t} />
      <FloatingStatsSection lang={lang} />
      <InteractiveCTASection lang={lang} />
      <SimpleTestimonialsSection lang={lang} />
    </main>
  )
}