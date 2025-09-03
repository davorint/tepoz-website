import { Locale } from '@/lib/i18n'
import FloatingStatsSection from '@/components/sections/FloatingStatsSection'
import InteractiveCTASection from '@/components/sections/InteractiveCTASection'
import SimpleTestimonialsSection from '@/components/sections/SimpleTestimonialsSection'
import PremiumHero from '@/components/sections/PremiumHero'
import ScrollRevealCards from '@/components/sections/ScrollRevealCards'
import PremiumCTA from '@/components/sections/PremiumCTA'

export default async function HomePage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params
  
  // Debug log
  console.log('HomePage received lang parameter:', lang)

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Premium Hero Section with Parallax and Magnetic Effects */}
      <PremiumHero lang={lang} />
      {/* Directory Cards with Scroll Animations and 3D Effects */}
      <ScrollRevealCards lang={lang} />
      
      {/* Premium CTA Section with Liquid Buttons */}
      <PremiumCTA lang={lang} />
      <FloatingStatsSection lang={lang} />
      <InteractiveCTASection lang={lang} />
      <SimpleTestimonialsSection lang={lang} />
    </main>
  )
}