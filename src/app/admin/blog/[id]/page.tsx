'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getBlogPostById, generateSlug } from '@/utils/blog';
import { createClient } from '@/utils/supabase/client';

export default function EditBlogPost() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  useEffect(() => {
    async function loadPost() {
      try {
        const post = await getBlogPostById(id);
        if (post) {
          setFormData({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt || '',
            content: post.content,
            featured_image_url: post.featured_image_url || '',
            category: post.category || '',
            tags: post.tags?.join(', ') || '',
            status: post.status,
            seo_title: post.seo_title || '',
            seo_description: post.seo_description || '',
          });
        } else {
          alert('Post not found');
          router.push('/admin/blog');
        }
      } catch (error) {
        console.error('Error loading post:', error);
        alert('Error loading post');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadPost();
    }
  }, [id, router]);

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const supabase = createClient();
      if (!supabase) {
        alert('Database connection error');
        setSaving(false);
        return;
      }

      const tagsArray = formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        : null;

      const updateData: {
        title: string
        slug: string
        excerpt: string | null
        content: string
        featured_image_url: string | null
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
        status: formData.status,
        category: formData.category || null,
        tags: tagsArray,
        seo_title: formData.seo_title || null,
        seo_description: formData.seo_description || null,
      };

      // If status changed to published and wasn't published before, set published_at
      const { data: currentPost } = await supabase
        .from('blog_posts')
        .select('published_at, status')
        .eq('id', id)
        .single();

      if (formData.status === 'published' && !currentPost?.published_at) {
        updateData.published_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', id);

      if (error) {
        alert('Error updating post: ' + error.message);
      } else {
        router.push('/admin/blog');
      }
    } catch (error) {
      console.error('Error updating blog post:', error);
      alert('Error updating blog post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-pulse">
          <div className="h-8 bg-accent/20 rounded w-48 mx-auto mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-deep-sage mb-2">Edit Blog Post</h1>
        <p className="text-sage">Update blog post content and settings</p>
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
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 text-deep-sage">Excerpt</label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 bg-portal-beige-light rounded-md border border-portal-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 text-portal-text-primary"
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
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2 text-deep-sage">Featured Image URL</label>
            <input
              type="url"
              value={formData.featured_image_url}
              onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
              className="w-full px-4 py-3 bg-portal-beige-light rounded-md border border-portal-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 text-portal-text-primary"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-deep-sage">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-portal-beige-light rounded-md border border-portal-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 text-portal-text-primary"
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
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-deep-sage">SEO Description</label>
            <textarea
              value={formData.seo_description}
              onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 bg-portal-beige-light rounded-md border border-portal-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 text-portal-text-primary"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-6 border-t border-portal-border">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-accent hover:bg-highlight text-rich-green font-bold rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/blog')}
            className="px-6 py-3 bg-portal-border hover:bg-portal-text-muted text-portal-text-primary font-semibold rounded-md transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

