import { Locale } from '@/lib/i18n'
import { Bar, BarService } from '@/lib/bars'
import BusinessCard from '@/components/business/BusinessCard'
import { barCardConfig } from './BarCardConfig'

interface BarCardProps {
  bar: Bar
  locale: Locale
  viewMode?: 'grid' | 'list'
  animationDelay?: number
}

export default function BarCard({
  bar,
  locale,
  viewMode = 'grid',
  animationDelay = 0
}: BarCardProps) {
  return (
    <BusinessCard
      business={bar}
      locale={locale}
      config={barCardConfig}
      viewMode={viewMode}
      animationDelay={animationDelay}
      getName={BarService.getBarName}
      getDescription={BarService.getBarDescription}
      getAddress={BarService.getBarAddress}
      getHours={BarService.getBarHours}
      getSpecialties={BarService.getBarSpecialties}
    />
  )
}