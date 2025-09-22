import { Locale } from '@/lib/i18n'
import { Cafe, CafeService } from '@/lib/cafes'
import { BusinessCard } from '@/components/business/BusinessCard'
import { cafeCardConfig } from './CafeCardConfig'

interface CafeCardProps {
  cafe: Cafe
  locale: Locale
  viewMode?: 'grid' | 'list'
  animationDelay?: number
}

export default function CafeCard({
  cafe,
  locale,
  viewMode = 'grid',
  animationDelay = 0
}: CafeCardProps) {
  return (
    <BusinessCard
      business={cafe}
      locale={locale}
      config={cafeCardConfig}
      viewMode={viewMode}
      animationDelay={animationDelay}
      getName={CafeService.getCafeName}
      getDescription={CafeService.getCafeDescription}
      getAddress={CafeService.getCafeAddress}
      getHours={CafeService.getCafeHours}
      getSpecialties={CafeService.getCafeSpecialties}
      customAmenities={{
        studyFriendly: cafe.studyFriendly,
        liveMusic: cafe.liveMusic
      }}
    />
  )
}