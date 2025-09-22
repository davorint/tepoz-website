'use client'

import React, { memo, useCallback, useMemo } from 'react'
import { SectionProps } from '@/lib/section-registry'

// Higher-order component for section optimization
export function withSectionOptimization<T extends SectionProps>(
  Component: React.ComponentType<T>,
  displayName?: string
) {
  const OptimizedComponent = memo(function OptimizedSection(props: T) {
    // Memoize complex calculations if needed
    const memoizedProps = useMemo(() => {
      // Only recreate props object if props change
      return { ...props }
    }, [props])

    return <Component {...memoizedProps} />
  })

  OptimizedComponent.displayName = displayName || `Optimized(${Component.displayName || Component.name})`

  return OptimizedComponent
}

// Performance monitoring component (development only)
export const SectionPerformanceMonitor = memo(function SectionPerformanceMonitor({
  sectionId,
  children
}: {
  sectionId: string
  children: React.ReactNode
}) {
  const startTime = useMemo(() => performance.now(), [])

  const logRenderTime = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      const endTime = performance.now()
      console.log(`Section ${sectionId} rendered in ${endTime - startTime}ms`)
    }
  }, [startTime, sectionId])

  // Log render time after component mounts
  useMemo(() => {
    setTimeout(logRenderTime, 0)
  }, [logRenderTime])

  return <>{children}</>
})

// Simple error fallback component
export const SectionErrorFallback = memo(function SectionErrorFallback({
  onRetry
}: {
  sectionId: string
  onRetry: () => void
}) {
  return (
    <div className="min-h-[200px] flex items-center justify-center bg-muted/50">
      <div className="text-center text-muted-foreground">
        <p>Section temporarily unavailable</p>
        <button
          onClick={onRetry}
          className="mt-2 text-sm underline hover:no-underline"
        >
          Try again
        </button>
      </div>
    </div>
  )
})