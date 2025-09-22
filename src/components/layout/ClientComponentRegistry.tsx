'use client'

import dynamic from 'next/dynamic'
import { ComponentName } from '@/lib/section-registry'

// Client-side component registry using next/dynamic
export const componentRegistry = {
  PremiumHero: dynamic(() => import('@/components/sections/PremiumHero'), {
    loading: () => (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading hero...</div>
      </div>
    ),
  }),
  HeroSectionThree: dynamic(() => import('@/components/sections/HeroSectionThree'), {
    loading: () => (
      <div className="min-h-[100vh] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading 3D hero...</div>
      </div>
    ),
  }),
  HeroSectionThreeFixed: dynamic(() => import('@/components/sections/HeroSectionThreeFixed'), {
    loading: () => (
      <div className="min-h-[100vh] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading optimized 3D hero...</div>
      </div>
    ),
  }),
  HeroSectionExplosion: dynamic(() => import('@/components/sections/HeroSectionExplosion'), {
    loading: () => (
      <div className="min-h-[100vh] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading particle explosion...</div>
      </div>
    ),
  }),
  ScrollRevealCards: dynamic(() => import('@/components/sections/ScrollRevealCards'), {
    loading: () => (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading cards...</div>
      </div>
    ),
  }),
  ShaderSection: dynamic(() => import('@/components/sections/ShaderSection'), {
    loading: () => (
      <div className="min-h-[30vh] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading shader...</div>
      </div>
    ),
  }),
  PremiumCTA: dynamic(() => import('@/components/sections/PremiumCTA'), {
    loading: () => (
      <div className="min-h-[20vh] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading CTA...</div>
      </div>
    ),
  }),
  FloatingStatsSection: dynamic(() => import('@/components/sections/FloatingStatsSection'), {
    loading: () => (
      <div className="min-h-[20vh] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading stats...</div>
      </div>
    ),
  }),
  InteractiveCTASection: dynamic(() => import('@/components/sections/InteractiveCTASection'), {
    loading: () => (
      <div className="min-h-[20vh] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading interactive CTA...</div>
      </div>
    ),
  }),
  InteractiveCTASection3: dynamic(() => import('@/components/sections/InteractiveCTASection3'), {
    loading: () => (
      <div className="min-h-[20vh] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading CTA 3...</div>
      </div>
    ),
  }),
  TurangiSection: dynamic(() => import('@/components/sections/TurangiSection'), {
    loading: () => (
      <div className="min-h-[20vh] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading Turangi...</div>
      </div>
    ),
  }),
  PremiumTestimonialsSection: dynamic(() => import('@/components/sections/PremiumTestimonialsSection'), {
    loading: () => (
      <div className="min-h-[20vh] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading testimonials...</div>
      </div>
    ),
  }),
}

// Type-safe component getter
export function getComponent(componentName: ComponentName) {
  const Component = componentRegistry[componentName]
  if (!Component) {
    console.warn(`Component "${componentName}" not found in registry`)
    return null
  }
  return Component
}