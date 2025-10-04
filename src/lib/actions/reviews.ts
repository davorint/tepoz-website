'use server'

import { db } from '@/lib/db'
import { reviews } from '@/lib/db/schema'
import { auth } from '@/auth'
import { eq, desc, and } from 'drizzle-orm'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitReview(data: {
  businessId: number
  rating: number
  comment: string
  language: 'es' | 'en'
}) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return {
        success: false,
        error: data.language === 'es'
          ? 'Debes iniciar sesión para dejar una reseña'
          : 'You must be logged in to leave a review'
      }
    }

    // Check if user already reviewed this business
    const [existingReview] = await db
      .select()
      .from(reviews)
      .where(
        and(
          eq(reviews.businessId, data.businessId),
          eq(reviews.userId, session.user.id)
        )
      )
      .limit(1)

    if (existingReview) {
      return {
        success: false,
        error: data.language === 'es'
          ? 'Ya has dejado una reseña para este negocio'
          : 'You have already reviewed this business'
      }
    }

    // Insert review
    const [newReview] = await db
      .insert(reviews)
      .values({
        businessId: data.businessId,
        userId: session.user.id,
        rating: data.rating,
        contentEs: data.language === 'es' ? data.comment : '',
        contentEn: data.language === 'en' ? data.comment : '',
      })
      .returning()

    // Send notification email to admin
    await sendReviewNotification({
      businessId: data.businessId,
      userName: session.user.name || session.user.email || 'Anonymous',
      userEmail: session.user.email || '',
      rating: data.rating,
      comment: data.comment,
      reviewId: newReview.id,
      language: data.language,
    })

    return {
      success: true,
      review: newReview,
      message: data.language === 'es'
        ? '¡Gracias por tu reseña!'
        : 'Thank you for your review!'
    }
  } catch (error) {
    console.error('Submit review error:', error)
    return {
      success: false,
      error: data.language === 'es'
        ? 'Error al enviar tu reseña. Inténtalo de nuevo'
        : 'Error submitting your review. Please try again'
    }
  }
}

async function sendReviewNotification(data: {
  businessId: number
  userName: string
  userEmail: string
  rating: number
  comment: string
  reviewId: number
  language: 'es' | 'en'
}) {
  const stars = '⭐'.repeat(data.rating)
  const emptyStars = '☆'.repeat(5 - data.rating)

  try {
    await resend.emails.send({
      from: 'TodoTepoz Reviews <noreply@todotepoz.com>',
      to: ['info@todotepoz.com'],
      subject: `Nueva Reseña ${data.rating}⭐ - Negocio #${data.businessId}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0;">
          <div style="background: linear-gradient(135deg, #d97706 0%, #ea580c 100%); padding: 30px 20px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">📝 Nueva Reseña Recibida</h1>
          </div>

          <div style="padding: 30px 20px;">
            <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <p style="margin: 5px 0;"><strong>ID del Negocio:</strong> ${data.businessId}</p>
              <p style="margin: 5px 0;"><strong>Usuario:</strong> ${data.userName}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${data.userEmail}</p>
              <p style="margin: 5px 0;"><strong>Idioma:</strong> ${data.language === 'es' ? 'Español' : 'English'}</p>
            </div>

            <div style="background-color: #fef3c7; border-left: 4px solid #d97706; padding: 20px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0; font-size: 24px;">
                <strong>Calificación:</strong> ${stars}${emptyStars} (${data.rating}/5)
              </p>
            </div>

            <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">Comentario:</h3>
              <p style="color: #4b5563; line-height: 1.8; white-space: pre-wrap;">${data.comment}</p>
            </div>

            <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-top: 25px;">
              <p style="margin: 5px 0; color: #6b7280; font-size: 14px;">
                <strong>ID de Reseña:</strong> ${data.reviewId}
              </p>
              <p style="margin: 5px 0; color: #6b7280; font-size: 14px;">
                <strong>Fecha:</strong> ${new Date().toLocaleString('es-MX', {
                  dateStyle: 'full',
                  timeStyle: 'short',
                  timeZone: 'America/Mexico_City'
                })}
              </p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="color: #9ca3af; font-size: 14px; margin: 0;">
                TodoTepoz - Sistema de Reseñas
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })
  } catch (error) {
    console.error('Error sending review notification:', error)
    // Don't throw - review was saved successfully even if email fails
  }
}

export async function getBusinessReviews(businessId: number, limit = 10) {
  try {
    const businessReviews = await db
      .select()
      .from(reviews)
      .where(eq(reviews.businessId, businessId))
      .orderBy(desc(reviews.createdAt))
      .limit(limit)

    return {
      success: true,
      reviews: businessReviews
    }
  } catch (error) {
    console.error('Get reviews error:', error)
    return {
      success: false,
      error: 'Error al cargar reseñas',
      reviews: []
    }
  }
}

export async function getUserReviews(userId: string, limit = 20) {
  try {
    const userReviews = await db
      .select()
      .from(reviews)
      .where(eq(reviews.userId, userId))
      .orderBy(desc(reviews.createdAt))
      .limit(limit)

    return {
      success: true,
      reviews: userReviews
    }
  } catch (error) {
    console.error('Get user reviews error:', error)
    return {
      success: false,
      error: 'Error al cargar tus reseñas',
      reviews: []
    }
  }
}
