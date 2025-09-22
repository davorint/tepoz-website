import { Locale } from '@/lib/i18n'
import { EcoLodge } from '@/lib/types/business'
import { BusinessEntity } from '@/lib/types/business'
import { BusinessCardConfig } from '@/components/business/BusinessCard'
import { Leaf, Sun, TreePine, Recycle } from 'lucide-react'

export const ecoLodgeCardConfig: BusinessCardConfig = {
  baseUrl: 'stay/eco-lodges',

  getCategoryLabel: (business: BusinessEntity, locale: Locale) => {
    const lodge = business as EcoLodge
    const categoryLabels: Record<string, { es: string; en: string }> = {
      'eco-resort': { es: 'Eco Resort', en: 'Eco Resort' },
      'treehouse': { es: 'Casa del Árbol', en: 'Treehouse' },
      'glamping': { es: 'Glamping', en: 'Glamping' },
      'sustainable-hotel': { es: 'Hotel Sustentable', en: 'Sustainable Hotel' },
      'nature-retreat': { es: 'Retiro Natural', en: 'Nature Retreat' },
      'organic-farm': { es: 'Granja Orgánica', en: 'Organic Farm' }
    }
    return categoryLabels[lodge.category]?.[locale] || lodge.category
  },

  colors: {
    primary: 'from-green-500',
    secondary: 'to-emerald-500',
    categoryBg: 'bg-green-500/30 dark:bg-green-500/20',
    categoryText: 'text-green-700 dark:text-green-300',
    categoryBorder: 'border-green-500/40 dark:border-green-500/30'
  },

  dietaryOptions: {
    organic: { emoji: '🌱', es: 'Orgánico', en: 'Organic' },
    vegetarian: { emoji: '🥬', es: 'Vegetariano', en: 'Vegetarian' },
    vegan: { emoji: '🌿', es: 'Vegano', en: 'Vegan' },
    'gluten-free': { emoji: '🌾', es: 'Sin Gluten', en: 'Gluten Free' }
  },

  customAmenityIcons: {
    organicFood: Leaf,
    solarPower: Sun,
    waterConservation: TreePine,
    localMaterials: Recycle
  }
}