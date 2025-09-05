import { Locale } from '@/lib/i18n'

interface ComerPageProps {
  params: Promise<{ lang: string }>
}

export default async function ComerPage({ params }: ComerPageProps) {
  const { lang: langParam } = await params
  const lang = langParam as Locale

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        {lang === 'es' ? 'Dónde Comer en Tepoztlán' : 'Where to Eat in Tepoztlán'}
      </h1>
      <p className="text-gray-600">
        {lang === 'es'
          ? 'Descubre los mejores restaurantes y la deliciosa gastronomía local de Tepoztlán.'
          : 'Discover the best restaurants and delicious local cuisine of Tepoztlán.'
        }
      </p>
    </div>
  )
}