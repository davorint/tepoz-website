'use server'

import { db } from '@/lib/db'
import { subscribers } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SubscribeInput {
  email: string
  name?: string
  language?: 'es' | 'en'
}

export async function subscribeToNewsletter({ email, name, language = 'es' }: SubscribeInput) {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Invalid email format' }
    }

    // Check if already subscribed
    const existing = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email))
      .limit(1)

    if (existing.length > 0) {
      // If previously unsubscribed, reactivate
      if (!existing[0].active) {
        await db
          .update(subscribers)
          .set({ active: true, unsubscribedAt: null })
          .where(eq(subscribers.email, email))

        return { success: true, message: 'Subscription reactivated' }
      }

      return { success: false, error: 'Email already subscribed' }
    }

    // Add new subscriber
    const [subscriber] = await db.insert(subscribers).values({
      email,
      name: name || null,
      language,
      active: true,
      verified: false,
    }).returning()

    // Send welcome email
    try {
      const welcomeMessage = language === 'es' ? {
        subject: '¡Bienvenido a TodoTepoz!',
        greeting: `¡Hola${name ? ` ${name}` : ''}!`,
        message: 'Gracias por suscribirte a nuestro boletín de noticias. Te mantendremos informado sobre los mejores lugares, eventos y experiencias en Tepoztlán.',
        tips: 'Descubre',
        tipsList: [
          'Los mejores restaurantes y cafés locales',
          'Eventos culturales y festivales',
          'Experiencias únicas y tours',
          'Consejos de viaje y recomendaciones'
        ],
        unsubscribe: 'Si deseas cancelar tu suscripción en cualquier momento, puedes hacerlo desde el enlace en nuestros correos.'
      } : {
        subject: 'Welcome to TodoTepoz!',
        greeting: `Hello${name ? ` ${name}` : ''}!`,
        message: 'Thank you for subscribing to our newsletter. We\'ll keep you updated on the best places, events, and experiences in Tepoztlán.',
        tips: 'Discover',
        tipsList: [
          'The best local restaurants and cafes',
          'Cultural events and festivals',
          'Unique experiences and tours',
          'Travel tips and recommendations'
        ],
        unsubscribe: 'You can unsubscribe at any time using the link in our emails.'
      }

      await resend.emails.send({
        from: 'TodoTepoz <noreply@todotepoz.com>',
        to: [email],
        subject: welcomeMessage.subject,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #d97706 0%, #ea580c 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px;">🌄 TodoTepoz</h1>
              </div>

              <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h2 style="color: #d97706; margin-top: 0;">${welcomeMessage.greeting}</h2>
                <p style="font-size: 16px; line-height: 1.8;">${welcomeMessage.message}</p>

                <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 25px 0;">
                  <h3 style="color: #d97706; margin-top: 0;">${welcomeMessage.tips}:</h3>
                  <ul style="margin: 10px 0; padding-left: 20px;">
                    ${welcomeMessage.tipsList.map(tip => `<li style="margin: 8px 0;">${tip}</li>`).join('')}
                  </ul>
                </div>

                <p style="font-size: 14px; color: #666; margin-top: 30px;">${welcomeMessage.unsubscribe}</p>

                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                  <p style="color: #888; font-size: 12px; margin: 5px 0;">TodoTepoz - Your guide to magical Tepoztlán</p>
                  <p style="color: #888; font-size: 12px; margin: 5px 0;">Tepoztlán, Morelos, México</p>
                </div>
              </div>
            </body>
          </html>
        `,
      })
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
      // Continue - subscription is still successful
    }

    revalidatePath('/')

    return { success: true, message: 'Successfully subscribed' }
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    return { success: false, error: 'Failed to subscribe' }
  }
}

export async function unsubscribeFromNewsletter(email: string) {
  try {
    const subscriber = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email))
      .limit(1)

    if (subscriber.length === 0) {
      return { success: false, error: 'Email not found' }
    }

    await db
      .update(subscribers)
      .set({
        active: false,
        unsubscribedAt: new Date(),
      })
      .where(eq(subscribers.email, email))

    return { success: true, message: 'Successfully unsubscribed' }
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error)
    return { success: false, error: 'Failed to unsubscribe' }
  }
}

export async function getSubscriberCount() {
  try {
    const result = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.active, true))

    return { success: true, count: result.length }
  } catch (error) {
    console.error('Error getting subscriber count:', error)
    return { success: false, count: 0 }
  }
}
