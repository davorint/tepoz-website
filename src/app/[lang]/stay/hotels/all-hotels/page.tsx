import { Locale } from '@/lib/i18n'
import { Metadata } from 'next'
import AllHotelsPageClient from '@/components/hotels/AllHotelsPageClient'
import StructuredData from '@/components/seo/StructuredData'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  
  const title = lang === 'en' ? 'All Hotels Directory - Tepoztlán' : 'Directorio de Todos los Hoteles - Tepoztlán'
  const description = lang === 'en' 
    ? 'Complete directory of all hotels in Tepoztlán. Browse, filter and discover detailed information about accommodation options with advanced search and table view.'
    : 'Directorio completo de todos los hoteles en Tepoztlán. Navega, filtra y descubre información detallada sobre opciones de hospedaje con búsqueda avanzada y vista de tabla.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'es_MX',
    },
    twitter: {
      title,
      description,
    },
  }
}

export default async function AllHotelsPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params

  return (
    <>
      <StructuredData
        type="local-business"
        title={lang === 'en' ? 'All Hotels Directory - Tepoztlán' : 'Directorio de Todos los Hoteles - Tepoztlán'}
        description={lang === 'en' 
          ? 'Complete directory of all hotels in Tepoztlán with detailed information and advanced search capabilities.'
          : 'Directorio completo de todos los hoteles en Tepoztlán con información detallada y capacidades de búsqueda avanzada.'}
        address={{
          city: 'Tepoztlán',
          state: 'Morelos',
          country: 'Mexico'
        }}
        geo={{
          latitude: '18.9847',
          longitude: '-99.0940'
        }}
        pathname={`/${lang}/stay/hotels/all-hotels`}
      />
      <AllHotelsPageClient locale={lang} />
    </>
  )
}