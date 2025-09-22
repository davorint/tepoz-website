import { Locale } from '@/lib/i18n'
import { Bar, BarService } from '@/lib/bars'
import { BusinessEntity } from '@/lib/types/business'
import { BusinessCardConfig } from '@/components/business/BusinessCard'
import { Music, Volume2 } from 'lucide-react'

export const barCardConfig: BusinessCardConfig = {
  baseUrl: 'food-drink/bars-pulquerias',

  getCategoryLabel: (business: BusinessEntity, locale: Locale) => {
    const bar = business as Bar
    return BarService.getBarType(bar, locale)
  },

  colors: {
    primary: 'from-teal-400',
    secondary: 'to-cyan-400',
    categoryBg: 'bg-teal-400/30 dark:bg-teal-400/20',
    categoryText: 'text-teal-600 dark:text-teal-300',
    categoryBorder: 'border-teal-400/40 dark:border-teal-400/30'
  },

  dietaryOptions: {
    vegetarian: { emoji: '🌱', es: 'Vegetariano', en: 'Vegetarian' },
    vegan: { emoji: '🌿', es: 'Vegano', en: 'Vegan' },
    'gluten-free': { emoji: '🌾', es: 'Sin Gluten', en: 'Gluten Free' },
    organic: { emoji: '🍃', es: 'Orgánico', en: 'Organic' }
  },

  customAmenityIcons: {
    liveMusic: Music,
    danceFloor: Volume2
  }
}