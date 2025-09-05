import { Locale } from '@/lib/i18n'
import TepoztecoPyramidClient from '@/components/experience/TepoztecoPyramidClient'

export default async function TepoztecoPyramidPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params

  return <TepoztecoPyramidClient locale={lang} />
}