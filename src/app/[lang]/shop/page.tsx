import { Locale } from '@/lib/i18n'
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from '@/components/ui/empty'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ComprasPageProps {
  params: Promise<{ lang: string }>
}

export default async function ComprasPage({ params }: ComprasPageProps) {
  const { lang: langParam } = await params
  const lang = langParam as Locale

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse animation-delay-2s" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24">
        <Empty>
          <EmptyHeader>
            <EmptyMedia>
              <div className="text-8xl opacity-50">🛍️</div>
            </EmptyMedia>
            <EmptyTitle className="text-4xl font-bold text-white font-sans">
              {lang === 'es' ? 'Tienda Próximamente' : 'Shop Coming Soon'}
            </EmptyTitle>
            <EmptyDescription className="text-white/70 text-lg max-w-2xl">
              {lang === 'es'
                ? 'Estamos preparando un directorio completo de tiendas de artesanías, souvenirs y productos locales. Mientras tanto, visita el mercado de artesanías en el centro.'
                : 'We are preparing a complete directory of craft shops, souvenirs and local products. In the meantime, visit the craft market in the center.'
              }
            </EmptyDescription>
            <div className="flex gap-4 mt-6">
              <Link href={`/${lang}/discover/tepoztlan/neighborhoods/centro`}>
                <Button className="bg-gradient-to-r from-green-400 to-emerald-400 text-white hover:from-green-500 hover:to-emerald-500">
                  {lang === 'es' ? 'Ver Centro' : 'View Centro'}
                </Button>
              </Link>
              <Link href={`/${lang}/search`}>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  {lang === 'es' ? 'Buscar' : 'Search'}
                </Button>
              </Link>
            </div>
          </EmptyHeader>
        </Empty>
      </div>
    </div>
  )
}