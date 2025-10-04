import { Suspense } from 'react'
import { Locale } from '@/lib/i18n'
import { Metadata } from 'next'
import RestaurantsPageClient from '@/components/restaurants/RestaurantsPageClient'
import StructuredData from '@/components/seo/StructuredData'
import { BusinessCardSkeletonGrid } from '@/components/loading/BusinessCardSkeleton'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  
  const title = lang === 'en' ? 'Restaurants in Tepoztlán' : 'Restaurantes en Tepoztlán'
  const description = lang === 'en' 
    ? 'Discover the best restaurants in Tepoztlán. From traditional Mexican cuisine to international dishes, find perfect dining experiences in this magical town.'
    : 'Descubre los mejores restaurantes en Tepoztlán. Desde cocina tradicional mexicana hasta platillos internacionales, encuentra experiencias gastronómicas perfectas en este pueblo mágico.'

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

export default async function RestaurantsPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params

  return (
    <>
      <StructuredData
        type="local-business"
        title={lang === 'en' ? 'Restaurants in Tepoztlán' : 'Restaurantes en Tepoztlán'}
        description={lang === 'en'
          ? 'Discover the best restaurants in Tepoztlán. From traditional Mexican cuisine to international dishes.'
          : 'Descubre los mejores restaurantes en Tepoztlán. Desde cocina tradicional mexicana hasta platillos internacionales.'}
        address={{
          city: 'Tepoztlán',
          state: 'Morelos',
          country: 'Mexico'
        }}
        geo={{
          latitude: '18.9847',
          longitude: '-99.0940'
        }}
        pathname={`/${lang}/eat/restaurants`}
      />
      <Suspense fallback={<BusinessCardSkeletonGrid count={9} />}>
        <RestaurantsPageClient locale={lang} />
      </Suspense>
    </>
  )
}