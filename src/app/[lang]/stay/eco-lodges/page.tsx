import { Locale } from '@/lib/i18n'
import EcoLodgesPageClient from '@/components/eco-lodges/EcoLodgesPageClient'

export default async function EcoLodgesPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params

  return <EcoLodgesPageClient locale={lang} />
}