import { Locale } from '@/lib/i18n'

// Color gradients for experience categories
export const EXPERIENCE_CATEGORY_COLORS = {
  adventure: 'from-teal-400 to-cyan-400',
  spiritual: 'from-orange-400 to-amber-400',
  wellness: 'from-green-400 to-emerald-400',
  cultural: 'from-blue-400 to-indigo-400',
  nature: 'from-lime-400 to-green-400',
  food: 'from-yellow-400 to-orange-400',
  art: 'from-violet-400 to-fuchsia-400',
  photography: 'from-pink-400 to-rose-400',
  healing: 'from-purple-400 to-pink-400'
} as const

// Intensity level colors and labels
export const INTENSITY_COLORS = {
  low: 'bg-green-500/80',
  medium: 'bg-yellow-500/80',
  high: 'bg-orange-500/80',
  extreme: 'bg-red-500/80'
} as const

export const INTENSITY_LABELS = {
  low: { es: 'Suave', en: 'Low' },
  medium: { es: 'Medio', en: 'Medium' },
  high: { es: 'Alto', en: 'High' },
  extreme: { es: 'Extremo', en: 'Extreme' }
} as const

// Badge type colors and labels
export const BADGE_TYPES = {
  featured: {
    gradient: 'from-yellow-400 to-orange-400',
    textColor: 'text-black',
    icon: '⭐',
    label: { es: 'Destacada', en: 'Featured' }
  },
  indigenous: {
    gradient: 'from-amber-500 to-orange-500',
    textColor: 'text-white',
    icon: '🪶',
    label: { es: 'Indígena', en: 'Indigenous' }
  },
  sustainable: {
    gradient: 'from-green-500 to-emerald-500',
    textColor: 'text-white',
    icon: '🌱',
    label: { es: 'Sostenible', en: 'Sustainable' }
  },
  verified: {
    gradient: 'from-blue-400 to-indigo-400',
    textColor: 'text-white',
    icon: '✓',
    label: { es: 'Verificado', en: 'Verified' }
  }
} as const

// Experience type labels
export const EXPERIENCE_TYPE_LABELS = {
  individual: { es: 'Individual', en: 'Individual' },
  group: { es: 'Grupo', en: 'Group' },
  private: { es: 'Privado', en: 'Private' }
} as const

// Duration labels
export const DURATION_LABELS = {
  short: { es: 'Corta (1-3 hrs)', en: 'Short (1-3 hrs)' },
  'half-day': { es: 'Medio día (3-6 hrs)', en: 'Half day (3-6 hrs)' },
  'full-day': { es: 'Día completo (6+ hrs)', en: 'Full day (6+ hrs)' },
  'multi-day': { es: 'Varios días', en: 'Multi-day' }
} as const

// Price range labels
export const PRICE_RANGE_LABELS = {
  budget: { es: 'Económico ($200-500)', en: 'Budget ($200-500)' },
  mid: { es: 'Medio ($500-1000)', en: 'Mid ($500-1000)' },
  luxury: { es: 'Lujo ($1000-2000)', en: 'Luxury ($1000-2000)' },
  premium: { es: 'Premium ($2000+)', en: 'Premium ($2000+)' }
} as const

// Common UI text translations
export const UI_TRANSLATIONS = {
  // General
  all: { es: 'Todas', en: 'All' },
  featured: { es: 'Destacadas', en: 'Featured' },
  verified: { es: 'Verificado', en: 'Verified' },
  sustainable: { es: 'Sostenible', en: 'Sustainable' },
  traditional: { es: 'Tradicional', en: 'Traditional' },

  // Actions
  viewDetails: { es: 'Ver Detalles', en: 'View Details' },
  bookNow: { es: 'Más Información', en: 'More Information' },
  call: { es: 'Llamar', en: 'Call' },
  website: { es: 'Sitio Web', en: 'Website' },
  viewOnMap: { es: 'Ver en mapa', en: 'View on map' },

  // Filters
  category: { es: 'Categoría', en: 'Category' },
  atmosphere: { es: 'Ambiente', en: 'Atmosphere' },
  type: { es: 'Tipo', en: 'Type' },
  price: { es: 'Precio', en: 'Price' },
  duration: { es: 'Duración', en: 'Duration' },
  filters: { es: 'Filtros', en: 'Filters' },
  clearFilters: { es: 'Limpiar filtros', en: 'Clear filters' },

  // Misc
  by: { es: 'Por:', en: 'By:' },
  perPerson: { es: 'por persona', en: 'per person' },
  maxPeople: { es: 'Máx', en: 'Max' },
  people: { es: 'personas', en: 'people' },
  flexibleGroup: { es: 'Grupo flexible', en: 'Flexible group' },
  intensity: { es: 'Intensidad:', en: 'Intensity:' },
  difficulty: { es: 'Dificultad:', en: 'Difficulty:' }
} as const

// Common glassmorphism styles
export const GLASSMORPHISM_STYLES = {
  light: 'bg-white/95 dark:bg-white/10 backdrop-blur-xl border border-gray-200/50 dark:border-white/20',
  medium: 'bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-slate-200/50 dark:border-white/20',
  heavy: 'bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/50 dark:border-white/10',
  card: 'bg-white/10 backdrop-blur-xl border border-white/20',
  button: 'bg-white/20 backdrop-blur-sm border border-white/30'
} as const

// Animation classes
export const ANIMATION_CLASSES = {
  fadeInUp: 'animate-fade-in-up',
  float: 'animate-float',
  floatDelay: 'animate-float-delay',
  floatSlow: 'animate-float-slow',
  scaleHover: 'hover:scale-[1.02] transition-transform duration-300',
  glowHover: 'hover:shadow-3xl transition-shadow duration-500'
} as const

// Gradient orb configurations for backgrounds
export const GRADIENT_ORBS = {
  teal: {
    position: 'top-1/4 -left-20',
    size: 'w-96 h-96',
    color: 'bg-teal-500/10 dark:bg-teal-500/20',
    animation: 'animate-float'
  },
  cyan: {
    position: 'top-3/4 -right-20',
    size: 'w-96 h-96',
    color: 'bg-cyan-500/10 dark:bg-cyan-500/20',
    animation: 'animate-float-delay'
  },
  turquoise: {
    position: 'bottom-1/4 left-1/3',
    size: 'w-96 h-96',
    color: 'bg-turquoise-500/10 dark:bg-turquoise-500/20',
    animation: 'animate-float-slow'
  }
} as const

// Helper function to get localized label
export const getLocalizedLabel = (
  labels: Record<string, { es: string; en: string }>,
  key: string,
  locale: Locale
): string => {
  return labels[key]?.[locale] || key
}

// Type exports for better TypeScript support
export type ExperienceCategory = keyof typeof EXPERIENCE_CATEGORY_COLORS
export type IntensityLevel = keyof typeof INTENSITY_COLORS
export type BadgeType = keyof typeof BADGE_TYPES
export type ExperienceType = keyof typeof EXPERIENCE_TYPE_LABELS
export type DurationLevel = keyof typeof DURATION_LABELS
export type PriceRange = keyof typeof PRICE_RANGE_LABELS
export type GlassmorphismLevel = keyof typeof GLASSMORPHISM_STYLES