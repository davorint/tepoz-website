'use server'

import { db } from '@/lib/db'
import { contactSubmissions } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

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

    // TODO: Send email notification to admin
    // This would integrate with an email service like Resend, SendGrid, etc.
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'noreply@todotepoz.com',
    //   to: 'info@todotepoz.com',
    //   subject: `New Contact: ${input.subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>From:</strong> ${input.name} (${input.email})</p>
    //     <p><strong>Type:</strong> ${input.type}</p>
    //     <p><strong>Subject:</strong> ${input.subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${input.message.replace(/\n/g, '<br>')}</p>
    //   `
    // })

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
