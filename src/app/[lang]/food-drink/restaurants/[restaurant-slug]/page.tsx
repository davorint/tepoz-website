import { Locale } from '@/lib/i18n'
import { Metadata } from 'next'
import RestaurantDetailClient from '@/components/restaurants/RestaurantDetailClient'
import { RestaurantService } from '@/lib/restaurants'
import StructuredData from '@/components/seo/StructuredData'
import { getBusinessReviews } from '@/lib/actions/reviews'

interface RestaurantPageProps {
  params: Promise<{
    lang: Locale
    'restaurant-slug': string
  }>
}

export async function generateMetadata({ params }: RestaurantPageProps): Promise<Metadata> {
  const { lang, 'restaurant-slug': restaurantSlug } = await params
  const restaurant = RestaurantService.getRestaurantBySlug(restaurantSlug)

  if (!restaurant) {
    return {
      title: lang === 'en' ? 'Restaurant Not Found' : 'Restaurante No Encontrado',
      description: lang === 'en'
        ? 'The requested restaurant could not be found.'
        : 'El restaurante solicitado no pudo ser encontrado.'
    }
  }

  const name = RestaurantService.getRestaurantName(restaurant, lang)
  const description = RestaurantService.getRestaurantDescription(restaurant, lang)

  return {
    title: name,
    description,
    openGraph: {
      title: name,
      description,
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'es_MX',
      images: restaurant.images[0] ? [restaurant.images[0]] : []
    },
    twitter: {
      title: name,
      description,
      images: restaurant.images[0] ? [restaurant.images[0]] : []
    }
  }
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { lang, 'restaurant-slug': restaurantSlug } = await params

  const restaurant = RestaurantService.getRestaurantBySlug(restaurantSlug)

  // Fetch reviews for this restaurant (convert string ID to number for database)
  const businessId = restaurant ? parseInt(restaurant.id, 10) : 0
  const reviewsResult = await getBusinessReviews(businessId)
  const reviews = reviewsResult.success ? reviewsResult.reviews : []

  return (
    <>
      {restaurant && (
        <StructuredData
          type="restaurant"
          title={RestaurantService.getRestaurantName(restaurant, lang)}
          description={RestaurantService.getRestaurantDescription(restaurant, lang)}
          image={restaurant.images[0]}
          rating={{ value: restaurant.rating, count: restaurant.reviewCount }}
          address={{
            city: 'Tepoztlán',
            state: 'Morelos',
            country: 'Mexico',
            street: RestaurantService.getRestaurantAddress(restaurant, lang)
          }}
          geo={{
            latitude: '18.9847',
            longitude: '-99.0940'
          }}
          pathname={`/${lang}/eat/restaurants/${restaurantSlug}`}
        />
      )}
      <RestaurantDetailClient slug={restaurantSlug} locale={lang} reviews={reviews} />
    </>
  )
}