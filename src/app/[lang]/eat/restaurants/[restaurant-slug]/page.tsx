import { Locale } from '@/lib/i18n'

interface RestaurantPageProps {
  params: Promise<{ 
    lang: Locale
    'restaurant-slug': string
  }>
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { lang, 'restaurant-slug': restaurantSlug } = await params

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Restaurant Details</h1>
      <p>Restaurant: {restaurantSlug}</p>
      <p>Language: {lang}</p>
      {/* TODO: Implement restaurant detail component */}
    </div>
  )
}