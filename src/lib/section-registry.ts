import { Locale } from '@/lib/i18n'

// Base section props interface
export interface SectionProps {
  lang: Locale
  [key: string]: unknown
}

// Serializable section configuration (no component functions)
export interface SectionConfig {
  id: string
  componentName: string // Just the name, not the actual component
  props?: Partial<SectionProps>
  priority?: 'high' | 'medium' | 'low'
  viewport?: boolean // Load when in viewport
}

// Available component names for type safety
export type ComponentName =
  | 'PremiumHero'
  | 'HeroSectionThree'
  | 'HeroSectionThreeFixed'
  | 'HeroSectionExplosion'
  | 'ScrollRevealCards'
  | 'ShaderSection'
  | 'PremiumCTA'
  | 'FloatingStatsSection'
  | 'InteractiveCTASection'
  | 'InteractiveCTASection3'
  | 'TurangiSection'
  | 'PremiumTestimonialsSection'

// Homepage section configuration - only serializable data
export const homepageSections: SectionConfig[] = [
  {
    id: 'hero',
    componentName: 'PremiumHero',
    priority: 'high',
    viewport: false, // Always load hero immediately
  },
  {
    id: 'cards',
    componentName: 'ScrollRevealCards',
    priority: 'high',
    viewport: false,
  },
  {
    id: 'shader',
    componentName: 'ShaderSection',
    priority: 'medium',
    viewport: true,
  },
  {
    id: 'cta',
    componentName: 'PremiumCTA',
    priority: 'medium',
    viewport: true,
  },
  {
    id: 'stats',
    componentName: 'FloatingStatsSection',
    priority: 'low',
    viewport: true,
  },
  {
    id: 'interactive-cta',
    componentName: 'InteractiveCTASection',
    priority: 'low',
    viewport: true,
  },
  {
    id: 'interactive-cta-3',
    componentName: 'InteractiveCTASection3',
    priority: 'low',
    viewport: true,
  },
  {
    id: 'turangi',
    componentName: 'TurangiSection',
    priority: 'low',
    viewport: true,
  },
  {
    id: 'testimonials',
    componentName: 'PremiumTestimonialsSection',
    priority: 'medium',
    viewport: true,
  },
]

// Registry for different page types
export const sectionRegistry = {
  homepage: homepageSections,
  // Add other page configurations as needed
}

export type PageType = keyof typeof sectionRegistry