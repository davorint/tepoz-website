import { Locale } from '@/lib/i18n'
import { StreetFood, StreetFoodService } from '@/lib/street-food'
import { BusinessCard } from '@/components/business/BusinessCard'
import { streetFoodCardConfig } from './StreetFoodCardConfig'

interface StreetFoodCardProps {
  streetFood: StreetFood
  locale: Locale
  viewMode?: 'grid' | 'list'
  animationDelay?: number
}

export default function StreetFoodCard({
  streetFood,
  locale,
  viewMode = 'grid',
  animationDelay = 0
}: StreetFoodCardProps) {
  return (
    <BusinessCard
      business={streetFood}
      locale={locale}
      config={streetFoodCardConfig}
      viewMode={viewMode}
      animationDelay={animationDelay}
      getName={StreetFoodService.getStreetFoodName}
      getDescription={StreetFoodService.getStreetFoodDescription}
      getAddress={StreetFoodService.getStreetFoodAddress}
      getHours={StreetFoodService.getStreetFoodHours}
      getSpecialties={StreetFoodService.getStreetFoodSpecialties}
      customAmenities={{
        cashOnly: streetFood.cashOnly,
        localFavorite: streetFood.localFavorite
      }}
      spicyLevel={streetFood.spicyLevel}
    />
  )
}