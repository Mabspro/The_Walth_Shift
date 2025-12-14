'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBlogPosts, type BlogPost } from '@/utils/blog';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const blogPosts = await getBlogPosts();
        setPosts(blogPosts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16 mt-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-deep-sage">Blog</h1>
        <p className="text-xl max-w-3xl mx-auto text-sage font-medium">
          Insights, stories, and wealth-building tips to support your journey.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-accent/20 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-accent/10 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-sage text-lg mb-4">No blog posts yet.</p>
          <p className="text-portal-text-secondary">Check back soon for new content!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/portal/blog/${post.slug}`}
              className="bg-portal-beige-card rounded-lg overflow-hidden border border-portal-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {post.featured_image_url && (
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={post.featured_image_url}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                {post.category && (
                  <span className="inline-block text-xs px-3 py-1 bg-accent/20 text-accent rounded-full mb-3">
                    {post.category}
                  </span>
                )}
                <h2 className="text-xl font-bold mb-2 text-deep-sage line-clamp-2">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-sage text-sm mb-4 line-clamp-3 font-medium">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs text-portal-text-muted">
                  {post.published_at && (
                    <span>{new Date(post.published_at).toLocaleDateString()}</span>
                  )}
                  <span className="text-accent">Read more →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

