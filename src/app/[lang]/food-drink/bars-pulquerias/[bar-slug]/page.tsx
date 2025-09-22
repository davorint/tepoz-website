import { Locale } from '@/lib/i18n'
import { Metadata } from 'next'
import BarDetailClient from '@/components/bars/BarDetailClient'
import { BarService } from '@/lib/bars'
import StructuredData from '@/components/seo/StructuredData'

interface BarPageProps {
  params: Promise<{
    lang: Locale
    'bar-slug': string
  }>
}

export async function generateMetadata({ params }: BarPageProps): Promise<Metadata> {
  const { lang, 'bar-slug': barSlug } = await params
  const bar = BarService.getBarBySlug?.(barSlug) || BarService.getAllBars().find(b => b.slug === barSlug)

  if (!bar) {
    return {
      title: lang === 'en' ? 'Bar Not Found' : 'Bar No Encontrado',
      description: lang === 'en'
        ? 'The requested bar could not be found.'
        : 'El bar solicitado no pudo ser encontrado.'
    }
  }

  const name = BarService.getBarName(bar, lang)
  const description = BarService.getBarDescription(bar, lang)

  return {
    title: name,
    description,
    openGraph: {
      title: name,
      description,
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'es_MX',
      images: bar.images[0] ? [bar.images[0]] : []
    },
    twitter: {
      title: name,
      description,
      images: bar.images[0] ? [bar.images[0]] : []
    }
  }
}

export default async function BarPage({ params }: BarPageProps) {
  const { lang, 'bar-slug': barSlug } = await params

  const bar = BarService.getBarBySlug?.(barSlug) || BarService.getAllBars().find(b => b.slug === barSlug)

  return (
    <>
      {bar && (
        <StructuredData
          type="restaurant"
          title={BarService.getBarName(bar, lang)}
          description={BarService.getBarDescription(bar, lang)}
          image={bar.images[0]}
          rating={{ value: bar.rating, count: bar.reviewCount }}
          address={{
            city: 'Tepoztlán',
            state: 'Morelos',
            country: 'Mexico',
            street: BarService.getBarAddress(bar, lang)
          }}
          geo={{
            latitude: '18.9847',
            longitude: '-99.0940'
          }}
          pathname={`/${lang}/food-drink/bars-pulquerias/${barSlug}`}
        />
      )}
      <BarDetailClient slug={barSlug} locale={lang} />
    </>
  )
}