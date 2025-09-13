import { Locale } from '@/lib/i18n'
import FloatingStatsSection from '@/components/sections/FloatingStatsSection'
import InteractiveCTASection from '@/components/sections/InteractiveCTASection'
import PremiumTestimonialsSection from '@/components/sections/PremiumTestimonialsSection'
import PremiumHero from '@/components/sections/PremiumHero'
import ScrollRevealCards from '@/components/sections/ScrollRevealCards'
import PremiumCTA from '@/components/sections/PremiumCTA'
import ShaderSection from '@/components/sections/ShaderSection'

export default async function HomePage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params
  

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Premium Hero Section with Parallax and Magnetic Effects */}
      <PremiumHero lang={lang} />
      
      {/* Directory Cards with Scroll Animations and 3D Effects */}
      <ScrollRevealCards lang={lang} />
      
      {/* Interactive Color Palette Shader Section */}
      <ShaderSection />
      
      {/* Premium CTA Section with Liquid Buttons */}
      <PremiumCTA lang={lang} />
      
      <FloatingStatsSection lang={lang} />
      <InteractiveCTASection lang={lang} />
      <PremiumTestimonialsSection lang={lang} />
    </main>
  )
}