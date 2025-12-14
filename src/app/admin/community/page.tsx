'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import type { Database } from '@/types/database';

type CommunityPost = Database['public']['Tables']['community_posts']['Row'] & {
  author_name?: string | null;
};

export default function CommunityManagement() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const supabase = createClient();
        if (!supabase) {
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('community_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error loading community posts:', error);
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
  }, []);

  const handlePinToggle = async (id: string, currentPinStatus: boolean) => {
    try {
      const supabase = createClient();
      if (!supabase) return;

      const { error } = await supabase
        .from('community_posts')
        .update({ is_pinned: !currentPinStatus })
        .eq('id', id);

      if (error) {
        alert('Error updating post: ' + error.message);
      } else {
        setPosts(posts.map(p => p.id === id ? { ...p, is_pinned: !currentPinStatus } : p));
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Error updating post');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const supabase = createClient();
      if (!supabase) return;

      const { error } = await supabase
        .from('community_posts')
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
        <h1 className="text-3xl font-bold text-deep-sage">Community Posts</h1>
        <Link
          href="/admin/community/new"
          className="px-6 py-3 bg-accent hover:bg-highlight text-rich-green font-bold rounded-md transition-all duration-300"
        >
          + New Post
        </Link>
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="bg-white rounded-lg border border-portal-border shadow-md p-12 text-center">
            <p className="text-sage mb-4">No community posts found.</p>
            <Link
              href="/admin/community/new"
              className="px-6 py-3 bg-accent hover:bg-highlight text-rich-green font-semibold rounded-md transition-all duration-300 inline-block"
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg border border-portal-border shadow-md p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {post.is_pinned && (
                      <span className="text-accent text-sm font-semibold">📌 Pinned</span>
                    )}
                    <h3 className="text-xl font-bold text-deep-sage">{post.title}</h3>
                  </div>
                  {post.excerpt && (
                    <p className="text-sage mb-2">{post.excerpt}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-portal-text-secondary">
                    {post.author_name && <span>By {post.author_name}</span>}
                    {post.published_at && (
                      <span>{new Date(post.published_at).toLocaleDateString()}</span>
                    )}
                    {post.post_type && (
                      <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs">
                        {post.post_type}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePinToggle(post.id, post.is_pinned || false)}
                    className="px-3 py-1 text-sm bg-sage hover:bg-deep-sage text-cream rounded transition-colors"
                  >
                    {post.is_pinned ? 'Unpin' : 'Pin'}
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

