'use client'

import { Button } from '@/components/ui/button'
import { Locale } from '@/lib/i18n'
import { useExperienceUI } from '@/hooks/useExperienceUI'
import { GLASSMORPHISM_STYLES } from '@/lib/experience-ui-constants'
import { cn } from '@/lib/utils'
import {
  Phone,
  Globe,
  Heart,
  MapPin,
  Share2,
  Bookmark,
  Calendar,
  MessageCircle
} from 'lucide-react'

export interface ExperienceActionsProps {
  phone?: string
  website?: string
  locale: Locale

  // New action types
  onFavorite?: () => void
  onViewOnMap?: () => void
  onShare?: () => void
  onBookmark?: () => void
  onBooking?: () => void
  onContact?: () => void

  // State props
  isFavorited?: boolean
  isBookmarked?: boolean

  // Layout props
  layout?: 'horizontal' | 'vertical' | 'compact'
  size?: 'sm' | 'md' | 'lg'
  style?: 'glass' | 'solid' | 'outline'

  // Visual props
  showLabels?: boolean
  className?: string
}

export default function ExperienceActions({
  phone,
  website,
  locale,
  onFavorite,
  onViewOnMap,
  onShare,
  onBookmark,
  onBooking,
  onContact,
  isFavorited = false,
  isBookmarked = false,
  layout = 'horizontal',
  size = 'sm',
  style = 'glass',
  showLabels = true,
  className
}: ExperienceActionsProps) {
  const { t } = useExperienceUI()

  const handlePhoneClick = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (phone) {
      window.open(`tel:${phone}`, '_self')
    }
  }

  const handleWebsiteClick = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (website) {
      window.open(website, '_blank', 'noopener,noreferrer')
    }
  }

  const handleActionClick = (e: React.MouseEvent, action?: () => void) => {
    e.stopPropagation()
    action?.()
  }

  const getButtonStyle = () => {
    switch (style) {
      case 'glass':
        return cn(
          GLASSMORPHISM_STYLES.button,
          "text-gray-700 dark:text-white hover:bg-white/30 dark:hover:bg-white/30"
        )
      case 'solid':
        return "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
      case 'outline':
        return "border border-gray-300 dark:border-white/30 text-gray-700 dark:text-white bg-transparent hover:bg-gray-100/50 dark:hover:bg-white/10"
      default:
        return ""
    }
  }

  const getButtonSize = () => {
    switch (size) {
      case 'sm':
        return showLabels ? 'px-3 py-2 text-sm' : 'p-2'
      case 'md':
        return showLabels ? 'px-4 py-2.5 text-base' : 'p-2.5'
      case 'lg':
        return showLabels ? 'px-6 py-3 text-lg' : 'p-3'
      default:
        return 'px-3 py-2 text-sm'
    }
  }

  const buttonClasses = cn(
    getButtonStyle(),
    getButtonSize(),
    "transition-all duration-200 hover:scale-105 active:scale-95",
    showLabels ? 'flex-1' : 'aspect-square',
    "flex items-center justify-center gap-2"
  )

  const iconSize = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'

  const actions = [
    // Primary actions
    onBooking && {
      key: 'booking',
      icon: <Calendar className={iconSize} />,
      label: t('bookNow', locale),
      onClick: onBooking,
      primary: true
    },

    // Contact actions
    phone && {
      key: 'phone',
      icon: <Phone className={iconSize} />,
      label: t('call', locale),
      onClick: handlePhoneClick
    },

    website && {
      key: 'website',
      icon: <Globe className={iconSize} />,
      label: t('website', locale),
      onClick: handleWebsiteClick
    },

    onContact && {
      key: 'contact',
      icon: <MessageCircle className={iconSize} />,
      label: locale === 'es' ? 'Contactar' : 'Contact',
      onClick: onContact
    },

    // Interactive actions
    onViewOnMap && {
      key: 'map',
      icon: <MapPin className={iconSize} />,
      label: t('viewOnMap', locale),
      onClick: onViewOnMap
    },

    onFavorite && {
      key: 'favorite',
      icon: <Heart className={cn(iconSize, isFavorited && 'fill-current text-red-500')} />,
      label: locale === 'es' ? 'Favorito' : 'Favorite',
      onClick: onFavorite
    },

    onBookmark && {
      key: 'bookmark',
      icon: <Bookmark className={cn(iconSize, isBookmarked && 'fill-current text-blue-500')} />,
      label: locale === 'es' ? 'Guardar' : 'Save',
      onClick: onBookmark
    },

    onShare && {
      key: 'share',
      icon: <Share2 className={iconSize} />,
      label: locale === 'es' ? 'Compartir' : 'Share',
      onClick: onShare
    }
  ].filter(Boolean) as Array<{
    key: string
    icon: React.ReactNode
    label: string
    onClick: () => void
    primary?: boolean
  }>

  if (actions.length === 0) {
    return null
  }

  const layoutClasses = {
    horizontal: 'flex gap-2',
    vertical: 'flex flex-col gap-2',
    compact: 'flex gap-1'
  }

  return (
    <div className={cn(layoutClasses[layout], className)}>
      {actions.map((action) => (
        <Button
          key={action.key}
          className={cn(
            buttonClasses,
            action.primary && style === 'glass' &&
            "bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white border-0 shadow-xl font-semibold"
          )}
          onClick={(e) => handleActionClick(e, action.onClick)}
          title={action.label}
        >
          {action.icon}
          {showLabels && <span>{action.label}</span>}
        </Button>
      ))}
    </div>
  )
}