import { Locale } from '@/lib/i18n'
import TepoztlanOverviewClient from '@/components/discover/TepoztlanOverviewClient'

export default async function TepoztlanOverviewPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params

  return <TepoztlanOverviewClient locale={lang} />
}