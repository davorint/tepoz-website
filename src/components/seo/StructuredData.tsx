import React from 'react'

interface StructuredDataProps {
  type?: 'website' | 'restaurant' | 'hotel' | 'tourist-attraction' | 'local-business' | 'article'
  title?: string
  description?: string
  image?: string
  price?: {
    min?: number
    max?: number
    currency?: string
  }
  rating?: {
    value: number
    count: number
  }
  address?: {
    street?: string
    city: string
    state: string
    country: string
    postalCode?: string
  }
  geo?: {
    latitude: string
    longitude: string
  }
  openingHours?: string[]
  telephone?: string
  email?: string
  url?: string
  pathname?: string
}

export default function StructuredData({
  type = 'website',
  title,
  description,
  image,
  price,
  rating,
  address,
  geo,
  openingHours,
  telephone,
  email,
  url,
  pathname = ''
}: StructuredDataProps) {
  const currentUrl = `https://tepoztlan.com${pathname}`

  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      url: url || currentUrl,
      name: title,
      description,
      image: image ? `https://tepoztlan.com${image}` : undefined
    }

    switch (type) {
      case 'restaurant':
        return {
          ...baseData,
          "@type": "Restaurant",
          servesCuisine: "Mexican",
          address: address ? {
            "@type": "PostalAddress",
            streetAddress: address.street,
            addressLocality: address.city,
            addressRegion: address.state,
            addressCountry: address.country,
            postalCode: address.postalCode
          } : undefined,
          geo: geo ? {
            "@type": "GeoCoordinates",
            latitude: geo.latitude,
            longitude: geo.longitude
          } : undefined,
          openingHours: openingHours,
          telephone: telephone,
          email: email,
          priceRange: price ? `${price.currency || '$'}${price.min || ''}-${price.currency || '$'}${price.max || ''}` : undefined,
          aggregateRating: rating ? {
            "@type": "AggregateRating",
            ratingValue: rating.value,
            reviewCount: rating.count
          } : undefined
        }

      case 'hotel':
        return {
          ...baseData,
          "@type": "Hotel",
          address: address ? {
            "@type": "PostalAddress",
            streetAddress: address.street,
            addressLocality: address.city,
            addressRegion: address.state,
            addressCountry: address.country,
            postalCode: address.postalCode
          } : undefined,
          geo: geo ? {
            "@type": "GeoCoordinates",
            latitude: geo.latitude,
            longitude: geo.longitude
          } : undefined,
          telephone: telephone,
          email: email,
          priceRange: price ? `${price.currency || '$'}${price.min || ''}-${price.currency || '$'}${price.max || ''}` : undefined,
          aggregateRating: rating ? {
            "@type": "AggregateRating",
            ratingValue: rating.value,
            reviewCount: rating.count
          } : undefined,
          amenityFeature: [
            { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
            { "@type": "LocationFeatureSpecification", name: "Parking", value: true }
          ]
        }

      case 'tourist-attraction':
        return {
          ...baseData,
          "@type": "TouristAttraction",
          address: address ? {
            "@type": "PostalAddress",
            streetAddress: address.street,
            addressLocality: address.city,
            addressRegion: address.state,
            addressCountry: address.country,
            postalCode: address.postalCode
          } : undefined,
          geo: geo ? {
            "@type": "GeoCoordinates",
            latitude: geo.latitude,
            longitude: geo.longitude
          } : undefined,
          openingHours: openingHours,
          telephone: telephone,
          isAccessibleForFree: true,
          aggregateRating: rating ? {
            "@type": "AggregateRating",
            ratingValue: rating.value,
            reviewCount: rating.count
          } : undefined
        }

      case 'local-business':
        return {
          ...baseData,
          "@type": "LocalBusiness",
          address: address ? {
            "@type": "PostalAddress",
            streetAddress: address.street,
            addressLocality: address.city,
            addressRegion: address.state,
            addressCountry: address.country,
            postalCode: address.postalCode
          } : undefined,
          geo: geo ? {
            "@type": "GeoCoordinates",
            latitude: geo.latitude,
            longitude: geo.longitude
          } : undefined,
          openingHours: openingHours,
          telephone: telephone,
          email: email,
          aggregateRating: rating ? {
            "@type": "AggregateRating",
            ratingValue: rating.value,
            reviewCount: rating.count
          } : undefined
        }

      case 'article':
        return {
          ...baseData,
          "@type": "Article",
          publisher: {
            "@type": "Organization",
            name: "Tepoztlán Tourism Guide",
            logo: {
              "@type": "ImageObject",
              url: "https://tepoztlan.com/images/logo.png"
            }
          },
          author: {
            "@type": "Organization",
            name: "Tepoztlán Tourism Guide"
          },
          datePublished: new Date().toISOString(),
          dateModified: new Date().toISOString()
        }

      default:
        return {
          ...baseData,
          "@type": "WebSite",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://tepoztlan.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
    }
  }

  const structuredData = getStructuredData()

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
}