import { Locale } from '@/lib/i18n'
import CentroNeighborhoodClient from '@/components/discover/CentroNeighborhoodClient'

export default async function CentroNeighborhoodPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params

  return <CentroNeighborhoodClient locale={lang} />
}