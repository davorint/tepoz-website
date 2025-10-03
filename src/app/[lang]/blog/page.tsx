import { Locale } from '@/lib/i18n'
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from '@/components/ui/empty'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface BlogPageProps {
  params: Promise<{ lang: string }>
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { lang: langParam } = await params
  const lang = langParam as Locale

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-2s" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24">
        <Empty>
          <EmptyHeader>
            <EmptyMedia>
              <div className="text-8xl opacity-50">📝</div>
            </EmptyMedia>
            <EmptyTitle className="text-4xl font-bold text-white font-sans">
              {lang === 'es' ? 'Blog Próximamente' : 'Blog Coming Soon'}
            </EmptyTitle>
            <EmptyDescription className="text-white/70 text-lg max-w-2xl">
              {lang === 'es'
                ? 'Estamos trabajando en traerte historias, guías y consejos sobre el Pueblo Mágico de Tepoztlán. Mientras tanto, explora nuestras otras secciones.'
                : 'We are working on bringing you stories, guides and tips about the Magical Town of Tepoztlán. In the meantime, explore our other sections.'
              }
            </EmptyDescription>
            <div className="flex gap-4 mt-6">
              <Link href={`/${lang}/discover/tepoztlan`}>
                <Button className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white hover:from-cyan-500 hover:to-blue-500">
                  {lang === 'es' ? 'Descubre Tepoztlán' : 'Discover Tepoztlán'}
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