'use server'

import { db } from '@/lib/db'
import { businesses, hotels, restaurants, experiences, reviews } from '@/lib/db/schema'
import { eq, and, like, or, desc, sql } from 'drizzle-orm'
import { cache } from 'react'

// Cache the results for the duration of the request
export const getAllBusinesses = cache(async (filters?: {
  category?: string
  subcategory?: string
  search?: string
  verified?: boolean
  featured?: boolean
  limit?: number
  offset?: number
}) => {
  const {
    category,
    subcategory,
    search,
    verified,
    featured,
    limit = 50,
    offset = 0,
  } = filters || {}

  // Build where conditions
  const conditions = [eq(businesses.active, true)]

  if (category) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    conditions.push(eq(businesses.category, category as any))
  }

  if (subcategory) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    conditions.push(eq(businesses.subcategory, subcategory as any))
  }

  if (verified !== undefined) {
    conditions.push(eq(businesses.verified, verified))
  }

  if (featured !== undefined) {
    conditions.push(eq(businesses.featured, featured))
  }

  if (search) {
    conditions.push(
      or(
        like(businesses.nameEs, `%${search}%`),
        like(businesses.nameEn, `%${search}%`),
        like(businesses.descriptionEs, `%${search}%`),
        like(businesses.descriptionEn, `%${search}%`)
      )!
    )
  }

  const results = await db
    .select()
    .from(businesses)
    .where(and(...conditions))
    .orderBy(desc(businesses.rating), desc(businesses.reviewCount))
    .limit(limit)
    .offset(offset)

  return results
})

export const getBusinessBySlug = cache(async (slug: string) => {
  const [business] = await db
    .select()
    .from(businesses)
    .where(and(eq(businesses.slug, slug), eq(businesses.active, true)))
    .limit(1)

  return business || null
})

export const getBusinessWithDetails = cache(async (slug: string) => {
  const business = await getBusinessBySlug(slug)

  if (!business) return null

  // Get category-specific details
  let details = null

  if (business.category === 'hotel') {
    const [hotelDetails] = await db
      .select()
      .from(hotels)
      .where(eq(hotels.businessId, business.id))
      .limit(1)
    details = hotelDetails
  } else if (business.category === 'restaurant' || business.category === 'cafe' || business.category === 'bar') {
    const [restaurantDetails] = await db
      .select()
      .from(restaurants)
      .where(eq(restaurants.businessId, business.id))
      .limit(1)
    details = restaurantDetails
  } else if (business.category === 'experience') {
    const [experienceDetails] = await db
      .select()
      .from(experiences)
      .where(eq(experiences.businessId, business.id))
      .limit(1)
    details = experienceDetails
  }

  return {
    ...business,
    details,
  }
})

export const getBusinessReviews = cache(async (businessId: number, limit = 10) => {
  const businessReviews = await db
    .select()
    .from(reviews)
    .where(eq(reviews.businessId, businessId))
    .orderBy(desc(reviews.createdAt))
    .limit(limit)

  return businessReviews
})

export const getFeaturedBusinesses = cache(async (category?: string, limit = 6) => {
  const conditions = [
    eq(businesses.featured, true),
    eq(businesses.active, true),
  ]

  if (category) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    conditions.push(eq(businesses.category, category as any))
  }

  const results = await db
    .select()
    .from(businesses)
    .where(and(...conditions))
    .orderBy(desc(businesses.rating))
    .limit(limit)

  return results
})

export const searchBusinesses = cache(async (query: string, limit = 20) => {
  if (!query) return []

  const results = await db
    .select()
    .from(businesses)
    .where(
      and(
        eq(businesses.active, true),
        or(
          like(businesses.nameEs, `%${query}%`),
          like(businesses.nameEn, `%${query}%`),
          like(businesses.descriptionEs, `%${query}%`),
          like(businesses.descriptionEn, `%${query}%`)
        )!
      )
    )
    .orderBy(desc(businesses.rating))
    .limit(limit)

  return results
})

export const getBusinessStats = cache(async () => {
  const stats = await db
    .select({
      category: businesses.category,
      count: sql<number>`count(*)`,
      avgRating: sql<number>`avg(${businesses.rating})`,
    })
    .from(businesses)
    .where(eq(businesses.active, true))
    .groupBy(businesses.category)

  return stats
})

export const getNearbyBusinesses = cache(async (
  latitude: number,
  longitude: number,
  radiusKm = 5,
  limit = 10
) => {
  // Simple distance calculation using Haversine formula
  // Note: For production, consider using PostGIS for better performance
  const results = await db
    .select()
    .from(businesses)
    .where(eq(businesses.active, true))
    .limit(100) // Get more than needed to filter by distance

  // Calculate distances and filter
  const withDistances = results.map(business => {
    const lat1 = parseFloat(business.latitude)
    const lon1 = parseFloat(business.longitude)
    const lat2 = latitude
    const lon2 = longitude

    const R = 6371 // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c

    return {
      ...business,
      distance,
    }
  })

  return withDistances
    .filter(b => b.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
})
