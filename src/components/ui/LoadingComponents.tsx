'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import GlassmorphismCard from './GlassmorphismCard'
import { Compass, Mountain } from 'lucide-react'

// Base loading animation component
export function LoadingSpinner({
  size = 'md',
  color = 'teal',
  className
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'teal' | 'orange' | 'gray'
  className?: string
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const colorClasses = {
    teal: 'text-teal-500',
    orange: 'text-orange-500',
    gray: 'text-gray-400 dark:text-gray-500'
  }

  return (
    <div
      className={cn(
        'animate-spin',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  )
}

// Pulsing dot loader
export function LoadingDots({
  size = 'md',
  color = 'teal',
  className
}: {
  size?: 'sm' | 'md' | 'lg'
  color?: 'teal' | 'orange' | 'gray'
  className?: string
}) {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  }

  const colorClasses = {
    teal: 'bg-teal-500',
    orange: 'bg-orange-500',
    gray: 'bg-gray-400 dark:bg-gray-500'
  }

  return (
    <div className={cn('flex space-x-1', className)} role="status" aria-label="Loading">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={cn(
            'rounded-full animate-pulse',
            sizeClasses[size],
            colorClasses[color]
          )}
          style={{
            animationDelay: `${index * 0.2}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  )
}

// Skeleton components for different content types
export function SkeletonText({
  lines = 1,
  className
}: {
  lines?: number
  className?: string
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }, (_, index) => (
        <div
          key={index}
          className={cn(
            'h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse',
            index === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  )
}

export function SkeletonCard({
  viewMode = 'grid',
  className
}: {
  viewMode?: 'grid' | 'list'
  className?: string
}) {
  return (
    <GlassmorphismCard
      level="light"
      className={cn(
        'animate-pulse',
        viewMode === 'list' ? 'flex' : '',
        className
      )}
    >
      <div className={`${viewMode === 'list' ? 'w-80 h-48 mr-6' : 'h-64 mb-4'} bg-gray-200 dark:bg-gray-700 rounded-2xl`} />
      <div className={viewMode === 'list' ? 'flex-1 p-6' : 'p-6'}>
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
          </div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-full mt-4" />
        </div>
      </div>
    </GlassmorphismCard>
  )
}

// Experience-specific loading states
export function ExperienceCardSkeleton({
  count = 3,
  viewMode = 'grid'
}: {
  count?: number
  viewMode?: 'grid' | 'list'
}) {
  return (
    <div className={`${
      viewMode === 'grid'
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
        : 'space-y-6'
    }`}>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonCard key={index} viewMode={viewMode} />
      ))}
    </div>
  )
}

export function ExperienceHeaderSkeleton() {
  return (
    <div className="text-center mb-16 animate-pulse">
      <div className="inline-flex items-center gap-3 mb-8">
        <div className="h-px w-20 bg-gray-200 dark:bg-gray-700" />
        <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div className="h-px w-20 bg-gray-200 dark:bg-gray-700" />
      </div>

      <div className="space-y-4 mb-8">
        <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto" />
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto" />
      </div>

      <div className="space-y-4 mb-8 max-w-4xl mx-auto">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mx-auto" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="p-6">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded mb-3 mx-auto" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  )
}

// Full page loading states
export function ExperiencePageLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-slate-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-teal-900 dark:to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb skeleton */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 animate-pulse">
            <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>

        <ExperienceHeaderSkeleton />

        {/* Filters skeleton */}
        <GlassmorphismCard level="medium" className="mb-12 p-6">
          <div className="animate-pulse">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="flex gap-2">
                {Array.from({ length: 4 }, (_, index) => (
                  <div key={index} className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                ))}
              </div>
            </div>
          </div>
        </GlassmorphismCard>

        {/* Category tabs skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {Array.from({ length: 5 }, (_, index) => (
            <GlassmorphismCard key={index} className="p-6 text-center animate-pulse">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto" />
            </GlassmorphismCard>
          ))}
        </div>

        {/* Results header skeleton */}
        <div className="flex justify-between items-center mb-8 animate-pulse">
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="flex gap-2">
            <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>

        {/* Experience cards skeleton */}
        <ExperienceCardSkeleton count={6} viewMode="grid" />
      </div>
    </div>
  )
}

// Loading states with contextual messaging
export function LoadingWithMessage({
  message,
  locale,
  icon: Icon = Compass,
  theme = 'teal'
}: {
  message?: string
  locale: 'es' | 'en'
  icon?: React.ComponentType<{ className?: string }>
  theme?: 'teal' | 'orange'
}) {
  const themeClasses = {
    teal: 'from-teal-500 to-cyan-500',
    orange: 'from-orange-500 to-red-500'
  }

  const defaultMessages = {
    es: 'Cargando experiencias...',
    en: 'Loading experiences...'
  }

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative mb-6">
        <div className={`absolute inset-0 bg-gradient-to-r ${themeClasses[theme]} blur-lg opacity-30 animate-pulse`} />
        <div className={`relative bg-gradient-to-r ${themeClasses[theme]} rounded-full p-4`}>
          <Icon className="w-8 h-8 text-white animate-pulse" />
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          {message || defaultMessages[locale]}
        </h3>
        <LoadingDots color={theme} size="md" className="justify-center" />
      </div>
    </div>
  )
}

// Error state with retry
export function LoadingError({
  message,
  locale,
  onRetry,
  className
}: {
  message?: string
  locale: 'es' | 'en'
  onRetry?: () => void
  className?: string
}) {
  const defaultMessages = {
    es: 'Error al cargar las experiencias',
    en: 'Error loading experiences'
  }

  const retryMessages = {
    es: 'Intentar de nuevo',
    en: 'Try again'
  }

  return (
    <div className={cn('text-center py-16', className)}>
      <div className="text-red-500 mb-4">
        <Mountain className="w-16 h-16 mx-auto" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
        {message || defaultMessages[locale]}
      </h3>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-lg font-semibold transition-all duration-300"
        >
          {retryMessages[locale]}
        </button>
      )}
    </div>
  )
}

const LoadingComponents = {
  Spinner: LoadingSpinner,
  Dots: LoadingDots,
  Card: SkeletonCard,
  Text: SkeletonText,
  ExperienceCards: ExperienceCardSkeleton,
  ExperienceHeader: ExperienceHeaderSkeleton,
  ExperiencePage: ExperiencePageLoading,
  WithMessage: LoadingWithMessage,
  Error: LoadingError
}

export default LoadingComponents