import { useMemo } from 'react'
import { Locale } from '@/lib/i18n'
import {
  EXPERIENCE_CATEGORY_COLORS,
  INTENSITY_COLORS,
  INTENSITY_LABELS,
  BADGE_TYPES,
  EXPERIENCE_TYPE_LABELS,
  UI_TRANSLATIONS,
  getLocalizedLabel,
  type ExperienceCategory,
  type IntensityLevel,
  type BadgeType,
  type ExperienceType
} from '@/lib/experience-ui-constants'

export interface UseExperienceUIReturn {
  // Category utilities
  getCategoryGradient: (category: string) => string

  // Intensity utilities
  getIntensityColor: (intensity: string) => string
  getIntensityLabel: (intensity: string, locale: Locale) => string

  // Badge utilities
  getBadgeConfig: (type: BadgeType) => typeof BADGE_TYPES[BadgeType]

  // Type utilities
  getExperienceTypeLabel: (type: string, locale: Locale) => string

  // Translation utilities
  t: (key: keyof typeof UI_TRANSLATIONS, locale: Locale) => string

  // Styling utilities
  getHoverGradient: (category: string) => string
  getCategoryTextGradient: (category: string) => string
}

export const useExperienceUI = (): UseExperienceUIReturn => {
  const utilities = useMemo(() => ({
    getCategoryGradient: (category: string): string => {
      return EXPERIENCE_CATEGORY_COLORS[category as ExperienceCategory] ||
             EXPERIENCE_CATEGORY_COLORS.adventure
    },

    getIntensityColor: (intensity: string): string => {
      return INTENSITY_COLORS[intensity as IntensityLevel] ||
             INTENSITY_COLORS.medium
    },

    getIntensityLabel: (intensity: string, locale: Locale): string => {
      const labels = INTENSITY_LABELS[intensity as IntensityLevel]
      return labels?.[locale] || intensity
    },

    getBadgeConfig: (type: BadgeType) => {
      return BADGE_TYPES[type]
    },

    getExperienceTypeLabel: (type: string, locale: Locale): string => {
      const labels = EXPERIENCE_TYPE_LABELS[type as ExperienceType]
      return labels?.[locale] || type
    },

    t: (key: keyof typeof UI_TRANSLATIONS, locale: Locale): string => {
      return UI_TRANSLATIONS[key]?.[locale] || key
    },

    getHoverGradient: (category: string): string => {
      const gradient = EXPERIENCE_CATEGORY_COLORS[category as ExperienceCategory] ||
                      EXPERIENCE_CATEGORY_COLORS.adventure
      return `hover:bg-gradient-to-r hover:bg-clip-text hover:text-transparent hover:${gradient}`
    },

    getCategoryTextGradient: (category: string): string => {
      const gradient = EXPERIENCE_CATEGORY_COLORS[category as ExperienceCategory] ||
                      EXPERIENCE_CATEGORY_COLORS.adventure
      return `bg-gradient-to-r bg-clip-text text-transparent ${gradient}`
    }
  }), [])

  return utilities
}

// Specialized hooks for specific UI patterns
export const useExperienceBadges = (locale: Locale) => {
  return useMemo(() => ({
    getFeaturedBadge: () => ({
      ...BADGE_TYPES.featured,
      text: BADGE_TYPES.featured.label[locale]
    }),

    getIndigenousBadge: () => ({
      ...BADGE_TYPES.indigenous,
      text: BADGE_TYPES.indigenous.label[locale]
    }),

    getSustainableBadge: () => ({
      ...BADGE_TYPES.sustainable,
      text: BADGE_TYPES.sustainable.label[locale]
    }),

    getVerifiedBadge: () => ({
      ...BADGE_TYPES.verified,
      text: BADGE_TYPES.verified.label[locale]
    })
  }), [locale])
}

export const useExperienceCategories = (locale: Locale) => {
  return useMemo(() => {
    const categories = Object.keys(EXPERIENCE_CATEGORY_COLORS) as ExperienceCategory[]

    return categories.map(category => ({
      id: category,
      gradient: EXPERIENCE_CATEGORY_COLORS[category],
      name: getLocalizedLabel(UI_TRANSLATIONS, category, locale) || category
    }))
  }, [locale])
}

// Animation utilities
export const useExperienceAnimations = () => {
  return useMemo(() => ({
    getStaggeredDelay: (index: number, baseDelay = 100): React.CSSProperties => ({
      animationDelay: `${index * baseDelay}ms`
    }),

    getCardHoverClass: (): string =>
      'group-hover:scale-[1.02] transition-all duration-500',

    getImageHoverClass: (): string =>
      'group-hover:scale-110 transition-transform duration-700',

    getGlowEffect: (category: string): string => {
      const gradient = EXPERIENCE_CATEGORY_COLORS[category as ExperienceCategory] ||
                      EXPERIENCE_CATEGORY_COLORS.adventure
      return `absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 rounded-3xl`
    }
  }), [])
}