'use server'

import { db } from '@/lib/db'
import { subscribers } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

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
    await db.insert(subscribers).values({
      email,
      name: name || null,
      language,
      active: true,
      verified: false,
    })

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
