import { Locale } from '@/lib/i18n'
import { Cafe } from '@/lib/cafes'
import { BusinessEntity } from '@/lib/types/business'
import { BusinessCardConfig } from '@/components/business/BusinessCard'
import { Music, Users } from 'lucide-react'

export const cafeCardConfig: BusinessCardConfig = {
  baseUrl: 'food-drink/cafes-bakeries',

  getCategoryLabel: (business: BusinessEntity, locale: Locale) => {
    const cafe = business as Cafe
    return cafe.cafeType[locale]
  },

  colors: {
    primary: 'from-amber-400',
    secondary: 'to-orange-400',
    categoryBg: 'bg-amber-400/30 dark:bg-amber-400/20',
    categoryText: 'text-amber-700 dark:text-amber-300',
    categoryBorder: 'border-amber-400/40 dark:border-amber-400/30'
  },

  dietaryOptions: {
    vegetarian: { emoji: '🌱', es: 'Vegetariano', en: 'Vegetarian' },
    vegan: { emoji: '🌿', es: 'Vegano', en: 'Vegan' },
    'gluten-free': { emoji: '🌾', es: 'Sin Gluten', en: 'Gluten Free' },
    organic: { emoji: '🍃', es: 'Orgánico', en: 'Organic' }
  },

  customAmenityIcons: {
    liveMusic: Music,
    studyFriendly: Users
  }
}