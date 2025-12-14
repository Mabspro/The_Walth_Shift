import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey || supabaseAnonKey === 'your-anon-key-here') {
        throw new Error('Supabase credentials are not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.')
    }

    return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
