import { Locale } from '@/lib/i18n'
import TepoztlanHistoryClient from '@/components/discover/TepoztlanHistoryClient'

export default async function TepoztlanHistoryPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params

  return <TepoztlanHistoryClient locale={lang} />
}