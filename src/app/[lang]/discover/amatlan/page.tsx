import { Locale } from '@/lib/i18n'
import AmatlanPageClient from '@/components/discover/AmatlanPageClient'

export default async function AmatlanPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params

  return <AmatlanPageClient locale={lang} />
}