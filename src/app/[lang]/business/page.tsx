import { Locale } from '@/lib/i18n'

interface NegociosPageProps {
  params: Promise<{ lang: string }>
}

export default async function NegociosPage({ params }: NegociosPageProps) {
  const { lang: langParam } = await params
  const lang = langParam as Locale

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        {lang === 'es' ? 'Negocios en Tepoztlán' : 'Business in Tepoztlán'}
      </h1>
      <p className="text-gray-600">
        {lang === 'es'
          ? 'Registra tu negocio y forma parte del directorio de Tepoztlán.'
          : 'Register your business and become part of the Tepoztlán directory.'
        }
      </p>
    </div>
  )
}