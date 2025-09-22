import { Locale } from '@/lib/i18n'
import { Restaurant } from '@/lib/restaurants'
import { BusinessEntity } from '@/lib/types/business'
import { BusinessCardConfig } from '@/components/business/BusinessCard'
import { Music, Wine } from 'lucide-react'

export const restaurantCardConfig: BusinessCardConfig = {
  baseUrl: 'food-drink/restaurants',

  getCategoryLabel: (business: BusinessEntity, locale: Locale) => {
    const restaurant = business as Restaurant
    return restaurant.cuisine[locale]
  },

  colors: {
    primary: 'from-orange-400',
    secondary: 'to-red-400',
    categoryBg: 'bg-orange-400/30 dark:bg-orange-400/20',
    categoryText: 'text-orange-600 dark:text-orange-300',
    categoryBorder: 'border-orange-400/40 dark:border-orange-400/30'
  },

  dietaryOptions: {
    vegetarian: { emoji: '🌱', es: 'Vegetariano', en: 'Vegetarian' },
    vegan: { emoji: '🌿', es: 'Vegano', en: 'Vegan' },
    'gluten-free': { emoji: '🌾', es: 'Sin Gluten', en: 'Gluten Free' },
    organic: { emoji: '🍃', es: 'Orgánico', en: 'Organic' }
  },

  customAmenityIcons: {
    liveMusic: Music,
    alcoholic: Wine
  }
}