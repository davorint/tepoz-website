import { Locale } from '@/lib/i18n'
import { Hotel } from '@/lib/types/business'
import { BusinessEntity } from '@/lib/types/business'
import { BusinessCardConfig } from '@/components/business/BusinessCard'
import { Crown, Leaf, Users } from 'lucide-react'

export const hotelCardConfig: BusinessCardConfig = {
  baseUrl: 'stay/hotels',

  getCategoryLabel: (business: BusinessEntity, locale: Locale) => {
    const hotel = business as Hotel
    const categoryLabels: Record<string, { es: string; en: string }> = {
      'boutique': { es: 'Boutique', en: 'Boutique' },
      'resort': { es: 'Resort', en: 'Resort' },
      'eco': { es: 'Eco-Hotel', en: 'Eco-Hotel' },
      'budget': { es: 'Económico', en: 'Budget' },
      'luxury': { es: 'Lujo', en: 'Luxury' },
      'hostel': { es: 'Hostal', en: 'Hostel' },
      'business': { es: 'Negocios', en: 'Business' },
      'wellness': { es: 'Bienestar', en: 'Wellness' },
      'romantic': { es: 'Romántico', en: 'Romantic' },
      'historic': { es: 'Histórico', en: 'Historic' }
    }
    return categoryLabels[hotel.category]?.[locale] || hotel.category
  },

  colors: {
    primary: 'from-blue-500',
    secondary: 'to-purple-500',
    categoryBg: 'bg-blue-500/30 dark:bg-blue-500/20',
    categoryText: 'text-blue-700 dark:text-blue-300',
    categoryBorder: 'border-blue-500/40 dark:border-blue-500/30'
  },

  dietaryOptions: {
    organic: { emoji: '🍃', es: 'Orgánico', en: 'Organic' },
    vegetarian: { emoji: '🌱', es: 'Vegetariano', en: 'Vegetarian' },
    vegan: { emoji: '🌿', es: 'Vegano', en: 'Vegan' },
    'gluten-free': { emoji: '🌾', es: 'Sin Gluten', en: 'Gluten Free' }
  },

  customAmenityIcons: {
    sustainability: Leaf,
    adultsOnly: Crown,
    petFriendly: Users
  }
}