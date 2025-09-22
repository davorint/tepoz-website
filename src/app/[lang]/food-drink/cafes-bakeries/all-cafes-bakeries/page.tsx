import { Locale } from '@/lib/i18n'
import { Metadata } from 'next'
import AllCafesBakeriesPageClient from '@/components/cafes/AllCafesBakeriesPageClient'
import StructuredData from '@/components/seo/StructuredData'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  
  const title = lang === 'en' ? 'All Cafés & Bakeries Directory - Tepoztlán' : 'Directorio de Todos los Cafés & Panaderías - Tepoztlán'
  const description = lang === 'en' 
    ? 'Complete directory of all cafés and bakeries in Tepoztlán. Browse, filter and discover detailed information about coffee shops and bakeries with advanced search and table view.'
    : 'Directorio completo de todos los cafés y panaderías en Tepoztlán. Navega, filtra y descubre información detallada sobre cafeterías y panaderías con búsqueda avanzada y vista de tabla.'

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

export default async function AllCafesBakeriesPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params

  return (
    <>
      <StructuredData
        type="local-business"
        title={lang === 'en' ? 'All Cafés & Bakeries Directory - Tepoztlán' : 'Directorio de Todos los Cafés & Panaderías - Tepoztlán'}
        description={lang === 'en' 
          ? 'Complete directory of all cafés and bakeries in Tepoztlán with detailed information and advanced search capabilities.'
          : 'Directorio completo de todos los cafés y panaderías en Tepoztlán con información detallada y capacidades de búsqueda avanzada.'}
        address={{
          city: 'Tepoztlán',
          state: 'Morelos',
          country: 'Mexico'
        }}
        geo={{
          latitude: '18.9847',
          longitude: '-99.0940'
        }}
        pathname={`/${lang}/eat/cafes-bakeries/all-cafes-bakeries`}
      />
      <AllCafesBakeriesPageClient locale={lang} />
    </>
  )
}