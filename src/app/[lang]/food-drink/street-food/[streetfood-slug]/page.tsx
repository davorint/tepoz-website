import { Locale } from '@/lib/i18n'
import { Metadata } from 'next'
import StreetFoodDetailClient from '@/components/street-food/StreetFoodDetailClient'
import { StreetFoodService } from '@/lib/street-food'
import StructuredData from '@/components/seo/StructuredData'

interface StreetFoodPageProps {
  params: Promise<{
    lang: Locale
    'streetfood-slug': string
  }>
}

export async function generateMetadata({ params }: StreetFoodPageProps): Promise<Metadata> {
  const { lang, 'streetfood-slug': streetfoodSlug } = await params
  const streetFood = StreetFoodService.getStreetFoodBySlug?.(streetfoodSlug) || StreetFoodService.getAllStreetFoods().find(sf => sf.slug === streetfoodSlug)

  if (!streetFood) {
    return {
      title: lang === 'en' ? 'Street Food Not Found' : 'Comida Callejera No Encontrada',
      description: lang === 'en'
        ? 'The requested street food vendor could not be found.'
        : 'El puesto de comida callejera solicitado no pudo ser encontrado.'
    }
  }

  const name = StreetFoodService.getStreetFoodName(streetFood, lang)
  const description = StreetFoodService.getStreetFoodDescription(streetFood, lang)

  return {
    title: name,
    description,
    openGraph: {
      title: name,
      description,
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'es_MX',
      images: streetFood.images[0] ? [streetFood.images[0]] : []
    },
    twitter: {
      title: name,
      description,
      images: streetFood.images[0] ? [streetFood.images[0]] : []
    }
  }
}

export default async function StreetFoodPage({ params }: StreetFoodPageProps) {
  const { lang, 'streetfood-slug': streetfoodSlug } = await params

  const streetFood = StreetFoodService.getStreetFoodBySlug?.(streetfoodSlug) || StreetFoodService.getAllStreetFoods().find(sf => sf.slug === streetfoodSlug)

  return (
    <>
      {streetFood && (
        <StructuredData
          type="restaurant"
          title={StreetFoodService.getStreetFoodName(streetFood, lang)}
          description={StreetFoodService.getStreetFoodDescription(streetFood, lang)}
          image={streetFood.images[0]}
          rating={{ value: streetFood.rating, count: streetFood.reviewCount }}
          address={{
            city: 'Tepoztlán',
            state: 'Morelos',
            country: 'Mexico',
            street: StreetFoodService.getStreetFoodLocation(streetFood, lang)
          }}
          geo={{
            latitude: '18.9847',
            longitude: '-99.0940'
          }}
          pathname={`/${lang}/food-drink/street-food/${streetfoodSlug}`}
        />
      )}
      <StreetFoodDetailClient slug={streetfoodSlug} locale={lang} />
    </>
  )
}