import { Locale } from '@/lib/i18n'
import CafesPageClient from '@/components/cafes/CafesPageClient'

export default async function CafesPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params

  return <CafesPageClient locale={lang} />
}