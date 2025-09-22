import React, { memo, useCallback, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { Experience, ExperienceService } from '@/lib/experiences'
import { Button } from '@/components/ui/button'
import GlassmorphismCard from '@/components/ui/GlassmorphismCard'
import ExperienceBadge from '@/components/ui/ExperienceBadge'
import ExperienceActions from './ExperienceActions'
import { useExperienceUI, useExperienceAnimations } from '@/hooks/useExperienceUI'
import {
  MapPin,
  Users,
  Mountain,
  Clock
} from 'lucide-react'

interface ExperienceCardProps {
  experience: Experience
  locale: Locale
  viewMode?: 'grid' | 'list'
  animationDelay?: number
  onViewOnMap?: (experience: Experience) => void
}

const ExperienceCard = memo<ExperienceCardProps>(function ExperienceCard({
  experience,
  locale,
  viewMode = 'grid',
  animationDelay = 0,
  onViewOnMap
}) {
  const { getCategoryGradient, getIntensityColor, getIntensityLabel, t } = useExperienceUI()
  const { getStaggeredDelay, getGlowEffect } = useExperienceAnimations()

  // Memoized computed values
  const computedValues = useMemo(() => ({
    categoryGradient: getCategoryGradient(experience.category),
    intensityColor: getIntensityColor(experience.intensity),
    intensityLabel: getIntensityLabel(experience.intensity, locale),
    glowEffect: getGlowEffect(experience.category),
    experienceName: ExperienceService.getExperienceName(experience, locale),
    experienceShortDescription: ExperienceService.getExperienceShortDescription(experience, locale),
    categoryLabel: ExperienceService.getExperienceCategoryLabel(experience.category, locale),
    experienceSlug: ExperienceService.generateSlug(experience, locale),
    viewDetailsText: t('viewDetails', locale),
    byText: t('by', locale)
  }), [
    experience,
    locale,
    getCategoryGradient,
    getIntensityColor,
    getIntensityLabel,
    getGlowEffect,
    t
  ])

  // Memoized event handlers
  const handleFavoriteClick = useCallback(() => {
    console.log('Heart clicked for experience:', experience.id)
    // TODO: Implement favorite functionality with proper state management
  }, [experience.id])

  const handleCardClick = useCallback(() => {
    if (experience.latitude && experience.longitude && onViewOnMap) {
      onViewOnMap(experience)
    }
  }, [experience, onViewOnMap])

  const handleViewOnMapClick = useCallback(() => {
    if (onViewOnMap) {
      onViewOnMap(experience)
    }
  }, [experience, onViewOnMap])

  // Memoized style calculations
  const cardStyles = useMemo(() => ({
    animationStyle: getStaggeredDelay(animationDelay / 100),
    cardClassName: `cursor-pointer ${viewMode === 'list' ? 'flex' : ''}`,
    imageClassName: `relative overflow-hidden ${
      viewMode === 'list' ? 'w-80 h-48' : 'h-64'
    }`
  }), [viewMode, animationDelay, getStaggeredDelay])

  return (
    <div
      className="group relative animate-fade-in-up transition-all duration-300"
      style={cardStyles.animationStyle}
      data-experience-id={experience.id}
    >
      {/* Card glow effect */}
      <div className={computedValues.glowEffect} />

      <GlassmorphismCard
        level="light"
        glow={true}
        glowColor={`bg-gradient-to-r ${computedValues.categoryGradient}`}
        className={cardStyles.cardClassName}
        onClick={handleCardClick}
        role="article"
        aria-label={`${computedValues.experienceName} - ${computedValues.experienceShortDescription}`}
      >
        {/* Experience Badges */}
        <div className="absolute top-4 left-4 z-10 space-y-2">
          {experience.featured && (
            <ExperienceBadge type="featured" locale={locale} />
          )}
          {experience.indigenous && (
            <ExperienceBadge type="indigenous" locale={locale} />
          )}
          {experience.sustainable && !experience.featured && !experience.indigenous && (
            <ExperienceBadge type="sustainable" locale={locale} />
          )}
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4 z-10">
          <ExperienceBadge
            type="custom"
            locale={locale}
            customGradient="from-gray-100 to-gray-200 dark:from-white/20 dark:to-white/10"
            customTextColor="text-gray-900 dark:text-white"
            customText={experience.price[locale]}
            variant="gradient"
            size="sm"
          />
        </div>

        {/* Experience Image */}
        <div className={cardStyles.imageClassName}>
          <Image
            src={experience.images[0]}
            alt={computedValues.experienceName}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes={viewMode === 'list' ? '320px' : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
            priority={animationDelay < 300} // Prioritize first few images
          />

          {/* Premium accent gradient bar */}
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${computedValues.categoryGradient} opacity-80 group-hover:h-2 transition-all duration-500`} />

          {/* Duration Badge */}
          <div className="absolute bottom-4 left-4">
            <ExperienceBadge
              type="custom"
              locale={locale}
              customIcon={<Clock className="w-3 h-3" />}
              customText={experience.duration[locale]}
              customGradient="from-black/50 to-black/50"
              customTextColor="text-white"
              variant="gradient"
              size="xs"
            />
          </div>

          {/* Intensity Level */}
          <div className="absolute bottom-4 right-4">
            <ExperienceBadge
              type="custom"
              locale={locale}
              customIcon={<Mountain className="w-3 h-3" />}
              customText={computedValues.intensityLabel}
              customGradient={computedValues.intensityColor.replace('bg-', 'from-').replace('/80', '/80 to-') + computedValues.intensityColor.replace('bg-', '').replace('/80', '/80')}
              customTextColor="text-white"
              variant="gradient"
              size="xs"
            />
          </div>
        </div>

        <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-teal-600 dark:group-hover:from-teal-300 group-hover:to-cyan-600 dark:group-hover:to-cyan-300 transition-all">
              {computedValues.experienceName}
            </h3>

            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <ExperienceBadge
                type="rating"
                locale={locale}
                rating={experience.rating}
                reviewCount={experience.reviewCount}
                variant="outline"
              />

              <ExperienceBadge
                type="category"
                locale={locale}
                category={computedValues.categoryLabel}
                customGradient={computedValues.categoryGradient}
                customTextColor="text-white"
                variant="gradient"
                size="xs"
              />

              <ExperienceBadge
                type="custom"
                locale={locale}
                customText={experience.type === 'individual' ? (locale === 'es' ? 'Individual' : 'Individual') :
                 experience.type === 'group' ? (locale === 'es' ? 'Grupo' : 'Group') :
                 (locale === 'es' ? 'Privado' : 'Private')}
                variant="outline"
                size="xs"
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-white/70 text-sm mb-4 line-clamp-2">
            {computedValues.experienceShortDescription}
          </p>

          {/* Highlights */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {experience.highlights[locale].slice(0, viewMode === 'list' ? 3 : 2).map((highlight) => (
                <ExperienceBadge
                  key={highlight}
                  type="custom"
                  locale={locale}
                  customText={highlight}
                  variant="outline"
                  size="xs"
                />
              ))}
              {experience.highlights[locale].length > (viewMode === 'list' ? 3 : 2) && (
                <ExperienceBadge
                  type="custom"
                  locale={locale}
                  customText={`+${experience.highlights[locale].length - (viewMode === 'list' ? 3 : 2)}`}
                  variant="outline"
                  size="xs"
                />
              )}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex items-center text-gray-600 dark:text-white/70">
              <MapPin className="w-4 h-4 mr-2 text-teal-500 dark:text-teal-400" aria-hidden="true" />
              <span className="line-clamp-1">{experience.location[locale]}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-white/70">
              <Users className="w-4 h-4 mr-2 text-teal-500 dark:text-teal-400" aria-hidden="true" />
              {experience.maxParticipants ?
                `${locale === 'es' ? 'Máx' : 'Max'} ${experience.maxParticipants} ${locale === 'es' ? 'personas' : 'people'}` :
                locale === 'es' ? 'Grupo flexible' : 'Flexible group'
              }
            </div>
          </div>

          {/* Special Features */}
          <div className="flex flex-wrap gap-1 mb-4">
            {experience.verified && (
              <ExperienceBadge type="verified" locale={locale} size="xs" />
            )}
            {experience.sustainable && (
              <ExperienceBadge type="sustainable" locale={locale} size="xs" />
            )}
            {experience.indigenous && (
              <ExperienceBadge type="indigenous" locale={locale} size="xs" />
            )}
          </div>

          {/* Provider Info - Grid View Only */}
          {viewMode === 'grid' && (
            <div className="mb-4 text-sm">
              <div className="flex items-center text-gray-500 dark:text-white/60">
                <span>{computedValues.byText} </span>
                <span className="font-medium text-gray-700 dark:text-white/80 ml-1">{experience.provider.name}</span>
                {experience.provider.certification && (
                  <ExperienceBadge
                    type="custom"
                    locale={locale}
                    customText={experience.provider.certification}
                    variant="outline"
                    size="xs"
                    className="ml-2"
                  />
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className={`flex gap-3 ${viewMode === 'list' ? 'mt-auto' : ''}`}>
            <Link
              href={`/${locale}/experience/${computedValues.experienceSlug}`}
              className="flex-1"
              onClick={(e) => e.stopPropagation()}
            >
              <Button className="w-full bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white border-0 shadow-xl font-semibold">
                {computedValues.viewDetailsText}
              </Button>
            </Link>

            <ExperienceActions
              phone={experience.phone}
              website={experience.website}
              locale={locale}
              onFavorite={handleFavoriteClick}
              onViewOnMap={experience.latitude && experience.longitude ? handleViewOnMapClick : undefined}
              layout="compact"
              size="sm"
              style="glass"
              showLabels={false}
              className="flex-shrink-0"
            />
          </div>
        </div>
      </GlassmorphismCard>
    </div>
  )
})

export default ExperienceCard