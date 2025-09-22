import { Locale } from '@/lib/i18n'
import { Rental, RentalServiceStatic } from '@/lib/rentals'
import { BusinessCard } from '@/components/business/BusinessCard'
import { rentalCardConfig } from './RentalCardConfig'

interface RentalCardProps {
  rental: Rental
  locale: Locale
  viewMode?: 'grid' | 'list'
  animationDelay?: number
}

export default function RentalCard({
  rental,
  locale,
  viewMode = 'grid',
  animationDelay = 0
}: RentalCardProps) {
  return (
    <BusinessCard
      business={rental}
      locale={locale}
      config={rentalCardConfig}
      viewMode={viewMode}
      animationDelay={animationDelay}
      getName={RentalServiceStatic.getRentalName}
      getDescription={RentalServiceStatic.getRentalDescription}
      getAddress={RentalServiceStatic.getRentalAddress}
      getHours={RentalServiceStatic.getRentalHours}
      getSpecialties={RentalServiceStatic.getRentalSpecialties}
      customAmenities={{
        instantBook: rental.instantBook,
        petFriendly: rental.petFriendly,
        workFriendly: rental.workFriendly,
        familyFriendly: rental.familyFriendly
      }}
    />
  )
}