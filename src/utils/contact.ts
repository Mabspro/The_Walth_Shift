/**
 * Contact form utilities for managing contact submissions
 */

import { createClient } from '@/utils/supabase/client'

export interface ContactSubmissionData {
  name: string
  email: string
  subject?: string
  message: string
  phone?: string
  source?: string
}

/**
 * Submit a contact form to Supabase
 */
export async function submitContactForm(
  data: ContactSubmissionData
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient()

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return { success: false, error: 'Invalid email address' }
    }

    // Validate required fields
    if (!data.name || !data.message) {
      return { success: false, error: 'Name and message are required' }
    }

    // Insert contact submission
    const { error } = await supabase
      .from('contact_submissions')
      .insert({
        name: data.name.trim(),
        email: data.email.toLowerCase().trim(),
        subject: data.subject?.trim() || null,
        message: data.message.trim(),
        phone: data.phone?.trim() || null,
        source: data.source || 'website',
        status: 'new',
        submitted_at: new Date().toISOString()
      })

    if (error) {
      console.error('Error submitting contact form:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error in submitContactForm:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

