import { Locale, getTranslation } from '@/lib/i18n'

interface PageProps {
  params: Promise<{ lang: string }>
}

export default async function RestaurantsPage({ params }: PageProps) {
  const { lang } = await params
  const translations = getTranslation(lang as Locale)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{translations.eat.categories.restaurants}</h1>
      <p className="text-muted-foreground">Restaurants in Tepoztlán - Coming soon</p>
    </div>
  )
}