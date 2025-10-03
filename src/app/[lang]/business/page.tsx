import { Locale } from '@/lib/i18n'
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from '@/components/ui/empty'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface NegociosPageProps {
  params: Promise<{ lang: string }>
}

export default async function NegociosPage({ params }: NegociosPageProps) {
  const { lang: langParam } = await params
  const lang = langParam as Locale

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse animation-delay-2s" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24">
        <Empty>
          <EmptyHeader>
            <EmptyMedia>
              <div className="text-8xl opacity-50">🏢</div>
            </EmptyMedia>
            <EmptyTitle className="text-4xl font-bold text-white font-sans">
              {lang === 'es' ? 'Registro de Negocios Próximamente' : 'Business Registration Coming Soon'}
            </EmptyTitle>
            <EmptyDescription className="text-white/70 text-lg max-w-2xl">
              {lang === 'es'
                ? 'Estamos preparando un portal para que los negocios locales se registren y formen parte del directorio de Tepoztlán. Mientras tanto, contáctanos directamente.'
                : 'We are preparing a portal for local businesses to register and become part of the Tepoztlán directory. In the meantime, contact us directly.'
              }
            </EmptyDescription>
            <div className="flex gap-4 mt-6">
              <Link href={`/${lang}/info/contact`}>
                <Button className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white hover:from-blue-500 hover:to-cyan-500">
                  {lang === 'es' ? 'Contáctanos' : 'Contact Us'}
                </Button>
              </Link>
              <Link href={`/${lang}/search`}>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  {lang === 'es' ? 'Ver Negocios' : 'View Businesses'}
                </Button>
              </Link>
            </div>
          </EmptyHeader>
        </Empty>
      </div>
    </div>
  )
}