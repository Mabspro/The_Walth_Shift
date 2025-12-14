'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

interface DashboardStats {
  totalUsers: number;
  totalAssessments: number;
  totalBlogPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalSubscribers: number;
  totalContactSubmissions: number;
  pendingContactSubmissions: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalAssessments: 0,
    totalBlogPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalSubscribers: 0,
    totalContactSubmissions: 0,
    pendingContactSubmissions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const supabase = createClient();
        if (!supabase) {
          setLoading(false);
          return;
        }

        // Fetch all stats in parallel
        const [
          usersResult,
          assessmentsResult,
          blogPostsResult,
          subscribersResult,
          contactResult,
        ] = await Promise.all([
          supabase.from('users').select('id', { count: 'exact', head: true }),
          supabase.from('assessment_responses').select('id', { count: 'exact', head: true }),
          supabase.from('blog_posts').select('id, status', { count: 'exact' }),
          supabase.from('email_subscribers').select('id', { count: 'exact', head: true }),
          supabase.from('contact_submissions').select('id, status', { count: 'exact' }),
        ]);

        const blogPosts = blogPostsResult.data || [];
        const contactSubmissions = contactResult.data || [];

        setStats({
          totalUsers: usersResult.count || 0,
          totalAssessments: assessmentsResult.count || 0,
          totalBlogPosts: blogPosts.length,
          publishedPosts: blogPosts.filter((p: { status: string }) => p.status === 'published').length,
          draftPosts: blogPosts.filter((p: { status: string }) => p.status === 'draft').length,
          totalSubscribers: subscribersResult.count || 0,
          totalContactSubmissions: contactSubmissions.length,
          pendingContactSubmissions: contactSubmissions.filter((c: { status: string }) => c.status === 'new').length,
        });
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-pulse">
          <div className="h-8 bg-accent/20 rounded w-48 mx-auto mb-4"></div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: '👥',
      color: 'bg-blue-500/20 text-blue-700',
      link: '/admin/users',
    },
    {
      title: 'Assessments',
      value: stats.totalAssessments,
      icon: '📋',
      color: 'bg-purple-500/20 text-purple-700',
      link: '/admin/assessments',
    },
    {
      title: 'Blog Posts',
      value: stats.totalBlogPosts,
      icon: '📝',
      color: 'bg-green-500/20 text-green-700',
      link: '/admin/blog',
      subtitle: `${stats.publishedPosts} published, ${stats.draftPosts} drafts`,
    },
    {
      title: 'Email Subscribers',
      value: stats.totalSubscribers,
      icon: '📧',
      color: 'bg-orange-500/20 text-orange-700',
      link: '/admin/subscribers',
    },
    {
      title: 'Contact Submissions',
      value: stats.totalContactSubmissions,
      icon: '✉️',
      color: 'bg-pink-500/20 text-pink-700',
      link: '/admin/contact',
      subtitle: `${stats.pendingContactSubmissions} pending`,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-deep-sage">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.title}
            href={card.link}
            className="bg-white rounded-lg p-6 border border-portal-border shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${card.color}`}>
                {card.icon}
              </div>
              <span className="text-3xl font-bold text-deep-sage">{card.value}</span>
            </div>
            <h3 className="text-lg font-semibold text-deep-sage mb-1">{card.title}</h3>
            {card.subtitle && (
              <p className="text-sm text-sage">{card.subtitle}</p>
            )}
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 border border-portal-border shadow-md">
        <h2 className="text-xl font-bold mb-4 text-deep-sage">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/blog/new"
            className="px-4 py-3 bg-accent hover:bg-highlight text-rich-green font-semibold rounded-md transition-all duration-300 text-center"
          >
            + New Blog Post
          </Link>
          <Link
            href="/admin/users"
            className="px-4 py-3 bg-sage hover:bg-deep-sage text-cream font-semibold rounded-md transition-all duration-300 text-center"
          >
            View Users
          </Link>
          <Link
            href="/admin/contact"
            className="px-4 py-3 bg-sage hover:bg-deep-sage text-cream font-semibold rounded-md transition-all duration-300 text-center"
          >
            View Messages
          </Link>
          <Link
            href="/admin/subscribers"
            className="px-4 py-3 bg-sage hover:bg-deep-sage text-cream font-semibold rounded-md transition-all duration-300 text-center"
          >
            Export Subscribers
          </Link>
        </div>
      </div>
    </div>
  );
}

