'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getCurrentUserWithProfile, signOut, isAdmin } from '@/utils/auth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ user: { email?: string | null }; profile: { full_name?: string | null } | null } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      const userData = await getCurrentUserWithProfile();
      if (!userData) {
        router.push('/signin?redirect=/admin');
        return;
      }

      const admin = await isAdmin();
      if (!admin) {
        router.push('/portal');
        return;
      }

      setUser(userData);
      setIsAdminUser(true);
      setIsLoading(false);
    }
    checkAdmin();
  }, [router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-portal-beige">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-accent/20 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-accent/10 rounded w-32 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdminUser) {
    return null; // Will redirect
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/blog', label: 'Blog Posts', icon: '📝' },
    { href: '/admin/users', label: 'Users', icon: '👥' },
    { href: '/admin/assessments', label: 'Assessments', icon: '📋' },
    { href: '/admin/contact', label: 'Contact', icon: '✉️' },
    { href: '/admin/subscribers', label: 'Subscribers', icon: '📧' },
    { href: '/admin/community', label: 'Community', icon: '🌿' },
    { href: '/admin/packages', label: 'Packages', icon: '📦' },
  ];

  return (
    <div className="min-h-screen bg-portal-beige">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-rich-green border-r border-accent/20 shadow-lg z-40">
        <div className="p-6 border-b border-accent/20">
          <Link href="/admin" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-accent">Admin</h1>
          </Link>
          <p className="text-sm text-cream/80 mt-1">The Wealth Shift</p>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-accent/20 text-accent font-semibold'
                    : 'text-cream/80 hover:bg-accent/10 hover:text-cream'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-accent/20">
          <div className="mb-4">
            <p className="text-sm text-cream/80">{user?.profile?.full_name || user?.user?.email}</p>
            <p className="text-xs text-cream/60">Administrator</p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/portal"
              className="flex-1 px-4 py-2 text-sm bg-accent/20 hover:bg-accent/30 text-cream rounded-md transition-colors text-center"
            >
              Portal
            </Link>
            <button
              onClick={handleSignOut}
              className="flex-1 px-4 py-2 text-sm bg-accent/20 hover:bg-accent/30 text-cream rounded-md transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

