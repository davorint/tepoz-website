import { Locale } from '@/lib/i18n'
import { sectionRegistry } from '@/lib/section-registry'
import SectionOrchestrator from '@/components/layout/SectionOrchestrator'

export default async function HomePage({
  params
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params

  // Get homepage sections configuration
  const sections = sectionRegistry.homepage

  return (
    <main className="min-h-screen overflow-x-hidden">
      <SectionOrchestrator
        sections={sections}
        commonProps={{ lang }}
      />
    </main>
  )
}