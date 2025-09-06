import { Locale } from '@/lib/i18n'
import { Metadata } from 'next'
import AllVacationRentalsPageClient from '@/components/rentals/AllVacationRentalsPageClient'
import StructuredData from '@/components/seo/StructuredData'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  
  const title = lang === 'en' ? 'All Vacation Rentals Directory - Tepoztlán' : 'Directorio de Todas las Rentas Vacacionales - Tepoztlán'
  const description = lang === 'en' 
    ? 'Complete directory of all vacation rentals in Tepoztlán. Browse, filter and discover detailed information about rental properties with advanced search and table view.'
    : 'Directorio completo de todas las rentas vacacionales en Tepoztlán. Navega, filtra y descubre información detallada sobre propiedades de alquiler con búsqueda avanzada y vista de tabla.'

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

export default async function AllVacationRentalsPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params

  return (
    <>
      <StructuredData
        type="local-business"
        title={lang === 'en' ? 'All Vacation Rentals Directory - Tepoztlán' : 'Directorio de Todas las Rentas Vacacionales - Tepoztlán'}
        description={lang === 'en' 
          ? 'Complete directory of all vacation rentals in Tepoztlán with detailed information and advanced search capabilities.'
          : 'Directorio completo de todas las rentas vacacionales en Tepoztlán con información detallada y capacidades de búsqueda avanzada.'}
        address={{
          city: 'Tepoztlán',
          state: 'Morelos',
          country: 'Mexico'
        }}
        geo={{
          latitude: '18.9847',
          longitude: '-99.0940'
        }}
        pathname={`/${lang}/stay/vacation-rentals/all-vacation-rentals`}
      />
      <AllVacationRentalsPageClient locale={lang} />
    </>
  )
}