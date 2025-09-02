import { Locale, getTranslation } from '@/lib/i18n'
import Hero3D from '@/components/sections/Hero3D'
import PremiumPopularSections from '@/components/sections/PremiumPopularSections'
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
    <main className="min-h-screen overflow-x-hidden">
      <Hero3D lang={lang} />
      <PremiumPopularSections lang={lang} translations={t} />
      <FloatingStatsSection lang={lang} />
      <InteractiveCTASection lang={lang} />
      <SimpleTestimonialsSection lang={lang} />
    </main>
  )
}