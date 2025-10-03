import { Locale } from '@/lib/i18n'
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from '@/components/ui/empty'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ServiciosPageProps {
  params: Promise<{ lang: string }>
}

export default async function ServiciosPage({ params }: ServiciosPageProps) {
  const { lang: langParam } = await params
  const lang = langParam as Locale

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse animation-delay-2s" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24">
        <Empty>
          <EmptyHeader>
            <EmptyMedia>
              <div className="text-8xl opacity-50">🔧</div>
            </EmptyMedia>
            <EmptyTitle className="text-4xl font-bold text-white font-sans">
              {lang === 'es' ? 'Servicios Próximamente' : 'Services Coming Soon'}
            </EmptyTitle>
            <EmptyDescription className="text-white/70 text-lg max-w-2xl">
              {lang === 'es'
                ? 'Estamos compilando un directorio de servicios esenciales como transporte, médicos, bancos y más. Mientras tanto, consulta nuestra guía de viaje.'
                : 'We are compiling a directory of essential services like transportation, medical, banks and more. In the meantime, check out our travel guide.'
              }
            </EmptyDescription>
            <div className="flex gap-4 mt-6">
              <Link href={`/${lang}/info/travel-info`}>
                <Button className="bg-gradient-to-r from-orange-400 to-red-400 text-white hover:from-orange-500 hover:to-red-500">
                  {lang === 'es' ? 'Información de Viaje' : 'Travel Information'}
                </Button>
              </Link>
              <Link href={`/${lang}/info/contact`}>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  {lang === 'es' ? 'Contacto' : 'Contact'}
                </Button>
              </Link>
            </div>
          </EmptyHeader>
        </Empty>
      </div>
    </div>
  )
}