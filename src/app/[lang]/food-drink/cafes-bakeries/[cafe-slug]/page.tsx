import { Locale } from '@/lib/i18n'
import { Metadata } from 'next'
import CafeDetailClient from '@/components/cafes/CafeDetailClient'
import { CafeService } from '@/lib/cafes'
import StructuredData from '@/components/seo/StructuredData'

interface CafePageProps {
  params: Promise<{
    lang: Locale
    'cafe-slug': string
  }>
}

export async function generateMetadata({ params }: CafePageProps): Promise<Metadata> {
  const { lang, 'cafe-slug': cafeSlug } = await params
  const cafe = CafeService.getCafeBySlug?.(cafeSlug) || CafeService.getAllCafes?.().find(c => c.slug === cafeSlug)

  if (!cafe) {
    return {
      title: lang === 'en' ? 'Cafe Not Found' : 'Café No Encontrado',
      description: lang === 'en'
        ? 'The requested cafe could not be found.'
        : 'El café solicitado no pudo ser encontrado.'
    }
  }

  const name = CafeService.getCafeName(cafe, lang)
  const description = CafeService.getCafeDescription(cafe, lang)

  return {
    title: name,
    description,
    openGraph: {
      title: name,
      description,
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'es_MX',
      images: cafe.images[0] ? [cafe.images[0]] : []
    },
    twitter: {
      title: name,
      description,
      images: cafe.images[0] ? [cafe.images[0]] : []
    }
  }
}

export default async function CafePage({ params }: CafePageProps) {
  const { lang, 'cafe-slug': cafeSlug } = await params

  const cafe = CafeService.getCafeBySlug?.(cafeSlug) || CafeService.getAllCafes?.().find(c => c.slug === cafeSlug)

  return (
    <>
      {cafe && (
        <StructuredData
          type="restaurant"
          title={CafeService.getCafeName(cafe, lang)}
          description={CafeService.getCafeDescription(cafe, lang)}
          image={cafe.images[0]}
          rating={{ value: cafe.rating, count: cafe.reviewCount }}
          address={{
            city: 'Tepoztlán',
            state: 'Morelos',
            country: 'Mexico',
            street: CafeService.getCafeAddress(cafe, lang)
          }}
          geo={{
            latitude: '18.9847',
            longitude: '-99.0940'
          }}
          pathname={`/${lang}/food-drink/cafes-bakeries/${cafeSlug}`}
        />
      )}
      <CafeDetailClient slug={cafeSlug} locale={lang} />
    </>
  )
}