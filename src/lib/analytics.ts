/**
 * Google Analytics Event Tracking Utilities
 *
 * Usage:
 * import { trackEvent } from '@/lib/analytics'
 * trackEvent('button_click', { button_name: 'favorite' })
 */

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

/**
 * Track a custom event
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams)
  }
}

/**
 * Track page view (automatically handled by @next/third-parties, but here for manual use)
 */
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

/**
 * Predefined event trackers for common actions
 */
export const analytics = {
  // User actions
  favorite: (businessId: string | number, businessName: string) => {
    trackEvent('add_to_favorites', {
      business_id: businessId,
      business_name: businessName,
    })
  },

  unfavorite: (businessId: string | number, businessName: string) => {
    trackEvent('remove_from_favorites', {
      business_id: businessId,
      business_name: businessName,
    })
  },

  // Reviews
  submitReview: (businessId: number, rating: number) => {
    trackEvent('submit_review', {
      business_id: businessId,
      rating,
    })
  },

  markReviewHelpful: (reviewId: number) => {
    trackEvent('mark_review_helpful', {
      review_id: reviewId,
    })
  },

  // Contact & Newsletter
  submitContact: (type: string) => {
    trackEvent('contact_form_submit', {
      form_type: type,
    })
  },

  subscribeNewsletter: (language: string) => {
    trackEvent('newsletter_subscribe', {
      language,
    })
  },

  // Business interactions
  viewBusiness: (businessId: string | number, category: string, name: string) => {
    trackEvent('view_business', {
      business_id: businessId,
      category,
      business_name: name,
    })
  },

  clickPhone: (businessId: string | number, businessName: string) => {
    trackEvent('click_phone', {
      business_id: businessId,
      business_name: businessName,
    })
  },

  clickWhatsApp: (businessId: string | number, businessName: string) => {
    trackEvent('click_whatsapp', {
      business_id: businessId,
      business_name: businessName,
    })
  },

  clickWebsite: (businessId: string | number, businessName: string) => {
    trackEvent('click_website', {
      business_id: businessId,
      business_name: businessName,
    })
  },

  clickDirections: (businessId: string | number, businessName: string) => {
    trackEvent('click_directions', {
      business_id: businessId,
      business_name: businessName,
    })
  },

  // Social sharing
  share: (platform: string, contentType: string, contentId: string) => {
    trackEvent('share', {
      method: platform,
      content_type: contentType,
      content_id: contentId,
    })
  },

  // Search
  search: (query: string, resultsCount: number) => {
    trackEvent('search', {
      search_term: query,
      results_count: resultsCount,
    })
  },

  // Filters
  applyFilter: (filterType: string, filterValue: string) => {
    trackEvent('apply_filter', {
      filter_type: filterType,
      filter_value: filterValue,
    })
  },

  // Language
  changeLanguage: (fromLang: string, toLang: string) => {
    trackEvent('change_language', {
      from_language: fromLang,
      to_language: toLang,
    })
  },

  // Conversions
  viewAllBusinesses: (category: string) => {
    trackEvent('view_all_businesses', {
      category,
    })
  },
}
