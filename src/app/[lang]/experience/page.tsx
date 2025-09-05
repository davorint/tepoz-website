import { Locale } from '@/lib/i18n'

interface ExperienciasPageProps {
  params: Promise<{ lang: string }>
}

export default async function ExperienciasPage({ params }: ExperienciasPageProps) {
  const { lang: langParam } = await params
  const lang = langParam as Locale

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        {lang === 'es' ? 'Experiencias en Tepoztlán' : 'Experiences in Tepoztlán'}
      </h1>
      <p className="text-gray-600">
        {lang === 'es'
          ? 'Vive experiencias únicas e inolvidables en el mágico pueblo de Tepoztlán.'
          : 'Live unique and unforgettable experiences in the magical town of Tepoztlán.'
        }
      </p>
    </div>
  )
}