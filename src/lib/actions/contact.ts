'use server'

import { db } from '@/lib/db'
import { contactSubmissions } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactFormInput {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  type?: string // general, business, partnership
}

export async function submitContactForm(input: ContactFormInput) {
  try {
    // Validate required fields
    if (!input.name || !input.email || !input.subject || !input.message) {
      return { success: false, error: 'All required fields must be filled' }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(input.email)) {
      return { success: false, error: 'Invalid email format' }
    }

    // Save to database
    const [submission] = await db.insert(contactSubmissions).values({
      name: input.name,
      email: input.email,
      phone: input.phone || null,
      subject: input.subject,
      message: input.message,
      type: input.type || 'general',
      read: false,
      replied: false,
    }).returning()

    // Send email notification to admin
    try {
      await resend.emails.send({
        from: 'TodoTepoz <noreply@todotepoz.com>',
        to: ['info@todotepoz.com'],
        subject: `New Contact: ${input.subject}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
                <h2 style="color: #d97706; margin-top: 0;">New Contact Form Submission</h2>

                <div style="background-color: white; padding: 20px; border-radius: 4px; margin-top: 20px;">
                  <p style="margin: 10px 0;"><strong>From:</strong> ${input.name}</p>
                  <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${input.email}" style="color: #d97706;">${input.email}</a></p>
                  ${input.phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> ${input.phone}</p>` : ''}
                  <p style="margin: 10px 0;"><strong>Type:</strong> ${input.type || 'general'}</p>
                  <p style="margin: 10px 0;"><strong>Subject:</strong> ${input.subject}</p>

                  <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
                    <p style="margin: 10px 0;"><strong>Message:</strong></p>
                    <p style="margin: 10px 0; white-space: pre-wrap;">${input.message}</p>
                  </div>
                </div>

                <p style="font-size: 12px; color: #666; margin-top: 20px;">
                  Submission ID: ${submission.id} | Received: ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}
                </p>
              </div>
            </body>
          </html>
        `,
      })
    } catch (emailError) {
      // Log email error but don't fail the submission
      console.error('Failed to send email notification:', emailError)
      // Continue - the submission is still saved to database
    }

    revalidatePath('/info/contact')

    return {
      success: true,
      message: 'Contact form submitted successfully',
      submissionId: submission.id
    }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return { success: false, error: 'Failed to submit contact form' }
  }
}

export async function getContactSubmissions() {
  try {
    const submissions = await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt))

    return { success: true, submissions }
  } catch (error) {
    console.error('Error getting contact submissions:', error)
    return { success: false, error: 'Failed to get submissions', submissions: [] }
  }
}

export async function markContactAsRead(submissionId: number) {
  try {
    await db
      .update(contactSubmissions)
      .set({ read: true })
      .where(eq(contactSubmissions.id, submissionId))

    return { success: true }
  } catch (error) {
    console.error('Error marking contact as read:', error)
    return { success: false, error: 'Failed to mark as read' }
  }
}

export async function markContactAsReplied(submissionId: number) {
  try {
    await db
      .update(contactSubmissions)
      .set({ replied: true })
      .where(eq(contactSubmissions.id, submissionId))

    return { success: true }
  } catch (error) {
    console.error('Error marking contact as replied:', error)
    return { success: false, error: 'Failed to mark as replied' }
  }
}
