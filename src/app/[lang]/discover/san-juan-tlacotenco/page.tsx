import { Locale } from '@/lib/i18n'
import SanJuanPageClient from '@/components/discover/SanJuanPageClient'

export default async function SanJuanTlacotencoPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params

  return <SanJuanPageClient locale={lang} />
}