import { Locale } from '@/lib/i18n'
import SearchPageClient from '@/components/search/SearchPageClient'

interface SearchPageProps {
  params: Promise<{ lang: string }>
}

export default async function SearchPage({ params }: SearchPageProps) {
  const { lang } = await params
  const locale = lang as Locale

  return <SearchPageClient locale={locale} />
}