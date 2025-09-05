import { Locale } from '@/lib/i18n'

interface ComunidadPageProps {
  params: Promise<{ lang: string }>
}

export default async function ComunidadPage({ params }: ComunidadPageProps) {
  const { lang: langParam } = await params
  const lang = langParam as Locale

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        {lang === 'es' ? 'Comunidad de Tepoztlán' : 'Tepoztlán Community'}
      </h1>
      <p className="text-gray-600">
        {lang === 'es'
          ? 'Conecta con otros viajeros y comparte tus experiencias en Tepoztlán.'
          : 'Connect with other travelers and share your experiences in Tepoztlán.'
        }
      </p>
    </div>
  )
}