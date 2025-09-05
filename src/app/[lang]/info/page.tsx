import { Locale } from '@/lib/i18n'

interface InformacionPageProps {
  params: Promise<{ lang: string }>
}

export default async function InformacionPage({ params }: InformacionPageProps) {
  const { lang: langParam } = await params
  const lang = langParam as Locale

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        {lang === 'es' ? 'Información de Tepoztlán' : 'Tepoztlán Information'}
      </h1>
      <p className="text-gray-600">
        {lang === 'es'
          ? 'Encuentra toda la información útil sobre Tepoztlán y sus alrededores.'
          : 'Find all useful information about Tepoztlán and its surroundings.'
        }
      </p>
    </div>
  )
}