'use server'

import { auth } from '@/auth'
import { db } from '@/lib/db'
import { reviews } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

interface SubmitReviewInput {
  businessId: number
  rating: number
  comment: string
  locale: 'es' | 'en'
}

export async function submitReview({ businessId, rating, comment, locale }: SubmitReviewInput) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return { success: false, error: 'You must be logged in to submit a review' }
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return { success: false, error: 'Rating must be between 1 and 5' }
    }

    // Validate comment
    if (!comment.trim()) {
      return { success: false, error: 'Comment is required' }
    }

    // Check if user already reviewed this business
    const existingReview = await db
      .select()
      .from(reviews)
      .where(
        and(
          eq(reviews.userId, session.user.id),
          eq(reviews.businessId, businessId)
        )
      )
      .limit(1)

    if (existingReview.length > 0) {
      return { success: false, error: 'You have already reviewed this business' }
    }

    // Insert review (store in appropriate language field based on locale)
    await db.insert(reviews).values({
      businessId,
      userId: session.user.id,
      rating,
      contentEs: locale === 'es' ? comment : '',
      contentEn: locale === 'en' ? comment : '',
    })

    revalidatePath(`/[lang]/search`)
    revalidatePath(`/[lang]/food-drink`)
    revalidatePath(`/[lang]/stay`)

    return { success: true }
  } catch (error) {
    console.error('Error submitting review:', error)
    return { success: false, error: 'Failed to submit review' }
  }
}

export async function getBusinessReviews(businessId: number) {
  try {
    const businessReviews = await db
      .select({
        id: reviews.id,
        userId: reviews.userId,
        businessId: reviews.businessId,
        rating: reviews.rating,
        contentEs: reviews.contentEs,
        contentEn: reviews.contentEn,
        helpful: reviews.helpful,
        verified: reviews.verified,
        createdAt: reviews.createdAt,
      })
      .from(reviews)
      .where(eq(reviews.businessId, businessId))
      .orderBy(desc(reviews.createdAt))

    return { success: true, reviews: businessReviews }
  } catch (error) {
    console.error('Error getting reviews:', error)
    return { success: false, error: 'Failed to get reviews', reviews: [] }
  }
}

export async function getUserReviews(userId?: string) {
  try {
    if (!userId) {
      const session = await auth()
      if (!session?.user?.id) {
        return { success: false, error: 'Not authenticated', reviews: [] }
      }
      userId = session.user.id
    }

    const userReviews = await db
      .select({
        id: reviews.id,
        userId: reviews.userId,
        businessId: reviews.businessId,
        rating: reviews.rating,
        contentEs: reviews.contentEs,
        contentEn: reviews.contentEn,
        helpful: reviews.helpful,
        verified: reviews.verified,
        createdAt: reviews.createdAt,
      })
      .from(reviews)
      .where(eq(reviews.userId, userId))
      .orderBy(desc(reviews.createdAt))

    return { success: true, reviews: userReviews }
  } catch (error) {
    console.error('Error getting user reviews:', error)
    return { success: false, error: 'Failed to get reviews', reviews: [] }
  }
}

export async function markReviewHelpful(reviewId: number) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return { success: false, error: 'You must be logged in' }
    }

    // Get current helpful count
    const review = await db
      .select({ helpful: reviews.helpful })
      .from(reviews)
      .where(eq(reviews.id, reviewId))
      .limit(1)

    if (review.length === 0) {
      return { success: false, error: 'Review not found' }
    }

    // Increment helpful count
    await db
      .update(reviews)
      .set({ helpful: (review[0].helpful || 0) + 1 })
      .where(eq(reviews.id, reviewId))

    revalidatePath('/[lang]/search')

    return { success: true, helpful: (review[0].helpful || 0) + 1 }
  } catch (error) {
    console.error('Error marking review helpful:', error)
    return { success: false, error: 'Failed to mark review helpful' }
  }
}

export async function deleteReview(reviewId: number) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return { success: false, error: 'You must be logged in' }
    }

    // Check if user owns this review
    const review = await db
      .select({ userId: reviews.userId })
      .from(reviews)
      .where(eq(reviews.id, reviewId))
      .limit(1)

    if (review.length === 0) {
      return { success: false, error: 'Review not found' }
    }

    if (review[0].userId !== session.user.id && session.user.role !== 'admin') {
      return { success: false, error: 'You can only delete your own reviews' }
    }

    await db.delete(reviews).where(eq(reviews.id, reviewId))

    revalidatePath('/[lang]/search')
    revalidatePath('/[lang]/user')

    return { success: true }
  } catch (error) {
    console.error('Error deleting review:', error)
    return { success: false, error: 'Failed to delete review' }
  }
}
