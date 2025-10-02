import { notFound } from 'next/navigation'
import { Locale } from '@/lib/i18n'
import UltraPremiumLanding from './UltraPremiumLanding'

interface Landing2PageProps {
  params: Promise<{ lang: string }>
}

export default async function Landing2Page({ params }: Landing2PageProps) {
  // Disable in production
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }

  const { lang: langParam } = await params
  const lang = langParam as Locale

  return <UltraPremiumLanding lang={lang} />
}