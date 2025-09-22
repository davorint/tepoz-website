import { Locale } from '@/lib/i18n'
import { Metadata } from 'next'
import AllBarsPulqueriasPageClient from '@/components/bars/AllBarsPulqueriasPageClient'
import StructuredData from '@/components/seo/StructuredData'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  
  const title = lang === 'en' ? 'All Bars & Pulquerías Directory - Tepoztlán' : 'Directorio de Todos los Bares & Pulquerías - Tepoztlán'
  const description = lang === 'en' 
    ? 'Complete directory of all bars and pulquerías in Tepoztlán. Browse, filter and discover detailed information about nightlife venues with advanced search and table view.'
    : 'Directorio completo de todos los bares y pulquerías en Tepoztlán. Navega, filtra y descubre información detallada sobre lugares de vida nocturna con búsqueda avanzada y vista de tabla.'

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

export default async function AllBarsPulqueriasPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params

  return (
    <>
      <StructuredData
        type="local-business"
        title={lang === 'en' ? 'All Bars & Pulquerías Directory - Tepoztlán' : 'Directorio de Todos los Bares & Pulquerías - Tepoztlán'}
        description={lang === 'en' 
          ? 'Complete directory of all bars and pulquerías in Tepoztlán with detailed information and advanced search capabilities.'
          : 'Directorio completo de todos los bares y pulquerías en Tepoztlán con información detallada y capacidades de búsqueda avanzada.'}
        address={{
          city: 'Tepoztlán',
          state: 'Morelos',
          country: 'Mexico'
        }}
        geo={{
          latitude: '18.9847',
          longitude: '-99.0940'
        }}
        pathname={`/${lang}/eat/bars-pulquerias/all-bars-pulquerias`}
      />
      <AllBarsPulqueriasPageClient locale={lang} />
    </>
  )
}