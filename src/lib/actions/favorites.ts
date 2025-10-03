'use server'

import { auth } from '@/auth'
import { db } from '@/lib/db'
import { favorites } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function addFavorite(businessId: number) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return { success: false, error: 'You must be logged in to add favorites' }
    }

    // Check if already favorited
    const existing = await db
      .select()
      .from(favorites)
      .where(
        and(
          eq(favorites.userId, session.user.id),
          eq(favorites.businessId, businessId)
        )
      )
      .limit(1)

    if (existing.length > 0) {
      return { success: false, error: 'Already in favorites' }
    }

    // Add to favorites
    await db.insert(favorites).values({
      userId: session.user.id,
      businessId,
    })

    revalidatePath('/[lang]/user')

    return { success: true }
  } catch (error) {
    console.error('Error adding favorite:', error)
    return { success: false, error: 'Failed to add favorite' }
  }
}

export async function removeFavorite(businessId: number) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return { success: false, error: 'You must be logged in' }
    }

    await db
      .delete(favorites)
      .where(
        and(
          eq(favorites.userId, session.user.id),
          eq(favorites.businessId, businessId)
        )
      )

    revalidatePath('/[lang]/user')

    return { success: true }
  } catch (error) {
    console.error('Error removing favorite:', error)
    return { success: false, error: 'Failed to remove favorite' }
  }
}

export async function toggleFavorite(businessId: number) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return { success: false, error: 'You must be logged in to add favorites' }
    }

    // Check if already favorited
    const existing = await db
      .select()
      .from(favorites)
      .where(
        and(
          eq(favorites.userId, session.user.id),
          eq(favorites.businessId, businessId)
        )
      )
      .limit(1)

    if (existing.length > 0) {
      // Remove from favorites
      await db
        .delete(favorites)
        .where(
          and(
            eq(favorites.userId, session.user.id),
            eq(favorites.businessId, businessId)
          )
        )

      revalidatePath('/[lang]/user')
      return { success: true, isFavorited: false }
    } else {
      // Add to favorites
      await db.insert(favorites).values({
        userId: session.user.id,
        businessId,
      })

      revalidatePath('/[lang]/user')
      return { success: true, isFavorited: true }
    }
  } catch (error) {
    console.error('Error toggling favorite:', error)
    return { success: false, error: 'Failed to toggle favorite' }
  }
}

export async function getUserFavorites(userId: string) {
  try {
    const userFavorites = await db
      .select()
      .from(favorites)
      .where(eq(favorites.userId, userId))

    return { success: true, favorites: userFavorites }
  } catch (error) {
    console.error('Error getting favorites:', error)
    return { success: false, error: 'Failed to get favorites', favorites: [] }
  }
}

export async function isFavorited(businessId: number, userId?: string) {
  try {
    if (!userId) {
      const session = await auth()
      if (!session?.user?.id) {
        return { success: true, isFavorited: false }
      }
      userId = session.user.id
    }

    const existing = await db
      .select()
      .from(favorites)
      .where(
        and(
          eq(favorites.userId, userId),
          eq(favorites.businessId, businessId)
        )
      )
      .limit(1)

    return { success: true, isFavorited: existing.length > 0 }
  } catch (error) {
    console.error('Error checking favorite:', error)
    return { success: false, isFavorited: false }
  }
}
