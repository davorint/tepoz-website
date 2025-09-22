import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Locale } from '@/lib/i18n'
import {
  type BadgeType
} from '@/lib/experience-ui-constants'
import { useExperienceBadges } from '@/hooks/useExperienceUI'
import {
  Award,
  Leaf,
  Star,
  CheckCircle,
  Clock,
  Users,
  MapPin,
  Mountain
} from 'lucide-react'

export interface ExperienceBadgeProps {
  type: BadgeType | 'category' | 'intensity' | 'duration' | 'rating' | 'capacity' | 'location' | 'custom'
  locale: Locale
  variant?: 'default' | 'outline' | 'gradient'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
  children?: React.ReactNode

  // Custom badge props
  customGradient?: string
  customTextColor?: string
  customIcon?: React.ReactNode
  customText?: string

  // Specific badge data
  category?: string
  intensity?: string
  duration?: string
  rating?: number
  reviewCount?: number
  capacity?: number
  location?: string

  // Props for clickable badges
  onClick?: () => void
  disabled?: boolean
}

const ICON_MAP = {
  featured: Star,
  indigenous: () => <span className="text-current">🪶</span>,
  sustainable: Leaf,
  verified: Award,
  category: CheckCircle,
  intensity: Mountain,
  duration: Clock,
  rating: Star,
  capacity: Users,
  location: MapPin
}

const SIZE_CLASSES = {
  xs: 'text-xs px-2 py-0.5',
  sm: 'text-xs px-3 py-1',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-6 py-3'
}

const ExperienceBadge = forwardRef<HTMLSpanElement, ExperienceBadgeProps>(
  ({
    type,
    locale,
    variant = 'gradient',
    size = 'sm',
    className,
    children,
    customGradient,
    customTextColor,
    customIcon,
    customText,
    category,
    intensity,
    duration,
    rating,
    reviewCount,
    capacity,
    location,
    onClick,
    disabled = false,
    ...props
  }) => {
    const badges = useExperienceBadges(locale)

    // Get badge configuration based on type
    const getBadgeConfig = () => {
      switch (type) {
        case 'featured':
          return badges.getFeaturedBadge()
        case 'indigenous':
          return badges.getIndigenousBadge()
        case 'sustainable':
          return badges.getSustainableBadge()
        case 'verified':
          return badges.getVerifiedBadge()
        case 'custom':
          return {
            gradient: customGradient || 'from-gray-400 to-gray-500',
            textColor: customTextColor || 'text-white',
            icon: customIcon || '',
            text: customText || ''
          }
        default:
          return null
      }
    }

    // Get content based on type
    const getBadgeContent = () => {
      const IconComponent = ICON_MAP[type as keyof typeof ICON_MAP]

      switch (type) {
        case 'rating':
          if (rating !== undefined) {
            return (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="font-bold">{rating}</span>
                {reviewCount && (
                  <span className="opacity-70">({reviewCount})</span>
                )}
              </div>
            )
          }
          break

        case 'duration':
          if (duration) {
            return (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{duration}</span>
              </div>
            )
          }
          break

        case 'capacity':
          if (capacity) {
            return (
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>
                  {locale === 'es' ? 'Máx' : 'Max'} {capacity} {locale === 'es' ? 'personas' : 'people'}
                </span>
              </div>
            )
          }
          break

        case 'location':
          if (location) {
            return (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span className="truncate max-w-32">{location}</span>
              </div>
            )
          }
          break

        case 'intensity':
          if (intensity) {
            return (
              <div className="flex items-center gap-1">
                <Mountain className="w-3 h-3" />
                <span>{intensity}</span>
              </div>
            )
          }
          break

        case 'category':
          if (category) {
            return (
              <div className="flex items-center gap-1">
                {IconComponent && <IconComponent className="w-3 h-3" />}
                <span>{category}</span>
              </div>
            )
          }
          break
      }

      // Default: use configuration from BADGE_TYPES or custom
      const config = getBadgeConfig()
      if (config) {
        return (
          <div className="flex items-center gap-1">
            {config.icon && <span className="text-current">{config.icon}</span>}
            <span>{config.text}</span>
          </div>
        )
      }

      return children
    }

    const config = getBadgeConfig()
    const content = getBadgeContent()

    if (!content) {
      return null
    }

    // Handle different variants
    const getVariantClasses = () => {
      if (variant === 'outline') {
        return 'border border-gray-300 dark:border-white/30 text-gray-700 dark:text-white/80 bg-transparent'
      }

      if (variant === 'gradient' && config) {
        return cn(
          `bg-gradient-to-r ${config.gradient}`,
          config.textColor,
          'border-0 shadow-xl font-semibold'
        )
      }

      // Default variant
      return 'bg-gray-100/80 dark:bg-white/10 text-gray-700 dark:text-white/80 border border-gray-300 dark:border-white/20'
    }

    const badgeClasses = cn(
      SIZE_CLASSES[size],
      getVariantClasses(),
      onClick && !disabled && 'cursor-pointer hover:scale-105 transition-transform duration-200',
      disabled && 'opacity-50 cursor-not-allowed',
      className
    )

    const BadgeComponent = Badge

    return (
      <BadgeComponent
        className={badgeClasses}
        onClick={onClick && !disabled ? onClick : undefined}
        {...props}
      >
        {content}
      </BadgeComponent>
    )
  }
)

ExperienceBadge.displayName = "ExperienceBadge"

export { ExperienceBadge }
export default ExperienceBadge