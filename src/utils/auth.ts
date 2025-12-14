/**
 * Authentication utilities for Supabase Auth
 */

import { createClient } from '@/utils/supabase/client'

export interface SignUpData {
  email: string
  password: string
  fullName: string
  phone?: string
}

export interface SignInData {
  email: string
  password: string
}

/**
 * Sign up a new user
 */
export async function signUp(data: SignUpData): Promise<{ success: boolean; error?: string; userId?: string }> {
  try {
    const supabase = createClient()

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          phone: data.phone || null
        }
      }
    })

    if (authError) {
      return { success: false, error: authError.message }
    }

    if (!authData.user) {
      return { success: false, error: 'Failed to create user' }
    }

    // Create user record in users table
    const { error: userError } = await supabase
      .from('users')
      .insert({
        email: data.email.toLowerCase().trim(),
        full_name: data.fullName.trim(),
        phone: data.phone?.trim() || null,
        auth_user_id: authData.user.id,
        role: 'member',
        status: 'active'
      })

    if (userError) {
      console.error('Error creating user record:', userError)
      // Auth user was created, but user record failed - this is recoverable
      return { success: false, error: 'Account created but user record failed. Please contact support.' }
    }

    return { success: true, userId: authData.user.id }
  } catch (error) {
    console.error('Error in signUp:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

/**
 * Sign in a user
 */
export async function signIn(data: SignInData): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error in signIn:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error in signOut:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

/**
 * Get the current user (client-side)
 */
export async function getCurrentUser() {
  try {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

/**
 * Get the current user with profile data (client-side)
 */
export async function getCurrentUserWithProfile() {
  try {
    const supabase = createClient()
    if (!supabase) {
      return null
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return null
    }

    // Get user profile from users table
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('auth_user_id', user.id)
      .single()

    if (profileError) {
      console.error('Error fetching user profile:', profileError)
      return { user, profile: null }
    }

    return { user, profile }
  } catch (error) {
    console.error('Error in getCurrentUserWithProfile:', error)
    return null
  }
}

/**
 * Check if user is admin
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const userData = await getCurrentUserWithProfile()
    return userData?.profile?.role === 'admin'
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}

/**
 * Request password reset
 */
export async function resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error in resetPassword:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

