'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { type BlogPost } from '@/types/blog';

export default function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'archived'>('all');

  useEffect(() => {
    async function loadPosts() {
      try {
        const supabase = createClient();
        if (!supabase) {
          setLoading(false);
          return;
        }

        let query = supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (filter !== 'all') {
          query = query.eq('status', filter);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error loading blog posts:', error);
        } else {
          setPosts(data || []);
        }
      } catch (error) {
        console.error('Error in loadPosts:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [filter]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const supabase = createClient();
      if (!supabase) return;

      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) {
        alert('Error deleting post: ' + error.message);
      } else {
        setPosts(posts.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post');
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'draft' | 'published' | 'archived') => {
    try {
      const supabase = createClient();
      if (!supabase) return;

      const updateData: { status: 'draft' | 'published' | 'archived'; published_at?: string } = { status: newStatus };
      if (newStatus === 'published' && !posts.find(p => p.id === id)?.published_at) {
        updateData.published_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', id);

      if (error) {
        alert('Error updating post: ' + error.message);
      } else {
        setPosts(posts.map(p => p.id === id ? { ...p, ...updateData } : p));
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Error updating post');
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-deep-sage">Blog Management</h1>
        <Link
          href="/admin/blog/new"
          className="px-6 py-3 bg-accent hover:bg-highlight text-rich-green font-bold rounded-md transition-all duration-300"
        >
          + New Post
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6 border-b border-portal-border">
        {(['all', 'published', 'draft', 'archived'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 font-semibold capitalize transition-colors ${
              filter === status
                ? 'text-deep-sage border-b-2 border-deep-sage'
                : 'text-sage hover:text-deep-sage'
            }`}
          >
            {status} ({status === 'all' ? posts.length : posts.filter(p => p.status === status).length})
          </button>
        ))}
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-lg border border-portal-border shadow-md overflow-hidden">
        {posts.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sage mb-4">No blog posts found.</p>
            <Link
              href="/admin/blog/new"
              className="px-6 py-3 bg-accent hover:bg-highlight text-rich-green font-semibold rounded-md transition-all duration-300 inline-block"
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-portal-accent-subtle">
              <tr>
                <th className="text-left p-4 font-semibold text-deep-sage">Title</th>
                <th className="text-left p-4 font-semibold text-deep-sage">Status</th>
                <th className="text-left p-4 font-semibold text-deep-sage">Category</th>
                <th className="text-left p-4 font-semibold text-deep-sage">Created</th>
                <th className="text-left p-4 font-semibold text-deep-sage">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-t border-portal-border hover:bg-portal-accent-subtle/50">
                  <td className="p-4">
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="font-semibold text-deep-sage hover:text-accent transition-colors"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="p-4">
                    <select
                      value={post.status}
                      onChange={(e) => handleStatusChange(post.id, e.target.value as 'draft' | 'published' | 'archived')}
                      className="px-3 py-1 rounded border border-portal-border text-sm font-medium"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                  <td className="p-4 text-sage">{post.category || '-'}</td>
                  <td className="p-4 text-sm text-portal-text-secondary">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="px-3 py-1 text-sm bg-sage hover:bg-deep-sage text-cream rounded transition-colors"
                      >
                        Edit
                      </Link>
                      {post.status === 'published' && (
                        <Link
                          href={`/portal/blog/${post.slug}`}
                          target="_blank"
                          className="px-3 py-1 text-sm bg-accent/20 hover:bg-accent/30 text-accent rounded transition-colors"
                        >
                          View
                        </Link>
                      )}
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

