/**
 * TypeScript types for blog posts
 */

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
}

export interface BlogPostFormData {
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image_url?: string
  category?: string
  tags?: string[]
  status: 'draft' | 'published' | 'archived'
  seo_title?: string
  seo_description?: string
}

