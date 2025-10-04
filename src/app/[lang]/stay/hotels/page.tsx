import { Suspense } from 'react'
import { Locale } from '@/lib/i18n'
import { Metadata } from 'next'
import HotelsPageClient from '@/components/hotels/HotelsPageClient'
import StructuredData from '@/components/seo/StructuredData'
import { BusinessCardSkeletonGrid } from '@/components/loading/BusinessCardSkeleton'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  
  const title = lang === 'en' ? 'Hotels in Tepoztlán' : 'Hoteles en Tepoztlán'
  const description = lang === 'en' 
    ? 'Discover the best hotels in Tepoztlán. From luxury resorts to boutique accommodations, find your perfect stay in this magical town.'
    : 'Descubre los mejores hoteles en Tepoztlán. Desde resorts de lujo hasta alojamientos boutique, encuentra tu estancia perfecta en este pueblo mágico.'

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

export default async function HotelsPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params

  return (
    <>
      <StructuredData
        type="hotel"
        title={lang === 'en' ? 'Hotels in Tepoztlán' : 'Hoteles en Tepoztlán'}
        description={lang === 'en'
          ? 'Discover the best hotels in Tepoztlán. From luxury resorts to boutique accommodations.'
          : 'Descubre los mejores hoteles en Tepoztlán. Desde resorts de lujo hasta alojamientos boutique.'}
        address={{
          city: 'Tepoztlán',
          state: 'Morelos',
          country: 'Mexico'
        }}
        geo={{
          latitude: '18.9847',
          longitude: '-99.0940'
        }}
        pathname={`/${lang}/stay/hotels`}
      />
      <Suspense fallback={<BusinessCardSkeletonGrid count={6} />}>
        <HotelsPageClient locale={lang} />
      </Suspense>
    </>
  )
}