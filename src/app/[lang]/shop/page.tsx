import { Locale } from '@/lib/i18n'

interface ComprasPageProps {
  params: Promise<{ lang: string }>
}

export default async function ComprasPage({ params }: ComprasPageProps) {
  const { lang: langParam } = await params
  const lang = langParam as Locale

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        {lang === 'es' ? 'Compras en Tepoztlán' : 'Shopping in Tepoztlán'}
      </h1>
      <p className="text-gray-600">
        {lang === 'es'
          ? 'Descubre las mejores opciones para comprar artesanías, souvenirs y productos locales.'
          : 'Discover the best options to buy handicrafts, souvenirs and local products.'
        }
      </p>
    </div>
  )
}