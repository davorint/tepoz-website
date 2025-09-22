import { Locale } from '@/lib/i18n'
import { EcoLodge, EcoLodgeServiceStatic } from '@/lib/eco-lodges'
import { BusinessCard } from '@/components/business/BusinessCard'
import { ecoLodgeCardConfig } from './EcoLodgeCardConfig'

interface EcoLodgeCardProps {
  ecoLodge: EcoLodge
  locale: Locale
  viewMode?: 'grid' | 'list'
  animationDelay?: number
}

export default function EcoLodgeCard({
  ecoLodge,
  locale,
  viewMode = 'grid',
  animationDelay = 0
}: EcoLodgeCardProps) {
  return (
    <BusinessCard
      business={ecoLodge}
      locale={locale}
      config={ecoLodgeCardConfig}
      viewMode={viewMode}
      animationDelay={animationDelay}
      getName={EcoLodgeServiceStatic.getEcoLodgeName}
      getDescription={EcoLodgeServiceStatic.getEcoLodgeDescription}
      getAddress={EcoLodgeServiceStatic.getEcoLodgeAddress}
      getHours={EcoLodgeServiceStatic.getEcoLodgeHours}
      getSpecialties={EcoLodgeServiceStatic.getEcoLodgeSpecialties}
      customAmenities={{
        organicFood: ecoLodge.organicFood,
        solarPower: ecoLodge.solarPower,
        waterConservation: ecoLodge.waterConservation,
        localMaterials: ecoLodge.localMaterials
      }}
    />
  )
}