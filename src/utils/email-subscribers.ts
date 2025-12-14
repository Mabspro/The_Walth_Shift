/**
 * Email subscriber utilities for managing email subscriptions
 */

import { createClient } from '@/utils/supabase/client'

export interface EmailSubscriptionData {
  email: string
  fullName?: string
  source?: string
  status?: 'active' | 'unsubscribed' | 'bounced'
}

/**
 * Subscribe an email to the mailing list
 */
export async function subscribeEmail(
  email: string,
  fullName?: string,
  source: string = 'landing_page'
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient()

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Invalid email address' }
    }

    // Upsert email subscriber
    const { error } = await supabase
      .from('email_subscribers')
      .upsert(
        {
          email: email.toLowerCase().trim(),
          full_name: fullName?.trim() || null,
          source,
          status: 'active',
          subscribed_at: new Date().toISOString()
        },
        {
          onConflict: 'email',
          ignoreDuplicates: false // Update existing records
        }
      )

    if (error) {
      console.error('Error subscribing email:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error in subscribeEmail:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

