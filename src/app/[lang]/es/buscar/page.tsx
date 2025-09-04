import { Suspense } from 'react'
import { Locale } from '@/lib/i18n'
import SearchPageClient from '@/components/search/SearchPageClient'

interface SearchPageProps {
  params: Promise<{ lang: string }>
}

export default async function SearchPage({ params }: SearchPageProps) {
  const { lang } = await params
  const locale = lang as Locale

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-tepoztlan-sunset"></div>
          <p className="mt-4 text-gray-600">
            {locale === 'es' ? 'Cargando búsqueda...' : 'Loading search...'}
          </p>
        </div>
      </div>
    }>
      <SearchPageClient locale={locale} />
    </Suspense>
  )
}