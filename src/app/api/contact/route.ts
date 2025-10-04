import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { rateLimit, rateLimitConfigs } from '@/lib/middleware/rateLimit'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  language: z.enum(['es', 'en']).default('es'),
})

const rateLimiter = rateLimit(rateLimitConfigs.contactForm)

export async function POST(request: NextRequest) {
  // Apply rate limiting
  return rateLimiter(request, async () => {
  try {
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    const { name, email, subject, message, language } = validatedData

    // Send email to admin
    await resend.emails.send({
      from: 'TodoTepoz Contact <noreply@todotepoz.com>',
      replyTo: email,
      to: ['info@todotepoz.com'],
      subject: `Contacto Web: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0;">
          <div style="background: linear-gradient(135deg, #d97706 0%, #ea580c 100%); padding: 30px 20px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">📬 Nuevo Mensaje de Contacto</h1>
          </div>

          <div style="padding: 30px 20px;">
            <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <p style="margin: 5px 0;"><strong>De:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #d97706;">${email}</a></p>
              <p style="margin: 5px 0;"><strong>Asunto:</strong> ${subject}</p>
              <p style="margin: 5px 0;"><strong>Idioma:</strong> ${language === 'es' ? 'Español' : 'English'}</p>
            </div>

            <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">Mensaje:</h3>
              <p style="color: #4b5563; line-height: 1.8; white-space: pre-wrap;">${message}</p>
            </div>

            <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-top: 25px;">
              <p style="margin: 5px 0; color: #6b7280; font-size: 14px;">
                <strong>Fecha:</strong> ${new Date().toLocaleString('es-MX', {
                  dateStyle: 'full',
                  timeStyle: 'short',
                  timeZone: 'America/Mexico_City'
                })}
              </p>
              <p style="margin: 5px 0; color: #6b7280; font-size: 14px;">
                <strong>IP:</strong> ${request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown'}
              </p>
            </div>

            <div style="margin-top: 30px; padding: 20px; background-color: #ecfdf5; border-left: 4px solid #10b981; border-radius: 4px;">
              <p style="margin: 0; color: #065f46;">
                💡 <strong>Responder:</strong> Puedes responder directamente a este correo para contactar a ${name}
              </p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="color: #9ca3af; font-size: 14px; margin: 0;">
                TodoTepoz - Formulario de Contacto
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    // Send confirmation email to user
    const confirmationContent = language === 'es' ? {
      subject: 'Hemos recibido tu mensaje - TodoTepoz',
      title: '¡Mensaje recibido!',
      greeting: `Hola ${name},`,
      message: 'Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos lo antes posible.',
      messagePreview: 'Tu mensaje:',
      footer: 'Normalmente respondemos en menos de 24 horas.',
      signature: 'El equipo de TodoTepoz'
    } : {
      subject: 'We received your message - TodoTepoz',
      title: 'Message received!',
      greeting: `Hello ${name},`,
      message: 'Thank you for contacting us. We have received your message and will respond as soon as possible.',
      messagePreview: 'Your message:',
      footer: 'We typically respond within 24 hours.',
      signature: 'The TodoTepoz Team'
    }

    await resend.emails.send({
      from: 'TodoTepoz <noreply@todotepoz.com>',
      to: [email],
      subject: confirmationContent.subject,
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
            <p style="color: rgba(255, 255, 255, 0.95); margin: 10px 0 0 0; font-size: 16px;">${confirmationContent.title}</p>
          </div>

          <div style="padding: 40px 20px;">
            <h2 style="color: #d97706; margin-top: 0;">${confirmationContent.greeting}</h2>

            <p style="color: #4b5563; line-height: 1.8; margin-bottom: 25px;">
              ${confirmationContent.message}
            </p>

            <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;"><strong>${confirmationContent.messagePreview}</strong></p>
              <p style="margin: 0; color: #1f2937; white-space: pre-wrap;">"${message}"</p>
            </div>

            <p style="color: #4b5563; line-height: 1.8;">
              ${confirmationContent.footer}
            </p>

            <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 14px; margin-bottom: 5px;">
                ${confirmationContent.signature}
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    return NextResponse.json(
      {
        success: true,
        message: language === 'es'
          ? 'Mensaje enviado correctamente. Te responderemos pronto.'
          : 'Message sent successfully. We will respond soon.'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.issues
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send message. Please try again.'
      },
      { status: 500 }
    )
  }
  })
}
