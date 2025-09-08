import { Locale } from '@/lib/i18n'
import { Hotel } from '@/lib/hotels'
import { Event } from '@/lib/events'
import { Experience } from '@/lib/experiences'

export interface StructuredDataConfig {
  '@context': string
  '@type': string
  [key: string]: unknown
}

export const generateHotelStructuredData = (
  hotel: Hotel, 
  locale: Locale,
  slug: string
): StructuredDataConfig => {
  const baseUrl = 'https://tepoztlan.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    '@id': `${baseUrl}/${locale}/stay/hotels/${slug}`,
    name: hotel.name[locale],
    description: hotel.description[locale],
    url: `${baseUrl}/${locale}/stay/hotels/${slug}`,
    image: hotel.images.map(img => `${baseUrl}${img}`),
    address: {
      '@type': 'PostalAddress',
      streetAddress: hotel.location.address,
      addressLocality: 'Tepoztlán',
      addressRegion: 'Morelos',
      addressCountry: 'Mexico'
    },
    geo: hotel.location.coordinates ? {
      '@type': 'GeoCoordinates',
      latitude: hotel.location.coordinates[0],
      longitude: hotel.location.coordinates[1]
    } : undefined,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: hotel.rating,
      reviewCount: hotel.reviews
    },
    starRating: {
      '@type': 'Rating',
      ratingValue: hotel.category === 'luxury' ? 5 : hotel.category === 'boutique' ? 4 : 3
    },
    amenityFeature: hotel.amenities.map(amenity => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity,
      value: true
    })),
    offers: hotel.roomTypes.map(room => ({
      '@type': 'Offer',
      name: room.name[locale],
      price: room.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    })),
    telephone: hotel.contact.phone || undefined,
    sameAs: hotel.contact.website ? [hotel.contact.website] : undefined,
    priceRange: hotel.priceRange,
    checkInTime: '15:00',
    checkOutTime: '11:00',
    petsAllowed: hotel.petFriendly || false
  }
}

export const generateEventStructuredData = (
  event: Event,
  locale: Locale,
  slug: string
): StructuredDataConfig => {
  const baseUrl = 'https://tepoztlan.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${baseUrl}/${locale}/events/${slug}`,
    name: event.name[locale],
    description: event.description[locale],
    url: `${baseUrl}/${locale}/events/${slug}`,
    image: event.images.map(img => `${baseUrl}${img}`),
    startDate: `${event.date}T${event.time}`,
    endDate: event.endDate ? `${event.endDate}T${event.time}` : undefined,
    location: {
      '@type': 'Place',
      name: event.location[locale],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Tepoztlán',
        addressRegion: 'Morelos',
        addressCountry: 'Mexico'
      },
      geo: event.latitude && event.longitude ? {
        '@type': 'GeoCoordinates',
        latitude: event.latitude,
        longitude: event.longitude
      } : undefined
    },
    organizer: {
      '@type': 'Organization',
      name: event.organizer.name,
      url: event.organizer.website
    },
    offers: {
      '@type': 'Offer',
      price: event.priceAmount || 0,
      priceCurrency: event.currency || 'MXN',
      url: `${baseUrl}/${locale}/events/${slug}`,
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: event.rating,
      reviewCount: event.reviewCount
    },
    maximumAttendeeCapacity: event.capacity,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode'
  }
}

export const generateExperienceStructuredData = (
  experience: Experience,
  locale: Locale,
  slug: string
): StructuredDataConfig => {
  const baseUrl = 'https://tepoztlan.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${baseUrl}/${locale}/experience/${slug}`,
    name: experience.name[locale],
    description: experience.description[locale],
    url: `${baseUrl}/${locale}/experience/${slug}`,
    image: experience.images.map(img => `${baseUrl}${img}`),
    location: {
      '@type': 'Place',
      name: experience.location[locale],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Tepoztlán',
        addressRegion: 'Morelos',
        addressCountry: 'Mexico'
      },
      geo: experience.latitude && experience.longitude ? {
        '@type': 'GeoCoordinates',
        latitude: experience.latitude,
        longitude: experience.longitude
      } : undefined
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: experience.rating,
      reviewCount: experience.reviewCount
    },
    offers: {
      '@type': 'Offer',
      price: experience.priceAmount,
      priceCurrency: experience.currency,
      url: `${baseUrl}/${locale}/experience/${slug}`,
      availability: 'https://schema.org/InStock'
    },
    duration: experience.duration[locale],
    isAccessibleForFree: experience.priceAmount === 0,
    touristType: experience.category
  }
}

export const generateBreadcrumbStructuredData = (
  items: Array<{ name: string; url: string }>
): StructuredDataConfig => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

export const generateWebsiteStructuredData = (locale: Locale): StructuredDataConfig => {
  const baseUrl = 'https://tepoztlan.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/${locale}`,
    url: `${baseUrl}/${locale}`,
    name: locale === 'es' ? 'Tepoztlán - Guía Turística' : 'Tepoztlán - Tourism Guide',
    description: locale === 'es' 
      ? 'Tu guía completa para explorar el Pueblo Mágico de Tepoztlán'
      : 'Your complete guide to explore the Magical Town of Tepoztlán',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/${locale}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    sameAs: [
      'https://facebook.com/tepoztlan-guide',
      'https://instagram.com/tepoztlan-guide',
      'https://twitter.com/tepoztlan-guide'
    ]
  }
}