import { Locale } from '@/lib/i18n'
import { Rental } from '@/lib/types/business'
import { BusinessEntity } from '@/lib/types/business'
import { BusinessCardConfig } from '@/components/business/BusinessCard'
import { Home, Heart, Briefcase, Baby } from 'lucide-react'

export const rentalCardConfig: BusinessCardConfig = {
  baseUrl: 'stay/rentals',

  getCategoryLabel: (business: BusinessEntity, locale: Locale) => {
    const rental = business as Rental
    const categoryLabels: Record<string, { es: string; en: string }> = {
      'apartment': { es: 'Apartamento', en: 'Apartment' },
      'house': { es: 'Casa', en: 'House' },
      'villa': { es: 'Villa', en: 'Villa' },
      'studio': { es: 'Estudio', en: 'Studio' },
      'cabin': { es: 'Cabaña', en: 'Cabin' },
      'loft': { es: 'Loft', en: 'Loft' }
    }
    return categoryLabels[rental.category]?.[locale] || rental.category
  },

  colors: {
    primary: 'from-orange-500',
    secondary: 'to-red-500',
    categoryBg: 'bg-orange-500/30 dark:bg-orange-500/20',
    categoryText: 'text-orange-700 dark:text-orange-300',
    categoryBorder: 'border-orange-500/40 dark:border-orange-500/30'
  },

  dietaryOptions: {
    organic: { emoji: '🍃', es: 'Orgánico', en: 'Organic' },
    vegetarian: { emoji: '🌱', es: 'Vegetariano', en: 'Vegetarian' },
    vegan: { emoji: '🌿', es: 'Vegano', en: 'Vegan' },
    'gluten-free': { emoji: '🌾', es: 'Sin Gluten', en: 'Gluten Free' }
  },

  customAmenityIcons: {
    instantBook: Home,
    petFriendly: Heart,
    workFriendly: Briefcase,
    familyFriendly: Baby
  }
}