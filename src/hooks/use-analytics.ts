'use client'

import { useEffect, useCallback } from 'react'

// Analytics event types
type AnalyticsEvent = 
  | 'business_view'
  | 'business_click'
  | 'business_call'
  | 'business_directions'
  | 'business_share'
  | 'business_favorite'
  | 'search_performed'
  | 'filter_applied'
  | 'category_selected'
  | 'map_interaction'
  | 'user_location_requested'
  | 'favorites_exported'
  | 'favorites_imported'

interface AnalyticsEventData {
  [key: string]: string | number | boolean | undefined | null
}

interface BusinessAnalyticsData {
  businessId: string
  businessName: string
  businessCategory: string
  userLocation?: [number, number]
  searchQuery?: string
  filterActive?: boolean
}

interface SearchAnalyticsData {
  query: string
  resultsCount: number
  category?: string
  userLocation?: [number, number]
}

interface MapAnalyticsData {
  action: 'zoom' | 'pan' | 'style_change' | '3d_toggle' | 'cluster_interaction'
  zoomLevel?: number
  mapStyle?: string
  userLocation?: [number, number]
}

export function useAnalytics() {
  // Track page view
  const trackPageView = useCallback((page: string, properties?: AnalyticsEventData) => {
    try {
      // Google Analytics 4
      if (typeof window !== 'undefined' && 'gtag' in window) {
        const gtag = (window as { gtag: (command: string, targetId: string, config?: object) => void }).gtag;
        gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
          page_title: page,
          page_location: window.location.href,
          ...properties
        })
      }

      // Custom analytics or third-party services can be added here
      console.log('📊 Page View:', { page, properties })
    } catch (error) {
      console.warn('Analytics tracking error:', error)
    }
  }, [])

  // Track custom events
  const trackEvent = useCallback((event: AnalyticsEvent, properties: AnalyticsEventData = {}) => {
    try {
      // Google Analytics 4
      if (typeof window !== 'undefined' && 'gtag' in window) {
        const gtag = (window as { gtag: (command: string, targetId: string, config?: object) => void }).gtag;
        gtag('event', event, {
          event_category: 'Business Finder',
          event_label: properties.label || '',
          value: properties.value || 0,
          ...properties
        })
      }

      // Store event in localStorage for analytics dashboard
      const storedEvents = JSON.parse(localStorage.getItem('tepoztlan-analytics') || '[]')
      const eventData = {
        event,
        properties,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent.substring(0, 100) // Truncated for privacy
      }
      
      storedEvents.push(eventData)
      
      // Keep only last 100 events
      if (storedEvents.length > 100) {
        storedEvents.splice(0, storedEvents.length - 100)
      }
      
      localStorage.setItem('tepoztlan-analytics', JSON.stringify(storedEvents))

      console.log('📊 Event:', event, properties)
    } catch (error) {
      console.warn('Analytics tracking error:', error)
    }
  }, [])

  // Business-specific tracking methods
  const trackBusinessView = useCallback((data: BusinessAnalyticsData) => {
    trackEvent('business_view', {
      business_id: data.businessId,
      business_name: data.businessName,
      business_category: data.businessCategory,
      has_user_location: !!data.userLocation,
      search_context: !!data.searchQuery,
      filter_context: !!data.filterActive
    })
  }, [trackEvent])

  const trackBusinessClick = useCallback((data: BusinessAnalyticsData & { clickSource: 'map' | 'list' | 'search' }) => {
    trackEvent('business_click', {
      business_id: data.businessId,
      business_name: data.businessName,
      business_category: data.businessCategory,
      click_source: data.clickSource,
      has_user_location: !!data.userLocation
    })
  }, [trackEvent])

  const trackBusinessAction = useCallback((
    action: 'call' | 'directions' | 'share' | 'favorite',
    data: BusinessAnalyticsData
  ) => {
    const eventMap = {
      call: 'business_call',
      directions: 'business_directions',
      share: 'business_share',
      favorite: 'business_favorite'
    }

    trackEvent(eventMap[action] as AnalyticsEvent, {
      business_id: data.businessId,
      business_name: data.businessName,
      business_category: data.businessCategory,
      has_user_location: !!data.userLocation
    })
  }, [trackEvent])

  // Search tracking
  const trackSearch = useCallback((data: SearchAnalyticsData) => {
    trackEvent('search_performed', {
      search_query: data.query,
      results_count: data.resultsCount,
      category_filter: data.category || 'all',
      has_user_location: !!data.userLocation,
      query_length: data.query.length
    })
  }, [trackEvent])

  // Filter tracking
  const trackFilterApplication = useCallback((filterType: string, filterValue: string, resultsCount: number) => {
    trackEvent('filter_applied', {
      filter_type: filterType,
      filter_value: filterValue,
      results_count: resultsCount
    })
  }, [trackEvent])

  // Category selection tracking
  const trackCategorySelection = useCallback((category: string, businessCount: number) => {
    trackEvent('category_selected', {
      category,
      business_count: businessCount
    })
  }, [trackEvent])

  // Map interaction tracking
  const trackMapInteraction = useCallback((data: MapAnalyticsData) => {
    trackEvent('map_interaction', {
      action: data.action,
      zoom_level: data.zoomLevel,
      map_style: data.mapStyle,
      has_user_location: !!data.userLocation
    })
  }, [trackEvent])

  // User location tracking
  const trackUserLocationRequest = useCallback((granted: boolean, error?: string) => {
    trackEvent('user_location_requested', {
      permission_granted: granted,
      error_type: error || null,
      browser: navigator.userAgent.includes('Chrome') ? 'Chrome' : 
               navigator.userAgent.includes('Firefox') ? 'Firefox' :
               navigator.userAgent.includes('Safari') ? 'Safari' : 'Other'
    })
  }, [trackEvent])

  // Favorites tracking
  const trackFavoritesAction = useCallback((action: 'export' | 'import', count?: number) => {
    const event = action === 'export' ? 'favorites_exported' : 'favorites_imported'
    trackEvent(event, {
      favorites_count: count || 0
    })
  }, [trackEvent])

  // Performance tracking
  const trackPerformance = useCallback((metric: string, value: number) => {
    try {
      // Use Performance API when available
      if ('performance' in window && 'measure' in performance) {
        performance.mark(`tepoztlan-${metric}`)
      }

      trackEvent('performance_metric' as AnalyticsEvent, {
        metric_name: metric,
        metric_value: value,
        page_url: window.location.pathname
      })
    } catch (error) {
      console.warn('Performance tracking error:', error)
    }
  }, [trackEvent])

  // Error tracking
  const trackError = useCallback((error: Error, context?: string) => {
    trackEvent('error_occurred' as AnalyticsEvent, {
      error_message: error.message,
      error_stack: error.stack?.substring(0, 500), // Truncated for privacy
      error_context: context || 'unknown',
      page_url: window.location.pathname
    })
  }, [trackEvent])

  // Session tracking
  const trackSession = useCallback(() => {
    const sessionId = sessionStorage.getItem('tepoztlan-session-id') || 
                     `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    if (!sessionStorage.getItem('tepoztlan-session-id')) {
      sessionStorage.setItem('tepoztlan-session-id', sessionId)
      
      trackEvent('session_started' as AnalyticsEvent, {
        session_id: sessionId,
        referrer: document.referrer,
        user_agent: navigator.userAgent.substring(0, 100),
        screen_resolution: `${screen.width}x${screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`
      })
    }

    return sessionId
  }, [trackEvent])

  // Export analytics data
  const exportAnalytics = useCallback(() => {
    try {
      const storedEvents = JSON.parse(localStorage.getItem('tepoztlan-analytics') || '[]')
      const exportData = {
        events: storedEvents,
        exportedAt: new Date().toISOString(),
        totalEvents: storedEvents.length,
        sessionId: sessionStorage.getItem('tepoztlan-session-id')
      }
      
      const dataStr = JSON.stringify(exportData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `tepoztlan-analytics-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      return exportData
    } catch (error) {
      console.error('Error exporting analytics:', error)
      return null
    }
  }, [])

  // Clear analytics data
  const clearAnalytics = useCallback(() => {
    try {
      localStorage.removeItem('tepoztlan-analytics')
      sessionStorage.removeItem('tepoztlan-session-id')
      console.log('Analytics data cleared')
    } catch (error) {
      console.warn('Error clearing analytics:', error)
    }
  }, [])

  // Initialize session tracking on mount
  useEffect(() => {
    trackSession()
  }, [trackSession])

  // Track page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      trackEvent('page_visibility_change' as AnalyticsEvent, {
        visibility_state: document.visibilityState,
        timestamp: new Date().toISOString()
      })
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [trackEvent])

  // Listen for favorite events
  useEffect(() => {
    const handleFavoriteAdded = (event: CustomEvent) => {
      trackEvent('business_favorite', {
        action: 'added',
        business_id: event.detail.businessId,
        business_name: event.detail.businessData?.name
      })
    }

    const handleFavoriteRemoved = (event: CustomEvent) => {
      trackEvent('business_favorite', {
        action: 'removed',
        business_id: event.detail.businessId
      })
    }

    const handleFavoritesCleared = () => {
      trackEvent('favorites_exported', {
        action: 'cleared_all'
      })
    }

    const handleFavoritesImported = (event: CustomEvent) => {
      trackFavoritesAction('import', event.detail.importedCount)
    }

    window.addEventListener('favoriteAdded', handleFavoriteAdded as EventListener)
    window.addEventListener('favoriteRemoved', handleFavoriteRemoved as EventListener)
    window.addEventListener('favoritesCleared', handleFavoritesCleared)
    window.addEventListener('favoritesImported', handleFavoritesImported as EventListener)

    return () => {
      window.removeEventListener('favoriteAdded', handleFavoriteAdded as EventListener)
      window.removeEventListener('favoriteRemoved', handleFavoriteRemoved as EventListener)
      window.removeEventListener('favoritesCleared', handleFavoritesCleared)
      window.removeEventListener('favoritesImported', handleFavoritesImported as EventListener)
    }
  }, [trackEvent, trackFavoritesAction])

  return {
    trackPageView,
    trackEvent,
    trackBusinessView,
    trackBusinessClick,
    trackBusinessAction,
    trackSearch,
    trackFilterApplication,
    trackCategorySelection,
    trackMapInteraction,
    trackUserLocationRequest,
    trackFavoritesAction,
    trackPerformance,
    trackError,
    trackSession,
    exportAnalytics,
    clearAnalytics
  }
}

// Global error handler for unhandled errors
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    // Only track errors from our domain to avoid noise
    if (event.filename && event.filename.includes(window.location.origin)) {
      console.error('Unhandled error:', event.error)
    }
  })
}