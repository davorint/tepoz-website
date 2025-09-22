'use client'

import { Locale } from '@/lib/i18n'
import { useExperienceUI } from '@/hooks/useExperienceUI'
import { EXPERIENCE_CATEGORY_COLORS } from '@/lib/experience-ui-constants'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  Compass,
  Mountain,
  Sparkles,
  Leaf,
  Camera
} from 'lucide-react'

export interface ExperienceCategoryTabsProps {
  locale: Locale
  selectedCategory: string
  onCategoryChange: (category: string) => void
  getCategoryCount: (category: string) => number
  className?: string
}


const CATEGORY_CONFIG = [
  {
    id: 'all',
    nameKey: 'all',
    icon: Compass,
    gradient: 'from-teal-500 to-cyan-500'
  },
  {
    id: 'adventure',
    nameKey: 'adventure',
    icon: Mountain,
    gradient: EXPERIENCE_CATEGORY_COLORS.adventure
  },
  {
    id: 'spiritual',
    nameKey: 'spiritual',
    icon: Sparkles,
    gradient: EXPERIENCE_CATEGORY_COLORS.spiritual
  },
  {
    id: 'wellness',
    nameKey: 'wellness',
    icon: Leaf,
    gradient: EXPERIENCE_CATEGORY_COLORS.wellness
  },
  {
    id: 'cultural',
    nameKey: 'cultural',
    icon: Camera,
    gradient: EXPERIENCE_CATEGORY_COLORS.cultural
  }
] as const

export default function ExperienceCategoryTabs({
  locale,
  selectedCategory,
  onCategoryChange,
  getCategoryCount,
  className
}: ExperienceCategoryTabsProps) {
  const { t } = useExperienceUI()

  const getCategoryName = (categoryKey: string) => {
    const categoryNames = {
      all: t('all', locale),
      adventure: locale === 'es' ? 'Aventura' : 'Adventure',
      spiritual: locale === 'es' ? 'Espiritual' : 'Spiritual',
      wellness: locale === 'es' ? 'Bienestar' : 'Wellness',
      cultural: locale === 'es' ? 'Cultural' : 'Cultural'
    }
    return categoryNames[categoryKey as keyof typeof categoryNames] || categoryKey
  }

  return (
    <div className={cn("mb-12", className)}>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {CATEGORY_CONFIG.map((category) => {
          const Icon = category.icon
          const isActive = selectedCategory === category.id
          const count = getCategoryCount(category.id)

          return (
            <CategoryTab
              key={category.id}
              name={getCategoryName(category.nameKey)}
              icon={Icon}
              gradient={category.gradient}
              count={count}
              locale={locale}
              isActive={isActive}
              onClick={() => onCategoryChange(category.id)}
            />
          )
        })}
      </div>
    </div>
  )
}

interface CategoryTabProps {
  name: string
  icon: React.ComponentType<{ className?: string }>
  gradient: string
  count: number
  locale: Locale
  isActive: boolean
  onClick: () => void
}

function CategoryTab({
  name,
  icon: Icon,
  gradient,
  count,
  locale,
  isActive,
  onClick
}: CategoryTabProps) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "relative group h-auto p-0 bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-slate-200/50 dark:border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]",
        isActive && "ring-2 ring-teal-400/50"
      )}
    >
      {/* Glow effect on hover */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 rounded-2xl",
        `bg-gradient-to-r ${gradient}`
      )} />

      <div className="relative p-6 text-center">
        {/* Icon with gradient background */}
        <div className={cn(
          "w-16 h-16 rounded-full bg-gradient-to-r mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg",
          gradient
        )}>
          <Icon className="h-7 w-7 text-white" />
        </div>

        {/* Category name */}
        <h3 className={cn(
          "font-bold text-lg mb-2 transition-all duration-300",
          isActive
            ? `bg-gradient-to-r ${gradient} bg-clip-text text-transparent`
            : "text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text"
        )}>
          {name}
        </h3>

        {/* Count badge */}
        <div className="flex items-center justify-center gap-2">
          <Badge
            variant="outline"
            className={cn(
              "text-xs transition-all duration-300",
              isActive
                ? "border-teal-400/50 text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20"
                : "border-slate-300 dark:border-white/30 text-slate-600 dark:text-white/70 group-hover:border-teal-400/30"
            )}
          >
            {count} {locale === 'es' ? 'experiencias' : 'experiences'}
          </Badge>
        </div>

        {/* Active indicator */}
        {isActive && (
          <div className={cn(
            "absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-gradient-to-r transition-all duration-300",
            gradient
          )} />
        )}
      </div>
    </Button>
  )
}

// Compact version for smaller spaces
export function ExperienceCategoryTabsCompact({
  locale,
  selectedCategory,
  onCategoryChange,
  getCategoryCount,
  className
}: ExperienceCategoryTabsProps) {
  const { t } = useExperienceUI()

  const getCategoryName = (categoryKey: string) => {
    const categoryNames = {
      all: t('all', locale),
      adventure: locale === 'es' ? 'Aventura' : 'Adventure',
      spiritual: locale === 'es' ? 'Espiritual' : 'Spiritual',
      wellness: locale === 'es' ? 'Bienestar' : 'Wellness',
      cultural: locale === 'es' ? 'Cultural' : 'Cultural'
    }
    return categoryNames[categoryKey as keyof typeof categoryNames] || categoryKey
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {CATEGORY_CONFIG.map((category) => {
        const Icon = category.icon
        const isActive = selectedCategory === category.id
        const count = getCategoryCount(category.id)

        return (
          <Button
            key={category.id}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "transition-all duration-300",
              isActive && `bg-gradient-to-r ${category.gradient} hover:opacity-90`
            )}
          >
            <Icon className="w-4 h-4 mr-2" />
            {getCategoryName(category.nameKey)}
            <Badge variant="outline" className="ml-2 text-xs">
              {count}
            </Badge>
          </Button>
        )
      })}
    </div>
  )
}