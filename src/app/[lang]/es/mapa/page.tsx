import { Locale } from '@/lib/i18n'
import MapPageClient from '@/components/map/MapPageClient'

export default async function MapPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params

  return <MapPageClient locale={lang} />
}