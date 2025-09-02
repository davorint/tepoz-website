import { Locale, getTranslation } from '@/lib/i18n'

interface PageProps {
  params: Promise<{ lang: string }>
}

export default async function HotelsPage({ params }: PageProps) {
  const { lang } = await params
  const translations = getTranslation(lang as Locale)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{translations.stay.categories.hotels}</h1>
      <p className="text-muted-foreground">Hotels in Tepoztlán - Coming soon</p>
    </div>
  )
}