'use server'

import { db } from '@/lib/db'
import { subscribers } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function subscribeToNewsletter(
  email: string,
  name?: string,
  language: 'es' | 'en' = 'es'
) {
  try {
    // Check if already subscribed
    const [existing] = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email))
      .limit(1)

    if (existing) {
      if (existing.active) {
        return {
          success: false,
          error: language === 'es'
            ? 'Este correo ya está suscrito a nuestro boletín'
            : 'This email is already subscribed to our newsletter'
        }
      } else {
        // Reactivate subscription
        await db
          .update(subscribers)
          .set({
            active: true,
            unsubscribedAt: null,
          })
          .where(eq(subscribers.email, email))

        // Send welcome email
        await sendWelcomeEmail(email, name, language)

        return {
          success: true,
          message: language === 'es'
            ? '¡Bienvenido de nuevo! Tu suscripción ha sido reactivada'
            : 'Welcome back! Your subscription has been reactivated'
        }
      }
    }

    // Create new subscription
    await db.insert(subscribers).values({
      email,
      name: name || null,
      language,
      active: true,
    })

    // Send welcome email
    await sendWelcomeEmail(email, name, language)

    return {
      success: true,
      message: language === 'es'
        ? '¡Gracias por suscribirte! Revisa tu correo para confirmar'
        : 'Thank you for subscribing! Check your email to confirm'
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return {
      success: false,
      error: language === 'es'
        ? 'Error al procesar tu suscripción. Inténtalo de nuevo'
        : 'Error processing your subscription. Please try again'
    }
  }
}

async function sendWelcomeEmail(
  email: string,
  name: string | undefined,
  language: 'es' | 'en'
) {
  const welcomeContent = language === 'es' ? {
    subject: '¡Bienvenido a TodoTepoz! 🌄',
    greeting: `¡Hola${name ? ` ${name}` : ''}!`,
    title: 'Gracias por suscribirte',
    message: 'Gracias por suscribirte a nuestro boletín de noticias. Recibirás las mejores recomendaciones, eventos y experiencias de Tepoztlán directamente en tu bandeja de entrada.',
    benefitsTitle: 'Qué puedes esperar:',
    benefits: [
      '🍽️ Los mejores restaurantes y cafés locales',
      '🎉 Eventos culturales y festivales',
      '🏔️ Experiencias únicas y tours',
      '💡 Consejos de viaje y recomendaciones'
    ],
    footer: 'Mantente conectado y descubre todo lo que Tepoztlán tiene para ofrecer.',
    unsubscribe: 'Si prefieres no recibir estos correos, puedes darte de baja en cualquier momento.',
    signature: 'El equipo de TodoTepoz'
  } : {
    subject: 'Welcome to TodoTepoz! 🌄',
    greeting: `Hello${name ? ` ${name}` : ''}!`,
    title: 'Thank you for subscribing',
    message: 'Thank you for subscribing to our newsletter. You\'ll receive the best recommendations, events, and experiences from Tepoztlán directly in your inbox.',
    benefitsTitle: 'What to expect:',
    benefits: [
      '🍽️ The best local restaurants and cafes',
      '🎉 Cultural events and festivals',
      '🏔️ Unique experiences and tours',
      '💡 Travel tips and recommendations'
    ],
    footer: 'Stay connected and discover everything Tepoztlán has to offer.',
    unsubscribe: 'If you prefer not to receive these emails, you can unsubscribe at any time.',
    signature: 'The TodoTepoz Team'
  }

  try {
    await resend.emails.send({
      from: 'TodoTepoz <noreply@todotepoz.com>',
      to: [email],
      subject: welcomeContent.subject,
      html: `
        <!DOCTYPE html>
        <html lang="${language}">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0;">
          <div style="background: linear-gradient(135deg, #d97706 0%, #ea580c 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">🌄 TodoTepoz</h1>
            <p style="color: rgba(255, 255, 255, 0.95); margin: 10px 0 0 0; font-size: 16px;">Descubre el Pueblo Mágico</p>
          </div>

          <div style="padding: 40px 20px;">
            <h2 style="color: #d97706; margin-top: 0;">${welcomeContent.greeting}</h2>

            <h3 style="color: #1f2937; margin-bottom: 15px;">${welcomeContent.title}</h3>

            <p style="color: #4b5563; line-height: 1.8; margin-bottom: 25px;">
              ${welcomeContent.message}
            </p>

            <div style="background-color: #fef3c7; border-left: 4px solid #d97706; padding: 20px; margin: 25px 0;">
              <h4 style="color: #92400e; margin-top: 0; margin-bottom: 15px;">${welcomeContent.benefitsTitle}</h4>
              <ul style="color: #78350f; margin: 0; padding-left: 20px;">
                ${welcomeContent.benefits.map(benefit => `<li style="margin-bottom: 8px;">${benefit}</li>`).join('')}
              </ul>
            </div>

            <p style="color: #4b5563; line-height: 1.8; margin-top: 25px;">
              ${welcomeContent.footer}
            </p>

            <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 14px; margin-bottom: 5px;">
                ${welcomeContent.signature}
              </p>
              <p style="color: #d1d5db; font-size: 12px; margin-top: 20px;">
                ${welcomeContent.unsubscribe}
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })
  } catch (error) {
    console.error('Error sending welcome email:', error)
    // Don't throw - subscription was successful even if email fails
  }
}

export async function unsubscribeFromNewsletter(email: string) {
  try {
    await db
      .update(subscribers)
      .set({
        active: false,
        unsubscribedAt: new Date()
      })
      .where(eq(subscribers.email, email))

    return { success: true }
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return { success: false, error: 'Error al cancelar suscripción' }
  }
}
