import { Locale } from '@/lib/i18n'
import RestaurantsPageClient from '@/components/restaurants/RestaurantsPageClient'

export default async function RestaurantsPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params

  return <RestaurantsPageClient locale={lang} />
}