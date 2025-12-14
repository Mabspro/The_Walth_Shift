/**
 * Blog utilities for fetching blog posts from Supabase
 */

import { createClient } from '@/utils/supabase/client'

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featured_image_url: string | null
  author_id: string | null
  status: 'draft' | 'published' | 'archived'
  published_at: string | null
  created_at: string
  updated_at: string
  tags: string[] | null
  category: string | null
  view_count: number
  seo_title: string | null
  seo_description: string | null
  author_name?: string
}

/**
 * Get all published blog posts (client-side)
 */
export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  try {
    const supabase = createClient()
    if (!supabase) {
      return []
    }

    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching blog posts:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getBlogPosts:', error)
    return []
  }
}

/**
 * Get a single blog post by slug (client-side)
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = createClient()
    if (!supabase) {
      return null
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) {
      console.error('Error fetching blog post:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in getBlogPostBySlug:', error)
    return null
  }
}

/**
 * Get all blog posts (client-side, includes drafts for admin)
 */
export async function getAllBlogPosts(includeDrafts: boolean = false): Promise<BlogPost[]> {
  try {
    const supabase = createClient()
    if (!supabase) {
      return []
    }

    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (!includeDrafts) {
      query = query.eq('status', 'published')
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching blog posts:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getAllBlogPosts:', error)
    return []
  }
}

/**
 * Get blog post by ID (for admin editing)
 */
export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const supabase = createClient()
    if (!supabase) {
      return null
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching blog post:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in getBlogPostById:', error)
    return null
  }
}

/**
 * Get blog categories
 */
export async function getBlogCategories(): Promise<string[]> {
  try {
    const supabase = createClient()
    if (!supabase) {
      return []
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('category')
      .eq('status', 'published')
      .not('category', 'is', null)

    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }

    const categories = new Set<string>()
    data?.forEach(post => {
      if (post.category) {
        categories.add(post.category)
      }
    })

    return Array.from(categories).sort()
  } catch (error) {
    console.error('Error in getBlogCategories:', error)
    return []
  }
}

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

