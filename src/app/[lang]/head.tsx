import { headers } from 'next/headers'
import HreflangTags from '@/components/seo/HreflangTags'
import { Locale } from '@/lib/i18n'

interface HeadProps {
  params: Promise<{ lang: string }>
}

export default async function Head({ params }: HeadProps) {
  const { lang } = await params
  const headersList = headers()
  const pathname = headersList.get('x-pathname') || ''

  return (
    <HreflangTags 
      currentLang={lang as Locale}
      currentPath={pathname}
    />
  )
}