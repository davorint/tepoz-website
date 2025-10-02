import { Locale } from '@/lib/i18n'
import MapPageClient from '@/components/map/MapPageClient'

interface MapasPageProps {
  params: Promise<{ lang: string }>
}

export default async function MapasPage({ params }: MapasPageProps) {
  const { lang: langParam } = await params
  const lang = langParam as Locale

  return <MapPageClient lang={lang} />
}