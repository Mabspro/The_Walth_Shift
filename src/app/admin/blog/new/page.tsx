'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { generateSlug } from '@/utils/blog';

export default function NewBlogPost() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image_url: '',
    category: '',
    tags: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
    seo_title: '',
    seo_description: '',
  });

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();
      if (!supabase) {
        alert('Database connection error');
        setLoading(false);
        return;
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('You must be signed in to create a blog post');
        router.push('/signin');
        return;
      }

      // Get user profile to get user id
      const { data: profile } = await supabase
        .from('users')
        .select('id')
        .eq('auth_user_id', user.id)
        .single();

      const tagsArray = formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        : null;

      const postData: {
        title: string
        slug: string
        excerpt: string | null
        content: string
        featured_image_url: string | null
        author_id: string | null
        status: 'draft' | 'published' | 'archived'
        category: string | null
        tags: string[] | null
        seo_title: string | null
        seo_description: string | null
        published_at?: string
      } = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt || null,
        content: formData.content,
        featured_image_url: formData.featured_image_url || null,
        author_id: profile?.id || null,
        status: formData.status,
        category: formData.category || null,
        tags: tagsArray,
        seo_title: formData.seo_title || null,
        seo_description: formData.seo_description || null,
      };

      if (formData.status === 'published') {
        postData.published_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .insert(postData)
        .select()
        .single();

      if (error) {
        alert('Error creating post: ' + error.message);
      } else {
        router.push(`/admin/blog/${data.id}`);
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Error creating blog post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-deep-sage mb-2">Create New Blog Post</h1>
        <p className="text-sage">Write and publish a new blog post</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 border border-portal-border shadow-md space-y-6">
        <div>
          <label className="block font-semibold mb-2 text-deep-sage">
            Title <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className="w-full px-4 py-3 bg-portal-beige-light rounded-md border border-portal-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 text-portal-text-primary"
            placeholder="Enter blog post title"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 text-deep-sage">
            Slug <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            className="w-full px-4 py-3 bg-portal-beige-light rounded-md border border-portal-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 text-portal-text-primary"
            placeholder="url-friendly-slug"
          />
          <p className="mt-1 text-xs text-portal-text-secondary">Used in the URL: /portal/blog/[slug]</p>
        </div>

        <div>
          <label className="block font-semibold mb-2 text-deep-sage">Excerpt</label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 bg-portal-beige-light rounded-md border border-portal-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 text-portal-text-primary"
            placeholder="Brief summary of the post"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 text-deep-sage">
            Content <span className="text-accent">*</span>
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            rows={15}
            className="w-full px-4 py-3 bg-portal-beige-light rounded-md border border-portal-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 text-portal-text-primary font-mono text-sm"
            placeholder="Write your blog post content here (HTML supported)"
          />
          <p className="mt-1 text-xs text-portal-text-secondary">You can use HTML tags for formatting</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2 text-deep-sage">Featured Image URL</label>
            <input
              type="url"
              value={formData.featured_image_url}
              onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
              className="w-full px-4 py-3 bg-portal-beige-light rounded-md border border-portal-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 text-portal-text-primary"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-deep-sage">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-portal-beige-light rounded-md border border-portal-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 text-portal-text-primary"
              placeholder="e.g., Wealth Building, Mindset"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2 text-deep-sage">Tags</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full px-4 py-3 bg-portal-beige-light rounded-md border border-portal-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 text-portal-text-primary"
            placeholder="tag1, tag2, tag3"
          />
          <p className="mt-1 text-xs text-portal-text-secondary">Separate tags with commas</p>
        </div>

        <div>
          <label className="block font-semibold mb-2 text-deep-sage">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' | 'archived' })}
            className="w-full px-4 py-3 bg-portal-beige-light rounded-md border border-portal-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 text-portal-text-primary"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2 text-deep-sage">SEO Title</label>
            <input
              type="text"
              value={formData.seo_title}
              onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
              className="w-full px-4 py-3 bg-portal-beige-light rounded-md border border-portal-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 text-portal-text-primary"
              placeholder="SEO optimized title"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-deep-sage">SEO Description</label>
            <textarea
              value={formData.seo_description}
              onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 bg-portal-beige-light rounded-md border border-portal-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 text-portal-text-primary"
              placeholder="SEO meta description"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-6 border-t border-portal-border">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-accent hover:bg-highlight text-rich-green font-bold rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Post'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-portal-border hover:bg-portal-text-muted text-portal-text-primary font-semibold rounded-md transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

