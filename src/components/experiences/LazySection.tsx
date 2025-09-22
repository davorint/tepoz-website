'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { Suspense, ReactNode } from 'react'

interface LazySectionProps {
  children: ReactNode
  fallback: ReactNode
  rootMargin?: string
  threshold?: number
}

export default function LazySection({
  children,
  fallback,
  rootMargin = '100px',
  threshold = 0.1
}: LazySectionProps) {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true,
  })

  return (
    <div ref={elementRef}>
      {isIntersecting ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  )
}