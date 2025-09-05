import { Locale } from '@/lib/i18n'
import MapWrapper from '@/components/wrappers/MapWrapper'

interface MapasPageProps {
  params: Promise<{ lang: string }>
}

export default async function MapasPage({ params }: MapasPageProps) {
  const { lang: langParam } = await params
  const lang = langParam as Locale

  return <MapWrapper lang={lang} />
}