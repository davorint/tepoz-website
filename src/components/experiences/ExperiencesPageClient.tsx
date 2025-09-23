'use client'

import { useState, useEffect, lazy } from 'react'
import { Locale } from '@/lib/i18n'
import { Experience } from '@/lib/experiences'
import { useExperienceFilters } from '@/hooks/useExperienceFilters'
import type { ExperienceFiltersState } from '@/hooks/useExperienceFilters'

// Critical components - load immediately
import ExperienceBackground from '@/components/ui/ExperienceBackground'
import GlassmorphismCard from '@/components/ui/GlassmorphismCard'
import ExperienceFilters from './ExperienceFilters'
import ExperienceCategoryTabs from './ExperienceCategoryTabs'
import ExperienceResults from './ExperienceResults'
import TepoztlanHillshade from './TepoztlanHillshade'

// Lazy load below-the-fold components
import LazySection from './LazySection'
const LazyNewsletterSection = lazy(() => import('@/components/experiences/NewsletterSection'))
const LazyProviderCTASection = lazy(() => import('@/components/experiences/ProviderCTASection'))

// UI components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  Compass,
  Mountain,
  Home
} from 'lucide-react'
import Link from 'next/link'

interface ExperiencesPageClientProps {
  locale: Locale
}

export default function ExperiencesPageClient({ locale }: ExperiencesPageClientProps) {
  const [isClient, setIsClient] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [mapFlyToExperience, setMapFlyToExperience] = useState<((experience: Experience) => void) | null>(null)

  // Use our new filters hook
  const {
    filters,
    filteredExperiences,
    isLoading,
    actions,
    hasActiveFilters,
    totalCount,
    getCategoryCount
  } = useExperienceFilters({ locale })

  // Load experiences on component mount - avoiding hydration issues
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Show loading state during hydration
  if (!isClient) {
    return (
      <ExperienceBackground theme="teal" animated={false}>
        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
          <div className="text-slate-900 dark:text-white text-xl">
            {locale === 'es' ? 'Cargando experiencias...' : 'Loading experiences...'}
          </div>
        </div>
      </ExperienceBackground>
    )
  }

  return (
    <ExperienceBackground theme="teal" pattern="none" intensity="medium">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb className="text-slate-700 dark:text-white/70">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${locale}`} className="flex items-center gap-1.5 hover:text-teal-500 dark:hover:text-teal-400 transition-colors">
                    <Home className="w-4 h-4" />
                    {locale === 'es' ? 'Inicio' : 'Home'}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center gap-1.5 font-medium text-teal-600 dark:text-teal-400">
                  ⛰️ {locale === 'es' ? 'Experiencias' : 'Experiences'}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6 p-1 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-3">
              <Compass className="h-8 w-8 text-white" />
            </div>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-turquoise-600 dark:from-teal-300 dark:via-cyan-300 dark:to-turquoise-300 bg-clip-text text-transparent">
              {locale === 'es' ? 'Experiencias en Tepoztlán' : 'Experiences in Tepoztlán'}
            </span>
          </h1>

          <p className="text-xl text-slate-700 dark:text-white/70 max-w-3xl mx-auto leading-relaxed">
            {locale === 'es'
              ? 'Vive aventuras transformadoras, conecta con la naturaleza mística y descubre la magia ancestral de Tepoztlán a través de experiencias únicas e inolvidables.'
              : 'Live transformative adventures, connect with mystical nature and discover the ancient magic of Tepoztlán through unique and unforgettable experiences.'
            }
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <ExperienceFilters
            locale={locale}
            filters={filters}
            onFiltersChange={(newFilters) => {
              Object.entries(newFilters).forEach(([key, value]) => {
                switch (key) {
                  case 'searchQuery':
                    actions.setSearchQuery(value as string)
                    break
                  case 'selectedCategory':
                    actions.setSelectedCategory(value as string)
                    break
                  case 'selectedAtmosphere':
                    actions.setSelectedAtmosphere(value as string)
                    break
                  case 'selectedType':
                    actions.setSelectedType(value as string)
                    break
                  case 'selectedPriceRange':
                    actions.setSelectedPriceRange(value as string)
                    break
                  case 'selectedDuration':
                    actions.setSelectedDuration(value as string)
                    break
                  case 'featuredOnly':
                    actions.setFeaturedOnly(value as boolean)
                    break
                  case 'sortBy':
                    actions.setSortBy(value as ExperienceFiltersState['sortBy'])
                    break
                  case 'userLocation':
                    actions.setUserLocation(value as [number, number] | null)
                    break
                }
              })
            }}
            onClearFilters={actions.clearFilters}
            hasActiveFilters={hasActiveFilters}
            userLocation={filters.userLocation}
          />
        </div>

        {/* Category Quick Access */}
        <ExperienceCategoryTabs
          locale={locale}
          selectedCategory={filters.selectedCategory}
          onCategoryChange={actions.setSelectedCategory}
          getCategoryCount={getCategoryCount}
        />

        {/* Experience Results */}
        <ExperienceResults
          experiences={filteredExperiences}
          totalCount={totalCount}
          locale={locale}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          hasActiveFilters={hasActiveFilters}
          isLoading={isLoading}
          onViewOnMap={(experience) => {
            if (mapFlyToExperience) {
              mapFlyToExperience(experience)
              // Scroll to map section
              const mapSection = document.querySelector('.hillshade-map-section')
              if (mapSection) {
                mapSection.scrollIntoView({ behavior: 'smooth' })
              }
            }
          }}
          sortBy={filters.sortBy}
          onSortChange={(sortBy: string) => actions.setSortBy(sortBy as ExperienceFiltersState['sortBy'])}
        />

        {/* Interactive Hillshade Map Section */}
        <div className="mb-16 hillshade-map-section">
          <GlassmorphismCard level="medium" shadow="2xl" className="overflow-hidden">
            <div className="p-6 pb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-2">
                  <Mountain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {locale === 'es' ? 'Explora el Valle Mágico' : 'Explore the Magic Valley'}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-white/70">
                    {locale === 'es'
                      ? 'Descubre la majestuosa topografía de Tepoztlán y sus alrededores'
                      : 'Discover the majestic topography of Tepoztlán and its surroundings'
                    }
                  </p>
                </div>
              </div>
            </div>
            <TepoztlanHillshade
              className="w-full"
              height="575px"
              locale={locale}
              experiences={filteredExperiences}
              showGeocoding={true}
              showSidebar={false}
              onLocationSearch={(query) => {
                actions.setSearchQuery(query)
                // Scroll to results section
                setTimeout(() => {
                  const resultsSection = document.querySelector('.experiences-results')
                  if (resultsSection) {
                    resultsSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }, 100)
              }}
              onExperienceSelect={(experience) => {
                // Scroll to the selected experience card
                setTimeout(() => {
                  const experienceCard = document.querySelector(`[data-experience-id="${experience.id}"]`)
                  if (experienceCard) {
                    experienceCard.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    // Add a temporary highlight effect
                    experienceCard.classList.add('ring-4', 'ring-teal-400/50')
                    setTimeout(() => {
                      experienceCard.classList.remove('ring-4', 'ring-teal-400/50')
                    }, 3000)
                  }
                }, 100)
              }}
              onUserLocationSet={(location) => {
                actions.setUserLocation(location)
                // Automatically sort by distance when user location is set
                actions.setSortBy('distance')
              }}
              onMapReady={(flyToFn) => {
                setMapFlyToExperience(() => flyToFn)
              }}
            />
          </GlassmorphismCard>
        </div>

        {/* Viewport-based lazy loaded CTA Section for Experience Providers */}
        <LazySection
          fallback={
            <div className="mb-16">
              <div className="bg-gradient-to-r from-teal-100/20 to-cyan-100/20 dark:from-teal-400/5 dark:to-cyan-400/5 p-12 max-w-4xl mx-auto rounded-3xl animate-pulse">
                <div className="h-32 bg-white/20 dark:bg-white/5 rounded-xl"></div>
              </div>
            </div>
          }
          rootMargin="150px"
        >
          <LazyProviderCTASection locale={locale} />
        </LazySection>

        {/* Viewport-based lazy loaded Newsletter Section */}
        <LazySection
          fallback={
            <div className="text-center">
              <div className="p-8 max-w-2xl mx-auto bg-white/10 dark:bg-white/5 rounded-3xl animate-pulse">
                <div className="h-24 bg-white/20 dark:bg-white/5 rounded-xl"></div>
              </div>
            </div>
          }
          rootMargin="200px"
        >
          <LazyNewsletterSection locale={locale} />
        </LazySection>
      </div>
    </ExperienceBackground>
  )
}