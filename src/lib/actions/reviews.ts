'use server'

import { auth } from '@/auth'
import { db } from '@/lib/db'
import { reviews } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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
    const [review] = await db.insert(reviews).values({
      businessId,
      userId: session.user.id,
      rating,
      contentEs: locale === 'es' ? comment : '',
      contentEn: locale === 'en' ? comment : '',
    }).returning()

    // Send notification email to admin
    try {
      const stars = '⭐'.repeat(rating)
      await resend.emails.send({
        from: 'TodoTepoz <noreply@todotepoz.com>',
        to: ['info@todotepoz.com'],
        subject: `New ${rating}-Star Review - Business #${businessId}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
                <h2 style="color: #d97706; margin-top: 0;">📝 New Review Submitted</h2>

                <div style="background-color: white; padding: 20px; border-radius: 4px; margin-top: 20px;">
                  <p style="margin: 10px 0;"><strong>Business ID:</strong> ${businessId}</p>
                  <p style="margin: 10px 0;"><strong>User:</strong> ${session.user.name || session.user.email}</p>
                  <p style="margin: 10px 0;"><strong>Rating:</strong> ${stars} (${rating}/5)</p>
                  <p style="margin: 10px 0;"><strong>Language:</strong> ${locale.toUpperCase()}</p>

                  <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
                    <p style="margin: 10px 0;"><strong>Review:</strong></p>
                    <p style="margin: 10px 0; padding: 15px; background-color: #fef3c7; border-radius: 4px; white-space: pre-wrap;">${comment}</p>
                  </div>
                </div>

                <p style="font-size: 12px; color: #666; margin-top: 20px;">
                  Review ID: ${review.id} | Submitted: ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}
                </p>
              </div>
            </body>
          </html>
        `,
      })
    } catch (emailError) {
      console.error('Failed to send review notification email:', emailError)
      // Continue - review is still saved
    }

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
