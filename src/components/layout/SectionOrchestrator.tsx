'use client'

import { memo } from 'react'
import { SectionConfig, SectionProps, ComponentName } from '@/lib/section-registry'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { SectionPerformanceMonitor } from './OptimizedSection'
import { getComponent } from './ClientComponentRegistry'

interface SectionWrapperProps {
  config: SectionConfig
  sectionProps: SectionProps
}

const SectionWrapper = memo(function SectionWrapper({
  config,
  sectionProps
}: SectionWrapperProps) {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true,
  })

  const { componentName, viewport = false } = config
  const shouldRender = !viewport || isIntersecting

  // Get the component from the client-side registry
  const Component = getComponent(componentName as ComponentName)

  return (
    <div ref={elementRef} data-section={config.id}>
      {shouldRender && Component && (
        <SectionPerformanceMonitor sectionId={config.id}>
          <Component {...sectionProps} />
        </SectionPerformanceMonitor>
      )}
    </div>
  )
})

interface SectionOrchestratorProps {
  sections: SectionConfig[]
  commonProps: SectionProps
}

export default function SectionOrchestrator({
  sections,
  commonProps
}: SectionOrchestratorProps) {
  // Separate high priority sections that should load immediately
  const highPrioritySections = sections.filter(s => s.priority === 'high')
  const otherSections = sections.filter(s => s.priority !== 'high')

  return (
    <>
      {/* High priority sections - load immediately */}
      {highPrioritySections.map((config) => {
        const sectionProps = { ...commonProps, ...config.props }
        return (
          <SectionWrapper
            key={config.id}
            config={config}
            sectionProps={sectionProps}
          />
        )
      })}

      {/* Lower priority sections - lazy load */}
      {otherSections.map((config) => {
        const sectionProps = { ...commonProps, ...config.props }
        return (
          <SectionWrapper
            key={config.id}
            config={config}
            sectionProps={sectionProps}
          />
        )
      })}
    </>
  )
}