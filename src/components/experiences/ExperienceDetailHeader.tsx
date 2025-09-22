'use client'

import { Locale } from '@/lib/i18n'
import { useExperienceUI } from '@/hooks/useExperienceUI'
import ExperienceBadge from '@/components/ui/ExperienceBadge'
import GlassmorphismCard from '@/components/ui/GlassmorphismCard'
import { cn } from '@/lib/utils'

export interface ExperienceDetailHeaderProps {
  locale: Locale
  title: string
  subtitle?: string
  description: string
  badge?: {
    icon: string
    text: string
  }
  stats?: Array<{
    icon: React.ComponentType<{ className?: string }>
    label: { es: string; en: string }
    value: string
    color: string
  }>
  difficulty?: {
    level: number // 1-5
    label: { es: string; en: string }
  }
  theme?: 'orange' | 'teal' | 'adventure' | 'spiritual' | 'wellness'
  className?: string
}

const THEME_CONFIGS = {
  orange: {
    badgeGradient: 'from-orange-400 to-red-400',
    titleGradient: 'from-orange-300 via-red-300 to-yellow-300',
    lineGradients: {
      left: 'from-transparent to-orange-400',
      right: 'from-transparent to-red-400'
    },
    difficultyColor: 'bg-orange-400'
  },
  teal: {
    badgeGradient: 'from-teal-400 to-cyan-400',
    titleGradient: 'from-teal-300 via-cyan-300 to-turquoise-300',
    lineGradients: {
      left: 'from-transparent to-teal-400',
      right: 'from-transparent to-cyan-400'
    },
    difficultyColor: 'bg-teal-400'
  },
  adventure: {
    badgeGradient: 'from-teal-400 to-cyan-400',
    titleGradient: 'from-teal-300 via-cyan-300 to-turquoise-300',
    lineGradients: {
      left: 'from-transparent to-teal-400',
      right: 'from-transparent to-cyan-400'
    },
    difficultyColor: 'bg-teal-400'
  },
  spiritual: {
    badgeGradient: 'from-orange-400 to-amber-400',
    titleGradient: 'from-orange-300 via-amber-300 to-yellow-300',
    lineGradients: {
      left: 'from-transparent to-orange-400',
      right: 'from-transparent to-amber-400'
    },
    difficultyColor: 'bg-orange-400'
  },
  wellness: {
    badgeGradient: 'from-green-400 to-emerald-400',
    titleGradient: 'from-green-300 via-emerald-300 to-teal-300',
    lineGradients: {
      left: 'from-transparent to-green-400',
      right: 'from-transparent to-emerald-400'
    },
    difficultyColor: 'bg-green-400'
  }
} as const

export default function ExperienceDetailHeader({
  locale,
  title,
  subtitle,
  description,
  badge,
  stats = [],
  difficulty,
  theme = 'orange',
  className
}: ExperienceDetailHeaderProps) {
  const { t } = useExperienceUI()
  const themeConfig = THEME_CONFIGS[theme]

  const renderDifficultyDots = (level: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <div
        key={index}
        className={cn(
          "w-4 h-4 rounded-full transition-colors duration-300",
          index < level ? themeConfig.difficultyColor : 'bg-white/20'
        )}
      />
    ))
  }


  return (
    <div className={cn("text-center mb-16", className)}>
      {/* Premium Badge */}
      {badge && (
        <div className="inline-flex items-center gap-3 mb-8">
          <div className={`h-px w-20 bg-gradient-to-r ${themeConfig.lineGradients.left}`} />
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r ${themeConfig.badgeGradient} blur-lg`} />
            <ExperienceBadge
              type="custom"
              locale={locale}
              customGradient={themeConfig.badgeGradient}
              customTextColor="text-white"
              customIcon={<span className="text-current">{badge.icon}</span>}
              customText={badge.text}
              variant="gradient"
              size="lg"
              className="relative px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl"
            />
          </div>
          <div className={`h-px w-20 bg-gradient-to-l ${themeConfig.lineGradients.right}`} />
        </div>
      )}

      {/* Title */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
        <span className="text-white drop-shadow-2xl">
          {title}
        </span>
        {subtitle && (
          <>
            <br />
            <span className={`bg-gradient-to-r ${themeConfig.titleGradient} bg-clip-text text-transparent drop-shadow-2xl`}>
              {subtitle}
            </span>
          </>
        )}
      </h1>

      {/* Description */}
      <p className="text-xl md:text-2xl text-white/80 font-light max-w-4xl mx-auto leading-relaxed mb-8">
        {description}
      </p>

      {/* Quick Stats */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <GlassmorphismCard
                key={index}
                level="card"
                className="p-6 shadow-2xl"
              >
                <Icon className={cn("w-8 h-8 mb-3 mx-auto", stat.color)} />
                <div className={cn("text-2xl font-bold mb-1", stat.color)}>
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm">
                  {locale === 'es' ? stat.label.es : stat.label.en}
                </div>
              </GlassmorphismCard>
            )
          })}
        </div>
      )}

      {/* Difficulty Level */}
      {difficulty && (
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="text-white/80 font-medium">
            {t('difficulty', locale)}
          </span>
          <div className="flex gap-1">
            {renderDifficultyDots(difficulty.level)}
          </div>
          <ExperienceBadge
            type="custom"
            locale={locale}
            customGradient={`${themeConfig.difficultyColor.replace('bg-', 'from-')}/20`}
            customTextColor={themeConfig.difficultyColor.replace('bg-', 'text-')}
            customText={locale === 'es' ? difficulty.label.es : difficulty.label.en}
            variant="gradient"
            className={`border ${themeConfig.difficultyColor.replace('bg-', 'border-')}/30`}
          />
        </div>
      )}
    </div>
  )
}

// Convenience components for specific experience types
export function AdventureDetailHeader(props: Omit<ExperienceDetailHeaderProps, 'theme'>) {
  return <ExperienceDetailHeader {...props} theme="adventure" />
}

export function SpiritualDetailHeader(props: Omit<ExperienceDetailHeaderProps, 'theme'>) {
  return <ExperienceDetailHeader {...props} theme="spiritual" />
}

export function WellnessDetailHeader(props: Omit<ExperienceDetailHeaderProps, 'theme'>) {
  return <ExperienceDetailHeader {...props} theme="wellness" />
}