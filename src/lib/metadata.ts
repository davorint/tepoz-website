/**
 * Metadata Helpers for Internationalization
 *
 * Provides language-specific metadata for SEO optimization.
 * Use these helpers in page-level generateMetadata() functions.
 */

import { Metadata } from 'next'
import { getSiteUrl } from './env'
import type { Locale } from './i18n'

/**
 * Base metadata translations
 */
const metadataTranslations = {
  es: {
    siteName: 'Guía Turística de Tepoztlán',
    defaultTitle: 'Guía Turística de Tepoztlán - Descubre el Pueblo Mágico',
    defaultDescription:
      'Tu guía completa de los mejores restaurantes, hoteles, eco-lodges, cafés, atracciones y servicios locales de Tepoztlán. Descubre la magia de este Pueblo Mágico patrimonio de la UNESCO en Morelos, México.',
    keywords: [
      'Tepoztlán',
      'Pueblo Mágico',
      'Morelos México',
      'Pirámide del Tepozteco',
      'turismo México',
      'hoteles Tepoztlán',
      'restaurantes Tepoztlán',
      'eco-lodges México',
      'fin de semana México',
      'México místico',
      'cultura indígena',
      'patrimonio UNESCO',
    ],
  },
  en: {
    siteName: 'Tepoztlán Tourism Guide',
    defaultTitle: 'Tepoztlán Tourism Guide - Discover the Magic Town',
    defaultDescription:
      "Your comprehensive guide to Tepoztlán's best restaurants, hotels, eco-lodges, cafés, attractions, and local services. Discover the magic of this UNESCO World Heritage Pueblo Mágico in Morelos, Mexico.",
    keywords: [
      'Tepoztlán',
      'Pueblo Mágico',
      'Morelos Mexico',
      'Tepozteco Pyramid',
      'Mexican tourism',
      'hotels Tepoztlán',
      'restaurants Tepoztlán',
      'eco-lodges Mexico',
      'weekend getaway Mexico',
      'mystical Mexico',
      'indigenous culture',
      'UNESCO World Heritage',
    ],
  },
}

/**
 * Generate localized metadata for a page
 *
 * @example
 * export async function generateMetadata({ params }): Promise<Metadata> {
 *   const { lang } = await params
 *   return getLocalizedMetadata(lang, {
 *     title: 'Restaurantes',
 *     description: 'Los mejores restaurantes de Tepoztlán',
 *     path: '/comer/restaurantes',
 *   })
 * }
 */
