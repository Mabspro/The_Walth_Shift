/**
 * Database types for The Wealth Shift Supabase database
 * These types match the database schema defined in the migrations
 */

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          created_at: string
          last_login: string | null
          role: 'admin' | 'member'
          status: 'active' | 'inactive' | 'pending'
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          phone?: string | null
          created_at?: string
          last_login?: string | null
          role?: 'admin' | 'member'
          status?: 'active' | 'inactive' | 'pending'
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          created_at?: string
          last_login?: string | null
          role?: 'admin' | 'member'
          status?: 'active' | 'inactive' | 'pending'
        }
      }
      assessment_responses: {
        Row: {
          id: string
          user_id: string | null
          email: string
          full_name: string | null
          phone: string | null
          wealth_shift_level: string | null
          mindset_type: string | null
          total_score: number | null
          responses: Record<string, unknown> // JSONB
          completed_at: string
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          email: string
          full_name?: string | null
          phone?: string | null
          wealth_shift_level?: string | null
          mindset_type?: string | null
          total_score?: number | null
          responses: Record<string, unknown>
          completed_at?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          email?: string
          full_name?: string | null
          phone?: string | null
          wealth_shift_level?: string | null
          mindset_type?: string | null
          total_score?: number | null
          responses?: Record<string, unknown>
          completed_at?: string
          ip_address?: string | null
          user_agent?: string | null
        }
      }
      packages: {
        Row: {
          id: string
          title: string
          description: string | null
          price: number
          currency: string
          duration: string | null
          features: string[] | null // JSONB array
          is_featured: boolean
          is_active: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          price: number
          currency?: string
          duration?: string | null
          features?: string[] | null
          is_featured?: boolean
          is_active?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          price?: number
          currency?: string
          duration?: string | null
          features?: string[] | null
          is_featured?: boolean
          is_active?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      community_posts: {
        Row: {
          id: string
          author_id: string | null
          title: string
          content: string
          excerpt: string | null
          image_url: string | null
          post_type: 'update' | 'announcement' | 'event'
          is_published: boolean
          is_pinned: boolean
          tags: string[] | null // JSONB array
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          author_id?: string | null
          title: string
          content: string
          excerpt?: string | null
          image_url?: string | null
          post_type?: 'update' | 'announcement' | 'event'
          is_published?: boolean
          is_pinned?: boolean
          tags?: string[] | null
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          author_id?: string | null
          title?: string
          content?: string
          excerpt?: string | null
          image_url?: string | null
          post_type?: 'update' | 'announcement' | 'event'
          is_published?: boolean
          is_pinned?: boolean
          tags?: string[] | null
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          workbook_id: string
          day_number: number
          completed: boolean
          notes: string | null
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          workbook_id: string
          day_number: number
          completed?: boolean
          notes?: string | null
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          workbook_id?: string
          day_number?: number
          completed?: boolean
          notes?: string | null
          completed_at?: string | null
          created_at?: string
        }
      }
      email_subscribers: {
        Row: {
          id: string
          email: string
          full_name: string | null
          source: string | null
          status: 'active' | 'unsubscribed'
          subscribed_at: string
          unsubscribed_at: string | null
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          source?: string | null
          status?: 'active' | 'unsubscribed'
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          source?: string | null
          status?: 'active' | 'unsubscribed'
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          subject: string | null
          message: string
          status: 'new' | 'read' | 'responded'
          submitted_at: string
          ip_address: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          subject?: string | null
          message: string
          status?: 'new' | 'read' | 'responded'
          submitted_at?: string
          ip_address?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          subject?: string | null
          message?: string
          status?: 'new' | 'read' | 'responded'
          submitted_at?: string
          ip_address?: string | null
        }
      }
      activity_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          entity_type: string | null
          entity_id: string | null
          details: Record<string, unknown> | null // JSONB
          ip_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          entity_type?: string | null
          entity_id?: string | null
          details?: Record<string, unknown> | null
          ip_address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          entity_type?: string | null
          entity_id?: string | null
          details?: Record<string, unknown> | null
          ip_address?: string | null
          created_at?: string
        }
      }
    }
  }
}

