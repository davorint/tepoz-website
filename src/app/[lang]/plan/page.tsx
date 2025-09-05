import { Locale } from '@/lib/i18n'

interface PlanificarPageProps {
  params: Promise<{ lang: string }>
}

export default async function PlanificarPage({ params }: PlanificarPageProps) {
  const { lang: langParam } = await params
  const lang = langParam as Locale

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        {lang === 'es' ? 'Planifica tu Visita' : 'Plan Your Visit'}
      </h1>
      <p className="text-gray-600">
        {lang === 'es'
          ? 'Crea tu itinerario perfecto y organiza tu viaje a Tepoztlán.'
          : 'Create your perfect itinerary and organize your trip to Tepoztlán.'
        }
      </p>
    </div>
  )
}