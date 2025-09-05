import { Locale } from '@/lib/i18n'
import RentalsPageClient from '@/components/rentals/RentalsPageClient'

export default async function RentalsPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params

  return <RentalsPageClient locale={lang} />
}