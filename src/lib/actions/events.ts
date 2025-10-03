'use server'

import { db } from '@/lib/db'
import { events } from '@/lib/db/schema'
import { eq, and, gte, lte, desc, or, like } from 'drizzle-orm'
import { cache } from 'react'

export const getAllEvents = cache(async (filters?: {
  featured?: boolean
  upcoming?: boolean
  limit?: number
  offset?: number
}) => {
  const {
    featured,
    upcoming = true,
    limit = 50,
    offset = 0,
  } = filters || {}

  const conditions = [eq(events.active, true)]

  if (featured !== undefined) {
    conditions.push(eq(events.featured, featured))
  }

  if (upcoming) {
    // Only show events that haven't ended yet
    conditions.push(gte(events.startDate, new Date()))
  }

  const results = await db
    .select()
    .from(events)
    .where(and(...conditions))
    .orderBy(desc(events.startDate))
    .limit(limit)
    .offset(offset)

  return results
})

export const getEventBySlug = cache(async (slug: string) => {
  const [event] = await db
    .select()
    .from(events)
    .where(and(eq(events.slug, slug), eq(events.active, true)))
    .limit(1)

  return event || null
})

export const getFeaturedEvents = cache(async (limit = 3) => {
  const results = await db
    .select()
    .from(events)
    .where(
      and(
        eq(events.featured, true),
        eq(events.active, true),
        gte(events.startDate, new Date())
      )
    )
    .orderBy(desc(events.startDate))
    .limit(limit)

  return results
})

export const getEventsByDateRange = cache(async (
  startDate: Date,
  endDate: Date
) => {
  const results = await db
    .select()
    .from(events)
    .where(
      and(
        eq(events.active, true),
        gte(events.startDate, startDate),
        lte(events.startDate, endDate)
      )
    )
    .orderBy(desc(events.startDate))

  return results
})

export const searchEvents = cache(async (query: string, limit = 20) => {
  if (!query) return []

  const results = await db
    .select()
    .from(events)
    .where(
      and(
        eq(events.active, true),
        or(
          like(events.titleEs, `%${query}%`),
          like(events.titleEn, `%${query}%`),
          like(events.descriptionEs, `%${query}%`),
          like(events.descriptionEn, `%${query}%`)
        )!
      )
    )
    .orderBy(desc(events.startDate))
    .limit(limit)

  return results
})
