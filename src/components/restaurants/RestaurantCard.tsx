import { Locale } from '@/lib/i18n'
import { Restaurant, RestaurantService } from '@/lib/restaurants'
import BusinessCard from '@/components/business/BusinessCard'
import { restaurantCardConfig } from './RestaurantCardConfig'

interface RestaurantCardProps {
  restaurant: Restaurant
  locale: Locale
  viewMode?: 'grid' | 'list'
  animationDelay?: number
}

export default function RestaurantCard({
  restaurant,
  locale,
  viewMode = 'grid',
  animationDelay = 0
}: RestaurantCardProps) {
  return (
    <BusinessCard
      business={restaurant}
      locale={locale}
      config={restaurantCardConfig}
      viewMode={viewMode}
      animationDelay={animationDelay}
      getName={RestaurantService.getRestaurantName}
      getDescription={RestaurantService.getRestaurantDescription}
      getAddress={RestaurantService.getRestaurantAddress}
      getHours={RestaurantService.getRestaurantHours}
      getSpecialties={RestaurantService.getRestaurantSpecialties}
    />
  )
}