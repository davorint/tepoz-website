'use client'

import { useEffect, useLayoutEffect, useState } from 'react'

/**
 * Modern GSAP utils for Next.js 15 with proper SSR handling
 * Based on 2025 best practices from GSAP community
 */

interface GSAPInstance {
  gsap: typeof import('gsap').gsap
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger
}

let gsapInstance: GSAPInstance | null = null

// Centralized GSAP configuration (runs once)
const initGSAP = async (): Promise<GSAPInstance> => {
  if (gsapInstance) return gsapInstance

  const [gsapModule, scrollTriggerModule] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger')
  ])

  const { gsap } = gsapModule
  const { ScrollTrigger } = scrollTriggerModule

  // Register plugin (will only register once)
  gsap.registerPlugin(ScrollTrigger)

  // Performance optimized defaults
  gsap.defaults({
    force3D: true,
    ease: 'power2.out'
  })

  gsapInstance = { gsap, ScrollTrigger }
  return gsapInstance
}

/**
 * Modern useGSAP hook with proper cleanup and hydration safety
 */
export function useGSAP() {
  const [isReady, setIsReady] = useState(false)
  const [gsap, setGsap] = useState<GSAPInstance['gsap'] | null>(null)
  const [ScrollTrigger, setScrollTrigger] = useState<GSAPInstance['ScrollTrigger'] | null>(null)

  useLayoutEffect(() => {
    let mounted = true

    const setup = async () => {
      try {
        if (!mounted) return

        const instance = await initGSAP()
        
        if (mounted) {
          setGsap(() => instance.gsap)
          setScrollTrigger(() => instance.ScrollTrigger)
          
          // Use two RAF to ensure DOM is ready (deterministic)
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (mounted) {
                setIsReady(true)
                instance.ScrollTrigger.refresh()
              }
            })
          })
        }
      } catch (error) {
        console.error('GSAP initialization failed:', error)
      }
    }

    setup()

    return () => {
      mounted = false
    }
  }, [])

  return {
    gsap,
    ScrollTrigger,
    isReady
  }
}

/**
 * Check if user prefers reduced motion
 */
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}