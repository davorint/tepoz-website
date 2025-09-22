import { Locale } from '@/lib/i18n'
import { StreetFood } from '@/lib/street-food'
import { BusinessEntity } from '@/lib/types/business'
import { BusinessCardConfig } from '@/components/business/BusinessCard'
import { Truck, ShoppingCart } from 'lucide-react'

export const streetFoodCardConfig: BusinessCardConfig = {
  baseUrl: 'food-drink/street-food',

  getCategoryLabel: (business: BusinessEntity, locale: Locale) => {
    const streetFood = business as StreetFood
    return streetFood.type[locale]
  },

  colors: {
    primary: 'from-red-400',
    secondary: 'to-pink-400',
    categoryBg: 'bg-red-400/30 dark:bg-red-400/20',
    categoryText: 'text-red-700 dark:text-red-300',
    categoryBorder: 'border-red-400/40 dark:border-red-400/30'
  },

  dietaryOptions: {
    vegetarian: { emoji: '🌱', es: 'Vegetariano', en: 'Vegetarian' },
    vegan: { emoji: '🌿', es: 'Vegano', en: 'Vegan' },
    'gluten-free': { emoji: '🌾', es: 'Sin Gluten', en: 'Gluten Free' },
    spicy: { emoji: '🌶️', es: 'Picante', en: 'Spicy' }
  },

  customAmenityIcons: {
    localFavorite: ShoppingCart,
    cashOnly: Truck
  }
}