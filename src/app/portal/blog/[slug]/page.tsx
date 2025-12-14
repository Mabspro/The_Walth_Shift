'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getBlogPostBySlug, type BlogPost } from '@/utils/blog';

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      try {
        const blogPost = await getBlogPostBySlug(slug);
        setPost(blogPost);
      } catch (error) {
        console.error('Error loading blog post:', error);
      } finally {
        setLoading(false);
      }
    }
    if (slug) {
      loadPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-accent/20 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-accent/10 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-deep-sage">Post Not Found</h1>
          <p className="text-sage mb-8">The blog post you're looking for doesn't exist.</p>
          <Link
            href="/portal/blog"
            className="px-6 py-3 bg-accent hover:bg-highlight text-rich-green font-semibold rounded-md transition-all duration-300 inline-block"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto py-12">
        <Link
          href="/portal/blog"
          className="inline-flex items-center text-sage hover:text-accent mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        {post.featured_image_url && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <article>
          {post.category && (
            <span className="inline-block text-sm px-4 py-2 bg-accent/20 text-accent rounded-full mb-4">
              {post.category}
            </span>
          )}

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-deep-sage">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-sage mb-6 font-medium italic">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center gap-4 mb-8 text-sm text-portal-text-secondary">
            {post.published_at && (
              <span>{new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-portal-accent-subtle rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div
            className="prose prose-lg max-w-none text-portal-text-secondary leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
}

