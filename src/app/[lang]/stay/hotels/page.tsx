import { Locale } from '@/lib/i18n'
import HotelsPageClient from '@/components/hotels/HotelsPageClient'

export default async function HotelsPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params

  return <HotelsPageClient locale={lang} />
}