export function getLocalizedMetadata(
  locale: Locale,
  options: {
    title?: string
    description?: string
    path?: string
    images?: Array<{ url: string; width: number; height: number; alt?: string }>
    noIndex?: boolean
  } = {}
): Metadata {
  const siteUrl = getSiteUrl()
  const translations = metadataTranslations[locale]
  const { title, description, path = '', images, noIndex = false } = options

  // Alternate locale
  const alternateLocale = locale === 'es' ? 'en' : 'es'

  // Full title with template
  const fullTitle = title
    ? `${title} | ${translations.siteName}`
    : translations.defaultTitle

  // Full URL for this page
  const url = `${siteUrl}/${locale}${path}`

  // Alternate language URL
  const alternateUrl = `${siteUrl}/${alternateLocale}${path}`

  return {
    title: fullTitle,
    description: description || translations.defaultDescription,
    keywords: translations.keywords,
    openGraph: {
      title: fullTitle,
      description: description || translations.defaultDescription,
      url,
      siteName: translations.siteName,
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      type: 'website',
      images: images || [
        {
          url: '/images/og-tepoztlan-hero.jpg',
          width: 1200,
          height: 630,
          alt: locale === 'es' ? 'Tepoztlán - Pueblo Mágico' : 'Tepoztlán - Magic Town',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description || translations.defaultDescription,
      images: images?.map((img) => img.url) || ['/images/twitter-tepoztlan-hero.jpg'],
    },
    alternates: {
      canonical: url,
      languages: {
        'es-MX': `${siteUrl}/es${path}`,
        'en-US': `${siteUrl}/en${path}`,
      },
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  }
}

/**
 * Page-specific metadata translations
 */
export const pageMetadata = {
  es: {
    stay: {
      title: 'Hospedaje en Tepoztlán',
      description:
        'Encuentra el lugar perfecto para tu estancia en Tepoztlán. Hoteles, eco-lodges, rentas vacacionales y más.',
    },
    eat: {
      title: 'Restaurantes y Comida en Tepoztlán',
      description:
        'Descubre los mejores restaurantes, cafés y experiencias gastronómicas de Tepoztlán. Sabores que cuentan historias.',
    },
    experience: {
      title: 'Experiencias en Tepoztlán',
      description:
        'Aventuras inolvidables en Tepoztlán: senderismo, pirámide del Tepozteco, bienestar, cultura y más.',
    },
    events: {
      title: 'Eventos en Tepoztlán',
      description:
        'Calendario de festivales, mercados y eventos especiales en Tepoztlán. No te pierdas lo que pasa en el pueblo.',
    },
  },
  en: {
    stay: {
      title: 'Accommodation in Tepoztlán',
      description:
        'Find the perfect place for your stay in Tepoztlán. Hotels, eco-lodges, vacation rentals and more.',
    },
    eat: {
      title: 'Restaurants & Food in Tepoztlán',
      description:
        "Discover Tepoztlán's best restaurants, cafés and dining experiences. Flavors that tell stories.",
    },
    experience: {
      title: 'Experiences in Tepoztlán',
      description:
        'Unforgettable adventures in Tepoztlán: hiking, Tepozteco pyramid, wellness, culture and more.',
    },
    events: {
      title: 'Events in Tepoztlán',
      description:
        "Calendar of festivals, markets and special events in Tepoztlán. Don't miss what's happening in town.",
    },
  },
}

/**
 * Generate breadcrumb JSON-LD for a page
 *
 * @example
 * const breadcrumbSchema = generateBreadcrumbSchema('es', [
 *   { name: 'Inicio', url: '/es' },
 *   { name: 'Restaurantes', url: '/es/comer/restaurantes' },
 * ])
 */
export function generateBreadcrumbSchema(
  locale: Locale,
  breadcrumbs: Array<{ name: string; url: string }>
) {
  const siteUrl = getSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.url}`,
    })),
  }
}

/**
 * Generate Restaurant/LocalBusiness JSON-LD schema
 *
 * @example
 * const restaurantSchema = generateBusinessSchema({
 *   type: 'Restaurant',
 *   name: 'La Casa del Tepozteco',
 *   description: 'Restaurante de comida mexicana tradicional',
 *   address: {
 *     street: 'Avenida 5 de Mayo 21',
 *     city: 'Tepoztlán',
 *     state: 'Morelos',
 *     postalCode: '62520',
 *   },
 *   phone: '+52-739-395-0010',
 *   coordinates: { lat: 18.9847, lng: -99.0940 },
 *   priceRange: '$$',
 * })
 */
export function generateBusinessSchema(business: {
  type: 'Restaurant' | 'Hotel' | 'LodgingBusiness' | 'LocalBusiness'
  name: string
  description: string
  address: {
    street: string
    city: string
    state: string
    postalCode: string
  }
  phone?: string
  coordinates?: { lat: number; lng: number }
  priceRange?: string
  cuisineType?: string
  rating?: { value: number; count: number }
  image?: string
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': business.type,
    name: business.name,
    description: business.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.postalCode,
      addressCountry: 'MX',
    },
  }

  if (business.phone) {
    schema.telephone = business.phone
  }

  if (business.coordinates) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: business.coordinates.lat,
      longitude: business.coordinates.lng,
    }
  }

  if (business.priceRange) {
    schema.priceRange = business.priceRange
  }

  if (business.cuisineType && business.type === 'Restaurant') {
    schema.servesCuisine = business.cuisineType
  }

  if (business.rating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: business.rating.value,
      reviewCount: business.rating.count,
    }
  }

  if (business.image) {
    schema.image = business.image
  }

  return schema
}
