import { Locale } from '@/lib/i18n'
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from '@/components/ui/empty'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface PlanificarPageProps {
  params: Promise<{ lang: string }>
}

export default async function PlanificarPage({ params }: PlanificarPageProps) {
  const { lang: langParam } = await params
  const lang = langParam as Locale

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse animation-delay-2s" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24">
        <Empty>
          <EmptyHeader>
            <EmptyMedia>
              <div className="text-8xl opacity-50">📅</div>
            </EmptyMedia>
            <EmptyTitle className="text-4xl font-bold text-white font-sans">
              {lang === 'es' ? 'Planificador Próximamente' : 'Trip Planner Coming Soon'}
            </EmptyTitle>
            <EmptyDescription className="text-white/70 text-lg max-w-2xl">
              {lang === 'es'
                ? 'Estamos desarrollando un planificador de viaje interactivo para ayudarte a crear tu itinerario perfecto. Mientras tanto, explora nuestras experiencias y eventos.'
                : 'We are developing an interactive trip planner to help you create your perfect itinerary. In the meantime, explore our experiences and events.'
              }
            </EmptyDescription>
            <div className="flex gap-4 mt-6">
              <Link href={`/${lang}/experience`}>
                <Button className="bg-gradient-to-r from-indigo-400 to-violet-400 text-white hover:from-indigo-500 hover:to-violet-500">
                  {lang === 'es' ? 'Ver Experiencias' : 'View Experiences'}
                </Button>
              </Link>
              <Link href={`/${lang}/events`}>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  {lang === 'es' ? 'Ver Eventos' : 'View Events'}
                </Button>
              </Link>
            </div>
          </EmptyHeader>
        </Empty>
      </div>
    </div>
  )
}