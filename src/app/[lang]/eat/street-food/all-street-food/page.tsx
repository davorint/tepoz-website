import { Locale } from '@/lib/i18n'
import { Metadata } from 'next'
import AllStreetFoodPageClient from '@/components/street-food/AllStreetFoodPageClient'
import StructuredData from '@/components/seo/StructuredData'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  
  const title = lang === 'en' ? 'All Street Food Directory - Tepoztlán' : 'Directorio de Toda la Comida Callejera - Tepoztlán'
  const description = lang === 'en' 
    ? 'Complete directory of all street food vendors and local snacks in Tepoztlán. Browse, filter and discover detailed information about antojitos and street food with advanced search and table view.'
    : 'Directorio completo de todos los vendedores de comida callejera y antojitos locales en Tepoztlán. Navega, filtra y descubre información detallada sobre antojitos y comida callejera con búsqueda avanzada y vista de tabla.'

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

export default async function AllStreetFoodPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params

  return (
    <>
      <StructuredData
        type="local-business"
        title={lang === 'en' ? 'All Street Food Directory - Tepoztlán' : 'Directorio de Toda la Comida Callejera - Tepoztlán'}
        description={lang === 'en' 
          ? 'Complete directory of all street food vendors and local snacks in Tepoztlán with detailed information and advanced search capabilities.'
          : 'Directorio completo de todos los vendedores de comida callejera y antojitos locales en Tepoztlán con información detallada y capacidades de búsqueda avanzada.'}
        address={{
          city: 'Tepoztlán',
          state: 'Morelos',
          country: 'Mexico'
        }}
        geo={{
          latitude: '18.9847',
          longitude: '-99.0940'
        }}
        pathname={`/${lang}/eat/street-food/all-street-food`}
      />
      <AllStreetFoodPageClient locale={lang} />
    </>
  )
}