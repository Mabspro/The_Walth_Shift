/**
 * Community utilities for fetching and managing community posts from Supabase
 */

import { createClient } from '@/utils/supabase/client'
import type { Database } from '@/types/database'

type CommunityPostRow = Database['public']['Tables']['community_posts']['Row']

export interface CommunityPost {
  id: string
  title: string
  content: string
  excerpt: string | null
  imageUrl: string | null
  postType: 'update' | 'announcement' | 'event'
  isPinned: boolean
  tags: string[]
  createdAt: string
  publishedAt: string | null
  authorName: string | null
}

/**
 * Transform database post to UI post format
 */
function transformPost(dbPost: CommunityPostRow, authorName?: string | null): CommunityPost {
  return {
    id: dbPost.id,
    title: dbPost.title,
    content: dbPost.content,
    excerpt: dbPost.excerpt,
    imageUrl: dbPost.image_url,
    postType: dbPost.post_type,
    isPinned: dbPost.is_pinned,
    tags: Array.isArray(dbPost.tags) ? (dbPost.tags as string[]) : [],
    createdAt: dbPost.created_at,
    publishedAt: dbPost.published_at,
    authorName: authorName || null
  }
}

/**
 * Fetch all published community posts from Supabase
 */
export async function getCommunityPosts(): Promise<CommunityPost[]> {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('community_posts')
      .select(`
        *,
        author:users(full_name)
      `)
      .eq('is_published', true)
      .order('is_pinned', { ascending: false })
      .order('published_at', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching community posts:', error)
      return []
    }

    if (!data || data.length === 0) {
      return []
    }

    return data.map(post => {
      const authorName = (post.author as { full_name: string | null } | null)?.full_name || null
      return transformPost(post, authorName)
    })
  } catch (error) {
    console.error('Error in getCommunityPosts:', error)
    return []
  }
}

/**
 * Fetch a single community post by ID
 */
export async function getCommunityPost(id: string): Promise<CommunityPost | null> {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('community_posts')
      .select(`
        *,
        author:users(full_name)
      `)
      .eq('id', id)
      .eq('is_published', true)
      .single()

    if (error || !data) {
      console.error('Error fetching community post:', error)
      return null
    }

    const authorName = (data.author as { full_name: string | null } | null)?.full_name || null
    return transformPost(data, authorName)
  } catch (error) {
    console.error('Error in getCommunityPost:', error)
    return null
  }
}

