'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const ApollonianLoader = dynamic(() => import('@/components/loading/ApollonianLoader'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black z-50" />
})

interface GlobalLoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  startLoading: (message?: string) => void
  finishLoading: () => void
}

const GlobalLoadingContext = createContext<GlobalLoadingContextType | undefined>(undefined)

export function useGlobalLoading() {
  const context = useContext(GlobalLoadingContext)
  if (!context) {
    throw new Error('useGlobalLoading must be used within a GlobalLoadingProvider')
  }
  return context
}

interface GlobalLoadingProviderProps {
  children: ReactNode
}

export function GlobalLoadingProvider({ children }: GlobalLoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('Loading Platform...')
  const pathname = usePathname()

  const startLoading = (message = 'Loading Platform...') => {
    setLoadingMessage(message)
    setIsLoading(true)
  }

  const finishLoading = () => {
    setTimeout(() => setIsLoading(false), 300) // Small delay for smooth transition
  }

  // Auto-trigger loading on route changes for certain pages
  useEffect(() => {
    // Skip loading for landing-2 as it has its own loader
    if (pathname === '/es/landing-2' || pathname === '/en/landing-2') {
      return
    }

    // Skip loading for simple pages that load fast
    const skipLoadingPages = [
      '/es/business-finder',
      '/en/business-finder'
    ]

    if (skipLoadingPages.some(page => pathname === page)) {
      return
    }

    // Show loading for complex pages or first visits
    const shouldShowLoading = 
      pathname === '/es' || 
      pathname === '/en' ||
      pathname?.includes('/landing-3') ||
      pathname?.includes('/component-test') ||
      sessionStorage.getItem('hasVisited') !== 'true'

    if (shouldShowLoading) {
      const isSpanish = pathname?.startsWith('/es')
      const message = isSpanish ? 'Cargando lo desconocido...' : 'Loading the unknown...'
      startLoading(message)
      
      // Mark as visited
      sessionStorage.setItem('hasVisited', 'true')
      
      // Auto-finish loading after delay
      const timer = setTimeout(() => {
        finishLoading()
      }, 2500)

      return () => clearTimeout(timer)
    }
  }, [pathname])

  const value = {
    isLoading,
    setIsLoading,
    startLoading,
    finishLoading
  }

  return (
    <GlobalLoadingContext.Provider value={value}>
      {/* Loading Screen Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 2, filter: 'blur(20px)' }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[9999]"
          >
            <ApollonianLoader message={loadingMessage} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {children}
    </GlobalLoadingContext.Provider>
  )
}