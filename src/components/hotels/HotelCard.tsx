import { Locale } from '@/lib/i18n'
import { Hotel, HotelServiceStatic } from '@/lib/hotels'
import { BusinessCard } from '@/components/business/BusinessCard'
import { hotelCardConfig } from './HotelCardConfig'

interface HotelCardProps {
  hotel: Hotel
  locale: Locale
  viewMode?: 'grid' | 'list'
  animationDelay?: number
}

export default function HotelCard({
  hotel,
  locale,
  viewMode = 'grid',
  animationDelay = 0
}: HotelCardProps) {
  return (
    <BusinessCard
      business={hotel}
      locale={locale}
      config={hotelCardConfig}
      viewMode={viewMode}
      animationDelay={animationDelay}
      getName={HotelServiceStatic.getHotelName}
      getDescription={HotelServiceStatic.getHotelDescription}
      getAddress={HotelServiceStatic.getHotelAddress}
      getHours={HotelServiceStatic.getHotelHours}
      getSpecialties={HotelServiceStatic.getHotelSpecialties}
      customAmenities={{
        sustainability: hotel.sustainability,
        adultsOnly: hotel.adultsOnly,
        petFriendly: hotel.petFriendly
      }}
    />
  )
}