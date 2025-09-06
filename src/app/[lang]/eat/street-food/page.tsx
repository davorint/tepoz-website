import { Locale } from '@/lib/i18n'
import { Metadata } from 'next'
import StreetFoodPageClient from '@/components/street-food/StreetFoodPageClient'
import StructuredData from '@/components/seo/StructuredData'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  
  const title = lang === 'en' ? 'Street Food in Tepoztlán' : 'Comida Callejera en Tepoztlán'
  const description = lang === 'en' 
    ? 'Discover the best street food in Tepoztlán. From traditional Mexican antojitos to local market delights, find authentic flavors in this magical town.'
    : 'Descubre la mejor comida callejera en Tepoztlán. Desde antojitos mexicanos tradicionales hasta delicias del mercado local, encuentra sabores auténticos en este pueblo mágico.'

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

export default async function StreetFoodPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params

  return (
    <>
      <StructuredData
        type="local-business"
        title={lang === 'en' ? 'Street Food in Tepoztlán' : 'Comida Callejera en Tepoztlán'}
        description={lang === 'en' 
          ? 'Discover the best street food in Tepoztlán. From traditional Mexican antojitos to local market delights.'
          : 'Descubre la mejor comida callejera en Tepoztlán. Desde antojitos mexicanos tradicionales hasta delicias del mercado local.'}
        address={{
          city: 'Tepoztlán',
          state: 'Morelos',
          country: 'Mexico'
        }}
        geo={{
          latitude: '18.9847',
          longitude: '-99.0940'
        }}
        pathname={`/${lang}/eat/street-food`}
      />
      <StreetFoodPageClient locale={lang} />
    </>
  )
}